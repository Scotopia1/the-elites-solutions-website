'use client';

import { useMemo } from 'react';

/**
 * iOS-optimized Lenis configuration hook
 * Detects device and returns appropriate smooth scroll settings
 */
export function useLenisConfig() {
  return useMemo(() => {
    // iOS/Safari detection
    const isIOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = typeof window !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // iOS-optimized settings (lighter smoothing, faster response)
    if (isIOS || isSafari) {
      return {
        lerp: 0.15, // Faster response on iOS (higher = faster, default 0.1)
        duration: 1.0, // Shorter duration for iOS (default 1.2)
        smoothWheel: true,
        smoothTouch: false, // CRITICAL: Disable touch smoothing on iOS to prevent conflict
        touchMultiplier: 2, // Natural touch sensitivity
        infinite: false,
      };
    }

    // Desktop/Android settings (smoother, more dramatic)
    return {
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false, // Don't smooth touch even on desktop (prevents issues)
      touchMultiplier: 2,
      infinite: false,
    };
  }, []);
}
