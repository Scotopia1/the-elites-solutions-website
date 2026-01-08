'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface MenuGeometricsProps {
  isOpen: boolean;
}

const MenuGeometrics = forwardRef<HTMLDivElement, MenuGeometricsProps>(
  ({ isOpen }, ref) => {
    return (
      <div ref={ref} className="menu-geometrics">
        {/* Only keep visible decorative hexagons - others removed for performance */}
        <motion.div
          className="geometric-shape hex-shape-1"
          initial={{ opacity: 0, rotate: -30 }}
          animate={isOpen ? { opacity: 0.1, rotate: 0 } : { opacity: 0, rotate: -30 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <polygon
              points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </motion.div>

        <motion.div
          className="geometric-shape hex-shape-2"
          initial={{ opacity: 0, rotate: 30 }}
          animate={isOpen ? { opacity: 0.08, rotate: 0 } : { opacity: 0, rotate: 30 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
            <polygon
              points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>
        </motion.div>
      </div>
    );
  }
);

MenuGeometrics.displayName = 'MenuGeometrics';

export default MenuGeometrics;
