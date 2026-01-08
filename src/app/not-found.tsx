'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './not-found.css';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const floatAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="not-found-container">
      {/* Animated Background Elements */}
      <div className="not-found-bg">
        <motion.div
          className="bg-orb bg-orb-1"
          animate={pulseAnimation}
        />
        <motion.div
          className="bg-orb bg-orb-2"
          animate={{
            ...pulseAnimation,
            transition: { ...pulseAnimation.transition, delay: 0.5 }
          }}
        />
        <motion.div
          className="bg-orb bg-orb-3"
          animate={{
            ...pulseAnimation,
            transition: { ...pulseAnimation.transition, delay: 1 }
          }}
        />
      </div>

      {/* Main Content */}
      <div className="not-found-content">
        {/* Floating 404 Number */}
        <motion.div
          className="error-code"
          initial={{ opacity: 0, y: -50 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span animate={floatAnimation}>404</motion.span>
        </motion.div>

        {/* Message */}
        <motion.h1
          className="error-title"
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          className="error-description"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Looks like you've ventured into uncharted territory. The page you're looking for doesn't exist or has been moved.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="error-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/" className="btn-primary">
            <span className="btn-text">Back to Home</span>
            <span className="btn-icon">→</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="btn-secondary"
          >
            <span className="btn-text">Go Back</span>
          </button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          className="helpful-links"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="helpful-title">Or explore:</p>
          <div className="link-grid">
            <Link href="/about" className="helpful-link">
              <span className="link-number">01</span>
              <span className="link-label">About Us</span>
            </Link>
            <Link href="/services" className="helpful-link">
              <span className="link-number">02</span>
              <span className="link-label">Services</span>
            </Link>
            <Link href="/work" className="helpful-link">
              <span className="link-number">03</span>
              <span className="link-label">Our Work</span>
            </Link>
            <Link href="/contact" className="helpful-link">
              <span className="link-number">04</span>
              <span className="link-label">Contact</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Gold Line */}
      <motion.div
        className="decorative-line"
        initial={{ scaleX: 0 }}
        animate={mounted ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
    </div>
  );
}
