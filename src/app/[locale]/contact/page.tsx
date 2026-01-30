'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { HeroSection } from '@/components/sections/HeroSection';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Trophy, Clock, Star, Shield, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

// Trust signals data
const trustSignals = [
  { icon: Trophy, value: 150, suffix: '+', label: 'Projects Completed' },
  { icon: Clock, value: 6, suffix: '+', label: 'Years Experience' },
  { icon: Star, value: 98, suffix: '%', label: 'Client Satisfaction' },
  { icon: Shield, value: 24, suffix: '/7', label: 'Support Available' },
];

// Contact methods
const contactMethods = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'contact@theelitessolutions.com',
    href: 'mailto:contact@theelitessolutions.com',
    description: 'We respond within 24 hours',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+1 (234) 567-890',
    href: 'tel:+1234567890',
    description: 'Mon-Fri, 9AM-6PM EST',
  },
  {
    icon: MapPin,
    label: 'Global Reach',
    value: 'Worldwide Services',
    href: null,
    description: 'Remote-first team',
  },
];

// Animated Counter Component
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function ContactPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          company: formData.company || undefined,
          message: formData.description,
          type: 'contact',
          sourcePage: '/contact',
          locale,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          description: '',
        });
      } else {
        toast.error(result.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // FAQ data for contact page
  const contactFaqs = [
    {
      question: "How quickly can you start my project?",
      answer: "Most projects can start within 1-2 weeks after our initial consultation and contract signing. For urgent projects, we offer expedited onboarding within 3-5 business days.",
    },
    {
      question: "What is your payment structure?",
      answer: "We typically use a milestone-based payment structure: 30% upfront, 40% at midpoint, and 30% upon completion. For larger projects, we can customize a payment plan that works for your budget.",
    },
    {
      question: "Do you offer maintenance and support after launch?",
      answer: "Yes! We provide comprehensive maintenance packages including bug fixes, security updates, performance optimization, and feature enhancements. Support is available 24/7 for critical issues.",
    },
    {
      question: "Can you work with our existing team?",
      answer: "Absolutely. We integrate seamlessly with your existing development team, design team, or stakeholders. We use standard collaboration tools like Slack, Jira, and GitHub.",
    },
    {
      question: "What makes The Elites Solutions different?",
      answer: "We combine technical excellence with business understanding. Our team doesn't just build software—we create solutions that drive measurable business outcomes. Plus, we offer transparent communication, fixed-price guarantees, and ongoing support.",
    },
  ];

  return (
    <>
      <HeroSection
        title="Let's Build Something"
        subtitle="Extraordinary"
        description="Ready to transform your business? Let's discuss your project and explore how we can help you achieve your goals."
        showTimer={false}
      />

        {/* Contact Methods */}
        <section className="py-12 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {method.href ? (
                    <a
                      href={method.href}
                      className="block p-8 bg-dark-200/50 rounded-2xl border border-white/5 hover:border-gold-100/20 transition-all group h-full"
                    >
                      <div className="w-14 h-14 rounded-xl bg-gold-100/10 flex items-center justify-center mb-6 group-hover:bg-gold-100/20 transition-colors">
                        <method.icon className="w-7 h-7 text-gold-100" />
                      </div>
                      <p className="text-white/50 text-sm uppercase tracking-widest mb-2 font-heading">
                        {method.label}
                      </p>
                      <p className="text-white text-xl font-medium mb-2 group-hover:text-gold-100 transition-colors">
                        {method.value}
                      </p>
                      <p className="text-white/40 text-sm">{method.description}</p>
                    </a>
                  ) : (
                    <div className="p-8 bg-dark-200/50 rounded-2xl border border-white/5 h-full">
                      <div className="w-14 h-14 rounded-xl bg-gold-100/10 flex items-center justify-center mb-6">
                        <method.icon className="w-7 h-7 text-gold-100" />
                      </div>
                      <p className="text-white/50 text-sm uppercase tracking-widest mb-2 font-heading">
                        {method.label}
                      </p>
                      <p className="text-white text-xl font-medium mb-2">{method.value}</p>
                      <p className="text-white/40 text-sm">{method.description}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-20 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-3"
              >
                <div className="mb-10">
                  <span className="font-heading text-gold-100 text-sm uppercase tracking-widest mb-4 block">
                    Start a Project
                  </span>
                  <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
                    Tell Us About Your Vision
                  </h2>
                  <p className="text-white/60">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-12 bg-dark-200/50 rounded-2xl border border-gold-100/20 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-gold-100/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-gold-100" />
                    </div>
                    <h3 className="font-heading text-2xl text-white mb-4">Message Sent!</h3>
                    <p className="text-white/60 mb-8">
                      Thank you for reaching out. Our team will review your inquiry and get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => setIsSuccess(false)}
                      className="bg-gold-100 text-dark-400 hover:bg-gold-200"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-white/80 font-heading text-sm uppercase tracking-wide">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="bg-dark-300/50 border-white/10 text-white h-12 focus:border-gold-100/50"
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-white/80 font-heading text-sm uppercase tracking-wide">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="bg-dark-300/50 border-white/10 text-white h-12 focus:border-gold-100/50"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white/80 font-heading text-sm uppercase tracking-wide">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-dark-300/50 border-white/10 text-white h-12 focus:border-gold-100/50"
                          placeholder="john@company.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-white/80 font-heading text-sm uppercase tracking-wide">
                          Company
                        </Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="bg-dark-300/50 border-white/10 text-white h-12 focus:border-gold-100/50"
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-white/80 font-heading text-sm uppercase tracking-wide">
                        Description *
                      </Label>
                      <Textarea
                        id="description"
                        required
                        rows={6}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                        className="bg-dark-300/50 border-white/10 text-white resize-none focus:border-gold-100/50"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gold-100 text-dark-400 hover:bg-gold-200 h-14 font-heading text-lg uppercase tracking-wide"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="ml-3 h-5 w-5" />
                    </Button>
                  </form>
                )}
              </motion.div>

              {/* Sidebar - Trust Signals & Business Hours */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-2 space-y-8"
              >
                {/* Trust Signals */}
                <div className="p-8 bg-dark-200/50 rounded-2xl border border-white/5">
                  <h3 className="font-heading text-gold-100 text-sm uppercase tracking-widest mb-8">
                    Why Choose Us
                  </h3>
                  <div className="space-y-8">
                    {trustSignals.map((signal, index) => (
                      <div key={signal.label} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gold-100/10 flex items-center justify-center flex-shrink-0">
                          <signal.icon className="w-6 h-6 text-gold-100" />
                        </div>
                        <div>
                          <p className="font-heading text-3xl text-white">
                            <AnimatedCounter value={signal.value} suffix={signal.suffix} />
                          </p>
                          <p className="text-white/50 text-sm">{signal.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Hours */}
                <div className="p-8 bg-dark-200/50 rounded-2xl border border-white/5">
                  <h3 className="font-heading text-gold-100 text-sm uppercase tracking-widest mb-6">
                    Business Hours
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-white/60">Monday - Friday</span>
                      <span className="text-white">9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Saturday</span>
                      <span className="text-white">10:00 AM - 4:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Sunday</span>
                      <span className="text-white/40">Closed</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-white/50 text-sm">
                      Emergency support available 24/7 for existing clients.
                    </p>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <FAQAccordion
            title="Frequently Asked Questions"
            faqs={contactFaqs}
          />
        </section>
    </>
  );
}
