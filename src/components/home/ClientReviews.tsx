/**
 * ClientReviews Component - Gallery Installation Design
 *
 * Awwwards-style testimonial section with staggered asymmetric grid,
 * 3D tilt effects, and cinematic scroll animations.
 *
 * Design Features:
 * - Staggered asymmetric grid with diagonal card rotations
 * - Giant decorative quotation mark watermark
 * - Word-by-word quote reveal animations
 * - 3D mouse-follow tilt on hover
 * - Gold accent theme (#FFD700)
 *
 * Animations: GSAP ScrollTrigger with useGSAP hook
 * Performance: GPU-accelerated transforms only
 */

"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./ClientReviews.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "The Elites transformed our outdated web presence into a modern, high-converting platform that tripled our lead generation in just 3 months.",
    author: "Sarah Mitchell",
    role: "CEO",
    company: "TechVision Solutions",
  },
  {
    id: 2,
    quote:
      "They didn't just build a website — they crafted a digital experience that authentically represents who we are and resonates with our audience.",
    author: "Marcus Chen",
    role: "Founder",
    company: "Apex Digital",
  },
  {
    id: 3,
    quote:
      "Their ability to blend cutting-edge design with flawless functionality resulted in a product that truly stands out in our industry.",
    author: "Elena Rodriguez",
    role: "CMO",
    company: "Quantum Innovations",
  },
  {
    id: 4,
    quote:
      "The Elites brought our vision to life with precision and creativity. The seamless integration exceeded our ambitious goals.",
    author: "David Park",
    role: "CTO",
    company: "NexGen Systems",
  },
  {
    id: 5,
    quote:
      "Their deep understanding of both technology and business objectives resulted in a platform that drives real value and measurable growth.",
    author: "Jennifer Clarke",
    role: "VP of Operations",
    company: "Frontier Labs",
  },
  {
    id: 6,
    quote:
      "Excellence at every stage. Their commitment to quality made them an invaluable partner in our digital transformation journey.",
    author: "Michael Torres",
    role: "Director",
    company: "Summit Ventures",
  },
];

// Card configurations for staggered layout
const cardConfigs = [
  { rotateZ: -2, rotateY: 3, offsetX: 0, offsetY: 0, size: "hero", delay: 0 },
  { rotateZ: 1.5, rotateY: -2, offsetX: 20, offsetY: 40, size: "normal", delay: 0.1 },
  { rotateZ: -1, rotateY: 4, offsetX: -15, offsetY: 20, size: "normal", delay: 0.2 },
  { rotateZ: 2.5, rotateY: -3, offsetX: 10, offsetY: -30, size: "hero", delay: 0.15 },
  { rotateZ: -1.5, rotateY: 2, offsetX: -25, offsetY: 50, size: "normal", delay: 0.25 },
  { rotateZ: 1, rotateY: -4, offsetX: 30, offsetY: 10, size: "normal", delay: 0.3 },
];

interface CardProps {
  testimonial: Testimonial;
  config: (typeof cardConfigs)[0];
  index: number;
}

function TestimonialCard({ testimonial, config, index }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect on mouse move
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !isHovered) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation based on mouse position (max 8 degrees)
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      gsap.to(cardRef.current, {
        rotateX: rotateX + config.rotateZ,
        rotateY: rotateY + config.rotateY,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [isHovered, config.rotateZ, config.rotateY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: config.rotateY,
        rotateZ: config.rotateZ,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [config.rotateY, config.rotateZ]);

  // Split quote into words for animation
  const words = testimonial.quote.split(" ");

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${styles[`card${index + 1}`]} ${config.size === "hero" ? styles.heroCard : ""}`}
      style={
        {
          "--card-rotate-z": `${config.rotateZ}deg`,
          "--card-rotate-y": `${config.rotateY}deg`,
          "--card-offset-x": `${config.offsetX}px`,
          "--card-offset-y": `${config.offsetY}px`,
        } as React.CSSProperties
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-card-index={index}
    >
      <div className={styles.cardInner}>
        {/* Decorative quote mark inside card */}
        <span className={styles.cardQuoteMark} aria-hidden="true">
          &ldquo;
        </span>

        <blockquote ref={quoteRef} className={styles.quote}>
          <p className={styles.quoteText}>
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className={styles.word} style={{ "--word-index": wordIndex } as React.CSSProperties}>
                {word}{" "}
              </span>
            ))}
          </p>
        </blockquote>

        <cite className={styles.citation}>
          <span className={styles.author}>{testimonial.author}</span>
          <span className={styles.role}>
            {testimonial.role}, {testimonial.company}
          </span>
        </cite>
      </div>

      {/* Hover glow effect */}
      <div className={`${styles.cardGlow} ${isHovered ? styles.cardGlowActive : ""}`} aria-hidden="true" />
    </div>
  );
}

export default function ClientReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current || !gridRef.current || prefersReducedMotion) return;

      const cards = gridRef.current.querySelectorAll(`.${styles.card}`);
      const header = headerRef.current;

      // Header animation
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: false,
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Staggered card entrance animations
      cards.forEach((card, index) => {
        const config = cardConfigs[index];
        const direction = index % 3; // 0: left, 1: bottom, 2: right

        let fromX = 0;
        let fromY = 100;

        if (direction === 0) {
          fromX = -150;
          fromY = 50;
        } else if (direction === 2) {
          fromX = 150;
          fromY = 50;
        }

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: fromX,
            y: fromY,
            rotateZ: config.rotateZ * 2,
            rotateY: config.rotateY * 2,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotateZ: config.rotateZ,
            rotateY: config.rotateY,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 60%",
              scrub: false,
              toggleActions: "play none none reverse",
            },
          }
        );

        // Word-by-word reveal for quotes
        const words = card.querySelectorAll(`.${styles.word}`);
        gsap.fromTo(
          words,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.03,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 55%",
              scrub: false,
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Parallax effect on scroll for the entire grid
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
        refreshPriority: -2,
        onUpdate: (self) => {
          if (!gridRef.current) return;
          const yMove = self.progress * 50 - 25;
          gsap.set(gridRef.current, { y: yMove });
        },
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section ref={sectionRef} className={styles.gallerySection} aria-labelledby="client-reviews-heading">
      {/* Giant background quotation mark */}
      <div className={styles.backgroundQuote} aria-hidden="true">
        &ldquo;
      </div>

      {/* Decorative gold lines */}
      <div className={styles.decorativeLines} aria-hidden="true">
        <div className={styles.line1} />
        <div className={styles.line2} />
      </div>

      {/* Section header */}
      <div ref={headerRef} className={styles.sectionHeader}>
        <span className={styles.headerLabel}>Testimonials</span>
        <h2 id="client-reviews-heading" className={styles.headerTitle}>
          What Our Clients Say
        </h2>
        <p className={styles.headerSubtitle}>Stories of transformation and success</p>
      </div>

      {/* Staggered testimonial grid */}
      <div ref={gridRef} className={styles.galleryGrid}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} config={cardConfigs[index]} index={index} />
        ))}
      </div>
    </section>
  );
}
