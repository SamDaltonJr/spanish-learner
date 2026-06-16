// quiz.js — multiple-choice quizzes (vocab translation + grammar usage)
const Quiz = (() => {
  let questions = [];
  let idx = 0;
  let score = 0;

  function allVocab() {
    const out = [];
    VOCAB_DECKS.forEach((d) => d.cards.forEach((c) => out.push(c)));
    return out;
  }

  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildVocabQuestion(pool) {
    const card = pool[Math.floor(Math.random() * pool.length)];
    const askEsToEn = Math.random() < 0.5;
    const prompt = askEsToEn
      ? `What does "${card.es}" mean?`
      : `How do you say "${card.en}" in Spanish?`;
    const answer = askEsToEn ? card.en : card.es;
    // distractors from same direction
    const distractors = shuffle(pool.filter((c) => c !== card))
      .slice(0, 3)
      .map((c) => (askEsToEn ? c.en : c.es));
    const options = shuffle([answer, ...distractors]);
    return { prompt, sub: "Vocabulary", answer, options, note: askEsToEn ? card.es : card.en };
  }

  function buildGrammarQuestion(g) {
    return {
      prompt: g.prompt,
      sub: "Grammar",
      answer: g.answer,
      options: shuffle(g.options),
      note: g.note,
    };
  }

  function build(type) {
    const vocab = allVocab();
    let qs = [];
    if (type === "vocab") {
      for (let i = 0; i < 10; i++) qs.push(buildVocabQuestion(vocab));
    } else if (type === "grammar") {
      qs = shuffle(GRAMMAR_QUESTIONS).slice(0, 10).map(buildGrammarQuestion);
    } else {
      const g = shuffle(GRAMMAR_QUESTIONS).slice(0, 5).map(buildGrammarQuestion);
      const v = [];
      for (let i = 0; i < 5; i++) v.push(buildVocabQuestion(vocab));
      qs = shuffle(g.concat(v));
    }
    return qs;
  }

  function start() {
    const type = document.querySelector('input[name="quizType"]:checked').value;
    questions = build(type);
    idx = 0;
    score = 0;
    document.getElementById("quizSetup").hidden = true;
    document.getElementById("quizStage").hidden = false;
    render();
  }

  function render() {
    const q = questions[idx];
    const stage = document.getElementById("quizStage");
    stage.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-sub">Question ${idx + 1} of ${questions.length} · ${q.sub}</div>
        <div class="quiz-prompt">${q.prompt}</div>
        <div class="quiz-choices" id="choices"></div>
        <div class="quiz-feedback" id="feedback"></div>
        <div class="quiz-footer">
          <span class="muted">Score: ${score}/${idx}</span>
          <button class="btn primary" id="quizNext" hidden>Next ›</button>
        </div>
      </div>`;
    const choices = document.getElementById("choices");
    q.options.forEach((opt) => {
      const b = document.createElement("button");
      b.className = "choice";
      b.textContent = opt;
      b.onclick = () => answer(b, opt, q);
      choices.appendChild(b);
    });
  }

  function answer(btn, opt, q) {
    const buttons = document.querySelectorAll("#choices .choice");
    buttons.forEach((b) => (b.disabled = true));
    const correct = opt === q.answer;
    if (correct) {
      btn.classList.add("correct");
      score++;
    } else {
      btn.classList.add("wrong");
      buttons.forEach((b) => { if (b.textContent === q.answer) b.classList.add("correct"); });
    }
    const fb = document.getElementById("feedback");
    fb.className = "quiz-feedback note";
    fb.textContent = (correct ? "✓ Correct. " : `✗ Answer: ${q.answer}. `) + (q.note || "");
    const nextBtn = document.getElementById("quizNext");
    nextBtn.hidden = false;
    nextBtn.textContent = idx + 1 >= questions.length ? "See results ›" : "Next ›";
    nextBtn.onclick = next;
  }

  function next() {
    idx++;
    if (idx >= questions.length) return results();
    render();
  }

  function results() {
    const pct = Math.round((score / questions.length) * 100);
    const msg = pct >= 80 ? "¡Excelente! 🎉" : pct >= 50 ? "¡Bien! Sigue practicando." : "Sigue practicando 💪";
    document.getElementById("quizStage").innerHTML = `
      <div class="quiz-card quiz-score-big">
        <div class="score-num">${score}/${questions.length}</div>
        <p>${msg}</p>
        <button class="btn primary" id="quizAgain">Try again</button>
      </div>`;
    document.getElementById("quizAgain").onclick = reset;
  }

  function reset() {
    document.getElementById("quizStage").hidden = true;
    document.getElementById("quizSetup").hidden = false;
  }

  function init() {
    document.getElementById("startQuiz").onclick = start;
  }

  return { init };
})();
