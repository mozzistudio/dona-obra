import { useTranslations } from 'next-intl';

const stats = [
  { icon: '⏱️', value: '8 min', labelKey: 'responseTime' },
  { icon: '✅', value: '340+', labelKey: 'jobsCompleted' },
  { icon: '⭐', value: '4.8', labelKey: 'avgRating' },
  { icon: '🗺️', value: '12', labelKey: 'areasCovered' },
];

export default function StatsBar() {
  const t = useTranslations('stats');

  return (
    <section className="bg-white border-y border-black/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className="font-display text-3xl sm:text-4xl text-coral mb-1">
                {stat.value}
              </p>
              <p className="text-muted text-sm font-medium">{t(stat.labelKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
