import React, { useState, useRef } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { formatPhone } from '../utils/helpers';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAAD6dmCXwzFMAynQ-';

interface ContactFormProps {
  setPrivacyOpen: (open: boolean) => void;
}

export default function ContactForm({ setPrivacyOpen }: ContactFormProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '', website: '' });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const turnstileRef = useRef<TurnstileInstance>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const originalValue = target.value;
    const cursorPosition = target.selectionStart || 0;
    
    // Format the value
    const formattedValue = formatPhone(originalValue);
    
    setFormData(prev => ({ ...prev, phone: formattedValue }));
    
    // Count digits before cursor in original value
    const digitsBeforeCursor = originalValue.slice(0, cursorPosition).replace(/[^\d+]/g, '').length;
    
    let newCursorPosition = 0;
    let digitCount = 0;
    for (let i = 0; i < formattedValue.length; i++) {
      if (digitCount === digitsBeforeCursor) {
        newCursorPosition = i;
        break;
      }
      if (/[0-9+]/.test(formattedValue[i])) {
        digitCount++;
      }
      newCursorPosition = i + 1;
    }
    
    setTimeout(() => {
      target.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    if (!turnstileToken) {
      setSubmitError("Proszę chwilę zaczekać na weryfikację bezpieczeństwa Cloudflare Turnstile.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('https://artgate-backend.maks-kopydlowski.workers.dev/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ name: '', phone: '', email: '', message: '', website: '' });
        setTurnstileToken('');
        turnstileRef.current?.reset();
      } else {
        let errMsg = 'Wystąpił problem przy przetwarzaniu wiadomości.';
        try {
          const errLog = await response.json();
          console.error('Błąd serwera:', errLog);
          if (errLog && errLog.error) {
            errMsg = errLog.error;
          } else if (errLog && errLog.message) {
            errMsg = errLog.message;
          }
        } catch (_) {}
        setSubmitError(errMsg);
        // Reset turnstile on error to force a new token
        setTurnstileToken('');
        turnstileRef.current?.reset();
      }
    } catch (error) {
      console.error('Błąd sieciowy:', error);
      setSubmitError('Brak połączenia z serwerem obsługującym formularz.');
      setTurnstileToken('');
      turnstileRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-5 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 min-h-[500px] flex flex-col justify-center">
      {!formSubmitted ? (
        <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Napisz wiadomość</h3>
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              {submitError && (
                <div className="p-4 text-sm text-red-800 rounded-xl bg-red-50 border border-red-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Błąd:</span> {submitError}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmitError(null)}
                    className="text-red-500 hover:text-red-700 p-1 font-semibold rounded-lg hover:bg-red-100 transition-all cursor-pointer"
                    aria-label="Zamknij błąd"
                  >
                    <X className="w-4 h-4" />
                  </button>
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
                    onChange={handlePhoneChange}
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
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website" className="block text-sm font-medium text-slate-700 mb-2">Strona internetowa</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                  placeholder="http://example.com"
                  tabIndex={-1}
                  autoComplete="off"
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

              <div className="my-4 flex justify-center sm:justify-start">
                <Turnstile
                  ref={turnstileRef}
                  siteKey={TURNSTILE_SITE_KEY}
                  options={{ theme: 'light' }}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onExpire={() => setTurnstileToken('')}
                  onError={() => setSubmitError("Błąd weryfikacji Cloudflare Turnstile. Spróbuj odświeżyć stronę.")}
                />
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
                * Pola oznaczone gwiazdką są wymagane. Wysyłając formularz akceptujesz naszą{' '}
                <button
                  type="button"
                  onClick={() => setPrivacyOpen(true)}
                  className="text-blue-600 hover:underline hover:text-blue-700 font-semibold cursor-pointer focus:outline-none"
                >
                  politykę prywatności
                </button>
                .
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 animate-fade-in-up">
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
          </div>
        )}
    </div>
  );
}
