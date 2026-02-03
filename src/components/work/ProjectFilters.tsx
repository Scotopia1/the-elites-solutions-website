"use client";

import { useState, useEffect } from 'react';
import { ChevronDown, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { ProjectFilters } from '@/hooks/useProjectFilters';

interface FilterOptions {
  categories: string[];
  projectScales: string[];
  technologies: string[];
}

interface ProjectFiltersProps {
  filters: ProjectFilters;
  onChange: (updates: Partial<ProjectFilters>) => void;
  onReset: () => void;
  totalCount?: number;
}

export default function ProjectFiltersComponent({
  filters,
  onChange,
  onReset,
  totalCount
}: ProjectFiltersProps) {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    projectScales: [],
    technologies: []
  });
  const [isOpen, setIsOpen] = useState({
    category: false,
    scale: false,
    tech: false
  });

  // Fetch filter options from API
  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await fetch('/api/projects?options=true');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();

        if (data.success && data.filterOptions) {
          setFilterOptions(data.filterOptions);
        }
      } catch (error) {
        console.error('Failed to fetch filter options:', error);
      }
    }

    fetchOptions();
  }, []);

  const toggleDropdown = (key: 'category' | 'scale' | 'tech') => {
    setIsOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTechnologyToggle = (tech: string) => {
    const current = filters.technologies;
    const updated = current.includes(tech)
      ? current.filter(t => t !== tech)
      : [...current, tech];

    onChange({ technologies: updated });
  };

  const removeFilter = (type: 'search' | 'category' | 'projectScale' | 'technology', value?: string) => {
    if (type === 'technology' && value) {
      onChange({ technologies: filters.technologies.filter(t => t !== value) });
    } else if (type === 'search') {
      onChange({ search: '' });
    } else if (type === 'category') {
      onChange({ category: 'All' });
    } else if (type === 'projectScale') {
      onChange({ projectScale: '' });
    }
  };

  const activeFilters = [
    ...(filters.search ? [{ type: 'search' as const, label: `Search: "${filters.search}"` }] : []),
    ...(filters.category !== 'All' ? [{ type: 'category' as const, label: filters.category }] : []),
    ...(filters.projectScale ? [{ type: 'projectScale' as const, label: `Scale: ${filters.projectScale}` }] : []),
    ...filters.technologies.map(tech => ({ type: 'technology' as const, label: tech, value: tech }))
  ];

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('category')}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white hover:border-gold-400/50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>{filters.category !== 'All' ? filters.category : 'Category'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen.category ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isOpen.category && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl z-50"
              >
                <div className="p-2 max-h-64 overflow-y-auto">
                  <button
                    onClick={() => {
                      onChange({ category: 'All' });
                      setIsOpen(prev => ({ ...prev, category: false }));
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      filters.category === 'All' ? 'bg-gold-400/20 text-gold-400' : 'text-white hover:bg-neutral-800'
                    }`}
                  >
                    All Categories
                  </button>
                  {filterOptions.categories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        onChange({ category });
                        setIsOpen(prev => ({ ...prev, category: false }));
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        filters.category === category ? 'bg-gold-400/20 text-gold-400' : 'text-white hover:bg-neutral-800'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Project Scale Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('scale')}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white hover:border-gold-400/50 transition-colors"
          >
            <span>{filters.projectScale || 'Project Scale'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen.scale ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isOpen.scale && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl z-50"
              >
                <div className="p-2">
                  <button
                    onClick={() => {
                      onChange({ projectScale: '' });
                      setIsOpen(prev => ({ ...prev, scale: false }));
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      !filters.projectScale ? 'bg-gold-400/20 text-gold-400' : 'text-white hover:bg-neutral-800'
                    }`}
                  >
                    All Scales
                  </button>
                  {filterOptions.projectScales.map(scale => (
                    <button
                      key={scale}
                      onClick={() => {
                        onChange({ projectScale: scale });
                        setIsOpen(prev => ({ ...prev, scale: false }));
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md capitalize transition-colors ${
                        filters.projectScale === scale ? 'bg-gold-400/20 text-gold-400' : 'text-white hover:bg-neutral-800'
                      }`}
                    >
                      {scale}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Technologies Multi-Select */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('tech')}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white hover:border-gold-400/50 transition-colors"
          >
            <span>Technologies {filters.technologies.length > 0 && `(${filters.technologies.length})`}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen.tech ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isOpen.tech && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 w-64 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl z-50"
              >
                <div className="p-2 max-h-80 overflow-y-auto">
                  {filterOptions.technologies.map(tech => (
                    <label
                      key={tech}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-neutral-800 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={filters.technologies.includes(tech)}
                        onChange={() => handleTechnologyToggle(tech)}
                        className="w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-gold-400 focus:ring-gold-400/50"
                      />
                      <span className="text-white text-sm">{tech}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Reset Filters */}
        {activeFilters.length > 0 && (
          <button
            onClick={onReset}
            className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Reset Filters
          </button>
        )}

        {/* Results Count */}
        {totalCount !== undefined && (
          <span className="ml-auto text-sm text-neutral-500">
            {totalCount} {totalCount === 1 ? 'project' : 'projects'} found
          </span>
        )}
      </div>

      {/* Active Filter Tags */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => {
            const filterValue = 'value' in filter ? filter.value : undefined;
            return (
              <motion.div
                key={`${filter.type}-${filterValue || filter.label}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 px-3 py-1 bg-gold-400/10 border border-gold-400/30 rounded-full text-sm text-gold-400"
              >
                <span>{filter.label}</span>
                <button
                  onClick={() => removeFilter(filter.type, filterValue)}
                  className="hover:text-gold-300 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
