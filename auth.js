(function initPageAuth() {
  const PASSWORD_HASH = "9b3683d24d24fba545f5a01055a7fabbdf46bd33a3229730dd7902864aa2445f";
  const SESSION_KEY = "skv-generator-authenticated";
  const LOGO_URL = "https://skvonline.de/src/img/logo.png";
  const LOCKED_TITLE = "SKV | Privater Bereich";
  const defaultTitle = document.title;

  function setDocumentState(isAuthenticated) {
    document.documentElement.classList.remove("auth-pending");
    document.documentElement.classList.toggle("auth-locked", !isAuthenticated);
  }

  function hideOverlay(overlay) {
    overlay.hidden = true;
    document.title = defaultTitle;
    setDocumentState(true);
  }

  function showOverlay(overlay) {
    overlay.hidden = false;
    document.title = LOCKED_TITLE;
    setDocumentState(false);
  }

  async function sha256(value) {
    const buffer = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  function isAuthenticated() {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.reload();
  }

  function injectLogoutButtons() {
    const targets = [
      { selector: ".branch-toolbar-actions", className: "header-link-button auth-logout-button" },
      { selector: ".page-header-side", className: "back-link auth-logout-button" }
    ];

    targets.forEach(({ selector, className }) => {
      const target = document.querySelector(selector);
      if (!target || target.querySelector("[data-auth-logout]")) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className = className;
      button.dataset.authLogout = "true";
      button.textContent = "Abmelden";
      target.appendChild(button);
    });
  }

  function buildOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "auth-overlay";
    overlay.innerHTML = [
      '<div class="auth-card" role="dialog" aria-modal="true" aria-labelledby="authTitle">',
      '<div class="auth-header">',
      '<div class="auth-title-row">',
      `<img class="auth-logo" src="${LOGO_URL}" alt="SKV Logo" />`,
      '<h1 id="authTitle">Privater Bereich</h1>',
      "</div>",
      "</div>",
      '<section class="auth-option auth-option-home" aria-label="Hauptseite">',
      "<h2>Zurück zum öffentlichen Bereich</h2>",
      '<a class="auth-home-link auth-home-link-primary" href="https://skvonline.de/">Zur Hauptseite</a>',
      "</section>",
      '<div class="auth-separator" aria-hidden="true"></div>',
      '<section class="auth-option auth-option-login" aria-label="Anmeldung">',
      "<h2>Anmeldung</h2>",
      '<form class="auth-form">',
      '<div class="auth-password-row">',
      '<input id="authPasswordInput" name="password" type="password" autocomplete="current-password" placeholder="Passwort" required />',
      '<button class="auth-toggle-password" type="button" aria-label="Passwort anzeigen" aria-pressed="false">',
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">',
      '<path d="M1.5 12s3.8-7 10.5-7 10.5 7 10.5 7-3.8 7-10.5 7S1.5 12 1.5 12Z"></path>',
      '<circle cx="12" cy="12" r="3.25"></circle>',
      "</svg>",
      "</button>",
      "</div>",
      '<button type="submit">Anmelden</button>',
      '<p class="auth-error" aria-live="polite"></p>',
      "</form>",
      "</section>",
      "</div>"
    ].join("");
    document.body.appendChild(overlay);
    return overlay;
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectLogoutButtons();

    const overlay = buildOverlay();
    const form = overlay.querySelector(".auth-form");
    const passwordInput = overlay.querySelector("#authPasswordInput");
    const togglePasswordButton = overlay.querySelector(".auth-toggle-password");
    const errorNode = overlay.querySelector(".auth-error");
    const logoutButtons = document.querySelectorAll("[data-auth-logout]");

    logoutButtons.forEach((button) => {
      button.addEventListener("click", logout);
    });

    if (isAuthenticated()) {
      hideOverlay(overlay);
      return;
    }

    showOverlay(overlay);
    passwordInput.focus();

    togglePasswordButton?.addEventListener("click", () => {
      const isVisible = passwordInput.type === "password";
      passwordInput.type = isVisible ? "text" : "password";
      togglePasswordButton.setAttribute("aria-label", isVisible ? "Passwort verbergen" : "Passwort anzeigen");
      togglePasswordButton.setAttribute("aria-pressed", String(isVisible));
      passwordInput.focus();
      const cursor = passwordInput.value.length;
      passwordInput.setSelectionRange(cursor, cursor);
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      errorNode.textContent = "";

      const password = passwordInput.value;
      if (!password) return;

      try {
        const hash = await sha256(password);
        if (hash !== PASSWORD_HASH) {
          errorNode.textContent = "Passwort ist nicht korrekt.";
          passwordInput.select();
          return;
        }

        sessionStorage.setItem(SESSION_KEY, "true");
        passwordInput.value = "";
        passwordInput.type = "password";
        togglePasswordButton.setAttribute("aria-label", "Passwort anzeigen");
        togglePasswordButton.setAttribute("aria-pressed", "false");
        hideOverlay(overlay);
      } catch (error) {
        errorNode.textContent = "Passwortprüfung konnte nicht ausgeführt werden.";
      }
    });
  });
})();
