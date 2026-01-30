import servicesData from '@/data/services/services.json';

export interface Service {
  id: string;
  title: { en: string; fr: string; ar: string };
  slug: string;
  description: { en: string; fr: string; ar: string };
  shortDescription?: { en: string; fr: string; ar: string };
  icon?: string;
  features?: Array<{ en: string; fr: string; ar: string }>;
  showPricing: boolean;
  pricingType: 'fixed' | 'hourly' | 'project' | 'custom';
  pricingInfo?: any;
  process?: any;
  methodology?: any;
  teamSize?: string;
  expertiseAreas: string[];
  techStack?: any;
  metrics?: any;
  featuredTestimonials?: any;
  ctaType: 'quote' | 'consultation' | 'both';
  ctaButtonText?: { en: string; fr: string; ar: string };
  orderIndex: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get all services from static JSON
 */
export function getAllServices(): Service[] {
  return servicesData as Service[];
}

/**
 * Get service by slug
 */
export function getServiceBySlug(slug: string): Service | null {
  const service = servicesData.find((s: any) => s.slug === slug);
  return service ? (service as Service) : null;
}

/**
 * Get featured services only
 */
export function getFeaturedServices(): Service[] {
  return servicesData.filter((s: any) => s.isFeatured) as Service[];
}

/**
 * Get services by order index (sorted)
 */
export function getServicesByOrder(): Service[] {
  const services = [...servicesData] as Service[];
  return services.sort((a, b) => a.orderIndex - b.orderIndex);
}

/**
 * Get service count
 */
export function getServicesCount(): number {
  return servicesData.length;
}

/**
 * Check if a service exists by slug
 */
export function serviceExists(slug: string): boolean {
  return servicesData.some((s: any) => s.slug === slug);
}
