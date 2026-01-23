"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { AnimatedCopy } from "@/components/animations/AnimatedCopy";
import styles from "./StatsSection.module.css";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  description?: string;
}

interface StatsSectionProps {
  title?: string;
  description?: string;
  stats: Stat[];
  className?: string;
}

export function StatsSection({
  title = "Our Impact",
  description,
  stats,
  className = "",
}: StatsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const statsContainer = statsRef.current;
    if (!section || !statsContainer) return;

    const statElements = statsContainer.querySelectorAll("[data-stat-value]");

    statElements.forEach((element) => {
      const target = parseInt(element.getAttribute("data-stat-value") || "0");
      const obj = { value: 0 };

      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          once: true,
        },
        onUpdate: () => {
          element.textContent = Math.round(obj.value).toString();
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && statsContainer.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, [stats]);

  return (
    <section ref={sectionRef} className={`${styles.statsSection} ${className}`}>
      <div className={styles.container}>
        {title && (
          <AnimatedCopy variant="slide-up" className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            {description && <p className={styles.description}>{description}</p>}
          </AnimatedCopy>
        )}

        <div ref={statsRef} className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statValue}>
                <span data-stat-value={stat.value}>0</span>
                {stat.suffix && <span className={styles.suffix}>{stat.suffix}</span>}
              </div>
              <h3 className={styles.statLabel}>{stat.label}</h3>
              {stat.description && (
                <p className={styles.statDescription}>{stat.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
