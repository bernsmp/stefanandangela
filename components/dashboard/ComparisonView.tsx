'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Users, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { FingerprintData } from '@/lib/data-parser';

interface ComparisonViewProps {
  stefanData: FingerprintData;
  angelaData: FingerprintData;
}

interface ComparisonItem {
  dimension: string;
  stefan: string;
  angela: string;
  icon: React.ElementType;
}

interface SynergyItem {
  title: string;
  stefanPattern: string;
  angelaPattern: string;
  effect: string;
}

interface FrictionItem {
  title: string;
  stefanPattern: string;
  angelaPattern: string;
  resolution: string;
}

const comparisonData: ComparisonItem[] = [
  {
    dimension: 'How certainty is generated',
    stefan: 'Map system → Predict outcomes → Execute',
    angela: 'Start moving → Hit blocker → Solve → Continue',
    icon: Zap,
  },
  {
    dimension: 'Information requirement',
    stefan: 'Complete constraint map before major decisions',
    angela: 'Destination clarity + confidence in capacity',
    icon: Users,
  },
  {
    dimension: 'Processing orientation',
    stefan: 'Predictive (model before action)',
    angela: 'Adaptive (discover through action)',
    icon: Zap,
  },
  {
    dimension: 'Decision trigger',
    stefan: 'Appropriate rigor for reversibility',
    angela: 'Clear destination + self-trust',
    icon: Users,
  },
];

const synergies: SynergyItem[] = [
  {
    title: 'Realistic Plans with Clear Priorities',
    stefanPattern: 'Timeline Realism Adjuster',
    angelaPattern: 'Metrics-to-Decision Bridge',
    effect: 'Stefan adjusts timelines realistically; Angela converts to priority levels.',
  },
  {
    title: 'Improvements That Drive Outcomes',
    stefanPattern: 'Optimization-First Metacognition',
    angelaPattern: 'Decision-Purpose Filter',
    effect: 'Stefan finds inefficiencies; Angela filters which matter for decisions.',
  },
  {
    title: 'Clear Lanes with Collaboration',
    stefanPattern: 'Permission-Before-Decision',
    angelaPattern: 'Executive-Operational Firewall',
    effect: 'Strategic alignment with maintained operational ownership.',
  },
];

const frictions: FrictionItem[] = [
  {
    title: 'Preference vs Data Priority',
    stefanPattern: 'Preference-As-Principle Framework',
    angelaPattern: 'Quantification Reflex',
    resolution: 'Explicitly label: "This is my preference" vs. "This is data-driven"',
  },
  {
    title: 'Timeline Communication',
    stefanPattern: 'Aggressive-Conservative Duality',
    angelaPattern: 'Reverse Engineering',
    resolution: 'Single timeline only; label as "aspirational" or "committed"',
  },
  {
    title: 'Meeting Format Tension',
    stefanPattern: 'High-Bandwidth Preference',
    angelaPattern: 'Time-Scarcity Operating System',
    resolution: 'Define threshold: Which decisions truly require in-person?',
  },
];

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  stefanData,
  angelaData,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'synergies' | 'friction'>('overview');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-24 px-6 lg:px-8 bg-[var(--grey-50)] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, var(--grey-900) 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-[var(--stefan)] rounded-full" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--grey-400)]">
              Interface Map
            </span>
            <div className="w-12 h-1 bg-[var(--angela)] rounded-full" />
          </div>
          
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--grey-900)] mb-4">
            <span className="text-gold-gradient">Stefan</span>
            <span className="text-[var(--grey-300)]"> × </span>
            <span className="text-[var(--grey-700)]">Angela</span>
          </h2>
          
          <p className="text-lg text-[var(--grey-500)] max-w-2xl mx-auto">
            How your cognitive patterns interact—where they create synergy and where they create friction.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`flex justify-center mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg border border-[var(--grey-100)]">
            {[
              { key: 'overview', label: 'Overview', icon: Users },
              { key: 'synergies', label: 'Synergies', icon: CheckCircle },
              { key: 'friction', label: 'Friction Points', icon: AlertTriangle },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-[var(--brand-gold)] text-[var(--grey-900)] shadow-md'
                      : 'text-[var(--grey-500)] hover:text-[var(--grey-700)]'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Thinking Architecture Comparison */}
              <div className="grid gap-6">
                {/* Header Row */}
                <div className="grid grid-cols-[2fr,1fr,1fr] gap-6">
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-[var(--grey-900)]">
                      Thinking Architecture
                    </h3>
                  </div>
                  <div className="p-6 bg-[var(--stefan-muted)] rounded-2xl border border-[var(--stefan)]/20">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[var(--stefan)]" />
                      <span className="font-semibold text-[var(--grey-900)]">Stefan</span>
                    </div>
                    <p className="text-xs text-[var(--grey-500)] mt-1">Dual-Speed Systems Optimizer</p>
                  </div>
                  <div className="p-6 bg-[var(--angela-muted)] rounded-2xl border border-[var(--angela)]/20">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[var(--angela)]" />
                      <span className="font-semibold text-[var(--grey-900)]">Angela</span>
                    </div>
                    <p className="text-xs text-[var(--grey-500)] mt-1">High-Agency Pattern Matcher</p>
                  </div>
                </div>

                {/* Comparison Rows */}
                {comparisonData.map((item, index) => (
                  <motion.div
                    key={item.dimension}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="grid grid-cols-[2fr,1fr,1fr] gap-6 items-stretch"
                  >
                    <div className="p-6 bg-white rounded-2xl border border-[var(--grey-100)] flex items-center">
                      <p className="font-medium text-[var(--grey-700)]">{item.dimension}</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border-l-4 border-l-[var(--stefan)] border border-[var(--grey-100)]">
                      <p className="text-sm text-[var(--grey-600)]">{item.stefan}</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border-l-4 border-l-[var(--angela)] border border-[var(--grey-100)]">
                      <p className="text-sm text-[var(--grey-600)]">{item.angela}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Key Insight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 p-8 bg-gradient-to-br from-[var(--brand-gold-muted)] to-white rounded-3xl border border-[var(--brand-gold)]/30"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--brand-gold)] flex items-center justify-center flex-shrink-0">
                    <Zap className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-bold text-[var(--grey-900)] mb-2">
                      The Core Finding
                    </h4>
                    <p className="text-[var(--grey-600)] leading-relaxed">
                      The friction you experience isn't personality conflict or communication breakdown. 
                      It's <strong>incompatible information requirements</strong> based on fundamentally 
                      different cognitive processing. The solution is <strong>parallel work, not compromise</strong>. 
                      Both approaches fully expressed, then integrated.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'synergies' && (
            <motion.div
              key="synergies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6"
            >
              {synergies.map((synergy, index) => (
                <motion.div
                  key={synergy.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 bg-white rounded-3xl border border-[var(--grey-100)] hover:border-[var(--success)] transition-colors group"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                      <CheckCircle className="text-[var(--success)]" size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display text-xl font-bold text-[var(--grey-900)] mb-4">
                        {synergy.title}
                      </h4>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1 p-4 rounded-xl bg-[var(--stefan-muted)] border border-[var(--stefan)]/20">
                          <p className="text-xs text-[var(--grey-400)] uppercase tracking-wide mb-1">Stefan's Pattern</p>
                          <p className="text-sm font-medium text-[var(--grey-700)]">{synergy.stefanPattern}</p>
                        </div>
                        <ArrowRight className="text-[var(--grey-300)] flex-shrink-0" />
                        <div className="flex-1 p-4 rounded-xl bg-[var(--angela-muted)] border border-[var(--angela)]/20">
                          <p className="text-xs text-[var(--grey-400)] uppercase tracking-wide mb-1">Angela's Pattern</p>
                          <p className="text-sm font-medium text-[var(--grey-700)]">{synergy.angelaPattern}</p>
                        </div>
                      </div>
                      
                      <p className="text-[var(--grey-600)]">{synergy.effect}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'friction' && (
            <motion.div
              key="friction"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6"
            >
              {frictions.map((friction, index) => (
                <motion.div
                  key={friction.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 bg-white rounded-3xl border border-[var(--grey-100)] hover:border-[var(--warning)] transition-colors group"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                      <AlertTriangle className="text-[var(--warning)]" size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display text-xl font-bold text-[var(--grey-900)] mb-4">
                        {friction.title}
                      </h4>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1 p-4 rounded-xl bg-[var(--stefan-muted)] border border-[var(--stefan)]/20">
                          <p className="text-xs text-[var(--grey-400)] uppercase tracking-wide mb-1">Stefan's Pattern</p>
                          <p className="text-sm font-medium text-[var(--grey-700)]">{friction.stefanPattern}</p>
                        </div>
                        <XCircle className="text-[var(--grey-300)] flex-shrink-0" />
                        <div className="flex-1 p-4 rounded-xl bg-[var(--angela-muted)] border border-[var(--angela)]/20">
                          <p className="text-xs text-[var(--grey-400)] uppercase tracking-wide mb-1">Angela's Pattern</p>
                          <p className="text-sm font-medium text-[var(--grey-700)]">{friction.angelaPattern}</p>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                        <p className="text-xs text-[var(--success)] uppercase tracking-wide mb-1 font-semibold">Resolution Protocol</p>
                        <p className="text-sm text-[var(--grey-700)]">{friction.resolution}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Financial Impact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid md:grid-cols-2 gap-6"
        >
          <div className="p-8 bg-gradient-to-br from-red-50 to-white rounded-3xl border border-red-100">
            <h4 className="font-display text-lg font-bold text-[var(--grey-900)] mb-4">
              Current Annual Friction Cost
            </h4>
            <p className="text-4xl font-display font-bold text-red-600 mb-2">
              $580K - $1.32M
            </p>
            <ul className="space-y-2 text-sm text-[var(--grey-600)]">
              <li>• Circular strategy discussions: $80K-120K</li>
              <li>• Opportunities delayed: $200K-500K</li>
              <li>• Preventable mistakes: $300K-700K</li>
            </ul>
          </div>
          
          <div className="p-8 bg-gradient-to-br from-green-50 to-white rounded-3xl border border-green-100">
            <h4 className="font-display text-lg font-bold text-[var(--grey-900)] mb-4">
              Value With Protocol Implementation
            </h4>
            <p className="text-4xl font-display font-bold text-[var(--success)] mb-2">
              $2.65M - $5.4M
            </p>
            <ul className="space-y-2 text-sm text-[var(--grey-600)]">
              <li>• Decision velocity improvement: 40-60%</li>
              <li>• Preventable mistake reduction: 80-90%</li>
              <li>• Time-to-market acceleration: 30-50%</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonView;
