"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Start reveal animation after mount
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isRevealed) {
      // Show content after curtains open
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isRevealed]);

  useGSAP(
    () => {
      if (!containerRef.current || !showContent) return;

      const ctx = gsap.context(() => {
        // Logo breathing glow animation
        gsap.to(".about-hero-logo", {
          filter: "drop-shadow(0 0 60px rgba(212, 175, 55, 0.6))",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [showContent] }
  );

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Curtains */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-black z-50 border-r border-gold-400/20"
        initial={{ x: 0 }}
        animate={isRevealed ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-black z-50 border-l border-gold-400/20"
        initial={{ x: 0 }}
        animate={isRevealed ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Gold line that draws across */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-[1px] bg-gold-400 z-[60]"
        initial={{ scaleX: 0 }}
        animate={isRevealed ? { scaleX: 0, opacity: 0 } : { scaleX: 1 }}
        transition={{
          scaleX: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          opacity: { duration: 0.3, delay: 0.5 },
        }}
      />

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <>
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl h-full py-20">
            {/* Top Text */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mb-4 md:mb-8"
            >
              <span className="font-sans text-xs md:text-sm tracking-[0.5em] text-gold-400 uppercase">THIS IS</span>
            </motion.div>

            {/* Logo */}
            <motion.div
              className="relative mb-6 md:mb-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Image
                src="/images/logos/logo_light.png"
                alt="The Elites Solutions"
                width={400}
                height={400}
                className="about-hero-logo w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] md:w-[240px] md:h-[240px] lg:w-[300px] lg:h-[300px] object-contain max-h-[25vh]"
                priority
              />
            </motion.div>

            {/* Bottom Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-none">THE ELITES</h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="mt-4 md:mt-6 text-sm md:text-lg lg:text-xl text-white/60 font-light tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Crafting Digital Excellence Since 2019
            </motion.p>
          </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 w-full flex justify-center z-20 pointer-events-none">
              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest">Scroll to discover</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-gold-400"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5V19M12 19L5 12M12 19L19 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Corner Decorations */}
      <motion.div
        className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-gold-400/30 rounded-tl-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={showContent ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.2 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-gold-400/30 rounded-br-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={showContent ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.3 }}
      />
    </section>
  );
}
