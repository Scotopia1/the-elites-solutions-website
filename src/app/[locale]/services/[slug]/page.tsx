'use client';

import { ReactLenis } from 'lenis/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';

interface ServiceData {
  id: string;
  title: { en: string; fr: string; ar: string };
  slug: string;
  description: { en: string; fr: string; ar: string };
  shortDescription?: { en: string; fr: string; ar: string };
  icon?: string;
  features?: Array<{ en: string; fr: string; ar: string }>;
  pricingType: string;
  pricingInfo?: any;
  relatedProjects?: any[];
  otherServices?: any[];
}

export default function ServiceDetailPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const slug = params?.slug as string;

  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchService() {
      try {
        const response = await fetch(`/api/services/${slug}`);
        const data = await response.json();

        if (data.success) {
          setService(data.data);
        } else {
          setError(data.message || 'Service not found');
        }
      } catch (err) {
        setError('Failed to load service');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchService();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-400">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gold-100 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading service...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-400">
        <div className="text-center">
          <h1 className="text-4xl font-heading text-white mb-4">Service Not Found</h1>
          <p className="text-white/60 mb-8">{error || 'The service you are looking for does not exist.'}</p>
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold-100 text-dark-400 font-medium rounded-lg hover:bg-gold-200 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const title = service.title[locale as keyof typeof service.title] || service.title.en;
  const description = service.description[locale as keyof typeof service.description] || service.description.en;
  const shortDescription = service.shortDescription?.[locale as keyof typeof service.shortDescription] || service.shortDescription?.en;

  return (
    <ReactLenis root>
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0a0a_0%,#1a1a1a_50%,#0a0a0a_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-screen"
          style={{
            backgroundImage: "url('/textures/Gold.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-[70vh] flex flex-col justify-center px-6 lg:px-20 pt-32 pb-20">
          <div className="max-w-6xl mx-auto w-full">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center gap-2 text-white/60 hover:text-gold-100 transition-colors mb-12 group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-heading text-sm uppercase tracking-widest">Back to Services</span>
              </Link>
            </motion.div>

            {/* Service Icon */}
            {service.icon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-6xl mb-8"
              >
                {service.icon}
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[0.9]"
            >
              {title}
            </motion.h1>

            {/* Short Description */}
            {shortDescription && (
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed"
              >
                {shortDescription}
              </motion.p>
            )}
          </div>
        </section>

        {/* Description Section */}
        <section className="py-20 px-6 lg:px-20 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="font-heading text-gold-100 text-sm uppercase tracking-widest mb-4 block">
                  Overview
                </span>
                <h2 className="font-heading text-3xl md:text-4xl text-white mb-6">
                  What We Offer
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-white/70 leading-relaxed whitespace-pre-line"
              >
                {description}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        {service.features && service.features.length > 0 && (
          <section className="py-20 px-6 lg:px-20 bg-dark-300/30">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <span className="font-heading text-gold-100 text-sm uppercase tracking-widest mb-4 block">
                  Features
                </span>
                <h2 className="font-heading text-3xl md:text-5xl text-white">
                  What&apos;s Included
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.features.map((feature, index) => {
                  const featureText = feature[locale as keyof typeof feature] || feature.en;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start gap-4 p-6 bg-dark-200/50 rounded-xl border border-white/5 hover:border-gold-100/20 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-gold-100/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={14} className="text-gold-100" />
                      </div>
                      <span className="text-white/80">{featureText}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-32 px-6 lg:px-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-100/5 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <h2 className="font-heading text-4xl md:text-6xl text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help transform your business with our {title.toLowerCase()} services.
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold-100 text-dark-400 font-heading text-lg uppercase tracking-wide rounded-lg hover:bg-gold-200 transition-colors group"
            >
              Start a Conversation
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </section>

        {/* Other Services */}
        {service.otherServices && service.otherServices.length > 0 && (
          <section className="py-20 px-6 lg:px-20 border-t border-white/10">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-between mb-12"
              >
                <div>
                  <span className="font-heading text-gold-100 text-sm uppercase tracking-widest mb-2 block">
                    Explore More
                  </span>
                  <h2 className="font-heading text-3xl md:text-4xl text-white">
                    Other Services
                  </h2>
                </div>
                <Link
                  href={`/${locale}/services`}
                  className="hidden md:inline-flex items-center gap-2 text-white/60 hover:text-gold-100 transition-colors group"
                >
                  <span className="font-heading text-sm uppercase tracking-widest">View All</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {service.otherServices.map((otherService: any, index: number) => {
                  const otherTitle = otherService.title[locale as keyof typeof otherService.title] || otherService.title.en;
                  const otherShortDesc = otherService.shortDescription?.[locale as keyof typeof otherService.shortDescription] || otherService.shortDescription?.en;

                  return (
                    <motion.div
                      key={otherService.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Link
                        href={`/${locale}/services/${otherService.slug}`}
                        className="block p-8 bg-dark-200/50 rounded-xl border border-white/5 hover:border-gold-100/20 transition-all group h-full"
                      >
                        {otherService.icon && (
                          <span className="text-4xl block mb-4">{otherService.icon}</span>
                        )}
                        <h3 className="font-heading text-xl text-white mb-3 group-hover:text-gold-100 transition-colors">
                          {otherTitle}
                        </h3>
                        {otherShortDesc && (
                          <p className="text-white/60 text-sm line-clamp-2">{otherShortDesc}</p>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    </ReactLenis>
  );
}
