import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Hero from '@/components/marketing/Hero';
import StatsBar from '@/components/marketing/StatsBar';
import HowItWorks from '@/components/marketing/HowItWorks';
import CategoryGrid from '@/components/marketing/CategoryGrid';
import TrustSection from '@/components/marketing/TrustSection';
import TestimonialSection from '@/components/marketing/TestimonialSection';
import FAQSection from '@/components/marketing/FAQSection';
import CTASection from '@/components/marketing/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    openGraph: {
      title: t('homeOgTitle'),
      description: t('homeOgDescription'),
      locale: locale === 'es' ? 'es_PA' : locale,
      type: 'website',
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
