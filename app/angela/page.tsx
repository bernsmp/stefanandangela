'use client';

import React, { useState, useEffect } from 'react';
import { FingerprintView } from '@/components/dashboard/FingerprintView';
import { FingerprintData } from '@/lib/data-parser';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AngelaPage() {
  const [angelaData, setAngelaData] = useState<FingerprintData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('/api/data/angela');
        const data = await res.json();
        setAngelaData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-[var(--grey-100)]" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--grey-600)] animate-spin" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[var(--grey-900)] mb-2">
            Loading Angela's Fingerprint
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="grain-overlay" />
      
      {/* Simple header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[var(--grey-100)]">
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 text-[var(--grey-600)] hover:text-[var(--grey-900)] transition-colors">
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Interface Map</span>
            </Link>
            <span className="font-display text-xl font-bold text-gold-gradient">
              Cognitive Fingerprint™
            </span>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        {angelaData && (
          <FingerprintView
            data={angelaData}
            name="Angela"
            color="angela"
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[var(--grey-900)] text-white py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[var(--grey-400)] text-sm">
            Angela's Cognitive Fingerprint™ • Analysis by Max Bernstein
          </p>
        </div>
      </footer>
    </div>
  );
}

