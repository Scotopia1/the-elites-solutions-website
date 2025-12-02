'use client';

import { ReactLenis } from 'lenis/react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, Tag, Folder, X } from 'lucide-react';

interface BlogPost {
  id: string;
  title: { en: string; fr: string; ar: string };
  slug: string;
  excerpt?: { en: string; fr: string; ar: string };
  featuredImageUrl?: string;
  readingTime?: number;
  publishedAt?: string;
  isFeatured?: boolean;
  author?: {
    name: { en: string; fr: string; ar: string };
    slug: string;
    avatarUrl?: string;
  };
  category?: {
    name: { en: string; fr: string; ar: string };
    slug: string;
    color?: string;
  };
  tags?: Array<{
    name: { en: string; fr: string; ar: string };
    slug: string;
  }>;
}

interface Category {
  id: string;
  name: { en: string; fr: string; ar: string };
  slug: string;
  color?: string;
  postCount: number;
}

interface Tag {
  id: string;
  name: { en: string; fr: string; ar: string };
  slug: string;
  postCount: number;
}

export default function BlogPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || 'en';

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const translations = {
    en: {
      title: 'Blog',
      subtitle: 'Insights, tutorials, and industry trends',
      search: 'Search articles...',
      categories: 'Categories',
      tags: 'Popular Tags',
      featured: 'Featured',
      readMore: 'Read More',
      minRead: 'min read',
      allPosts: 'All Posts',
      noResults: 'No articles found',
      tryDifferent: 'Try a different search term or category',
    },
    fr: {
      title: 'Blog',
      subtitle: 'Perspectives, tutoriels et tendances du secteur',
      search: 'Rechercher des articles...',
      categories: 'Catégories',
      tags: 'Tags Populaires',
      featured: 'En vedette',
      readMore: 'Lire la suite',
      minRead: 'min de lecture',
      allPosts: 'Tous les articles',
      noResults: 'Aucun article trouvé',
      tryDifferent: 'Essayez un autre terme de recherche ou une autre catégorie',
    },
    ar: {
      title: 'المدونة',
      subtitle: 'رؤى ودروس واتجاهات الصناعة',
      search: 'البحث في المقالات...',
      categories: 'التصنيفات',
      tags: 'الوسوم الشائعة',
      featured: 'مميز',
      readMore: 'اقرأ المزيد',
      minRead: 'دقيقة قراءة',
      allPosts: 'جميع المقالات',
      noResults: 'لم يتم العثور على مقالات',
      tryDifferent: 'جرب كلمة بحث أو فئة مختلفة',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  const fetchPosts = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set('page', currentPage.toString());
      queryParams.set('limit', '9');
      if (searchQuery) queryParams.set('search', searchQuery);
      if (activeCategory) queryParams.set('category', activeCategory);

      const response = await fetch(`/api/blog/posts?${queryParams.toString()}`);
      const data = await response.json();

      if (data.success) {
        setPosts(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
        setFeaturedPosts(data.data.filter((p: BlogPost) => p.isFeatured).slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, [currentPage, searchQuery, activeCategory]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/blog/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/blog/tags');
      const data = await response.json();
      if (data.success) {
        setTags(data.data.slice(0, 10)); // Top 10 tags
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  useEffect(() => {
    Promise.all([fetchPosts(), fetchCategories(), fetchTags()]).finally(() => {
      setLoading(false);
    });
  }, [fetchPosts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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
          <p className="text-white/60">Loading blog...</p>
        </div>
      </div>
    );
  }

  return (
    <ReactLenis root>
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0a0a_0%,#1a1a1a_50%,#0a0a0a_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-screen"
          style={{
            backgroundImage: "url('/textures/Gold.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-[50vh] flex flex-col justify-center px-6 lg:px-20 pt-32 pb-16">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <span className="font-heading text-gold-100 text-sm uppercase tracking-widest mb-4 block">
                {t.subtitle}
              </span>
              <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-white mb-8">
                {t.title}
              </h1>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-dark-200/50 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold-100/50 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories Filters */}
        {categories.length > 0 && (
          <section className="px-6 lg:px-20 py-8 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    !activeCategory
                      ? 'bg-gold-100 text-dark-400'
                      : 'bg-dark-200/50 text-white/70 hover:text-white border border-white/10'
                  }`}
                >
                  {t.allPosts}
                </button>
                {categories.map((cat) => {
                  const catName = cat.name[locale as keyof typeof cat.name] || cat.name.en;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.slug)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                        activeCategory === cat.slug
                          ? 'bg-gold-100 text-dark-400'
                          : 'bg-dark-200/50 text-white/70 hover:text-white border border-white/10'
                      }`}
                    >
                      <Folder size={14} />
                      {catName}
                      <span className="opacity-60">({cat.postCount})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Featured Posts */}
        {featuredPosts.length > 0 && !searchQuery && !activeCategory && (
          <section className="px-6 lg:px-20 py-16">
            <div className="max-w-7xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-heading text-3xl text-white mb-8 flex items-center gap-3"
              >
                <span className="w-8 h-8 rounded-full bg-gold-100/20 flex items-center justify-center">
                  ⭐
                </span>
                {t.featured}
              </motion.h2>

              <div className="grid lg:grid-cols-3 gap-6">
                {featuredPosts.map((post, index) => {
                  const title = post.title[locale as keyof typeof post.title] || post.title.en;
                  const excerpt = post.excerpt?.[locale as keyof typeof post.excerpt] || post.excerpt?.en;
                  const authorName = post.author?.name[locale as keyof typeof post.author.name] || post.author?.name.en;

                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
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
                            <div className="w-full h-full bg-gradient-to-br from-gold-100/20 to-gold-100/5" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-400/80 to-transparent" />
                          {post.category && (
                            <span
                              className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-dark-400/80 text-white"
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

                        <h3 className="font-heading text-xl text-white mb-2 group-hover:text-gold-100 transition-colors line-clamp-2">
                          {title}
                        </h3>

                        {excerpt && (
                          <p className="text-white/60 text-sm line-clamp-2 mb-4">{excerpt}</p>
                        )}

                        <div className="flex items-center justify-between">
                          {post.author && (
                            <div className="flex items-center gap-2">
                              {post.author.avatarUrl ? (
                                <img
                                  src={post.author.avatarUrl}
                                  alt={authorName}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-gold-100/20" />
                              )}
                              <span className="text-sm text-white/60">{authorName}</span>
                            </div>
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
            </div>
          </section>
        )}

        {/* All Posts Grid */}
        <section className="px-6 lg:px-20 py-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Posts Grid */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  {posts.length > 0 ? (
                    <motion.div
                      key="posts"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {posts.map((post, index) => {
                        const title = post.title[locale as keyof typeof post.title] || post.title.en;
                        const excerpt = post.excerpt?.[locale as keyof typeof post.excerpt] || post.excerpt?.en;

                        return (
                          <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group"
                          >
                            <Link href={`/${locale}/blog/${post.slug}`} className="block">
                              <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-3">
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

                              <div className="flex items-center gap-3 text-xs text-white/50 mb-2">
                                {post.publishedAt && (
                                  <span>{formatDate(post.publishedAt)}</span>
                                )}
                                {post.readingTime && (
                                  <span>• {post.readingTime} {t.minRead}</span>
                                )}
                              </div>

                              <h3 className="font-heading text-lg text-white mb-2 group-hover:text-gold-100 transition-colors line-clamp-2">
                                {title}
                              </h3>

                              {excerpt && (
                                <p className="text-white/50 text-sm line-clamp-2">{excerpt}</p>
                              )}
                            </Link>
                          </motion.article>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20"
                    >
                      <div className="w-16 h-16 rounded-full bg-dark-200/50 flex items-center justify-center mx-auto mb-4">
                        <Search size={24} className="text-white/40" />
                      </div>
                      <h3 className="text-xl text-white mb-2">{t.noResults}</h3>
                      <p className="text-white/50">{t.tryDifferent}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

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
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1 space-y-8">
                {/* Categories */}
                {categories.length > 0 && (
                  <div className="bg-dark-200/30 rounded-xl p-6 border border-white/5">
                    <h3 className="font-heading text-lg text-white mb-4 flex items-center gap-2">
                      <Folder size={18} className="text-gold-100" />
                      {t.categories}
                    </h3>
                    <ul className="space-y-2">
                      {categories.map((cat) => {
                        const catName = cat.name[locale as keyof typeof cat.name] || cat.name.en;
                        return (
                          <li key={cat.id}>
                            <button
                              onClick={() => setActiveCategory(cat.slug)}
                              className="w-full flex items-center justify-between py-2 text-white/60 hover:text-gold-100 transition-colors"
                            >
                              <span>{catName}</span>
                              <span className="text-sm opacity-60">{cat.postCount}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="bg-dark-200/30 rounded-xl p-6 border border-white/5">
                    <h3 className="font-heading text-lg text-white mb-4 flex items-center gap-2">
                      <Tag size={18} className="text-gold-100" />
                      {t.tags}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => {
                        const tagName = tag.name[locale as keyof typeof tag.name] || tag.name.en;
                        return (
                          <Link
                            key={tag.id}
                            href={`/${locale}/blog/tag/${tag.slug}`}
                            className="px-3 py-1 text-sm rounded-full bg-dark-300/50 text-white/60 hover:text-white hover:bg-gold-100/20 transition-colors"
                          >
                            #{tagName}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>
      </div>
    </ReactLenis>
  );
}
