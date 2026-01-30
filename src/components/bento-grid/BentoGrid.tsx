'use client';

import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import BentoCard from './BentoCard';
import { useBentoGrid } from './BentoGridContext';
import { BentoGridProps } from './types';

export default function BentoGrid({ onLearnMore, ctaMode = 'navigate' }: BentoGridProps) {
  const { cards, focusedCardIndex, setFocusedIndex, expandCard, expandedCardId } =
    useBentoGrid();
  const gridRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const cardCount = cards.length;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          setFocusedIndex((focusedCardIndex + 1) % cardCount);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setFocusedIndex((focusedCardIndex - 1 + cardCount) % cardCount);
          break;
        case 'ArrowDown':
          e.preventDefault();
          // Move to next row (assuming 2 columns on tablet/desktop)
          setFocusedIndex(Math.min(focusedCardIndex + 2, cardCount - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          // Move to previous row
          setFocusedIndex(Math.max(focusedCardIndex - 2, 0));
          break;
        case 'Enter':
        case ' ':
          // Handled by individual card
          break;
        case 'Escape':
          e.preventDefault();
          if (expandedCardId) {
            expandCard(null);
          }
          break;
      }
    },
    [focusedCardIndex, cards.length, setFocusedIndex, expandCard, expandedCardId]
  );

  // Add keyboard event listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Only handle if focus is within the grid
      if (gridRef.current?.contains(document.activeElement)) {
        handleKeyDown(e);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleKeyDown]);

  // Focus management - focus the correct card when focusedCardIndex changes
  useEffect(() => {
    const focusedCard = gridRef.current?.querySelector(
      `[data-index="${focusedCardIndex}"]`
    ) as HTMLElement;
    if (focusedCard && document.activeElement !== focusedCard) {
      // Only focus if grid already has focus
      if (gridRef.current?.contains(document.activeElement)) {
        focusedCard.focus();
      }
    }
  }, [focusedCardIndex]);

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={gridRef}
      className="bento-grid"
      role="grid"
      aria-label="Our services"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {cards.map((card, index) => (
        <BentoCard
          key={card.id}
          card={card}
          index={index}
          onLearnMore={onLearnMore}
          ctaMode={ctaMode}
        />
      ))}
    </motion.div>
  );
}
