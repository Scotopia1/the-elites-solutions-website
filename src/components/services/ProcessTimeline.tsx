"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getScrollTriggerScrub } from "@/lib/gsap-config";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  process: ProcessStep[];
}

export default function ProcessTimeline({ process }: ProcessTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const line = lineRef.current;

      if (!section || !line) return;

      // Animate the connecting line as you scroll
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

      // Fade in each step
      process.forEach((_, index) => {
        gsap.fromTo(
          `#step-${index}`,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: `#step-${index}`,
              start: "top 80%",
              end: "top 50%",
              scrub: getScrollTriggerScrub(1),
            },
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [process] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 bg-gradient-to-b from-neutral-950 to-black"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
          Our Process
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-400/20 to-gold-600/20 hidden md:block">
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-gold-400 to-gold-600 origin-top"
              style={{ transformOrigin: "top" }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16">
            {process.map((step, index) => (
              <div
                key={step.step}
                id={`step-${index}`}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="flex-1">
                  <motion.div
                    className="bg-neutral-900/50 border border-gold-400/20 rounded-xl p-8 hover:border-gold-400/40 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-xl font-bold text-black">
                        {step.step}
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-neutral-300 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Center dot (mobile only shows on left) */}
                <div className="hidden md:flex w-4 h-4 rounded-full bg-gold-400 border-4 border-black flex-shrink-0 z-10" />

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
