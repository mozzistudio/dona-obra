import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Package, ShoppingBag, Heart, TrendingUp } from 'lucide-react';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';

export default function DashboardPage() {
  const t = useTranslations();

  const stats = [
    {
      icon: Package,
      label: t('dashboard.active'),
      value: '0',
      color: 'text-blue-600',
    },
    {
      icon: TrendingUp,
      label: t('dashboard.sold'),
      value: '0',
      color: 'text-green-600',
    },
    {
      icon: ShoppingBag,
      label: t('dashboard.myOrders'),
      value: '0',
      color: 'text-purple-600',
    },
    {
      icon: Heart,
      label: t('dashboard.myFavorites'),
      value: '0',
      color: 'text-red-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold font-serif">{t('dashboard.title')}</h1>
        <Link href="/sell">
          <Button>{t('nav.sell')}</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-gray-50 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* My Listings */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t('dashboard.myListings')}</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium bg-black text-white rounded-lg">
              {t('dashboard.active')}
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
              {t('dashboard.draft')}
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
              {t('dashboard.sold')}
            </button>
          </div>
        </div>
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-4">{t('dashboard.noItems')}</p>
          <Link href="/sell">
            <Button>{t('dashboard.startSelling')}</Button>
          </Link>
        </div>
      </Card>

      {/* Recent Orders */}
      <Card>
        <h2 className="text-2xl font-bold mb-6">{t('dashboard.myOrders')}</h2>
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">{t('dashboard.noItems')}</p>
        </div>
      </Card>
    </div>
  );
}
