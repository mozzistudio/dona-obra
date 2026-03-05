import { Star, MapPin } from 'lucide-react';

const testimonials = [
  {
    name: 'María González',
    firstName: 'Maria',
    service: 'Plomería de emergencia',
    location: 'San Francisco, Ciudad de Panamá',
    date: 'Febrero 2026',
    rating: 5,
    quote:
      'Necesitaba un plomero urgente un domingo y Doña Obra me conectó en menos de una hora. El precio fue exactamente lo que me estimaron.',
  },
  {
    name: 'Carlos Rodríguez',
    firstName: 'Carlos',
    service: 'Pintura interior',
    location: 'El Cangrejo, Ciudad de Panamá',
    date: 'Enero 2026',
    rating: 5,
    quote:
      'Me pintaron todo el apartamento. El pintor fue súper profesional y el resultado quedó espectacular. Lo volvería a usar sin duda.',
  },
  {
    name: 'Ana Pérez',
    firstName: 'Ana',
    service: 'Reparación de A/C',
    location: 'Paitilla, Ciudad de Panamá',
    date: 'Febrero 2026',
    rating: 5,
    quote:
      'Me encanta la transparencia de los precios. Antes me sentía insegura contratando a desconocidos, pero con Doña Obra sé exactamente qué esperar.',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? 'fill-coral text-coral'
              : 'fill-black/10 text-black/10'
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal mb-4">
            Lo que dicen nuestros vecinos
          </h2>
          <p className="text-muted max-w-lg mx-auto">
            Miles de familias panameñas ya confían en Doña Obra para el cuidado
            de su hogar.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-sand/50 rounded-2xl p-7 border border-black/5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <StarRating rating={testimonial.rating} />
                <span className="text-xs text-muted">{testimonial.date}</span>
              </div>
              <p className="text-charcoal/80 text-sm leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {/* DiceBear avatar */}
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.firstName}`}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full bg-coral/10"
                />
                <div>
                  <p className="font-semibold text-sm text-charcoal">
                    {testimonial.name}
                  </p>
                  <p className="text-muted text-xs">
                    {testimonial.service}
                  </p>
                  <p className="text-muted text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
