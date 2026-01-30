/**
 * Responsive Hooks
 *
 * A collection of React hooks for responsive design and device detection.
 * These hooks align with the Tailwind breakpoints defined in tailwind.config.ts.
 *
 * Breakpoints:
 * - xs: 480px (Small mobile - iPhone SE)
 * - sm: 640px (Mobile)
 * - md: 768px (Tablet)
 * - lg: 1024px (Desktop)
 * - xl: 1280px (Large desktop)
 * - 2xl: 1536px (Extra large)
 *
 * @example
 * import { useIsMobile, useResponsiveValue } from "@/hooks/responsive";
 *
 * function MyComponent() {
 *   const isMobile = useIsMobile();
 *   const columns = useResponsiveValue(1, 2, 4);
 *
 *   return (
 *     <div className={`grid grid-cols-${columns}`}>
 *       {isMobile ? <MobileUI /> : <DesktopUI />}
 *     </div>
 *   );
 * }
 */

export { useMediaQuery } from "./useMediaQuery";
export {
  useBreakpoint,
  useBreakpointValue,
  useCurrentBreakpoint,
  type Breakpoint,
} from "./useBreakpoint";
export {
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useIsSmallMobile,
  useIsLargeDesktop,
} from "./useIsMobile";
export {
  useResponsiveValue,
  useResponsiveNumber,
  useResponsiveBoolean,
} from "./useResponsiveValue";
