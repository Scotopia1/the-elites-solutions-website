import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
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
import { getBlogPostsByAuthor, getAuthorBySlug, getAllAuthors } from '@/lib/blog/markdown';
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
  const author = getAuthorBySlug(slug);

  if (!author) {
    return {
      title: 'Author Not Found',
    };
  }

  const authorName = author.name[locale as keyof typeof author.name] || author.name.en;
  const authorBio = author.bio?.[locale as keyof typeof author.bio] || author.bio?.en;

  return {
    title: `${authorName} | The Elites Solutions Blog`,
    description: authorBio || `Articles by ${authorName}`,
    openGraph: {
      title: `${authorName} | Blog`,
      description: authorBio || `Articles by ${authorName}`,
      type: 'profile',
      images: author.avatarUrl ? [author.avatarUrl] : [],
    },
    twitter: {
      card: 'summary',
      title: `${authorName} | Blog`,
      description: authorBio || `Articles by ${authorName}`,
      images: author.avatarUrl ? [author.avatarUrl] : [],
    },
    alternates: {
      canonical: `https://theelites.io/${locale}/blog/author/${slug}`,
      languages: {
        'en': `https://theelites.io/en/blog/author/${slug}`,
        'fr': `https://theelites.io/fr/blog/author/${slug}`,
        'ar': `https://theelites.io/ar/blog/author/${slug}`,
      },
    },
  };
}

// Generate static params for all authors
export async function generateStaticParams() {
  const authors = getAllAuthors();
  const locales = ['en', 'fr', 'ar'];

  return authors.flatMap(author =>
    locales.map(locale => ({
      slug: author.slug,
      locale,
    }))
  );
}

export default async function AuthorPage({ params }: Props) {
  const { slug, locale } = params;
  const author = getAuthorBySlug(slug);

  // Return 404 if author not found
  if (!author) {
    notFound();
  }

  const posts = await getBlogPostsByAuthor(slug);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const authorName = author.name[locale as keyof typeof author.name] || author.name.en;
  const authorBio = author.bio?.[locale as keyof typeof author.bio] || author.bio?.en;
  const authorRole = author.role?.[locale as keyof typeof author.role] || author.role?.en;

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

            {/* Author Profile */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8 bg-dark-200/30 rounded-2xl border border-white/5">
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
                <span className="text-4xl font-heading text-gold-100">{posts.length}</span>
                <p className="text-white/50">{t.articles}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="px-6 lg:px-20 pb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-2xl text-white mb-8">{t.allArticles}</h2>

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
                        {post.category && (
                          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs bg-dark-400/80 text-white border border-gold-100/30">
                            {post.category}
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

                      <span className="text-gold-100 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        {t.readMore} <ArrowRight size={14} />
                      </span>
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
