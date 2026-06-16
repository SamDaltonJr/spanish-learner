// lessons.js — short teaching lessons with tables and spoken examples.
const LESSONS = [
  {
    id: "present",
    title: "El presente (regular)",
    emoji: "📗",
    summary: "How to conjugate regular verbs in the present tense.",
    sections: [
      {
        h: "The three verb families",
        body: "Every Spanish infinitive ends in <strong>-ar</strong>, <strong>-er</strong>, or <strong>-ir</strong>. To conjugate, drop that ending and add the ending for the subject.",
      },
      {
        h: "Endings",
        table: {
          head: ["", "-ar (hablar)", "-er (comer)", "-ir (vivir)"],
          rows: [
            ["yo", "hablo", "como", "vivo"],
            ["tú", "hablas", "comes", "vives"],
            ["él / ella / Ud.", "habla", "come", "vive"],
            ["nosotros", "hablamos", "comemos", "vivimos"],
            ["vosotros", "habláis", "coméis", "vivís"],
            ["ellos / Uds.", "hablan", "comen", "viven"],
          ],
        },
        body: "Notice that <strong>-er</strong> and <strong>-ir</strong> verbs differ only in the nosotros and vosotros forms.",
      },
      {
        h: "When to use it",
        body: "The present covers habitual actions (<em>Trabajo los lunes</em>), current facts (<em>Vivo en Madrid</em>), and even the near future (<em>Mañana hablo con él</em>).",
        examples: [
          { es: "Hablo español todos los días.", en: "I speak Spanish every day." },
          { es: "¿Comes carne?", en: "Do you eat meat?" },
          { es: "Vivimos cerca del centro.", en: "We live near downtown." },
        ],
      },
    ],
  },
  {
    id: "ser-estar",
    title: "Ser vs. Estar",
    emoji: "⚖️",
    summary: "Two verbs for “to be” — and when each one is right.",
    sections: [
      {
        h: "Ser — identity & essence",
        body: "Use <strong>ser</strong> for who/what something fundamentally is: description, occupation, characteristic, time, origin, relationship. Mnemonic: <strong>DOCTOR</strong>.",
        examples: [
          { es: "Soy profesor.", en: "I am a teacher. (occupation)" },
          { es: "Ella es alta.", en: "She is tall. (characteristic)" },
          { es: "Somos de México.", en: "We are from Mexico. (origin)" },
        ],
      },
      {
        h: "Estar — states & location",
        body: "Use <strong>estar</strong> for conditions that can change and for location: position, location, action (progressive), condition, emotion. Mnemonic: <strong>PLACE</strong>.",
        examples: [
          { es: "Estoy cansado.", en: "I am tired. (condition)" },
          { es: "El libro está en la mesa.", en: "The book is on the table. (location)" },
          { es: "Estamos comiendo.", en: "We are eating. (progressive)" },
        ],
      },
      {
        h: "Watch the meaning change",
        body: "Some adjectives change meaning: <em>ser aburrido</em> = to be boring, but <em>estar aburrido</em> = to be bored. <em>Ser listo</em> = to be clever; <em>estar listo</em> = to be ready.",
      },
    ],
  },
  {
    id: "pret-imp",
    title: "Pretérito vs. Imperfecto",
    emoji: "⏪",
    summary: "Two past tenses: completed events vs. ongoing background.",
    sections: [
      {
        h: "Pretérito — completed actions",
        body: "A finished action, a specific event, or a sequence of events. Signal words: <em>ayer, anoche, el lunes pasado, de repente, una vez</em>.",
        examples: [
          { es: "Ayer comí en un restaurante.", en: "Yesterday I ate at a restaurant." },
          { es: "Llegó, comió y se fue.", en: "He arrived, ate, and left." },
        ],
      },
      {
        h: "Imperfecto — ongoing / habitual",
        body: "Background description, repeated habits, age and time, or “was —ing”. Signal words: <em>siempre, todos los días, mientras, cuando era niño, generalmente</em>.",
        examples: [
          { es: "Cuando era niño, jugaba al fútbol.", en: "When I was a child, I used to play soccer." },
          { es: "Eran las tres de la tarde.", en: "It was three in the afternoon." },
        ],
      },
      {
        h: "Together in one sentence",
        body: "The imperfect sets the scene; the preterite interrupts it.",
        examples: [
          { es: "Mientras leía, sonó el teléfono.", en: "While I was reading, the phone rang." },
        ],
      },
    ],
  },
  {
    id: "future",
    title: "El futuro",
    emoji: "⏩",
    summary: "Two ways to talk about the future.",
    sections: [
      {
        h: "Near future: ir a + infinitive",
        body: "The easiest way — conjugate <strong>ir</strong> (voy, vas, va, vamos, vais, van) + <strong>a</strong> + the infinitive. Very common in speech.",
        examples: [
          { es: "Voy a estudiar esta noche.", en: "I am going to study tonight." },
          { es: "Vamos a viajar en verano.", en: "We are going to travel in summer." },
        ],
      },
      {
        h: "Simple future endings",
        body: "Add these to the <strong>whole infinitive</strong> — the endings are identical for -ar, -er, and -ir verbs.",
        table: {
          head: ["", "ending", "hablar"],
          rows: [
            ["yo", "-é", "hablaré"],
            ["tú", "-ás", "hablarás"],
            ["él / ella / Ud.", "-á", "hablará"],
            ["nosotros", "-emos", "hablaremos"],
            ["vosotros", "-éis", "hablaréis"],
            ["ellos / Uds.", "-án", "hablarán"],
          ],
        },
        body: "A few verbs use an irregular stem (tener → tendr-, hacer → har-, poder → podr-) but the same endings.",
        examples: [
          { es: "Mañana hablaré con ella.", en: "Tomorrow I will speak with her." },
          { es: "Tendrás tiempo el viernes.", en: "You will have time on Friday." },
        ],
      },
    ],
  },
  {
    id: "por-para",
    title: "Por vs. Para",
    emoji: "🎯",
    summary: "Both mean “for” — but they aren’t interchangeable.",
    sections: [
      {
        h: "Para — goal, destination, recipient",
        body: "Purpose (“in order to”), a deadline, a destination, or who something is for.",
        examples: [
          { es: "Estudio para aprender.", en: "I study in order to learn." },
          { es: "Este regalo es para ti.", en: "This gift is for you." },
          { es: "Salimos para Madrid.", en: "We leave for Madrid." },
        ],
      },
      {
        h: "Por — cause, exchange, duration, movement",
        body: "Reason or cause, an exchange/price, duration of time, or movement “through/along”.",
        examples: [
          { es: "Gracias por tu ayuda.", en: "Thanks for your help. (cause)" },
          { es: "Pagué diez euros por el libro.", en: "I paid ten euros for the book. (exchange)" },
          { es: "Caminamos por el parque.", en: "We walked through the park. (movement)" },
        ],
      },
    ],
  },
  {
    id: "gender",
    title: "Género y artículos",
    emoji: "🔠",
    summary: "Noun gender, the words for “the/a”, and adjective agreement.",
    sections: [
      {
        h: "Gender basics",
        body: "Most nouns ending in <strong>-o</strong> are masculine (<em>el libro</em>) and most ending in <strong>-a</strong> are feminine (<em>la casa</em>). Words ending in <strong>-ción, -dad, -tad</strong> are feminine (<em>la nación, la ciudad, la libertad</em>).",
      },
      {
        h: "Articles",
        table: {
          head: ["", "the", "a / some"],
          rows: [
            ["masc. sing.", "el", "un"],
            ["fem. sing.", "la", "una"],
            ["masc. pl.", "los", "unos"],
            ["fem. pl.", "las", "unas"],
          ],
        },
        body: "Common exceptions worth memorizing: <em>el día, el mapa, el problema, el sofá</em> (masculine despite -a) and <em>la mano, la foto</em> (feminine despite -o).",
      },
      {
        h: "Adjectives agree",
        body: "Adjectives match the noun in gender and number.",
        examples: [
          { es: "el coche rojo", en: "the red car" },
          { es: "la casa roja", en: "the red house" },
          { es: "las casas rojas", en: "the red houses" },
        ],
      },
    ],
  },
  {
    id: "subjunctive",
    title: "Introducción al subjuntivo",
    emoji: "🌙",
    summary: "What the subjunctive is and what triggers it.",
    sections: [
      {
        h: "What it expresses",
        body: "The subjunctive marks things that are not stated as plain facts: wishes, emotions, doubts, recommendations, and hypotheticals. It usually appears after <strong>que</strong>. Triggers — <strong>WEIRDO</strong>: Wishes, Emotions, Impersonal expressions, Recommendations, Doubt, Ojalá.",
      },
      {
        h: "Present subjunctive endings",
        body: "Take the <em>yo</em> present form, drop the -o, and add the “opposite” vowel: -ar verbs take -e endings, -er/-ir verbs take -a endings.",
        table: {
          head: ["", "hablar", "comer", "vivir"],
          rows: [
            ["yo", "hable", "coma", "viva"],
            ["tú", "hables", "comas", "vivas"],
            ["él / ella / Ud.", "hable", "coma", "viva"],
            ["nosotros", "hablemos", "comamos", "vivamos"],
            ["vosotros", "habléis", "comáis", "viváis"],
            ["ellos / Uds.", "hablen", "coman", "vivan"],
          ],
        },
      },
      {
        h: "Examples",
        body: "Notice the trigger phrase + <em>que</em> + subjunctive.",
        examples: [
          { es: "Quiero que vengas.", en: "I want you to come. (wish)" },
          { es: "Es importante que estudies.", en: "It’s important that you study. (impersonal)" },
          { es: "Ojalá llueva mañana.", en: "I hope it rains tomorrow. (ojalá)" },
        ],
      },
    ],
  },
];

const Lessons = (() => {
  function renderList() {
    const list = document.getElementById("lessonList");
    const content = document.getElementById("lessonContent");
    content.hidden = true;
    list.hidden = false;
    list.innerHTML = "";
    LESSONS.forEach((l) => {
      const card = document.createElement("div");
      card.className = "lesson-card";
      card.innerHTML = `
        <div class="lesson-emoji">${l.emoji}</div>
        <h3>${l.title}</h3>
        <p class="muted">${l.summary}</p>`;
      card.onclick = () => openLesson(l.id);
      list.appendChild(card);
    });
  }

  function tableHtml(t) {
    const head = t.head.map((h) => `<th>${h}</th>`).join("");
    const rows = t.rows
      .map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th>${c}</th>` : `<td>${c}</td>`)).join("")}</tr>`)
      .join("");
    return `<table class="lesson-table"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`;
  }

  function openLesson(id) {
    const l = LESSONS.find((x) => x.id === id);
    const list = document.getElementById("lessonList");
    const content = document.getElementById("lessonContent");
    list.hidden = true;
    content.hidden = false;

    let html = `<button class="link-btn" id="lessonBack">‹ All lessons</button>
      <h2>${l.emoji} ${l.title}</h2>`;

    l.sections.forEach((s) => {
      html += `<section class="lesson-section">`;
      if (s.h) html += `<h3>${s.h}</h3>`;
      if (s.table) html += tableHtml(s.table);
      if (s.body) html += `<p>${s.body}</p>`;
      if (s.examples) {
        html += `<div class="lesson-examples">`;
        s.examples.forEach((ex, i) => {
          html += `
            <div class="lesson-ex">
              <button class="icon-speak" data-speak="${id}-${i}" type="button" title="Pronounce">🔊</button>
              <div><span class="ex-es">${ex.es}</span><span class="ex-en">${ex.en}</span></div>
            </div>`;
        });
        html += `</div>`;
      }
      html += `</section>`;
    });

    content.innerHTML = html;
    document.getElementById("lessonBack").onclick = renderList;

    // Wire pronunciation on each example.
    l.sections.forEach((s) => {
      if (!s.examples) return;
      s.examples.forEach((ex, i) => {
        const btn = content.querySelector(`[data-speak="${id}-${i}"]`);
        if (!btn) return;
        if (!TTS.supported) { btn.hidden = true; return; }
        btn.onclick = () => TTS.speak(ex.es, window.showVoiceBanner);
      });
    });
    content.scrollIntoView({ block: "start" });
  }

  function init() { renderList(); }
  function onShow() { renderList(); }

  return { init, onShow };
})();
