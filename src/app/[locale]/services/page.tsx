'use client';

import { ServicesHero, ServicesBentoGrid, FAQSection } from '@/components/services';
import CTA from '@/components/home/CTA';

// Import static data
import servicesData from '@/data/services.json';
import faqData from '@/data/faq.json';

// Convert JSON to BentoServiceData format
const services = servicesData.services.map((service) => ({
  ...service,
  gridPosition: {
    mobile: service.gridPosition.mobile,
    tablet: service.gridPosition.tablet,
    desktop: service.gridPosition.desktop,
  },
}));

export default function ServicesPage() {
  return (
    <main className="services-page">
      {/* Hero Section with gold particles */}
      <ServicesHero />

      {/* Bento Grid Services Section */}
      <ServicesBentoGrid services={services} />

      {/* FAQ Section */}
      <FAQSection faqs={faqData.faqs} />

      {/* CTA Section */}
      <CTA />
    </main>
  );
}
