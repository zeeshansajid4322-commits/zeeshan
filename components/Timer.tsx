import React from 'react';
import { ChevronDownIcon } from './Icons';

interface HeroProps {
  onViewMenu: () => void;
}

const Hero: React.FC<HeroProps> = ({ onViewMenu }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax feel */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2000&auto=format&fit=crop" 
          alt="Coffee Background" 
          className="w-full h-full object-cover opacity-60"
        />
        {/* Sophisticated overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black/10 via-black/40 to-black/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto animate-fade-in mt-12">
        <div className="inline-flex items-center justify-center gap-6 mb-6 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
          <div className="h-[2px] w-16 bg-gold-400"></div>
          <span className="text-gold-200 text-sm md:text-base font-bold tracking-[0.4em] uppercase font-sans">Premium & Authentic</span>
          <div className="h-[2px] w-16 bg-gold-400"></div>
        </div>
        
        <h1 className="flex flex-col items-center font-display font-bold text-white mb-8 tracking-tight drop-shadow-2xl">
          <span className="text-6xl md:text-8xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-gold-200 to-gold-600 filter drop-shadow-lg">
            ZEESHAN'S
          </span>
          <span className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-white mt-2 tracking-wider">
            Cafe & Lounge
          </span>
        </h1>
        
        <p className="text-lg md:text-xl font-sans font-light text-slate-200 mb-12 max-w-2xl mx-auto leading-relaxed tracking-wide opacity-90 text-shadow-gold">
          Where royal ambiance meets the art of brewing. <br className="hidden md:block"/>
          Enjoy artisanal coffee, pure juices, and refreshing beverages.
        </p>
        
        <button 
          onClick={onViewMenu}
          className="group relative px-12 py-4 bg-black/40 backdrop-blur-sm overflow-hidden border border-gold-400 text-gold-400 font-sans font-bold tracking-[0.2em] uppercase transition-all hover:text-black hover:shadow-[0_0_40px_rgba(255,215,0,0.4)]"
        >
          <span className="absolute inset-0 w-full h-full bg-gold-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
          <span className="relative z-10 flex items-center gap-2">
            Explore Menu
          </span>
        </button>
      </div>

      <div className="absolute bottom-10 animate-bounce text-white/70 cursor-pointer hover:text-gold-400 transition-colors" onClick={onViewMenu}>
        <ChevronDownIcon className="w-8 h-8" />
      </div>
    </div>
  );
};

export default Hero;