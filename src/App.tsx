import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { 
  Speaker, 
  Battery, 
  Zap, 
  Music, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown, 
  Check, 
  Instagram, 
  Facebook, 
  Youtube,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Truck,
  Clock,
  Package,
  Settings,
  Bluetooth,
  Ruler
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Components ---

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-background/80 backdrop-blur-xl py-4 border-b border-white/10" : "bg-transparent py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group mx-auto md:mx-0">
          <span className="text-3xl font-display font-black tracking-tighter uppercase transition-all group-hover:scale-105">
            <span className="text-secondary neon-text-secondary">ZVUK</span> <span className="text-primary neon-text-primary">NA BATERKY</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/#packages" className="text-sm font-black uppercase tracking-widest hover:text-primary transition-colors">Balíčky</Link>
          <Link to="/#faq" className="text-sm font-black uppercase tracking-widest hover:text-secondary transition-colors">Jak to funguje</Link>
          <Link to="/kontakt" className="text-sm font-black uppercase tracking-widest hover:text-tertiary transition-colors">Kontakt</Link>

          <Link to="/kontakt" className="px-8 py-3 bg-primary text-background font-black rounded-xl uppercase tracking-widest text-xs sonic-glow hover:scale-105 transition-all">
            Rezervovat
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white absolute right-6" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-surface border-b border-white/10 overflow-hidden md:hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              <Link 
                to="/#packages" 
                className="text-sm font-black uppercase tracking-widest py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Balíčky
              </Link>
              <Link 
                to="/#faq" 
                className="text-sm font-black uppercase tracking-widest py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Jak to funguje
              </Link>
              <Link 
                to="/kontakt" 
                className="text-sm font-black uppercase tracking-widest py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Kontakt
              </Link>
              <Link 
                to="/kontakt" 
                className="w-full py-4 bg-primary text-background font-black rounded-2xl text-center uppercase tracking-widest sonic-glow mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Rezervovat
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/input_file_0.png", // Beach party
    "/input_file_1.png", // Speaker detail
    "/input_file_2.png"  // Party night
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden text-center">
      {/* Background Glows - Behind the image (z-0) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[180px] rounded-full z-10" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-secondary/10 blur-[150px] rounded-full z-10" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-6 uppercase bg-clip-text text-transparent neon-text-gradient" style={{backgroundImage: 'linear-gradient(to bottom, #00F5FF 0%, #00F5FF 40%, #7000FF 65%, #FF00F5 100%)'}}>
            Půjč si reproduktor na akci
          </h1>

          <h2 className="text-lg md:text-2xl font-bold text-white mb-8 max-w-2xl normal-case tracking-normal">Vyzvedni, nebo si nech dovést v Praze i středních Čechách.</h2>

          <p className="text-base md:text-lg text-white/60 mb-12 max-w-3xl leading-relaxed font-medium">
            Půjčujeme špičkové bateriové reproduktory JBL a další přední značky. Možnost provozu na baterii či ze sítě. Čistý zvuk, pořádné basy, mikrofony v ceně, prostě to nej pro vaši párty či oslavu.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-20">
            <Link to="/#packages" className="px-12 py-6 bg-primary text-background font-black rounded-2xl uppercase tracking-widest sonic-glow sonic-glow-hover transition-all flex items-center gap-3 text-lg">
              Vybrat balíček <ArrowRight className="w-6 h-6" />
            </Link>
            <Link to="/#calculator" className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-primary font-black rounded-2xl uppercase tracking-widest transition-all text-lg backdrop-blur-sm">
              Kalkulačka ceny
            </Link>
          </div>
        </motion.div>

        {/* Main Speaker Image - Rotating Slideshow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full max-w-4xl z-0"
        >
          <div className="relative aspect-video md:aspect-[21/9] rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl group">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={images[currentImage]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                alt="Pronájem bateriového reproduktoru JBL na párty a oslavu | zvuknabaterky.cz"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-80" />
            <div className="absolute top-4 right-[14%] inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-md z-10">
              <Zap className="w-4 h-4 text-primary neon-icon-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">100% Bezdrátový zvuk</span>
            </div>
          </div>

          {/* Floating elements */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -left-4 md:-left-16 glass-panel p-6 md:p-10 rounded-[2.5rem] sonic-glow z-30"
          >
            <Battery className="w-10 h-10 md:w-14 md:h-14 text-primary neon-icon-primary" />
            <span className="block text-[10px] md:text-xs font-black mt-3 uppercase tracking-widest">18H Hudby</span>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-10 -right-4 md:-right-16 glass-panel p-6 md:p-10 rounded-[2.5rem] magenta-glow z-30"
          >
            <Music className="w-10 h-10 md:w-14 md:h-14 text-secondary neon-icon-secondary" />
            <span className="block text-[10px] md:text-xs font-black mt-3 uppercase tracking-widest">Extra Bass</span>
          </motion.div>

          {/* Additional Floating Element for balance */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 -right-12 md:-right-24 glass-panel p-5 rounded-full border-tertiary/30 z-30 hidden lg:block"
          >
            <Zap className="w-8 h-8 text-tertiary neon-icon-tertiary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const PackageCard: React.FC<{ pkg: any, index: number }> = ({ pkg, index }) => {
  const [days, setDays] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("VYBAVENÍ");
  
  const calculatePrice = () => {
    if (pkg.id === 'mini') {
      if (days === 1) return 700;
      if (days === 2) return 1200;
      return 1200 + (days - 2) * 550;
    }
    if (pkg.id === 'medium') {
      if (days === 1) return 1000;
      if (days === 2) return 1500;
      return 1500 + (days - 2) * 800;
    }
    if (pkg.id === 'big') {
      if (days === 1) return 1200;
      if (days === 2) return 1800;
      return 1800 + (days - 2) * 1000;
    }
    return 0;
  };

  const colorClass = index === 0 ? 'text-primary' : index === 1 ? 'text-secondary' : 'text-tertiary';
  const bgClass = index === 0 ? 'bg-primary' : index === 1 ? 'bg-secondary' : 'bg-tertiary';
  const borderClass = index === 0 ? 'border-primary' : index === 1 ? 'border-secondary' : 'border-tertiary';
  const accentClass = index === 0 ? 'accent-primary' : index === 1 ? 'accent-secondary' : 'accent-tertiary';

  const getSectionIcon = (title: string) => {
    switch(title) {
      case "VYBAVENÍ": return <Package className="w-5 h-5 text-primary neon-icon-primary" />;
      case "TECHNICKÉ PARAMETRY": return <Settings className="w-5 h-5 text-secondary neon-icon-secondary" />;
      case "KONEKTIVITA": return <Bluetooth className="w-5 h-5 text-tertiary neon-icon-tertiary" />;
      case "FYZICKÉ PARAMETRY": return <Ruler className="w-5 h-5 text-white/80" />;
      default: return null;
    }
  };

  const hoverBorderClass = index === 0 ? 'neon-border-primary-hover' : index === 1 ? 'neon-border-secondary-hover-strong' : 'neon-border-tertiary-hover';

  return (
    <motion.div 
      whileHover={{ y: pkg.popular ? -20 : -15 }}
      className={`relative rounded-[3rem] bg-surface border border-white/10 overflow-hidden group transition-all duration-500 ${pkg.popular ? "neon-border-secondary" : ""} ${hoverBorderClass}`}
    >
      {/* Package Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={pkg.image}
          alt={pkg.imageAlt || pkg.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className={`absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent`} />
      </div>

      <div className={`absolute top-0 left-0 w-full h-full bg-linear-to-b ${pkg.color} to-transparent opacity-30 pointer-events-none`} />
      
      {pkg.popular && (
        <div className="absolute top-6 right-6 px-4 py-1.5 bg-secondary text-background text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(255,0,245,0.8)] z-20">
          Nejoblíbenější
        </div>
      )}

      <div className="relative z-10 p-10">
        <h3 className="text-3xl font-black uppercase mb-1">{pkg.name}</h3>
        <p className="text-white/40 text-sm mb-8">{pkg.bestFor}</p>
        
        <div className="mb-6">
          <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-4">
            Počet dní: {days > 10 ? 'Více než 10' : days}
          </label>
          <input 
            type="range" 
            min="1" 
            max="11" 
            value={days} 
            onChange={(e) => setDays(parseInt(e.target.value))}
            className={`w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer ${accentClass}`}
          />
          <div className="flex justify-between mt-2 text-[10px] font-bold text-white/40 uppercase">
            <span>1 den</span>
            <span>10+ dní</span>
          </div>
        </div>

        <div className="flex items-baseline gap-1 mb-10">
          {days > 10 ? (
            <span className={`text-4xl font-black ${colorClass}`}>Individuální</span>
          ) : (
            <>
              <span className={`text-6xl font-black ${colorClass}`}>{calculatePrice()}</span>
              <span className={`font-bold uppercase tracking-widest ${colorClass}`}>Kč / {days} {days === 1 ? 'den' : days >= 2 && days <= 4 ? 'dny' : 'dní'}</span>
            </>
          )}
        </div>

        <div className="space-y-5 mb-10">
          <div className="flex items-center gap-4">
            <Speaker className="w-6 h-6 text-primary neon-icon-primary" />
            <span className="font-bold text-lg">{pkg.speakers}</span>
          </div>
          <div className="flex items-center gap-4">
            <Zap className="w-6 h-6 text-secondary neon-icon-secondary" />
            <span className="font-bold text-lg">Celkový výkon {pkg.power}</span>
          </div>
        </div>

        <ul className="space-y-4 mb-12">
          {pkg.features.map((feat: string, idx: number) => (
            <li key={feat} className="flex items-center gap-3 text-sm text-white/60">
              <Check className={`w-5 h-5 ${idx % 3 === 0 ? 'text-primary neon-icon-primary' : idx % 3 === 1 ? 'text-secondary neon-icon-secondary' : 'text-tertiary neon-icon-tertiary'}`} />
              {feat}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3">
          {days > 10 ? (
            <button onClick={() => setShowReservation(true)} className={`block w-full py-5 ${bgClass} text-background transition-all duration-300 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] rounded-2xl text-center font-black uppercase tracking-widest`}>
              KONTAKTUJTE NÁS
            </button>
          ) : (
            <button onClick={() => setShowReservation(true)} className={`block w-full py-5 ${bgClass} text-background transition-all duration-300 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] rounded-2xl text-center font-black uppercase tracking-widest`}>
              REZERVOVAT
            </button>
          )}
          <button 
            onClick={() => setShowDetails(true)}
            className={`block w-full py-5 bg-transparent border ${borderClass} ${colorClass} transition-all duration-300 hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98] rounded-2xl text-center font-black uppercase tracking-widest`}
          >
            DETAIL BALÍČKU
          </button>
        </div>
      </div>

      {/* Reservation Overlay */}
      <AnimatePresence>
        {showReservation && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 bg-surface/95 backdrop-blur-xl z-50 flex flex-col rounded-[3rem] overflow-hidden"
          >
            <div className="p-8 flex justify-between items-center border-b border-white/10">
              <h4 className="font-black uppercase text-2xl">Rezervace</h4>
              <button 
                onClick={() => setShowReservation(false)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
              <ContactForm prefilledPackage={pkg.id === "mini" ? "Mini" : pkg.id === "medium" ? "Medium" : "Big"} prefilledDays={days.toString()} prefilledPrice={days > 10 ? 'CENA NA VYŽÁDÁNÍ' : calculatePrice().toString()} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Overlay */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 bg-surface/95 backdrop-blur-xl z-50 flex flex-col rounded-[3rem] overflow-hidden"
          >
            <div className="p-8 flex justify-between items-center border-b border-white/10">
              <h4 className="font-black uppercase text-2xl">Detail balíčku</h4>
              <button 
                onClick={() => setShowDetails(false)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
              {pkg.details?.map((section: any) => (
                <div key={section.title} className="mb-4 border border-white/10 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenSection(openSection === section.title ? null : section.title)}
                    className="w-full flex justify-between items-center p-4 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getSectionIcon(section.title)}
                      <span className="font-bold uppercase tracking-wider text-sm">{section.title}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openSection === section.title ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openSection === section.title && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-black/20"
                      >
                        <div className="p-4 space-y-3">
                          {section.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-start gap-4 text-sm">
                              <span className="text-white/50">{item.label}:</span>
                              <span className="text-right font-medium">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Packages = () => {
  const packages = [
    {
      id: "mini",
      name: "Mini Balíček",
      price: 1000,
      speakers: "1x Lamax BoomBox 500",
      power: "100W",
      bestFor: "Menší oslavy do 50 lidí",
      features: ["Bluetooth 5.0", "IPX4 Voděodolnost", "LED Světelné efekty", "Drátový mikrofon", "DPD doručení 500 Kč / Odvoz 750 Kč"],
      color: "from-primary/20",
      image: "/lamax.jpeg",
      imageAlt: "Mini Balíček – Lamax BoomBox 500 | zvuknabaterky.cz",
      details: [
        {
          title: "VYBAVENÍ",
          items: [
            { label: "Ovládání", value: "na přístroji" },
            { label: "Mikrofon", value: "Drátový" },
            { label: "Párty", value: "Ano - LED světla" },
            { label: "FM Tuner", value: "Ano" },
            { label: "Outdoorový", value: "Ano" }
          ]
        },
        {
          title: "TECHNICKÉ PARAMETRY",
          items: [
            { label: "Napájení", value: "Ze sítě / bateriová" },
            { label: "Mikrofon", value: "Drátový - 1 kus" },
            { label: "Voděodolný", value: "Ano - proti postříkání" }
          ]
        },
        {
          title: "KONEKTIVITA",
          items: [
            { label: "Rozhraní", value: "6.3mm, RCA in, USB host" },
            { label: "Bluetooth", value: "Ano 5.0" },
            { label: "Bezdrátové připojení", value: "Bluetooth" },
            { label: "Slot pro paměťovou kartu", value: "Ano" }
          ]
        },
        {
          title: "FYZICKÉ PARAMETRY",
          items: [
            { label: "Šířka [mm]", value: "312" },
            { label: "Výška [mm]", value: "590" },
            { label: "Hloubka [mm]", value: "377" },
            { label: "Hmotnost [kg]", value: "11,2" }
          ]
        }
      ]
    },
    {
      id: "medium",
      name: "Medium Balíček",
      price: 1500,
      speakers: "1x JBL PartyBox 120",
      power: "160W",
      bestFor: "Střední akce 100 lidí",
      features: ["Auracast propojení reproduktorů", "IPX4 Voděodolnost", "Bluetooth 5.4", "Bezdrátový mikrofon", "DPD doručení 500 Kč / Odvoz 750 Kč"],
      color: "from-secondary/20",
      popular: true,
      image: "/input_file_0.png",
      imageAlt: "Medium Balíček – JBL PartyBox 120 | zvuknabaterky.cz",
      details: [
        {
          title: "VYBAVENÍ",
          items: [
            { label: "Ovládání", value: "na přístroji / dálkové bluetooth / Android, iOS" },
            { label: "Mikrofon", value: "Bezdrátový" },
            { label: "Párty", value: "Ano - LED světla" },
            { label: "FM Tuner", value: "Ne" },
            { label: "Outdoorový", value: "Ano" }
          ]
        },
        {
          title: "TECHNICKÉ PARAMETRY",
          items: [
            { label: "Napájení", value: "Ze sítě / bateriová" },
            { label: "Mikrofon", value: "Bezdrátový - 2 kusy" },
            { label: "Voděodolný", value: "Ano - proti postříkání" }
          ]
        },
        {
          title: "KONEKTIVITA",
          items: [
            { label: "Rozhraní", value: "6.3mm, RCA in, USB host" },
            { label: "Bluetooth", value: "Ano 5.4" },
            { label: "Bezdrátové připojení", value: "Bluetooth" },
            { label: "USB slot", value: "Ano" },
            { label: "AUX vstup", value: "250 mV RMS (3,5 mm konektor)" },
            { label: "Vstup mikrofonu", value: "20 mV RMS" },
            { label: "Vstup pro kytaru", value: "100 mV RMS" },
            { label: "Podporované kodeky", value: "FLAC, MP3" }
          ]
        },
        {
          title: "FYZICKÉ PARAMETRY",
          items: [
            { label: "Šířka [mm]", value: "288" },
            { label: "Výška [mm]", value: "570" },
            { label: "Hloubka [mm]", value: "297" },
            { label: "Hmotnost [kg]", value: "11" }
          ]
        }
      ]
    },
    {
      id: "big",
      name: "Big Balíček",
      price: 2000,
      speakers: "1x JBL PartyBox 320",
      power: "240W",
      bestFor: "Větší akce, párty a svadby.",
      features: ["Auracast propojení reproduktorů", "IPX4 Voděodolnost", "Bluetooth 5.4", "Bezdrátový mikrofon", "DPD doručení 500 Kč / Odvoz 750 Kč"],
      color: "from-tertiary/20",
      image: "/input_file_1.png",
      imageAlt: "Big Balíček – JBL PartyBox 320 | zvuknabaterky.cz",
      details: [
        {
          title: "VYBAVENÍ",
          items: [
            { label: "Ovládání", value: "na přístroji / dálkové bluetooth / Android, iOS" },
            { label: "Mikrofon", value: "Bezdrátový" },
            { label: "Párty", value: "Ano - LED světla" },
            { label: "FM Tuner", value: "Ne" },
            { label: "Outdoorový", value: "Ano" }
          ]
        },
        {
          title: "TECHNICKÉ PARAMETRY",
          items: [
            { label: "Napájení", value: "Ze sítě / bateriová" },
            { label: "Mikrofon", value: "Bezdrátový - 2 kusy" },
            { label: "Voděodolný", value: "Ano - proti postříkání" }
          ]
        },
        {
          title: "KONEKTIVITA",
          items: [
            { label: "Rozhraní", value: "6.3mm, RCA in, USB host" },
            { label: "Bluetooth", value: "Ano 5.4" },
            { label: "Bezdrátové připojení", value: "Bluetooth" },
            { label: "USB slot", value: "Ano" },
            { label: "AUX vstup", value: "250 mV RMS (3,5 mm konektor)" },
            { label: "Vstup mikrofonu", value: "20 mV RMS" },
            { label: "Vstup pro kytaru", value: "100 mV RMS" },
            { label: "Podporované kodeky", value: "FLAC, MP3" }
          ]
        },
        {
          title: "FYZICKÉ PARAMETRY",
          items: [
            { label: "Šířka [mm]", value: "335" },
            { label: "Výška [mm]", value: "669" },
            { label: "Hloubka [mm]", value: "385" },
            { label: "Hmotnost [kg]", value: "16,5" }
          ]
        }
      ]
    }
  ];

  return (
    <section id="packages" className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">VYLADĚNÉ <span className="text-gradient-sonic neon-text-gradient">BALÍČKY</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">Vyberte si reproduktor k zapůjčení dle výkonu. Všechny balíčky obsahují reproduktor, mikrofon/y a kabeláž. Kombinace reproduktorů je možná v konfigurátoru níže.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Calculator = () => {
  const [days, setDays] = useState(1);
  const [packageType, setPackageType] = useState("medium");
  const [delivery, setDelivery] = useState<"none" | "dpd" | "personal">("none");
  const [showForm, setShowForm] = useState(false);

  const getPackageColors = (type: string) => {
    switch(type) {
      case 'mini': return { text: 'text-primary', bg: 'bg-primary', border: 'border-primary', accent: 'accent-primary', icon: 'neon-icon-primary', glow: 'sonic-glow', hover: 'hover:border-primary', bgOpacity: 'bg-primary/5', borderOpacity: 'border-primary/20' };
      case 'medium': return { text: 'text-secondary', bg: 'bg-secondary', border: 'border-secondary', accent: 'accent-secondary', icon: 'neon-icon-secondary', glow: 'magenta-glow', hover: 'hover:border-secondary', bgOpacity: 'bg-secondary/5', borderOpacity: 'border-secondary/20' };
      case 'big': return { text: 'text-tertiary', bg: 'bg-tertiary', border: 'border-tertiary', accent: 'accent-tertiary', icon: 'neon-icon-tertiary', glow: 'shadow-[0_0_20px_rgba(112,0,255,0.4)]', hover: 'hover:border-tertiary', bgOpacity: 'bg-tertiary/5', borderOpacity: 'border-tertiary/20' };
      case 'combo': return { text: 'text-white', bg: 'bg-white', border: 'border-white', accent: 'accent-white', icon: '', glow: 'shadow-[0_0_20px_rgba(255,255,255,0.4)]', hover: 'hover:border-white', bgOpacity: 'bg-white/5', borderOpacity: 'border-white/20' };
      default: return { text: 'text-primary', bg: 'bg-primary', border: 'border-primary', accent: 'accent-primary', icon: 'neon-icon-primary', glow: 'sonic-glow', hover: 'hover:border-primary', bgOpacity: 'bg-primary/5', borderOpacity: 'border-primary/20' };
    }
  };

  const calculateTotal = () => {
    if (packageType === "combo") return "CENA NA VYŽÁDÁNÍ";
    let base = 0;
    if (packageType === "mini") {
      base = days === 1 ? 700 : days === 2 ? 1200 : 1200 + (days - 2) * 550;
    } else if (packageType === "medium") {
      base = days === 1 ? 1000 : days === 2 ? 1500 : 1500 + (days - 2) * 800;
    } else if (packageType === "big") {
      base = days === 1 ? 1200 : days === 2 ? 1800 : 1800 + (days - 2) * 1000;
    }
    if (delivery === "dpd") base += 500;
    if (delivery === "personal") base += 750;
    return base;
  };

  const colors = getPackageColors(packageType);

  return (
    <section id="calculator" className="py-24 relative overflow-hidden">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] ${colors.bgOpacity} blur-[150px] rounded-full transition-colors duration-500`} />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="glass-panel p-12 rounded-[3rem] relative overflow-hidden">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase mb-4">Kalkulačka <span className={`text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary ${colors.icon}`}>ceny</span></h2>
            <p className="text-white/60">Spočítejte si přesnou cenu pronájmu včetně slev za delší výpůjčku.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-4">Vyberte balíček</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["mini", "medium", "big", "combo"].map((type) => {
                    const typeColors = getPackageColors(type);
                    const isSelected = packageType === type;
                    const isGrayedOut = packageType === "combo" && (type === "medium" || type === "big");
                    
                    return (
                      <button
                        key={type}
                        onClick={() => setPackageType(type)}
                        className={`py-3 rounded-xl border font-bold uppercase text-xs transition-all ${isSelected ? `${typeColors.bg} text-background ${typeColors.border}` : isGrayedOut ? 'bg-white/5 border-white/5 text-white/20' : `bg-white/5 border-white/10 ${typeColors.text} ${typeColors.hover}`}`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-4">Počet dní: {days}</label>
                <input 
                  type="range" 
                  min="1" 
                  max="14" 
                  value={days} 
                  onChange={(e) => setDays(parseInt(e.target.value))}
                  className={`w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer ${colors.accent} transition-colors`}
                />
                <div className="flex justify-between mt-2 text-[10px] font-bold text-white/40 uppercase">
                  <span>1 den</span>
                  <span>14 dní</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-4">Doprava</label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { value: "none", label: "Vlastní", sublabel: "Zdarma" },
                    { value: "dpd", label: "DPD", sublabel: "500 Kč" },
                    { value: "personal", label: "Odvoz", sublabel: "750 Kč" }
                  ] as const).map(({ value, label, sublabel }) => (
                    <button
                      key={value}
                      onClick={() => setDelivery(value)}
                      className={`py-3 px-2 rounded-xl border font-bold text-xs transition-all flex flex-col items-center gap-1 ${delivery === value ? `${colors.bg} text-background ${colors.border}` : `bg-white/5 border-white/10 text-white/70 hover:border-white/30`}`}
                    >
                      <span className="uppercase">{label}</span>
                      <span className={`text-[10px] font-normal ${delivery === value ? "opacity-70" : "text-white/40"}`}>{sublabel}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`flex flex-col justify-center items-center p-8 rounded-3xl ${colors.bgOpacity} border ${colors.borderOpacity} text-center transition-colors duration-500`}>
              <span className={`text-xs font-black uppercase tracking-[0.2em] ${colors.text} mb-2 transition-colors`}>Celková cena</span>
              <div className="flex items-baseline gap-2 mb-4">
                <span className={`font-black tracking-tighter ${packageType === 'combo' ? 'text-3xl md:text-4xl' : 'text-7xl'}`}>{calculateTotal()}</span>
                {packageType !== 'combo' && <span className={`text-2xl font-bold ${colors.text} transition-colors`}>Kč</span>}
              </div>
              <p className="text-xs text-white/40 uppercase font-bold mb-8">
                {packageType === 'combo' ? "Cena za spojení Medium a Big" : "Celková cena · s DPH"}
              </p>
              <button onClick={() => setShowForm(true)} className={`w-full py-4 ${colors.bg} text-background font-black rounded-2xl uppercase tracking-widest ${colors.glow} hover:scale-105 transition-all`}>
                Poptat termín
              </button>
            </div>
          </div>

          {/* Form Overlay */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute inset-0 bg-surface/95 backdrop-blur-xl z-50 flex flex-col rounded-[3rem] overflow-hidden"
              >
                <div className="p-8 flex justify-between items-center border-b border-white/10">
                  <h4 className="font-black uppercase text-2xl">Poptat termín</h4>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                  <ContactForm
                    prefilledPackage={packageType === 'mini' ? 'Mini' : packageType === 'medium' ? 'Medium' : packageType === 'big' ? 'Big' : ''}
                    prefilledDays={days.toString()}
                    prefilledDelivery={delivery}
                    prefilledPrice={packageType === 'combo' ? 'CENA NA VYŽÁDÁNÍ' : calculateTotal().toString()}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Calendar className="w-10 h-10" />,
      title: "DOBA ZÁPŮJČKY",
      desc: "Půjčujeme od 1 do 30-ti dnů, nebo dle dohody.",
      color: "text-primary neon-icon-primary"
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: "KAUCE",
      desc: "Kauce je dle typu reproduktoru a doby po kterou jej chcete využívat.",
      color: "text-secondary neon-icon-secondary"
    },
    {
      icon: <MapPin className="w-10 h-10" />,
      title: "MÍSTO VYZVEDNUTÍ",
      desc: (
        <>
          Po osobní domluvě na adrese:{" "}
          <a 
            href="https://maps.google.com/?q=Na+Vyhlídce+285,+Tehov+25101" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-primary transition-colors underline underline-offset-4"
          >
            Na Vyhlídce 285, Tehov 25101
          </a>
        </>
      ),
      color: "text-tertiary neon-icon-tertiary"
    }
  ];

  return (
    <section id="features" className="py-24 bg-surface/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">PODMÍNKY <span className="text-gradient-sonic neon-text-gradient">ZÁPŮJČKY</span></h2>
          <div className="text-white/60 max-w-3xl mx-auto text-lg">
            <p>
              Ozvučení je možné vyzvednout v Tehově u Říčan při složení kauce, předložení osobního dokladu a podepsání předávacího prokokolu. Ozvučení je možné za poplatek odvést k vám, vyzkoušet a následně vyzvednout / přivést nazpět. (platí pro Střední čechy). Naše ozvučení vám je k dispozici po celou dobu zápůjčky a očekáváme jeho vrácení v původním stavu.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-all duration-500 ${f.color}`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-black uppercase mb-3 tracking-tight">{f.title}</h3>
              <div className="text-white/50 leading-relaxed">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "JAK PROBÍHÁ OBJEDNÁNÍ?",
      a: (
        <ul className="space-y-2 list-disc pl-5 marker:text-secondary">
          <li>Nezávazná poptávka a konzultace termínu</li>
          <li>Návrh vhodné varianty pokud sami nevíte</li>
          <li>Domluvení předání a vrácení</li>
          <li>Výpočet ceny pokud je nutné započítat dopravu</li>
        </ul>
      )
    },
    {
      q: "CO SE DĚJE BĚHEM PŘEDÁNÍ?",
      a: (
        <div className="space-y-4">
          <p>Během předání reproduktorů či mikrofonů, dojde k ověření totožnosti, sepsání předávacího protokolu a otestování reproduktorů i mikrofonů.</p>
          <p>Samozřejmě je možné i menší zaškolení, ale obsluha je opravdu jednoduchá.</p>
        </div>
      )
    },
    {
      q: "JAK VELKÝ PROSTOR OZVUČÍM?",
      a: (
        <div className="space-y-4">
          <p>Čím větší a členitější prostor tím náročnější na ozvučení. Budeme soudní a akce typu festival, či event pro 2000 lidí s našimi reproduktory těžko nazvučíte.</p>
          <p>U akcí v uzavřeném prostoru postačí i střední varianta klasický kulturák či tělocvična, ale počítejte s umístěním tak, aby nedocházelo k ozvěně. Není zde problém s jakýmkoliv z našich řešení.</p>
          <p>U venkovních akcí je reproduktor vhodný pro akce do 500-1000 lidí na menším prostoru typu náves, pláž, parkoviště. Větší akce si již zaslouží profesionální velkou techniku.</p>
        </div>
      )
    },
    {
      q: "CO KDYŽ REPRODUKTOR PŘESTANE FUNGOVAT?",
      a: (
        <div className="space-y-4">
          <p>Pokud máme reproduktor k dispozici rádi vám jej vyměníme, nebo vás telefonicky provedeme vyřešením poruchy. Často je to drobnost.</p>
          <p>V případě, že nejsme schopni situaci vyřešit vracíme peníze.</p>
          <p>Pokud došlo k poškození na vaší straně, bude nutné uhradit cenu zničeného zařízení (vytopení, pád, krádež, ...).</p>
        </div>
      )
    },
    {
      q: "ZAJIŠŤUJETE I MODEROVÁNÍ?",
      a: (
        <div className="space-y-4">
          <p>Ano jsme schopni moderovat menší akce, nebo doporučit některého z našich kamarádů moderátorů.</p>
          <p>My zvládneme kratší program, ale kluci jsou lepší a na větší akce se hodí více.</p>
        </div>
      )
    }
  ];

  const getArrowColorClass = (index: number) => {
    if (index % 4 === 0) return "text-secondary";
    if (index % 4 === 1) return "text-tertiary";
    if (index % 4 === 2) return "text-primary";
    return "text-white";
  };

  return (
    <section id="faq" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-5xl md:text-7xl font-black uppercase text-center mb-20 tracking-tighter">Časté <span className="text-gradient-sonic neon-text-gradient">dotazy</span></h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`border border-white/10 rounded-[2rem] overflow-hidden bg-surface/30 transition-all duration-300 ${
                i % 4 === 0 ? "faq-border-magenta" : 
                i % 4 === 1 ? "faq-border-purple" : 
                i % 4 === 2 ? "faq-border-cyan" : "faq-border-white"
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-black uppercase tracking-tight">{faq.q}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${getArrowColorClass(i)} ${openIndex === i ? "bg-white/20 rotate-180 scale-110 shadow-[0_0_15px_rgba(255,255,255,0.1)]" : "bg-white/5"}`}>
                  <ChevronDown className={`w-6 h-6 transition-all duration-300 ${openIndex === i ? "stroke-[3px]" : "stroke-2"}`} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 pt-0 text-white/60 text-lg leading-relaxed border-t border-white/5 mt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = ({ prefilledPackage = "", prefilledDays = "1", prefilledDelivery = "none", prefilledPrice = "" }: { prefilledPackage?: string, prefilledDays?: string, prefilledDelivery?: "none" | "dpd" | "personal", prefilledPrice?: string }) => {
  const location = useLocation();
  const state = location.state as any;

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    packageType: state?.packageType || prefilledPackage,
    days: state?.days?.toString() || prefilledDays,
    delivery: (state?.delivery ?? prefilledDelivery) as "none" | "dpd" | "personal",
    price: prefilledPrice,
    message: ""
  });

  const calculateFormPrice = () => {
    const days = parseInt(formData.days) || 1;
    const pkg = formData.packageType?.toLowerCase();
    if (!pkg || pkg === 'nevím / poradit' || pkg === '') return 'CENA NA VYŽÁDÁNÍ';
    let base = 0;
    if (pkg === 'mini') {
      base = days === 1 ? 700 : days === 2 ? 1200 : 1200 + (days - 2) * 550;
    } else if (pkg === 'medium') {
      base = days === 1 ? 1000 : days === 2 ? 1500 : 1500 + (days - 2) * 800;
    } else if (pkg === 'big') {
      base = days === 1 ? 1200 : days === 2 ? 1800 : 1800 + (days - 2) * 1000;
    } else {
      return 'CENA NA VYŽÁDÁNÍ';
    }
    if (formData.delivery === 'dpd') base += 500;
    if (formData.delivery === 'personal') base += 750;
    return `${base} Kč s DPH`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, price: calculateFormPrice() })
      });
      
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", packageType: "", days: "1", delivery: "none", price: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary neon-icon-primary mb-4">
          <Check className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-black uppercase">Odesláno!</h3>
        <p className="text-white/60">Děkujeme za zprávu, brzy se vám ozveme na zadaný e-mail.</p>
        <button onClick={() => setStatus("idle")} className="mt-8 text-sm font-bold uppercase tracking-widest text-primary hover:text-white transition-colors">
          Odeslat další zprávu
        </button>
      </div>
    );
  }

  const deliveryLabel = formData.delivery === 'dpd' ? 'DPD doručení — 500 Kč' : formData.delivery === 'personal' ? 'Odvoz na místo — 750 Kč' : 'Vlastní odběr — zdarma';
  const priceDisplay = formData.packageType ? calculateFormPrice() : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {priceDisplay && (
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <p className="text-xs font-black uppercase tracking-widest text-white/40">Vaše konfigurace</p>
          <div className="flex flex-col gap-2 text-sm">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {formData.packageType && (
                <div className="flex justify-between gap-2">
                  <span className="text-white/40">Balíček</span>
                  <span className="font-bold">{formData.packageType}</span>
                </div>
              )}
              <div className="flex justify-between gap-2">
                <span className="text-white/40">Počet dní</span>
                <span className="font-bold">{formData.days}</span>
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-white/40">Doprava</span>
              <span className="font-bold">{deliveryLabel}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-white/40">Odh. cena s DPH</span>
              <span className="font-bold text-primary">{priceDisplay}</span>
            </div>
          </div>
        </div>
      )}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Jméno *</label>
          <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-hidden transition-all" placeholder="Jan Novák" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Email *</label>
          <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-hidden transition-all" placeholder="jan@email.cz" />
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Telefon</label>
          <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-hidden transition-all" placeholder="+420 123 456 789" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Balíček</label>
          <select value={formData.packageType} onChange={e => setFormData({...formData, packageType: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-hidden transition-all appearance-none text-white">
            <option value="" className="bg-background text-white">Nevím / Poradit</option>
            <option value="Mini" className="bg-background text-white">Mini Balíček</option>
            <option value="Medium" className="bg-background text-white">Medium Balíček</option>
            <option value="Big" className="bg-background text-white">Big Balíček</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Počet dní</label>
          <input type="number" min="1" value={formData.days} onChange={e => setFormData({...formData, days: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-hidden transition-all" />
        </div>
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Doprava</label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-6 h-6 rounded border flex items-center justify-center transition-all shrink-0 ${formData.delivery === 'dpd' ? 'bg-primary border-primary text-background' : 'border-white/20 group-hover:border-white/40'}`}>
              {formData.delivery === 'dpd' && <Check className="w-4 h-4" />}
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">DPD doručení — 500 Kč</span>
            <input type="checkbox" className="hidden" checked={formData.delivery === 'dpd'} onChange={e => setFormData({...formData, delivery: e.target.checked ? 'dpd' : 'none'})} />
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-6 h-6 rounded border flex items-center justify-center transition-all shrink-0 ${formData.delivery === 'personal' ? 'bg-primary border-primary text-background' : 'border-white/20 group-hover:border-white/40'}`}>
              {formData.delivery === 'personal' && <Check className="w-4 h-4" />}
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">Odvoz na místo — 750 Kč</span>
            <input type="checkbox" className="hidden" checked={formData.delivery === 'personal'} onChange={e => setFormData({...formData, delivery: e.target.checked ? 'personal' : 'none'})} />
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Zpráva</label>
        <textarea rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-hidden transition-all resize-none" placeholder="Váš dotaz, termín akce, místo..."></textarea>
      </div>

      {status === "error" && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
          Omlouváme se, ale při odesílání došlo k chybě. Zkuste to prosím znovu nebo nás kontaktujte napřímo.
        </div>
      )}

      <button disabled={status === "submitting"} type="submit" className="w-full py-5 bg-primary text-background font-black rounded-2xl uppercase tracking-widest sonic-glow sonic-glow-hover transition-all disabled:opacity-50">
        {status === "submitting" ? "Odesílám..." : "Odeslat zprávu"}
      </button>
    </form>
  );
};

const ContactPage = () => {
  return (
    <div className="pt-40 pb-24 min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 text-center">
          <span className="text-gradient-sonic neon-text-gradient">Kontakt</span>
        </h1>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black uppercase mb-8">Kontaktní údaje</h2>
              <div className="space-y-8 text-lg text-white/80">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all text-primary neon-icon-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs font-black uppercase text-white/40 mb-1">Adresa</span>
                    <p className="font-bold">Vlastislav Kabeláč Čiháček<br/>Na Vyhlídce 285, Tehov 25101</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-secondary/20 transition-all text-secondary neon-icon-secondary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs font-black uppercase text-white/40 mb-1">Telefon</span>
                    <a href="tel:+420608959098" className="text-2xl font-bold hover:text-secondary transition-colors">+420 608 959 098</a>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-tertiary/20 transition-all text-tertiary neon-icon-tertiary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs font-black uppercase text-white/40 mb-1">Email</span>
                    <a href="mailto:cihi@trialshow.cz" className="text-xl font-bold hover:text-tertiary transition-colors">cihi@trialshow.cz</a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-black uppercase mb-8">Fakturační údaje</h2>
              <div className="space-y-4 text-white/80 glass-panel p-8 rounded-[2rem]">
                <p><span className="text-white/50 uppercase text-xs font-bold tracking-widest block mb-1">Identifikační číslo (IČO)</span> 69181888</p>
                <p><span className="text-white/50 uppercase text-xs font-bold tracking-widest block mb-1">DIČ</span> CZ8001030092</p>
                <p><span className="text-white/50 uppercase text-xs font-bold tracking-widest block mb-1">Bankovní spojení</span> 1002003007/0300</p>
                <div className="pt-6 mt-6 border-t border-white/10 space-y-2 text-sm text-white/60">
                  <p className="font-bold text-primary">Plátce DPH</p>
                  <p>Fyzická osoba podnikající dle živnostenského zákona nezapsaná v obchodním rejstříku</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-panel p-10 rounded-[3rem] h-fit">
            <h3 className="text-2xl font-black uppercase mb-8">Napište nám</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl font-display font-black tracking-tighter uppercase transition-all">
              <span className="text-secondary neon-text-secondary">ZVUK</span> <span className="text-primary neon-text-primary">NA BATERKY</span>
            </span>
          </Link>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-8">
              <a href="https://www.instagram.com/cihitrialshow/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors"><Instagram /></a>
              <a href="https://www.facebook.com/trialshow.cz/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors"><Facebook /></a>
              <a href="https://www.youtube.com/BikeSkillsTrialshow" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors"><Youtube /></a>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-[10px] font-bold uppercase tracking-[0.1em] text-white/40">
              <a href="https://trialshow.cz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Exhibice na kolech Trialshow</a>
              <a href="https://bikeskills.cz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Škola MTB Bikeskills</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
          <span>© 2026 Zvuk na baterky. Všechna práva vyhrazena.</span>
          <div className="flex gap-6">
            <Link to="/obchodni-podminky" className="hover:text-white transition-colors">Obchodní podmínky</Link>
            <Link to="/ochrana-osobnich-udaju" className="hover:text-white transition-colors">Ochrana údajů</Link>
            <button onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))} className="hover:text-white transition-colors">NASTAVENÍ COOKIES</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className="pt-40 pb-24 min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">
          <span className="text-gradient-sonic neon-text-gradient">Zásady ochrany osobních údajů</span>
        </h1>
        <div className="space-y-6 text-white/80 leading-relaxed">
          <p>Správcem osobních údajů podle čl. 4 bod 7 nařízení Evropského parlamentu a Rady (EU) 2016/679 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů a o volném pohybu těchto údajů (dále jen: „GDPR”) je Vlastislav Kabeláč Čiháček, IČ: 69181888 se sídlem: Na Vyhlídce 285, Tehov 251 01, Česká republika (dále jen: „správce“).</p>
          <p>Kontaktní údaje správce jsou:</p>
          <p>adresa: Na Vyhlídce 285, Tehov 251 01<br/>email: cihi@trialshow.cz<br/>telefon: +420 608 959 098</p>
          <p>Osobními údaji se rozumí veškeré informace o identifikované nebo identifikovatelné fyzické osobě; identifikovatelnou fyzickou osobou je fyzická osoba, kterou lze přímo či nepřímo identifikovat, zejména odkazem na určitý identifikátor, například jméno, identifikační číslo, lokační údaje, síťový identifikátor nebo na jeden či více zvláštních prvků fyzické, fyziologické, genetické, psychické, ekonomické, kulturní nebo společenské identity této fyzické osoby.</p>
          <p>Správce nejmenoval pověřence pro ochranu osobních údajů.</p>
          <p>Správce zpracovává osobní údaje, které jste mu poskytl/a nebo osobní údaje, které správce získal na základě plnění Vaší objednávky. Správce zpracovává Vaše identifikační a kontaktní údaje a údaje nezbytné pro plnění smlouvy. Správce dále zpracovává soubory cookies, které jsou zde užity za účelem:</p>
          <p>Sběr cookies za účelem uvedeným výše může být považováno za zpracování osobních údajů. Takové zpracování je možné na základě zákonného důvodu – oprávněného zájmu správce, a umožňuje ho čl. 6 odst. 1 písm. f) Nařízení.</p>
          <p>Webové stránky lze používat i v režimu, který neumožňuje sbírání údajů o chování návštěvníků webu – tento režim je možný buďto nastavit v rámci nastavení prohlížeče, nebo je možné vznést proti takovému sběru na základě oprávněného zájmu správce námitku dle čl. 21 Nařízení, která je dostupná v dolní části webových stránek. Vaše námitka bude vyhodnocena bezodkladně. Cookies nezbytné pro funkčnost webu budou uchovány pouze po dobu nezbytně nutnou pro fungování webu.</p>
          <p>Vznese-li návštěvník námitku proti zpracování technických cookies nezbytných pro fungování webových stránek, nelze v takovém případě zaručit plnou funkčnost a kompatibilitu webových stránek.</p>
          <p>Cookies, které jsou sbírány za účelem měření návštěvnosti webu a vytváření statistik týkající se návštěvnosti a chování návštěvníků na webu, jsou posuzovány v podobě hromadného celku a v anonymní podobě, která neumožňuje identifikaci jednotlivce.</p>
          <p>Ze strany správce nedochází k automatickému individuálnímu rozhodování ve smyslu čl. 22 GDPR.</p>
          <p>Po uplynutí doby uchovávání osobních údajů správce osobní údaje vymaže.</p>
          <p>Dále máte právo podat stížnost u Úřadu pro ochranu osobních údajů v případě, že se domníváte, že bylo porušeno Vaší právo na ochranu osobních údajů.</p>
          <p>Správce prohlašuje, že přijal veškerá vhodná technická a organizační opatření k zabezpečení osobních údajů.</p>
          <p>Správce přijal technická opatření k zabezpečení datových úložišť a úložišť osobních údajů v listinné podobě, zejména šifrováním dat, zálohováním, bezpečnostními hesly, fyzickými zámky</p>
          <p>Správce prohlašuje, že k osobním údajům mají přístup pouze jím pověřené osoby.</p>
          <p>Odesláním objednávky z internetového objednávkového formuláře potvrzujete, že jste seznámen/a s podmínkami ochrany osobních údajů a že je v celém rozsahu přijímáte.</p>
          <p>Správce je oprávněn tyto podmínky změnit. Novou verzi podmínek ochrany osobních údajů zveřejní na svých internetových stránkách a zároveň Vám zašle novou verzi těchto podmínek Vaši e-mailovou adresu, kterou jste správci poskytl/a.</p>
        </div>
      </div>
    </div>
  );
};

const TermsOfService = () => {
  return (
    <div className="pt-40 pb-24 min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">
          <span className="text-gradient-sonic neon-text-gradient">Obchodní podmínky</span>
        </h1>
        <div className="aspect-[1/1.4] w-full bg-white/5 rounded-2xl overflow-hidden border border-white/10">
          <iframe 
            src="/obchodni-podminky.pdf" 
            className="w-full h-full"
            title="Obchodní podmínky"
          />
        </div>
      </div>
    </div>
  );
};

// --- Cookie Banner ---

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  const loadTrackingScripts = () => {
    if (!document.getElementById('ga-script')) {
      const s = document.createElement('script');
      s.id = 'ga-script';
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=G-6FQ18MF726';
      document.head.appendChild(s);
      const i = document.createElement('script');
      i.id = 'ga-init';
      i.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-6FQ18MF726');`;
      document.head.appendChild(i);
    }
    if (!document.getElementById('meta-pixel')) {
      const p = document.createElement('script');
      p.id = 'meta-pixel';
      p.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1289058266486400');fbq('track','PageView');`;
      document.head.appendChild(p);
    }
  };

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setVisible(true);
    if (consent === 'all') loadTrackingScripts();
    const handler = () => setVisible(true);
    window.addEventListener('open-cookie-settings', handler);
    return () => window.removeEventListener('open-cookie-settings', handler);
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie_consent', 'all');
    loadTrackingScripts();
    setVisible(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem('cookie_consent', 'necessary');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 z-[100] flex justify-center"
        >
          <div className="w-full max-w-3xl glass-panel rounded-2xl border border-white/10 p-6 flex flex-col md:flex-row gap-5 items-start md:items-center shadow-2xl">
            <div className="flex-1 space-y-1">
              <p className="font-black uppercase tracking-widest text-sm">Používáme cookies</p>
              <p className="text-white/50 text-xs leading-relaxed">
                Údaje z poptávkového formuláře odesíláme pouze e-mailem — neukládáme je do žádné databáze. Pro analýzu návštěvnosti používáme <span className="text-white/70">Google Analytics</span> a <span className="text-white/70">Meta Pixel</span>. Svůj souhlas můžete kdykoli změnit.
              </p>
            </div>
            <div className="flex gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={acceptNecessary}
                className="flex-1 md:flex-none px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-white/20 rounded-xl hover:border-white/40 transition-colors"
              >
                Pouze nezbytné
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 md:flex-none px-5 py-2.5 text-xs font-bold uppercase tracking-widest bg-primary text-background rounded-xl sonic-glow hover:brightness-110 transition-all"
              >
                Přijmout vše
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

const Home = () => {
  return (
    <main>
      <Hero />
      <Packages />
      <Calculator />
      <Features />
      <FAQ />
    </main>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="selection:bg-primary selection:text-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/ochrana-osobnich-udaju" element={<PrivacyPolicy />} />
          <Route path="/obchodni-podminky" element={<TermsOfService />} />
        </Routes>
        <Footer />
        <CookieBanner />
      </div>
    </BrowserRouter>
  );
}
