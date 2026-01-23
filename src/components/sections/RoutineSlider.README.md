# RoutineSlider Component

A production-grade horizontal scrolling workflow display component built with GSAP ScrollTrigger. Inspired by Orbit Matter Observatory's routine section.

## Features

### Desktop Experience
- **Horizontal Scroll**: Pin section and scroll horizontally through workflow steps
- **Progress Bar**: Visual indicator showing scroll position through the steps
- **Smooth Scrubbing**: 1:1 scroll-to-animation mapping with `scrub: 1`
- **Snap Scrolling**: CSS scroll-snap for precise step alignment
- **Hover Effects**: Elevated cards with scale transforms and glow effects
- **GPU-Accelerated**: Uses `transform` and `opacity` for 60fps animations

### Mobile Experience
- **Vertical Stack**: Automatic conversion to vertical layout below 768px
- **Staggered Reveals**: Sequential fade-in animations on scroll
- **Touch-Optimized**: No horizontal scroll on mobile devices
- **Simplified UI**: Progress bar hidden, icons scaled appropriately

### Accessibility
- **Reduced Motion**: Respects `prefers-reduced-motion` preference
- **Semantic HTML**: Proper section/heading structure
- **Keyboard Navigation**: Fully keyboard-accessible
- **High Contrast**: Gold (#FFD700) on dark backgrounds

## Installation

The component is already set up with required dependencies:

```bash
# Dependencies already installed
@gsap/react: ^2.1.2
gsap: (via @gsap/react)
```

## Usage

### Basic Example

```tsx
import { RoutineSlider, Step } from '@/components/sections';

const steps: Step[] = [
  {
    number: "01",
    title: "Discovery",
    description: "We explore your needs and objectives",
    icon: "🔍"
  },
  {
    number: "02",
    title: "Strategy",
    description: "Create actionable roadmap",
    icon: "📋"
  },
  // ... more steps
];

export function MyPage() {
  return (
    <RoutineSlider
      title="Our Workflow"
      steps={steps}
    />
  );
}
```

### Props API

```typescript
interface Step {
  number: string;        // Step number (e.g., "01", "02")
  title: string;         // Step title
  description: string;   // Detailed description
  icon?: string;         // Optional icon (emoji or Unicode)
}

interface RoutineSliderProps {
  title?: string;        // Section title (optional)
  steps: Step[];         // Array of workflow steps (required)
  className?: string;    // Additional CSS classes
}
```

### Advanced Customization

```tsx
// Custom styling via className
<RoutineSlider
  title="How We Build"
  steps={workflowSteps}
  className="custom-workflow"
/>

// In your CSS
.custom-workflow {
  background: linear-gradient(180deg, #000 0%, #111 100%);
  padding: 10rem 0;
}
```

## Technical Implementation

### GSAP ScrollTrigger Configuration

```typescript
ScrollTrigger.create({
  trigger: section,
  start: "top top",
  end: () => `+=${window.innerHeight * 3}`,
  pin: true,              // Pin section during scroll
  pinSpacing: true,       // Add space below for scroll distance
  scrub: 1,              // Smooth 1:1 scroll mapping
  invalidateOnRefresh: true,  // Recalculate on resize
  refreshPriority: -1,   // Calculate after other ScrollTriggers
});
```

### Responsive Behavior

- **Desktop (>768px)**: Horizontal scroll with GSAP pinning
- **Tablet (769-1024px)**: Smaller card width (350px)
- **Mobile (≤768px)**: Vertical stack with reveal animations

### Performance Optimizations

1. **GPU Acceleration**: Uses `transform: translateX()` for horizontal movement
2. **will-change**: Applied to animated elements
3. **useGSAP Hook**: Automatic cleanup on unmount
4. **matchMedia**: Separate animations for desktop/mobile
5. **Reduced Motion**: Disables animations when `prefers-reduced-motion: reduce`

## Design System Integration

### Color Palette
- Primary Gold: `#FFD700` (--orbit-gold-100)
- Dark Background: `#141414` (--orbit-dark-200)
- Darker Background: `#0a0a0a` (--orbit-dark-300)
- Orange Accent: `#FFA500`

### Typography
- **Heading Font**: SCHABO (uppercase, tight tracking)
- **Body Font**: Geist Mono (uppercase, wide tracking)
- **Copy Font**: Host Grotesk (sentence case, relaxed)

### Spacing Scale
- Card padding: `3rem 2.5rem`
- Gap between cards: `3rem`
- Section padding: `8rem 0` (desktop), `5rem 0` (mobile)

## Animation Details

### Horizontal Scroll Movement
```typescript
gsap.set(slider, {
  x: progress * moveDistance,  // Negative value to move left
});
```

### Progress Bar Animation
```typescript
gsap.set(progressBar, {
  scaleX: progress,           // 0 to 1 scale
});
```

### Mobile Reveal Animation
```typescript
gsap.from(card, {
  y: 50,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
  delay: index * 0.1,         // Stagger by 0.1s
});
```

### Card Hover Effect
```css
.stepCard:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px rgba(255, 215, 0, 0.2);
}
```

## Browser Support

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (with vendor prefixes)
- **Mobile Safari**: Full support (vertical mode)
- **IE11**: Not supported (no GSAP ScrollTrigger)

## Accessibility Features

- Semantic `<section>` and `<h2>` tags
- Visible focus states for keyboard navigation
- High contrast ratios (4.5:1 minimum)
- Respects user motion preferences
- Screen reader compatible content structure

## Troubleshooting

### Horizontal scroll not working
- Ensure window width > 768px
- Check GSAP is properly registered: `gsap.registerPlugin(ScrollTrigger)`
- Verify ScrollTrigger is imported: `import { ScrollTrigger } from "gsap/ScrollTrigger"`

### Cards not visible
- Check `steps` array has content
- Verify CSS modules are loading (check styles object)
- Ensure parent container has proper width

### Performance issues
- Reduce number of steps (optimal: 4-8 steps)
- Disable `markers: true` in production
- Check for conflicting ScrollTrigger instances

## Examples

See `RoutineSlider.example.tsx` for complete usage examples:
- Basic workflow with 6 steps
- Custom styled workflow
- Minimal workflow (no title)
- Simple 3-step process

## Credits

Inspired by **Orbit Matter Observatory** workflow section (lines 220-231).

Built with:
- GSAP 3.x + ScrollTrigger
- @gsap/react for React integration
- CSS Modules for scoped styling
- TypeScript for type safety
