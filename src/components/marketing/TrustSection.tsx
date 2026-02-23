import { Shield, DollarSign, Heart } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Profesionales verificados',
    description:
      'Cada profesional pasa por un proceso de verificación riguroso. Revisamos referencias, experiencia y calidad de trabajo antes de recomendarlo.',
  },
  {
    icon: DollarSign,
    title: 'Precios transparentes',
    description:
      'Recibes una estimación clara antes de contratar. Sin sorpresas, sin costos ocultos. El precio que ves es el precio que pagas.',
  },
  {
    icon: Heart,
    title: 'Recomendación personal',
    description:
      'Como una buena vecina, Doña Obra te recomienda al profesional ideal según tu necesidad específica, presupuesto y ubicación.',
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal mb-4">
            ¿Por qué Doña Obra?
          </h2>
          <p className="text-muted max-w-lg mx-auto">
            Somos más que una plataforma. Somos tu vecina de confianza que conoce
            a los mejores profesionales.
          </p>
        </div>

        {/* Value props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-coral/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-8 h-8 text-coral" />
                </div>
                <h3 className="font-semibold text-lg text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
