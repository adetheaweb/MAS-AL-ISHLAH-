import { motion } from "motion/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate authentication
    setTimeout(() => {
      // Hardcoded credentials for simulation
      if (username === "admin" && password === "admin123") {
        localStorage.setItem("admin_token", "secure_session_token_" + Date.now());
        navigate("/admin");
      } else {
        setError("Nama pengguna atau kata sandi tidak valid.");
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4 font-sans selection:bg-brand-gold/20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-brand-green rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-xl shadow-brand-green/20 relative">
            <ShieldCheck size={40} className="text-white" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-brand-gold rounded-full border-4 border-[#F0F2F5]"
            />
          </div>
          <h1 className="text-3xl font-serif font-bold text-brand-green">Panel Admin</h1>
          <p className="text-gray-400 text-sm mt-3">Silakan login untuk mengelola konten madrasah.</p>
        </div>

        <div className="bg-white rounded-[2rem] p-10 shadow-2xl shadow-black/5 border border-white/50 backdrop-blur-sm relative overflow-hidden group">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-[100px] transition-transform group-hover:scale-110" />

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-red-50 border border-red-100 text-red-500 text-xs font-bold rounded-xl flex items-center gap-2"
              >
                <Lock size={14} /> {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Nama Pengguna</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-gold/10 focus:bg-white transition-all text-sm"
                  placeholder="admin"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-gold/10 focus:bg-white transition-all text-sm"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-gold transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-200 text-brand-gold focus:ring-brand-gold/20" />
                <span className="group-hover:text-brand-green transition-colors">Ingat Saya</span>
              </label>
              <button type="button" className="hover:text-brand-gold transition-colors">Lupa sandi?</button>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-brand-green hover:bg-brand-green/90 text-white rounded-2xl font-bold transition-all shadow-xl shadow-brand-green/20 flex items-center justify-center gap-3 disabled:opacity-70 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Masuk Panel Admin <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-10 text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-loose">
          &copy; 2026 MAS AL-ISHLAH PANUGARAN <br /> 
          Sistem Pengelolaan Informasi Madrasah
        </p>
      </motion.div>
    </div>
  );
}
