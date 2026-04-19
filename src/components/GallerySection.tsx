import { motion } from "motion/react";
import { useApp } from "../context/AppContext";

export default function GallerySection() {
  const { galleryImages } = useApp();

  return (
    <section id="galeri" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-sm">Dokumentasi</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 text-brand-green">Galeri Kegiatan</h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((id, idx) => (
            <motion.div
              key={id + "-" + idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-2xl md:rounded-3xl shadow-lg border border-gray-100"
            >
              <img 
                src={typeof id === 'string' && id.startsWith('http') ? id : `https://picsum.photos/seed/${id}/600/600`} 
                alt={`Kegiatan ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-green/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-6 text-center">
                <p className="text-white font-bold text-sm md:text-base transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  MAS AL-ISHLAH PANUGARAN
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-brand-green text-white rounded-xl font-bold hover:bg-brand-gold transition-all shadow-xl shadow-brand-green/10">
            Lihat Dokumentasi Lengkap
          </button>
        </div>
      </div>
    </section>
  );
}
