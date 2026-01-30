"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Parallax } from "react-scroll-parallax";
import { getAnimationConfig, getScrollTriggerScrub } from "@/lib/gsap-config";

gsap.registerPlugin(ScrollTrigger);

export default function Immersive3DAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);

  // Cursor glow position transforms (must be at top level, not in conditional)
  const glowX = useTransform(smoothMouseX, [-0.5, 0.5], [-200, 200]);
  const glowY = useTransform(smoothMouseY, [-0.5, 0.5], [-200, 200]);

  const [isHovered, setIsHovered] = useState(false);

  // GSAP ScrollTrigger animations
  useGSAP(() => {
    // Get device-aware animation config
    const config = getAnimationConfig();

    // Desktop: Pinned scroll with parallax
    // Mobile: Simple scroll without pinning
    if (config.enablePinning && config.enableParallax) {
      // Pin the section while scrolling through content
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 2}`,
        pin: true,
        pinSpacing: true,
        scrub: getScrollTriggerScrub(1),
        anticipatePin: 1,
      });

      // Hero text animation
      gsap.fromTo(
        heroTextRef.current,
        {
          scale: 1,
          opacity: 1,
          y: 0,
        },
        {
          scale: 0.5,
          opacity: 0,
          y: -200,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: getScrollTriggerScrub(true),
          },
        }
      );

      // Content fade in
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 0.5}`,
            scrub: getScrollTriggerScrub(true),
          },
        }
      );
    } else {
      // Mobile fallback: Simple fade animations without pinning
      gsap.fromTo(
        heroTextRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "center center",
            scrub: getScrollTriggerScrub(true),
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: getScrollTriggerScrub(true),
          },
        }
      );
    }
  }, { scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* Floating orbs with parallax */}
      <Parallax speed={-10} className="absolute top-20 left-[10%] z-10">
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-600/10 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </Parallax>

      <Parallax speed={-15} className="absolute bottom-20 right-[15%] z-10">
        <motion.div
          className="w-40 h-40 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-700/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </Parallax>

      {/* Hero text with 3D perspective */}
      <motion.div
        ref={heroTextRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 perspective-1000"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, z: -100 }}
          animate={{ opacity: 1, z: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tight mb-4">
            <span className="block opacity-40 text-white">Who We Are</span>
          </h2>
          <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-bold uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-gold-400 to-gold-600">
            The Elites
          </h1>
        </motion.div>

        {/* Cursor glow effect */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)",
            x: glowX,
            y: glowY,
          }}
        />
      </motion.div>

      {/* Content section */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex items-center justify-center z-30 opacity-0 px-4"
      >
        <Parallax speed={5} className="max-w-4xl">
          <motion.div
            className="bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-xl border border-gold-500/20 rounded-2xl p-8 md:p-12 shadow-2xl"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 40px rgba(212, 175, 55, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gold-400 mb-6">
              Crafting Digital Excellence Since 2019
            </h3>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-6">
              We are a premium digital solutions agency dedicated to transforming visions into
              immersive digital experiences. Our team of elite professionals combines cutting-edge
              technology with creative mastery to deliver unparalleled results.
            </p>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
              From web development to brand identity, we don't just build websites—we create
              digital ecosystems that captivate, engage, and convert.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gold-500/20">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">200+</div>
                <div className="text-sm text-neutral-400 uppercase tracking-wider">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">50+</div>
                <div className="text-sm text-neutral-400 uppercase tracking-wider">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">6</div>
                <div className="text-sm text-neutral-400 uppercase tracking-wider">Years</div>
              </div>
            </div>
          </motion.div>
        </Parallax>
      </div>
    </section>
  );
}
