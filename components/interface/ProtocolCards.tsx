'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';
import Image from 'next/image';

interface Protocol {
  id: string;
  number: number;
  title: string;
  iconPath: string;
  summary: string;
  stefanRule: string;
  angelaRule: string;
  example?: {
    scenario: string;
    resolution: string;
  };
}

const protocols: Protocol[] = [
  {
    id: 'communication',
    number: 1,
    title: 'Communication Translation',
    iconPath: '/icons/communication-11331586.svg',
    summary: "Don't give each other information in YOUR format. Translate to THEIR format.",
    stefanRule: 'Use 2-3 sentence template for Angela. Destination + top constraint + "which door needs unlocking?"',
    angelaRule: 'Provide constraint context upfront for Stefan. "Here\'s where I\'m going" + "Current blocker" + "Ready to execute once..."',
    example: {
      scenario: 'Stefan needs to update Angela on quiz software decision',
      resolution: '"We\'re deciding on quiz software. Need to launch in 30 days. Top constraint: must integrate with CRM. Which door needs unlocking first?"',
    },
  },
  {
    id: 'decision',
    number: 2,
    title: 'Decision Matrix',
    iconPath: '/icons/analysis-2881914.svg',
    summary: 'Different decision types get different protocols based on reversibility.',
    stefanRule: 'Type 1 (irreversible): Map system, constraints, 2-3 options with trade-offs. Type 2: Flag show-stopper risks only.',
    angelaRule: 'Type 1: Pressure-test for execution feasibility, choose from Stefan\'s options. Type 2: Decide in <24hrs, execute.',
    example: {
      scenario: 'Hiring a new director vs. choosing email software',
      resolution: 'Director = Type 1 (both involved). Email software = Type 2 (Angela decides, Stefan scans for catastrophic risks).',
    },
  },
  {
    id: 'timeline',
    number: 3,
    title: 'Timeline Commitment',
    iconPath: '/icons/clock-2881910.svg',
    summary: 'State SINGLE timeline only. No aggressive-then-pad in same breath.',
    stefanRule: 'Pick ONE: "Aspirational timeline" (if everything goes perfectly) OR "Committed timeline" (what we\'re planning against).',
    angelaRule: 'Confirm which one: "So the committed timeline is [X], not [earlier statement]?"',
    example: {
      scenario: 'Stefan says "Let\'s launch in 2 weeks... well, realistically 4 weeks"',
      resolution: 'Angela: "Which is it - 2 weeks aspirational or 4 weeks committed? We need one for resource planning."',
    },
  },
  {
    id: 'parallel',
    number: 4,
    title: 'Parallel Work Process',
    iconPath: '/icons/agile-11331553.svg',
    summary: 'Work SIMULTANEOUSLY, not sequentially. Neither waits for the other.',
    stefanRule: 'Up to 2 weeks for comprehensive constraint mapping. Don\'t rush, but don\'t block Angela either.',
    angelaRule: 'Up to 2 weeks for rapid market experiments. If you finish in 5 days, move to next priority. Don\'t wait for Stefan.',
    example: {
      scenario: 'New product launch decision',
      resolution: 'Stefan: 2 weeks modeling. Angela: Tests 3 approaches in same 2 weeks. Day 15: Integrate findings before deciding.',
    },
  },
  {
    id: 'escalation',
    number: 5,
    title: 'Blind Spot Escalation',
    iconPath: '/icons/creative-idea-2881904.svg',
    summary: "Specific triggers for when to call out the other's blind spot.",
    stefanRule: "Escalate to Angela: When she's stalled waiting for data on reversible decision. When someone dismissed might be specialist.",
    angelaRule: 'Escalate to Stefan: When impact >$50K on "operational" issue. When his preference becoming organizational constraint.',
  },
  {
    id: 'crisis',
    number: 6,
    title: 'Crisis Response',
    iconPath: '/icons/startup-2881897.svg',
    summary: 'Angela leads, Stefan feeds context. Normal protocols suspended.',
    stefanRule: "Provide 2-sentence critical context only. Don't slow her down with full analysis. Trust her execution.",
    angelaRule: 'Take command. Make all tactical decisions. Assign tasks without consensus. "Clear, fast, decisive" mode.',
    example: {
      scenario: '700+ customers affected by system outage',
      resolution: 'Angela leads response. Stefan: "Here\'s the one system constraint you need: [X]." Crisis ends when threat neutralized or 48hrs pass.',
    },
  },
];

export const ProtocolCards: React.FC = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);

  return (
    <section className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[var(--brand-gold-muted)] border border-[var(--brand-gold)]/30 rounded-full text-[var(--brand-gold-dark)] text-sm font-semibold mb-6">
            OPERATIONAL PROTOCOLS
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--grey-900)] mb-4">
            The Rules of Engagement
          </h2>
          <p className="text-lg text-[var(--grey-500)] max-w-2xl mx-auto">
            Six protocols that let both cognitive architectures operate at full capacity&nbsp;simultaneously.
          </p>
        </div>

        {/* Protocol Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {protocols.map((protocol, index) => (
            <motion.button
              key={protocol.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProtocol(protocol)}
              className="group text-left p-6 rounded-2xl border border-[var(--grey-100)] bg-white hover:border-[var(--brand-gold)] hover:shadow-xl hover:shadow-[var(--brand-gold)]/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[var(--brand-gold-muted)] flex items-center justify-center p-2 group-hover:bg-[var(--brand-gold)]/20 transition-colors">
                  <Image 
                    src={protocol.iconPath} 
                    alt={protocol.title} 
                    width={40} 
                    height={40}
                    className="w-full h-full"
                  />
                </div>
                <span className="text-sm font-mono text-[var(--grey-400)]">#{protocol.number}</span>
              </div>

              <h3 className="font-display text-lg font-bold text-[var(--grey-900)] mb-2 group-hover:text-[var(--brand-gold-dark)] transition-colors">
                {protocol.title}
              </h3>

              <p className="text-sm text-[var(--grey-500)] mb-4 line-clamp-2">
                {protocol.summary}
              </p>

              <div className="flex items-center gap-2 text-sm font-medium text-[var(--brand-gold)] opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View details</span>
                <ChevronRight size={16} />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Protocol Modal */}
        <AnimatePresence>
          {selectedProtocol && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProtocol(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-[var(--brand-gold)]/20 flex items-center justify-center p-2">
                        <Image 
                          src={selectedProtocol.iconPath} 
                          alt={selectedProtocol.title} 
                          width={48} 
                          height={48}
                          className="w-full h-full"
                        />
                      </div>
                      <div>
                        <span className="text-sm font-mono text-[var(--grey-400)]">Protocol #{selectedProtocol.number}</span>
                        <h3 className="font-display text-2xl font-bold text-[var(--grey-900)]">
                          {selectedProtocol.title}
                        </h3>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProtocol(null)}
                      className="p-2 rounded-full hover:bg-[var(--grey-100)] transition-colors"
                    >
                      <X size={20} className="text-[var(--grey-500)]" />
                    </button>
                  </div>

                  {/* Summary */}
                  <p className="text-lg text-[var(--grey-600)] mb-8">
                    {selectedProtocol.summary}
                  </p>

                  {/* Rules */}
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="p-5 rounded-xl bg-[var(--brand-gold-muted)] border border-[var(--brand-gold)]/20">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-[var(--brand-gold)] flex items-center justify-center">
                          <span className="text-xs font-bold text-[var(--grey-900)]">S</span>
                        </div>
                        <span className="font-semibold text-[var(--grey-900)]">Stefan's Rule</span>
                      </div>
                      <p className="text-sm text-[var(--grey-700)]">{selectedProtocol.stefanRule}</p>
                    </div>

                    <div className="p-5 rounded-xl bg-[var(--grey-50)] border border-[var(--grey-200)]">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-[var(--grey-700)] flex items-center justify-center">
                          <span className="text-xs font-bold text-white">A</span>
                        </div>
                        <span className="font-semibold text-[var(--grey-900)]">Angela's Rule</span>
                      </div>
                      <p className="text-sm text-[var(--grey-700)]">{selectedProtocol.angelaRule}</p>
                    </div>
                  </div>

                  {/* Example */}
                  {selectedProtocol.example && (
                    <div className="p-5 rounded-xl bg-gradient-to-r from-green-50 to-white border border-green-200">
                      <p className="text-sm font-semibold text-green-700 mb-2">Example in Action</p>
                      <p className="text-sm text-[var(--grey-600)] mb-3">
                        <strong>Scenario:</strong> {selectedProtocol.example.scenario}
                      </p>
                      <p className="text-sm text-[var(--grey-700)]">
                        <strong>Resolution:</strong> {selectedProtocol.example.resolution}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProtocolCards;
