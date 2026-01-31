"use client";

import { motion } from "motion/react";
import {
  Calendar,
  Users,
  DollarSign,
  Code2,
  Building2,
  CheckCircle2,
} from "lucide-react";

interface ProjectDetails {
  timeline: string;
  teamSize: string;
  budget: string;
  technologies: string[];
  industry: string;
  status: string;
}

interface ProjectDetailsGridProps {
  details: ProjectDetails;
}

const detailItems = [
  { key: "timeline", icon: Calendar, label: "Timeline" },
  { key: "teamSize", icon: Users, label: "Team Size" },
  { key: "budget", icon: DollarSign, label: "Budget" },
  { key: "technologies", icon: Code2, label: "Technologies" },
  { key: "industry", icon: Building2, label: "Industry" },
  { key: "status", icon: CheckCircle2, label: "Status" },
] as const;

export default function ProjectDetailsGrid({
  details,
}: ProjectDetailsGridProps) {
  const getValue = (key: keyof ProjectDetails) => {
    const value = details[key];
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    return value;
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-white mb-12 text-center"
        >
          Project Details
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {detailItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="p-5 md:p-6 rounded-xl border border-white/10 bg-[#111111] hover:border-[#FFD700]/20 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-[#FFD700]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFD700]/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#FFD700]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white/50 text-sm uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-white font-medium truncate">
                      {getValue(item.key)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
