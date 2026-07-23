import React, { useState, useEffect } from 'react';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import PrivacyModal from './PrivacyModal';

export default function ContactSection() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    const handleOpenPrivacy = () => setPrivacyOpen(true);
    window.addEventListener('open-privacy-modal', handleOpenPrivacy);
    return () => window.removeEventListener('open-privacy-modal', handleOpenPrivacy);
  }, []);

  return (
    <>
      <section id="kontakt" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ContactInfo />
            <ContactForm setPrivacyOpen={setPrivacyOpen} />
          </div>
        </div>
      </section>
      <PrivacyModal privacyOpen={privacyOpen} setPrivacyOpen={setPrivacyOpen} />
    </>
  );
}
