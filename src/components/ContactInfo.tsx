import React from 'react';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import MapComponent from './MapComponent';

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

      {/* Interactive Google Map Embed (Lazy loaded via IntersectionObserver) */}
      <MapComponent />
    </div>
  );
}
