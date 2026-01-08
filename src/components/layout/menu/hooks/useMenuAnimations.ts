'use client';

import { useRef, useCallback } from 'react';
import gsap from 'gsap';

interface MenuAnimationRefs {
  overlay: React.RefObject<HTMLDivElement | null>;
  background: React.RefObject<HTMLDivElement | null>;
  geometrics: React.RefObject<HTMLDivElement | null>;
  menuItems: React.MutableRefObject<(HTMLDivElement | null)[]>;
  closeButton: React.RefObject<HTMLButtonElement | null>;
  cursor: React.RefObject<HTMLDivElement | null>;
}

interface UseMenuAnimationsReturn {
  animateOpen: () => gsap.core.Timeline;
  animateClose: () => gsap.core.Timeline;
  animateItemHover: (element: HTMLElement, isEntering: boolean) => void;
}

// Smooth spring-like easing for elegant animations
const smoothEase = 'power2.out';
const elegantEase = 'expo.out';
const exitEase = 'power2.inOut';

export function useMenuAnimations(refs: MenuAnimationRefs): UseMenuAnimationsReturn {
  const isAnimatingRef = useRef(false);

  const animateOpen = useCallback(() => {
    const tl = gsap.timeline({
      onStart: () => {
        isAnimatingRef.current = true;
      },
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    // Set initial state
    tl.set(refs.overlay.current, { display: 'flex' });

    // 1. Fade in overlay with smooth ease (0.4s)
    tl.fromTo(
      refs.overlay.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: smoothEase }
    );

    // 2. Animate background with elegant reveal (0.5s)
    if (refs.background.current) {
      tl.fromTo(
        refs.background.current,
        {
          opacity: 0,
          scale: 1.05
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: elegantEase
        },
        '-=0.3'
      );
    }

    // 3. Stagger menu items from center with smooth fade + scale (0.08s stagger - optimized, blur removed)
    if (refs.menuItems.current.length > 0) {
      tl.fromTo(
        refs.menuItems.current.filter(Boolean),
        {
          y: 30,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: 'back.out(1.2)',
        },
        '-=0.2'
      );
    }

    // 4. Close button elegant fade in
    if (refs.closeButton.current) {
      tl.fromTo(
        refs.closeButton.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
        '-=0.5'
      );
    }

    // 5. Footer fade in (if exists)
    const footer = refs.overlay.current?.querySelector('.vanguard-menu-footer');
    if (footer) {
      tl.fromTo(
        footer,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: smoothEase },
        '-=0.4'
      );
    }

    return tl;
  }, [refs]);

  const animateClose = useCallback(() => {
    const tl = gsap.timeline({
      onStart: () => {
        isAnimatingRef.current = true;
      },
    });

    // Close button fade out first
    if (refs.closeButton.current) {
      tl.to(
        refs.closeButton.current,
        { opacity: 0, scale: 0.9, duration: 0.2, ease: exitEase },
        0
      );
    }

    // Footer fade out
    const footer = refs.overlay.current?.querySelector('.vanguard-menu-footer');
    if (footer) {
      tl.to(
        footer,
        { opacity: 0, y: 10, duration: 0.2, ease: exitEase },
        0
      );
    }

    // Menu items exit with faster stagger (0.05s, reverse order - optimized, blur removed)
    if (refs.menuItems.current.length > 0) {
      tl.to(
        [...refs.menuItems.current.filter(Boolean)].reverse(),
        {
          y: -20,
          opacity: 0,
          scale: 0.95,
          stagger: 0.05,
          duration: 0.25,
          ease: exitEase,
        },
        0.1
      );
    }

    // Background fade out
    if (refs.background.current) {
      tl.to(
        refs.background.current,
        {
          opacity: 0,
          scale: 1.02,
          duration: 0.3,
          ease: exitEase
        },
        '-=0.2'
      );
    }

    // Final overlay fade
    tl.to(
      refs.overlay.current,
      { opacity: 0, duration: 0.3, ease: exitEase },
      '-=0.1'
    );

    tl.set(refs.overlay.current, { display: 'none' });

    return tl;
  }, [refs]);

  const animateItemHover = useCallback((element: HTMLElement, isEntering: boolean) => {
    if (isEntering) {
      // Subtle scale and glow for centered items (no horizontal shift)
      gsap.to(element, {
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out',
      });

      // Animate the number with gold glow
      const number = element.querySelector('.menu-item-number');
      if (number) {
        gsap.to(number, {
          textShadow: '0 0 30px rgba(255, 215, 0, 0.9)',
          color: '#ffd700',
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      // Animate title glow
      const title = element.querySelector('.menu-item-title');
      if (title) {
        gsap.to(title, {
          textShadow: '0 0 50px rgba(255, 215, 0, 0.5)',
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      // Animate glow element
      const glow = element.querySelector('.menu-item-glow');
      if (glow) {
        gsap.to(glow, {
          opacity: 0.4,
          scale: 1.3,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    } else {
      gsap.to(element, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });

      const number = element.querySelector('.menu-item-number');
      if (number) {
        gsap.to(number, {
          textShadow: 'none',
          color: 'rgba(255, 255, 255, 0.4)',
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      const title = element.querySelector('.menu-item-title');
      if (title) {
        gsap.to(title, {
          textShadow: 'none',
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      const glow = element.querySelector('.menu-item-glow');
      if (glow) {
        gsap.to(glow, {
          opacity: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    }
  }, []);

  return {
    animateOpen,
    animateClose,
    animateItemHover,
  };
}

export default useMenuAnimations;
