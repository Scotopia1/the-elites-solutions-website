'use client';

import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBentoGrid } from '@/components/bento-grid';
import './ServiceDetailModal.css';

export default function ServiceDetailModal() {
  const { detailModalId, cards, closeDetailModal } = useBentoGrid();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const selectedService = cards.find((c) => c.id === detailModalId);
  const shouldRender = detailModalId !== null;

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
        closeDetailModal();
      }
    },
    [closeDetailModal]
  );

  useEffect(() => {
    if (shouldRender) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [shouldRender, handleKeyDown]);

  // Focus trap
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
      closeDetailModal();
    }
  };

  // Don't render on server
  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {shouldRender && selectedService && (
        <motion.div
          className="service-detail-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-detail-title"
        >
          <motion.div
            ref={modalRef}
            className="service-detail-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
          >
            {/* Close button */}
            <button
              className="service-detail__close"
              onClick={closeDetailModal}
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

            {/* Modal content - 2 column layout */}
            <div className="service-detail__content">
              {/* Left column - Header & Icon */}
              <div className="service-detail__left">
                {/* Service icon/visual */}
                <div
                  className="service-detail__icon"
                  style={{ '--accent-color': selectedService.accentColor } as React.CSSProperties}
                >
                  <span className="service-detail__phase">{selectedService.phase}</span>
                </div>

                {/* Title */}
                <h2 id="service-detail-title" className="service-detail__title">
                  {selectedService.title}
                  <span className="service-detail__subtitle">
                    {selectedService.subtitle}
                  </span>
                </h2>

                {/* Category badge */}
                <span className="service-detail__category">{selectedService.category}</span>
              </div>

              {/* Right column - Details */}
              <div className="service-detail__right">
                {/* Description */}
                <p className="service-detail__description">{selectedService.description}</p>

                {/* Features list */}
                {selectedService.features && selectedService.features.length > 0 && (
                  <div className="service-detail__features">
                    <h3 className="service-detail__features-title">What's Included</h3>
                    <ul className="service-detail__features-list" role="list">
                      {selectedService.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                        >
                          <span className="service-detail__feature-icon">✓</span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Extended detail content if available */}
                {selectedService.detailContent && (
                  <div className="service-detail__extended">
                    {/* Overview */}
                    {selectedService.detailContent.overview && (
                      <div className="service-detail__overview">
                        <h3>Overview</h3>
                        <p>{selectedService.detailContent.overview}</p>
                      </div>
                    )}

                    {/* Technologies */}
                    {selectedService.detailContent.technologies &&
                      selectedService.detailContent.technologies.length > 0 && (
                        <div className="service-detail__technologies">
                          <h3>Technologies</h3>
                          <div className="service-detail__tech-grid">
                            {selectedService.detailContent.technologies.map((tech, i) => (
                              <span key={i} className="service-detail__tech-badge">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                )}

                {/* CTA button */}
                <div className="service-detail__cta-wrapper">
                  <a
                    href="/contact"
                    className="service-detail__cta"
                    onClick={() => closeDetailModal()}
                  >
                    Get Started
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
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
