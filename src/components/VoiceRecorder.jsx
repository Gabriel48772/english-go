import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { checkSpeechSimilarity, sounds } from '../utils/audio';

export const VoiceRecorder = ({ targetText, onResult, autoEvaluate = true }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState(null);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const text = event.results[current][0].transcript;
      setTranscript(text);

      if (event.results[current].isFinal) {
        evaluate(text);
      }
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [targetText]);

  const toggleRecording = () => {
    sounds.playClick();
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setTranscript('');
      setScore(null);
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.warn('Could not start recognition:', err);
      }
    }
  };

  const evaluate = (spokenText) => {
    const evalResult = checkSpeechSimilarity(targetText, spokenText);
    setScore(evalResult);

    if (evalResult.isMatch) {
      sounds.playCorrect();
    } else {
      sounds.playWrong();
    }

    if (onResult) {
      onResult({
        spoken: spokenText,
        score: evalResult.score,
        isMatch: evalResult.isMatch
      });
    }
  };

  if (!isSupported) {
    return (
      <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs text-center">
        💡 El reconocimiento de voz está optimizado para Chrome/Edge o navegadores móviles compatibles. Si estás en otro navegador, puedes continuar con las pruebas de opción múltiple y escucha.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
      <button
        onClick={toggleRecording}
        className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-95 ${
          isRecording
            ? 'bg-rose-600 text-white ring-8 ring-rose-500/30 scale-105 animate-pulse'
            : score?.isMatch
            ? 'bg-emerald-600 text-white ring-4 ring-emerald-500/40'
            : 'bg-indigo-600 hover:bg-indigo-500 text-white'
        }`}
      >
        {isRecording ? <MicOff size={36} /> : <Mic size={36} />}

        {/* Pulse rings when recording */}
        {isRecording && (
          <span className="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping opacity-75"></span>
        )}
      </button>

      <span className="text-xs font-semibold text-slate-300">
        {isRecording
          ? '🎙️ Escuchando tu voz... ¡Habla ahora!'
          : score
          ? 'Toca para intentar de nuevo'
          : 'Presiona el micrófono y habla'}
      </span>

      {/* Transcript & Feedback box */}
      {transcript && (
        <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center mt-1 animate-fade-in shadow-inner">
          <p className="text-xs text-slate-400 mb-1">Lo que el sistema escuchó:</p>
          <p className="text-lg font-bold text-white tracking-wide">
            "{transcript}"
          </p>

          {score && (
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {score.isMatch ? (
                  <CheckCircle2 className="text-emerald-400" size={20} />
                ) : (
                  <AlertCircle className="text-amber-400" size={20} />
                )}
                <span
                  className={`text-sm font-bold ${
                    score.isMatch ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {score.isMatch ? '¡Excelente pronunciación!' : '¡Casi! Inténtalo otra vez'}
                </span>
              </div>
              <span className="text-xs bg-slate-800 px-2.5 py-1 rounded-full text-slate-300 font-mono">
                {score.score}% afinidad
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
