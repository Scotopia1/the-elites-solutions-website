# FAQAccordion Component

A brutalist-minimal FAQ accordion component with theatrical GSAP animations, gold accents, and smooth expand/collapse transitions. Inspired by Orbit Matter's Contact page aesthetic.

## Features

- ✅ **GSAP-powered animations**: Smooth height transitions and arrow rotations with back easing
- ✅ **Accordion behavior**: Only one item open at a time
- ✅ **Theatrical interactions**: Hover effects with sliding gold backgrounds
- ✅ **Accessibility**: ARIA attributes, keyboard navigation, focus states
- ✅ **Responsive design**: Mobile-optimized with stacked layouts on small screens
- ✅ **Reduced motion support**: Respects user preferences
- ✅ **High contrast mode**: Enhanced visibility for accessibility

## Design Aesthetic

**Brutalist/Minimal** with gold accents:
- **Typography**: nm/FK Screamer for headings (uppercase, tight tracking), DM Mono for questions (monospace, tech-forward)
- **Color palette**: Dark backgrounds (#141414) with gold text (#FFD700) and subtle gold glows
- **Borders**: Thin gold borders (rgba(255, 215, 0, 0.2)) creating structured geometry
- **Animation style**: Theatrical expand/collapse with back easing for arrow rotation
- **Hover effects**: Sliding gold background overlays with padding shifts

## Usage

### Basic Example

```tsx
import FAQAccordion from "@/components/sections/FAQAccordion";

export default function ContactPage() {
  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We specialize in web development, mobile apps, and digital transformation.",
    },
    {
      question: "How long does a project take?",
      answer: "Timelines vary from 2-4 weeks for simple sites to 3-6 months for complex applications.",
    },
  ];

  return <FAQAccordion faqs={faqs} />;
}
```

### With Custom Title

```tsx
<FAQAccordion
  title="Got Questions?"
  faqs={faqs}
  className="my-custom-class"
/>
```

### Full Example (Contact Page)

```tsx
const contactFAQs = [
  {
    question: "What services does The Elites Solutions offer?",
    answer:
      "We specialize in full-stack web development, mobile applications, custom software solutions, UI/UX design, and digital transformation consulting.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope. Simple websites take 2-4 weeks, while complex applications can take 3-6 months.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "We offer flexible pricing: fixed-price projects, time and materials, and retainer agreements. Contact us for a custom quote.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes, we offer comprehensive post-launch support including bug fixes, security updates, and feature enhancements.",
  },
];

return (
  <main>
    <ContactHero />
    <ContactForm />
    <FAQAccordion title="Frequently Asked Questions" faqs={contactFAQs} />
  </main>
);
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Frequently Asked Questions"` | Section heading |
| `faqs` | `FAQItem[]` | **required** | Array of question/answer objects |
| `className` | `string` | `""` | Additional CSS classes for customization |

### FAQItem Interface

```typescript
interface FAQItem {
  question: string;  // Question text (displayed as uppercase)
  answer: string;    // Answer text (supports multiline)
}
```

## Animation Details

### Initial Reveal (Page Load)
- **Title**: Fades in from below (y: 30) over 0.8s
- **FAQ Items**: Stagger in (0.1s delay each) from below (y: 20)
- **First Item**: Auto-opens on mount with smooth height animation

### Expand/Collapse
- **Height transition**: 0.5s with `power2.out` easing
- **Opacity**: Fades in/out with height transition
- **Arrow rotation**: 180° rotation with `back.out(2)` easing (bouncy effect)
- **Timing**: Close previous item → Open new item (sequential)

### Hover Effects
- **Background**: Sliding gold overlay from left (0 → 100% width)
- **Padding shift**: Question text shifts right by 0.5rem
- **Arrow glow**: Enhanced drop shadow on hover

## Accessibility

### ARIA Attributes
- `aria-expanded`: Indicates open/closed state
- `aria-controls`: Links button to answer region
- `role="region"`: Defines answer as a distinct section
- `aria-labelledby`: Connects answer to question

### Keyboard Navigation
- **Tab**: Focus next/previous FAQ item
- **Enter/Space**: Toggle expand/collapse
- **Focus visible**: Gold outline for keyboard users

### Screen Readers
- Questions announced as buttons
- Expanded state communicated
- Answer content read when opened

## Responsive Breakpoints

### Desktop (> 768px)
- **Container**: Max-width 900px, centered
- **Question padding**: 2rem vertical, 2.5rem horizontal
- **Font sizes**: Full clamp ranges (1.25rem questions, 1.1rem answers)

### Tablet (≤ 768px)
- **Container padding**: Reduced to 1.5rem
- **Question padding**: 1.5rem
- **Font sizes**: Mid-range clamp values

### Mobile (≤ 480px)
- **Container padding**: 1rem
- **Question layout**: Stacked (question on top, arrow below)
- **Answer padding**: Reduced to 1rem
- **Border widths**: Thinner (2px → 1px)

## Customization

### Color Overrides

The component uses CSS variables from `globals.css`. Override in a parent component:

```css
.customFAQ {
  --orbit-gold-100: #00ff00; /* Green instead of gold */
  --orbit-dark-200: #000000; /* Pure black background */
}
```

```tsx
<FAQAccordion faqs={faqs} className="customFAQ" />
```

### Typography Overrides

Change fonts by targeting CSS modules:

```css
/* YourPage.module.css */
.customFAQ :global(.faqSection) h2 {
  font-family: "Your Custom Font", sans-serif;
}
```

## Performance Considerations

### GSAP Optimization
- Uses `useGSAP` hook for automatic cleanup
- Scoped animations to container (prevents memory leaks)
- `will-change` NOT used (GSAP handles GPU acceleration)

### Rendering
- Refs prevent unnecessary re-renders
- State only tracks active index (minimal re-renders)
- Animations run outside React render cycle

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Fallbacks**: CSS transitions for reduced motion
- **Accessibility**: WCAG 2.1 AA compliant

## File Structure

```
src/components/sections/
├── FAQAccordion.tsx              # Main component
├── FAQAccordion.module.css       # Styles
├── FAQAccordion.example.tsx      # Usage examples
└── FAQAccordion.README.md        # This file
```

## Related Components

- **CTASection**: Uses similar gold/dark aesthetic
- **InteractiveGrid**: Shares Orbit Matter design language
- **CGMWTNOV2025Hero**: Uses same gold color variables

## Credits

- **Design inspiration**: Orbit Matter Contact page
- **Animation library**: GSAP with React integration
- **Typography**: nm, DM Mono, Host Grotesk
