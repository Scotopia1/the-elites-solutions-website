import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import './custom-background.css';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'The Elites Solutions | Custom Business Automation & Software',
    template: '%s | The Elites Solutions',
  },
  description:
    'Custom websites & software built for YOUR business. We build automation systems that help businesses run smoother.',
  keywords: [
    'business automation',
    'custom software',
    'web development',
    'mobile apps',
    'software solutions',
  ],
  authors: [{ name: 'The Elites Solutions' }],
  creator: 'The Elites Solutions',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theelitessolutions.com',
    title: 'The Elites Solutions | Custom Business Automation & Software',
    description:
      'Custom websites & software built for YOUR business. We build automation systems that help businesses run smoother.',
    siteName: 'The Elites Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Elites Solutions | Custom Business Automation & Software',
    description:
      'Custom websites & software built for YOUR business. We build automation systems that help businesses run smoother.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { SessionProvider } from '@/components/providers/session-provider';
import { LoadingProvider } from '@/components/providers/loading-provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <SessionProvider>
          <LoadingProvider>
            {children}
          </LoadingProvider>
          <Toaster position="top-right" richColors />
        </SessionProvider>
      </body>
    </html>
  );
}
