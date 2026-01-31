"use client";

import { motion } from "motion/react";
import Image from "next/image";

interface PullQuote {
  text: string;
  author?: string;
}

interface ProblemDeepDiveProps {
  title: string;
  description: string;
  bulletPoints?: string[];
  pullQuote?: string | PullQuote;
  image?: string;
}

export default function ProblemDeepDive({
  title,
  description,
  bulletPoints = [],
  pullQuote,
  image,
}: ProblemDeepDiveProps) {
  // Handle both string and object pullQuote
  const quoteText = typeof pullQuote === 'string' ? pullQuote : pullQuote?.text;
  const quoteAuthor = typeof pullQuote === 'object' ? pullQuote?.author : undefined;
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-block px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-medium uppercase tracking-wider mb-6"
            >
              The Problem
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-white/70 text-lg leading-relaxed mb-8"
            >
              {description}
            </motion.p>

            {/* Bullet Points */}
            <ul className="space-y-4 mb-10">
              {bulletPoints.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-2.5 flex-shrink-0" />
                  <span className="text-white/80">{point}</span>
                </motion.li>
              ))}
            </ul>

            {/* Pull Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative pl-6 border-l-4 border-[#FFD700]"
            >
              <p className="text-xl md:text-2xl text-white font-medium italic leading-relaxed">
                &ldquo;{quoteText}&rdquo;
              </p>
            </motion.blockquote>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10"
          >
            {image ? (
              <Image
                src={image}
                alt="Problem illustration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-red-900/20 via-neutral-900 to-black flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <p className="text-white/40 text-sm">Problem Visualization</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
