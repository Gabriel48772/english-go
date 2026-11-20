import React from 'react';

export const Mascot = ({ mood = 'happy', message = '', size = 'md' }) => {
  // SVG animated mascot "Toby el Búho Maestro"
  const getEyeExpression = () => {
    switch (mood) {
      case 'excited':
        return (
          <>
            <circle cx="38" cy="42" r="8" fill="#1e293b" />
            <circle cx="41" cy="40" r="3" fill="#ffffff" />
            <circle cx="62" cy="42" r="8" fill="#1e293b" />
            <circle cx="65" cy="40" r="3" fill="#ffffff" />
            {/* Stars / sparkles */}
            <path d="M 32 30 Q 38 26 44 30" stroke="#047857" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 56 30 Q 62 26 68 30" stroke="#047857" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        );
      case 'thinking':
        return (
          <>
            <circle cx="38" cy="40" r="6" fill="#1e293b" />
            <circle cx="62" cy="44" r="7" fill="#1e293b" />
            <line x1="32" y1="31" x2="44" y2="33" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="56" y1="36" x2="68" y2="33" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />
          </>
        );
      case 'sad':
        return (
          <>
            <circle cx="38" cy="44" r="6" fill="#1e293b" />
            <circle cx="62" cy="44" r="6" fill="#1e293b" />
            {/* Sad eyebrows */}
            <line x1="33" y1="34" x2="43" y2="38" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="57" y1="38" x2="67" y2="34" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />
            {/* Teardrop */}
            <path d="M 68 47 Q 70 51 68 53 Q 66 51 68 47" fill="#38bdf8" />
          </>
        );
      default: // happy
        return (
          <>
            <circle cx="38" cy="42" r="7" fill="#1e293b" />
            <circle cx="40" cy="40" r="2.5" fill="#ffffff" />
            <circle cx="62" cy="42" r="7" fill="#1e293b" />
            <circle cx="64" cy="40" r="2.5" fill="#ffffff" />
            <path d="M 33 32 Q 38 29 43 32" stroke="#047857" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 57 32 Q 62 29 67 32" stroke="#047857" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        );
    }
  };

  const dimensions = size === 'sm' ? 'w-12 h-12' : size === 'lg' ? 'w-24 h-24' : 'w-16 h-16';

  return (
    <div className="flex items-center gap-3">
      <div className={`relative ${dimensions} flex-shrink-0 animate-bounce-slow`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Owl Body */}
          <ellipse cx="50" cy="56" rx="36" ry="38" fill="#10b981" />
          {/* Owl Belly */}
          <ellipse cx="50" cy="62" rx="24" ry="24" fill="#6ee7b7" />
          {/* Belly Feathers pattern */}
          <path d="M 43 56 Q 50 60 57 56" stroke="#059669" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 41 64 Q 50 68 59 64" stroke="#059669" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 44 72 Q 50 76 56 72" stroke="#059669" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Ears / Tuft */}
          <polygon points="24,28 34,16 40,28" fill="#059669" />
          <polygon points="60,28 66,16 76,28" fill="#059669" />

          {/* Eye patches */}
          <circle cx="38" cy="42" r="14" fill="#ffffff" />
          <circle cx="62" cy="42" r="14" fill="#ffffff" />

          {/* Eyes & Eyebrows */}
          {getEyeExpression()}

          {/* Beak */}
          <polygon points="46,47 54,47 50,56" fill="#f59e0b" />

          {/* Cheeks blush */}
          <circle cx="28" cy="48" r="4" fill="#f43f5e" opacity="0.4" />
          <circle cx="72" cy="48" r="4" fill="#f43f5e" opacity="0.4" />

          {/* Graduation Cap (Mini) */}
          <polygon points="50,6 26,16 50,22 74,16" fill="#1e293b" />
          <polygon points="38,20 38,27 62,27 62,20" fill="#0f172a" />
          <line x1="68" y1="18" x2="74" y2="28" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="74" cy="29" r="2" fill="#fbbf24" />

          {/* Feet */}
          <ellipse cx="40" cy="93" rx="7" ry="3" fill="#f59e0b" />
          <ellipse cx="60" cy="93" rx="7" ry="3" fill="#f59e0b" />
        </svg>
      </div>

      {message && (
        <div className="relative bg-slate-800 text-slate-100 text-sm font-medium px-4 py-2.5 rounded-2xl rounded-tl-none border border-slate-700 shadow-lg max-w-xs animate-fade-in">
          <div className="absolute top-2 -left-2 w-0 h-0 border-t-8 border-t-slate-800 border-l-8 border-l-transparent"></div>
          {message}
        </div>
      )}
    </div>
  );
};
