import React from 'react';
import { X } from 'lucide-react';

interface PrivacyModalProps {
  privacyOpen: boolean;
  setPrivacyOpen: (open: boolean) => void;
}

export default function PrivacyModal({ privacyOpen, setPrivacyOpen }: PrivacyModalProps) {
  if (!privacyOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 transition-all duration-300 animate-fade-in-up"
      onClick={() => setPrivacyOpen(false)}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h3 className="text-xl font-bold text-slate-900">Polityka prywatności (RODO)</h3>
          <button
            onClick={() => setPrivacyOpen(false)}
            className="p-2 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-full transition-all cursor-pointer"
            aria-label="Zamknij"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600 leading-relaxed">
          <div>
            <h4 className="font-bold text-slate-900 mb-2">1. Administrator Danych Osobowych</h4>
            <p>
              Administratorem Państwa danych osobowych jest firma <strong>ArtGate</strong> z siedzibą w Lipnie (Wielkopolska), ul. Spółdzielcza 14. Kontakt z administratorem jest możliwy drogą elektroniczną pod adresem: <a href="mailto:biuroartgate@gmail.com" className="text-blue-600 hover:underline">biuroartgate@gmail.com</a> lub telefonicznie pod numerem: <a href="tel:+48532420269" className="text-blue-600 hover:underline">+48 532 420 269</a>.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-2">2. Cele i Podstawy Prawne Przetwarzania</h4>
            <p>Państwa dane osobowe wprowadzane do formularza kontaktowego są przetwarzane w celu:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                Udzielenia odpowiedzi na przesłane zapytanie ofertowe, kontaktowe lub wycenę (na podstawie art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes administratora polegający na obsłudze korespondencji i relacji z klientami).
              </li>
              <li>
                Ewentualnego ustalenia, dochodzenia lub obrony przed roszczeniami (na podstawie art. 6 ust. 1 lit. f RODO).
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-2">3. Rodzaj Przetwarzanych Danych</h4>
            <p>Przetwarzamy dane dobrowolnie podane przez Państwa w formularzu kontaktowym: imię i nazwisko, adres e-mail, numer telefonu (opcjonalnie) oraz treść samej wiadomości.</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-2">4. Odbiorcy Danych</h4>
            <p>Państwa dane osobowe mogą być przekazywane dostawcom usług IT, którzy obsługują naszą infrastrukturę techniczną (serwer pocztowy, obsługa formularzy, usługi hostingowe), wyłącznie w celu realizacji naszych prawnie uzasadnionych celów oraz na podstawie odpowiednich umów powierzenia.</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-2">5. Okres Przechowywania Danych</h4>
            <p>
              Dane będą przetwarzane przez okres niezbędny do udzielenia odpowiedzi na przesłane zapytanie lub do momentu zgłoszenia przez Państwa skutecznego sprzeciwu wobec przetwarzania danych, a po tym czasie mogą być przechowywane przez okres przedawnienia ewentualnych roszczeń.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-2">6. Państwa Prawa</h4>
            <p>W związku z przetwarzaniem danych osobowych przysługują Państwu następujące prawa:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Prawo dostępu do swoich danych oraz otrzymania ich kopii,</li>
              <li>Prawo do sprostowania (poprawiania) swoich danych,</li>
              <li>Prawo do usunięcia danych ("prawo do bycia zapomnianym"),</li>
              <li>Prawo do ograniczenia przetwarzania danych,</li>
              <li>Prawo do przenoszenia danych,</li>
              <li>Prawo do wniesienia sprzeciwu wobec przetwarzania danych,</li>
              <li>Prawo do wniesienia skargi do organu nadzorczego (Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa).</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-2">7. Bezpieczeństwo Danych</h4>
            <p>Dokładamy wszelkich starań, aby zapewnić najwyższy poziom bezpieczeństwa Państwa danych. Strona zabezpieczona jest certyfikatem SSL, a formularz kontaktowy korzysta z zaawansowanych mechanizmów szyfrowania oraz ochrony przed spamem Cloudflare Turnstile.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={() => setPrivacyOpen(false)}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-md shadow-blue-600/10 cursor-pointer"
          >
            Rozumiem i akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}
