# IntroSection Quick Reference

## Import
```tsx
import { IntroSection } from "@/components/sections/IntroSection";
```

## Basic Usage
```tsx
<IntroSection
  label="MISSION"
  title="Building Excellence"
  content="Long-form mission statement here..."
/>
```

## With Image
```tsx
<IntroSection
  label="VISION"
  title="Our Vision"
  content="Vision statement..."
  imageSrc="/images/team.jpg"
  imageAlt="Team photo"
/>
```

## Props
| Prop | Type | Required | Default |
|------|------|----------|---------|
| `label` | `string` | No | `"MISSION"` |
| `title` | `string` | **Yes** | - |
| `content` | `string` | **Yes** | - |
| `imageSrc` | `string` | No | `undefined` |
| `imageAlt` | `string` | No | `""` |
| `className` | `string` | No | `""` |

## Key Features
- ⚡ GSAP flicker animation on label
- 📜 Scroll-triggered content reveal
- 🖼️ Optional side image
- 📱 Responsive grid → stack
- 🎨 Drop cap first letter
- ♿ Reduced motion support

## Layout
- **Desktop**: 2-column grid (text | image)
- **Mobile**: Stacked (text → image)
- **Gap**: 6rem desktop, 3rem mobile

## Animations
| Element | Effect | Trigger | Duration |
|---------|--------|---------|----------|
| Label | Flicker (5x) | 70% viewport | ~0.3s |
| Content | Fade + slide up | 75% viewport | 1.2s |
| Image | Fade + slide + scale | 75% viewport | 1.4s |

## Styling Notes
- **Label**: Gold border glow, uppercase, monospace
- **Title**: SCHABO font, 2.5-4.5rem, white
- **Copy**: Host Grotesk, 1.1-1.35rem, 75% opacity
- **Drop cap**: First letter 1.8x size, gold color
- **Image**: Grayscale 30%, hover removes filter

## Examples

### Text Only
```tsx
<IntroSection
  title="Our Philosophy"
  content="We believe in excellence..."
/>
```

### Custom Label
```tsx
<IntroSection
  label="APPROACH"
  title="How We Work"
  content="Our methodology..."
/>
```

### Full Options
```tsx
<IntroSection
  label="MISSION"
  title="Building Excellence"
  content="Our mission is..."
  imageSrc="/team.jpg"
  imageAlt="The team"
  className="custom-spacing"
/>
```

## Common Patterns

### About Page Intro
```tsx
<IntroSection
  label="MISSION"
  title="Building Excellence Through Innovation"
  content="At The Elites Solutions, we believe..."
  imageSrc="/images/team-photo.jpg"
  imageAlt="The Elites team"
/>
```

### Philosophy Section
```tsx
<IntroSection
  label="PHILOSOPHY"
  title="The Art of Problem Solving"
  content="Every challenge is an opportunity..."
/>
```

## Files
- **Component**: `src/components/sections/IntroSection.tsx`
- **Styles**: `src/components/sections/IntroSection.module.css`
- **Docs**: `src/components/sections/IntroSection.README.md`
- **Test**: `src/app/test-intro/page.tsx`
