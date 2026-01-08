import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjects } from '@/lib/data/projects';
import ClientLayoutWrapper from '@/components/layout/ClientLayoutWrapper';

// Project components
import ProjectHeroImage from '@/components/work/ProjectHeroImage';
import QuickFactsBar from '@/components/work/QuickFactsBar';
import ProjectOverview from '@/components/work/ProjectOverview';
import VisualGallery from '@/components/work/VisualGallery';
import TechStackGrid from '@/components/work/TechStackGrid';
import ProjectTimeline from '@/components/work/ProjectTimeline';
import ResultsMetrics from '@/components/work/ResultsMetrics';
import VideoDemo from '@/components/work/VideoDemo';
import NextProjectTeaser from '@/components/work/NextProjectTeaser';

interface Props {
  params: {
    slug: string;
    locale: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = params;
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

export default function ProjectDetailPage({ params }: Props) {
  const { slug, locale } = params;
  const project = getProjectBySlug(slug);

  // Return 404 if project not found
  if (!project) {
    notFound();
  }

  // Extract localized content
  const title = project.title[locale as keyof typeof project.title] || project.title.en;
  const challenge = project.challenge[locale as keyof typeof project.challenge] || project.challenge.en;
  const solution = project.solution[locale as keyof typeof project.solution] || project.solution.en;

  // Transform project data to match component expectations
  const quickFacts = {
    client: project.clientName || 'Confidential',
    year: new Date(project.publishedAt || project.createdAt).getFullYear().toString(),
    duration: project.duration || 'N/A',
    status: 'Completed',
    liveUrl: project.projectUrl,
    githubUrl: undefined,
  };

  const overview = {
    description: `${challenge}\n\n${solution}`,
    highlights: [],
  };

  const gallery = project.gallery?.map(img => ({
    url: img.url || img,
    alt: img.alt || title,
  })) || [];

  const techStack = project.technologies?.map((tech: any) => ({
    name: typeof tech === 'string' ? tech : tech.name,
    logo: tech.logo || '',
    reason: tech.reason || '',
  })) || [];

  const timeline = project.timeline || [];

  const resultsText = project.results[locale as keyof typeof project.results] || project.results.en;
  const results = project.resultsMetrics || [];

  const testimonial = project.testimonial;
  const videoUrl = undefined;
  const nextProject = undefined;

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
        {/* Hero Image */}
        <ProjectHeroImage
          image={project.heroImage || ''}
          title={title}
          category={project.category}
        />

        {/* Quick Facts Bar */}
        <QuickFactsBar facts={quickFacts} />

        {/* Project Overview */}
        <ProjectOverview overview={overview} />

        {/* Visual Gallery */}
        {gallery.length > 0 && <VisualGallery images={gallery} />}

        {/* Tech Stack Grid */}
        {techStack.length > 0 && <TechStackGrid stack={techStack} />}

        {/* Project Timeline */}
        {timeline.length > 0 && <ProjectTimeline timeline={timeline} />}

        {/* Results & Metrics */}
        {results.length > 0 && <ResultsMetrics results={results} testimonial={testimonial} />}

        {/* Video Demo */}
        {videoUrl && <VideoDemo videoUrl={videoUrl} />}

        {/* Next Project Teaser */}
        {nextProject && <NextProjectTeaser nextProjectSlug={nextProject} />}
      </div>
    </ClientLayoutWrapper>
  );
}
