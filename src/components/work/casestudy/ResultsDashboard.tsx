"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Metric {
  label: string;
  before: number;
  after: number;
  unit: string;
  isHigherBetter?: boolean;
}

interface ResultsDashboardProps {
  metrics: Metric[];
}

function CountUp({
  end,
  duration = 2,
  inView,
}: {
  end: number;
  duration?: number;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  return <span>{count.toLocaleString()}</span>;
}

function ProgressBar({
  percentage,
  inView,
  delay = 0,
}: {
  percentage: number;
  inView: boolean;
  delay?: number;
}) {
  return (
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: inView ? `${Math.min(percentage, 100)}%` : 0 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full"
      />
    </div>
  );
}

export default function ResultsDashboard({ metrics = [] }: ResultsDashboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  if (metrics.length === 0) return null;

  const calculateChange = (before: number, after: number, isHigherBetter = true) => {
    const change = ((after - before) / before) * 100;
    const isPositive = isHigherBetter ? change > 0 : change < 0;
    return { percentage: Math.abs(change), isPositive };
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium uppercase tracking-wider mb-4">
            Measurable Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Results Dashboard
          </h2>
        </motion.div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.map((metric, index) => {
            const { percentage, isPositive } = calculateChange(
              metric.before,
              metric.after,
              metric.isHigherBetter
            );

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="p-6 md:p-8 rounded-xl border border-white/10 bg-[#111111] hover:border-[#FFD700]/20 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold text-lg">{metric.label}</h3>
                  <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      isPositive
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{percentage.toFixed(0)}%</span>
                  </div>
                </div>

                {/* Values */}
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-white/50 text-sm mb-1">Before</p>
                    <p className="text-2xl font-bold text-white/60">
                      <CountUp end={metric.before} inView={isInView} />
                      <span className="text-sm ml-1">{metric.unit}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/50 text-sm mb-1">After</p>
                    <p className="text-3xl font-bold text-[#FFD700]">
                      <CountUp end={metric.after} inView={isInView} />
                      <span className="text-sm ml-1">{metric.unit}</span>
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <ProgressBar
                  percentage={(metric.after / Math.max(metric.before, metric.after)) * 100}
                  inView={isInView}
                  delay={index * 0.1}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
