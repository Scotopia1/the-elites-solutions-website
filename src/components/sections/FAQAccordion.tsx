"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./FAQAccordion.module.css";
import type { FAQItem, FAQAccordionProps } from "./FAQAccordion.types";

export type { FAQItem, FAQAccordionProps };

export default function FAQAccordion({
  title = "Frequently Asked Questions",
  faqs,
  className = "",
}: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // First item open by default
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arrowRefs = useRef<(SVGSVGElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Initial reveal animation
      gsap.from(`.${styles.title}`, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(`.${styles.item}`, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
      });

      // Initialize first item as open
      if (answerRefs.current[0]) {
        gsap.set(answerRefs.current[0], {
          height: "auto",
          opacity: 1,
        });
        gsap.set(arrowRefs.current[0], {
          rotation: 180,
        });
      }
    },
    { scope: containerRef }
  );

  const handleToggle = (index: number) => {
    const isCurrentlyActive = activeIndex === index;
    const newActiveIndex = isCurrentlyActive ? null : index;

    // Close previously active item
    if (activeIndex !== null && activeIndex !== index) {
      const prevAnswer = answerRefs.current[activeIndex];
      const prevArrow = arrowRefs.current[activeIndex];

      gsap.to(prevAnswer, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });

      gsap.to(prevArrow, {
        rotation: 0,
        duration: 0.3,
        ease: "back.inOut(2)",
      });
    }

    // Toggle current item
    const currentAnswer = answerRefs.current[index];
    const currentArrow = arrowRefs.current[index];

    if (isCurrentlyActive) {
      // Close current item
      gsap.to(currentAnswer, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });

      gsap.to(currentArrow, {
        rotation: 0,
        duration: 0.3,
        ease: "back.inOut(2)",
      });
    } else {
      // Open current item
      gsap.set(currentAnswer, { height: "auto" });
      const autoHeight = currentAnswer?.scrollHeight || 0;
      gsap.from(currentAnswer, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(currentAnswer, {
        height: autoHeight,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(currentArrow, {
        rotation: 180,
        duration: 0.3,
        ease: "back.out(2)",
      });
    }

    setActiveIndex(newActiveIndex);
  };

  return (
    <section
      className={`${styles.faqSection} ${className}`}
      ref={containerRef}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.item} ${
                activeIndex === index ? styles.active : ""
              }`}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
            >
              <button
                className={styles.question}
                onClick={() => handleToggle(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <svg
                  className={styles.arrow}
                  ref={(el) => {
                    arrowRefs.current[index] = el;
                  }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className={styles.answerWrapper}
                ref={(el) => {
                  answerRefs.current[index] = el;
                }}
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <div className={styles.answer}>{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
