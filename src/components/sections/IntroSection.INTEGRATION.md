# IntroSection Integration Guide

Quick guide for integrating IntroSection into the About page.

## Step 1: Import the Component

```tsx
// src/app/[locale]/about/page.tsx
import { IntroSection } from "@/components/sections";
```

## Step 2: Add to Page Layout

```tsx
export default function AboutPage() {
  return (
    <main>
      {/* Existing Hero Section */}
      <AboutHero />

      {/* NEW: Add IntroSection */}
      <IntroSection
        label="MISSION"
        title="Building Excellence Through Innovation"
        content="At The Elites Solutions, we believe in pushing boundaries and redefining what's possible. Our mission is to deliver transformative solutions that empower businesses to thrive in an ever-evolving digital landscape. Through cutting-edge technology, strategic thinking, and unwavering commitment to quality, we turn ambitious visions into reality."
        imageSrc="/images/team/team-collaboration.jpg"
        imageAlt="The Elites team collaborating on innovative solutions"
      />

      {/* Existing sections */}
      <MissionSection />
      <ValuesAccordion />
      {/* ... */}
    </main>
  );
}
```

## Step 3: Prepare Images

### Image Requirements
- **Format**: JPG or WebP
- **Dimensions**: Minimum 1200px width
- **Aspect Ratio**: 4:5 (portrait) or 1:1 (square)
- **File Size**: < 500KB (optimized)
- **Quality**: High-resolution, professional photography

### Recommended Images
- Team collaboration photos
- Office workspace shots
- Leadership portraits
- Company culture moments
- Product/service in action

### Image Location
```
public/images/about/
├── team-collaboration.jpg
├── office-workspace.jpg
├── leadership-portrait.jpg
└── company-culture.jpg
```

## Step 4: Content Guidelines

### Label Text
- **Length**: 1-2 words
- **Style**: ALL CAPS
- **Examples**: MISSION, VISION, PHILOSOPHY, APPROACH, VALUES

### Title Text
- **Length**: 3-8 words
- **Style**: Title Case or Sentence case
- **Tone**: Bold, declarative, aspirational
- **Examples**:
  - "Building Excellence Through Innovation"
  - "Shaping Tomorrow's Digital Frontier"
  - "The Art of Problem Solving"

### Content Text
- **Length**: 50-150 words (2-4 sentences)
- **Style**: Paragraph format
- **Tone**: Professional, confident, inspiring
- **Structure**:
  1. Open with strong statement
  2. Explain core belief/approach
  3. Close with impact/commitment

### Content Example
```
We believe that true innovation comes from understanding not just
what to build, but why it matters. Our mission extends beyond
delivering solutions—we craft experiences that transform how
businesses operate, grow, and succeed. Through meticulous attention
to detail, strategic foresight, and unwavering commitment to
excellence, we turn ambitious visions into measurable results.
```

## Step 5: Multiple Sections Pattern

For multiple IntroSections (Mission, Vision, Philosophy):

```tsx
<main>
  <AboutHero />

  {/* Mission - with image */}
  <IntroSection
    label="MISSION"
    title="Building Excellence Through Innovation"
    content="Our mission statement..."
    imageSrc="/images/about/mission.jpg"
    imageAlt="Mission description"
  />

  {/* Vision - text only */}
  <IntroSection
    label="VISION"
    title="Shaping Tomorrow's Digital Frontier"
    content="Our vision statement..."
  />

  {/* Philosophy - with image */}
  <IntroSection
    label="PHILOSOPHY"
    title="The Art of Problem Solving"
    content="Our philosophy..."
    imageSrc="/images/about/philosophy.jpg"
    imageAlt="Philosophy description"
  />

  {/* Rest of page */}
  <ValuesAccordion />
</main>
```

## Step 6: Spacing Adjustments (Optional)

If you need custom spacing between sections:

```tsx
<IntroSection
  label="MISSION"
  title="Building Excellence"
  content="..."
  className="mb-0"  // Remove bottom margin
/>

<IntroSection
  label="VISION"
  title="Our Vision"
  content="..."
  className="pt-0"  // Remove top padding
/>
```

Or create custom spacing utility:

```css
/* styles/utilities.module.css */
.sectionTight {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.sectionSpacious {
  padding-top: 12rem;
  padding-bottom: 12rem;
}
```

```tsx
<IntroSection
  className={utilities.sectionTight}
  // ...
/>
```

## Step 7: Accessibility Checklist

Before deploying:

- [ ] All images have descriptive alt text
- [ ] Alt text describes content, not "image of" or "photo of"
- [ ] Content is proofread and grammatically correct
- [ ] Headings follow proper hierarchy (h1 → h2 → h3)
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Test with keyboard navigation
- [ ] Verify color contrast (should be AA compliant)
- [ ] Test with animations disabled (reduced motion)

## Step 8: Testing

### Desktop Testing
```bash
npm run dev
# Navigate to http://localhost:3000/about
# Scroll to IntroSection
# Verify:
# - Flicker animation on label
# - Content fades in on scroll
# - Image reveals correctly
# - Layout is 2-column
```

### Mobile Testing
```bash
# Test in DevTools mobile view
# Verify:
# - Layout stacks (text then image)
# - Text is readable
# - Animations still work
# - No horizontal scroll
```

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] iOS Safari
- [ ] Android Chrome

## Step 9: Performance Check

```bash
# Build and analyze
npm run build

# Check for:
# - Build warnings (should be none)
# - Image optimization messages
# - Page size (should be reasonable)
```

### Lighthouse Audit
1. Open DevTools in Chrome
2. Go to Lighthouse tab
3. Run audit for About page
4. Check scores:
   - Performance: > 90
   - Accessibility: 100
   - Best Practices: 100
   - SEO: 100

## Step 10: Deploy

```bash
# Final build
npm run build

# Preview production build
npm run start

# Deploy to production
# (follow your deployment process)
```

---

## Common Issues & Solutions

### Issue: Flicker animation doesn't trigger
**Solution**: Ensure page is scrollable. Animation triggers at 70% viewport.

### Issue: Image doesn't show
**Solution**: Verify image path is correct and file exists in `/public/images/`

### Issue: Layout breaks on mobile
**Solution**: Test at actual mobile width (375px), not just responsive mode.

### Issue: Text too long, overflows
**Solution**: Limit content to 150 words max. Use multiple sections for long copy.

### Issue: Animations cause layout shift
**Solution**: This is expected behavior. Disable animations if needed via className.

### Issue: Build fails
**Solution**: Check that all imports are correct and images exist.

---

## Advanced Customization

### Custom Color Theme

Create a wrapper component:

```tsx
// components/IntroSectionCustom.tsx
import { IntroSection } from "@/components/sections";
import styles from "./IntroSectionCustom.module.css";

export function IntroSectionBlue(props) {
  return (
    <div className={styles.blueTheme}>
      <IntroSection {...props} />
    </div>
  );
}
```

```css
/* IntroSectionCustom.module.css */
.blueTheme {
  --orbit-gold-100: #4A90E2; /* Blue instead of gold */
}
```

### Disable Animations

```tsx
<IntroSection
  label="MISSION"
  title="Building Excellence"
  content="..."
  className="no-animations"
/>
```

```css
/* global.css */
.no-animations * {
  animation: none !important;
  transition: none !important;
}
```

---

## Content Templates

### Mission Statement Template
```
At [Company Name], we believe in [core value]. Our mission is to
[primary goal] that empower [target audience] to [desired outcome].
Through [key differentiators], we turn [vision] into [reality].
```

### Vision Statement Template
```
We envision a future where [ideal state]. Our commitment extends
beyond [current state]—we're building [future state], one [unit]
at a time.
```

### Philosophy Template
```
Every [challenge] is an opportunity [perspective]. We approach
[domain] with [values], ensuring that every [output] addresses
[root cause] rather than merely treating [symptoms].
```

---

## Support

- **Full Docs**: `IntroSection.README.md`
- **Quick Ref**: `IntroSection.QUICKREF.md`
- **Design Spec**: `IntroSection.DESIGN.md`
- **Test Page**: `/test-intro`

---

**Last Updated**: 2026-01-23
**Component Version**: 1.0.0
