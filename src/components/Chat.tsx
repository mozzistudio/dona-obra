'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useChat } from 'ai/react';
import { useTranslations } from 'next-intl';
import { ChatMessage, Brief, Estimation, ChatBrief, Provider } from '@/lib/types';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { createConversation, saveMessage, getConversationMessages } from '@/lib/conversations';
import { validateAndFetchProviders } from '@/lib/providers';
import { Menu, Search, MoreVertical } from 'lucide-react';
import { Link } from '@/i18n/navigation';

function parseBrief(content: string): { textPart: string; chatBrief: ChatBrief } | null {
  const delimiterIndex = content.indexOf('%%%BRIEF%%%');
  if (delimiterIndex === -1) return null;

  const textPart = content.substring(0, delimiterIndex).trim();
  const jsonPart = content.substring(delimiterIndex + '%%%BRIEF%%%'.length).trim();
  const cleanJson = jsonPart.replace(/```json?\n?/g, '').replace(/```/g, '').trim();

  try {
    const parsed = JSON.parse(cleanJson);
    if (parsed.brief && parsed.estimation) {
      return { textPart, chatBrief: parsed as ChatBrief };
    }
  } catch {
    // Not valid JSON
  }
  return null;
}

interface ChatProps {
  conversationId: string | null;
  onConversationCreated?: (id: string) => void;
  onMessageUpdate?: (conversationId: string, lastMessage: string) => void;
  onTitleUpdate?: (conversationId: string, title: string) => void;
  onToggleSidebar?: () => void;
  onContactProvider?: (provider: Provider, message: string) => void;
  initialCategory?: string | null;
  prefillMessage?: string | null;
  isProviderChat?: boolean;
  userName?: string;
  userAvatar?: string;
}

export default function Chat({
  conversationId: externalConversationId,
  onConversationCreated,
  onMessageUpdate,
  onTitleUpdate,
  onToggleSidebar,
  onContactProvider,
  initialCategory,
  prefillMessage,
  isProviderChat,
  userName,
  userAvatar,
}: ChatProps) {
  const t = useTranslations('chat');
  const tCommon = useTranslations('common');
  const tProgress = useTranslations('progress');

  const [conversationId, setConversationId] = useState<string | null>(externalConversationId);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [lastBrief, setLastBrief] = useState<Brief | null>(null);
  const [lastEstimation, setLastEstimation] = useState<Estimation | null>(null);
  const [briefReceived, setBriefReceived] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const relanceFiredRef = useRef(false);

  const welcomeMessage = t('welcomeMessage');

  const cancelInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  }, []);

  const startInactivityTimer = useCallback(() => {
    if (relanceFiredRef.current || briefReceived) return;
    cancelInactivityTimer();
    inactivityTimerRef.current = setTimeout(() => {
      if (!relanceFiredRef.current) {
        relanceFiredRef.current = true;
        const relanceMsg: ChatMessage = {
          id: `relance-${Date.now()}`,
          role: 'assistant',
          content: t('relanceMessage'),
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, relanceMsg]);
      }
    }, 120000);
  }, [cancelInactivityTimer, briefReceived, t]);

  // Frozen at the moment a message is sent — never changes mid-stream due to re-renders
  const pendingConvIdRef = useRef<string | null>(conversationId);

  const { append, isLoading, setMessages } = useChat({
    api: '/api/chat',
    onFinish: async (message) => {
      startInactivityTimer();

      // Use the conversation ID frozen at send time, not the current render value
      const currentConvId = pendingConvIdRef.current;

      const result = parseBrief(message.content);

      if (result) {
        const { textPart, chatBrief } = result;
        setLastBrief(chatBrief.brief);
        setLastEstimation(chatBrief.estimation);
        setBriefReceived(true);
        cancelInactivityTimer();

        const providers = await validateAndFetchProviders(
          [],
          chatBrief.brief.category
        );

        // Use the bot's formatted Phase 4 text directly — no JSON reconstruction
        const summaryMessage: ChatMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: textPart || chatBrief.brief.problem_summary,
          brief: chatBrief.brief,
          estimation: chatBrief.estimation,
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, summaryMessage]);

        if (providers.length > 0) {
          const providerMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: t('foundProviders', { count: providers.length }),
            providers,
            brief: chatBrief.brief,
            estimation: chatBrief.estimation,
            timestamp: new Date(),
          };
          setChatMessages((prev) => [...prev, providerMessage]);
          if (currentConvId) onMessageUpdate?.(currentConvId, t('foundProviders', { count: providers.length }));
        }
      } else {
        addAssistantMessage(message.content);
        if (currentConvId) onMessageUpdate?.(currentConvId, message.content);
      }
    },
    onError: (error) => {
      console.error('Chat error:', error);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Lo siento, hubo un error. Por favor intenta de nuevo. 😔',
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, errorMsg]);
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

          // Inject DB messages into useChat's internal state for context
          const useChatMessages = dbMessages.map((m) => ({
            id: m.id,
            role: m.role as 'user' | 'assistant',
            content: m.content,
          }));
          setMessages(useChatMessages);

          for (const m of dbMessages) {
            // Check content first (legacy: full %%%BRIEF%%% in content)
            // Then fall back to metadata (new: textPart in content, ChatBrief in metadata)
            const briefResult = parseBrief(m.content);
            const metadataBrief = !briefResult && m.role === 'assistant' && m.metadata &&
              (m.metadata as unknown as ChatBrief).brief && (m.metadata as unknown as ChatBrief).estimation
              ? { textPart: m.content, chatBrief: m.metadata as unknown as ChatBrief }
              : null;
            if ((briefResult || metadataBrief) && m.role === 'assistant') {
              const { textPart, chatBrief } = (briefResult || metadataBrief)!;
              setLastBrief(chatBrief.brief);
              setLastEstimation(chatBrief.estimation);
              setBriefReceived(true);

              const providers = await validateAndFetchProviders(
                [],
                chatBrief.brief.category
              );

              // Use the bot's formatted Phase 4 text directly — no JSON reconstruction
              chatMsgs.push({
                id: m.id,
                role: 'assistant',
                content: textPart || chatBrief.brief.problem_summary,
                brief: chatBrief.brief,
                estimation: chatBrief.estimation,
                timestamp: new Date(m.created_at),
              });

              if (providers.length > 0) {
                chatMsgs.push({
                  id: m.id + '-providers',
                  role: 'assistant',
                  content: t('foundProviders', { count: providers.length }),
                  providers,
                  brief: chatBrief.brief,
                  estimation: chatBrief.estimation,
                  timestamp: new Date(m.created_at),
                });
              }
              continue;
            }

            const legacyDelimIdx = m.content.indexOf('%%%ESTIMATION%%%');
            if (legacyDelimIdx !== -1 && m.role === 'assistant') {
              const textPart = m.content.substring(0, legacyDelimIdx).trim();
              if (textPart) {
                chatMsgs.push({
                  id: m.id,
                  role: 'assistant',
                  content: textPart,
                  timestamp: new Date(m.created_at),
                });
              }
              continue;
            }

            chatMsgs.push({
              id: m.id,
              role: m.role,
              content: m.content,
              images: m.image_urls || undefined,
              timestamp: new Date(m.created_at),
            });
          }

          setChatMessages(chatMsgs);
          setShowWelcomeScreen(false);
          isFirstMessageRef.current = false;
          return;
        }
      }

      // Don't create conversation eagerly — wait for first user message
      setShowWelcomeScreen(true);
    }

    init();
  }, [externalConversationId]);

  // Cleanup inactivity timer on unmount
  useEffect(() => {
    return () => cancelInactivityTimer();
  }, [cancelInactivityTimer]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

  const isFirstMessageRef = useRef(true);

  const handleStartChat = useCallback(() => {
    setShowWelcomeScreen(false);
    const welcomeMsg: ChatMessage = {
      id: 'welcome',
      role: 'assistant',
      content: welcomeMessage,
      timestamp: new Date(),
    };
    setChatMessages([welcomeMsg]);
    // Don't save welcome message to DB yet — conversation may not exist
  }, [welcomeMessage]);

  const handleSendMessage = async (text: string, images: string[]) => {
    if (showWelcomeScreen) {
      handleStartChat();
    }

    cancelInactivityTimer();

    // Lazy conversation creation: create on first message if needed
    let currentConvId = conversationId;
    if (!currentConvId) {
      currentConvId = await createConversation();
      if (!currentConvId) return;
      setConversationId(currentConvId);
      onConversationCreated?.(currentConvId);
      // Save the welcome message now that we have a conversation
      if (!isProviderChat) {
        await saveMessage(currentConvId, 'assistant', welcomeMessage);
      }
    }

    // Freeze the conversation ID for this request — prevents onFinish from using a stale ref
    pendingConvIdRef.current = currentConvId;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      images: images.length > 0 ? images : undefined,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    onMessageUpdate?.(currentConvId, text);

    // Update title from first user message
    if (isFirstMessageRef.current) {
      isFirstMessageRef.current = false;
      const title = text.length > 40 ? text.slice(0, 40) + '...' : text;
      onTitleUpdate?.(currentConvId, title);
    }

    await saveMessage(currentConvId, 'user', text, images.length > 0 ? images : undefined);

    // Provider chat: just save message, no AI call
    if (isProviderChat) return;

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

    await append({ role: 'user', content: messageContent }, { body: { conversationId: currentConvId } });
  };

  const handleContactProvider = useCallback((provider: Provider, message: string) => {
    onContactProvider?.(provider, message);
  }, [onContactProvider]);

  return (
    <div className="flex flex-col flex-1 h-full min-w-0">
      {/* WhatsApp-style Header */}
      <div className="bg-wa-panel-header border-b border-wa-border px-4 py-[10px] flex items-center gap-3 shrink-0">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-wa-hover rounded-full transition-colors md:hidden"
          >
            <Menu className="w-5 h-5 text-wa-text-secondary" />
          </button>
        )}
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={userName || 'Usuario'}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <img
            src="/dona-obra-logo.png"
            alt="Doña Obra"
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="font-normal text-wa-text text-[16px] leading-tight">{userName || 'Doña Obra'}</h1>
          <p className="text-[13px] text-wa-text-secondary leading-tight">{tCommon('online')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="p-2 hover:bg-wa-hover rounded-full transition-colors"
            title={tCommon('goToHome')}
          >
            <Search className="w-5 h-5 text-wa-text-secondary" />
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('conversationId');
              window.location.reload();
            }}
            className="p-2 hover:bg-wa-hover rounded-full transition-colors"
            title={tCommon('moreOptions')}
          >
            <MoreVertical className="w-5 h-5 text-wa-text-secondary" />
          </button>
        </div>
      </div>

      {/* Phase Progress Indicator — hidden in provider chats */}
      {!isProviderChat && !briefReceived && chatMessages.length > 1 && (
        <CollectionProgress messages={chatMessages} briefReceived={briefReceived} />
      )}

      {/* Messages area with WhatsApp wallpaper */}
      <div className="flex-1 overflow-y-auto wa-chat-bg px-3 sm:px-16 py-4">
        {!isProviderChat && showWelcomeScreen && chatMessages.length === 0 ? (
          <WelcomeScreen onStart={handleStartChat} />
        ) : (
          <>
            {chatMessages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message}
                onContactProvider={handleContactProvider}
                showTail={
                  index === 0 ||
                  chatMessages[index - 1]?.role !== message.role
                }
              />
            ))}

            {isLoading && (
              <div className="mb-1">
                <TypingIndicator />
              </div>
            )}
          </>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <ChatInput
        onSend={handleSendMessage}
        disabled={isLoading}
        initialMessage={prefillMessage || (initialCategory ? t('needHelpWith', { category: initialCategory }) : undefined)}
      />
    </div>
  );
}

// Welcome Screen Component
function WelcomeScreen({ onStart }: { onStart: () => void }) {
  const t = useTranslations('chat');

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md">
        <img src="/dona-obra-logo.png" alt="Doña Obra" className="w-20 h-20 rounded-full mx-auto mb-6" />
        <h2 className="text-2xl font-semibold text-wa-text mb-2">
          {t('welcomeTitle')}
        </h2>
        <p className="text-wa-text-secondary text-[15px] mb-6">
          {t('welcomeSubtitle')}
        </p>

        <div className="flex flex-col items-start gap-4 mb-6 text-left">
          <div className="flex items-center gap-3">
            <span className="text-xl">💬</span>
            <span className="text-[14px] text-wa-text">{t('welcomeStep1')}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">💡</span>
            <span className="text-[14px] text-wa-text">{t('welcomeStep2')}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">👷</span>
            <span className="text-[14px] text-wa-text">{t('welcomeStep3')}</span>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-wa-green hover:bg-wa-green-dark text-white py-3 rounded-lg text-[15px] font-medium transition-colors"
        >
          {t('getQuote')}
        </button>
        <p className="text-xs text-wa-text-secondary mt-3">{t('freeInstant')}</p>
      </div>
    </div>
  );
}

// Phase Progress Indicator Component
interface PhaseProgress {
  analysis: boolean;
  diagnostic: boolean;
  summary: boolean;
  providers: boolean;
}

function detectPhaseProgress(messages: ChatMessage[], briefReceived: boolean): PhaseProgress {
  const phases: PhaseProgress = {
    analysis: false,
    diagnostic: false,
    summary: false,
    providers: false,
  };

  const allText = messages
    .filter(m => m.role === 'user')
    .map(m => m.content.toLowerCase())
    .join(' ');

  // Phase 1: Analysis — user described a problem and bot responded
  const hasUserMessage = messages.some(m => m.role === 'user' && m.content.length > 5);
  const hasAssistantResponse = messages.filter(m => m.role === 'assistant').length >= 2;
  if (hasUserMessage && hasAssistantResponse) {
    phases.analysis = true;
  }

  // Phase 2: Diagnostic — at least 2 of {location, property, urgency, availability} detected
  let diagnosticCount = 0;

  const locationPatterns = /bella vista|san francisco|el cangrejo|paitilla|obarrio|marbella|costa del este|casco viejo|condado del rey|el dorado|pueblo nuevo|juan díaz|parque lefevre|betania|río abajo|calidonia|ancón|santa ana|chorrillo|pedregal|tocumen|las cumbres|villa lucre|arraiján|la chorrera|barrio|corregimiento|sector|zona/i;
  if (locationPatterns.test(allText)) diagnosticCount++;

  const propertyPatterns = /\b(casa|apartamento|apto|piso \d|edificio|townhouse|ph|penthouse|local|oficina)\b/i;
  if (propertyPatterns.test(allText)) diagnosticCount++;

  const urgencyPatterns = /\b(urgente|hoy|mañana|esta semana|sin prisa|cuando pueda|lo antes posible|cuanto antes|ya|ahorita|pronto)\b/i;
  if (urgencyPatterns.test(allText)) diagnosticCount++;

  const availabilityPatterns = /\b(mañana|tarde|noche|después de las|antes de las|entre|lunes|martes|miércoles|jueves|viernes|sábado|domingo|am|pm|hora|disponible|libre|cualquier hora|todo el día)\b/i;
  if (availabilityPatterns.test(allText)) diagnosticCount++;

  if (diagnosticCount >= 2) {
    phases.diagnostic = true;
  }

  // Phase 3: Summary — contact info detected (name + phone)
  const contactPatterns = /(\+?507|\+?1)?\s?\d{4}[-\s]?\d{4}|whatsapp|mi (nombre|número|cel|teléfono)|me llamo/i;
  if (contactPatterns.test(allText)) {
    phases.summary = true;
  }

  // Phase 4: Providers — brief received
  phases.providers = briefReceived;

  return phases;
}

function CollectionProgress({ messages, briefReceived }: { messages: ChatMessage[]; briefReceived: boolean }) {
  const t = useTranslations('progress');
  const phases = detectPhaseProgress(messages, briefReceived);

  const phaseConfig = [
    { key: 'analysis' as const, icon: '🔍', label: t('analysis') },
    { key: 'diagnostic' as const, icon: '🔧', label: t('diagnostic') },
    { key: 'summary' as const, icon: '📋', label: t('summary') },
    { key: 'providers' as const, icon: '👷', label: t('providers') },
  ];

  return (
    <div className="bg-wa-panel-header border-b border-wa-border px-3 py-2 shrink-0 overflow-x-auto">
      <div className="flex items-center gap-1.5 min-w-max">
        {phaseConfig.map(({ key, icon, label }) => {
          const completed = phases[key];
          return (
            <div
              key={key}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-500 ${
                completed
                  ? 'bg-wa-green/10 text-wa-green-dark'
                  : 'bg-gray-100 text-gray-400 animate-pulse'
              }`}
            >
              <span>{icon}</span>
              <span className="hidden sm:inline">{label}</span>
              {completed && <span>✅</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
