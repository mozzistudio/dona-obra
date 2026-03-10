import { Star, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

const testimonials = [
  {
    nameKey: 'testimonial1Name',
    firstName: 'Maria',
    serviceKey: 'testimonial1Service',
    locationKey: 'testimonial1Location',
    dateKey: 'testimonial1Date',
    rating: 5,
    quoteKey: 'testimonial1Quote',
  },
  {
    nameKey: 'testimonial2Name',
    firstName: 'Carlos',
    serviceKey: 'testimonial2Service',
    locationKey: 'testimonial2Location',
    dateKey: 'testimonial2Date',
    rating: 5,
    quoteKey: 'testimonial2Quote',
  },
  {
    nameKey: 'testimonial3Name',
    firstName: 'Ana',
    serviceKey: 'testimonial3Service',
    locationKey: 'testimonial3Location',
    dateKey: 'testimonial3Date',
    rating: 5,
    quoteKey: 'testimonial3Quote',
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
  const t = useTranslations('testimonials');

  return (
    <section className="py-20 bg-white">
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

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-sand/50 rounded-2xl p-7 border border-black/5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <StarRating rating={testimonial.rating} />
                <span className="text-xs text-muted">{t(testimonial.dateKey)}</span>
              </div>
              <p className="text-charcoal/80 text-sm leading-relaxed mb-6">
                &ldquo;{t(testimonial.quoteKey)}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {/* DiceBear avatar */}
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.firstName}`}
                  alt={t(testimonial.nameKey)}
                  className="w-10 h-10 rounded-full bg-coral/10"
                />
                <div>
                  <p className="font-semibold text-sm text-charcoal">
                    {t(testimonial.nameKey)}
                  </p>
                  <p className="text-muted text-xs">
                    {t(testimonial.serviceKey)}
                  </p>
                  <p className="text-muted text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {t(testimonial.locationKey)}
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
