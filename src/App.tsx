import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck, Video, Home, Phone, Mail, MapPin,
  Facebook, Instagram, Menu, X, ChevronRight, CheckCircle2, Key,
  AlertCircle
} from 'lucide-react';

// ─── Worker URL ───────────────────────────────────────────────────────────────
const WORKER_URL = 'https://artgate-backend.maks-kopydlowski.workers.dev';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  website: string; // honeypot — ukryte przed uzytkownikami, widoczne dla botow
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Imie i nazwisko jest wymagane.';
  else if (data.name.trim().length > 100) errors.name = 'Maksymalnie 100 znakow.';
  if (!data.email.trim()) errors.email = 'Adres email jest wymagany.';
  else if (!validateEmail(data.email)) errors.email = 'Podaj prawidlowy adres email.';
  if (!data.message.trim()) errors.message = 'Wiadomosc jest wymagana.';
  else if (data.message.trim().length > 5000) errors.message = 'Maksymalnie 5000 znakow.';
  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<FormData>({
    name: '', phone: '', email: '', message: '',
    website: '',
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const scrollToSection = useCallback((id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  }, []);

  const handleBlur = (field: keyof FormErrors) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errors = validateForm(formData);
    setFormErrors(prev => ({ ...prev, [field]: errors[field] }));
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newData = { ...formData, [field]: value };
      const errors = validateForm(newData);
      setFormErrors(prev => ({ ...prev, [field]: errors[field as keyof FormErrors] }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json() as { success?: boolean; error?: string };

      if (response.ok && data.success) {
        setFormSubmitted(true);
        setFormData({ name: '', phone: '', email: '', message: '', website: '' });
        setTouched({});
        setFormErrors({});
      } else {
        setSubmitError(data.error || 'Wystapil problem przy przetwarzaniu wiadomosci. Sprobuj ponownie pozniej.');
      }
    } catch {
      setSubmitError('Brak polaczenia z serwerem. Sprobuj ponownie lub zadzwon bezposrednio: +48 532 420 269.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 overflow-x-hidden">

      {/* NAVIGATION */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          mobileMenuOpen
            ? 'bg-white py-3 border-b border-slate-100'
            : isScrolled
              ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
              : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
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
                aria-label={mobileMenuOpen ? 'Zamknij menu' : 'Otworz menu'}
                aria-expanded={mobileMenuOpen}
                className={`${mobileMenuOpen || isScrolled ? 'text-slate-900' : 'text-white'} transition-colors duration-200`}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
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
                  className="text-left text-slate-800 border-b border-slate-100 pb-4 hover:text-blue-600 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-auto mb-12 flex flex-col space-y-4">
              <a
                href="tel:+48532420269"
                className="flex items-center justify-center w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Zadzwon: 532 420 269
              </a>
              <div className="flex justify-center space-x-6 pt-6">
                <a href="https://www.facebook.com/artgate.lipno/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
                  <Facebook className="h-8 w-8" />
                </a>
                <a href="https://www.instagram.com/artgate.com.pl/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-600 transition-colors">
                  <Instagram className="h-8 w-8" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0 bg-slate-950">
          <img
            src="https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=75&w=1400&auto=format&fit=crop"
            alt="Nowoczesny dom z brama"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            width={1400}
            height={934}
            className="w-full h-full object-cover opacity-40 bg-slate-950"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Bezpieczniejszy dom <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                zaczyna sie tutaj
              </span>
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light mb-10">
              Ogrodzenia, alarmy, monitoring i automatyka do bram. Kompleksowe rozwiazania dla Twojego spokoju.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={() => scrollToSection('oferta')}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-full font-semibold text-lg transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 flex items-center justify-center"
              >
                Zobacz oferte
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

      {/* FEATURES GRID */}
      <section className="py-12 bg-white relative -mt-10 z-20 rounded-t-[3rem] shadow-xl mx-4 sm:mx-8 lg:mx-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Key className="w-8 h-8 text-blue-600" />, title: 'Automatyka do bram', desc: 'Wygoda, ktora otwiera sie przed Toba.' },
              { icon: <Video className="w-8 h-8 text-blue-600" />, title: 'Monitoring i alarmy', desc: 'Bezpieczenstwo, na ktore Cie stac.' },
              { icon: <Home className="w-8 h-8 text-blue-600" />, title: 'Bramy i ogrodzenia', desc: 'Twoja prywatnosc w najlepszej oprawie.' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors group cursor-default"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-6 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="o-firmie" className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                <span>O firmie</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Piekno, funkcjonalnosc i <span className="text-blue-600">bezpieczenstwo</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                ArtGate specjalizuje sie w produkcji oraz montazu bram, ogrodzen, balustrad i konstrukcji stalowych. Dodatkowo oferujemy sprzedaz i instalacje automatyki bramowej, monitoringu CCTV oraz systemow alarmowych.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Stawiamy na profesjonalna realizacje zgodnie z preferencjami klientow, szybki czas realizacji, fachowy montaz oraz bezplatny serwis w okresie gwarancji.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {['Kompleksowa obsluga', 'Bezplatna wycena', 'Fachowy montaz', 'Serwis gwarancyjny'].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex flex-col">
                  <span className="text-5xl font-extrabold text-slate-900">15</span>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">Lat<br />Doswiadczenia</span>
                </div>
                <div className="h-16 w-px bg-slate-200" />
                <div className="flex flex-col">
                  <span className="text-5xl font-extrabold text-slate-900">100+</span>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">Zadowolonych<br />Klientow</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative px-2 sm:px-0"
            >
              <div className="absolute inset-0 bg-blue-600 rounded-3xl transform translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4 opacity-10" />
              <img
                src="https://images.unsplash.com/photo-1582999589282-65b5766888a0?q=75&w=800&auto=format&fit=crop"
                alt="Montaz ogrodzenia"
                loading="lazy"
                decoding="async"
                width={800}
                height={1067}
                className="relative rounded-3xl shadow-2xl object-cover h-[600px] w-full bg-slate-200"
              />
              <div className="absolute -bottom-6 left-4 md:-left-6 bg-white p-6 rounded-2xl shadow-xl flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Gwarancja</p>
                  <p className="text-lg font-bold text-slate-900">Najwyzszej jakosci</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="oferta" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Nasza Oferta</h2>
            <p className="text-xl text-slate-600">
              Zapewniamy kompleksowa obsluge od doradztwa, przez montaz, az po serwis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Automatyka do bram', desc: 'Sprzedaz i instalacja niezawodnych, nowoczesnych napedow do bram przesuwnych i skrzydlowych.', img: 'https://images.unsplash.com/photo-1719388133657-5d83621987fc?q=75&w=600&auto=format&fit=crop', position: 'object-[center_80%]' },
              { title: 'Monitoring CCTV', desc: 'Nowoczesne systemy kamer wysokiej rozdzielczosci pozwalajace na zdalny podglad z kazdego miejsca na swiecie.', img: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=75&w=600&auto=format&fit=crop' },
              { title: 'Systemy alarmowe', desc: 'Zabezpiecz swoj dom lub firme przed wlamaniem dzieki certyfikowanym, inteligentnym centralom alarmowym.', img: 'https://images.unsplash.com/photo-1552775838-b0c8d3b881fb?q=75&w=600&auto=format&fit=crop' },
              { title: 'Bramy i ogrodzenia', desc: 'Projektowanie, produkcja i precyzyjny montaz solidnych bram wjazdowych oraz estetycznych ogrodzen stalowych.', img: 'https://images.unsplash.com/photo-1634841999653-dad28648a43a?q=75&w=600&auto=format&fit=crop' },
              { title: 'Balustrady', desc: 'Wykonujemy bezpieczne, odporne na warunki atmosferyczne i stylowe balustrady balkonowe oraz schodowe.', img: 'https://images.unsplash.com/photo-1610313141579-e36bfb17177e?q=75&w=600&auto=format&fit=crop', position: 'object-[center_30%]' },
              { title: 'Domofony i wideodomofony', desc: 'Bezpieczna kontrola dostepu do posesji za pomoca nowoczesnych paneli z kamera i lacznoscia ze smartfonem.', img: 'https://images.unsplash.com/photo-1528817466667-942353411fee?q=75&w=600&auto=format&fit=crop' },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden bg-slate-200 relative">
                  <img
                    src={service.img}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={400}
                    className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 bg-slate-200 ${service.position || 'object-center'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS / CTA */}
      <section id="projekty" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-slate-900 to-slate-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Zobacz nasze realizacje</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              Regularnie publikujemy zdjecia z naszych najnowszych montazy. Odwiedz nasze profile w mediach spolecznosciowych, aby zobaczyc, jak pracujemy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="https://www.facebook.com/artgate.lipno/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center px-8 py-4 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white rounded-full font-semibold transition-all hover:scale-[1.03] w-full sm:w-auto justify-center"
              >
                <Facebook className="w-5 h-5 mr-3" />
                Nasz Facebook
              </a>
              <a
                href="https://www.instagram.com/artgate.com.pl/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center px-8 py-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] hover:opacity-90 text-white rounded-full font-semibold transition-all hover:scale-[1.03] w-full sm:w-auto justify-center"
              >
                <Instagram className="w-5 h-5 mr-3" />
                Nasz Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontakt" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left: info + map */}
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Skontaktuj sie z nami</h2>
              <p className="text-lg text-slate-600 mb-10">
                Masz pytania? Chcesz umowic sie na darmowa wycene? Zadzwon lub napisz do nas. Jestesmy do Twojej dyspozycji.
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
                      ul. Spoldzielcza 14<br />
                      64-111 Lipno, Wielkopolska
                    </p>
                    <a
                      href="https://maps.google.com/?q=ul.+Spoldzielcza+14,+64-111+Lipno"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 mt-2 group"
                    >
                      Otworz w Mapach Google
                      <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200/80 shadow-lg h-80 relative group bg-slate-100">
                <iframe
                  title="Mapa dojazdu ArtGate Lipno"
                  src="https://maps.google.com/maps?q=ul.%20Sp%C3%B3%C5%82dzielcza%2014,%2064-111%20Lipno&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter grayscale-[10%] contrast-[110%] group-hover:grayscale-0 transition-all duration-500"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 min-h-[500px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.div
                    key="contact-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Napisz wiadomosc</h3>
                    <p className="text-slate-500 text-sm mb-6">Odpiszemy w ciagu 24 godzin.</p>

                    {/* Error banner */}
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-5 p-4 text-sm text-red-800 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3"
                        role="alert"
                        aria-live="polite"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                        <div>
                          <span className="font-semibold block">Blad wysylki</span>
                          {submitError}
                        </div>
                      </motion.div>
                    )}

                    <form className="space-y-6" onSubmit={handleFormSubmit} noValidate>

                      {/* Honeypot — ukryte dla ludzi, pulapka dla botow */}
                      <div className="absolute opacity-0 h-0 overflow-hidden pointer-events-none" aria-hidden="true" tabIndex={-1}>
                        <label htmlFor="website">Leave this empty</label>
                        <input
                          type="text"
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={e => handleChange('website', e.target.value)}
                          autoComplete="off"
                          tabIndex={-1}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                            Imie i nazwisko <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            autoComplete="name"
                            value={formData.name}
                            onChange={e => handleChange('name', e.target.value)}
                            onBlur={() => handleBlur('name')}
                            aria-invalid={!!formErrors.name}
                            aria-describedby={formErrors.name ? 'name-error' : undefined}
                            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-slate-50 focus:bg-white placeholder:text-slate-400 ${
                              formErrors.name
                                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                                : 'border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                            }`}
                            placeholder="Jan Kowalski"
                          />
                          {formErrors.name && (
                            <p id="name-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {formErrors.name}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Telefon</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={e => handleChange('phone', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-slate-50 focus:bg-white placeholder:text-slate-400"
                            placeholder="+48 000 000 000"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          autoComplete="email"
                          value={formData.email}
                          onChange={e => handleChange('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                          aria-invalid={!!formErrors.email}
                          aria-describedby={formErrors.email ? 'email-error' : undefined}
                          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-slate-50 focus:bg-white placeholder:text-slate-400 ${
                            formErrors.email
                              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                              : 'border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                          }`}
                          placeholder="jan@example.com"
                        />
                        {formErrors.email && (
                          <p id="email-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                          Wiadomosc <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          required
                          value={formData.message}
                          onChange={e => handleChange('message', e.target.value)}
                          onBlur={() => handleBlur('message')}
                          aria-invalid={!!formErrors.message}
                          aria-describedby={formErrors.message ? 'message-error' : undefined}
                          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none bg-slate-50 focus:bg-white placeholder:text-slate-400 ${
                            formErrors.message
                              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                              : 'border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                          }`}
                          placeholder="W czym mozemy pomoc?"
                        />
                        {formErrors.message ? (
                          <p id="message-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {formErrors.message}
                          </p>
                        ) : formData.message.length > 0 && (
                          <p className="mt-1 text-xs text-slate-400 text-right">{formData.message.length}/5000</p>
                        )}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Wysylanie...
                          </>
                        ) : 'Wyslij wiadomosc'}
                      </button>

                      <p className="text-xs text-slate-500 text-center mt-4">
                        * Pola oznaczone gwiazdka sa wymagane. Wysylajac formularz akceptujesz nasza politykę prywatnosci.
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
                    aria-live="polite"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
                      className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-3">Wiadomosc wyslana!</h3>
                    <p className="text-slate-600 max-w-sm mx-auto mb-8">
                      Dziekujemy za kontakt. Odpiszemy na Twoja wiadomosc najszybciej jak to mozliwe!
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-all hover:scale-[1.02]"
                    >
                      Napisz kolejna wiadomosc
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <ShieldCheck className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-2xl font-bold text-white">ArtGate</span>
              </div>
              <p className="max-w-md text-sm leading-relaxed mb-6">
                Profesjonalne systemy bezpieczenstwa, automatyka do bram, ogrodzenia i monitoring. Dbamy o bezpieczenstwo Twojego domu i firmy.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/artgate.lipno/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Facebook">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="https://www.instagram.com/artgate.com.pl/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram className="h-6 w-6" />
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
                <li>ul. Spoldzielcza 14</li>
                <li><a href="tel:+48532420269" className="hover:text-blue-400 transition-colors">+48 532 420 269</a></li>
                <li><a href="mailto:biuroartgate@gmail.com" className="hover:text-blue-400 transition-colors">biuroartgate@gmail.com</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} ArtGate. Wszystkie prawa zastrzezone.</p>
            <p className="mt-2 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Polityka prywatnosci</a>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
