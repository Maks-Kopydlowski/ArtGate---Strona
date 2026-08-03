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
    <section id="oferta" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Nasza Oferta</h2>
          <p className="text-base sm:text-lg text-slate-500 font-normal">
            Zapewniamy kompleksową obsługę – od doradztwa technicznego, przez montaż, aż po niezawodny serwis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <div
              key={idx}
              className="group rounded-3xl overflow-hidden bg-slate-50 shadow-card hover:shadow-floating hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="h-52 overflow-hidden bg-slate-100 relative">
                <img
                  src={service.img}
                  alt={service.title}
                  loading="lazy"
                  className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ${
                    service.position || "object-center"
                  }`}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-7 sm:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
