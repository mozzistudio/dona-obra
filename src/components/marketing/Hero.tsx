import { Link } from '@/i18n/navigation';
import { MessageCircle } from 'lucide-react';
import AnimatedPhoneMockup from './AnimatedPhoneMockup';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  const tc = useTranslations('common');

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #FFF5EB 0%, #FFFBF5 50%, #FFF0E0 100%)',
      }}
    >
      {/* Decorative blurred circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-coral/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-jungle/8 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sand/60 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-coral/15 rounded-full px-4 py-2 mb-6 shadow-sm">
              <span className="text-sm">&#x1F477;&#x200D;&#x2640;&#xFE0F;</span>
              <span className="text-sm font-medium text-charcoal/80">
                {t('badge')}
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-[1.1] tracking-tight mb-6">
              {t('headingMain')}{' '}
              <span className="text-coral">{t('headingHighlight')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-muted leading-relaxed mb-8 max-w-md">
              {t('subtitle')}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/chat"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white px-7 py-3.5 rounded-full text-base font-semibold transition-all shadow-lg shadow-coral/25 hover:shadow-xl hover:shadow-coral/30 active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5" />
                {tc('consultNow')}
              </Link>
              <Link
                href="/servicios"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-sand text-charcoal px-7 py-3.5 rounded-full text-base font-semibold transition-all border border-black/8 shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                {tc('viewServices')}
              </Link>
            </div>
          </div>

          {/* Right side - Phone mockup */}
          <div className="hidden lg:flex items-center justify-center">
            <AnimatedPhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
