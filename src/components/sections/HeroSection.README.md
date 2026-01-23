# HeroSection Component

Production-quality full-screen hero section with GSAP animations, matching the Orbit Matter aesthetic.

## Features

- **Full-screen responsive hero** with Next.js Image optimization
- **GSAP clip-path reveal** animation for the title
- **Staggered fade-in animations** for subtitle, description, and callout badges
- **Optional UTC timer** using the `useHeroTimer` hook
- **Gradient overlay** (dark to gold fade)
- **Orbit Matter aesthetic**: Dark (#141414) background with gold (#FFD700) accents
- **SCHABO font** for the heading
- **Fully accessible** with ARIA labels and semantic HTML
- **Responsive breakpoints** for all device sizes
- **Reduced motion support** for accessibility
- **High contrast mode** support

## Installation

The component is ready to use. Ensure you have:

```bash
npm install gsap @gsap/react
```

## Basic Usage

```tsx
import HeroSection from "@/components/sections/HeroSection";

export default function HomePage() {
  return (
    <HeroSection
      title="Elite Solutions"
      subtitle="Where Innovation Meets Excellence"
      description="We transform businesses with cutting-edge digital solutions."
      imageSrc="/images/hero-background.jpg"
      imageAlt="Modern office space"
      showTimer={true}
      callouts={[
        { icon: "⚡", text: "Fast Delivery" },
        { icon: "🎯", text: "Precision Work" },
        { icon: "🚀", text: "Scalable Solutions" },
      ]}
    />
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | ✅ Yes | - | Main heading text (SCHABO font) |
| `subtitle` | `string` | ❌ No | `undefined` | Secondary heading below title |
| `description` | `string` | ❌ No | `undefined` | Body copy text |
| `imageSrc` | `string` | ✅ Yes | - | Path to background image |
| `imageAlt` | `string` | ✅ Yes | - | Alt text for background image (accessibility) |
| `showTimer` | `boolean` | ❌ No | `false` | Display UTC timer in "Zone 02 __ 14:30" format |
| `callouts` | `Array<{icon?: string; text: string}>` | ❌ No | `[]` | Animated badge callouts |
| `className` | `string` | ❌ No | `""` | Additional CSS classes |

## Animation Behavior

### GSAP Timeline (1.2s total)

1. **Title Clip-Path Reveal** (0-1.2s)
   - Starts: `polygon(0 0, 0 0, 0 100%, 0 100%)` (hidden)
   - Ends: `polygon(0 0, 100% 0, 100% 100%, 0 100%)` (full reveal)
   - Easing: `power4.inOut`

2. **Subtitle Fade-In** (0.6s-1.4s)
   - Starts 0.6s before title finishes (overlap for smooth flow)
   - Y-axis translation: 30px → 0px
   - Opacity: 0 → 1

3. **Description Fade-In** (0.7s-1.5s)
   - Similar to subtitle, offset by 0.1s

4. **Callout Badges Stagger** (0.8s-2.0s)
   - Each badge offset by 0.15s
   - Creates waterfall effect

### Reduced Motion

Animations are **automatically disabled** for users with `prefers-reduced-motion: reduce`.

## Responsive Breakpoints

| Breakpoint | Screen Size | Title Font Size | Behavior |
|------------|-------------|-----------------|----------|
| Large Desktop | 1920px+ | 10rem | Maximum scale |
| Desktop | 1366-1919px | 7rem | Standard desktop |
| Small Desktop | 1024-1365px | 6rem | Reduced spacing |
| Tablet | 768-1023px | 5rem | Optimized layout |
| Mobile | 481-767px | 4rem | Vertical stacking |
| Small Mobile | ≤480px | 2.5-3.5rem | Compact layout |
| Landscape Mobile | <1024px landscape | 2.5-4.5rem | Landscape optimization |

## Color Palette (Orbit Matter)

```css
--orbit-gold-100: #FFD700;    /* Primary text/accents */
--orbit-gold-200: #F4C430;    /* Medium gold */
--orbit-gold-300: #B8860B;    /* Dark gold */
--orbit-dark-100: #1a1a1a;    /* Secondary dark */
--orbit-dark-200: #141414;    /* Primary dark (background) */
--orbit-dark-300: #0a0a0a;    /* Darkest */
```

## Accessibility

- **Semantic HTML**: `<section>`, `<h1>`, `<p>` tags
- **ARIA labels**: `aria-label="Hero section"`, `aria-live="polite"` for timer
- **Keyboard navigation**: All interactive elements are keyboard accessible
- **Screen reader friendly**: Descriptive alt text required
- **High contrast mode**: Enhanced contrast for visually impaired users
- **Touch-friendly**: Minimum 44px tap targets on mobile

## Advanced Usage

### Custom Styling

```tsx
<HeroSection
  title="Custom Hero"
  imageSrc="/hero.jpg"
  imageAlt="Hero background"
  className="custom-hero-override"
/>
```

```css
/* Custom overrides */
.custom-hero-override {
  min-height: 80vh; /* Override default 100vh */
}

.custom-hero-override .title {
  color: #ff6b6b; /* Custom title color */
}
```

### Dynamic Content

```tsx
const heroData = {
  title: "Dynamic Title",
  subtitle: "Fetched from CMS",
  description: "Real-time content",
  imageSrc: "/dynamic-bg.jpg",
  imageAlt: "Dynamic background",
  callouts: [
    { icon: "✨", text: "New Feature" },
    { icon: "🔥", text: "Trending" },
  ],
};

<HeroSection {...heroData} showTimer={true} />
```

### Without Timer or Callouts

```tsx
<HeroSection
  title="Minimal Hero"
  subtitle="Clean and simple"
  imageSrc="/minimal-bg.jpg"
  imageAlt="Minimal background"
/>
```

## Performance Optimization

- **Next.js Image**: Automatic optimization, lazy loading, WebP conversion
- **GSAP useGSAP hook**: Automatic cleanup on unmount
- **will-change**: Strategic use on animated elements
- **GPU acceleration**: `transform` and `opacity` animations only
- **Background images**: Use optimized JPG/WebP formats (recommended: 1920x1080, <200KB)

## Best Practices

1. **Image optimization**: Use high-quality images at 1920x1080 resolution, compressed to <200KB
2. **Alt text**: Always provide descriptive alt text for accessibility
3. **Title length**: Keep titles concise (1-4 words) for maximum impact
4. **Callouts**: Limit to 3-5 badges to avoid clutter
5. **Font loading**: SCHABO font should be preloaded in `app/layout.tsx`

## Typography Hierarchy

```
Title (H1)
  ↓
Subtitle (P)
  ↓
Description (P)
  ↓
Callouts (Badges)
```

## Example Implementations

### Landing Page Hero

```tsx
<HeroSection
  title="Transform Your Business"
  subtitle="AI-Powered Solutions for Modern Enterprises"
  description="Leverage cutting-edge technology to scale faster, optimize operations, and dominate your market."
  imageSrc="/images/business-hero.jpg"
  imageAlt="Modern business workspace with technology"
  showTimer={true}
  callouts={[
    { icon: "🚀", text: "Fast Deployment" },
    { icon: "🔒", text: "Enterprise Security" },
    { icon: "📈", text: "Proven ROI" },
  ]}
/>
```

### Product Launch Hero

```tsx
<HeroSection
  title="The Future is Here"
  subtitle="Introducing Next-Gen Platform"
  imageSrc="/images/product-launch.jpg"
  imageAlt="Product showcase on futuristic display"
  callouts={[
    { text: "Available Now" },
    { text: "Limited Offer" },
  ]}
/>
```

### Minimalist Hero

```tsx
<HeroSection
  title="Excellence"
  imageSrc="/images/abstract-gold.jpg"
  imageAlt="Abstract gold design pattern"
/>
```

## File Structure

```
src/components/sections/
├── HeroSection.tsx              # Main component
├── HeroSection.module.css       # Styles
└── HeroSection.README.md        # Documentation
```

## Dependencies

- `react` (^18.0.0)
- `next` (^14.0.0 or ^15.0.0)
- `gsap` (^3.12.0)
- `@gsap/react` (^2.0.0)
- `@/hooks/useHeroTimer` (internal)

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 12+)
- Opera: ✅ Full support

## License

Part of The Elites Solutions website. All rights reserved.
