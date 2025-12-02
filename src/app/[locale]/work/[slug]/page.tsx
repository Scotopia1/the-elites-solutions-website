'use client';

import { ReactLenis } from 'lenis/react';
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ProjectData {
  id: string;
  title: { en: string; fr: string; ar: string };
  slug: string;
  clientName: string;
  clientLogoUrl?: string;
  challenge: { en: string; fr: string; ar: string };
  solution: { en: string; fr: string; ar: string };
  results: { en: string; fr: string; ar: string };
  technologies: string[];
  featuredImageUrl: string;
  images?: Array<{ url: string; alt: string }>;
  projectUrl?: string;
  duration?: string;
  services?: any[];
  relatedProjects?: any[];
}

export default function ProjectDetailPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const slug = params?.slug as string;

  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const challengeRef = useRef<HTMLDivElement>(null);

  // Parallax effect for hero image
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`/api/projects/${slug}`);
        const data = await response.json();

        if (data.success) {
          setProject(data.data);
        } else {
          setError(data.message || 'Project not found');
        }
      } catch (err) {
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  // Word reveal animation for challenge section
  useGSAP(() => {
    if (!challengeRef.current || !project) return;

    const words = challengeRef.current.querySelectorAll('.reveal-word');

    gsap.fromTo(
      words,
      { opacity: 0.2 },
      {
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: challengeRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 1,
        },
      }
    );
  }, [project]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-400">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gold-100 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-400">
        <div className="text-center">
          <h1 className="text-4xl font-heading text-white mb-4">Project Not Found</h1>
          <p className="text-white/60 mb-8">{error || 'The project you are looking for does not exist.'}</p>
          <Link
            href={`/${locale}/work`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold-100 text-dark-400 font-medium rounded-lg hover:bg-gold-200 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Work
          </Link>
        </div>
      </div>
    );
  }

  const title = project.title[locale as keyof typeof project.title] || project.title.en;
  const challenge = project.challenge[locale as keyof typeof project.challenge] || project.challenge.en;
  const solution = project.solution[locale as keyof typeof project.solution] || project.solution.en;
  const results = project.results[locale as keyof typeof project.results] || project.results.en;

  // Split challenge text into words for reveal animation
  const challengeWords = challenge.split(' ');

  return (
    <ReactLenis root>
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0a0a_0%,#1a1a1a_50%,#0a0a0a_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-[90vh] overflow-hidden">
          {/* Featured Image with Parallax */}
          <motion.div
            style={{ y: heroY }}
            className="absolute inset-0"
          >
            <Image
              src={project.featuredImageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-400 via-dark-400/60 to-transparent" />
          </motion.div>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-20">
            <div className="max-w-6xl mx-auto">
              {/* Back Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  href={`/${locale}/work`}
                  className="inline-flex items-center gap-2 text-white/60 hover:text-gold-100 transition-colors mb-8 group"
                >
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="font-heading text-sm uppercase tracking-widest">Back to Work</span>
                </Link>
              </motion.div>

              {/* Client Name */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-heading text-gold-100 text-sm uppercase tracking-widest mb-4"
              >
                {project.clientName}
              </motion.p>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[0.9]"
              >
                {title}
              </motion.h1>

              {/* Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap items-center gap-6"
              >
                {project.duration && (
                  <div className="flex items-center gap-2 text-white/60">
                    <Clock size={18} />
                    <span>{project.duration}</span>
                  </div>
                )}
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gold-100 hover:text-gold-200 transition-colors"
                  >
                    <ExternalLink size={18} />
                    <span>Visit Project</span>
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Challenge Section */}
        <section ref={challengeRef} className="py-32 px-6 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <span className="font-heading text-gold-100 text-sm uppercase tracking-widest">
                The Challenge
              </span>
            </motion.div>

            <p className="font-heading text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight">
              {challengeWords.map((word, index) => (
                <span key={index} className="reveal-word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 px-6 lg:px-20 bg-dark-300/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="font-heading text-gold-100 text-sm uppercase tracking-widest mb-4 block">
                  The Solution
                </span>
                <h2 className="font-heading text-3xl md:text-4xl text-white mb-6">
                  How We Solved It
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-white/70 leading-relaxed whitespace-pre-line"
              >
                {solution}
              </motion.div>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-16"
              >
                <span className="font-heading text-gold-100 text-sm uppercase tracking-widest mb-6 block">
                  Technologies Used
                </span>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-dark-200 text-white/80 text-sm rounded-full border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Results Section */}
        <section className="py-32 px-6 lg:px-20">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-heading text-gold-100 text-sm uppercase tracking-widest mb-6 block">
                The Results
              </span>
              <p className="font-heading text-2xl md:text-4xl text-white leading-relaxed">
                {results}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <section className="py-20 px-6 lg:px-20 bg-dark-300/30">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <span className="font-heading text-gold-100 text-sm uppercase tracking-widest">
                  Project Gallery
                </span>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {project.images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative aspect-video rounded-xl overflow-hidden group"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-32 px-6 lg:px-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-100/5 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <h2 className="font-heading text-4xl md:text-6xl text-white mb-6">
              Have a Similar Project?
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help bring your vision to life with our expertise and innovative solutions.
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold-100 text-dark-400 font-heading text-lg uppercase tracking-wide rounded-lg hover:bg-gold-200 transition-colors group"
            >
              Start Your Project
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </section>

        {/* Related Projects */}
        {project.relatedProjects && project.relatedProjects.length > 0 && (
          <section className="py-20 px-6 lg:px-20 border-t border-white/10">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-between mb-12"
              >
                <div>
                  <span className="font-heading text-gold-100 text-sm uppercase tracking-widest mb-2 block">
                    More Work
                  </span>
                  <h2 className="font-heading text-3xl md:text-4xl text-white">
                    Related Projects
                  </h2>
                </div>
                <Link
                  href={`/${locale}/work`}
                  className="hidden md:inline-flex items-center gap-2 text-white/60 hover:text-gold-100 transition-colors group"
                >
                  <span className="font-heading text-sm uppercase tracking-widest">View All</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {project.relatedProjects.map((relatedProject: any, index: number) => {
                  const relatedTitle = relatedProject.title[locale as keyof typeof relatedProject.title] || relatedProject.title.en;

                  return (
                    <motion.div
                      key={relatedProject.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Link
                        href={`/${locale}/work/${relatedProject.slug}`}
                        className="block group"
                      >
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                          <Image
                            src={relatedProject.featuredImageUrl}
                            alt={relatedTitle}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-dark-400/40 group-hover:bg-dark-400/20 transition-colors" />
                        </div>
                        <p className="text-gold-100 text-sm font-heading uppercase tracking-widest mb-2">
                          {relatedProject.clientName}
                        </p>
                        <h3 className="font-heading text-xl text-white group-hover:text-gold-100 transition-colors">
                          {relatedTitle}
                        </h3>
                      </Link>
                    </motion.div>
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
