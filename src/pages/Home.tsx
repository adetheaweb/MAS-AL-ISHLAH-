import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import AboutSection from "../components/AboutSection";
import GallerySection from "../components/GallerySection";
import NewsSection from "../components/NewsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <AboutSection />
        <GallerySection />
        <NewsSection />
        <section className="py-20 bg-brand-gold">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Mulai Masa Depan Gemilang Bersama Kami
            </h2>
            <p className="text-brand-cream/80 mb-10 max-w-2xl mx-auto text-lg">
              Bergabunglah dengan ribuan alumni sukses yang telah menempa diri di MAS AL-ISHLAH PANUGARAN. Pendaftaran tahun ajaran 2026/2027 telah dibuka!
            </p>
            <button className="px-10 py-4 bg-white text-brand-green hover:bg-brand-green hover:text-white rounded-xl font-bold transition-all shadow-xl shadow-black/10 text-lg">
              Daftar Sekarang Secara Online
            </button>
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
