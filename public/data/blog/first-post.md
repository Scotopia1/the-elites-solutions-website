# How We Built Our New Website

In the ever-evolving landscape of web development, creating a website that stands out requires more than just aesthetic appeal—it demands a thoughtful blend of cutting-edge technology, seamless user experience, and scalable architecture.

## The Vision

Our goal was clear: build a digital experience that not only showcases our expertise but also delivers exceptional performance and accessibility. We wanted to create a platform that would serve as a testament to modern web development best practices.

### Key Objectives

- **Performance First**: Sub-second page loads with optimal Core Web Vitals
- **Engaging Interactions**: Smooth animations that enhance rather than distract
- **Content Flexibility**: Easy-to-manage content structure for future growth
- **Accessibility**: WCAG 2.1 AA compliance across all pages
- **SEO Optimization**: Built-in best practices for search engine visibility

## Technology Stack

After careful consideration, we selected a modern tech stack that would give us the flexibility and power we needed:

### Frontend Framework

We chose **Next.js 15** with the App Router for several compelling reasons:

```typescript
// Example: Server Component with dynamic data loading
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

The App Router provides:
- Built-in server components for optimal performance
- Streaming SSR for faster perceived load times
- Simplified data fetching with async/await
- Automatic code splitting and prefetching

### Animation Libraries

We implemented a dual-animation strategy using both **GSAP** and **Framer Motion**:

**GSAP** powers our scroll-based storytelling:
- ScrollTrigger for pinned sections and parallax effects
- Timeline animations for complex sequences
- Performance-optimized transforms

**Framer Motion** handles UI interactions:
- Declarative animation syntax
- Spring physics for natural movement
- Layout animations and shared element transitions

> "The right animation library isn't about choosing the most popular one—it's about selecting the tool that best solves your specific animation challenges." - Our Lead Developer

### Styling Approach

We went with **Tailwind CSS** for its utility-first approach, enabling rapid development without sacrificing maintainability:

```css
/* Custom Tailwind configuration for brand colors */
module.exports = {
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#FFD700',
          600: '#DAA520',
        },
      },
    },
  },
};
```

## Design Philosophy

### Cinematic Experience

We drew inspiration from high-end portfolio sites and cinema to create a browsing experience that feels immersive and intentional. Every scroll reveals new content with purpose, guiding users through our story.

### Content-First Architecture

Rather than forcing content into rigid templates, we built flexible component systems that adapt to diverse content types:

1. **Service Pages**: Cinematic heroes with sequential reveals
2. **Project Showcases**: Apple-style portfolio presentations
3. **Blog Posts**: Medium-inspired reading experiences

## Performance Optimization

Performance wasn't an afterthought—it was baked into every decision:

### Image Optimization

Using Next.js Image component with automatic WebP conversion:

```tsx
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  priority
  quality={90}
/>
```

### Code Splitting

Dynamic imports for heavy components that aren't immediately needed:

```typescript
const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false,
});
```

### Results

Our optimization efforts paid off with impressive Core Web Vitals:
- **LCP**: 1.2s (Good)
- **FID**: 45ms (Good)
- **CLS**: 0.02 (Good)

## Challenges We Overcame

### ScrollTrigger + Lenis Integration

Getting GSAP's ScrollTrigger to work seamlessly with Lenis smooth scrolling required careful configuration:

```typescript
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  syncInterval: 17, // Sync with Lenis at 60fps
});
```

### TypeScript + Dynamic Imports

Managing types for dynamically imported JSON data required creating flexible type definitions:

```typescript
interface ProjectData {
  slug: string;
  title: string;
  // ... other fields
}

const data = await import(`@/data/projects/${slug}.json`);
const project: ProjectData = data.default || data;
```

## Lessons Learned

1. **Plan Your Animation Strategy Early**: Deciding which library handles which animations prevents conflicts and bloat
2. **Invest in Proper TypeScript Setup**: Strong typing catches errors during development, not in production
3. **Build Reusable Components**: Creating a solid component library saves time across multiple page types
4. **Performance Budget Matters**: Set clear performance targets before building features

## What's Next

As we continue to evolve this platform, we're exploring:

- **Headless CMS Integration**: Moving blog content to a dedicated CMS
- **Internationalization**: Supporting multiple languages with next-intl
- **Advanced Analytics**: Implementing custom event tracking for user insights
- **Progressive Web App**: Adding offline support and installability

## Conclusion

Building this website was a journey of continuous learning and iteration. By combining modern technologies with thoughtful design decisions, we've created a platform that not only meets our current needs but is ready to scale with us into the future.

The key takeaway? Great websites are built by teams who care about every detail—from the first pixel to the last line of code.

---

**Have questions about our tech stack or want to discuss your next project?** [Get in touch](/contact) with our team.
