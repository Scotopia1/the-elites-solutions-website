import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogPosts, getAuthorBySlug } from '@/lib/blog/markdown';
import ClientLayoutWrapper from '@/components/layout/ClientLayoutWrapper';

// Blog components
import BlogHeroImage from '@/components/blog/BlogHeroImage';
import ReadingProgressBar from '@/components/blog/ReadingProgressBar';
import ArticleContent from '@/components/blog/ArticleContent';
import SocialShareSidebar from '@/components/blog/SocialShareSidebar';
import AuthorBio from '@/components/blog/AuthorBio';
import RelatedPosts from '@/components/blog/RelatedPosts';

interface Props {
  params: {
    slug: string;
    locale: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = params;

  try {
    const post = await getBlogPostBySlug(slug);

    if (!post) {
      return {
        title: 'Article Not Found',
      };
    }

    // Get locale-specific strings
    const localizedLocale = locale as 'en' | 'fr' | 'ar';
    const title = post.title[localizedLocale];
    const excerpt = post.excerpt[localizedLocale];
    const imageAlt = post.featuredImageAlt?.[localizedLocale] || title;

    // Get author information
    const author = getAuthorBySlug(post.author);
    const authorName = author?.name[localizedLocale] || 'The Elites Solutions';

    return {
      title: `${title} | The Elites Solutions Blog`,
      description: excerpt,
      openGraph: {
        title,
        description: excerpt,
        type: 'article',
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt || post.publishedAt,
        authors: [authorName],
        images: post.heroImage ? [
          {
            url: post.heroImage,
            width: 1200,
            height: 630,
            alt: imageAlt,
          },
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: excerpt,
        images: post.heroImage ? [post.heroImage] : [],
      },
      alternates: {
        canonical: `https://theelites.io/${locale}/blog/${slug}`,
        languages: {
          'en': `https://theelites.io/en/blog/${slug}`,
          'fr': `https://theelites.io/fr/blog/${slug}`,
          'ar': `https://theelites.io/ar/blog/${slug}`,
        },
      },
    };
  } catch {
    return {
      title: 'Article Not Found',
    };
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  const locales = ['en', 'fr', 'ar'];

  return posts.flatMap(post =>
    locales.map(locale => ({
      slug: post.slug,
      locale,
    }))
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = params;
  const post = await getBlogPostBySlug(slug);

  // Return 404 if post not found
  if (!post) {
    notFound();
  }

  // Get locale-specific values
  const localizedLocale = locale as 'en' | 'fr' | 'ar';
  const title = post.title[localizedLocale];
  const excerpt = post.excerpt[localizedLocale];
  const content = post.content[localizedLocale];
  const imageAlt = post.featuredImageAlt?.[localizedLocale] || title;

  // Get author information
  const author = getAuthorBySlug(post.author);
  const authorData = author ? {
    name: author.name[localizedLocale],
    avatar: author.avatarUrl || '/images/default-avatar.png',
    title: author.role?.[localizedLocale] || 'Author',
    bio: author.bio?.[localizedLocale] || '',
  } : {
    name: 'The Elites Team',
    avatar: '/images/default-avatar.png',
    title: 'Author',
    bio: '',
  };

  // Construct full URL for sharing (will be handled client-side in SocialShareSidebar)
  const currentUrl = `https://theelites.io/${locale}/blog/${slug}`;

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
            opacity: 0.05,
          }}
        />
      </div>

      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Social Share Sidebar (Desktop Only) */}
      <SocialShareSidebar title={title} url={currentUrl} />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <BlogHeroImage
          image={post.heroImage || ''}
          alt={imageAlt}
          title={title}
          subtitle={excerpt}
          category={post.category || ''}
          author={authorData}
          publishedDate={post.publishedAt}
          readingTime={post.readingTime.toString()}
          tags={post.tags}
        />

        {/* Article Content (Markdown Rendered to HTML) */}
        <ArticleContent content={content} />

        {/* Author Bio */}
        <AuthorBio author={authorData} />

        {/* Related Posts */}
        <RelatedPosts relatedSlugs={[]} />
      </div>
    </ClientLayoutWrapper>
  );
}
