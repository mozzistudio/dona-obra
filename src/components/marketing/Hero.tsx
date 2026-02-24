import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import AnimatedPhoneMockup from './AnimatedPhoneMockup';

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #FFF5EB 0%, #FFFBF5 50%, #FFF0E0 100%)',
      }}
    >
      {/* Decorative blurred circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-coral/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-jungle/8 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sand/60 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-coral/15 rounded-full px-4 py-2 mb-6 shadow-sm">
              <span className="text-sm">&#x1F477;&#x200D;&#x2640;&#xFE0F;</span>
              <span className="text-sm font-medium text-charcoal/80">
                Tu vecina de confianza en Panamá
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-[1.1] tracking-tight mb-6">
              Encuentra al mejor{' '}
              <span className="text-coral">profesional</span> para tu hogar
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-muted leading-relaxed mb-8 max-w-md">
              Cuéntale a Doña Obra lo que necesitas y en segundos recibes una
              estimación con los mejores profesionales verificados de Panamá.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/chat"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white px-7 py-3.5 rounded-full text-base font-semibold transition-all shadow-lg shadow-coral/25 hover:shadow-xl hover:shadow-coral/30 active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5" />
                Consultar ahora
              </Link>
              <Link
                href="/servicios"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-sand text-charcoal px-7 py-3.5 rounded-full text-base font-semibold transition-all border border-black/8 shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                Ver servicios
              </Link>
            </div>
          </div>

          {/* Right side - Phone mockup */}
          <div className="hidden lg:flex items-center justify-center">
            <AnimatedPhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
