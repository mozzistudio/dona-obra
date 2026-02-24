import Link from 'next/link';

const footerSections = [
  {
    title: 'Servicios',
    links: [
      { label: 'Ver servicios', href: '/servicios' },
      { label: 'Consultar ahora', href: '/chat' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
      { label: 'Cómo Funciona', href: '/como-funciona' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacidad', href: '/privacidad' },
      { label: 'Términos', href: '/terminos' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <img
                src="/dona-obra-logo.png"
                alt="Doña Obra"
                className="h-10 w-10 rounded-xl"
              />
              <span className="font-display text-xl tracking-tight">
                Doña Obra
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Tu vecina de confianza para servicios del hogar en Panamá.
              Conectamos a las familias panameñas con los mejores profesionales
              verificados.
            </p>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...(link.href.startsWith('/chat') ? { target: '_blank' } : {})}
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm text-center">
            &copy; {new Date().getFullYear()} Doña Obra. Todos los derechos reservados. Panamá 🇵🇦
          </p>
        </div>
      </div>
    </footer>
  );
}
