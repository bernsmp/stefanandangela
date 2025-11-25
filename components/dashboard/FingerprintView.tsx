'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Zap, Lightbulb, BookOpen, Brain, X } from 'lucide-react';
import { PatternCard, PatternType } from './PatternCard';
import { FingerprintData, FingerprintSection } from '@/lib/data-parser';

interface FingerprintViewProps {
  data: FingerprintData;
  name: string;
  color?: 'stefan' | 'angela';
}

interface ExtractedPattern {
  id: number;
  name: string;
  type: PatternType;
  description: string;
  executionSequence?: string[];
  evidenceQuote?: string;
  frequencyData?: string;
  strategicValue?: string;
  blindSpotRisk?: string;
}

const typeFilters = [
  { type: 'all' as const, label: 'All Patterns', icon: Filter, color: 'var(--grey-500)' },
  { type: 'procedural' as const, label: 'Procedural', icon: Zap, color: 'var(--procedural)' },
  { type: 'conditional' as const, label: 'Conditional', icon: Lightbulb, color: 'var(--conditional)' },
  { type: 'declarative' as const, label: 'Declarative', icon: BookOpen, color: 'var(--declarative)' },
  { type: 'metacognitive' as const, label: 'Metacognitive', icon: Brain, color: 'var(--metacognitive)' },
];

// Extract patterns from the markdown sections
function extractPatternsFromSections(sections: FingerprintSection[]): ExtractedPattern[] {
  const patterns: ExtractedPattern[] = [];
  let currentType: PatternType = 'procedural';
  let patternId = 0;

  function processSection(section: FingerprintSection, depth: number = 0) {
    const titleLower = section.title.toLowerCase();
    
    // Detect pattern type from section titles
    if (titleLower.includes('procedural')) currentType = 'procedural';
    else if (titleLower.includes('conditional')) currentType = 'conditional';
    else if (titleLower.includes('declarative')) currentType = 'declarative';
    else if (titleLower.includes('metacognitive')) currentType = 'metacognitive';
    // Also detect from common section structures
    else if (titleLower.includes('operating system') || titleLower.includes('execution')) currentType = 'procedural';
    else if (titleLower.includes('decision') || titleLower.includes('information')) currentType = 'conditional';
    else if (titleLower.includes('knowledge') || titleLower.includes('mental model')) currentType = 'declarative';
    else if (titleLower.includes('blind spot') || titleLower.includes('self-aware')) currentType = 'metacognitive';

    // Check if this is a pattern - support multiple formats
    const patternMatch = section.title.match(/PATTERN\s*(\d+):\s*(.+)/i) ||
                        section.title.match(/Pattern\s*(\d+):\s*The\s+(.+)/i) ||
                        section.title.match(/Pattern\s*(\d+)\s*[:\-–]\s*(.+)/i) ||
                        section.title.match(/Pattern\s*(\d+)\s+\(([^)]+)\)/i) ||
                        (section.title.includes('Pattern') && section.title.match(/(.+)/));

    // Also check content for pattern references
    const contentPatternMatch = section.content.match(/Pattern\s*(\d+)\s*[:\(]/i);

    if ((patternMatch || contentPatternMatch) && section.content.length > 50) {
      patternId++;
      
      // Extract pattern name - handle different formats
      let patternName = '';
      if (patternMatch) {
        patternName = patternMatch[2] || patternMatch[1] || section.title;
      } else {
        // Try to extract name from section title or content
        const nameMatch = section.title.match(/(?:Pattern\s*\d+\s*)?[:\-–]?\s*(.+)/i);
        patternName = nameMatch ? nameMatch[1].trim() : section.title;
      }
      
      // Clean up the pattern name
      patternName = patternName.replace(/^\*\*|\*\*$/g, '').replace(/^The\s+/i, '').trim();
      
      // Extract description
      const descMatch = section.content.match(/\*\*Pattern Description:\*\*\s*([^*]+)/i) ||
                       section.content.match(/\*\*Description:\*\*\s*([^*]+)/i);
      const description = descMatch 
        ? descMatch[1].trim() 
        : section.content.split('\n\n')[0]?.replace(/\*\*/g, '').replace(/\|.*\|/g, '').trim() || '';

      // Extract execution sequence
      const execMatch = section.content.match(/\*\*Execution Sequence:\*\*([^*]+?)(?=\*\*|$)/is);
      const executionSequence = execMatch
        ? execMatch[1].split('\n')
            .map(line => line.replace(/^\d+\.\s*/, '').trim())
            .filter(line => line.length > 0 && !line.startsWith('**'))
        : undefined;

      // Extract evidence quote
      const evidenceMatch = section.content.match(/Stefan.*?:\s*[""]([^""]+)[""]|>"([^"]+)"/i);
      const evidenceQuote = evidenceMatch 
        ? (evidenceMatch[1] || evidenceMatch[2])?.trim()
        : undefined;

      // Extract frequency data
      const freqMatch = section.content.match(/\*\*Frequency Data:\*\*\s*([^*\n]+)/i);
      const frequencyData = freqMatch ? freqMatch[1].trim() : undefined;

      // Extract strategic value
      const stratMatch = section.content.match(/\*\*Strategic Value:\*\*\s*([^*]+?)(?=\*\*|$)/is);
      const strategicValue = stratMatch ? stratMatch[1].trim().split('\n')[0] : undefined;

      // Extract blind spot risk
      const blindMatch = section.content.match(/\*\*(?:Blind Spot|Cost|Risk).*?:\*\*\s*([^*]+?)(?=\*\*|$)/is);
      const blindSpotRisk = blindMatch ? blindMatch[1].trim().split('\n')[0] : undefined;

      patterns.push({
        id: patternId,
        name: patternName || section.title,
        type: currentType,
        description,
        executionSequence,
        evidenceQuote,
        frequencyData,
        strategicValue,
        blindSpotRisk,
      });
    }

    // Process subsections
    section.subsections?.forEach(sub => processSection(sub, depth + 1));
  }

  sections.forEach(section => processSection(section));
  return patterns;
}

export const FingerprintView: React.FC<FingerprintViewProps> = ({
  data,
  name,
  color = 'stefan',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | PatternType>('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Extract patterns from the data
  const patterns = useMemo(() => extractPatternsFromSections(data.sections), [data.sections]);

  // Filter patterns
  const filteredPatterns = useMemo(() => {
    return patterns.filter(pattern => {
      const matchesSearch = searchQuery === '' ||
        pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pattern.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = activeFilter === 'all' || pattern.type === activeFilter;
      
      return matchesSearch && matchesType;
    });
  }, [patterns, searchQuery, activeFilter]);

  // Count patterns by type
  const patternCounts = useMemo(() => {
    const counts = { all: patterns.length, procedural: 0, conditional: 0, declarative: 0, metacognitive: 0 };
    patterns.forEach(p => counts[p.type]++);
    return counts;
  }, [patterns]);

  const accentColor = color === 'stefan' ? 'var(--stefan)' : 'var(--angela)';
  const bgMuted = color === 'stefan' ? 'var(--stefan-muted)' : 'var(--angela-muted)';

  return (
    <section className="py-24 px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div 
        className="absolute top-0 left-0 w-full h-96 opacity-30"
        style={{
          background: `linear-gradient(180deg, ${bgMuted} 0%, transparent 100%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-3 mb-4">
            <span 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--grey-400)]">
              Cognitive Fingerprint™
            </span>
          </div>
          
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--grey-900)] mb-4">
            {name}'s <span style={{ color: accentColor }}>Patterns</span>
          </h2>
          
          <p className="text-lg text-[var(--grey-500)] max-w-2xl">
            {patterns.length} unconscious behavioral patterns identified across{' '}
            {name === 'Stefan' ? '11+ hours' : '15+ hours'} of analyzed interactions.
          </p>
        </div>

        {/* Filters and Search */}
        <div className={`mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Search bar */}
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--grey-400)]" size={20} />
            <input
              type="text"
              placeholder={`Search ${name}'s patterns...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[var(--grey-200)] bg-white focus:border-[var(--brand-gold)] focus:ring-2 focus:ring-[var(--brand-gold)]/20 outline-none transition-all text-[var(--grey-700)] placeholder:text-[var(--grey-400)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--grey-400)] hover:text-[var(--grey-600)]"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Type filters */}
          <div className="flex flex-wrap gap-2">
            {typeFilters.map(filter => {
              const Icon = filter.icon;
              const isActive = activeFilter === filter.type;
              const count = patternCounts[filter.type];
              
              return (
                <button
                  key={filter.type}
                  onClick={() => setActiveFilter(filter.type)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'bg-[var(--grey-50)] text-[var(--grey-600)] hover:bg-[var(--grey-100)]'
                  }`}
                  style={{
                    backgroundColor: isActive ? filter.color : undefined,
                    boxShadow: isActive ? `0 4px 14px ${filter.color}40` : undefined,
                  }}
                >
                  <Icon size={16} />
                  {filter.label}
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    isActive ? 'bg-white/20' : 'bg-[var(--grey-200)]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pattern Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPatterns.map((pattern, index) => (
              <motion.div
                key={pattern.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <PatternCard
                  id={pattern.id}
                  name={pattern.name}
                  type={pattern.type}
                  description={pattern.description}
                  executionSequence={pattern.executionSequence}
                  evidenceQuote={pattern.evidenceQuote}
                  frequencyData={pattern.frequencyData}
                  strategicValue={pattern.strategicValue}
                  blindSpotRisk={pattern.blindSpotRisk}
                  owner={color}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredPatterns.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--grey-100)] flex items-center justify-center mx-auto mb-4">
              <Search className="text-[var(--grey-400)]" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-[var(--grey-700)] mb-2">
              No patterns found
            </h3>
            <p className="text-[var(--grey-500)]">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-[var(--brand-gold)] text-[var(--grey-900)] rounded-lg font-medium hover:bg-[var(--brand-gold-dark)] transition-colors"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FingerprintView;
