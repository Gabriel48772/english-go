import React from 'react';
import { Play, Check, Lock, Sparkles, Compass, Flame, ArrowRight, X, Clock, Award } from 'lucide-react';
import { UNITS } from '../data/lessons';
import { Mascot } from './Mascot';
import { sounds } from '../utils/audio';

export const LearnMap = ({
  onSelectLesson,
  completedLessons = [],
  savedProgress = null,
  onResumeSavedLesson = () => {},
  onDiscardSavedProgress = () => {}
}) => {
  return (
    <div className="flex flex-col gap-5 p-4 max-w-lg mx-auto pb-12">
      {/* Resume in-progress session if any */}
      {savedProgress && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-400/60 rounded-3xl p-4 shadow-2xl relative overflow-hidden animate-slide-up">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[11px] font-black text-emerald-400 uppercase tracking-wider">
                CLASE EN PROGRESO PENDIENTE
              </span>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                onDiscardSavedProgress();
              }}
              title="Descartar y empezar de cero"
              className="text-slate-500 hover:text-slate-300 p-1"
            >
              <X size={16} />
            </button>
          </div>

          <h3 className="font-extrabold text-white text-base mb-1">
            {savedProgress.lessonTitle}
          </h3>
          <p className="text-xs text-slate-300 mb-3">
            {savedProgress.unitTitle} • <span className="text-emerald-400 font-bold">Pregunta {savedProgress.exerciseIndex + 1} de {savedProgress.totalExercises}</span>
          </p>

          <button
            onClick={() => {
              sounds.playWin();
              onResumeSavedLesson();
            }}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 active:scale-[0.98] text-slate-950 font-black rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
          >
            <Play size={16} className="fill-slate-950" />
            <span>CONTINUAR DONDE LO DEJASTE</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Header Welcome banner with EnglishGo! Identity */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 rounded-3xl p-4 flex items-center justify-between shadow-xl">
        <div className="max-w-[70%]">
          <div className="flex items-center gap-1.5 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Compass size={14} />
            <span>Ruta del Aprendizaje Real</span>
          </div>
          <h2 className="font-black text-base text-white leading-tight">
            Aprende Inglés Directo al Grano
          </h2>
          <p className="text-[11px] text-slate-300 mt-1">
            Sin rodeos gramaticales: frases, fonética y situaciones reales desde el día 1.
          </p>
        </div>
        <Mascot mood="happy" size="md" />
      </div>

      {/* World Cards & Modern Portals Path */}
      {UNITS.map((unit, unitIdx) => {
        return (
          <div key={unit.id} className="space-y-3.5">
            {/* World Banner Card */}
            <div className={`p-4 rounded-3xl bg-gradient-to-r ${unit.color} text-white shadow-xl relative overflow-hidden`}>
              <div className="absolute right-3 top-2 text-4xl opacity-20 select-none">
                {unit.icon}
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase tracking-widest font-extrabold bg-black/25 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                  {unit.badge || `NIVEL ${unit.id}`}
                </span>
                <span className="text-[10px] text-white/80 font-medium">
                  {unit.lessons.length} Lecciones
                </span>
              </div>
              <h3 className="text-lg font-black leading-snug">
                {unit.title}
              </h3>
              <p className="text-xs text-white/90 mt-0.5 max-w-[85%] font-medium">
                {unit.subtitle}
              </p>
            </div>

            {/* Portal Nodes Layout */}
            <div className="space-y-2.5">
              {unit.lessons.map((lesson, lessonIdx) => {
                const isCompleted = completedLessons.includes(lesson.id);
                const isUnlocked = unitIdx === 0 && lessonIdx === 0 || isCompleted || completedLessons.length > 0;
                const isInProgress = savedProgress?.lessonId === lesson.id;

                return (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      if (!isUnlocked) return;
                      sounds.playClick();
                      onSelectLesson(lesson, unit, isInProgress ? savedProgress.exerciseIndex : 0);
                    }}
                    className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer active:scale-[0.99] ${
                      isInProgress
                        ? 'bg-slate-900 border-amber-400/80 shadow-lg shadow-amber-500/10'
                        : isCompleted
                        ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-500'
                        : isUnlocked
                        ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/70'
                        : 'bg-slate-950/60 border-slate-850 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Status Icon Orb */}
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold flex-shrink-0 transition-transform ${
                          isCompleted
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : isInProgress
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse'
                            : isUnlocked
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-slate-800 text-slate-600'
                        }`}
                      >
                        {isCompleted ? (
                          <Check size={22} strokeWidth={3} />
                        ) : isInProgress ? (
                          <Play size={20} className="fill-amber-400 ml-0.5" />
                        ) : isUnlocked ? (
                          <Play size={20} className="fill-white ml-0.5" />
                        ) : (
                          <Lock size={18} />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-white">
                            {lesson.title}
                          </h4>
                          {isInProgress && (
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.2 rounded-full">
                              Retomar
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {lesson.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-xl font-mono">
                        +{lesson.xp} XP
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
