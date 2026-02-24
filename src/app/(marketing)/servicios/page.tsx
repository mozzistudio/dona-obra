import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Encuentra profesionales verificados en Panama para plomeria, electricidad, pintura, limpieza, aire acondicionado y mas. Precios justos y estimaciones al instante con Dona Obra.',
  openGraph: {
    title: 'Servicios para tu hogar - Dona Obra',
    description:
      'Mas de 10 categorias de servicios del hogar con profesionales verificados en Panama.',
  },
};

const services = [
  {
    emoji: '🔧',
    name: 'Plomeria',
    slug: 'plomeria',
    description:
      'Reparacion de tuberias, grifos, inodoros y sistemas de agua. Incluye deteccion de fugas, destape de canerias e instalacion de piezas sanitarias.',
    priceRange: '$30 - $300',
  },
  {
    emoji: '⚡',
    name: 'Electricidad',
    slug: 'electricidad',
    description:
      'Instalacion y reparacion de circuitos electricos, tomas de corriente, interruptores y paneles. Incluye diagnostico de fallas y actualizacion de sistemas.',
    priceRange: '$40 - $400',
  },
  {
    emoji: '🎨',
    name: 'Pintura',
    slug: 'pintura',
    description:
      'Pintura interior y exterior de paredes, techos y fachadas. Incluye preparacion de superficies, aplicacion de selladores y acabados profesionales.',
    priceRange: '$150 - $400/hab.',
  },
  {
    emoji: '🧹',
    name: 'Limpieza',
    slug: 'limpieza',
    description:
      'Limpieza profunda residencial y comercial, limpieza post-obra y mantenimiento regular. Incluye desinfeccion de areas y limpieza de espacios dificiles.',
    priceRange: '$50 - $150',
  },
  {
    emoji: '❄️',
    name: 'Aire Acondicionado',
    slug: 'aire-acondicionado',
    description:
      'Instalacion, mantenimiento preventivo y reparacion de equipos de aire acondicionado. Incluye limpieza de filtros, recarga de gas y diagnostico de fallas.',
    priceRange: '$50 - $500',
  },
  {
    emoji: '🔑',
    name: 'Cerrajeria',
    slug: 'cerrajeria',
    description:
      'Cambio de cerraduras, apertura de emergencia, duplicado de llaves e instalacion de sistemas de seguridad. Servicio disponible las 24 horas.',
    priceRange: '$25 - $80',
  },
  {
    emoji: '🌿',
    name: 'Jardineria',
    slug: 'jardineria',
    description:
      'Mantenimiento de jardines, poda de arboles, diseno de areas verdes y sistemas de riego. Incluye fertilizacion y control de plagas en jardines.',
    priceRange: '$40 - $120',
  },
  {
    emoji: '🧱',
    name: 'Albanileria',
    slug: 'albanileria',
    description:
      'Reparaciones estructurales, remodelaciones, construccion de paredes, pisos y acabados. Incluye trabajo con bloques, concreto y ceramica.',
    priceRange: '$100 - $2,000',
  },
  {
    emoji: '🚚',
    name: 'Mudanzas',
    slug: 'mudanzas',
    description:
      'Mudanzas locales con embalaje profesional, transporte seguro y descarga cuidadosa. Incluye proteccion de muebles y armado en destino.',
    priceRange: '$80 - $300',
  },
  {
    emoji: '🔌',
    name: 'Electrodomesticos',
    slug: 'electrodomesticos',
    description:
      'Reparacion de lavadoras, neveras, secadoras, estufas y otros electrodomesticos. Incluye diagnostico, cambio de repuestos y mantenimiento preventivo.',
    priceRange: '$40 - $150',
  },
];

export default function ServiciosPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-charcoal mb-4">
            Servicios para tu hogar
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Desde una llave que gotea hasta una remodelacion completa, Dona Obra
            te conecta con el profesional adecuado para cada trabajo. Precios
            transparentes y profesionales verificados en Panama.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/chat?category=${service.slug}`}
              target="_blank"
              className="group bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-black/[0.04] hover:border-coral/20 hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl shrink-0 mt-0.5" role="img" aria-label={service.name}>
                  {service.emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-lg text-charcoal mb-2 group-hover:text-coral transition-colors">
                    {service.name}
                  </h2>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-block bg-sand text-charcoal text-xs font-semibold px-3 py-1.5 rounded-full">
                      {service.priceRange}
                    </span>
                    <span className="text-coral text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Consultar →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-jungle rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="font-display text-2xl sm:text-3xl text-white mb-3">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-white/70 mb-6 max-w-lg mx-auto">
            Cuentale a Dona Obra lo que necesitas y ella te ayudara a encontrar
            al profesional indicado para cualquier trabajo.
          </p>
          <Link
            href="/chat"
            target="_blank"
            className="inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            Chatear con Dona Obra
          </Link>
        </div>
      </section>
    </div>
  );
}
