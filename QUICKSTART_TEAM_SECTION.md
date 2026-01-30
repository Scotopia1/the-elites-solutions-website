# TeamSection Component - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Prepare Team Images

Add team member photos to the public directory:

```bash
public/
  images/
    team/
      ceo-name.jpg        # 800x1066px recommended
      cto-name.jpg
      cdo-name.jpg
      ...
```

### Step 2: Create Team Data

Create a data file with your team information:

```tsx
// data/team.ts
import { TeamMember } from "@/components/sections";

export const teamMembers: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "Chief Executive Officer",
    bio: "Visionary leader with 15+ years of experience in digital transformation.",
    image: "/images/team/sarah-chen.jpg",
    linkedin: "https://linkedin.com/in/sarahchen",
    twitter: "https://twitter.com/sarahchen",
  },
  {
    name: "Marcus Rodriguez",
    role: "Chief Technology Officer",
    bio: "Award-winning technologist and architect of scalable systems.",
    image: "/images/team/marcus-rodriguez.jpg",
    linkedin: "https://linkedin.com/in/marcusrodriguez",
  },
  // Add more team members...
];
```

### Step 3: Use the Component

Import and use in your page:

```tsx
// app/[locale]/about/page.tsx
import { TeamSection } from "@/components/sections";
import { teamMembers } from "@/data/team";

export default function AboutPage() {
  return (
    <main>
      <TeamSection
        title="Meet Our Leadership"
        members={teamMembers}
        autoPlay={true}
        interval={5000}
      />
    </main>
  );
}
```

## ✨ That's It!

Your team carousel is now live with:
- ✅ Auto-play carousel
- ✅ Beautiful gold counter
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Accessibility support

## 🎨 Customization Options

### Change Auto-Play Speed

```tsx
<TeamSection
  members={teamMembers}
  interval={3000}  // 3 seconds instead of 5
/>
```

### Disable Auto-Play

```tsx
<TeamSection
  members={teamMembers}
  autoPlay={false}  // Manual navigation only
/>
```

### Custom Title

```tsx
<TeamSection
  title="The Visionaries"
  members={teamMembers}
/>
```

### Add Custom Styling

```tsx
<TeamSection
  members={teamMembers}
  className="py-32 border-y border-[var(--orbit-gold-100)]"
/>
```

## 📝 Team Member Fields

```typescript
interface TeamMember {
  name: string;          // Required - Full name
  role: string;          // Required - Job title
  bio?: string;          // Optional - Biography text
  image: string;         // Required - Image path
  linkedin?: string;     // Optional - LinkedIn URL
  twitter?: string;      // Optional - Twitter URL
}
```

## 🖼️ Image Guidelines

- **Aspect Ratio**: 3:4 (portrait)
- **Size**: 800x1066px minimum
- **Format**: JPG, PNG, or WebP
- **Quality**: High resolution, professional photos
- **Background**: Consistent style across team

## 🧪 Test Your Implementation

View the example at:
```
http://localhost:3000/en/test-team
```

## 💡 Common Use Cases

### Leadership Team

```tsx
<TeamSection
  title="Executive Leadership"
  members={executiveTeam}
  autoPlay={true}
  interval={5000}
/>
```

### Founders Only

```tsx
<TeamSection
  title="Our Founders"
  members={founders}
  autoPlay={false}
/>
```

### Multiple Sections

```tsx
<main>
  {/* Executives */}
  <TeamSection
    title="Leadership"
    members={executives}
  />

  {/* Founders */}
  <TeamSection
    title="Founders"
    members={founders}
    className="border-t border-[var(--orbit-gold-100)]"
  />
</main>
```

## 🎯 Design Tips

### Professional Photos
- Use consistent lighting
- Similar background styles
- Professional attire
- High-quality images

### Writing Bios
- Keep it concise (2-3 sentences)
- Highlight unique achievements
- Focus on expertise
- Include years of experience

### Social Links
- Only include active profiles
- Use full URLs
- Test links before publishing

## 📱 Mobile Optimization

The component automatically:
- Stacks vertically on mobile
- Adjusts counter size
- Optimizes image loading
- Maintains touch gestures

## ♿ Accessibility Built-In

- Screen reader support
- Keyboard navigation
- ARIA labels
- Focus indicators
- Reduced motion support

## 🔧 Troubleshooting

### Images Not Showing?
```tsx
// ❌ Wrong
image: "public/images/team/photo.jpg"

// ✅ Correct
image: "/images/team/photo.jpg"
```

### Auto-Play Not Working?
- Check `autoPlay={true}` is set
- Ensure multiple members exist
- Verify component not being hovered

### Animations Choppy?
- Check image file sizes (optimize)
- Verify GPU acceleration enabled
- Test on different browsers

## 📖 Full Documentation

For complete details, see:
- `src/components/sections/README.md` - Full documentation
- `src/components/sections/TeamSection.example.tsx` - Code examples
- `IMPLEMENTATION_COMPLETE.md` - Technical details

## 🎉 You're All Set!

Your premium team showcase is ready to impress visitors with:
- Stunning gold aesthetic
- Smooth carousel animations
- Professional presentation
- Mobile-first design

---

**Need Help?** Check the full documentation in the README.md file.

**Want to Customize?** See TeamSection.example.tsx for more configurations.
