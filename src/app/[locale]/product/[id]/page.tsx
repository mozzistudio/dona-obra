import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Heart, Share2, Flag, Shield, Eye, MapPin } from 'lucide-react';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import Card from '@/components/ui/card';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const t = useTranslations();

  // Mock product data - will be replaced with real data from Supabase
  const product = null;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {t('common.noResults')}
          </h1>
          <p className="text-gray-600">Product ID: {id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-400">Product Image</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gray-100 rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Brand Name
              </p>
              <h1 className="text-3xl font-bold font-serif mb-2">
                Product Title
              </h1>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Flag className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Badge variant="success" className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              {t('product.verified')}
            </Badge>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Eye className="w-4 h-4" />
              120 {t('product.views')}
            </span>
          </div>

          <p className="text-4xl font-bold mb-6">€1,250</p>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">{t('product.condition')}</span>
              <span className="font-semibold">{t('conditions.excellent')}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">{t('product.category')}</span>
              <span className="font-semibold">{t('categories.bags')}</span>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <Button fullWidth size="lg">
              {t('product.buyNow')}
            </Button>
            <Button variant="outline" fullWidth size="lg">
              {t('product.makeOffer')}
            </Button>
          </div>

          <Card>
            <h3 className="font-semibold mb-2">{t('product.description')}</h3>
            <p className="text-gray-600">
              Product description will appear here...
            </p>
          </Card>

          <Card className="mt-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Seller Name</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Location
                </p>
              </div>
              <Button variant="outline">{t('product.contactSeller')}</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
