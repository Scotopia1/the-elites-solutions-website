"use client";

import { ReactLenis } from "lenis/react";
import { ParallaxProvider } from 'react-scroll-parallax';
import { useLenisConfig } from '@/hooks/useLenisConfig';
import CGMWTNOV2025Hero from '@/components/home/CGMWTNOV2025Hero';
import ServicesCarousel from '@/components/home/ServicesCarousel';
import FeaturedWork from '@/components/home/FeaturedWork';
import IntroStats from '@/components/home/IntroStats';
import CTA from '@/components/home/CTA';
import ClientReviews from '@/components/home/ClientReviews';

export default function HomePage() {
  const lenisOptions = useLenisConfig();

  return (
    <ReactLenis root options={lenisOptions}>
      <ParallaxProvider>
        <CGMWTNOV2025Hero />
        <IntroStats />
        <ServicesCarousel />
        <ClientReviews />
        <FeaturedWork />
        <CTA />
      </ParallaxProvider>
    </ReactLenis>
  );
}
