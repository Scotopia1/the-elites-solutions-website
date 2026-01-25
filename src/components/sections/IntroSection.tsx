"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./IntroSection.module.css";

export interface IntroSectionProps {
  label?: string;
  title: string;
  content: string;
  imageSrc?: string;
  imageAlt?: string; // Required when imageSrc is provided
  className?: string;
}

export function IntroSection({
  label = "MISSION",
  title,
  content,
  imageSrc,
  imageAlt = "",
  className = "",
}: IntroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Validate imageAlt when image is provided
  useEffect(() => {
    if (imageSrc && !imageAlt) {
      console.error(
        "IntroSection: imageAlt is required when imageSrc is provided. Please provide meaningful alt text for accessibility."
      );
    }
  }, [imageSrc, imageAlt]);

  useEffect(() => {
    const section = sectionRef.current;
    const labelEl = labelRef.current;
    const contentEl = contentRef.current;
    const imageEl = imageRef.current;

    if (!section || !labelEl || !contentEl) return;

    // Flicker effect for label
    const flickerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        once: true,
      },
    });

    flickerTimeline
      .fromTo(
        labelEl,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.05,
          repeat: 5,
          yoyo: true,
          ease: "steps(2)",
        }
      )
      .to(labelEl, {
        opacity: 1,
        duration: 0,
      });

    // Scroll-triggered fade-in for content
    gsap.fromTo(
      contentEl,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: contentEl,
          start: "top 75%",
          once: true,
        },
      }
    );

    // Image reveal if present
    if (imageEl) {
      gsap.fromTo(
        imageEl,
        {
          opacity: 0,
          x: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: imageEl,
            start: "top 75%",
            once: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger &&
          section.contains(trigger.trigger as Node)
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.introSection} ${className}`}
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.textColumn}>
            <div ref={labelRef} className={styles.label}>
              {label}
            </div>

            <div ref={contentRef} className={styles.content}>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.copy}>{content}</p>
            </div>
          </div>

          {imageSrc && (
            <div ref={imageRef} className={styles.imageColumn}>
              <div className={styles.imageWrapper}>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}