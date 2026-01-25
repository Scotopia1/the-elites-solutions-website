"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import styles from "./RoutineSlider.module.css";

export interface Step {
  number: string;
  title: string;
  description: string;
  icon?: string;
}

export interface RoutineSliderProps {
  title?: string;
  steps: Step[];
  className?: string;
}

export function RoutineSlider({
  title = "Our Workflow",
  steps,
  className = "",
}: RoutineSliderProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const wrapper = wrapperRef.current;
      const slider = sliderRef.current;
      const progressBar = progressBarRef.current;

      if (!section || !wrapper || !slider || !progressBar) return;

      // Only apply horizontal scroll on desktop
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const sliderWidth = slider.scrollWidth;
        const wrapperWidth = wrapper.offsetWidth;
        const moveDistance = -(sliderWidth - wrapperWidth);

        // Horizontal scroll animation
        const scrollTrigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 3}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          refreshPriority: -1,
          onUpdate: (self) => {
            const progress = self.progress;
            setScrollProgress(Math.round(progress * 100));

            // Move slider horizontally
            gsap.set(slider, {
              x: progress * moveDistance,
            });

            // Update progress bar
            gsap.set(progressBar, {
              scaleX: progress,
            });
          },
        });

        return () => {
          scrollTrigger.kill();
        };
      });

      // On mobile, just reveal steps vertically
      mm.add("(max-width: 768px)", () => {
        const stepCards = slider.querySelectorAll("[data-step]");

        stepCards.forEach((card, index) => {
          gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
            delay: index * 0.1,
          });
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={`${styles.routineSection} ${className}`}
    >
      <div className={styles.container}>
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.progressTrack}>
              <div
                ref={progressBarRef}
                className={styles.progressBar}
                style={{ transformOrigin: "left" }}
                role="progressbar"
                aria-valuenow={scrollProgress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Workflow progress"
              />
            </div>
          </div>
        )}

        <div ref={wrapperRef} className={styles.sliderWrapper}>
          {/* Scroll hint for mobile */}
          <div className={styles.scrollHint} aria-hidden="true">
            <span>Scroll horizontally →</span>
          </div>

          <div ref={sliderRef} className={styles.slider}>
            {steps.map((step, index) => (
              <div
                key={index}
                className={styles.stepCard}
                data-step={index}
                tabIndex={0}
                role="article"
                aria-label={`Step ${step.number}: ${step.title}`}
              >
                <div className={styles.stepNumber}>{step.number}</div>

                {step.icon && (
                  <div className={styles.iconContainer}>
                    <span className={styles.icon}>{step.icon}</span>
                  </div>
                )}

                <h3 className={styles.stepTitle}>{step.title}</h3>

                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}