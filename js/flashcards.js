// flashcards.js — spaced-repetition flashcards (simplified SM-2)
const Flashcards = (() => {
  const STORE_KEY = "es_flash_srs";
  const AUTO_KEY = "es_flash_autospeak";
  let srs = load();
  let autoSpeak = localStorage.getItem(AUTO_KEY) === "1";
  let currentDeck = null;
  let queue = [];
  let current = null;
  let flipped = false;
  let dir = "es-en"; // show Spanish, recall English

  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch { return {}; }
  }
  function save() { localStorage.setItem(STORE_KEY, JSON.stringify(srs)); }

  function cardKey(deckId, es) { return `${deckId}::${es}`; }

  function cardState(deckId, es) {
    const k = cardKey(deckId, es);
    if (!srs[k]) srs[k] = { ease: 2.5, interval: 0, due: 0, reps: 0 };
    return srs[k];
  }

  // due if never seen or due timestamp passed
  function isDue(st) { return st.reps === 0 || Date.now() >= st.due; }

  function deckProgress(deck) {
    let learned = 0;
    deck.cards.forEach((c) => {
      const st = srs[cardKey(deck.id, c.es)];
      if (st && st.reps > 0 && st.interval >= 1) learned++;
    });
    return Math.round((learned / deck.cards.length) * 100);
  }

  function renderDeckPicker() {
    const el = document.getElementById("deckPicker");
    el.innerHTML = "";
    VOCAB_DECKS.forEach((deck) => {
      const pct = deckProgress(deck);
      const dueCount = deck.cards.filter((c) => isDue(cardState(deck.id, c.es))).length;
      const div = document.createElement("div");
      div.className = "deck-card";
      div.innerHTML = `
        <div class="deck-emoji">${deck.emoji}</div>
        <h3>${deck.name}</h3>
        <div class="deck-meta">${deck.cards.length} words · ${dueCount} due</div>
        <div class="deck-bar"><span style="width:${pct}%"></span></div>
        <div class="deck-meta" style="margin-top:4px">${pct}% learned</div>`;
      div.onclick = () => startDeck(deck);
      el.appendChild(div);
    });
  }

  function startDeck(deck) {
    currentDeck = deck;
    // due cards first, then the rest; shuffle within
    const due = deck.cards.filter((c) => isDue(cardState(deck.id, c.es)));
    const rest = deck.cards.filter((c) => !isDue(cardState(deck.id, c.es)));
    queue = shuffle(due).concat(shuffle(rest));
    document.getElementById("deckPicker").hidden = true;
    document.getElementById("flashcardStage").hidden = false;
    next();
  }

  function next() {
    flipped = false;
    document.getElementById("flashcard").classList.remove("flipped");
    document.getElementById("rateRow").hidden = true;
    document.getElementById("fcFlip").hidden = false;
    if (queue.length === 0) {
      // refill with all cards for endless practice
      queue = shuffle(currentDeck.cards.slice());
    }
    current = queue.shift();
    const front = document.getElementById("fcFront");
    const back = document.getElementById("fcBack2");
    front.innerHTML = `<div class="word">${current.es}</div><div class="sub">Spanish · tap to reveal</div>`;
    back.innerHTML = `<div class="word">${current.en}</div><div class="sub">${current.es}</div>`;
    updateProgress();
    if (autoSpeak) TTS.speak(current.es, window.showVoiceBanner);
  }

  function updateProgress() {
    const total = currentDeck.cards.length;
    const dueCount = currentDeck.cards.filter((c) => isDue(cardState(currentDeck.id, c.es))).length;
    document.getElementById("fcProgress").textContent =
      `${currentDeck.emoji} ${currentDeck.name} · ${dueCount} due of ${total}`;
  }

  function flip() {
    flipped = !flipped;
    document.getElementById("flashcard").classList.toggle("flipped", flipped);
    if (flipped) {
      document.getElementById("rateRow").hidden = false;
      document.getElementById("fcFlip").hidden = true;
    }
  }

  // grade: again/hard/good/easy -> SM-2-ish update
  function grade(g) {
    const st = cardState(currentDeck.id, current.es);
    st.reps += 1;
    if (g === "again") {
      st.interval = 0;
      st.ease = Math.max(1.3, st.ease - 0.2);
    } else {
      const factor = { hard: 1.2, good: st.ease, easy: st.ease + 0.15 }[g];
      st.interval = st.interval < 1 ? (g === "easy" ? 3 : 1) : Math.round(st.interval * factor);
      if (g === "hard") st.ease = Math.max(1.3, st.ease - 0.15);
      if (g === "easy") st.ease = st.ease + 0.1;
    }
    // store due as ms; interval in days, min 5 min for "again"
    const dayMs = 24 * 60 * 60 * 1000;
    st.due = Date.now() + (st.interval === 0 ? 5 * 60 * 1000 : st.interval * dayMs);
    save();
    next();
  }

  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function backToDecks() {
    document.getElementById("flashcardStage").hidden = true;
    document.getElementById("deckPicker").hidden = false;
    renderDeckPicker();
  }

  function init() {
    renderDeckPicker();
    document.getElementById("flashcard").onclick = flip;
    document.getElementById("fcFlip").onclick = flip;
    document.getElementById("fcBack").onclick = backToDecks;
    document.querySelectorAll("#rateRow .rate").forEach((b) => {
      b.onclick = () => grade(b.dataset.grade);
    });

    // Text-to-speech controls
    const controls = document.getElementById("fcControls");
    const autoBox = document.getElementById("fcAuto");
    if (TTS.supported) {
      autoBox.checked = autoSpeak;
      document.getElementById("fcSpeak").onclick = () => {
        if (current) TTS.speak(current.es, window.showVoiceBanner);
      };
      autoBox.onchange = () => {
        autoSpeak = autoBox.checked;
        localStorage.setItem(AUTO_KEY, autoSpeak ? "1" : "0");
        if (autoSpeak && current) TTS.speak(current.es, window.showVoiceBanner);
      };
    } else {
      // No speech support in this browser — hide the controls entirely.
      controls.hidden = true;
    }
  }

  return { init, onShow: renderDeckPicker };
})();
