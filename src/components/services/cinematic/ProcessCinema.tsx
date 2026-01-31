"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details?: string[];
}

interface ProcessCinemaProps {
  steps: ProcessStep[];
  sectionTitle?: string;
}

export default function ProcessCinema({
  steps = [],
  sectionTitle = "Our Process",
}: ProcessCinemaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  if (steps.length === 0) return null;

  // Background gradients removed for transparent bg

  useGSAP(
    () => {
      if (!wrapperRef.current) return;

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 4}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const stepProgress = self.progress * steps.length;
          const currentStep = Math.min(
            Math.floor(stepProgress),
            steps.length - 1
          );
          setActiveStep(currentStep);
          setProgress(self.progress);
        },
      });
    },
    { scope: containerRef, dependencies: [steps.length] }
  );

  return (
    <section ref={containerRef} className="relative bg-transparent">
      <div ref={wrapperRef} className="relative h-screen overflow-hidden">
        {/* Background gradient transitions - removed for transparent bg */}

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

        {/* Progress indicator - left side */}
        <div className="absolute left-8 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
          <div className="flex flex-col items-center gap-4">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => {}}
                className="group relative flex items-center"
              >
                <div
                  className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                    i === activeStep
                      ? "border-[#FFD700] bg-[#FFD700]"
                      : i < activeStep
                      ? "border-[#FFD700]/60 bg-[#FFD700]/40"
                      : "border-white/20 bg-transparent"
                  }`}
                />
                {i < steps.length - 1 && (
                  <div className="absolute left-1/2 top-full h-4 w-[2px] -translate-x-1/2">
                    <div
                      className="h-full bg-[#FFD700]/60 transition-all duration-300"
                      style={{
                        transform: `scaleY(${i < activeStep ? 1 : 0})`,
                        transformOrigin: "top",
                      }}
                    />
                    <div className="absolute inset-0 bg-white/10" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div className="relative z-20 flex h-full items-center justify-center px-4 lg:px-20">
          <div className="max-w-4xl">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{
                  opacity: activeStep === i ? 1 : 0,
                  y: activeStep === i ? 0 : 40,
                  pointerEvents: activeStep === i ? "auto" : "none",
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center justify-center px-4 lg:px-20"
              >
                <div className="text-center">
                  {/* Step number */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{
                      scale: activeStep === i ? 1 : 0.5,
                      opacity: activeStep === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-6"
                  >
                    <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-7xl font-bold text-transparent md:text-9xl">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{
                      y: activeStep === i ? 0 : 20,
                      opacity: activeStep === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-4 text-3xl font-bold text-white md:text-5xl"
                  >
                    {step.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{
                      y: activeStep === i ? 0 : 20,
                      opacity: activeStep === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mx-auto max-w-2xl text-lg text-white/60 md:text-xl"
                  >
                    {step.description}
                  </motion.p>

                  {/* Details */}
                  {step.details && (
                    <motion.ul
                      initial={{ y: 20, opacity: 0 }}
                      animate={{
                        y: activeStep === i ? 0 : 20,
                        opacity: activeStep === i ? 1 : 0,
                      }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="mt-8 flex flex-wrap justify-center gap-4"
                    >
                      {step.details.map((detail, j) => (
                        <li
                          key={j}
                          className="rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5 px-4 py-2 text-sm text-white/70"
                        >
                          {detail}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2">
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/40">
              {String(activeStep + 1).padStart(2, "0")}
            </span>
            <div className="h-1 w-32 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500]"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="text-xs text-white/40">
              {String(steps.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
