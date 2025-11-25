'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LeadershipInterfaceMap } from '@/lib/data-parser';

interface HeroSectionProps {
  data: LeadershipInterfaceMap;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Extract key stats from the data
  const stats = [
    { label: 'Stefan Patterns', value: '18', sublabel: '11+ hours analyzed' },
    { label: 'Angela Patterns', value: '20', sublabel: '15+ hours analyzed' },
    { label: 'Annual Value', value: '$2.6M+', sublabel: 'Potential unlock' },
    { label: 'Friction Cost', value: '$580K+', sublabel: 'To eliminate' },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-gold-muted)] via-white to-white opacity-60" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--brand-gold)] opacity-[0.03] blur-3xl" />
        <div className="absolute top-40 right-[10%] w-[400px] h-[400px] rounded-full bg-[var(--brand-gold)] opacity-[0.05] blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 bg-[var(--brand-gold-muted)] border border-[var(--brand-gold)] rounded-full transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="w-2 h-2 bg-[var(--brand-gold)] rounded-full animate-pulse" />
              <span className="text-sm font-medium text-[var(--brand-gold-dark)]">
                Leadership Interface Map
              </span>
            </div>

            {/* Headline */}
            <h1 
              className={`font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--grey-900)] leading-[1.1] transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="text-gold-gradient">Stefan</span>
              <span className="text-[var(--grey-300)]"> & </span>
              <span className="text-[var(--grey-700)]">Angela</span>
            </h1>

            {/* Subtitle */}
            <p 
              className={`text-xl lg:text-2xl text-[var(--grey-500)] max-w-xl leading-relaxed transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Two exceptionally high-performing operators with <em className="text-[var(--grey-700)] not-italic font-medium">complementary cognitive architectures</em>.
            </p>

            {/* Description */}
            <p 
              className={`text-base text-[var(--grey-400)] max-w-lg transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              This dashboard visualizes 38 unconscious behavioral patterns, blind spot coverage systems, and operational protocols designed to optimize your collaboration.
            </p>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-wrap gap-4 pt-4 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button 
                onClick={() => document.getElementById('stefan')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[var(--brand-gold)] text-[var(--grey-900)] font-semibold rounded-xl hover:bg-[var(--brand-gold-dark)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--brand-gold)]/20 hover:-translate-y-0.5"
              >
                Explore Stefan's Patterns
              </button>
              <button 
                onClick={() => document.getElementById('angela')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-[var(--grey-700)] font-semibold rounded-xl border-2 border-[var(--grey-200)] hover:border-[var(--grey-400)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Angela's Patterns
              </button>
            </div>
          </div>

          {/* Right column - Fingerprint Visual */}
          <div 
            className={`relative flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="relative">
              {/* Glow effect behind fingerprint */}
              <div className="absolute inset-0 bg-[var(--brand-gold)] rounded-full opacity-20 blur-3xl scale-75" />
              
              {/* Fingerprint image */}
              <div className="fingerprint-hero relative z-10">
                <Image
                  src="/logo/cf logo.png"
                  alt="Cognitive Fingerprint"
                  width={420}
                  height={420}
                  className="drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Floating labels */}
              <div className="absolute -left-16 top-1/4 bg-white rounded-xl shadow-xl border border-[var(--grey-100)] px-4 py-3 animate-fade-in-up stagger-3">
                <p className="text-xs text-[var(--grey-400)] uppercase tracking-wide">Procedural</p>
                <p className="text-lg font-bold text-[var(--procedural)]">10 patterns</p>
              </div>

              <div className="absolute -right-12 top-1/2 bg-white rounded-xl shadow-xl border border-[var(--grey-100)] px-4 py-3 animate-fade-in-up stagger-4">
                <p className="text-xs text-[var(--grey-400)] uppercase tracking-wide">Conditional</p>
                <p className="text-lg font-bold text-[var(--conditional)]">10 patterns</p>
              </div>

              <div className="absolute -left-8 bottom-1/4 bg-white rounded-xl shadow-xl border border-[var(--grey-100)] px-4 py-3 animate-fade-in-up stagger-5">
                <p className="text-xs text-[var(--grey-400)] uppercase tracking-wide">Declarative</p>
                <p className="text-lg font-bold text-[var(--declarative)]">8 patterns</p>
              </div>

              <div className="absolute -right-8 bottom-1/3 bg-white rounded-xl shadow-xl border border-[var(--grey-100)] px-4 py-3 animate-fade-in-up stagger-6">
                <p className="text-xs text-[var(--grey-400)] uppercase tracking-wide">Metacognitive</p>
                <p className="text-lg font-bold text-[var(--metacognitive)]">8 patterns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div 
          className={`mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="relative p-6 bg-white rounded-2xl border border-[var(--grey-100)] hover:border-[var(--brand-gold)] transition-all duration-300 group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--brand-gold)] to-[var(--brand-gold-light)] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-sm text-[var(--grey-400)] mb-1">{stat.label}</p>
              <p className="text-3xl font-display font-bold text-[var(--grey-900)]">{stat.value}</p>
              <p className="text-xs text-[var(--grey-400)] mt-1">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--grey-400)]">
        <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-[var(--grey-300)] flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-[var(--brand-gold)] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
