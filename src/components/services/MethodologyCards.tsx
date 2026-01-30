"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Target, Code2, Shield, Headphones } from "lucide-react";

interface Methodology {
  approach?: {
    principles: Array<{
      name: string;
      icon?: string;
      description: string;
    }>;
  };
  quality?: {
    testingLevels: string[];
    checkpoints: string[];
  };
  support?: {
    sla: Array<{
      level: string;
      responseTime: string;
    }>;
    guarantees: string[];
  };
}

interface TechStackItem {
  name: string;
  logo?: string;
  category?: string;
}

interface MethodologyCardsProps {
  methodology?: Methodology;
  techStack?: TechStackItem[];
}

export default function MethodologyCards({ methodology, techStack }: MethodologyCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects for each card
  const card1Y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const card4Y = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900" />

      {/* Decorative Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(#FFD700 1px, transparent 1px), linear-gradient(90deg, #FFD700 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}
      />

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
            How We <span className="text-gold-gradient">Work</span>
          </h2>
          <p className="text-lg text-neutral-400">
            Our methodology combines proven practices with innovative approaches to deliver excellence.
          </p>
        </motion.div>

        {/* 4-Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Our Approach */}
          <motion.div
            style={{ y: card1Y }}
            whileHover={{ scale: 1.05 }}
            className="group relative"
          >
            <div className="relative h-full p-8 rounded-2xl bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 transition-all duration-300 group-hover:border-gold-400/50 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]">
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/20 border border-gold-400/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-gold-400" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gold-400 transition-colors">
                Our Approach
              </h3>

              {/* Principles */}
              <div className="space-y-3">
                {methodology?.approach?.principles.map((principle, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">{principle.icon || "✨"}</span>
                    <div>
                      <p className="font-semibold text-neutral-200 text-sm">{principle.name}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{principle.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/0 to-gold-600/0 group-hover:from-gold-400/10 group-hover:to-gold-600/10 transition-all duration-300 pointer-events-none" />
            </div>
          </motion.div>

          {/* Card 2: Tech Stack */}
          <motion.div
            style={{ y: card2Y }}
            whileHover={{ scale: 1.05 }}
            className="group relative"
          >
            <div className="relative h-full p-8 rounded-2xl bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 transition-all duration-300 group-hover:border-gold-400/50 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]">
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/20 border border-gold-400/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code2 className="w-7 h-7 text-gold-400" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gold-400 transition-colors">
                Tech Stack
              </h3>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 mb-6">
                <span className="text-xs font-semibold text-gold-400">Built with Industry Leaders</span>
              </div>

              {/* Logo Cloud */}
              <div className="grid grid-cols-3 gap-3">
                {techStack?.slice(0, 6).map((tech, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center p-3 rounded-lg bg-neutral-800/50 border border-neutral-700 group-hover:border-gold-400/30 transition-colors"
                    title={tech.name}
                  >
                    {tech.logo ? (
                      <img src={tech.logo} alt={tech.name} className="w-8 h-8 object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <span className="text-xs text-neutral-400 font-semibold">{tech.name}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/0 to-gold-600/0 group-hover:from-gold-400/10 group-hover:to-gold-600/10 transition-all duration-300 pointer-events-none" />
            </div>
          </motion.div>

          {/* Card 3: Quality Assurance */}
          <motion.div
            style={{ y: card3Y }}
            whileHover={{ scale: 1.05 }}
            className="group relative"
          >
            <div className="relative h-full p-8 rounded-2xl bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 transition-all duration-300 group-hover:border-gold-400/50 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]">
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/20 border border-gold-400/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-gold-400" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gold-400 transition-colors">
                Quality Assurance
              </h3>

              {/* Testing Pyramid */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Testing Levels</h4>
                <div className="space-y-2">
                  {methodology?.quality?.testingLevels.map((level, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      <span className="text-sm text-neutral-300">{level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkpoints */}
              <div>
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">QA Checkpoints</h4>
                <div className="space-y-2">
                  {methodology?.quality?.checkpoints.map((checkpoint, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      <span className="text-sm text-neutral-300">{checkpoint}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/0 to-gold-600/0 group-hover:from-gold-400/10 group-hover:to-gold-600/10 transition-all duration-300 pointer-events-none" />
            </div>
          </motion.div>

          {/* Card 4: Support & SLA */}
          <motion.div
            style={{ y: card4Y }}
            whileHover={{ scale: 1.05 }}
            className="group relative"
          >
            <div className="relative h-full p-8 rounded-2xl bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 transition-all duration-300 group-hover:border-gold-400/50 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]">
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/20 border border-gold-400/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Headphones className="w-7 h-7 text-gold-400" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gold-400 transition-colors">
                Support & SLA
              </h3>

              {/* SLA Tiers */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Response Times</h4>
                <div className="space-y-2">
                  {methodology?.support?.sla.map((tier, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-neutral-400">{tier.level}</span>
                      <span className="font-semibold text-gold-400">{tier.responseTime}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantees */}
              <div>
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Our Guarantees</h4>
                <div className="space-y-2">
                  {methodology?.support?.guarantees.map((guarantee, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      <span className="text-sm text-neutral-300">{guarantee}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/0 to-gold-600/0 group-hover:from-gold-400/10 group-hover:to-gold-600/10 transition-all duration-300 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
