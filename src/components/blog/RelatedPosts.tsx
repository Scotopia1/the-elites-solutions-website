"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface RelatedPost {
  slug: string;
  title: string;
  category: string;
  readingTime: string;
  publishedDate: string;
  excerpt: string;
}

interface RelatedPostsProps {
  relatedSlugs: string[];
}

export default function RelatedPosts({ relatedSlugs }: RelatedPostsProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRelatedPosts() {
      const loadedPosts: RelatedPost[] = [];

      for (const slug of relatedSlugs.slice(0, 3)) {
        try {
          const metadata = await import(
            `@/data/blog/metadata/${slug}.json`
          );
          const post = metadata.default || metadata;

          loadedPosts.push({
            slug: post.slug,
            title: post.title,
            category: post.category,
            readingTime: post.readingTime,
            publishedDate: post.publishedDate,
            excerpt:
              post.subtitle ||
              "Click to read this insightful article from our blog.",
          });
        } catch (error) {
          console.warn(`Could not load related post: ${slug}`, error);
        }
      }

      setPosts(loadedPosts);
      setLoading(false);
    }

    loadRelatedPosts();
  }, [relatedSlugs]);

  if (loading || posts.length === 0) {
    return null;
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Continue Reading
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Explore more insights and stories from our blog
        </p>
      </motion.div>

      {/* Related Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.article
            key={post.slug}
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            onClick={() => router.push(`/blog/${post.slug}`)}
          >
            {/* Card Container */}
            <div className="relative h-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-gold-400/50 group-hover:shadow-[0_0_30px_rgba(255,215,0,0.15)]">
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400/0 to-gold-600/0 group-hover:from-gold-400/5 group-hover:to-gold-600/10 transition-all duration-300" />

              {/* Content */}
              <div className="relative p-6 flex flex-col h-full">
                {/* Category Badge */}
                <span className="text-gold-400 text-xs uppercase tracking-widest mb-3 inline-block">
                  {post.category}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-gold-400 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-3 text-neutral-500 text-xs pt-4 border-t border-neutral-800">
                  <time>{post.publishedDate}</time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>

                {/* Read More Arrow */}
                <motion.div
                  className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg
                    className="w-4 h-4 text-gold-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
