"use client";

import { useBreakpoint } from "./useBreakpoint";

/**
 * Hook to check if device is mobile (< 768px)
 *
 * @returns boolean - True if viewport is below md breakpoint
 *
 * @example
 * const isMobile = useIsMobile();
 * if (isMobile) {
 *   // Render mobile-specific UI
 * }
 */
export function useIsMobile(): boolean {
  return !useBreakpoint("md"); // < 768px
}

/**
 * Hook to check if device is tablet (768px - 1023px)
 *
 * @returns boolean - True if viewport is between md and lg breakpoints
 *
 * @example
 * const isTablet = useIsTablet();
 * if (isTablet) {
 *   // Render tablet-optimized UI
 * }
 */
export function useIsTablet(): boolean {
  const isMd = useBreakpoint("md"); // >= 768px
  const isLg = useBreakpoint("lg"); // >= 1024px
  return isMd && !isLg; // 768px - 1023px
}

/**
 * Hook to check if device is desktop (>= 1024px)
 *
 * @returns boolean - True if viewport is at or above lg breakpoint
 *
 * @example
 * const isDesktop = useIsDesktop();
 * if (isDesktop) {
 *   // Enable desktop-only features
 * }
 */
export function useIsDesktop(): boolean {
  return useBreakpoint("lg"); // >= 1024px
}

/**
 * Hook to check if device is small mobile (< 480px)
 *
 * @returns boolean - True if viewport is below xs breakpoint
 *
 * @example
 * const isSmallMobile = useIsSmallMobile();
 * if (isSmallMobile) {
 *   // Optimize for very small screens (iPhone SE)
 * }
 */
export function useIsSmallMobile(): boolean {
  return !useBreakpoint("xs"); // < 480px
}

/**
 * Hook to check if device is large desktop (>= 1536px)
 *
 * @returns boolean - True if viewport is at or above 2xl breakpoint
 *
 * @example
 * const isLargeDesktop = useIsLargeDesktop();
 * if (isLargeDesktop) {
 *   // Utilize extra screen space
 * }
 */
export function useIsLargeDesktop(): boolean {
  return useBreakpoint("2xl"); // >= 1536px
}
