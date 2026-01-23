"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * VanguardHero - 3D Interactive Hero with WebGL-like effects
 * Features: Interactive mesh, 3D perspective, cursor tracking, floating orbs
 * Updated: Team section and scroll indicator positioning
 */

// Interactive Wire Mesh Canvas Component
const InteractiveMesh = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Grid configuration
    const cols = 40;
    const rows = 25;
    const cellWidth = canvas.width / cols;
    const cellHeight = canvas.height / rows;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw mesh
      ctx.strokeStyle = "rgba(212, 175, 55, 0.08)";
      ctx.lineWidth = 1;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * cellWidth;
          const y = j * cellHeight;

          // Calculate distance from mouse
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 250;

          // Displacement based on mouse proximity
          let offsetX = 0;
          let offsetY = 0;
          let glow = 0;

          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 30;
            offsetX = (dx / dist) * force || 0;
            offsetY = (dy / dist) * force || 0;
            glow = 1 - dist / maxDist;
          }

          const px = x + offsetX;
          const py = y + offsetY;

          // Draw point with glow
          if (glow > 0) {
            ctx.fillStyle = `rgba(212, 175, 55, ${glow * 0.6})`;
            ctx.beginPath();
            ctx.arc(px, py, 2 + glow * 3, 0, Math.PI * 2);
            ctx.fill();
          }

          // Draw horizontal lines
          if (i < cols) {
            const nextX = (i + 1) * cellWidth;
            const nextDx = nextX - mx;
            const nextDist = Math.sqrt(nextDx * nextDx + dy * dy);
            let nextOffsetX = 0;
            let nextOffsetY = 0;

            if (nextDist < maxDist) {
              const force = (1 - nextDist / maxDist) * 30;
              nextOffsetX = (nextDx / nextDist) * force || 0;
              nextOffsetY = (dy / nextDist) * force || 0;
            }

            const lineGlow = Math.max(glow, nextDist < maxDist ? 1 - nextDist / maxDist : 0);
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.05 + lineGlow * 0.15})`;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(nextX + nextOffsetX, y + nextOffsetY);
            ctx.stroke();
          }

          // Draw vertical lines
          if (j < rows) {
            const nextY = (j + 1) * cellHeight;
            const nextDy = nextY - my;
            const nextDist = Math.sqrt(dx * dx + nextDy * nextDy);
            let nextOffsetX = 0;
            let nextOffsetY = 0;

            if (nextDist < maxDist) {
              const force = (1 - nextDist / maxDist) * 30;
              nextOffsetX = (dx / nextDist) * force || 0;
              nextOffsetY = (nextDy / nextDist) * force || 0;
            }

            const lineGlow = Math.max(glow, nextDist < maxDist ? 1 - nextDist / maxDist : 0);
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.05 + lineGlow * 0.15})`;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(x + nextOffsetX, nextY + nextOffsetY);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
};

// Floating Orb Component
const FloatingOrb = ({
  size,
  initialX,
  initialY,
  delay,
  duration,
}: {
  size: number;
  initialX: string;
  initialY: string;
  delay: number;
  duration: number;
}) => {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: initialX,
        top: initialY,
        background: `radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.4), rgba(212, 175, 55, 0.1) 50%, transparent 70%)`,
        boxShadow: `0 0 ${size}px rgba(212, 175, 55, 0.3), inset 0 0 ${size / 2}px rgba(255, 255, 255, 0.1)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0.6, 0.8, 0],
        scale: [0.5, 1, 1.1, 1, 0.5],
        x: [0, 50, -30, 20, 0],
        y: [0, -80, -40, -100, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Cursor Glow Component
const CursorGlow = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-screen"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: 400,
        height: 400,
        marginLeft: -200,
        marginTop: -200,
        background: "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 60%)",
        filter: "blur(40px)",
      }}
    />
  );
};

export function VanguardHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation
  const springConfig = { damping: 30, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig);

  // Parallax transforms for different layers
  const layer1X = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), springConfig);
  const layer1Y = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), springConfig);
  const layer2X = useSpring(useTransform(mouseX, [0, 1], [-40, 40]), springConfig);
  const layer2Y = useSpring(useTransform(mouseY, [0, 1], [-40, 40]), springConfig);
  const layer3X = useSpring(useTransform(mouseX, [0, 1], [-60, 60]), springConfig);
  const layer3Y = useSpring(useTransform(mouseY, [0, 1], [-60, 60]), springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY, prefersReducedMotion]
  );

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* Interactive Mesh Background */}
      {!prefersReducedMotion && <InteractiveMesh />}

      {/* Cursor Glow */}
      {!prefersReducedMotion && isHovered && <CursorGlow />}

      {/* Floating Orbs */}
      {!prefersReducedMotion && (
        <>
          <FloatingOrb size={80} initialX="10%" initialY="20%" delay={0} duration={12} />
          <FloatingOrb size={50} initialX="80%" initialY="30%" delay={2} duration={10} />
          <FloatingOrb size={100} initialX="70%" initialY="70%" delay={4} duration={14} />
          <FloatingOrb size={40} initialX="20%" initialY="75%" delay={6} duration={11} />
          <FloatingOrb size={60} initialX="50%" initialY="15%" delay={3} duration={13} />
        </>
      )}

      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-gold-400/5 rounded-full blur-[150px]" />
      </div>

      {/* 3D Perspective Container */}
      <motion.div
        className="relative z-10 text-center px-4"
        style={{
          perspective: 1000,
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Layer 1 - Background Text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            x: prefersReducedMotion ? 0 : layer3X,
            y: prefersReducedMotion ? 0 : layer3Y,
            translateZ: -100,
          }}
        >
          <span className="font-heading text-[25vw] md:text-[20vw] font-bold text-white/[0.02] tracking-tighter select-none">
            ELITE
          </span>
        </motion.div>

        {/* Layer 2 - Secondary Text */}
        <motion.div
          style={{
            x: prefersReducedMotion ? 0 : layer2X,
            y: prefersReducedMotion ? 0 : layer2Y,
            translateZ: -50,
          }}
        >
          <motion.span
            className="block font-mono text-xs md:text-sm text-gold-400 uppercase tracking-[0.5em] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
          </motion.span>
        </motion.div>

        {/* Layer 3 - Main Headlines */}
        <motion.div
          className="relative"
          style={{
            x: prefersReducedMotion ? 0 : layer1X,
            y: prefersReducedMotion ? 0 : layer1Y,
            translateZ: 0,
          }}
        >
          {/* Main Headline */}
          <motion.h1
            className="font-heading text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold leading-[0.9] tracking-tighter"
            initial={{ opacity: 0, y: 50, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <span className="text-white">50+ BUSINESSES</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 relative">
              TRANSFORMED
              {/* Glow effect */}
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 blur-2xl opacity-50">
                TRANSFORMED
              </span>
            </span>
          </motion.h1>

          {/* Decorative Line */}
          <motion.div
            className="flex items-center justify-center gap-4 my-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent to-gold-400" />
            <div className="w-3 h-3 rotate-45 border border-gold-400 relative">
              <div className="absolute inset-1 bg-gold-400" />
            </div>
            <div className="w-16 md:w-24 h-[1px] bg-gradient-to-l from-transparent to-gold-400" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="font-sans text-base md:text-lg lg:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            E-commerce. FinTech. Healthcare. Enterprise.{" "}
            <span className="text-gold-400 font-medium">We build what others can't.</span>
          </motion.p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          style={{
            translateZ: 50,
          }}
        >
          <motion.a
            href="#mission"
            className="inline-flex items-center gap-3 px-8 py-4 border border-gold-400/50 rounded-full text-gold-400 font-mono text-sm uppercase tracking-wider hover:bg-gold-400 hover:text-black transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Our Story</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-y-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          style={{ translateZ: 75 }}
        >
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.3em]">
            Scroll to explore
          </span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-gold-400 to-transparent"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{
              background: "linear-gradient(180deg, rgb(212, 175, 55), rgba(212, 175, 55, 0.5))",
              boxShadow: "0 0 8px rgba(212, 175, 55, 0.6)"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Corner Elements */}
      <motion.div
        className="absolute top-8 left-8 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <div className="w-8 h-8 border-l-2 border-t-2 border-gold-400/30" />
        <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">Est. 2019</span>
      </motion.div>

      <motion.div
        className="absolute top-8 right-8 flex items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.9 }}
      >
        <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">Digital Vanguard</span>
        <div className="w-8 h-8 border-r-2 border-t-2 border-gold-400/30" />
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <div className="w-8 h-8 border-l-2 border-b-2 border-gold-400/30" />
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 2.1 }}
      >
        <div className="w-8 h-8 border-r-2 border-b-2 border-gold-400/30" />
      </motion.div>
    </section>
  );
}

export default VanguardHero;
