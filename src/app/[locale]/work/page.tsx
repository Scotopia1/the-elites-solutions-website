'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ProjectSearch from '@/components/work/ProjectSearch';
import ProjectFilters from '@/components/work/ProjectFilters';
import { useProjectFilters } from '@/hooks/useProjectFilters';
import { getAllProjects } from '@/lib/data/projects';

interface Project {
  id: string;
  slug: string;
  title: Record<string, string>;
  shortDescription?: Record<string, string>;
  category: string;
  featuredImageUrl?: string | null;
  heroImage?: string | null;
  technologies: string[];
  clientName?: string | null;
  projectUrl?: string | null;
  resultsMetrics?: Array<{ metric: string; description: string }> | null;
}

interface Pagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function WorkPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const { filters, updateFilters, resetFilters, setPage } = useProjectFilters();

  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Load static projects on mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getAllProjects();
        setAllProjects(data);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  // Client-side filtering and pagination
  const { filteredProjects, pagination } = useMemo(() => {
    let filtered = [...allProjects];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter((project) => {
        const title = project.title?.[locale] || project.title?.en || '';
        const description = project.shortDescription?.[locale] || project.shortDescription?.en || '';
        const clientName = project.clientName || '';
        const technologies = project.technologies?.join(' ') || '';

        return (
          title.toLowerCase().includes(searchLower) ||
          description.toLowerCase().includes(searchLower) ||
          clientName.toLowerCase().includes(searchLower) ||
          technologies.toLowerCase().includes(searchLower)
        );
      });
    }

    // Category filter
    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter((project) => project.category === filters.category);
    }

    // Project scale filter
    if (filters.projectScale) {
      filtered = filtered.filter((project) => (project as any).projectScale === filters.projectScale);
    }

    // Technologies filter
    if (filters.technologies.length > 0) {
      filtered = filtered.filter((project) =>
        filters.technologies.some(tech =>
          project.technologies?.includes(tech)
        )
      );
    }

    // Pagination
    const limit = 9;
    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (filters.page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProjects = filtered.slice(startIndex, endIndex);

    return {
      filteredProjects: paginatedProjects,
      pagination: {
        page: filters.page,
        limit,
        totalCount,
        totalPages,
        hasNext: filters.page < totalPages,
        hasPrev: filters.page > 1,
      },
    };
  }, [allProjects, filters, locale]);

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title={locale === 'fr' ? 'Nos Réalisations' : locale === 'ar' ? 'أعمالنا' : 'Our Work'}
        subtitle="Portfolio of Excellence"
        description={locale === 'fr'
          ? 'Découvrez notre portfolio de projets réussis qui ont transformé des entreprises'
          : locale === 'ar'
          ? 'استكشف محفظة مشاريعنا الناجحة التي غيرت الأعمال'
          : 'Explore our portfolio of successful projects that have transformed businesses'}
        showTimer={false}
      />

      {/* Search & Filters Section (Sticky) */}
      <section className="sticky top-0 z-30 py-8 bg-transparent backdrop-blur-md border-b border-dark-300">
        <div className="container-custom space-y-6">
          {/* Search Bar */}
          <ProjectSearch
            value={filters.search}
            onChange={(search) => updateFilters({ search })}
            placeholder={
              locale === 'fr'
                ? 'Rechercher par nom, technologie ou client...'
                : locale === 'ar'
                ? 'ابحث بالاسم أو التكنولوجيا أو العميل...'
                : 'Search by name, technology, or client...'
            }
          />

          {/* Filters */}
          <ProjectFilters
            filters={filters}
            onChange={updateFilters}
            onReset={resetFilters}
            totalCount={pagination?.totalCount}
          />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-transparent">
        <div className="container-custom">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-gold-100" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-6">
                {locale === 'fr'
                  ? 'Aucun projet trouvé'
                  : locale === 'ar'
                  ? 'لم يتم العثور على مشاريع'
                  : 'No projects found'}
              </p>
              <Button onClick={resetFilters} variant="outline">
                {locale === 'fr' ? 'Réinitialiser les filtres' : locale === 'ar' ? 'إعادة تعيين المرشحات' : 'Reset Filters'}
              </Button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="bg-dark-400 border-dark-300 overflow-hidden group hover:border-gold-100/30 transition-all hover:shadow-glow"
                  >
                    {/* Image */}
                    <div className="aspect-video bg-gradient-to-br from-dark-300 to-dark-400 flex items-center justify-center relative overflow-hidden">
                      {project.heroImage || project.featuredImageUrl ? (
                        <Image
                          src={project.heroImage || project.featuredImageUrl || ''}
                          alt={project.title?.[locale] || project.title?.en || 'Project'}
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
                          {project.title?.[locale] || project.title?.en || 'Untitled Project'}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-3">
                          {project.shortDescription?.[locale] || project.shortDescription?.en || 'No description available'}
                        </p>
                      </div>

                      {project.resultsMetrics && project.resultsMetrics.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-dark-300">
                          {project.resultsMetrics.slice(0, 3).map((result, index) => (
                            <div key={index} className="text-center">
                              <div className="text-sm font-bold text-gold-100">
                                {result.metric}
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
                            ? "Voir l'étude de cas"
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

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button
                    onClick={() => setPage(filters.page - 1)}
                    disabled={!pagination.hasPrev}
                    variant="outline"
                    className="border-dark-300"
                  >
                    Previous
                  </Button>

                  <span className="text-gray-400 px-4">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>

                  <Button
                    onClick={() => setPage(filters.page + 1)}
                    disabled={!pagination.hasNext}
                    variant="outline"
                    className="border-dark-300"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-transparent">
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
                : "Let's discuss how we can help bring your vision to life"}
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
