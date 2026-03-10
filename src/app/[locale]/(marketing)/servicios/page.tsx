import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('servicesTitle'),
    description: t('servicesDescription'),
    openGraph: {
      title: t('servicesOgTitle'),
      description: t('servicesOgDescription'),
    },
  };
}

const services = [
  { emoji: '🔧', nameKey: 'plumbing' as const, descKey: 'plumbingDesc' as const, slug: 'plomeria', priceRange: '$30 - $300' },
  { emoji: '⚡', nameKey: 'electrical' as const, descKey: 'electricalDesc' as const, slug: 'electricidad', priceRange: '$40 - $400' },
  { emoji: '🎨', nameKey: 'painting' as const, descKey: 'paintingDesc' as const, slug: 'pintura', priceRange: '$150 - $400/hab.' },
  { emoji: '🧹', nameKey: 'cleaning' as const, descKey: 'cleaningDesc' as const, slug: 'limpieza', priceRange: '$50 - $150' },
  { emoji: '❄️', nameKey: 'ac' as const, descKey: 'acDesc' as const, slug: 'aire-acondicionado', priceRange: '$50 - $500' },
  { emoji: '🔑', nameKey: 'locksmith' as const, descKey: 'locksmithDesc' as const, slug: 'cerrajeria', priceRange: '$25 - $80' },
  { emoji: '🌿', nameKey: 'gardening' as const, descKey: 'gardeningDesc' as const, slug: 'jardineria', priceRange: '$40 - $120' },
  { emoji: '🧱', nameKey: 'masonry' as const, descKey: 'masonryDesc' as const, slug: 'albanileria', priceRange: '$100 - $2,000' },
  { emoji: '🚚', nameKey: 'moving' as const, descKey: 'movingDesc' as const, slug: 'mudanzas', priceRange: '$80 - $300' },
  { emoji: '🔌', nameKey: 'appliances' as const, descKey: 'appliancesDesc' as const, slug: 'electrodomesticos', priceRange: '$40 - $150' },
];

export default async function ServiciosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('services');
  const tc = await getTranslations('categories');
  const tCommon = await getTranslations('common');

  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-charcoal mb-4">
            {t('pageTitle')}
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            {t('pageSubtitle')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/chat?category=${service.slug}`}
              target="_blank"
              className="group bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-black/[0.04] hover:border-coral/20 hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl shrink-0 mt-0.5" role="img" aria-label={tc(service.nameKey)}>
                  {service.emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-lg text-charcoal mb-2 group-hover:text-coral transition-colors">
                    {tc(service.nameKey)}
                  </h2>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {t(service.descKey)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-block bg-sand text-charcoal text-xs font-semibold px-3 py-1.5 rounded-full">
                      {service.priceRange}
                    </span>
                    <span className="text-coral text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {t('consultArrow')}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-jungle rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="font-display text-2xl sm:text-3xl text-white mb-3">
            {t('cantFind')}
          </h2>
          <p className="text-white/70 mb-6 max-w-lg mx-auto">
            {t('cantFindSubtitle')}
          </p>
          <Link
            href="/chat"
            target="_blank"
            className="inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            {tCommon('chatWithDonaObra')}
          </Link>
        </div>
      </section>
    </div>
  );
}
