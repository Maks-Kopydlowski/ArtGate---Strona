import React, { useState, useEffect } from 'react';
import { CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import type { GoogleReview } from '../types';
import { getReviewsWord } from '../utils/helpers';
import { API_BASE_URL } from '../utils/constants';

interface AboutProps {
  googleRating?: number;
  googleReviewsCount?: number;
  googleReview?: GoogleReview | null;
}

export default function About({
  googleRating: initialRating = 5.0,
  googleReviewsCount: initialCount = 32,
  googleReview: initialReview = {
    author: "Tomasz Nowak",
    publishTime: "3 dni temu",
    text: "Profesjonalne podejście do klienta, fachowe doradztwo i sprawny montaż automatyki do bramy. Zdecydowanie polecam tę firmę!"
  },
}: AboutProps) {
  const [googleRating, setGoogleRating] = useState<number>(initialRating);
  const [googleReviewsCount, setGoogleReviewsCount] = useState<number>(initialCount);
  const [googleReview, setGoogleReview] = useState<GoogleReview | null>(initialReview);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/reviews`);
        if (response.ok) {
          const data = await response.json();
          if (data && typeof data.rating === 'number') {
            setGoogleRating(data.rating);
          }
          if (data && typeof data.user_ratings_total === 'number') {
            setGoogleReviewsCount(data.user_ratings_total);
          }
          if (data && data.latest_review) {
            setGoogleReview(data.latest_review);
          }
        }
      } catch (err) {
        console.warn('Nie udało się pobrać opinii Google (użyto danych zapasowych):', err);
      }
    };
    fetchReviews();
  }, []);
  return (
    <section id="o-firmie" className="py-20 sm:py-28 bg-slate-50 overflow-hidden rounded-t-[2.5rem] sm:rounded-t-[3.5rem] relative -mt-10 z-20 shadow-floating">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-blue-100/70 text-blue-800 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>O firmie</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.15]">
              Piękno, funkcjonalność i <span className="text-blue-600">bezpieczeństwo</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mb-5 leading-relaxed">
              ArtGate specjalizuje się w produkcji oraz montażu bram, ogrodzeń, balustrad i konstrukcji stalowych. Oferujemy również profesjonalny montaż automatyki bramowej, monitoringu CCTV oraz systemów alarmowych.
            </p>
            <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed">
              Stawiamy na solidną realizację dopasowaną do potrzeb inwestora, szybki czas wykonania, sprawny montaż oraz pełny serwis w okresie gwarancyjnym.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10">
              {[
                "Kompleksowa obsługa",
                "Bezpłatna wycena",
                "Fachowy montaż",
                "Serwis gwarancyjny"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3 bg-white px-4 py-3 rounded-xl shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-slate-800 font-medium text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-8 pt-2">
              <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">15</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Lat<br/>Doświadczenia</span>
              </div>
              <div className="h-12 w-px bg-slate-200"></div>
              <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">100+</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Zadowolonych<br/>Klientów</span>
              </div>
            </div>
          </div>

          <div className="relative px-2 sm:px-0">
            <div className="relative bg-white rounded-3xl shadow-floating p-7 sm:p-9 flex flex-col justify-between min-h-[440px]">
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center space-x-3.5">
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
                    <h3 className="font-bold text-slate-900 text-lg tracking-tight">Profil w Google</h3>
                    <p className="text-xs text-slate-500 font-normal">Zweryfikowane opinie klientów</p>
                  </div>
                </div>
              </div>

              {/* Score section */}
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight">
                    {googleRating.toFixed(1)}
                  </span>
                  <div className="flex flex-col items-start">
                    <div className="flex space-x-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(googleRating)
                              ? 'fill-amber-400 text-amber-400'
                              : i < googleRating
                              ? 'fill-amber-400/50 text-amber-400'
                              : 'fill-slate-200 text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                      Średnia ocen ({googleReviewsCount} {getReviewsWord(googleReviewsCount)})
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Card */}
              {googleReview ? (
                <div className="bg-slate-50 rounded-2xl p-5 text-sm text-slate-700 space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-900">{googleReview.author}</span>
                    <span className="text-xs text-slate-400">{googleReview.publishTime}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-normal">"{googleReview.text}"</p>
                </div>
              ) : (
                <div className="bg-slate-50 rounded-2xl p-5 text-sm text-slate-600 space-y-3">
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span><strong>Zweryfikowane opinie</strong> bezpośrednio z profilu Google</span>
                  </div>
                </div>
              )}

              <div className="h-2"></div>
            </div>
            
            {/* Floating Guarantee badge with soft shadow */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:left-[-20px] sm:translate-x-0 bg-white p-5 rounded-2xl shadow-floating flex items-center space-x-3.5 w-[calc(100%-2rem)] sm:w-auto">
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Gwarancja</p>
                <p className="text-base font-bold text-slate-900">Zadowolenia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
