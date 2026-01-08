'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ReactLenis } from 'lenis/react';
import { useLenisConfig } from '@/hooks/useLenisConfig';

interface BlogPageClientProps {
  initialPosts: any[];
  categories: any[];
  tags: any[];
}

export default function BlogPageClient({ initialPosts, categories, tags }: BlogPageClientProps) {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const lenisOptions = useLenisConfig();

  const translations = {
    en: {
      title: 'Blog',
      subtitle: 'Insights, tutorials, and industry trends',
      noPosts: 'No blog posts available yet',
      comingSoon: 'Check back soon for new articles',
    },
    fr: {
      title: 'Blog',
      subtitle: 'Perspectives, tutoriels et tendances du secteur',
      noPosts: 'Aucun article de blog disponible pour le moment',
      comingSoon: 'Revenez bientôt pour de nouveaux articles',
    },
    ar: {
      title: 'المدونة',
      subtitle: 'رؤى ودروس واتجاهات الصناعة',
      noPosts: 'لا توجد منشورات بلوق متاحة حتى الآن',
      comingSoon: 'تحقق مرة أخرى قريبا لمقالات جديدة',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <ReactLenis root options={lenisOptions}>
      {/* Background */}
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
        <section className="pt-40 pb-20 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto text-center">
            <span className="font-heading text-gold-100 text-sm uppercase tracking-[0.3em] mb-6 block">
              {t.title}
            </span>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[0.9]">
              {t.subtitle}
            </h1>
          </div>
        </section>

        {/* Empty State */}
        <section className="py-20 px-6 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-12 bg-dark-200/50 rounded-2xl border border-white/5">
              <p className="text-2xl text-white/60 mb-4">{t.noPosts}</p>
              <p className="text-white/40">{t.comingSoon}</p>
            </div>
          </div>
        </section>
      </div>
    </ReactLenis>
  );
}
