// tts.js — text-to-speech using the browser's built-in Web Speech API.
// No API key, no network: speech is synthesized locally by the device's voices.
const TTS = (() => {
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  let voice = null;

  function pickVoice() {
    if (!supported) return;
    const voices = window.speechSynthesis.getVoices();
    // Prefer a Spain Spanish voice, then any Spanish voice.
    voice =
      voices.find((v) => /^es[-_]?ES/i.test(v.lang)) ||
      voices.find((v) => /^es/i.test(v.lang)) ||
      null;
  }

  function init() {
    if (!supported) return;
    pickVoice();
    // Voices often load asynchronously; refresh when they arrive.
    if ("onvoiceschanged" in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = pickVoice;
    }
  }

  // Returns true if speech was attempted, false if unsupported.
  function speak(text) {
    if (!supported || !text) return false;
    window.speechSynthesis.cancel(); // stop anything already speaking
    if (!voice) pickVoice();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = (voice && voice.lang) || "es-ES";
    if (voice) u.voice = voice;
    u.rate = 0.95; // slightly slower aids comprehension
    u.pitch = 1;
    window.speechSynthesis.speak(u);
    return true;
  }

  // True only if speech is supported AND a Spanish voice is available.
  function hasSpanishVoice() {
    if (!supported) return false;
    if (!voice) pickVoice();
    return !!voice;
  }

  return {
    init,
    speak,
    hasSpanishVoice,
    get supported() { return supported; },
  };
})();
