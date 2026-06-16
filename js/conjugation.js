// conjugation.js — verb conjugation fill-in drills
const Conjugation = (() => {
  let selectedTenses = ["presente"];
  let round = [];
  let pos = 0;
  let lastFocusedInput = null;

  function renderTenseChips() {
    const el = document.getElementById("conjTenses");
    el.innerHTML = "";
    TENSES.forEach((t) => {
      const chip = document.createElement("div");
      chip.className = "chip" + (selectedTenses.includes(t.id) ? " on" : "");
      chip.textContent = t.name;
      chip.onclick = () => {
        if (selectedTenses.includes(t.id)) {
          if (selectedTenses.length > 1) selectedTenses = selectedTenses.filter((x) => x !== t.id);
        } else {
          selectedTenses.push(t.id);
        }
        renderTenseChips();
      };
      el.appendChild(chip);
    });
  }

  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function start() {
    // build a round: 8 verb/tense combos
    const combos = [];
    VERBS.forEach((v) => {
      selectedTenses.forEach((t) => combos.push({ verb: v, tense: t }));
    });
    round = shuffle(combos).slice(0, 8);
    pos = 0;
    document.getElementById("conjSetup").hidden = true;
    document.getElementById("conjStage").hidden = false;
    render();
  }

  function tenseName(id) { return TENSES.find((t) => t.id === id).name; }

  function render() {
    const { verb, tense } = round[pos];
    const forms = verb.conjugations[tense];
    const stage = document.getElementById("conjStage");

    let rows = "";
    PRONOUNS.forEach((p, i) => {
      rows += `
        <div class="conj-row">
          <span class="conj-pron">${p}</span>
          <input class="conj-input" data-i="${i}" autocomplete="off" autocapitalize="off" spellcheck="false" />
          <span class="conj-answer" data-ans="${i}"></span>
        </div>`;
    });

    stage.innerHTML = `
      <div class="conj-card">
        <div class="conj-head">
          <div>
            <span class="conj-verb">${verb.infinitive}<span class="verb-en">${verb.en}</span></span>
            <button class="icon-speak" id="conjSpeakVerb" type="button" title="Pronounce" hidden>🔊</button>
          </div>
          <span class="conj-badge">${verb.type}</span>
        </div>
        <div class="conj-tense-label">${tenseName(tense)}</div>
        <div class="accent-bar" id="accentBar">
          ${["á","é","í","ó","ú","ñ","ü"].map((c) => `<button type="button" data-ch="${c}">${c}</button>`).join("")}
        </div>
        ${rows}
        <div class="quiz-footer">
          <span class="muted">${pos + 1} of ${round.length}</span>
          <div>
            <button class="btn" id="conjCheck">Check</button>
            <button class="btn primary" id="conjNext" hidden>Next ›</button>
          </div>
        </div>
      </div>`;

    // accent inserter
    const inputs = stage.querySelectorAll(".conj-input");
    inputs.forEach((inp) => {
      inp.addEventListener("focus", () => (lastFocusedInput = inp));
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); check(); }
      });
    });
    inputs[0].focus();
    lastFocusedInput = inputs[0];

    stage.querySelectorAll("#accentBar button").forEach((b) => {
      b.onclick = () => insertChar(b.dataset.ch);
    });
    document.getElementById("conjCheck").onclick = check;

    // Pronounce the infinitive
    if (TTS.supported) {
      const vb = document.getElementById("conjSpeakVerb");
      vb.hidden = false;
      vb.onclick = () => TTS.speak(verb.infinitive, window.showVoiceBanner);
    }
  }

  function insertChar(ch) {
    const inp = lastFocusedInput;
    if (!inp) return;
    const s = inp.selectionStart ?? inp.value.length;
    inp.value = inp.value.slice(0, s) + ch + inp.value.slice(inp.selectionEnd ?? s);
    inp.focus();
    inp.setSelectionRange(s + 1, s + 1);
  }

  function normalize(s) {
    return s.trim().toLowerCase();
  }

  function check() {
    const { verb, tense } = round[pos];
    const forms = verb.conjugations[tense];
    const inputs = document.querySelectorAll(".conj-input");
    inputs.forEach((inp, i) => {
      const ans = document.querySelector(`[data-ans="${i}"]`);
      const correct = normalize(inp.value) === normalize(forms[i]);
      inp.classList.toggle("correct", correct);
      inp.classList.toggle("wrong", !correct);
      inp.disabled = true;
      ans.textContent = correct ? "✓" : forms[i];
      // Offer to hear the correct conjugated form.
      if (TTS.supported) {
        const sp = document.createElement("button");
        sp.className = "icon-speak row-speak";
        sp.type = "button";
        sp.title = "Pronounce";
        sp.textContent = "🔊";
        sp.onclick = () => TTS.speak(forms[i], window.showVoiceBanner);
        ans.appendChild(document.createTextNode(" "));
        ans.appendChild(sp);
      }
    });
    document.getElementById("conjCheck").hidden = true;
    const nextBtn = document.getElementById("conjNext");
    nextBtn.hidden = false;
    nextBtn.textContent = pos + 1 >= round.length ? "Finish ›" : "Next ›";
    nextBtn.onclick = next;
  }

  function next() {
    pos++;
    if (pos >= round.length) {
      document.getElementById("conjStage").hidden = true;
      document.getElementById("conjSetup").hidden = false;
      return;
    }
    render();
  }

  function init() {
    renderTenseChips();
    document.getElementById("startConj").onclick = start;
  }

  return { init };
})();
