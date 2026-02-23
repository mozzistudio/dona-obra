import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Como Funciona',
  description:
    'Descubre como Dona Obra te conecta con profesionales verificados en 3 simples pasos. Describe tu problema, recibe una estimacion y elige a tu profesional.',
  openGraph: {
    title: 'Como Funciona Dona Obra',
    description:
      'En 3 pasos simples, conectamos tu problema del hogar con el profesional ideal en Panama.',
  },
};

const steps = [
  {
    number: 1,
    title: 'Describe tu problema',
    subtitle: 'Cuentale a Dona Obra que necesitas',
    description:
      'Abre el chat y describele a Dona Obra lo que esta pasando en tu hogar. Puedes escribir en tus propias palabras, sin necesidad de conocer terminos tecnicos. Si tienes fotos del problema, puedes subirlas para que Dona Obra entienda mejor la situacion.',
    features: [
      'Chat en lenguaje natural, como hablar con una vecina',
      'Sube fotos para mostrar el problema',
      'Dona Obra te hace preguntas para entender mejor',
      'Disponible las 24 horas del dia',
    ],
  },
  {
    number: 2,
    title: 'Recibe tu estimacion',
    subtitle: 'Precios transparentes al instante',
    description:
      'Basandose en tu descripcion, Dona Obra analiza el problema y te da una estimacion del costo con rangos de precios reales del mercado panameno. No hay sorpresas: sabras cuanto esperar antes de contratar a nadie.',
    features: [
      'Estimaciones basadas en precios reales de Panama',
      'Rangos de precios claros y transparentes',
      'Desglose de lo que incluye el servicio',
      'Confirmas antes de avanzar al siguiente paso',
    ],
  },
  {
    number: 3,
    title: 'Elige tu profesional',
    subtitle: 'Profesionales verificados a tu alcance',
    description:
      'Dona Obra te presenta profesionales verificados que pueden resolver tu problema. Cada profesional tiene su perfil con calificaciones, experiencia y precios. Tu eliges al que mejor se adapte a tus necesidades y presupuesto.',
    features: [
      'Profesionales verificados y con experiencia',
      'Perfiles con calificaciones y resenas',
      'Comparte los detalles del proyecto directamente',
      'Contacto directo con el profesional elegido',
    ],
  },
];

export default function ComoFuncionaPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-charcoal mb-4">
            ¿Como funciona Dona Obra?
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            En 3 pasos simples, pasas de tener un problema en tu hogar a tener
            al profesional indicado para resolverlo. Sin complicaciones, sin
            sorpresas.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-[2.25rem] top-[4.5rem] bottom-0 w-px bg-gradient-to-b from-coral/30 to-coral/10" />
              )}

              <div
                className={`flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Number + Title side */}
                <div className="lg:w-1/2">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-[4.5rem] h-[4.5rem] rounded-2xl bg-coral text-white flex items-center justify-center font-display text-2xl shadow-lg shadow-coral/20">
                      {step.number}
                    </div>
                    <div>
                      <p className="text-coral text-sm font-semibold uppercase tracking-wider mb-1">
                        Paso {step.number}
                      </p>
                      <h2 className="font-display text-2xl sm:text-3xl text-charcoal">
                        {step.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-muted leading-relaxed pl-0 lg:pl-[5.5rem]">
                    {step.description}
                  </p>
                </div>

                {/* Features side */}
                <div className="lg:w-1/2">
                  <div className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-black/[0.04]">
                    <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
                      {step.subtitle}
                    </h3>
                    <ul className="space-y-3">
                      {step.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-jungle/10 text-jungle flex items-center justify-center mt-0.5">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                          <span className="text-sm text-charcoal/80 leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-coral to-coral-dark rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="font-display text-2xl sm:text-3xl text-white mb-3">
            ¿Listo para empezar?
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Cuentale a Dona Obra tu problema y recibe una estimacion al
            instante. Es gratis, rapido y sin compromiso.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 bg-white text-coral hover:text-coral-dark px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5" />
            Chatear con Dona Obra
          </Link>
        </div>
      </section>
    </div>
  );
}
