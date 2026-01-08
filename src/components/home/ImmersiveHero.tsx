"use client";

import "./ImmersiveHero.css";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getScrollTriggerScrub, getAnimationConfig } from "@/lib/gsap-config";

gsap.registerPlugin(ScrollTrigger);

// Stats data
const stats = [
  { value: 150, suffix: "+", label: "Projects" },
  { value: 98, suffix: "%", label: "Success Rate" },
  { value: 24, suffix: "/7", label: "Support" },
  { value: 5, suffix: "★", label: "Rating" },
];

// Counter component for animated numbers
function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span ref={countRef} className="stat-value">
      {count}
      <span className="stat-suffix">{suffix}</span>
    </span>
  );
}

export default function ImmersiveHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [statsInView, setStatsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initial load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // GSAP animations
  useGSAP(
    () => {
      if (!containerRef.current || !isLoaded) return;

      const ctx = gsap.context(() => {
        // Tagline fade in
        gsap.fromTo(
          taglineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1.2 }
        );

        // CTA fade in
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.4 }
        );

        // Logo element scroll-triggered scaling
        if (mediaRef.current) {
          // Get device-aware animation config
          const config = getAnimationConfig();

          // Initial small state
          gsap.set(mediaRef.current, {
            scale: 0.8,
          });

          // Desktop: Full pinned scroll experience
          // Mobile: Simple fade and scale without pinning
          if (config.enablePinning) {
            ScrollTrigger.create({
              trigger: containerRef.current,
              start: "top top",
              end: "+=150%",
              pin: true,
              pinSpacing: true,
              scrub: getScrollTriggerScrub(1),
              onUpdate: (self) => {
                const progress = self.progress;

                // Scale from 0.8 to 1.2
                const scale = 0.8 + progress * 0.4;
                // Stats fade in at the end
                const statsOpacity = Math.max(0, (progress - 0.6) * 2.5);

                gsap.set(mediaRef.current, {
                  scale: scale,
                });

                if (statsRef.current) {
                  gsap.set(statsRef.current, { opacity: statsOpacity });
                  if (statsOpacity > 0.5 && !statsInView) {
                    setStatsInView(true);
                  }
                }
              },
            });
          } else {
            // Mobile fallback: Simple scroll animation without pinning
            gsap.to(mediaRef.current, {
              scale: 1.2,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                scrub: getScrollTriggerScrub(true),
              },
            });

            // Stats fade in on mobile
            if (statsRef.current) {
              gsap.to(statsRef.current, {
                opacity: 1,
                scrollTrigger: {
                  trigger: statsRef.current,
                  start: "top 80%",
                  onEnter: () => setStatsInView(true),
                },
              });
            }
          }
        }
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [isLoaded] }
  );

  return (
    <section ref={containerRef} className="immersive-hero">
      <div ref={heroRef} className="immersive-hero-inner">
        {/* Scaling logo element */}
        <div ref={mediaRef} className="immersive-media immersive-logo">
          <Image
            src="/images/logos/logo_light.png"
            alt="The Elites Solutions"
            fill
            priority
            className="media-image"
            style={{ objectFit: "contain", padding: "2rem" }}
          />
        </div>

        {/* Tagline */}
        <div ref={taglineRef} className="immersive-tagline">
          <p className="tagline-text">
            Where elite craftsmanship meets
            <br />
            <span className="tagline-accent">cutting-edge technology</span>
          </p>
        </div>

        {/* CTA Button */}
        <div ref={ctaRef} className="immersive-cta">
          <Link href="/services" className="cta-button">
            <span className="cta-text">Explore What We Do</span>
            <span className="cta-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="immersive-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                inView={statsInView}
              />
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="immersive-decoration decoration-left">
          <span>EXCELLENCE</span>
        </div>
        <div className="immersive-decoration decoration-right">
          <span>INNOVATION</span>
        </div>
      </div>
    </section>
  );
}
