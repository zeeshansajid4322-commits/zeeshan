import React, { useState, useEffect, useRef } from 'react';
import { formatTime } from '../utils';
import { PlayIcon, PauseIcon, ResetIcon, FlagIcon } from './Icons';
import { Lap } from '../types';

const Stopwatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);
  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      setElapsedTime((prevTime) => prevTime + deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isRunning) {
      previousTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    const currentLapTime = elapsedTime;
    const lastLapTime = laps.length > 0 ? laps[0].time : 0;
    const split = currentLapTime - lastLapTime;
    
    setLaps([{ id: laps.length + 1, time: currentLapTime, split }, ...laps]);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto h-full">
      {/* Time Display */}
      <div className="relative mb-8">
        <div className="text-7xl md:text-8xl font-mono font-bold tracking-tighter text-white tabular-nums drop-shadow-2xl">
          {formatTime(elapsedTime, true)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mb-8">
        <button
          onClick={handleReset}
          className="p-4 rounded-full bg-surface text-slate-400 hover:bg-slate-700 hover:text-white transition-all active:scale-95"
          disabled={elapsedTime === 0}
        >
          <ResetIcon className="w-6 h-6" />
        </button>

        <button
          onClick={handleStartStop}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 ${
            isRunning 
              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30' 
              : 'bg-primary hover:bg-cyan-600 text-white shadow-primary/30'
          }`}
        >
          {isRunning ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8 ml-1" />}
        </button>

        <button
          onClick={handleLap}
          className="p-4 rounded-full bg-surface text-slate-400 hover:bg-slate-700 hover:text-white transition-all active:scale-95"
          disabled={!isRunning}
        >
          <FlagIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Laps List */}
      <div className="w-full bg-surface/50 rounded-xl overflow-hidden flex-1 min-h-0 border border-slate-700/50">
        <div className="overflow-y-auto h-full p-2 space-y-1 scrollbar-hide">
          {laps.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 text-sm italic opacity-50">
              <span>No laps recorded</span>
            </div>
          ) : (
            laps.map((lap) => (
              <div key={lap.id} className="flex justify-between items-center px-4 py-3 bg-slate-800/50 rounded-lg text-sm font-mono border-l-4 border-secondary">
                <span className="text-slate-400">Lap {lap.id.toString().padStart(2, '0')}</span>
                <span className="text-slate-300">+{formatTime(lap.split, true)}</span>
                <span className="text-white font-bold">{formatTime(lap.time, true)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;