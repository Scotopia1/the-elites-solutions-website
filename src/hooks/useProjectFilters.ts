import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export interface ProjectFilters {
  search: string;
  category: string;
  projectScale: string;
  technologies: string[];
  page: number;
}

/**
 * Hook for managing project filters with URL sync
 * Filters are stored in URL query parameters for shareability
 */
export function useProjectFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse current filters from URL
  const filters: ProjectFilters = useMemo(() => ({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || 'All',
    projectScale: searchParams.get('projectScale') || '',
    technologies: searchParams.get('technologies')?.split(',').filter(Boolean) || [],
    page: parseInt(searchParams.get('page') || '1'),
  }), [searchParams]);

  // Update filters and sync to URL
  const updateFilters = useCallback((updates: Partial<ProjectFilters>) => {
    const params = new URLSearchParams(searchParams.toString());

    // Apply updates
    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || value === 'All' || value === null || value === undefined) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        if (value.length === 0) {
          params.delete(key);
        } else {
          params.set(key, value.join(','));
        }
      } else {
        params.set(key, String(value));
      }
    });

    // Reset page to 1 when filters change (except when page itself is updated)
    if (!('page' in updates) && Object.keys(updates).length > 0) {
      params.set('page', '1');
    }

    // Update URL
    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
  }, [router, pathname, searchParams]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  // Set specific page
  const setPage = useCallback((page: number) => {
    updateFilters({ page });
  }, [updateFilters]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return filters.search !== '' ||
           filters.category !== 'All' ||
           filters.projectScale !== '' ||
           filters.technologies.length > 0;
  }, [filters]);

  // Get active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category !== 'All') count++;
    if (filters.projectScale) count++;
    if (filters.technologies.length > 0) count += filters.technologies.length;
    return count;
  }, [filters]);

  return {
    filters,
    updateFilters,
    resetFilters,
    setPage,
    hasActiveFilters,
    activeFilterCount,
  };
}
