'use client';

import { Provider, Brief, Estimation } from '@/lib/types';
import ProviderCard from './ProviderCard';

interface ProviderCarouselProps {
  providers: Provider[];
  topPickId?: string;
  brief?: Brief;
  estimation?: Estimation;
  onContactProvider?: (provider: Provider, message: string) => void;
}

export default function ProviderCarousel({ providers, topPickId, brief, estimation, onContactProvider }: ProviderCarouselProps) {
  return (
    <>
      <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide">
        {providers.map((provider) => (
          <div key={provider.id} className="snap-start">
            <ProviderCard
              provider={provider}
              isTopPick={provider.id === topPickId}
              brief={brief}
              estimation={estimation}
              onContactProvider={onContactProvider}
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
