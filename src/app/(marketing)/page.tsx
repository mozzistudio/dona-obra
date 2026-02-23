import type { Metadata } from 'next';
import Hero from '@/components/marketing/Hero';
import StatsBar from '@/components/marketing/StatsBar';
import HowItWorks from '@/components/marketing/HowItWorks';
import CategoryGrid from '@/components/marketing/CategoryGrid';
import TrustSection from '@/components/marketing/TrustSection';
import TestimonialSection from '@/components/marketing/TestimonialSection';
import FAQSection from '@/components/marketing/FAQSection';
import CTASection from '@/components/marketing/CTASection';

export const metadata: Metadata = {
  title: 'Doña Obra - Servicios del Hogar en Panamá',
  description:
    'Encuentra plomeros, electricistas, pintores y más profesionales verificados en Panamá. Estimaciones al instante con Doña Obra, tu vecina de confianza.',
  openGraph: {
    title: 'Doña Obra - Tu vecina de confianza',
    description:
      'Conecta con profesionales verificados en Panamá. Estimaciones al instante, precios justos.',
    locale: 'es_PA',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <HowItWorks />
      <CategoryGrid />
      <TrustSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
