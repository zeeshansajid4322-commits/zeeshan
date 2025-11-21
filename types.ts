export enum Tab {
  TIMER = 'TIMER',
  STOPWATCH = 'STOPWATCH',
}

export enum TimerStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
}

export interface SmartTimerResponse {
  durationSeconds: number;
  label: string;
  advice?: string;
}

export interface Lap {
  id: number;
  time: number; // in milliseconds
  split: number; // difference from last lap
}