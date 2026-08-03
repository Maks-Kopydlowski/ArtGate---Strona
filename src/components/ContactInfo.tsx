import React from 'react';
import { Phone, Mail, MapPin, Clock, ChevronRight } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div>
      <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-100">
        <span>Szybki Kontakt</span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Skontaktuj się z nami
      </h2>
      <p className="text-slate-600 text-base sm:text-lg mb-10 leading-relaxed">
        Masz pytania lub potrzebujesz indywidualnej wyceny? Zadzwoń lub wyślij wiadomość przez formularz – nasi eksperci odpowiadają najszybciej jak to możliwe.
      </p>

      <div className="space-y-6">
        <div className="flex items-start bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100/80 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Phone className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Telefon</h4>
            <a href="tel:+48532420269" className="text-xl text-slate-900 hover:text-blue-600 font-extrabold mt-0.5 block transition-colors">
              +48 532 420 269
            </a>
            <p className="text-xs text-slate-500 mt-1">Obsługa zapytań telefonicznych i wycen</p>
          </div>
        </div>

        <div className="flex items-start bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100/80 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</h4>
            <a href="mailto:biuroartgate@gmail.com" className="text-lg text-slate-900 hover:text-blue-600 font-bold mt-0.5 block transition-colors">
              biuroartgate@gmail.com
            </a>
            <p className="text-xs text-slate-500 mt-1">Napisz w dowolnym momencie – odpowiadamy w 24h</p>
          </div>
        </div>

        <div className="flex items-start bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100/80 rounded-2xl flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-5 flex-grow">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Siedziba firmy</h4>
            <p className="text-base text-slate-900 font-bold mt-0.5">
              ul. Spółdzielcza 14, 64-111 Lipno
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Województwo wielkopolskie</p>
            <a 
              href="https://maps.google.com/?q=ul.+Spółdzielcza+14,+64-111+Lipno" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 mt-2 group"
            >
              Nawiguj w Mapach Google
              <ChevronRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="flex items-start bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-100/80 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="ml-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Godziny pracy biura</h4>
            <p className="text-sm text-slate-800 font-semibold mt-1">
              Poniedziałek – Piątek: <span className="text-slate-900 font-bold">8:00 – 17:00</span>
            </p>
            <p className="text-sm text-slate-800 font-semibold mt-0.5">
              Sobota: <span className="text-slate-900 font-bold">9:00 – 14:00</span>
            </p>
          </div>
        </div>
      </div>

      {/* Google Map Embed */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200/80 shadow-md h-72 relative group bg-slate-100">
        <iframe
          title="Mapa dojazdu ArtGate Lipno"
          src="https://maps.google.com/maps?q=ul.%20Sp%C3%B3%C5%82dzielcza%2014,%2064-111%20Lipno&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 filter grayscale-[10%] contrast-[105%] group-hover:grayscale-0 transition-all duration-500"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
