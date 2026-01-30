# TeamSection Component

A visually striking team showcase component with carousel functionality, featuring the Orbit Matter gold aesthetic.

## Features

- **Counter Display**: Large gold counter showing current team member (01, 02, 03...)
- **Auto-Play Carousel**: Automatic rotation with configurable interval
- **Pause on Hover**: User-friendly interaction that pauses auto-play
- **Smooth Transitions**: Direction-aware slide animations using Framer Motion
- **Navigation Controls**: Previous/Next buttons with hover effects
- **Progress Indicator**: Clickable dots showing current position
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: ARIA labels, keyboard navigation, reduced motion support
- **Social Links**: Optional LinkedIn and Twitter integration
- **Premium Aesthetic**: Gold accents, geometric frames, and sophisticated animations

## Installation

The component uses the following dependencies (already in package.json):
- `motion` (Framer Motion) for animations
- `next/image` for optimized images

## Basic Usage

```tsx
import { TeamSection } from "@/components/sections/TeamSection";

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Chief Executive Officer",
    bio: "Visionary leader with 15+ years of experience...",
    image: "/images/team/sarah-chen.jpg",
    linkedin: "https://linkedin.com/in/sarahchen",
    twitter: "https://twitter.com/sarahchen",
  },
  // ... more members
];

export default function AboutPage() {
  return (
    <TeamSection
      title="Meet the Team"
      members={teamMembers}
      autoPlay={true}
      interval={5000}
    />
  );
}
```

## Props

### TeamSectionProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Meet the Team"` | Section heading text |
| `members` | `TeamMember[]` | *required* | Array of team member objects |
| `autoPlay` | `boolean` | `true` | Enable automatic carousel rotation |
| `interval` | `number` | `5000` | Time between slides (milliseconds) |
| `className` | `string` | `""` | Additional CSS classes |

### TeamMember

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | ✅ | Team member's name |
| `role` | `string` | ✅ | Job title or position |
| `bio` | `string` | ❌ | Biography text |
| `image` | `string` | ✅ | Path to team member photo |
| `linkedin` | `string` | ❌ | LinkedIn profile URL |
| `twitter` | `string` | ❌ | Twitter/X profile URL |

## Examples

### Default Configuration

```tsx
<TeamSection
  members={teamMembers}
  autoPlay={true}
  interval={5000}
/>
```

### Manual Navigation Only

```tsx
<TeamSection
  members={teamMembers}
  autoPlay={false}
/>
```

### Faster Auto-Play

```tsx
<TeamSection
  title="Our Founders"
  members={founderMembers}
  interval={3000}
/>
```

### With Custom Styling

```tsx
<TeamSection
  members={teamMembers}
  className="my-20 border-y border-[var(--orbit-gold-100)] border-opacity-20"
/>
```

## Image Requirements

- **Aspect Ratio**: 3:4 (portrait orientation)
- **Recommended Size**: 800x1066px minimum
- **Format**: JPG, PNG, or WebP
- **Optimization**: Use Next.js Image component (automatic)

Example structure:
```
public/
  images/
    team/
      john-doe.jpg
      jane-smith.jpg
      ...
```

## Styling

The component uses Orbit Matter design tokens:

- `--orbit-gold-100`: Primary gold (#FFD700)
- `--orbit-gold-200`: Medium gold (#F4C430)
- `--orbit-gold-300`: Dark gold (#B8860B)
- `--orbit-dark-100`: Secondary dark (#1a1a1a)
- `--orbit-dark-200`: Primary dark (#141414)

### Custom Styling

Add additional classes via the `className` prop:

```tsx
<TeamSection
  members={members}
  className="py-32 bg-gradient-to-b from-black to-[var(--orbit-dark-200)]"
/>
```

## Accessibility

- **ARIA Labels**: Navigation buttons include descriptive labels
- **Keyboard Navigation**: Tab through controls, Enter/Space to activate
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Semantic HTML**: Proper heading hierarchy and structure
- **Alt Text**: Images require alt text via `name` field

## Animations

The component uses Framer Motion for premium animations:

- **Slide Transition**: Direction-aware horizontal slide (spring physics)
- **Counter Animation**: Scale and opacity fade
- **Progress Bar**: Width animation under counter
- **Hover Effects**: Scale transforms on buttons and image
- **Social Links**: Fill animation on hover

## Performance

- **Lazy Loading**: Images load on-demand via Next.js Image
- **Auto-cleanup**: Interval cleared on unmount
- **Optimized Re-renders**: State updates minimized
- **GPU Acceleration**: Transform and opacity animations

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Troubleshooting

### Images Not Showing

Ensure images are in the `public` directory:
```
public/images/team/member-name.jpg
```

Reference them without `/public`:
```tsx
image: "/images/team/member-name.jpg"
```

### Auto-Play Not Working

Check that:
1. `autoPlay` is set to `true`
2. Multiple members exist (`members.length > 1`)
3. Component is not being hovered

### Animations Not Smooth

1. Verify Framer Motion is installed: `npm list motion`
2. Check for conflicting CSS transitions
3. Ensure `prefers-reduced-motion` is not enabled in OS settings

## Migration from Other Components

If migrating from a different team component:

```tsx
// Old component
<OldTeamGrid members={members} columns={3} />

// New TeamSection (carousel)
<TeamSection members={members} autoPlay={true} />
```

## Design Philosophy

This component embodies **bold minimalism** with the Orbit Matter aesthetic:

- **Geometric Precision**: Sharp borders, corner accents, clean lines
- **Metallic Luxury**: Gold accents suggest premium quality
- **Breathing Space**: Generous padding and negative space
- **Purposeful Motion**: Every animation serves the user experience
- **Typography Hierarchy**: FK Screamer for headings, mono for counters

The design avoids common pitfalls:
- ❌ Generic sans-serif fonts (Inter, Roboto)
- ❌ Overused purple gradients
- ❌ Cookie-cutter card layouts
- ✅ Distinctive typefaces (FK Screamer, DM Mono)
- ✅ Memorable gold color scheme
- ✅ Unique carousel interaction pattern

## File Structure

```
src/components/sections/
  TeamSection.tsx              # Main component
  TeamSection.module.css       # Custom styles
  TeamSection.example.tsx      # Usage examples
  README.md                    # This file
```

## License

Part of The Elites Solutions website component library.

## Support

For issues or questions, contact the development team.
