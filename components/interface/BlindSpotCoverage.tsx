'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface BlindSpot {
  id: string;
  owner: 'stefan' | 'angela';
  title: string;
  description: string;
  coverageBy: string;
  coveragePattern: string;
  theCheck: string;
}

const blindSpots: BlindSpot[] = [
  {
    id: 's1',
    owner: 'stefan',
    title: 'Preference-to-Mandate Transformation',
    description: 'Personal preferences operate unconsciously and get communicated as objective requirements. "I hate virtual meetings" becomes "Virtual meetings are less effective."',
    coverageBy: 'angela',
    coveragePattern: 'Logic-Test Gatekeeper',
    theCheck: 'Angela asks: "Is that a requirement or a preference? If preference, can we test alternatives?"',
  },
  {
    id: 's2',
    owner: 'stefan',
    title: 'Speed-Over-Explanation Pattern',
    description: 'Decisions made rapidly without explaining the framework, creating team dependency on Stefan being present.',
    coverageBy: 'angela',
    coveragePattern: 'Comprehension Checkpoint System',
    theCheck: 'Angela runs interference: "Stefan, translate this into 3 bullets for the team."',
  },
  {
    id: 's3',
    owner: 'stefan',
    title: 'Timeline Communication Confusion',
    description: 'States aggressive timelines, then immediately adjusts them conservatively. Team doesn\'t know which timeline is "real."',
    coverageBy: 'angela',
    coveragePattern: 'Reverse Engineering',
    theCheck: 'Angela confirms: "So the committed timeline is [X], not [earlier aggressive statement]?"',
  },
  {
    id: 'a1',
    owner: 'angela',
    title: 'Quantification Bottleneck',
    description: 'Can\'t act without converting to numbers. When data doesn\'t exist, decisions stall. Innovation suffers when early-stage ROI is unclear.',
    coverageBy: 'stefan',
    coveragePattern: 'Clarification-Call Preference',
    theCheck: 'Stefan asks: "What\'s the cost of waiting for data vs. deciding with intuition and iterating?"',
  },
  {
    id: 'a2',
    owner: 'angela',
    title: 'Decision-Purpose Creates Exploration Gaps',
    description: 'Rejects activity without immediate decision utility. Misses early-stage research, relationship building, weak signals.',
    coverageBy: 'stefan',
    coveragePattern: 'Systems Thinking',
    theCheck: 'Stefan identifies: "This doesn\'t have immediate decision utility, but it feeds the system at [X] point."',
  },
  {
    id: 'a3',
    owner: 'angela',
    title: 'Training Debt from Speed',
    description: 'Speed patterns create dependency. Team can\'t operate during her unavailability. 6-9 hours/week of dependency time created.',
    coverageBy: 'stefan',
    coveragePattern: 'Permission-Before-Decision Validator',
    theCheck: 'For important delegations: "Before we assign this, 3-minute explanation of why this matters."',
  },
];

export const BlindSpotCoverage: React.FC = () => {
  const [activeOwner, setActiveOwner] = useState<'stefan' | 'angela'>('stefan');
  const [hoveredSpot, setHoveredSpot] = useState<string | null>(null);

  const filteredSpots = blindSpots.filter(spot => spot.owner === activeOwner);

  return (
    <section className="py-24 px-6 lg:px-8 bg-[var(--grey-50)]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-white border border-[var(--grey-200)] rounded-full text-[var(--grey-600)] text-sm font-semibold mb-6">
            BLIND SPOT COVERAGE SYSTEM
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--grey-900)] mb-4">
            How You Protect Each Other
          </h2>
          <p className="text-lg text-[var(--grey-500)] max-w-2xl mx-auto">
            Every blind spot one of you has is covered by a pattern the other runs automatically. This is your competitive advantage as a leadership team.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg border border-[var(--grey-100)]">
            <button
              onClick={() => setActiveOwner('stefan')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeOwner === 'stefan'
                  ? 'bg-[var(--brand-gold)] text-[var(--grey-900)] shadow-md'
                  : 'text-[var(--grey-500)] hover:text-[var(--grey-700)]'
              }`}
            >
              <Image src="/icons/data-privacy-11331580.svg" alt="" width={18} height={18} />
              What Stefan Can't See
            </button>
            <button
              onClick={() => setActiveOwner('angela')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeOwner === 'angela'
                  ? 'bg-[var(--grey-700)] text-white shadow-md'
                  : 'text-[var(--grey-500)] hover:text-[var(--grey-700)]'
              }`}
            >
              <Image src="/icons/data-privacy-11331580.svg" alt="" width={18} height={18} />
              What Angela Can't See
            </button>
          </div>
        </div>

        {/* Blind Spots Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeOwner}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {filteredSpots.map((spot, index) => (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
                onMouseEnter={() => setHoveredSpot(spot.id)}
                onMouseLeave={() => setHoveredSpot(null)}
              >
                <div className={`relative h-full p-6 rounded-2xl border transition-all duration-500 ${
                  hoveredSpot === spot.id
                    ? 'bg-white border-green-400 shadow-xl shadow-green-500/10'
                    : 'bg-white border-[var(--grey-200)]'
                }`}>
                  {/* Blind Spot */}
                  <div className={`transition-opacity duration-300 ${hoveredSpot === spot.id ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center p-1.5 ${
                        activeOwner === 'stefan' ? 'bg-[var(--brand-gold)]/10' : 'bg-[var(--grey-100)]'
                      }`}>
                        <Image src="/icons/data-privacy-11331580.svg" alt="" width={16} height={16} className="w-full h-full" />
                      </div>
                      <span className="text-xs font-semibold uppercase text-[var(--grey-400)]">Blind Spot</span>
                    </div>
                    
                    <h3 className="font-display text-lg font-bold text-[var(--grey-900)] mb-3">
                      {spot.title}
                    </h3>
                    
                    <p className="text-sm text-[var(--grey-500)] leading-relaxed">
                      {spot.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-[var(--grey-100)]">
                      <p className="text-xs text-[var(--grey-400)]">Hover to see coverage →</p>
                    </div>
                  </div>

                  {/* Coverage (shown on hover) */}
                  <div className={`absolute inset-0 p-6 rounded-2xl bg-gradient-to-br from-green-50 to-white transition-opacity duration-300 ${
                    hoveredSpot === spot.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center p-1.5">
                        <Image src="/icons/protection-11331583.svg" alt="" width={16} height={16} className="w-full h-full" />
                      </div>
                      <span className="text-xs font-semibold uppercase text-green-600">
                        {spot.coverageBy === 'angela' ? 'Angela' : 'Stefan'} Catches This
                      </span>
                    </div>

                    <h4 className="font-semibold text-[var(--grey-900)] mb-2">
                      {spot.coveragePattern}
                    </h4>

                    <div className="p-3 rounded-xl bg-white border border-green-200 mb-4">
                      <p className="text-sm text-[var(--grey-600)] font-medium">
                        The Check:
                      </p>
                      <p className="text-sm text-[var(--grey-700)] italic mt-1">
                        "{spot.theCheck}"
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                      <span>✓ Blind spot → Covered</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[var(--brand-gold)]/10 via-white to-[var(--grey-100)] border border-[var(--brand-gold)]/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[var(--brand-gold)] flex items-center justify-center text-xl font-bold text-[var(--grey-900)]">S</div>
              <div>
                <p className="text-sm text-[var(--grey-500)]">Stefan's blind spots</p>
                <p className="font-display text-2xl font-bold text-[var(--grey-900)]">5 covered</p>
              </div>
            </div>
            
            <ArrowRight className="text-[var(--grey-300)] hidden md:block" size={24} />
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center p-3">
              <Image src="/icons/protection-11331583.svg" alt="Protection" width={32} height={32} className="w-full h-full" />
            </div>
            <ArrowRight className="text-[var(--grey-300)] hidden md:block rotate-180" size={24} />
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[var(--grey-700)] flex items-center justify-center text-xl font-bold text-white">A</div>
              <div>
                <p className="text-sm text-[var(--grey-500)]">Angela's blind spots</p>
                <p className="font-display text-2xl font-bold text-[var(--grey-900)]">5 covered</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Shared Blind Spots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <div className="text-center mb-8">
            <h3 className="font-display text-xl font-bold text-[var(--grey-900)] mb-2">
              Shared Gaps (Neither Catches)
            </h3>
            <p className="text-sm text-[var(--grey-500)]">
              These require external solutions or explicit attention
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-amber-50 border border-amber-200">
              <h4 className="font-semibold text-[var(--grey-900)] mb-2">Exploration & Experimentation</h4>
              <p className="text-sm text-[var(--grey-600)] mb-3">
                Both favor proven, simple approaches over complex experimentation. Nobody champions testing novel&nbsp;approaches.
              </p>
              <p className="text-xs font-medium text-amber-700">
                Solution: Explicit "exploration budget" assigned to someone else
              </p>
            </div>
            
            <div className="p-5 rounded-xl bg-amber-50 border border-amber-200">
              <h4 className="font-semibold text-[var(--grey-900)] mb-2">Team Development Through Discomfort</h4>
              <p className="text-sm text-[var(--grey-600)] mb-3">
                Both optimize for comfort and efficiency, avoiding development-through-struggle assignments.
              </p>
              <p className="text-xs font-medium text-amber-700">
                Solution: Quarterly "stretch assignments" with explicit development&nbsp;framing
              </p>
            </div>
            
            <div className="p-5 rounded-xl bg-amber-50 border border-amber-200">
              <h4 className="font-semibold text-[var(--grey-900)] mb-2">Operational Deep Understanding</h4>
              <p className="text-sm text-[var(--grey-600)] mb-3">
                Stefan avoids operational to maintain strategic identity. Angela avoids operational ownership for executive&nbsp;focus.
              </p>
              <p className="text-xs font-medium text-amber-700">
                Solution: Monthly "operational immersion" rotation (2 hours each)
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlindSpotCoverage;

