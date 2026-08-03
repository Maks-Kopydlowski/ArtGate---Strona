import React from 'react';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import MapComponent from './MapComponent';

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Skontaktuj się z nami</h2>
      <p className="text-base sm:text-lg text-slate-500 font-normal mb-8 leading-relaxed">
        Masz pytania lub chcesz umówić się na bezpłatną wycenę? Zadzwoń, napisz lub odwiedź nas w siedzibie. Jesteśmy do Twojej dyspozycji.
      </p>
      <div className="mb-8 rounded-2xl bg-white p-5 shadow-card text-sm text-slate-600 leading-relaxed font-medium">
        Pomagamy domom i firmom w wyborze bezpiecznych, trwałych i estetycznych rozwiązań na lata.
      </div>

      <div className="space-y-7">
        <div className="flex items-start">
          <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Telefon</h3>
            <a href="tel:+48532420269" className="text-lg text-slate-900 hover:text-blue-600 font-semibold mt-0.5 block transition-colors">
              +48 532 420 269
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email</h3>
            <a href="mailto:biuroartgate@gmail.com" className="text-lg text-slate-900 hover:text-blue-600 font-semibold mt-0.5 block transition-colors">
              biuroartgate@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div className="ml-4 flex-grow">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Adres</h3>
            <p className="text-lg text-slate-900 font-semibold mt-0.5 leading-snug">
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

      {/* Interactive Google Map Embed */}
      <MapComponent />
    </div>
  );
}
