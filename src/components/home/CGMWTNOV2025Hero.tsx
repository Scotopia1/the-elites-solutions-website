/**
 * CGMWTNOV2025Hero Component
 *
 * Premium hero section with CGMWTNOV2025 (Orbit Matter) design aesthetic.
 *
 * Features:
 * - Clip-path beveled container (desktop only)
 * - Scanline overlay animation (30s loop)
 * - UTC timer with zone calculation
 * - Text reveal animations (CSS clip-path method)
 * - Hero image with gradient overlay
 * - Gooey filter effect
 * - Fully responsive
 *
 * Source: CGMWTNOV2025 (Orbit Matter) project
 * Adapted to React + TypeScript with Elites branding
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./CGMWTNOV2025Hero.module.css";
import { GooeyFilter } from "@/components/shared/GooeyFilter";
import Image from "next/image";
import Link from "next/link";

export default function CGMWTNOV2025Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [timer, setTimer] = useState({ zone: "00", time: "00:00" });

  // Timer update every minute (UTC-based zone calculation)
  useEffect(() => {
    const updateTimer = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "UTC",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      };

      const utcTime = new Date().toLocaleString("en-US", options);
      const hour = parseInt(utcTime.split(":")[0]);
      const zone = String(Math.floor(hour / 4) + 1).padStart(2, "0");

      setTimer({ zone, time: utcTime });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // GSAP animations
  useGSAP(
    () => {
      // Timer flicker effect (4 repeats on load)
      gsap.to(".hero-timer", {
        delay: 1,
        duration: 0.1,
        opacity: 1,
        ease: "power2.inOut",
        repeat: 4,
        yoyo: true,
      });

      // Text reveals using CSS clip-path (no SplitText required)
      gsap.fromTo(
        ".hero-headline",
        { clipPath: "inset(0 0 100% 0)", opacity: 1 },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.75,
          ease: "power3.out",
          delay: 0.6,
        }
      );

      gsap.fromTo(
        ".hero-body",
        { clipPath: "inset(0 0 100% 0)", opacity: 1 },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.75,
          ease: "power3.out",
          delay: 0.75,
        }
      );

      gsap.fromTo(
        ".hero-callout",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.85,
          stagger: 0.15,
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <>
      <GooeyFilter />
      <section ref={containerRef} className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroImgContainer}>
            {/* Hero Image */}
            <div className={styles.heroImg}>
              <Image
                src="/images/home/hero-img.jpg"
                alt=""
                fill
                className="object-cover"
                priority
                quality={90}
              />
            </div>

            {/* Scanline Overlay */}
            <div className={styles.heroImgOverlay} />

            {/* Gradient Overlay */}
            <div className={styles.heroImgGradient} />
          </div>

          {/* Content Overlay */}
          <div className={styles.heroContent}>
            <div className={styles.container}>
              {/* Top Nav Section with Timer */}
              <div className={styles.heroContentNav}>
                <div className="hero-timer opacity-0">
                  <p className={styles.heroTimer}>
                    Zone {timer.zone} __ {timer.time}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <div className={styles.heroContentHeader}>
                <h1
                  className="hero-headline"
                  style={{ clipPath: "inset(0 0 100% 0)" }}
                >
                  Your Business.
                  <br />
                  Automated. Unstoppable.
                </h1>
              </div>

              {/* Footer Section with Body Copy and Callouts */}
              <div className={styles.heroContentFooter}>
                <div className={styles.heroFooterCopy}>
                  <p
                    className="hero-body bodyCopy"
                    style={{ clipPath: "inset(0 0 100% 0)" }}
                  >
                    Custom software that turns hours into minutes.
                    $2M+ revenue generated for clients. Zero excuses.
                  </p>
                </div>

                <div className={styles.heroCallout}>
                  <p className="hero-callout">50+ Projects Shipped</p>
                  <p className="hero-callout">98% Client Satisfaction</p>
                  <Link
                    href="/work"
                    className={`hero-callout ${styles.heroCtaLink}`}
                  >
                    Start Your Project →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
