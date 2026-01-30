"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getScrollTriggerScrub } from "@/lib/gsap-config";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface TimelinePhase {
  phase: string;
  date: string;
  description: string;
}

interface ProjectTimelineProps {
  timeline: TimelinePhase[];
}

export default function ProjectTimeline({ timeline }: ProjectTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const line = lineRef.current;

      if (!section || !line) return;

      // Animate the connecting line
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: getScrollTriggerScrub(1),
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-transparent"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Project Timeline
        </motion.h2>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gold-400/20">
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-gold-400 to-gold-600 origin-top"
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timeline.map((phase, index) => (
              <motion.div
                key={index}
                className={`relative flex ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                {/* Content */}
                <div className="flex-1 pl-12 md:pl-0">
                  <div className="bg-neutral-900/50 border border-gold-400/20 rounded-xl p-6 hover:border-gold-400/40 transition-colors">
                    <p className="text-gold-400 text-sm font-medium mb-2">
                      {phase.date}
                    </p>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {phase.phase}
                    </h3>
                    <p className="text-neutral-300 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 border-4 border-black flex-shrink-0 z-10 flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full" />
                </div>

                {/* Spacer (for alternating layout on desktop) */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
