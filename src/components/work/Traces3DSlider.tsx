"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import {
  detectDeviceCapabilities,
  shouldDisableAnimation,
} from "@/lib/gsap-config";
import "./Traces3DSlider.css";

// ============================================
// Types
// ============================================

export interface Project {
  id: string;
  name: string;
  category: string;
  image: string;
  description?: string;
  link?: string;
}

interface Traces3DSliderProps {
  projects: Project[];
  onClose?: () => void;
  className?: string;
}

// ============================================
// Constants
// ============================================

const ROTATION_THRESHOLD = 50; // pixels to swipe before triggering rotation
const AUTO_ROTATE_DELAY = 6000; // ms before auto-rotating to next

// ============================================
// Component
// ============================================

export default function Traces3DSlider({
  projects,
  onClose,
  className = "",
}: Traces3DSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalProjects = projects.length;
  const angleStep = 360 / totalProjects;

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      const capabilities = detectDeviceCapabilities();
      setIsMobileView(capabilities.isMobile || capabilities.isTablet);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ============================================
  // Navigation Functions
  // ============================================

  const navigateTo = useCallback(
    (index: number) => {
      if (isAnimating) return;

      setIsAnimating(true);

      // Normalize index
      let normalizedIndex = index;
      if (normalizedIndex < 0) normalizedIndex = totalProjects - 1;
      if (normalizedIndex >= totalProjects) normalizedIndex = 0;

      setActiveIndex(normalizedIndex);

      // Reset animation lock after transition
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    },
    [isAnimating, totalProjects]
  );

  const navigateNext = useCallback(() => {
    navigateTo(activeIndex + 1);
  }, [activeIndex, navigateTo]);

  const navigatePrev = useCallback(() => {
    navigateTo(activeIndex - 1);
  }, [activeIndex, navigateTo]);

  // ============================================
  // Auto-rotate
  // ============================================

  useEffect(() => {
    if (isMobileView) return;

    const startAutoRotate = () => {
      autoRotateRef.current = setTimeout(() => {
        if (!isDragging) {
          navigateNext();
        }
        startAutoRotate();
      }, AUTO_ROTATE_DELAY);
    };

    startAutoRotate();

    return () => {
      if (autoRotateRef.current) {
        clearTimeout(autoRotateRef.current);
      }
    };
  }, [activeIndex, isDragging, isMobileView, navigateNext]);

  // ============================================
  // Keyboard Navigation
  // ============================================

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          navigatePrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          navigateNext();
          break;
        case "Escape":
          e.preventDefault();
          onClose?.();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateNext, navigatePrev, onClose]);

  // ============================================
  // Touch/Drag Handling
  // ============================================

  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setDragStartX(clientX);
    setDragDelta(0);
  }, []);

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;
      const delta = clientX - dragStartX;
      setDragDelta(delta);
    },
    [isDragging, dragStartX]
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    if (Math.abs(dragDelta) > ROTATION_THRESHOLD) {
      if (dragDelta > 0) {
        navigatePrev();
      } else {
        navigateNext();
      }
    }

    setIsDragging(false);
    setDragDelta(0);
  }, [isDragging, dragDelta, navigateNext, navigatePrev]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // ============================================
  // GSAP Entry Animation
  // ============================================

  useGSAP(
    () => {
      if (shouldDisableAnimation()) return;

      const container = containerRef.current;
      if (!container) return;

      // Initial state
      gsap.set(container, { opacity: 0 });
      gsap.set(".traces-card", { opacity: 0, scale: 0.8 });
      gsap.set(".traces-preview", { opacity: 0, y: 30 });
      gsap.set(".traces-controller", { opacity: 0, y: 20 });

      // Entry timeline
      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(container, { opacity: 1, duration: 0.5, ease: "power2.out" })
        .to(
          ".traces-card",
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.4)",
          },
          "-=0.3"
        )
        .to(
          ".traces-preview",
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .to(
          ".traces-controller",
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  // ============================================
  // Render
  // ============================================

  const activeProject = projects[activeIndex];

  // Calculate 3D positions for each card
  const getCardStyle = (index: number): React.CSSProperties => {
    if (isMobileView) {
      // Mobile: Simple horizontal scroll
      const offset = index - activeIndex;
      return {
        transform: `translateX(${offset * 110}%)`,
        opacity: Math.abs(offset) <= 1 ? 1 : 0.3,
        zIndex: offset === 0 ? 10 : 5 - Math.abs(offset),
      };
    }

    // Desktop: 3D Carousel
    const angle = (index - activeIndex) * angleStep;
    const radian = (angle * Math.PI) / 180;

    // Carousel radius (distance from center)
    const radius = 450;

    // Calculate position on circle
    const translateZ = Math.cos(radian) * radius;
    const translateX = Math.sin(radian) * radius;

    // Cards facing inward
    const rotateY = -angle;

    // Depth-based opacity
    const normalizedZ = (translateZ + radius) / (2 * radius);
    const opacity = 0.3 + normalizedZ * 0.7;

    // Depth-based scale
    const scale = 0.6 + normalizedZ * 0.4;

    // Add drag offset for interactive feedback
    const dragOffset = isDragging ? dragDelta * 0.1 : 0;

    return {
      transform: `
        translateX(${translateX + dragOffset}px)
        translateZ(${translateZ}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `,
      opacity,
      zIndex: Math.round(normalizedZ * 100),
    };
  };

  return (
    <div
      ref={containerRef}
      className={`traces-slider ${className}`}
      role="region"
      aria-label="3D Project Gallery"
      aria-roledescription="carousel"
    >
      {/* Background Overlay */}
      <div className="traces-backdrop" />

      {/* Noise Texture */}
      <div className="traces-noise" />

      {/* Gold Ambient Glow */}
      <div className="traces-ambient" />

      {/* 3D Carousel Container */}
      <div
        ref={carouselRef}
        className={`traces-carousel ${isMobileView ? "traces-carousel--mobile" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="traces-carousel-stage">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`traces-card ${index === activeIndex ? "traces-card--active" : ""}`}
              style={getCardStyle(index)}
              onClick={() => navigateTo(index)}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${totalProjects}: ${project.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
              tabIndex={index === activeIndex ? 0 : -1}
            >
              {/* Card Image */}
              <div className="traces-card-image">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 80vw, 400px"
                    className="object-cover"
                    priority={Math.abs(index - activeIndex) <= 1}
                  />
                ) : (
                  <div className="traces-card-placeholder" />
                )}

                {/* Reflection */}
                <div className="traces-card-reflection" />

                {/* Hover Glow */}
                <div className="traces-card-glow" />
              </div>

              {/* Card Label */}
              <div className="traces-card-label">
                <span className="traces-card-category">{project.category}</span>
                <h3 className="traces-card-title">{project.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Preview Panel */}
      <div className="traces-preview">
        <div className="traces-preview-content">
          <p className="traces-preview-category">{activeProject?.category}</p>
          <h2 className="traces-preview-title">{activeProject?.name}</h2>
          {activeProject?.description && (
            <p className="traces-preview-description">
              {activeProject.description}
            </p>
          )}
          {activeProject?.link && (
            <a
              href={activeProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="traces-preview-link"
            >
              <span>View Project</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="traces-progress">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`traces-progress-dot ${index === activeIndex ? "traces-progress-dot--active" : ""}`}
              onClick={() => navigateTo(index)}
              aria-label={`Go to project ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>

      {/* Controller Panel */}
      <div className="traces-controller">
        <button
          className="traces-btn traces-btn--prev"
          onClick={navigatePrev}
          disabled={isAnimating}
          aria-label="Previous project"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="traces-counter">
          <span className="traces-counter-current">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="traces-counter-divider">/</span>
          <span className="traces-counter-total">
            {String(totalProjects).padStart(2, "0")}
          </span>
        </div>

        <button
          className="traces-btn traces-btn--next"
          onClick={navigateNext}
          disabled={isAnimating}
          aria-label="Next project"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {onClose && (
          <button
            className="traces-btn traces-btn--close"
            onClick={onClose}
            aria-label="Close gallery"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Keyboard Hint */}
      <div className="traces-hint" aria-hidden="true">
        <kbd>&#8592;</kbd>
        <kbd>&#8594;</kbd>
        <span>Navigate</span>
        {onClose && (
          <>
            <kbd>ESC</kbd>
            <span>Close</span>
          </>
        )}
      </div>
    </div>
  );
}
