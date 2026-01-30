"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FileText, Calendar, X, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CTAConfig {
  type: "quote" | "consultation" | "both";
  buttonText?: {
    quote?: { en: string; fr: string; ar: string };
    consultation?: { en: string; fr: string; ar: string };
  };
}

interface CTAFloatingPillProps {
  serviceName: string;
  ctaConfig?: CTAConfig;
  locale?: string;
}

export default function CTAFloatingPill({
  serviceName,
  ctaConfig = { type: "both" },
  locale = "en"
}: CTAFloatingPillProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Show CTA after scrolling past hero (e.g., 80vh)
  useEffect(() => {
    // Check localStorage for dismissal
    const dismissed = localStorage.getItem("cta-pill-dismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show after scrolling past hero
      setIsVisible(scrolled > windowHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem("cta-pill-dismissed", "true");
  };

  const getButtonText = (type: "quote" | "consultation") => {
    const textMap = ctaConfig.buttonText;
    if (type === "quote") {
      return textMap?.quote?.[locale as keyof typeof textMap.quote] || "Request Quote";
    }
    return textMap?.consultation?.[locale as keyof typeof textMap.consultation] || "Schedule Consultation";
  };

  const showQuote = ctaConfig.type === "quote" || ctaConfig.type === "both";
  const showConsultation = ctaConfig.type === "consultation" || ctaConfig.type === "both";

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-8 right-8 z-50"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {/* Collapsed State - Just Icons */}
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.div
                key="collapsed"
                initial={{ width: "auto" }}
                animate={{ width: "auto" }}
                exit={{ width: "auto" }}
                className="relative"
              >
                <div className="flex items-center gap-2 p-4 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 shadow-2xl shadow-gold-400/30 border border-gold-300">
                  {/* Icon Pills */}
                  <div className="flex items-center gap-2">
                    {showQuote && (
                      <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                    )}
                    {showConsultation && (
                      <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Pulse Effect */}
                  <div className="absolute inset-0 rounded-full bg-gold-400 animate-ping opacity-20" />
                </div>
              </motion.div>
            ) : (
              /* Expanded State - Full Buttons */
              <motion.div
                key="expanded"
                initial={{ width: "auto" }}
                animate={{ width: "auto" }}
                exit={{ width: "auto" }}
                className="relative"
              >
                <div className="flex items-center gap-3 p-3 rounded-full bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 shadow-2xl backdrop-blur-md">
                  {/* Quote Button */}
                  {showQuote && (
                    <Link
                      href={`/contact?service=${encodeURIComponent(serviceName)}&type=quote`}
                      className="group"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-black font-semibold transition-all hover:shadow-lg hover:shadow-gold-400/30"
                      >
                        <FileText className="w-4 h-4" />
                        <span>{getButtonText("quote")}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  )}

                  {/* Divider */}
                  {showQuote && showConsultation && (
                    <div className="w-px h-8 bg-neutral-700" />
                  )}

                  {/* Consultation Button */}
                  {showConsultation && (
                    <Link
                      href={`/contact?service=${encodeURIComponent(serviceName)}&type=consultation`}
                      className="group"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-800 border border-neutral-700 text-white font-semibold transition-all hover:border-gold-400/50 hover:bg-neutral-750"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{getButtonText("consultation")}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  )}

                  {/* Dismiss Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDismiss}
                    className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:border-red-500/50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
