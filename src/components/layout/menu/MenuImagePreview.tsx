'use client';

import React, { forwardRef, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface MenuImagePreviewProps {
  activeImage: {
    title: string;
    image: string;
  } | null;
  mousePosition: { x: number; y: number };
}

const MenuImagePreview = forwardRef<HTMLDivElement, MenuImagePreviewProps>(
  ({ activeImage, mousePosition }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const glitchRef = useRef<HTMLDivElement>(null);

    // Parallax effect on mouse movement
    useGSAP(() => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      // Calculate offset from center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const offsetX = (mousePosition.x - centerX) / centerX;
      const offsetY = (mousePosition.y - centerY) / centerY;

      // Apply subtle parallax
      gsap.to(container, {
        x: offsetX * 20,
        y: offsetY * 10,
        duration: 0.5,
        ease: 'power3.out',
      });
    }, { dependencies: [mousePosition], scope: containerRef });

    // Glitch effect on image change
    useGSAP(() => {
      if (!glitchRef.current || !activeImage) return;

      const glitch = glitchRef.current;

      // Flash gold overlay
      gsap.timeline()
        .to(glitch, {
          opacity: 0.3,
          duration: 0.05,
        })
        .to(glitch, {
          opacity: 0,
          duration: 0.1,
        })
        .to(glitch, {
          opacity: 0.15,
          duration: 0.05,
        })
        .to(glitch, {
          opacity: 0,
          duration: 0.15,
        });
    }, { dependencies: [activeImage?.image], scope: glitchRef });

    // Image transition variants
    const imageVariants = {
      initial: {
        scale: 1.2,
        opacity: 0,
        filter: 'blur(20px) brightness(1.5)',
      },
      animate: {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px) brightness(1)',
        transition: {
          duration: 0.5,
          ease: [0.76, 0, 0.24, 1],
        },
      },
      exit: {
        scale: 0.9,
        opacity: 0,
        filter: 'blur(10px) brightness(0.8)',
        transition: {
          duration: 0.3,
          ease: [0.76, 0, 0.24, 1],
        },
      },
    };

    return (
      <div
        ref={(el) => {
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
          containerRef.current = el;
        }}
        className="menu-image-preview"
      >
        {/* Glassmorphism frame */}
        <div className="preview-frame">
          {/* Corner brackets */}
          <div className="preview-corner preview-corner-tl" />
          <div className="preview-corner preview-corner-tr" />
          <div className="preview-corner preview-corner-bl" />
          <div className="preview-corner preview-corner-br" />

          {/* Image container */}
          <div className="preview-image-container">
            <AnimatePresence mode="wait">
              {activeImage && (
                <motion.div
                  key={activeImage.image}
                  className="preview-image-wrapper"
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Image
                    src={activeImage.image}
                    alt={activeImage.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />

                  {/* Gradient overlay */}
                  <div className="preview-gradient" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Gold flash overlay for glitch effect */}
            <div ref={glitchRef} className="preview-glitch-overlay" />

            {/* Scanline overlay */}
            <div className="preview-scanlines" />
          </div>

          {/* Gold border glow */}
          <motion.div
            className="preview-border-glow"
            animate={{
              opacity: activeImage ? [0.5, 1, 0.5] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Title badge */}
          <AnimatePresence>
            {activeImage && (
              <motion.div
                className="preview-title-badge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <span className="badge-line" />
                <span className="badge-text">{activeImage.title}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status indicator */}
        <div className="preview-status">
          <motion.div
            className="status-dot"
            animate={{
              scale: activeImage ? [1, 1.2, 1] : 1,
              opacity: activeImage ? 1 : 0.3,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
          <span className="status-text">
            {activeImage ? 'PREVIEW ACTIVE' : 'STANDBY'}
          </span>
        </div>
      </div>
    );
  }
);

MenuImagePreview.displayName = 'MenuImagePreview';

export default MenuImagePreview;
