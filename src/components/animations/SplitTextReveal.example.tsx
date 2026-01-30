/**
 * SplitTextReveal - Usage Examples
 * Character-by-character text animations powered by GSAP
 */

import { SplitTextReveal } from "./SplitTextReveal";

export function SplitTextRevealExamples() {
  return (
    <div className="space-y-16 p-8">
      {/* Slide variant (default) */}
      <section>
        <h2 className="mb-4 text-sm font-mono text-gray-500">Slide Variant</h2>
        <SplitTextReveal
          text="Elegant slide animation with 3D rotation"
          variant="slide"
          className="text-4xl font-bold"
          as="h1"
        />
      </section>

      {/* Fade variant */}
      <section>
        <h2 className="mb-4 text-sm font-mono text-gray-500">Fade Variant</h2>
        <SplitTextReveal
          text="Smooth fade-in effect"
          variant="fade"
          stagger={0.02}
          className="text-3xl font-medium"
          as="h2"
        />
      </section>

      {/* Scale variant */}
      <section>
        <h2 className="mb-4 text-sm font-mono text-gray-500">Scale Variant</h2>
        <SplitTextReveal
          text="Playful scale with back easing"
          variant="scale"
          stagger={0.04}
          duration={0.8}
          className="text-3xl font-medium"
          as="h2"
        />
      </section>

      {/* Rotate variant */}
      <section>
        <h2 className="mb-4 text-sm font-mono text-gray-500">Rotate Variant</h2>
        <SplitTextReveal
          text="3D rotation reveal"
          variant="rotate"
          stagger={0.025}
          className="text-3xl font-medium"
          as="h2"
        />
      </section>

      {/* Custom timing */}
      <section>
        <h2 className="mb-4 text-sm font-mono text-gray-500">Custom Timing</h2>
        <SplitTextReveal
          text="Delayed start with slow stagger"
          variant="slide"
          delay={0.5}
          stagger={0.1}
          duration={1}
          className="text-2xl"
          as="p"
        />
      </section>

      {/* Fast animation */}
      <section>
        <h2 className="mb-4 text-sm font-mono text-gray-500">Fast Animation</h2>
        <SplitTextReveal
          text="Quick reveal for subtle effect"
          variant="fade"
          stagger={0.01}
          duration={0.3}
          className="text-xl text-gray-600"
          as="p"
        />
      </section>

      {/* Hero title example */}
      <section className="mt-24">
        <h2 className="mb-8 text-sm font-mono text-gray-500">Hero Title Example</h2>
        <div className="space-y-4">
          <SplitTextReveal
            text="Transform Your"
            variant="slide"
            stagger={0.05}
            duration={0.8}
            className="text-6xl font-bold tracking-tight"
            as="h1"
          />
          <SplitTextReveal
            text="Digital Presence"
            variant="scale"
            delay={0.6}
            stagger={0.04}
            duration={0.7}
            className="text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            as="h1"
          />
        </div>
      </section>
    </div>
  );
}

/**
 * USAGE NOTES:
 *
 * 1. Props:
 *    - text: The text to animate (required)
 *    - variant: "slide" | "fade" | "scale" | "rotate" (default: "slide")
 *    - stagger: Delay between each character in seconds (default: 0.03)
 *    - delay: Initial delay before animation starts (default: 0)
 *    - duration: Duration of each character animation (default: 0.6)
 *    - className: Tailwind/CSS classes for styling
 *    - as: HTML element to render ("h1" | "h2" | "h3" | "p" | "span")
 *
 * 2. Variants:
 *    - slide: Vertical slide with 3D rotation (dramatic)
 *    - fade: Simple opacity fade (subtle)
 *    - scale: Scale up with rotation and bounce (playful)
 *    - rotate: 3D Y-axis rotation (modern)
 *
 * 3. Performance:
 *    - Uses will-change for GPU acceleration
 *    - Automatically cleans up GSAP animations on unmount
 *    - Each character is wrapped in span with inline-block
 *
 * 4. Accessibility:
 *    - Preserves text structure for screen readers
 *    - Uses non-breaking spaces to maintain word spacing
 *
 * 5. Styling Tips:
 *    - Apply font-size, color, weight via className
 *    - Combine with gradients for striking effects
 *    - Use different variants for multi-line titles
 *
 * 6. Common Patterns:
 *    - Hero titles: variant="slide", stagger={0.05}
 *    - Subtle reveals: variant="fade", stagger={0.01}
 *    - Playful headings: variant="scale", stagger={0.04}
 *    - Modern reveals: variant="rotate", stagger={0.025}
 */
