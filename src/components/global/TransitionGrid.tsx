"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./TransitionGrid.module.css";

interface TransitionGridProps {
  isActive: boolean;
  onComplete?: () => void;
}

export function TransitionGrid({ isActive, onComplete }: TransitionGridProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !overlayRef.current) return;

    const overlay = overlayRef.current;

    // Transition in animation
    gsap.fromTo(
      overlay,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        ease: "power4.inOut",
        onComplete: () => {
          // Hold for brief moment
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.4,
            delay: 0.2,
            ease: "power4.inOut",
            onComplete,
          });
        },
      }
    );
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div ref={overlayRef} className={styles.transitionGrid}>
      <div className={styles.grid} />
    </div>
  );
}
