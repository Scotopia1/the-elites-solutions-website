'use client';

import { ReactLenis } from 'lenis/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Twitter,
  Linkedin,
  Globe,
  Github,
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: { en: string; fr: string; ar: string };
  slug: string;
  excerpt?: { en: string; fr: string; ar: string };
  featuredImageUrl?: string;
  readingTime?: number;
  publishedAt?: string;
  category?: {
    name: { en: string; fr: string; ar: string };
    slug: string;
    color?: string;
  };
}

interface Author {
  id: string;
  name: { en: string; fr: string; ar: string };
  slug: string;
  bio?: { en: string; fr: string; ar: string };
  avatarUrl?: string;
  role?: { en: string; fr: string; ar: string };
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export default function AuthorPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const slug = params?.slug as string;

  const [author, setAuthor] = useState<Author | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const translations = {
    en: {
      back: 'Back to Blog',
      articles: 'articles',
      minRead: 'min read',
      readMore: 'Read More',
      noArticles: 'No articles by this author yet.',
      allArticles: 'All Articles',
    },
    fr: {
      back: 'Retour au Blog',
      articles: 'articles',
      minRead: 'min de lecture',
      readMore: 'Lire la suite',
      noArticles: 'Aucun article de cet auteur pour le moment.',
      allArticles: 'Tous les articles',
    },
    ar: {
      back: 'العودة إلى المدونة',
      articles: 'مقالات',
      minRead: 'دقيقة قراءة',
      readMore: 'اقرأ المزيد',
      noArticles: 'لا توجد مقالات من هذا الكاتب بعد.',
      allArticles: 'جميع المقالات',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/blog/authors/${slug}?page=${currentPage}`);
        const data = await response.json();

        if (data.success) {
          setAuthor(data.data.author);
          setPosts(data.data.posts);
          setTotalPosts(data.data.totalPosts);
          setTotalPages(data.data.pagination?.totalPages || 1);
        } else {
          setError(data.message || 'Author not found');
        }
      } catch (err) {
        setError('Failed to load author');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchData();
    }
  }, [slug, currentPage]);

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

  if (error || !author) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-400">
        <div className="text-center">
          <h1 className="text-4xl font-heading text-white mb-4">Author Not Found</h1>
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

  const authorName = author.name[locale as keyof typeof author.name] || author.name.en;
  const authorBio = author.bio?.[locale as keyof typeof author.bio] || author.bio?.en;
  const authorRole = author.role?.[locale as keyof typeof author.role] || author.role?.en;

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

            {/* Author Profile */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8 bg-dark-200/30 rounded-2xl border border-white/5"
            >
              {author.avatarUrl ? (
                <img
                  src={author.avatarUrl}
                  alt={authorName}
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gold-100/20 flex items-center justify-center">
                  <User size={48} className="text-gold-100" />
                </div>
              )}

              <div className="text-center md:text-left flex-1">
                <h1 className="font-heading text-4xl md:text-5xl text-white mb-2">{authorName}</h1>
                {authorRole && (
                  <p className="text-gold-100 text-lg mb-4">{authorRole}</p>
                )}
                {authorBio && (
                  <p className="text-white/60 max-w-2xl mb-6">{authorBio}</p>
                )}

                {/* Social Links */}
                {author.socialLinks && (
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    {author.socialLinks.twitter && (
                      <a
                        href={author.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-dark-300/50 flex items-center justify-center text-white/60 hover:text-gold-100 hover:bg-gold-100/10 transition-colors"
                      >
                        <Twitter size={18} />
                      </a>
                    )}
                    {author.socialLinks.linkedin && (
                      <a
                        href={author.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-dark-300/50 flex items-center justify-center text-white/60 hover:text-gold-100 hover:bg-gold-100/10 transition-colors"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                    {author.socialLinks.github && (
                      <a
                        href={author.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-dark-300/50 flex items-center justify-center text-white/60 hover:text-gold-100 hover:bg-gold-100/10 transition-colors"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {author.socialLinks.website && (
                      <a
                        href={author.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-dark-300/50 flex items-center justify-center text-white/60 hover:text-gold-100 hover:bg-gold-100/10 transition-colors"
                      >
                        <Globe size={18} />
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="text-center md:text-right">
                <span className="text-4xl font-heading text-gold-100">{totalPosts}</span>
                <p className="text-white/50">{t.articles}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="px-6 lg:px-20 pb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-2xl text-white mb-8">{t.allArticles}</h2>

            {posts.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post, index) => {
                    const title = post.title[locale as keyof typeof post.title] || post.title.en;
                    const excerpt = post.excerpt?.[locale as keyof typeof post.excerpt] || post.excerpt?.en;

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
                            {post.category && (
                              <span
                                className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs bg-dark-400/80 text-white"
                                style={{ borderColor: post.category.color || '#C9A227', borderWidth: 1 }}
                              >
                                {post.category.name[locale as keyof typeof post.category.name] || post.category.name.en}
                              </span>
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

                          <span className="text-gold-100 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                            {t.readMore} <ArrowRight size={14} />
                          </span>
                        </Link>
                      </motion.article>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-12">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all ${
                          currentPage === page
                            ? 'bg-gold-100 text-dark-400'
                            : 'bg-dark-200/50 text-white/60 hover:text-white border border-white/10'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                )}
              </>
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
