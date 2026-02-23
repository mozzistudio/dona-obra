import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      {/* Phone frame */}
      <div className="relative bg-charcoal rounded-[2.5rem] p-2 shadow-2xl shadow-black/30">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-charcoal rounded-b-2xl z-10" />

        {/* Screen */}
        <div className="relative bg-cream rounded-[2rem] overflow-hidden">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[10px] text-charcoal/60 font-medium">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z"/></svg>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
              <div className="w-5 h-2.5 border border-charcoal/60 rounded-sm relative">
                <div className="absolute inset-[1px] right-[2px] bg-jungle rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Chat header */}
          <div className="bg-white border-b border-black/5 px-3 py-2 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
              <img src="/dona-obra-logo.png" alt="Doña Obra" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-charcoal leading-tight">Doña Obra</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-jungle rounded-full" />
                <p className="text-[10px] text-jungle">en línea</p>
              </div>
            </div>
          </div>

          {/* Chat messages */}
          <div className="px-2.5 py-3 space-y-2.5 min-h-[320px]">
            {/* Bot welcome */}
            <div className="flex gap-1.5 items-end">
              <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
                <img src="/dona-obra-logo.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white rounded-xl rounded-bl-sm px-2.5 py-2 shadow-sm max-w-[85%]">
                <p className="text-[11px] text-charcoal leading-relaxed">
                  ¡Ey, dimelo! 👷‍♀️ Soy Doña Obra. Cuéntame qué necesitas y te ayudo al tiro 💪
                </p>
                <p className="text-[8px] text-muted text-right mt-0.5">3:27 p.m.</p>
              </div>
            </div>

            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-coral rounded-xl rounded-br-sm px-2.5 py-2 shadow-sm max-w-[80%]">
                <p className="text-[11px] text-white leading-relaxed">
                  Se me rompió una tubería en el baño y está goteando 😰
                </p>
                <p className="text-[8px] text-white/60 text-right mt-0.5">3:27 p.m.</p>
              </div>
            </div>

            {/* Bot analysis */}
            <div className="flex gap-1.5 items-end">
              <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
                <img src="/dona-obra-logo.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white rounded-xl rounded-bl-sm px-2.5 py-2 shadow-sm max-w-[85%]">
                <p className="text-[11px] text-charcoal leading-relaxed">
                  Tranqui mijo, eso se arregla fácil. ¿Es agua fría o caliente? 🔧
                </p>
                <p className="text-[8px] text-muted text-right mt-0.5">3:27 p.m.</p>
              </div>
            </div>

            {/* User reply */}
            <div className="flex justify-end">
              <div className="bg-coral rounded-xl rounded-br-sm px-2.5 py-2 shadow-sm max-w-[80%]">
                <p className="text-[11px] text-white leading-relaxed">Agua fría</p>
                <p className="text-[8px] text-white/60 text-right mt-0.5">3:28 p.m.</p>
              </div>
            </div>

            {/* Bot estimation */}
            <div className="flex gap-1.5 items-end">
              <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
                <img src="/dona-obra-logo.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white rounded-xl rounded-bl-sm px-2.5 py-2 shadow-sm max-w-[85%]">
                <p className="text-[11px] text-charcoal leading-relaxed">
                  Listo, aquí va tu estimación 💪
                </p>
                <div className="mt-1.5 bg-sand rounded-lg px-2 py-1.5 space-y-0.5">
                  <p className="text-[10px] text-charcoal font-semibold">🔧 Reparación de tubería</p>
                  <p className="text-[10px] text-jungle font-bold">💰 $30 — $80</p>
                  <p className="text-[10px] text-muted">⭐ Complejidad: Baja</p>
                </div>
                <p className="text-[8px] text-muted text-right mt-0.5">3:28 p.m.</p>
              </div>
            </div>

            {/* Provider card preview */}
            <div className="flex gap-1.5 items-end">
              <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
                <img src="/dona-obra-logo.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white rounded-xl rounded-bl-sm px-2.5 py-2 shadow-sm max-w-[85%]">
                <p className="text-[11px] text-charcoal leading-relaxed mb-1.5">
                  Te encontré 3 profesionales 💪
                </p>
                <div className="bg-sand rounded-lg px-2 py-1.5 flex items-center gap-2">
                  <div className="w-7 h-7 bg-coral/20 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-[10px]">⭐</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-charcoal truncate">Roberto M.</p>
                    <p className="text-[9px] text-jungle font-semibold">4.9 ★ · Desde $30</p>
                  </div>
                </div>
                <p className="text-[8px] text-muted text-right mt-0.5">3:28 p.m.</p>
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div className="bg-white border-t border-black/5 px-2.5 py-2 flex items-center gap-2">
            <div className="flex-1 bg-cream rounded-full px-3 py-1.5">
              <p className="text-[10px] text-muted">Escribe tu mensaje...</p>
            </div>
            <div className="w-7 h-7 bg-coral rounded-full flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -top-3 -right-6 bg-white rounded-xl shadow-lg px-3 py-1.5 border border-black/5 z-20">
        <span className="text-xs font-semibold text-jungle">4.8 ⭐</span>
      </div>
      <div className="absolute -bottom-3 -left-6 bg-white rounded-xl shadow-lg px-3 py-1.5 border border-black/5 z-20">
        <span className="text-xs font-semibold text-coral">15+ profesionales</span>
      </div>
    </div>
  );
}

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
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
