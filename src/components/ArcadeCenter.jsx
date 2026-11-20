import React, { useState, useEffect } from 'react';
import { Gamepad2, Zap, Brain, Puzzle, Headphones, Trophy, RotateCcw, Volume2, ArrowLeft, Check, Sparkles, Clock, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds, speakText } from '../utils/audio';
import { BLITZ_QUESTIONS, MEMORY_CARDS, SENTENCE_PUZZLES, AUDIO_MYSTERIES } from '../data/games';

export const ArcadeCenter = ({ addXP }) => {
  const [activeGame, setActiveGame] = useState(null); // null, 'blitz', 'memory', 'puzzle', 'detective'

  return (
    <div className="flex flex-col h-full max-w-lg mx-auto p-4 space-y-4">
      {!activeGame ? (
        <GameLobby onSelectGame={(game) => {
          sounds.playClick();
          setActiveGame(game);
        }} />
      ) : activeGame === 'blitz' ? (
        <WordBlitzGame onExit={() => setActiveGame(null)} addXP={addXP} />
      ) : activeGame === 'memory' ? (
        <MemoryFlipGame onExit={() => setActiveGame(null)} addXP={addXP} />
      ) : activeGame === 'puzzle' ? (
        <SentencePuzzleGame onExit={() => setActiveGame(null)} addXP={addXP} />
      ) : (
        <AudioDetectiveGame onExit={() => setActiveGame(null)} addXP={addXP} />
      )}
    </div>
  );
};

// --- LOBBY ---
const GameLobby = ({ onSelectGame }) => {
  const games = [
    {
      id: 'blitz',
      title: 'Word Blitz',
      subtitle: 'Reflejos a toda velocidad',
      desc: '30 segundos para acertar la mayor cantidad de palabras en inglés. ¡Mantén tu combo!',
      icon: Zap,
      gradient: 'from-amber-500 to-rose-600',
      badge: 'Contrarreloj'
    },
    {
      id: 'memory',
      title: 'Memory Flip',
      subtitle: 'Memoria Auditiva y Visual',
      desc: 'Encuentra las parejas de cartas. Cada carta habla en inglés nativo al voltearse.',
      icon: Brain,
      gradient: 'from-cyan-500 to-indigo-600',
      badge: 'Concentración'
    },
    {
      id: 'puzzle',
      title: 'Sentence Puzzle',
      subtitle: 'Rompecabezas de Frases',
      desc: 'Conecta bloques magnéticos para estructurar oraciones reales de la vida cotidiana.',
      icon: Puzzle,
      gradient: 'from-emerald-500 to-teal-700',
      badge: 'Gramática Táctil'
    },
    {
      id: 'detective',
      title: 'Audio Detective',
      subtitle: 'Descifra el Audio Secreto',
      desc: 'Escucha pistas secretas en inglés y ordena las letras para descifrar la palabra clave.',
      icon: Headphones,
      gradient: 'from-purple-500 to-pink-600',
      badge: 'Oído Agudo'
    }
  ];

  return (
    <div className="space-y-4 animate-fade-in pb-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/30 rounded-3xl p-5 shadow-xl">
        <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-widest mb-1">
          <Gamepad2 size={16} />
          <span>Zona de Juegos & Puzzles</span>
        </div>
        <h2 className="text-xl font-black text-white">
          Aprende Jugando sin Aburrirte
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          Fija el vocabulario en tu mente con dinámicas rápidas, retos contrarreloj y memoria auditiva.
        </p>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 gap-3">
        {games.map(game => {
          const Icon = game.icon;
          return (
            <div
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              className="group bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl p-4 transition-all cursor-pointer active:scale-[0.98] shadow-lg hover:shadow-indigo-500/10 flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${game.gradient} flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:scale-105 transition-transform`}>
                  <Icon size={26} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-extrabold text-white text-base leading-none">
                      {game.title}
                    </h3>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-semibold border border-slate-700">
                      {game.badge}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 block mb-0.5">
                    {game.subtitle}
                  </span>
                  <p className="text-[11px] text-slate-400 max-w-xs leading-snug">
                    {game.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- 1. WORD BLITZ (CONTRARRELOJ) ---
const WordBlitzGame = ({ onExit, addXP }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const question = BLITZ_QUESTIONS[currentQuestionIdx % BLITZ_QUESTIONS.length];

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      sounds.playWin();
      confetti({ particleCount: 70, spread: 60 });
      addXP(Math.round(score * 1.5));
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (option) => {
    if (option === question.correct) {
      sounds.playCorrect();
      speakText(option);
      setScore(prev => prev + 10 * combo);
      setCombo(prev => Math.min(prev + 1, 4));
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      sounds.playWrong();
      setCombo(1);
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    sounds.playClick();
    setTimeLeft(30);
    setScore(0);
    setCombo(1);
    setCurrentQuestionIdx(0);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[460px] p-6 text-center animate-fade-in">
        <div className="w-20 h-20 bg-amber-500 rounded-3xl flex items-center justify-center text-slate-950 mb-4 shadow-xl">
          <Trophy size={40} />
        </div>
        <h3 className="text-2xl font-black text-white mb-1">¡Tiempo Agotado!</h3>
        <p className="text-xs text-slate-300 mb-6">Demostraste reflejos rápidos de vocabulario.</p>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 w-full max-w-xs mb-6 grid grid-cols-2 gap-2">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Puntuación</span>
            <span className="text-2xl font-black text-amber-400">{score}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">XP Ganado</span>
            <span className="text-2xl font-black text-emerald-400">+{Math.round(score * 1.5)}</span>
          </div>
        </div>

        <div className="flex gap-2 w-full max-w-xs">
          <button
            onClick={handleRestart}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
          >
            Jugar de nuevo
          </button>
          <button
            onClick={onExit}
            className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl"
          >
            Salir al lobby
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between min-h-[500px] animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="p-2 text-slate-400 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 px-3 py-1 rounded-full font-mono text-sm font-bold">
          <Clock size={16} />
          <span>{timeLeft}s</span>
        </div>
        <div className="flex items-center gap-1 text-amber-400 font-bold text-sm bg-slate-800 px-3 py-1 rounded-full">
          <Flame size={16} />
          <span>Combo x{combo}</span>
        </div>
      </div>

      {/* Target Word */}
      <div className="my-auto text-center">
        <span className="text-xs text-slate-400 uppercase tracking-widest font-bold block mb-1">
          ¿Cómo se dice en inglés?
        </span>
        <h2 className="text-3xl font-black text-white tracking-wide mb-2">
          "{question.esp}"
        </h2>
        <span className="text-xs text-slate-500">Toca la opción correcta lo más rápido posible</span>
      </div>

      {/* 3 Options */}
      <div className="space-y-2.5 pb-4">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt)}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 active:scale-95 border-2 border-slate-700 hover:border-emerald-500 rounded-2xl text-white font-bold text-base transition-all shadow-md"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- 2. MEMORY FLIP (MEMORIA AUDITIVA) ---
const MemoryFlipGame = ({ onExit, addXP }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Generate card pairs: one in English, one in Spanish
    const deck = [];
    MEMORY_CARDS.slice(0, 6).forEach((item) => {
      deck.push({ id: `${item.id}-eng`, pairId: item.id, label: item.eng, type: 'eng', icon: item.icon, phon: item.phon });
      deck.push({ id: `${item.id}-esp`, pairId: item.id, label: item.esp, type: 'esp', icon: item.icon });
    });
    setCards(deck.sort(() => Math.random() - 0.5));
  }, []);

  const handleCardClick = (card) => {
    if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.id)) return;

    sounds.playClick();
    if (card.type === 'eng') {
      speakText(card.label);
    }

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const firstCard = cards.find(c => c.id === newFlipped[0]);
      const secondCard = cards.find(c => c.id === newFlipped[1]);

      if (firstCard.pairId === secondCard.pairId) {
        // Matched!
        sounds.playCorrect();
        const newMatched = [...matched, firstCard.id, secondCard.id];
        setMatched(newMatched);
        setFlipped([]);

        if (newMatched.length === cards.length) {
          setTimeout(() => {
            sounds.playWin();
            confetti({ particleCount: 80, spread: 70 });
            addXP(30);
            setIsCompleted(true);
          }, 400);
        }
      } else {
        sounds.playWrong();
        setTimeout(() => {
          setFlipped([]);
        }, 900);
      }
    }
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[460px] p-6 text-center animate-fade-in">
        <div className="w-20 h-20 bg-cyan-500 rounded-3xl flex items-center justify-center text-slate-950 mb-4 shadow-xl">
          <Brain size={40} />
        </div>
        <h3 className="text-2xl font-black text-white mb-1">¡Memoria Perfecta!</h3>
        <p className="text-xs text-slate-300 mb-6">
          Has emparejado todas las palabras asociando su sonido nativo y significado.
        </p>
        <span className="text-lg font-black text-emerald-400 mb-6">+30 XP Ganados</span>
        <button
          onClick={onExit}
          className="w-full max-w-xs py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase"
        >
          Volver al Lobby
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <button onClick={onExit} className="p-2 text-slate-400 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          Parejas encontradas: {matched.length / 2} de {cards.length / 2}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5 my-auto">
        {cards.map(card => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
          const isMatched = matched.includes(card.id);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`h-24 rounded-2xl font-bold flex flex-col items-center justify-center p-2 text-center transition-all active:scale-95 border-2 ${
                isMatched
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 opacity-80'
                  : isFlipped
                  ? 'bg-slate-800 border-cyan-400 text-white shadow-lg'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-600'
              }`}
            >
              {isFlipped ? (
                <>
                  <span className="text-2xl mb-1">{card.icon}</span>
                  <span className="text-xs font-black leading-tight">{card.label}</span>
                  {card.phon && (
                    <span className="text-[9px] text-amber-300/80 font-mono mt-0.5">[{card.phon}]</span>
                  )}
                </>
              ) : (
                <span className="text-2xl opacity-40">❓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- 3. SENTENCE PUZZLE (ROMPECABEZAS) ---
const SentencePuzzleGame = ({ onExit, addXP }) => {
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [placedPieces, setPlacedPieces] = useState([]);
  const [availablePieces, setAvailablePieces] = useState([]);
  const [isDone, setIsDone] = useState(false);

  const currentPuzzle = SENTENCE_PUZZLES[puzzleIdx];

  useEffect(() => {
    if (!currentPuzzle) return;
    setPlacedPieces([]);
    setAvailablePieces([...currentPuzzle.pieces].sort(() => Math.random() - 0.5));
  }, [puzzleIdx]);

  const handlePlace = (piece) => {
    sounds.playClick();
    setAvailablePieces(prev => prev.filter(p => p !== piece));
    setPlacedPieces(prev => [...prev, piece]);
  };

  const handleRemove = (piece) => {
    sounds.playClick();
    setPlacedPieces(prev => prev.filter(p => p !== piece));
    setAvailablePieces(prev => [...prev, piece]);
  };

  const handleCheck = () => {
    const isCorrect = placedPieces.length === currentPuzzle.correct.length &&
      placedPieces.every((val, index) => val === currentPuzzle.correct[index]);

    if (isCorrect) {
      sounds.playCorrect();
      speakText(placedPieces.join(' '));
      if (puzzleIdx + 1 < SENTENCE_PUZZLES.length) {
        setTimeout(() => setPuzzleIdx(prev => prev + 1), 700);
      } else {
        sounds.playWin();
        confetti({ particleCount: 75, spread: 60 });
        addXP(35);
        setIsDone(true);
      }
    } else {
      sounds.playWrong();
    }
  };

  if (isDone) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[460px] p-6 text-center animate-fade-in">
        <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-slate-950 mb-4 shadow-xl">
          <Puzzle size={40} />
        </div>
        <h3 className="text-2xl font-black text-white mb-1">¡Rompecabezas Completo!</h3>
        <p className="text-xs text-slate-300 mb-6">
          Has conectado las piezas gramaticales para crear oraciones fluidas.
        </p>
        <button onClick={onExit} className="w-full max-w-xs py-3.5 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs uppercase">
          Volver al Lobby
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between min-h-[500px] animate-fade-in">
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="p-2 text-slate-400 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Rompecabezas {puzzleIdx + 1} de {SENTENCE_PUZZLES.length}
        </span>
      </div>

      <div className="my-auto">
        <span className="text-xs text-emerald-400 uppercase tracking-wider font-bold block mb-1">
          Objetivo en español:
        </span>
        <h3 className="text-lg font-black text-white mb-4">
          "{currentPuzzle.goalSpanish}"
        </h3>

        {/* Puzzle slots */}
        <div className="min-h-[80px] bg-slate-950/70 border-2 border-dashed border-slate-700 rounded-2xl p-3 flex flex-wrap gap-2 items-center mb-6">
          {placedPieces.length === 0 ? (
            <span className="text-xs text-slate-500 italic">
              Toca las piezas magnéticas de abajo para armar la oración...
            </span>
          ) : (
            placedPieces.map((piece, idx) => (
              <button
                key={idx}
                onClick={() => handleRemove(piece)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-md active:scale-95 transition-all"
              >
                {piece}
              </button>
            ))
          )}
        </div>

        {/* Available Pieces */}
        <span className="text-xs text-slate-400 font-bold block mb-2">Piezas disponibles:</span>
        <div className="flex flex-wrap gap-2">
          {availablePieces.map((piece, idx) => (
            <button
              key={idx}
              onClick={() => handlePlace(piece)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-bold text-sm rounded-xl shadow active:scale-95 transition-all"
            >
              {piece}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleCheck}
        disabled={placedPieces.length === 0}
        className="w-full py-3.5 bg-emerald-500 disabled:bg-slate-800 hover:bg-emerald-400 disabled:text-slate-600 text-slate-950 font-black rounded-2xl shadow-lg transition-all uppercase tracking-wider"
      >
        Comprobar Conexión
      </button>
    </div>
  );
};

// --- 4. AUDIO DETECTIVE (DESCIFRA EL MENSAJE) ---
const AudioDetectiveGame = ({ onExit, addXP }) => {
  const [mysteryIdx, setMysteryIdx] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentMystery = AUDIO_MYSTERIES[mysteryIdx];

  const handlePlayAudio = () => {
    sounds.playClick();
    speakText(currentMystery.audio);
  };

  const handleSelectLetter = (char, idx) => {
    sounds.playClick();
    setSelectedLetters(prev => [...prev, { char, idx }]);
  };

  const handleRemoveLetter = (item) => {
    sounds.playClick();
    setSelectedLetters(prev => prev.filter(l => l.idx !== item.idx));
  };

  const handleCheck = () => {
    const formed = selectedLetters.map(l => l.char).join('');
    if (formed.toUpperCase() === currentMystery.targetPhrase.toUpperCase()) {
      sounds.playCorrect();
      speakText(currentMystery.targetPhrase);
      if (mysteryIdx + 1 < AUDIO_MYSTERIES.length) {
        setTimeout(() => {
          setSelectedLetters([]);
          setMysteryIdx(prev => prev + 1);
        }, 700);
      } else {
        sounds.playWin();
        confetti({ particleCount: 75, spread: 60 });
        addXP(35);
        setIsCompleted(true);
      }
    } else {
      sounds.playWrong();
    }
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[460px] p-6 text-center animate-fade-in">
        <div className="w-20 h-20 bg-purple-500 rounded-3xl flex items-center justify-center text-white mb-4 shadow-xl">
          <Headphones size={40} />
        </div>
        <h3 className="text-2xl font-black text-white mb-1">¡Caso Resuelto Detective!</h3>
        <p className="text-xs text-slate-300 mb-6">
          Has descifrado todos los audios y palabras ocultas.
        </p>
        <button onClick={onExit} className="w-full max-w-xs py-3.5 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs uppercase">
          Volver al Lobby
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between min-h-[500px] animate-fade-in">
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="p-2 text-slate-400 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Misterio {mysteryIdx + 1} de {AUDIO_MYSTERIES.length}
        </span>
      </div>

      <div className="my-auto text-center">
        {/* Play Mystery Audio Button */}
        <button
          onClick={handlePlayAudio}
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/30 active:scale-95 animate-pulse"
        >
          <Volume2 size={36} />
        </button>
        <span className="text-xs text-slate-400 block mb-3 font-semibold">Toca para escuchar la pista secreta</span>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 mb-4 text-left max-w-xs mx-auto">
          <p className="text-xs text-slate-300 mb-1">
            <span className="font-bold text-amber-400">🕵️‍♂️ Pista: </span>
            {currentMystery.spanishClue}
          </p>
          <p className="text-[11px] text-slate-400 font-mono">
            Suena parecido a: <span className="text-amber-300 font-sans font-bold">[{currentMystery.phoneticClue}]</span>
          </p>
        </div>

        {/* Word Slot */}
        <div className="flex justify-center gap-1.5 min-h-[50px] mb-4">
          {selectedLetters.map((l, i) => (
            <button
              key={i}
              onClick={() => handleRemoveLetter(l)}
              className="w-10 h-12 bg-purple-600 text-white font-black text-lg rounded-xl shadow-md"
            >
              {l.char}
            </button>
          ))}
        </div>

        {/* Letter tiles */}
        <div className="flex flex-wrap justify-center gap-1.5 max-w-xs mx-auto">
          {currentMystery.letters.map((char, idx) => {
            const isUsed = selectedLetters.some(l => l.idx === idx);
            return (
              <button
                key={idx}
                disabled={isUsed}
                onClick={() => handleSelectLetter(char, idx)}
                className={`w-9 h-11 rounded-xl font-black text-sm transition-all ${
                  isUsed
                    ? 'bg-slate-900 text-slate-700 opacity-40'
                    : 'bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 shadow active:scale-95'
                }`}
              >
                {char}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleCheck}
        disabled={selectedLetters.length === 0}
        className="w-full py-3.5 bg-emerald-500 disabled:bg-slate-800 hover:bg-emerald-400 disabled:text-slate-600 text-slate-950 font-black rounded-2xl shadow-lg transition-all uppercase tracking-wider"
      >
        Descifrar Palabra
      </button>
    </div>
  );
};
