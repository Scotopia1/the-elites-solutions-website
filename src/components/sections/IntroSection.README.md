# IntroSection Component

A visually striking intro section component designed for the About page, featuring a flicker text label animation, scroll-triggered content reveals, and optional side imagery.

## Features

- **Flicker Label Animation**: GSAP-powered flicker effect on the label text that activates on scroll
- **Scroll-Triggered Reveals**: Smooth fade-in animations for content and images
- **Two-Column Layout**: Desktop layout with text on left, optional image on right
- **Responsive Stacking**: Mobile-first design that stacks content vertically on smaller screens
- **Drop Cap Typography**: First letter of content is styled as a decorative drop cap
- **Noise Texture Overlay**: Subtle grain effect on images for visual depth
- **Reduced Motion Support**: Respects user's motion preferences

## Usage

```tsx
import { IntroSection } from "@/components/sections/IntroSection";

export default function AboutPage() {
  return (
    <IntroSection
      label="MISSION"
      title="Building Excellence Through Innovation"
      content="At The Elites Solutions, we believe in pushing boundaries and redefining what's possible. Our mission is to deliver transformative solutions that empower businesses to thrive in an ever-evolving digital landscape."
      imageSrc="/images/team-photo.jpg"
      imageAlt="The Elites team collaborating"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"MISSION"` | Small uppercase label with flicker animation |
| `title` | `string` | **Required** | Main heading text |
| `content` | `string` | **Required** | Body copy text (first letter auto-styled as drop cap) |
| `imageSrc` | `string` | `undefined` | Optional image path (hides image column if not provided) |
| `imageAlt` | `string` | `""` | Alt text for the image |
| `className` | `string` | `""` | Additional CSS classes |

## Layout Behavior

### Desktop (> 768px)
- Two-column grid layout
- Text column (left): 50% width, max 600px content width
- Image column (right): 50% width, 4:5 aspect ratio
- 6rem gap between columns

### Mobile (≤ 768px)
- Single column stacked layout
- Text column appears first
- Image column appears second
- 16:11 aspect ratio for better mobile viewing

## Animation Details

### Label Flicker Effect
- Triggers when section enters viewport (top 70%)
- 5 rapid opacity toggles (0 → 1) using `steps(2)` easing
- Completes with solid opacity
- Fires once per page load

### Content Fade-In
- Triggers at top 75% of viewport
- Fades from 0 to 1 opacity while sliding up 40px
- 1.2s duration with `power4.out` easing
- Fires once per page load

### Image Reveal
- Triggers at top 75% of viewport
- Slides in from right (60px) while fading in
- Scales from 95% to 100%
- 1.4s duration with `power4.out` easing

## Styling Notes

### Typography
- **Label**: Geist Mono, 0.75-0.85rem, 0.25em letter-spacing
- **Title**: SCHABO, 2.5-4.5rem, uppercase, -0.03em letter-spacing
- **Copy**: Host Grotesk, 1.1-1.35rem, 1.75 line-height, 300 weight

### Color Palette
- Label: Gold (#FFD700) with glow effects
- Title: White with gold text shadow
- Copy: White at 75% opacity
- Drop cap: Gold
- Borders: Gold at 20-30% opacity

### Visual Effects
- Label has border glow and inner shadow
- Title has subtle gold text shadow
- Image wrapper has multi-layer shadows
- Noise texture overlay on images
- Gradient overlays for depth
- Grayscale filter (30%) on images, removes on hover

## Accessibility

- Semantic HTML structure (`<section>`, `<h2>`, `<p>`)
- Proper alt text for images
- Respects `prefers-reduced-motion` media query
- High contrast text (WCAG AA compliant)
- Keyboard navigation support via Next.js Image component

## Performance Considerations

- Uses `will-change: transform, opacity` in CSS for GPU acceleration
- GSAP animations fire `once: true` to prevent re-triggering
- ScrollTrigger instances properly cleaned up on unmount
- Next.js Image component with optimized sizes attribute
- Lazy loading enabled for off-screen images

## Design Philosophy

This component embraces a **refined brutalist aesthetic** with:
- Bold typography with extreme scale contrast
- Glowing gold accents against dark backgrounds
- Decorative first letter (drop cap) for editorial feel
- Noise texture for tactile quality
- Precise geometric borders and spacing
- Intentional use of shadows for depth and drama

The flicker effect on the label creates a "transmission" or "signal" aesthetic, suggesting cutting-edge technology and digital communication.

## File Locations

- Component: `src/components/sections/IntroSection.tsx`
- Styles: `src/components/sections/IntroSection.module.css`
- Test Page: `src/app/test-intro/page.tsx`

## Dependencies

- Next.js 14+ (Image component)
- GSAP 3.12+ with ScrollTrigger
- React 18+
- CSS Modules

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## Related Components

- `ScrollReveal` - Generic scroll-triggered animations
- `AnimatedCopy` - Text animation variants
- `CTASection` - Call-to-action section with similar styling
- `StatsSection` - Stats display with animated counters
