"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image: string;
  linkedin?: string;
  twitter?: string;
}

export interface TeamSectionProps {
  title?: string;
  members: TeamMember[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export function TeamSection({
  title = "Meet the Team",
  members,
  autoPlay = true,
  interval = 5000,
  className = "",
}: TeamSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentMember = members[currentIndex];
  const totalMembers = members.length;

  // Format counter with leading zero
  const formatCounter = (num: number) => String(num + 1).padStart(2, "0");

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused || totalMembers <= 1) return;

    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % totalMembers);
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, isPaused, interval, totalMembers]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalMembers);
  }, [totalMembers]);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalMembers) % totalMembers);
  }, [totalMembers]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <section
      className={`relative overflow-hidden bg-[var(--orbit-dark-200)] py-24 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-roledescription="carousel"
      aria-label={title}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--orbit-gold-100),transparent_50%)]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-screamer text-5xl uppercase tracking-wider text-[var(--orbit-gold-100)] md:text-6xl lg:text-7xl">
            {title}
          </h2>
        </motion.div>

        {/* Pause/Play Button */}
        {autoPlay && totalMembers > 1 && (
          <motion.button
            onClick={() => setIsPaused(!isPaused)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-4 top-4 z-20 flex items-center gap-2 border border-[var(--orbit-gold-100)] bg-[var(--orbit-dark-200)]/80 px-4 py-2 text-sm uppercase tracking-wider text-[var(--orbit-gold-100)] backdrop-blur-sm transition-colors hover:bg-[var(--orbit-gold-100)] hover:text-[var(--orbit-dark-200)] md:right-8 md:top-8"
            aria-label={isPaused ? "Play carousel" : "Pause carousel"}
          >
            {isPaused ? (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            )}
            <span className="hidden md:inline">{isPaused ? "Play" : "Pause"}</span>
          </motion.button>
        )}

        {/* Counter Display */}
        <motion.div
          key={currentIndex}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mb-8 flex items-center justify-center gap-4"
        >
          <div className="relative">
            <span className="font-mono text-8xl font-bold text-[var(--orbit-gold-100)] md:text-9xl">
              {formatCounter(currentIndex)}
            </span>
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[var(--orbit-gold-100)]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <span className="font-mono text-4xl text-[var(--orbit-gold-200)] opacity-50 md:text-5xl">
            / {formatCounter(totalMembers - 1)}
          </span>
        </motion.div>

        {/* Team Member Card */}
        <div className="relative mx-auto max-w-5xl">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="grid gap-8 md:grid-cols-2 md:gap-12"
              role="group"
              aria-roledescription="slide"
              aria-label={`${currentIndex + 1} of ${totalMembers}`}
            >
              {/* Image Section */}
              <motion.div
                className="group relative aspect-[3/4] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                {/* Gold border frame */}
                <div className="absolute inset-0 border-2 border-[var(--orbit-gold-100)] opacity-40" />
                <div className="absolute inset-4 border border-[var(--orbit-gold-100)] opacity-20" />

                {/* Image */}
                <div className="relative h-full w-full">
                  <Image
                    src={currentMember.image}
                    alt={currentMember.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--orbit-dark-200)] via-transparent to-transparent opacity-60" />
                </div>

                {/* Corner accents */}
                <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[var(--orbit-gold-100)]" />
                <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[var(--orbit-gold-100)]" />
                <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[var(--orbit-gold-100)]" />
                <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[var(--orbit-gold-100)]" />
              </motion.div>

              {/* Content Section */}
              <div className="flex flex-col justify-center space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h3 className="font-screamer text-4xl uppercase tracking-wide text-[var(--orbit-gold-100)] md:text-5xl">
                    {currentMember.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-px w-12 bg-[var(--orbit-gold-100)]" />
                    <p className="font-mono text-lg uppercase tracking-widest text-[var(--orbit-gold-200)]">
                      {currentMember.role}
                    </p>
                  </div>
                </motion.div>

                {currentMember.bio && (
                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-lg leading-relaxed text-gray-300"
                  >
                    {currentMember.bio}
                  </motion.p>
                )}

                {/* Social Links */}
                {(currentMember.linkedin || currentMember.twitter) && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex gap-4"
                  >
                    {currentMember.linkedin && (
                      <a
                        href={currentMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden border border-[var(--orbit-gold-100)] px-6 py-3 text-sm uppercase tracking-wider text-[var(--orbit-gold-100)] transition-colors hover:text-[var(--orbit-dark-200)]"
                      >
                        <span className="relative z-10">LinkedIn</span>
                        <motion.div
                          className="absolute inset-0 bg-[var(--orbit-gold-100)]"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </a>
                    )}
                    {currentMember.twitter && (
                      <a
                        href={currentMember.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden border border-[var(--orbit-gold-100)] px-6 py-3 text-sm uppercase tracking-wider text-[var(--orbit-gold-100)] transition-colors hover:text-[var(--orbit-dark-200)]"
                      >
                        <span className="relative z-10">Twitter</span>
                        <motion.div
                          className="absolute inset-0 bg-[var(--orbit-gold-100)]"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </a>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        {totalMembers > 1 && (
          <div className="mt-12 flex items-center justify-center gap-8">
            <motion.button
              onClick={goToPrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative h-16 w-16 border-2 border-[var(--orbit-gold-100)] transition-all hover:bg-[var(--orbit-gold-100)]"
              aria-label="Previous team member"
            >
              <svg
                className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-[var(--orbit-gold-100)] transition-colors group-hover:text-[var(--orbit-dark-200)]"
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
            </motion.button>

            {/* Progress indicator */}
            <div className="flex gap-2">
              {members.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 transition-all ${
                    index === currentIndex
                      ? "w-12 bg-[var(--orbit-gold-100)]"
                      : "w-2 bg-[var(--orbit-gold-100)] opacity-30 hover:opacity-60"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Go to team member ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={goToNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative h-16 w-16 border-2 border-[var(--orbit-gold-100)] transition-all hover:bg-[var(--orbit-gold-100)]"
              aria-label="Next team member"
            >
              <svg
                className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-[var(--orbit-gold-100)] transition-colors group-hover:text-[var(--orbit-dark-200)]"
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
            </motion.button>
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-px w-32 bg-gradient-to-r from-transparent to-[var(--orbit-gold-100)] opacity-20" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-px w-32 bg-gradient-to-l from-transparent to-[var(--orbit-gold-100)] opacity-20" />
    </section>
  );
}

export default TeamSection;