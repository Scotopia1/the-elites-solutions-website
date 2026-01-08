"use client";
import './FeaturedWork.css';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform Redesign',
    category: 'Web Development',
    description: 'A fully-featured online store with inventory management, payment processing, and real-time analytics.',
    image: '/images/projects/project-1.jpg',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    link: '/work/project-alpha',
  },
  {
    title: 'Healthcare Mobile App',
    category: 'Mobile Development',
    description: 'Patient management system with appointment scheduling, telemedicine, and medical records.',
    image: '/images/projects/project-2.jpg',
    tags: ['React Native', 'Node.js', 'MongoDB', 'AWS'],
    link: '/work/healthcare-app',
  },
  {
    title: 'Business Automation Suite',
    category: 'Automation',
    description: 'Custom workflow automation reducing manual tasks by 80% and increasing team productivity.',
    image: '/images/projects/project-3.jpg',
    tags: ['Python', 'FastAPI', 'Redis', 'Docker'],
    link: '/work/automation-suite',
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
