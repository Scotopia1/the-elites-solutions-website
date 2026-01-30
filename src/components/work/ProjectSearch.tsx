"use client";

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

interface ProjectSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function ProjectSearch({
  value,
  onChange,
  placeholder = "Search projects by name, technology, or client..."
}: ProjectSearchProps) {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, 300);

  // Sync debounced value with parent
  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, value]);

  // Sync external value changes
  useEffect(() => {
    if (value !== localValue && value === '') {
      setLocalValue('');
    }
  }, [value]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="relative">
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
        <Search className="w-5 h-5" />
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/20 transition-all"
      />

      {/* Clear Button */}
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Search indicator */}
      {localValue && localValue !== debouncedValue && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
