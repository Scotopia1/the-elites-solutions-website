"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Quote } from "lucide-react";

interface Metric {
  value: string;
  label: string;
  icon?: string;
}

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  logo?: string;
  avatar?: string;
}

interface SocialProofBannerProps {
  metrics?: Metric[];
  testimonials?: Testimonial[];
}

// Counter animation hook
function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      countRef.current = Math.floor(end * easeOutQuart);
      setCount(countRef.current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animate();
  }, [isInView, end, duration]);

  return { count, ref };
}

export default function SocialProofBanner({ metrics, testimonials }: SocialProofBannerProps) {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950" />

      {/* Gold Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Proven <span className="text-gold-gradient">Results</span>
          </h2>
          <p className="text-lg text-neutral-400">
            Numbers that speak for themselves, backed by real client success stories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Metrics Cards */}
          <div className="grid grid-cols-2 gap-6">
            {metrics?.slice(0, 4).map((metric, index) => {
              const numericValue = parseInt(metric.value.replace(/\D/g, '')) || 0;

              return (
                <MetricCard
                  key={index}
                  metric={metric}
                  numericValue={numericValue}
                  delay={index * 0.1}
                />
              );
            })}
          </div>

          {/* Right: Testimonial Cards */}
          <div className="space-y-6">
            {testimonials?.slice(0, 2).map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group"
              >
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border border-neutral-800 backdrop-blur-sm transition-all duration-300 group-hover:border-gold-400/30 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                  {/* Quote Icon */}
                  <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-600/20 border border-gold-400/30 flex items-center justify-center">
                    <Quote className="w-5 h-5 text-gold-400" />
                  </div>

                  {/* Quote */}
                  <blockquote className="text-neutral-300 leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    {testimonial.avatar && (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gold-400/30"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-white">{testimonial.author}</p>
                      <p className="text-sm text-neutral-500">{testimonial.company}</p>
                    </div>
                    {testimonial.logo && (
                      <img
                        src={testimonial.logo}
                        alt={`${testimonial.company} logo`}
                        className="ml-auto h-8 opacity-50 object-contain"
                      />
                    )}
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/0 to-gold-600/0 group-hover:from-gold-400/5 group-hover:to-gold-600/5 transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Separate MetricCard component for animated counter
function MetricCard({ metric, numericValue, delay }: { metric: Metric; numericValue: number; delay: number }) {
  const { count, ref } = useCountUp(numericValue);
  const suffix = metric.value.replace(/\d/g, '');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      className="group"
    >
      <div className="relative p-8 rounded-2xl bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border border-neutral-800 backdrop-blur-sm transition-all duration-300 group-hover:border-gold-400/50 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]">
        {/* Icon */}
        {metric.icon && (
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
            {metric.icon}
          </div>
        )}

        {/* Value with Animated Counter */}
        <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
          {count}{suffix}
        </div>

        {/* Label */}
        <p className="text-sm text-neutral-400 font-medium">{metric.label}</p>

        {/* Hover Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/0 to-gold-600/0 group-hover:from-gold-400/10 group-hover:to-gold-600/10 transition-all duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}
