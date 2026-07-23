import React from 'react';
import { CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import type { GoogleReview } from '../types';
import { getReviewsWord } from '../utils/helpers';

interface AboutProps {
  googleRating: number;
  googleReviewsCount: number;
  googleReview: GoogleReview | null;
}

export default function About({
  googleRating,
  googleReviewsCount,
  googleReview,
}: AboutProps) {
  return (
    <section id="o-firmie" className="py-16 sm:py-24 bg-slate-50 overflow-hidden rounded-t-[3rem] relative -mt-10 z-20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>O firmie</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Piękno, funkcjonalność i <span className="text-blue-600">bezpieczeństwo</span>
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              ArtGate specjalizuje się w produkcji oraz montażu bram, ogrodzeń, balustrad i konstrukcji stalowych. Dodatkowo oferujemy sprzedaż i instalację automatyki bramowej, monitoringu CCTV oraz systemów alarmowych.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Stawiamy na profesjonalną realizację zgodnie z preferencjami klientów, szybki czas realizacji, fachowy montaż oraz bezpłatny serwis w okresie gwarancji.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                "Kompleksowa obsługa",
                "Bezpłatna wycena",
                "Fachowy montaż",
                "Serwis gwarancyjny"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex flex-col">
                <span className="text-5xl font-extrabold text-slate-900">15</span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">Lat<br/>Doświadczenia</span>
              </div>
              <div className="h-16 w-px bg-slate-200"></div>
              <div className="flex flex-col">
                <span className="text-5xl font-extrabold text-slate-900">100+</span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">Zadowolonych<br/>Klientów</span>
              </div>
            </div>
          </div>

          <div className="relative px-2 sm:px-0">
            <div className="absolute inset-0 bg-blue-600 rounded-3xl transform translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4 opacity-10"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 sm:p-10 flex flex-col justify-between min-h-[450px] sm:min-h-[500px]">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div className="flex items-center space-x-3">
                  <svg className="h-8 w-8" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">Firma w Google</h3>
                    <p className="text-xs text-slate-500 font-medium">Zweryfikowane oceny klientów</p>
                  </div>
                </div>
              </div>

              {/* Score section */}
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-6xl font-black text-slate-900 tracking-tight">
                    {googleRating.toFixed(1)}
                  </span>
                  <div className="flex flex-col items-start">
                    <div className="flex space-x-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < Math.floor(googleRating)
                              ? 'fill-amber-400 text-amber-400'
                              : i < googleRating
                              ? 'fill-amber-400/50 text-amber-400'
                              : 'fill-slate-200 text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      Średnia ocen ({googleReviewsCount} {getReviewsWord(googleReviewsCount)})
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Text */}
              {googleReview ? (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-6 text-sm text-slate-700 space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">Opinia z Google</span>
                    <span className="text-xs text-slate-400">{googleReview.publishTime}</span>
                  </div>
                  <p className="italic text-slate-600">"{googleReview.text}"</p>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-6 text-sm text-slate-600 space-y-3">
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span><strong>Zweryfikowane opinie</strong> bezpośrednio z Google Maps</span>
                  </div>
                </div>
              )}

              {/* Empty spacer or simple branding spacer */}
              <div className="h-2"></div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:left-[-24px] sm:translate-x-0 bg-white p-6 rounded-2xl shadow-xl flex items-center space-x-4 w-[calc(100%-2rem)] sm:w-auto">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Gwarancja</p>
                <p className="text-lg font-bold text-slate-900">Zadowolenia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
