'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface Scenario {
  id: string;
  iconPath: string;
  title: string;
  description: string;
  stefanLeads: boolean;
  angelaLeads: boolean;
  steps: {
    who: 'stefan' | 'angela' | 'both';
    action: string;
  }[];
  keyRule: string;
}

const scenarios: Scenario[] = [
  {
    id: 'strategic',
    iconPath: '/icons/creative-idea-2881904.svg',
    title: 'Major Strategic Decision',
    description: 'Entering a new market, major pivot, or significant investment (>$50K, irreversible)',
    stefanLeads: true,
    angelaLeads: false,
    steps: [
      { who: 'stefan', action: 'Maps complete system, constraints, and 2-3 options with trade-offs' },
      { who: 'angela', action: 'Pressure-tests for real-world execution feasibility' },
      { who: 'both', action: 'Both must agree OR use veto rules (Stefan: systemic risk, Angela: execution impossibility)' },
      { who: 'angela', action: "Chooses from Stefan's options and leads execution" },
    ],
    keyRule: 'Stefan validates structure; Angela validates momentum. Neither overrides without discussion.',
  },
  {
    id: 'tactical',
    iconPath: '/icons/clock-2881910.svg',
    title: 'Quick Tactical Decision',
    description: 'Choosing software, small process changes, reversible decisions (<$50K, <30 days)',
    stefanLeads: false,
    angelaLeads: true,
    steps: [
      { who: 'angela', action: 'Decides within 24 hours' },
      { who: 'stefan', action: 'Scans for catastrophic risks only (not optimization)' },
      { who: 'angela', action: 'Executes immediately' },
      { who: 'both', action: 'Review results at weekly sync' },
    ],
    keyRule: "Default to Angela's speed. Stefan only flags show-stoppers, not preferences.",
  },
  {
    id: 'crisis',
    iconPath: '/icons/startup-2881897.svg',
    title: 'Crisis Situation',
    description: '>$50K at risk, >500 customers affected, or must decide in <24 hours',
    stefanLeads: false,
    angelaLeads: true,
    steps: [
      { who: 'angela', action: 'Declares crisis and takes command' },
      { who: 'stefan', action: 'Confirms crisis criteria met (2+ triggers)' },
      { who: 'angela', action: 'Makes all tactical decisions, assigns tasks without consensus' },
      { who: 'stefan', action: "Feeds 2-sentence critical context only. Does not slow her down" },
    ],
    keyRule: 'Normal protocols suspended. Angela leads until threat neutralized or 48hrs pass.',
  },
  {
    id: 'hiring',
    iconPath: '/icons/identity-card-2881900.svg',
    title: 'Hiring Critical Roles',
    description: 'Any role that will interact with leadership or own significant outcomes',
    stefanLeads: true,
    angelaLeads: true,
    steps: [
      { who: 'stefan', action: 'Creates evaluation framework and "Smart Simplifier" criteria' },
      { who: 'angela', action: "Runs rapid interviews (8-10 candidates/day vs Stefan's 2-3)" },
      { who: 'both', action: 'Final decision together. Both must say yes' },
      { who: 'both', action: "Week 2 check-in: If split, Stefan's system concerns override" },
    ],
    keyRule: 'Both filters required. Angela finds them fast, Stefan validates system fit.',
  },
  {
    id: 'disagreement',
    iconPath: '/icons/contract-2881918.svg',
    title: 'When You Disagree',
    description: 'Different views on direction, timing, or approach',
    stefanLeads: false,
    angelaLeads: false,
    steps: [
      { who: 'both', action: 'Name the pattern causing disagreement (e.g., "Stefan needs constraint map, Angela needs motion")' },
      { who: 'both', action: 'Reference which Decision Matrix category this falls into' },
      { who: 'both', action: 'If still stuck after 48hrs: CEO veto, Test Both, or External Tiebreaker' },
      { who: 'both', action: "Loser commits fully to winner's approach" },
    ],
    keyRule: 'Neither can "pull rank" intellectually. Both approaches are required for exceptional outcomes.',
  },
];

export const ScenarioNavigator: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<Scenario>(scenarios[0]);

  return (
    <section className="py-24 px-6 lg:px-8 bg-[var(--grey-900)]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[var(--brand-gold)]/10 border border-[var(--brand-gold)]/30 rounded-full text-[var(--brand-gold)] text-sm font-semibold mb-6">
            SCENARIO PLAYBOOK
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Who Leads When?
          </h2>
          <p className="text-lg text-[var(--grey-400)] max-w-2xl mx-auto">
            Clear protocols for common situations. No more negotiating roles in the&nbsp;moment.
          </p>
        </div>

        <div className="grid lg:grid-cols-[300px,1fr] gap-8">
          {/* Scenario List */}
          <div className="space-y-3">
            {scenarios.map((scenario) => {
              const isActive = activeScenario.id === scenario.id;
              return (
                <button
                  key={scenario.id}
                  onClick={() => setActiveScenario(scenario)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
                    isActive
                      ? 'bg-[var(--brand-gold)] border-[var(--brand-gold)] text-[var(--grey-900)]'
                      : 'bg-[var(--grey-800)] border-[var(--grey-700)] text-white hover:border-[var(--grey-600)]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center p-1.5 ${
                    isActive ? 'bg-[var(--grey-900)]' : 'bg-[var(--grey-700)]'
                  }`}>
                    <Image 
                      src={scenario.iconPath} 
                      alt={scenario.title} 
                      width={28} 
                      height={28}
                      className="w-full h-full"
                    />
                  </div>
                  <span className="font-semibold flex-1">{scenario.title}</span>
                  {isActive && <ChevronRight size={16} />}
                </button>
              );
            })}
          </div>

          {/* Scenario Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScenario.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--grey-800)] rounded-3xl p-8 border border-[var(--grey-700)]"
            >
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--brand-gold)]/20 flex items-center justify-center p-3">
                    <Image 
                      src={activeScenario.iconPath} 
                      alt={activeScenario.title} 
                      width={40} 
                      height={40}
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      {activeScenario.title}
                    </h3>
                    <p className="text-[var(--grey-400)]">{activeScenario.description}</p>
                  </div>
                </div>

                {/* Who Leads */}
                <div className="flex gap-4">
                  {activeScenario.stefanLeads && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-gold)]/20 text-[var(--brand-gold)] text-sm font-medium">
                      <span className="w-6 h-6 rounded-full overflow-hidden">
                        <Image src="/1StefanBW.png" alt="Stefan" width={24} height={24} className="w-full h-full object-cover" unoptimized />
                      </span>
                      Stefan Leads
                    </span>
                  )}
                  {activeScenario.angelaLeads && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--grey-600)]/50 text-[var(--grey-300)] text-sm font-medium">
                      <span className="w-6 h-6 rounded-full overflow-hidden">
                        <Image src="/1AngelaBW.png" alt="Angela" width={24} height={24} className="w-full h-full object-cover" unoptimized />
                      </span>
                      Angela Leads
                    </span>
                  )}
                  {!activeScenario.stefanLeads && !activeScenario.angelaLeads && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium">
                      Shared Leadership
                    </span>
                  )}
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4 mb-8">
                {activeScenario.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                      step.who === 'stefan' 
                        ? 'bg-[var(--brand-gold)]' 
                        : step.who === 'angela'
                        ? 'bg-[var(--grey-600)]'
                        : 'bg-gradient-to-r from-[var(--brand-gold)] to-[var(--grey-600)]'
                    }`}>
                      <span className={`text-sm font-bold ${
                        step.who === 'stefan' ? 'text-[var(--grey-900)]' : 'text-white'
                      }`}>
                        {step.who === 'stefan' ? 'S' : step.who === 'angela' ? 'A' : 'S+A'}
                      </span>
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-[var(--grey-300)]">{step.action}</p>
                    </div>
                    {index < activeScenario.steps.length - 1 && (
                      <ArrowRight size={16} className="text-[var(--grey-600)] mt-3 flex-shrink-0" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Key Rule */}
              <div className="p-5 rounded-xl bg-[var(--brand-gold)]/10 border border-[var(--brand-gold)]/30">
                <p className="text-sm font-semibold text-[var(--brand-gold)] mb-2">KEY RULE</p>
                <p className="text-[var(--grey-300)]">{activeScenario.keyRule}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ScenarioNavigator;
