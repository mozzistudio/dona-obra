import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t-2 border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-serif">KLOSET</h3>
            <p className="text-gray-600 text-sm">{t('aboutDesc')}</p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">{t('shop')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/explore"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  {t('explore')}
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  {t('categories')}
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  {t('brands')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h4 className="font-semibold mb-4">{t('sell')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/sell"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  {t('howToSell')}
                </Link>
              </li>
              <li>
                <Link
                  href="/authentication"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  {t('authentication')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">{t('support')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/help"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  {t('help')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  {t('shipping')}
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  {t('returns')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t-2 border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © {currentYear} Kloset. {t('rights')}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/terms"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              {t('terms')}
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              {t('privacy')}
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              {t('cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
