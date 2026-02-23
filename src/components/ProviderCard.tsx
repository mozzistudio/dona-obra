import { Provider, EstimationData } from '@/lib/types';
import { Star, MapPin, DollarSign, Tag, Award, Clock } from 'lucide-react';

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
    window.location.href = `/chat?category=${encodeURIComponent(primaryCategory)}`;
  };

  return (
    <div className={`bg-warm rounded-2xl shadow-md overflow-hidden min-w-[320px] max-w-[380px] border-2 transition-all hover:shadow-xl ${
      isTopPick ? 'border-coral hover:border-coral-dark' : 'border-gray-100 hover:border-coral'
    }`}>
      {isTopPick && (
        <div className="bg-gradient-to-r from-coral to-coral-dark text-white text-center py-1 text-sm font-bold">
          ⭐ Recomendación Top de Doña Obra
        </div>
      )}

      {/* Provider photo */}
      <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={provider.avatar_url || '/placeholder-avatar.png'}
          alt={provider.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 space-y-3">
        {/* Name and rating */}
        <div>
          <h3 className="font-bold text-lg text-gray-800">{provider.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-700">{provider.rating}</span>
            </div>
            <span className="text-sm text-gray-500">({provider.review_count} reseñas)</span>
          </div>
        </div>

        {/* Location */}
        {provider.location && (
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Panamá City, {provider.location}</span>
          </div>
        )}

        {/* Price range */}
        {provider.price_min && provider.price_max && (
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <DollarSign className="w-4 h-4" />
            <span className="font-semibold text-jungle">
              Desde ${provider.price_min}
            </span>
          </div>
        )}

        {/* Categories */}
        <div className="flex items-center gap-2 flex-wrap">
          <Tag className="w-4 h-4 text-gray-400" />
          <div className="flex gap-2 flex-wrap">
            {provider.categories.slice(0, 2).map((cat, idx) => (
              <span
                key={idx}
                className="text-xs bg-sand text-coral px-2 py-1 rounded-full"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        {provider.description && (
          <div className="pt-2 border-t border-sand">
            <p className="text-sm text-gray-700 line-clamp-2">
              {provider.description}
            </p>
          </div>
        )}

        {/* Experience */}
        {provider.years_experience && (
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Award className="w-4 h-4 text-jungle" />
            <span>{provider.years_experience} años de experiencia</span>
          </div>
        )}

        {/* Availability */}
        {provider.availability && (
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Clock className="w-4 h-4 text-jungle" />
            <span>{provider.availability}</span>
          </div>
        )}

        {/* Services */}
        {provider.services && provider.services.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-600">Servicios:</p>
            <div className="flex gap-2 flex-wrap">
              {provider.services.slice(0, 3).map((service, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-sand text-coral px-2 py-1 rounded-full"
                >
                  {service}
                </span>
              ))}
              {provider.services.length > 3 && (
                <span className="text-xs text-muted">+{provider.services.length - 3} más</span>
              )}
            </div>
          </div>
        )}

        {/* Doña Obra's comment */}
        {provider.dona_obra_comment && (
          <div className="bg-sand border border-coral/30 rounded-lg p-3">
            <div className="flex items-start gap-2 mb-1">
              <span className="text-lg">👷‍♀️</span>
              <p className="text-xs font-semibold text-coral">Doña Obra dice:</p>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {provider.dona_obra_comment}
            </p>
          </div>
        )}

        {/* Contact button */}
        <button
          onClick={handleContact}
          className="w-full px-4 py-2 bg-coral text-white rounded-lg hover:bg-coral-dark transition-colors font-medium text-sm flex items-center justify-center gap-1 shadow-md hover:shadow-lg"
        >
          📱 Contactar
        </button>
      </div>
    </div>
  );
}
