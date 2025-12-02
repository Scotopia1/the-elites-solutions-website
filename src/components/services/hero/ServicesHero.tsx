'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ServicesHero.css';

// Gold Particle System (simplified from CinematicHero)
function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    pulse: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 60;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Mouse influence
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          particle.speedX += (dx / distance) * force * 0.015;
          particle.speedY += (dy / distance) * force * 0.015;
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Damping
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;

        // Pulse animation
        particle.pulse += 0.02;
        const pulseOpacity = particle.opacity + Math.sin(particle.pulse) * 0.15;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with gold gradient
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        );
        gradient.addColorStop(0, `rgba(255, 215, 0, ${pulseOpacity})`);
        gradient.addColorStop(0.5, `rgba(255, 193, 7, ${pulseOpacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="services-hero__particles" />;
}

export default function ServicesHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Trigger load animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.6,
      },
    },
  };

  return (
    <section ref={heroRef} className="services-hero">
      {/* Gold particles background */}
      <GoldParticles />

      {/* Dark gradient overlay */}
      <div className="services-hero__overlay" />

      {/* Content */}
      <motion.div
        className="services-hero__content"
        style={{ opacity }}
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
      >
        {/* Decorative line */}
        <motion.div
          className="services-hero__line"
          variants={lineVariants}
        />

        {/* Subtitle */}
        <motion.p
          className="services-hero__subtitle"
          style={{ y: subtitleY }}
          variants={itemVariants}
        >
          What We Do
        </motion.p>

        {/* Main title */}
        <motion.h1
          className="services-hero__title"
          style={{ y: titleY }}
          variants={itemVariants}
        >
          <span className="services-hero__title-text">Our</span>
          <span className="services-hero__title-gold">Services</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="services-hero__description"
          variants={itemVariants}
        >
          Elevating your digital presence with premium solutions
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="services-hero__scroll"
          variants={itemVariants}
        >
          <span>Scroll to explore</span>
          <motion.div
            className="services-hero__scroll-line"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
