"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";

interface TechItem {
  name: string;
  icon?: string;
  logo?: string;
  description?: string;
  category?: string;
}

interface TechOrbitProps {
  technologies?: TechItem[];
  techStack?: TechItem[];
  sectionTitle?: string;
  subtitle?: string;
}

export default function TechOrbit({
  technologies: technologiesProp,
  techStack,
  sectionTitle = "Our Tech Stack",
  subtitle,
}: TechOrbitProps) {
  // Support both prop names and ensure array exists
  const technologies = technologiesProp || techStack || [];
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Distribute items in 3D space
  const getPosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 200;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = (index % 2 === 0 ? -1 : 1) * 30;
    return { x, y, z, angle: (angle * 180) / Math.PI };
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[150vh] bg-transparent py-32"
    >
      {/* Background glow - removed for transparent bg */}

      {/* Header */}
      <div className="relative z-10 mb-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-4xl font-bold text-white md:text-5xl"
        >
          {sectionTitle}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg text-white/60"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* 3D Orbit container */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          style={{ scale }}
          className="relative h-[500px] w-[500px]"
          // 3D perspective container
        >
          <motion.div
            style={{ rotateY }}
            className="relative h-full w-full"
            // Apply 3D transforms
          >
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              {technologies.map((tech, i) => {
                const pos = getPosition(i, technologies.length);
                return (
                  <motion.button
                    key={tech.name}
                    onClick={() => setSelectedTech(tech)}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px) rotateY(${-pos.angle}deg)`,
                      transformStyle: "preserve-3d",
                    }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="group relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-[#FFD700]/40 hover:bg-[#FFD700]/10">
                      <span className="text-4xl">{tech.icon || tech.logo || '🔧'}</span>
                      {/* Hover label */}
                      <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
                        <span className="text-sm font-medium text-white">
                          {tech.name}
                        </span>
                      </div>
                      {/* Glow effect */}
                      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[#FFD700]/0 blur-xl transition-all group-hover:bg-[#FFD700]/20" />
                    </div>
                  </motion.button>
                );
              })}

              {/* Center hub */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10">
                  <span className="text-2xl font-bold text-[#FFD700]">
                    {technologies.length}+
                  </span>
                  {/* Orbiting ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-20px] rounded-full border border-dashed border-[#FFD700]/20"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Tech detail modal */}
      <AnimatePresence>
        {selectedTech && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedTech(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md rounded-2xl border border-[#FFD700]/20 bg-[#0a0a0a] p-8"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedTech(null)}
                className="absolute right-4 top-4 text-white/40 transition-colors hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Content */}
              <div className="text-center">
                <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-[#FFD700]/20 bg-[#FFD700]/10">
                  <span className="text-4xl">{selectedTech.icon}</span>
                </div>
                <h3 className="mb-2 text-2xl font-bold text-white">
                  {selectedTech.name}
                </h3>
                {selectedTech.category && (
                  <span className="mb-4 inline-block rounded-full bg-[#FFD700]/10 px-3 py-1 text-xs text-[#FFD700]">
                    {selectedTech.category}
                  </span>
                )}
                <p className="mt-4 text-white/60">{selectedTech.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tech list - mobile fallback */}
      <div className="relative z-10 mt-16 px-4 lg:hidden">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
          {technologies.map((tech) => (
            <button
              key={tech.name}
              onClick={() => setSelectedTech(tech)}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-[#FFD700]/40"
            >
              <span className="text-2xl">{tech.icon}</span>
              <span className="text-xs text-white/60">{tech.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
