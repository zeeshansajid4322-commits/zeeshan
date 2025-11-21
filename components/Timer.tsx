import React, { useState, useEffect, useRef } from 'react';
import { formatTime } from '../utils';
import { PlayIcon, PauseIcon, ResetIcon, SparklesIcon, XIcon } from './Icons';
import { TimerStatus } from '../types';
import { getSmartTimerConfig } from '../services/geminiService';

const Timer: React.FC = () => {
  // Config State
  const [totalSeconds, setTotalSeconds] = useState(300); // Default 5 mins
  const [hoursInput, setHoursInput] = useState(0);
  const [minutesInput, setMinutesInput] = useState(5);
  const [secondsInput, setSecondsInput] = useState(0);
  
  // Running State
  const [remainingSeconds, setRemainingSeconds] = useState(300);
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.IDLE);
  const [label, setLabel] = useState("");
  const [advice, setAdvice] = useState("");

  // AI State
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play beep sound
  const playBeep = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    if (ctx) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    }
  };

  useEffect(() => {
    if (status === TimerStatus.RUNNING) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setStatus(TimerStatus.COMPLETED);
            playBeep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status]);

  // Update remaining seconds when inputs change if idle
  useEffect(() => {
    if (status === TimerStatus.IDLE) {
      const total = (hoursInput * 3600) + (minutesInput * 60) + secondsInput;
      setTotalSeconds(total);
      setRemainingSeconds(total);
    }
  }, [hoursInput, minutesInput, secondsInput, status]);

  const toggleTimer = () => {
    if (status === TimerStatus.RUNNING) {
      setStatus(TimerStatus.PAUSED);
    } else if (status === TimerStatus.IDLE || status === TimerStatus.PAUSED) {
      if (remainingSeconds > 0) setStatus(TimerStatus.RUNNING);
    } else if (status === TimerStatus.COMPLETED) {
       // Reset
       setRemainingSeconds(totalSeconds);
       setStatus(TimerStatus.IDLE);
    }
  };

  const resetTimer = () => {
    setStatus(TimerStatus.IDLE);
    setRemainingSeconds(totalSeconds);
  };

  const handleAISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setAiLoading(true);
    setAiError("");
    try {
      const config = await getSmartTimerConfig(aiPrompt);
      
      const h = Math.floor(config.durationSeconds / 3600);
      const m = Math.floor((config.durationSeconds % 3600) / 60);
      const s = config.durationSeconds % 60;

      setHoursInput(h);
      setMinutesInput(m);
      setSecondsInput(s);
      
      setTotalSeconds(config.durationSeconds);
      setRemainingSeconds(config.durationSeconds);
      setLabel(config.label);
      setAdvice(config.advice || "");
      
      setShowAI(false);
      setAiPrompt("");
    } catch (err) {
      setAiError("Failed to configure timer. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  // Calculate progress for circle
  const progress = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto h-full relative">
      
      {/* AI Modal Overlay */}
      {showAI && (
        <div className="absolute inset-0 z-50 bg-dark/95 backdrop-blur-sm flex items-center justify-center p-4 rounded-3xl transition-all">
          <div className="w-full bg-surface border border-slate-700 rounded-2xl p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowAI(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <XIcon className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <SparklesIcon className="text-secondary w-5 h-5" />
              Smart Setup
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Ask AI to set a timer for you. Examples: "Boil soft eggs", "Pomodoro session", "Power nap".
            </p>
            <form onSubmit={handleAISubmit}>
              <div className="relative">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="What are you doing?"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary mb-4"
                  autoFocus
                />
              </div>
              {aiError && <p className="text-rose-500 text-xs mb-3">{aiError}</p>}
              <button
                type="submit"
                disabled={aiLoading}
                className="w-full bg-secondary hover:bg-indigo-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {aiLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <SparklesIcon className="w-4 h-4" />
                    Configure Timer
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Timer Visualization */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* SVG Circle Progress */}
        <div className="relative w-72 h-72">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 260 260">
            {/* Background Circle */}
            <circle
              cx="130"
              cy="130"
              r={radius}
              className="stroke-slate-800"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Progress Circle */}
            <circle
              cx="130"
              cy="130"
              r={radius}
              className={`transition-all duration-1000 ease-linear ${status === TimerStatus.COMPLETED ? 'stroke-rose-500 animate-pulse' : 'stroke-primary'}`}
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Digital Time Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {status === TimerStatus.IDLE ? (
              <div className="flex items-center text-4xl font-mono font-bold text-white">
                <div className="flex flex-col items-center">
                  <input 
                    type="number" 
                    value={hoursInput} 
                    onChange={(e) => setHoursInput(Math.max(0, parseInt(e.target.value) || 0))}
                    className="bg-transparent w-16 text-center focus:outline-none focus:text-primary border-b border-transparent focus:border-primary transition-colors"
                  />
                  <span className="text-xs text-slate-500 font-sans">HR</span>
                </div>
                <span className="mb-4">:</span>
                <div className="flex flex-col items-center">
                  <input 
                    type="number" 
                    value={minutesInput} 
                    onChange={(e) => setMinutesInput(Math.max(0, parseInt(e.target.value) || 0))}
                    className="bg-transparent w-16 text-center focus:outline-none focus:text-primary border-b border-transparent focus:border-primary transition-colors"
                  />
                  <span className="text-xs text-slate-500 font-sans">MIN</span>
                </div>
                <span className="mb-4">:</span>
                <div className="flex flex-col items-center">
                  <input 
                    type="number" 
                    value={secondsInput} 
                    onChange={(e) => setSecondsInput(Math.max(0, parseInt(e.target.value) || 0))}
                    className="bg-transparent w-16 text-center focus:outline-none focus:text-primary border-b border-transparent focus:border-primary transition-colors"
                  />
                  <span className="text-xs text-slate-500 font-sans">SEC</span>
                </div>
              </div>
            ) : (
              <div className="text-6xl font-mono font-bold text-white tracking-tighter tabular-nums">
                {formatTime(remainingSeconds * 1000)}
              </div>
            )}
            
            {label && (
              <div className="absolute bottom-16 px-4 py-1 rounded-full bg-slate-800/80 text-secondary text-sm font-semibold border border-slate-700/50 backdrop-blur-sm max-w-[80%] truncate">
                {label}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Advice Text */}
      {advice && status !== TimerStatus.IDLE && (
         <div className="mb-6 px-4 text-center text-sm text-slate-400 italic animate-fade-in">
           "{advice}"
         </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-6">
        <button
          onClick={resetTimer}
          className="p-4 rounded-full bg-surface text-slate-400 hover:bg-slate-700 hover:text-white transition-all active:scale-95"
        >
          <ResetIcon className="w-6 h-6" />
        </button>

        <button
          onClick={toggleTimer}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 ${
            status === TimerStatus.RUNNING
              ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/30'
              : status === TimerStatus.COMPLETED
              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30 animate-bounce'
              : 'bg-primary hover:bg-cyan-600 text-white shadow-primary/30'
          }`}
        >
          {status === TimerStatus.RUNNING ? (
            <PauseIcon className="w-8 h-8" />
          ) : status === TimerStatus.COMPLETED ? (
            <ResetIcon className="w-8 h-8" />
          ) : (
            <PlayIcon className="w-8 h-8 ml-1" />
          )}
        </button>

        <button
          onClick={() => setShowAI(true)}
          className="p-4 rounded-full bg-surface text-secondary hover:bg-slate-700 hover:text-indigo-400 transition-all active:scale-95 relative group"
        >
          <SparklesIcon className="w-6 h-6" />
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-secondary text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Smart Setup
          </span>
        </button>
      </div>
    </div>
  );
};

export default Timer;