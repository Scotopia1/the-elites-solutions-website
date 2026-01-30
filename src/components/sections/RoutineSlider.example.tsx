/**
 * Example usage of RoutineSlider component
 *
 * This demonstrates how to implement the horizontal scrolling workflow display
 * inspired by Orbit Matter Observatory's routine section.
 */

import { RoutineSlider, Step } from "./RoutineSlider";

// Example workflow steps
const workflowSteps: Step[] = [
  {
    number: "01",
    title: "Discovery & Research",
    description: "We dive deep into your business goals, target audience, and competitive landscape. This phase establishes the foundation for strategic decision-making.",
    icon: "🔍",
  },
  {
    number: "02",
    title: "Strategic Planning",
    description: "Transform insights into actionable strategies. We map out user journeys, define key performance indicators, and create a comprehensive project roadmap.",
    icon: "📋",
  },
  {
    number: "03",
    title: "Design & Prototyping",
    description: "Craft pixel-perfect designs that balance aesthetics with functionality. Interactive prototypes validate concepts before development begins.",
    icon: "🎨",
  },
  {
    number: "04",
    title: "Development",
    description: "Build with precision using cutting-edge technologies. Clean code, performance optimization, and scalability are our non-negotiables.",
    icon: "⚙️",
  },
  {
    number: "05",
    title: "Quality Assurance",
    description: "Rigorous testing across devices, browsers, and scenarios. We ensure flawless performance before launch.",
    icon: "✓",
  },
  {
    number: "06",
    title: "Launch & Optimization",
    description: "Deploy with confidence. Post-launch monitoring and continuous optimization ensure sustained excellence.",
    icon: "🚀",
  },
];

// Basic usage
export function WorkflowSection() {
  return (
    <RoutineSlider
      title="Our Proven Process"
      steps={workflowSteps}
    />
  );
}

// With custom className
export function CustomStyledWorkflow() {
  return (
    <RoutineSlider
      title="How We Work"
      steps={workflowSteps}
      className="custom-workflow-section"
    />
  );
}

// Without title (title is optional)
export function MinimalWorkflow() {
  return (
    <RoutineSlider
      steps={workflowSteps}
    />
  );
}

// Custom steps without icons
const simpleSteps: Step[] = [
  {
    number: "01",
    title: "Consult",
    description: "Initial consultation to understand your needs",
  },
  {
    number: "02",
    title: "Design",
    description: "Create tailored solutions for your business",
  },
  {
    number: "03",
    title: "Deliver",
    description: "Launch and support your success",
  },
];

export function SimpleWorkflow() {
  return (
    <RoutineSlider
      title="Three-Step Process"
      steps={simpleSteps}
    />
  );
}
