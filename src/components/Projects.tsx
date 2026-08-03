import React from 'react';
import { Facebook } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projekty" className="py-20 sm:py-28 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-slate-950 to-slate-950"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">Zobacz nasze realizacje</h2>
        <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
          Regularnie publikujemy dokumentację z naszych najnowszych montaży i projektów. Odwiedź nasz oficjalny profil na Facebooku.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <a
            href="https://www.facebook.com/artgate.lipno/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Odwiedź profil ArtGate na Facebooku"
            className="flex items-center px-8 py-4 bg-[#166FE5] hover:bg-[#135ec4] text-white rounded-full font-semibold transition-all shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 cursor-pointer"
          >
            <Facebook className="mr-2.5 h-5 w-5" />
            Nasz profil na Facebooku
          </a>
        </div>
      </div>
    </section>
  );
}
