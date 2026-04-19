import { motion } from "motion/react";
import { BookOpen, Users, Layout, Award } from "lucide-react";
import { FEATURES } from "../constants";

const iconMap = {
  BookOpen: <BookOpen className="text-brand-green" />,
  Users: <Users className="text-brand-green" />,
  Layout: <Layout className="text-brand-green" />,
  Award: <Award className="text-brand-green" />,
};

export default function Features() {
  return (
    <section id="akademik" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-sm">Keunggulan Kami</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 text-brand-green">Mengapa Memilih Kami?</h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-brand-cream border border-brand-green/5 hover:border-brand-gold/30 hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand-gold group-hover:text-white transition-colors">
                {iconMap[feature.icon as keyof typeof iconMap]}
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-green group-hover:text-brand-gold transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
