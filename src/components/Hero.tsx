import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  scrollToSection?: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0 z-0 bg-slate-950">
        <picture className="w-full h-full">
          <source media="(max-width: 639px)" srcSet="/img/hero-bg-mobile.webp" type="image/webp" />
          <img
            src="/img/hero-bg.webp"
            alt="Nowoczesny dom z bramą"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-45 bg-slate-950"
            referrerPolicy="no-referrer"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-900/40 to-slate-950/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 sm:py-28">
        <div className="animate-fade-in-up max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-slate-200 backdrop-blur-sm mb-6">
            Bezpieczeństwo i estetyka
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-[-0.02em] mb-6 leading-[0.95]">
            Bezpieczniejszy dom
            <br className="hidden md:block" />
            <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-sky-300">
              zaczyna się tutaj
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200/90 max-w-3xl mx-auto font-light leading-relaxed mb-10">
            Ogrodzenia, alarmy, monitoring i automatyka do bram. Kompleksowe rozwiązania dla Twojego spokoju.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5">
            <a
              href="#oferta"
              onClick={(e) => {
                if (scrollToSection) {
                  e.preventDefault();
                  scrollToSection('oferta');
                }
              }}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/45 hover:-translate-y-0.5 flex items-center justify-center"
            >
              Zobacz ofertę
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="#kontakt"
              onClick={(e) => {
                if (scrollToSection) {
                  e.preventDefault();
                  scrollToSection('kontakt');
                }
              }}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white backdrop-blur-md border border-white/20 rounded-full font-semibold text-lg transition-all flex items-center justify-center"
            >
              Darmowa wycena
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
