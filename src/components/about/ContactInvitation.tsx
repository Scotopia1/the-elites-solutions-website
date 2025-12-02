"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function ContactInvitation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[80vh] bg-black flex items-center justify-center py-24 overflow-hidden">
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
        {/* Main Content */}
        <motion.div
          className="w-full flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative Top Line */}
          <motion.div
            className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400/50 to-transparent mb-12 md:mb-20"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* Text */}
          <div className="mb-12">
            <motion.span
              className="block font-sans text-gold-400 text-sm md:text-base uppercase tracking-[0.4em] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Ready to start?
            </motion.span>

            <motion.h2
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Let's Create Something{" "}
              <span className="text-gold-400 italic font-serif pr-4">Elite</span>{" "}
              Together
            </motion.h2>

            <motion.p
              className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Transform your vision into reality with our expertise
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full overflow-hidden transition-all duration-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Background/Border */}
              <div className="absolute inset-0 border border-gold-400/30 rounded-full transition-colors duration-300 group-hover:border-gold-400 group-hover:bg-gold-400" />
              
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gold-400/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />

              {/* Button Content */}
              <span className="relative z-10 font-sans font-bold text-gold-400 uppercase tracking-widest text-sm md:text-base group-hover:text-black transition-colors duration-300">
                Start Your Project
              </span>
              <span className="relative z-10 text-gold-400 group-hover:text-black transition-colors duration-300 group-hover:translate-x-1 transform">
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
          </motion.div>

          {/* Decorative Bottom Line */}
          <motion.div
            className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400/50 to-transparent mt-12 md:mt-20"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>

        {/* Corner Accents */}
        <motion.div
          className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold-400/20 md:w-16 md:h-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold-400/20 md:w-16 md:h-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.3 }}
        />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
    </section>
  );
}
