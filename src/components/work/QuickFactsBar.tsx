"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface QuickFacts {
  client: string;
  year: string;
  duration: string;
  status: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface QuickFactsBarProps {
  facts: QuickFacts;
}

export default function QuickFactsBar({ facts }: QuickFactsBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bar = barRef.current;
    if (!bar) return;

    ScrollTrigger.create({
      trigger: bar,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });
  }, []);

  return (
    <div ref={barRef} className="sticky top-0 z-40 bg-black/80 backdrop-blur-lg border-b border-gold-400/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Facts */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div>
              <span className="text-neutral-500">Client:</span>{" "}
              <span className="text-white font-medium">{facts.client}</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gold-400/20" />
            <div>
              <span className="text-neutral-500">Year:</span>{" "}
              <span className="text-white font-medium">{facts.year}</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gold-400/20" />
            <div>
              <span className="text-neutral-500">Duration:</span>{" "}
              <span className="text-white font-medium">{facts.duration}</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gold-400/20" />
            <div>
              <span className="text-neutral-500">Status:</span>{" "}
              <span className="text-gold-400 font-medium">{facts.status}</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            {facts.liveUrl && (
              <motion.a
                href={facts.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gold-400/10 hover:bg-gold-400/20 border border-gold-400/20 hover:border-gold-400/40 rounded-lg text-gold-400 text-sm font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Site
              </motion.a>
            )}
            {facts.githubUrl && (
              <motion.a
                href={facts.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 rounded-lg text-white text-sm font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
