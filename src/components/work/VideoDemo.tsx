"use client";

import { motion } from "framer-motion";

interface VideoDemoProps {
  videoUrl: string;
  title?: { en: string; fr: string; ar: string };
  locale?: string;
}

export default function VideoDemo({ videoUrl, title, locale = 'en' }: VideoDemoProps) {
  // Don't render if no video URL
  if (!videoUrl) return null;

  // Extract YouTube video ID if it's a YouTube URL
  const getYouTubeEmbedUrl = (url: string): string => {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Watch the Demo
        </motion.h2>

        <motion.div
          className="relative aspect-video rounded-2xl overflow-hidden border border-gold-400/20 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <iframe
            src={embedUrl}
            title="Project Demo Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </motion.div>
      </div>
    </section>
  );
}