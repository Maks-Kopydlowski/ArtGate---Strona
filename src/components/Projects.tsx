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
        <div className="mx-auto flex max-w-xl flex-col items-center rounded-[2rem] border border-white/10 bg-white/10 px-6 py-6 backdrop-blur-sm sm:flex-row sm:justify-between sm:px-8">
          <div className="text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Sprawdź nasz styl pracy</p>
            <p className="mt-1 text-base text-slate-200">Realizacje dopasowane do domu, firmy i przestrzeni użytkowej.</p>
          </div>
          <a
            href="https://www.facebook.com/artgate.lipno/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Odwiedź profil ArtGate na Facebooku"
            className="mt-4 flex items-center rounded-full bg-[#166FE5] px-6 py-3 font-semibold text-white transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 sm:mt-0"
          >
            <Facebook className="mr-3 h-5 w-5" />
            Nasz Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
