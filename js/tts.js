// tts.js — text-to-speech using the browser's built-in Web Speech API.
// No API key, no network: speech is synthesized locally by the device's voices.
//
// Note: Windows (and some other systems) do not ship Spanish TTS voices by
// default. When no Spanish voice is present we still speak — using an available
// voice — so the button is never silent, and we surface a hint on how to add a
// real Spanish voice for authentic pronunciation.
const TTS = (() => {
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  let spanishVoice = null;   // best Spanish voice, if the device has one
  let fallbackVoice = null;  // any voice, so output is never silent

  function pickVoices() {
    if (!supported) return;
    const voices = window.speechSynthesis.getVoices();
    spanishVoice =
      voices.find((v) => /^es[-_]?ES/i.test(v.lang)) ||
      voices.find((v) => /^es/i.test(v.lang)) ||
      null;
    fallbackVoice = voices.find((v) => v.default) || voices[0] || null;
  }

  function init() {
    if (!supported) return;
    pickVoices();
    // Voices frequently load asynchronously in Chrome; refresh when they arrive.
    if ("onvoiceschanged" in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = pickVoices;
    }
  }

  // speak(text, onNoSpanishVoice)
  // Returns true if speech was attempted. onNoSpanishVoice() is called (once per
  // call) when we had to fall back to a non-Spanish voice, so the UI can warn.
  function speak(text, onNoSpanishVoice) {
    if (!supported || !text) return false;
    const synth = window.speechSynthesis;
    if (!spanishVoice && !fallbackVoice) pickVoices();

    const chosen = spanishVoice || fallbackVoice;
    if (!chosen) return false; // genuinely no voices at all

    // Only cancel if something is actually queued/playing — cancelling
    // immediately before speak() can swallow the new utterance in Chrome.
    if (synth.speaking || synth.pending) synth.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.voice = chosen;
    // Claim 'es-ES' only when we truly have a Spanish voice. With no Spanish
    // voice, asking for es-ES makes Chrome/Windows produce no audio at all, so
    // we use the chosen voice's own language to guarantee audible output.
    u.lang = spanishVoice ? spanishVoice.lang : chosen.lang || "es-ES";
    u.rate = 0.95;
    u.pitch = 1;

    synth.speak(u);
    // Work around Chrome occasionally parking the queue in a paused state.
    try { synth.resume(); } catch (e) {}

    if (!spanishVoice && typeof onNoSpanishVoice === "function") {
      onNoSpanishVoice();
    }
    return true;
  }

  function hasSpanishVoice() {
    if (!supported) return false;
    if (!spanishVoice) pickVoices();
    return !!spanishVoice;
  }

  return {
    init,
    speak,
    hasSpanishVoice,
    get supported() { return supported; },
  };
})();
