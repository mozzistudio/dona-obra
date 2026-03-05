import Link from 'next/link';

const categories = [
  { name: 'Plomería', emoji: '🔧', slug: 'plomeria', startingPrice: 35, avgResponseMin: 45, availableNow: true },
  { name: 'Electricidad', emoji: '⚡', slug: 'electricidad', startingPrice: 40, avgResponseMin: 60, availableNow: true },
  { name: 'Pintura', emoji: '🎨', slug: 'pintura', startingPrice: 150, avgResponseMin: 90, availableNow: false },
  { name: 'Limpieza', emoji: '🧹', slug: 'limpieza', startingPrice: 50, avgResponseMin: 30, availableNow: true },
  { name: 'Aire Acondicionado', emoji: '❄️', slug: 'aire-acondicionado', startingPrice: 50, avgResponseMin: 60, availableNow: true },
  { name: 'Cerrajería', emoji: '🔑', slug: 'cerrajeria', startingPrice: 25, avgResponseMin: 20, availableNow: true },
  { name: 'Jardinería', emoji: '🌿', slug: 'jardineria', startingPrice: 40, avgResponseMin: 120, availableNow: false },
  { name: 'Albañilería', emoji: '🧱', slug: 'albanileria', startingPrice: 100, avgResponseMin: 90, availableNow: false },
  { name: 'Mudanzas', emoji: '🚚', slug: 'mudanzas', startingPrice: 80, avgResponseMin: 60, availableNow: true },
  { name: 'Electrodomésticos', emoji: '🔌', slug: 'electrodomesticos', startingPrice: 40, avgResponseMin: 45, availableNow: true },
];

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal mb-4">
            Nuestros servicios
          </h2>
          <p className="text-muted max-w-lg mx-auto">
            Desde plomería hasta mudanzas, tenemos el profesional indicado para
            cada necesidad de tu hogar.
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
                {cat.name}
              </span>
              <span className="text-xs text-coral font-semibold block">
                Desde B/. {cat.startingPrice}
              </span>
              <span className="text-xs text-muted block">
                ~{cat.avgResponseMin} min
              </span>
              <span className="flex items-center justify-center gap-1 mt-1.5 text-xs">
                <span className={`w-1.5 h-1.5 rounded-full ${cat.availableNow ? 'bg-jungle' : 'bg-gray-400'}`} />
                <span className={cat.availableNow ? 'text-jungle' : 'text-gray-400'}>
                  {cat.availableNow ? 'Disponible' : 'Bajo demanda'}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
