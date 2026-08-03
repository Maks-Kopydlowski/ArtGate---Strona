import React from 'react';
import { Facebook } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projekty" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-slate-900 to-slate-900"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Zobacz nasze realizacje</h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
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
            <Facebook className="mr-3 h-5 w-5" />
            Nasz Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
