'use client';

import { useState } from 'react';
import { Provider } from '@/lib/types';
import ProviderCard from './ProviderCard';
import ProviderModal from './ProviderModal';
import ContactModal from './ContactModal';

interface ProviderCarouselProps {
  providers: Provider[];
  topPickId?: string;
}

export default function ProviderCarousel({ providers, topPickId }: ProviderCarouselProps) {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [contactProvider, setContactProvider] = useState<Provider | null>(null);

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {providers.map((provider) => (
          <div key={provider.id} className="snap-start">
            <ProviderCard
              provider={provider}
              isTopPick={provider.id === topPickId}
              onViewMore={() => setSelectedProvider(provider)}
              onContact={() => setContactProvider(provider)}
            />
          </div>
        ))}
      </div>

      {selectedProvider && (
        <ProviderModal
          provider={selectedProvider}
          onClose={() => setSelectedProvider(null)}
          onContact={() => {
            setContactProvider(selectedProvider);
            setSelectedProvider(null);
          }}
        />
      )}

      {contactProvider && (
        <ContactModal
          provider={contactProvider}
          onClose={() => setContactProvider(null)}
        />
      )}

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
