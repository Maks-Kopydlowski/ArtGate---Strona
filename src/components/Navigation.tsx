import React from 'react';
import { ShieldCheck, Phone, Menu, X, Facebook } from 'lucide-react';

interface NavigationProps {
  isScrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  scrollToSection: (id: string) => void;
}

export default function Navigation({
  isScrolled,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection,
}: NavigationProps) {
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          mobileMenuOpen
            ? 'bg-white py-3 border-b border-slate-100'
            : isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <ShieldCheck className={`h-8 w-8 ${mobileMenuOpen || isScrolled ? 'text-blue-600' : 'text-white'}`} />
              <span className={`ml-2 text-2xl font-bold tracking-tight ${mobileMenuOpen || isScrolled ? 'text-slate-900' : 'text-white'}`}>
                ArtGate
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['O firmie', 'Oferta', 'Projekty', 'Kontakt'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                    isScrolled ? 'text-slate-600' : 'text-slate-200'
                  }`}
                >
                  {item}
                </button>
              ))}
              <a
                href="tel:+48532420269"
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isScrolled
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                <Phone className="w-4 h-4 mr-2" />
                532 420 269
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Zamknij menu nawigacji" : "Otwórz menu nawigacji"}
                aria-expanded={mobileMenuOpen}
                className={`${mobileMenuOpen || isScrolled ? 'text-slate-900' : 'text-white'} transition-colors duration-200 cursor-pointer`}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        role="dialog"
        aria-label="Menu mobilne"
        aria-modal="true"
        className={`fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col transition-all duration-300 ${
          mobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-5 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-6 text-xl font-medium">
          {['O firmie', 'Oferta', 'Projekty', 'Kontakt'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
              className="text-left text-slate-800 border-b border-slate-100 pb-4 cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-auto mb-12 flex flex-col space-y-4">
          <a
            href="tel:+48532420269"
            className="flex items-center justify-center w-full bg-blue-600 text-white py-4 rounded-xl font-semibold"
          >
            <Phone className="w-5 h-5 mr-2" />
            Zadzwoń: 532 420 269
          </a>
          <div className="flex justify-center space-x-6 pt-6">
            <a
              href="https://www.facebook.com/artgate.lipno/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil ArtGate na Facebooku"
              className="text-slate-400 hover:text-blue-600 transition-colors"
            >
              <Facebook className="h-8 w-8" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
