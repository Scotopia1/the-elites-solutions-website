"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/data/projects";

interface NextProjectTeaserProps {
  nextProject: Project;
  locale: string;
}

export default function NextProjectTeaser({ nextProject, locale }: NextProjectTeaserProps) {
  const router = useRouter();

  if (!nextProject) return null;

  const title = nextProject.title[locale as keyof typeof nextProject.title] || nextProject.title.en;
  const shortDescription = nextProject.shortDescription?.[locale as keyof typeof nextProject.shortDescription] || 
                          nextProject.shortDescription?.en || 
                          nextProject.challenge[locale as keyof typeof nextProject.challenge] ||
                          nextProject.challenge.en;

  return (
    <section className="py-20 bg-black border-t border-gold-400/20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold-400 text-sm uppercase tracking-widest mb-2">
            Up Next
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Explore Another Project
          </h2>
        </motion.div>

        <motion.div
          className="relative max-w-4xl mx-auto group cursor-pointer"
          onClick={() => router.push(`/${locale}/work/${nextProject.slug}`)}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative h-96 rounded-2xl overflow-hidden border border-gold-400/20 group-hover:border-gold-400/40 transition-colors">
            {/* Project Image */}
            {nextProject.heroImage || nextProject.featuredImageUrl ? (
              <img
                src={nextProject.heroImage || nextProject.featuredImageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-black flex items-center justify-center">
                <span className="text-8xl opacity-20">📁</span>
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="text-gold-400 text-xs uppercase tracking-widest mb-2">
                {nextProject.category}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                {title}
              </h3>
              <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                {shortDescription}
              </p>
              <div className="flex items-center gap-2 text-gold-400">
                <span>View Case Study</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              </div>
            </div>
          </div>

          {/* Glow effect on hover */}
          <div className="absolute inset-0 -z-10 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-r from-gold-400 to-gold-600 rounded-2xl" />
        </motion.div>
      </div>
    </section>
  );
}