import React from 'react';
import { Flame, Zap, Heart, Smartphone, Monitor, ArrowUpCircle } from 'lucide-react';
import { sounds } from '../utils/audio';
import { CURRENT_APP_VERSION } from '../services/updateService';

export const Header = ({
  streak = 1,
  xp = 0,
  hearts = 5,
  isMobileFrame = true,
  setIsMobileFrame = () => {},
  hasUpdate = false,
  onOpenUpdates = () => {}
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between text-slate-100">
      {/* Brand / Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl filter drop-shadow">🦉</span>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-extrabold text-base tracking-tight leading-none bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              EnglishGo!
            </h1>
            <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded-full font-mono border border-slate-700">
              v{CURRENT_APP_VERSION}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">De Cero a Fluido</span>
        </div>
      </div>

      {/* Gamification Stats & Update Button */}
      <div className="flex items-center gap-2.5 text-sm font-bold">
        {/* Streak */}
        <div 
          title="Racha de días seguidos aprendiendo" 
          className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full border border-amber-500/30"
        >
          <Flame size={15} className="fill-amber-400 text-amber-500 animate-pulse" />
          <span>{streak}</span>
        </div>

        {/* XP */}
        <div 
          title="Puntos de experiencia ganados" 
          className="flex items-center gap-1 bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-full border border-indigo-500/30"
        >
          <Zap size={15} className="fill-indigo-400 text-indigo-500" />
          <span>{xp}</span>
        </div>

        {/* Hearts */}
        <div 
          title="Vidas disponibles" 
          className="flex items-center gap-1 bg-rose-500/10 text-rose-400 px-2 py-1 rounded-full border border-rose-500/30"
        >
          <Heart size={15} className="fill-rose-500 text-rose-500" />
          <span>{hearts}</span>
        </div>

        {/* Update Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenUpdates();
          }}
          className={`p-1.5 rounded-lg border transition-all relative ${
            hasUpdate
              ? 'bg-emerald-500 text-slate-950 border-emerald-400 animate-bounce'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
          }`}
          title="Buscar o instalar actualizaciones"
        >
          <ArrowUpCircle size={17} />
          {hasUpdate && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-slate-900"></span>
          )}
        </button>

        {/* Device frame switch (useful on desktop) */}
        <button
          onClick={() => {
            sounds.playClick();
            setIsMobileFrame(!isMobileFrame);
          }}
          className="hidden md:flex p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
          title={isMobileFrame ? "Ver en pantalla completa" : "Simular pantalla de teléfono móvil"}
        >
          {isMobileFrame ? <Monitor size={17} /> : <Smartphone size={17} />}
        </button>
      </div>
    </header>
  );
};
