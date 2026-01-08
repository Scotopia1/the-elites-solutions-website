'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import './PageTransition.css';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // When pathname changes, trigger transition
    setIsTransitioning(true);

    // After exit animation, update children
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 600); // Match exit animation duration

    return () => clearTimeout(timer);
  }, [pathname, children]);

  // Page content animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      filter: 'blur(10px)',
    },
    enter: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: 'blur(5px)',
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Overlay animation variants
  const overlayVariants = {
    initial: {
      scaleY: 0,
    },
    enter: {
      scaleY: [0, 1, 1, 0],
      transition: {
        duration: 1.2,
        times: [0, 0.4, 0.6, 1],
        ease: [0.76, 0, 0.24, 1],
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
      scaleX: [0, 1, 1, 0],
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 1.2,
        times: [0, 0.35, 0.65, 1],
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <div className="page-transition-wrapper">
      {/* Transition Overlay */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key="transition-overlay"
            className="transition-overlay"
            initial="initial"
            animate="enter"
            exit="initial"
            variants={overlayVariants}
          >
            {/* Gold accent line */}
            <motion.div
              className="transition-gold-line"
              variants={lineVariants}
              initial="initial"
              animate="enter"
            />

            {/* Geometric elements */}
            <div className="transition-geometrics">
              <motion.div
                className="transition-diamond"
                initial={{ scale: 0, rotate: 45, opacity: 0 }}
                animate={{
                  scale: [0, 1, 1, 0],
                  rotate: [45, 45, 45, 45],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 1.2,
                  times: [0, 0.3, 0.7, 1],
                  ease: [0.76, 0, 0.24, 1]
                }}
              />
            </div>

            {/* Grid pattern */}
            <div className="transition-grid" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <motion.div
        key={pathname}
        className="page-content"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
      >
        {displayChildren}
      </motion.div>
    </div>
  );
};

export default PageTransition;
