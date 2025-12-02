'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Project {
  id: string;
  slug: string;
  title: Record<string, string>;
  description: Record<string, string>;
  shortDescription: Record<string, string>;
  category: string;
  featuredImage: string | null;
  technologies: string[];
  clientName: string | null;
  projectUrl: string | null;
  completedAt: string | null;
  metrics: Record<string, any> | null;
}

export default function WorkPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();

        if (data.success) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-500">
        <Loader2 className="h-8 w-8 animate-spin text-gold-100" />
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-dark-500 via-dark-400 to-dark-500">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-heading font-bold">
              <span className="text-gold-gradient">Our Work</span>
            </h1>
            <p className="text-xl text-gray-300">
              {locale === 'fr'
                ? 'Découvrez notre portfolio de projets réussis'
                : locale === 'ar'
                ? 'استكشف محفظة مشاريعنا الناجحة'
                : 'Explore our portfolio of successful projects'}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-dark-400 border-b border-dark-300">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === selectedCategory ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={
                  category === selectedCategory
                    ? ''
                    : 'border-dark-300 text-gray-400 hover:text-white hover:border-gold-100/30'
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-dark-500">
        <div className="container-custom">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                {locale === 'fr'
                  ? 'Aucun projet trouvé dans cette catégorie'
                  : locale === 'ar'
                  ? 'لم يتم العثور على مشاريع في هذه الفئة'
                  : 'No projects found in this category'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-dark-400 border-dark-300 overflow-hidden group hover:border-gold-100/30 transition-all hover:shadow-glow"
                >
                  {/* Image */}
                  <div className="aspect-video bg-gradient-to-br from-dark-300 to-dark-400 flex items-center justify-center relative overflow-hidden">
                    {project.featuredImage ? (
                      <Image
                        src={project.featuredImage}
                        alt={project.title?.[locale] || project.title?.en || project.title || 'Project'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gold-100/5 group-hover:bg-gold-100/10 transition-colors" />
                        <ExternalLink className="h-12 w-12 text-gold-100/30 group-hover:text-gold-100/50 transition-colors" />
                      </>
                    )}
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div>
                      <div className="text-xs text-gold-100 font-medium mb-2">
                        {project.category}
                      </div>
                      <h3 className="text-xl font-heading font-bold text-white group-hover:text-gold-100 transition-colors mb-2">
                        {project.title?.[locale] || project.title?.en || project.title || 'Untitled Project'}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-3">
                        {project.shortDescription?.[locale] || project.shortDescription?.en || project.description?.[locale] || project.description?.en || project.description || 'No description available'}
                      </p>
                    </div>

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 rounded-md bg-dark-300 text-gray-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {project.metrics && (
                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-dark-300">
                        {Object.entries(project.metrics)
                          .slice(0, 3)
                          .map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-sm font-bold text-gold-100">
                                {String(value)}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}

                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start p-0 h-auto hover:bg-transparent group/btn"
                    >
                      <Link
                        href={`/${locale}/work/${project.slug}`}
                        className="text-gold-100 hover:text-gold-200"
                      >
                        {locale === 'fr'
                          ? 'Voir l\'étude de cas'
                          : locale === 'ar'
                          ? 'عرض دراسة الحالة'
                          : 'View Case Study'}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-400">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">
              {locale === 'fr'
                ? 'Prêt à démarrer votre projet ?'
                : locale === 'ar'
                ? 'هل أنت مستعد لبدء مشروعك؟'
                : 'Ready to Start Your Project?'}
            </h2>
            <p className="text-lg text-gray-300">
              {locale === 'fr'
                ? 'Discutons de la façon dont nous pouvons donner vie à votre vision'
                : locale === 'ar'
                ? 'دعنا نناقش كيف يمكننا تحويل رؤيتك إلى واقع'
                : 'Let\'s discuss how we can help bring your vision to life'}
            </p>
            <Button asChild size="lg">
              <Link href={`/${locale}/contact`}>
                {locale === 'fr'
                  ? 'Commencer'
                  : locale === 'ar'
                  ? 'ابدأ'
                  : 'Get Started'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
