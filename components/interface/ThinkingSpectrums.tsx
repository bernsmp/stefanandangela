'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface SpectrumData {
  dimension: string;
  leftLabel: string;
  rightLabel: string;
  stefanPosition: number; // 0-100
  angelaPosition: number; // 0-100
  stefanDetail: string;
  angelaDetail: string;
  insight: string;
}

const spectrums: SpectrumData[] = [
  {
    dimension: 'How Certainty is Generated',
    leftLabel: 'Map First',
    rightLabel: 'Move First',
    stefanPosition: 20,
    angelaPosition: 85,
    stefanDetail: 'Complete constraint map before major decisions',
    angelaDetail: 'Destination clarity + confidence in capacity to solve',
    insight: 'Stefan needs the map to feel confident. Angela builds the map by moving.',
  },
  {
    dimension: 'Information Requirement',
    leftLabel: 'Complete Context',
    rightLabel: 'Minimal Context',
    stefanPosition: 15,
    angelaPosition: 80,
    stefanDetail: 'Full system understanding, dependencies, constraints',
    angelaDetail: '2-3 sentences max, destination + top constraint only',
    insight: 'Stefan\'s depth prevents mistakes. Angela\'s compression enables speed.',
  },
  {
    dimension: 'Processing Orientation',
    leftLabel: 'Predictive',
    rightLabel: 'Adaptive',
    stefanPosition: 25,
    angelaPosition: 90,
    stefanDetail: 'Model before action, anticipate outcomes',
    angelaDetail: 'Discover through action, adapt in real-time',
    insight: 'Both are sophisticated. They generate certainty through opposite mechanisms.',
  },
  {
    dimension: 'Problem Structure',
    leftLabel: 'Elegant Frameworks',
    rightLabel: 'Radical Simplification',
    stefanPosition: 20,
    angelaPosition: 85,
    stefanDetail: 'Seeks the "most elegant equation" for solving',
    angelaDetail: 'Strips to 2-3 core factors, discards until execution-blocking',
    insight: 'Stefan\'s frameworks prevent chaos. Angela\'s simplification prevents paralysis.',
  },
  {
    dimension: 'Decision Trigger',
    leftLabel: 'Rigor for Reversibility',
    rightLabel: 'Clear Destination',
    stefanPosition: 30,
    angelaPosition: 80,
    stefanDetail: 'Dual-speed: fast for reversible, comprehensive for irreversible',
    angelaDetail: 'Destination clarity + self-trust in capacity',
    insight: 'Neither is "cautious" or "reckless." They simply calculate risk differently.',
  },
];

export const ThinkingSpectrums: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[var(--brand-gold-muted)] border border-[var(--brand-gold)]/30 rounded-full text-[var(--brand-gold-dark)] text-sm font-semibold mb-6">
            THINKING ARCHITECTURE
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--grey-900)] mb-4">
            Where You Differ
          </h2>
          <p className="text-lg text-[var(--grey-500)] max-w-2xl mx-auto">
            These differences create both your competitive advantage and your friction. The protocols below leverage both without asking either of&nbsp;you to&nbsp;change.
          </p>
        </div>

        {/* Spectrums */}
        <div className="space-y-4">
          {spectrums.map((spectrum, index) => (
            <motion.div
              key={spectrum.dimension}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-[var(--grey-100)] overflow-hidden hover:border-[var(--grey-200)] transition-colors"
            >
              {/* Clickable Header */}
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full p-6 text-left focus:outline-none"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold text-[var(--grey-900)]">
                    {spectrum.dimension}
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-2 rounded-lg transition-colors ${expandedIndex === index ? 'bg-[var(--brand-gold-muted)]' : 'bg-[var(--grey-50)] hover:bg-[var(--grey-100)]'}`}
                  >
                    <ChevronDown className={expandedIndex === index ? 'text-[var(--brand-gold)]' : 'text-[var(--grey-500)]'} size={20} />
                  </motion.div>
                </div>

                {/* Spectrum Bar */}
                <div className="relative">
                  {/* Labels */}
                  <div className="flex justify-between text-xs text-[var(--grey-500)] mb-2">
                    <span>{spectrum.leftLabel}</span>
                    <span>{spectrum.rightLabel}</span>
                  </div>

                  {/* Track */}
                  <div className="relative h-3 bg-[var(--grey-100)] rounded-full">
                    {/* Gradient fill between positions */}
                    <div
                      className="absolute h-full rounded-full bg-gradient-to-r from-[var(--brand-gold)]/20 to-[var(--grey-400)]/20"
                      style={{
                        left: `${Math.min(spectrum.stefanPosition, spectrum.angelaPosition)}%`,
                        width: `${Math.abs(spectrum.angelaPosition - spectrum.stefanPosition)}%`,
                      }}
                    />

                    {/* Stefan marker */}
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--brand-gold)] border-4 border-white shadow-lg flex items-center justify-center"
                      style={{ left: `${spectrum.stefanPosition}%`, marginLeft: '-20px' }}
                      whileHover={{ scale: 1.15 }}
                    >
                      <span className="text-sm font-bold text-[var(--grey-900)]">S</span>
                    </motion.div>

                    {/* Angela marker */}
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--grey-700)] border-4 border-white shadow-lg flex items-center justify-center"
                      style={{ left: `${spectrum.angelaPosition}%`, marginLeft: '-20px' }}
                      whileHover={{ scale: 1.15 }}
                    >
                      <span className="text-sm font-bold text-white">A</span>
                    </motion.div>
                  </div>
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-[var(--grey-100)]">
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        {/* Stefan Detail */}
                        <div className="p-4 rounded-xl bg-[var(--brand-gold-muted)] border border-[var(--brand-gold)]/20">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 rounded-full bg-[var(--brand-gold)] flex items-center justify-center">
                              <span className="text-[10px] font-bold text-[var(--grey-900)]">S</span>
                            </div>
                            <span className="text-sm font-semibold text-[var(--grey-900)]">Stefan</span>
                          </div>
                          <p className="text-sm text-[var(--grey-600)]">{spectrum.stefanDetail}</p>
                        </div>

                        {/* Angela Detail */}
                        <div className="p-4 rounded-xl bg-[var(--grey-50)] border border-[var(--grey-200)]">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 rounded-full bg-[var(--grey-700)] flex items-center justify-center">
                              <span className="text-[10px] font-bold text-white">A</span>
                            </div>
                            <span className="text-sm font-semibold text-[var(--grey-900)]">Angela</span>
                          </div>
                          <p className="text-sm text-[var(--grey-600)]">{spectrum.angelaDetail}</p>
                        </div>
                      </div>

                      {/* Insight */}
                      <div className="p-4 rounded-xl bg-gradient-to-r from-[var(--brand-gold)]/5 to-[var(--grey-100)] border-l-4 border-[var(--brand-gold)]">
                        <p className="text-sm text-[var(--grey-700)] font-medium">
                          💡 {spectrum.insight}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThinkingSpectrums;

