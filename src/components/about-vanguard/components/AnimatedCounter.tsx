"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Animated number counter with scroll trigger
 * Uses requestAnimationFrame for smooth animation
 */
export function AnimatedCounter({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Skip animation if reduced motion
    if (prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(target * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, target, duration, prefersReducedMotion]);

  return (
    <span
      ref={ref}
      className={className}
      aria-live="polite"
      aria-atomic="true"
    >
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export default AnimatedCounter;
