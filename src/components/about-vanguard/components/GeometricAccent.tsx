"use client";

import { motion } from "framer-motion";

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface GeometricAccentProps {
  position: Position;
  size?: "sm" | "md" | "lg";
  delay?: number;
  className?: string;
}

/**
 * Decorative corner geometric accent
 * Used throughout Vanguard design for premium feel
 */
export function GeometricAccent({
  position,
  size = "md",
  delay = 0,
  className = "",
}: GeometricAccentProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const positionClasses = {
    "top-left": "top-4 left-4 border-t border-l",
    "top-right": "top-4 right-4 border-t border-r",
    "bottom-left": "bottom-4 left-4 border-b border-l",
    "bottom-right": "bottom-4 right-4 border-b border-r",
  };

  return (
    <motion.div
      className={`
        absolute ${positionClasses[position]} ${sizeClasses[size]}
        border-gold-400/40
        ${className}
      `}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      aria-hidden="true"
    >
      {/* Inner corner dot */}
      <div
        className={`
          absolute w-1.5 h-1.5 bg-gold-400 rounded-full
          ${position === "top-left" ? "top-0 left-0 -translate-x-1/2 -translate-y-1/2" : ""}
          ${position === "top-right" ? "top-0 right-0 translate-x-1/2 -translate-y-1/2" : ""}
          ${position === "bottom-left" ? "bottom-0 left-0 -translate-x-1/2 translate-y-1/2" : ""}
          ${position === "bottom-right" ? "bottom-0 right-0 translate-x-1/2 translate-y-1/2" : ""}
        `}
      />
    </motion.div>
  );
}

export default GeometricAccent;
