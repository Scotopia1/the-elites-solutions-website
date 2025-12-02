"use client";

import { ReactLenis } from "lenis/react";
import { ParallaxProvider } from "react-scroll-parallax";

// Section imports
import { VanguardHero } from "./sections/VanguardHero";
import { MissionStatement } from "./sections/MissionStatement";
import { CoreValues } from "./sections/CoreValues";
import { JourneyTimeline } from "./sections/JourneyTimeline";
import { TeamSpotlight } from "./sections/TeamSpotlight";
import { StatsMetrics } from "./sections/StatsMetrics";
import { ContactCTA } from "./sections/ContactCTA";

/**
 * VanguardAboutPage - Main orchestrator for the About page
 * Composes all sections with smooth scrolling and parallax provider
 *
 * Theme: "Vanguard" - Modern, tech-forward aesthetic
 * - Matte black textures
 * - Glowing gold neon accents (#d4af37)
 * - Geometric shapes
 * - Glassmorphism with gold tints
 */
export default function VanguardAboutPage() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <ParallaxProvider>
        <main className="relative bg-black min-h-screen overflow-x-hidden">
          {/* Section 1: Hero with Marquee + Particles */}
          <VanguardHero />

          {/* Section 2: Mission Statement (Pinned Scroll) */}
          <MissionStatement />

          {/* Section 3: Core Values (3D Tilt Cards) */}
          <CoreValues />

          {/* Section 4: Journey Timeline (Vertical) */}
          <JourneyTimeline />

          {/* Section 5: Team Spotlight (Flip Cards) */}
          <TeamSpotlight />

          {/* Section 6: Stats Metrics (Animated Counters) */}
          <StatsMetrics />

          {/* Section 7: Contact CTA (Magnetic Button) */}
          <ContactCTA />
        </main>
      </ParallaxProvider>
    </ReactLenis>
  );
}
