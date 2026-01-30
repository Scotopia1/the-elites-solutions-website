"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  start?: string;
  end?: string;
  scrub?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 1,
  start = "top 80%",
  end = "top 20%",
  scrub = false,
  className = "",
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const directionMap = {
      up: { y: 60, x: 0 },
      down: { y: -60, x: 0 },
      left: { y: 0, x: 60 },
      right: { y: 0, x: -60 },
    };

    const { x, y } = directionMap[direction];

    const animation = gsap.fromTo(
      element,
      {
        opacity: 0,
        x,
        y,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub: scrub ? 1 : false,
          once: !scrub,
        },
      }
    );

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [direction, delay, duration, start, end, scrub]);

  return (
    <div ref={elementRef} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}
