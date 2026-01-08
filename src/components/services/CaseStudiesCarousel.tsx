"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";

interface CaseStudiesCarouselProps {
  caseStudySlugs: string[];
}

export default function CaseStudiesCarousel({
  caseStudySlugs,
}: CaseStudiesCarouselProps) {
  const router = useRouter();
  const constraintsRef = useRef<HTMLDivElement>(null);

  // Mock project data - in production, fetch from actual project data
  const projects = caseStudySlugs.map((slug, index) => ({
    slug,
    title: `Project ${index + 1}`,
    description: "A stunning example of our work",
    image: `/images/projects/${slug}.jpg`,
  }));

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
          Featured Work
        </h2>
        <p className="text-center text-neutral-400 mb-12">
          See how we've helped other clients succeed
        </p>

        {/* Carousel */}
        <div ref={constraintsRef} className="relative overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            className="flex gap-6 cursor-grab active:cursor-grabbing py-4"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                className="flex-shrink-0 w-[300px] md:w-[400px] h-[400px] md:h-[500px] bg-neutral-900 rounded-xl overflow-hidden border border-gold-400/20 hover:border-gold-400/40 transition-colors group cursor-pointer"
                onClick={() => router.push(`/work/${project.slug}`)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {/* Image placeholder */}
                <div className="w-full h-2/3 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center group-hover:opacity-90 transition-opacity">
                  <span className="text-6xl opacity-30">📸</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400">{project.description}</p>

                  <div className="mt-4 flex items-center text-gold-400 group-hover:gap-2 transition-all">
                    <span>View project</span>
                    <svg
                      className="w-5 h-5"
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
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Drag hint */}
        <p className="text-center text-neutral-500 text-sm mt-6">
          ← Drag to explore more projects →
        </p>
      </div>
    </section>
  );
}
