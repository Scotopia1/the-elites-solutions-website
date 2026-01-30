# HeroSection - Quick Start Guide

⚡ Get up and running in 60 seconds.

## Step 1: Import the Component

```tsx
import { HeroSection } from "@/components/sections";
```

## Step 2: Add to Your Page

```tsx
export default function HomePage() {
  return (
    <HeroSection
      title="Your Title Here"
      imageSrc="/images/hero-bg.jpg"
      imageAlt="Descriptive alt text for accessibility"
    />
  );
}
```

## Step 3: Add a Background Image

Place an image in `/public/images/`:
- **Size**: 1920x1080 recommended
- **Format**: JPG or WebP
- **File size**: <200KB (use compression)

## ✅ Done!

---

## Add More Features (Optional)

### With Subtitle & Description
```tsx
<HeroSection
  title="Elite Solutions"
  subtitle="Where Innovation Meets Excellence"
  description="We transform businesses with cutting-edge digital solutions."
  imageSrc="/images/hero-bg.jpg"
  imageAlt="Modern office space"
/>
```

### With Timer
```tsx
<HeroSection
  title="Your Title"
  imageSrc="/images/hero-bg.jpg"
  imageAlt="Background"
  showTimer={true}  // Shows "Zone 02 __ 14:30" format
/>
```

### With Callout Badges
```tsx
<HeroSection
  title="Your Title"
  imageSrc="/images/hero-bg.jpg"
  imageAlt="Background"
  callouts={[
    { icon: "⚡", text: "Fast Delivery" },
    { icon: "🎯", text: "Precision Work" },
    { icon: "🚀", text: "Scalable Solutions" },
  ]}
/>
```

### Full Example
```tsx
<HeroSection
  title="Elite Solutions"
  subtitle="Where Innovation Meets Excellence"
  description="We transform businesses with cutting-edge digital solutions."
  imageSrc="/images/hero-bg.jpg"
  imageAlt="Modern office space with technology"
  showTimer={true}
  callouts={[
    { icon: "⚡", text: "Fast Delivery" },
    { icon: "🎯", text: "Precision Work" },
    { icon: "🚀", text: "Scalable Solutions" },
  ]}
/>
```

---

## Props Reference

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `title` | `string` | ✅ Yes | - |
| `imageSrc` | `string` | ✅ Yes | - |
| `imageAlt` | `string` | ✅ Yes | - |
| `subtitle` | `string` | ❌ No | `undefined` |
| `description` | `string` | ❌ No | `undefined` |
| `showTimer` | `boolean` | ❌ No | `false` |
| `callouts` | `Array<{icon?: string; text: string}>` | ❌ No | `[]` |
| `className` | `string` | ❌ No | `""` |

---

## Design System

- **Background**: Dark (#141414)
- **Accent**: Gold (#FFD700)
- **Font**: SCHABO (heading), Host Grotesk (body)
- **Animation**: GSAP clip-path reveal (1.2s)

---

## Need More Examples?

See `HeroSection.example.tsx` for 11 complete examples:
1. Full-featured hero
2. Minimal hero
3. Product launch
4. Service landing
5. About page
6. Dynamic CMS content
7. Time-based greeting
8. Event/conference
9. Portfolio/agency
10. Custom styling
11. Internationalization (i18n)

## Full Documentation

See `HeroSection.README.md` for:
- Complete API reference
- Animation details
- Responsive breakpoints
- Accessibility features
- Performance optimization
- Best practices

---

**Status**: ✅ Production-ready
**Build**: Verified successful
**Accessibility**: WCAG 2.1 AA compliant
