"use client";

import { motion } from "motion/react";
import { AlertCircle, Lightbulb, TrendingUp } from "lucide-react";

interface ExecutiveSummaryProps {
  challenge?: string;
  solution?: string;
  results?: string;
}

const columns = [
  {
    key: "challenge",
    icon: AlertCircle,
    title: "The Challenge",
    color: "#ef4444",
  },
  {
    key: "solution",
    icon: Lightbulb,
    title: "Our Solution",
    color: "#FFD700",
  },
  {
    key: "results",
    icon: TrendingUp,
    title: "The Results",
    color: "#22c55e",
  },
] as const;

export default function ExecutiveSummary({
  challenge = "",
  solution = "",
  results = "",
}: ExecutiveSummaryProps) {
  const content = { challenge, solution, results };

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-white mb-12 text-center"
        >
          Executive Summary
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {columns.map((col, index) => {
            const Icon = col.icon;
            return (
              <motion.div
                key={col.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative p-6 md:p-8 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300 group"
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: index * 0.15 + 0.2,
                  }}
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${col.color}15` }}
                >
                  <Icon
                    className="w-7 h-7"
                    style={{ color: col.color }}
                  />
                </motion.div>

                {/* Title */}
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: col.color }}
                >
                  {col.title}
                </h3>

                {/* Content */}
                <p className="text-white/70 leading-relaxed">
                  {content[col.key]}
                </p>

                {/* Accent Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                  className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                  style={{ backgroundColor: col.color }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
