import { BlogPost } from '@/lib/blog/markdown';

/**
 * Generate Organization JSON-LD schema
 * Used site-wide for SEO and rich results
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Elites Solutions',
    url: 'https://theelites.io',
    logo: 'https://theelites.io/logo.png',
    description: 'Custom Business Automation & Software Solutions - Turning complex business challenges into elegant digital solutions',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LB', // Lebanon
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'contact@theelites.io',
    },
    sameAs: [
      // Add social media profiles when available
      // 'https://twitter.com/theelites',
      // 'https://linkedin.com/company/theelites',
      // 'https://github.com/theelites',
    ],
  };
}

/**
 * Generate LocalBusiness JSON-LD schema
 * Used on the contact page for local SEO
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'The Elites Solutions',
    image: 'https://theelites.io/hero.jpg',
    '@id': 'https://theelites.io',
    url: 'https://theelites.io',
    telephone: '+961-XXX-XXXX', // Update with actual phone number
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Update with actual address',
      addressLocality: 'Beirut',
      addressRegion: 'Beirut',
      postalCode: '12345',
      addressCountry: 'LB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.8886, // Beirut coordinates - update if needed
      longitude: 35.4955,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    sameAs: [
      // Add social media profiles when available
    ],
  };
}

/**
 * Generate Article JSON-LD schema
 * Used for blog posts to improve SEO and enable rich results
 */
export function getArticleSchema(post: BlogPost, locale: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage || 'https://theelites.io/default-blog-image.jpg',
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'The Elites Team',
      url: post.author?.slug
        ? `https://theelites.io/${locale}/blog/author/${post.author.slug}`
        : undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Elites Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://theelites.io/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://theelites.io/${locale}/blog/${post.slug}`,
    },
  };
}

/**
 * Generate BreadcrumbList JSON-LD schema
 * Used for navigation breadcrumbs across the site
 */
export interface Breadcrumb {
  name: string;
  url: string;
}

export function getBreadcrumbSchema(breadcrumbs: Breadcrumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url.startsWith('http') ? crumb.url : `https://theelites.io${crumb.url}`,
    })),
  };
}

/**
 * Generate Service JSON-LD schema
 * Used for service detail pages
 */
export interface ServiceData {
  title: string;
  description: string;
  category: string;
}

export function getServiceSchema(service: ServiceData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'The Elites Solutions',
    },
    areaServed: 'Worldwide',
    serviceType: service.category,
  };
}

/**
 * Helper function to inject structured data into a page
 * Usage: <script dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 */
export function renderStructuredData(schema: any) {
  return {
    __html: JSON.stringify(schema),
  };
}
