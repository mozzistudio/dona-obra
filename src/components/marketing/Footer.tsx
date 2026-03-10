import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  const footerSections = [
    {
      titleKey: 'servicesTitle',
      links: [
        { labelKey: 'viewServices', href: '/servicios' },
        { labelKey: 'consultNow', href: '/chat' },
      ],
    },
    {
      titleKey: 'companyTitle',
      links: [
        { labelKey: 'aboutUs', href: '/sobre-nosotros' },
        { labelKey: 'howItWorks', href: '/como-funciona' },
      ],
    },
    {
      titleKey: 'legalTitle',
      links: [
        { labelKey: 'privacy', href: '/privacidad' },
        { labelKey: 'terms', href: '/terminos' },
      ],
    },
  ];

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <img
                src="/dona-obra-logo.png"
                alt="Doña Obra"
                className="h-10 w-10 rounded-xl"
              />
              <span className="font-display text-xl tracking-tight">
                Doña Obra
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              {t('brandDescription')}
            </p>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.titleKey}>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
                {t(section.titleKey)}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...(link.href.startsWith('/chat') ? { target: '_blank' } : {})}
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm text-center">
            &copy; {new Date().getFullYear()} Doña Obra. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
