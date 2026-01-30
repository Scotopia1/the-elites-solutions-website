import { IntroSection } from "@/components/sections/IntroSection";

export const metadata = {
  title: "IntroSection Test Page",
  description: "Testing IntroSection component with multiple examples",
};

export default function TestIntroPage() {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh", paddingTop: "6rem" }}>
      {/* Example 1: With image */}
      <IntroSection
        label="MISSION"
        title="Building Excellence Through Innovation"
        content="At The Elites Solutions, we believe in pushing boundaries and redefining what's possible. Our mission is to deliver transformative solutions that empower businesses to thrive in an ever-evolving digital landscape. Through cutting-edge technology, strategic thinking, and unwavering commitment to quality, we turn ambitious visions into reality."
        imageSrc="/images/placeholder-team.jpg"
        imageAlt="The Elites team collaborating"
      />

      {/* Example 2: Text only (no image) */}
      <IntroSection
        label="VISION"
        title="Shaping Tomorrow's Digital Frontier"
        content="We envision a future where technology serves as a catalyst for human potential, where every interaction is meaningful, and every solution creates lasting impact. Our commitment extends beyond mere execution—we're building the infrastructure for tomorrow's digital experiences, one project at a time."
      />

      {/* Example 3: Custom label */}
      <IntroSection
        label="PHILOSOPHY"
        title="The Art of Problem Solving"
        content="Every challenge is an opportunity in disguise. We approach complex problems with curiosity, creativity, and a relentless pursuit of elegance. Our philosophy centers on understanding the 'why' before jumping to the 'how,' ensuring that every solution we craft addresses the root cause rather than merely treating symptoms."
        imageSrc="/images/placeholder-workspace.jpg"
        imageAlt="Modern workspace with collaborative tools"
      />

      {/* Example 4: Different content style */}
      <IntroSection
        label="APPROACH"
        title="Strategy Meets Execution"
        content="The gap between vision and reality is bridged by meticulous planning and flawless execution. We combine strategic foresight with tactical precision, ensuring that every project moves from concept to completion with clarity, speed, and measurable results. No shortcuts. No compromises."
      />
    </main>
  );
}
