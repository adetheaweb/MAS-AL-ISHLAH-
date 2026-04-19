import { NAVIGATION } from "../constants";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const { schoolInfo } = useApp();
  const currentYear = new Date().getFullYear();

  const schoolNameParts = schoolInfo.name.split(" ");
  const schoolShortName = schoolNameParts.slice(0, 2).join(" ");
  const schoolSubName = schoolNameParts.slice(2).join(" ");
  
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-xl ring-2 ring-brand-gold">
                {schoolInfo.name.charAt(0)}
              </div>
              <div>
                <h1 className="font-bold text-brand-green text-lg leading-tight uppercase">{schoolShortName}</h1>
                <p className="text-[10px] tracking-widest text-brand-gold uppercase font-bold">{schoolSubName}</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Lembaga pendidikan berkualitas yang berkomitmen mencetak generasi islami, cerdas, dan mandiri khususnya di wilayah {schoolInfo.address.split("-").pop()}.
            </p>
            <div className="p-4 bg-brand-cream border border-brand-green/5 rounded-2xl">
              <p className="text-xs text-brand-gold font-bold uppercase tracking-widest mb-1 font-serif">NPSN</p>
              <p className="text-lg font-bold text-brand-green">{schoolInfo.npsn}</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-brand-green mb-8 uppercase text-xs tracking-[0.2em]">Tautan Cepat</h4>
            <ul className="space-y-4">
              {NAVIGATION.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-gray-500 hover:text-brand-gold transition-colors text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand-green mb-8 uppercase text-xs tracking-[0.2em]">Kategori</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-brand-gold transition-colors text-sm">Kesiswaan</a></li>
              <li><a href="#" className="text-gray-500 hover:text-brand-gold transition-colors text-sm">Kurikulum</a></li>
              <li><a href="#" className="text-gray-500 hover:text-brand-gold transition-colors text-sm">Fasilitas</a></li>
              <li><a href="/admin" className="text-brand-gold hover:underline transition-colors text-sm font-bold flex items-center gap-2">Panel Admin</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand-green mb-8 uppercase text-xs tracking-[0.2em]">Newsletter</h4>
            <p className="text-gray-500 text-sm mb-6">Daftarkan email Anda untuk mendapatkan info terbaru dari kami.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email Anda..." 
                className="flex-1 bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all"
              />
              <button className="px-4 py-2 bg-brand-green text-white rounded-lg text-sm font-bold hover:bg-brand-gold transition-colors">
                Kirim
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            &copy; {currentYear} {schoolInfo.name}. Seluruh hak cipta dilindungi undang-undang.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-400 hover:text-brand-green text-xs">Kebijakan Privasi</a>
            <a href="#" className="text-gray-400 hover:text-brand-green text-xs">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
