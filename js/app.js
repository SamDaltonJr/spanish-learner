// app.js — navigation and bootstrap
(function () {
  const views = ["flashcards", "quiz", "conjugation", "chat"];
  const modules = { flashcards: Flashcards, quiz: Quiz, conjugation: Conjugation, chat: Chat };

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
    Flashcards.init();
    Quiz.init();
    Conjugation.init();
    Chat.init();

    document.querySelectorAll(".tab").forEach((tab) => {
      tab.onclick = () => showView(tab.dataset.view);
    });

    const initial = views.includes(location.hash.slice(1)) ? location.hash.slice(1) : "flashcards";
    showView(initial);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
