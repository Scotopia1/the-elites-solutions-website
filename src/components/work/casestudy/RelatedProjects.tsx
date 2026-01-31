"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface RelatedProject {
  id?: string;
  slug: string;
  title: string;
  category: string;
  image?: string;
  excerpt?: string;
}

interface RelatedProjectsProps {
  projects: RelatedProject[];
}

export default function RelatedProjects({ projects = [] }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Related Projects
          </h2>
          <Link
            href="/work"
            className="hidden md:flex items-center gap-2 text-[#FFD700] hover:text-[#FFD700]/80 transition-colors"
          >
            <span>View All Work</span>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.id || project.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link href={`/work/${project.slug}`} className="group block">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 mb-4">
                  {/* Image */}
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" />
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#0a0a0a]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      className="w-14 h-14 rounded-full bg-[#FFD700] flex items-center justify-center"
                    >
                      <ArrowUpRight className="w-6 h-6 text-[#0a0a0a]" />
                    </motion.div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/10 rounded-full text-white/80 text-xs font-medium uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white group-hover:text-[#FFD700] transition-colors duration-300">
                  {project.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-4" style={{ width: "max-content" }}>
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id || project.slug}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-[280px] flex-shrink-0"
              >
                <Link href={`/work/${project.slug}`} className="group block">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 mb-3">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="280px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" />
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/10 rounded-full text-white/80 text-xs font-medium uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-white">
                    {project.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile View All Link */}
        <div className="md:hidden mt-6 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors"
          >
            <span>View All Work</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
