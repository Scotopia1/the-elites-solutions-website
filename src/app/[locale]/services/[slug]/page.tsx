import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllServices } from '@/lib/data/services';
import ClientLayoutWrapper from '@/components/layout/ClientLayoutWrapper';

// Service components
import CinematicServiceHero from '@/components/services/CinematicServiceHero';
import WhatWeDoSection from '@/components/services/WhatWeDoSection';
import ProcessOverviewGrid from '@/components/services/ProcessOverviewGrid';
import MethodologyCards from '@/components/services/MethodologyCards';
import SocialProofBanner from '@/components/services/SocialProofBanner';
import CTAFloatingPill from '@/components/services/CTAFloatingPill';
import ServiceFAQ from '@/components/services/ServiceFAQ';

interface Props {
  params: {
    slug: string;
    locale: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = params;
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

export default function ServiceDetailPage({ params }: Props) {
  const { slug, locale } = params;
  const service = getServiceBySlug(slug);

  // Return 404 if service not found
  if (!service) {
    notFound();
  }

  // Extract localized content
  const title = service.title[locale as keyof typeof service.title] || service.title.en;
  const tagline = service.shortDescription?.[locale as keyof typeof service.shortDescription] || '';
  const description = service.description[locale as keyof typeof service.description] || service.description.en;

  // Transform features to legacy format for WhatWeDoSection
  const benefits = service.features?.map(f => {
    const text = f[locale as keyof typeof f] || f.en;
    const [benefitTitle, ...rest] = text.split(':');
    return {
      title: benefitTitle.trim(),
      description: rest.join(':').trim() || benefitTitle
    };
  }) || [];

  // Placeholder FAQ (should be added to database schema in future)
  const faq = [
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on scope and complexity. Most projects are completed within 2-3 months from kickoff to launch.'
    },
    {
      question: 'What is your development process?',
      answer: 'We follow an agile methodology with regular check-ins, iterative development, and continuous feedback to ensure alignment with your goals.'
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes, we offer various support packages including maintenance, updates, and technical assistance to ensure your solution continues to perform optimally.'
    }
  ];

  return (
    <ClientLayoutWrapper>
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0a0a_0%,#1a1a1a_50%,#0a0a0a_100%)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #FFD700 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            opacity: 0.07,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Cinematic Hero */}
        <CinematicServiceHero
          title={title}
          tagline={tagline}
          icon={service.icon}
        />

        {/* What We Do Section */}
        <WhatWeDoSection
          description={description}
          benefits={benefits}
          techStack={service.techStack?.map(t => ({ name: t.name, icon: t.logo || '' })) || []}
        />

        {/* Process Overview Grid with Deliverables */}
        {service.process && service.process.length > 0 && (
          <ProcessOverviewGrid process={service.process} />
        )}

        {/* Methodology Cards (4-card layout) */}
        <MethodologyCards
          methodology={service.methodology}
          techStack={service.techStack}
        />

        {/* Social Proof Banner (Metrics + Testimonials) */}
        <SocialProofBanner
          metrics={service.metrics}
          testimonials={service.featuredTestimonials}
        />

        {/* FAQ + CTA */}
        <ServiceFAQ faq={faq} serviceName={title} />

        {/* Floating CTA Pill (Sticky) */}
        <CTAFloatingPill
          serviceName={title}
          ctaConfig={{
            type: service.ctaType,
            buttonText: service.ctaButtonText
          }}
          locale={locale}
        />
      </div>
    </ClientLayoutWrapper>
  );
}
