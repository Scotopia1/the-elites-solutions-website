"use client";

import { useRef, useCallback, useMemo } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Rocket,
  Clock,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  step?: number;
  number?: string;
  title: string;
  description: string;
  duration?: string;
  deliverables?: string[];
  icon?: string;
}

interface HorizontalProcessJourneyProps {
  steps?: ProcessStep[];
  sectionTitle?: string;
  subtitle?: string;
}

const defaultSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Discovery",
    description: "Understanding your business, goals, and challenges through in-depth research and stakeholder interviews.",
    duration: "1-2 weeks",
    deliverables: ["Requirements Doc", "User Research", "Competitive Analysis"],
  },
  {
    step: 2,
    title: "Strategy",
    description: "Defining the roadmap, architecture, and key milestones to ensure project success.",
    duration: "1 week",
    deliverables: ["Project Plan", "Technical Spec", "Timeline"],
  },
  {
    step: 3,
    title: "Design",
    description: "Creating intuitive interfaces and experiences that delight users and achieve business objectives.",
    duration: "2-3 weeks",
    deliverables: ["Wireframes", "UI Design", "Prototypes"],
  },
  {
    step: 4,
    title: "Development",
    description: "Building robust, scalable solutions using modern technologies and best practices.",
    duration: "4-8 weeks",
    deliverables: ["Clean Code", "Documentation", "Testing"],
  },
  {
    step: 5,
    title: "Launch",
    description: "Deploying your solution with comprehensive testing and seamless handover.",
    duration: "1 week",
    deliverables: ["Deployment", "Training", "Support"],
  },
];


export default function HorizontalProcessJourney({
  steps = defaultSteps,
  sectionTitle = "Our Process",
  subtitle = "A proven methodology that delivers results",
}: HorizontalProcessJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const timelineProgressRef = useRef<HTMLDivElement>(null);

  // Normalize steps data - memoized to prevent recalculation
  const normalizedSteps = useMemo(() =>
    steps.map((step, index) => ({
      ...step,
      step: step.step || parseInt(step.number || String(index + 1)),
    })), [steps]
  );

  // Update UI elements directly without state (performance optimization)
  const updateProgress = useCallback((prog: number, stepIndex: number) => {
    // Update progress bar width
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${prog * 100}%`;
    }
    // Update timeline progress
    if (timelineProgressRef.current) {
      timelineProgressRef.current.style.width = `${prog * 100}%`;
    }
    // Update step counter
    if (progressTextRef.current) {
      progressTextRef.current.textContent = String(stepIndex + 1).padStart(2, "0");
    }
    // Update node states via CSS classes
    const nodes = containerRef.current?.querySelectorAll('[data-node]');
    const cards = containerRef.current?.querySelectorAll('[data-card]');
    const connectors = containerRef.current?.querySelectorAll('[data-connector]');
    const dots = containerRef.current?.querySelectorAll('[data-dot]');

    nodes?.forEach((node, i) => {
      node.classList.toggle('node-active', i === stepIndex);
      node.classList.toggle('node-past', i < stepIndex);
    });
    cards?.forEach((card, i) => {
      card.classList.toggle('card-active', i === stepIndex);
    });
    connectors?.forEach((conn, i) => {
      conn.classList.toggle('connector-active', i <= stepIndex);
    });
    dots?.forEach((dot, i) => {
      dot.classList.toggle('dot-active', i === stepIndex);
      dot.classList.toggle('dot-past', i < stepIndex);
    });
    // Update success node
    const successNode = containerRef.current?.querySelector('[data-success]');
    successNode?.classList.toggle('success-active', prog > 0.95);
  }, []);

  useGSAP(
    () => {
      if (!wrapperRef.current || !trackRef.current || normalizedSteps.length === 0) return;

      const track = trackRef.current;
      const totalWidth = track.scrollWidth - window.innerWidth;

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: () => `+=${totalWidth + window.innerHeight}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const prog = self.progress;
          const stepIndex = Math.min(
            Math.floor(prog * normalizedSteps.length),
            normalizedSteps.length - 1
          );

          // Direct DOM updates instead of state
          updateProgress(prog, stepIndex);

          // Move the track
          gsap.set(track, {
            x: -prog * totalWidth,
          });
        },
      });
    },
    { scope: containerRef, dependencies: [normalizedSteps.length, updateProgress] }
  );

  if (normalizedSteps.length === 0) return null;

  return (
    <section ref={containerRef} className="relative bg-transparent process-journey">
      {/* CSS for state-based styling */}
      <style jsx>{`
        .node-active { background: #FFD700 !important; transform: scale(1.1); box-shadow: 0 0 40px rgba(255, 215, 0, 0.4); border: none !important; }
        .node-past { background: rgba(255, 215, 0, 0.4) !important; border: 2px solid rgba(255, 215, 0, 0.6) !important; }
        .node-active .node-text { color: #0a0a0a !important; }
        .node-past .node-text { color: #FFD700 !important; }
        .card-active { background: linear-gradient(to bottom right, rgba(255,255,255,0.08), rgba(255,255,255,0.02)) !important; border-color: rgba(255, 215, 0, 0.3) !important; }
        .connector-active { background: rgba(255, 215, 0, 0.4) !important; }
        .dot-active { background: #FFD700 !important; width: 1.5rem !important; }
        .dot-past { background: rgba(255, 215, 0, 0.4) !important; }
        .success-active { background: #FFD700 !important; transform: scale(1.1); box-shadow: 0 0 60px rgba(255, 215, 0, 0.5); }
        .success-active .success-icon { color: #0a0a0a !important; }
        .success-active .success-text { color: #FFD700 !important; }
      `}</style>

      <div ref={wrapperRef} className="relative h-screen overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Fixed header */}
        <div className="absolute top-0 left-0 right-0 z-30 px-8 pt-16 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#FFD700]/60 mb-2 block">
                  How We Work
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  {sectionTitle}
                </h2>
                <p className="text-white/50 mt-2 max-w-md">
                  {subtitle}
                </p>
              </div>

              {/* Progress indicator */}
              <div className="flex items-center gap-4">
                <span ref={progressTextRef} className="text-sm text-white/40 font-mono">
                  01
                </span>
                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    ref={progressBarRef}
                    className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFD700]/60 rounded-full transition-none"
                    style={{ width: "0%" }}
                  />
                </div>
                <span className="text-sm text-white/40 font-mono">
                  {String(normalizedSteps.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal scrolling track */}
        <div
          ref={trackRef}
          className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center will-change-transform"
          style={{ paddingLeft: "calc(50vw - 200px)", paddingRight: "calc(50vw - 100px)" }}
        >
          {/* Timeline line - spans from first node to success node */}
          <div
            className="absolute top-1/2 h-[2px] bg-white/10 -translate-y-1/2"
            style={{
              left: "50vw",
              right: "50vw",
            }}
          >
            <div
              ref={timelineProgressRef}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FFD700] to-[#FFD700]/40 transition-none"
              style={{ width: "0%" }}
            />
          </div>

          {/* Step cards */}
          {normalizedSteps.map((step, index) => {
            const isAbove = index % 2 === 0; // Even steps above, odd steps below

            return (
              <div
                key={index}
                className="relative flex-shrink-0"
                style={{ width: "400px", marginRight: "80px", height: "500px" }}
              >
                {/* Node ON the timeline - centered in container */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div
                    data-node
                    className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 bg-white/5 border-2 border-white/20"
                  >
                    <span className="node-text text-lg font-bold transition-colors duration-300 text-white/40">
                      {String(step.step).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Connector line - vertical line from node to card */}
                <div
                  data-connector
                  className="absolute left-1/2 -translate-x-1/2 w-[2px] transition-colors duration-300 bg-white/10"
                  style={{
                    top: isAbove ? "auto" : "calc(50% + 28px)",
                    bottom: isAbove ? "calc(50% + 28px)" : "auto",
                    height: "40px",
                  }}
                />

                {/* Card - positioned above or below the node */}
                <div
                  data-card
                  className="absolute left-0 right-0 rounded-2xl border p-6 transition-all duration-300 bg-white/[0.02] border-white/10"
                  style={{
                    top: isAbove ? "0" : "auto",
                    bottom: isAbove ? "auto" : "0",
                    maxHeight: "calc(50% - 60px)",
                  }}
                >
                  {/* Step number badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl font-bold transition-colors duration-300 text-white/20">
                      {String(step.step).padStart(2, "0")}
                    </span>

                    {/* Duration badge */}
                    {step.duration && (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                        <Clock className="w-3 h-3 text-white/40" />
                        <span className="text-xs text-white/50">{step.duration}</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 text-white/70">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed mb-3 line-clamp-3">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  {step.deliverables && step.deliverables.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {step.deliverables.slice(0, 3).map((item, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full text-xs transition-colors duration-300 bg-white/5 text-white/40 border border-white/10"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* End indicator - Success node */}
          <div className="relative flex-shrink-0" style={{ width: "200px", height: "500px" }}>
            {/* Success node - centered in container */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div
                data-success
                className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 bg-white/5 border-2 border-white/20"
              >
                <Rocket className="success-icon w-8 h-8 transition-colors duration-300 text-white/30" />
              </div>
              <span className="success-text mt-4 text-sm font-medium transition-colors duration-300 whitespace-nowrap text-white/30">
                Success
              </span>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/30">
          <span className="text-sm">Scroll to explore</span>
          <ArrowRight className="w-4 h-4" />
        </div>

        {/* Step labels - mobile/tablet */}
        <div className="absolute bottom-20 left-0 right-0 px-8 lg:hidden">
          <div className="flex justify-center gap-2">
            {normalizedSteps.map((_, index) => (
              <div
                key={index}
                data-dot
                className="w-2 h-2 rounded-full transition-all duration-300 bg-white/20"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
