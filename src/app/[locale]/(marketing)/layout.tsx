import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';

function TrustBar() {
  const t = useTranslations('trustBar');
  return (
    <div className="bg-charcoal/[0.03] text-center py-2">
      <p className="text-sm text-charcoal/70 px-4">{t('text')}</p>
    </div>
  );
}

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />
      <TrustBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
