"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getScrollTriggerScrub } from "@/lib/gsap-config";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedWordRevealProps {
  children: React.ReactNode;
  className?: string;
  animationStart?: number;
  animationEnd?: number;
}

const AnimatedWordReveal = ({
  children,
  className = "",
  animationStart = 0.2,
  animationEnd = 0.8
}: AnimatedWordRevealProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitType | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Split text into words
    splitRef.current = new SplitType(textRef.current, {
      types: "words",
      wordClass: "animated-word",
    });

    const words = splitRef.current.words;
    if (!words) return;

    // Set initial state - all words hidden
    gsap.set(words, { opacity: 0 });

    // Create ScrollTrigger for the parent section
    const trigger = ScrollTrigger.create({
      trigger: textRef.current.closest("section"),
      start: "top 60%",
      end: "bottom 40%",
      scrub: getScrollTriggerScrub(2),
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress >= animationStart && progress <= animationEnd) {
          // Calculate progress within animation range
          const textProgress = (progress - animationStart) / (animationEnd - animationStart);
          const totalWords = words.length;

          // Sequentially reveal words
          words.forEach((word, index) => {
            const wordRevealProgress = index / totalWords;

            if (textProgress >= wordRevealProgress) {
              gsap.set(word, { opacity: 1 });
            } else {
              gsap.set(word, { opacity: 0 });
            }
          });
        } else if (progress < animationStart) {
          // Before animation range - all hidden
          gsap.set(words, { opacity: 0 });
        } else if (progress > animationEnd) {
          // After animation range - all visible
          gsap.set(words, { opacity: 1 });
        }
      },
    });

    return () => {
      trigger.kill();
      splitRef.current?.revert();
    };
  }, [animationStart, animationEnd]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

export default AnimatedWordReveal;
