"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface PainPoint {
  title: string;
  description: string;
  icon?: string;
}

interface Solution {
  title: string;
  description: string;
  icon?: string;
}

interface ProblemSolutionSplitProps {
  painPoints: PainPoint[];
  solutions: Solution[];
  sectionTitle?: string;
}

export default function ProblemSolutionSplit({
  painPoints = [],
  solutions = [],
  sectionTitle = "The Challenge & Solution",
}: ProblemSolutionSplitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current || !contentRef.current) return;

      const content = contentRef.current;
      const totalWidth = content.scrollWidth - window.innerWidth;

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 3}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(content, {
            x: -totalWidth * self.progress,
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative bg-transparent">
      <div ref={wrapperRef} className="h-screen overflow-hidden">
        {/* Section title */}
        <div className="absolute left-1/2 top-8 z-20 -translate-x-1/2">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-[0.3em] text-white/40"
          >
            {sectionTitle}
          </motion.h2>
        </div>

        {/* Horizontal scroll content */}
        <div
          ref={contentRef}
          className="flex h-full items-center"
          style={{ width: "fit-content" }}
        >
          {/* Pain Points Section */}
          <div className="flex h-full w-screen flex-shrink-0 items-center justify-center bg-transparent px-8 lg:px-16">
            <div className="max-w-4xl">
              <h3 className="mb-12 text-3xl font-bold text-white/80 md:text-4xl">
                The Problems You Face
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                {painPoints.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative rounded-lg border border-red-500/20 bg-red-500/5 p-6 transition-all hover:border-red-500/40"
                  >
                    <div className="absolute -left-px top-0 h-full w-1 rounded-l bg-gradient-to-b from-red-500/60 to-red-500/20" />
                    {point.icon && (
                      <span className="mb-3 block text-2xl">{point.icon}</span>
                    )}
                    <h4 className="mb-2 text-lg font-semibold text-white">
                      {point.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-white/50">
                      {point.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Transition Arrow */}
          <div className="flex h-full w-[200px] flex-shrink-0 items-center justify-center bg-transparent">
            <div className="relative">
              <div className="h-[2px] w-24 bg-gradient-to-r from-red-500/50 to-[#FFD700]" />
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 border-y-8 border-l-8 border-y-transparent border-l-[#FFD700]" />
            </div>
          </div>

          {/* Solutions Section */}
          <div className="flex h-full w-screen flex-shrink-0 items-center justify-center bg-transparent px-8 lg:px-16">
            <div className="max-w-4xl">
              <h3 className="mb-12 text-3xl font-bold text-[#FFD700] md:text-4xl">
                Our Solutions
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                {solutions.map((solution, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative overflow-hidden rounded-lg border border-[#FFD700]/20 bg-[#FFD700]/5 p-6 transition-all hover:border-[#FFD700]/40"
                  >
                    {/* Gold glow effect */}
                    <div className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full bg-[#FFD700]/10 blur-2xl transition-all group-hover:bg-[#FFD700]/20" />
                    <div className="absolute -left-px top-0 h-full w-1 rounded-l bg-gradient-to-b from-[#FFD700] to-[#FFD700]/30" />
                    {solution.icon && (
                      <span className="mb-3 block text-2xl">{solution.icon}</span>
                    )}
                    <h4 className="mb-2 text-lg font-semibold text-white">
                      {solution.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-white/60">
                      {solution.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* End spacer */}
          <div className="h-full w-[100px] flex-shrink-0 bg-transparent" />
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
          <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500/60 to-[#FFD700]"
              style={{ width: "0%" }}
              id="problem-solution-progress"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
