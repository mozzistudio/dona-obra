import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { MessageCircle, Star, Shield, Zap } from 'lucide-react';

const CATEGORIES = [
  { emoji: '🔧', name: 'Plomería', slug: 'plomería' },
  { emoji: '⚡', name: 'Electricidad', slug: 'electricidad' },
  { emoji: '🎨', name: 'Pintura', slug: 'pintura' },
  { emoji: '🧹', name: 'Limpieza', slug: 'limpieza' },
  { emoji: '❄️', name: 'Aire Acondicionado', slug: 'aire acondicionado' },
  { emoji: '🔑', name: 'Cerrajería', slug: 'cerrajería' },
  { emoji: '🌿', name: 'Jardinería', slug: 'jardinería' },
  { emoji: '🧱', name: 'Albañilería', slug: 'albañilería' },
  { emoji: '🚚', name: 'Mudanzas', slug: 'mudanzas' },
  { emoji: '🔌', name: 'Electrodomésticos', slug: 'reparación de electrodomésticos' },
];

const STATS = [
  { value: '15+', label: 'Profesionales verificados' },
  { value: '4.8', label: 'Calificación promedio' },
  { value: '10', label: 'Categorías de servicios' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF5EB 0%, #FFFBF5 50%, #FFF0E0 100%)' }}>
        {/* Decorative circles */}
        <div className="absolute top-20 -left-20 w-64 h-64 bg-coral/5 rounded-full" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-jungle/5 rounded-full" />
        <div className="absolute top-40 right-1/4 w-32 h-32 bg-coral/8 rounded-full" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-jungle/8 text-jungle rounded-[100px] text-sm font-medium mb-6">
              <span>👷‍♀️</span>
              <span>Tu vecina de confianza en Panamá</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-tight mb-6">
              Encuentra al mejor profesional para tu hogar
            </h1>

            <p className="text-lg sm:text-xl text-muted leading-relaxed mb-8 max-w-lg">
              Doña Obra te conecta con los mejores maestros de la ciudad. Estimaciones al instante, precios justos, profesionales de confianza.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/chat"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-coral text-white rounded-[100px] text-lg font-semibold shadow-[0_8px_30px_rgba(232,97,77,0.35)] hover:bg-coral-dark hover:shadow-[0_12px_36px_rgba(232,97,77,0.45)] transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Consultar ahora
              </Link>
              <a
                href="#categorias"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-coral rounded-[100px] text-lg font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all"
              >
                Ver servicios
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y border-black/6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-3 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display font-black text-3xl sm:text-4xl text-coral">{stat.value}</p>
                <p className="text-sm text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal text-center mb-14">
            ¿Cómo funciona?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageCircle className="w-7 h-7 text-coral" />,
                title: 'Describe tu problema',
                description: 'Cuéntale a Doña Obra qué necesitas. Puedes enviar texto, fotos, lo que sea.',
              },
              {
                icon: <Zap className="w-7 h-7 text-coral" />,
                title: 'Recibe tu estimación',
                description: 'En segundos recibes un rango de precios justo y los detalles del servicio.',
              },
              {
                icon: <Star className="w-7 h-7 text-coral" />,
                title: 'Elige tu profesional',
                description: 'Te recomendamos los mejores maestros verificados de la ciudad.',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 border-2 border-transparent hover:border-coral transition-all duration-200"
              >
                <div className="w-14 h-14 bg-sand rounded-2xl flex items-center justify-center mb-5">
                  {step.icon}
                </div>
                <h3 className="font-display font-black text-xl text-charcoal mb-2">{step.title}</h3>
                <p className="text-muted leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categorias" className="bg-warm py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal text-center mb-4">
            Servicios disponibles
          </h2>
          <p className="text-muted text-center mb-14 max-w-lg mx-auto">
            Selecciona una categoría para obtener una estimación al instante
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/chat?category=${encodeURIComponent(cat.slug)}`}
                className="bg-white rounded-2xl p-5 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 border-2 border-transparent hover:border-coral transition-all duration-200 group"
              >
                <span className="text-4xl block mb-3">{cat.emoji}</span>
                <span className="text-sm font-semibold text-charcoal group-hover:text-coral transition-colors">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal text-center mb-14">
            ¿Por qué Doña Obra?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-7 h-7 text-jungle" />,
                title: 'Profesionales verificados',
                description: 'Cada maestro pasa por nuestra revisión. Solo los mejores entran al catálogo.',
              },
              {
                icon: '💰',
                title: 'Precios transparentes',
                description: 'Estimaciones al instante basadas en precios reales del mercado panameño.',
              },
              {
                icon: '👷‍♀️',
                title: 'Recomendación personal',
                description: 'Doña Obra conoce a cada profesional y te da su opinión honesta.',
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-sand rounded-2xl flex items-center justify-center mx-auto mb-5">
                  {typeof item.icon === 'string' ? (
                    <span className="text-3xl">{item.icon}</span>
                  ) : (
                    item.icon
                  )}
                </div>
                <h3 className="font-display font-black text-xl text-charcoal mb-2">{item.title}</h3>
                <p className="text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #E8614D 0%, #E07A3A 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-4">
            ¿Listo para arreglar tu hogar?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
            Cuéntale a Doña Obra qué necesitas y recibe una estimación en segundos.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-coral rounded-[100px] text-lg font-semibold shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.2)] transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Empezar consulta
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-display font-black text-white text-xl mb-2">Doña Obra</p>
          <p className="text-white/40 text-sm">Tu vecina de confianza para servicios del hogar en Panamá</p>
        </div>
      </footer>
    </div>
  );
}
