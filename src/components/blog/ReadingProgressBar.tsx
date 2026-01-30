"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getScrollTriggerScrub } from "@/lib/gsap-config";

gsap.registerPlugin(ScrollTrigger);

export default function ReadingProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bar = barRef.current;
    if (!bar) return;

    gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: getScrollTriggerScrub(0.3),
      },
    });
  }, { scope: barRef });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-neutral-900">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-gold-400 to-gold-600 origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
