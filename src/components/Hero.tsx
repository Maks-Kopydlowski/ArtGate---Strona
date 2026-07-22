import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0 bg-slate-950">
        <picture className="w-full h-full">
          <source media="(max-width: 639px)" srcSet="/img/hero-bg-mobile.webp" type="image/webp" />
          <img
            src="/img/hero-bg.webp"
            alt="Nowoczesny dom z bramą"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-40 bg-slate-950"
            referrerPolicy="no-referrer"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Bezpieczniejszy dom <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              zaczyna się tutaj
            </span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light mb-10">
            Ogrodzenia, alarmy, monitoring i automatyka do bram. Kompleksowe rozwiązania dla Twojego spokoju.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => scrollToSection('oferta')}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center"
            >
              Zobacz ofertę
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToSection('kontakt')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-full font-semibold text-lg transition-all flex items-center justify-center"
            >
              Darmowa wycena
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
