"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// Values data with custom SVG icons
const valuesData = [
  {
    id: "innovation",
    title: "Innovation",
    subtitle: "Pushing Boundaries",
    description:
      "We don't follow trends—we create them. Our team constantly explores emerging technologies and methodologies to deliver solutions that keep you ahead of the competition.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path
          d="M24 4L26.5 16.5L38 12L30.5 22L44 24L30.5 26L38 36L26.5 31.5L24 44L21.5 31.5L10 36L17.5 26L4 24L17.5 22L10 12L21.5 16.5L24 4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "precision",
    title: "Precision",
    subtitle: "Pixel Perfect",
    description:
      "Every line of code, every design element, every interaction is crafted with meticulous attention to detail. We believe excellence lives in the details.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="4" fill="currentColor" />
        <path d="M24 4V12" stroke="currentColor" strokeWidth="2" />
        <path d="M24 36V44" stroke="currentColor" strokeWidth="2" />
        <path d="M4 24H12" stroke="currentColor" strokeWidth="2" />
        <path d="M36 24H44" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "partnership",
    title: "Partnership",
    subtitle: "Your Success, Our Mission",
    description:
      "We're not just vendors—we're partners invested in your success. We work alongside you, understanding your vision and transforming it into reality.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path
          d="M16 20C16 20 20 24 24 24C28 24 32 20 32 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 28L16 20L24 28L32 20L40 28"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="36" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 36V44M36 36V44M24 32V44"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "excellence",
    title: "Excellence",
    subtitle: "Beyond Expectations",
    description:
      "Good enough is never enough. We strive for excellence in everything we do, delivering results that exceed expectations and set new standards.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path
          d="M24 4L28.5 17.5H42L31 26L35.5 40L24 31L12.5 40L17 26L6 17.5H19.5L24 4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function ValuesAccordion() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen py-24 px-4 bg-black overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="block font-sans text-sm uppercase tracking-[0.3em] text-gold-400 mb-4">What Drives Us</span>
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">Our Core Values</h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            The principles that guide every decision we make
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {valuesData.map((value, index) => (
            <motion.div
              key={value.id}
              className={`group relative bg-white/5 border border-white/10 rounded-2xl p-8 cursor-pointer overflow-hidden transition-all duration-500 hover:border-gold-400/30 active:scale-[0.98] will-change-transform ${expandedId === value.id ? "md:row-span-2 bg-white/10" : ""}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => handleExpand(value.id)}
              layoutId={value.id}
            >
              {/* Card Background Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)]" />

              {/* Card Content */}
              <div className="relative z-10 flex flex-col items-center text-center h-full">
                {/* Icon */}
                <motion.div 
                  className="mb-6 text-gold-400 group-hover:scale-110 transition-transform duration-500" 
                  layout="position"
                >
                  {value.icon}
                </motion.div>

                {/* Title */}
                <motion.h3 
                  className="font-serif text-2xl font-bold text-white mb-2" 
                  layout="position"
                >
                  {value.title}
                </motion.h3>

                {/* Subtitle */}
                <motion.span 
                  className="font-sans text-sm text-white/40 uppercase tracking-widest mb-4 block" 
                  layout="position"
                >
                  {value.subtitle}
                </motion.span>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedId === value.id && (
                    <motion.div
                      className="overflow-hidden"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <div className="w-12 h-[1px] bg-gold-400/30 mx-auto my-6" />
                      <p className="text-white/80 leading-relaxed text-sm md:text-base font-light">
                        {value.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expand Indicator */}
                <motion.div
                  className="mt-auto pt-6 text-gold-400/50 group-hover:text-gold-400 transition-colors"
                  animate={{ rotate: expandedId === value.id ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.03)_0%,transparent_50%)]" />
    </section>
  );
}
