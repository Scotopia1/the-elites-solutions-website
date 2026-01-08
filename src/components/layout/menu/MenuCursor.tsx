'use client';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface MenuCursorProps {
  isActive: boolean;
  isOpen: boolean;
}

const MenuCursor = forwardRef<HTMLDivElement, MenuCursorProps>(
  ({ isActive, isOpen }, ref) => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
    const rotationRef = useRef<number>(0);

    // Initialize GSAP quickTo for smooth cursor following
    const xMoveCursor = useRef<gsap.QuickToFunc | null>(null);
    const yMoveCursor = useRef<gsap.QuickToFunc | null>(null);
    const xMoveRing = useRef<gsap.QuickToFunc | null>(null);
    const yMoveRing = useRef<gsap.QuickToFunc | null>(null);

    useEffect(() => {
      if (!isOpen) return;

      // Setup quickTo functions
      if (cursorRef.current) {
        xMoveCursor.current = gsap.quickTo(cursorRef.current, 'left', {
          duration: 0.3,
          ease: 'power3',
        });
        yMoveCursor.current = gsap.quickTo(cursorRef.current, 'top', {
          duration: 0.3,
          ease: 'power3',
        });
      }

      if (ringRef.current) {
        xMoveRing.current = gsap.quickTo(ringRef.current, 'left', {
          duration: 0.5,
          ease: 'power3',
        });
        yMoveRing.current = gsap.quickTo(ringRef.current, 'top', {
          duration: 0.5,
          ease: 'power3',
        });
      }

      // Trail effect quickTo
      trailRefs.current.forEach((trail, i) => {
        if (trail) {
          gsap.set(trail, { xPercent: -50, yPercent: -50 });
        }
      });

      // Mouse move handler
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;

        // Move main cursor
        xMoveCursor.current?.(clientX);
        yMoveCursor.current?.(clientY);

        // Move ring with delay
        xMoveRing.current?.(clientX);
        yMoveRing.current?.(clientY);

        // Update trail positions with increasing delay
        trailRefs.current.forEach((trail, i) => {
          if (trail) {
            gsap.to(trail, {
              left: clientX,
              top: clientY,
              duration: 0.3 + i * 0.1,
              ease: 'power3',
            });
          }
        });
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, [isOpen]);

    // Rotation animation when active (GSAP for performance)
    useEffect(() => {
      if (!ringRef.current) return;

      if (isActive) {
        gsap.to(rotationRef, {
          current: 360,
          duration: 3,
          ease: 'none',
          repeat: -1,
          onUpdate: () => {
            if (ringRef.current) {
              ringRef.current.style.transform = `translate(-50%, -50%) rotate(${rotationRef.current}deg)`;
            }
          },
        });
      } else {
        gsap.to(rotationRef, {
          current: 0,
          duration: 0.5,
          ease: 'power2.out',
          onUpdate: () => {
            if (ringRef.current) {
              ringRef.current.style.transform = `translate(-50%, -50%) rotate(${rotationRef.current}deg)`;
            }
          },
        });
      }
    }, [isActive]);

    if (!isOpen) return null;

    return (
      <>
        {/* Trail dot (reduced from 3 to 1 for performance) */}
        {[...Array(1)].map((_, i) => (
          <div
            key={`trail-${i}`}
            ref={(el) => { trailRefs.current[i] = el; }}
            className="cursor-trail"
            style={{
              opacity: 0.3,
              transform: `scale(1)`,
            }}
          />
        ))}

        {/* Outer ring with rotation */}
        <div
          ref={ringRef}
          className={`cursor-ring ${isActive ? 'active' : ''}`}
        >
          {/* Segmented ring */}
          <svg width="100" height="100" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="50%" stopColor="#daa520" />
                <stop offset="100%" stopColor="#ffd700" />
              </linearGradient>
            </defs>
            {/* Ring segments with gaps */}
            {[0, 90, 180, 270].map((angle) => (
              <path
                key={angle}
                d={`M 50 5 A 45 45 0 0 1 95 50`}
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: 'center',
                }}
              />
            ))}
          </svg>
        </div>

        {/* Inner cursor */}
        <div
          ref={(el) => {
            if (typeof ref === 'function') ref(el);
            else if (ref) ref.current = el;
            cursorRef.current = el;
          }}
          className={`cursor-inner ${isActive ? 'active' : ''}`}
        >
          {/* Central dot */}
          <div className="cursor-dot" />

          {/* View text (shows on active) */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                className="cursor-text"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span>VIEW</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Glow effect */}
        <div
          className={`cursor-glow ${isActive ? 'active' : ''}`}
          style={{
            left: cursorRef.current?.style.left,
            top: cursorRef.current?.style.top,
          }}
        />
      </>
    );
  }
);

MenuCursor.displayName = 'MenuCursor';

// Memoize to prevent unnecessary re-renders
export default React.memo(MenuCursor);
