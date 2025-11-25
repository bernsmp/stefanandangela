'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Synergy {
  id: string;
  iconPath: string;
  title: string;
  description: string;
  whatItMeans: string;
}

const synergies: Synergy[] = [
  {
    id: 'processing-speed',
    iconPath: '/icons/growth-11331559.svg',
    title: 'Extremely High Cognitive Processing Speed',
    description: 'Both absorb information rapidly, connect dots faster than 95% of operators, and operate 2-3 steps ahead of most&nbsp;people.',
    whatItMeans: 'You can communicate in shorthand that would confuse others. Your protocols preserve this compression where alignment&nbsp;exists.',
  },
  {
    id: 'agency',
    iconPath: '/icons/trophy-2881913.svg',
    title: 'Strong Agency Mindset',
    description: 'Neither collapses under pressure, plays victim, makes excuses, or waits for&nbsp;permission.',
    whatItMeans: 'Crisis resilience that is exceptionally rare at the leadership level. When things break, neither of you will be the&nbsp;bottleneck.',
  },
  {
    id: 'low-level',
    iconPath: '/icons/filter-11331564.svg',
    title: 'Intolerance for Low-Level Thinking',
    description: 'You both find it exhausting when people ramble, overshare process details, or bring problems without&nbsp;solutions.',
    whatItMeans: 'Natural filter for high-quality talent and partners. Your hiring instincts&nbsp;align.',
  },
  {
    id: 'solving',
    iconPath: '/icons/launch-setting-2881921.svg',
    title: 'Bias Toward Solving, Not Dramatizing',
    description: 'Neither dwells on problems. Both immediately shift to: What is the path forward? Who handles&nbsp;what?',
    whatItMeans: 'Faster recovery from setbacks than typical leadership&nbsp;teams.',
  },
  {
    id: 'ambition',
    iconPath: '/icons/goal-2881902.svg',
    title: 'Ambition + Dominance Energy',
    description: 'Both operate with "dominate the category" mentality rather than "compete in the&nbsp;category."',
    whatItMeans: 'Natural alignment on strategic vision and growth expectations. No need to negotiate ambition&nbsp;level.',
  },
];

export const SynergyCards: React.FC = () => {
  return (
    <section className="py-24 px-6 lg:px-8 bg-[var(--grey-900)]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--brand-gold)]/10 border border-[var(--brand-gold)]/30 rounded-full text-[var(--brand-gold)] text-sm font-semibold mb-6">
            <Image src="/icons/premium-rating-2881919.svg" alt="" width={16} height={16} />
            NATURAL SYNERGIES
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Where You're Already Aligned
          </h2>
          <p className="text-lg text-[var(--grey-400)] max-w-2xl mx-auto">
            These similarities create your foundation. No protocols needed here. You're already in&nbsp;sync.
          </p>
        </div>

        {/* Synergy Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {synergies.map((synergy, index) => (
            <motion.div
              key={synergy.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-[var(--grey-800)] border border-[var(--grey-700)] hover:border-[var(--brand-gold)]/50 hover:bg-[var(--grey-800)]/80 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-[var(--brand-gold)]/10 flex items-center justify-center mb-4 p-2 group-hover:bg-[var(--brand-gold)]/20 transition-colors">
                <Image 
                  src={synergy.iconPath} 
                  alt={synergy.title} 
                  width={40} 
                  height={40}
                  className="w-full h-full"
                />
              </div>
              
              <h3 className="font-display text-lg font-bold text-white mb-3">
                {synergy.title}
              </h3>
              
              <p 
                className="text-sm text-[var(--grey-400)] mb-4"
                dangerouslySetInnerHTML={{ __html: synergy.description }}
              />
              
              <div className="pt-4 border-t border-[var(--grey-700)]">
                <p 
                  className="text-sm font-medium text-[var(--brand-gold)]"
                  dangerouslySetInnerHTML={{ __html: `Result: ${synergy.whatItMeans}` }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[var(--brand-gold)]/10 to-[var(--grey-800)] border border-[var(--brand-gold)]/20 text-center"
        >
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[var(--brand-gold)] flex items-center justify-center text-lg font-bold text-[var(--grey-900)]">S</div>
            <span className="text-2xl text-[var(--grey-500)]">+</span>
            <div className="w-12 h-12 rounded-2xl bg-[var(--grey-600)] flex items-center justify-center text-lg font-bold text-white">A</div>
          </div>
          <p className="text-lg text-[var(--grey-300)] max-w-xl mx-auto">
            These 5 synergies create <span className="font-semibold text-white">your competitive advantage as a leadership team</span>. 
            The differences (covered in protocols) make you&nbsp;complete.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SynergyCards;
