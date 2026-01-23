"use client";

import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { FeaturedServicesHeader } from '@/components/home/FeaturedServicesHeader';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { CTASection } from '@/components/sections/CTASection';
import FeaturedWork from '@/components/home/FeaturedWork';
import ClientReviews from '@/components/home/ClientReviews';

export default function HomePage() {
  // Stats data
  const stats = [
    { label: "Projects Delivered", value: 150, suffix: "+" },
    { label: "Client Satisfaction", value: 98, suffix: "%" },
    { label: "Years Experience", value: 5, suffix: "+" },
    { label: "Team Members", value: 12, suffix: "" },
  ];

  // Services data
  const services = [
    {
      id: "web-development",
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies. Fast, responsive, and optimized for performance.",
      icon: "🌐",
      image: "/images/services/web-dev.jpg",
      href: "/services/web-development",
    },
    {
      id: "mobile-apps",
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android. Seamless user experiences on every device.",
      icon: "📱",
      image: "/images/services/mobile.jpg",
      href: "/services/mobile-apps",
    },
    {
      id: "automation",
      title: "Business Automation",
      description: "Streamline your operations with custom automation solutions. Save time and reduce manual work.",
      icon: "⚡",
      image: "/images/services/automation.jpg",
      href: "/services/automation",
    },
  ];

  // CTA images
  const ctaImages = [
    { src: "/images/cta/project-1.jpg", alt: "Project showcase 1" },
    { src: "/images/cta/project-2.jpg", alt: "Project showcase 2" },
    { src: "/images/cta/project-3.jpg", alt: "Project showcase 3" },
    { src: "/images/cta/project-4.jpg", alt: "Project showcase 4" },
    { src: "/images/cta/project-5.jpg", alt: "Project showcase 5" },
    { src: "/images/cta/project-6.jpg", alt: "Project showcase 6" },
  ];

  return (
    <>
      <HeroSection
        title="The Elites Solutions"
        subtitle="Custom Business Automation & Software"
        description="We build automation systems that help businesses run smoother. Custom websites & software built for YOUR business."
        backgroundImage="/images/hero-bg.jpg"
        ctaText="Start Your Project"
        ctaHref="/contact"
        showTimer={true}
      />

      <StatsSection stats={stats} />

      <section>
        <FeaturedServicesHeader
          title="Our Services"
          description="Comprehensive solutions for modern businesses"
        />
        <ServicesGrid services={services} columns={3} />
      </section>

      <FeaturedWork />
      <ClientReviews />

      <CTASection
        title="Ready to Transform Your Business?"
        description="Let's discuss how we can help you achieve your goals with custom software solutions."
        buttonText="Get Started"
        buttonHref="/contact"
        images={ctaImages}
        logoSrc="/logo-gold.svg"
      />
    </>
  );
}
