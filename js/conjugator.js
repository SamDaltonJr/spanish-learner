// conjugator.js — generates conjugations for REGULAR Spanish verbs across the
// four tenses the drill supports (present, preterite, imperfect, future).
//
// Only verbs that are genuinely regular in these tenses live here. Verbs with
// stem changes (poder, querer…), irregular yo forms (poner, salir…), or
// irregular futures (tener, hacer…) stay in IRREGULAR_VERBS (js/data.js) with
// hand-written tables. Common orthographic changes that keep a verb otherwise
// regular ARE handled: -car/-gar/-zar (yo preterite) and vowel-stem -eer.
//
// The merged list is exposed as the global VERBS, which conjugation.js consumes.

function conjugateRegular(inf) {
  const ending = inf.slice(-2); // "ar" | "er" | "ir"
  const stem = inf.slice(0, -2);
  let presente, preterito, imperfecto;

  if (ending === "ar") {
    presente = [stem + "o", stem + "as", stem + "a", stem + "amos", stem + "áis", stem + "an"];

    // Preterite "yo" spelling changes keep the /k/, /g/, /θ-s/ sound.
    let yo = stem + "é";
    if (inf.endsWith("car")) yo = stem.slice(0, -1) + "qué";
    else if (inf.endsWith("gar")) yo = stem.slice(0, -1) + "gué";
    else if (inf.endsWith("zar")) yo = stem.slice(0, -1) + "cé";
    preterito = [yo, stem + "aste", stem + "ó", stem + "amos", stem + "asteis", stem + "aron"];

    imperfecto = [stem + "aba", stem + "abas", stem + "aba", stem + "ábamos", stem + "abais", stem + "aban"];
  } else {
    // -er and -ir share preterite and imperfect endings; present differs in
    // the nosotros/vosotros forms only.
    if (ending === "er") {
      presente = [stem + "o", stem + "es", stem + "e", stem + "emos", stem + "éis", stem + "en"];
    } else {
      presente = [stem + "o", stem + "es", stem + "e", stem + "imos", stem + "ís", stem + "en"];
    }

    if (inf.endsWith("eer")) {
      // Vowel-stem verbs (leer, creer): unstressed i → y between vowels, and a
      // written accent on the i of the other endings.
      preterito = [stem + "í", stem + "íste", stem + "yó", stem + "ímos", stem + "ísteis", stem + "yeron"];
    } else {
      preterito = [stem + "í", stem + "iste", stem + "ió", stem + "imos", stem + "isteis", stem + "ieron"];
    }

    imperfecto = [stem + "ía", stem + "ías", stem + "ía", stem + "íamos", stem + "íais", stem + "ían"];
  }

  // Future is regular for these verbs: full infinitive + endings.
  const futuro = [inf + "é", inf + "ás", inf + "á", inf + "emos", inf + "éis", inf + "án"];

  return { presente, preterito, imperfecto, futuro };
}

function regularVerbType(inf) {
  return "regular -" + inf.slice(-2);
}

// [infinitive, English]. Every entry is regular in the four supported tenses.
const REGULAR_VERBS = [
  // -ar (no spelling change)
  ["hablar", "to speak"], ["trabajar", "to work"], ["estudiar", "to study"],
  ["comprar", "to buy"], ["necesitar", "to need"], ["usar", "to use"],
  ["tomar", "to take / to drink"], ["llevar", "to carry / to wear"],
  ["dejar", "to leave / to let"], ["pasar", "to pass / to happen"],
  ["quedar", "to stay / to remain"], ["llamar", "to call"], ["mirar", "to look at"],
  ["esperar", "to wait / to hope"], ["entrar", "to enter"], ["ayudar", "to help"],
  ["caminar", "to walk"], ["cocinar", "to cook"], ["viajar", "to travel"],
  ["preguntar", "to ask"], ["contestar", "to answer"], ["escuchar", "to listen"],
  ["bailar", "to dance"], ["cantar", "to sing"], ["nadar", "to swim"],
  ["limpiar", "to clean"], ["preparar", "to prepare"], ["descansar", "to rest"],
  ["desear", "to wish / to want"], ["ganar", "to win / to earn"],
  // -car / -gar / -zar (yo preterite spelling change)
  ["buscar", "to look for"], ["sacar", "to take out"], ["tocar", "to touch / to play"],
  ["explicar", "to explain"], ["practicar", "to practice"], ["llegar", "to arrive"],
  ["pagar", "to pay"], ["cruzar", "to cross"], ["organizar", "to organize"],
  ["utilizar", "to use / to utilize"],
  // -er (regular)
  ["comer", "to eat"], ["beber", "to drink"], ["correr", "to run"],
  ["aprender", "to learn"], ["comprender", "to understand"], ["vender", "to sell"],
  ["deber", "must / to owe"], ["responder", "to respond"],
  // -er vowel-stem
  ["leer", "to read"], ["creer", "to believe"],
  // -ir (regular)
  ["vivir", "to live"], ["escribir", "to write"], ["recibir", "to receive"],
  ["abrir", "to open"], ["decidir", "to decide"], ["subir", "to go up"],
  ["partir", "to leave / to split"], ["permitir", "to allow"],
  ["describir", "to describe"], ["existir", "to exist"],
];

const GENERATED_VERBS = REGULAR_VERBS.map(([infinitive, en]) => ({
  infinitive,
  en,
  type: regularVerbType(infinitive),
  conjugations: conjugateRegular(infinitive),
}));

// Curated irregulars first (data.js), then the generated regulars.
const VERBS = (typeof IRREGULAR_VERBS !== "undefined" ? IRREGULAR_VERBS : []).concat(GENERATED_VERBS);
