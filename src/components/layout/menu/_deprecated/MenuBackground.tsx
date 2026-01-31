'use client';

import React, { forwardRef, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface MenuBackgroundProps {
  isOpen: boolean;
}

const MenuBackground = forwardRef<HTMLDivElement, MenuBackgroundProps>(
  ({ isOpen }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Animated grid pattern
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !isOpen) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener('resize', resize);

      // Grid animation variables (throttled to 30fps for performance)
      let animationId: number;
      let time = 0;
      let lastFrameTime = 0;
      const targetFPS = 30;
      const frameInterval = 1000 / targetFPS;

      const drawGrid = (timestamp: number) => {
        if (!ctx || !canvas) return;

        // Throttle to 30fps
        const elapsed = timestamp - lastFrameTime;
        if (elapsed < frameInterval) {
          animationId = requestAnimationFrame(drawGrid);
          return;
        }
        lastFrameTime = timestamp - (elapsed % frameInterval);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const gridSize = 80;
        const lineWidth = 0.3;

        // Subtle pulse effect
        const pulse = Math.sin(time * 0.008) * 0.5 + 0.5;
        const baseOpacity = 0.02 + pulse * 0.01;

        // Draw vertical lines
        ctx.lineWidth = lineWidth;

        for (let x = 0; x <= canvas.width; x += gridSize) {
          const lineOpacity = baseOpacity * (0.4 + Math.sin(x * 0.005 + time * 0.003) * 0.3);
          ctx.strokeStyle = `rgba(255, 215, 0, ${lineOpacity})`;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }

        // Draw horizontal lines
        for (let y = 0; y <= canvas.height; y += gridSize) {
          const lineOpacity = baseOpacity * (0.4 + Math.cos(y * 0.005 + time * 0.003) * 0.3);
          ctx.strokeStyle = `rgba(255, 215, 0, ${lineOpacity})`;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        // Optimized intersection dots (skip every other row/column for 75% reduction)
        for (let x = 0; x <= canvas.width; x += gridSize * 2) {
          for (let y = 0; y <= canvas.height; y += gridSize * 2) {
            const glowIntensity =
              Math.sin(x * 0.01 + time * 0.005) *
              Math.cos(y * 0.01 + time * 0.004) *
              0.5 + 0.5;

            if (glowIntensity > 0.8) {
              ctx.beginPath();
              ctx.arc(x, y, 1.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 215, 0, ${glowIntensity * 0.1})`;
              ctx.fill();
            }
          }
        }

        time++;
        animationId = requestAnimationFrame(drawGrid);
      };

      animationId = requestAnimationFrame(drawGrid);

      return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationId);
      };
    }, [isOpen]);

    return (
      <div ref={ref} className="menu-background">
        {/* Animated grid canvas */}
        <canvas
          ref={canvasRef}
          className="menu-grid-canvas"
          aria-hidden="true"
        />

        {/* Centered radial gold glow */}
        <motion.div
          className="menu-center-glow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            scale: isOpen ? 1 : 0.8,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          aria-hidden="true"
        />

        {/* Secondary ambient glow for depth */}
        <motion.div
          className="menu-ambient-glow"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isOpen ? [0.3, 0.5, 0.3] : 0,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        />

        {/* Subtle scanlines */}
        <div className="menu-scanlines" aria-hidden="true" />

        {/* Noise texture overlay */}
        <div className="menu-noise" aria-hidden="true" />

        {/* Enhanced vignette for center focus */}
        <div className="menu-vignette" aria-hidden="true" />
      </div>
    );
  }
);

MenuBackground.displayName = 'MenuBackground';

export default MenuBackground;
