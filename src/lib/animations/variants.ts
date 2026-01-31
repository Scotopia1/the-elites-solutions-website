import type { Variants } from 'motion/react';

/**
 * Fade in from bottom with stagger support
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/**
 * Fade in with scale
 */
export const fadeInScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Stagger container for children
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Stagger container with faster timing
 */
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

/**
 * Slide in from left
 */
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Slide in from right
 */
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Card hover effect
 */
export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  },
  hover: {
    scale: 1.02,
    y: -5,
    boxShadow: '0 20px 40px rgba(255, 215, 0, 0.15)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Text reveal character by character
 */
export const textRevealChar: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/**
 * Blur fade in
 */
export const blurFadeIn: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

/**
 * Tab content transition
 */
export const tabContent: Variants = {
  enter: {
    opacity: 0,
    y: 20,
  },
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

/**
 * Metric counter animation config
 */
export const metricCounter = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
};

/**
 * Parallax layer speeds
 */
export const parallaxSpeeds = {
  background: -30,
  midground: -15,
  foreground: 0,
  floating: 10,
};

/**
 * Gold glow pulse animation
 */
export const goldGlowPulse: Variants = {
  rest: {
    boxShadow: '0 0 0 rgba(255, 215, 0, 0)',
  },
  pulse: {
    boxShadow: [
      '0 0 0 rgba(255, 215, 0, 0)',
      '0 0 30px rgba(255, 215, 0, 0.4)',
      '0 0 0 rgba(255, 215, 0, 0)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
