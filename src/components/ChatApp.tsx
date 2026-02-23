'use client';

import { useState, useEffect, useCallback } from 'react';
import { ConversationMeta, Provider, EstimationData } from '@/lib/types';
import {
  createConversation,
  saveMessage,
  getAllConversations,
  getLastMessageForConversations,
  getConversationsMeta,
  setConversationMeta,
  updateConversationMetaLastMessage,
} from '@/lib/conversations';
import ConversationSidebar from './ConversationSidebar';
import Chat from './Chat';

const ACTIVE_CONVERSATION_KEY = 'activeConversationId';

export default function ChatApp() {
  const [conversations, setConversations] = useState<ConversationMeta[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatKey, setChatKey] = useState(0); // Force re-mount on conversation switch

  // Load conversations on mount
  useEffect(() => {
    async function loadConversations() {
      // Load metadata from localStorage
      const meta = getConversationsMeta();

      // Load conversations from Supabase
      const dbConversations = await getAllConversations();

      if (dbConversations.length > 0) {
        // Get last messages for all conversations
        const lastMessages = await getLastMessageForConversations(
          dbConversations.map((c) => c.id)
        );

        // Merge DB data with local metadata
        const merged: ConversationMeta[] = dbConversations.map((conv) => {
          const existing = meta[conv.id];
          const lastMsg = lastMessages[conv.id];

          return {
            id: conv.id,
            type: existing?.type || 'dona_obra',
            title: existing?.title || 'Doña Obra',
            lastMessage: lastMsg?.content?.slice(0, 80) || existing?.lastMessage || '',
            lastMessageAt: conv.last_message_at || conv.started_at,
            providerName: existing?.providerName,
            providerId: existing?.providerId,
            providerAvatar: existing?.providerAvatar,
          };
        });

        setConversations(merged);

        // Save merged data back to localStorage
        merged.forEach((m) => setConversationMeta(m));
      }

      // Restore active conversation
      const savedActiveId = localStorage.getItem(ACTIVE_CONVERSATION_KEY);
      if (savedActiveId && dbConversations.some((c) => c.id === savedActiveId)) {
        setActiveConversationId(savedActiveId);
      } else if (dbConversations.length > 0) {
        // Default to most recent
        setActiveConversationId(dbConversations[0].id);
        localStorage.setItem(ACTIVE_CONVERSATION_KEY, dbConversations[0].id);
      }
      // If no conversations exist, activeConversationId stays null and Chat will create one
    }

    loadConversations();
  }, []);

  const handleSelectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
    localStorage.setItem(ACTIVE_CONVERSATION_KEY, id);
    setChatKey((k) => k + 1); // Force Chat re-mount
    setSidebarOpen(false); // Close sidebar on mobile
  }, []);

  const handleNewConversation = useCallback(() => {
    // Set active to null so Chat creates a new one
    setActiveConversationId(null);
    localStorage.removeItem(ACTIVE_CONVERSATION_KEY);
    setChatKey((k) => k + 1);
    setSidebarOpen(false);
  }, []);

  const handleConversationCreated = useCallback((id: string) => {
    setActiveConversationId(id);
    localStorage.setItem(ACTIVE_CONVERSATION_KEY, id);

    const meta: ConversationMeta = {
      id,
      type: 'dona_obra',
      title: 'Doña Obra',
      lastMessage: '¡Ey, dimelo! Soy Doña Obra...',
      lastMessageAt: new Date().toISOString(),
    };

    setConversationMeta(meta);
    setConversations((prev) => [meta, ...prev]);
  }, []);

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

  const handleShareProject = useCallback(async (
    provider: Provider,
    estimation: EstimationData,
    summary: string
  ) => {
    // Create a new conversation for this provider
    const newConvId = await createConversation();
    if (!newConvId) return;

    // Build the auto-message
    const autoMessage = `¡Hola ${provider.name}! 👋\n\nTengo un proyecto de ${estimation.service} que me gustaría compartir contigo.\n\n📋 Descripción: ${summary || estimation.details}\n💰 Presupuesto estimado: $${estimation.priceRange.min} — $${estimation.priceRange.max}\n📊 Complejidad: ${estimation.complexity}\n\n¿Me podrías dar más detalles sobre disponibilidad y precio final?`;

    // Save the auto-message
    await saveMessage(newConvId, 'user', autoMessage);

    // Save conversation metadata
    const meta: ConversationMeta = {
      id: newConvId,
      type: 'provider',
      title: provider.name,
      lastMessage: autoMessage.slice(0, 80),
      lastMessageAt: new Date().toISOString(),
      providerName: provider.name,
      providerId: provider.id,
      providerAvatar: provider.avatar_url || undefined,
    };

    setConversationMeta(meta);
    setConversations((prev) => [meta, ...prev]);

    // Switch to the new conversation
    setActiveConversationId(newConvId);
    localStorage.setItem(ACTIVE_CONVERSATION_KEY, newConvId);
    setChatKey((k) => k + 1);
    setSidebarOpen(false);
  }, []);

  return (
    <div className="flex h-screen w-full bg-cream overflow-hidden">
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
        onShareProject={handleShareProject}
        onMessageUpdate={handleMessageUpdate}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
    </div>
  );
}
