import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Camera, Lock, Fence, Shield, PhoneCall, ChevronRight, X, CheckCircle2 } from 'lucide-react';

interface OfferProps {
  onSelectService?: (serviceTitle: string) => void;
  scrollToSection?: (id: string) => void;
}

export default function Offer({ onSelectService, scrollToSection }: OfferProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Wszystkie');
  const [activeModalService, setActiveModalService] = useState<any | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalService) {
        setActiveModalService(null);
      }
    };
    if (activeModalService) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeModalService]);

  const services = [
    {
      id: 'automatyka',
      category: 'Automatyka',
      title: "Automatyka do bram",
      shortDesc: "Sprzedaż i montaż niezawodnych napędów do bram przesuwnych, skrzydłowych i garażowych.",
      fullDesc: "Zapewniamy profesjonalny dobór mocowych i niezawodnych napędów renomowanych marek (np. Somfy, BFT, Came, Nice, Faac). Oferujemy kompletne zestawy z fotokomórkami, bezprzewodowymi pilotami, lampą sygnalizacyjną oraz możliwością otwierania ze smartfona.",
      features: ["Otwieranie smartfonem / Wi-Fi", "Czujniki przeciążeniowe i fotokomórki", "Cicha i bezawaryjna praca", "Funkcja furtki (częściowe uchylenie)"],
      img: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=800&q=80",
      icon: Cpu,
    },
    {
      id: 'monitoring',
      category: 'Security',
      title: "Monitoring CCTV 4K",
      shortDesc: "Kamery o wysokiej rozdzielczości z trybem nocnym i zdalnym podglądem na żywo.",
      fullDesc: "Projektujemy i montujemy profesjonalne systemy telewizji przemysłowej dla domów prywatnych, firm oraz gospodarstw. Wykorzystujemy kamery IP o rozdzielczości od 4K do 8MP z detekcją osób i pojazdów AI oraz kolorowym obrazem w nocy (ColorVu / FullColor).",
      features: ["Aplikacja mobilna z powiadomieniami PUSH", "Detekcja sylwetki człowieka i aut AI", "Podgląd nocy w pełnym kolorze", "Rejestrator z dyskiem o długiej pamięci"],
      img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
      icon: Camera,
    },
    {
      id: 'alarmy',
      category: 'Security',
      title: "Inteligentne Systemy Alarmowe",
      shortDesc: "Zabezpieczenie przed włamaniem, pożarem i zalaniem z certyfikowaną centralą.",
      fullDesc: "Kompleksowa instalacja systemów alarmowych (np. Satel Perfecta / Versa / Integra). System chroni obwód budynku, reaguje na wybitą szybę, ruch w pomieszczeniu oraz dym czy zalanie wody.",
      features: ["Powiadamianie SMS / App / Agencja Ochrony", "Bezprzewodowa lub przewodowa instalacja", "Podział na strefy (np. nocna/dzienna)", "Klawiatura dotykowa lub z kodem"],
      img: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80",
      icon: Lock,
    },
    {
      id: 'ogrodzenia',
      category: 'Ogrodzenia',
      title: "Bramy i Ogrodzenia Stalowe",
      shortDesc: "Projekt, produkcja oraz precyzyjny montaż solidnych ogrodzeń palisadowych i paneli.",
      fullDesc: "Wykonujemy bramy przesuwne ze zintegrowaną wózkową szyną, bramy skrzydłowe oraz przęsła palisadowe i panelowe. Wszystkie elementy są cynkowane ogniowo i malowane proszkowo na dowolny kolor wg palety RAL.",
      features: ["Cynkowanie ogniowe i malowanie proszkowe", "Dowolny wymiar i wzór palisady", "Komplet z furtką i słupkiem multimedialnym", "Odporność na korozję przez dziesiątki lat"],
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      icon: Fence,
    },
    {
      id: 'balustrady',
      category: 'Ogrodzenia',
      title: "Balustrady i Konstrukcje",
      shortDesc: "Nowoczesne balustrady balkonowe, tarasowe oraz schodowe ze stali i szkła.",
      fullDesc: "Wykonujemy trwałe balustrady do budynków mieszkalnych i komercyjnych. Zapewniamy najwyższą jakość spawów, bezpieczeństwo użytkowania zgodne z normami i dopracowane wykończenie techniczne.",
      features: ["Stal nierdzewna / malowana proszkowo", "Wypełnienie szklane lub trzustkowe", "Niewidoczne mocowania", "Bezpłatny pomiar u klienta"],
      img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      icon: Shield,
    },
    {
      id: 'wideodomofony',
      category: 'Security',
      title: "Wideodomofony i Kontrola Dostępów",
      shortDesc: "Kontrola wejścia na posesję z panelem dotykowym i otwieraniem z dowolnego miejsca.",
      fullDesc: "Nowoczesne wideodomofony cyfrowe IP / 2-przewodowe pozwalające odebrać połączenie z furtki na ekranie w domu lub na ekranie smartfona, kiedy jesteś poza domem.",
      features: ["Odbieranie wywołań na smartfonie", "Kamera szerokokątna z podświetleniem IR", "Otwieranie kodem, kartą RFID lub telefonem", "Integracja z automatyką bramy"],
      img: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80",
      icon: PhoneCall,
    }
  ];

  const categories = ['Wszystkie', 'Automatyka', 'Security', 'Ogrodzenia'];

  const filteredServices = selectedCategory === 'Wszystkie'
    ? services
    : services.filter(s => s.category === selectedCategory);

  return (
    <section id="oferta" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-100">
            <span>Kompleksowe Rozwiązania</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Co możemy dla Ciebie zrobić?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Zapewniamy indywidualne doradztwo, dystrybucję renomowanego sprzętu, precyzyjny montaż oraz pełny serwis gwarancyjny w Lipnie i okolicach.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group rounded-3xl overflow-hidden bg-slate-50/80 border border-slate-200/80 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 overflow-hidden bg-slate-200 relative">
                    <img
                      src={service.img}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 bg-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white text-xs font-semibold">
                      <Icon className="w-4 h-4 text-blue-400" />
                      <span>{service.category}</span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 2).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center text-xs font-medium text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 sm:px-8 sm:pb-8">
                  <button
                    type="button"
                    onClick={() => setActiveModalService(service)}
                    className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer group/btn shadow-sm"
                  >
                    <span>Poznaj szczegóły</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {activeModalService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
            onClick={() => setActiveModalService(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-service-title"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden">
                <img
                  src={activeModalService.img}
                  alt={activeModalService.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <button
                  type="button"
                  onClick={() => setActiveModalService(null)}
                  className="absolute top-4 right-4 p-3 bg-slate-900/80 text-white rounded-full hover:bg-slate-900 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400"
                  aria-label="Zamknij okno szczegółów"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-500/30">
                    {activeModalService.category}
                  </span>
                  <h3 id="modal-service-title" className="text-2xl font-bold text-white mt-2">{activeModalService.title}</h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p className="text-slate-800 font-medium">
                  {activeModalService.fullDesc}
                </p>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-3">
                    Kluczowe zalety i cechy techniczne:
                  </h4>
                  <ul className="grid grid-cols-1 gap-2.5">
                    {activeModalService.features.map((feat: string, idx: number) => (
                      <li key={idx} className="flex items-start text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 mr-2.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const serviceName = activeModalService.title;
                      setActiveModalService(null);
                      if (onSelectService) onSelectService(serviceName);
                      if (scrollToSection) scrollToSection('kontakt');
                    }}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20 text-center cursor-pointer"
                  >
                    Zapytaj o tę usługę w formularzu
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

