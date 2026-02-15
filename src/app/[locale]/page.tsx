import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  ShoppingBag,
  Shield,
  Sparkles,
  TrendingUp,
  Heart,
  Package,
  CreditCard,
  CheckCircle,
} from 'lucide-react';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';

export default function HomePage() {
  const t = useTranslations();

  const categories = [
    { key: 'bags', icon: ShoppingBag },
    { key: 'shoes', icon: Package },
    { key: 'clothing', icon: Sparkles },
    { key: 'accessories', icon: Heart },
    { key: 'jewelry', icon: TrendingUp },
    { key: 'watches', icon: CheckCircle },
  ];

  const steps = [
    {
      icon: Package,
      title: t('howItWorks.step1Title'),
      desc: t('howItWorks.step1Desc'),
    },
    {
      icon: Shield,
      title: t('howItWorks.step2Title'),
      desc: t('howItWorks.step2Desc'),
    },
    {
      icon: CreditCard,
      title: t('howItWorks.step3Title'),
      desc: t('howItWorks.step3Desc'),
    },
  ];

  const trustFeatures = [
    {
      icon: Shield,
      title: t('trust.auth'),
      desc: t('trust.authDesc'),
    },
    {
      icon: CreditCard,
      title: t('trust.secure'),
      desc: t('trust.secureDesc'),
    },
    {
      icon: Heart,
      title: t('trust.support'),
      desc: t('trust.supportDesc'),
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6">
              {t('hero.title')}
              <br />
              <span className="text-gray-600">{t('hero.subtitle')}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore">
                <Button size="lg">{t('hero.cta')}</Button>
              </Link>
              <Link href="/sell">
                <Button variant="outline" size="lg">
                  {t('hero.sellCta')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold font-serif text-center mb-12">
            {t('categories.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.key} href={`/explore?category=${category.key}`}>
                  <Card hover className="text-center">
                    <Icon className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="font-semibold">
                      {t(`categories.${category.key}`)}
                    </h3>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="text-xl text-gray-600">{t('howItWorks.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                    {index + 1}
                  </div>
                  <Icon className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold font-serif text-center mb-16">
            {t('trust.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-12 h-12 mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            {t('hero.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">{t('hero.description')}</p>
          <Link href="/explore">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100"
            >
              {t('hero.cta')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
