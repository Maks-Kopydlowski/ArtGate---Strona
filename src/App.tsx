import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import { GoogleReview } from './types';

const About = lazy(() => import('./components/About'));
const Offer = lazy(() => import('./components/Offer'));
const Projects = lazy(() => import('./components/Projects'));
const ContactInfo = lazy(() => import('./components/ContactInfo'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const Footer = lazy(() => import('./components/Footer'));
const PrivacyModal = lazy(() => import('./components/PrivacyModal'));

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

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 overflow-x-hidden">
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
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <About
          googleRating={googleRating}
          googleReviewsCount={googleReviewsCount}
          googleReview={googleReview}
        />
      </Suspense>

      {/* Services/Offer Section */}
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Offer />
      </Suspense>

      {/* Projects Section */}
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <Projects />
      </Suspense>

      {/* Contact Section */}
      <section id="kontakt" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Suspense fallback={<div className="min-h-[500px]" />}>
              <ContactInfo />
            </Suspense>
            <Suspense fallback={<div className="min-h-[500px] bg-white rounded-3xl" />}>
              <ContactForm setPrivacyOpen={setPrivacyOpen} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <Footer scrollToSection={scrollToSection} setPrivacyOpen={setPrivacyOpen} />
      </Suspense>

      {/* Privacy Modal */}
      <Suspense fallback={null}>
        <PrivacyModal privacyOpen={privacyOpen} setPrivacyOpen={setPrivacyOpen} />
      </Suspense>
    </div>
  );
}
