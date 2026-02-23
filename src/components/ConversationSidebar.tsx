'use client';

import { ConversationMeta } from '@/lib/types';
import { MessageSquarePlus, X } from 'lucide-react';

interface ConversationSidebarProps {
  conversations: ConversationMeta[];
  activeId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString('es-PA', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) {
    return date.toLocaleDateString('es-PA', { weekday: 'short' });
  }
  return date.toLocaleDateString('es-PA', {
    day: '2-digit',
    month: '2-digit',
  });
}

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen) + '...';
}

export default function ConversationSidebar({
  conversations,
  activeId,
  onSelectConversation,
  onNewConversation,
  isOpen,
  onToggle,
}: ConversationSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:relative z-40 md:z-auto
          h-full bg-white border-r border-sand
          flex flex-col
          transition-all duration-300 ease-in-out
          md:w-80 md:translate-x-0 md:shrink-0
          ${isOpen ? 'w-80 translate-x-0' : 'w-0 -translate-x-full'}
          overflow-hidden
        `}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-sand bg-white shrink-0">
          <h2 className="font-bold text-gray-800 text-lg">Conversaciones</h2>
          <div className="flex items-center gap-1">
            <button
              onClick={onNewConversation}
              className="p-2 hover:bg-warm rounded-full transition-colors"
              title="Nueva conversación"
            >
              <MessageSquarePlus className="w-5 h-5 text-coral" />
            </button>
            <button
              onClick={onToggle}
              className="p-2 hover:bg-warm rounded-full transition-colors md:hidden"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 && (
            <div className="p-6 text-center text-muted text-sm">
              No hay conversaciones aún
            </div>
          )}

          {conversations.map((conv) => {
            const isActive = conv.id === activeId;
            const isProvider = conv.type === 'provider';

            return (
              <button
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={`
                  w-full text-left px-4 py-3 flex items-center gap-3
                  border-b border-sand/50 transition-colors
                  ${isActive ? 'bg-sand' : 'hover:bg-warm/50'}
                `}
              >
                {/* Avatar */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0 shadow-sm ${
                  isProvider ? 'bg-jungle/10' : 'bg-coral/10'
                }`}>
                  {isProvider ? (
                    conv.providerAvatar ? (
                      <img
                        src={conv.providerAvatar}
                        alt={conv.providerName || ''}
                        className="w-11 h-11 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-lg">🔧</span>
                    )
                  ) : (
                    <img src="/dona-obra-logo.png" alt="Doña Obra" className="w-8 h-8 rounded-full object-cover" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-semibold text-sm truncate ${
                      isActive ? 'text-coral' : 'text-gray-800'
                    }`}>
                      {conv.title}
                    </span>
                    <span className="text-xs text-muted shrink-0">
                      {formatTime(conv.lastMessageAt)}
                    </span>
                  </div>
                  <p className="text-xs text-muted truncate mt-0.5">
                    {truncate(conv.lastMessage, 45)}
                  </p>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="w-2 h-2 bg-coral rounded-full shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile toggle button (when sidebar is closed) - uses hamburger in chat header */}
    </>
  );
}
