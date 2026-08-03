import React from 'react';
import { Facebook } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projekty" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-slate-900 to-slate-900"></div>
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03),transparent_50%)]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-200 mb-6">
          Realizacje
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-[-0.02em]">Zobacz nasze realizacje</h2>
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Regularnie publikujemy zdjęcia z naszych najnowszych montaży. Odwiedź nasz profil na Facebooku, aby zobaczyć, jak pracujemy.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <a
            href="https://www.facebook.com/artgate.lipno/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Odwiedź profil ArtGate na Facebooku"
            className="flex items-center px-8 py-4 bg-[#166FE5] hover:bg-[#155EC4] text-white rounded-full font-semibold transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
          >
            <Facebook className="w-5 h-5 mr-3" />
            Nasz Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
