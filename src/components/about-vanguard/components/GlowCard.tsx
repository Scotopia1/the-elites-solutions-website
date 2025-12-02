"use client";

import { useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { use3DTilt } from "../hooks/use3DTilt";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  enableTilt?: boolean;
  glowColor?: string;
  glowIntensity?: "low" | "medium" | "high";
  delay?: number;
}

/**
 * Glassmorphic card with gold glow on hover
 * Optional 3D tilt effect
 */
export function GlowCard({
  children,
  className = "",
  enableTilt = true,
  glowColor = "rgba(212, 175, 55, 0.5)",
  glowIntensity = "medium",
  delay = 0,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { style: tiltStyle, handlers } = use3DTilt(cardRef as React.RefObject<HTMLElement>, {
    maxTilt: enableTilt ? 8 : 0,
    scale: enableTilt ? 1.02 : 1,
  });

  const glowSizes = {
    low: "0 0 20px",
    medium: "0 0 30px",
    high: "0 0 50px",
  };

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative bg-white/5 backdrop-blur-sm
        border border-white/10 rounded-2xl
        transition-all duration-300
        hover:border-gold-400/30
        ${className}
      `}
      style={{
        ...tiltStyle,
        boxShadow: "none",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        boxShadow: `${glowSizes[glowIntensity]} ${glowColor}`,
      }}
      {...handlers}
    >
      {/* Corner accents */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-gold-400/30 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-gold-400/30 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-gold-400/30 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-gold-400/30 opacity-0 group-hover:opacity-100 transition-opacity" />

      {children}
    </motion.div>
  );
}

export default GlowCard;
