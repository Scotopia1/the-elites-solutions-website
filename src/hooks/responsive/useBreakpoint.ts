"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * Breakpoint type matching Tailwind config
 * xs: 480px - Small mobile (iPhone SE)
 * sm: 640px - Mobile
 * md: 768px - Tablet
 * lg: 1024px - Desktop
 * xl: 1280px - Large desktop
 * 2xl: 1536px - Extra large
 */
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Breakpoint values matching tailwind.config.ts
 */
const breakpoints: Record<Breakpoint, string> = {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

/**
 * Hook to check if viewport is at or above a specific breakpoint
 *
 * @param breakpoint - Breakpoint to check
 * @returns boolean - True if viewport >= breakpoint
 *
 * @example
 * const isDesktop = useBreakpoint("lg"); // True if >= 1024px
 * const isMobile = useBreakpoint("md"); // True if >= 768px
 */
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  return useMediaQuery(`(min-width: ${breakpoints[breakpoint]})`);
}

/**
 * Hook to get responsive values based on current breakpoint
 *
 * Returns the value for the largest matching breakpoint.
 * Falls back to smallest defined value if no breakpoint matches.
 *
 * @param values - Object with breakpoint keys and corresponding values
 * @returns The value for the current breakpoint
 *
 * @example
 * const columns = useBreakpointValue({
 *   xs: 1,
 *   md: 2,
 *   lg: 4
 * }); // Returns 1 on mobile, 2 on tablet, 4 on desktop
 */
export function useBreakpointValue<T>(
  values: Partial<Record<Breakpoint, T>>
): T | undefined {
  const is2xl = useBreakpoint("2xl");
  const isXl = useBreakpoint("xl");
  const isLg = useBreakpoint("lg");
  const isMd = useBreakpoint("md");
  const isSm = useBreakpoint("sm");
  const isXs = useBreakpoint("xs");

  // Return largest matching breakpoint value
  if (is2xl && values["2xl"] !== undefined) return values["2xl"];
  if (isXl && values.xl !== undefined) return values.xl;
  if (isLg && values.lg !== undefined) return values.lg;
  if (isMd && values.md !== undefined) return values.md;
  if (isSm && values.sm !== undefined) return values.sm;
  if (isXs && values.xs !== undefined) return values.xs;

  // Return first defined value as fallback
  const definedValues = Object.values(values).filter((v) => v !== undefined);
  return definedValues.length > 0 ? definedValues[0] : undefined;
}

/**
 * Hook to get current breakpoint name
 *
 * @returns Current breakpoint name or "xs" for smallest screens
 *
 * @example
 * const breakpoint = useCurrentBreakpoint(); // "md", "lg", etc.
 */
export function useCurrentBreakpoint(): Breakpoint {
  const is2xl = useBreakpoint("2xl");
  const isXl = useBreakpoint("xl");
  const isLg = useBreakpoint("lg");
  const isMd = useBreakpoint("md");
  const isSm = useBreakpoint("sm");
  const isXs = useBreakpoint("xs");

  if (is2xl) return "2xl";
  if (isXl) return "xl";
  if (isLg) return "lg";
  if (isMd) return "md";
  if (isSm) return "sm";
  if (isXs) return "xs";

  return "xs"; // < 480px
}
