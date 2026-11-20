import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LearnMap } from './components/LearnMap';
import { LessonScreen } from './components/LessonScreen';
import { ConversationPractice } from './components/ConversationPractice';
import { SpeakingGym } from './components/SpeakingGym';
import { DictionaryScreen } from './components/DictionaryScreen';
import { ArcadeCenter } from './components/ArcadeCenter';
import { UpdateModal } from './components/UpdateModal';
import { sounds } from './utils/audio';
import { registerServiceWorker, checkForUpdates } from './services/updateService';
import { UNITS } from './data/lessons';

export default function App() {
  const [activeTab, setActiveTab] = useState('learn');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentUnit, setCurrentUnit] = useState(null);
  const [lessonInitialIndex, setLessonInitialIndex] = useState(0);
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // Update modal state
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(null);
  const [isManualUpdateCheck, setIsManualUpdateCheck] = useState(false);

  // Gamification state (persisted in localStorage)
  const [xp, setXp] = useState(() => {
    return parseInt(localStorage.getItem('english_go_xp') || '50', 10);
  });
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem('english_go_streak') || '2', 10);
  });
  const [hearts, setHearts] = useState(() => {
    return parseInt(localStorage.getItem('english_go_hearts') || '5', 10);
  });
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('english_go_completed') || '[]');
    } catch {
      return [];
    }
  });

  // Saved in-progress lesson session (so user can resume right where they left off!)
  const [savedProgress, setSavedProgress] = useState(() => {
    try {
      const data = localStorage.getItem('english_go_active_session');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  });

  // Save core state to localStorage
  useEffect(() => {
    localStorage.setItem('english_go_xp', xp.toString());
    localStorage.setItem('english_go_streak', streak.toString());
    localStorage.setItem('english_go_hearts', hearts.toString());
    localStorage.setItem('english_go_completed', JSON.stringify(completedLessons));
  }, [xp, streak, hearts, completedLessons]);

  // Save in-progress session to localStorage
  useEffect(() => {
    if (savedProgress) {
      localStorage.setItem('english_go_active_session', JSON.stringify(savedProgress));
    } else {
      localStorage.removeItem('english_go_active_session');
    }
  }, [savedProgress]);

  // Register service worker and check for updates on startup
  useEffect(() => {
    registerServiceWorker((info) => {
      setUpdateInfo(info);
      setShowUpdateModal(true);
    });

    const timer = setTimeout(async () => {
      const res = await checkForUpdates();
      if (res.hasUpdate) {
        setUpdateInfo(res);
        setShowUpdateModal(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const addXP = (amount) => {
    setXp(prev => prev + amount);
  };

  const handleStartLesson = (lesson, unit, startingIndex = 0) => {
    setCurrentLesson(lesson);
    setCurrentUnit(unit);
    setLessonInitialIndex(startingIndex);
  };

  // Called when exercise index advances within LessonScreen
  const handleProgressUpdate = (index) => {
    if (!currentLesson || !currentUnit) return;
    setSavedProgress({
      lessonId: currentLesson.id,
      unitId: currentUnit.id,
      exerciseIndex: index,
      totalExercises: currentLesson.exercises?.length || 1,
      lessonTitle: currentLesson.title,
      unitTitle: currentUnit.title,
      timestamp: Date.now()
    });
  };

  // Resume the saved in-progress lesson directly
  const handleResumeSavedLesson = () => {
    if (!savedProgress) return;
    for (const unit of UNITS) {
      const foundLesson = unit.lessons.find(l => l.id === savedProgress.lessonId);
      if (foundLesson) {
        handleStartLesson(foundLesson, unit, savedProgress.exerciseIndex || 0);
        return;
      }
    }
  };

  const handleDiscardSavedProgress = () => {
    setSavedProgress(null);
  };

  const handleFinishLesson = () => {
    if (currentLesson && !completedLessons.includes(currentLesson.id)) {
      setCompletedLessons(prev => [...prev, currentLesson.id]);
    }
    setSavedProgress(null); // Clear active session when completed!
    setCurrentLesson(null);
    setCurrentUnit(null);
  };

  const handleExitLesson = (saveProgress = true) => {
    sounds.playClick();
    if (!saveProgress) {
      setSavedProgress(null);
    }
    setCurrentLesson(null);
    setCurrentUnit(null);
  };

  const handleRefillHearts = () => {
    sounds.playCorrect();
    setHearts(5);
  };

  const handleOpenUpdatesManual = () => {
    setIsManualUpdateCheck(true);
    setShowUpdateModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-0 md:p-6 text-slate-100">
      {/* Smartphone frame container */}
      <div
        className={`w-full transition-all duration-300 relative flex flex-col bg-slate-900 overflow-hidden ${
          isMobileFrame
            ? 'max-w-md h-screen md:h-[844px] md:rounded-[44px] md:border-[10px] md:border-slate-800 md:shadow-2xl md:ring-1 md:ring-slate-700/50'
            : 'max-w-4xl min-h-screen md:min-h-[850px] md:rounded-3xl md:border border-slate-800 shadow-2xl'
        }`}
      >
        {/* Dynamic Island / Notch for phone frame on desktop */}
        {isMobileFrame && (
          <div className="hidden md:flex justify-center pt-2 pb-1 bg-slate-900 z-50">
            <div className="w-24 h-4 bg-slate-950 rounded-full flex items-center justify-end pr-3">
              <div className="w-2 h-2 rounded-full bg-slate-800"></div>
            </div>
          </div>
        )}

        {/* Global App Header (hidden when inside a lesson) */}
        {!currentLesson && (
          <Header
            streak={streak}
            xp={xp}
            hearts={hearts}
            isMobileFrame={isMobileFrame}
            setIsMobileFrame={setIsMobileFrame}
            hasUpdate={!!updateInfo?.hasUpdate}
            onOpenUpdates={handleOpenUpdatesManual}
          />
        )}

        {/* Update Notification Banner */}
        {updateInfo?.hasUpdate && !showUpdateModal && !currentLesson && (
          <div
            onClick={handleOpenUpdatesManual}
            className="cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-4 py-2 text-xs font-bold flex items-center justify-between shadow-md transition-all animate-pulse"
          >
            <span>🚀 ¡Nueva actualización v{updateInfo.latestVersion} disponible!</span>
            <span className="underline font-black">Actualizar</span>
          </div>
        )}

        {/* Out of Hearts Modal Banner */}
        {hearts <= 0 && !currentLesson && (
          <div className="bg-rose-950/90 border-b border-rose-500/50 px-4 py-2.5 flex items-center justify-between">
            <span className="text-xs text-rose-200 font-bold">
              💔 Te quedaste sin vidas. ¡Recárgalas para seguir practicando!
            </span>
            <button
              onClick={handleRefillHearts}
              className="px-3 py-1 bg-rose-500 hover:bg-rose-400 text-slate-950 text-xs font-black rounded-lg transition-all"
            >
              Recargar (Gratis)
            </button>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto relative no-scrollbar">
          {currentLesson ? (
            <LessonScreen
              lesson={currentLesson}
              unit={currentUnit}
              initialIndex={lessonInitialIndex}
              onFinish={handleFinishLesson}
              onExit={handleExitLesson}
              onProgressUpdate={handleProgressUpdate}
              hearts={hearts}
              setHearts={setHearts}
              addXP={addXP}
            />
          ) : (
            <>
              {activeTab === 'learn' && (
                <LearnMap
                  onSelectLesson={handleStartLesson}
                  completedLessons={completedLessons}
                  savedProgress={savedProgress}
                  onResumeSavedLesson={handleResumeSavedLesson}
                  onDiscardSavedProgress={handleDiscardSavedProgress}
                />
              )}

              {activeTab === 'arcade' && (
                <ArcadeCenter addXP={addXP} />
              )}

              {activeTab === 'conversation' && (
                <ConversationPractice addXP={addXP} />
              )}

              {activeTab === 'speaking' && (
                <SpeakingGym addXP={addXP} />
              )}

              {activeTab === 'dictionary' && (
                <DictionaryScreen />
              )}
            </>
          )}
        </main>

        {/* Bottom Navigation (only shown when not inside a lesson) */}
        {!currentLesson && (
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        {/* Update Modal */}
        <UpdateModal
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          updateInfo={updateInfo}
          isManual={isManualUpdateCheck}
        />
      </div>
    </div>
  );
}
