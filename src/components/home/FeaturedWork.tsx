"use client";
import './FeaturedWork.css';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'TRD Remedial',
    category: 'Web Development',
    description: 'Professional structural remediation company website showcasing their expertise in building repairs, waterproofing, and concrete restoration across Australia.',
    image: '/images/projects/trd-featured.png',
    link: '/work/trd-structural-remediation',
  },
  {
    title: 'Natlaupa',
    category: 'Web Application',
    description: 'Modern booking and management platform designed to streamline reservations and enhance the customer experience for hospitality businesses.',
    image: '/images/projects/natlaupa-featured.png',
    link: '/work/natlaupa-luxury-hotel-booking',
  },
  {
    title: 'Michel Yammine',
    category: 'E-Commerce',
    description: 'Elegant online store for a renowned Lebanese perfume house, bringing decades of fragrance craftsmanship to customers worldwide.',
    image: '/images/projects/michelyammine-featured.png',
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
