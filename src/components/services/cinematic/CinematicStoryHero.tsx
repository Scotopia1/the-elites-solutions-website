"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface CinematicStoryHeroProps {
  title: string;
  subtitle?: string;
  tagline?: string;
}

export default function CinematicStoryHero({
  title,
  subtitle,
  tagline,
}: CinematicStoryHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Particle/grain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let animationId: number;
    const particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];

    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw noise grain
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const noise = Math.random() * 15;
        imageData.data[i] = noise;
        imageData.data[i + 1] = noise;
        imageData.data[i + 2] = noise;
        imageData.data[i + 3] = 8;
      }
      ctx.putImageData(imageData, 0, 0);

      // Draw floating particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`;
        ctx.fill();

        p.y -= p.speed;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const words = title.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-transparent"
    >
      {/* Grain/particle canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10"
      />

      {/* Content */}
      <motion.div
        style={{ y: titleY, opacity }}
        className="relative z-20 flex h-full flex-col items-center justify-center px-4"
      >
        {tagline && (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-[#FFD700]"
          >
            {tagline}
          </motion.span>
        )}

        <h1 className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-center">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block text-5xl font-bold text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 + words.length * 0.15 }}
            className="mt-8 max-w-2xl text-center text-lg text-white/60 md:text-xl"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-white/40">
            Scroll
          </span>
          <div className="h-12 w-[1px] overflow-hidden bg-white/20">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-full bg-gradient-to-b from-transparent via-[#FFD700] to-transparent"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade - removed for transparent bg */}
    </section>
  );
}
