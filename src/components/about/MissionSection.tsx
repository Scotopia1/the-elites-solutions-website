"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mission statement with words to highlight
const missionWords = [
  { text: "We", highlight: false },
  { text: "transform", highlight: true },
  { text: "ideas", highlight: true },
  { text: "into", highlight: false },
  { text: "experiences", highlight: true },
  { text: "that", highlight: false },
  { text: "elevate", highlight: true },
  { text: "businesses", highlight: false },
  { text: "to", highlight: false },
  { text: "elite", highlight: true },
  { text: "status.", highlight: false },
];

export default function MissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current || !textRef.current) return;

      const words = wordsRef.current.filter((w): w is HTMLSpanElement => w !== null);

      // Pin the section and animate words
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const wordCount = words.length;

          words.forEach((word, index) => {
            const wordProgress = (progress * wordCount) - index;
            const isHighlightWord = missionWords[index]?.highlight;

            if (wordProgress < 0) {
              // Word not yet revealed
              gsap.set(word, {
                opacity: 0.15,
                color: "rgba(255, 255, 255, 0.15)",
                textShadow: "none",
              });
            } else if (wordProgress < 1) {
              // Word is being revealed
              const wordOpacity = 0.15 + (wordProgress * 0.85);
              if (isHighlightWord) {
                gsap.set(word, {
                  opacity: 1,
                  color: `rgba(212, 175, 55, ${wordProgress})`,
                  textShadow: `0 0 ${30 * wordProgress}px rgba(212, 175, 55, ${0.5 * wordProgress})`,
                });
              } else {
                gsap.set(word, {
                  opacity: wordOpacity,
                  color: `rgba(255, 255, 255, ${wordOpacity})`,
                  textShadow: "none",
                });
              }
            } else {
              // Word fully revealed
              if (isHighlightWord) {
                gsap.set(word, {
                  opacity: 1,
                  color: "#d4af37",
                  textShadow: "0 0 30px rgba(212, 175, 55, 0.5)",
                });
              } else {
                gsap.set(word, {
                  opacity: 1,
                  color: "rgba(255, 255, 255, 1)",
                  textShadow: "none",
                });
              }
            }
          });
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center py-24 px-4 overflow-hidden bg-black">
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-16 md:mb-24 opacity-60">
          <span className="w-12 h-[1px] bg-gold-400" />
          <span className="font-sans text-sm uppercase tracking-[0.2em] text-gold-400">Our Mission</span>
          <span className="w-12 h-[1px] bg-gold-400" />
        </div>

        {/* Mission Statement */}
        <div ref={textRef} className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-1.5 md:gap-y-2.5 max-w-6xl mx-auto px-4 text-center">
          {missionWords.map((word, index) => (
            <span
              key={index}
              ref={(el) => { wordsRef.current[index] = el; }}
              className={`inline-block font-serif text-4xl md:text-6xl lg:text-8xl font-bold leading-[1.1] transition-colors duration-300 ${word.highlight ? "font-black" : ""}`}
              style={{ opacity: 0.15, color: "rgba(255, 255, 255, 0.15)" }}
            >
              {word.text}
            </span>
          ))}
        </div>

        {/* Decorative Particle Burst Points */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold-400 rounded-full shadow-[0_0_10px_#d4af37] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/5 w-1 h-1 bg-gold-400 rounded-full shadow-[0_0_10px_#d4af37] animate-pulse delay-700" />
          <div className="absolute top-2/3 left-1/5 w-1.5 h-1.5 bg-gold-400 rounded-full shadow-[0_0_10px_#d4af37] animate-pulse delay-300" />
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_60%)]" />
    </section>
  );
}
