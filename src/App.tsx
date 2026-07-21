import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Video, Home, Phone, Mail, MapPin, Facebook, Menu, X, ChevronRight, CheckCircle2, Key, Star } from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [googleRating, setGoogleRating] = useState<number>(5.0);
  const [googleReviewsCount, setGoogleReviewsCount] = useState<number>(32);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Podmień poniższy URL na dokładny adres Twojego Cloudflare Workera
      const response = await fetch('https://artgate-backend.maks-kopydlowski.workers.dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        let errMsg = 'Wystąpił problem przy przetwarzaniu wiadomości.';
        try {
          const errLog = await response.json();
          console.error('Błąd serwera:', errLog);
          if (errLog && errLog.message) {
            errMsg = errLog.message;
          }
        } catch (_) {}
        setSubmitError(errMsg);
        alert('Wystąpił problem przy przetwarzaniu wiadomości. Spróbuj ponownie później.');
      }
    } catch (error) {
      console.error('Błąd sieciowy:', error);
      setSubmitError('Brak połączenia z serwerem obsługującym formularz.');
      alert('Brak połączenia z serwerem obsługującym formularz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://artgate-backend.maks-kopydlowski.workers.dev/api/reviews');
        if (response.ok) {
          const data = await response.json();
          if (data && typeof data.rating === 'number') {
            setGoogleRating(data.rating);
          }
          if (data && typeof data.user_ratings_total === 'number') {
            setGoogleReviewsCount(data.user_ratings_total);
          }
        }
      } catch (err) {
        console.error('Błąd podczas pobierania opinii Google:', err);
      }
    };
    fetchReviews();
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          mobileMenuOpen ? 'bg-white py-3 border-b border-slate-100' : isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center cursor-pointer" onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <ShieldCheck className={`h-8 w-8 ${mobileMenuOpen || isScrolled ? 'text-blue-600' : 'text-white'}`} />
              <span className={`ml-2 text-2xl font-bold tracking-tight ${mobileMenuOpen || isScrolled ? 'text-slate-900' : 'text-white'}`}>
                ArtGate
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['O firmie', 'Oferta', 'Projekty', 'Kontakt'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                    isScrolled ? 'text-slate-600' : 'text-slate-200'
                  }`}
                >
                  {item}
                </button>
              ))}
              <a
                href="tel:+48532420269"
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isScrolled
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                <Phone className="w-4 h-4 mr-2" />
                532 420 269
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`${mobileMenuOpen || isScrolled ? 'text-slate-900' : 'text-white'} transition-colors duration-200`}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col"
          >
            <div className="flex flex-col space-y-6 text-xl font-medium">
              {['O firmie', 'Oferta', 'Projekty', 'Kontakt'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-left text-slate-800 border-b border-slate-100 pb-4"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-auto mb-12 flex flex-col space-y-4">
              <a
                href="tel:+48532420269"
                className="flex items-center justify-center w-full bg-blue-600 text-white py-4 rounded-xl font-semibold"
              >
                <Phone className="w-5 h-5 mr-2" />
                Zadzwoń: 532 420 269
              </a>
              <div className="flex justify-center space-x-6 pt-6">
                <a href="https://www.facebook.com/artgate.lipno/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600">
                  <Facebook className="h-8 w-8" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0 bg-slate-950">
          <img
            src="https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=75&w=1400&auto=format&fit=crop"
            alt="Nowoczesny dom z bramą"
            className="w-full h-full object-cover opacity-40 bg-slate-950"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Bezpieczniejszy dom <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                zaczyna się tutaj
              </span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light mb-10">
              Ogrodzenia, alarmy, monitoring i automatyka do bram. Kompleksowe rozwiązania dla Twojego spokoju.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={() => scrollToSection('oferta')}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center"
              >
                Zobacz ofertę
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('kontakt')}
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-full font-semibold text-lg transition-all flex items-center justify-center"
              >
                Darmowa wycena
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="o-firmie" className="py-16 sm:py-24 bg-slate-50 overflow-hidden rounded-t-[3rem] relative -mt-10 z-20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative px-2 sm:px-0"
            >
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
                      <h4 className="font-extrabold text-slate-900 text-lg tracking-tight">Firma w Google</h4>
                      <p className="text-xs text-slate-500 font-medium">Zweryfikowane oceny klientów</p>
                    </div>
                  </div>
                </div>

                {/* Score section */}
                <div className="py-8 text-center sm:text-left flex flex-col sm:flex-row items-center sm:space-x-8">
                  <div className="flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-6 border border-slate-100 min-w-[140px] shadow-sm mb-6 sm:mb-0">
                    <span className="text-6xl font-black text-slate-900 tracking-tight">
                      {googleRating.toFixed(1)}
                    </span>
                    <div className="flex space-x-1 my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(googleRating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-slate-200 text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Średnia ocen</span>
                    <span className="text-[10px] text-slate-400 font-semibold mt-1">({googleReviewsCount} opinii)</span>
                  </div>

                  <div className="flex-grow space-y-3 w-full max-w-xs">
                    {/* Progress bars to look authentic */}
                    <div className="flex items-center text-sm">
                      <span className="w-3 text-slate-600 font-bold">5</span>
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mx-1.5" />
                      <div className="flex-grow bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full transition-all duration-500"
                          style={{ width: googleRating === 5 ? '100%' : `${Math.round((googleRating - 4) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="w-10 text-right text-xs text-slate-500 font-semibold">
                        {googleRating === 5 ? '100%' : `${Math.round((googleRating - 4) * 100)}%`}
                      </span>
                    </div>
                    <div className={`flex items-center text-sm ${googleRating === 5 ? 'opacity-40' : ''}`}>
                      <span className="w-3 text-slate-600 font-bold">4</span>
                      <Star className={`w-3.5 h-3.5 mx-1.5 ${googleRating === 5 ? 'fill-slate-300 text-slate-300' : 'fill-amber-400 text-amber-400'}`} />
                      <div className="flex-grow bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full transition-all duration-500"
                          style={{ width: googleRating === 5 ? '0%' : `${100 - Math.round((googleRating - 4) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="w-10 text-right text-xs text-slate-500 font-semibold">
                        {googleRating === 5 ? '0%' : `${100 - Math.round((googleRating - 4) * 100)}%`}
                      </span>
                    </div>
                    <div className="flex items-center text-sm opacity-40">
                      <span className="w-3 text-slate-600 font-bold">3</span>
                      <Star className="w-3.5 h-3.5 fill-slate-300 text-slate-300 mx-1.5" />
                      <div className="flex-grow bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full w-0 rounded-full"></div>
                      </div>
                      <span className="w-10 text-right text-xs text-slate-500 font-semibold">0%</span>
                    </div>
                  </div>
                </div>

                {/* Info Text */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-6 text-sm text-slate-600 space-y-3">
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>
                      <strong>
                        {googleRating === 5 ? '100%' : `${Math.round((googleRating / 5) * 100)}%`} pozytywnych opinii
                      </strong>{' '}
                      na profilu Google ({googleReviewsCount} opinii)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Nasi klienci najbardziej cenią <strong>profesjonalizm i terminowość</strong></span>
                  </div>
                </div>

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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="oferta" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Nasza Oferta</h2>
            <p className="text-xl text-slate-600">
              Zapewniamy kompleksową obsługę – od doradztwa, przez montaż, aż po serwis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Automatyka do bram",
                desc: "Sprzedaż i instalacja niezawodnych, nowoczesnych napędów do bram przesuwnych i skrzydłowych.",
                img: "https://images.unsplash.com/photo-1719388133657-5d83621987fc?q=75&w=600&auto=format&fit=crop",
                position: "object-[center_80%]"
              },
              {
                title: "Monitoring CCTV",
                desc: "Nowoczesne systemy kamer wysokiej rozdzielczości pozwalające na zdalny podgląd z każdego miejsca na świecie.",
                img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=75&w=600&auto=format&fit=crop"
              },
              {
                title: "Systemy alarmowe",
                desc: "Zabezpiecz swój dom lub firmę przed włamaniem dzięki certyfikowanym, inteligentnym centralom alarmowym.",
                img: "https://images.unsplash.com/photo-1552775838-b0c8d3b881fb?q=75&w=600auto=format&fit=crop"
              },
              {
                title: "Bramy i ogrodzenia",
                desc: "Projektowanie, produkcja i precyzyjny montaż solidnych bram wjazdowych oraz estetycznych ogrodzeń stalowych.",
                img: "https://images.unsplash.com/photo-1634841999653-dad28648a43a?q=75&w=600&auto=format&fit=crop"
              },
              {
                title: "Balustrady",
                desc: "Wykonujemy bezpieczne, odporne na warunki atmosferyczne i stylowe balustrady balkonowe oraz schodowe.",
                img: "https://images.unsplash.com/photo-1610313141579-e36bfb17177e?q=75&w=600&auto=format&fit=crop",
                position: "object-[center_30%]"
              },
              {
                title: "Domofony i wideodomofony",
                desc: "Bezpieczna kontrola dostępu do posesji za pomocą nowoczesnych paneli z kamerą i łącznością ze smartfonem.",
                img: "https://images.unsplash.com/photo-1528817466667-942353411fee?q=75&w=600&auto=format&fit=crop"
              }
            ].map((service, idx) => (
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

      {/* CTA / Projects Section */}
      <section id="projekty" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-slate-900 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Zobacz nasze realizacje</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Regularnie publikujemy zdjęcia z naszych najnowszych montaży. Odwiedź nasz profil na Facebooku, aby zobaczyć, jak pracujemy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="https://www.facebook.com/artgate.lipno/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-8 py-4 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white rounded-full font-semibold transition-colors"
            >
              <Facebook className="w-5 h-5 mr-3" />
              Nasz Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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
                      href="https://maps.google.com/?q=ul.+Spółdzielcza+14,+64-111+Lipno" 
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
              <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200/80 shadow-lg h-80 relative group bg-slate-100">
                <iframe
                  title="Mapa dojazdu ArtGate Lipno"
                  src="https://maps.google.com/maps?q=ul.%20Sp%C3%B3%C5%82dzielcza%2014,%2064-111%20Lipno&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter grayscale-[10%] contrast-[110%] group-hover:grayscale-0 transition-all duration-500"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-5 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 min-h-[500px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.div
                    key="contact-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Napisz wiadomość</h3>
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                      {submitError && (
                        <div className="p-4 text-sm text-red-800 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2">
                          <span className="font-semibold">Błąd:</span> {submitError}
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Imię i nazwisko *</label>
                          <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                            placeholder="Jan Kowalski"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Telefon</label>
                          <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                            placeholder="+48 000 000 000"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                          placeholder="jan@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Wiadomość *</label>
                        <textarea
                          id="message"
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none bg-slate-50 focus:bg-white"
                          placeholder="W czym możemy pomóc?"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Wysyłanie...
                          </>
                        ) : "Wyślij wiadomość"}
                      </button>
                      <p className="text-xs text-slate-500 text-center mt-4">
                        * Pola oznaczone gwiazdką są wymagane. Wysyłając formularz akceptujesz naszą politykę prywatności.
                      </p>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-3">Wiadomość wysłana!</h3>
                    <p className="text-slate-600 max-w-sm mx-auto mb-8">
                      Dziękujemy za kontakt. Odpowiemy na Twoją wiadomość najszybciej jak to możliwe!
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-colors"
                    >
                      Napisz kolejną wiadomość
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <ShieldCheck className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-2xl font-bold text-white">ArtGate</span>
              </div>
              <p className="max-w-md text-sm leading-relaxed mb-6">
                Profesjonalne systemy bezpieczeństwa, automatyka do bram, ogrodzenia i monitoring. Dbamy o bezpieczeństwo Twojego domu i firmy.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/artgate.lipno/" className="text-slate-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Szybkie linki</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('o-firmie')} className="hover:text-blue-400 transition-colors">O firmie</button></li>
                <li><button onClick={() => scrollToSection('oferta')} className="hover:text-blue-400 transition-colors">Oferta</button></li>
                <li><button onClick={() => scrollToSection('projekty')} className="hover:text-blue-400 transition-colors">Projekty</button></li>
                <li><button onClick={() => scrollToSection('kontakt')} className="hover:text-blue-400 transition-colors">Kontakt</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-2 text-sm">
                <li>Lipno, Wielkopolska</li>
                <li>ul. Spółdzielcza 14</li>
                <li><a href="tel:+48532420269" className="hover:text-blue-400 transition-colors">+48 532 420 269</a></li>
                <li><a href="mailto:biuroartgate@gmail.com" className="hover:text-blue-400 transition-colors">biuroartgate@gmail.com</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} ArtGate. Wszystkie prawa zastrzeżone.</p>
            <p className="mt-2 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Polityka prywatności</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
