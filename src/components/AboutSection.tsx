import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function AboutSection() {
  const { schoolInfo } = useApp();

  return (
    <section id="profil" className="py-24 bg-brand-cream overflow-hidden relative">
      {/* Decorative floral pattern or similar could be added here */}
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://picsum.photos/seed/school-about/800/1000" 
              alt="Profile" 
              className="rounded-3xl shadow-2xl relative z-10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-brand-green/5 rounded-full blur-3xl z-0"></div>
            
            <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-lg z-20 border border-brand-green/10">
              <p className="text-brand-green font-serif text-xl italic mb-1">
                "Mendidik dengan hati, membekali dengan iman dan ilmu."
              </p>
              <p className="text-xs text-brand-gold font-bold uppercase tracking-widest">— Kepala Madrasah</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-gold font-bold uppercase tracking-widest text-sm">Tentang Kami</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 text-brand-green mb-8">
              Mengenal Lebih Dekat <br /> {schoolInfo.name}
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-10">
              {schoolInfo.name} adalah lembaga pendidikan tingkat menengah atas yang berkomitmen untuk memberikan pendidikan berkualitas dengan landasan nilai-nilai islami. Kami percaya bahwa pendidikan sejati adalah keseimbangan antara kecerdasan intelektual, emosional, dan spiritual.
            </p>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-brand-green mb-4 flex items-center gap-3">
                  <div className="w-8 h-1 bg-brand-gold rounded-full"></div> Visi Kami
                </h3>
                <p className="text-lg text-gray-800 font-serif leading-relaxed italic">
                  "{schoolInfo.vision}"
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-brand-green mb-4 flex items-center gap-3">
                  <div className="w-8 h-1 bg-brand-gold rounded-full"></div> Misi Kami
                </h3>
                <div className="grid gap-4">
                  {schoolInfo.mission.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle2 size={20} className="text-brand-gold" />
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
