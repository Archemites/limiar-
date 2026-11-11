/**
 * Sintetizador 8-Bit (Commodore 64 SID / IBM PC Speaker)
 * Web Audio API - Sem dependências externas
 */

window.RetroSound = (function () {
  let ctx = null;
  let enabled = true;

  function getCtx() {
    if (!enabled) return null;
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function tone(freq, durationMs, type = "square", vol = 0.06, delayMs = 0) {
    const audio = getCtx();
    if (!audio) return;
    const start = audio.currentTime + delayMs / 1000;
    const stop = start + durationMs / 1000;

    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);

    gain.gain.setValueAtTime(vol, start);
    gain.gain.exponentialRampToValueAtTime(0.001, stop);

    osc.connect(gain);
    gain.connect(audio.destination);

    osc.start(start);
    osc.stop(stop);
  }

  return {
    isEnabled() {
      return enabled;
    },
    setEnabled(val) {
      enabled = !!val;
      return enabled;
    },
    toggle() {
      enabled = !enabled;
      if (enabled) this.blip();
      return enabled;
    },
    blip() {
      tone(880, 35, "square", 0.04, 0);
    },
    step(up = true) {
      tone(up ? 660 : 440, 40, "square", 0.045, 0);
      tone(up ? 880 : 330, 50, "square", 0.045, 35);
    },
    diceRoll() {
      const freqs = [262, 330, 392, 523, 659, 784, 587, 698];
      for (let i = 0; i < 6; i++) {
        const f = freqs[Math.floor(Math.random() * freqs.length)];
        tone(f, 35, "square", 0.05, i * 40);
      }
    },
    critSuccess() {
      // C64 Power-up Arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98];
      notes.forEach((n, idx) => tone(n, 70, "square", 0.06, idx * 55));
    },
    critFail() {
      // Descending IBM error buzz
      tone(311, 110, "sawtooth", 0.07, 0);
      tone(233, 110, "sawtooth", 0.07, 110);
      tone(155, 240, "sawtooth", 0.08, 220);
    },
    sanityHit() {
      tone(196, 120, "sawtooth", 0.06, 0);
      tone(185, 180, "triangle", 0.07, 90);
    },
    exportFanfare() {
      const melody = [
        [440, 60, 0],
        [554.37, 60, 65],
        [659.25, 60, 130],
        [880, 150, 195]
      ];
      melody.forEach(([f, d, t]) => tone(f, d, "square", 0.055, t));
    }
  };
})();
