import React, { createContext, useContext, useState, useEffect } from "react";
import { NEWS, SCHOOL_INFO } from "../constants";

interface Slider {
  id: number | string;
  title: string;
  subtitle: string;
  image: string;
}

interface AppSettings {
  registrationOpen: boolean;
  maintenanceMode: boolean;
  publicAccess: boolean;
  academicYear: string;
  semester: string;
}

interface AppContextType {
  galleryImages: (number | string)[];
  setGalleryImages: React.Dispatch<React.SetStateAction<(number | string)[]>>;
  sliders: Slider[];
  setSliders: React.Dispatch<React.SetStateAction<Slider[]>>;
  newsList: typeof NEWS;
  setNewsList: React.Dispatch<React.SetStateAction<typeof NEWS>>;
  schoolInfo: typeof SCHOOL_INFO;
  setSchoolInfo: React.Dispatch<React.SetStateAction<typeof SCHOOL_INFO>>;
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initially from localStorage if available
  const [galleryImages, setGalleryImages] = useState<(number | string)[]>(() => {
    const saved = localStorage.getItem("gallery_images");
    return saved ? JSON.parse(saved) : [1, 2, 3, 4, 5, 6, 7, 8];
  });

  const [sliders, setSliders] = useState<Slider[]>(() => {
    const saved = localStorage.getItem("app_sliders");
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "Selamat Datang di MAS AL-ISHLAH", subtitle: "Mewujudkan Generasi Islami, Cerdas, dan Berakhlak Mulia", image: "https://picsum.photos/seed/school1/1920/1080" },
      { id: 2, title: "Pendaftaran Siswa Baru", subtitle: "Tahun Ajaran 2024/2025 Telah Dibuka. Bergabunglah Bersama Kami!", image: "https://picsum.photos/seed/school2/1920/1080" },
    ];
  });

  const [newsList, setNewsList] = useState<typeof NEWS>(() => {
    const saved = localStorage.getItem("news_list");
    return saved ? JSON.parse(saved) : NEWS;
  });

  const [schoolInfo, setSchoolInfo] = useState<typeof SCHOOL_INFO>(() => {
    const saved = localStorage.getItem("school_info");
    return saved ? JSON.parse(saved) : SCHOOL_INFO;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem("app_settings");
    return saved ? JSON.parse(saved) : {
      registrationOpen: true,
      maintenanceMode: false,
      publicAccess: true,
      academicYear: "2024/2025",
      semester: "Genap",
    };
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("gallery_images", JSON.stringify(galleryImages));
  }, [galleryImages]);

  useEffect(() => {
    localStorage.setItem("app_sliders", JSON.stringify(sliders));
  }, [sliders]);

  useEffect(() => {
    localStorage.setItem("news_list", JSON.stringify(newsList));
  }, [newsList]);

  useEffect(() => {
    localStorage.setItem("school_info", JSON.stringify(schoolInfo));
  }, [schoolInfo]);

  useEffect(() => {
    localStorage.setItem("app_settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <AppContext.Provider value={{ 
      galleryImages, setGalleryImages, 
      sliders, setSliders, 
      newsList, setNewsList,
      schoolInfo, setSchoolInfo,
      settings, setSettings
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
};
