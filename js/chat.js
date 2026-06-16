// chat.js — AI conversation tutor (talks to Claude directly from the browser)
const Chat = (() => {
  const KEY_STORE = "es_anthropic_key";
  const MODEL_STORE = "es_anthropic_model";
  const API_URL = "https://api.anthropic.com/v1/messages";
  const API_VERSION = "2023-06-01";

  let history = []; // {role, content}

  function getKey() { return localStorage.getItem(KEY_STORE) || ""; }
  function getModel() { return localStorage.getItem(MODEL_STORE) || "claude-sonnet-4-6"; }

  function systemPrompt() {
    const level = document.getElementById("chatLevel").value;
    return [
      `You are a friendly Spanish conversation tutor for a learner at CEFR level ${level} (intermediate).`,
      `Hold a natural conversation in Spanish, keeping your vocabulary and grammar appropriate to ${level}.`,
      `Keep your replies fairly short (1-3 sentences) so it stays a back-and-forth conversation, and usually end with a question to keep things going.`,
      `If the learner's last message has Spanish mistakes (grammar, vocabulary, or spelling), gently correct them.`,
      `Format any corrections as a final separate line that starts exactly with "💡 " and is written in English, e.g. "💡 'Fui al tienda' should be 'Fui a la tienda' — tienda is feminine." If there are no mistakes, do not add the line.`,
      `Never switch to English for the conversation itself — only the 💡 correction line is in English.`,
    ].join(" ");
  }

  function addMessage(role, text) {
    const log = document.getElementById("chatLog");
    const div = document.createElement("div");
    if (role === "system-note") {
      div.className = "msg system-note";
      div.textContent = text;
    } else {
      div.className = "msg " + role;
      // split off the correction line for styling
      const parts = text.split(/\n?💡 /);
      div.textContent = parts[0].trim();
      if (parts[1]) {
        const corr = document.createElement("span");
        corr.className = "correction";
        corr.textContent = "💡 " + parts[1].trim();
        div.appendChild(corr);
      }
    }
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    return div;
  }

  async function send(text) {
    if (!getKey()) { openModal(); return; }
    addMessage("user", text);
    history.push({ role: "user", content: text });

    const input = document.getElementById("chatText");
    const sendBtn = document.getElementById("chatSend");
    input.value = "";
    input.disabled = true;
    sendBtn.disabled = true;

    const typing = addMessage("assistant", "…");
    typing.classList.add("typing");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": getKey(),
          "anthropic-version": API_VERSION,
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: getModel(),
          max_tokens: 1024,
          system: systemPrompt(),
          messages: history,
        }),
      });

      typing.remove();

      if (!res.ok) {
        let detail = `HTTP ${res.status}`;
        try {
          const err = await res.json();
          detail = err?.error?.message || detail;
        } catch {}
        if (res.status === 401) detail = "Invalid API key. Click ⚙ API key to update it.";
        addMessage("system-note", "⚠ " + detail);
        return;
      }

      const data = await res.json();
      const reply = (data.content || [])
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim() || "(sin respuesta)";
      addMessage("assistant", reply);
      history.push({ role: "assistant", content: reply });
    } catch (e) {
      typing.remove();
      addMessage("system-note", "⚠ Network error: " + e.message);
    } finally {
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  function reset() {
    history = [];
    document.getElementById("chatLog").innerHTML = "";
    greet();
  }

  function greet() {
    if (!getKey()) {
      addMessage("system-note", "Click ⚙ API key to connect the tutor, then start chatting in Spanish.");
      return;
    }
    addMessage("assistant", "¡Hola! Soy tu tutor de español. ¿De qué te gustaría hablar hoy?");
    history.push({ role: "assistant", content: "¡Hola! Soy tu tutor de español. ¿De qué te gustaría hablar hoy?" });
  }

  // --- API key modal ---
  function openModal() {
    document.getElementById("apiKeyInput").value = getKey();
    document.getElementById("modelSelect").value = getModel();
    document.getElementById("keyModal").hidden = false;
  }
  function closeModal() { document.getElementById("keyModal").hidden = true; }
  function saveModal() {
    const key = document.getElementById("apiKeyInput").value.trim();
    const model = document.getElementById("modelSelect").value;
    if (key) localStorage.setItem(KEY_STORE, key);
    localStorage.setItem(MODEL_STORE, model);
    closeModal();
    if (history.length === 0) reset();
  }

  function init() {
    document.getElementById("chatForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const text = document.getElementById("chatText").value.trim();
      if (text) send(text);
    });
    document.getElementById("chatReset").onclick = reset;
    document.getElementById("chatSettings").onclick = openModal;
    document.getElementById("chatSettings2") && (document.getElementById("chatSettings2").onclick = openModal);
    document.getElementById("keyCancel").onclick = closeModal;
    document.getElementById("keySave").onclick = saveModal;
    document.getElementById("chatLevel").onchange = () => {
      addMessage("system-note", `Tutor level set to ${document.getElementById("chatLevel").value}.`);
    };
  }

  function onShow() {
    if (document.getElementById("chatLog").childElementCount === 0) greet();
  }

  return { init, onShow };
})();
