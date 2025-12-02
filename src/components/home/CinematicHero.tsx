"use client";
import "./CinematicHero.css";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
CustomEase.create("smooth", "0.25, 0.1, 0.25, 1");

let isInitialLoad = true;

// Gold Particle System
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

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const particleCount = 80;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Mouse influence
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          particle.speedX += (dx / distance) * force * 0.02;
          particle.speedY += (dy / distance) * force * 0.02;
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Damping
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;

        // Pulse animation
        particle.pulse += 0.02;
        const pulseOpacity = particle.opacity + Math.sin(particle.pulse) * 0.2;

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
        gradient.addColorStop(0.5, `rgba(212, 175, 55, ${pulseOpacity * 0.5})`);
        gradient.addColorStop(1, "rgba(197, 160, 0, 0)");

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="cinematic-particles" />;
}

export default function CinematicHero() {
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const goldLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  // Magnetic button effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  useGSAP(() => {
    const animationDelay = showPreloader ? 6.2 : 0.5;

    // Preloader animation (keeping existing logic)
    if (showPreloader) {
      const tl = gsap.timeline({
        delay: 0.3,
        defaults: { ease: "hop" },
      });

      const counts = document.querySelectorAll(".count");
      const progressBar = document.querySelector(".progress-bar");
      const preloaderOverlay = document.querySelector(".preloader-overlay");

      const progressTl = gsap.timeline({ delay: 0.3 });

      counts.forEach((count, index) => {
        const digits = count.querySelectorAll(".digit h1");

        tl.to(digits, { y: "0%", duration: 1, stagger: 0.075 }, index * 1);

        if (index < counts.length) {
          tl.to(digits, { y: "-120%", duration: 1, stagger: 0.075 }, index * 1 + 1);
        }

        progressTl.to(
          progressBar,
          { scaleY: (index + 1) / counts.length, duration: 1, ease: "hop" },
          index * 1
        );
      });

      progressTl
        .set(progressBar, { transformOrigin: "top" })
        .to(progressBar, { scaleY: 0, duration: 0.75, ease: "hop" })
        .to(preloaderOverlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            if (preloaderOverlay) {
              (preloaderOverlay as HTMLElement).style.display = "none";
            }
          },
        });
    }

    // Hero content animations
    const heroTl = gsap.timeline({ delay: animationDelay });

    // Animate headline words
    const words = headlineRef.current?.querySelectorAll(".cinematic-word");
    if (words && words.length > 0) {
      gsap.set(words, { y: 100, opacity: 0 });
      heroTl.to(words, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });
    }

    // Gold line expansion
    if (goldLineRef.current) {
      gsap.set(goldLineRef.current, { scaleX: 0 });
      heroTl.to(
        goldLineRef.current,
        { scaleX: 1, duration: 1.5, ease: "power4.out" },
        "-=0.5"
      );
    }

    // CTA animation
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { y: 40, opacity: 0 });
      heroTl.to(
        ctaRef.current,
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
        "-=0.8"
      );
    }

    // Scroll indicator animation
    if (scrollIndicatorRef.current) {
      gsap.set(scrollIndicatorRef.current, { y: 20, opacity: 0 });
      heroTl.to(
        scrollIndicatorRef.current,
        { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
        "-=0.5"
      );
    }

    // Parallax scroll effect for headline
    if (heroRef.current && headlineRef.current) {
      const headlineWords = headlineRef.current.querySelectorAll(".cinematic-word");

      headlineWords.forEach((word, index) => {
        gsap.to(word, {
          y: (index % 2 === 0 ? -100 : -150) * (index + 1) * 0.3,
          opacity: 0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }
  }, [showPreloader]);

  return (
    <>
      {/* Preloader */}
      {showPreloader && (
        <div className="preloader-overlay">
          <div className="progress-bar"></div>
          <div className="counter">
            <div className="count">
              <div className="digit"><h1>0</h1></div>
              <div className="digit"><h1>0</h1></div>
            </div>
            <div className="count">
              <div className="digit"><h1>1</h1></div>
              <div className="digit"><h1>5</h1></div>
            </div>
            <div className="count">
              <div className="digit"><h1>4</h1></div>
              <div className="digit"><h1>2</h1></div>
            </div>
            <div className="count">
              <div className="digit"><h1>8</h1></div>
              <div className="digit"><h1>7</h1></div>
            </div>
            <div className="count">
              <div className="digit"><h1>1</h1></div>
              <div className="digit"><h1>0</h1></div>
            </div>
            <div className="count">
              <div className="digit"><h1>1</h1></div>
              <div className="digit"><h1>0</h1></div>
              <div className="digit"><h1>0</h1></div>
            </div>
          </div>
        </div>
      )}

      {/* Cinematic Hero Section */}
      <section ref={heroRef} className="cinematic-hero">
        {/* Background layers */}
        <div className="cinematic-bg">
          <div className="cinematic-gradient" />
          <div className="cinematic-noise" />
          <GoldParticles />
        </div>

        {/* Main content */}
        <div className="cinematic-content">
          {/* Headline */}
          <div ref={headlineRef} className="cinematic-headline">
            <div className="cinematic-word-wrapper">
              <span className="cinematic-word">WE</span>
            </div>
            <div className="cinematic-word-wrapper">
              <span className="cinematic-word">BUILD</span>
            </div>
            <div ref={goldLineRef} className="cinematic-gold-line" />
            <div className="cinematic-word-wrapper">
              <span className="cinematic-word cinematic-word-accent">DIGITAL</span>
            </div>
            <div className="cinematic-word-wrapper">
              <span className="cinematic-word cinematic-word-accent">EMPIRES</span>
            </div>
          </div>

          {/* Tagline */}
          <p className="cinematic-tagline">
            Premium software solutions for businesses that demand excellence
          </p>

          {/* CTA Button */}
          <div ref={ctaRef} className="cinematic-cta">
            <Link
              href="/contact"
              className="cinematic-btn"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <span className="cinematic-btn-bg" />
              <span className="cinematic-btn-text">Start Your Project</span>
              <span className="cinematic-btn-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div ref={scrollIndicatorRef} className="cinematic-scroll">
            <div className="cinematic-scroll-line">
              <div className="cinematic-scroll-dot" />
            </div>
            <span className="cinematic-scroll-text">Scroll to explore</span>
          </div>
        </div>



      </section>
    </>
  );
}
