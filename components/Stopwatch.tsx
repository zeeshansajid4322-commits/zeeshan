import React, { useState } from 'react';
import { Category } from '../types';
import { MENU_ITEMS } from '../utils';
import { CoffeeIcon, JuiceIcon, DrinkIcon, StarIcon } from './Icons';

const MenuGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('COFFEE');

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24" id="menu-section">
      <div className="text-center mb-20">
        <span className="text-gold-400 font-sans uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Discover Taste</span>
        <h2 className="text-white font-display text-4xl md:text-5xl mb-6 tracking-wide">
          Our Collection
        </h2>
        <div className="w-24 h-1 bg-gold-400 mx-auto mb-6"></div>
        <p className="text-slate-400 font-serif italic text-lg max-w-2xl mx-auto">
          A selection of the finest beverages, curated for the distinguished palate and prepared with passion.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        <CategoryButton 
          label="Premium Coffee" 
          isActive={activeCategory === 'COFFEE'} 
          onClick={() => setActiveCategory('COFFEE')}
          icon={<CoffeeIcon className="w-5 h-5" />}
        />
        <CategoryButton 
          label="Fresh Juices" 
          isActive={activeCategory === 'JUICE'} 
          onClick={() => setActiveCategory('JUICE')}
          icon={<JuiceIcon className="w-5 h-5" />}
        />
        <CategoryButton 
          label="Cold Refreshments" 
          isActive={activeCategory === 'DRINKS'} 
          onClick={() => setActiveCategory('DRINKS')}
          icon={<DrinkIcon className="w-5 h-5" />}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="group relative bg-[#121212] rounded-none overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-white/5 hover:border-gold-400/30"
          >
            {/* Image */}
            <div className="h-72 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-60 z-10"></div>
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              {item.tags && (
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 items-start">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gold-400 text-black text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm shadow-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Price Badge floating on image */}
              <div className="absolute bottom-4 right-4 z-20 bg-black/80 backdrop-blur-md px-4 py-2 border-l-2 border-gold-400">
                <span className="text-gold-400 font-sans font-bold text-lg tracking-wide">{item.price}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 relative">
              <h3 className="text-2xl font-display font-medium text-white mb-3 group-hover:text-gold-400 transition-colors">
                {item.name}
              </h3>
              <p className="text-slate-400 text-sm font-sans leading-relaxed mb-6 border-b border-white/5 pb-6">
                {item.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex text-gold-600">
                  {[1,2,3,4,5].map(i => <StarIcon key={i} className="w-3 h-3" />)}
                </div>
                <button className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center gap-2 group-hover:translate-x-1 duration-300">
                  Order Now <span className="text-gold-400">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CategoryButton = ({ label, isActive, onClick, icon }: { label: string, isActive: boolean, onClick: () => void, icon: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-8 py-4 transition-all duration-300 font-sans text-sm font-bold tracking-widest uppercase ${
      isActive 
        ? 'bg-gold-400 text-black shadow-[0_0_30px_rgba(255,215,0,0.2)] transform scale-105' 
        : 'bg-transparent text-slate-500 border border-white/10 hover:border-gold-400 hover:text-gold-400'
    }`}
  >
    {icon}
    {label}
  </button>
);

export default MenuGrid;