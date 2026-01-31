"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";

interface Metric {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

interface ResultsTheaterProps {
  metrics: Metric[];
  sectionTitle?: string;
  subtitle?: string;
}

function CountUp({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
}: {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * target);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function ResultsTheater({
  metrics = [],
  sectionTitle = "Results That Speak",
  subtitle,
}: ResultsTheaterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (metrics.length === 0) return null;

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center bg-transparent py-24"
    >
      {/* Background effects - removed for transparent bg */}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
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

        {/* Metrics grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:border-[#FFD700]/30 hover:bg-[#FFD700]/5">
                {/* Particle effect on hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {[...Array(20)].map((_, j) => (
                    <motion.div
                      key={j}
                      className="absolute h-1 w-1 rounded-full bg-[#FFD700]"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                {/* Gold accent line */}
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                {/* Value */}
                <div className="mb-4 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                  <CountUp
                    target={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                  />
                </div>

                {/* Label */}
                <h3 className="mb-2 text-lg font-semibold text-[#FFD700]">
                  {metric.label}
                </h3>

                {/* Description */}
                {metric.description && (
                  <p className="text-sm text-white/50">{metric.description}</p>
                )}

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 h-16 w-16 translate-x-8 translate-y-8 rounded-full bg-[#FFD700]/10 blur-2xl transition-all group-hover:bg-[#FFD700]/20" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mx-auto mt-16 h-px w-48 bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent"
        />
      </div>
    </section>
  );
}
