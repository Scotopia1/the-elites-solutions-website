"use client";

import { useRef, useCallback, ReactNode } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface MagneticButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
  strength?: number; // How much the button follows cursor (0-1)
  elasticity?: number; // Bounce back strength
}

/**
 * Magnetic button that follows cursor movement
 * Uses GSAP for smooth animations
 */
export function MagneticButton({
  children,
  href,
  className = "",
  strength = 0.3,
  elasticity = 0.5,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (prefersReducedMotion || !buttonRef.current) return;

      const btn = buttonRef.current;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [strength, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion || !buttonRef.current) return;

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: `elastic.out(1, ${elasticity})`,
    });
  }, [elasticity, prefersReducedMotion]);

  return (
    <Link
      ref={buttonRef}
      href={href}
      className={`relative inline-flex items-center justify-center overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background fill effect */}
      <span className="absolute inset-0 bg-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-black">
        {children}
      </span>
    </Link>
  );
}

export default MagneticButton;
