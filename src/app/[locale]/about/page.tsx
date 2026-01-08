import { Metadata } from 'next';
import VanguardAboutPage from "@/components/about-vanguard/VanguardAboutPage";

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about The Elites Solutions - your partner in custom business automation and software development. Discover our mission, values, team, and journey since 2019.',
  keywords: ['about us', 'company history', 'team', 'mission', 'values', 'business automation', 'software development'],
  openGraph: {
    title: 'About The Elites Solutions',
    description: 'Custom business automation and software solutions since 2019. Meet our team and discover our mission.',
    type: 'website',
    url: 'https://theelites.io/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About The Elites Solutions',
    description: 'Custom business automation and software solutions since 2019. Meet our team and discover our mission.',
  },
  alternates: {
    canonical: 'https://theelites.io/about',
    languages: {
      en: 'https://theelites.io/en/about',
      fr: 'https://theelites.io/fr/about',
      ar: 'https://theelites.io/ar/about',
    },
  },
};

export default function AboutPage() {
  return <VanguardAboutPage />;
}
