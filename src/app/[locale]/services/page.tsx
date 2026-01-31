'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CTASection } from '@/components/sections/CTASection';

// Import static data - use proper services data with full titles
import servicesData from '@/data/services/services.json';
import faqData from '@/data/faq.json';

export default function ServicesPage() {
  // Convert services data to ServicesGrid format
  const services = servicesData.map((service: any) => ({
    id: service.slug,
    title: service.title.en,
    description: service.shortDescription?.en || service.description.en,
    icon: service.icon,
    image: `/images/services/${service.slug}.jpg`,
    href: `/services/${service.slug}`,
  }));

  // Convert FAQ data to FAQAccordion format
  const faqItems = faqData.faqs.map((faq: any) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <main className="services-page">
      <HeroSection
        title="Our Services"
        subtitle="Comprehensive Solutions for Modern Businesses"
        description="From web development to business automation, we provide end-to-end solutions that drive growth and efficiency. Discover how we can help transform your business with cutting-edge technology."
        showTimer={false}
      />

      <ServicesGrid services={services} columns={2} />

      <FAQAccordion
        title="Service FAQs"
        faqs={faqItems}
      />

      <CTASection
        title="Ready to Get Started?"
        description="Let's discuss how our services can help you achieve your business goals."
        buttonText="Contact Us"
        buttonHref="/contact"
      />
    </main>
  );
}
