import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, Star, Award, Phone, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-12 lg:pt-36 lg:pb-16 bg-slate-950 text-white overflow-hidden">
      {/* Background with deep cinematic tone and subtle grid */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
          alt="Nowoczesna brama wjazdowa i posesja"
          className="w-full h-full object-cover opacity-25"
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.25),rgba(255,255,255,0))]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Engineering & Region Indicator Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-lg mb-8 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-200 tracking-wide">
              Lipno & cała Wielkopolska • Bezpłatny dojazd i pomiar
            </span>
          </div>

          {/* Primary Display Headline (Solid high-contrast text, no AI gradient slop) */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] leading-[1.08] mb-8 text-white">
            Inżynieria bezpiecznego domu. <br />
            <span className="text-blue-400">Bramy, automatyka, CCTV i alarmy.</span>
          </h1>

          {/* Value Proposition Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto mb-10 text-balance">
            Produkcja ogrodzeń stalowych cynkowanych ogniowo oraz certyfikowany montaż automatyki i inteligentnych systemów ochrony dla klientów indywidualnych i firm.
          </p>

          {/* Primary & Secondary Action Duo */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-12">
            <button
              type="button"
              onClick={() => scrollToSection('kalkulator')}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-base sm:text-lg transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>Oblicz szacunkowy koszt</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('oferta')}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-100 hover:text-white border border-slate-700/80 rounded-full font-semibold text-base sm:text-lg transition-all backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Zobacz zakres usług</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Trust & Authority Proof Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white leading-none mb-1">15 Lat</div>
              <div className="text-xs text-slate-400 font-medium">Doświadczenia w branży</div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white leading-none mb-1">5.0 ★</div>
              <div className="text-xs text-slate-400 font-medium">Opinie z Google Maps</div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white leading-tight mb-0.5">Darmowy pomiar</div>
              <div className="text-xs text-slate-400 font-medium">I doradztwo na posesji</div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white leading-tight mb-0.5">Somfy • Satel • BFT</div>
              <div className="text-xs text-slate-400 font-medium">Autoryzowany montaż</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
