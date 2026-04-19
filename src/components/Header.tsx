import { motion } from "motion/react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NAVIGATION } from "../constants";
import { useApp } from "../context/AppContext";

export default function Header() {
  const { schoolInfo } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (href === "/") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      return;
    }

    if (href.startsWith("/#")) {
      const targetId = href.split("#")[1];
      if (location.pathname === "/") {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 80; // Header height
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      } else {
        navigate("/");
        // After navigation, we need to scroll. 
        // We can use a small delay or check in useEffect on Home.
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
          }
        }, 100);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const schoolNameParts = schoolInfo.name.split(" ");
  const schoolShortName = schoolNameParts.slice(0, 2).join(" ");
  const schoolSubName = schoolNameParts.slice(2).join(" ");

  return (
    <header className="fixed w-full z-50 transition-all duration-300">
      {/* Top Bar */}
      <div className={`bg-brand-green text-white py-2 px-4 text-xs hidden md:block transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <Phone size={12} /> {schoolInfo.phone}
            </span>
            <span className="flex items-center gap-2">
              <Mail size={12} /> {schoolInfo.email}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={12} /> {schoolInfo.address.length > 50 ? schoolInfo.address.substring(0, 50) + "..." : schoolInfo.address}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`${isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-xl ring-2 ring-brand-gold">
              {schoolInfo.name.charAt(0)}
            </div>
            <div>
              <h1 className={`font-bold leading-tight ${isScrolled ? 'text-brand-green text-lg' : 'text-brand-green md:text-white text-xl'}`}>
                {schoolShortName}
              </h1>
              <p className={`text-[10px] tracking-widest uppercase ${isScrolled ? 'text-brand-gold' : 'text-brand-gold md:text-brand-cream/80'}`}>
                {schoolSubName}
              </p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {NAVIGATION.map((item, idx) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavItemClick(e, item.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`text-sm font-medium transition-colors hover:text-brand-gold ${isScrolled ? "text-gray-700" : "text-white"}`}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden p-2 rounded-md ${isScrolled ? "text-brand-green" : "text-brand-green"}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white shadow-xl absolute top-full left-0 w-full p-4 flex flex-col gap-4 border-t border-gray-100"
        >
          {NAVIGATION.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavItemClick(e, item.href)}
              className="text-gray-800 text-lg font-medium border-b border-gray-50 pb-2"
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}
