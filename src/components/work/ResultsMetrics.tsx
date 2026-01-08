"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

interface Metric {
  metric: string;
  description: string;
}

interface ResultsMetricsProps {
  results: Metric[];
  testimonial?: {
    quote: string;
    author: string;
    title: string;
    avatar?: string;
  };
}

export default function ResultsMetrics({ results, testimonial }: ResultsMetricsProps) {
  // Extract number from metric string (e.g., "200%" -> 200)
  const extractNumber = (metric: string): number => {
    const match = metric.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Results & Impact
        </motion.h2>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {results.map((result, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600 mb-3">
                {result.metric}
              </div>
              <p className="text-neutral-400">{result.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        {testimonial && (
          <motion.div
            className="max-w-4xl mx-auto bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 border border-gold-400/20 rounded-2xl p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <svg
              className="w-12 h-12 text-gold-400/30 mb-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            <p className="text-xl md:text-2xl text-white leading-relaxed mb-8">
              {testimonial.quote}
            </p>

            <div className="flex items-center gap-4">
              {testimonial.avatar && (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-black font-bold">
                  {testimonial.author.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-white font-semibold">{testimonial.author}</p>
                <p className="text-neutral-400 text-sm">{testimonial.title}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
