import FAQAccordion from "./FAQAccordion";

// Example usage for Contact page
export default function ContactFAQExample() {
  const faqs = [
    {
      question: "What services does The Elites Solutions offer?",
      answer:
        "We specialize in full-stack web development, mobile applications, custom software solutions, UI/UX design, and digital transformation consulting. Our team delivers enterprise-grade solutions tailored to your business needs.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on scope and complexity. A simple website typically takes 2-4 weeks, while complex applications can take 3-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the development process.",
    },
    {
      question: "What is your pricing structure?",
      answer:
        "We offer flexible pricing models including fixed-price projects, time and materials, and retainer agreements. Contact us for a custom quote tailored to your specific requirements and budget.",
    },
    {
      question: "Do you provide ongoing support and maintenance?",
      answer:
        "Yes, we offer comprehensive post-launch support including bug fixes, security updates, performance optimization, and feature enhancements. Our maintenance packages ensure your application stays current and performs optimally.",
    },
    {
      question: "What technologies do you work with?",
      answer:
        "Our tech stack includes React, Next.js, TypeScript, Node.js, Python, PostgreSQL, MongoDB, AWS, and modern DevOps tools. We stay current with industry trends and select the best technologies for each project.",
    },
    {
      question: "How do we get started?",
      answer:
        "Simply reach out through our contact form or schedule a consultation. We'll discuss your project goals, provide a proposal, and outline the next steps. Our team is ready to transform your vision into reality.",
    },
  ];

  return <FAQAccordion title="Got Questions?" faqs={faqs} />;
}
