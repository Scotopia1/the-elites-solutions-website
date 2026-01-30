"use client";

import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";

interface BlogHeroImageProps {
  image: string;
  alt: string;
  title: string;
  subtitle?: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  publishedDate: string;
  readingTime: string;
  tags: string[];
}

export default function BlogHeroImage({
  image,
  alt,
  title,
  subtitle,
  category,
  author,
  publishedDate,
  readingTime,
  tags,
}: BlogHeroImageProps) {
  return (
    <div className="relative w-full min-h-[70vh] md:min-h-[75vh] flex items-center overflow-hidden">
      {/* Background with parallax */}
      <Parallax speed={-10} className="absolute inset-0 z-0">
        <div className="w-full h-[120%] -top-[10%] relative">
          {/* Gradient Background */}
          <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-black to-neutral-900" />

          {/* Animated Gold Accent */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
          </div>

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(#FFD700 1px, transparent 1px),
                linear-gradient(90deg, #FFD700 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </Parallax>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent z-10" />

      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 py-20">
        <div className="text-center">
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-1.5 bg-gold-400/10 border border-gold-400/30 rounded-full text-gold-400 text-sm font-semibold uppercase tracking-wider">
              {category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-300 mb-10 max-w-3xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Author Info & Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-neutral-400"
          >
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-bold text-lg">
                {author.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-white font-medium">{author.name}</p>
                <p className="text-sm text-neutral-400">{author.title}</p>
              </div>
            </div>

            <span className="hidden sm:block text-neutral-600">•</span>

            {/* Date & Reading Time */}
            <div className="flex items-center gap-3 text-sm">
              <time>{publishedDate}</time>
              <span>•</span>
              <span>{readingTime}</span>
            </div>
          </motion.div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2 justify-center mt-8"
            >
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-neutral-900 border border-gold-400/20 rounded-full text-sm text-neutral-300 hover:border-gold-400/40 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-15" />
    </div>
  );
}
