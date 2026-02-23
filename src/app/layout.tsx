import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Doña Obra - Servicios del Hogar en Panamá',
    template: '%s | Doña Obra',
  },
  description:
    'Encuentra plomeros, electricistas, pintores y más profesionales verificados en Panamá. Estimaciones al instante, precios justos.',
  keywords: [
    'servicios del hogar Panamá',
    'plomero Panamá',
    'electricista Panamá',
    'reparaciones hogar',
    'Doña Obra',
  ],
  openGraph: {
    title: 'Doña Obra - Tu vecina de confianza',
    description:
      'Conecta con profesionales verificados en Panamá. Estimaciones al instante.',
    locale: 'es_PA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
