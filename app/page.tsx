'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { InterfaceHero } from '@/components/interface/InterfaceHero';
import { ThinkingSpectrums } from '@/components/interface/ThinkingSpectrums';
import { SynergyCards } from '@/components/interface/SynergyCards';
import { BlindSpotCoverage } from '@/components/interface/BlindSpotCoverage';
import { ProtocolCards } from '@/components/interface/ProtocolCards';
import { ScenarioNavigator } from '@/components/interface/ScenarioNavigator';
import { FingerprintData, LeadershipInterfaceMap } from '@/lib/data-parser';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('interface');
  const [stefanData, setStefanData] = useState<FingerprintData | null>(null);
  const [angelaData, setAngelaData] = useState<FingerprintData | null>(null);
  const [leadershipMap, setLeadershipMap] = useState<LeadershipInterfaceMap | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [stefanRes, angelaRes, leadershipRes] = await Promise.all([
          fetch('/api/data/stefan'),
          fetch('/api/data/angela'),
          fetch('/api/data/leadership'),
        ]);
        
        const stefan = await stefanRes.json();
        const angela = await angelaRes.json();
        const leadership = await leadershipRes.json();
        
        setStefanData(stefan);
        setAngelaData(angela);
        setLeadershipMap(leadership);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--grey-900)]">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-[var(--grey-700)]" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--brand-gold)] animate-spin" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">
            Loading Interface Map
          </h2>
          <p className="text-[var(--grey-400)]">
            Preparing your leadership protocols...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="grain-overlay" />
      
      <Header onNavigate={handleNavigate} activeSection={activeSection} />
      
      <main>
        {/* Interface Map Hero */}
        <div id="interface">
          <InterfaceHero />
        </div>

        {/* Thinking Architecture Spectrums */}
        <ThinkingSpectrums />

        {/* Natural Synergies */}
        <SynergyCards />

        {/* Blind Spot Coverage */}
        <BlindSpotCoverage />

        {/* Protocol Cards */}
        <ProtocolCards />

        {/* Scenario Navigator */}
        <ScenarioNavigator />

        {/* Individual Pattern Previews */}
        <section className="py-24 px-6 lg:px-8 bg-white" id="patterns">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-[var(--brand-gold-muted)] border border-[var(--brand-gold)]/30 rounded-full text-[var(--brand-gold-dark)] text-sm font-semibold mb-6">
                INDIVIDUAL FINGERPRINTS
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--grey-900)] mb-4">
                Deep Dive Into Each Pattern Set
              </h2>
              <p className="text-lg text-[var(--grey-500)] max-w-2xl mx-auto">
                Explore the complete cognitive fingerprint for each leader: every pattern, blind spot, and behavioral&nbsp;evidence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Stefan Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href="/stefan" className="block">
                  <div className="relative p-8 rounded-3xl bg-gradient-to-br from-[var(--brand-gold-muted)] to-white border border-[var(--brand-gold)]/20 hover:border-[var(--brand-gold)] hover:shadow-xl hover:shadow-[var(--brand-gold)]/10 transition-all duration-500">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--brand-gold)] to-transparent rounded-t-3xl" />
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden">
                          <Image src="/1StefanBW.png" alt="Stefan" width={80} height={80} className="w-full h-full object-cover" unoptimized />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-bold text-[var(--grey-900)]">Stefan</h3>
                          <p className="text-sm text-[var(--brand-gold-dark)]">Dual-Speed Systems Optimizer</p>
                        </div>
                      </div>
                      <ChevronRight size={24} className="text-[var(--grey-400)] group-hover:text-[var(--brand-gold)] group-hover:translate-x-1 transition-all" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-white/80">
                        <p className="text-3xl font-display font-bold text-[var(--grey-900)]">18</p>
                        <p className="text-sm text-[var(--grey-500)]">Patterns Identified</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/80">
                        <p className="text-3xl font-display font-bold text-[var(--grey-900)]">5</p>
                        <p className="text-sm text-[var(--grey-500)]">Blind Spots Mapped</p>
                      </div>
                    </div>

                    <p className="text-[var(--grey-600)] mb-4">
                      11+ hours of transcript analysis revealing unconscious expertise patterns in systems thinking, optimization, and strategic decision-making.
                    </p>

                    <div className="flex items-center gap-2 text-[var(--brand-gold)] font-medium">
                      <span>View Full Fingerprint</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Angela Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group"
              >
                <Link href="/angela" className="block">
                  <div className="relative p-8 rounded-3xl bg-gradient-to-br from-[var(--grey-50)] to-white border border-[var(--grey-200)] hover:border-[var(--grey-400)] hover:shadow-xl transition-all duration-500">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--grey-600)] to-transparent rounded-t-3xl" />
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden">
                          <Image src="/1AngelaBW.png" alt="Angela" width={80} height={80} className="w-full h-full object-cover" unoptimized />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-bold text-[var(--grey-900)]">Angela</h3>
                          <p className="text-sm text-[var(--grey-500)]">High-Agency Pattern Matcher</p>
                        </div>
                      </div>
                      <ChevronRight size={24} className="text-[var(--grey-400)] group-hover:text-[var(--grey-700)] group-hover:translate-x-1 transition-all" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-[var(--grey-50)]">
                        <p className="text-3xl font-display font-bold text-[var(--grey-900)]">20</p>
                        <p className="text-sm text-[var(--grey-500)]">Patterns Identified</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[var(--grey-50)]">
                        <p className="text-3xl font-display font-bold text-[var(--grey-900)]">5</p>
                        <p className="text-sm text-[var(--grey-500)]">Blind Spots Mapped</p>
                      </div>
                    </div>

                    <p className="text-[var(--grey-600)] mb-4">
                      15+ hours of analysis with self-reported vs. observed distinction. 55% of patterns discovered were NOT&nbsp;self-reported.
                    </p>

                    <div className="flex items-center gap-2 text-[var(--grey-700)] font-medium">
                      <span>View Full Fingerprint</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Impact Section (without specific dollar amounts) */}
        <section className="py-24 px-6 lg:px-8 bg-[var(--grey-50)]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--grey-900)] mb-8">
              The Value of Getting This Right
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 rounded-3xl bg-white border border-[var(--grey-200)]">
                <h3 className="font-display text-xl font-bold text-[var(--grey-900)] mb-4">
                  Without These Protocols
                </h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start gap-3 text-[var(--grey-600)]">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Circular strategy discussions eating hours weekly</span>
                  </li>
                  <li className="flex items-start gap-3 text-[var(--grey-600)]">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Opportunities delayed by over-analysis or under-analysis</span>
                  </li>
                  <li className="flex items-start gap-3 text-[var(--grey-600)]">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Preventable mistakes from missed blind spots</span>
                  </li>
                  <li className="flex items-start gap-3 text-[var(--grey-600)]">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Team confusion about "which timeline is real"</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-green-50 to-white border border-green-200">
                <h3 className="font-display text-xl font-bold text-[var(--grey-900)] mb-4">
                  With These Protocols
                </h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start gap-3 text-[var(--grey-600)]">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>40-60% faster strategic decisions</span>
                  </li>
                  <li className="flex items-start gap-3 text-[var(--grey-600)]">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>80-90% fewer reversed decisions</span>
                  </li>
                  <li className="flex items-start gap-3 text-[var(--grey-600)]">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Both cognitive architectures at full capacity</span>
                  </li>
                  <li className="flex items-start gap-3 text-[var(--grey-600)]">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Team describes collaboration as "smooth" not "confusing"</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-lg text-[var(--grey-600)] max-w-2xl mx-auto">
              Your friction comes from incompatible information requirements, not personality conflict. 
              These protocols let both approaches operate simultaneously without asking either of you to&nbsp;change.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--grey-900)] text-white py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <Image
                src="/logo/cf logo.png"
                alt="Cognitive Fingerprint"
                width={48}
                height={48}
                className="rounded-xl"
              />
              <div>
                <h3 className="font-display text-xl font-bold">
                  <span className="text-gold-gradient">Cognitive Fingerprint</span>
                  <span className="text-[var(--grey-500)] text-sm ml-1">™</span>
                </h3>
                <p className="text-[var(--grey-400)] text-sm">
                  Evidence-based pattern analysis for leadership optimization
                </p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-[var(--grey-500)] text-sm">
                Analysis by Max Bernstein
              </p>
              <p className="text-[var(--grey-600)] text-xs mt-1">
                © 2025 Cognitive Fingerprint. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
