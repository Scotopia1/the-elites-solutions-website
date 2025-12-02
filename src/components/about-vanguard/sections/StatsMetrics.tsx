"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedCounter } from "../components/AnimatedCounter";

// Stats data
const stats = [
  {
    id: 1,
    value: 150,
    suffix: "+",
    label: "Projects Delivered",
    description: "Successful digital solutions",
  },
  {
    id: 2,
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Happy partners worldwide",
  },
  {
    id: 3,
    value: 24,
    suffix: "/7",
    label: "Support Available",
    description: "Always here for you",
  },
  {
    id: 4,
    value: 5,
    suffix: "+",
    label: "Years Experience",
    description: "Proven track record",
  },
];

/**
 * StatsMetrics - Animated counter section showcasing achievements
 * Numbers count up on scroll with staggered reveal
 */
export function StatsMetrics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 px-4 bg-black overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-gold-400 block mb-4">
            By The Numbers
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            Our Impact
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10 text-center group hover:border-gold-400/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                boxShadow: "0 0 40px rgba(212, 175, 55, 0.15)",
              }}
            >
              {/* Number */}
              <div className="mb-4">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  duration={2000}
                  className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-300 to-gold-500"
                />
              </div>

              {/* Label */}
              <h3 className="font-serif text-lg md:text-xl font-bold text-white mb-2">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="font-sans text-sm text-white/50">
                {stat.description}
              </p>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rotate-45 translate-x-1/2 -translate-y-1/2 group-hover:bg-gold-400/10 transition-colors" />
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-gold-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Additional context */}
        <motion.p
          className="text-center text-white/40 text-sm mt-12 md:mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          These numbers represent our commitment to excellence and the trust our
          clients place in us. Every project is an opportunity to exceed
          expectations.
        </motion.p>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 175, 55, 0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 175, 55, 0.8) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>
    </section>
  );
}

export default StatsMetrics;
