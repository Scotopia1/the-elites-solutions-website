import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllServices } from '@/lib/data/services';
import ClientLayoutWrapper from '@/components/layout/ClientLayoutWrapper';

// NEW Cinematic components
import {
  CinematicStoryHero,
  BentoChallengeSolution,
  HorizontalProcessJourney,
  ResultsTheater,
  TestimonialSpotlight,
  CTAReveal,
} from '@/components/services/cinematic';

interface Props {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  const title = service.title[locale as keyof typeof service.title] || service.title.en;
  const description = service.shortDescription?.[locale as keyof typeof service.shortDescription] ||
                      service.description[locale as keyof typeof service.description] ||
                      service.description.en;

  return {
    title: `${title} | The Elites Solutions`,
    description,
    openGraph: {
      title: `${title} | The Elites Solutions`,
      description,
      type: 'website',
      images: service.icon ? [service.icon] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | The Elites Solutions`,
      description,
      images: service.icon ? [service.icon] : [],
    },
    alternates: {
      canonical: `https://theelites.io/${locale}/services/${slug}`,
      languages: {
        'en': `https://theelites.io/en/services/${slug}`,
        'fr': `https://theelites.io/fr/services/${slug}`,
        'ar': `https://theelites.io/ar/services/${slug}`,
      },
    },
  };
}

// Generate static params for all services
export async function generateStaticParams() {
  const services = getAllServices();
  const locales = ['en', 'fr', 'ar'];

  return services.flatMap(service =>
    locales.map(locale => ({
      slug: service.slug,
      locale,
    }))
  );
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const service = getServiceBySlug(slug);

  // Return 404 if service not found
  if (!service) {
    notFound();
  }

  // Extract localized content
  const title = service.title[locale as keyof typeof service.title] || service.title.en;
  const tagline = service.shortDescription?.[locale as keyof typeof service.shortDescription] || '';
  const description = service.description[locale as keyof typeof service.description] || service.description.en;

  // Transform data for cinematic components

  // BentoChallengeSolution: Hero statement and items
  const heroStatement = {
    challenge: `Businesses struggle with outdated ${title.toLowerCase()} systems that limit growth.`,
    solution: `We deliver modern ${title.toLowerCase()} solutions that unlock your full potential.`,
  };

  // Derive solution descriptions from service features
  const featureDescriptions = service.features?.slice(0, 4).map((f) => {
    const text = f[locale as keyof typeof f] || f.en;
    const [featureTitle, ...rest] = text.split(':');
    return {
      title: featureTitle.trim(),
      description: rest.join(':').trim() || text,
    };
  }) || [];

  const bentoItems = [
    {
      id: "time",
      challenge: {
        title: "Time-Consuming Processes",
        description: "Manual workflows slow down your team and create bottlenecks",
        icon: "clock" as const,
      },
      solution: {
        title: featureDescriptions[0]?.title || "Streamlined Automation",
        description: featureDescriptions[0]?.description || "Automated systems that work 24/7, freeing your team to focus on growth",
        icon: "zap" as const,
        stat: "10x Faster",
      },
      size: "medium" as const,
    },
    {
      id: "cost",
      challenge: {
        title: "Rising Operational Costs",
        description: "Inefficient systems drain resources and limit your potential",
        icon: "dollar" as const,
      },
      solution: {
        title: featureDescriptions[1]?.title || "Cost-Efficient Solutions",
        description: featureDescriptions[1]?.description || "Optimized processes that reduce overhead while increasing output",
        icon: "rocket" as const,
        stat: "50% Savings",
      },
      size: "medium" as const,
    },
    {
      id: "scale",
      challenge: {
        title: "Limited Scalability",
        description: "Current infrastructure can't keep pace with your ambitions",
        icon: "trending" as const,
      },
      solution: {
        title: featureDescriptions[2]?.title || "Built for Growth",
        description: featureDescriptions[2]?.description || "Flexible architecture that scales seamlessly with your business",
        icon: "chart" as const,
        stat: "Unlimited Scale",
      },
      size: "small" as const,
    },
    {
      id: "insight",
      challenge: {
        title: "Lack of Insights",
        description: "Decisions made without data lead to missed opportunities",
        icon: "search" as const,
      },
      solution: {
        title: featureDescriptions[3]?.title || "Data-Driven Clarity",
        description: featureDescriptions[3]?.description || "Real-time analytics and insights that drive informed decisions",
        icon: "shield" as const,
        stat: "100% Visibility",
      },
      size: "small" as const,
    },
  ];

  // ProcessCinema: Transform process data
  const processSteps = service.process?.map((p: any) => ({
    step: p.step,
    title: typeof p.title === 'object' ? (p.title[locale] || p.title.en) : p.title,
    description: typeof p.description === 'object' ? (p.description[locale] || p.description.en) : p.description,
    icon: p.icon || '📋',
    duration: typeof p.duration === 'object' ? (p.duration[locale] || p.duration.en) : p.duration,
  })) || [];

  // TechOrbit removed

  // ResultsTheater: Transform metrics
  const metrics = service.metrics ? [
    { label: 'Projects Completed', value: `${service.metrics.projectsCompleted || 0}+`, suffix: '' },
    { label: 'Client Satisfaction', value: `${service.metrics.averageRating || 0}`, suffix: '/5' },
    { label: 'Average Delivery', value: service.metrics.averageDeliveryTime || 'N/A', suffix: '' },
    { label: 'Success Rate', value: '99', suffix: '%' },
  ] : [];

  // TestimonialSpotlight: Use featured testimonials
  const testimonials = service.featuredTestimonials || [];

  // CTAReveal: CTA configuration
  const ctaHeadline = `Ready to Transform Your ${title}?`;
  const ctaSubheadline = `Join hundreds of satisfied clients who have revolutionized their business with our ${title.toLowerCase()} solutions.`;
  const primaryCTA = {
    text: service.ctaButtonText?.[locale as keyof typeof service.ctaButtonText] || 'Get Started',
    href: `/contact?service=${service.slug}`
  };
  const secondaryCTA = {
    text: 'View Case Studies',
    href: '/work'
  };

  return (
    <ClientLayoutWrapper>
      {/* 1. Cinematic Hero */}
      <CinematicStoryHero
        title={title}
        subtitle={description}
        tagline={tagline}
      />

      {/* 2. Bento Challenge & Solution */}
      <BentoChallengeSolution
        sectionTitle="Challenge & Solution"
        subtitle={`Transform your ${title.toLowerCase()} challenges into competitive advantages`}
        heroStatement={heroStatement}
        items={bentoItems}
      />

      {/* 3. Horizontal Process Journey */}
      {processSteps.length > 0 && (
        <HorizontalProcessJourney
          steps={processSteps}
          sectionTitle="Our Process"
          subtitle={`How we deliver exceptional ${title.toLowerCase()} solutions`}
        />
      )}

      {/* 4. Tech Orbit - removed */}

      {/* 5. Results Theater */}
      {metrics.length > 0 && (
        <ResultsTheater metrics={metrics} />
      )}

      {/* 6. Testimonial Spotlight */}
      {testimonials.length > 0 && (
        <TestimonialSpotlight testimonials={testimonials} />
      )}

      {/* 7. CTA Reveal */}
      <CTAReveal
        headline={ctaHeadline}
        subheadline={ctaSubheadline}
        primaryCTA={primaryCTA}
        secondaryCTA={secondaryCTA}
      />
    </ClientLayoutWrapper>
  );
}
