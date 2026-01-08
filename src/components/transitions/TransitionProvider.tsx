'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import './PageTransition.css';

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: (callback: () => void) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  startTransition: () => {},
});

export const useTransition = () => useContext(TransitionContext);

interface TransitionProviderProps {
  children: ReactNode;
}

export function TransitionProvider({ children }: TransitionProviderProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const pathname = usePathname();

  // Start transition with callback for navigation
  const startTransition = useCallback((callback: () => void) => {
    setIsTransitioning(true);
    setShouldAnimate(true);

    // Wait for exit animation, then navigate
    setTimeout(() => {
      callback();
    }, 500); // Time before navigation starts
  }, []);

  // Reset transition state when pathname changes
  useEffect(() => {
    if (isTransitioning) {
      // Keep overlay visible during enter animation
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setShouldAnimate(false);
      }, 700); // Total transition duration after navigation

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Scroll to top on route change
  useEffect(() => {
    // Scroll to top immediately when pathname changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });
  }, [pathname]);

  // Overlay animation variants - slides up then down
  const overlayVariants = {
    initial: {
      y: '100%',
    },
    enter: {
      y: '0%',
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      y: '-100%',
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.1,
      },
    },
  };

  // Second layer for depth
  const overlay2Variants = {
    initial: {
      y: '100%',
    },
    enter: {
      y: '0%',
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.05,
      },
    },
    exit: {
      y: '-100%',
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.15,
      },
    },
  };

  // Gold line animation
  const lineVariants = {
    initial: {
      scaleX: 0,
      opacity: 0,
    },
    enter: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2,
      },
    },
    exit: {
      scaleX: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  // Diamond animation
  const diamondVariants = {
    initial: {
      scale: 0,
      rotate: 45,
      opacity: 0,
    },
    enter: {
      scale: 1,
      rotate: 45,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.25,
      },
    },
    exit: {
      scale: 0,
      rotate: 45,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {/* Transition Overlay */}
      <AnimatePresence mode="wait">
        {shouldAnimate && (
          <>
            {/* Second layer (behind) */}
            <motion.div
              key="overlay-2"
              className="transition-overlay"
              style={{ background: '#0a0a0a', zIndex: 9998 }}
              initial="initial"
              animate="enter"
              exit="exit"
              variants={overlay2Variants}
            />

            {/* Main overlay */}
            <motion.div
              key="overlay-1"
              className="transition-overlay"
              initial="initial"
              animate="enter"
              exit="exit"
              variants={overlayVariants}
            >
              {/* Gold accent line */}
              <motion.div
                className="transition-gold-line"
                variants={lineVariants}
                initial="initial"
                animate="enter"
                exit="exit"
              />

              {/* Diamond */}
              <motion.div
                className="transition-diamond"
                variants={diamondVariants}
                initial="initial"
                animate="enter"
                exit="exit"
              />

              {/* Grid pattern */}
              <div className="transition-grid" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Page Content */}
      {children}
    </TransitionContext.Provider>
  );
}

export default TransitionProvider;
