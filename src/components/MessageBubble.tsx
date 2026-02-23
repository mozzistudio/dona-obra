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
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">👷‍♀️</span>
            <span className="text-sm font-semibold text-gray-600">Doña Obra</span>
          </div>
        )}

        <div
          className={`rounded-2xl px-4 py-3 shadow-sm ${
            isUser
              ? 'bg-coral text-white rounded-br-sm'
              : 'bg-white rounded-bl-sm'
          }`}
        >
          {message.images && message.images.length > 0 && (
            <div className="mb-2">
              <ImagePreview images={message.images} size="small" />
            </div>
          )}

          {message.content && (
            <p className={`whitespace-pre-wrap leading-relaxed ${isUser ? 'text-white' : 'text-gray-800'}`}>
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

        <p className="text-xs text-gray-400 mt-1 px-2">
          {message.timestamp.toLocaleTimeString('es-PA', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}
