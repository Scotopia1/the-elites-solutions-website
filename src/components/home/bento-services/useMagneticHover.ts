'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import { useMotionValue, useSpring, MotionValue } from 'framer-motion';

interface UseMagneticHoverOptions {
  strength?: number;
  rotationRange?: number;
  damping?: number;
  stiffness?: number;
  disabled?: boolean;
}

interface UseMagneticHoverReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  scale: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isHovering: boolean;
}

export function useMagneticHover(
  options: UseMagneticHoverOptions = {}
): UseMagneticHoverReturn {
  const {
    strength = 0.4,        // Pronounced: 25-30px movement
    rotationRange = 15,    // ±15deg tilt
    damping = 15,
    stiffness = 150,
    disabled = false,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Check for touch device on mount
  useEffect(() => {
    setIsTouchDevice(
      'ontouchstart' in window || navigator.maxTouchPoints > 0
    );
  }, []);

  // Raw motion values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawScale = useMotionValue(1);

  // Spring config for smooth, bouncy movement
  const springConfig = {
    damping,
    stiffness,
    restDelta: 0.001,
  };

  // Sprung values for smooth animation
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);
  const scale = useSpring(rawScale, { damping: 20, stiffness: 300 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || isTouchDevice || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate offset from center
      const offsetX = (e.clientX - centerX) * strength;
      const offsetY = (e.clientY - centerY) * strength;

      // Apply magnetic pull
      rawX.set(offsetX);
      rawY.set(offsetY);

      // Calculate 3D rotation based on cursor position
      // Cursor at top = rotate forward (negative X), at bottom = rotate back
      // Cursor at left = rotate left (negative Y), at right = rotate right
      const rotateXValue =
        ((e.clientY - centerY) / (rect.height / 2)) * -rotationRange;
      const rotateYValue =
        ((e.clientX - centerX) / (rect.width / 2)) * rotationRange;

      rawRotateX.set(rotateXValue);
      rawRotateY.set(rotateYValue);
    },
    [disabled, isTouchDevice, strength, rotationRange, rawX, rawY, rawRotateX, rawRotateY]
  );

  const onMouseEnter = useCallback(() => {
    if (disabled || isTouchDevice) return;
    setIsHovering(true);
    rawScale.set(1.02);
  }, [disabled, isTouchDevice, rawScale]);

  const onMouseLeave = useCallback(() => {
    setIsHovering(false);
    // Reset all values on leave
    rawX.set(0);
    rawY.set(0);
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawScale.set(1);
  }, [rawX, rawY, rawRotateX, rawRotateY, rawScale]);

  return {
    ref,
    x,
    y,
    rotateX,
    rotateY,
    scale,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    isHovering,
  };
}

export default useMagneticHover;
