import { MessageCircle, Zap, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

const steps = [
  {
    icon: MessageCircle,
    titleKey: 'step1Title',
    descriptionKey: 'step1Description',
  },
  {
    icon: Zap,
    titleKey: 'step2Title',
    descriptionKey: 'step2Description',
  },
  {
    icon: Star,
    titleKey: 'step3Title',
    descriptionKey: 'step3Description',
  },
];

export default function HowItWorks() {
  const t = useTranslations('howItWorks');

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal mb-4">
            {t('title')}
          </h2>
          <p className="text-muted max-w-lg mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="group bg-white rounded-2xl p-8 border border-black/5 shadow-sm hover:shadow-lg hover:border-coral/30 transition-all duration-300"
              >
                {/* Step number + icon */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 bg-sand rounded-xl flex items-center justify-center shrink-0 group-hover:bg-coral/10 transition-colors">
                    <Icon className="w-7 h-7 text-coral" />
                  </div>
                  <span className="font-display text-5xl text-black/5 group-hover:text-coral/10 transition-colors">
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-semibold text-lg text-charcoal mb-2">
                  {t(step.titleKey)}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {t(step.descriptionKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
