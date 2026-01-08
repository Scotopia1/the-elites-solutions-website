import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Hash, ArrowRight } from 'lucide-react';
import { getBlogPostsByTag, getTagBySlug, getAllTags } from '@/lib/blog/markdown';
import LenisWrapper from '@/components/services/LenisWrapper';

interface Props {
  params: {
    slug: string;
    locale: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = params;
  const tag = getTagBySlug(slug);

  if (!tag) {
    return {
      title: 'Tag Not Found',
    };
  }

  const tagName = tag.name[locale as keyof typeof tag.name] || tag.name.en;

  return {
    title: `${tagName} | The Elites Solutions Blog`,
    description: `Browse articles tagged with ${tagName}`,
    openGraph: {
      title: `${tagName} | Blog`,
      description: `Browse articles tagged with ${tagName}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tagName} | Blog`,
      description: `Browse articles tagged with ${tagName}`,
    },
    alternates: {
      canonical: `https://theelites.io/${locale}/blog/tag/${slug}`,
      languages: {
        'en': `https://theelites.io/en/blog/tag/${slug}`,
        'fr': `https://theelites.io/fr/blog/tag/${slug}`,
        'ar': `https://theelites.io/ar/blog/tag/${slug}`,
      },
    },
  };
}

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = getAllTags();
  const locales = ['en', 'fr', 'ar'];

  return tags.flatMap(tag =>
    locales.map(locale => ({
      slug: tag.slug,
      locale,
    }))
  );
}

export default async function TagPage({ params }: Props) {
  const { slug, locale } = params;
  const tag = getTagBySlug(slug);

  // Return 404 if tag not found
  if (!tag) {
    notFound();
  }

  const posts = await getBlogPostsByTag(slug);

  const translations = {
    en: {
      back: 'Back to Blog',
      articlesTagged: 'Articles tagged with',
      articles: 'articles',
      minRead: 'min read',
      readMore: 'Read More',
      noArticles: 'No articles with this tag yet.',
    },
    fr: {
      back: 'Retour au Blog',
      articlesTagged: 'Articles tagués avec',
      articles: 'articles',
      minRead: 'min de lecture',
      readMore: 'Lire la suite',
      noArticles: 'Aucun article avec ce tag pour le moment.',
    },
    ar: {
      back: 'العودة إلى المدونة',
      articlesTagged: 'مقالات موسومة بـ',
      articles: 'مقالات',
      minRead: 'دقيقة قراءة',
      readMore: 'اقرأ المزيد',
      noArticles: 'لا توجد مقالات بهذا الوسم بعد.',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const tagName = tag.name[locale as keyof typeof tag.name] || tag.name.en;

  return (
    <LenisWrapper>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0a0a_0%,#1a1a1a_50%,#0a0a0a_100%)]" />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-white/60 hover:text-gold-100 transition-colors mb-8 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-heading text-sm uppercase tracking-widest">{t.back}</span>
            </Link>

            <div>
              <span className="text-white/50 text-lg">{t.articlesTagged}</span>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-12 h-12 rounded-xl bg-gold-100/20 flex items-center justify-center">
                  <Hash size={24} className="text-gold-100" />
                </div>
                <h1 className="font-heading text-4xl md:text-5xl text-white">{tagName}</h1>
                <span className="px-3 py-1 rounded-full bg-dark-200/50 text-white/50 text-sm">
                  {posts.length} {t.articles}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="px-6 lg:px-20 pb-20">
          <div className="max-w-6xl mx-auto">
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article key={post.slug} className="group">
                    <Link href={`/${locale}/blog/${post.slug}`} className="block">
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                        {post.heroImage ? (
                          <img
                            src={post.heroImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-dark-200 to-dark-300" />
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-white/50 mb-3">
                        {post.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(post.publishedAt)}
                          </span>
                        )}
                        {post.readingTime && (
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {post.readingTime}
                          </span>
                        )}
                      </div>

                      <h2 className="font-heading text-xl text-white mb-2 group-hover:text-gold-100 transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-white/60 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                      )}

                      <div className="flex items-center justify-between">
                        {post.author?.name && (
                          <span className="text-sm text-white/50">by {post.author.name}</span>
                        )}
                        <span className="text-gold-100 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          {t.readMore} <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-white/50 text-lg">{t.noArticles}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </LenisWrapper>
  );
}
