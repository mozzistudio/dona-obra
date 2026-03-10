import { Link } from '@/i18n/navigation';
import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CTASection() {
  const t = useTranslations('cta');
  const tc = useTranslations('common');

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl px-8 py-16 sm:px-16 sm:py-20 text-center relative overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, #E8614D 0%, #D14E3B 50%, #C44433 100%)',
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />

          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight">
              {t('title')}
            </h2>
            <p className="text-white/85 text-lg max-w-lg mx-auto mb-8">
              {t('subtitle')}
            </p>
            <Link
              href="/chat"
              target="_blank"
              className="inline-flex items-center gap-2.5 bg-white hover:bg-cream text-coral font-semibold px-8 py-4 rounded-full text-base transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              {tc('consultNow')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
