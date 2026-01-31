"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Clock,
  DollarSign,
  TrendingUp,
  Search,
  Zap,
  Rocket,
  LineChart,
  Shield,
  ArrowRight,
} from "lucide-react";

interface ChallengeItem {
  id: string;
  challenge: {
    title: string;
    description: string;
    icon: "clock" | "dollar" | "trending" | "search";
  };
  solution: {
    title: string;
    description: string;
    icon: "zap" | "rocket" | "chart" | "shield";
    stat?: string;
  };
  size: "large" | "medium" | "small";
}

interface BentoChallengeSolutionProps {
  sectionTitle?: string;
  subtitle?: string;
  items?: ChallengeItem[];
  heroStatement?: {
    challenge: string;
    solution: string;
  };
}

const defaultItems: ChallengeItem[] = [
  {
    id: "time",
    challenge: {
      title: "Time-Consuming Processes",
      description: "Manual workflows slow down your team and create bottlenecks",
      icon: "clock",
    },
    solution: {
      title: "Streamlined Automation",
      description: "Automated systems that work 24/7, freeing your team to focus on growth",
      icon: "zap",
      stat: "10x Faster",
    },
    size: "medium",
  },
  {
    id: "cost",
    challenge: {
      title: "Rising Operational Costs",
      description: "Inefficient systems drain resources and limit your potential",
      icon: "dollar",
    },
    solution: {
      title: "Cost-Efficient Solutions",
      description: "Optimized processes that reduce overhead while increasing output",
      icon: "rocket",
      stat: "50% Savings",
    },
    size: "medium",
  },
  {
    id: "scale",
    challenge: {
      title: "Limited Scalability",
      description: "Current infrastructure can't keep pace with your ambitions",
      icon: "trending",
    },
    solution: {
      title: "Built for Growth",
      description: "Flexible architecture that scales seamlessly with your business",
      icon: "chart",
      stat: "Unlimited Scale",
    },
    size: "small",
  },
  {
    id: "insight",
    challenge: {
      title: "Lack of Insights",
      description: "Decisions made without data lead to missed opportunities",
      icon: "search",
    },
    solution: {
      title: "Data-Driven Clarity",
      description: "Real-time analytics and insights that drive informed decisions",
      icon: "shield",
      stat: "100% Visibility",
    },
    size: "small",
  },
];

const iconMap = {
  clock: Clock,
  dollar: DollarSign,
  trending: TrendingUp,
  search: Search,
  zap: Zap,
  rocket: Rocket,
  chart: LineChart,
  shield: Shield,
};

function BentoCard({ item }: { item: ChallengeItem }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const ChallengeIcon = iconMap[item.challenge.icon];
  const SolutionIcon = iconMap[item.solution.icon];

  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2",
    medium: "md:col-span-1 md:row-span-2",
    small: "md:col-span-1 md:row-span-1",
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[item.size]} min-h-[280px] md:min-h-0`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front - Challenge */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-6 md:p-8 flex flex-col justify-between overflow-hidden group"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Icon */}
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <ChallengeIcon className="w-6 h-6 text-white/60" />
            </div>

            <span className="text-xs font-medium uppercase tracking-wider text-white/40 mb-2 block">
              The Challenge
            </span>

            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
              {item.challenge.title}
            </h3>

            <p className="text-white/50 text-sm md:text-base leading-relaxed">
              {item.challenge.description}
            </p>
          </div>

          {/* Hover hint */}
          <div className="relative z-10 flex items-center gap-2 text-white/30 text-sm mt-4">
            <span>Hover to see solution</span>
            <ArrowRight className="w-4 h-4" />
          </div>

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-500/10 to-transparent rounded-bl-full" />
        </div>

        {/* Back - Solution */}
        <div
          className="absolute inset-0 rounded-2xl border border-[#FFD700]/20 bg-gradient-to-br from-[#FFD700]/[0.08] via-[#FFD700]/[0.02] to-transparent p-6 md:p-8 flex flex-col justify-between overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 via-transparent to-transparent" />

          {/* Icon */}
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center mb-4">
              <SolutionIcon className="w-6 h-6 text-[#FFD700]" />
            </div>

            <span className="text-xs font-medium uppercase tracking-wider text-[#FFD700]/60 mb-2 block">
              Our Solution
            </span>

            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
              {item.solution.title}
            </h3>

            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              {item.solution.description}
            </p>
          </div>

          {/* Stat badge */}
          {item.solution.stat && (
            <div className="relative z-10 mt-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] text-sm font-semibold">
                {item.solution.stat}
              </span>
            </div>
          )}

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FFD700]/20 to-transparent rounded-bl-full" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function HeroCard({
  heroStatement,
}: {
  heroStatement: { challenge: string; solution: string };
}) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <motion.div
      className="md:col-span-2 md:row-span-2 relative min-h-[400px]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setShowSolution(true)}
      onMouseLeave={() => setShowSolution(false)}
    >
      <div className="relative w-full h-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-8 md:p-12 flex flex-col justify-center overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 via-[#FFD700]/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: showSolution ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {!showSolution ? (
              <motion.div
                key="challenge"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-xs font-medium uppercase tracking-wider text-white/40 mb-4 block">
                  The Core Challenge
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                  {heroStatement.challenge}
                </h2>
                <div className="flex items-center gap-2 text-white/30 text-sm">
                  <span>Hover to reveal transformation</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="solution"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-xs font-medium uppercase tracking-wider text-[#FFD700]/60 mb-4 block">
                  Our Approach
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                  {heroStatement.solution}
                </h2>
                <div className="flex items-center gap-3">
                  <div className="h-1 w-16 bg-gradient-to-r from-[#FFD700] to-[#FFD700]/50 rounded-full" />
                  <span className="text-[#FFD700]/80 text-sm font-medium">
                    Results that matter
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-[#FFD700]/10 to-transparent rounded-tl-full opacity-50" />
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-br-full" />
      </div>
    </motion.div>
  );
}

export default function BentoChallengeSolution({
  sectionTitle = "Challenge & Solution",
  subtitle = "We transform your biggest obstacles into opportunities for growth",
  items = defaultItems,
  heroStatement = {
    challenge: "Businesses struggle with outdated systems that limit growth and drain resources.",
    solution: "We build modern, scalable solutions that unlock your full potential.",
  },
}: BentoChallengeSolutionProps) {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 px-4 md:px-8 bg-transparent overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {sectionTitle}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)]">
          {/* Hero card - spans 2x2 */}
          <HeroCard heroStatement={heroStatement} />

          {/* Regular cards */}
          {items.map((item) => (
            <BentoCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Bottom gradient fade - removed for transparent bg */}
    </section>
  );
}
