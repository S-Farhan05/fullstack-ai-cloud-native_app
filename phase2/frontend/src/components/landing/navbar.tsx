'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

/**
 * Navbar Component
 *
 * Fixed/sticky navigation bar for the landing page with smooth scroll navigation,
 * backdrop blur effect, and responsive hamburger menu for mobile devices.
 *
 * Features:
 * - Sticky positioning with backdrop blur on scroll
 * - Smooth scroll to page sections
 * - Responsive hamburger menu for mobile
 * - Dark theme styling with subtle borders
 * - Hover effects and transitions
 *
 * @component
 * @example
 * ```tsx
 * <Navbar />
 * ```
 */

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#2a2a2a] shadow-lg shadow-black/20'
          : 'bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-[#1a1a1a]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-200"
            >
              TaskFlow
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-[#d4d4d4] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-[#d4d4d4] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-[#d4d4d4] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('stats')}
              className="text-[#d4d4d4] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-[#e5e5e5] hover:text-white hover:bg-[#1a1a1a] rounded-md transition-all duration-200 cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 bg-[#222222] text-white font-semibold rounded-md border border-[#333333] hover:bg-[#2a2a2a] hover:border-[#4a4a4a] hover:shadow-lg hover:shadow-black/30 transition-all duration-200 cursor-pointer"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#d4d4d4] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 transition-colors duration-200"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#111111] border-t border-[#2a2a2a]">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left px-3 py-2 text-[#d4d4d4] hover:text-white hover:bg-[#1a1a1a] rounded-md transition-all duration-200 cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left px-3 py-2 text-[#d4d4d4] hover:text-white hover:bg-[#1a1a1a] rounded-md transition-all duration-200 cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="block w-full text-left px-3 py-2 text-[#d4d4d4] hover:text-white hover:bg-[#1a1a1a] rounded-md transition-all duration-200 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('stats')}
              className="block w-full text-left px-3 py-2 text-[#d4d4d4] hover:text-white hover:bg-[#1a1a1a] rounded-md transition-all duration-200 cursor-pointer"
            >
              Contact
            </button>
            <div className="pt-4 space-y-2 border-t border-[#2a2a2a]">
              <Link
                href="/login"
                className="block w-full text-center px-3 py-2 text-[#e5e5e5] hover:text-white hover:bg-[#1a1a1a] rounded-md transition-all duration-200 cursor-pointer"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="block w-full text-center px-3 py-2 bg-[#222222] text-white font-semibold rounded-md border border-[#333333] hover:bg-[#2a2a2a] hover:border-[#4a4a4a] transition-all duration-200 cursor-pointer"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
