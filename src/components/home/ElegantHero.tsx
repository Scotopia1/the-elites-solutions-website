"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function ElegantHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animations
      gsap.fromTo(
        ".elegant-logo",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.5 }
      );
      gsap.fromTo(
        ".elegant-headline",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.8 }
      );
      gsap.fromTo(
        ".elegant-subheadline",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1.1 }
      );
      gsap.fromTo(
        ".elegant-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1.4 }
      );

      // Spotlight Pulse Animation (Replaces CSS keyframes)
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          scale: 1.2,
          opacity: 0.15,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Spotlight */}
      <div 
        ref={spotlightRef}
        className="absolute top-1/2 left-1/2 w-[200%] pb-[200%] -translate-x-1/2 -translate-y-1/2 rounded-full z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0) 40%, transparent 70%)',
          opacity: 0.1,
          transform: 'translate(-50%, -50%) scale(0.8)' // Initial state matching GSAP start
        }}
      />

      <div className="relative z-20 text-center px-8 max-w-4xl">
        <h1 className="elegant-headline font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-[#E5D8B3] leading-tight mb-6 drop-shadow-2xl">
          Engineering Digital Masterpieces
        </h1>
        <p className="elegant-subheadline font-sans text-base md:text-lg lg:text-xl font-light text-[#C5B893] leading-relaxed mb-10 max-w-2xl mx-auto">
          We blend unparalleled craftsmanship with cutting-edge technology to forge bespoke digital solutions that define excellence and elevate your brand.
        </p>
        <div className="elegant-cta inline-block">
          <Link 
            href="/work" 
            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-transparent border border-[rgba(229,216,179,0.5)] rounded-full text-[#E5D8B3] uppercase tracking-widest text-sm font-medium transition-all duration-300 hover:bg-gold-400 hover:border-gold-400 hover:text-black hover:shadow-[0_5px_25px_-10px_rgba(255,215,0,0.6)] hover:-translate-y-0.5"
          >
            <span className="relative z-10">Discover Our Portfolio</span>
            <span className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-1">
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
      </div>
    </section>
  );
}
