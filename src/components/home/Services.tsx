/**
 * Services Component - Layered Depth Reveal (Concept 1)
 *
 * Multi-layer system where each service is a full-viewport "sheet" that slides over previous ones.
 * Three layers per card: Background (image + ken burns), Mid (glassmorphism overlay), Foreground (typography)
 *
 * Features:
 * - GSAP ScrollTrigger for pinning section and z-index choreography
 * - Framer Motion for stagger sequences (number → title → metric → description)
 * - Parallax: Background images move 30% slower than foreground
 * - Gold accent line on left edge (grows based on scroll progress)
 * - Scroll snap points every 100vh
 * - GPU-optimized transforms (translate3d, scale, opacity)
 * - Full accessibility support with keyboard navigation
 * - Reduced motion support
 */

"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { servicesData } from "./servicesData";
import styles from "./Services.module.css";

gsap.registerPlugin(ScrollTrigger);

interface ServiceLayerProps {
  service: typeof servicesData[0];
  index: number;
  total: number;
  onNavigate: (slug: string) => void;
}

const ServiceLayer: React.FC<ServiceLayerProps> = ({ service, index, total, onNavigate }) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!layerRef.current || prefersReducedMotion) return;

    const layer = layerRef.current;
    const background = backgroundRef.current;
    const accent = accentRef.current;

    // Calculate start and end points for this layer
    const start = index * 100; // 0vh, 100vh, 200vh, etc.
    const end = start + 100; // 100vh, 200vh, 300vh, etc.

    // Slide up animation
    gsap.fromTo(
      layer,
      { y: "100vh", opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: ".services-container",
          start: `${start}vh top`,
          end: `${start + 50}vh top`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );

    // Z-index choreography - current layer should be on top
    gsap.to(layer, {
      zIndex: total - index,
      scrollTrigger: {
        trigger: ".services-container",
        start: `${start}vh top`,
        end: `${end}vh top`,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    // Ken Burns effect on background (subtle zoom)
    if (background) {
      gsap.fromTo(
        background,
        { scale: 1 },
        {
          scale: 1.1,
          scrollTrigger: {
            trigger: ".services-container",
            start: `${start}vh top`,
            end: `${end}vh top`,
            scrub: 2,
            invalidateOnRefresh: true,
          },
        }
      );
    }

    // Gold accent line grows when active
    if (accent) {
      gsap.fromTo(
        accent,
        { scaleY: 0 },
        {
          scaleY: 1,
          scrollTrigger: {
            trigger: ".services-container",
            start: `${start}vh top`,
            end: `${start + 50}vh top`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    }
  }, { scope: layerRef });

  // Stagger animation variants for content reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // 50ms delays
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={layerRef}
      className={styles.serviceLayer}
      onClick={() => onNavigate(service.slug)}
      role="button"
      tabIndex={0}
      aria-label={`View ${service.title} service details`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onNavigate(service.slug);
        }
      }}
    >
      {/* Gold Accent Line */}
      <div ref={accentRef} className={styles.accentLine} />

      {/* Background Layer - Image with Ken Burns */}
      <div ref={backgroundRef} className={styles.backgroundLayer}>
        <img
          src={service.image}
          alt=""
          aria-hidden="true"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Mid Layer - Glassmorphism Overlay */}
      <div className={styles.midLayer} />

      {/* Foreground Layer - Typography */}
      <motion.div
        className={styles.foregroundLayer}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }}
      >
        <motion.p className={styles.serviceNumber} variants={itemVariants}>
          {service.number}
        </motion.p>

        <motion.h2 className={styles.serviceTitle} variants={itemVariants}>
          {service.title}
        </motion.h2>

        <motion.p className={styles.serviceMetric} variants={itemVariants}>
          {service.category}
        </motion.p>

        <motion.p className={styles.serviceDescription} variants={itemVariants}>
          Click to explore our {service.title.toLowerCase()} capabilities and see how we deliver exceptional results.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default function Services() {
  const router = useRouter();
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const container = containerRef.current;

    // Pin the entire services container during scroll
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `+=${servicesData.length * 100}vh`,
      pin: true,
      pinSpacing: true,
      scrub: true,
      invalidateOnRefresh: true,
      refreshPriority: -1,
    });

    // Refresh ScrollTrigger on window resize
    const resizeHandler = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, { scope: containerRef });

  const handleNavigate = (slug: string) => {
    router.push(`/services/${slug}`);
  };

  return (
    <section
      ref={containerRef}
      className={`${styles.servicesContainer} services-container`}
      aria-label="Our Services"
    >
      {/* Section Header */}
      <motion.div
        className={styles.servicesHeader}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1>
          Our<br />Services
        </h1>
      </motion.div>

      {/* Layered Service Cards */}
      <div className={styles.layersWrapper}>
        {servicesData.map((service, index) => (
          <ServiceLayer
            key={service.id}
            service={service}
            index={index}
            total={servicesData.length}
            onNavigate={handleNavigate}
          />
        ))}
      </div>
    </section>
  );
}
