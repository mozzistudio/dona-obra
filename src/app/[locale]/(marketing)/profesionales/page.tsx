'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { supabase } from '@/lib/supabase';

const categoryKeys = [
  'plumbing',
  'electrical',
  'painting',
  'cleaning',
  'ac',
  'locksmith',
  'gardening',
  'masonry',
  'moving',
  'appliances',
] as const;

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

const experienceKeys = [
  { value: '', labelKey: 'preferNotToSay' as const },
  { value: '1', labelKey: 'lessThan1Year' as const },
  { value: '3', labelKey: 'years1to3' as const },
  { value: '5', labelKey: 'years3to5' as const },
  { value: '10', labelKey: 'years5to10' as const },
  { value: '15', labelKey: 'moreThan10Years' as const },
];

const faqKeys = [
  { qKey: 'faqQ1' as const, aKey: 'faqA1' as const },
  { qKey: 'faqQ2' as const, aKey: 'faqA2' as const },
  { qKey: 'faqQ3' as const, aKey: 'faqA3' as const },
  { qKey: 'faqQ4' as const, aKey: 'faqA4' as const },
];

export default function ProfesionalesPage() {
  const t = useTranslations('contractors');
  const tc = useTranslations('categories');
  const tCommon = useTranslations('common');

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
      setError(t('requiredFieldsError'));
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
      setError(t('genericError'));
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
            {t('heroTitle')}{' '}
            <span className="text-coral">{t('heroHighlight')}</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-8 max-w-xl mx-auto">
            {t('heroSubtitle')}
          </p>
          <a
            href="#registro"
            className="inline-flex items-center justify-center bg-coral hover:bg-coral-dark text-white px-8 py-3.5 rounded-full text-base font-semibold transition-all shadow-lg shadow-coral/25 hover:shadow-xl hover:shadow-coral/30 active:scale-[0.98]"
          >
            {t('registerFree')}
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <span className="text-4xl block mb-4">👥</span>
              <h3 className="font-semibold text-lg text-charcoal mb-2">{t('moreClients')}</h3>
              <p className="text-muted text-sm leading-relaxed">
                {t('moreClientsDesc')}
              </p>
            </div>
            <div className="text-center">
              <span className="text-4xl block mb-4">💸</span>
              <h3 className="font-semibold text-lg text-charcoal mb-2">{t('securePayments')}</h3>
              <p className="text-muted text-sm leading-relaxed">
                {t('securePaymentsDesc')}
              </p>
            </div>
            <div className="text-center">
              <span className="text-4xl block mb-4">🗓️</span>
              <h3 className="font-semibold text-lg text-charcoal mb-2">{t('youDecide')}</h3>
              <p className="text-muted text-sm leading-relaxed">
                {t('youDecideDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="registro" className="py-20 bg-cream">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-charcoal text-center mb-10">
            {t('joinTitle')}
          </h2>

          {submitted ? (
            <div className="bg-jungle/10 border border-jungle/20 rounded-2xl p-8 text-center">
              <span className="text-4xl block mb-4">✅</span>
              <h3 className="font-semibold text-xl text-charcoal mb-2">
                {t('successTitle')}
              </h3>
              <p className="text-muted">
                {t('successMessage')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  {t('fullName')}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:border-coral/50 text-charcoal"
                  placeholder={t('fullNamePlaceholder')}
                  required
                />
              </div>

              {/* Specialty */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  {t('specialty')}
                </label>
                <select
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:border-coral/50 text-charcoal"
                  required
                >
                  <option value="">{t('selectSpecialty')}</option>
                  {categoryKeys.map((key) => (
                    <option key={key} value={tc(key)}>{tc(key)}</option>
                  ))}
                </select>
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  {t('whatsapp')}
                </label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:border-coral/50 text-charcoal"
                  placeholder={t('whatsappPlaceholder')}
                  required
                />
              </div>

              {/* Zones */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  {t('workZones')}
                </label>
                <p className="text-xs text-muted mb-2">{t('selectZones')}</p>
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
                  {t('yearsExperience')}
                </label>
                <select
                  value={formData.years_experience}
                  onChange={(e) => setFormData({ ...formData, years_experience: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:border-coral/50 text-charcoal"
                >
                  {experienceKeys.map((opt) => (
                    <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>
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
                {submitting ? tCommon('sendingDots') : tCommon('registerFree')}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-charcoal text-center mb-10">
            {tCommon('faq')}
          </h2>
          <div className="space-y-6">
            {faqKeys.map((faq, i) => (
              <div key={i} className="bg-sand/50 rounded-xl p-6">
                <h3 className="font-semibold text-charcoal mb-2">{t(faq.qKey)}</h3>
                <p className="text-muted text-sm leading-relaxed">{t(faq.aKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
