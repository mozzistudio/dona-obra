'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from 'ai/react';
import { ChatMessage, EstimationData, Provider } from '@/lib/types';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import ProviderCarousel from './ProviderCarousel';
import { createConversation, saveMessage, getConversationMessages } from '@/lib/conversations';
import { getProvidersByIds } from '@/lib/providers';

const WELCOME_MESSAGE = `¡Ey, dimelo! 👷‍♀️ Soy Doña Obra, tu vecina de confianza pa' todo lo que es reparaciones y servicios del hogar. Yo conozco a todos los buenos maestros de la ciudad 💪

Cuéntame qué necesitas — mándame texto, fotos, lo que sea — y yo te digo cuánto te va a salir y quién te lo puede resolver. ¡Vamos al grano! 🔧`;

export default function Chat() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [recommendedProviders, setRecommendedProviders] = useState<{
    providers: Provider[];
    topPickId?: string;
    topPickComment?: string;
    estimationData?: EstimationData;
  } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, append, isLoading, setMessages } = useChat({
    api: '/api/chat',
    body: { conversationId },
    onFinish: async (message) => {
      // Try to parse as estimation JSON
      try {
        const parsed = JSON.parse(message.content);
        if (parsed.type === 'estimation') {
          // This is an estimation response
          const estimation: EstimationData = parsed;

          // Add text before the card
          const textBeforeCard = `Mira, te voy a ser honesta contigo. ${estimation.details}`;

          const estimationMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'assistant',
            content: textBeforeCard,
            estimation,
            timestamp: new Date(),
          };

          setChatMessages((prev) => [...prev, estimationMessage]);

          // Load recommended providers
          const providers = await getProvidersByIds(estimation.recommendedProviderIds);
          setRecommendedProviders({
            providers,
            topPickId: estimation.topPickId,
            topPickComment: estimation.topPickComment,
            estimationData: estimation,
          });

          // Add Doña Obra's comment about providers after
          setTimeout(() => {
            const topPick = providers.find((p) => p.id === estimation.topPickId);
            const followUpMessage: ChatMessage = {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: `Tranqui que yo te consigo a alguien de confianza 💪 Mira, estos son los que yo te recomiendo:\n\n${estimation.topPickComment}`,
              timestamp: new Date(),
            };
            setChatMessages((prev) => [...prev, followUpMessage]);

            // Final follow-up
            setTimeout(() => {
              const finalMessage: ChatMessage = {
                id: (Date.now() + 2).toString(),
                role: 'assistant',
                content: '¿Eso es to\' o necesitas algo más? Aquí estoy pa\' lo que sea 🏠',
                timestamp: new Date(),
              };
              setChatMessages((prev) => [...prev, finalMessage]);
            }, 1000);
          }, 500);
        } else {
          // Regular message
          addAssistantMessage(message.content);
        }
      } catch {
        // Not JSON, regular message
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

          // Reconstruct AI chat messages for context
          const aiMessages = messages.map((m) => ({
            id: m.id,
            role: m.role,
            content: m.content,
          }));
          setMessages(aiMessages);
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
    const messageContent = [];

    if (text) {
      messageContent.push({ type: 'text', text });
    }

    // Add images if any
    if (images.length > 0) {
      images.forEach((image) => {
        messageContent.push({
          type: 'image',
          image,
        });
      });
    }

    // Send to AI
    await append({
      role: 'user',
      content: messageContent as any,
    });
  };

  return (
    <div className="flex flex-col h-screen bg-[#ECE5DD]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shadow-sm">
        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
          👷‍♀️
        </div>
        <div className="flex-1">
          <h1 className="font-bold text-gray-800">Doña Obra</h1>
          <p className="text-sm text-green-500 font-medium">en línea</p>
        </div>
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

        {/* Provider recommendations */}
        {recommendedProviders && (
          <div className="mb-4">
            <ProviderCarousel
              providers={recommendedProviders.providers}
              topPickId={recommendedProviders.topPickId}
            />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <ChatInput onSend={handleSendMessage} disabled={isLoading} />
    </div>
  );
}
