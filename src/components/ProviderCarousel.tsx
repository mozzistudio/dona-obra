'use client';

import { Provider, EstimationData } from '@/lib/types';
import ProviderCard from './ProviderCard';

interface ProviderCarouselProps {
  providers: Provider[];
  topPickId?: string;
  estimation?: EstimationData;
}

export default function ProviderCarousel({ providers, topPickId, estimation }: ProviderCarouselProps) {
  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {providers.map((provider) => (
          <div key={provider.id} className="snap-start">
            <ProviderCard
              provider={provider}
              isTopPick={provider.id === topPickId}
              estimation={estimation}
            />
          </div>
        ))}
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
