'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const isChat = pathname === '/chat';

  return (
    <nav className="sticky top-0 z-50 bg-cream/92 backdrop-blur-xl border-b border-black/6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-gradient-to-br from-coral to-coral-dark rounded-lg flex items-center justify-center text-xl shadow-[0_4px_12px_rgba(232,97,77,0.3)] group-hover:shadow-[0_6px_16px_rgba(232,97,77,0.4)] transition-shadow">
            👷‍♀️
          </div>
          <span className="font-display font-black text-charcoal text-xl">Doña Obra</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === '/' ? 'text-coral' : 'text-muted hover:text-charcoal'
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/chat"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-[100px] text-sm font-semibold transition-all ${
              isChat
                ? 'bg-coral text-white shadow-[0_8px_30px_rgba(232,97,77,0.35)]'
                : 'bg-coral text-white shadow-[0_8px_30px_rgba(232,97,77,0.35)] hover:bg-coral-dark hover:shadow-[0_12px_36px_rgba(232,97,77,0.45)]'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Consultar
          </Link>
        </div>
      </div>
    </nav>
  );
}
