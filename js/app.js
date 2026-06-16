// app.js — navigation and bootstrap
(function () {
  const views = ["flashcards", "lessons", "quiz", "conjugation", "chat"];
  const modules = { flashcards: Flashcards, lessons: Lessons, quiz: Quiz, conjugation: Conjugation, chat: Chat };

  // Shared "no Spanish voice" banner, shown once per session across all screens.
  const VOICE_DISMISS_KEY = "es_voice_hint_dismissed";
  let voiceBannerShown = false;
  window.showVoiceBanner = function () {
    if (voiceBannerShown || localStorage.getItem(VOICE_DISMISS_KEY) === "1") return;
    voiceBannerShown = true;
    document.getElementById("voiceBannerText").innerHTML =
      "🔈 No Spanish voice is installed on this device, so pronunciation uses your " +
      "default voice. For an authentic accent, add a Spanish voice — " +
      "<em>Windows: Settings → Time &amp; language → Language &amp; region → Add a " +
      "language → Spanish</em> (include Speech), then reload.";
    document.getElementById("voiceBanner").hidden = false;
  };

  function showView(name) {
    views.forEach((v) => {
      document.getElementById("view-" + v).hidden = v !== name;
    });
    document.querySelectorAll(".tab").forEach((t) => {
      t.classList.toggle("active", t.dataset.view === name);
    });
    if (modules[name] && modules[name].onShow) modules[name].onShow();
    location.hash = name;
  }

  function init() {
    TTS.init();
    Flashcards.init();
    Lessons.init();
    Quiz.init();
    Conjugation.init();
    Chat.init();

    document.querySelectorAll(".tab").forEach((tab) => {
      tab.onclick = () => showView(tab.dataset.view);
    });

    document.getElementById("voiceBannerClose").onclick = () => {
      document.getElementById("voiceBanner").hidden = true;
      localStorage.setItem(VOICE_DISMISS_KEY, "1");
    };

    const initial = views.includes(location.hash.slice(1)) ? location.hash.slice(1) : "flashcards";
    showView(initial);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
