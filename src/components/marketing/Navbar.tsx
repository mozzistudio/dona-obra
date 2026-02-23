'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/como-funciona', label: 'Cómo Funciona' },
  { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-cream/92 backdrop-blur-xl border-b border-black/6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <img
              src="/dona-obra-logo.png"
              alt="Doña Obra"
              className="h-9 w-9 rounded-xl"
            />
            <span className="font-display text-xl text-charcoal tracking-tight">
              Doña Obra
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-coral bg-coral/8'
                      : 'text-charcoal/70 hover:text-charcoal hover:bg-black/4'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" />
              Consultar
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-charcoal/70 hover:bg-black/5 transition-colors"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-black/6">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-coral bg-coral/8'
                        : 'text-charcoal/70 hover:text-charcoal hover:bg-black/4'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/chat"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white px-5 py-3 rounded-full text-sm font-semibold transition-all mt-2"
              >
                <MessageCircle className="w-4 h-4" />
                Consultar
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
