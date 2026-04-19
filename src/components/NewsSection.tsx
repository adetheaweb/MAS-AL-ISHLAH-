import { motion } from "motion/react";
import { ArrowRight, Calendar, User } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function NewsSection() {
  const { newsList } = useApp();

  return (
    <section id="berita" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-brand-gold font-bold uppercase tracking-widest text-sm">Berita & Artikel</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 text-brand-green">Update Terbaru Madrasah</h2>
            <p className="text-gray-600 mt-4">Dapatkan informasi terkini mengenai kegiatan, prestasi, dan pengumuman penting dari MAS AL-ISHLAH PANUGARAN.</p>
          </div>
          <button className="px-6 py-3 border border-brand-green/20 hover:border-brand-gold text-brand-green hover:text-brand-gold rounded-full font-bold transition-all flex items-center gap-2 group">
            Lihat Semua Berita <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsList.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 group flex flex-col"
            >
              <div className="h-60 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-brand-green/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest rounded-lg">
                    Kegiatan
                  </span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex gap-4 text-xs text-gray-400 mb-4 items-center">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                  <span className="flex items-center gap-1"><User size={14} /> Admin</span>
                </div>
                <h3 className="text-xl font-bold text-brand-green mb-3 group-hover:text-brand-gold transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                  {item.excerpt}
                </p>
                <button className="text-brand-green font-bold flex items-center gap-2 group/btn">
                  Baca Selengkapnya <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
