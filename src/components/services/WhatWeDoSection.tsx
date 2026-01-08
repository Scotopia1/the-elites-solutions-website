"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getScrollTriggerScrub } from "@/lib/gsap-config";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Benefit {
  title: string;
  description: string;
}

interface Tech {
  name: string;
  icon: string;
}

interface WhatWeDoSectionProps {
  description: string;
  benefits: Benefit[];
  techStack: Tech[];
}

export default function WhatWeDoSection({
  description,
  benefits,
  techStack,
}: WhatWeDoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const content = contentRef.current;

      if (!section || !content) return;

      // Pin section while scrolling through content
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * 1.5}`,
        pin: true,
        pinSpacing: true,
        scrub: getScrollTriggerScrub(1),
      });

      // Fade in content as you scroll
      gsap.fromTo(
        content.children,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 0.7}`,
            scrub: getScrollTriggerScrub(true),
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-neutral-950 py-20"
    >
      <div ref={contentRef} className="container mx-auto px-4 max-w-6xl">
        {/* Section heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
          What We Do
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-neutral-300 text-center mb-16 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-neutral-900/50 border border-gold-400/20 rounded-xl p-6 hover:border-gold-400/40 transition-colors"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-bold text-gold-400 mb-3">
                {benefit.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-2xl font-bold text-center text-white mb-8">
            Technologies We Use
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 bg-neutral-900/30 border border-gold-400/10 rounded-lg px-4 py-3 hover:border-gold-400/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {/* Placeholder - in production use actual tech icons */}
                <div className="w-8 h-8 bg-gold-400/20 rounded-full flex items-center justify-center text-xs">
                  {tech.name.charAt(0)}
                </div>
                <span className="text-neutral-300 font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
