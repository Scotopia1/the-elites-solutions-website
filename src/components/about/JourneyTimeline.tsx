"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Timeline milestones
const milestones = [
  {
    year: "2019",
    title: "The Beginning",
    description: "Founded with a vision to deliver elite digital solutions. Started with just passion and a laptop.",
    achievement: "First Client",
  },
  {
    year: "2020",
    title: "Growth & Adaptation",
    description: "Expanded our services and adapted to the new digital-first world. Built remote-first culture.",
    achievement: "10+ Projects",
  },
  {
    year: "2021",
    title: "Team Expansion",
    description: "Grew our team of experts. Specialists in design, development, and strategy joined forces.",
    achievement: "Full-Stack Team",
  },
  {
    year: "2022",
    title: "Enterprise Ready",
    description: "Landed our first enterprise clients. Delivered complex, scalable solutions.",
    achievement: "Enterprise Clients",
  },
  {
    year: "2023",
    title: "Innovation Hub",
    description: "Launched AI-powered solutions and cutting-edge web experiences.",
    achievement: "AI Integration",
  },
  {
    year: "2024",
    title: "Global Reach",
    description: "Serving clients worldwide. Recognized for excellence in digital craftsmanship.",
    achievement: "50+ Projects",
  },
];

export default function JourneyTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useGSAP(
    () => {
      if (!sectionRef.current || !lineRef.current) return;

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
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-black py-24 px-4 overflow-hidden flex flex-col items-center">
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-sans text-sm uppercase tracking-[0.3em] text-gold-400 block mb-4">Our Story</span>
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tight">The Journey</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative w-full">
          {/* Timeline Line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] h-full -translate-x-1/2 bg-white/5 overflow-hidden origin-top">
            <div ref={lineRef} className="w-full h-full bg-gold-400/50 origin-top" />
          </div>

          {/* Milestones */}
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              className={`relative flex flex-col md:flex-row items-start md:items-center w-full mb-16 md:mb-24 last:mb-0 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}
              initial={{ opacity: 0, x: 0 }} // Reset initial x for mobile
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Desktop Layout: Even items on Left (row-reverse), Odd items on Right (row) - Wait, flex-direction on mobile is col, desktop is row */}
              {/* Logic: 
                  Mobile: Line is on left. Content pushes right.
                  Desktop: Line is center. 
                  Even index: Content on Left. 
                  Odd index: Content on Right. 
              */}
              
              <div className={`flex w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right md:flex-row-reverse" : "md:pl-16 md:text-left md:ml-auto"}`}>
                 {/* Mobile Year Badge (Hidden on Desktop, shown near line) */}
                 <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-10 h-10 flex items-center justify-center bg-black border-2 border-gold-400 rounded-full z-20 md:hidden">
                    <div className="w-2 h-2 bg-gold-400 rounded-full" />
                 </div>

                 {/* Desktop Connector Dot (Center) */}
                 <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gold-400 rounded-full border-4 border-black z-20 hidden md:block shadow-[0_0_10px_#d4af37]"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3, type: "spring" }}
                  />

                {/* Content Card */}
                <div className={`relative ml-12 md:ml-0 bg-white/5 border border-white/10 p-8 rounded-2xl w-full md:max-w-lg hover:border-gold-400/30 transition-colors duration-300 group`}>
                  
                  {/* Year Badge (Inside card for mobile, outside for desktop?) Let's put it inside header */}
                  <motion.div
                    className="inline-block px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 font-mono text-sm font-bold mb-4"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
                  >
                    {milestone.year}
                  </motion.div>

                  <h3 className="font-serif text-2xl font-bold text-white mb-2">{milestone.title}</h3>
                  <p className="font-sans text-white/60 leading-relaxed mb-6">{milestone.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-gold-400/80 font-medium">
                    <span className="p-1 rounded-full bg-gold-400/10">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span>{milestone.achievement}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.02)_0%,transparent_70%)]" />
    </section>
  );
}
