"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./FeaturedServicesHeader.module.css";

gsap.registerPlugin(ScrollTrigger);

export interface FeaturedServicesHeaderProps {
  title?: string;
  pinDuration?: number;
  className?: string;
}

export function FeaturedServicesHeader({
  title = "Our Services",
  pinDuration = 3,
  className = "",
}: FeaturedServicesHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!headerRef.current || !backgroundRef.current) return;

      // Pin the header during scroll
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * pinDuration}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
        refreshPriority: 1, // Calculate early for subsequent sections
        onUpdate: (self) => {
          // Fade background based on scroll progress
          if (backgroundRef.current) {
            const opacity = 1 - self.progress * 0.7; // Fade from 1 to 0.3
            gsap.set(backgroundRef.current, { opacity });
          }
        },
      });
    },
    { scope: headerRef }
  );

  return (
    <section
      ref={headerRef}
      className={`${styles.header} ${className}`}
      aria-label="Featured Services Section"
    >
      <div ref={backgroundRef} className={styles.background} />
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </section>
  );
}
