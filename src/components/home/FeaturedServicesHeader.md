# FeaturedServicesHeader Component

## Overview
Sticky header component that pins during scroll with GSAP ScrollTrigger. Large display typography with fading background effect.

## Location
`elites-website/src/components/home/FeaturedServicesHeader.tsx`

## Features
- **GSAP ScrollTrigger Pinning**: Sticky behavior during scroll
- **Fade Background Effect**: Background opacity decreases as user scrolls (1.0 → 0.3)
- **Responsive Typography**: Massive display type that scales from 4rem to 18rem
- **Brutalist Aesthetic**: Bold, minimal design with maximum impact
- **Accessibility**: Proper ARIA labels and semantic HTML

## Props

```typescript
interface FeaturedServicesHeaderProps {
  title?: string;          // Default: "Our Services"
  pinDuration?: number;    // Default: 3 (viewport heights)
  className?: string;      // Additional CSS classes
}
```

## Usage

```tsx
import FeaturedServicesHeader from "@/components/home/FeaturedServicesHeader";

export default function HomePage() {
  return (
    <>
      <FeaturedServicesHeader
        title="Our Services"
        pinDuration={3}
      />
      {/* Rest of page content */}
    </>
  );
}
```

## Technical Details

### GSAP ScrollTrigger Configuration
- **Trigger**: Top of header
- **Start**: `"top top"`
- **End**: `+=${window.innerHeight * pinDuration}`
- **Pin**: `true` (element stays fixed)
- **Scrub**: `true` (smooth scroll-linked animation)
- **refreshPriority**: `1` (calculates early for downstream sections)

### Animation Behavior
1. Header pins when it reaches the top of viewport
2. Background fades from opacity 1.0 to 0.3 over scroll duration
3. Title remains fully visible throughout
4. Unpins after `pinDuration` viewport heights

### Performance Optimizations
- Uses `useGSAP` hook for proper React cleanup
- `invalidateOnRefresh: true` for responsive recalculation
- `will-change: opacity` for GPU acceleration
- Transitions disabled for `prefers-reduced-motion`

## Styling

### Typography
- **Font**: FK Screamer (display serif)
- **Fallback**: PP Editorial New, serif
- **Size**: `clamp(4rem, 20vw, 18rem)` (responsive)
- **Weight**: 500
- **Transform**: Uppercase
- **Letter Spacing**: Tight negative spacing

### Color Palette
- **Text**: `#ffffff` (white)
- **Background Gradient**: Radial gold tint (`rgba(255, 215, 0, 0.05)`)
- **Text Shadow**: Subtle white glow for depth

### Responsive Breakpoints
- **Desktop**: 18rem max (20vw)
- **1024px**: 12rem max (18vw)
- **768px**: 8rem max (15vw)
- **480px**: 5rem max (12vw)

## Design Philosophy

### Brutalist Minimal
- Maximum impact with minimal elements
- Bold typography as the primary visual
- Restrained color (white on dark)
- Generous negative space

### Animation Hierarchy
- **Primary**: Pin effect (structural)
- **Secondary**: Background fade (atmospheric)
- **None**: Title (constant presence)

## Accessibility
- Semantic `<section>` element
- `aria-label` for screen readers
- Respects `prefers-reduced-motion`
- High contrast text (white on dark)

## Integration Notes

### With Services Section
Place directly above the services cards section for seamless transition:

```tsx
<FeaturedServicesHeader title="Our Services" pinDuration={3} />
<ServicesSection />
```

### Z-Index Stacking
- Header: `z-index: 10`
- Background: `z-index: 1`
- Content: `z-index: 2`

Ensure subsequent sections have lower z-index to prevent overlap during pin.

## Browser Support
- Modern browsers with GSAP ScrollTrigger support
- Fallback for reduced motion preferences
- Responsive across all viewport sizes

## Dependencies
- `gsap` (^3.13.0)
- `@gsap/react` (^2.1.2)
- Next.js 16+ (for "use client" directive)

## Related Components
- `CGMWTNOV2025Hero.tsx` (similar typography)
- `Services.tsx` (follows this header)

## Future Enhancements
- [ ] Optional subtitle prop
- [ ] Custom background gradient colors
- [ ] Parallax text effect
- [ ] Scroll indicator animation
