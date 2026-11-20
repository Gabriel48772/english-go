import React, { useState } from 'react';
import { Volume2, Snail } from 'lucide-react';
import { speakText, sounds } from '../utils/audio';

export const AudioPlayerButton = ({ text, showSlow = true, size = 'md', className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (slow = false) => {
    sounds.playClick();
    setIsPlaying(true);
    speakText(text, slow);
    setTimeout(() => {
      setIsPlaying(false);
    }, slow ? 2000 : 1200);
  };

  const btnSizes = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg'
  };

  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 28
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Normal speed button */}
      <button
        onClick={() => handlePlay(false)}
        title="Escuchar pronunciación normal"
        className={`${btnSizes[size]} bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-full shadow-md flex items-center justify-center transition-all ${
          isPlaying ? 'ring-4 ring-emerald-400/50 scale-105' : ''
        }`}
      >
        <Volume2 size={iconSizes[size]} className={isPlaying ? 'animate-pulse' : ''} />
      </button>

      {/* Slow speed (tortuga) button */}
      {showSlow && (
        <button
          onClick={() => handlePlay(true)}
          title="Escuchar en cámara lenta para entender cada sonido"
          className="p-2 bg-slate-800 hover:bg-slate-700 active:scale-95 text-amber-400 rounded-full border border-slate-700 shadow-sm transition-all flex items-center justify-center"
        >
          <Snail size={iconSizes[size] - 4} />
        </button>
      )}
    </div>
  );
};
