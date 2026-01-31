import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjects, getRelatedProjects } from '@/lib/data/projects';
import ClientLayoutWrapper from '@/components/layout/ClientLayoutWrapper';

// NEW Case Study components
import {
  CaseStudyHeroCard,
  ExecutiveSummary,
  ProjectDetailsGrid,
  ProblemDeepDive,
  SolutionTabs,
  ResultsDashboard,
  ClientTestimonial,
  RelatedProjects,
} from '@/components/work/casestudy';

interface Props {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const title = project.title[locale as keyof typeof project.title] || project.title.en;
  const description = project.shortDescription?.[locale as keyof typeof project.shortDescription] ||
                      project.challenge[locale as keyof typeof project.challenge] ||
                      project.challenge.en;

  return {
    title: `${title} | The Elites Solutions`,
    description,
    openGraph: {
      title: `${title} | The Elites Solutions`,
      description,
      type: 'website',
      images: project.heroImage ? [project.heroImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | The Elites Solutions`,
      description,
      images: project.heroImage ? [project.heroImage] : [],
    },
    alternates: {
      canonical: `https://theelites.io/${locale}/work/${slug}`,
      languages: {
        'en': `https://theelites.io/en/work/${slug}`,
        'fr': `https://theelites.io/fr/work/${slug}`,
        'ar': `https://theelites.io/ar/work/${slug}`,
      },
    },
  };
}

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = getAllProjects();
  const locales = ['en', 'fr', 'ar'];

  return projects.flatMap(project =>
    locales.map(locale => ({
      slug: project.slug,
      locale,
    }))
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug);

  // Return 404 if project not found
  if (!project) {
    notFound();
  }

  // Extract localized content
  const title = project.title[locale as keyof typeof project.title] || project.title.en;
  const challenge = project.challenge[locale as keyof typeof project.challenge] || project.challenge.en;
  const solution = project.solution[locale as keyof typeof project.solution] || project.solution.en;
  const results = project.results[locale as keyof typeof project.results] || project.results.en;

  // Get related projects
  const relatedProjects = getRelatedProjects(project.slug, project.relatedSlugs);

  // Transform data for CaseStudyHeroCard
  const heroData = {
    image: project.heroImage || project.featuredImageUrl || '',
    title,
    category: project.category,
    clientName: project.clientName || 'Confidential Client',
    tags: project.technologies.slice(0, 5), // Show first 5 technologies as tags
    projectUrl: project.projectUrl || project.quickFacts?.liveUrl,
  };

  // Transform data for ExecutiveSummary
  const executiveSummary = {
    challenge,
    solution,
    results,
  };

  // Transform data for ProjectDetailsGrid
  const projectDetails = {
    timeline: project.duration || 'N/A',
    teamSize: project.overview?.teamSize || '5-10 specialists',
    budget: project.overview?.budget || 'Confidential',
    technologies: project.technologies.slice(0, 3), // Top 3 technologies
    industry: project.industry,
    status: 'Completed',
  };

  // Transform data for ProblemDeepDive
  const problemDeepDive = {
    title: 'The Challenge We Faced',
    description: challenge,
    bulletPoints: [
      'Complex technical requirements',
      'Tight deadline constraints',
      'Scalability considerations',
      'User experience priorities',
    ],
    image: project.gallery?.[0]?.url || project.gallery?.[0] || undefined,
    pullQuote: {
      text: challenge.split('.')[0] + '.',
      author: 'Project Stakeholder',
    },
  };

  // Transform data for SolutionTabs
  const solutionTabs = {
    strategy: {
      title: 'Strategic Planning',
      description: 'We analyzed the requirements and developed a comprehensive strategy to address all challenges.',
      bulletPoints: [
        'Conducted thorough requirements analysis',
        'Identified key technical and business objectives',
        'Created detailed project roadmap',
        'Defined success metrics and KPIs',
      ],
      image: project.gallery?.[1]?.url || project.gallery?.[1] || undefined,
    },
    design: {
      title: 'Design Process',
      description: 'Our design team crafted an intuitive and visually appealing user experience.',
      bulletPoints: [
        'User research and persona development',
        'Wireframing and prototyping',
        'Visual design and branding',
        'Usability testing and iteration',
      ],
      image: project.gallery?.[2]?.url || project.gallery?.[2] || undefined,
    },
    development: {
      title: 'Development Excellence',
      description: solution,
      bulletPoints: project.technologies.slice(0, 4).map(tech => `Implemented ${tech}`),
      image: project.gallery?.[3]?.url || project.gallery?.[3] || undefined,
    },
    testing: {
      title: 'Quality Assurance',
      description: 'Rigorous testing ensured a flawless product launch.',
      bulletPoints: [
        'Comprehensive unit and integration testing',
        'Performance optimization and load testing',
        'Security audit and vulnerability assessment',
        'User acceptance testing (UAT)',
      ],
      image: project.gallery?.[4]?.url || project.gallery?.[4] || undefined,
    },
  };

  // Transform data for ResultsDashboard
  const metricsData = project.resultsMetrics?.map((metric: any) => ({
    label: metric.label || metric.metric,
    before: metric.before || 0,
    after: metric.after || metric.value || 100,
    unit: metric.unit || '%',
    isHigherBetter: metric.isHigherBetter !== false,
  })) || [
    {
      label: 'User Engagement',
      before: 45,
      after: 85,
      unit: '%',
      isHigherBetter: true,
    },
    {
      label: 'Page Load Time',
      before: 3500,
      after: 800,
      unit: 'ms',
      isHigherBetter: false,
    },
    {
      label: 'Conversion Rate',
      before: 2.5,
      after: 6.8,
      unit: '%',
      isHigherBetter: true,
    },
    {
      label: 'Customer Satisfaction',
      before: 72,
      after: 94,
      unit: '%',
      isHigherBetter: true,
    },
  ];

  // Transform data for ClientTestimonial
  const testimonialData = project.testimonial ? {
    quote: project.testimonial.quote || project.testimonial.text,
    author: project.testimonial.author || project.testimonial.name,
    role: project.testimonial.role || project.testimonial.position,
    company: project.clientName,
    avatar: project.testimonial.avatar || project.testimonial.image,
    logo: project.clientLogoUrl,
  } : {
    quote: "Working with The Elites was an exceptional experience. They delivered beyond our expectations.",
    author: "Client Representative",
    role: "Project Manager",
    company: project.clientName,
    avatar: undefined,
    logo: project.clientLogoUrl,
  };

  // Transform data for RelatedProjects
  const relatedProjectsData = relatedProjects.map(p => ({
    title: p.title[locale as keyof typeof p.title] || p.title.en,
    slug: p.slug,
    category: p.category,
    image: p.featuredImageUrl || p.heroImage || '',
    excerpt: (p.shortDescription?.[locale as keyof typeof p.shortDescription] ||
              p.challenge[locale as keyof typeof p.challenge] ||
              p.challenge.en).substring(0, 120) + '...',
  }));

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
        {/* 1. Hero Card */}
        <CaseStudyHeroCard {...heroData} />

        {/* 2. Executive Summary */}
        <ExecutiveSummary {...executiveSummary} />

        {/* 3. Project Details Grid */}
        <ProjectDetailsGrid details={projectDetails} />

        {/* 4. Problem Deep Dive */}
        <ProblemDeepDive {...problemDeepDive} />

        {/* 5. Solution Tabs */}
        <SolutionTabs {...solutionTabs} />

        {/* 6. Results Dashboard */}
        <ResultsDashboard metrics={metricsData} />

        {/* 7. Client Testimonial */}
        <ClientTestimonial {...testimonialData} />

        {/* 8. Related Projects */}
        {relatedProjectsData.length > 0 && (
          <RelatedProjects projects={relatedProjectsData} />
        )}
      </div>
    </ClientLayoutWrapper>
  );
}
