import React, { useState } from 'react';
import { Search, Volume2, Bookmark, Sparkles, BookOpen } from 'lucide-react';
import { POCKET_DICTIONARY } from '../data/lessons';
import { speakText, sounds } from '../utils/audio';

export const DictionaryScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('Todos');

  const categories = ['Todos', 'Básicos', 'Viajes', 'Restaurante', 'Emergencias', 'Presentación'];

  const filtered = POCKET_DICTIONARY.filter(item => {
    const matchesCat = selectedCat === 'Todos' || item.cat === selectedCat;
    const matchesSearch =
      item.eng.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.esp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phon.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full max-w-lg mx-auto p-4 space-y-4">
      {/* Search Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="text-emerald-400" size={20} />
          <h2 className="text-lg font-black text-white">
            Diccionario de Bolsillo
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          Encuentra cualquier frase útil para la vida diaria con su audio y fonética.
        </p>
      </div>

      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar frase en inglés o español..."
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* Category selector */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              sounds.playClick();
              setSelectedCat(cat);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCat === cat
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Phrases list */}
      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No se encontraron frases con "{searchTerm}".
          </div>
        ) : (
          filtered.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-3.5 flex items-center justify-between transition-all"
            >
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-extrabold text-sm text-white tracking-wide">
                    {item.eng}
                  </span>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 font-medium">
                    {item.cat}
                  </span>
                </div>

                <div className="text-xs text-amber-300/90 font-mono mb-0.5">
                  [{item.phon}]
                </div>

                <span className="text-xs text-emerald-400 font-semibold">
                  "{item.esp}"
                </span>
              </div>

              <button
                onClick={() => {
                  sounds.playClick();
                  speakText(item.eng);
                }}
                className="p-2.5 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 rounded-xl transition-colors active:scale-95"
                title="Escuchar pronunciación"
              >
                <Volume2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
