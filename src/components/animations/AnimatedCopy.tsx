"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "@/lib/gsap";

type AnimationVariant = "slide-up" | "fade-in" | "flicker" | "clip-reveal";

interface AnimatedCopyProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
}

export function AnimatedCopy({
  children,
  variant = "slide-up",
  delay = 0,
  duration = 0.8,
  className = "",
}: AnimatedCopyProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const animations: Record<AnimationVariant, () => void> = {
      "slide-up": () => {
        gsap.fromTo(
          element,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration,
            delay,
            ease: "power4.out",
          }
        );
      },

      "fade-in": () => {
        gsap.fromTo(
          element,
          { opacity: 0 },
          {
            opacity: 1,
            duration,
            delay,
            ease: "power4.out",
          }
        );
      },

      flicker: () => {
        gsap.fromTo(
          element,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.1,
            delay,
            repeat: 3,
            yoyo: true,
            ease: "steps(2)",
            onComplete: () => {
              gsap.set(element, { opacity: 1 });
            },
          }
        );
      },

      "clip-reveal": () => {
        gsap.fromTo(
          element,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration,
            delay,
            ease: "power4.out",
          }
        );
      },
    };

    animations[variant]();
  }, [variant, delay, duration]);

  return (
    <div ref={elementRef} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}
