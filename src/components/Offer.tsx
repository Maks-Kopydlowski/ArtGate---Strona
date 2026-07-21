import React from 'react';
import { motion } from 'motion/react';
import img2 from '../../img/2.webp';
import img3 from '../../img/3.webp';
import img4 from '../../img/4.webp';
import img5 from '../../img/5.webp';
import img6 from '../../img/6.webp';
import img7 from '../../img/7.webp';

export default function Offer() {
  const services = [
    {
      title: "Automatyka do bram",
      desc: "Sprzedaż i instalacja niezawodnych, nowoczesnych napędów do bram przesuwnych i skrzydłowych.",
      img: img2,
      position: "object-[center_80%]"
    },
    {
      title: "Monitoring CCTV",
      desc: "Nowoczesne systemy kamer wysokiej rozdzielczości pozwalające na zdalny podgląd z każdego miejsca na świecie.",
      img: img3
    },
    {
      title: "Systemy alarmowe",
      desc: "Zabezpiecz swój dom lub firmę przed włamaniem dzięki certyfikowanym, inteligentnym centralom alarmowym.",
      img: img4
    },
    {
      title: "Bramy i ogrodzenia",
      desc: "Projektowanie, produkcja i precyzyjny montaż solidnych bram wjazdowych oraz estetycznych ogrodzeń stalowych.",
      img: img5
    },
    {
      title: "Balustrady",
      desc: "Wykonujemy bezpieczne, odporne na warunki atmosferyczne i stylowe balustrady balkonowe oraz schodowe.",
      img: img6,
      position: "object-[center_30%]"
    },
    {
      title: "Domofony i wideodomofony",
      desc: "Bezpieczna kontrola dostępu do posesji za pomocą nowoczesnych paneli z kamerą i łącznością ze smartfonem.",
      img: img7
    }
  ];

  return (
    <section id="oferta" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Nasza Oferta</h2>
          <p className="text-xl text-slate-600">
            Zapewniamy kompleksową obsługę – od doradztwa, przez montaż, aż po serwis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300"
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
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
