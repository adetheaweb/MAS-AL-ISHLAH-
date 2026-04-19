import { motion } from "motion/react";
import { useState } from "react";
import { LayoutDashboard, Settings, FileText, Image as ImageIcon, Users, LogOut, Save, Bell, Search, Plus, Edit, Trash2, Home, Power, ShieldCheck, Globe, ChevronLeft, X, Monitor } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SCHOOL_INFO } from "../constants";
import { useApp } from "../context/AppContext";

export default function Management() {
  const navigate = useNavigate();
  const { 
    galleryImages, setGalleryImages, 
    sliders, setSliders, 
    newsList, setNewsList,
    schoolInfo, setSchoolInfo,
    settings, setSettings
  } = useApp();
  
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/login");
  };
  const [activeTab, setActiveTab] = useState("identitas");
  const [formData, setFormData] = useState(schoolInfo);
  const [isEditingNews, setIsEditingNews] = useState(false);
  const [currentNews, setCurrentNews] = useState<any>(null);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  
  const [isEditingSlider, setIsEditingSlider] = useState(false);
  const [currentSlider, setCurrentSlider] = useState<any>(null);

  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successType, setSuccessType] = useState("");

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSaveMessage(true);
      setSuccessType("Pengaturan sistem berhasil diperbarui!");
      setTimeout(() => setShowSaveMessage(false), 3000);
    }, 1000);
  };

  const handleSaveIdentity = () => {
    setIsSaving(true);
    setTimeout(() => {
      setSchoolInfo(formData);
      setIsSaving(false);
      setShowSaveMessage(true);
      setSuccessType("Identitas sekolah berhasil diperbarui!");
      setTimeout(() => setShowSaveMessage(false), 3000);
    }, 1000);
  };

  const tabs = [
    { id: "identitas", label: "Identitas Sekolah", icon: <LayoutDashboard size={18} /> },
    { id: "konten", label: "Pengelolaan Konten", icon: <FileText size={18} /> },
    { id: "slider", label: "Pengaturan Slider", icon: <Monitor size={18} /> },
    { id: "media", label: "Galeri & Media", icon: <ImageIcon size={18} /> },
    { id: "akademik", label: "Data Akademik", icon: <Users size={18} /> },
    { id: "pengaturan", label: "Pengaturan Sistem", icon: <Settings size={18} /> },
  ];

  const mockTeachers = [
    { name: "H. Abdullah, S.Ag", role: "Kepala Madrasah", nip: "19750101XXXXXXXX" },
    { name: "Siti Aminah, S.Pd", role: "Waka Kurikulum", nip: "19800512XXXXXXXX" },
    { name: "Budi Santoso, M.Pd", role: "Guru Matematika", nip: "19851120XXXXXXXX" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F0F2F5] text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-green text-white hidden lg:flex flex-col shadow-xl">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-bold text-brand-gold text-xl">
            A
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight">ADMIN PANEL</h1>
            <p className="text-[10px] text-brand-gold font-bold tracking-widest uppercase">Management</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? "bg-brand-gold text-white shadow-lg shadow-brand-gold/20" : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:bg-red-500/10 hover:text-red-400 transition-all text-left"
          >
            <LogOut size={18} />
            Keluar Panel Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <Link to="/" className="lg:hidden p-2 bg-white rounded-lg text-brand-green">
              <Home size={20} />
            </Link>
            <div>
              <h2 className="text-3xl font-serif font-bold text-brand-green">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <p className="text-sm text-gray-400 mt-1">Kelola informasi madrasah dengan mudah dan cepat.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Cari data..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 w-64 transition-all" />
            </div>
            <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-brand-gold relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 bg-brand-gold rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-brand-gold/20">
              AD
            </div>
          </div>
        </header>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[600px]"
        >
          {activeTab === "identitas" && (
            <div className="max-w-4xl space-y-8">
              {showSaveMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl flex items-center gap-3 font-medium"
                >
                  <ShieldCheck size={20} /> {successType}
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Nama Madrasah</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">NPSN</label>
                  <input 
                    type="text" 
                    value={formData.npsn}
                    onChange={(e) => setFormData({ ...formData, npsn: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Alamat Lengkap</label>
                <input 
                  type="text" 
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50" 
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Nomor Telepon</label>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Sekolah</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50" 
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
                <button 
                  onClick={handleSaveIdentity}
                  disabled={isSaving}
                  className="px-8 py-3 bg-brand-gold hover:bg-brand-gold/90 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg disabled:opacity-70"
                >
                  {isSaving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "konten" && (
            <div className="space-y-6">
              {!isEditingNews ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-brand-green">Daftar Berita & Pengumuman</h3>
                    <button 
                      onClick={() => {
                        setIsEditingNews(true);
                        setCurrentNews({ title: "", date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), excerpt: "", image: "https://picsum.photos/seed/new/800/600" });
                      }}
                      className="px-4 py-2 bg-brand-green text-white rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg shadow-brand-green/20"
                    >
                      <Plus size={18} /> Tambah Berita
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest">
                        <tr>
                          <th className="px-6 py-4 rounded-l-xl font-bold">Judul Berita</th>
                          <th className="px-6 py-4 font-bold">Tanggal</th>
                          <th className="px-6 py-4 font-bold">Status</th>
                          <th className="px-6 py-4 rounded-r-xl font-bold text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {newsList.map((news) => (
                          <tr key={news.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-800">{news.title}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{news.date}</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-green-100 text-green-600 text-[10px] font-bold rounded-md">PUBLISHED</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex justify-center gap-2">
                                <button 
                                  onClick={() => {
                                    setIsEditingNews(true);
                                    setCurrentNews(news);
                                  }}
                                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                  <Edit size={16} />
                                </button>
                                <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-4 mb-2">
                    <button 
                      onClick={() => setIsEditingNews(false)}
                      className="p-2 text-gray-400 hover:text-brand-green transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <h3 className="text-2xl font-serif font-bold text-brand-green">
                      {currentNews?.id ? "Edit Berita" : "Tambah Berita Baru"}
                    </h3>
                  </div>

                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Judul Berita</label>
                      <input 
                        type="text" 
                        value={currentNews?.title}
                        onChange={(e) => setCurrentNews({ ...currentNews, title: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50" 
                        placeholder="Masukkan judul berita yang menarik..."
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Tanggal Publikasi</label>
                        <input 
                          type="text" 
                          value={currentNews?.date}
                          onChange={(e) => setCurrentNews({ ...currentNews, date: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Kategori</label>
                        <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50">
                          <option>Kegiatan</option>
                          <option>Prestasi</option>
                          <option>Pengumuman</option>
                          <option>Akademik</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Ringkasan (Excerpt)</label>
                      <textarea 
                        rows={3}
                        value={currentNews?.excerpt}
                        onChange={(e) => setCurrentNews({ ...currentNews, excerpt: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 resize-none"
                        placeholder="Tulis ringkasan singkat isi berita..."
                      ></textarea>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Gambar Utama (URL)</label>
                      <input 
                        type="text" 
                        value={currentNews?.image}
                        onChange={(e) => setCurrentNews({ ...currentNews, image: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50" 
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
                    <button 
                      onClick={() => setIsEditingNews(false)}
                      className="px-6 py-2 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all font-sans"
                    >
                      Batal
                    </button>
                    <button className="px-8 py-3 bg-brand-gold hover:bg-brand-gold/90 text-white rounded-xl font-bold transition-all shadow-lg flex items-center gap-2">
                      <Save size={18} /> Simpan Berita
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "slider" && (
            <div className="space-y-6">
              {!isEditingSlider ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-brand-green">Daftar Slider Beranda</h3>
                    <button 
                      onClick={() => {
                        setIsEditingSlider(true);
                        setCurrentSlider({ title: "", subtitle: "", image: "https://picsum.photos/seed/slide/1920/1080" });
                      }}
                      className="px-4 py-2 bg-brand-green text-white rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg shadow-brand-green/20"
                    >
                      <Plus size={18} /> Tambah Slider
                    </button>
                  </div>
                  <div className="grid gap-6">
                    {sliders.map((slider) => (
                      <motion.div 
                        key={slider.id}
                        layout
                        className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 border border-gray-100 rounded-2xl group transition-all"
                      >
                        <div className="w-full md:w-64 h-36 bg-gray-200 rounded-xl overflow-hidden relative shadow-inner">
                          <img 
                            src={slider.image} 
                            alt={slider.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <h4 className="text-lg font-bold text-gray-800">{slider.title}</h4>
                          <p className="text-sm text-gray-500 line-clamp-2">{slider.subtitle}</p>
                          <div className="pt-4 flex gap-3">
                            <button 
                              onClick={() => {
                                setIsEditingSlider(true);
                                setCurrentSlider(slider);
                              }}
                              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-blue-600 flex items-center gap-2 hover:bg-blue-50 transition-all"
                            >
                              <Edit size={14} /> Edit Detail
                            </button>
                            <button 
                              onClick={() => setSliders(sliders.filter(s => s.id !== slider.id))}
                              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-red-500 flex items-center gap-2 hover:bg-red-50 transition-all"
                            >
                              <Trash2 size={14} /> Hapus
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-4 mb-2">
                    <button 
                      onClick={() => setIsEditingSlider(false)}
                      className="p-2 text-gray-400 hover:text-brand-green transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <h3 className="text-2xl font-serif font-bold text-brand-green">
                      {currentSlider?.id ? "Edit Slider" : "Tambah Slider Baru"}
                    </h3>
                  </div>

                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Judul Utama Slider</label>
                      <input 
                        type="text" 
                        value={currentSlider?.title}
                        onChange={(e) => setCurrentSlider({ ...currentSlider, title: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50" 
                        placeholder="Misal: Selamat Datang di Madrasah..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Subjudul (Deskripsi Singkat)</label>
                      <textarea 
                        rows={2}
                        value={currentSlider?.subtitle}
                        onChange={(e) => setCurrentSlider({ ...currentSlider, subtitle: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 resize-none"
                        placeholder="Berikan deskripsi singkat untuk slider ini..."
                      ></textarea>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Gambar Latar Belakang (URL)</label>
                      <div className="flex gap-4">
                        <input 
                          type="text" 
                          value={currentSlider?.image}
                          onChange={(e) => setCurrentSlider({ ...currentSlider, image: e.target.value })}
                          className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50" 
                          placeholder="https://..."
                        />
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium">Saran: Gunakan gambar dengan resolusi minimal 1920x1080 untuk hasil terbaik.</p>
                    </div>

                    {currentSlider?.image && (
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                        <img 
                          src={currentSlider.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <p className="text-white font-bold text-sm bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">Preview Slider</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
                    <button 
                      onClick={() => setIsEditingSlider(false)}
                      className="px-6 py-2 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all font-sans"
                    >
                      Batal
                    </button>
                    <button 
                      onClick={() => {
                        if(currentSlider.id) {
                          setSliders(sliders.map(s => s.id === currentSlider.id ? currentSlider : s));
                        } else {
                          setSliders([...sliders, { ...currentSlider, id: Date.now() }]);
                        }
                        setIsEditingSlider(false);
                      }}
                      className="px-8 py-3 bg-brand-gold hover:bg-brand-gold/90 text-white rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
                    >
                      <Save size={18} /> Simpan Slider
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-brand-green">Pustaka Media</h3>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all">Folder Baru</button>
                  <button 
                    onClick={() => setIsUploadingMedia(!isUploadingMedia)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg transition-all ${isUploadingMedia ? 'bg-gray-100 text-gray-500' : 'bg-brand-gold text-white shadow-brand-gold/20'}`}
                  >
                    {isUploadingMedia ? <X size={18} /> : <ImageIcon size={18} />}
                    {isUploadingMedia ? "Batal Unggah" : "Unggah Gambar"}
                  </button>
                </div>
              </div>

              {isUploadingMedia && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-brand-cream border border-brand-gold/20 rounded-2xl flex flex-col md:flex-row gap-4 items-end"
                >
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">URL Gambar Baru</label>
                    <input 
                      type="text" 
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="Masukkan URL atau seed gambar (misal: school-activity)..."
                      className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      if(newImageUrl) {
                        setGalleryImages([newImageUrl, ...galleryImages]);
                        setNewImageUrl("");
                        setIsUploadingMedia(false);
                      }
                    }}
                    className="px-8 py-3 bg-brand-green text-white rounded-xl font-bold transition-all shadow-lg shadow-brand-green/20"
                  >
                    Simpan ke Galeri
                  </button>
                </motion.div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {galleryImages.map((id) => (
                  <motion.div 
                    layout
                    key={id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="aspect-square bg-gray-100 rounded-2xl overflow-hidden group relative border border-gray-200"
                  >
                    <img 
                      src={typeof id === 'string' && id.startsWith('http') ? id : `https://picsum.photos/seed/${id}/400/400`} 
                      alt="Gallery" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button 
                        onClick={() => setGalleryImages(galleryImages.filter(img => img !== id))}
                        className="p-2 bg-white rounded-lg text-red-500 shadow-xl hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "akademik" && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-brand-green/5 border border-brand-green/10 rounded-2xl">
                  <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-1">Total Siswa</p>
                  <p className="text-3xl font-serif font-bold text-brand-green">142</p>
                </div>
                <div className="p-6 bg-brand-green/5 border border-brand-green/10 rounded-2xl">
                  <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-1">Total Guru</p>
                  <p className="text-3xl font-serif font-bold text-brand-green">24</p>
                </div>
                <div className="p-6 bg-brand-green/5 border border-brand-green/10 rounded-2xl">
                  <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-1">Total Kelas</p>
                  <p className="text-3xl font-serif font-bold text-brand-green">9</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-brand-green flex justify-between items-center">
                  Data Tenaga Pendidik
                  <button className="text-sm font-bold text-brand-gold hover:underline">Kelola Semua</button>
                </h3>
                <div className="grid lg:grid-cols-2 gap-4">
                  {mockTeachers.map((teacher, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-bold text-brand-green shadow-sm border border-gray-100">
                        {teacher.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800">{teacher.name}</p>
                        <p className="text-xs text-brand-gold font-bold uppercase">{teacher.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">NIP</p>
                        <p className="text-xs text-gray-500">{teacher.nip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "pengaturan" && (
            <div className="max-w-3xl space-y-8">
              {showSaveMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl flex items-center gap-3 font-medium"
                >
                  <ShieldCheck size={20} /> {successType}
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Konfigurasi Situs</h4>
                  
                  <div className="flex items-center justify-between p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand-gold shadow-sm">
                        <Globe size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">Pendaftaran Online</p>
                        <p className="text-[10px] text-gray-400">Status formulir PPDB.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSettings({ ...settings, registrationOpen: !settings.registrationOpen })}
                      className={`w-10 h-5 rounded-full transition-colors relative ${settings.registrationOpen ? "bg-brand-gold" : "bg-gray-300"}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${settings.registrationOpen ? "left-5.5" : "left-0.5"}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-red-500 shadow-sm">
                        <Power size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">Mode Pemeliharaan</p>
                        <p className="text-[10px] text-gray-400">Akses pengunjung terbatas.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                      className={`w-10 h-5 rounded-full transition-colors relative ${settings.maintenanceMode ? "bg-red-500" : "bg-gray-300"}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${settings.maintenanceMode ? "left-5.5" : "left-0.5"}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand-green shadow-sm">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">Akses Publik</p>
                        <p className="text-[10px] text-gray-400">Log data statistik publik.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSettings({ ...settings, publicAccess: !settings.publicAccess })}
                      className={`w-10 h-5 rounded-full transition-colors relative ${settings.publicAccess ? "bg-brand-green" : "bg-gray-300"}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${settings.publicAccess ? "left-5.5" : "left-0.5"}`} />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Data Akademik</h4>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Tahun Ajaran Aktif</label>
                    <select 
                      value={settings.academicYear}
                      onChange={(e) => setSettings({...settings, academicYear: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                    >
                      <option>2023/2024</option>
                      <option>2024/2025</option>
                      <option>2025/2026</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Semester</label>
                    <div className="flex gap-2">
                      {["Ganjil", "Genap"].map((s) => (
                        <button
                          key={s}
                          onClick={() => setSettings({...settings, semester: s})}
                          className={`flex-1 py-3 rounded-xl font-bold transition-all border ${settings.semester === s ? 'bg-brand-green text-white border-brand-green' : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-brand-gold/5 border border-brand-gold/10 rounded-2xl">
                    <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-2">Pemberitahuan</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Perubahan pada Tahun Ajaran dan Semester akan berdampak pada seluruh laporan nilai dan presensi siswa.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <button 
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="px-8 py-4 bg-brand-green text-white rounded-xl font-bold transition-all shadow-xl w-full flex items-center justify-center gap-2 hover:bg-brand-green/90 disabled:opacity-70"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Simpan Seluruh Pengaturan
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
