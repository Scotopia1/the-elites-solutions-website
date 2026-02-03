"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

/**
 * Reduced Motion Context Interface
 */
interface ReducedMotionContextType {
  /** True if user prefers reduced motion */
  prefersReducedMotion: boolean;
}

/**
 * Reduced Motion Context
 */
const ReducedMotionContext = createContext<ReducedMotionContextType>({
  prefersReducedMotion: false,
});

/**
 * Reduced Motion Provider
 *
 * Provides global access to user's reduced motion preference.
 * Automatically updates when user changes system settings.
 *
 * @example
 * // In app/layout.tsx
 * import { ReducedMotionProvider } from "@/components/providers/ReducedMotionProvider";
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <ReducedMotionProvider>
 *           {children}
 *         </ReducedMotionProvider>
 *       </body>
 *     </html>
 *   );
 * }
 *
 * @example
 * // In components
 * import { useReducedMotion } from "@/components/providers/ReducedMotionProvider";
 *
 * function MyComponent() {
 *   const prefersReducedMotion = useReducedMotion();
 *
 *   if (prefersReducedMotion) {
 *     return <StaticVersion />;
 *   }
 *   return <AnimatedVersion />;
 * }
 */
export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Guard against SSR
    if (typeof window === "undefined") return;

    // Create media query
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Create event listener
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);

      // Log for debugging (remove in production)
      if (process.env.NODE_ENV === "development") {
        console.log(`[ReducedMotion] Preference changed: ${e.matches}`);
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Legacy browsers (IE11, older Safari)
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return (
    <ReducedMotionContext.Provider value={{ prefersReducedMotion }}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

/**
 * Hook to access reduced motion preference
 *
 * @returns boolean - True if user prefers reduced motion
 *
 * @example
 * const prefersReducedMotion = useReducedMotion();
 *
 * return (
 *   <motion.div
 *     animate={prefersReducedMotion ? {} : { scale: 1.1 }}
 *     transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
 *   />
 * );
 */
export function useReducedMotion(): boolean {
  const context = useContext(ReducedMotionContext);

  if (context === undefined) {
    // Fallback for usage outside provider
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  }

  return context.prefersReducedMotion;
}
