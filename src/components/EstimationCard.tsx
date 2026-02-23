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
    <div className="bg-gradient-to-br from-sand to-cream border-2 border-coral/30 rounded-2xl p-5 shadow-[0_4px_16px_rgba(232,97,77,0.12)] max-w-md">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">💰</span>
        <h3 className="font-display font-black text-charcoal text-lg">Estimación de Doña Obra</h3>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <span className="text-sm font-semibold text-muted">Servicio:</span>
          <p className="text-charcoal font-medium">{estimation.service}</p>
        </div>

        <div>
          <span className="text-sm font-semibold text-muted">Rango estimado:</span>
          <p className="text-3xl font-display font-black text-jungle">
            ${estimation.priceRange.min} — ${estimation.priceRange.max}
          </p>
        </div>

        <div>
          <span className="text-sm font-semibold text-muted">Complejidad:</span>
          <p className="text-charcoal">
            {complexityStars[estimation.complexity]} ({estimation.complexity.charAt(0).toUpperCase() + estimation.complexity.slice(1)})
          </p>
        </div>
      </div>

      <div className="bg-white/60 rounded-xl p-4 border border-coral/15">
        <div className="flex items-start gap-2 mb-2">
          <span className="text-lg">📝</span>
          <h4 className="font-semibold text-charcoal">El consejo de Doña Obra:</h4>
        </div>
        <p className="text-sm text-muted leading-relaxed">{estimation.details}</p>
      </div>
    </div>
  );
}
