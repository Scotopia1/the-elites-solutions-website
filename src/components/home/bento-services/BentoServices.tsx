'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BentoGridProvider } from './BentoGridContext';
import BentoGrid from './BentoGrid';
import BentoCardModal from './BentoCardModal';
import { BentoServiceData } from './types';
import './BentoServices.css';

// Enhanced services data with full content
const servicesData: BentoServiceData[] = [
  {
    id: 'service-1',
    phase: '01',
    category: 'Web',
    title: 'Modern',
    subtitle: 'Development',
    description:
      'We build high-performance web applications using cutting-edge technologies. From responsive websites to complex web apps, we deliver solutions that scale with your business.',
    features: [
      'Next.js & React development',
      'TypeScript for type safety',
      'Performance optimization',
      'SEO-friendly architecture',
    ],
    cta: {
      label: 'Learn More',
      href: '/services/web-development',
    },
    accentColor: '#ffd700',
    gridPosition: {
      mobile: { colStart: 1, colEnd: 2, rowStart: 1, rowEnd: 2 },
      tablet: { colStart: 1, colEnd: 2, rowStart: 1, rowEnd: 2 },
      desktop: { colStart: 1, colEnd: 3, rowStart: 1, rowEnd: 3 }, // Featured 2x2
    },
  },
  {
    id: 'service-2',
    phase: '02',
    category: 'Mobile',
    title: 'Native',
    subtitle: 'Apps',
    description:
      'Cross-platform mobile applications that deliver native performance. iOS and Android apps built with modern frameworks for seamless user experiences.',
    features: [
      'React Native & Flutter',
      'Native performance',
      'Offline-first architecture',
      'App Store optimization',
    ],
    cta: {
      label: 'Learn More',
      href: '/services/mobile-apps',
    },
    accentColor: '#c9c9c9',
    gridPosition: {
      mobile: { colStart: 1, colEnd: 2, rowStart: 2, rowEnd: 3 },
      tablet: { colStart: 2, colEnd: 3, rowStart: 1, rowEnd: 2 },
      desktop: { colStart: 3, colEnd: 4, rowStart: 1, rowEnd: 2 },
    },
  },
  {
    id: 'service-3',
    phase: '03',
    category: 'Process',
    title: 'Workflow',
    subtitle: 'Automation',
    description:
      'Streamline your business operations with custom automation solutions. Reduce manual tasks, eliminate errors, and boost productivity across your organization.',
    features: [
      'Custom workflow design',
      'API integrations',
      'Data pipeline automation',
      'Real-time monitoring',
    ],
    cta: {
      label: 'Learn More',
      href: '/services/automation',
    },
    accentColor: '#ffd700',
    gridPosition: {
      mobile: { colStart: 1, colEnd: 2, rowStart: 3, rowEnd: 4 },
      tablet: { colStart: 2, colEnd: 3, rowStart: 2, rowEnd: 3 },
      desktop: { colStart: 3, colEnd: 4, rowStart: 2, rowEnd: 3 },
    },
  },
  {
    id: 'service-4',
    phase: '04',
    category: 'Custom',
    title: 'Enterprise',
    subtitle: 'Solutions',
    description:
      'Tailored software solutions for complex business challenges. From CRM systems to inventory management, we build what you need to succeed.',
    features: [
      'Custom software development',
      'System integrations',
      'Legacy modernization',
      'Scalable architecture',
    ],
    cta: {
      label: 'Learn More',
      href: '/services/enterprise',
    },
    accentColor: '#9a9a9a',
    gridPosition: {
      mobile: { colStart: 1, colEnd: 2, rowStart: 4, rowEnd: 5 },
      tablet: { colStart: 1, colEnd: 3, rowStart: 3, rowEnd: 4 },
      desktop: { colStart: 1, colEnd: 4, rowStart: 3, rowEnd: 4 }, // Wide full width
    },
  },
];

export default function BentoServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  });

  return (
    <BentoGridProvider cards={servicesData}>
      <section ref={sectionRef} className="bento-services-section">
        {/* Section header */}
        <motion.div
          className="bento-services-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="bento-services-title">Services</h2>
          <p className="bento-services-subtitle">
            Comprehensive solutions tailored to your needs
          </p>
        </motion.div>

        {/* Bento grid */}
        <BentoGrid />

        {/* Mobile modal */}
        <BentoCardModal />
      </section>
    </BentoGridProvider>
  );
}
