'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useChat } from 'ai/react';
import { ChatMessage, EstimationData, Provider } from '@/lib/types';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { createConversation, saveMessage, getConversationMessages } from '@/lib/conversations';
import { validateAndFetchProviders } from '@/lib/providers';
import { RotateCcw, Menu, Home } from 'lucide-react';
import Link from 'next/link';

const WELCOME_MESSAGE = `¡Ey, dimelo! 👷‍♀️ Soy Doña Obra, tu vecina de confianza pa' todo lo que es reparaciones y servicios del hogar. Yo conozco a todos los buenos maestros de la ciudad 💪

Cuéntame qué necesitas — mándame texto, fotos, lo que sea — y yo te digo cuánto te va a salir y quién te lo puede resolver. ¡Vamos al grano! 🔧`;

interface ChatProps {
  conversationId: string | null;
  onConversationCreated?: (id: string) => void;
  onShareProject?: (provider: Provider, estimation: EstimationData, summary: string) => void;
  onMessageUpdate?: (conversationId: string, lastMessage: string) => void;
  onToggleSidebar?: () => void;
  initialCategory?: string | null;
}

export default function Chat({
  conversationId: externalConversationId,
  onConversationCreated,
  onShareProject,
  onMessageUpdate,
  onToggleSidebar,
  initialCategory,
}: ChatProps) {
  const [conversationId, setConversationId] = useState<string | null>(externalConversationId);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [lastEstimation, setLastEstimation] = useState<EstimationData | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  const { messages, append, isLoading, setMessages } = useChat({
    api: '/api/chat',
    body: { conversationId },
    onFinish: async (message) => {
      const delimiterIndex = message.content.indexOf('%%%ESTIMATION%%%');

      if (delimiterIndex !== -1) {
        const textPart = message.content.substring(0, delimiterIndex).trim();
        const jsonPart = message.content.substring(delimiterIndex + '%%%ESTIMATION%%%'.length).trim();
        const cleanJson = jsonPart.replace(/```json?\n?/g, '').replace(/```/g, '').trim();

        try {
          const estimation: EstimationData = JSON.parse(cleanJson);
          setLastEstimation(estimation);

          const providers = await validateAndFetchProviders(
            estimation.recommendedProviderIds,
            estimation.category
          );

          // Message 1: Summary with estimation details inline
          const intro = textPart || estimation.details;
          const estimationText = `${intro}\n\n🔧 ${estimation.service}\n💰 $${estimation.priceRange.min} — $${estimation.priceRange.max}\n⭐ Complejidad: ${estimation.complexity.charAt(0).toUpperCase() + estimation.complexity.slice(1)}`;
          const summaryMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'assistant',
            content: estimationText,
            timestamp: new Date(),
          };
          setChatMessages((prev) => [...prev, summaryMessage]);

          // Message 2: Provider cards (all in one compact message)
          if (providers.length > 0) {
            const providerMessage: ChatMessage = {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: `Te encontré ${providers.length} profesionales de confianza 💪`,
              providers,
              topPickId: estimation.topPickId,
              timestamp: new Date(),
            };
            setChatMessages((prev) => [...prev, providerMessage]);
            onMessageUpdate?.(conversationId!, `Te encontré ${providers.length} profesionales de confianza`);
          }
        } catch (error) {
          console.error('Error parsing estimation JSON:', error);
          addAssistantMessage(message.content);
        }
      } else {
        // Also handle raw JSON estimation (no delimiter)
        if (message.content.trimStart().startsWith('{')) {
          try {
            const estimation: EstimationData = JSON.parse(message.content);
            if (estimation.type === 'estimation') {
              setLastEstimation(estimation);
              const providers = await validateAndFetchProviders(
                estimation.recommendedProviderIds,
                estimation.category
              );

              const estimationText = `${estimation.details}\n\n🔧 ${estimation.service}\n💰 $${estimation.priceRange.min} — $${estimation.priceRange.max}\n⭐ Complejidad: ${estimation.complexity.charAt(0).toUpperCase() + estimation.complexity.slice(1)}`;
              const summaryMessage: ChatMessage = {
                id: Date.now().toString(),
                role: 'assistant',
                content: estimationText,
                timestamp: new Date(),
              };
              setChatMessages((prev) => [...prev, summaryMessage]);

              if (providers.length > 0) {
                const providerMessage: ChatMessage = {
                  id: (Date.now() + 1).toString(),
                  role: 'assistant',
                  content: `Te encontré ${providers.length} profesionales de confianza 💪`,
                  providers,
                  topPickId: estimation.topPickId,
                  timestamp: new Date(),
                };
                setChatMessages((prev) => [...prev, providerMessage]);
                onMessageUpdate?.(conversationId!, `Te encontré ${providers.length} profesionales de confianza`);
              }
              return;
            }
          } catch {
            // Not JSON, fall through to regular message
          }
        }
        addAssistantMessage(message.content);
        onMessageUpdate?.(conversationId!, message.content);
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
    if (initializedRef.current) return;
    initializedRef.current = true;

    async function init() {
      if (externalConversationId) {
        setConversationId(externalConversationId);
        const dbMessages = await getConversationMessages(externalConversationId);

        if (dbMessages.length > 0) {
          const chatMsgs: ChatMessage[] = [];

          for (const m of dbMessages) {
            // Check if this message contains raw estimation delimiter
            const delimIdx = m.content.indexOf('%%%ESTIMATION%%%');
            if (delimIdx !== -1 && m.role === 'assistant') {
              const textPart = m.content.substring(0, delimIdx).trim();
              const jsonPart = m.content.substring(delimIdx + '%%%ESTIMATION%%%'.length).trim();
              const cleanJson = jsonPart.replace(/```json?\n?/g, '').replace(/```/g, '').trim();

              try {
                const estimation: EstimationData = JSON.parse(cleanJson);
                setLastEstimation(estimation);

                const providers = await validateAndFetchProviders(
                  estimation.recommendedProviderIds,
                  estimation.category
                );

                // Message 1: Summary with estimation details inline
                const intro = textPart || estimation.details;
                const estimationText = `${intro}\n\n🔧 ${estimation.service}\n💰 $${estimation.priceRange.min} — $${estimation.priceRange.max}\n⭐ Complejidad: ${estimation.complexity.charAt(0).toUpperCase() + estimation.complexity.slice(1)}`;
                chatMsgs.push({
                  id: m.id,
                  role: 'assistant',
                  content: estimationText,
                  timestamp: new Date(m.created_at),
                });

                // Message 2: Provider cards
                if (providers.length > 0) {
                  chatMsgs.push({
                    id: m.id + '-providers',
                    role: 'assistant',
                    content: `Te encontré ${providers.length} profesionales de confianza 💪`,
                    providers,
                    topPickId: estimation.topPickId,
                    timestamp: new Date(m.created_at),
                  });
                }
                continue;
              } catch {
                // Fall through to normal message
              }
            }

            // Check if entire content is raw JSON estimation (old format without delimiter)
            if (m.role === 'assistant' && m.content.trimStart().startsWith('{')) {
              try {
                const estimation: EstimationData = JSON.parse(m.content);
                if (estimation.type === 'estimation') {
                  setLastEstimation(estimation);

                  const providers = await validateAndFetchProviders(
                    estimation.recommendedProviderIds,
                    estimation.category
                  );

                  const estimationText2 = `${estimation.details}\n\n🔧 ${estimation.service}\n💰 $${estimation.priceRange.min} — $${estimation.priceRange.max}\n⭐ Complejidad: ${estimation.complexity.charAt(0).toUpperCase() + estimation.complexity.slice(1)}`;
                  chatMsgs.push({
                    id: m.id,
                    role: 'assistant',
                    content: estimationText2,
                    timestamp: new Date(m.created_at),
                  });

                  if (providers.length > 0) {
                    chatMsgs.push({
                      id: m.id + '-providers',
                      role: 'assistant',
                      content: `Te encontré ${providers.length} profesionales de confianza 💪`,
                      providers,
                      topPickId: estimation.topPickId,
                      timestamp: new Date(m.created_at),
                    });
                  }
                  continue;
                }
              } catch {
                // Not valid estimation JSON, fall through
              }
            }

            chatMsgs.push({
              id: m.id,
              role: m.role,
              content: m.content,
              images: m.image_urls || undefined,
              estimation: m.metadata as EstimationData | undefined,
              timestamp: new Date(m.created_at),
            });
          }

          setChatMessages(chatMsgs);
          return;
        }
      }

      // Create new conversation
      const newId = await createConversation();
      if (newId) {
        setConversationId(newId);
        onConversationCreated?.(newId);
      }

      // Add welcome message
      const welcomeMsg: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: WELCOME_MESSAGE,
        timestamp: new Date(),
      };
      setChatMessages([welcomeMsg]);

      if (newId) {
        await saveMessage(newId, 'assistant', WELCOME_MESSAGE);
      }
    }

    init();
  }, [externalConversationId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

  const handleSendMessage = async (text: string, images: string[]) => {
    if (!conversationId) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      images: images.length > 0 ? images : undefined,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    onMessageUpdate?.(conversationId, text);

    await saveMessage(conversationId, 'user', text, images.length > 0 ? images : undefined);

    let messageContent: any;
    if (images.length > 0) {
      const parts = [];
      if (text) {
        parts.push({ type: 'text', text });
      }
      images.forEach((image) => {
        parts.push({ type: 'image', image });
      });
      messageContent = parts;
    } else {
      messageContent = text;
    }

    await append({ role: 'user', content: messageContent });
  };

  const handleShareProject = useCallback((provider: Provider) => {
    if (!onShareProject || !lastEstimation) return;

    // Build summary from conversation messages
    const userMessages = chatMessages
      .filter((m) => m.role === 'user')
      .map((m) => m.content);
    const summary = userMessages.join(' ').slice(0, 300);

    onShareProject(provider, lastEstimation, summary);
  }, [onShareProject, lastEstimation, chatMessages]);

  return (
    <div className="flex flex-col flex-1 h-full bg-cream min-w-0">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-sand px-4 py-3 flex items-center gap-3 shadow-sm shrink-0">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        )}
        <img src="/dona-obra-logo.png" alt="Doña Obra" className="w-10 h-10 rounded-full object-cover shadow-lg" />
        <div className="flex-1">
          <h1 className="font-display font-black text-charcoal text-lg">Doña Obra</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-jungle rounded-full"></div>
            <p className="text-sm text-jungle font-medium">En línea</p>
          </div>
        </div>
        <Link
          href="/"
          className="p-2.5 hover:bg-warm rounded-full transition-colors"
          title="Ir al inicio"
        >
          <Home className="w-5 h-5 text-muted" />
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem('conversationId');
            window.location.reload();
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
          <MessageBubble
            key={message.id}
            message={message}
            onShareProject={handleShareProject}
          />
        ))}

        {isLoading && (
          <div className="mb-4">
            <TypingIndicator />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <ChatInput
        onSend={handleSendMessage}
        disabled={isLoading}
        initialMessage={initialCategory ? `Necesito ayuda con ${initialCategory}` : undefined}
      />
    </div>
  );
}
