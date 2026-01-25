"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useHeroTimer } from "@/hooks/useHeroTimer";
import styles from "./HeroSection.module.css";

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  imageSrc: string;
  imageAlt: string; // Required for accessibility
  showTimer?: boolean;
  callouts?: Array<{ icon?: string; text: string }>;
  className?: string;
  priority?: boolean; // Control image loading priority (default: false)
}

export function HeroSection({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  showTimer = false,
  callouts = [],
  className = "",
  priority = false,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const calloutsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const time = useHeroTimer();

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Title clip-path reveal animation
      if (titleRef.current) {
        gsap.set(titleRef.current, {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        });

        tl.to(titleRef.current, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.2,
          ease: "power4.inOut",
        });
      }

      // Subtitle fade-in
      if (subtitleRef.current) {
        tl.from(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        );
      }

      // Description fade-in
      if (descriptionRef.current) {
        tl.from(
          descriptionRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        );
      }

      // Callout badges stagger animation
      if (calloutsRef.current) {
        const badges = calloutsRef.current.querySelectorAll(`.${styles.badge}`);
        tl.from(
          badges,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
          },
          "-=0.4"
        );
      }

      // Overlay gradient fade-in
      if (overlayRef.current) {
        tl.from(
          overlayRef.current,
          {
            opacity: 0,
            duration: 1,
          },
          0
        );
      }
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className={`${styles.heroSection} ${className}`}
      aria-label="Hero section"
    >
      {/* Background Image */}
      <div className={styles.backgroundWrapper}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          quality={90}
          className={styles.backgroundImage}
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div ref={overlayRef} className={styles.gradientOverlay} />
      </div>

      {/* Content Container */}
      <div className={styles.contentWrapper}>
        <div className={styles.container}>
          {/* Optional Timer */}
          {showTimer && time && (
            <div
              className={styles.timer}
              aria-live="polite"
              aria-label="Current UTC time"
            >
              {time}
            </div>
          )}

          {/* Main Heading */}
          <h1 ref={titleRef} className={styles.title}>
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p ref={subtitleRef} className={styles.subtitle}>
              {subtitle}
            </p>
          )}

          {/* Description */}
          {description && (
            <p ref={descriptionRef} className={styles.description}>
              {description}
            </p>
          )}

          {/* Callout Badges */}
          {callouts.length > 0 && (
            <div ref={calloutsRef} className={styles.callouts}>
              {callouts.map((callout, index) => (
                <div key={index} className={styles.badge}>
                  {callout.icon && (
                    <span className={styles.badgeIcon} aria-hidden="true">
                      {callout.icon}
                    </span>
                  )}
                  <span className={styles.badgeText}>{callout.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
