"use client";

import { RoutineSlider, Step } from "@/components/sections";

const workflowSteps: Step[] = [
  {
    number: "01",
    title: "Discovery & Research",
    description:
      "We dive deep into your business goals, target audience, and competitive landscape. This foundational phase establishes the strategic direction for all subsequent work.",
    icon: "🔍",
  },
  {
    number: "02",
    title: "Strategic Planning",
    description:
      "Transform insights into actionable strategies. We map out user journeys, define key performance indicators, and create a comprehensive project roadmap that aligns with your vision.",
    icon: "📋",
  },
  {
    number: "03",
    title: "Design & Prototyping",
    description:
      "Craft pixel-perfect designs that balance aesthetics with functionality. Interactive prototypes allow us to validate concepts and gather feedback before committing to development.",
    icon: "🎨",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Build with precision using cutting-edge technologies and best practices. Clean code, performance optimization, and scalability are our non-negotiables throughout the development process.",
    icon: "⚙️",
  },
  {
    number: "05",
    title: "Quality Assurance",
    description:
      "Rigorous testing across devices, browsers, and user scenarios. We ensure flawless performance, accessibility compliance, and bug-free experiences before launch.",
    icon: "✓",
  },
  {
    number: "06",
    title: "Launch & Optimization",
    description:
      "Deploy with confidence and precision. Post-launch monitoring, performance analytics, and continuous optimization ensure sustained excellence and long-term success.",
    icon: "🚀",
  },
];

export default function TestRoutineSliderPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      <div
        style={{
          padding: "4rem 2rem",
          textAlign: "center",
          background: "#141414",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-heading, 'SCHABO', sans-serif)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "#FFD700",
            marginBottom: "1rem",
          }}
        >
          RoutineSlider Component Test
        </h1>
        <p
          style={{
            fontFamily: "var(--font-copy, 'Host Grotesk', sans-serif)",
            fontSize: "1.1rem",
            color: "rgba(255, 215, 0, 0.7)",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          Horizontal scrolling workflow display with GSAP ScrollTrigger. Scroll
          down to experience the animation.
        </p>
      </div>

      <RoutineSlider title="Our Proven Process" steps={workflowSteps} />

      <div
        style={{
          padding: "4rem 2rem",
          textAlign: "center",
          background: "#141414",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-heading, 'SCHABO', sans-serif)",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            color: "#FFD700",
            marginBottom: "1rem",
          }}
        >
          Features
        </h2>
        <ul
          style={{
            fontFamily: "var(--font-copy, 'Host Grotesk', sans-serif)",
            fontSize: "1rem",
            color: "rgba(255, 215, 0, 0.7)",
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "left",
            lineHeight: "1.8",
          }}
        >
          <li>✓ Horizontal scroll on desktop (pinned section)</li>
          <li>✓ Progress bar showing scroll position</li>
          <li>✓ Smooth 1:1 scroll-to-animation scrubbing</li>
          <li>✓ Snap scrolling for precise step alignment</li>
          <li>✓ Hover effects with elevation and glow</li>
          <li>✓ Vertical stack on mobile with reveal animations</li>
          <li>✓ Respects prefers-reduced-motion</li>
          <li>✓ GPU-accelerated transforms (60fps)</li>
        </ul>
      </div>

      <div style={{ height: "50vh", background: "#0a0a0a" }} />
    </main>
  );
}
