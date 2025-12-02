'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins at module level (before component)
gsap.registerPlugin(ScrollTrigger, useGSAP);

const descriptionText = "We're a digital agency that thrives on innovation, strategic thinking, and solutions that make you lean in and say 'yes.' Our work blends creative excellence with technical precision — whether it's a brand transformation, a cutting-edge website, or a bold concept that shouldn't work (but absolutely does). If it scales, converts, engages, or transforms — we're all in.";

export default function DescriptionSection() {
  const textContainerRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const words = descriptionText.split(/\s+/);

  // Word-by-word reveal with GSAP ScrollTrigger
  useGSAP(
    () => {
      if (!textContainerRef.current || wordsRef.current.length === 0) return;

      const wordHighlightBgColor = '212, 175, 55'; // Gold color for elites branding

      ScrollTrigger.create({
        trigger: textContainerRef.current,
        pin: true,
        start: 'top top',
        end: `+=${window.innerHeight * 3}`,
        pinSpacing: true,               // Create scroll space for 3-viewport animation
        scrub: true,                    // Use true instead of number for smooth sync
        anticipatePin: 1,               // Prevent visual jumps during fast scrolling
        refreshPriority: -1,            // Lower priority - calculate after other sections
        invalidateOnRefresh: true,      // Recalculate positions on refresh
        onUpdate: (self) => {
          const progress = self.progress;
          const totalWords = wordsRef.current.length;

          wordsRef.current.forEach((wordContainer, index) => {
            if (!wordContainer) return;
            
            const wordText = wordContainer.querySelector('span');
            if (!wordText) return;

            // Reveal animation - words stay visible once revealed
            const overlapWords = 15;
            const totalAnimationLength = 1 + overlapWords / totalWords;

            const wordStart = index / totalWords;
            const wordEnd = wordStart + overlapWords / totalWords;

            const timelineScale =
              1 /
              Math.min(
                totalAnimationLength,
                1 + (totalWords - 1) / totalWords + overlapWords / totalWords
              );

            const adjustedStart = wordStart * timelineScale;
            const adjustedEnd = wordEnd * timelineScale;
            const duration = adjustedEnd - adjustedStart;

            const wordProgress =
              progress <= adjustedStart
                ? 0
                : progress >= adjustedEnd
                ? 1
                : (progress - adjustedStart) / duration;

            // Word opacity (container)
            wordContainer.style.opacity = String(wordProgress);

            // Background fade
            const backgroundFadeStart = wordProgress >= 0.9 ? (wordProgress - 0.9) / 0.1 : 0;
            const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart);
            wordContainer.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${backgroundOpacity})`;

            // Text reveal (inner span)
            const textRevealThreshold = 0.9;
            const textRevealProgress =
              wordProgress >= textRevealThreshold
                ? (wordProgress - textRevealThreshold) / (1 - textRevealThreshold)
                : 0;
            wordText.style.opacity = String(Math.pow(textRevealProgress, 0.5));
          });
        },
      });
    },
    { scope: textContainerRef }
  );

  return (
    <section ref={textContainerRef} className="w-full h-screen bg-transparent flex justify-center items-center text-gold-100 font-sans overflow-hidden">
      <div className="w-[90%] md:w-[80%] lg:w-[60%] h-full flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium leading-snug md:leading-tight text-center text-transparent">
            {words.map((word, index) => (
              <span
                key={index}
                ref={(el) => { wordsRef.current[index] = el; }}
                className="inline-block mr-2 md:mr-3 rounded-md transition-colors duration-75 opacity-0"
              >
                <span className="opacity-0 transition-opacity duration-75 text-gold-100">
                  {word}
                </span>
              </span>
            ))}
          </h1>
        </div>
      </div>
    </section>
  );
}
