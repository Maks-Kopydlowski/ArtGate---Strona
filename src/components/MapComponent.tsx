import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

export default function MapComponent() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="mt-8 overflow-hidden rounded-3xl border border-slate-200/80 shadow-lg h-80 relative group bg-slate-100 flex items-center justify-center"
    >
      {isVisible ? (
        <iframe
          title="Mapa dojazdu ArtGate Lipno"
          src="https://maps.google.com/maps?q=ArtGate%2C%20ul.%20Sp%C3%B3%C5%82dzielcza%2014%2C%2064-111%20Lipno&t=&z=16&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 filter grayscale-[10%] contrast-[110%] group-hover:grayscale-0 transition-all duration-500"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      ) : (
        <div className="flex flex-col items-center gap-2 text-slate-400 font-medium">
          <MapPin className="w-8 h-8 text-blue-500 animate-bounce" />
          <span className="text-sm">Ładowanie mapy Google...</span>
        </div>
      )}
    </div>
  );
}
