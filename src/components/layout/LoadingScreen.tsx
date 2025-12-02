'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onComplete?: () => void;
  minimumDuration?: number;
}

export default function LoadingScreen({
  onComplete,
  minimumDuration = 2500
}: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Complete loading after minimum duration
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Give time for exit animation before calling onComplete
      setTimeout(() => {
        setIsLoading(false);
        onComplete?.();
      }, 600);
    }, minimumDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [minimumDuration, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background that splits */}
          <motion.div
            className="loading-curtain loading-curtain-top"
            initial={{ y: 0 }}
            animate={isExiting ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="loading-curtain loading-curtain-bottom"
            initial={{ y: 0 }}
            animate={isExiting ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Logo container - positioned to match hero logo */}
          <motion.div
            className="loading-logo-container"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={
              isExiting
                ? { opacity: 0, scale: 0.8, y: 0 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Logo with glow effect */}
            <motion.div
              className="loading-logo-wrapper"
              initial={{ filter: "brightness(0)" }}
              animate={{ filter: "brightness(1)" }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.img
                src="/images/logos/logo_light.png"
                alt="The Elites Solutions"
                className="loading-logo"
                animate={
                  isExiting
                    ? { filter: "drop-shadow(0 0 0px rgba(212, 175, 55, 0))" }
                    : {
                        filter: [
                          "drop-shadow(0 0 30px rgba(212, 175, 55, 0.4))",
                          "drop-shadow(0 0 60px rgba(212, 175, 55, 0.6))",
                          "drop-shadow(0 0 30px rgba(212, 175, 55, 0.4))",
                        ],
                      }
                }
                transition={
                  isExiting
                    ? { duration: 0.3 }
                    : {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              />
            </motion.div>

            {/* Animated gold line under logo */}
            <motion.div
              className="loading-line"
              initial={{ scaleX: 0, opacity: 1 }}
              animate={
                isExiting
                  ? { scaleX: 0, opacity: 0 }
                  : { scaleX: 1, opacity: 1 }
              }
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            />

            {/* Loading text with dots */}
            <motion.div
              className="loading-text-container"
              initial={{ opacity: 0, y: 10 }}
              animate={
                isExiting
                  ? { opacity: 0, y: -10 }
                  : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.4, delay: isExiting ? 0 : 0.5 }}
            >
              <span className="loading-text">Loading</span>
              <LoadingDots isExiting={isExiting} />
            </motion.div>
          </motion.div>

          {/* Corner decorations */}
          <motion.div
            className="loading-corner loading-corner-tl"
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isExiting
                ? { opacity: 0, x: -20, y: -20 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.5, delay: isExiting ? 0 : 0.6 }}
          />
          <motion.div
            className="loading-corner loading-corner-br"
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isExiting
                ? { opacity: 0, x: 20, y: 20 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.5, delay: isExiting ? 0 : 0.7 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Animated dots component
function LoadingDots({ isExiting }: { isExiting: boolean }) {
  if (isExiting) return null;

  return (
    <span className="loading-dots">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="loading-dot"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        >
          •
        </motion.span>
      ))}
    </span>
  );
}
