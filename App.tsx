import React, { useState } from 'react';
import { Tab } from './types';
import Stopwatch from './components/Stopwatch';
import Timer from './components/Timer';
import { ClockIcon, TimerIcon } from './components/Icons';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.TIMER);

  return (
    <div className="h-screen w-full bg-dark flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[90vh] md:h-[800px] bg-slate-900/50 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col backdrop-blur-sm relative">
        
        {/* Header */}
        <header className="px-6 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
              C
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Chrono<span className="text-primary">Mind</span>
            </h1>
          </div>
          <div className="flex gap-1 bg-surface p-1 rounded-lg">
            <button
              onClick={() => setActiveTab(Tab.TIMER)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === Tab.TIMER 
                  ? 'bg-slate-700 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TimerIcon className="w-4 h-4" />
              Timer
            </button>
            <button
              onClick={() => setActiveTab(Tab.STOPWATCH)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === Tab.STOPWATCH 
                  ? 'bg-slate-700 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              Stopwatch
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-hidden p-6 md:p-10">
          <div className={`absolute inset-0 p-6 md:p-10 transition-all duration-300 ease-in-out ${
            activeTab === Tab.TIMER 
              ? 'opacity-100 translate-x-0 z-10' 
              : 'opacity-0 -translate-x-10 pointer-events-none'
          }`}>
            <Timer />
          </div>
          
          <div className={`absolute inset-0 p-6 md:p-10 transition-all duration-300 ease-in-out ${
            activeTab === Tab.STOPWATCH 
              ? 'opacity-100 translate-x-0 z-10' 
              : 'opacity-0 translate-x-10 pointer-events-none'
          }`}>
            <Stopwatch />
          </div>
        </main>

        {/* Footer/Info */}
        <footer className="px-6 py-4 border-t border-slate-800 text-center text-slate-500 text-xs">
          <p>Powered by Gemini 2.5 Flash • Precision Timing</p>
        </footer>
      </div>
    </div>
  );
};

export default App;