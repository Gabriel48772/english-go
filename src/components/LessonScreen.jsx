import React, { useState, useEffect } from 'react';
import { X, Heart, Check, ArrowRight, Volume2, Sparkles, Trophy, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds, speakText } from '../utils/audio';
import { AudioPlayerButton } from './AudioPlayerButton';
import { VoiceRecorder } from './VoiceRecorder';
import { Mascot } from './Mascot';

export const LessonScreen = ({
  lesson,
  unit,
  onFinish,
  onExit,
  hearts,
  setHearts,
  addXP
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sentenceWords, setSentenceWords] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [voiceResult, setVoiceResult] = useState(null);
  
  // Matching pairs state
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [selectedEng, setSelectedEng] = useState(null);
  const [selectedEsp, setSelectedEsp] = useState(null);

  // Status of the current question: 'idle', 'correct', 'wrong'
  const [checkStatus, setCheckStatus] = useState('idle');
  const [correctAnswerText, setCorrectAnswerText] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const exercises = lesson.exercises || [];
  const currentEx = exercises[currentIndex];
  const progressPercent = Math.round(((currentIndex) / exercises.length) * 100);

  // Initialize exercise state
  useEffect(() => {
    if (!currentEx) return;

    setSelectedOption(null);
    setCheckStatus('idle');
    setCorrectAnswerText('');
    setVoiceResult(null);
    setSelectedEng(null);
    setSelectedEsp(null);
    setMatchedPairs([]);

    // Automatically speak audio for listening or flashcard questions
    if (currentEx.type === 'listening' && currentEx.targetText) {
      setTimeout(() => speakText(currentEx.targetText), 350);
    } else if (currentEx.type === 'flashcard' && currentEx.word) {
      setTimeout(() => speakText(currentEx.word), 400);
    }

    if (currentEx.type === 'sentence_builder') {
      const shuffled = [...currentEx.words].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled.map((w, idx) => ({ id: `${w}-${idx}`, word: w })));
      setSentenceWords([]);
    }
  }, [currentIndex, currentEx]);

  // Handle word bank clicks
  const handleSelectWord = (item) => {
    sounds.playClick();
    setAvailableWords(prev => prev.filter(w => w.id !== item.id));
    setSentenceWords(prev => [...prev, item]);
  };

  const handleRemoveWord = (item) => {
    sounds.playClick();
    setSentenceWords(prev => prev.filter(w => w.id !== item.id));
    setAvailableWords(prev => [...prev, item]);
  };

  // Handle match pairs click
  const handleSelectPairItem = (type, val) => {
    sounds.playClick();
    if (type === 'eng') {
      setSelectedEng(val);
      if (selectedEsp) {
        checkPairMatch(val, selectedEsp);
      }
    } else {
      setSelectedEsp(val);
      if (selectedEng) {
        checkPairMatch(selectedEng, val);
      }
    }
  };

  const checkPairMatch = (eng, esp) => {
    const pair = currentEx.pairs.find(p => p.english === eng && p.spanish === esp);
    if (pair) {
      sounds.playCorrect();
      setMatchedPairs(prev => [...prev, eng]);
      setSelectedEng(null);
      setSelectedEsp(null);
    } else {
      sounds.playWrong();
      setTimeout(() => {
        setSelectedEng(null);
        setSelectedEsp(null);
      }, 500);
    }
  };

  // Check the answer
  const handleCheck = () => {
    sounds.playClick();

    if (currentEx.type === 'flashcard') {
      // Flashcards are informational, automatically pass
      sounds.playCorrect();
      setCheckStatus('correct');
      return;
    }

    let isCorrect = false;
    let expectedText = '';

    if (currentEx.type === 'multiple_choice' || currentEx.type === 'listening') {
      isCorrect = selectedOption === currentEx.correctIndex;
      expectedText = currentEx.options[currentEx.correctIndex];
    } else if (currentEx.type === 'sentence_builder') {
      const formed = sentenceWords.map(w => w.word).join(' ');
      isCorrect = formed.toLowerCase() === currentEx.correctSentence.toLowerCase();
      expectedText = currentEx.correctSentence;
    } else if (currentEx.type === 'speaking') {
      isCorrect = voiceResult?.isMatch || false;
      expectedText = currentEx.targetText;
    } else if (currentEx.type === 'match_pairs') {
      isCorrect = matchedPairs.length === currentEx.pairs.length;
      expectedText = '¡Todas las palabras emparejadas con éxito!';
    }

    if (isCorrect) {
      sounds.playCorrect();
      setCheckStatus('correct');
    } else {
      sounds.playWrong();
      setCheckStatus('wrong');
      setCorrectAnswerText(expectedText);
      setHearts(prev => Math.max(0, prev - 1));
    }
  };

  // Move to next exercise or finish
  const handleContinue = () => {
    sounds.playClick();
    if (currentIndex + 1 < exercises.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed!
      sounds.playWin();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      addXP(lesson.xp || 20);
      setIsCompleted(true);
    }
  };

  // If lesson completed, show victory celebration
  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-between min-h-[500px] p-6 text-center animate-fade-in">
        <div className="my-auto flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-full flex items-center justify-center shadow-xl shadow-amber-500/20 mb-6 animate-bounce-slow">
            <Trophy size={48} className="text-slate-900" />
          </div>

          <h2 className="text-2xl font-black text-white mb-2">
            ¡Lección Completada!
          </h2>
          <p className="text-sm text-slate-300 max-w-xs mb-6">
            ¡Has dominado <span className="font-bold text-emerald-400">{lesson.title}</span>! Cada palabra te acerca más a hablar inglés con fluidez.
          </p>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-6">
            <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl flex flex-col items-center">
              <span className="text-xs text-slate-400 font-medium">Experiencia</span>
              <span className="text-xl font-black text-indigo-400">+{lesson.xp} XP</span>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl flex flex-col items-center">
              <span className="text-xs text-slate-400 font-medium">Acierto</span>
              <span className="text-xl font-black text-emerald-400">100%</span>
            </div>
          </div>

          <Mascot mood="excited" message="¡Increíble progreso! Estás aprendiendo a la velocidad de la luz 🚀" />
        </div>

        <button
          onClick={onFinish}
          className="w-full max-w-xs py-4 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black rounded-2xl shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
        >
          <span>CONTINUAR APRENDIENDO</span>
          <ArrowRight size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[620px] justify-between pb-4">
      {/* Top Bar with progress and hearts */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between gap-3 mb-3">
          <button
            onClick={onExit}
            className="p-2 text-slate-400 hover:text-slate-200 active:scale-95 transition-colors"
            title="Salir al mapa"
          >
            <X size={22} />
          </button>

          {/* Progress bar */}
          <div className="flex-1 bg-slate-800 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(8, progressPercent)}%` }}
            />
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-1 text-rose-500 font-bold text-sm">
            <Heart size={18} className="fill-rose-500" />
            <span>{hearts}</span>
          </div>
        </div>

        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          {unit.title} • {lesson.title}
        </div>
      </div>

      {/* Main Exercise Area */}
      <div className="flex-1 px-4 py-2 flex flex-col justify-center">
        {/* Flashcard (Presentación didáctica con imagen y fonética) */}
        {currentEx.type === 'flashcard' && (
          <div className="flex flex-col items-center text-center animate-fade-in">
            <span className="text-xs bg-emerald-500/10 text-emerald-400 font-bold px-3 py-1 rounded-full mb-3 border border-emerald-500/20">
              NUEVO VOCABULARIO
            </span>

            <div className="relative w-full max-w-xs bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-500/20">
                <Volume2 size={36} />
              </div>

              <h3 className="text-3xl font-black text-white tracking-wide mb-1">
                {currentEx.word}
              </h3>

              {/* Spanish Phonetic Guide: Tells user how to pronounce it! */}
              <div className="bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700 text-xs font-mono text-amber-300 mb-2">
                Pronunciación: <span className="font-bold font-sans">[{currentEx.phonetic}]</span>
              </div>

              <p className="text-lg font-bold text-emerald-400 mb-4">
                "{currentEx.meaning}"
              </p>

              <div className="flex items-center justify-center gap-3 mb-4">
                <AudioPlayerButton text={currentEx.word} size="lg" />
              </div>

              {currentEx.tip && (
                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-xs text-slate-300 w-full text-left">
                  <span className="font-bold text-amber-400">💡 Truco de aprendizaje: </span>
                  {currentEx.tip}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Multiple Choice */}
        {currentEx.type === 'multiple_choice' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div>
              <h3 className="text-lg font-extrabold text-white mb-1">
                {currentEx.question}
              </h3>
              <p className="text-sm text-slate-400">Selecciona la opción correcta en inglés:</p>
            </div>

            <div className="grid grid-cols-1 gap-2.5 my-2">
              {currentEx.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    disabled={checkStatus !== 'idle'}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedOption(idx);
                    }}
                    className={`p-4 rounded-2xl border-2 font-bold text-left transition-all flex items-center justify-between active:scale-[0.98] ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 shadow-md shadow-emerald-500/10'
                        : 'border-slate-800 bg-slate-900 hover:border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="text-base">{option}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(option);
                      }}
                      className="p-2 text-slate-400 hover:text-emerald-400"
                    >
                      <Volume2 size={18} />
                    </button>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Listening Exercise */}
        {currentEx.type === 'listening' && (
          <div className="flex flex-col items-center text-center animate-fade-in">
            <h3 className="text-lg font-extrabold text-white mb-2">
              {currentEx.question}
            </h3>

            <div className="my-6">
              <AudioPlayerButton text={currentEx.targetText} size="lg" />
              <p className="text-xs text-slate-400 mt-2">
                Toca la bocina para escuchar normal o la tortuga para cámara lenta
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {currentEx.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    disabled={checkStatus !== 'idle'}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedOption(idx);
                    }}
                    className={`p-4 rounded-2xl border-2 font-bold text-center transition-all active:scale-95 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                        : 'border-slate-800 bg-slate-900 hover:border-slate-700 text-slate-200'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Sentence Builder (Word Bank) */}
        {currentEx.type === 'sentence_builder' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <h3 className="text-base font-extrabold text-white">
              {currentEx.question}
            </h3>

            {/* Answer slot area */}
            <div className="min-h-[70px] bg-slate-900/80 border-2 border-dashed border-slate-700 rounded-2xl p-3 flex flex-wrap gap-2 items-center">
              {sentenceWords.length === 0 ? (
                <span className="text-xs text-slate-500 italic">
                  Toca las palabras de abajo para formar la oración...
                </span>
              ) : (
                sentenceWords.map(item => (
                  <button
                    key={item.id}
                    disabled={checkStatus !== 'idle'}
                    onClick={() => handleRemoveWord(item)}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-md active:scale-95 transition-all"
                  >
                    {item.word}
                  </button>
                ))
              )}
            </div>

            {/* Available words bank */}
            <div className="mt-4">
              <span className="text-xs text-slate-400 mb-2 block font-medium">Banco de palabras:</span>
              <div className="flex flex-wrap gap-2 justify-center">
                {availableWords.map(item => (
                  <button
                    key={item.id}
                    disabled={checkStatus !== 'idle'}
                    onClick={() => handleSelectWord(item)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-sm rounded-xl shadow active:scale-95 transition-all"
                  >
                    {item.word}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Speaking Exercise */}
        {currentEx.type === 'speaking' && (
          <div className="flex flex-col items-center text-center animate-fade-in">
            <span className="text-xs bg-indigo-500/10 text-indigo-400 font-bold px-3 py-1 rounded-full mb-3 border border-indigo-500/20">
              PRÁCTICA ORAL DE VOZ
            </span>

            <h3 className="text-xl font-black text-white tracking-wide mb-1">
              "{currentEx.targetText}"
            </h3>

            <div className="text-xs text-amber-300 font-mono mb-2">
              Pronuncia como: <span className="font-bold font-sans">[{currentEx.phonetic}]</span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Significado: "{currentEx.meaning}"
            </p>

            <div className="mb-4">
              <AudioPlayerButton text={currentEx.targetText} size="md" />
            </div>

            <VoiceRecorder
              targetText={currentEx.targetText}
              onResult={(res) => {
                setVoiceResult(res);
              }}
            />
          </div>
        )}

        {/* Match Pairs Exercise */}
        {currentEx.type === 'match_pairs' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <h3 className="text-base font-extrabold text-white text-center">
              {currentEx.question}
            </h3>

            <div className="grid grid-cols-2 gap-3 my-2">
              {/* English column */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-400 text-center">Inglés</span>
                {currentEx.pairs.map((p, idx) => {
                  const isMatched = matchedPairs.includes(p.english);
                  const isSelected = selectedEng === p.english;
                  return (
                    <button
                      key={idx}
                      disabled={isMatched || checkStatus !== 'idle'}
                      onClick={() => handleSelectPairItem('eng', p.english)}
                      className={`p-3 rounded-xl border text-sm font-bold transition-all ${
                        isMatched
                          ? 'bg-slate-900/40 border-slate-800 text-slate-600 line-through'
                          : isSelected
                          ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                          : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-600'
                      }`}
                    >
                      {p.english}
                    </button>
                  );
                })}
              </div>

              {/* Spanish column */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-400 text-center">Español</span>
                {currentEx.pairs.map((p, idx) => {
                  const isMatched = matchedPairs.includes(p.english);
                  const isSelected = selectedEsp === p.spanish;
                  return (
                    <button
                      key={idx}
                      disabled={isMatched || checkStatus !== 'idle'}
                      onClick={() => handleSelectPairItem('esp', p.spanish)}
                      className={`p-3 rounded-xl border text-sm font-bold transition-all ${
                        isMatched
                          ? 'bg-slate-900/40 border-slate-800 text-slate-600 line-through'
                          : isSelected
                          ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                          : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-600'
                      }`}
                    >
                      {p.spanish}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Verification Banner */}
      <div className="mt-auto pt-2">
        {checkStatus === 'idle' ? (
          <div className="px-4">
            <button
              onClick={handleCheck}
              disabled={
                currentEx.type === 'multiple_choice' && selectedOption === null
                || currentEx.type === 'listening' && selectedOption === null
                || currentEx.type === 'sentence_builder' && sentenceWords.length === 0
                || currentEx.type === 'speaking' && !voiceResult
                || currentEx.type === 'match_pairs' && matchedPairs.length < currentEx.pairs.length
              }
              className="w-full py-3.5 bg-emerald-500 disabled:bg-slate-800 hover:bg-emerald-400 disabled:text-slate-600 text-slate-950 font-black rounded-2xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-wider"
            >
              {currentEx.type === 'flashcard' ? 'Entendido / Continuar' : 'Comprobar'}
            </button>
          </div>
        ) : (
          <div
            className={`p-4 rounded-3xl border-t-2 animate-slide-up ${
              checkStatus === 'correct'
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                : 'bg-rose-950/80 border-rose-500 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                  checkStatus === 'correct' ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                }`}
              >
                {checkStatus === 'correct' ? <Check size={22} /> : <X size={22} />}
              </div>
              <div>
                <h4 className="font-black text-base">
                  {checkStatus === 'correct' ? '¡Excelente trabajo!' : 'Solución correcta:'}
                </h4>
                {checkStatus === 'wrong' && (
                  <p className="text-sm font-bold text-white mt-0.5">
                    "{correctAnswerText}"
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleContinue}
              className={`w-full py-3.5 font-black rounded-2xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-wider ${
                checkStatus === 'correct'
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                  : 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20'
              }`}
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
