'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CTASection } from '@/components/sections/CTASection';

// Import static data
import servicesData from '@/data/services.json';
import faqData from '@/data/faq.json';

export default function ServicesPage() {
  // Convert services data to ServicesGrid format
  const services = servicesData.services.map((service: any) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    icon: service.icon,
    image: service.image || `/images/services/${service.id}.jpg`,
    href: service.href || `/services/${service.slug}`,
  }));

  // Convert FAQ data to FAQAccordion format
  const faqItems = faqData.faqs.map((faq: any) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  // CTA images
  const ctaImages = [
    { src: "/images/services/cta-1.jpg", alt: "Service showcase 1" },
    { src: "/images/services/cta-2.jpg", alt: "Service showcase 2" },
    { src: "/images/services/cta-3.jpg", alt: "Service showcase 3" },
    { src: "/images/services/cta-4.jpg", alt: "Service showcase 4" },
    { src: "/images/services/cta-5.jpg", alt: "Service showcase 5" },
    { src: "/images/services/cta-6.jpg", alt: "Service showcase 6" },
  ];

  return (
    <main className="services-page">
      <HeroSection
        title="Our Services"
        subtitle="Comprehensive Solutions for Modern Businesses"
        description="From web development to business automation, we provide end-to-end solutions that drive growth and efficiency. Discover how we can help transform your business with cutting-edge technology."
        showTimer={false}
      />

      <ServicesGrid services={services} columns={3} />

      <FAQAccordion
        title="Service FAQs"
        faqs={faqItems}
      />

      <CTASection
        title="Ready to Get Started?"
        description="Let's discuss how our services can help you achieve your business goals."
        buttonText="Contact Us"
        buttonHref="/contact"
        images={ctaImages}
      />
    </main>
  );
}
