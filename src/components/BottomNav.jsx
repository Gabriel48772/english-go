import React from 'react';
import { BookOpen, MessageSquare, Mic, Compass, Gamepad2 } from 'lucide-react';
import { sounds } from '../utils/audio';

export const BottomNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'learn', label: 'Mundos', icon: Compass },
    { id: 'arcade', label: 'Arcade', icon: Gamepad2 },
    { id: 'conversation', label: 'Roleplay', icon: MessageSquare },
    { id: 'speaking', label: 'Voz', icon: Mic },
    { id: 'dictionary', label: 'Bolsillo', icon: BookOpen },
  ];

  return (
    <nav className="bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-2 py-2 flex items-center justify-around z-20">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              sounds.playClick();
              setActiveTab(tab.id);
            }}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all active:scale-95 ${
              isActive
                ? 'text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-200 font-medium'
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-emerald-500/20 text-emerald-300' : ''}`}>
              <Icon size={19} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] leading-none tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
