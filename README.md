# 🇪🇸 Aprende Español — Spanish Learner

A zero-build web app for practicing intermediate Spanish. Pure HTML/CSS/JS — no
framework, no build step — so it deploys straight to **GitHub Pages**.

## Features

- **🃏 Flashcards** — themed vocabulary decks with spaced repetition. Your
  progress is saved in your browser (localStorage).
- **✅ Quiz** — 10-question quizzes mixing vocabulary translation and grammar
  usage (subjunctive, preterite vs. imperfect, comparatives, etc.).
- **🔀 Conjugation** — fill-in conjugation drills across present, preterite,
  imperfect, and future tenses, with an accent-button bar (á é í ó ú ñ ü).
- **💬 Tutor** — an AI conversation partner that chats in Spanish at your chosen
  level and gently corrects your mistakes.

## Running locally

Because the app is plain static files, just open `index.html` in a browser — or
serve the folder so everything loads cleanly:

```bash
# Python (any version with http.server)
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages (free)

1. Create a new GitHub repository and push these files to it:
   ```bash
   git init
   git add .
   git commit -m "Spanish learner app"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment**.
3. Set **Source** to *Deploy from a branch*, branch **main**, folder **/ (root)**.
4. Save. Your app will be live at `https://<you>.github.io/<repo>/` within a
   minute or two.

No special configuration is needed — the app uses only relative paths.

## The AI Tutor

GitHub Pages serves static files only (no backend), so the tutor calls Anthropic's
API **directly from your browser** using your own key:

1. Open the **💬 Tutor** tab and click **⚙ API key**.
2. Paste an [Anthropic API key](https://console.anthropic.com/settings/keys) and
   pick a model (Sonnet 4.6 is a good, affordable default; Haiku 4.5 is cheapest;
   Opus 4.8 is the most capable).
3. Start chatting in Spanish.

**About the key:** it is stored only in your browser's localStorage and sent only
to `api.anthropic.com`. Because anyone with access to your device/browser could
read it, use this for personal use on a device you control, and revoke the key if
you ever share or lose access. The request uses Anthropic's
`anthropic-dangerous-direct-browser-access` header, which is the supported way to
call the API from a browser.

> If you later want to hide the key entirely, you'd add a tiny backend proxy
> (e.g. a Cloudflare Worker or Vercel function) — but that's optional and not
> needed for personal use.

## Customizing content

All learning content lives in [`js/data.js`](js/data.js):

- `VOCAB_DECKS` — add decks or words (`{ es, en }`).
- `VERBS` — add verbs with full conjugation tables (curated for correctness).
- `GRAMMAR_QUESTIONS` — add grammar multiple-choice questions.

## Project structure

```
index.html          App shell + tab navigation
css/styles.css      Styles
js/data.js          Vocabulary, verbs, grammar questions
js/flashcards.js    Spaced-repetition flashcards
js/quiz.js          Quiz engine
js/conjugation.js   Conjugation drills
js/chat.js          AI tutor (browser → Anthropic API)
js/app.js           Navigation + bootstrap
```
