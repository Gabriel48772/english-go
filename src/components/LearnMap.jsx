import React from 'react';
import { Play, Check, Lock, Star, Sparkles, BookOpen, RotateCcw, ArrowRight, X } from 'lucide-react';
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
    <div className="flex flex-col gap-5 p-4 max-w-lg mx-auto pb-10">
      {/* Resume In-Progress Class Banner if user left midway */}
      {savedProgress && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500/60 rounded-3xl p-4 shadow-xl shadow-emerald-950/40 relative overflow-hidden animate-slide-up">
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
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 font-black rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
          >
            <Play size={16} className="fill-slate-950" />
            <span>RETOMAR DONDE LO DEJASTE</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Top Welcome / Motivation banner */}
      <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-700/30 rounded-3xl p-4 flex items-center gap-3">
        <Mascot mood="happy" size="md" />
        <div>
          <h2 className="font-extrabold text-base text-white">
            ¡Comienza desde Cero!
          </h2>
          <p className="text-xs text-slate-300">
            Aprende 10 minutos al día para hablar con soltura en situaciones cotidianas.
          </p>
        </div>
      </div>

      {/* Units & Lesson Path */}
      {UNITS.map((unit, unitIdx) => {
        return (
          <div key={unit.id} className="space-y-4">
            {/* Unit Header Card */}
            <div className={`p-4 rounded-3xl bg-gradient-to-r ${unit.color} text-white shadow-xl relative overflow-hidden`}>
              <div className="absolute right-3 top-3 text-4xl opacity-30 select-none">
                {unit.icon}
              </div>
              <span className="text-[11px] uppercase tracking-widest font-bold opacity-80 block mb-0.5">
                {unit.title}
              </span>
              <h3 className="text-lg font-black leading-snug">
                {unit.subtitle}
              </h3>
              <p className="text-xs opacity-90 mt-1 max-w-[85%]">
                {unit.description}
              </p>
            </div>

            {/* Lesson Nodes (Duolingo Path Style) */}
            <div className="flex flex-col items-center gap-4 py-2">
              {unit.lessons.map((lesson, lessonIdx) => {
                const isCompleted = completedLessons.includes(lesson.id);
                const isUnlocked = unitIdx === 0 && lessonIdx === 0 || isCompleted || completedLessons.length > 0;
                const isInProgress = savedProgress?.lessonId === lesson.id;

                return (
                  <div key={lesson.id} className="flex flex-col items-center">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onSelectLesson(lesson, unit, isInProgress ? savedProgress.exerciseIndex : 0);
                      }}
                      className={`relative w-20 h-20 rounded-full flex flex-col items-center justify-center font-black transition-all shadow-xl active:scale-95 border-b-4 ${
                        isInProgress
                          ? 'bg-amber-400 border-amber-600 text-slate-950 ring-4 ring-amber-400/40 animate-pulse'
                          : isCompleted
                          ? 'bg-amber-500 border-amber-600 text-slate-950 ring-4 ring-amber-400/30'
                          : isUnlocked
                          ? 'bg-emerald-500 hover:bg-emerald-400 border-emerald-600 text-slate-950 ring-4 ring-emerald-500/20 animate-pulse-glow'
                          : 'bg-slate-800 border-slate-900 text-slate-600'
                      }`}
                    >
                      {isCompleted ? (
                        <Check size={32} strokeWidth={3} />
                      ) : isInProgress ? (
                        <Play size={28} className="fill-slate-950 ml-1" />
                      ) : isUnlocked ? (
                        <Play size={28} className="fill-slate-950 ml-1" />
                      ) : (
                        <Lock size={24} />
                      )}

                      {/* Small badge */}
                      <span className="absolute -bottom-2 bg-slate-900 text-[10px] text-slate-200 px-2 py-0.5 rounded-full border border-slate-700 font-bold">
                        {isInProgress ? 'En progreso' : `+${lesson.xp} XP`}
                      </span>
                    </button>

                    <div className="text-center mt-3">
                      <span className="text-xs font-bold text-white block">
                        {lesson.title}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {lesson.desc}
                      </span>
                    </div>

                    {/* Stepping connector line */}
                    {lessonIdx < unit.lessons.length - 1 && (
                      <div className="w-1.5 h-6 bg-slate-800 rounded-full my-2"></div>
                    )}
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
