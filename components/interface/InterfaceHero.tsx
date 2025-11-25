'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export const InterfaceHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-24 px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--grey-900)] via-[var(--grey-900)] to-[#1a1a2e]" />
      
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(var(--brand-gold) 1px, transparent 1px), linear-gradient(90deg, var(--brand-gold) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[var(--brand-gold)]/10 border border-[var(--brand-gold)]/30 rounded-full text-[var(--brand-gold)] text-sm font-semibold mb-6">
            THE LEADERSHIP INTERFACE
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Working Together in an{' '}
            <span className="text-gold-gradient">Optimized Way</span>
          </h1>
          <p className="text-xl text-[var(--grey-400)] max-w-3xl mx-auto">
            How your cognitive patterns interact: where they create synergy, where they create friction, and the protocols that multiply your&nbsp;effectiveness.
          </p>
        </motion.div>

        {/* The Core Model - Two Approaches */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {/* Stefan's Model */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-[var(--brand-gold)]/10 to-transparent border border-[var(--brand-gold)]/20 group hover:border-[var(--brand-gold)]/40 transition-all duration-500">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--brand-gold)] to-transparent rounded-t-3xl" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl overflow-hidden">
                <Image 
                  src="/1StefanBW.png" 
                  alt="Stefan" 
                  width={64} 
                  height={64}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white">Stefan</h3>
                <p className="text-sm text-[var(--brand-gold)]">Dual-Speed Systems Optimizer</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-[var(--grey-300)]">
                <div className="w-8 h-8 rounded-lg bg-[var(--brand-gold)]/20 flex items-center justify-center text-sm font-bold text-[var(--brand-gold)]">1</div>
                <span>Map the complete system</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--grey-300)]">
                <div className="w-8 h-8 rounded-lg bg-[var(--brand-gold)]/20 flex items-center justify-center text-sm font-bold text-[var(--brand-gold)]">2</div>
                <span>Predict outcomes</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--grey-300)]">
                <div className="w-8 h-8 rounded-lg bg-[var(--brand-gold)]/20 flex items-center justify-center text-sm font-bold text-[var(--brand-gold)]">3</div>
                <span>Execute with confidence</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--grey-900)]/50 border border-[var(--grey-700)]">
              <p className="text-sm text-[var(--grey-400)] mb-2">Mental Model</p>
              <p className="text-lg font-semibold text-white flex items-center gap-2">
                Clarity <ArrowRight size={18} className="text-[var(--brand-gold)]" /> Motion
              </p>
            </div>
          </div>

          {/* Angela's Model */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-[var(--grey-600)]/10 to-transparent border border-[var(--grey-600)]/20 group hover:border-[var(--grey-500)]/40 transition-all duration-500">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--grey-400)] to-transparent rounded-t-3xl" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl overflow-hidden">
                <Image 
                  src="/1AngelaBW.png" 
                  alt="Angela" 
                  width={64} 
                  height={64}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white">Angela</h3>
                <p className="text-sm text-[var(--grey-400)]">High-Agency Pattern Matcher</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-[var(--grey-300)]">
                <div className="w-8 h-8 rounded-lg bg-[var(--grey-600)]/30 flex items-center justify-center text-sm font-bold text-[var(--grey-300)]">1</div>
                <span>Start moving toward goal</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--grey-300)]">
                <div className="w-8 h-8 rounded-lg bg-[var(--grey-600)]/30 flex items-center justify-center text-sm font-bold text-[var(--grey-300)]">2</div>
                <span>Hit blocker → Solve it</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--grey-300)]">
                <div className="w-8 h-8 rounded-lg bg-[var(--grey-600)]/30 flex items-center justify-center text-sm font-bold text-[var(--grey-300)]">3</div>
                <span>Continue until done</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--grey-900)]/50 border border-[var(--grey-700)]">
              <p className="text-sm text-[var(--grey-400)] mb-2">Mental Model</p>
              <p className="text-lg font-semibold text-white flex items-center gap-2">
                Motion <ArrowRight size={18} className="text-[var(--grey-400)]" /> Clarity
              </p>
            </div>
          </div>
        </motion.div>

        {/* The Core Insight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[var(--brand-gold)]/5 to-transparent border border-[var(--brand-gold)]/20"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--grey-900)] border border-[var(--brand-gold)] rounded-full">
            <span className="text-sm font-semibold text-[var(--brand-gold)]">THE CORE FINDING</span>
          </div>

          <div className="text-center">
            <p className="text-xl md:text-2xl text-[var(--grey-300)] leading-relaxed mb-8">
              You process information differently. You generate certainty differently. That creates friction, and <span className="text-white font-semibold">that same difference is your competitive&nbsp;advantage</span>.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 text-sm font-semibold mb-2">❌ What Doesn't Work</p>
                <p className="text-[var(--grey-400)] text-sm">"Communicate better" (you already communicate&nbsp;clearly)</p>
              </div>
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 text-sm font-semibold mb-2">❌ What Doesn't Work</p>
                <p className="text-[var(--grey-400)] text-sm">"Be more flexible" (can't override cognitive&nbsp;processing)</p>
              </div>
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <p className="text-green-400 text-sm font-semibold mb-2">✓ The Solution</p>
                <p className="text-[var(--grey-400)] text-sm"><span className="text-white">Parallel work, not compromise.</span> Both approaches fully expressed, then integrated.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InterfaceHero;

