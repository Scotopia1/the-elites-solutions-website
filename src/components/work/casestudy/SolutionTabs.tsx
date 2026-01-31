"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Compass, Palette, Code, TestTube } from "lucide-react";

interface TabContent {
  title: string;
  description: string;
  bulletPoints: string[];
  image?: string;
}

interface SolutionTabsProps {
  strategy?: TabContent;
  design?: TabContent;
  development?: TabContent;
  testing?: TabContent;
}

const tabs = [
  { key: "strategy", icon: Compass, label: "Strategy" },
  { key: "design", icon: Palette, label: "Design" },
  { key: "development", icon: Code, label: "Development" },
  { key: "testing", icon: TestTube, label: "Testing" },
] as const;

const defaultTabContent: TabContent = {
  title: "",
  description: "",
  bulletPoints: [],
};

export default function SolutionTabs({
  strategy = defaultTabContent,
  design = defaultTabContent,
  development = defaultTabContent,
  testing = defaultTabContent,
}: SolutionTabsProps) {
  const [activeTab, setActiveTab] = useState<keyof SolutionTabsProps>("strategy");
  const content = { strategy, design, development, testing };

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
          <span className="inline-block px-4 py-1.5 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-full text-[#FFD700] text-sm font-medium uppercase tracking-wider mb-4">
            Our Approach
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            The Solution
          </h2>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? "text-[#0a0a0a]"
                    : "text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-[#FFD700] rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              {/* Text Content */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  {content[activeTab].title}
                </h3>
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  {content[activeTab].description}
                </p>
                <ul className="space-y-3">
                  {content[activeTab].bulletPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
                      </span>
                      <span className="text-white/80">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                {content[activeTab].image ? (
                  <Image
                    src={content[activeTab].image}
                    alt={content[activeTab].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#FFD700]/10 via-neutral-900 to-black flex items-center justify-center">
                    {tabs.map((tab) => {
                      if (tab.key !== activeTab) return null;
                      const Icon = tab.icon;
                      return (
                        <div key={tab.key} className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#FFD700]/10 flex items-center justify-center">
                            <Icon className="w-10 h-10 text-[#FFD700]" />
                          </div>
                          <p className="text-white/40 text-sm">{tab.label} Phase</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
