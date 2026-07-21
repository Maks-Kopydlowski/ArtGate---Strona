import React from 'react';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-4xl font-bold text-slate-900 mb-6">Skontaktuj się z nami</h2>
      <p className="text-lg text-slate-600 mb-10">
        Masz pytania? Chcesz umówić się na darmową wycenę? Zadzwoń lub napisz do nas. Jesteśmy do Twojej dyspozycji.
      </p>

      <div className="space-y-8">
        <div className="flex items-start">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Phone className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">Telefon</h4>
            <a href="tel:+48532420269" className="text-xl text-slate-700 hover:text-blue-600 font-semibold mt-1 block transition-colors">
              +48 532 420 269
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">Email</h4>
            <a href="mailto:biuroartgate@gmail.com" className="text-xl text-slate-700 hover:text-blue-600 font-semibold mt-1 block transition-colors">
              biuroartgate@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-6 flex-grow">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">Adres</h4>
            <p className="text-xl text-slate-700 font-semibold mt-1">
              ul. Spółdzielcza 14<br />
              64-111 Lipno, Wielkopolska
            </p>
            <a 
              href="https://maps.google.com/?q=ul.+Spółdzielcza+14,+64-111+Lipno" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 mt-2 group"
            >
              Otwórz w Mapach Google
              <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Google Map Embed */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200/80 shadow-lg h-80 relative group bg-slate-100">
        <iframe
          title="Mapa dojazdu ArtGate Lipno"
          src="https://maps.google.com/maps?q=ul.%20Sp%C3%B3%C5%82dzielcza%2014,%2064-111%20Lipno&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 filter grayscale-[10%] contrast-[110%] group-hover:grayscale-0 transition-all duration-500"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
