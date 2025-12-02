"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "../components/GlowCard";

// Values data
const values = [
  {
    id: 1,
    title: "Excellence",
    shortDesc: "Premium quality in everything",
    longDesc:
      "We don't just meet standards—we set them. Every pixel, every line of code, every interaction is crafted to perfection. Our commitment to excellence means your project receives nothing less than our absolute best.",
    icon: (
      <svg
        className="w-12 h-12"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M24 4L30 16L44 18L34 28L36 42L24 36L12 42L14 28L4 18L18 16L24 4Z" />
        <circle cx="24" cy="24" r="6" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Innovation",
    shortDesc: "Pushing digital boundaries",
    longDesc:
      "We embrace cutting-edge technologies and forward-thinking strategies. From AI integration to immersive experiences, we're constantly exploring new frontiers to keep you ahead of the curve.",
    icon: (
      <svg
        className="w-12 h-12"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="24" cy="24" r="18" />
        <path d="M24 10V24L32 32" />
        <circle cx="24" cy="24" r="4" />
        <path d="M6 24H10M38 24H42M24 6V10M24 38V42" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Integrity",
    shortDesc: "Trust and transparency",
    longDesc:
      "We build relationships on honesty and mutual respect. Clear communication, realistic timelines, and transparent pricing—we believe trust is the foundation of every successful partnership.",
    icon: (
      <svg
        className="w-12 h-12"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M24 4L40 12V24C40 34 32 42 24 44C16 42 8 34 8 24V12L24 4Z" />
        <path d="M16 24L22 30L32 18" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Speed",
    shortDesc: "Fast without compromise",
    longDesc:
      "Time is your most valuable asset. Our streamlined processes and agile methodology ensure rapid delivery without sacrificing quality. We move fast so you can launch faster.",
    icon: (
      <svg
        className="w-12 h-12"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M24 4V24" />
        <path d="M4 24H44" />
        <path d="M12 12L24 24L36 12" />
        <circle cx="24" cy="36" r="8" />
        <path d="M24 32V36L27 38" />
      </svg>
    ),
  },
];

/**
 * CoreValues - Interactive glassmorphism cards with 3D tilt
 * Expand/collapse for detailed content
 */
export function CoreValues() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 md:py-32 px-4 bg-black"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-gold-400 block mb-4">
            What We Stand For
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6">
            Core Values
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            The principles that guide every decision and define our approach
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map((value, index) => (
            <GlowCard
              key={value.id}
              className="p-8 cursor-pointer group"
              enableTilt={expandedId !== value.id}
              delay={index * 0.1}
            >
              <button
                className="w-full text-left"
                onClick={() =>
                  setExpandedId(expandedId === value.id ? null : value.id)
                }
                aria-expanded={expandedId === value.id}
              >
                {/* Icon */}
                <div className="text-gold-400 mb-6 transition-transform duration-300 group-hover:scale-110">
                  {value.icon}
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl font-bold text-white mb-3">
                  {value.title}
                </h3>

                {/* Short Description */}
                <p className="text-white/60 text-sm leading-relaxed">
                  {value.shortDesc}
                </p>

                {/* Expand indicator */}
                <div className="mt-6 flex items-center gap-2 text-gold-400/60 group-hover:text-gold-400 transition-colors">
                  <span className="text-xs uppercase tracking-wider font-mono">
                    {expandedId === value.id ? "Less" : "Learn more"}
                  </span>
                  <motion.svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    animate={{ rotate: expandedId === value.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path d="M6 9L12 15L18 9" />
                  </motion.svg>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedId === value.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-6 border-t border-white/10">
                        <p className="text-white/80 text-sm leading-relaxed">
                          {value.longDesc}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </GlowCard>
          ))}
        </div>
      </div>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.03)_0%,transparent_50%)]" />
      </div>
    </section>
  );
}

export default CoreValues;
