import React from 'react';

interface ServiceItem {
  title: string;
  desc: string;
  img: string;
  position?: string;
}

const SERVICES: ServiceItem[] = [
  {
    title: "Automatyka do bram",
    desc: "Sprzedaż i instalacja niezawodnych, nowoczesnych napędów do bram przesuwnych i skrzydłowych.",
    img: "/img/automatyka.webp",
    position: "object-[center_80%]"
  },
  {
    title: "Monitoring CCTV",
    desc: "Nowoczesne systemy kamer wysokiej rozdzielczości pozwalające na zdalny podgląd z każdego miejsca na świecie.",
    img: "/img/monitoring.webp"
  },
  {
    title: "Systemy alarmowe",
    desc: "Zabezpiecz swój dom lub firmę przed włamaniem dzięki certyfikowanym, inteligentnym centralom alarmowym.",
    img: "/img/alarmy.webp"
  },
  {
    title: "Bramy i ogrodzenia",
    desc: "Projektowanie, produkcja i precyzyjny montaż solidnych bram wjazdowych oraz estetycznych ogrodzeń stalowych.",
    img: "/img/ogrodzenia.webp"
  },
  {
    title: "Balustrady",
    desc: "Wykonujemy bezpieczne, odporne na warunki atmosferyczne i stylowe balustrady balkonowe oraz schodowe.",
    img: "/img/balustrady.webp",
    position: "object-[center_30%]"
  },
  {
    title: "Domofony i wideodomofony",
    desc: "Bezpieczna kontrola dostępu do posesji za pomocą nowoczesnych paneli z kamerą i łącznością ze smartfonem.",
    img: "/img/domofony.webp"
  }
];

export default function Offer() {
  return (
    <section id="oferta" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-600 mb-6">
            Nasza oferta
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-[-0.02em]">Rozwiązania dopasowane do Twoich potrzeb</h2>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
            Zapewniamy kompleksową obsługę – od doradztwa, przez montaż, aż po serwis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <div
              key={idx}
              className="group rounded-[1.75rem] overflow-hidden bg-white border border-slate-200/80 ring-1 ring-slate-100 hover:shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden bg-slate-200 relative">
                <img
                  src={service.img}
                  alt={service.title}
                  loading="lazy"
                  className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 bg-slate-200 ${
                    service.position || "object-center"
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent" />
              </div>
              <div className="p-6 sm:p-8">
                <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700 mb-4">
                  Usługa
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-[-0.01em]">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
