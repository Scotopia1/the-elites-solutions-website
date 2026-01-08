"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon?: string;
  duration?: string;
  deliverables?: string[];
}

interface ProcessOverviewGridProps {
  process: ProcessStep[];
}

export default function ProcessOverviewGrid({ process }: ProcessOverviewGridProps) {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />

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
            Our <span className="text-gold-gradient">Process</span>
          </h2>
          <p className="text-lg text-neutral-400">
            A proven methodology that delivers exceptional results, from concept to launch and beyond.
          </p>
        </motion.div>

        {/* Process Grid - 2x3 layout on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {process.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border border-neutral-800 backdrop-blur-sm transition-all duration-300 group-hover:border-gold-400/30 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                {/* Step Badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-600/20 border border-gold-400/30 text-gold-400 font-bold text-lg mb-6">
                  {step.step}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                  {step.title}
                </h3>

                {/* Duration */}
                {step.duration && (
                  <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{step.duration}</span>
                  </div>
                )}

                {/* Description */}
                <p className="text-neutral-400 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Deliverables */}
                {step.deliverables && step.deliverables.length > 0 && (
                  <div className="border-t border-neutral-800 pt-6">
                    <h4 className="text-sm font-semibold text-neutral-300 mb-3 uppercase tracking-wide">
                      Key Deliverables
                    </h4>
                    <ul className="space-y-2">
                      {step.deliverables.map((deliverable, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-500">
                          <CheckCircle2 className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/0 to-gold-600/0 group-hover:from-gold-400/5 group-hover:to-gold-600/5 transition-all duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
