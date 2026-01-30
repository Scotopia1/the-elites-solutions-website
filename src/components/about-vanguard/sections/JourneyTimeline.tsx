"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getScrollTriggerScrub } from "@/lib/gsap-config";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// Timeline milestones
const milestones = [
  {
    year: "2019",
    title: "The Beginning",
    description:
      "Founded with a vision to deliver elite digital solutions. Started with passion, determination, and a commitment to excellence.",
    achievement: "First Client Acquired",
    icon: "🚀",
  },
  {
    year: "2020",
    title: "Growth & Adaptation",
    description:
      "Expanded our services and pioneered remote-first collaboration. Delivered seamless digital transformations during unprecedented times.",
    achievement: "15+ Projects Delivered",
    icon: "📈",
  },
  {
    year: "2021",
    title: "Team Expansion",
    description:
      "Grew our team of specialized experts. Designers, developers, and strategists united under one vision of digital excellence.",
    achievement: "Full-Stack Team Built",
    icon: "👥",
  },
  {
    year: "2022",
    title: "Enterprise Ready",
    description:
      "Landed our first enterprise clients and delivered complex, scalable solutions that transformed business operations.",
    achievement: "Enterprise Partnerships",
    icon: "🏢",
  },
  {
    year: "2023",
    title: "Innovation Hub",
    description:
      "Launched AI-powered solutions and cutting-edge web experiences. Pioneered new approaches to digital interaction.",
    achievement: "AI Integration Leader",
    icon: "🤖",
  },
  {
    year: "2024",
    title: "Global Reach",
    description:
      "Serving clients worldwide with a reputation for excellence. Recognized as industry leaders in digital craftsmanship.",
    achievement: "50+ Projects Worldwide",
    icon: "🌍",
  },
];

/**
 * JourneyTimeline - Vertical timeline with alternating cards
 * Gold line draws on scroll, cards reveal on intersection
 */
export function JourneyTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || !lineRef.current || prefersReducedMotion) return;

      // Animate the timeline line drawing
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: getScrollTriggerScrub(1),
            refreshPriority: -1, // Calculate after other sections
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black py-24 md:py-32 px-4 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20 md:mb-28"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-gold-400 block mb-4">
            Our Story
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            The Journey
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative w-full">
          {/* Timeline Line Track */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/5">
            {/* Animated Gold Line */}
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-gold-400 via-gold-400 to-gold-400/20 origin-top"
              style={{ transform: `scaleY(${prefersReducedMotion ? 1 : 0})` }}
            />
          </div>

          {/* Milestones */}
          <div className="relative">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className={`relative flex flex-col md:flex-row items-start md:items-center w-full mb-16 md:mb-24 last:mb-0 ${
                  index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {/* Mobile Dot */}
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-gold-400 rounded-full border-4 border-black z-20 md:hidden shadow-[0_0_15px_#d4af37]" />

                {/* Desktop Center Dot */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-gold-400 rounded-full border-4 border-black z-20 hidden md:block shadow-[0_0_20px_#d4af37]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3, type: "spring" }}
                />

                {/* Content Card */}
                <div
                  className={`relative ml-12 md:ml-0 md:w-[45%] ${
                    index % 2 === 0 ? "md:mr-auto md:pr-16" : "md:ml-auto md:pl-16"
                  }`}
                >
                  <div className="relative bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-gold-400/30 transition-all duration-300 group">
                    {/* Year Badge */}
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 font-mono text-sm font-bold mb-6"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
                    >
                      <span className="text-lg">{milestone.icon}</span>
                      <span>{milestone.year}</span>
                    </motion.div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
                      {milestone.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-white/60 leading-relaxed mb-6">
                      {milestone.description}
                    </p>

                    {/* Achievement Badge */}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="p-1.5 rounded-full bg-gold-400/10">
                        <svg
                          className="w-4 h-4 text-gold-400"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      </span>
                      <span className="text-gold-400/80 font-medium">
                        {milestone.achievement}
                      </span>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-gold-400/0 group-hover:border-gold-400/30 transition-colors" />
                    <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-gold-400/0 group-hover:border-gold-400/30 transition-colors" />
                    <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-gold-400/0 group-hover:border-gold-400/30 transition-colors" />
                    <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-gold-400/0 group-hover:border-gold-400/30 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.02)_0%,transparent_70%)]" />
    </section>
  );
}

export default JourneyTimeline;
