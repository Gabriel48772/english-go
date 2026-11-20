import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { REAL_LIFE_DIALOGUES } from '../data/lessons';
import { speakText, sounds } from '../utils/audio';

export const ConversationPractice = ({ addXP }) => {
  const [selectedDialogueId, setSelectedDialogueId] = useState(REAL_LIFE_DIALOGUES[0].id);
  const [messageIndex, setMessageIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const activeDialogue = REAL_LIFE_DIALOGUES.find(d => d.id === selectedDialogueId);
  const messages = activeDialogue.messages || [];

  // Reset when changing dialogue
  const handleSelectDialogue = (id) => {
    sounds.playClick();
    setSelectedDialogueId(id);
    setMessageIndex(0);
    setCompleted(false);
  };

  // Speak bot messages when they appear
  useEffect(() => {
    const currentMsg = messages[messageIndex];
    if (currentMsg && currentMsg.sender === 'bot') {
      speakText(currentMsg.text);
    }
  }, [messageIndex, selectedDialogueId]);

  const handleUserChoice = (option) => {
    if (option.correct) {
      sounds.playCorrect();
      speakText(option.text);
      if (messageIndex + 1 < messages.length) {
        setMessageIndex(prev => prev + 1);
      } else {
        sounds.playWin();
        addXP(25);
        setCompleted(true);
      }
    } else {
      sounds.playWrong();
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setMessageIndex(0);
    setCompleted(false);
  };

  return (
    <div className="flex flex-col h-full max-w-lg mx-auto">
      {/* Dialogue Selector Tabs */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b border-slate-800">
        {REAL_LIFE_DIALOGUES.map(dialogue => (
          <button
            key={dialogue.id}
            onClick={() => handleSelectDialogue(dialogue.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedDialogueId === dialogue.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {dialogue.title}
          </button>
        ))}
      </div>

      {/* Situation banner */}
      <div className="bg-slate-850 px-4 py-2.5 border-b border-slate-800/60 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block">
            SITUACIÓN COTIDIANA
          </span>
          <p className="text-xs text-slate-300 font-medium">
            {activeDialogue.situation}
          </p>
        </div>
        <button
          onClick={handleReset}
          title="Reiniciar diálogo"
          className="p-1.5 bg-slate-850 hover:bg-slate-750 text-slate-400 rounded-lg"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.slice(0, messageIndex + 1).map((msg, idx) => {
          if (msg.sender === 'bot') {
            return (
              <div key={idx} className="flex items-start gap-2.5 animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm shadow">
                  {activeDialogue.avatar}
                </div>
                <div className="max-w-[80%] bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-none p-3 shadow-md">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-bold text-white">{msg.text}</p>
                    <button
                      onClick={() => speakText(msg.text)}
                      className="text-slate-400 hover:text-emerald-400 p-1"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 italic">"{msg.trans}"</p>
                </div>
              </div>
            );
          }

          if (msg.sender === 'user_choices') {
            // User response options
            return (
              <div key={idx} className="my-3 pl-8 animate-fade-in">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                  Tu turno: Selecciona la mejor respuesta:
                </span>
                <div className="space-y-2">
                  {msg.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      disabled={messageIndex > idx}
                      onClick={() => handleUserChoice(opt)}
                      className={`w-full text-left p-3 rounded-2xl border-2 transition-all active:scale-[0.98] ${
                        messageIndex > idx && opt.correct
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                          : 'border-slate-700 bg-slate-800 hover:border-emerald-500 hover:bg-slate-750 text-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">{opt.text}</span>
                        {messageIndex > idx && opt.correct && (
                          <CheckCircle2 size={16} className="text-emerald-400" />
                        )}
                      </div>
                      <span className="text-xs text-slate-400 italic mt-0.5 block">
                        "{opt.trans}"
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          return null;
        })}

        {/* Completion Card */}
        {completed && (
          <div className="bg-emerald-950/60 border border-emerald-500/50 rounded-2xl p-4 text-center animate-fade-in mt-4">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 mb-2">
              <Sparkles size={24} />
            </div>
            <h4 className="font-black text-white text-base">¡Conversación Exitosa!</h4>
            <p className="text-xs text-emerald-200/80 mb-3">
              Has respondido con naturalidad a cada frase. ¡Estás listo para usar esto en la vida real!
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all"
            >
              Practicar otra vez
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
