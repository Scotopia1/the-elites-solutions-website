"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  getScrollTriggerScrub,
  getAnimationConfig,
  shouldDisableAnimation,
} from "@/lib/gsap-config";
import Lightbox from "@/components/ui/Lightbox";

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  url: string;
  alt: string;
}

interface VisualGalleryProps {
  images: GalleryImage[];
}

export default function VisualGallery({ images }: VisualGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Refs for scroll animation
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // GSAP ScrollTrigger horizontal scroll animation
  useGSAP(
    () => {
      const config = getAnimationConfig();
      const wrapper = wrapperRef.current;
      const section = sectionRef.current;
      const progressBar = progressBarRef.current;

      if (!wrapper || !section || !progressBar) return;

      // Desktop: Pinned horizontal scroll
      if (config.enablePinning && !shouldDisableAnimation()) {
        const calculateMoveDistance = () => {
          const wrapperWidth = wrapper.scrollWidth;
          const viewportWidth = window.innerWidth;
          return -(wrapperWidth - viewportWidth);
        };

        let moveDistance = calculateMoveDistance();

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * (config.isMobile ? 2 : 3)}`,
          pin: true,
          pinSpacing: true,
          scrub: getScrollTriggerScrub(1),
          invalidateOnRefresh: true,
          refreshPriority: -3,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(wrapper, {
              x: progress * moveDistance,
              force3D: true,
              transformOrigin: "left center",
            });
            gsap.set(progressBar, { width: `${progress * 100}%` });
          },
          onRefresh: () => {
            moveDistance = calculateMoveDistance();
          },
        });
      } else {
        // Mobile: Reset transform, use native scroll
        gsap.set(wrapper, { clearProps: "x" });
      }
    },
    { scope: sectionRef }
  );

  // Pause ScrollTrigger when Lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      ScrollTrigger.getAll().forEach((st) => st.disable());
    } else {
      ScrollTrigger.getAll().forEach((st) => st.enable());
    }
  }, [lightboxOpen]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-neutral-950 overflow-hidden"
      aria-label="Visual showcase gallery, scroll to explore"
    >
      <div className="max-w-full mx-auto px-6 w-full">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Visual Showcase
        </motion.h2>

        {/* Horizontal Wrapper */}
        <div
          ref={wrapperRef}
          className="flex gap-6 md:gap-8 lg:gap-12 overflow-x-auto md:overflow-visible pb-4 md:pb-0"
          style={{ willChange: "transform" }}
        >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="relative flex-shrink-0 cursor-pointer group w-[300px] h-[400px] md:w-[400px] md:h-[500px] lg:w-[500px] lg:h-[600px]"
                onClick={() => openLightbox(index)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                aria-label={`Gallery image ${index + 1} of ${images.length}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
              >
                {/* Placeholder - replace with actual images */}
                <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl overflow-hidden border border-gold-400/20 group-hover:border-gold-400/40 transition-colors">
                  <div className="w-full h-full flex items-center justify-center text-6xl opacity-30">
                    📸
                  </div>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

        {/* Progress Bar - Desktop only */}
        <div className="hidden md:block mt-12 max-w-3xl mx-auto">
          <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
              style={{ width: "0%", transformOrigin: "left" }}
              role="progressbar"
              aria-label="Gallery scroll progress"
            />
          </div>
          <p className="text-center text-neutral-500 text-sm mt-4">
            Scroll to explore · Click to enlarge
          </p>
        </div>

        {/* Mobile instruction */}
        <p className="md:hidden text-center text-neutral-500 text-sm mt-6">
          ← Swipe to see more · Tap to enlarge →
        </p>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={images}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
}
