import Link from 'next/link';

const categories = [
  { name: 'Plomería', emoji: '🔧', slug: 'plomeria' },
  { name: 'Electricidad', emoji: '⚡', slug: 'electricidad' },
  { name: 'Pintura', emoji: '🎨', slug: 'pintura' },
  { name: 'Limpieza', emoji: '🧹', slug: 'limpieza' },
  { name: 'Aire Acondicionado', emoji: '❄️', slug: 'aire-acondicionado' },
  { name: 'Cerrajería', emoji: '🔑', slug: 'cerrajeria' },
  { name: 'Jardinería', emoji: '🌿', slug: 'jardineria' },
  { name: 'Albañilería', emoji: '🧱', slug: 'albanileria' },
  { name: 'Mudanzas', emoji: '🚚', slug: 'mudanzas' },
  { name: 'Electrodomésticos', emoji: '🔌', slug: 'electrodomesticos' },
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
              <span className="text-3xl block mb-3">{cat.emoji}</span>
              <span className="text-sm font-medium text-charcoal/80 group-hover:text-charcoal transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
