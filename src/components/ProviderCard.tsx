import { Provider, EstimationData } from '@/lib/types';
import { Star, MapPin, DollarSign, Award, Clock } from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
  isTopPick?: boolean;
  estimation?: EstimationData;
}

export default function ProviderCard({ provider, isTopPick, estimation }: ProviderCardProps) {
  const handleContact = () => {
    // Clear existing conversation
    localStorage.removeItem('conversationId');

    // Get primary category
    const primaryCategory = provider.categories[0] || 'servicio';

    // Redirect to fresh chat with category
    window.location.href = `/?category=${encodeURIComponent(primaryCategory)}`;
  };

  return (
    <div className={`bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden min-w-[320px] max-w-[380px] border-2 transition-all duration-200 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 ${
      isTopPick ? 'border-coral hover:border-coral-dark' : 'border-transparent hover:border-coral'
    }`}>
      {isTopPick && (
        <div className="bg-gradient-to-r from-coral to-coral-dark text-white text-center py-1.5 text-sm font-bold tracking-wide">
          ⭐ Recomendación Top de Doña Obra
        </div>
      )}

      {/* Provider photo */}
      <div className="relative h-40 bg-gradient-to-br from-sand to-warm">
        <img
          src={provider.avatar_url || '/placeholder-avatar.png'}
          alt={provider.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 space-y-3">
        {/* Name and rating */}
        <div>
          <h3 className="font-display font-black text-lg text-charcoal">{provider.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-charcoal">{provider.rating}</span>
            </div>
            <span className="text-sm text-muted">({provider.review_count} reseñas)</span>
          </div>
        </div>

        {/* Location */}
        {provider.location && (
          <div className="flex items-center gap-2 text-muted text-sm">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>Panamá City, {provider.location}</span>
          </div>
        )}

        {/* Price range */}
        {provider.price_min && provider.price_max && (
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-jungle shrink-0" />
            <span className="font-bold text-jungle">
              Desde ${provider.price_min}
            </span>
          </div>
        )}

        {/* Experience */}
        {provider.years_experience && (
          <div className="flex items-center gap-2 text-muted text-sm">
            <Award className="w-4 h-4 text-jungle shrink-0" />
            <span>{provider.years_experience} años de experiencia</span>
          </div>
        )}

        {/* Availability */}
        {provider.availability && (
          <div className="flex items-center gap-2 text-muted text-sm">
            <Clock className="w-4 h-4 text-jungle shrink-0" />
            <span>{provider.availability}</span>
          </div>
        )}

        {/* Description */}
        {provider.description && (
          <p className="text-sm text-muted line-clamp-2 pt-1 border-t border-black/6">
            {provider.description}
          </p>
        )}

        {/* Services tags */}
        {provider.services && provider.services.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {provider.services.slice(0, 3).map((service, idx) => (
              <span
                key={idx}
                className="text-xs bg-jungle/8 text-jungle px-2.5 py-1 rounded-full font-medium"
              >
                {service}
              </span>
            ))}
            {provider.services.length > 3 && (
              <span className="text-xs text-muted py-1">+{provider.services.length - 3} más</span>
            )}
          </div>
        )}

        {/* Doña Obra's comment */}
        {provider.dona_obra_comment && (
          <div className="bg-sand border border-jungle/15 rounded-xl p-3">
            <div className="flex items-start gap-2 mb-1">
              <span className="text-base">👷‍♀️</span>
              <p className="text-xs font-bold text-jungle">Doña Obra dice:</p>
            </div>
            <p className="text-sm text-charcoal/80 leading-relaxed">
              {provider.dona_obra_comment}
            </p>
          </div>
        )}

        {/* Contact button - full width pill */}
        <button
          onClick={handleContact}
          className="w-full px-4 py-3 bg-coral text-white rounded-[100px] hover:bg-coral-dark transition-all font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(232,97,77,0.35)] hover:shadow-[0_12px_36px_rgba(232,97,77,0.45)]"
        >
          📱 Contactar
        </button>
      </div>
    </div>
  );
}
