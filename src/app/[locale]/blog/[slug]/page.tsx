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
  Eye,
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Link2,
  Tag,
  MessageCircle,
  Send,
  ArrowRight,
  User,
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: { en: string; fr: string; ar: string };
  slug: string;
  excerpt?: { en: string; fr: string; ar: string };
  content: { en: string; fr: string; ar: string };
  featuredImageUrl?: string;
  readingTime?: number;
  viewCount: number;
  publishedAt?: string;
  allowComments: boolean;
  author?: {
    id: string;
    name: { en: string; fr: string; ar: string };
    slug: string;
    bio?: { en: string; fr: string; ar: string };
    avatarUrl?: string;
    role?: { en: string; fr: string; ar: string };
    socialLinks?: {
      twitter?: string;
      linkedin?: string;
      website?: string;
    };
  };
  category?: {
    name: { en: string; fr: string; ar: string };
    slug: string;
    color?: string;
  };
  tags?: Array<{
    id: string;
    name: { en: string; fr: string; ar: string };
    slug: string;
  }>;
  comments?: Array<{
    id: string;
    authorName: string;
    content: string;
    createdAt: string;
    replies?: Array<{
      id: string;
      authorName: string;
      content: string;
      createdAt: string;
    }>;
  }>;
  relatedPosts?: Array<{
    id: string;
    title: { en: string; fr: string; ar: string };
    slug: string;
    featuredImageUrl?: string;
    publishedAt?: string;
    author?: {
      name: { en: string; fr: string; ar: string };
    };
  }>;
}

export default function BlogPostPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [commentForm, setCommentForm] = useState({
    authorName: '',
    authorEmail: '',
    authorWebsite: '',
    content: '',
  });
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);

  const translations = {
    en: {
      back: 'Back to Blog',
      minRead: 'min read',
      views: 'views',
      share: 'Share',
      copyLink: 'Copy Link',
      linkCopied: 'Link copied!',
      writtenBy: 'Written by',
      viewProfile: 'View Profile',
      tags: 'Tags',
      comments: 'Comments',
      leaveComment: 'Leave a Comment',
      name: 'Name',
      email: 'Email',
      website: 'Website (optional)',
      comment: 'Your Comment',
      submit: 'Submit Comment',
      submitting: 'Submitting...',
      commentSubmitted: 'Comment submitted! It will appear after moderation.',
      relatedPosts: 'Related Articles',
      readMore: 'Read More',
    },
    fr: {
      back: 'Retour au Blog',
      minRead: 'min de lecture',
      views: 'vues',
      share: 'Partager',
      copyLink: 'Copier le lien',
      linkCopied: 'Lien copié!',
      writtenBy: 'Écrit par',
      viewProfile: 'Voir le profil',
      tags: 'Tags',
      comments: 'Commentaires',
      leaveComment: 'Laisser un commentaire',
      name: 'Nom',
      email: 'E-mail',
      website: 'Site web (optionnel)',
      comment: 'Votre commentaire',
      submit: 'Soumettre',
      submitting: 'Envoi...',
      commentSubmitted: 'Commentaire soumis! Il apparaîtra après modération.',
      relatedPosts: 'Articles connexes',
      readMore: 'Lire la suite',
    },
    ar: {
      back: 'العودة إلى المدونة',
      minRead: 'دقيقة قراءة',
      views: 'مشاهدة',
      share: 'مشاركة',
      copyLink: 'نسخ الرابط',
      linkCopied: 'تم نسخ الرابط!',
      writtenBy: 'كتبه',
      viewProfile: 'عرض الملف الشخصي',
      tags: 'الوسوم',
      comments: 'التعليقات',
      leaveComment: 'اترك تعليقاً',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      website: 'الموقع (اختياري)',
      comment: 'تعليقك',
      submit: 'إرسال',
      submitting: 'جاري الإرسال...',
      commentSubmitted: 'تم إرسال التعليق! سيظهر بعد المراجعة.',
      relatedPosts: 'مقالات ذات صلة',
      readMore: 'اقرأ المزيد',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blog/posts/${slug}`);
        const data = await response.json();

        if (data.success) {
          setPost(data.data);
        } else {
          setError(data.message || 'Post not found');
        }
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = post?.title[locale as keyof typeof post.title] || post?.title.en || '';

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      // Could show a toast here
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }

    setShowShareMenu(false);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingComment(true);

    try {
      const response = await fetch(`/api/blog/posts/${slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentForm),
      });

      const data = await response.json();

      if (data.success) {
        setCommentSuccess(true);
        setCommentForm({ authorName: '', authorEmail: '', authorWebsite: '', content: '' });
        setTimeout(() => setCommentSuccess(false), 5000);
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-400">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gold-100 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-400">
        <div className="text-center">
          <h1 className="text-4xl font-heading text-white mb-4">Article Not Found</h1>
          <p className="text-white/60 mb-8">{error || 'The article you are looking for does not exist.'}</p>
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

  const title = post.title[locale as keyof typeof post.title] || post.title.en;
  const content = post.content[locale as keyof typeof post.content] || post.content.en;
  const authorName = post.author?.name[locale as keyof typeof post.author.name] || post.author?.name.en;
  const authorBio = post.author?.bio?.[locale as keyof typeof post.author.bio] || post.author?.bio?.en;
  const authorRole = post.author?.role?.[locale as keyof typeof post.author.role] || post.author?.role?.en;

  return (
    <ReactLenis root>
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0a0a_0%,#1a1a1a_50%,#0a0a0a_100%)]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 lg:px-20">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
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

            {/* Category */}
            {post.category && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Link
                  href={`/${locale}/blog/category/${post.category.slug}`}
                  className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-6 transition-colors"
                  style={{
                    backgroundColor: `${post.category.color || '#C9A227'}20`,
                    color: post.category.color || '#C9A227',
                  }}
                >
                  {post.category.name[locale as keyof typeof post.category.name] || post.category.name.en}
                </Link>
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight"
            >
              {title}
            </motion.h1>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 text-white/50 mb-8"
            >
              {post.author && (
                <Link href={`/${locale}/blog/author/${post.author.slug}`} className="flex items-center gap-3 hover:text-white transition-colors">
                  {post.author.avatarUrl ? (
                    <img src={post.author.avatarUrl} alt={authorName} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gold-100/20 flex items-center justify-center">
                      <User size={20} className="text-gold-100" />
                    </div>
                  )}
                  <span>{authorName}</span>
                </Link>
              )}

              {post.publishedAt && (
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {formatDate(post.publishedAt)}
                </span>
              )}

              {post.readingTime && (
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {post.readingTime} {t.minRead}
                </span>
              )}

              <span className="flex items-center gap-2">
                <Eye size={16} />
                {post.viewCount.toLocaleString()} {t.views}
              </span>

              {/* Share Button */}
              <div className="relative ml-auto">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-200/50 hover:bg-dark-200 transition-colors"
                >
                  <Share2 size={16} />
                  {t.share}
                </button>

                {showShareMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-full mt-2 bg-dark-200 rounded-lg border border-white/10 overflow-hidden z-50"
                  >
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 w-full text-left"
                    >
                      <Twitter size={16} /> Twitter
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 w-full text-left"
                    >
                      <Linkedin size={16} /> LinkedIn
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 w-full text-left"
                    >
                      <Facebook size={16} /> Facebook
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 w-full text-left border-t border-white/10"
                    >
                      <Link2 size={16} /> {t.copyLink}
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        {post.featuredImageUrl && (
          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="px-6 lg:px-20 mb-16"
          >
            <div className="max-w-5xl mx-auto">
              <div className="aspect-[21/9] rounded-2xl overflow-hidden">
                <img
                  src={post.featuredImageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.section>
        )}

        {/* Content */}
        <section className="px-6 lg:px-20 pb-20">
          <div className="max-w-4xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="prose prose-lg prose-invert max-w-none"
              style={{
                '--tw-prose-body': 'rgba(255,255,255,0.8)',
                '--tw-prose-headings': '#fff',
                '--tw-prose-links': '#C9A227',
                '--tw-prose-bold': '#fff',
                '--tw-prose-quotes': 'rgba(255,255,255,0.6)',
              } as React.CSSProperties}
            >
              <div
                dangerouslySetInnerHTML={{ __html: content }}
                className="text-white/80 leading-relaxed [&>p]:mb-6 [&>h2]:font-heading [&>h2]:text-3xl [&>h2]:text-white [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:font-heading [&>h3]:text-2xl [&>h3]:text-white [&>h3]:mt-8 [&>h3]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>blockquote]:border-l-4 [&>blockquote]:border-gold-100 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-white/60"
              />
            </motion.article>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 pt-8 border-t border-white/10"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <Tag size={16} className="text-gold-100" />
                  {post.tags.map((tag) => {
                    const tagName = tag.name[locale as keyof typeof tag.name] || tag.name.en;
                    return (
                      <Link
                        key={tag.id}
                        href={`/${locale}/blog/tag/${tag.slug}`}
                        className="px-4 py-1 rounded-full text-sm bg-dark-200/50 text-white/60 hover:text-white hover:bg-gold-100/20 transition-colors"
                      >
                        #{tagName}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Author Box */}
            {post.author && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 p-8 bg-dark-200/30 rounded-2xl border border-white/5"
              >
                <div className="flex items-start gap-6">
                  {post.author.avatarUrl ? (
                    <img
                      src={post.author.avatarUrl}
                      alt={authorName}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gold-100/20 flex items-center justify-center">
                      <User size={32} className="text-gold-100" />
                    </div>
                  )}
                  <div className="flex-1">
                    <span className="text-gold-100 text-sm uppercase tracking-widest">{t.writtenBy}</span>
                    <h3 className="font-heading text-2xl text-white mt-1">{authorName}</h3>
                    {authorRole && <p className="text-white/50 text-sm mt-1">{authorRole}</p>}
                    {authorBio && <p className="text-white/60 mt-3">{authorBio}</p>}
                    <Link
                      href={`/${locale}/blog/author/${post.author.slug}`}
                      className="inline-flex items-center gap-2 text-gold-100 mt-4 hover:gap-3 transition-all"
                    >
                      {t.viewProfile} <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Comments Section */}
            {post.allowComments && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 pt-12 border-t border-white/10"
              >
                <h2 className="font-heading text-3xl text-white mb-8 flex items-center gap-3">
                  <MessageCircle className="text-gold-100" />
                  {t.comments}
                  {post.comments && post.comments.length > 0 && (
                    <span className="text-lg text-white/50">({post.comments.length})</span>
                  )}
                </h2>

                {/* Existing Comments */}
                {post.comments && post.comments.length > 0 && (
                  <div className="space-y-6 mb-12">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="bg-dark-200/30 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-gold-100/20 flex items-center justify-center">
                            <User size={18} className="text-gold-100" />
                          </div>
                          <div>
                            <span className="text-white font-medium">{comment.authorName}</span>
                            <span className="text-white/40 text-sm ml-3">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                        </div>
                        <p className="text-white/70 pl-13">{comment.content}</p>

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-4 ml-12 space-y-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="bg-dark-300/30 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-white font-medium text-sm">{reply.authorName}</span>
                                  <span className="text-white/40 text-xs">{formatDate(reply.createdAt)}</span>
                                </div>
                                <p className="text-white/60 text-sm">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment Form */}
                <div className="bg-dark-200/30 rounded-xl p-8">
                  <h3 className="font-heading text-xl text-white mb-6">{t.leaveComment}</h3>

                  {commentSuccess && (
                    <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
                      {t.commentSubmitted}
                    </div>
                  )}

                  <form onSubmit={handleSubmitComment} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/60 text-sm mb-2">{t.name} *</label>
                        <input
                          type="text"
                          required
                          value={commentForm.authorName}
                          onChange={(e) => setCommentForm({ ...commentForm, authorName: e.target.value })}
                          className="w-full px-4 py-3 bg-dark-300/50 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-gold-100/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm mb-2">{t.email} *</label>
                        <input
                          type="email"
                          required
                          value={commentForm.authorEmail}
                          onChange={(e) => setCommentForm({ ...commentForm, authorEmail: e.target.value })}
                          className="w-full px-4 py-3 bg-dark-300/50 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-gold-100/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-2">{t.website}</label>
                      <input
                        type="url"
                        value={commentForm.authorWebsite}
                        onChange={(e) => setCommentForm({ ...commentForm, authorWebsite: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-300/50 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-gold-100/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-2">{t.comment} *</label>
                      <textarea
                        required
                        rows={5}
                        value={commentForm.content}
                        onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-300/50 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-gold-100/50 transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submittingComment}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gold-100 text-dark-400 font-heading text-sm uppercase tracking-wide rounded-lg hover:bg-gold-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submittingComment ? t.submitting : t.submit}
                      <Send size={16} />
                    </button>
                  </form>
                </div>
              </motion.section>
            )}
          </div>
        </section>

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <section className="py-20 px-6 lg:px-20 border-t border-white/10 bg-dark-300/20">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-heading text-3xl text-white mb-12"
              >
                {t.relatedPosts}
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-6">
                {post.relatedPosts.map((relatedPost, index) => {
                  const relatedTitle = relatedPost.title[locale as keyof typeof relatedPost.title] || relatedPost.title.en;
                  const relatedAuthorName = relatedPost.author?.name[locale as keyof typeof relatedPost.author.name] || relatedPost.author?.name.en;

                  return (
                    <motion.article
                      key={relatedPost.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <Link href={`/${locale}/blog/${relatedPost.slug}`} className="block">
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                          {relatedPost.featuredImageUrl ? (
                            <img
                              src={relatedPost.featuredImageUrl}
                              alt={relatedTitle}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-dark-200 to-dark-300" />
                          )}
                        </div>

                        {relatedPost.publishedAt && (
                          <span className="text-white/50 text-sm">{formatDate(relatedPost.publishedAt)}</span>
                        )}

                        <h3 className="font-heading text-xl text-white mt-2 group-hover:text-gold-100 transition-colors line-clamp-2">
                          {relatedTitle}
                        </h3>

                        {relatedAuthorName && (
                          <span className="text-white/50 text-sm mt-2 block">by {relatedAuthorName}</span>
                        )}
                      </Link>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    </ReactLenis>
  );
}
