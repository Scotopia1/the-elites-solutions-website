"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const VanguardHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      // Marquee Effect based on Scroll Direction
      // We simply move it left continuously, but accelerate on scroll
      let xPercent = 0;
      const direction = -1;

      const animate = () => {
        if (xPercent <= -100) {
          xPercent = 0;
        }
        if (xPercent > 0) {
          xPercent = -100;
        }
        gsap.set(textRef.current, { xPercent: xPercent });
        requestAnimationFrame(animate);
        xPercent += 0.05 * direction;
      };
      
      // Start the loop
      requestAnimationFrame(animate);

      // Entrance Animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.2 }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-black"
    >
      {/* Background Noise/Texture */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('/textures/Gold.jpg')] bg-cover bg-center mix-blend-luminosity" />
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-gold-400/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Small Technical Label */}
      <div className="absolute top-32 left-8 md:left-16 z-10">
        <span className="font-mono text-xs text-gold-400 uppercase tracking-[0.2em]">
          /// Vanguard System v2.0
        </span>
      </div>

      {/* Massive Marquee Text */}
      <div className="relative z-10 w-full whitespace-nowrap">
        <div ref={textRef} className="flex items-center gap-8 md:gap-16 will-change-transform">
          <h1 className="font-heading text-[15vw] md:text-[18vw] leading-[0.8] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 tracking-tighter">
            THE ELITES
          </h1>
          <h1 className="font-heading text-[15vw] md:text-[18vw] leading-[0.8] font-bold text-transparent stroke-text text-stroke-2 text-stroke-white/20 tracking-tighter opacity-30">
            DIGITAL
          </h1>
          <h1 className="font-heading text-[15vw] md:text-[18vw] leading-[0.8] font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-300 to-gold-600 tracking-tighter">
            VANGUARD
          </h1>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 md:right-16 flex flex-col items-end gap-2 z-10">
        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
          Initiate Scroll
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gold-400 to-transparent" />
      </div>
    </section>
  );
};
