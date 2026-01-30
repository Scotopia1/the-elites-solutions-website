"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface SplitTextRevealProps {
  text: string;
  variant?: "slide" | "fade" | "scale" | "rotate";
  stagger?: number;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function SplitTextReveal({
  text,
  variant = "slide",
  stagger = 0.03,
  delay = 0,
  duration = 0.6,
  className = "",
  as: Component = "span",
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll(".char");

    // Animation configuration per variant
    const variantConfig = {
      slide: {
        from: { opacity: 0, y: 20, rotateX: -90 },
        to: { opacity: 1, y: 0, rotateX: 0, ease: "power4.out" },
      },
      fade: {
        from: { opacity: 0 },
        to: { opacity: 1, ease: "power2.out" },
      },
      scale: {
        from: { opacity: 0, scale: 0, rotateZ: -45 },
        to: { opacity: 1, scale: 1, rotateZ: 0, ease: "back.out(1.7)" },
      },
      rotate: {
        from: { opacity: 0, rotateY: 90, rotateZ: -10 },
        to: { opacity: 1, rotateY: 0, rotateZ: 0, ease: "power3.out" },
      },
    };

    const config = variantConfig[variant];

    // Animate characters
    gsap.fromTo(
      chars,
      config.from,
      {
        ...config.to,
        duration,
        delay,
        stagger,
        transformOrigin: "center center",
      }
    );

    // Cleanup
    return () => {
      gsap.killTweensOf(chars);
    };
  }, [text, variant, stagger, delay, duration]);

  // Split text into characters, preserving spaces
  const chars = text.split("").map((char, index) => {
    const isSpace = char === " ";
    return (
      <span
        key={index}
        className="char"
        style={{
          display: "inline-block",
          whiteSpace: isSpace ? "pre" : "normal",
          willChange: "transform, opacity",
        }}
      >
        {isSpace ? "\u00A0" : char}
      </span>
    );
  });

  return (
    <Component ref={containerRef as any} className={className}>
      {chars}
    </Component>
  );
}
