'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Locale } from '@/types';

const locales = [
  { code: 'es' as Locale, label: 'ES', name: 'Español' },
  { code: 'en' as Locale, label: 'EN', name: 'English' },
  { code: 'fr' as Locale, label: 'FR', name: 'Français' },
  { code: 'zh' as Locale, label: '中文', name: '简体中文' },
];

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative group">
      <button className="px-3 py-1.5 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
        {locales.find((l) => l.code === locale)?.label}
      </button>
      <div className="absolute right-0 mt-2 w-32 bg-white border-2 border-gray-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {locales.map((loc) => (
          <button
            key={loc.code}
            onClick={() => handleLocaleChange(loc.code)}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
              locale === loc.code ? 'font-semibold' : ''
            }`}
          >
            {loc.name}
          </button>
        ))}
      </div>
    </div>
  );
}
