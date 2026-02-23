'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: '¿Cómo funciona Doña Obra?',
    answer:
      'Es simple: le describes tu problema a Doña Obra por chat, ella te da una estimación de precio al instante y te recomienda a los mejores profesionales verificados de tu zona. Tú eliges con quién trabajar.',
  },
  {
    question: '¿Cómo verifican a los profesionales?',
    answer:
      'Cada profesional pasa por un proceso de verificación que incluye revisión de identidad, experiencia comprobable, referencias de clientes anteriores y verificación de seguros cuando aplica.',
  },
  {
    question: '¿Las estimaciones tienen algún costo?',
    answer:
      'No, las estimaciones que te da Doña Obra son completamente gratuitas. Solo pagas cuando decides contratar a un profesional y se completa el trabajo.',
  },
  {
    question: '¿En qué áreas de Panamá están disponibles?',
    answer:
      'Actualmente estamos disponibles en la Ciudad de Panamá y áreas metropolitanas incluyendo San Miguelito, Arraiján y La Chorrera. Estamos expandiéndonos constantemente a nuevas zonas.',
  },
  {
    question: '¿Qué pasa si no estoy satisfecho con el trabajo?',
    answer:
      'Tu satisfacción es nuestra prioridad. Si tienes algún problema con el servicio, nuestro equipo de soporte te ayudará a resolverlo. Trabajamos con los profesionales para garantizar un trabajo de calidad.',
  },
  {
    question: '¿Puedo solicitar un profesional para emergencias?',
    answer:
      'Sí, varios de nuestros profesionales ofrecen servicio de emergencias 24/7 para situaciones urgentes como fugas de agua, problemas eléctricos o cerrajería. Indícale a Doña Obra que es urgente y te conectará rápidamente.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-warm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-muted max-w-lg mx-auto">
            Todo lo que necesitas saber sobre Doña Obra y nuestros servicios.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-black/5 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-sand/50 transition-colors"
                >
                  <span className="font-medium text-charcoal text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-muted text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
