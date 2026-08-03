import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  scrollToSection?: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 py-24 sm:py-32">
      <div className="absolute inset-0 z-0">
        <picture className="w-full h-full">
          <source media="(max-width: 639px)" srcSet="/img/hero-bg-mobile.webp" type="image/webp" />
          <img
            src="/img/hero-bg.webp"
            alt="Nowoczesny dom z automatyką bramy i ogrodzeniem"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-35"
            referrerPolicy="no-referrer"
          />
        </picture>
        {/* Subtle multi-layer overlay for depth and text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/95" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1] sm:leading-[1.12]">
            Bezpieczniejszy dom <br className="hidden sm:block" />
            <span className="text-blue-400">zaczyna się tutaj</span>
          </h1>
          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Ogrodzenia, alarmy, monitoring i automatyka do bram. Kompleksowe i trwałe rozwiązania montowane z najwyższą precyzją.
          </p>

          {/* Action Hierarchy: Primary vs Secondary CTA */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5">
            <a
              href="#oferta"
              onClick={(e) => {
                if (scrollToSection) {
                  e.preventDefault();
                  scrollToSection('oferta');
                }
              }}
              className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-base transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center cursor-pointer hover:-translate-y-0.5"
            >
              Zobacz ofertę
              <ChevronRight className="ml-1.5 w-4 h-4" />
            </a>
            <a
              href="#kontakt"
              onClick={(e) => {
                if (scrollToSection) {
                  e.preventDefault();
                  scrollToSection('kontakt');
                }
              }}
              className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-full font-semibold text-base transition-all flex items-center justify-center cursor-pointer"
            >
              Darmowa wycena
            </a>
          </div>

          {/* De-emphasized feature badges with borderless background pills */}
          <div className="mt-12 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {['15 lat doświadczenia', 'Szybki montaż', 'Bezpłatna wycena'].map((item) => (
              <div key={item} className="rounded-full bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-200 backdrop-blur-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
