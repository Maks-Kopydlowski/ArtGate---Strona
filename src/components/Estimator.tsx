import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Check, ArrowRight, ShieldCheck, Cpu, Camera, Lock, Fence } from 'lucide-react';
import type { EstimationConfig } from '../types';

interface EstimatorProps {
  onApplyEstimate: (summaryText: string) => void;
  scrollToSection: (id: string) => void;
}

export default function Estimator({ onApplyEstimate, scrollToSection }: EstimatorProps) {
  const [config, setConfig] = useState<EstimationConfig>({
    serviceType: 'automatyka',
    gateType: 'przesuwna',
    gateWeight: 'srednia',
    camerasCount: 4,
    alarmSensorsCount: 6,
    fenceMeters: 15,
    includeInstallation: true,
    smartHomeIntegration: true,
  });

  // Calculate estimated price
  const calculateEstimate = () => {
    let base = 0;
    if (config.serviceType === 'automatyka') {
      base = config.gateType === 'przesuwna' ? 1800 : config.gateType === 'skrzydlowa' ? 2200 : 1600;
      if (config.gateWeight === 'ciezka') base += 500;
      if (config.gateWeight === 'srednia') base += 250;
    } else if (config.serviceType === 'monitoring') {
      const count = config.camerasCount || 4;
      base = 1200 + count * 450;
    } else if (config.serviceType === 'alarmy') {
      const sensors = config.alarmSensorsCount || 6;
      base = 1400 + sensors * 180;
    } else if (config.serviceType === 'ogrodzenia') {
      const meters = config.fenceMeters || 15;
      base = meters * 280;
    }

    if (config.smartHomeIntegration) base += 350;
    if (config.includeInstallation) base += Math.round(base * 0.25);

    const minPrice = Math.round(base * 0.9);
    const maxPrice = Math.round(base * 1.15);

    return { minPrice, maxPrice };
  };

  const { minPrice, maxPrice } = calculateEstimate();

  const handleSendToContact = () => {
    let serviceLabel = '';
    let details = '';

    if (config.serviceType === 'automatyka') {
      serviceLabel = 'Automatyka do bramy';
      details = `Typ bramy: ${config.gateType}, Waga: ${config.gateWeight}`;
    } else if (config.serviceType === 'monitoring') {
      serviceLabel = 'Monitoring CCTV';
      details = `Liczba kamer: ${config.camerasCount} szt.`;
    } else if (config.serviceType === 'alarmy') {
      serviceLabel = 'System alarmowy';
      details = `Liczba czujników: ${config.alarmSensorsCount} szt.`;
    } else if (config.serviceType === 'ogrodzenia') {
      serviceLabel = 'Bramy i ogrodzenia';
      details = `Długość ogrodzenia: ok. ${config.fenceMeters} mb`;
    }

    const summary = `Dzień dobry, proszę o dokładną wycenę dla usłuki: ${serviceLabel}.\n` +
      `Szczegóły: ${details}.\n` +
      `Montaż: ${config.includeInstallation ? 'Tak' : 'Nie'}, Obsługa w telefonie/Smart Home: ${config.smartHomeIntegration ? 'Tak' : 'Nie'}.\n` +
      `Orientacyjna wartość z konfiguratora: ${minPrice} - ${maxPrice} PLN.`;

    onApplyEstimate(summary);
    scrollToSection('kontakt');
  };

  return (
    <section id="kalkulator" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5 mr-1" />
            <span>Kalkulator Szacunkowy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Skonfiguruj i oszacuj koszt inwestycji
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Wybierz zakres prac, aby poznać orientacyjne widełki cenowe. Wypełniony formularz możesz od razu przesłać do naszego eksperta.
          </p>
        </div>

        <div className="bg-slate-950/80 backdrop-blur-xl rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Service Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                1. Wybierz rodzaj usługi
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'automatyka', label: 'Automatyka', icon: Cpu },
                  { id: 'monitoring', label: 'Monitoring', icon: Camera },
                  { id: 'alarmy', label: 'Alarmy', icon: Lock },
                  { id: 'ogrodzenia', label: 'Ogrodzenia', icon: Fence },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = config.serviceType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setConfig({ ...config, serviceType: item.id as any })}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/25 scale-[1.02]'
                          : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                      <span className="text-sm font-semibold whitespace-nowrap">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Specific Parameters */}
            <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-6">
              {config.serviceType === 'automatyka' && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Typ bramy
                    </label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {[
                        { id: 'przesuwna', label: 'Przesuwna' },
                        { id: 'skrzydlowa', label: 'Skrzydłowa' },
                        { id: 'garażowa', label: 'Garażowa' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setConfig({ ...config, gateType: t.id as any })}
                          className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            config.gateType === t.id
                              ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                              : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Waga / Rozmiar skrzydła
                    </label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {[
                        { id: 'lekka', label: 'Lekka (do 300kg)' },
                        { id: 'srednia', label: 'Średnia (do 500kg)' },
                        { id: 'ciezka', label: 'Ciężka (pow. 500kg)' },
                      ].map((w) => (
                        <button
                          key={w.id}
                          type="button"
                          onClick={() => setConfig({ ...config, gateWeight: w.id as any })}
                          className={`py-2.5 px-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                            config.gateWeight === w.id
                              ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                              : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {w.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {config.serviceType === 'monitoring' && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Liczba kamer HD/4K
                    </label>
                    <span className="text-lg font-bold text-blue-400">{config.camerasCount} szt.</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="16"
                    step="1"
                    value={config.camerasCount}
                    onChange={(e) => setConfig({ ...config, camerasCount: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                    <span>2 kamery</span>
                    <span>8 kamer</span>
                    <span>16 kamer</span>
                  </div>
                </div>
              )}

              {config.serviceType === 'alarmy' && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Liczba czujników ruchu/otwarcia
                    </label>
                    <span className="text-lg font-bold text-blue-400">{config.alarmSensorsCount} szt.</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    step="1"
                    value={config.alarmSensorsCount}
                    onChange={(e) => setConfig({ ...config, alarmSensorsCount: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                    <span>2 czujniki</span>
                    <span>10 czujników</span>
                    <span>20 czujników</span>
                  </div>
                </div>
              )}

              {config.serviceType === 'ogrodzenia' && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Szacowana długość ogrodzenia
                    </label>
                    <span className="text-lg font-bold text-blue-400">{config.fenceMeters} mb</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={config.fenceMeters}
                    onChange={(e) => setConfig({ ...config, fenceMeters: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                    <span>5 mb</span>
                    <span>30 mb</span>
                    <span>60 mb</span>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Options */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Opcje dodatkowe
              </label>

              <label className="flex items-center space-x-3 p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                <input
                  type="checkbox"
                  checked={config.includeInstallation}
                  onChange={(e) => setConfig({ ...config, includeInstallation: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-700 text-blue-600 focus:ring-blue-500 bg-slate-950"
                />
                <span className="text-sm font-medium text-slate-200">
                  Kompleksowy montaż, okablowanie i uruchomienie na miejscu
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                <input
                  type="checkbox"
                  checked={config.smartHomeIntegration}
                  onChange={(e) => setConfig({ ...config, smartHomeIntegration: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-700 text-blue-600 focus:ring-blue-500 bg-slate-950"
                />
                <span className="text-sm font-medium text-slate-200">
                  Sterowanie ze smartfona (aplikacja Wi-Fi / Smart Home)
                </span>
              </label>
            </div>
          </div>

          {/* Result Summary Column */}
          <div className="lg:col-span-5 bg-gradient-to-b from-blue-950/60 to-slate-900 border border-blue-500/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-blue-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Wynik kalkulacji</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Szacowany koszt brutto
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                Ostateczna kwota zależy od wizji lokalnej, doboru konkretnego producenta sprzętu oraz specyfiki podłoża.
              </p>

              <div className="bg-slate-950/80 p-6 rounded-2xl border border-blue-500/30 text-center mb-6">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold block mb-1">
                  Orientacyjny przedział
                </span>
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white">
                  {minPrice.toLocaleString('pl-PL')} – {maxPrice.toLocaleString('pl-PL')} PLN
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                  <span>Darmowa wizja lokalna w Lipnie i okolicach</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                  <span>Pełna obsługa serwisowa i gwarancja producenta</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                  <span>Szkolenie z obsługi urządzenia w cenie</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleSendToContact}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-base transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Zapytaj o tę wycenę</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
