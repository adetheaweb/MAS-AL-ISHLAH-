import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Youtube } from "lucide-react";
import { SCHOOL_INFO } from "../constants";

export default function ContactSection() {
  return (
    <section id="kontak" className="py-24 bg-brand-green text-white relative overflow-hidden">
      {/* Background patterns could go here */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white opacity-[0.02] -skew-x-12 transform translate-x-20"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-gold font-bold uppercase tracking-widest text-sm">Hubungi Kami</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-8">Pertanyaan? Kami Siap <br /> Membantu Anda</h2>
            <p className="text-brand-cream/70 leading-relaxed mb-12 max-w-lg">
              Jangan ragu untuk menghubungi kami melalui saluran di bawah ini atau kunjungi kampus kami secara langsung untuk mendapatkan informasi lebih lanjut.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin size={24} className="text-brand-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Alamat Kampus</h4>
                  <p className="text-brand-cream/60 leading-relaxed max-w-sm">
                    {SCHOOL_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone size={24} className="text-brand-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Telepon & WhatsApp</h4>
                  <p className="text-brand-cream/60">{SCHOOL_INFO.phone}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail size={24} className="text-brand-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email Resmi</h4>
                  <p className="text-brand-cream/60">{SCHOOL_INFO.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10">
              <p className="text-sm font-bold uppercase tracking-widest mb-6">Media Sosial Kami</p>
              <div className="flex gap-6">
                <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-green transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-green transition-all">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-green transition-all">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[40px] p-10 md:p-12 text-gray-900 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-brand-green mb-8">Kirim Pesan Langsung</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Nama Lengkap</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all" placeholder="Masukkan nama Anda..." />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Alamat Email</label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all" placeholder=" Masukkan email Anda..." />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Subjek</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all" placeholder="Apa yang ingin Anda tanyakan?" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Pesan</label>
                <textarea rows={5} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all resize-none" placeholder="Tuliskan pesan Anda di sini..."></textarea>
              </div>
              <button className="w-full py-4 bg-brand-gold hover:bg-brand-gold/90 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/20">
                Kirim Pesan <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
