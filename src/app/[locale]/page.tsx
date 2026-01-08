"use client";

import { ReactLenis } from "lenis/react";
import { ParallaxProvider } from 'react-scroll-parallax';
import { useLenisConfig } from '@/hooks/useLenisConfig';
import CGMWTNOV2025Hero from '@/components/home/CGMWTNOV2025Hero';
// import ElegantHero from '@/components/home/ElegantHero'; // Archived - Using CGMWTNOV2025Hero
import Services from '@/components/home/Services';
import FeaturedWork from '@/components/home/FeaturedWork';
// import WorkPreview from '@/components/home/WorkPreview';
import IntroStats from '@/components/home/IntroStats';
// import Immersive3DAbout from '@/components/home/Immersive3DAbout'; // Archived - Using IntroStats
import ClientReviews from '@/components/home/ClientReviews';
import CTA from '@/components/home/CTA';

export default function HomePage() {
  const lenisOptions = useLenisConfig();

  return (
    <ReactLenis root options={lenisOptions}>
      <ParallaxProvider>
        <CGMWTNOV2025Hero />
        <IntroStats />
        <Services />
        <FeaturedWork />
        {/* <WorkPreview /> - Removed: "Palmer selects" sticky header was overlaying Services section */}
        <ClientReviews />
        <CTA />
      </ParallaxProvider>
    </ReactLenis>
  );
}
