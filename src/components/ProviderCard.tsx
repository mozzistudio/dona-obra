import { useTranslations } from 'next-intl';
import { Provider, Brief, Estimation } from '@/lib/types';
import { Star, MapPin, DollarSign } from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
  isTopPick?: boolean;
  brief?: Brief;
  estimation?: Estimation;
  onContactProvider?: (provider: Provider, message: string) => void;
}

export function buildContactMessage(providerName: string, brief: Brief, estimation: Estimation): string {
  return `Hola ${providerName}, te contacto a través de Doña Obra 👷‍♀️

📋 *Servicio:* ${brief.category}
📝 *Detalles:* ${brief.problem_summary}
📍 *Ubicación:* ${brief.location}
📅 *Disponibilidad:* ${brief.availability}
💰 *Estimación recibida:* $${estimation.range_low} – $${estimation.range_high}

¿Puedes confirmar disponibilidad y enviarme tu cotización?`;
}

export default function ProviderCard({ provider, isTopPick, brief, estimation, onContactProvider }: ProviderCardProps) {
  const t = useTranslations('provider');

  const handleSolicitar = () => {
    if (!brief || !estimation) return;

    const message = buildContactMessage(provider.name, brief, estimation);

    if (provider.whatsapp) {
      // Open WhatsApp directly with pre-filled project details
      const phoneNumber = provider.whatsapp.replace(/[^0-9]/g, '');
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      // Fallback: pass to parent (sidebar conversation)
      onContactProvider?.(provider, message);
    }
  };

  const primaryCategory = provider.categories[0] || '';

  return (
    <div className={`bg-warm rounded-2xl shadow-md overflow-hidden min-w-[260px] max-w-[300px] border-2 transition-all hover:shadow-lg ${
      isTopPick ? 'border-coral hover:border-coral-dark' : 'border-gray-100 hover:border-coral'
    }`}>
      {isTopPick && (
        <div className="bg-gradient-to-r from-coral to-coral-dark text-white text-center py-1 text-xs font-bold">
          {t('topPick')}
        </div>
      )}

      <div className="p-3 space-y-2">
        {/* Provider info row */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-200">
            <img
              src={provider.avatar_url || '/placeholder-avatar.png'}
              alt={provider.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-sm text-gray-800 truncate">{provider.name}</h3>
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-700">{provider.rating}</span>
              <span className="text-xs text-gray-400">({provider.review_count})</span>
            </div>
          </div>
        </div>

        {/* Details row */}
        <div className="flex items-center gap-3 text-xs text-gray-600 flex-wrap">
          {primaryCategory && (
            <span className="bg-sand text-coral px-2 py-0.5 rounded-full font-medium">
              {primaryCategory.charAt(0).toUpperCase() + primaryCategory.slice(1)}
            </span>
          )}
          {provider.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {provider.location}
            </span>
          )}
        </div>

        {/* Price */}
        {provider.price_min != null && (
          <div className="flex items-center gap-1.5 text-sm">
            <DollarSign className="w-3.5 h-3.5 text-jungle" />
            <span className="font-semibold text-jungle">
              {t('from')} ${provider.price_min}
            </span>
          </div>
        )}

        {/* Solicitar button — opens WhatsApp with structured brief */}
        <button
          onClick={handleSolicitar}
          disabled={!brief || !estimation}
          className="w-full px-3 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#1da851] transition-colors font-medium text-sm flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('request')}
        </button>
      </div>
    </div>
  );
}
