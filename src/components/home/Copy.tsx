"use client";
import "./Copy.css";
import React, { useRef } from "react";
import SplitType from "split-type";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Copy({
  children,
  animateOnScroll = true,
  delay = 0
}: {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRefs = useRef<SplitType[]>([]);

  const waitForFonts = async () => {
    try {
      await document.fonts.ready;

      const customFonts = ["nm", "DM Mono", "Inter", "Montserrat"];
      const fontCheckPromises = customFonts.map((fontFamily) => {
        return document.fonts.check(`16px ${fontFamily}`);
      });

      await Promise.all(fontCheckPromises);
      await new Promise((resolve) => setTimeout(resolve, 100));

      return true;
    } catch (error) {
      console.warn("Font loading check failed, proceeding anyway:", error);
      await new Promise((resolve) => setTimeout(resolve, 200));
      return true;
    }
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const initializeSplitText = async () => {
        await waitForFonts();

        splitRefs.current = [];
        const lines: HTMLElement[] = [];

        const elements: HTMLElement[] = [];
        if (containerRef.current?.hasAttribute("data-copy-wrapper")) {
          elements.push(...Array.from(containerRef.current.children as HTMLCollectionOf<HTMLElement>));
        } else if (containerRef.current) {
          elements.push(containerRef.current);
        }

        elements.forEach((element) => {
          const split = new SplitType(element, {
            types: 'lines',
            lineClass: 'line',
          });

          splitRefs.current.push(split);
          lines.push(...(split.lines as HTMLElement[]));
        });

        gsap.set(lines, { y: "100%" });

        const animationProps = {
          y: "0%",
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay: delay,
        };

        if (animateOnScroll) {
          gsap.to(lines, {
            ...animationProps,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              once: true,
            },
          });
        } else {
          gsap.to(lines, animationProps);
        }
      };

      initializeSplitText();

      return () => {
        splitRefs.current.forEach((split) => {
          if (split) {
            split.revert();
          }
        });
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay] }
  );

  if (React.Children.count(children) === 1) {
    const child = React.Children.only(children);
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ref: containerRef } as any);
    }
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}
