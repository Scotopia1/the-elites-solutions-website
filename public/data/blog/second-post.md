# Mastering GSAP ScrollTrigger: Advanced Techniques

GSAP's ScrollTrigger plugin has revolutionized how we approach scroll-based animations. It's not just about making things move—it's about creating narrative experiences that respond to user interaction. After countless projects using ScrollTrigger, I've learned techniques that transform good scroll animations into exceptional ones.

## Why ScrollTrigger Dominates

Before ScrollTrigger, creating performant scroll animations meant wrestling with scroll events, throttling, debouncing, and manual position calculations. ScrollTrigger abstracts all that complexity while providing unmatched control.

### The Power of ScrollTrigger

- **Performance**: Leverages requestAnimationFrame and GPU acceleration
- **Precision**: Pixel-perfect control over animation timelines
- **Flexibility**: Works with any animation library or vanilla CSS
- **Developer Experience**: Intuitive API with powerful debugging tools

## Essential Setup

Before diving into advanced techniques, let's establish the proper foundation:

```typescript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register the plugin once at app initialization
gsap.registerPlugin(ScrollTrigger);

// React component setup
export default function ScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // All ScrollTrigger animations here
    // Automatic cleanup when component unmounts
  }, { scope: containerRef });

  return <div ref={containerRef}>{/* content */}</div>;
}
```

> **Critical**: Always use `useGSAP` hook in React. It handles cleanup automatically, preventing memory leaks and scroll event pollution.

## Advanced Technique #1: Pinned Sections with Scrubbed Timelines

Pinning elements while scrubbing through animation timelines creates magazine-like storytelling:

```typescript
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".pinned-section",
      start: "top top",
      end: () => `+=${window.innerHeight * 3}`, // Pin for 3 viewport heights
      pin: true,
      scrub: 1, // Smooth scrubbing with 1 second lag
      anticipatePin: 1, // Prevents jumps
    }
  });

  tl.from(".title", { scale: 3, opacity: 0 })
    .to(".title", { y: -100, opacity: 0 })
    .from(".subtitle", { x: -200, opacity: 0 }, "-=0.5")
    .to(".subtitle", { y: -100, opacity: 0 })
    .from(".content", { y: 100, opacity: 0 });
}, { scope: containerRef });
```

### Key Parameters Explained

- `scrub: 1` - Animation follows scroll position with 1-second smooth lag
- `anticipatePin: 1` - Prevents browser from jumping by pre-calculating pin position
- `end: () => "+=..."` - Use function for dynamic calculation based on content

## Advanced Technique #2: Horizontal Scroll Galleries

Creating horizontal scroll sections is one of ScrollTrigger's killer features:

```typescript
useGSAP(() => {
  const sections = gsap.utils.toArray<HTMLElement>(".horizontal-section");
  const totalWidth = sections.reduce((acc, section) => acc + section.offsetWidth, 0);
  const scrollDistance = totalWidth - window.innerWidth;

  gsap.to(sections, {
    x: () => -scrollDistance,
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-wrapper",
      start: "top top",
      end: () => `+=${scrollDistance}`,
      pin: true,
      scrub: 0.5,
      invalidateOnRefresh: true, // Recalculate on resize
    }
  });
}, { scope: containerRef, dependencies: [] });
```

**Pro Tip**: Always use `invalidateOnRefresh: true` for responsive horizontal scrolls. This recalculates distances when the viewport resizes.

## Advanced Technique #3: Multi-ScrollTrigger Coordination

When multiple ScrollTriggers interact, you need precise control over their calculation order:

```typescript
useGSAP(() => {
  // First ScrollTrigger (calculated first)
  ScrollTrigger.create({
    trigger: ".section-1",
    start: "top top",
    end: "bottom top",
    pin: true,
    refreshPriority: 1, // Higher = calculated first
  });

  // Second ScrollTrigger (depends on first)
  ScrollTrigger.create({
    trigger: ".section-2",
    start: "top top",
    end: "bottom top",
    pin: true,
    refreshPriority: 0, // Lower = calculated after higher priority
  });

  // Third (calculated last)
  ScrollTrigger.create({
    trigger: ".section-3",
    start: "top top",
    end: "bottom top",
    pin: true,
    refreshPriority: -1, // Negative = calculated last
  });
}, { scope: containerRef });
```

**Critical Rule**: Use `refreshPriority` when sections depend on each other. Higher values are calculated first.

## Advanced Technique #4: Parallax with Multiple Layers

Create depth by moving elements at different speeds:

```typescript
useGSAP(() => {
  // Background layer (slowest)
  gsap.to(".parallax-bg", {
    y: () => window.innerHeight * 0.5,
    ease: "none",
    scrollTrigger: {
      trigger: ".parallax-container",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }
  });

  // Middle layer (medium speed)
  gsap.to(".parallax-mid", {
    y: () => window.innerHeight * 0.3,
    ease: "none",
    scrollTrigger: {
      trigger: ".parallax-container",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }
  });

  // Foreground layer (fastest)
  gsap.to(".parallax-fg", {
    y: () => window.innerHeight * 0.1,
    ease: "none",
    scrollTrigger: {
      trigger: ".parallax-container",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }
  });
}, { scope: containerRef });
```

## Advanced Technique #5: Text Reveals with SplitText

Animate text word-by-word or character-by-character:

```typescript
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

useGSAP(() => {
  const split = new SplitText(".reveal-text", { type: "words,chars" });

  gsap.from(split.chars, {
    opacity: 0,
    y: 50,
    rotateX: -90,
    stagger: 0.02,
    scrollTrigger: {
      trigger: ".reveal-text",
      start: "top 80%",
      end: "top 20%",
      scrub: true,
    }
  });

  // Cleanup
  return () => split.revert();
}, { scope: containerRef });
```

## Performance Best Practices

### 1. Use `will-change` Sparingly

```css
.animated-element {
  will-change: transform, opacity;
}
```

Only apply to elements actively being animated. Remove after animation completes.

### 2. Avoid Layout Thrashing

```typescript
// BAD: Causes layout thrashing
gsap.to(".element", { width: "100%", height: "100%" });

// GOOD: GPU-accelerated
gsap.to(".element", { scaleX: 1.5, scaleY: 1.5 });
```

Always animate `transform` and `opacity` instead of layout properties.

### 3. Batch ScrollTrigger Refreshes

```typescript
// After multiple DOM changes
ScrollTrigger.refresh();
```

Call once after multiple changes, not after each change.

## Debugging ScrollTriggers

Enable markers during development:

```typescript
ScrollTrigger.create({
  trigger: ".element",
  start: "top center",
  end: "bottom center",
  markers: true, // Remove in production!
  onUpdate: (self) => console.log("Progress:", self.progress)
});
```

**Markers show**:
- Green = start position
- Red = end position
- Purple = scroller position

## Integration with Lenis Smooth Scroll

Getting ScrollTrigger to work with Lenis requires synchronization:

```typescript
import Lenis from "@studio-freight/lenis";

useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.destroy();
    gsap.ticker.remove(lenis.raf);
  };
}, []);
```

## Common Pitfalls to Avoid

### Pitfall #1: Not Cleaning Up

```typescript
// BAD: Memory leaks
useEffect(() => {
  ScrollTrigger.create({ /* config */ });
}, []);

// GOOD: Automatic cleanup
useGSAP(() => {
  ScrollTrigger.create({ /* config */ });
}, { scope: containerRef });
```

### Pitfall #2: Animating Too Many Elements

```typescript
// BAD: Animates 100 individual elements
document.querySelectorAll(".item").forEach(item => {
  gsap.to(item, { /* animation */ });
});

// GOOD: Batch with stagger
gsap.to(".item", {
  /* animation */,
  stagger: 0.05
});
```

### Pitfall #3: Ignoring Mobile Performance

```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Initialize ScrollTrigger animations
}
```

Always respect user preferences for reduced motion.

## Real-World Example: Portfolio Showcase

Here's a complete example combining multiple techniques:

```typescript
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".portfolio-section",
      start: "top top",
      end: () => `+=${window.innerHeight * 4}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    }
  });

  // Title sequence
  tl.from(".portfolio-title", { scale: 2, opacity: 0 })
    .to(".portfolio-title", { y: -100, opacity: 0 });

  // Projects horizontal scroll
  const projects = gsap.utils.toArray<HTMLElement>(".project");
  const totalWidth = projects.reduce((acc, p) => acc + p.offsetWidth, 0);

  tl.to(projects, {
    x: () => -(totalWidth - window.innerWidth),
    ease: "none",
  });

  // Final CTA
  tl.from(".portfolio-cta", { y: 100, opacity: 0 });

}, { scope: containerRef, dependencies: [] });
```

## Conclusion

ScrollTrigger is more than an animation plugin—it's a storytelling tool. Master these advanced techniques, and you'll create scroll experiences that captivate users and elevate your web projects.

Remember:
1. Always clean up with `useGSAP`
2. Use `refreshPriority` for multi-ScrollTrigger coordination
3. Animate `transform` and `opacity` for performance
4. Test on real devices, not just dev tools
5. Respect `prefers-reduced-motion`

Now go build something amazing.

---

**Want to see these techniques in action?** Check out our [portfolio](/work) where we've implemented every technique covered in this guide.
