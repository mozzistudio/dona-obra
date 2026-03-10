import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { MessageCircle } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    openGraph: {
      title: t('aboutOgTitle'),
      description: t('aboutOgDescription'),
    },
  };
}

const values = [
  { icon: '🤝', titleKey: 'trustTitle' as const, descriptionKey: 'trustDescription' as const },
  { icon: '🔍', titleKey: 'transparencyTitle' as const, descriptionKey: 'transparencyDescription' as const },
  { icon: '🏘️', titleKey: 'communityTitle' as const, descriptionKey: 'communityDescription' as const },
];

export default async function SobreNosotrosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');
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

      {/* Brand Story */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-black/[0.04]">
            <h2 className="font-display text-2xl sm:text-3xl text-charcoal mb-6">
              {t('historyTitle')}
            </h2>
            <div className="space-y-4 text-charcoal/80 leading-relaxed">
              <p>{t('historyP1')}</p>
              <p>{t('historyP2')}</p>
              <p>{t('historyP3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Character Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-sand rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/dona-obra-logo.png"
                  alt="Dona Obra - Tu vecina de confianza"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl text-charcoal mb-3">
                {t('characterTitle')}
              </h2>
              <p className="text-charcoal/80 leading-relaxed mb-3">
                {t('characterP1')}
              </p>
              <p className="text-charcoal/80 leading-relaxed">
                {t('characterP2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl text-charcoal text-center mb-10">
            {t('valuesTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.titleKey}
                className="bg-white rounded-2xl p-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-black/[0.04]"
              >
                <span className="text-4xl mb-4 block" role="img" aria-label={t(value.titleKey)}>
                  {value.icon}
                </span>
                <h3 className="font-display text-xl text-charcoal mb-3">
                  {t(value.titleKey)}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {t(value.descriptionKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-jungle rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="font-display text-2xl sm:text-3xl text-white mb-4">
              {t('missionTitle')}
            </h2>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
              {t('missionText')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl text-charcoal mb-3">
            {t('ctaTitle')}
          </h2>
          <p className="text-muted mb-8 max-w-lg mx-auto">
            {t('ctaSubtitle')}
          </p>
          <Link
            href="/chat"
            target="_blank"
            className="inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5" />
            {tCommon('chatWithDonaObra')}
          </Link>
        </div>
      </section>
    </div>
  );
}
