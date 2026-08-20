import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, MapPin, Calendar, ExternalLink, X, CheckCircle2 } from 'lucide-react';
import type { ProjectItem } from '../types';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('Wszystkie');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const projects: ProjectItem[] = [
    {
      id: 'p1',
      title: 'Brama palisadowa przesuwna z automatyką Sommer',
      category: 'automatyka',
      categoryLabel: 'Automatyka & Bramy',
      location: 'Lipno, woj. wielkopolskie',
      year: '2025',
      description: 'Kompleksowy montaż bramy przesuwnej 5m z napędem automatycznym, zestawem fotokomórek, fotokomórki bezprzewodowej oraz słupkiem multimedialnym.',
      features: ['Brama palisadowa ocynkowana RAL 7016', 'Napęd Sommer z cichym biegiem', 'Otwieranie smartfonem Wi-Fi', 'Lampa sygnalizacyjna LED z anteną'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'p2',
      title: 'System monitoringu wizyjnego IP 4K ColorVu',
      category: 'monitoring',
      categoryLabel: 'Monitoring CCTV',
      location: 'Skępe k. Lipna',
      year: '2025',
      description: 'Zestaw 6 kamer IP z detekcją twarzy i pojazdów AI oraz kolorowym obrazem w pełnej ciemności, zamontowanych w obiekcie prywatnym.',
      features: ['Rozdzielczość 4K Ultra HD', 'Doświetlenie noctilucent FullColor', 'Rejestrator z dyskiem 4TB WD Purple', 'Aplikacja mobilna dla właścicieli'],
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'p3',
      title: 'System alarmowy Satel z powiadomieniem GSM',
      category: 'alarmy',
      categoryLabel: 'Systemy Alarmowe',
      location: 'Kikół, woj. wielkopolskie',
      year: '2024',
      description: 'Zabezpieczenie domu jednorodzinnego przed włamaniem i pożarem. Centrala Satel z manipulatorem dotykowym oraz bezprzewodowymi czujkami ruchu.',
      features: ['Centrala Satel Perfecta z modułem LTE', 'Czujki dualne cyfrowe (PIR+MW)', 'Czujniki zalania w łazience i kotłowni', 'Zewnętrzny sygnalizator akustyczny'],
      image: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'p4',
      title: 'Nowoczesne ogrodzenie stalowe z furtką z zamkiem el-chem',
      category: 'ogrodzenia',
      categoryLabel: 'Ogrodzenia Stalowe',
      location: 'Lipno Center',
      year: '2024',
      description: 'Projekt i montaż kompletnego ogrodzenia frontowego posesji. Stal ocynkowana malowana proszkowo na kolor matowy antracyt.',
      features: ['System przęseł palisadowych poziomych', 'Furtka z elektrozaczepem i antaba', 'Słupek z wideodomofonem cyfrowym', 'Powłoka antykorozyjna z gwarancją'],
      image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'p5',
      title: 'Balustrady ze stali z wypełnieniem poziomym',
      category: 'ogrodzenia',
      categoryLabel: 'Balustrady',
      location: 'Bobrowniki',
      year: '2024',
      description: 'Montaż balustrad na balkonie oraz tarasie wykończonym deską kompozytową. Nowoczesne profile 80x20mm z niewidocznym łączeniem.',
      features: ['Stal malowana proszkowo RAL 9005', 'Montaż od czoła płyty balkonowej', 'Zgodność z polskimi normami budowlanymi', 'Trwałe zaślepki i spawy bezszwowe'],
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'p6',
      title: 'Automatyzacja dwuskrzydłowej bramy wjazdowej',
      category: 'automatyka',
      categoryLabel: 'Automatyka',
      location: 'Lipno, os. Kwiatowe',
      year: '2024',
      description: 'Montaż mocnych siłowników tubowych z blokadą mechaniczną i akumulatorem awaryjnego otwierania podczas braku prądu.',
      features: ['Siłowniki BFT Phobos BT', 'Zasilanie awaryjne z akumulatora', 'Moduł Bluetooth do otwierania zbliżeniowego', 'Regulacja prędkości i łagodne hamowanie'],
      image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const categories = [
    { id: 'Wszystkie', label: 'Wszystkie realizacje' },
    { id: 'automatyka', label: 'Automatyka' },
    { id: 'monitoring', label: 'Monitoring' },
    { id: 'alarmy', label: 'Alarmy' },
    { id: 'ogrodzenia', label: 'Ogrodzenia & Balustrady' },
  ];

  const filteredProjects = activeCategory === 'Wszystkie'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projekty" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background radial overlay */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600 via-slate-900 to-slate-950 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Portfolio & Galeria</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Wybrane realizacje z regionu
          </h2>
          <p className="text-lg text-slate-300">
            Zobacz wybrane projekty bram, systemów alarmowych i monitoringu wykonanych przez ArtGate.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedProject(project)}
              className="group bg-slate-950/70 border border-slate-800 rounded-3xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="h-56 overflow-hidden relative bg-slate-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 text-blue-400 text-xs font-semibold">
                    {project.categoryLabel}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 text-xs text-slate-300 mb-3 font-medium">
                    <span className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-blue-400" />
                      {project.location}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <span className="inline-flex items-center text-xs font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                  Zobacz szczegóły projektu
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Facebook Link Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-950 border border-blue-500/20 rounded-3xl p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-left">
            <h3 className="text-xl font-bold text-white mb-2">
              Chcesz zobaczyć więcej codziennych zdjęć z montażu?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Publikujemy bieżące zdjęcia z naszych prac na profilu firmowym Facebook. Zaobserwuj nas i bądź na bieżąco!
            </p>
          </div>
          <a
            href="https://www.facebook.com/artgate.lipno/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center px-6 py-3.5 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/30 cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
          >
            <Facebook className="w-5 h-5 mr-2.5" />
            Nasz profil Facebook
          </a>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 sm:h-80 bg-slate-950">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover opacity-90"
                />
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-3 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400"
                  aria-label="Zamknij okno projektu"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6 bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
                    {selectedProject.categoryLabel} • {selectedProject.location}
                  </span>
                  <h3 id="modal-project-title" className="text-xl sm:text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>{selectedProject.description}</p>

                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
                    Wykorzystana technologia i specyfikacja:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Zamknij
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

