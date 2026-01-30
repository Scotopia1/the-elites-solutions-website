"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Tech {
  name: string;
  logo: string;
  reason: string;
}

interface TechStackGridProps {
  techStack: Tech[];
}

export default function TechStackGrid({ techStack }: TechStackGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Technology Stack
        </motion.h2>
        <motion.p
          className="text-neutral-400 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          The tools and technologies that powered this project
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <motion.div
                className="bg-neutral-900/50 border border-gold-400/20 rounded-xl p-6 flex flex-col items-center justify-center h-32 cursor-pointer"
                whileHover={{ scale: 1.05, borderColor: "rgba(212, 175, 55, 0.4)" }}
                transition={{ duration: 0.2 }}
              >
                {/* Placeholder icon - replace with actual tech logos */}
                <div className="w-12 h-12 bg-gold-400/20 rounded-full flex items-center justify-center text-xl mb-2">
                  {tech.name.charAt(0)}
                </div>
                <p className="text-white text-sm font-medium text-center">
                  {tech.name}
                </p>
              </motion.div>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-neutral-800 border border-gold-400/30 rounded-lg p-3 shadow-xl">
                      <p className="text-neutral-300 text-sm">{tech.reason}</p>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-neutral-800 border-r border-b border-gold-400/30 rotate-45" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
