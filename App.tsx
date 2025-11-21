import React, { useRef, useEffect, useState } from 'react';
import Hero from './components/Timer'; 
import MenuGrid from './components/Stopwatch';

const App: React.FC = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-dark flex flex-col relative">
      {/* Modern Sticky Navbar */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-md py-4 border-white/10 shadow-2xl' 
            : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className={`w-10 h-10 border-2 border-gold-400 flex items-center justify-center transition-transform duration-500 ${isScrolled ? 'rotate-0' : 'rotate-45 group-hover:rotate-0'}`}>
              <span className="font-display font-bold text-gold-400 text-xl">Z</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold text-white tracking-[0.15em] leading-none">
                ZEESHAN<span className="text-gold-400">'S</span>
              </span>
              <span className="text-[0.6rem] font-sans text-slate-400 uppercase tracking-[0.3em] leading-tight">
                Cafe & Lounge
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
             <div className="flex gap-8 text-xs font-sans font-bold tracking-widest text-white/80">
              <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-gold-400 transition-colors py-2 relative group">
                HOME
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button onClick={scrollToMenu} className="hover:text-gold-400 transition-colors py-2 relative group">
                MENU
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <a href="#contact" className="hover:text-gold-400 transition-colors py-2 relative group">
                VISIT US
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            {/* Call to Action */}
            <button 
              onClick={scrollToMenu}
              className="px-6 py-2 bg-gold-400 text-black text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-none"
            >
              Order Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero onViewMenu={scrollToMenu} />

      {/* Menu Section */}
      <div ref={menuRef} className="bg-gradient-to-b from-dark to-surface relative z-20">
        <MenuGrid />
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-[#0a0a0a] py-20 px-6 border-t border-gold-400/20 relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-10">
            <div className="w-16 h-16 border-2 border-gold-400/50 flex items-center justify-center transform rotate-45">
               <span className="font-display font-bold text-gold-400 text-2xl transform -rotate-45">Z</span>
            </div>
          </div>
          
          <h2 className="text-4xl font-display text-white mb-4">Taste The Royalty</h2>
          <p className="text-slate-500 mb-12 max-w-md mx-auto">We invite you to experience the finest beverages in an atmosphere designed for comfort and luxury.</p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 bg-white/5 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm border border-white/5 rounded-none group">
              <h4 className="text-gold-400 font-bold mb-4 uppercase tracking-widest text-xs group-hover:text-white transition-colors">Find Us</h4>
              <p className="text-slate-300 font-serif leading-relaxed">123 Royal Avenue,<br/>Culinary District, PK</p>
            </div>
            <div className="p-8 bg-white/5 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm border border-white/5 rounded-none group">
              <h4 className="text-gold-400 font-bold mb-4 uppercase tracking-widest text-xs group-hover:text-white transition-colors">Open Daily</h4>
              <p className="text-slate-300 font-serif leading-relaxed">Mon - Sun<br/>10:00 AM - 12:00 AM</p>
            </div>
            <div className="p-8 bg-white/5 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm border border-white/5 rounded-none group">
              <h4 className="text-gold-400 font-bold mb-4 uppercase tracking-widest text-xs group-hover:text-white transition-colors">Call Us</h4>
              <p className="text-slate-300 font-serif leading-relaxed">+92 300 1234567<br/>info@zeeshanscafe.com</p>
            </div>
          </div>
          
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>
          
          <p className="text-slate-600 text-[10px] uppercase tracking-[0.2em]">
            © 2024 Zeeshan's Cafe. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;