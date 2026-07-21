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
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a
            href="https://www.facebook.com/artgate.lipno/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-8 py-4 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white rounded-full font-semibold transition-colors"
          >
            <Facebook className="w-5 h-5 mr-3" />
            Nasz Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
