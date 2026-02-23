import { ChatMessage } from '@/lib/types';
import ImagePreview from './ImagePreview';
import EstimationCard from './EstimationCard';
import ProviderCarousel from './ProviderCarousel';

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[85%] md:max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
        {!isUser && (
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-8 h-8 bg-gradient-to-br from-coral to-coral-dark rounded-lg flex items-center justify-center text-base shadow-sm">
              👷‍♀️
            </div>
            <span className="text-sm font-semibold text-charcoal">Doña Obra</span>
          </div>
        )}

        <div
          className={`px-4 py-3 ${
            isUser
              ? 'bg-coral text-white rounded-[18px_18px_4px_18px] shadow-[0_2px_8px_rgba(232,97,77,0.25)]'
              : 'bg-white text-charcoal rounded-[18px_18px_18px_4px] shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
          }`}
        >
          {message.images && message.images.length > 0 && (
            <div className="mb-2">
              <ImagePreview images={message.images} size="small" />
            </div>
          )}

          {message.content && (
            <p className={`whitespace-pre-wrap leading-relaxed ${isUser ? 'text-white' : 'text-charcoal'}`}>
              {message.content}
            </p>
          )}
        </div>

        {message.estimation && (
          <div className="mt-3">
            <EstimationCard estimation={message.estimation} />
          </div>
        )}

        {message.providers && message.providers.length > 0 && (
          <div className="mt-3">
            <ProviderCarousel
              providers={message.providers}
              topPickId={message.topPickId}
              estimation={message.estimation}
            />
          </div>
        )}

        <p className="text-xs text-muted mt-1.5 px-2">
          {message.timestamp.toLocaleTimeString('es-PA', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}
