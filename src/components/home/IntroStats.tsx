/**
 * IntroStats Component
 *
 * Stats section with large headline from CGMWTNOV2025 (Orbit Matter).
 * Displays company metrics, mission statement, and approach.
 *
 * Features:
 * - 4-column stats grid with hover effects
 * - Large animated headline
 * - Descriptive copy
 * - GSAP scroll-triggered animations
 * - White text with gold accents
 *
 * Source: CGMWTNOV2025\orbit-matter - Intro section
 */

"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./IntroStats.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StatCardProps {
  label: string;
  count: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, count }) => {
  return (
    <div className={styles.stat}>
      <div className={styles.statCopy}>
        <div className={styles.statsCopyLabel}>
          <p>{label}</p>
        </div>
        <div className={styles.statsCopyCount}>
          <h3>{count}</h3>
        </div>
      </div>
    </div>
  );
};

const stats = [
  { label: "Projects Completed", count: "10+" },
  { label: "Years Experience", count: "3+" },
  { label: "Client Satisfaction", count: "100%" },
  { label: "Co-Founders", count: "3" },
];

export default function IntroStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!headlineRef.current || !copyRef.current) return;

      const headlineTrigger = ScrollTrigger.create({
        trigger: headlineRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            headlineRef.current,
            {
              clipPath: "inset(0 0 100% 0)",
              opacity: 1,
            },
            {
              clipPath: "inset(0 0 0% 0)",
              opacity: 1,
              duration: 0.75,
              ease: "power3.out",
            }
          );
        },
        once: true,
      });

      const copyTrigger = ScrollTrigger.create({
        trigger: copyRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(
            copyRef.current,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            }
          );
        },
        once: true,
      });

      // Cleanup function
      return () => {
        headlineTrigger.kill();
        copyTrigger.kill();
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section ref={sectionRef} className={styles.intro}>
      <div className={styles.container}>
        {/* Stats Grid */}
        <div className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <StatCard key={index} label={stat.label} count={stat.count} />
          ))}
        </div>

        {/* Main Headline */}
        <div className={styles.introHeader}>
          <h1 ref={headlineRef}>
            Results
            <br />
            That Speak
          </h1>
        </div>

        {/* Description */}
        <div className={styles.introCopy}>
          <div ref={copyRef} className={styles.introCopyWrapper}>
            <h3>
              From luxury e-commerce to award-worthy 3D experiences.
              From AI-powered platforms to digital transformation.
              Your business could be next.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
