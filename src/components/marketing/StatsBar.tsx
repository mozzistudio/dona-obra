const stats = [
  { value: '15+', label: 'Profesionales verificados' },
  { value: '4.8', label: 'Calificación promedio' },
  { value: '10', label: 'Categorías de servicios' },
];

export default function StatsBar() {
  return (
    <section className="bg-white border-y border-black/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-display text-4xl text-coral mb-1">
                {stat.value}
              </p>
              <p className="text-muted text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
