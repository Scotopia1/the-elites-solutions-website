"use client";
import './FeaturedWork.css';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'Natlaupa Luxury Hotel Booking',
    category: 'Web Development',
    description: 'AI-powered luxury hotel booking platform managing 60+ properties across 3 continents with AI concierge recommendations.',
    image: '/images/projects/natlaupa-featured.jpg',
    tags: ['Next.js', 'React', 'Google Gemini AI', 'Mapbox'],
    link: '/work/natlaupa-luxury-hotel-booking',
  },
  {
    title: 'TRD Structural Remediation',
    category: 'Web Development',
    description: 'Award-worthy structural remediation website featuring industry-first 3D building visualization and WCAG 2.1 AA compliance.',
    image: '/images/projects/trd-featured.jpg',
    tags: ['React Three Fiber', 'GSAP', 'Next.js', 'TypeScript'],
    link: '/work/trd-structural-remediation',
  },
  {
    title: 'Michel Yammine Perfumerie',
    category: 'E-Commerce',
    description: 'Luxury perfume e-commerce platform with AI-powered scent recommendations serving Lebanon since 1970.',
    image: '/images/projects/michelyammine-featured.jpg',
    tags: ['Next.js', 'React', 'PostgreSQL', 'TailwindCSS'],
    link: '/work/michel-yammine-perfumerie',
  },
];

export default function FeaturedWork() {
  return (
    <section className="featured-work-section">
      <div className="featured-work-container">
        {/* Section Header */}
        <div className="featured-work-header">
          <div className="featured-work-title-group">
            <h2>Featured Work</h2>
            <p>Recent projects we're proud of</p>
          </div>
          <Link href="/work" className="view-all-btn">
            View All Projects
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.title} className="project-card">
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
              </div>

              <div className="project-content">
                <div className="project-category">{project.category}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href={project.link} className="project-link">
                  View Case Study
                  <ArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
