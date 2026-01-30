import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Folder, ArrowRight } from 'lucide-react';
import { getBlogPostsByCategory, getCategoryBySlug, getAllCategories, getAuthorBySlug } from '@/lib/blog/markdown';
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
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  const categoryName = category.name[locale as keyof typeof category.name] || category.name.en;
  const categoryDescription = category.description?.[locale as keyof typeof category.description] || category.description?.en;

  return {
    title: `${categoryName} | The Elites Solutions Blog`,
    description: categoryDescription || `Browse articles in the ${categoryName} category`,
    openGraph: {
      title: `${categoryName} | Blog`,
      description: categoryDescription || `Browse articles in the ${categoryName} category`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} | Blog`,
      description: categoryDescription || `Browse articles in the ${categoryName} category`,
    },
    alternates: {
      canonical: `https://theelites.io/${locale}/blog/category/${slug}`,
      languages: {
        'en': `https://theelites.io/en/blog/category/${slug}`,
        'fr': `https://theelites.io/fr/blog/category/${slug}`,
        'ar': `https://theelites.io/ar/blog/category/${slug}`,
      },
    },
  };
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = getAllCategories();
  const locales = ['en', 'fr', 'ar'];

  return categories.flatMap(category =>
    locales.map(locale => ({
      slug: category.slug,
      locale,
    }))
  );
}

export default async function CategoryPage({ params }: Props) {
  const { slug, locale } = params;
  const category = getCategoryBySlug(slug);

  // Return 404 if category not found
  if (!category) {
    notFound();
  }

  const posts = await getBlogPostsByCategory(slug);

  const translations = {
    en: {
      back: 'Back to Blog',
      articles: 'articles',
      minRead: 'min read',
      readMore: 'Read More',
      noArticles: 'No articles in this category yet.',
    },
    fr: {
      back: 'Retour au Blog',
      articles: 'articles',
      minRead: 'min de lecture',
      readMore: 'Lire la suite',
      noArticles: 'Aucun article dans cette catégorie pour le moment.',
    },
    ar: {
      back: 'العودة إلى المدونة',
      articles: 'مقالات',
      minRead: 'دقيقة قراءة',
      readMore: 'اقرأ المزيد',
      noArticles: 'لا توجد مقالات في هذه الفئة بعد.',
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

  const categoryName = category.name[locale as keyof typeof category.name] || category.name.en;
  const categoryDescription = category.description?.[locale as keyof typeof category.description] || category.description?.en;

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

            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${category.color || '#C9A227'}20` }}
              >
                <Folder size={28} style={{ color: category.color || '#C9A227' }} />
              </div>
              <div>
                <span className="text-white/50 text-sm">{posts.length} {t.articles}</span>
                <h1 className="font-heading text-4xl md:text-5xl text-white">{categoryName}</h1>
              </div>
            </div>

            {categoryDescription && (
              <p className="text-xl text-white/60 max-w-3xl">
                {categoryDescription}
              </p>
            )}
          </div>
        </section>

        {/* Posts Grid */}
        <section className="px-6 lg:px-20 pb-20">
          <div className="max-w-6xl mx-auto">
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => {
                  const localizedLocale = locale as 'en' | 'fr' | 'ar';
                  const postTitle = post.title[localizedLocale];
                  const postExcerpt = post.excerpt[localizedLocale];
                  const author = getAuthorBySlug(post.author);
                  const authorName = author?.name[localizedLocale] || 'The Elites Team';

                  return (
                  <article key={post.slug} className="group">
                    <Link href={`/${locale}/blog/${post.slug}`} className="block">
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                        {post.heroImage ? (
                          <img
                            src={post.heroImage}
                            alt={postTitle}
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
                        {postTitle}
                      </h2>

                      {postExcerpt && (
                        <p className="text-white/60 text-sm line-clamp-2 mb-4">{postExcerpt}</p>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/50">by {authorName}</span>
                        <span className="text-gold-100 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          {t.readMore} <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  </article>
                  );
                })}
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
