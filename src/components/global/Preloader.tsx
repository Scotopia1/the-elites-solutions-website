"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./Preloader.module.css";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Minimum display time
    const minDisplayTime = 2000;
    const startTime = Date.now();

    // Wait for window load
    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

      setTimeout(() => {
        // Fade out animation
        gsap.to(container, {
          opacity: 0,
          duration: 0.8,
          ease: "power4.out",
          onComplete: () => {
            setIsComplete(true);
            onComplete?.();
          },
        });
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <div ref={containerRef} className={styles.preloader}>
      <div className={styles.grid} />
      <div className={styles.ringContainer}>
        <div className={styles.ring} />
        <div className={styles.ring} />
        <div className={styles.ring} />
      </div>
      <div className={styles.logo}>The Elites</div>
    </div>
  );
}
