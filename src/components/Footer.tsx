import React from 'react';
import { ShieldCheck, Facebook } from 'lucide-react';

interface FooterProps {
  scrollToSection?: (id: string) => void;
  setPrivacyOpen?: (open: boolean) => void;
}

export default function Footer({ scrollToSection, setPrivacyOpen }: FooterProps) {
  const handleScroll = (id: string) => {
    if (scrollToSection) {
      scrollToSection(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handlePrivacy = () => {
    if (setPrivacyOpen) {
      setPrivacyOpen(true);
    } else {
      window.dispatchEvent(new CustomEvent('open-privacy-modal'));
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="p-1.5 rounded-xl bg-blue-600/10 text-blue-500 mr-2.5">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">ArtGate</span>
            </div>
            <p className="max-w-md text-sm text-slate-400 leading-relaxed mb-6 font-normal">
              Profesjonalne systemy bezpieczeństwa, automatyka do bram, ogrodzenia i monitoring. Dbamy o bezpieczeństwo Twojego domu i firmy.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/artgate.lipno/" aria-label="Profil ArtGate na Facebooku" className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">Szybkie linki</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#o-firmie" onClick={(e) => { e.preventDefault(); handleScroll('o-firmie'); }} className="hover:text-blue-400 text-left transition-colors block">O firmie</a></li>
              <li><a href="#oferta" onClick={(e) => { e.preventDefault(); handleScroll('oferta'); }} className="hover:text-blue-400 text-left transition-colors block">Oferta</a></li>
              <li><a href="#projekty" onClick={(e) => { e.preventDefault(); handleScroll('projekty'); }} className="hover:text-blue-400 text-left transition-colors block">Projekty</a></li>
              <li><a href="#kontakt" onClick={(e) => { e.preventDefault(); handleScroll('kontakt'); }} className="hover:text-blue-400 text-left transition-colors block">Kontakt</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">Kontakt</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Lipno, Wielkopolska</li>
              <li>ul. Spółdzielcza 14</li>
              <li><a href="tel:+48532420269" className="hover:text-blue-400 transition-colors">+48 532 420 269</a></li>
              <li><a href="mailto:biuroartgate@gmail.com" className="hover:text-blue-400 transition-colors">biuroartgate@gmail.com</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} ArtGate. Wszystkie prawa zastrzeżone.</p>
          <p className="mt-3 md:mt-0">
            <button
              type="button"
              onClick={handlePrivacy}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Polityka prywatności
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
}
