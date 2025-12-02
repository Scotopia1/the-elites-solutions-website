"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MagneticButton } from "../components/MagneticButton";
import { GeometricAccent } from "../components/GeometricAccent";

/**
 * ContactCTA - Powerful closing section with magnetic button
 * Final call-to-action driving visitors to contact
 */
export function ContactCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[80vh] flex items-center justify-center py-24 md:py-32 px-4 bg-black overflow-hidden"
    >
      {/* Corner Accents */}
      <GeometricAccent position="top-left" size="lg" delay={0.5} />
      <GeometricAccent position="top-right" size="lg" delay={0.6} />
      <GeometricAccent position="bottom-left" size="lg" delay={0.7} />
      <GeometricAccent position="bottom-right" size="lg" delay={0.8} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Top Decorative Line */}
        <motion.div
          className="w-24 h-[1px] bg-gold-400 mx-auto mb-12"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Section Label */}
        <motion.span
          className="font-mono text-sm uppercase tracking-[0.3em] text-gold-400 block mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Ready to Begin?
        </motion.span>

        {/* Main Headline */}
        <motion.h2
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Let&apos;s Create Something{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500 italic">
            Elite
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Your vision deserves exceptional execution. Let&apos;s discuss how we
          can transform your ideas into digital experiences that captivate and
          convert.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <MagneticButton
            href="/contact"
            className="px-10 py-5 bg-transparent border-2 border-gold-400 text-gold-400 font-mono text-sm uppercase tracking-wider rounded-full hover:text-black transition-colors duration-300"
            strength={0.3}
            elasticity={0.5}
          >
            <span>Start Your Project</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12H19M19 12L12 5M19 12L12 19" />
            </svg>
          </MagneticButton>
        </motion.div>

        {/* Bottom Decorative Line */}
        <motion.div
          className="w-24 h-[1px] bg-gold-400 mx-auto mt-16"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        />

        {/* Contact Info */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="mailto:hello@theelites.dev"
            className="text-white/40 hover:text-gold-400 transition-colors font-mono text-sm"
          >
            hello@theelites.dev
          </a>
          <span className="hidden md:block w-1 h-1 bg-gold-400/50 rounded-full" />
          <span className="text-white/40 font-mono text-sm">
            Available Worldwide
          </span>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-gold-400/5 rounded-full blur-[150px]" />

        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_50%)]" />
      </div>

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

export default ContactCTA;
