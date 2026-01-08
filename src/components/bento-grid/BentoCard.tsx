'use client';

import { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBentoGrid } from './BentoGridContext';
import { useMagneticHover } from './useMagneticHover';
import { BentoCardProps, CardState } from './types';
import { getAnimationConfig } from '@/lib/gsap-config';

const BentoCard = forwardRef<HTMLDivElement, BentoCardProps>(
  ({ card, index, onLearnMore, ctaMode = 'navigate' }, forwardedRef) => {
    const {
      expandedCardId,
      hoveredCardId,
      expansionMode,
      focusedCardIndex,
      expandCard,
      setHoveredCard,
      openDetailModal,
    } = useBentoGrid();

    // Get device-aware animation config
    const config = getAnimationConfig();

    // Magnetic hover effect with pronounced settings
    // Disabled on touch devices for better performance
    const {
      ref: magneticRef,
      x,
      y,
      rotateX,
      rotateY,
      scale,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
    } = useMagneticHover({
      strength: config.enable3DTransforms ? 0.4 : 0,
      rotationRange: config.enable3DTransforms ? 15 : 0,
      damping: 15,
      stiffness: 150,
      disabled: !config.enable3DTransforms,
    });

    const isExpanded = expandedCardId === card.id;
    const isHovered = hoveredCardId === card.id;
    const isFocused = focusedCardIndex === index;
    const isAnyExpanded = expandedCardId !== null;

    // Determine card state
    const cardState: CardState = isExpanded
      ? 'expanded'
      : isHovered
        ? 'hovered'
        : 'collapsed';

    // Only show inline expansion on desktop
    const showInlineExpansion = isExpanded && expansionMode === 'inline';

    // Stagger animation delay based on index
    const staggerDelay = index * 0.12;

    // Determine card variant class based on grid position
    const isFeatured =
      card.gridPosition.desktop.colEnd - card.gridPosition.desktop.colStart > 1 &&
      card.gridPosition.desktop.rowEnd - card.gridPosition.desktop.rowStart > 1;
    const isWide =
      card.gridPosition.desktop.colEnd - card.gridPosition.desktop.colStart > 2;

    const handleClick = () => {
      if (isExpanded) {
        expandCard(null);
      } else {
        expandCard(card.id);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    };

    const handleMouseEnter = () => {
      onMouseEnter();
      setHoveredCard(card.id);
    };

    const handleMouseLeave = () => {
      onMouseLeave();
      setHoveredCard(null);
    };

    // Handle CTA click based on mode
    const handleCTAClick = (e: React.MouseEvent) => {
      e.stopPropagation();

      if (ctaMode === 'modal') {
        e.preventDefault();
        if (onLearnMore) {
          onLearnMore(card.id);
        } else {
          openDetailModal(card.id);
        }
      }
      // For 'navigate' mode, let the link work normally
    };

    // Card variants for stagger animation
    const cardVariants = {
      hidden: {
        opacity: 0,
        y: 60,
        scale: 0.9,
      },
      visible: {
        opacity: isAnyExpanded && !isExpanded ? 0.5 : 1,
        y: 0,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 15,
          delay: staggerDelay,
        },
      },
    };

    return (
      <motion.article
        ref={(node) => {
          // Handle both refs
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
          (magneticRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={`bento-card ${cardState} ${isFeatured ? 'bento-card--featured' : ''} ${isWide ? 'bento-card--wide' : ''} ${showInlineExpansion ? 'bento-card--inline-expanded' : ''}`}
        data-index={index}
        tabIndex={0}
        role="gridcell"
        aria-expanded={isExpanded}
        aria-label={`${card.title} ${card.subtitle}: ${card.category}. ${isExpanded ? 'Press Escape to collapse' : 'Press Enter to expand'}`}
        style={{
          x,
          y,
          rotateX,
          rotateY,
          scale,
          ...(config.enable3DTransforms && {
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }),
          // Grid positioning via CSS custom properties
          '--col-start-mobile': card.gridPosition.mobile.colStart,
          '--col-end-mobile': card.gridPosition.mobile.colEnd,
          '--row-start-mobile': card.gridPosition.mobile.rowStart,
          '--row-end-mobile': card.gridPosition.mobile.rowEnd,
          '--col-start-tablet': card.gridPosition.tablet.colStart,
          '--col-end-tablet': card.gridPosition.tablet.colEnd,
          '--row-start-tablet': card.gridPosition.tablet.rowStart,
          '--row-end-tablet': card.gridPosition.tablet.rowEnd,
          '--col-start-desktop': card.gridPosition.desktop.colStart,
          '--col-end-desktop': card.gridPosition.desktop.colEnd,
          '--row-start-desktop': card.gridPosition.desktop.rowStart,
          '--row-end-desktop': card.gridPosition.desktop.rowEnd,
        } as React.CSSProperties}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseMove={onMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={() => setHoveredCard(card.id)}
        onBlur={() => setHoveredCard(null)}
        layout={expansionMode === 'inline'}
        layoutId={`card-${card.id}`}
      >
        {/* Gold textured border */}
        <div className="bento-card__border" />

        {/* Hover glow effect */}
        <div
          className="bento-card__glow"
          style={{ '--accent-color': card.accentColor } as React.CSSProperties}
        />

        {/* Card content */}
        <div className="bento-card__content">
          {/* Phase number */}
          <span className="bento-card__phase">{card.phase}</span>

          {/* Category */}
          <p className="bento-card__category">{card.category}</p>

          {/* Title */}
          <h3 className="bento-card__title">
            {card.title}
            <span className="bento-card__subtitle">{card.subtitle}</span>
          </h3>

          {/* Inline Expanded Content (Desktop only) */}
          <AnimatePresence>
            {showInlineExpansion && (
              <motion.div
                className="bento-card__expanded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="bento-card__description">{card.description}</p>

                {card.features && card.features.length > 0 && (
                  <ul className="bento-card__features">
                    {card.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                )}

                {card.cta && (
                  <a
                    href={ctaMode === 'navigate' ? card.cta.href : '#'}
                    className="bento-card__cta"
                    onClick={handleCTAClick}
                  >
                    {card.cta.label}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Expand/Collapse indicator */}
        <motion.div
          className="bento-card__expand-icon"
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.div>

        {/* Focus ring for accessibility */}
        {isFocused && <div className="bento-card__focus-ring" />}
      </motion.article>
    );
  }
);

BentoCard.displayName = 'BentoCard';
export default BentoCard;
