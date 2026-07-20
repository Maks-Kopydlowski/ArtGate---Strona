import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck, Video, Home, Phone, Mail, MapPin,
  Facebook, Instagram, Menu, X, ChevronRight, CheckCircle2, Key,
  AlertCircle
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const WORKER_URL = 'https://artgate-backend.maks-kopydlowski.workers.dev';

const NAV_ITEMS = [
  { label: 'O firmie',  id: 'o-firmie' },
  { label: 'Oferta',    id: 'oferta'   },
  { label: 'Projekty',  id: 'projekty' },
  { label: 'Kontakt',   id: 'kontakt'  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  website: string; // honeypot — ukryte przed użytkownikami, widoczne dla botów
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────────────────────────────────────
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Imię i nazwisko jest wymagane.';
  else if (data.name.trim().length > 100) errors.name = 'Maksymalnie 100 znaków.';

  if (!data.email.trim()) errors.email = 'Adres email jest wymagany.';
  else if (!validateEmail(data.email)) errors.email = 'Podaj prawidłowy adres email.';

  if (!data.message.trim()) errors.message = 'Wiadomość jest wymagana.';
  else if (data.message.trim().length > 5000) errors.message = 'Maksymalnie 5000 znaków.';

  return errors;
}

// ─────────────────────────────────────────────────────────────────────────────
// APP COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted]   = useState(false);
  const [isSubmitting, setIsSubmitting]     = useState(false);
  const [submitError, setSubmitError]       = useState<string | null>(null);
  const [formErrors, setFormErrors]         = useState<FormErrors>({});
  const [touched, setTouched]               = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState<FormData>({
    name: '', phone: '', email: '', message: '',
    website: '', // honeypot — zawsze puste dla prawdziwych użytkowników
  });

  // ── Scroll handler ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Body scroll lock (mobile menu) ─────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // ── Smooth scroll to section ───────────────────────────────────────────────
  const scrollToSection = useCallback((id: string) => {
    setMobileMenuOpen(false);
    // Timeout pozwala menu się zamknąć przed scrollem
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const navHeight = 80;
        const y = element.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  }, []);

  // ── Field blur validation ──────────────────────────────────────────────────
  const handleBlur = (field: keyof FormErrors) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errors = validateForm(formData);
    setFormErrors(prev => ({ ...prev, [field]: errors[field] }));
  };

  // ── Input change ───────────────────────────────────────────────────────────
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing in a touched field
    if (touched[field]) {
      const newData = { ...formData, [field]: value };
      const errors = validateForm(newData);
      setFormErrors(prev => ({ ...prev, [field]: errors[field as keyof FormErrors] }));
    }
  };

  // ── Form submit ────────────────────────────────────────────────────────────
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to show validation errors
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
        setSubmitError(data.error || 'Wystąpił problem przy przetwarzaniu wiadomości. Spróbuj ponownie później.');
      }
    } catch {
      setSubmitError('Brak połączenia z serwerem. Spróbuj ponownie lub zadzwoń bezpośrednio: +48 532 420 269.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════════════
          NAVIGATION
      ════════════════════════════════════════════════════════════════════ */}
      <nav
        role="navigation"
        aria-label="Główna nawigacja"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          mobileMenuOpen
            ? 'bg-white py-3 border-b border-slate-100'
            : isScrolled
              ? 'bg-white/95 backdrop-blur-xl shadow-sm shadow-slate-900/5 py-3 border-b border-slate-100/60'
              : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">

            {/* Logo */}
            <button
              onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 cursor-pointer"
              aria-label="ArtGate — powrót na górę strony"
            >
              <ShieldCheck
                className={`h-8 w-8 transition-colors duration-300 ${
                  mobileMenuOpen || isScrolled ? 'text-blue-600' : 'text-white'
                }`}
              />
              <span
                className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
                  mobileMenuOpen || isScrolled ? 'text-slate-900' : 'text-white'
                }`}
              >
                ArtGate
              </span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8" role="menubar">
              {NAV_ITEMS.map(({ label, id }) => (
                <button
                  key={id}
                  role="menuitem"
                  onClick={() => scrollToSection(id)}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-blue-500 relative group ${
                    isScrolled ? 'text-slate-600' : 'text-slate-200'
                  }`}
                >
                  {label}
                  {/* Animated underline */}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full rounded-full" />
                </button>
              ))}
              <a
                href="tel:+48532420269"
                aria-label="Zadzwoń: 532 420 269"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isScrolled
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.02]'
                    : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm border border-white/20'
                }`}
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                532 420 269
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 -mr-2 rounded-lg"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileMenuOpen
                    ? <X className="h-6 w-6 text-slate-900" aria-hidden="true" />
                    : <Menu className={`h-6 w-6 ${isScrolled ? 'text-slate-900' : 'text-white'}`} aria-hidden="true" />
                  }
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE MENU
      ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu mobilne"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6 flex flex-col"
          >
            <nav className="flex flex-col gap-1 mt-4">
              {NAV_ITEMS.map(({ label, id }, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.2 }}
                  onClick={() => scrollToSection(id)}
                  className="text-left text-2xl font-semibold text-slate-800 py-4 border-b border-slate-100 hover:text-blue-600 transition-colors"
                >
                  {label}
                </motion.button>
              ))}
            </nav>

            <div className="mt-auto mb-12 flex flex-col gap-4">
              <a
                href="tel:+48532420269"
                className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold text-lg transition-colors shadow-lg shadow-blue-600/25"
                aria-label="Zadzwoń: 532 420 269"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                Zadzwoń: 532 420 269
              </a>
              <div className="flex justify-center gap-8 pt-4">
                <a
                  href="https://www.facebook.com/artgate.lipno/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-600 transition-colors"
                  aria-label="ArtGate na Facebooku (otwiera w nowej karcie)"
                >
                  <Facebook className="h-8 w-8" aria-hidden="true" />
                </a>
                <a
                  href="https://www.instagram.com/artgate.com.pl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-pink-600 transition-colors"
                  aria-label="ArtGate na Instagramie (otwiera w nowej karcie)"
                >
                  <Instagram className="h-8 w-8" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Sekcja główna"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=75&w=1400&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            width={1400}
            height={934}
            className="w-full h-full object-cover opacity-40"
          />
          {/* Multi-layer gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/30 to-slate-950/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-transparent to-blue-950/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-400/25 text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
              </span>
              Darmowa wycena — zadzwoń lub napisz
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.08]">
              Bezpieczniejszy dom{' '}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300">
                zaczyna się tutaj
              </span>
            </h1>

            <p className="mt-4 text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light mb-10 leading-relaxed">
              Ogrodzenia, alarmy, monitoring i automatyka do bram.{' '}
              <br className="hidden sm:block" />
              Kompleksowe rozwiązania dla Twojego spokoju.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => scrollToSection('oferta')}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full font-semibold text-lg transition-all shadow-xl shadow-blue-600/30 hover:shadow-blue-600/40 hover:scale-[1.03] flex items-center justify-center gap-2"
              >
                Zobacz ofertę
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => scrollToSection('kontakt')}
                className="w-full sm:w-auto px-8 py-4 glass text-white hover:bg-white/20 rounded-full font-semibold text-lg transition-all hover:scale-[1.03] flex items-center justify-center gap-2"
              >
                Darmowa wycena
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-slate-400 text-xs font-medium tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent"
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FEATURES STRIP
      ════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Główne usługi"
        className="relative bg-white z-20 rounded-t-[2.5rem] shadow-2xl shadow-slate-900/10 mx-3 sm:mx-6 lg:mx-10 -mt-8 sm:-mt-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Key className="w-7 h-7 text-blue-600" aria-hidden="true" />,
                title: 'Automatyka do bram',
                desc:  'Wygoda, która otwiera się przed Tobą.',
              },
              {
                icon: <Video className="w-7 h-7 text-blue-600" aria-hidden="true" />,
                title: 'Monitoring i alarmy',
                desc:  'Bezpieczeństwo, na które Cię stać.',
              },
              {
                icon: <Home className="w-7 h-7 text-blue-600" aria-hidden="true" />,
                title: 'Bramy i ogrodzenia',
                desc:  'Twoja prywatność w najlepszej oprawie.',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-blue-50/60 transition-colors duration-200 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-5 transition-colors duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ABOUT SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section id="o-firmie" aria-label="O firmie ArtGate" className="py-24 sm:py-32 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Text column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                O firmie
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                Piękno, funkcjonalność{' '}
                <br className="hidden sm:block" />
                i <span className="text-blue-600">bezpieczeństwo</span>
              </h2>
              <p className="text-lg text-slate-600 mb-5 leading-relaxed">
                ArtGate specjalizuje się w produkcji oraz montażu bram, ogrodzeń, balustrad i konstrukcji stalowych. Dodatkowo oferujemy sprzedaż i instalację automatyki bramowej, monitoringu CCTV oraz systemów alarmowych.
              </p>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Stawiamy na profesjonalną realizację zgodnie z preferencjami klientów, szybki czas realizacji, fachowy montaż oraz bezpłatny serwis w okresie gwarancji.
              </p>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 mb-10">
                {['Kompleksowa obsługa', 'Bezpłatna wycena', 'Fachowy montaż', 'Serwis gwarancyjny'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-5xl font-extrabold text-slate-900 tabular-nums">15</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Lat<br />Doświadczenia</span>
                </div>
                <div className="h-14 w-px bg-slate-200" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="text-5xl font-extrabold text-slate-900 tabular-nums">100+</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Zadowolonych<br />Klientów</span>
                </div>
              </div>
            </motion.div>

            {/* Image column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative px-2 sm:px-0 mt-8 lg:mt-0"
            >
              <div className="absolute inset-0 bg-blue-600 rounded-3xl transform translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 opacity-10" aria-hidden="true" />
              <img
                src="https://images.unsplash.com/photo-1582999589282-65b5766888a0?q=75&w=800&auto=format&fit=crop"
                alt="Profesjonalny montaż ogrodzenia przez ekipę ArtGate"
                loading="lazy"
                decoding="async"
                width={800}
                height={1067}
                className="relative rounded-3xl shadow-2xl object-cover h-[420px] sm:h-[540px] lg:h-[600px] w-full bg-slate-200"
              />

              {/* Floating badge */}
              <div className="absolute -bottom-5 left-4 sm:-left-6 bg-white p-4 sm:p-6 rounded-2xl shadow-xl flex items-center gap-4">
                <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-blue-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Gwarancja</p>
                  <p className="text-base font-bold text-slate-900 leading-tight">Najwyższej jakości</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SERVICES SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section id="oferta" aria-label="Oferta ArtGate" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full text-sm font-semibold mb-5">
              Pełna oferta
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5">Nasza Oferta</h2>
            <p className="text-xl text-slate-500">
              Zapewniamy kompleksową obsługę — od doradztwa, przez montaż, aż po serwis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Automatyka do bram',
                desc:  'Sprzedaż i instalacja niezawodnych, nowoczesnych napędów do bram przesuwnych i skrzydłowych.',
                img:   'https://images.unsplash.com/photo-1719388133657-5d83621987fc?q=75&w=600&auto=format&fit=crop',
                position: 'object-[center_80%]',
              },
              {
                title: 'Monitoring CCTV',
                desc:  'Nowoczesne systemy kamer wysokiej rozdzielczości pozwalające na zdalny podgląd z każdego miejsca na świecie.',
                img:   'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=75&w=600&auto=format&fit=crop',
              },
              {
                title: 'Systemy alarmowe',
                desc:  'Zabezpiecz swój dom lub firmę przed włamaniem dzięki certyfikowanym, inteligentnym centralom alarmowym.',
                img:   'https://images.unsplash.com/photo-1552775838-b0c8d3b881fb?q=75&w=600&auto=format&fit=crop',
              },
              {
                title: 'Bramy i ogrodzenia',
                desc:  'Projektowanie, produkcja i precyzyjny montaż solidnych bram wjazdowych oraz estetycznych ogrodzeń stalowych.',
                img:   'https://images.unsplash.com/photo-1634841999653-dad28648a43a?q=75&w=600&auto=format&fit=crop',
              },
              {
                title: 'Balustrady',
                desc:  'Wykonujemy bezpieczne, odporne na warunki atmosferyczne i stylowe balustrady balkonowe oraz schodowe.',
                img:   'https://images.unsplash.com/photo-1610313141579-e36bfb17177e?q=75&w=600&auto=format&fit=crop',
                position: 'object-[center_30%]',
              },
              {
                title: 'Domofony i wideodomofony',
                desc:  'Bezpieczna kontrola dostępu do posesji za pomocą nowoczesnych paneli z kamerą i łącznością ze smartfonem.',
                img:   'https://images.unsplash.com/photo-1528817466667-942353411fee?q=75&w=600&auto=format&fit=crop',
              },
            ].map((service, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: (idx % 3) * 0.08, duration: 0.5 }}
                className="group rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/8 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-52 overflow-hidden bg-slate-200 relative">
                  <img
                    src={service.img}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={400}
                    className={`w-full h-full object-cover transform group-hover:scale-[1.06] transition-transform duration-500 ${service.position || 'object-center'}`}
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-[0.95rem]">{service.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROJECTS / CTA SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section id="projekty" aria-label="Nasze realizacje i social media" className="py-24 sm:py-32 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated radial gradient background */}
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500 blur-[120px]" />
        </div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-5">Zobacz nasze realizacje</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Regularnie publikujemy zdjęcia z naszych najnowszych montaży. Odwiedź nasze profile w mediach społecznościowych, aby zobaczyć, jak pracujemy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
              <a
                href="https://www.facebook.com/artgate.lipno/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Odwiedź nasz profil na Facebooku (otwiera w nowej karcie)"
                className="flex items-center gap-3 px-8 py-4 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white rounded-full font-semibold transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-600/20 w-full sm:w-auto justify-center"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
                Nasz Facebook
              </a>
              <a
                href="https://www.instagram.com/artgate.com.pl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Odwiedź nasz profil na Instagramie (otwiera w nowej karcie)"
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] hover:opacity-90 text-white rounded-full font-semibold transition-all hover:scale-[1.03] hover:shadow-xl w-full sm:w-auto justify-center"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
                Nasz Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTACT SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section id="kontakt" aria-label="Formularz kontaktowy i dane firmy" className="py-24 sm:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold mb-5">
              Skontaktuj się
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">Skontaktuj się z nami</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Masz pytania lub chcesz umówić się na darmową wycenę? Jesteśmy do Twojej dyspozycji.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

            {/* Contact info + Map */}
            <div>
              <div className="space-y-7 mb-8">
                {[
                  {
                    icon: <Phone className="w-6 h-6 text-blue-600" aria-hidden="true" />,
                    label: 'Telefon',
                    content: (
                      <a href="tel:+48532420269" className="text-xl text-slate-800 hover:text-blue-600 font-bold mt-1 block transition-colors">
                        +48 532 420 269
                      </a>
                    ),
                  },
                  {
                    icon: <Mail className="w-6 h-6 text-blue-600" aria-hidden="true" />,
                    label: 'Email',
                    content: (
                      <a href="mailto:biuroartgate@gmail.com" className="text-xl text-slate-800 hover:text-blue-600 font-bold mt-1 block transition-colors break-all">
                        biuroartgate@gmail.com
                      </a>
                    ),
                  },
                  {
                    icon: <MapPin className="w-6 h-6 text-blue-600" aria-hidden="true" />,
                    label: 'Adres',
                    content: (
                      <>
                        <p className="text-xl text-slate-800 font-bold mt-1">
                          ul. Spółdzielcza 14<br />
                          64-111 Lipno, Wielkopolska
                        </p>
                        <a
                          href="https://maps.google.com/?q=ul.+Spółdzielcza+14,+64-111+Lipno"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Otwórz lokalizację w Mapach Google (nowa karta)"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 mt-2 group"
                        >
                          Otwórz w Mapach Google
                          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </a>
                      </>
                    ),
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">{item.label}</h4>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-lg h-72 relative group bg-slate-100">
                <iframe
                  title="Mapa dojazdu do ArtGate w Lipnie"
                  src="https://maps.google.com/maps?q=ul.%20Sp%C3%B3%C5%82dzielcza%2014,%2064-111%20Lipno&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter grayscale-[15%] contrast-[105%] group-hover:grayscale-0 transition-all duration-500"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-7 sm:p-10 rounded-3xl shadow-xl border border-slate-100 min-h-[520px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.div
                    key="contact-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">Napisz wiadomość</h3>
                    <p className="text-slate-500 text-sm mb-7">Odpiszemy w ciągu 24 godzin.</p>

                    {/* Global error banner */}
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 text-sm text-red-800 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3"
                        role="alert"
                        aria-live="polite"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" aria-hidden="true" />
                        <div>
                          <span className="font-semibold block">Błąd wysyłki</span>
                          {submitError}
                        </div>
                      </motion.div>
                    )}

                    <form className="space-y-5" onSubmit={handleFormSubmit} noValidate>

                      {/* Honeypot (anti-bot) — ukryte dla użytkowników */}
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div>
                          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Imię i nazwisko <span className="text-red-500" aria-hidden="true">*</span>
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
                            className={`form-input w-full px-4 py-3 rounded-xl border outline-none bg-slate-50 focus:bg-white text-slate-900 placeholder-slate-400 ${
                              formErrors.name
                                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                            }`}
                            placeholder="Jan Kowalski"
                          />
                          {formErrors.name && (
                            <p id="name-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                              <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                              {formErrors.name}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Telefon <span className="text-slate-400 font-normal">(opcjonalnie)</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={e => handleChange('phone', e.target.value)}
                            className="form-input w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-slate-50 focus:bg-white text-slate-900 placeholder-slate-400"
                            placeholder="+48 000 000 000"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Adres email <span className="text-red-500" aria-hidden="true">*</span>
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
                          className={`form-input w-full px-4 py-3 rounded-xl border outline-none bg-slate-50 focus:bg-white text-slate-900 placeholder-slate-400 ${
                            formErrors.email
                              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                              : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                          }`}
                          placeholder="jan@example.com"
                        />
                        {formErrors.email && (
                          <p id="email-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                            <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Wiadomość <span className="text-red-500" aria-hidden="true">*</span>
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
                          className={`form-input w-full px-4 py-3 rounded-xl border outline-none resize-none bg-slate-50 focus:bg-white text-slate-900 placeholder-slate-400 ${
                            formErrors.message
                              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                              : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                          }`}
                          placeholder="W czym możemy pomóc?"
                        />
                        {formErrors.message && (
                          <p id="message-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                            <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                            {formErrors.message}
                          </p>
                        )}
                        {formData.message && (
                          <p className="mt-1 text-xs text-slate-400 text-right">
                            {formData.message.length}/5000
                          </p>
                        )}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Wysyłanie…
                          </>
                        ) : 'Wyślij wiadomość'}
                      </button>

                      <p className="text-xs text-slate-400 text-center">
                        <span className="text-red-400">*</span> Pola wymagane. Wysyłając formularz, akceptujesz naszą{' '}
                        <a href="#" className="underline hover:text-slate-600 transition-colors">politykę prywatności</a>.
                      </p>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="text-center py-8"
                    aria-live="polite"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
                      className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle2 className="w-12 h-12 text-emerald-600" aria-hidden="true" />
                    </motion.div>
                    <h3 className="text-3xl font-extrabold text-slate-900 mb-3">Wiadomość wysłana!</h3>
                    <p className="text-slate-500 max-w-sm mx-auto mb-8 leading-relaxed">
                      Dziękujemy za kontakt. Odpowiemy na Twoją wiadomość najszybciej jak to możliwe!
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-7 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-all hover:scale-[1.02]"
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

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════════════ */}
      <footer className="bg-slate-950 text-slate-400 py-14 border-t border-slate-900" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

            {/* Brand */}
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-8 w-8 text-blue-500" aria-hidden="true" />
                <span className="text-2xl font-extrabold text-white">ArtGate</span>
              </div>
              <p className="max-w-sm text-sm leading-relaxed mb-6">
                Profesjonalne systemy bezpieczeństwa, automatyka do bram, ogrodzenia i monitoring. Dbamy o bezpieczeństwo Twojego domu i firmy od ponad 15 lat.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/artgate.lipno/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ArtGate na Facebooku"
                  className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:scale-110"
                >
                  <Facebook className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.instagram.com/artgate.com.pl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ArtGate na Instagramie"
                  className="w-10 h-10 bg-slate-800 hover:bg-pink-600 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:scale-110"
                >
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Szybkie linki</h4>
              <ul className="space-y-3 text-sm">
                {NAV_ITEMS.map(({ label, id }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className="hover:text-blue-400 transition-colors hover:translate-x-0.5 transform duration-150 inline-block"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Kontakt</h4>
              <ul className="space-y-3 text-sm">
                <li>Lipno, Wielkopolska</li>
                <li>ul. Spółdzielcza 14</li>
                <li>
                  <a href="tel:+48532420269" className="hover:text-blue-400 transition-colors">
                    +48 532 420 269
                  </a>
                </li>
                <li>
                  <a href="mailto:biuroartgate@gmail.com" className="hover:text-blue-400 transition-colors break-all">
                    biuroartgate@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
            <p>&copy; {new Date().getFullYear()} ArtGate. Wszystkie prawa zastrzeżone.</p>
            <a href="#" className="hover:text-white transition-colors">
              Polityka prywatności
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
