'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BentoGridProvider, BentoGrid, BentoServiceData } from '@/components/bento-grid';
import ServiceDetailModal from './ServiceDetailModal';
import '@/components/bento-grid/bento-grid.css';
import './ServicesBentoGrid.css';

interface ServicesBentoGridProps {
  services: BentoServiceData[];
}

export default function ServicesBentoGrid({ services }: ServicesBentoGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  });

  // Handle "Learn More" click - opens detail modal
  const handleLearnMore = (cardId: string) => {
    // This is handled by the BentoGridContext's openDetailModal
    // The callback is passed to BentoGrid which passes it to BentoCard
    console.log('Learn more clicked for:', cardId);
  };

  return (
    <BentoGridProvider cards={services}>
      <section ref={sectionRef} className="services-bento-section">
        {/* Section header */}
        <motion.div
          className="services-bento-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="services-bento-title">What We Offer</h2>
          <p className="services-bento-subtitle">
            Comprehensive solutions tailored to your business needs
          </p>
        </motion.div>

        {/* Bento grid with modal mode */}
        <BentoGrid onLearnMore={handleLearnMore} ctaMode="modal" />

        {/* Full-screen detail modal */}
        <ServiceDetailModal />
      </section>
    </BentoGridProvider>
  );
}
