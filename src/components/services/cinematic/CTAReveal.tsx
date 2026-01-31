"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

interface CTARevealProps {
  headline: string;
  subheadline?: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

function TextScramble({
  text,
  isRevealed,
  duration = 2000,
}: {
  text: string;
  isRevealed: boolean;
  duration?: number;
}) {
  const [displayText, setDisplayText] = useState("");
  const chars = "!<>-_\\/[]{}=+*^?#________";

  useEffect(() => {
    if (!isRevealed) {
      setDisplayText(text.replace(/./g, "_"));
      return;
    }

    let iteration = 0;
    const totalIterations = 30;
    const intervalDuration = duration / totalIterations;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += text.length / totalIterations;

      if (iteration >= text.length) {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [text, isRevealed, duration]);

  return <span>{displayText}</span>;
}

export default function CTAReveal({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
}: CTARevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsRevealed(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[80vh] items-center overflow-hidden bg-transparent py-24"
    >
      {/* Background - removed gradients for transparent bg */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gold gradient accent - removed */}

        {/* Radial glow - removed */}

        {/* Animated lines */}
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#FFD700" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <motion.line
              key={i}
              x1="0%"
              y1={`${20 + i * 15}%`}
              x2="100%"
              y2={`${20 + i * 15}%`}
              stroke="url(#gold-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.2 + i * 0.1 }}
            />
          ))}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center">
        {/* Headline with scramble effect */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
        >
          <TextScramble text={headline} isRevealed={isRevealed} duration={1500} />
        </motion.h2>

        {/* Subheadline */}
        {subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mx-auto mb-12 max-w-2xl text-lg text-white/60 md:text-xl"
          >
            {subheadline}
          </motion.p>
        )}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          {/* Primary CTA */}
          <a
            href={primaryCTA.href}
            className="group relative overflow-hidden rounded-full px-8 py-4 text-lg font-semibold transition-all"
          >
            {/* Button background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFA500]" />

            {/* Hover effect */}
            <div className="absolute inset-0 translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0" />

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ translateX: ["100%", "-100%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />

            <span className="relative z-10 text-black transition-colors duration-300 group-hover:text-[#0a0a0a]">
              {primaryCTA.text}
            </span>
          </a>

          {/* Secondary CTA */}
          {secondaryCTA && (
            <a
              href={secondaryCTA.href}
              className="group relative overflow-hidden rounded-full border border-white/20 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-[#FFD700]/40"
            >
              {/* Hover background */}
              <div className="absolute inset-0 bg-[#FFD700]/0 transition-colors duration-300 group-hover:bg-[#FFD700]/10" />

              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#FFD700]">
                {secondaryCTA.text}
              </span>
            </a>
          )}
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="mx-auto mt-16 h-px w-32 bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent"
        />
      </div>
    </section>
  );
}
