"use client";

import { useState, useCallback, RefObject } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface TiltState {
  rotateX: number;
  rotateY: number;
}

interface Use3DTiltOptions {
  maxTilt?: number; // Maximum tilt in degrees
  scale?: number; // Scale on hover
  perspective?: number; // CSS perspective value
}

interface Use3DTiltReturn {
  tilt: TiltState;
  style: React.CSSProperties;
  handlers: {
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave: () => void;
    onMouseEnter: () => void;
  };
}

/**
 * Hook for 3D tilt effect on mouse movement
 * Respects reduced motion preferences
 */
export function use3DTilt(
  ref: RefObject<HTMLElement>,
  options: Use3DTiltOptions = {}
): Use3DTiltReturn {
  const { maxTilt = 10, scale = 1.02, perspective = 1000 } = options;
  const prefersReducedMotion = useReducedMotion();

  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      setTilt({
        rotateX: -percentY * maxTilt, // Inverted for natural feel
        rotateY: percentX * maxTilt,
      });
    },
    [maxTilt, prefersReducedMotion, ref]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const style: React.CSSProperties = prefersReducedMotion
    ? {}
    : {
        perspective: `${perspective}px`,
        transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${isHovered ? scale : 1})`,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.5s ease-out",
        transformStyle: "preserve-3d" as const,
      };

  return {
    tilt,
    style,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      onMouseEnter: handleMouseEnter,
    },
  };
}

export default use3DTilt;
