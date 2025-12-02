'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './FAQSection.css';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
}

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
      variants={itemVariants}
    >
      <button
        className="faq-item__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${item.id}`}
      >
        <span className="faq-item__question">{item.question}</span>
        <motion.span
          className="faq-item__icon"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-content-${item.id}`}
            className="faq-item__content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="faq-item__answer">
              <p>{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about our services',
}: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  });

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section ref={sectionRef} className="faq-section">
      <div className="faq-section__container">
        {/* Header */}
        <motion.div
          className="faq-section__header"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="faq-section__title">{title}</h2>
          <p className="faq-section__subtitle">{subtitle}</p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="faq-accordion"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          role="region"
          aria-label="Frequently Asked Questions"
        >
          {faqs.map((faq, index) => (
            <FAQAccordionItem
              key={faq.id}
              item={faq}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
              index={index}
            />
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="faq-section__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p>Still have questions?</p>
          <a href="/contact" className="faq-section__cta-link">
            Contact us
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
        </motion.div>
      </div>
    </section>
  );
}
