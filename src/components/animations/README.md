# Animation Components

GSAP-powered and Framer Motion animation components for The Elites website.

## Components

### SplitTextReveal

Character-by-character text reveal animations powered by GSAP.

**Import:**
```tsx
import { SplitTextReveal } from "@/components/animations";
```

**Basic Usage:**
```tsx
<SplitTextReveal
  text="Transform Your Digital Presence"
  variant="slide"
  className="text-6xl font-bold"
  as="h1"
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | *required* | Text to animate |
| `variant` | `"slide" \| "fade" \| "scale" \| "rotate"` | `"slide"` | Animation style |
| `stagger` | `number` | `0.03` | Delay between each character (seconds) |
| `delay` | `number` | `0` | Initial delay before animation starts |
| `duration` | `number` | `0.6` | Duration of each character animation |
| `className` | `string` | `""` | Tailwind/CSS classes for styling |
| `as` | `"h1" \| "h2" \| "h3" \| "p" \| "span"` | `"span"` | HTML element to render |

**Variants:**

- **slide** - Vertical slide with 3D rotation (dramatic, default)
  - Best for hero titles and major headings
  - Uses `power4.out` easing for smooth deceleration

- **fade** - Simple opacity fade (subtle)
  - Best for body text and subtle reveals
  - Uses `power2.out` easing

- **scale** - Scale up with rotation and bounce (playful)
  - Best for playful headings and CTAs
  - Uses `back.out(1.7)` easing for bounce effect

- **rotate** - 3D Y-axis rotation (modern)
  - Best for modern, tech-forward reveals
  - Uses `power3.out` easing

**Examples:**

```tsx
// Hero title with slide animation
<SplitTextReveal
  text="Welcome to The Elites"
  variant="slide"
  stagger={0.05}
  duration={0.8}
  className="text-6xl font-bold tracking-tight"
  as="h1"
/>

// Subtle subtitle fade
<SplitTextReveal
  text="Crafting digital excellence"
  variant="fade"
  delay={0.6}
  stagger={0.02}
  className="text-2xl text-gray-600"
  as="p"
/>

// Playful CTA
<SplitTextReveal
  text="Get Started"
  variant="scale"
  stagger={0.04}
  duration={0.7}
  className="text-xl font-semibold"
  as="span"
/>

// Modern tech reveal
<SplitTextReveal
  text="AI-Powered Solutions"
  variant="rotate"
  stagger={0.025}
  className="text-4xl font-medium"
  as="h2"
/>
```

**Performance Notes:**

- Each character uses `will-change: transform, opacity` for GPU acceleration
- Animations automatically clean up on component unmount
- Characters are wrapped in `<span>` with `display: inline-block`
- Spaces preserved using non-breaking spaces (`\u00A0`)

**Accessibility:**

- Text structure preserved for screen readers
- Semantic HTML via `as` prop
- No content hidden from assistive technologies

---

### ScrollReveal

Scroll-triggered reveal animations for elements.

**Import:**
```tsx
import { ScrollReveal } from "@/components/animations";
```

**Usage:**
```tsx
<ScrollReveal direction="up" delay={0.2}>
  <div className="content">Your content here</div>
</ScrollReveal>
```

---

### AnimatedH1

Animated heading component with multiple styles.

**Import:**
```tsx
import { AnimatedH1 } from "@/components/animations";
```

---

### AnimatedCopy

Copy text with animation effects.

**Import:**
```tsx
import { AnimatedCopy } from "@/components/animations";
```

---

## Design Guidelines

### When to Use Each Variant

**Slide:**
- Hero titles (large, bold statements)
- Section headings that need impact
- First-fold content that sets the tone

**Fade:**
- Body text and paragraphs
- Secondary headings
- Subtle reveals that don't distract

**Scale:**
- Call-to-action text
- Playful headings for creative sections
- Interactive elements that need attention

**Rotate:**
- Tech-forward sections (AI, automation, innovation)
- Modern product features
- Contemporary design aesthetic

### Timing Recommendations

| Use Case | Stagger | Duration | Delay |
|----------|---------|----------|-------|
| Hero title | 0.05s | 0.8s | 0s |
| Subtitle | 0.02s | 0.6s | 0.6s |
| Body text | 0.01s | 0.3s | 0s |
| CTA | 0.04s | 0.7s | 0s |

### Composition Patterns

**Multi-line Hero:**
```tsx
<div className="space-y-4">
  <SplitTextReveal
    text="Transform Your"
    variant="slide"
    stagger={0.05}
    duration={0.8}
    className="text-6xl font-bold"
    as="h1"
  />
  <SplitTextReveal
    text="Digital Presence"
    variant="scale"
    delay={0.6}
    stagger={0.04}
    className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
    as="h1"
  />
</div>
```

**Title + Subtitle:**
```tsx
<div className="space-y-6">
  <SplitTextReveal
    text="Our Services"
    variant="slide"
    stagger={0.05}
    className="text-5xl font-bold"
    as="h2"
  />
  <SplitTextReveal
    text="Comprehensive solutions for modern businesses"
    variant="fade"
    delay={0.5}
    stagger={0.015}
    className="text-xl text-gray-600"
    as="p"
  />
</div>
```

---

## Technical Details

### GSAP Configuration

All animations use centralized GSAP configuration from `@/lib/gsap`:

- `force3D: true` - Hardware acceleration enabled
- `nullTargetWarn: false` - Suppress warnings for conditional renders
- Plugins registered: ScrollTrigger, useGSAP

### Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (requires -webkit-transform for older versions)
- Mobile: Full support with GPU acceleration

### Dependencies

- `gsap` ^3.13.0
- `@gsap/react` ^2.1.2

---

## Migration Guide

### From CSS Animations

**Before:**
```tsx
<h1 className="animate-fade-in">Title</h1>
```

**After:**
```tsx
<SplitTextReveal
  text="Title"
  variant="fade"
  className="text-4xl font-bold"
  as="h1"
/>
```

### From Framer Motion

**Before:**
```tsx
<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, staggerChildren: 0.03 }}
>
  {text.split("").map((char, i) => (
    <motion.span key={i}>{char}</motion.span>
  ))}
</motion.h1>
```

**After:**
```tsx
<SplitTextReveal
  text={text}
  variant="slide"
  duration={0.6}
  stagger={0.03}
  className="text-4xl font-bold"
  as="h1"
/>
```

---

## Troubleshooting

**Characters not animating:**
- Ensure component has `"use client"` directive (Next.js App Router)
- Check that GSAP is imported from `@/lib/gsap`

**Jagged animations:**
- Add `will-change: transform, opacity` to parent containers
- Ensure GPU acceleration with `transform: translateZ(0)`

**Animations not cleaning up:**
- Component automatically kills tweens on unmount
- Verify no duplicate instances running

**Text spacing issues:**
- Component preserves spaces with `\u00A0` (non-breaking space)
- Apply `letter-spacing` via className if needed

---

## Future Enhancements

- [ ] Word-by-word animation option
- [ ] Line-by-line animation option
- [ ] Custom easing function support
- [ ] Reduced motion preference detection
- [ ] Animation replay on viewport re-entry
