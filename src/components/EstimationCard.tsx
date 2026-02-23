import { EstimationData } from '@/lib/types';

interface EstimationCardProps {
  estimation: EstimationData;
}

export default function EstimationCard({ estimation }: EstimationCardProps) {
  const complexityStars = {
    baja: '⭐',
    media: '⭐⭐',
    alta: '⭐⭐⭐',
  };

  return (
    <div className="bg-gradient-to-br from-sand to-cream border-2 border-coral/30 rounded-2xl p-4 shadow-md max-w-md">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">💰</span>
        <h3 className="font-bold text-gray-800 text-lg">Estimación de Doña Obra</h3>
      </div>

      <div className="space-y-2 mb-4">
        <div>
          <span className="text-sm font-semibold text-gray-600">Servicio:</span>
          <p className="text-gray-800">{estimation.service}</p>
        </div>

        <div>
          <span className="text-sm font-semibold text-gray-600">Rango estimado:</span>
          <p className="text-3xl font-display font-black text-jungle">
            ${estimation.priceRange.min} — ${estimation.priceRange.max}
          </p>
        </div>

        <div>
          <span className="text-sm font-semibold text-gray-600">Complejidad:</span>
          <p className="text-gray-800">
            {complexityStars[estimation.complexity]} ({estimation.complexity.charAt(0).toUpperCase() + estimation.complexity.slice(1)})
          </p>
        </div>
      </div>

      <div className="bg-white/50 rounded-lg p-3 border border-coral/20">
        <div className="flex items-start gap-2 mb-2">
          <span className="text-lg">📝</span>
          <h4 className="font-semibold text-gray-700">El consejo de Doña Obra:</h4>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{estimation.details}</p>
      </div>
    </div>
  );
}
