'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';

const localeFlags: Record<string, string> = {
  es: '🇪🇸',
  en: '🇬🇧',
  fr: '🇫🇷',
  de: '🇩🇪',
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('languageSwitcher');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwitch = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as typeof locale });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm text-charcoal/70 hover:text-charcoal hover:bg-black/4 transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase text-xs font-medium">{locale}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-black/8 py-1 min-w-[140px] z-50">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleSwitch(loc)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                loc === locale
                  ? 'text-coral bg-coral/5 font-medium'
                  : 'text-charcoal/70 hover:text-charcoal hover:bg-black/4'
              }`}
            >
              <span>{localeFlags[loc]}</span>
              <span>{t(loc)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
