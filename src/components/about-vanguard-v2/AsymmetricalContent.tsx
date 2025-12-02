"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const AsymmetricalContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !lineRef.current) return;

      // 1. Draw the Gold Line down
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // 2. Animate Text Blocks (Staggered Reveal)
      const blocks = gsap.utils.toArray<HTMLElement>(".content-block");
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-black py-32 px-4 md:px-16">
      
      {/* The Golden Line - Asymmetrical Position */}
      <div className="absolute top-0 left-[15%] md:left-[25%] bottom-0 w-[1px] h-full bg-white/10 origin-top">
        <div ref={lineRef} className="w-full h-full bg-gold-400 origin-top" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Block 1: The Mission (Left Aligned relative to line) */}
        <div className="flex flex-col md:flex-row mb-32 content-block">
          <div className="w-full md:w-[25%] pr-8 text-right">
            <span className="font-mono text-gold-400 text-sm">01.0</span>
          </div>
          <div className="w-full md:w-[75%] pl-8 md:pl-16">
            <h2 className="font-heading text-4xl md:text-6xl text-white mb-8 leading-tight">
              WE ENGINEER <br />
              <span className="text-gold-400">DOMINANCE.</span>
            </h2>
            <p className="font-sans text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
              In a digital landscape saturated with noise, we don't just compete; we command. Our mission is to forge digital armors that are impenetrable, performant, and undeniably elite.
            </p>
          </div>
        </div>

        {/* Block 2: The Philosophy (Offset Right) */}
        <div className="flex flex-col md:flex-row justify-end mb-32 content-block">
          <div className="w-full md:w-[60%] bg-dark-200/30 border border-white/5 p-8 md:p-12 rounded-2xl backdrop-blur-sm">
            <span className="font-mono text-gold-400 text-sm mb-6 block">02.0 Protocol</span>
            <h3 className="font-serif text-3xl text-white mb-4">Precision is not optional.</h3>
            <p className="font-sans text-white/60 leading-relaxed">
              Every pixel is calculated. Every animation curve is physics-based. We reject the standard template in favor of bespoke, hand-crafted excellence.
            </p>
          </div>
        </div>

        {/* Block 3: Data (Overlapping the line) */}
        <div className="flex items-center mb-32 content-block">
           <div className="w-[30%] hidden md:block" /> {/* Spacer */}
           <div className="w-full md:w-[70%]">
              <div className="grid grid-cols-2 gap-8">
                 <div>
                    <span className="block font-heading text-5xl md:text-7xl text-white">150+</span>
                    <span className="font-mono text-xs text-gold-400 uppercase">Deployments</span>
                 </div>
                 <div>
                    <span className="block font-heading text-5xl md:text-7xl text-white">100%</span>
                    <span className="font-mono text-xs text-gold-400 uppercase">Uptime</span>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};
