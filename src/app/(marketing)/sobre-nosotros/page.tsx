import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre Nosotros',
  description:
    'Dona Obra es la plataforma panamena que conecta a las familias con profesionales del hogar verificados. Conoce nuestra historia, valores y mision.',
  openGraph: {
    title: 'Sobre Dona Obra - Tu vecina de confianza',
    description:
      'Conoce la historia detras de Dona Obra y nuestra mision de transformar los servicios del hogar en Panama.',
  },
};

const values = [
  {
    icon: '🤝',
    title: 'Confianza',
    description:
      'Cada profesional en nuestra plataforma es verificado. Trabajamos solo con personas que cumplen con nuestros estandares de calidad, puntualidad y profesionalismo. Tu hogar esta en buenas manos.',
  },
  {
    icon: '🔍',
    title: 'Transparencia',
    description:
      'Sin costos ocultos, sin sorpresas. Te damos estimaciones claras antes de que tomes cualquier decision. Sabemos que la confianza se construye con honestidad y precios justos.',
  },
  {
    icon: '🏘️',
    title: 'Comunidad',
    description:
      'Dona Obra nace en Panama y crece con Panama. Apoyamos a los profesionales locales, generamos empleo digno y fortalecemos el tejido de servicios que sostiene a nuestras comunidades.',
  },
];

export default function SobreNosotrosPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-charcoal mb-4">
            Sobre Dona Obra
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Detras de cada reparacion hay una historia. Esta es la nuestra.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-black/[0.04]">
            <h2 className="font-display text-2xl sm:text-3xl text-charcoal mb-6">
              Nuestra Historia
            </h2>
            <div className="space-y-4 text-charcoal/80 leading-relaxed">
              <p>
                Dona Obra nacio de una frustracion que todos conocemos: necesitas
                arreglar algo en tu casa y no sabes a quien llamar. Preguntas a
                vecinos, buscas en redes sociales, llamas a numeros que alguien
                te paso, y aun asi no sabes si el precio es justo o si el
                trabajo quedara bien hecho.
              </p>
              <p>
                Somos una plataforma panamena que conecta a propietarios de
                viviendas con profesionales de servicios del hogar verificados.
                Desde plomeros y electricistas hasta pintores y albaniles,
                nuestro objetivo es simple: que todos los panamenos tengan acceso
                a servicios del hogar honestos, con precios justos y
                profesionales de confianza.
              </p>
              <p>
                Usamos inteligencia artificial para entender tu problema,
                estimar costos basados en precios reales del mercado panameno, y
                conectarte con el profesional adecuado. Todo desde una
                conversacion sencilla, como si le preguntaras a una vecina que
                siempre sabe a quien llamar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Character Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-sand rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/dona-obra-logo.png"
                  alt="Dona Obra - Tu vecina de confianza"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl text-charcoal mb-3">
                Conoce a Dona Obra
              </h2>
              <p className="text-charcoal/80 leading-relaxed mb-3">
                Dona Obra es esa vecina que todos quisieramos tener. Una mujer
                panamena con anos de experiencia, que conoce a todos los mejores
                profesionales de la ciudad. Siempre tiene una recomendacion,
                siempre sabe el precio justo, y siempre se asegura de que el
                trabajo quede bien hecho.
              </p>
              <p className="text-charcoal/80 leading-relaxed">
                Cuando le cuentas tu problema, ella escucha con atencion, te
                hace las preguntas correctas y te guia hacia la mejor solucion.
                No importa si es una llave que gotea o una remodelacion
                completa: Dona Obra sabe exactamente a quien llamar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl text-charcoal text-center mb-10">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-black/[0.04]"
              >
                <span className="text-4xl mb-4 block" role="img" aria-label={value.title}>
                  {value.icon}
                </span>
                <h3 className="font-display text-xl text-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-jungle rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="font-display text-2xl sm:text-3xl text-white mb-4">
              Nuestra Mision
            </h2>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
              Democratizar el acceso a servicios del hogar de calidad en Panama,
              conectando a las familias con profesionales verificados a traves de
              tecnologia accesible, precios transparentes y una experiencia
              humana y cercana.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl text-charcoal mb-3">
            ¿Necesitas ayuda con tu hogar?
          </h2>
          <p className="text-muted mb-8 max-w-lg mx-auto">
            Cuentale a Dona Obra lo que necesitas. Ella te ayudara a encontrar
            al profesional perfecto.
          </p>
          <Link
            href="/chat"
            target="_blank"
            className="inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5" />
            Chatear con Dona Obra
          </Link>
        </div>
      </section>
    </div>
  );
}
