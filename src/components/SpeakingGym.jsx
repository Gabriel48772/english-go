import React, { useState } from 'react';
import { Mic, Volume2, CheckCircle, Award, Sparkles, Filter } from 'lucide-react';
import { POCKET_DICTIONARY } from '../data/lessons';
import { speakText, sounds } from '../utils/audio';
import { VoiceRecorder } from './VoiceRecorder';
import { AudioPlayerButton } from './AudioPlayerButton';

export const SpeakingGym = ({ addXP }) => {
  const [selectedItem, setSelectedItem] = useState(POCKET_DICTIONARY[0]);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [completedPhrases, setCompletedPhrases] = useState({});

  const categories = ['Todos', 'Básicos', 'Viajes', 'Restaurante', 'Emergencias', 'Presentación'];

  const filteredItems = activeCategory === 'Todos'
    ? POCKET_DICTIONARY
    : POCKET_DICTIONARY.filter(item => item.cat === activeCategory);

  const handleVoiceResult = (res) => {
    if (res.isMatch) {
      if (!completedPhrases[selectedItem.eng]) {
        addXP(10);
        setCompletedPhrases(prev => ({ ...prev, [selectedItem.eng]: res.score }));
      }
    }
  };

  return (
    <div className="flex flex-col h-full max-w-lg mx-auto p-4 space-y-4">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border border-indigo-700/40 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Mic size={14} />
            <span>Gimnasio de Pronunciación</span>
          </div>
          <h2 className="text-base font-extrabold text-white">
            Habla Inglés con Confianza
          </h2>
          <p className="text-xs text-indigo-200/80">
            Escucha el audio nativo, lee la guía fonética y repite en el micrófono.
          </p>
        </div>
        <div className="w-12 h-12 bg-indigo-600/30 rounded-2xl flex items-center justify-center text-indigo-300">
          <Award size={26} />
        </div>
      </div>

      {/* Target Word Practice Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col items-center text-center">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
          {selectedItem.cat}
        </span>

        <h3 className="text-2xl font-black text-white tracking-wide mb-1">
          {selectedItem.eng}
        </h3>

        {/* Phonetic transcription in Spanish style */}
        <div className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700 text-xs font-mono text-amber-300 mb-2">
          Se pronuncia: <span className="font-bold font-sans">[{selectedItem.phon}]</span>
        </div>

        <p className="text-sm font-semibold text-emerald-400 mb-4">
          "{selectedItem.esp}"
        </p>

        {/* Listen buttons */}
        <div className="mb-4">
          <AudioPlayerButton text={selectedItem.eng} size="lg" />
        </div>

        {/* Voice recording test */}
        <VoiceRecorder
          targetText={selectedItem.eng}
          onResult={handleVoiceResult}
        />
      </div>

      {/* Categories chips */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              sounds.playClick();
              setActiveCategory(cat);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Phrases list to practice */}
      <div className="flex-1 space-y-2 overflow-y-auto max-h-56 pr-1">
        {filteredItems.map((item, idx) => {
          const isSelected = selectedItem.eng === item.eng;
          const isDone = completedPhrases[item.eng];

          return (
            <div
              key={idx}
              onClick={() => {
                sounds.playClick();
                setSelectedItem(item);
                speakText(item.eng);
              }}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between active:scale-[0.99] ${
                isSelected
                  ? 'bg-slate-800 border-indigo-500 shadow-md'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(item.eng);
                  }}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                >
                  <Volume2 size={16} />
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{item.eng}</span>
                    <span className="text-[10px] text-amber-300/80 font-mono">[{item.phon}]</span>
                  </div>
                  <span className="text-xs text-slate-400">{item.esp}</span>
                </div>
              </div>

              {isDone && (
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
                  <CheckCircle size={16} />
                  <span>{isDone}%</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
