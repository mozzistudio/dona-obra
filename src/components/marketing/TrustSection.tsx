import { Shield, DollarSign, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

const values = [
  {
    icon: Shield,
    titleKey: 'value1Title',
    descriptionKey: 'value1Description',
  },
  {
    icon: DollarSign,
    titleKey: 'value2Title',
    descriptionKey: 'value2Description',
  },
  {
    icon: Heart,
    titleKey: 'value3Title',
    descriptionKey: 'value3Description',
  },
];

export default function TrustSection() {
  const t = useTranslations('trust');

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

        {/* Value props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-coral/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-8 h-8 text-coral" />
                </div>
                <h3 className="font-semibold text-lg text-charcoal mb-3">
                  {t(item.titleKey)}
                </h3>
                <p className="text-muted text-sm leading-relaxed max-w-xs mx-auto">
                  {t(item.descriptionKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
