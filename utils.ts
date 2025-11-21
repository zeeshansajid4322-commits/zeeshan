/**
 * Formats milliseconds into MM:SS.ms or HH:MM:SS depending on size
 */
export const formatTime = (ms: number, showMs: boolean = false): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10); // 2 digits

  const pad = (num: number) => num.toString().padStart(2, '0');

  let timeStr = '';
  if (hours > 0) {
    timeStr = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  } else {
    timeStr = `${pad(minutes)}:${pad(seconds)}`;
  }

  if (showMs) {
    timeStr += `.${pad(milliseconds)}`;
  }

  return timeStr;
};

/**
 * Parses HH:MM:SS string to seconds
 */
export const parseInputToSeconds = (hours: number, minutes: number, seconds: number): number => {
  return (hours * 3600) + (minutes * 60) + seconds;
};
