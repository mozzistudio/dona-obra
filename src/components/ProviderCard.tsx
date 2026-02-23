import { Provider, EstimationData } from '@/lib/types';
import { Star, MapPin, DollarSign } from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
  isTopPick?: boolean;
  estimation?: EstimationData;
  onShareProject?: (provider: Provider) => void;
}

export default function ProviderCard({ provider, isTopPick, estimation, onShareProject }: ProviderCardProps) {
  const handleShareProject = () => {
    if (onShareProject) {
      onShareProject(provider);
    }
  };

  const primaryCategory = provider.categories[0] || '';

  return (
    <div className={`bg-warm rounded-2xl shadow-md overflow-hidden min-w-[260px] max-w-[300px] border-2 transition-all hover:shadow-lg ${
      isTopPick ? 'border-coral hover:border-coral-dark' : 'border-gray-100 hover:border-coral'
    }`}>
      {isTopPick && (
        <div className="bg-gradient-to-r from-coral to-coral-dark text-white text-center py-1 text-xs font-bold">
          ⭐ Top Pick de Doña Obra
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
              Desde ${provider.price_min}
            </span>
          </div>
        )}

        {/* Share Project button */}
        <button
          onClick={handleShareProject}
          className="w-full px-3 py-2 bg-coral text-white rounded-lg hover:bg-coral-dark transition-colors font-medium text-sm flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md"
        >
          📤 Compartir Proyecto
        </button>
      </div>
    </div>
  );
}
