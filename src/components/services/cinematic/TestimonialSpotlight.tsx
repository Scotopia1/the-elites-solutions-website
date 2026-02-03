"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Parallax } from "react-scroll-parallax";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}

interface TestimonialSpotlightProps {
  testimonials: Testimonial[];
  sectionTitle?: string;
  autoPlayInterval?: number;
}

export default function TestimonialSpotlight({
  testimonials = [],
  sectionTitle = "Client Stories",
  autoPlayInterval = 6000,
}: TestimonialSpotlightProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isEmpty = testimonials.length === 0;

  useEffect(() => {
    if (isEmpty) return;
    if (testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [testimonials.length, autoPlayInterval, isEmpty]);

  if (isEmpty) return null;

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-transparent py-24">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Large quote mark */}
        <Parallax speed={-10} className="absolute left-8 top-1/4 lg:left-20">
          <span className="text-[200px] font-serif leading-none text-white/[0.02] lg:text-[300px]">
            &ldquo;
          </span>
        </Parallax>

        {/* Floating orbs - removed for transparent bg */}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-sm font-medium uppercase tracking-[0.3em] text-white/40"
        >
          {sectionTitle}
        </motion.h2>

        {/* Testimonial content */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center lg:flex-row lg:gap-16"
            >
              {/* Image with parallax */}
              {currentTestimonial.image && (
                <Parallax speed={5} className="mb-8 lg:mb-0">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative"
                  >
                    <div className="relative h-48 w-48 overflow-hidden rounded-full lg:h-64 lg:w-64">
                      <img
                        src={currentTestimonial.image}
                        alt={currentTestimonial.author}
                        className="h-full w-full object-cover"
                      />
                      {/* Gold ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-[#FFD700]/30" />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 -z-10 rounded-full bg-[#FFD700]/20 blur-2xl" />
                  </motion.div>
                </Parallax>
              )}

              {/* Quote content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Quote */}
                <motion.blockquote
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mb-8"
                >
                  <p className="text-2xl font-light leading-relaxed text-white md:text-3xl lg:text-4xl">
                    &ldquo;{currentTestimonial.quote}&rdquo;
                  </p>
                </motion.blockquote>

                {/* Author info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <p className="text-xl font-semibold text-[#FFD700]">
                    {currentTestimonial.author}
                  </p>
                  <p className="text-white/60">
                    {currentTestimonial.role} at {currentTestimonial.company}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        {testimonials.length > 1 && (
          <div className="mt-12 flex justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="group relative p-2"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <div
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "bg-[#FFD700] scale-125"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
                {/* Progress ring for active */}
                {i === activeIndex && (
                  <svg
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      stroke="rgba(255,215,0,0.3)"
                      strokeWidth="1"
                    />
                    <motion.circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="1"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
                      style={{
                        rotate: -90,
                        transformOrigin: "center",
                      }}
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Navigation arrows */}
        {testimonials.length > 1 && (
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 hidden lg:block">
            <div className="mx-auto flex max-w-7xl justify-between px-4">
              <button
                onClick={() =>
                  setActiveIndex(
                    (prev) => (prev - 1 + testimonials.length) % testimonials.length
                  )
                }
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-[#FFD700]/40 hover:bg-[#FFD700]/10"
                aria-label="Previous testimonial"
              >
                <svg
                  className="h-5 w-5 text-white/60 transition-colors group-hover:text-[#FFD700]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % testimonials.length)
                }
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-[#FFD700]/40 hover:bg-[#FFD700]/10"
                aria-label="Next testimonial"
              >
                <svg
                  className="h-5 w-5 text-white/60 transition-colors group-hover:text-[#FFD700]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
