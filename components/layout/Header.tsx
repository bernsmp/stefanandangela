'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (section: string) => void;
  activeSection?: string;
}

const navItems = [
  { id: 'interface', label: 'Interface Map', href: '/#interface' },
  { id: 'patterns', label: 'Individual Patterns', href: '/#patterns' },
  { id: 'stefan', label: 'Stefan', href: '/stefan' },
  { id: 'angela', label: 'Angela', href: '/angela' },
];

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (item: typeof navItems[0], e: React.MouseEvent) => {
    if (item.href.startsWith('/#') && onNavigate) {
      e.preventDefault();
      onNavigate(item.id);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-[var(--grey-100)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <Image
                src="/logo/cf logo.png"
                alt="Cognitive Fingerprint"
                width={40}
                height={40}
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-xl font-bold text-gold-gradient">
                Cognitive Fingerprint
              </span>
              <span className="text-[10px] text-[var(--grey-400)] ml-1 align-top">™</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleClick(item, e)}
                  className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                    isActive
                      ? 'text-[var(--brand-gold)]'
                      : isScrolled 
                        ? 'text-[var(--grey-500)] hover:text-[var(--grey-700)]'
                        : 'text-[var(--grey-300)] hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--grey-100)] transition-colors"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-[var(--grey-700)]" />
            ) : (
              <Menu size={24} className="text-[var(--grey-700)]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--grey-100)]">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      handleClick(item, e);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-4 py-3 rounded-xl text-left font-medium transition-all ${
                      isActive
                        ? 'bg-[var(--brand-gold-muted)] text-[var(--grey-900)]'
                        : 'text-[var(--grey-600)] hover:bg-[var(--grey-50)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
