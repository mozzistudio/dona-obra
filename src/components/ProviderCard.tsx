import { Provider } from '@/lib/types';
import { Star, MapPin, DollarSign, Tag } from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
  onViewMore: () => void;
  onContact: () => void;
  isTopPick?: boolean;
}

export default function ProviderCard({ provider, onViewMore, onContact, isTopPick }: ProviderCardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-md overflow-hidden min-w-[280px] max-w-[320px] border-2 ${
      isTopPick ? 'border-yellow-400' : 'border-gray-100'
    }`}>
      {isTopPick && (
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-center py-1 text-sm font-bold">
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
            <span className="font-semibold text-green-600">
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
                className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={onViewMore}
            className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            Ver más
          </button>
          <button
            onClick={onContact}
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm flex items-center justify-center gap-1"
          >
            📱 Contactar
          </button>
        </div>
      </div>
    </div>
  );
}
