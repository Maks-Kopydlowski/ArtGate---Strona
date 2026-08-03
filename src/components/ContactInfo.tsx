import React from 'react';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import MapComponent from './MapComponent';

export default function ContactInfo() {
  return (
    <div>
      <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-600 mb-6">
        Kontakt
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-[-0.02em]">Skontaktuj się z nami</h2>
      <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-prose">
        Masz pytania? Chcesz umówić się na darmową wycenę? Zadzwoń lub napisz do nas. Jesteśmy do Twojej dyspozycji.
      </p>

      <div className="space-y-4">
        <div className="flex items-start rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
            <Phone className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Telefon</h3>
            <a href="tel:+48532420269" className="text-xl text-slate-700 hover:text-blue-600 font-semibold mt-1 block transition-colors">
              +48 532 420 269
            </a>
          </div>
        </div>

        <div className="flex items-start rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Email</h3>
            <a href="mailto:biuroartgate@gmail.com" className="text-xl text-slate-700 hover:text-blue-600 font-semibold mt-1 block transition-colors">
              biuroartgate@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-start rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4 flex-grow">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Adres</h3>
            <p className="text-xl text-slate-700 font-semibold mt-1">
              ul. Spółdzielcza 14<br />
              64-111 Lipno, Wielkopolska
            </p>
            <a 
              href="https://www.google.com/maps/place/?q=place_id:ChIJHQF28OW8BUcRthNZVr6q0Zg" 
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

      <MapComponent />
    </div>
  );
}
