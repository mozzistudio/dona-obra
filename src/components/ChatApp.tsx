'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { ConversationMeta, Provider } from '@/lib/types';
import {
  getAllConversations,
  getLastMessageForConversations,
  getFirstUserMessageForConversations,
  getConversationsMeta,
  setConversationMeta,
  updateConversationMetaLastMessage,
  deleteEmptyConversations,
  updateConversationTopic,
  mergeDuplicateDonaObraConversations,
  createProviderConversation,
} from '@/lib/conversations';
import { seedSampleConversations } from '@/lib/seed-conversations';
import ConversationSidebar from './ConversationSidebar';
import Chat from './Chat';

const ACTIVE_CONVERSATION_KEY = 'activeConversationId';

export default function ChatApp() {
  const t = useTranslations('chat');
  const [conversations, setConversations] = useState<ConversationMeta[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatKey, setChatKey] = useState(0);
  const [prefillMessage, setPrefillMessage] = useState<string | null>(null);

  // Load conversations on mount
  useEffect(() => {
    async function loadConversations() {
      await deleteEmptyConversations();
      await mergeDuplicateDonaObraConversations();

      let dbConversations = await getAllConversations();

      if (dbConversations.length === 0) {
        const seeded = await seedSampleConversations();
        if (seeded.length > 0) {
          dbConversations = await getAllConversations();
        }
      }

      const meta = getConversationsMeta();

      if (dbConversations.length > 0) {
        const convIds = dbConversations.map((c) => c.id);
        const lastMessages = await getLastMessageForConversations(convIds);

        // Find conversations that need a title (no topic, no user_name)
        const needsTitleIds = dbConversations
          .filter((c) => !c.topic && !c.user_name && !meta[c.id]?.topic)
          .map((c) => c.id);
        const firstUserMessages = await getFirstUserMessageForConversations(needsTitleIds);

        // Retroactively set topics in DB for conversations missing them
        for (const [convId, msg] of Object.entries(firstUserMessages)) {
          const title = msg.content.slice(0, 50);
          updateConversationTopic(convId, title);
        }

        const merged: ConversationMeta[] = dbConversations.map((conv) => {
          const existing = meta[conv.id];
          const lastMsg = lastMessages[conv.id];
          const firstUserMsg = firstUserMessages[conv.id];

          // Title = recipient name (who you're chatting with)
          const title = conv.user_name || existing?.userName || 'Doña Obra';

          return {
            id: conv.id,
            type: existing?.type || 'dona_obra',
            title,
            lastMessage: lastMsg?.content?.slice(0, 80) || existing?.lastMessage || '',
            lastMessageAt: conv.last_message_at || conv.started_at,
            userName: conv.user_name || existing?.userName,
            userAvatar: conv.user_avatar || existing?.userAvatar,
            topic: conv.topic || firstUserMsg?.content?.slice(0, 50) || existing?.topic,
            providerName: existing?.providerName,
            providerId: existing?.providerId,
            providerAvatar: existing?.providerAvatar,
          };
        });

        setConversations(merged);
        merged.forEach((m) => setConversationMeta(m));

        const savedActiveId = localStorage.getItem(ACTIVE_CONVERSATION_KEY);
        if (savedActiveId && dbConversations.some((c) => c.id === savedActiveId)) {
          setActiveConversationId(savedActiveId);
        } else {
          setActiveConversationId(dbConversations[0].id);
          localStorage.setItem(ACTIVE_CONVERSATION_KEY, dbConversations[0].id);
        }
      }

      setLoaded(true);
    }

    loadConversations();
  }, []);

  const handleSelectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
    localStorage.setItem(ACTIVE_CONVERSATION_KEY, id);
    setChatKey((k) => k + 1);
    setSidebarOpen(false);
  }, []);

  const handleNewConversation = useCallback(() => {
    // Find existing Doña Obra conversation (no userName = bot conversation)
    const donaObraConv = conversations.find((c) => !c.userName);
    if (donaObraConv) {
      setActiveConversationId(donaObraConv.id);
      localStorage.setItem(ACTIVE_CONVERSATION_KEY, donaObraConv.id);
    } else {
      // No existing Doña Obra conversation — let Chat create one on first message
      setActiveConversationId(null);
      localStorage.removeItem(ACTIVE_CONVERSATION_KEY);
    }
    setChatKey((k) => k + 1);
    setSidebarOpen(false);
  }, [conversations]);

  const handleConversationCreated = useCallback((id: string) => {
    setActiveConversationId(id);
    localStorage.setItem(ACTIVE_CONVERSATION_KEY, id);

    const meta: ConversationMeta = {
      id,
      type: 'dona_obra',
      title: 'Doña Obra',
      lastMessage: t('newConversationPreview'),
      lastMessageAt: new Date().toISOString(),
    };

    setConversationMeta(meta);
    setConversations((prev) => [meta, ...prev]);
  }, [t]);

  const handleMessageUpdate = useCallback((convId: string, lastMessage: string) => {
    updateConversationMetaLastMessage(convId, lastMessage);
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId
          ? { ...c, lastMessage: lastMessage.slice(0, 80), lastMessageAt: new Date().toISOString() }
          : c
      ).sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime())
    );
  }, []);

  const handleTitleUpdate = useCallback((convId: string, topic: string) => {
    updateConversationTopic(convId, topic);
    const allMeta = getConversationsMeta();
    if (allMeta[convId]) {
      allMeta[convId].topic = topic;
      setConversationMeta(allMeta[convId]);
    }
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, topic } : c))
    );
  }, []);

  const handleContactProvider = useCallback(async (provider: Provider, message: string) => {
    // Check for existing provider conversation
    const existingConv = conversations.find(
      (c) => c.type === 'provider' && c.providerId === provider.id
    );

    if (existingConv) {
      setActiveConversationId(existingConv.id);
      localStorage.setItem(ACTIVE_CONVERSATION_KEY, existingConv.id);
      setPrefillMessage(message);
      setChatKey((k) => k + 1);
      setSidebarOpen(false);
      return;
    }

    // Create new provider conversation in DB
    const newId = await createProviderConversation(
      provider.name,
      provider.avatar_url || null
    );
    if (!newId) return;

    // Create ConversationMeta and add to state
    const meta: ConversationMeta = {
      id: newId,
      type: 'provider',
      title: provider.name,
      lastMessage: '',
      lastMessageAt: new Date().toISOString(),
      userName: provider.name,
      userAvatar: provider.avatar_url || undefined,
      providerName: provider.name,
      providerId: provider.id,
      providerAvatar: provider.avatar_url || undefined,
    };
    setConversationMeta(meta);
    setConversations((prev) => [meta, ...prev]);

    // Switch to the new conversation
    setActiveConversationId(newId);
    localStorage.setItem(ACTIVE_CONVERSATION_KEY, newId);
    setPrefillMessage(message);
    setChatKey((k) => k + 1);
    setSidebarOpen(false);
  }, [conversations]);

  if (!loaded) {
    return (
      <div className="flex h-screen w-full bg-wa-bg items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <img src="/dona-obra-logo.png" alt="Doña Obra" className="w-12 h-12 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-wa-bg overflow-hidden">
      <ConversationSidebar
        conversations={conversations}
        activeId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <Chat
        key={chatKey}
        conversationId={activeConversationId}
        onConversationCreated={handleConversationCreated}
        onMessageUpdate={handleMessageUpdate}
        onTitleUpdate={handleTitleUpdate}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onContactProvider={handleContactProvider}
        prefillMessage={prefillMessage}
        isProviderChat={conversations.find((c) => c.id === activeConversationId)?.type === 'provider'}
        userName={conversations.find((c) => c.id === activeConversationId)?.userName}
        userAvatar={conversations.find((c) => c.id === activeConversationId)?.userAvatar}
      />
    </div>
  );
}
