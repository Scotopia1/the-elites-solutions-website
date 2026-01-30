/**
 * GSAP Configuration & Plugin Registration
 * Centralized setup for all GSAP animations across the app
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Global GSAP configuration
gsap.config({
  nullTargetWarn: false,
  force3D: true,
});

// ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: "play none none none",
  markers: false, // Set to true for debugging
});

// Export configured GSAP
export { gsap, ScrollTrigger, useGSAP };

// Utility: Refresh ScrollTrigger on resize (debounced)
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

// Cleanup utility for React components
export const killScrollTriggers = (context?: string) => {
  if (context) {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.id?.includes(context)) {
        trigger.kill();
      }
    });
  } else {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
};
