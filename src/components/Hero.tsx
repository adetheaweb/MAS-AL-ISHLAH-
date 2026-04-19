import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { SCHOOL_INFO } from "../constants";
import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

export default function Hero() {
  const { sliders } = useApp();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (sliders.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliders.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [sliders.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % sliders.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + sliders.length) % sliders.length);

  if (sliders.length === 0) return null;

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={sliders[current].image} 
            alt={sliders[current].title}
            className="w-full h-full object-cover scale-110 animate-[ken-burns_20s_infinite_alternate]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-green/90 via-brand-green/70 to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block px-3 py-1 bg-brand-gold text-white text-xs font-bold tracking-widest uppercase rounded-full mb-6">
                {sliders[current].subtitle}
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
                {sliders[current].title}
              </h1>
              <p className="text-lg text-brand-cream/80 mb-10 leading-relaxed font-light">
                Madrasah Aliyah Swasta Al-Ishlah Panugaran berkomitmen memberikan pendidikan terbaik dengan landasan iman dan takwa.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-brand-gold hover:bg-brand-gold/90 text-white rounded-lg font-bold transition-all transform hover:scale-105 flex items-center gap-2">
                  Daftar Sekarang <ChevronRight size={18} />
                </button>
                <button className="px-8 py-4 border border-white/30 hover:bg-white/10 text-white rounded-lg font-bold transition-all">
                  Pelajari Lebih Lanjut
                </button>
              </div>

              <div className="mt-12 flex gap-10">
                <div>
                  <p className="text-sm text-brand-gold font-bold uppercase tracking-widest mb-1">Akreditasi</p>
                  <p className="text-3xl text-white font-serif">UNGGUL</p>
                </div>
                <div>
                  <p className="text-sm text-brand-gold font-bold uppercase tracking-widest mb-1">NPSN</p>
                  <p className="text-3xl text-white font-serif">{SCHOOL_INFO.npsn}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 right-10 z-20 flex gap-4">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-green transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-green transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-10 z-20 flex gap-2">
        {sliders.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1 rounded-full transition-all duration-300 ${current === idx ? 'w-12 bg-brand-gold' : 'w-4 bg-white/30'}`}
          />
        ))}
      </div>

      {/* Decorative element */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
          y: [0, -20, 0]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] border-[60px] border-white/5 rounded-full z-0 pointer-events-none"
      />
    </section>
  );
}
