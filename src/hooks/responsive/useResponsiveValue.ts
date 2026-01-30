"use client";

import { useBreakpointValue } from "./useBreakpoint";

/**
 * Simplified hook for responsive values across mobile/tablet/desktop
 *
 * This hook provides a simpler API than useBreakpointValue by focusing
 * on the three main device categories.
 *
 * @param mobile - Value for mobile (< 768px)
 * @param tablet - Value for tablet (768px - 1023px), defaults to mobile if not provided
 * @param desktop - Value for desktop (>= 1024px), defaults to tablet/mobile if not provided
 * @returns The appropriate value for the current viewport
 *
 * @example
 * const columns = useResponsiveValue(1, 2, 4);
 * // Returns: 1 on mobile, 2 on tablet, 4 on desktop
 *
 * @example
 * const spacing = useResponsiveValue("gap-4", "gap-6", "gap-8");
 * // Returns: "gap-4" on mobile, "gap-6" on tablet, "gap-8" on desktop
 *
 * @example
 * // Tablet defaults to mobile value if not specified
 * const fontSize = useResponsiveValue("text-base", undefined, "text-lg");
 * // Returns: "text-base" on mobile/tablet, "text-lg" on desktop
 */
export function useResponsiveValue<T>(
  mobile: T,
  tablet?: T,
  desktop?: T
): T {
  const value = useBreakpointValue({
    xs: mobile,
    md: tablet ?? mobile,
    lg: desktop ?? tablet ?? mobile,
  });

  return value ?? mobile; // Fallback to mobile value
}

/**
 * Hook for responsive numeric values (columns, spacing, etc.)
 *
 * @param mobile - Numeric value for mobile
 * @param tablet - Numeric value for tablet (optional)
 * @param desktop - Numeric value for desktop (optional)
 * @returns The appropriate numeric value for the current viewport
 *
 * @example
 * const columns = useResponsiveNumber(1, 2, 3);
 * <div className={`grid grid-cols-${columns}`}>...</div>
 */
export function useResponsiveNumber(
  mobile: number,
  tablet?: number,
  desktop?: number
): number {
  return useResponsiveValue(mobile, tablet, desktop);
}

/**
 * Hook for responsive boolean flags
 *
 * Useful for enabling/disabling features based on viewport size.
 *
 * @param mobile - Boolean for mobile
 * @param tablet - Boolean for tablet (optional)
 * @param desktop - Boolean for desktop (optional)
 * @returns The appropriate boolean for the current viewport
 *
 * @example
 * const showSidebar = useResponsiveBoolean(false, false, true);
 * // Sidebar only shown on desktop
 *
 * @example
 * const enableAnimation = useResponsiveBoolean(false, true, true);
 * // Animation disabled on mobile only
 */
export function useResponsiveBoolean(
  mobile: boolean,
  tablet?: boolean,
  desktop?: boolean
): boolean {
  return useResponsiveValue(mobile, tablet, desktop);
}
