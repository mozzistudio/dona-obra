'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const categories = [
  'Plomería',
  'Electricidad',
  'Pintura',
  'Limpieza',
  'Aire Acondicionado',
  'Cerrajería',
  'Jardinería',
  'Albañilería',
  'Mudanzas',
  'Electrodomésticos',
];

const zones = [
  'Bella Vista',
  'San Francisco',
  'El Cangrejo',
  'Paitilla',
  'Obarrio',
  'Marbella',
  'Costa del Este',
  'Casco Viejo',
  'Condado del Rey',
  'El Dorado',
  'Pueblo Nuevo',
  'Juan Díaz',
  'Betania',
  'Río Abajo',
  'Calidonia',
  'Pedregal',
  'Tocumen',
  'Las Cumbres',
  'Arraiján',
  'La Chorrera',
];

const experienceOptions = [
  { value: '', label: 'Prefiero no decir' },
  { value: '1', label: 'Menos de 1 año' },
  { value: '3', label: '1-3 años' },
  { value: '5', label: '3-5 años' },
  { value: '10', label: '5-10 años' },
  { value: '15', label: 'Más de 10 años' },
];

const faqs = [
  {
    q: '¿Cuánto cobra Doña Obra?',
    a: 'Por ahora es completamente gratis.',
  },
  {
    q: '¿Cómo recibo solicitudes de trabajo?',
    a: 'Directamente en tu WhatsApp con todos los detalles — nombre del cliente, ubicación, presupuesto y fotos.',
  },
  {
    q: '¿Puedo elegir qué trabajos aceptar?',
    a: 'Sí. Tú decides cuándo y dónde trabajas.',
  },
  {
    q: '¿Cómo me verifico?',
    a: 'Después de registrarte, nuestro equipo te contacta para verificar tu experiencia.',
  },
];

export default function ProfesionalesPage() {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    whatsapp: '',
    zones: [] as string[],
    years_experience: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleZoneToggle = (zone: string) => {
    setFormData((prev) => ({
      ...prev,
      zones: prev.zones.includes(zone)
        ? prev.zones.filter((z) => z !== zone)
        : [...prev.zones, zone],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.specialty || !formData.whatsapp || formData.zones.length === 0) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }

    setSubmitting(true);

    const { error: dbError } = await supabase
      .from('professional_applications')
      .insert({
        name: formData.name,
        specialty: formData.specialty,
        whatsapp: formData.whatsapp,
        zones: formData.zones,
        years_experience: formData.years_experience ? parseInt(formData.years_experience) : null,
      });

    setSubmitting(false);

    if (dbError) {
      setError('Hubo un error. Por favor intenta de nuevo.');
      console.error('Supabase error:', dbError);
      return;
    }

    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        style={{
          background: 'linear-gradient(135deg, #FFF5EB 0%, #FFFBF5 50%, #FFF0E0 100%)',
        }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-jungle/8 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-[1.1] tracking-tight mb-6">
            Recibe trabajos cerca de ti.{' '}
            <span className="text-coral">Gratis para empezar.</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-8 max-w-xl mx-auto">
            Únete a los contratistas verificados de Doña Obra y recibe solicitudes de trabajo directamente en tu WhatsApp.
          </p>
          <a
            href="#registro"
            className="inline-flex items-center justify-center bg-coral hover:bg-coral-dark text-white px-8 py-3.5 rounded-full text-base font-semibold transition-all shadow-lg shadow-coral/25 hover:shadow-xl hover:shadow-coral/30 active:scale-[0.98]"
          >
            Regístrate gratis
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <span className="text-4xl block mb-4">👥</span>
              <h3 className="font-semibold text-lg text-charcoal mb-2">Más clientes</h3>
              <p className="text-muted text-sm leading-relaxed">
                Recibe solicitudes de clientes verificados en tu zona.
              </p>
            </div>
            <div className="text-center">
              <span className="text-4xl block mb-4">💸</span>
              <h3 className="font-semibold text-lg text-charcoal mb-2">Pagos seguros</h3>
              <p className="text-muted text-sm leading-relaxed">
                Los clientes conocen el precio desde el inicio. Sin regateo.
              </p>
            </div>
            <div className="text-center">
              <span className="text-4xl block mb-4">🗓️</span>
              <h3 className="font-semibold text-lg text-charcoal mb-2">Tú decides</h3>
              <p className="text-muted text-sm leading-relaxed">
                Acepta solo los trabajos que quieras, cuando quieras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="registro" className="py-20 bg-cream">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-charcoal text-center mb-10">
            Únete a Doña Obra
          </h2>

          {submitted ? (
            <div className="bg-jungle/10 border border-jungle/20 rounded-2xl p-8 text-center">
              <span className="text-4xl block mb-4">✅</span>
              <h3 className="font-semibold text-xl text-charcoal mb-2">
                ¡Registro exitoso!
              </h3>
              <p className="text-muted">
                Nuestro equipo te contactará por WhatsApp para verificar tu experiencia. ¡Bienvenido a Doña Obra!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:border-coral/50 text-charcoal"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              {/* Specialty */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Especialidad *
                </label>
                <select
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:border-coral/50 text-charcoal"
                  required
                >
                  <option value="">Selecciona tu especialidad</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:border-coral/50 text-charcoal"
                  placeholder="+507 6000-0000"
                  required
                />
              </div>

              {/* Zones */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Zonas de trabajo *
                </label>
                <p className="text-xs text-muted mb-2">Selecciona todas las zonas donde trabajas</p>
                <div className="flex flex-wrap gap-2">
                  {zones.map((zone) => {
                    const selected = formData.zones.includes(zone);
                    return (
                      <button
                        key={zone}
                        type="button"
                        onClick={() => handleZoneToggle(zone)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          selected
                            ? 'bg-coral text-white'
                            : 'bg-white border border-black/10 text-charcoal/70 hover:border-coral/30'
                        }`}
                      >
                        {zone}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Años de experiencia
                </label>
                <select
                  value={formData.years_experience}
                  onChange={(e) => setFormData({ ...formData, years_experience: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:border-coral/50 text-charcoal"
                >
                  {experienceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-coral hover:bg-coral-dark text-white py-3.5 rounded-full font-semibold transition-all shadow-lg shadow-coral/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Enviando...' : 'Registrarme gratis'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-charcoal text-center mb-10">
            Preguntas frecuentes
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-sand/50 rounded-xl p-6">
                <h3 className="font-semibold text-charcoal mb-2">{faq.q}</h3>
                <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
