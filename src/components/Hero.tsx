import React from 'react';
import { ChevronRight, ShieldCheck, Star } from 'lucide-react';

interface HeroProps {
  scrollToSection?: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 py-24 sm:py-32">
      <div className="absolute inset-0 z-0">
        <picture className="w-full h-full">
          <source media="(max-width: 639px)" srcSet="/img/hero-bg-mobile.webp" type="image/webp" />
          <img
            src="/img/hero-bg.webp"
            alt="Nowoczesny dom z automatyką bramy i ogrodzeniem"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
        </picture>
        {/* Multi-layer overlay for optimal contrast & depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center text-center lg:text-left">
          
          {/* Left Column: Heading, Subtitle, CTAs */}
          <div className="lg:col-span-7 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 backdrop-blur-md text-blue-400 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Automatyka, Ogrodzenia & CCTV</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.1] sm:leading-[1.12]">
              Bezpieczniejszy dom <br className="hidden sm:block" />
              <span className="text-blue-400">zaczyna się tutaj</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8">
              Kompleksowe systemy bezpieczeństwa, ogrodzenia stalowe, alarmy oraz automatyka bramowa montowane z najwyższą precyzją w Wielkopolsce.
            </p>

            {/* Action Hierarchy: Primary vs Secondary CTA */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
              <a
                href="#oferta"
                onClick={(e) => {
                  if (scrollToSection) {
                    e.preventDefault();
                    scrollToSection('oferta');
                  }
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-base transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center cursor-pointer hover:-translate-y-0.5 group"
              >
                Zobacz ofertę
                <ChevronRight className="ml-1.5 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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

            {/* Feature badges */}
            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-2.5 sm:gap-3">
              {['15 lat doświadczenia', 'Szybki montaż', 'Bezpłatna wycena'].map((item) => (
                <div key={item} className="rounded-full bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-200 backdrop-blur-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Desktop Trust Card (Refactoring UI card layout) */}
          <div className="hidden lg:block lg:col-span-5 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
              <div className="flex items-center space-x-4 pb-6 border-b border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xl">
                  5.0
                </div>
                <div>
                  <div className="flex space-x-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Ocena w Google Maps</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Darmowy dojazd i wycena w Wielkopolsce</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Certyfikowane napędy z pełną gwarancją</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Zdalna kontrola dostępu ze smartfona</span>
                </div>
              </div>

              <a
                href="tel:+48532420269"
                className="block text-center py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-semibold text-sm transition-all"
              >
                Infolinia: +48 532 420 269
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
