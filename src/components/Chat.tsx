'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from 'ai/react';
import { ChatMessage, EstimationData, Provider } from '@/lib/types';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { createConversation, saveMessage, getConversationMessages } from '@/lib/conversations';
import { validateAndFetchProviders } from '@/lib/providers';
import { RotateCcw } from 'lucide-react';

const WELCOME_MESSAGE = `¡Ey, dimelo! 👷‍♀️ Soy Doña Obra, tu vecina de confianza pa' todo lo que es reparaciones y servicios del hogar. Yo conozco a todos los buenos maestros de la ciudad 💪

Cuéntame qué necesitas — mándame texto, fotos, lo que sea — y yo te digo cuánto te va a salir y quién te lo puede resolver. ¡Vamos al grano! 🔧`;

interface ChatProps {
  initialCategory?: string | null;
}

export default function Chat({ initialCategory }: ChatProps = {}) {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, append, isLoading, setMessages } = useChat({
    api: '/api/chat',
    body: { conversationId },
    onFinish: async (message) => {
      // Check for delimiter-separated content
      const delimiterIndex = message.content.indexOf('%%%ESTIMATION%%%');

      if (delimiterIndex !== -1) {
        // Extract text and JSON parts
        const textPart = message.content.substring(0, delimiterIndex).trim();
        const jsonPart = message.content.substring(delimiterIndex + '%%%ESTIMATION%%%'.length).trim();

        // Clean markdown code blocks if present
        const cleanJson = jsonPart.replace(/```json?\n?/g, '').replace(/```/g, '').trim();

        try {
          const estimation: EstimationData = JSON.parse(cleanJson);

          // Add natural text message first
          if (textPart) {
            const textMessage: ChatMessage = {
              id: Date.now().toString(),
              role: 'assistant',
              content: textPart,
              timestamp: new Date(),
            };
            setChatMessages((prev) => [...prev, textMessage]);
          }

          // Validate and fetch providers (with fallback to category search)
          const providers = await validateAndFetchProviders(
            estimation.recommendedProviderIds,
            estimation.category
          );

          // Add estimation message with inline providers
          const estimationMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: estimation.details,
            estimation,
            providers: providers.length > 0 ? providers : undefined,
            topPickId: estimation.topPickId,
            timestamp: new Date(),
          };
          setChatMessages((prev) => [...prev, estimationMessage]);

          // Add provider recommendation message
          if (providers.length > 0) {
            const providerMessage: ChatMessage = {
              id: (Date.now() + 2).toString(),
              role: 'assistant',
              content: `Tranqui que yo te consigo a alguien de confianza 💪 ${estimation.topPickComment}`,
              timestamp: new Date(),
            };
            setChatMessages((prev) => [...prev, providerMessage]);
          }

          // Add final follow-up
          const finalMessage: ChatMessage = {
            id: (Date.now() + 3).toString(),
            role: 'assistant',
            content: '¿Eso es to\' o necesitas algo más? Aquí estoy pa\' lo que sea 🏠',
            timestamp: new Date(),
          };
          setChatMessages((prev) => [...prev, finalMessage]);

        } catch (error) {
          console.error('Error parsing estimation JSON:', error);
          // Fallback: treat as regular text message
          addAssistantMessage(message.content);
        }
      } else {
        // Regular message without estimation
        addAssistantMessage(message.content);
      }
    },
  });

  const addAssistantMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, newMessage]);
  };

  // Initialize conversation
  useEffect(() => {
    async function init() {
      // Check for existing conversation in localStorage
      const existingId = localStorage.getItem('conversationId');

      if (existingId) {
        // Load existing conversation
        setConversationId(existingId);
        const messages = await getConversationMessages(existingId);

        if (messages.length > 0) {
          // Convert to ChatMessage format
          const chatMsgs: ChatMessage[] = messages.map((m) => ({
            id: m.id,
            role: m.role,
            content: m.content,
            images: m.image_urls || undefined,
            estimation: m.metadata as EstimationData | undefined,
            timestamp: new Date(m.created_at),
          }));
          setChatMessages(chatMsgs);

          // Don't reconstruct AI messages - just show visual history
          // The AI will start fresh from this point
          return;
        }
      }

      // Create new conversation
      const newId = await createConversation();
      if (newId) {
        setConversationId(newId);
        localStorage.setItem('conversationId', newId);
      }

      // Add welcome message
      const welcomeMsg: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: WELCOME_MESSAGE,
        timestamp: new Date(),
      };
      setChatMessages([welcomeMsg]);

      // Save welcome message to DB
      if (newId) {
        await saveMessage(newId, 'assistant', WELCOME_MESSAGE);
      }
    }

    init();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

  const handleSendMessage = async (text: string, images: string[]) => {
    if (!conversationId) return;

    // Add user message to chat
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      images: images.length > 0 ? images : undefined,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);

    // Save user message to DB
    await saveMessage(conversationId, 'user', text, images.length > 0 ? images : undefined);

    // Build message content for AI
    let messageContent: any;

    if (images.length > 0) {
      // Multimodal message with images
      const parts = [];
      if (text) {
        parts.push({ type: 'text', text });
      }
      images.forEach((image) => {
        parts.push({
          type: 'image',
          image,
        });
      });
      messageContent = parts;
    } else {
      // Text-only message
      messageContent = text;
    }

    // Send to AI
    await append({
      role: 'user',
      content: messageContent,
    });
  };

  return (
    <div className="flex flex-col h-screen bg-cream">
      {/* Header - Glass morphism */}
      <div className="sticky top-0 z-10 bg-cream/92 backdrop-blur-xl border-b border-black/6 px-4 py-3 flex items-center gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] shrink-0">
        <div className="w-12 h-12 bg-gradient-to-br from-coral to-coral-dark rounded-lg flex items-center justify-center text-2xl shadow-[0_4px_12px_rgba(232,97,77,0.3)]">
          👷‍♀️
        </div>
        <div className="flex-1">
          <h1 className="font-display font-black text-charcoal text-lg">Doña Obra</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-jungle rounded-full"></div>
            <p className="text-sm text-jungle font-medium">En línea</p>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}
          className="p-2.5 hover:bg-warm rounded-full transition-colors"
          title="Nueva consulta"
        >
          <RotateCcw className="w-5 h-5 text-muted" />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {chatMessages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="mb-4">
            <TypingIndicator />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <ChatInput onSend={handleSendMessage} disabled={isLoading} initialMessage={initialCategory ? `Necesito ayuda con ${initialCategory}` : undefined} />
    </div>
  );
}
