'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Create a pinned scroll section with GSAP ScrollTrigger
 */
export function createPinnedSection(
  trigger: HTMLElement,
  options: {
    duration?: number; // in viewport heights
    scrub?: boolean | number;
    onUpdate?: (progress: number) => void;
    refreshPriority?: number;
  } = {}
) {
  const { duration = 3, scrub = true, onUpdate, refreshPriority = 0 } = options;

  return ScrollTrigger.create({
    trigger,
    start: 'top top',
    end: () => `+=${window.innerHeight * duration}`,
    pin: true,
    pinSpacing: true,
    scrub,
    invalidateOnRefresh: true,
    refreshPriority,
    onUpdate: onUpdate ? (self) => onUpdate(self.progress) : undefined,
  });
}

/**
 * Create a horizontal scroll section
 */
export function createHorizontalScroll(
  trigger: HTMLElement,
  scrollContainer: HTMLElement,
  options: {
    duration?: number;
    scrub?: boolean | number;
  } = {}
) {
  const { duration = 3, scrub = 1 } = options;

  const getScrollDistance = () => {
    return -(scrollContainer.scrollWidth - window.innerWidth);
  };

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top top',
      end: () => `+=${window.innerHeight * duration}`,
      pin: true,
      scrub,
      invalidateOnRefresh: true,
    },
  });

  tl.to(scrollContainer, {
    x: getScrollDistance,
    ease: 'none',
  });

  return tl;
}

/**
 * Create a staggered reveal animation
 */
export function createStaggerReveal(
  elements: HTMLElement[] | NodeListOf<Element>,
  options: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    stagger?: number;
    trigger?: HTMLElement;
    start?: string;
  } = {}
) {
  const {
    from = { opacity: 0, y: 50 },
    to = { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    stagger = 0.1,
    trigger,
    start = 'top 80%',
  } = options;

  return gsap.fromTo(elements, from, {
    ...to,
    stagger,
    scrollTrigger: trigger
      ? {
          trigger,
          start,
          toggleActions: 'play none none reverse',
        }
      : undefined,
  });
}

/**
 * Create a text scramble effect
 */
export function createTextScramble(
  element: HTMLElement,
  finalText: string,
  options: {
    duration?: number;
    chars?: string;
  } = {}
) {
  const { duration = 2, chars = '!<>-_\\/[]{}—=+*^?#________' } = options;

  let frame = 0;
  const totalFrames = Math.floor(duration * 60);
  const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];

  const originalText = element.textContent || '';
  const length = Math.max(originalText.length, finalText.length);

  for (let i = 0; i < length; i++) {
    const from = originalText[i] || '';
    const to = finalText[i] || '';
    const start = Math.floor(Math.random() * 40);
    const end = start + Math.floor(Math.random() * 40);
    queue.push({ from, to, start, end });
  }

  const update = () => {
    let output = '';
    let complete = 0;

    for (let i = 0; i < queue.length; i++) {
      const { from, to, start, end } = queue[i];
      let char = queue[i].char;

      if (frame >= end) {
        complete++;
        output += to;
      } else if (frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = chars[Math.floor(Math.random() * chars.length)];
          queue[i].char = char;
        }
        output += char;
      } else {
        output += from;
      }
    }

    element.textContent = output;

    if (complete === queue.length) {
      return;
    }

    frame++;
    requestAnimationFrame(update);
  };

  update();
}

/**
 * Kill all ScrollTriggers (cleanup utility)
 */
export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

/**
 * Refresh all ScrollTriggers (useful after layout changes)
 */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
