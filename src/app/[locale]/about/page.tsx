import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { IntroSection } from '@/components/sections/IntroSection';
import { RoutineSlider } from '@/components/sections/RoutineSlider';
import { TeamSection } from '@/components/sections/TeamSection';
import { FAQAccordion } from '@/components/sections/FAQAccordion';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about The Elites Solutions - your partner in custom business automation and software development. Discover our mission, values, team, and journey since 2019.',
  keywords: ['about us', 'company history', 'team', 'mission', 'values', 'business automation', 'software development'],
  openGraph: {
    title: 'About The Elites Solutions',
    description: 'Custom business automation and software solutions since 2019. Meet our team and discover our mission.',
    type: 'website',
    url: 'https://theelites.io/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About The Elites Solutions',
    description: 'Custom business automation and software solutions since 2019. Meet our team and discover our mission.',
  },
  alternates: {
    canonical: 'https://theelites.io/about',
    languages: {
      en: 'https://theelites.io/en/about',
      fr: 'https://theelites.io/fr/about',
      ar: 'https://theelites.io/ar/about',
    },
  },
};

export default function AboutPage() {
  // Workflow steps
  const workflowSteps = [
    {
      number: "01",
      title: "Discovery",
      description: "We start by understanding your business needs, goals, and challenges through in-depth consultation.",
    },
    {
      number: "02",
      title: "Strategy",
      description: "Our team develops a comprehensive strategy tailored to your specific requirements and objectives.",
    },
    {
      number: "03",
      title: "Design",
      description: "We create intuitive, user-friendly designs that align with your brand and delight your users.",
    },
    {
      number: "04",
      title: "Development",
      description: "Our expert developers bring the designs to life with clean, efficient, and scalable code.",
    },
    {
      number: "05",
      title: "Testing",
      description: "Rigorous quality assurance ensures your solution works flawlessly across all platforms.",
    },
    {
      number: "06",
      title: "Launch",
      description: "We handle deployment and provide ongoing support to ensure your success.",
    },
  ];

  // Team members
  const teamMembers = [
    {
      name: "John Palmer",
      role: "Founder & CEO",
      image: "/images/team/john.jpg",
      bio: "Visionary leader with 10+ years in software development and business strategy.",
    },
    {
      name: "Sarah Chen",
      role: "Lead Developer",
      image: "/images/team/sarah.jpg",
      bio: "Full-stack expert specializing in scalable web applications and cloud architecture.",
    },
    {
      name: "Michael Rodriguez",
      role: "UI/UX Designer",
      image: "/images/team/michael.jpg",
      bio: "Award-winning designer creating beautiful, user-centered digital experiences.",
    },
    {
      name: "Emily Watson",
      role: "Project Manager",
      image: "/images/team/emily.jpg",
      bio: "Agile expert ensuring projects are delivered on time and exceed expectations.",
    },
  ];

  // FAQ items
  const faqItems = [
    {
      question: "What services does The Elites Solutions offer?",
      answer: "We specialize in custom web development, mobile app development, business automation, and software consulting. Our team creates tailored solutions for businesses of all sizes.",
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on scope and complexity. A simple website might take 4-6 weeks, while complex applications can take 3-6 months. We provide detailed timelines during our discovery phase.",
    },
    {
      question: "What is your development process?",
      answer: "We follow a structured 6-phase process: Discovery, Strategy, Design, Development, Testing, and Launch. Each phase includes client collaboration and feedback loops to ensure we're aligned with your vision.",
    },
    {
      question: "Do you offer ongoing support after launch?",
      answer: "Yes! We provide maintenance packages and ongoing support to ensure your solution continues to perform optimally. We're here for updates, bug fixes, and feature enhancements.",
    },
    {
      question: "What technologies do you work with?",
      answer: "We use modern, industry-leading technologies including React, Next.js, Node.js, Python, and cloud platforms like AWS and Azure. We choose the best tools for your specific needs.",
    },
  ];

  return (
    <>
      <HeroSection
        title="About The Elites"
        subtitle="Transforming Ideas Into Reality"
        description="Since 2019, we've been helping businesses leverage technology to achieve their goals. Our team combines technical expertise with creative thinking to deliver solutions that make a real impact."
        backgroundImage="/images/about-hero.jpg"
        ctaText="Work With Us"
        ctaHref="/contact"
        showTimer={false}
      />

      <IntroSection
        label="Who We Are"
        title="Built on Excellence, Driven by Innovation"
        content="The Elites Solutions is a premier software development and business automation company. We partner with ambitious organizations to build custom digital solutions that drive growth, improve efficiency, and create exceptional user experiences. Our team of designers, developers, and strategists work collaboratively to transform complex challenges into elegant solutions."
      />

      <RoutineSlider
        title="Our Process"
        description="A proven methodology that delivers results"
        steps={workflowSteps}
      />

      <TeamSection
        title="Meet Our Team"
        description="The talented people behind our success"
        members={teamMembers}
      />

      <FAQAccordion
        title="Frequently Asked Questions"
        description="Everything you need to know about working with us"
        items={faqItems}
      />
    </>
  );
}
