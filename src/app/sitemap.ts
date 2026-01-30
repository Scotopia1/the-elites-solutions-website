import { MetadataRoute } from 'next';
import { getAllServices } from '@/lib/data/services';
import { getAllProjects } from '@/lib/data/projects';
import { getAllBlogPosts, getAllCategories, getAllTags, getAllAuthors } from '@/lib/blog/markdown';

/**
 * Dynamic sitemap generation for The Elites Solutions
 * Includes all static pages and dynamic content (services, projects, blog posts)
 *
 * Next.js will serve this at /sitemap.xml
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://theelites.io';
  const currentDate = new Date();
  const locales = ['en', 'fr', 'ar'];

  const routes: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  const staticPaths = ['', '/about', '/services', '/work', '/blog', '/contact'];
  const legalPaths = ['/privacy', '/terms', '/cookies'];

  for (const locale of locales) {
    // Main pages
    for (const path of staticPaths) {
      routes.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: currentDate,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${path}`,
            fr: `${baseUrl}/fr${path}`,
            ar: `${baseUrl}/ar${path}`,
          },
        },
      });
    }

    // Legal pages
    for (const path of legalPaths) {
      routes.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: currentDate,
        changeFrequency: 'yearly',
        priority: 0.3,
        alternates: {
          languages: {
            en: `${baseUrl}/en${path}`,
            fr: `${baseUrl}/fr${path}`,
            ar: `${baseUrl}/ar${path}`,
          },
        },
      });
    }
  }

  // Dynamic service pages
  const services = getAllServices();
  for (const service of services) {
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}/services/${service.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en/services/${service.slug}`,
            fr: `${baseUrl}/fr/services/${service.slug}`,
            ar: `${baseUrl}/ar/services/${service.slug}`,
          },
        },
      });
    }
  }

  // Dynamic project pages
  const projects = getAllProjects();
  for (const project of projects) {
    for (const locale of locales) {
      const projectDate = project.updatedAt || project.createdAt;
      const lastModified = projectDate ? new Date(projectDate) : currentDate;

      routes.push({
        url: `${baseUrl}/${locale}/work/${project.slug}`,
        lastModified: isNaN(lastModified.getTime()) ? currentDate : lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en/work/${project.slug}`,
            fr: `${baseUrl}/fr/work/${project.slug}`,
            ar: `${baseUrl}/ar/work/${project.slug}`,
          },
        },
      });
    }
  }

  // Dynamic blog post pages
  const posts = await getAllBlogPosts();
  for (const post of posts) {
    for (const locale of locales) {
      const postDate = post.updatedAt || post.publishedAt;
      const lastModified = postDate ? new Date(postDate) : currentDate;

      routes.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: isNaN(lastModified.getTime()) ? currentDate : lastModified,
        changeFrequency: 'weekly',
        priority: 0.6,
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/${post.slug}`,
            fr: `${baseUrl}/fr/blog/${post.slug}`,
            ar: `${baseUrl}/ar/blog/${post.slug}`,
          },
        },
      });
    }
  }

  // Blog category pages
  const categories = getAllCategories();
  for (const category of categories) {
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}/blog/category/${category.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.5,
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/category/${category.slug}`,
            fr: `${baseUrl}/fr/blog/category/${category.slug}`,
            ar: `${baseUrl}/ar/blog/category/${category.slug}`,
          },
        },
      });
    }
  }

  // Blog tag pages
  const tags = getAllTags();
  for (const tag of tags) {
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}/blog/tag/${tag.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.4,
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/tag/${tag.slug}`,
            fr: `${baseUrl}/fr/blog/tag/${tag.slug}`,
            ar: `${baseUrl}/ar/blog/tag/${tag.slug}`,
          },
        },
      });
    }
  }

  // Blog author pages
  const authors = getAllAuthors();
  for (const author of authors) {
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}/blog/author/${author.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/author/${author.slug}`,
            fr: `${baseUrl}/fr/blog/author/${author.slug}`,
            ar: `${baseUrl}/ar/blog/author/${author.slug}`,
          },
        },
      });
    }
  }

  return routes;
}
