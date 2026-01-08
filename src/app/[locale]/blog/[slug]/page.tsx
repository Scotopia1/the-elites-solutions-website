import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blog/markdown';
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

    return {
      title: `${post.title} | The Elites Solutions Blog`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt || post.publishedAt,
        authors: [post.author.name],
        images: post.heroImage ? [
          {
            url: post.heroImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
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
      <SocialShareSidebar title={post.title} url={currentUrl} />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <BlogHeroImage
          image={post.heroImage}
          alt={post.title}
          title={post.title}
          subtitle={post.excerpt}
          category={post.category}
          author={post.author}
          publishedDate={post.publishedAt}
          readingTime={post.readingTime}
          tags={post.tags}
        />

        {/* Article Content (Markdown Rendered to HTML) */}
        <ArticleContent content={post.content} />

        {/* Author Bio */}
        <AuthorBio author={post.author} />

        {/* Related Posts */}
        <RelatedPosts relatedSlugs={post.relatedPosts || []} />
      </div>
    </ClientLayoutWrapper>
  );
}
