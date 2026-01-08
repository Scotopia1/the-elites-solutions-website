import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'src/content/blog/posts');
const authorsFile = path.join(process.cwd(), 'src/content/blog/authors/authors.json');
const categoriesFile = path.join(process.cwd(), 'src/content/blog/categories/categories.json');
const tagsFile = path.join(process.cwd(), 'src/content/blog/tags/tags.json');

export interface BlogPost {
  slug: string;
  title: { en: string; fr: string; ar: string };
  excerpt: { en: string; fr: string; ar: string };
  content: { en: string; fr: string; ar: string };
  author: string;
  category: string | null;
  tags: string[];
  featuredImage: string | null;
  featuredImageAlt?: { en: string; fr: string; ar: string };
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  isFeatured: boolean;
  viewCount?: number;
}

export interface BlogAuthor {
  id: string;
  name: { en: string; fr: string; ar: string };
  slug: string;
  bio?: { en: string; fr: string; ar: string };
  avatarUrl?: string;
  email?: string;
  role?: { en: string; fr: string; ar: string };
  socialLinks?: any;
}

export interface BlogCategory {
  id: string;
  name: { en: string; fr: string; ar: string };
  slug: string;
  description?: { en: string; fr: string; ar: string };
  color?: string;
  iconUrl?: string;
  orderIndex: number;
}

export interface BlogTag {
  id: string;
  name: { en: string; fr: string; ar: string };
  slug: string;
}

/**
 * Parse multilingual content from markdown
 */
function parseMultilingualContent(content: string): { en: string; fr: string; ar: string } {
  const enMatch = content.match(/## (?:Content|Introduction) \(EN\)([\s\S]*?)(?=## |$)/);
  const frMatch = content.match(/## (?:Contenu|Introduction) \(FR\)([\s\S]*?)(?=## |$)/);
  const arMatch = content.match(/## (?:المحتوى|مقدمة) \(AR\)([\s\S]*?)(?=## |$)/);

  return {
    en: enMatch?.[1]?.trim() || '',
    fr: frMatch?.[1]?.trim() || '',
    ar: arMatch?.[1]?.trim() || '',
  };
}

/**
 * Get all blog posts
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    // Check if posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`⚠️  Blog posts directory not found: ${postsDirectory}`);
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const posts = await Promise.all(
      fileNames
        .filter(name => name.endsWith('.md'))
        .map(async fileName => {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          // Parse multilingual content
          const contentSections = parseMultilingualContent(content);

          return {
            slug,
            ...data,
            content: contentSections,
          } as BlogPost;
        })
    );

    // Sort by publish date (newest first)
    return posts.sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

/**
 * Get blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const contentSections = parseMultilingualContent(content);

    // Convert markdown to HTML for each language
    const processedContent = await Promise.all([
      remark().use(gfm).use(html).process(contentSections.en),
      remark().use(gfm).use(html).process(contentSections.fr),
      remark().use(gfm).use(html).process(contentSections.ar),
    ]);

    return {
      slug,
      ...data,
      content: {
        en: processedContent[0].toString(),
        fr: processedContent[1].toString(),
        ar: processedContent[2].toString(),
      },
    } as BlogPost;
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get featured blog posts
 */
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post => post.isFeatured);
}

/**
 * Get blog posts by category
 */
export async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post => post.category === categorySlug);
}

/**
 * Get blog posts by tag
 */
export async function getBlogPostsByTag(tagSlug: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post => post.tags.includes(tagSlug));
}

/**
 * Get blog posts by author
 */
export async function getBlogPostsByAuthor(authorSlug: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post => post.author === authorSlug);
}

/**
 * Load all blog authors
 */
export function getAllAuthors(): BlogAuthor[] {
  try {
    if (!fs.existsSync(authorsFile)) {
      return [];
    }
    const data = fs.readFileSync(authorsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading authors:', error);
    return [];
  }
}

/**
 * Get author by slug
 */
export function getAuthorBySlug(slug: string): BlogAuthor | null {
  const authors = getAllAuthors();
  return authors.find(a => a.slug === slug) || null;
}

/**
 * Load all blog categories
 */
export function getAllCategories(): BlogCategory[] {
  try {
    if (!fs.existsSync(categoriesFile)) {
      return [];
    }
    const data = fs.readFileSync(categoriesFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading categories:', error);
    return [];
  }
}

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): BlogCategory | null {
  const categories = getAllCategories();
  return categories.find(c => c.slug === slug) || null;
}

/**
 * Load all blog tags
 */
export function getAllTags(): BlogTag[] {
  try {
    if (!fs.existsSync(tagsFile)) {
      return [];
    }
    const data = fs.readFileSync(tagsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading tags:', error);
    return [];
  }
}

/**
 * Get tag by slug
 */
export function getTagBySlug(slug: string): BlogTag | null {
  const tags = getAllTags();
  return tags.find(t => t.slug === slug) || null;
}

/**
 * Get blog post count
 */
export async function getBlogPostsCount(): Promise<number> {
  const posts = await getAllBlogPosts();
  return posts.length;
}

/**
 * Check if a blog post exists by slug
 */
export async function blogPostExists(slug: string): Promise<boolean> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  return fs.existsSync(fullPath);
}
