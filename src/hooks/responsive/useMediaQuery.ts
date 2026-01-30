"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook for media query matching
 *
 * @param query - Media query string (e.g., "(min-width: 768px)")
 * @returns boolean - Whether the media query matches
 *
 * @example
 * const isWideScreen = useMediaQuery("(min-width: 1024px)");
 * const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with false for SSR safety
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Guard against SSR
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Create event listener
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener("change", listener);
    } else {
      // Legacy browsers (IE11, older Safari)
      media.addListener(listener);
    }

    // Cleanup
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}
