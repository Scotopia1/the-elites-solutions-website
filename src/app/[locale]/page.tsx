"use client";

import { ReactLenis } from "lenis/react";
import ElegantHero from '@/components/home/ElegantHero';
import Services from '@/components/home/Services';
import FeaturedWork from '@/components/home/FeaturedWork';
// import WorkPreview from '@/components/home/WorkPreview';
import AboutSection from '@/components/home/AboutSection';
import DescriptionSection from '@/components/home/DescriptionSection';
import ClientReviews from '@/components/home/ClientReviews';
import CTA from '@/components/home/CTA';

export default function HomePage() {
  return (
    <ReactLenis root>
                  <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0a0a_0%,#1a1a1a_50%,#0a0a0a_100%)]" />
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle, #FFD700 1px, transparent 1px)`,
                      backgroundSize: '30px 30px',
                      opacity: 0.07
                    }} />
                  </div>      <div className="relative z-10">
        <ElegantHero />
        <Services />
        <FeaturedWork />
        {/* <WorkPreview /> - Removed: "Palmer selects" sticky header was overlaying Services section */}
        <AboutSection />
        <DescriptionSection />
        <ClientReviews />
        <CTA />
      </div>
    </ReactLenis>
  );
}
