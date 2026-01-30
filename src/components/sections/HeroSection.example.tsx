/**
 * HeroSection Usage Examples
 *
 * This file demonstrates various ways to use the HeroSection component.
 * Copy these examples into your page components.
 */

import { HeroSection } from "./HeroSection";

// ================================================
// Example 1: Full-Featured Hero
// ================================================

export function FullFeaturedHero() {
  return (
    <HeroSection
      title="Elite Solutions"
      subtitle="Where Innovation Meets Excellence"
      description="We transform businesses with cutting-edge digital solutions that drive growth, optimize operations, and create lasting competitive advantages."
      imageSrc="/images/hero-office.jpg"
      imageAlt="Modern tech office with collaborative workspace"
      showTimer={true}
      callouts={[
        { icon: "⚡", text: "Fast Delivery" },
        { icon: "🎯", text: "Precision Work" },
        { icon: "🚀", text: "Scalable Solutions" },
        { icon: "🔒", text: "Secure by Design" },
      ]}
    />
  );
}

// ================================================
// Example 2: Minimal Hero (Title Only)
// ================================================

export function MinimalHero() {
  return (
    <HeroSection
      title="Excellence"
      imageSrc="/images/abstract-gold.jpg"
      imageAlt="Abstract gold geometric pattern"
    />
  );
}

// ================================================
// Example 3: Product Launch Hero
// ================================================

export function ProductLaunchHero() {
  return (
    <HeroSection
      title="The Future is Here"
      subtitle="Introducing the Next-Gen AI Platform"
      description="Experience unprecedented performance, security, and scalability in a single unified solution."
      imageSrc="/images/product-launch-bg.jpg"
      imageAlt="Futuristic technology interface display"
      callouts={[
        { icon: "🎉", text: "Available Now" },
        { icon: "⏰", text: "Limited Offer" },
        { icon: "🎁", text: "Early Bird Pricing" },
      ]}
    />
  );
}

// ================================================
// Example 4: Service Landing Hero
// ================================================

export function ServiceLandingHero() {
  return (
    <HeroSection
      title="Web Development"
      subtitle="Build the Web Experience Your Customers Deserve"
      description="Custom web applications that combine stunning design with bulletproof performance."
      imageSrc="/images/web-dev-hero.jpg"
      imageAlt="Code editor with modern web development tools"
      showTimer={false}
      callouts={[
        { text: "Next.js" },
        { text: "React" },
        { text: "TypeScript" },
      ]}
    />
  );
}

// ================================================
// Example 5: About Page Hero
// ================================================

export function AboutPageHero() {
  return (
    <HeroSection
      title="Our Story"
      subtitle="Driven by Innovation, Defined by Results"
      imageSrc="/images/team-office.jpg"
      imageAlt="Collaborative team working on innovative projects"
      showTimer={true}
    />
  );
}

// ================================================
// Example 6: Dynamic Content from CMS
// ================================================

interface HeroContentCMS {
  heading: string;
  subheading?: string;
  bodyCopy?: string;
  backgroundImage: {
    url: string;
    alt: string;
  };
  showClock: boolean;
  badges?: Array<{
    emoji?: string;
    label: string;
  }>;
}

export function DynamicCMSHero({ content }: { content: HeroContentCMS }) {
  return (
    <HeroSection
      title={content.heading}
      subtitle={content.subheading}
      description={content.bodyCopy}
      imageSrc={content.backgroundImage.url}
      imageAlt={content.backgroundImage.alt}
      showTimer={content.showClock}
      callouts={content.badges?.map((badge) => ({
        icon: badge.emoji,
        text: badge.label,
      }))}
    />
  );
}

// ================================================
// Example 7: Homepage Hero with Time-Based Greeting
// ================================================

export function TimeBasedHero() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <HeroSection
      title={`${getGreeting()}, Partner`}
      subtitle="Ready to Build Something Extraordinary?"
      description="Let's create digital experiences that captivate, convert, and exceed expectations."
      imageSrc="/images/hero-dynamic.jpg"
      imageAlt="Dynamic hero background matching time of day"
      showTimer={true}
      callouts={[
        { icon: "💡", text: "Strategy" },
        { icon: "🎨", text: "Design" },
        { icon: "⚙️", text: "Development" },
        { icon: "📈", text: "Growth" },
      ]}
    />
  );
}

// ================================================
// Example 8: Event/Conference Hero
// ================================================

export function EventHero() {
  return (
    <HeroSection
      title="Tech Summit 2026"
      subtitle="March 15-17 | San Francisco"
      description="Join 5,000+ innovators, founders, and tech leaders for three days of breakthrough ideas and game-changing connections."
      imageSrc="/images/conference-hall.jpg"
      imageAlt="Large modern conference hall filled with attendees"
      showTimer={true}
      callouts={[
        { icon: "🎤", text: "50+ Speakers" },
        { icon: "🌐", text: "Global Networking" },
        { icon: "🏆", text: "Startup Pitch" },
      ]}
    />
  );
}

// ================================================
// Example 9: Portfolio/Agency Hero
// ================================================

export function PortfolioHero() {
  return (
    <HeroSection
      title="Award-Winning Work"
      subtitle="Digital Experiences That Define Industries"
      description="From Fortune 500 giants to disruptive startups, we craft digital solutions that set new standards."
      imageSrc="/images/portfolio-showcase.jpg"
      imageAlt="Showcase of award-winning digital design projects"
      callouts={[
        { text: "150+ Projects" },
        { text: "25 Awards" },
        { text: "10 Countries" },
      ]}
    />
  );
}

// ================================================
// Example 10: Custom Styling Override
// ================================================

export function CustomStyledHero() {
  return (
    <HeroSection
      title="Custom Design"
      subtitle="Override Default Styles"
      imageSrc="/images/custom-bg.jpg"
      imageAlt="Custom background design"
      className="custom-hero-override"
    />
  );
}

/**
 * Corresponding CSS for custom styling:
 *
 * .custom-hero-override {
 *   min-height: 80vh; // Shorter hero
 * }
 *
 * .custom-hero-override :global(.title) {
 *   color: #ff6b6b; // Custom red color
 *   font-size: 6rem;
 * }
 */

// ================================================
// Example 11: Internationalization (i18n)
// ================================================

export function I18nHero({ locale }: { locale: string }) {
  const translations = {
    en: {
      title: "Transform Your Business",
      subtitle: "AI-Powered Solutions for Modern Enterprises",
      description:
        "Leverage cutting-edge technology to scale faster and dominate your market.",
      callouts: [
        { icon: "🚀", text: "Fast Deployment" },
        { icon: "🔒", text: "Enterprise Security" },
      ],
    },
    ar: {
      title: "حوّل عملك",
      subtitle: "حلول مدعومة بالذكاء الاصطناعي للمؤسسات الحديثة",
      description:
        "استفد من أحدث التقنيات للتوسع بشكل أسرع والسيطرة على السوق.",
      callouts: [
        { icon: "🚀", text: "نشر سريع" },
        { icon: "🔒", text: "أمان المؤسسات" },
      ],
    },
  };

  const content = translations[locale as keyof typeof translations] || translations.en;

  return (
    <HeroSection
      title={content.title}
      subtitle={content.subtitle}
      description={content.description}
      imageSrc="/images/business-hero.jpg"
      imageAlt="Business transformation illustration"
      callouts={content.callouts}
    />
  );
}
