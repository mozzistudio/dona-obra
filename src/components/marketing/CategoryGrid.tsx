import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const categories = [
  { nameKey: 'plumbing', emoji: '🔧', slug: 'plomeria', startingPrice: 35, avgResponseMin: 45, availableNow: true },
  { nameKey: 'electrical', emoji: '⚡', slug: 'electricidad', startingPrice: 40, avgResponseMin: 60, availableNow: true },
  { nameKey: 'painting', emoji: '🎨', slug: 'pintura', startingPrice: 150, avgResponseMin: 90, availableNow: false },
  { nameKey: 'cleaning', emoji: '🧹', slug: 'limpieza', startingPrice: 50, avgResponseMin: 30, availableNow: true },
  { nameKey: 'airConditioning', emoji: '❄️', slug: 'aire-acondicionado', startingPrice: 50, avgResponseMin: 60, availableNow: true },
  { nameKey: 'locksmith', emoji: '🔑', slug: 'cerrajeria', startingPrice: 25, avgResponseMin: 20, availableNow: true },
  { nameKey: 'gardening', emoji: '🌿', slug: 'jardineria', startingPrice: 40, avgResponseMin: 120, availableNow: false },
  { nameKey: 'masonry', emoji: '🧱', slug: 'albanileria', startingPrice: 100, avgResponseMin: 90, availableNow: false },
  { nameKey: 'moving', emoji: '🚚', slug: 'mudanzas', startingPrice: 80, avgResponseMin: 60, availableNow: true },
  { nameKey: 'appliances', emoji: '🔌', slug: 'electrodomesticos', startingPrice: 40, avgResponseMin: 45, availableNow: true },
];

export default function CategoryGrid() {
  const t = useTranslations('categories');
  const tc = useTranslations('common');

  return (
    <section className="py-20 bg-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal mb-4">
            {t('title')}
          </h2>
          <p className="text-muted max-w-lg mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/chat?category=${cat.slug}`}
              target="_blank"
              className="group bg-sand hover:bg-white rounded-xl p-5 text-center border border-transparent hover:border-coral/20 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03]"
            >
              <span className="text-3xl block mb-2">{cat.emoji}</span>
              <span className="text-sm font-medium text-charcoal/80 group-hover:text-charcoal transition-colors block mb-2">
                {t(cat.nameKey)}
              </span>
              <span className="text-xs text-coral font-semibold block">
                {tc('from')} B/. {cat.startingPrice}
              </span>
              <span className="text-xs text-muted block">
                ~{cat.avgResponseMin} min
              </span>
              <span className="flex items-center justify-center gap-1 mt-1.5 text-xs">
                <span className={`w-1.5 h-1.5 rounded-full ${cat.availableNow ? 'bg-jungle' : 'bg-gray-400'}`} />
                <span className={cat.availableNow ? 'text-jungle' : 'text-gray-400'}>
                  {cat.availableNow ? tc('available') : tc('onDemand')}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
