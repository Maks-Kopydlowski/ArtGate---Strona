import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import type { FaqItem } from '../types';

export default function Faq() {
  const [activeTab, setActiveTab] = useState<string>('Wszystkie');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData: FaqItem[] = [
    {
      question: 'Czy wycena i wizja lokalna w ArtGate są darmowe?',
      answer: 'Tak, pomiar oraz wstępna konsultacja techniczna na terenie Lipna i okolicznych miejscowości są w 100% bezpłatne i niezobowiązujące.',
      category: 'Ogólne',
    },
    {
      question: 'Jak dobrać odpowiednią automatykę do mojej bramy?',
      answer: 'Dobór napędu zależy od wagi bramy, jej długości, konstrukcji (przesuwna/skrzydłowa) oraz przewidywanej intensywności pracy. Nasz monter dobierze optymalny zestaw sprawdzonych marek (np. Somfy, BFT, Came, Nice, Faac).',
      category: 'Automatyka',
    },
    {
      question: 'Czy po montażu alarmiu/kamer otrzymam dostęp na telefonie?',
      answer: 'Tak! Wszystkie montowane przez nas nowoczesne centrale alarmowe (np. Satel) oraz rejestratory CCTV umożliwiają bezpieczny podgląd obrazu i sterowanie z poziomu dedykowanej aplikacji na smartfonie iOS / Android z dowolnego miejsca na świecie.',
      category: 'Monitoring & Alarmy',
    },
    {
      question: 'Ile czasu trwa montaż automatyki do bramy lub zestawu kamer?',
      answer: 'Standardowy montaż automatyki bramowej trwa od 3 do 5 godzin. Instalacja systemu monitoringu w domu jednorodzinnym z reguły zamyka się w 1 dniu roboczym.',
      category: 'Automatyka',
    },
    {
      question: 'Jaką gwarancję udzielacie na wykonane prace?',
      answer: 'Udzielamy pełnej gwarancji wykonawczej oraz zapewniamy bezpłatny serwis w okresie gwarancyjnym. Sam sprzęt objęty jest gwarancją producenta od 24 do nawet 60 miesięcy.',
      category: 'Ogólne',
    },
    {
      question: 'Czy robicie ogrodzenia pod indywidualny wymiar?',
      answer: 'Tak, produkujemy i montujemy bramy przesuwne, skrzydłowe, furtki oraz przęsła ogrodzeniowe według indywidualnego projektu klienta, w dowolnym kolorze z palety RAL (np. popularny antracyt RAL 7016).',
      category: 'Ogrodzenia',
    },
  ];

  const categories = ['Wszystkie', 'Ogólne', 'Automatyka', 'Monitoring & Alarmy', 'Ogrodzenia'];

  const filteredFaqs = activeTab === 'Wszystkie'
    ? faqData
    : faqData.filter(item => item.category === activeTab);

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 mr-1" />
            <span>Pytania i Odpowiedzi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Często zadawane pytania
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Znajdź odpowiedzi na najważniejsze pytania dotyczące naszej oferty, wyceny oraz montażu.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveTab(cat);
                setOpenIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const btnId = `faq-btn-${idx}`;
            const regionId = `faq-region-${idx}`;
            const chevronBg = isOpen ? "rotate-180 bg-blue-600" : "bg-slate-100";
            const chevronColor = isOpen ? "text-white" : "text-slate-800";
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-blue-200 bg-blue-50/30 shadow-md'
                    : 'border-slate-200/80 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={regionId}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <span className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${isOpen ? 'text-blue-600' : 'text-slate-400'}`} />
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full transition-transform duration-300 flex-shrink-0 ${chevronBg}`}>
                    <ChevronDown className={`w-4 h-4 ${chevronColor}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={regionId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 text-slate-700 text-sm sm:text-base leading-relaxed pl-12 border-t border-slate-100/50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
