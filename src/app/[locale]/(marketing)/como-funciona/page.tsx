import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { MessageCircle } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('howItWorksTitle'),
    description: t('howItWorksDescription'),
    openGraph: {
      title: t('howItWorksOgTitle'),
      description: t('howItWorksOgDescription'),
    },
  };
}

const steps = [
  {
    number: 1,
    titleKey: 'step1Title' as const,
    subtitleKey: 'step1Subtitle' as const,
    descriptionKey: 'step1Description' as const,
    featureKeys: ['step1Feature1', 'step1Feature2', 'step1Feature3', 'step1Feature4'] as const,
  },
  {
    number: 2,
    titleKey: 'step2Title' as const,
    subtitleKey: 'step2Subtitle' as const,
    descriptionKey: 'step2Description' as const,
    featureKeys: ['step2Feature1', 'step2Feature2', 'step2Feature3', 'step2Feature4'] as const,
  },
  {
    number: 3,
    titleKey: 'step3Title' as const,
    subtitleKey: 'step3Subtitle' as const,
    descriptionKey: 'step3Description' as const,
    featureKeys: ['step3Feature1', 'step3Feature2', 'step3Feature3', 'step3Feature4'] as const,
  },
];

export default async function ComoFuncionaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('howItWorksPage');
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

      {/* Steps */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-[2.25rem] top-[4.5rem] bottom-0 w-px bg-gradient-to-b from-coral/30 to-coral/10" />
              )}

              <div
                className={`flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Number + Title side */}
                <div className="lg:w-1/2">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-[4.5rem] h-[4.5rem] rounded-2xl bg-coral text-white flex items-center justify-center font-display text-2xl shadow-lg shadow-coral/20">
                      {step.number}
                    </div>
                    <div>
                      <p className="text-coral text-sm font-semibold uppercase tracking-wider mb-1">
                        {tCommon('step')} {step.number}
                      </p>
                      <h2 className="font-display text-2xl sm:text-3xl text-charcoal">
                        {t(step.titleKey)}
                      </h2>
                    </div>
                  </div>
                  <p className="text-muted leading-relaxed pl-0 lg:pl-[5.5rem]">
                    {t(step.descriptionKey)}
                  </p>
                </div>

                {/* Features side */}
                <div className="lg:w-1/2">
                  <div className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-black/[0.04]">
                    <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
                      {t(step.subtitleKey)}
                    </h3>
                    <ul className="space-y-3">
                      {step.featureKeys.map((featureKey, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-jungle/10 text-jungle flex items-center justify-center mt-0.5">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                          <span className="text-sm text-charcoal/80 leading-relaxed">
                            {t(featureKey)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-coral to-coral-dark rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="font-display text-2xl sm:text-3xl text-white mb-3">
            {t('ctaTitle')}
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            {t('ctaSubtitle')}
          </p>
          <Link
            href="/chat"
            target="_blank"
            className="inline-flex items-center gap-2 bg-white text-coral hover:text-coral-dark px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5" />
            {tCommon('chatWithDonaObra')}
          </Link>
        </div>
      </section>
    </div>
  );
}
