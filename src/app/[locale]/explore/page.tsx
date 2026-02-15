import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import Button from '@/components/ui/button';
import Select from '@/components/ui/select';
import Card from '@/components/ui/card';
import { Filter, SlidersHorizontal } from 'lucide-react';

export default function ExplorePage() {
  const t = useTranslations();

  const sortOptions = [
    { value: 'recent', label: t('filters.recent') },
    { value: 'price_asc', label: t('filters.priceAsc') },
    { value: 'price_desc', label: t('filters.priceDesc') },
    { value: 'popular', label: t('filters.popular') },
  ];

  const categories = [
    { value: '', label: t('filters.category') },
    { value: 'bags', label: t('categories.bags') },
    { value: 'shoes', label: t('categories.shoes') },
    { value: 'clothing', label: t('categories.clothing') },
    { value: 'accessories', label: t('categories.accessories') },
    { value: 'jewelry', label: t('categories.jewelry') },
    { value: 'watches', label: t('categories.watches') },
  ];

  const conditions = [
    { value: '', label: t('filters.condition') },
    { value: 'new', label: t('conditions.new') },
    { value: 'excellent', label: t('conditions.excellent') },
    { value: 'good', label: t('conditions.good') },
    { value: 'fair', label: t('conditions.fair') },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-serif mb-4">
          {t('nav.explore')}
        </h1>
        <p className="text-gray-600">
          {t('hero.description')}
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border-2 border-gray-100 rounded-xl p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <Select options={categories} fullWidth />
          <Select options={conditions} fullWidth />
          <Button variant="outline" className="whitespace-nowrap">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            {t('filters.title')}
          </Button>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-gray-100">
          <p className="text-sm text-gray-600">
            {t('common.resultsCount', { count: 0 })}
          </p>
          <Select options={sortOptions} className="w-48" />
        </div>
      </div>

      {/* Products Grid */}
      <Suspense fallback={<div>{t('common.loading')}</div>}>
        <div className="text-center py-20">
          <p className="text-gray-600 mb-4">{t('common.noResults')}</p>
          <Button variant="outline">{t('filters.clear')}</Button>
        </div>
      </Suspense>
    </div>
  );
}
