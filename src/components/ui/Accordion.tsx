"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
}

export default function Accordion({
  items,
  className = "",
  allowMultiple = false,
}: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={className}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);

        return (
          <div
            key={index}
            className="border-b border-gold-400/20 last:border-b-0"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full py-6 px-4 flex items-center justify-between text-left hover:bg-gold-400/5 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="text-lg md:text-xl font-semibold text-white pr-4">
                {item.question}
              </span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gold-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-6 text-neutral-300 leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
