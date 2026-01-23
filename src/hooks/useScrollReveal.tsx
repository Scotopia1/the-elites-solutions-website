"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface UseScrollRevealOptions {
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  start?: string;
  end?: string;
  scrub?: boolean;
  stagger?: number;
}

export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
) {
  const {
    direction = "up",
    delay = 0,
    duration = 1,
    start = "top 80%",
    end = "top 20%",
    scrub = false,
    stagger = 0,
  } = options;

  const elementRef = useRef<T>(null);

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

    // Check if element has children to stagger
    const targets = stagger > 0 && element.children.length > 0
      ? Array.from(element.children)
      : element;

    const animation = gsap.fromTo(
      targets,
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
        stagger: stagger > 0 ? stagger : undefined,
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
  }, [direction, delay, duration, start, end, scrub, stagger]);

  return elementRef;
}
