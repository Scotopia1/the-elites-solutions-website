"use client";

import { motion } from "motion/react";
import Image from "next/image";

interface CaseStudyHeroCardProps {
  image: string;
  title: string;
  category: string;
  clientName: string;
  tags: string[];
  projectUrl?: string;
}

export default function CaseStudyHeroCard({
  image,
  title,
  category,
  clientName,
  tags = [],
  projectUrl,
}: CaseStudyHeroCardProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -8 }}
          className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden group cursor-pointer"
        >
          {/* Image Container */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" />
              )}
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />

            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute top-6 left-6"
            >
              <span className="px-4 py-2 bg-[#FFD700]/20 backdrop-blur-sm border border-[#FFD700]/30 rounded-full text-[#FFD700] text-sm font-medium uppercase tracking-wider">
                {category}
              </span>
            </motion.div>

            {/* Client Name Overlay */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute top-6 right-6 flex items-center gap-3"
            >
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-sm font-medium">
                {clientName}
              </span>
              {projectUrl && (
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#FFD700]/90 hover:bg-[#FFD700] backdrop-blur-sm border border-[#FFD700] rounded-full text-black text-sm font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 group"
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit Live Site
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              )}
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {title}
            </motion.h1>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              {tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70 text-sm hover:border-[#FFD700]/30 hover:text-[#FFD700] transition-colors duration-300"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FFD700]/5 via-transparent to-[#FFD700]/5" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
