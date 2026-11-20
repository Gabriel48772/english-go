// Audio synthesizer and speech utilities using standard Web Audio & Speech APIs

class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCorrect() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Play happy major triad (C5 -> E5 -> G5 -> C6)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.35);
    });
  }

  playWrong() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.28);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  playClick() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  playWin() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const chord = [523.25, 659.25, 783.99, 987.77, 1046.50];
    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.07 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.6);
    });
  }
}

export const sounds = new SoundFX();

// Text to Speech
export const speakText = (text, slow = false) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }

  window.speechSynthesis.cancel(); // Stop any pending speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = slow ? 0.62 : 0.95;
  utterance.pitch = 1.0;

  // Try to find a natural English voice
  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(v => (v.lang === 'en-US' || v.lang.startsWith('en')) && !v.name.includes('Google') === false) 
               || voices.find(v => v.lang.startsWith('en'));
  if (enVoice) {
    utterance.voice = enVoice;
  }

  window.speechSynthesis.speak(utterance);
};

// Calculate speech similarity between target and spoken text
export const checkSpeechSimilarity = (target, spoken) => {
  const clean = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  const sTarget = clean(target);
  const sSpoken = clean(spoken);

  if (sTarget === sSpoken) return { score: 100, isMatch: true };
  if (sSpoken.includes(sTarget) || sTarget.includes(sSpoken)) {
    return { score: 90, isMatch: true };
  }

  // Levenshtein distance calculation
  const matrix = [];
  for (let i = 0; i <= sTarget.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= sSpoken.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= sTarget.length; i++) {
    for (let j = 1; j <= sSpoken.length; j++) {
      if (sTarget[i - 1] === sSpoken[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  const distance = matrix[sTarget.length][sSpoken.length];
  const maxLen = Math.max(sTarget.length, sSpoken.length);
  const similarity = Math.max(0, Math.round(((maxLen - distance) / maxLen) * 100));

  // If similarity >= 70% it's acceptable for a beginner learner
  return {
    score: similarity,
    isMatch: similarity >= 70
  };
};
