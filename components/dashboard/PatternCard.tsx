'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lightbulb, AlertTriangle, Quote, Zap } from 'lucide-react';

export type PatternType = 'procedural' | 'conditional' | 'declarative' | 'metacognitive';

interface PatternCardProps {
  id: number;
  name: string;
  type: PatternType;
  description: string;
  executionSequence?: string[];
  evidenceQuote?: string;
  frequencyData?: string;
  strategicValue?: string;
  blindSpotRisk?: string;
  owner?: 'stefan' | 'angela';
}

const typeConfig = {
  procedural: {
    color: 'var(--procedural)',
    bgColor: 'rgba(255, 184, 41, 0.08)',
    label: 'Procedural',
    icon: Zap,
    description: 'How you execute without thinking',
  },
  conditional: {
    color: 'var(--conditional)',
    bgColor: 'rgba(37, 99, 235, 0.08)',
    label: 'Conditional',
    icon: Lightbulb,
    description: 'When & why you make specific choices',
  },
  declarative: {
    color: 'var(--declarative)',
    bgColor: 'rgba(124, 58, 237, 0.08)',
    label: 'Declarative',
    icon: Quote,
    description: 'What you know that you don\'t know you know',
  },
  metacognitive: {
    color: 'var(--metacognitive)',
    bgColor: 'rgba(5, 150, 105, 0.08)',
    label: 'Metacognitive',
    icon: AlertTriangle,
    description: 'How you think about thinking',
  },
};

export const PatternCard: React.FC<PatternCardProps> = ({
  id,
  name,
  type,
  description,
  executionSequence,
  evidenceQuote,
  frequencyData,
  strategicValue,
  blindSpotRisk,
  owner = 'stefan',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = typeConfig[type];
  const TypeIcon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pattern-card group"
      style={{
        borderLeftColor: isExpanded ? config.color : 'transparent',
        borderLeftWidth: '4px',
      }}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-6 focus:outline-none"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Pattern type badge */}
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
                style={{ 
                  backgroundColor: config.bgColor,
                  color: config.color,
                }}
              >
                <TypeIcon size={12} />
                {config.label}
              </span>
              <span className="text-xs text-[var(--grey-400)] font-mono">
                Pattern #{id}
              </span>
            </div>

            {/* Pattern name */}
            <h3 className="text-xl font-display font-bold text-[var(--grey-900)] mb-2 group-hover:text-[var(--brand-gold-dark)] transition-colors">
              {name}
            </h3>

            {/* Description preview */}
            <p className={`text-[var(--grey-500)] text-sm leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}>
              {description}
            </p>
          </div>

          {/* Expand button */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--grey-50)] flex items-center justify-center group-hover:bg-[var(--brand-gold-muted)] transition-colors"
          >
            <ChevronDown size={20} className="text-[var(--grey-400)] group-hover:text-[var(--brand-gold)]" />
          </motion.div>
        </div>

        {/* Frequency indicator bar */}
        {frequencyData && (
          <div className="mt-4 pt-4 border-t border-[var(--grey-200)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-[var(--grey-500)] uppercase tracking-wide">Frequency</span>
              <div className="flex-1 h-px bg-[var(--grey-200)]" />
            </div>
            <p className="text-xs text-[var(--grey-600)] bg-[var(--grey-50)] border border-[var(--grey-200)] px-3 py-2 rounded-lg font-mono leading-relaxed mb-3">
              {frequencyData}
            </p>
            <div className="strength-bar">
              <motion.div
                className="strength-fill"
                initial={{ width: 0 }}
                animate={{ width: isExpanded ? '85%' : '60%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        )}
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6">
              {/* Execution Sequence */}
              {executionSequence && executionSequence.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-[var(--grey-700)] uppercase tracking-wide mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color }} />
                    Execution Sequence
                  </h4>
                  <div className="space-y-2">
                    {executionSequence.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span 
                          className="flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white"
                          style={{ backgroundColor: config.color }}
                        >
                          {index + 1}
                        </span>
                        <span className="text-sm text-[var(--grey-600)] pt-0.5">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Evidence Quote */}
              {evidenceQuote && (
                <div>
                  <h4 className="text-sm font-semibold text-[var(--grey-700)] uppercase tracking-wide mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color }} />
                    Evidence
                  </h4>
                  <div className="evidence-quote text-sm">
                    {evidenceQuote}
                  </div>
                </div>
              )}

              {/* Strategic Value */}
              {strategicValue && (
                <div className="p-4 rounded-xl" style={{ backgroundColor: config.bgColor }}>
                  <h4 className="text-sm font-semibold uppercase tracking-wide mb-2 flex items-center gap-2" style={{ color: config.color }}>
                    <Lightbulb size={14} />
                    Strategic Value
                  </h4>
                  <p className="text-sm text-[var(--grey-700)]">{strategicValue}</p>
                </div>
              )}

              {/* Blind Spot Risk */}
              {blindSpotRisk && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <h4 className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-2 flex items-center gap-2">
                    <AlertTriangle size={14} />
                    Blind Spot Risk
                  </h4>
                  <p className="text-sm text-red-700">{blindSpotRisk}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PatternCard;

