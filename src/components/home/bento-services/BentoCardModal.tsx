'use client';

import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBentoGrid } from './BentoGridContext';

export default function BentoCardModal() {
  const { expandedCardId, expansionMode, cards, closeExpanded } = useBentoGrid();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const expandedCard = cards.find((c) => c.id === expandedCardId);
  const shouldRender = expandedCardId && expansionMode === 'modal';

  // Store previously focused element when modal opens
  useEffect(() => {
    if (shouldRender) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }
  }, [shouldRender]);

  // Return focus to trigger element when modal closes
  useEffect(() => {
    if (!shouldRender && previousActiveElement.current) {
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, [shouldRender]);

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeExpanded();
      }
    },
    [closeExpanded]
  );

  useEffect(() => {
    if (shouldRender) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [shouldRender, handleKeyDown]);

  // Focus trap - keep focus within modal
  useEffect(() => {
    if (!shouldRender || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus close button on open
    firstElement?.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleTabKey);
    return () => window.removeEventListener('keydown', handleTabKey);
  }, [shouldRender]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeExpanded();
    }
  };

  // Don't render on server
  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {shouldRender && expandedCard && (
        <motion.div
          className="bento-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            ref={modalRef}
            className="bento-modal"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
            layoutId={`card-${expandedCard.id}`}
          >
            {/* Close button */}
            <button
              className="bento-modal__close"
              onClick={closeExpanded}
              aria-label="Close modal"
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
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Drag handle for mobile */}
            <div className="bento-modal__handle" aria-hidden="true">
              <div className="bento-modal__handle-bar" />
            </div>

            {/* Modal content */}
            <div className="bento-modal__content">
              {/* Phase number */}
              <span className="bento-modal__phase">{expandedCard.phase}</span>

              {/* Category */}
              <p className="bento-modal__category">{expandedCard.category}</p>

              {/* Title */}
              <h2 id="modal-title" className="bento-modal__title">
                {expandedCard.title}
                <span className="bento-modal__subtitle">
                  {expandedCard.subtitle}
                </span>
              </h2>

              {/* Description */}
              <p className="bento-modal__description">{expandedCard.description}</p>

              {/* Features list */}
              {expandedCard.features && expandedCard.features.length > 0 && (
                <ul className="bento-modal__features" role="list">
                  {expandedCard.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              )}

              {/* CTA button */}
              {expandedCard.cta && (
                <a
                  href={expandedCard.cta.href}
                  className="bento-modal__cta"
                  onClick={() => closeExpanded()}
                >
                  {expandedCard.cta.label}
                  <svg
                    width="20"
                    height="20"
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
