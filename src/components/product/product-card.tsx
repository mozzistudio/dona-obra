import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Heart, Shield } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, getImageUrl } from '@/lib/utils';
import Card from '@/components/ui/card';
import Badge from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  locale: string;
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const t = useTranslations('product');

  return (
    <Link href={`/product/${product.id}`}>
      <Card hover className="group overflow-hidden p-0">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={getImageUrl(product.main_image)}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.authenticity_verified && (
            <div className="absolute top-3 left-3">
              <Badge variant="success" className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {t('verified')}
              </Badge>
            </div>
          )}
          <button className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            {product.brand}
          </p>
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">{formatPrice(product.price, locale)}</p>
            {product.original_price && (
              <p className="text-sm text-gray-500 line-through">
                {formatPrice(product.original_price, locale)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <span>{product.views} {t('views')}</span>
            <span>•</span>
            <span>{product.favorites} {t('favorites')}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
