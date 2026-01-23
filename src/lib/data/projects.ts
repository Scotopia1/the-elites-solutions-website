import projectsData from '@/data/projects/projects.json';

export interface LocalizedString {
  en: string;
  fr: string;
  ar: string;
}

export interface InteractiveDemo {
  type: 'url' | 'figma' | 'video';
  url: string;
  fallbackImage: string;
  title: LocalizedString;
}

export interface ArchitectureHighlight {
  label: LocalizedString;
  description: LocalizedString;
}

export interface ArchitectureDiagram {
  diagram: string;
  caption: LocalizedString;
  highlights: ArchitectureHighlight[];
}

export interface ProcessStep {
  phase: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  details?: LocalizedString;
  icon: string;
}

export interface Project {
  id: string;
  title: { en: string; fr: string; ar: string };
  slug: string;
  category: string;
  industry: string;
  projectScale: 'small' | 'medium' | 'large' | 'enterprise';
  clientName: string;
  clientLogoUrl?: string;
  shortDescription?: { en: string; fr: string; ar: string };
  challenge: { en: string; fr: string; ar: string };
  solution: { en: string; fr: string; ar: string };
  results: { en: string; fr: string; ar: string };
  overview?: any;
  quickFacts?: any;
  technologies: string[];
  techStack?: any;
  servicesUsed: string[];
  timeline?: any;
  duration?: string;
  resultsMetrics?: any;
  testimonial?: any;
  heroImage?: string;
  featuredImageUrl: string;
  images?: any;
  gallery?: any;
  projectUrl?: string;
  isFeatured: boolean;
  publishedAt?: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
  videoUrl?: string | null;
  interactiveDemo?: InteractiveDemo | null;
  architecture?: ArchitectureDiagram | null;
  processSteps?: ProcessStep[] | null;
  relatedSlugs?: string[] | null;
}

/**
 * Get all projects from static JSON
 */
export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

/**
 * Get project by slug
 */
export function getProjectBySlug(slug: string): Project | null {
  const project = projectsData.find((p: any) => p.slug === slug);
  return project ? (project as Project) : null;
}

export function getNextProject(currentSlug: string): Project | null {
  const projects = getAllProjects();
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);
  if (currentIndex === -1) return null;
  const nextIndex = (currentIndex + 1) % projects.length;
  return projects[nextIndex];
}

export function getRelatedProjects(
  currentSlug: string,
  relatedSlugs?: string[] | null
): Project[] {
  const allProjects = getAllProjects();
  const currentProject = getProjectBySlug(currentSlug);
  if (!currentProject) return [];
  
  if (relatedSlugs && relatedSlugs.length > 0) {
    return allProjects
      .filter(p => relatedSlugs.includes(p.slug) && p.slug !== currentSlug)
      .slice(0, 3);
  }
  
  return allProjects
    .filter(p =>
      p.slug !== currentSlug &&
      (p.category === currentProject.category || p.industry === currentProject.industry)
    )
    .slice(0, 3);
}

/**
 * Get featured projects only
 */
export function getFeaturedProjects(): Project[] {
  return projectsData.filter((p: any) => p.isFeatured) as Project[];
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: string): Project[] {
  return projectsData.filter((p: any) => p.category === category) as Project[];
}

/**
 * Get projects by industry
 */
export function getProjectsByIndustry(industry: string): Project[] {
  return projectsData.filter((p: any) => p.industry === industry) as Project[];
}

/**
 * Get projects by scale
 */
export function getProjectsByScale(scale: string): Project[] {
  return projectsData.filter((p: any) => p.projectScale === scale) as Project[];
}

/**
 * Get projects by order index (sorted)
 */
export function getProjectsByOrder(): Project[] {
  const projects = [...projectsData] as Project[];
  return projects.sort((a, b) => a.orderIndex - b.orderIndex);
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const categories = projectsData.map((p: any) => p.category);
  return Array.from(new Set(categories));
}

/**
 * Get all unique industries
 */
export function getAllIndustries(): string[] {
  const industries = projectsData.map((p: any) => p.industry);
  return Array.from(new Set(industries));
}

/**
 * Get project count
 */
export function getProjectsCount(): number {
  return projectsData.length;
}

/**
 * Check if a project exists by slug
 */
export function projectExists(slug: string): boolean {
  return projectsData.some((p: any) => p.slug === slug);
}