'use client';

import { ReactLenis } from 'lenis/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Folder, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: { en: string; fr: string; ar: string };
  slug: string;
  excerpt?: { en: string; fr: string; ar: string };
  featuredImageUrl?: string;
  readingTime?: number;
  publishedAt?: string;
  author?: {
    name: { en: string; fr: string; ar: string };
    slug: string;
    avatarUrl?: string;
  };
}

interface Category {
  id: string;
  name: { en: string; fr: string; ar: string };
  slug: string;
  description?: { en: string; fr: string; ar: string };
  color?: string;
}

export default function CategoryPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const slug = params?.slug as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/blog/categories/${slug}`);
        const data = await response.json();

        if (data.success) {
          setCategory(data.data.category);
          setPosts(data.data.posts);
        } else {
          setError(data.message || 'Category not found');
        }
      } catch (err) {
        setError('Failed to load category');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchData();
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-400">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gold-100 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-400">
        <div className="text-center">
          <h1 className="text-4xl font-heading text-white mb-4">Category Not Found</h1>
          <p className="text-white/60 mb-8">{error}</p>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold-100 text-dark-400 font-medium rounded-lg hover:bg-gold-200 transition-colors"
          >
            <ArrowLeft size={20} />
            {t.back}
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = category.name[locale as keyof typeof category.name] || category.name.en;
  const categoryDescription = category.description?.[locale as keyof typeof category.description] || category.description?.en;

  return (
    <ReactLenis root>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0a0a_0%,#1a1a1a_50%,#0a0a0a_100%)]" />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-2 text-white/60 hover:text-gold-100 transition-colors mb-8 group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-heading text-sm uppercase tracking-widest">{t.back}</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-4 mb-6"
            >
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
            </motion.div>

            {categoryDescription && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-white/60 max-w-3xl"
              >
                {categoryDescription}
              </motion.p>
            )}
          </div>
        </section>

        {/* Posts Grid */}
        <section className="px-6 lg:px-20 pb-20">
          <div className="max-w-6xl mx-auto">
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => {
                  const title = post.title[locale as keyof typeof post.title] || post.title.en;
                  const excerpt = post.excerpt?.[locale as keyof typeof post.excerpt] || post.excerpt?.en;
                  const authorName = post.author?.name[locale as keyof typeof post.author.name] || post.author?.name.en;

                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <Link href={`/${locale}/blog/${post.slug}`} className="block">
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                          {post.featuredImageUrl ? (
                            <img
                              src={post.featuredImageUrl}
                              alt={title}
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
                              {post.readingTime} {t.minRead}
                            </span>
                          )}
                        </div>

                        <h2 className="font-heading text-xl text-white mb-2 group-hover:text-gold-100 transition-colors line-clamp-2">
                          {title}
                        </h2>

                        {excerpt && (
                          <p className="text-white/60 text-sm line-clamp-2 mb-4">{excerpt}</p>
                        )}

                        <div className="flex items-center justify-between">
                          {authorName && (
                            <span className="text-sm text-white/50">by {authorName}</span>
                          )}
                          <span className="text-gold-100 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                            {t.readMore} <ArrowRight size={14} />
                          </span>
                        </div>
                      </Link>
                    </motion.article>
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
    </ReactLenis>
  );
}
