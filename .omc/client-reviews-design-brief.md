# Client Reviews Section - Design Brief

**Date:** 2026-01-30
**Component:** ClientReviews.tsx replacement
**Source Analysis:** Existing horizontal scroll testimonials section

---

## CURRENT STATE ANALYSIS

### Layout & Structure
- **Section Type:** Full-viewport pinned section (100svh)
- **Container:** Beveled background with complex clip-path polygon creating angular cuts
- **Layout Pattern:** Horizontal scrolling cards (GSAP ScrollTrigger)
- **Scroll Distance:** Dynamic calculation based on content width (1:1 ratio)
- **Card Dimensions:** 963.5px × 519px (desktop), 366px × 628px (mobile)
- **Pinning:** ScrollTrigger with `refreshPriority: -2` (calculates after ServicesCarousel)

### Animation Approach
**Current:** GSAP ScrollTrigger with manual scroll-to-position mapping
- Pinned section with `scrub: 1` for smooth scroll sync
- Progress bar animation (`scaleX` from 0 to 1)
- Horizontal translation via `translateX(progress * maxTranslateX)`
- No individual card animations or micro-interactions
- Static reveal (no stagger, no parallax depth)

**Performance considerations:**
- Uses `will-change: transform` on slider wrapper
- GPU-accelerated transforms only
- Invalidates on refresh for responsive recalculation

### Color Scheme (Dark + Gold Theme)
**Primary Colors:**
- Background: `#303030` (dark gray cards and beveled container)
- Accent: `#FFD700` (gold progress bar)
- Text Primary: `#ffffff` (white)
- Text Muted: `#6b6b6b` (gray for company/role)
- Progress Track: `#3f3f3f` (darker gray)

**Border/Effects:**
- Card border: `rgba(255, 255, 255, 0.1)` (subtle white)
- Quote icon opacity: 0.2 with gold color

### Typography
**Font Families (from globals.css):**
- **Heading:** `'FK Screamer', 'PP Editorial New', serif` (section title, client name)
- **Monospace:** `'Geist Mono', 'DM Mono', monospace` (number, company, role)
- **Serif:** `'PP Editorial New', 'Playfair Display', serif` (testimonial text, italic)

**Sizes:**
- Section title: `clamp(2.25rem, 4.5vw, 3.75rem)` - LARGE, uppercase, centered
- Client name (footer): `clamp(1.5rem, 2.2vw, 2.5rem)` - uppercase, wide letter-spacing
- Testimonial text: `clamp(0.9rem, 1.1vw, 1.15rem)` - italic, line-clamp 5
- Number/company/role: `clamp(0.75rem, 0.9vw, 0.95rem)` - uppercase

**Letter Spacing:**
- Section title: `0.15em` (very wide)
- Client name: `0.1em` (wide)
- Meta text: `0.05em` (subtle)

### Spacing & Composition
- **Section padding:** 6rem (desktop), 3rem-4rem (tablet), 2rem-3rem (mobile)
- **Split header gap:** 5rem between "Client" and "Reviews"
- **Card gap:** 1.5rem between testimonial cards
- **Internal card padding:** 2rem × 1.5rem
- **Progress bar margin:** 1.5rem vertical
- **Card structure:** Flexbox column with `space-between` (header/quote/footer)

### Card Structure (Routine Block Pattern)
```
┌─────────────────────────────────────┐
│ 01                      COMPANY NAME│  ← Header (number left, company right)
│                                     │
│         "  [Quote Icon]             │  ← Center (absolute positioned)
│     Testimonial text in italic...   │
│     Multi-line centered quote       │
│                                     │
│ CLIENT NAME               ROLE/TITLE│  ← Footer (name left, role right)
└─────────────────────────────────────┘
```

### What Works Well
1. **Polished execution:** Clean routine block card structure with consistent spacing
2. **Smooth horizontal scroll:** GSAP ScrollTrigger implementation is butter-smooth
3. **Typography hierarchy:** Clear distinction between heading, body, and meta text
4. **Progress indicator:** Visual feedback with gold progress bar
5. **Beveled container:** Unique geometric background shape adds visual interest
6. **Accessibility:** Proper semantic HTML, responsive design, reduced motion support
7. **Brand consistency:** Gold + dark theme matches site palette

### What Could Be Improved
1. **Generic layout:** Standard horizontal scroll - predictable and common pattern
2. **No micro-interactions:** Cards are static (no hover states, tilt, or depth effects)
3. **Flat animation:** Single-axis horizontal scroll lacks visual surprise
4. **Minimal motion:** No stagger reveals, parallax layers, or entrance animations
5. **Conservative typography:** Safe serif/mono pairing - lacks character
6. **Predictable composition:** Centered quote layout is functional but forgettable
7. **Converges on common choices:** Looks like many other testimonial sections

---

## SITE DESIGN LANGUAGE

### Overall Aesthetic (from codebase analysis)

**From HeroSection.tsx:**
- GSAP timeline sequences with staggered reveals
- Clip-path animations for dramatic reveals
- `power4.out` easing for smooth deceleration
- Overlay gradients for depth
- Reduced motion support

**From ServicesCarousel.tsx:**
- Vertical pinned sections with synchronized animations
- Dynamic counters that update on scroll
- Opacity-based image stacking
- Color transitions (gray → white) for active states
- 70vh scroll per item (snappy, optimized timing)

**From globals.css (Orbit Matter Design System):**
- **Primary palette:** Gold (#FFD700) on dark (#141414, #1a1a1a)
- **Effects:** Glow animations, gold borders, glassmorphism
- **Typography:** FK Screamer (headings), Geist Mono (body), PP Editorial New (serif)
- **Animations:** goldGlowPulse, scrollBounce, float, drawLine keyframes
- **Utilities:** 3D perspective, preserve-3d, text-stroke effects

**From tailwind.config.ts:**
- Dark-first approach (dark-100 through dark-500)
- Gold accent system (gold-100 through gold-500)
- Glow shadow utilities
- Perspective values (1000px, 1500px, 2000px)

---

## DESIGN DIRECTION FOR NEW SECTION

### Aesthetic Intent
**BOLD CHOICE:** **Brutalist-meets-luxury** - Raw geometric precision with refined gold accents

**Tone:** Unapologetically architectural. Confident. Editorial. High-contrast drama.

**Differentiation Hook:** "Testimonials that feel like art gallery installations"

### What to MAINTAIN (Brand Consistency)

#### Color Palette
- ✅ **Dark + Gold foundation** (#141414, #1a1a1a backgrounds + #FFD700 accents)
- ✅ **High contrast** (white text on dark, gold highlights)
- ✅ **Muted secondary colors** (gray #6b6b6b for meta text)

#### Typography Families
- ✅ **FK Screamer** for bold statements (section titles, client names)
- ✅ **Geist Mono** for technical metadata (numbers, roles)
- ✅ **PP Editorial New** for testimonial body copy (serif, editorial feel)

#### Animation Philosophy
- ✅ **GSAP-first** (site standard, not Framer Motion for consistency)
- ✅ **ScrollTrigger pinning** (established pattern from Services section)
- ✅ **Reduced motion support** (accessibility requirement)
- ✅ **GPU-accelerated transforms** (performance priority)

#### Structural Elements
- ✅ **Full-viewport sections** (100svh standard)
- ✅ **Progress indicators** (visual scroll feedback)
- ✅ **Responsive breakpoints** (768px, 1024px, 480px)

### What to CHANGE (Creative Opportunity)

#### Layout & Composition
- ❌ **REJECT:** Horizontal scroll (too common, predictable)
- ✅ **NEW:** Vertical masonry or stacked reveal with asymmetric grid
- ✅ **NEW:** Breaking the grid - overlapping cards, diagonal flow, unexpected positioning
- ✅ **NEW:** Multi-column layout with offset timing (parallax depth between columns)

#### Animation Style
- ❌ **REJECT:** Static cards with single-axis scroll
- ✅ **NEW:** Layered animations - cards reveal with stagger + individual micro-interactions
- ✅ **NEW:** 3D depth using `perspective`, `rotateX/Y`, `translateZ`
- ✅ **NEW:** Scroll-triggered reveals with split text or line-by-line fade-ins
- ✅ **NEW:** Hover states with tilt, glow, or elevation changes
- ✅ **NEW:** Entrance orchestration - one well-timed page load sequence beats scattered effects

#### Typography Treatment
- ❌ **REJECT:** Generic font pairings (keep families but push usage)
- ✅ **NEW:** Extreme size contrast (massive client names, tiny meta text)
- ✅ **NEW:** Text-stroke outlined headings for brutalist edge
- ✅ **NEW:** Oversized quote marks as graphic elements (not subtle icons)
- ✅ **NEW:** Experimental layout - vertical text, rotated elements, broken alignment

#### Visual Details
- ❌ **REJECT:** Flat cards with minimal decoration
- ✅ **NEW:** Gradient meshes or noise textures on cards (atmosphere)
- ✅ **NEW:** Dramatic shadows with gold glow (depth + brand tie-in)
- ✅ **NEW:** Geometric patterns or decorative borders (brutalist detailing)
- ✅ **NEW:** Layered transparencies (glassmorphism with gold tint)

#### Spatial Composition
- ❌ **REJECT:** Predictable centered layout
- ✅ **NEW:** Asymmetry - cards of different sizes, non-uniform spacing
- ✅ **NEW:** Generous negative space OR controlled density (pick one extreme)
- ✅ **NEW:** Diagonal flow or Z-pattern reading path
- ✅ **NEW:** Overlapping elements with clear hierarchy

---

## ANIMATION LIBRARY REQUIREMENTS

**MANDATORY:** Use approved libraries from CLAUDE.md Animation Libraries section

### GSAP (Primary - Site Standard)
**Use for:**
- ScrollTrigger section pinning and progress tracking
- Timeline sequences for entrance animations
- Complex scroll-based transformations
- Text reveals (SplitText if available)

**Implementation pattern:**
```tsx
useGSAP(() => {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: sectionRef.current,
    start: "top top",
    end: () => `+=${window.innerHeight * 3}`,
    pin: true,
    scrub: true,
    invalidateOnRefresh: true,
    refreshPriority: -3, // Calculate after ServicesCarousel (-1) and existing ClientReviews (-2)
    onUpdate: (self) => {
      // Animation logic
    }
  });
}, { scope: sectionRef });
```

### Framer Motion (Secondary - Optional for Micro-Interactions)
**Use for:**
- Hover/tap gestures on individual cards (`whileHover`, `whileTap`)
- Scroll-triggered reveals (`whileInView` with `viewport={{ once: true }}`)
- Spring physics for playful interactions

**Only if it adds value beyond GSAP** - avoid mixing if possible for consistency

### react-scroll-parallax (Optional - Only if Multi-Layer Depth Needed)
**Use for:**
- Background/foreground speed differential (parallax depth)
- Multi-layer scrolling effects

---

## TECHNICAL CONSTRAINTS

### Framework & Stack
- **React 18+ with Next.js** (App Router)
- **TypeScript** (strict typing required)
- **CSS Modules** for styling (not Tailwind for components)
- **GSAP + @gsap/react** (useGSAP hook for cleanup)

### Performance Requirements
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Animations:** 60fps (use `will-change` sparingly)
- **GPU acceleration:** `transform` and `opacity` only

### Accessibility
- ✅ Semantic HTML (`<section>`, `<blockquote>`, `<cite>`)
- ✅ ARIA labels where appropriate
- ✅ Reduced motion support (disable animations if `prefers-reduced-motion`)
- ✅ Keyboard navigation (if interactive elements)
- ✅ Color contrast (WCAG AA minimum)

### Responsive Design
- **Desktop:** 1024px+ (full experience)
- **Tablet:** 768px - 1023px (simplified layout)
- **Mobile:** < 768px (vertical stack, touch-optimized)

---

## CREATIVE CONSTRAINTS

### Anti-Patterns (NEVER)
- ❌ Generic fonts beyond approved list (NO Inter, Roboto, Arial, Space Grotesk)
- ❌ Purple gradients on white (AI slop aesthetic)
- ❌ Cookie-cutter layouts (centered cards in a row)
- ❌ Predictable scroll patterns (just horizontal or just vertical fade-in)
- ❌ Default component libraries (build custom)

### Mandatory Differentiation
**The ONE thing people will remember:**
> "The testimonials section that looked like an architecture journal spread"

**Success criteria:**
- Someone should screenshot this section
- Layout should feel intentionally designed for THIS brand, not reusable
- Animation should surprise (not just function)

---

## CONTENT REQUIREMENTS

### Testimonial Data Structure
```typescript
interface Testimonial {
  id: number;
  copy: string; // Quote text
  author: string; // Client name
  role: string; // Job title
  company: string; // Company name
}
```

**Existing testimonials:** 6 clients (see ClientReviews.tsx for content)

### Content Hierarchy (by visual weight)
1. **Testimonial quote** (primary, largest visual weight)
2. **Client name** (secondary, brand trust signal)
3. **Company name** (tertiary, context)
4. **Role/number** (metadata, smallest)

---

## NEXT STEPS

### Design Phase
1. **Sketch 3 layout concepts** (asymmetric grid, diagonal stack, overlapping masonry)
2. **Choose animation style** (3D tilt cards vs. flat stagger vs. parallax layers)
3. **Define typography scale** (extreme size contrast ratios)
4. **Plan scroll choreography** (what animates when, in what order)

### Implementation Phase
1. **Component structure** (React + TypeScript)
2. **GSAP ScrollTrigger setup** (pinning, progress tracking)
3. **Card animations** (entrance, hover, scroll-based)
4. **Responsive breakpoints** (mobile-first approach)
5. **Accessibility audit** (reduced motion, semantic HTML, ARIA)

### Verification Phase
1. **Performance testing** (Lighthouse, 60fps check)
2. **Cross-browser testing** (Chrome, Safari, Firefox)
3. **Responsive testing** (mobile, tablet, desktop)
4. **Accessibility testing** (screen reader, keyboard navigation)

---

## INSPIRATION KEYWORDS

**For visual research:**
- Brutalist web design
- Editorial layout testimonials
- Asymmetric card grids
- Architectural web sections
- High-contrast typography
- Geometric UI patterns
- 3D card hover effects
- Scroll-triggered reveals

**Avoid these references:**
- Generic testimonial sliders
- Centered card carousels
- Soft gradients and rounded corners
- Minimalist white backgrounds
- Standard review layouts

---

**End of Design Brief**
