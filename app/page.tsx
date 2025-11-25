'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { FingerprintView } from '@/components/dashboard/FingerprintView';
import { ComparisonView } from '@/components/dashboard/ComparisonView';
import {
  FingerprintData,
  LeadershipInterfaceMap,
} from '@/lib/data-parser';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [stefanData, setStefanData] = useState<FingerprintData | null>(null);
  const [angelaData, setAngelaData] = useState<FingerprintData | null>(null);
  const [leadershipMap, setLeadershipMap] = useState<LeadershipInterfaceMap | null>(null);
  const [loading, setLoading] = useState(true);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const stefanRef = useRef<HTMLDivElement>(null);
  const angelaRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load data from API routes
    const loadData = async () => {
      try {
        const [stefanRes, angelaRes, leadershipRes] = await Promise.all([
          fetch('/api/data/stefan'),
          fetch('/api/data/angela'),
          fetch('/api/data/leadership'),
        ]);
        
        if (!stefanRes.ok || !angelaRes.ok || !leadershipRes.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const stefan = await stefanRes.json();
        const angela = await angelaRes.json();
        const leadership = await leadershipRes.json();
        
        if (stefan.error || angela.error || leadership.error) {
          throw new Error('API returned error');
        }
        
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

  // Track scroll position for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      const sections = [
        { id: 'hero', ref: heroRef },
        { id: 'stefan', ref: stefanRef },
        { id: 'angela', ref: angelaRef },
        { id: 'comparison', ref: comparisonRef },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const top = section.ref.current.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      hero: heroRef,
      stefan: stefanRef,
      angela: angelaRef,
      comparison: comparisonRef,
    };
    
    const ref = refs[section];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          {/* Animated fingerprint loader */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-[var(--grey-100)]" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--brand-gold)] animate-spin" />
            <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-[var(--brand-gold-light)] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          </div>
          <h2 className="font-display text-2xl font-bold text-[var(--grey-900)] mb-2">
            Loading Cognitive Fingerprint
          </h2>
          <p className="text-[var(--grey-500)]">
            Analyzing behavioral patterns...
          </p>
        </div>
      </div>
    );
  }
  
  // Show error state if no data loaded
  if (!stefanData && !angelaData && !leadershipMap) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-[var(--grey-900)] mb-4">
            Failed to Load Data
          </h2>
          <p className="text-[var(--grey-500)] mb-6">
            The dashboard couldn't load the fingerprint data. Please check that the server is running correctly.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[var(--brand-gold)] text-[var(--grey-900)] font-semibold rounded-xl hover:bg-[var(--brand-gold-dark)] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Subtle grain texture overlay */}
      <div className="grain-overlay" />
      
      <Header onNavigate={handleNavigate} activeSection={activeSection} />
      
      <main>
        {/* Hero Section - Leadership Interface Map */}
        <div ref={heroRef} id="hero">
          {leadershipMap && <HeroSection data={leadershipMap} />}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--grey-200)] to-transparent" />

        {/* Stefan's Fingerprint */}
        <div ref={stefanRef} id="stefan">
          {stefanData && (
            <FingerprintView
              data={stefanData}
              name="Stefan"
              color="stefan"
            />
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--grey-200)] to-transparent" />

        {/* Angela's Fingerprint */}
        <div ref={angelaRef} id="angela">
          {angelaData && (
            <FingerprintView
              data={angelaData}
              name="Angela"
              color="angela"
            />
          )}
        </div>

        {/* Comparison View */}
        <div ref={comparisonRef} id="comparison">
          {stefanData && angelaData && (
            <ComparisonView
              stefanData={stefanData}
              angelaData={angelaData}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--grey-900)] text-white py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-display text-2xl font-bold mb-2">
                <span className="text-gold-gradient">Cognitive Fingerprint</span>
                <span className="text-[var(--grey-500)] text-sm ml-1">™</span>
              </h3>
              <p className="text-[var(--grey-400)] text-sm">
                Evidence-based pattern analysis for leadership optimization
              </p>
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
