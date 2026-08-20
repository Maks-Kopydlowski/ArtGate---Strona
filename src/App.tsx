import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Offer from './components/Offer';
import Estimator from './components/Estimator';
import Projects from './components/Projects';
import Faq from './components/Faq';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import PrivacyModal from './components/PrivacyModal';
import type { GoogleReview } from './types';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [googleRating, setGoogleRating] = useState<number>(5.0);
  const [googleReviewsCount, setGoogleReviewsCount] = useState<number>(32);
  const [googleReview, setGoogleReview] = useState<GoogleReview | null>({
    author: "Tomasz Nowak",
    publishTime: "3 dni temu",
    text: "Profesjonalne podejście do klienta, fachowe doradztwo i sprawny montaż automatyki do bramy. Zdecydowanie polecam tę firmę!"
  });
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [prefilledMessage, setPrefilledMessage] = useState<string>('');

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

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromOffer = (serviceTitle: string) => {
    setPrefilledMessage(`Dzień dobry, chciałbym zapytać o bezpłatną wycenę dla usługi: ${serviceTitle}. Proszę o kontakt w celu omówienia szczegółów.`);
  };

  const handleApplyEstimate = (summaryText: string) => {
    setPrefilledMessage(summaryText);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <Navigation
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <Hero scrollToSection={scrollToSection} />

      {/* About Section */}
      <About
        googleRating={googleRating}
        googleReviewsCount={googleReviewsCount}
        googleReview={googleReview}
      />

      {/* Services/Offer Section */}
      <Offer
        onSelectService={handleSelectServiceFromOffer}
        scrollToSection={scrollToSection}
      />

      {/* Estimator Section */}
      <Estimator
        onApplyEstimate={handleApplyEstimate}
        scrollToSection={scrollToSection}
      />

      {/* Projects Section */}
      <Projects />

      {/* FAQ Section */}
      <Faq />

      {/* Contact Section */}
      <section id="kontakt" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ContactInfo />
            <ContactForm
              setPrivacyOpen={setPrivacyOpen}
              prefilledMessage={prefilledMessage}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} setPrivacyOpen={setPrivacyOpen} />

      {/* Privacy Modal */}
      <PrivacyModal privacyOpen={privacyOpen} setPrivacyOpen={setPrivacyOpen} />
    </div>
  );
}
