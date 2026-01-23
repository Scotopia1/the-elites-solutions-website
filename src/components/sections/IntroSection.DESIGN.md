# IntroSection Design Specification

## Visual Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌──────────────────┐                                  │
│  │  [M I S S I O N] │  ← Flicker label (gold glow)    │
│  └──────────────────┘                                  │
│                                                         │
│  BUILDING EXCELLENCE                                   │
│  THROUGH INNOVATION         ┌──────────────────┐      │
│                              │                  │      │
│  Every challenge is an       │                  │      │
│  opportunity in disguise.    │     [Image]      │      │
│  We approach complex         │                  │      │
│  problems with curiosity...  │                  │      │
│                              │                  │      │
│                              └──────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
     Text Column (50%)           Image Column (50%)
```

## Color System

### Primary Colors
```css
--background-gradient:
  linear-gradient(180deg, #141414 0%, #0a0a0a 50%, #141414 100%)

--gold-primary: #FFD700
--gold-glow: rgba(255, 215, 0, 0.3)
--white-primary: #FFFFFF
--white-secondary: rgba(255, 255, 255, 0.75)
```

### Label Styling
```css
background: linear-gradient(135deg,
  rgba(255, 215, 0, 0.05) 0%,
  rgba(255, 215, 0, 0.02) 100%
)
border: 1px solid rgba(255, 215, 0, 0.3)
box-shadow:
  0 0 20px rgba(255, 215, 0, 0.15),
  inset 0 0 20px rgba(255, 215, 0, 0.05)
text-shadow: 0 0 10px rgba(255, 215, 0, 0.5)
```

### Image Effects
```css
filter: grayscale(30%) contrast(1.1)
box-shadow:
  0 20px 60px rgba(0, 0, 0, 0.5),
  0 0 40px rgba(255, 215, 0, 0.1)

/* Noise overlay */
background: url("data:image/svg+xml...")
mix-blend-mode: overlay
opacity: 0.05
```

## Typography Scale

```
Label:    0.75-0.85rem  (Geist Mono, 700, 0.25em spacing)
Copy:     1.1-1.35rem   (Host Grotesk, 300, 0.01em spacing)
Title:    2.5-4.5rem    (SCHABO, 500, -0.03em spacing)
Drop Cap: 1.8× copy size (Gold, 500)
```

## Spacing System

### Section Padding
```
Desktop:  10rem top/bottom
Tablet:   7rem top/bottom
Mobile:   5rem top/bottom
```

### Grid Gaps
```
Desktop:  6rem column gap
Tablet:   4rem column gap
Mobile:   3rem vertical gap (stacked)
```

### Internal Spacing
```
Label margin-bottom:   3rem (desktop), 2rem (mobile)
Title margin-bottom:   2rem (desktop), 1.5rem (mobile)
Content max-width:     600px
```

## Animation Timeline

```
User scrolls to section
        ↓
    70% viewport
        ↓
┌───────────────────┐
│ LABEL FLICKER     │ ← 5 rapid toggles (~0.3s)
└───────────────────┘
        ↓
    75% viewport
        ↓
┌───────────────────┐
│ CONTENT FADE-IN   │ ← Fade + slide up (1.2s)
│ IMAGE REVEAL      │ ← Fade + slide + scale (1.4s)
└───────────────────┘
```

## Breakpoint Behavior

### Desktop (> 768px)
```
Grid: 1fr 1fr (50% / 50%)
Gap: 6rem horizontal
Label: 0.85rem
Title: 4.5rem max
Copy: 1.35rem max
Image: 4:5 aspect ratio
```

### Tablet (768px - 1024px)
```
Grid: 1fr 1fr (maintained)
Gap: 4rem horizontal
Label: 0.75rem
Title: Fluid scaling
Copy: Fluid scaling
```

### Mobile (< 768px)
```
Grid: 1fr (stacked)
Gap: 3rem vertical
Order: Text → Image
Image: 16:11 aspect ratio
```

## Component States

### Initial (Before Scroll)
```
Label:   opacity: 0
Content: opacity: 0, y: +40px
Image:   opacity: 0, x: +60px, scale: 0.95
```

### Animated (After Trigger)
```
Label:   opacity: 1 (with flicker)
Content: opacity: 1, y: 0
Image:   opacity: 1, x: 0, scale: 1
```

### Image Hover
```
filter: grayscale(0%) contrast(1.15)
transform: scale(1.05)
transition: 0.6s cubic-bezier(0.4, 0, 0.2, 1)
```

## Aesthetic DNA

### Refined Brutalist
- **Bold**: Extreme typography scale (4.5rem titles)
- **Raw**: Exposed borders, minimal decoration
- **Precise**: Geometric shapes, clean lines
- **Dramatic**: Deep shadows, high contrast

### Digital Transmission
- **Flicker**: Suggests radio/digital signal
- **Glow**: Neon-like gold accents
- **Grain**: Noise texture for analog feel
- **Monospace**: Tech-forward label font

### Editorial Quality
- **Drop cap**: Magazine-style first letter
- **Line height**: Generous 1.75 for readability
- **Weight contrast**: Light body (300) vs bold headers (500)
- **Negative space**: Ample padding and margins

## Accessibility Features

### WCAG Compliance
```
Label contrast:  Gold on dark (AA+)
Title contrast:  White on dark (AAA)
Copy contrast:   75% white on dark (AA)
```

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  .image,
  .imageWrapper:hover .image {
    transition: none;
    transform: none;
  }
}
```

### Semantic HTML
```html
<section>          ← Landmark region
  <h2>             ← Proper heading hierarchy
  <p>              ← Body content
  <Image />        ← Alt text required
</section>
```

## Performance Optimizations

### GPU Acceleration
```css
will-change: transform, opacity
transform: translateZ(0)  /* Force 3D */
```

### Animation Efficiency
```javascript
scrollTrigger: {
  once: true,  // Fire only once
  // ... prevents re-triggering
}
```

### Image Loading
```tsx
<Image
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"  // Automatic in Next.js
/>
```

## Design Inspiration

- **Brutalism**: Raw, honest, functional
- **Neon aesthetics**: Glowing gold accents
- **Editorial design**: Drop caps, generous line-height
- **Sci-fi interfaces**: Digital flicker, transmission effects
- **Art Deco**: Geometric precision, luxury materials

## Related Design Systems

Similar aesthetic to:
- **Observatory** intro sections (plan reference)
- **StatsSection** (shared color palette)
- **CTASection** (shared typography)

## Usage Context

Best suited for:
- ✅ About page introductions
- ✅ Mission/vision statements
- ✅ Philosophy explanations
- ✅ Approach descriptions
- ❌ Product features (too editorial)
- ❌ Pricing sections (too decorative)
- ❌ Blog posts (too bold)

## Design Checklist

Before shipping:
- [ ] High-quality images (min 1200px wide)
- [ ] Meaningful alt text
- [ ] Content fits within max-width
- [ ] Dark background maintained
- [ ] Test on mobile devices
- [ ] Verify flicker timing
- [ ] Check scroll triggers
- [ ] Validate contrast ratios
- [ ] Test with reduced motion
- [ ] Proofread all copy
