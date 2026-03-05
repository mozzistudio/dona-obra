import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';

function TrustBar() {
  return (
    <div className="bg-charcoal/[0.03] text-center py-2">
      <p className="text-sm text-charcoal/70 px-4">
        🔒 Profesionales verificados  ·  💬 Respuesta en minutos  ·  ✅ Precio garantizado  ·  🇵🇦 100% Panameño
      </p>
    </div>
  );
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />
      <TrustBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
