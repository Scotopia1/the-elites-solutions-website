import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { InteractiveGrid } from '@/components/layout/InteractiveGrid';
import { NewFooter } from '@/components/layout/NewFooter';
// import { Footer } from '@/components/layout/Footer'; // Archived - Using NewFooter
import { GSAPInitializer } from '@/components/providers/gsap-initializer';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <GSAPInitializer />
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <InteractiveGrid />
      <div className="min-h-screen" style={{ backgroundColor: 'transparent' }}>
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <NewFooter />
      </div>
    </NextIntlClientProvider>
  );
}
