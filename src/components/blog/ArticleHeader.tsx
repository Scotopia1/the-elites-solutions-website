"use client";

import { motion } from "framer-motion";

interface Author {
  name: string;
  avatar: string;
  title: string;
}

interface ArticleHeaderProps {
  category: string;
  title: string;
  subtitle?: string;
  author: Author;
  publishedDate: string;
  readingTime: string;
  tags: string[];
}

export default function ArticleHeader({
  tags,
}: ArticleHeaderProps) {
  // If no tags, render nothing
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 -mt-8">
      {/* Tags */}
      <motion.div
        className="flex flex-wrap gap-2 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-neutral-900 border border-gold-400/20 rounded-full text-sm text-neutral-300 hover:border-gold-400/40 transition-colors"
          >
            #{tag}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
