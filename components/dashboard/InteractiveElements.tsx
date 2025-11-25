'use client';

import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

interface InteractiveElementsProps {
  onSearch: (query: string) => void;
  onFilter?: (filters: string[]) => void;
  searchPlaceholder?: string;
  filterOptions?: string[];
}

export const InteractiveElements: React.FC<InteractiveElementsProps> = ({
  onSearch,
  onFilter,
  searchPlaceholder = 'Search fingerprints...',
  filterOptions = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterToggle = (filter: string) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
    
    setActiveFilters(newFilters);
    if (onFilter) {
      onFilter(newFilters);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={searchPlaceholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent text-gray-900 placeholder-gray-400"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filters */}
      {filterOptions.length > 0 && (
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="mb-2"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </Button>
          
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2 mt-2"
              >
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterToggle(option)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      activeFilters.includes(option)
                        ? 'bg-gradient-to-r from-[#fbbf24] to-[#f97316] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

