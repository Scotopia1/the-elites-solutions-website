'use client';

import React, { forwardRef, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MenuItemProps {
  number: string;
  title: string;
  href: string;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: (e: React.MouseEvent) => void;
}

const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ number, title, href, isActive, onHover, onLeave, onClick }, ref) => {
    const [isHovering, setIsHovering] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);

    // Cache rect to avoid layout thrashing
    const rectCache = useRef<{ centerX: number; centerY: number; width: number; height: number } | null>(null);

    // Motion values for 3D tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth return
    const springConfig = { stiffness: 300, damping: 20 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
    const translateZ = useSpring(useTransform(mouseX, [-0.5, 0, 0.5], [5, 15, 5]), springConfig);

    // Update cached rect (called only on enter, not on every move)
    const updateRectCache = useCallback(() => {
      if (!itemRef.current) return;
      const rect = itemRef.current.getBoundingClientRect();
      rectCache.current = {
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      };
    }, []);

    // 3D tilt effect on mouse move (uses cached rect)
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
      if (!rectCache.current) return;

      const { centerX, centerY, width, height } = rectCache.current;

      // Normalize to -0.5 to 0.5
      const normalizedX = (e.clientX - centerX) / width;
      const normalizedY = (e.clientY - centerY) / height;

      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    }, [mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
      // Reset to center with spring animation
      mouseX.set(0);
      mouseY.set(0);
      setIsHovering(false);
      onLeave();
    }, [mouseX, mouseY, onLeave]);

    const handleMouseEnter = useCallback(() => {
      setIsHovering(true);
      updateRectCache(); // Cache rect on enter to avoid layout thrashing
      onHover();
    }, [onHover, updateRectCache]);

    return (
      <div
        ref={ref}
        className={`menu-item ${isActive ? 'active' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          ref={itemRef}
          className="menu-item-inner"
          style={{
            rotateX,
            rotateY,
            translateZ,
            transformStyle: 'preserve-3d',
          }}
        >
          <Link
            href={href}
            onClick={onClick}
            className="menu-item-link"
          >
            {/* Number with glow effect */}
            <span className="menu-item-number">
              <motion.span
                className="number-glow"
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1.5 : 1,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              />
              {number}
            </span>

            {/* Title with CSS mask reveal effect */}
            <span className="menu-item-title">
              <span
                className="menu-item-title-text"
                data-text={title.toUpperCase()}
              >
                {title.toUpperCase()}
              </span>
            </span>

            {/* Animated underline - CSS handles the animation */}
            <span className="menu-item-underline" />

            {/* Arrow indicator */}
            <motion.span
              className="menu-item-arrow"
              initial={{ x: -20, opacity: 0 }}
              animate={{
                x: isActive ? 0 : -20,
                opacity: isActive ? 1 : 0,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          </Link>
        </motion.div>

        {/* Subtle glow on hover */}
        <motion.span
          className="menu-item-glow"
          animate={{
            opacity: isActive ? 0.3 : 0,
            scale: isActive ? 1.2 : 1,
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        />
      </div>
    );
  }
);

MenuItem.displayName = 'MenuItem';

// Memoize to prevent unnecessary re-renders
export default React.memo(MenuItem);
