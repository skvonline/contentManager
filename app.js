const CONFIG = {
  DEFAULT_ASSET_BASE_URL: "https://skvonline.github.io/",
  GITHUB_OWNER: "skvonline",
  GITHUB_REPO: "skvonline.github.io",
  DEFAULT_SOURCE_BRANCH: "main",
  DEFAULT_TARGET_BRANCH: "skvJsonGenerator"
};

const linkLabelOptions = [
  { value: "", label: "Bitte wählen", type: "" },
  { value: "Mehr erfahren", label: "Mehr erfahren", type: "more" },
  { value: "Instagram", label: "Instagram", type: "instagram" },
  { value: "Facebook", label: "Facebook", type: "facebook" },
  { value: "TikTok", label: "TikTok", type: "tiktok" },
  { value: "E-Mail", label: "E-Mail", type: "mail" },
  { value: "Maps", label: "Maps", type: "maps" }
];

const vorstandSocialLabelOptions = [
  { value: "", label: "Bitte wählen" },
  { value: "E-Mail", label: "E-Mail" },
  { value: "Instagram", label: "Instagram" },
  { value: "Facebook", label: "Facebook" },
  { value: "TikTok", label: "TikTok" }
];

const vorstandSocialClassOptions = [
  { value: "", label: "Bitte wählen" },
  { value: "liEmail", label: "liEmail" },
  { value: "liInsta", label: "liInsta" },
  { value: "liFacebook", label: "liFacebook" },
  { value: "liTiktok", label: "liTiktok" }
];

const vorstandSocialIconOptions = [
  { value: "", label: "Bitte wählen" },
  { value: "@", label: "@" },
  { value: "Instagram", label: "Instagram" },
  { value: "f", label: "f" },
  { value: "♪", label: "♪" }
];

const linktreeIconOptions = [
  { value: "", label: "Bitte wählen" },
  { value: "website", label: "website" },
  { value: "instagram", label: "instagram" },
  { value: "facebook", label: "facebook" },
  { value: "download", label: "download" }
];

const specs = {
  news: {
    filename: "news.json",
    summaryKeys: ["title", "date"],
    fields: [
      { name: "title", type: "text", required: true },
      { name: "date", type: "date", required: true },
      { name: "text", type: "textarea", required: true },
      { name: "image", type: "image", filenameOnly: true, pathPrefix: "./src/img/news/" },
      { name: "publishAt", type: "datetime", placeholder: "JJJJ-MM-TT-HH:mm" },
      { name: "deleteAt", type: "datetime", required: true, placeholder: "JJJJ-MM-TT-HH:mm", allowAuto: true },
      {
        name: "links",
        type: "list",
        itemFields: [
          { name: "label", type: "select", required: true, options: linkLabelOptions },
          { name: "url", type: "text", required: true }
        ]
      }
    ],
    template: {
      title: "Beispielnews",
      date: "01.01.2027",
      text: "Text der News",
      publishAt: "2026-12-01-00:00",
      deleteAt: "2027-01-31-23:59",
      links: [{ type: "more", label: "Mehr erfahren", url: "https://example.org" }]
    }
  },
  events: {
    filename: "events.json",
    summaryKeys: ["title", "date", "location"],
    fields: [
      { name: "title", type: "text", required: true },
      { name: "date", type: "date", required: true },
      { name: "time", type: "time" },
      { name: "einlass", type: "time" },
      { name: "preis", type: "currency" },
      { name: "location", type: "text" },
      { name: "description", type: "textarea" },
      { name: "image", type: "image", filenameOnly: true, pathPrefix: "./src/img/events/" },
      { name: "publishAt", type: "datetime", placeholder: "JJJJ-MM-TT-HH:mm" },
      { name: "deleteAt", type: "autoDeleteAt", required: true },
      {
        name: "links",
        type: "list",
        itemFields: [
          { name: "label", type: "select", required: true, options: linkLabelOptions },
          { name: "url", type: "text", required: true }
        ]
      }
    ],
    template: {
      title: "Beispielveranstaltung",
      date: "11.11.2026",
      time: "11:11 Uhr",
      location: "Rathaus",
      publishAt: "2026-10-01-00:00",
      deleteAt: "2026-11-11-23:59"
    }
  },
  vorstand: {
    filename: "vorstand.json",
    summaryKeys: ["name", "role"],
    fields: [
      { name: "name", type: "text", required: true },
      { name: "role", type: "text", required: true },
      { name: "image", type: "image", required: true, filenameOnly: true, pathPrefix: "./src/img/verein/vorstand/" },
      { name: "tags", type: "csv", required: true, placeholder: "Tag1, Tag2" },
      { name: "description", type: "textarea", required: true },
      {
        name: "socials",
        type: "list",
        required: true,
        itemFields: [
          { name: "label", type: "select", required: true, options: vorstandSocialLabelOptions },
          { name: "href", type: "text", required: true },
          { name: "className", type: "select", required: true, options: vorstandSocialClassOptions },
          { name: "icon", type: "select", required: true, options: vorstandSocialIconOptions }
        ]
      }
    ],
    template: {
      name: "Max Mustermann",
      role: "Präsident",
      image: { src: "./src/img/verein/vorstand/max-mustermann.png", ki: false, teilweiseKi: false },
      tags: ["Leitung"],
      description: "Kurztext",
      socials: [{ label: "E-Mail", href: "mailto:max@example.org", className: "liEmail", icon: "@" }]
    }
  },
  elferrat: {
    filename: "elferrat.json",
    summaryKeys: ["name", "role"],
    fields: [
      { name: "name", type: "text", required: true },
      { name: "role", type: "text", required: true },
      { name: "image", type: "image", required: true, filenameOnly: true, pathPrefix: "./src/img/verein/elferrat/" }
    ],
    template: {
      name: "Erika Muster",
      role: "Programm",
      image: { src: "./src/img/verein/elferrat/erika-muster.svg", ki: false, teilweiseKi: false }
    }
  },
  royals: {
    filename: "royals.json",
    summaryKeys: ["session", "year"],
    fields: [
      { name: "session", type: "text", required: true },
      { name: "year", type: "text", required: true },
      { name: "image", type: "image", filenameOnly: true, pathPrefix: "./src/img/verein/prinzenpaare/" },
      { name: "adultPair", type: "pairList", required: true, maxItems: 1 },
      { name: "childPair", type: "pairList", maxItems: 1 }
    ],
    template: {
      session: "48. Session",
      year: "2026/2027",
      image: { src: "./src/img/verein/prinzenpaare/pp2627.JPG", ki: false, teilweiseKi: false },
      adultPair: [{ prince: "Max I.", princess: "Mia I." }]
    }
  },
  linktree: {
    filename: "linktree.json",
    summaryKeys: ["text", "url"],
    fields: [
      { name: "icon", type: "select", required: true, options: linktreeIconOptions },
      { name: "text", type: "text", required: true },
      { name: "url", type: "text", required: true }
    ],
    template: {
      icon: "website",
      text: "Webseite",
      url: "https://example.org"
    }
  },
  downloads: {
    filename: "downloads.json",
    summaryKeys: ["title", "file"],
    fields: [
      { name: "title", type: "text", required: true },
      { name: "description", type: "textarea" },
      { name: "file", type: "text", required: true, filenameOnly: true, pathPrefix: "./src/downloads/" },
      { name: "label", type: "text", required: true }
    ],
    template: {
      title: "Anmeldung Umzug Sandersdorf",
      description: "Anmeldeformular für den Umzug in Sandersdorf.",
      file: "./src/downloads/AnmeldungUmzugSandersdorf.pdf",
      label: "PDF herunterladen"
    }
  },
  "header-notices": {
    filename: "header-notices.json",
    summaryKeys: ["text", "countdown"],
    fields: [
      { name: "text", type: "textarea", required: true },
      { name: "countdown", type: "datetime", placeholder: "JJJJ-MM-TT-HH:mm" },
      { name: "publishAt", type: "datetime", placeholder: "JJJJ-MM-TT-HH:mm" },
      { name: "deleteAt", type: "datetime", required: true, placeholder: "JJJJ-MM-TT-HH:mm" }
    ],
    template: {
      text: "Hinweistext",
      countdown: "2026-05-09-16:30",
      publishAt: "2026-04-18-15:00",
      deleteAt: "2026-05-09-16:30"
    }
  },
  "gallery-overview": {
    filename: "gallery-overview.json",
    summaryKeys: ["name", "directory"],
    fields: [
      { name: "name", type: "text", required: true },
      { name: "publishAt", type: "datetime", placeholder: "JJJJ-MM-TT-HH:mm" },
      { name: "deleteAt", type: "datetime", required: true, placeholder: "JJJJ-MM-TT-HH:mm" },
      { name: "directory", type: "text", required: true }
    ],
    template: {
      name: "Fasching 2026",
      publishAt: "2026-05-04-10:00",
      deleteAt: "2028-05-05-10:00",
      directory: "fasching26"
    }
  },
  faq: {
    filename: "faq.json",
    summaryKeys: ["kategorie"],
    fields: [
      { name: "kategorie", type: "text", required: true },
      {
        name: "fragen",
        type: "list",
        required: true,
        itemFields: [
          { name: "frage", type: "text", required: true },
          { name: "antwort", type: "textarea", required: true },
          { name: "stichwoerter", type: "csv", required: true, placeholder: "Tickets, Kontakt" }
        ]
      }
    ],
    template: {
      kategorie: "Kartenverkauf",
      fragen: [
        {
          frage: "Wo finde ich Informationen zum Kartenverkauf?",
          antwort: "<p>Alle Informationen zum Kartenverkauf findest du in unserem separaten FAQ.</p>",
          stichwoerter: ["Tickets", "Kontakt"]
        }
      ]
    }
  },
  gallery: {
    filename: "gallerys/{xyz}.json",
    summaryKeys: ["image", "alt"],
    fields: [
      { name: "image", type: "image", required: true, filenameOnly: true, pathPrefix: "./src/img/home-gallery/" },
      { name: "alt", type: "text" }
    ],
    template: {
      image: { src: "./src/img/home-gallery/01.JPG", ki: false, teilweiseKi: false },
      alt: "Titelbild"
    }
  },
  "special-faq": {
    filename: "faqs/{xyz}.json",
    summaryKeys: ["frage"],
    fields: [
      { name: "frage", type: "text", required: true },
      { name: "antwort", type: "textarea", required: true, htmlEditor: true }
    ],
    template: {
      frage: "Wie bekomme ich Karten für eure Veranstaltungen?",
      antwort: "<p>Informationen zur Kartenvorbestellung und zum freien Verkauf findet ihr hier.</p>"
    }
  }
};

const typeSelect = document.querySelector("#typeSelect");
const sourceBranchSelect = document.querySelector("#sourceBranchSelect");
const targetBranchInput = document.querySelector("#targetBranchInput");
const syncBranchesBtn = document.querySelector("#syncBranchesBtn");
const branchesList = document.querySelector("#branchesList");
const compareLink = document.querySelector("#compareLink");
const commitBranchLabel = document.querySelector("#commitBranchLabel");
const galleryNameWrap = document.querySelector("#galleryNameWrap");
const galleryNameInput = document.querySelector("#galleryNameInput");
const confirmGalleryBtn = document.querySelector("#confirmGalleryBtn");
const galleryConfirmHint = document.querySelector("#galleryConfirmHint");
const loadOnlineBtn = document.querySelector("#loadOnlineBtn");
const entriesEl = document.querySelector("#entries");
const outputEl = document.querySelector("#output");
const validationList = document.querySelector("#validationList");
const validationPanel = document.querySelector("#validationPanel");
const addEntryBtn = document.querySelector("#addEntryBtn");
const generateBtn = document.querySelector("#generateBtn");
const copyBtn = document.querySelector("#copyBtn");
const downloadBtn = document.querySelector("#downloadBtn");
const commitBtn = document.querySelector("#commitBtn");
const resultActions = document.querySelector("#resultActions");
const commitStatus = document.querySelector("#commitStatus");
const commitDialog = document.querySelector("#commitDialog");
const commitForm = document.querySelector("#commitForm");
const githubUsernameInput = document.querySelector("#githubUsernameInput");
const githubTokenInput = document.querySelector("#githubTokenInput");
const commitMessageInput = document.querySelector("#commitMessageInput");
const cancelCommitDialogBtn = document.querySelector("#cancelCommitDialogBtn");
const galleryDeleteDialog = document.querySelector("#galleryDeleteDialog");
const galleryDeleteForm = document.querySelector("#galleryDeleteForm");
const confirmDeleteWithRepoBtn = document.querySelector("#confirmDeleteWithRepoBtn");
const confirmDeleteEntryOnlyBtn = document.querySelector("#confirmDeleteEntryOnlyBtn");
const cancelGalleryDeleteBtn = document.querySelector("#cancelGalleryDeleteBtn");
const galleryReplacePolicyDialog = document.querySelector("#galleryReplacePolicyDialog");
const galleryReplacePolicyForm = document.querySelector("#galleryReplacePolicyForm");
const keepOldGalleryImageBtn = document.querySelector("#keepOldGalleryImageBtn");
const deleteOldGalleryImageBtn = document.querySelector("#deleteOldGalleryImageBtn");
const cancelReplacePolicyBtn = document.querySelector("#cancelReplacePolicyBtn");
const gallerySourceDialog = document.querySelector("#gallerySourceDialog");
const gallerySourceForm = document.querySelector("#gallerySourceForm");
const selectGallerySourceNewBtn = document.querySelector("#selectGallerySourceNewBtn");
const selectGallerySourceInternalBtn = document.querySelector("#selectGallerySourceInternalBtn");
const selectGallerySourceExternalBtn = document.querySelector("#selectGallerySourceExternalBtn");
const selectGallerySourceNoneBtn = document.querySelector("#selectGallerySourceNoneBtn");
const cancelGallerySourceBtn = document.querySelector("#cancelGallerySourceBtn");
const galleryInternalPickerDialog = document.querySelector("#galleryInternalPickerDialog");
const galleryInternalPickerForm = document.querySelector("#galleryInternalPickerForm");
const galleryInternalImageSelect = document.querySelector("#galleryInternalImageSelect");
const galleryInternalImagePreview = document.querySelector("#galleryInternalImagePreview");
const confirmGalleryInternalImageBtn = document.querySelector("#confirmGalleryInternalImageBtn");
const cancelGalleryInternalImageBtn = document.querySelector("#cancelGalleryInternalImageBtn");
const scrollTopBtn = document.querySelector("#scrollTopBtn");
const htmlEditorDialog = document.querySelector("#htmlEditorDialog");
const htmlEditorForm = document.querySelector("#htmlEditorForm");
const htmlEditorInput = document.querySelector("#htmlEditorInput");
const htmlEditorHighlight = document.querySelector("#htmlEditorHighlight");
const cancelHtmlEditorBtn = document.querySelector("#cancelHtmlEditorBtn");
const formatHtmlEditorBtn = document.querySelector("#formatHtmlEditorBtn");
const galleryCreateDialog = document.querySelector("#galleryCreateDialog");
const galleryCreateTechName = document.querySelector("#galleryCreateTechName");
const galleryCreateDisplayName = document.querySelector("#galleryCreateDisplayName");
const galleryCreatePreviewPaths = document.querySelector("#galleryCreatePreviewPaths");
const galleryCreatePreviewHtml = document.querySelector("#galleryCreatePreviewHtml");
const galleryCreatePreviewJson = document.querySelector("#galleryCreatePreviewJson");
const galleryCreatePreviewBtn = document.querySelector("#galleryCreatePreviewBtn");
const galleryCreateCommitBtn = document.querySelector("#galleryCreateCommitBtn");
const galleryCreateCancelBtn = document.querySelector("#galleryCreateCancelBtn");
const galleryDeleteScaffoldDialog = document.querySelector("#galleryDeleteScaffoldDialog");
const galleryDeleteTechName = document.querySelector("#galleryDeleteTechName");
const galleryDeletePreviewPaths = document.querySelector("#galleryDeletePreviewPaths");
const galleryDeletePreviewBtn = document.querySelector("#galleryDeletePreviewBtn");
const galleryDeleteCommitBtn = document.querySelector("#galleryDeleteCommitBtn");
const galleryDeleteCancelBtn = document.querySelector("#galleryDeleteCancelBtn");
const specialFaqCreateDialog = document.querySelector("#specialFaqCreateDialog");
const specialFaqCreateForm = document.querySelector("#specialFaqCreateForm");
const specialFaqPagePath = document.querySelector("#specialFaqPagePath");
const specialFaqEyebrowInput = document.querySelector("#specialFaqEyebrowInput");
const specialFaqTitleInput = document.querySelector("#specialFaqTitleInput");
const specialFaqIntroInput = document.querySelector("#specialFaqIntroInput");
const specialFaqJsonPathInput = document.querySelector("#specialFaqJsonPathInput");
const specialFaqClosingTitleInput = document.querySelector("#specialFaqClosingTitleInput");
const specialFaqClosingTextInput = document.querySelector("#specialFaqClosingTextInput");
const specialFaqCreateCancelBtn = document.querySelector("#specialFaqCreateCancelBtn");
const DEFAULT_GALLERY_NAME = "home-gallery";
const DEFAULT_SPECIAL_FAQ_NAME = "kartenverkauf";
const DYNAMIC_FILE_TYPES = new Set(["gallery", "special-faq"]);
const MANAGED_FILE_TYPES = new Set(["vorstand", "elferrat", "downloads"]);
let confirmedGalleryName = "";
let galleryNameConfirmed = false;
const selectedGalleryFiles = new Map();
const pendingGalleryRepoDeletes = new Set();
const detachedGalleryUploads = new Set();
const selectedManagedFiles = new Map();
const pendingManagedRepoDeletes = new Set();
const detachedManagedUploads = new Set();
const selectedEntryImageFiles = new Map();
const pendingEntryImageRepoDeletes = new Set();
const detachedEntryImageUploads = new Set();
let onlineJsonLoaded = false;
let pendingGalleryScaffoldFiles = [];
let galleryDirectorySuggestions = [];
let activeHtmlAnswerInput = null;

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function highlightHtml(value) {
  return escapeHtml(value).replace(
    /(&lt;\/?)([a-zA-Z][\w-]*)([\s\S]*?)(\/?&gt;)/g,
    '<span class="syntax-bracket">$1</span><span class="syntax-tag">$2</span><span class="syntax-attribute">$3</span><span class="syntax-bracket">$4</span>'
  );
}

function syncHtmlEditorHighlight() {
  if (!htmlEditorInput || !htmlEditorHighlight) return;
  htmlEditorHighlight.innerHTML = `${highlightHtml(htmlEditorInput.value)}\n`;
  htmlEditorHighlight.scrollTop = htmlEditorInput.scrollTop;
  htmlEditorHighlight.scrollLeft = htmlEditorInput.scrollLeft;
}

function formatHtml(value) {
  const template = document.createElement("template");
  template.innerHTML = value || "";
  const lines = [];
  const voidTags = new Set(["AREA", "BASE", "BR", "COL", "EMBED", "HR", "IMG", "INPUT", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"]);

  const formatNode = (node, depth) => {
    const indentation = "  ".repeat(depth);
    if (node.nodeType === Node.TEXT_NODE) {
      const textValue = node.textContent.replace(/\s+/g, " ").trim();
      if (textValue) lines.push(`${indentation}${escapeHtml(textValue)}`);
      return;
    }
    if (node.nodeType === Node.COMMENT_NODE) {
      lines.push(`${indentation}<!--${node.textContent.trim()}-->`);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const tag = node.tagName.toLowerCase();
    const attributes = [...node.attributes]
      .map((attribute) => ` ${attribute.name}="${attribute.value.replaceAll("&", "&amp;").replaceAll('"', "&quot;")}"`)
      .join("");
    lines.push(`${indentation}<${tag}${attributes}>`);
    if (voidTags.has(node.tagName)) return;
    node.childNodes.forEach((child) => formatNode(child, depth + 1));
    lines.push(`${indentation}</${tag}>`);
  };

  template.content.childNodes.forEach((node) => formatNode(node, 0));
  return lines.join("\n");
}

function autoformatHtmlEditor() {
  if (!htmlEditorInput) return;
  htmlEditorInput.value = formatHtml(htmlEditorInput.value);
  syncHtmlEditorHighlight();
  htmlEditorInput.focus();
  htmlEditorInput.setSelectionRange(htmlEditorInput.value.length, htmlEditorInput.value.length);
}

function sanitizeAnswerHtml(value) {
  const template = document.createElement("template");
  template.innerHTML = value || "";
  const allowedTags = new Set(["P", "UL", "OL", "LI", "A", "STRONG", "EM", "BR"]);
  [...template.content.querySelectorAll("*")].reverse().forEach((node) => {
    if (!allowedTags.has(node.tagName)) {
      node.replaceWith(...node.childNodes);
      return;
    }
    const href = node.tagName === "A" ? node.getAttribute("href") || "" : "";
    [...node.attributes].forEach((attribute) => node.removeAttribute(attribute.name));
    if (node.tagName === "A") {
      if (/^(?:https?:|mailto:|\.\.?\/|#)/i.test(href)) node.setAttribute("href", href);
    }
  });
  return template.innerHTML;
}

function refreshAnswerPreview(input) {
  const preview = input?.closest(".form-field")?.querySelector(".html-answer-preview");
  if (!preview) return;
  preview.innerHTML = sanitizeAnswerHtml(input.value);
  preview.classList.toggle("is-empty", !input.value.trim());
  if (!input.value.trim()) preview.textContent = "Noch keine Antwort vorhanden.";
}

function closeHtmlEditor() {
  activeHtmlAnswerInput = null;
  if (htmlEditorDialog?.open) htmlEditorDialog.close();
}

function openHtmlEditor(input) {
  if (!htmlEditorDialog || !htmlEditorInput) return;
  activeHtmlAnswerInput = input;
  htmlEditorInput.value = formatHtml(input.value);
  syncHtmlEditorHighlight();
  htmlEditorDialog.showModal();
  htmlEditorInput.focus();
  htmlEditorInput.setSelectionRange(htmlEditorInput.value.length, htmlEditorInput.value.length);
}

function insertHtmlElement(tag) {
  if (!htmlEditorInput) return;
  let openingTag = `<${tag}>`;
  if (tag === "a") {
    const href = window.prompt("Wohin soll der Link führen?", "https://");
    if (href === null) return;
    openingTag = `<a href="${href.replaceAll("&", "&amp;").replaceAll('"', "&quot;")}">`;
  }
  const closingTag = `</${tag}>`;
  const start = htmlEditorInput.selectionStart;
  const end = htmlEditorInput.selectionEnd;
  const selectedText = htmlEditorInput.value.slice(start, end);
  htmlEditorInput.setRangeText(`${openingTag}${selectedText}${closingTag}`, start, end, "end");
  const cursorPosition = start + openingTag.length + selectedText.length;
  htmlEditorInput.setSelectionRange(cursorPosition, cursorPosition);
  htmlEditorInput.focus();
  syncHtmlEditorHighlight();
}

htmlEditorInput?.addEventListener("input", syncHtmlEditorHighlight);
htmlEditorInput?.addEventListener("scroll", syncHtmlEditorHighlight);
htmlEditorForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (activeHtmlAnswerInput) {
    activeHtmlAnswerInput.value = htmlEditorInput.value;
    refreshAnswerPreview(activeHtmlAnswerInput);
    resetValidationUi();
  }
  closeHtmlEditor();
});
cancelHtmlEditorBtn?.addEventListener("click", closeHtmlEditor);
formatHtmlEditorBtn?.addEventListener("click", autoformatHtmlEditor);
htmlEditorDialog?.addEventListener("cancel", () => { activeHtmlAnswerInput = null; });
document.querySelectorAll("[data-html-tag]").forEach((button) => {
  button.addEventListener("click", () => insertHtmlElement(button.dataset.htmlTag));
});

function getSourceBranch() {
  const value = sourceBranchSelect?.value?.trim();
  return value || CONFIG.DEFAULT_SOURCE_BRANCH;
}

function getTargetBranch() {
  const value = targetBranchInput?.value?.trim();
  return value || CONFIG.DEFAULT_TARGET_BRANCH;
}

function appendOption(key) {
  const opt = document.createElement("option");
  opt.value = key;
  opt.textContent = `${key} (${specs[key].filename})`;
  typeSelect.append(opt);
}

Object.keys(specs).forEach((key) => appendOption(key));

const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
const windowRegex = /^\d{4}-\d{2}-\d{2}-\d{2}:\d{2}$/;

function findLinkOptionByType(typeValue) {
  if (typeof typeValue !== "string") return null;
  let normalizedType = typeValue.trim().toLowerCase();
  if (normalizedType.startsWith("type=")) normalizedType = normalizedType.slice(5).trim();
  if (!normalizedType) return null;

  return (
    linkLabelOptions.find((option) => option.type.toLowerCase() === normalizedType) ||
    linkLabelOptions.find((option) => option.value.toLowerCase() === normalizedType) ||
    linkLabelOptions.find((option) => option.label.toLowerCase() === normalizedType) ||
    null
  );
}

function formatDateWindow(value) {
  return `${value.getUTCFullYear()}-${String(value.getUTCMonth() + 1).padStart(2, "0")}-${String(value.getUTCDate()).padStart(2, "0")}-${String(value.getUTCHours()).padStart(2, "0")}:${String(value.getUTCMinutes()).padStart(2, "0")}`;
}

function parseDate(value) {
  if (!dateRegex.test(value)) return null;
  const [day, month, year] = value.split(".");
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0, 0));
}

function toDateInputValue(value) {
  if (typeof value !== "string" || !dateRegex.test(value)) return "";
  const [day, month, year] = value.split(".");
  return `${year}-${month}-${day}`;
}

function fromDateInputValue(value) {
  if (typeof value !== "string" || !value) return "";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return "";
  return `${day}.${month}.${year}`;
}

function toDateTimeInputValue(value) {
  if (typeof value !== "string" || !windowRegex.test(value)) return "";
  const [year, month, day, hm] = value.split("-");
  return `${year}-${month}-${day}T${hm}`;
}

function fromDateTimeInputValue(value) {
  if (typeof value !== "string" || !value.includes("T")) return "";
  const [datePart, timePart] = value.split("T");
  if (!datePart || !timePart) return "";
  return `${datePart}-${timePart}`;
}

function toTimeInputValue(value) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  const match = trimmed.match(/^(\d{2}:\d{2})(?:\s*Uhr)?$/i);
  return match ? match[1] : "";
}

function fromTimeInputValue(value) {
  if (typeof value !== "string" || !value) return "";
  const match = value.match(/^\d{2}:\d{2}$/);
  if (!match) return "";
  return `${value} Uhr`;
}

function toCurrencyInputValue(value) {
  if (typeof value !== "string") return "";
  return value.replace(/\s*€\s*$/, "").trim();
}

function updateTypeDependentUi() {
  const isDynamicFileType = DYNAMIC_FILE_TYPES.has(typeSelect.value);
  galleryNameWrap.classList.toggle("hidden", !isDynamicFileType);
  const nameLabel = galleryNameWrap?.querySelector('label[for="galleryNameInput"]');
  if (nameLabel) {
    nameLabel.textContent = typeSelect.value === "gallery"
      ? "Galerie-Ordnername / Dateiname (ohne .json)"
      : "FAQ-Dateiname (ohne .json)";
  }
  if (confirmGalleryBtn) confirmGalleryBtn.textContent = typeSelect.value === "gallery" ? "Ordner bestätigen" : "Dateiname bestätigen";
  const showGalleryOverviewActions = typeSelect.value === "gallery-overview";
  createGalleryScaffoldBtn?.classList.toggle("hidden", !showGalleryOverviewActions);
  deleteGalleryScaffoldBtn?.classList.toggle("hidden", !showGalleryOverviewActions);
  updateGalleryConfirmationState();
}

function normalizeGalleryName(value) {
  const trimmed = (value || "").trim();
  if (!trimmed) return "";
  return trimmed.replace(/\.json$/i, "");
}

function getActiveGalleryName() {
  const defaultName = typeSelect.value === "special-faq" ? DEFAULT_SPECIAL_FAQ_NAME : DEFAULT_GALLERY_NAME;
  return confirmedGalleryName || normalizeGalleryName(galleryNameInput.value) || defaultName;
}

function getGalleryImagePrefix() {
  return `./src/img/gallerys/${getActiveGalleryName()}/`;
}

function hasEntries() {
  return entriesEl.querySelectorAll(".entry").length > 0;
}

function setGalleryHint(text, { warning = false } = {}) {
  if (!galleryConfirmHint) return;
  galleryConfirmHint.textContent = text;
  galleryConfirmHint.classList.toggle("is-warning", warning);
}

function updateGalleryConfirmationState() {
  const isDynamicFileType = DYNAMIC_FILE_TYPES.has(typeSelect.value);
  const currentName = normalizeGalleryName(galleryNameInput?.value);
  const needsConfirmation = isDynamicFileType && (!galleryNameConfirmed || currentName !== confirmedGalleryName);

  loadOnlineBtn.disabled = needsConfirmation;
  addEntryBtn.disabled = needsConfirmation || !onlineJsonLoaded;

  if (!isDynamicFileType) {
    setGalleryHint("Bitte Namen bestätigen, bevor Einträge geladen oder erstellt werden.");
    return;
  }

  if (needsConfirmation) {
    setGalleryHint("Bitte den Dateinamen bestätigen. Danach kannst du Online-JSON laden oder Einträge hinzufügen.", { warning: true });
    return;
  }

  setGalleryHint(`Dateiname bestätigt: ${confirmedGalleryName}. Du kannst jetzt laden oder Einträge hinzufügen.`);
}

function confirmGalleryName() {
  if (!DYNAMIC_FILE_TYPES.has(typeSelect.value)) return;
  const defaultName = typeSelect.value === "special-faq" ? DEFAULT_SPECIAL_FAQ_NAME : DEFAULT_GALLERY_NAME;
  const normalizedName = normalizeGalleryName(galleryNameInput.value) || defaultName;
  const isNameChange = galleryNameConfirmed && normalizedName !== confirmedGalleryName;

  if (isNameChange && hasEntries()) {
    const shouldClearEntries = window.confirm(
      `Der Dateiname wurde geändert von "${confirmedGalleryName}" auf "${normalizedName}". Alle aktuellen Einträge werden gelöscht. Fortfahren?`
    );
    if (!shouldClearEntries) {
      galleryNameInput.value = confirmedGalleryName;
      updateGalleryConfirmationState();
      return;
    }
    renderEntries(typeSelect.value);
    [...selectedGalleryFiles.values()].forEach((item) => {
      if (item?.objectUrl) URL.revokeObjectURL(item.objectUrl);
    });
    selectedGalleryFiles.clear();
    pendingGalleryRepoDeletes.clear();
    detachedGalleryUploads.clear();
  }

  confirmedGalleryName = normalizedName;
  galleryNameConfirmed = true;
  galleryNameInput.value = normalizedName;
  updateGalleryConfirmationState();
}

function clearResult() {
  outputEl.textContent = "";
  resultActions.classList.add("hidden");
  setCommitStatus("");
}

function setOnlineJsonLoaded(value) {
  onlineJsonLoaded = Boolean(value);
  updateGalleryConfirmationState();
}

function rememberGalleryFiles(files) {
  if (!Array.isArray(files) || files.length === 0) return;
  const folder = getActiveGalleryName();

  files.forEach((file) => {
    const safeFilename = getFilenameOnly(file?.name || "");
    if (!safeFilename) return;
    const repoPath = `src/img/gallerys/${folder}/${safeFilename}`;
    const existing = selectedGalleryFiles.get(repoPath);
    if (existing?.objectUrl) URL.revokeObjectURL(existing.objectUrl);
    selectedGalleryFiles.set(repoPath, {
      file,
      objectUrl: URL.createObjectURL(file)
    });
  });
}

function isManagedFileType(typeKey = typeSelect.value) {
  return MANAGED_FILE_TYPES.has(typeKey);
}

function getManagedFilenameField(typeKey = typeSelect.value) {
  const fields = specs[typeKey]?.fields;
  if (!Array.isArray(fields)) return null;
  return fields.find((field) => field.filenameOnly) || null;
}

function getManagedFileInput(entryEl) {
  const fileField = getManagedFilenameField();
  if (!fileField || !entryEl) return null;
  return entryEl.querySelector(`[data-field="${fileField.name}"]`);
}

function getManagedRepoPathFromInput(input) {
  if (!input || input.dataset.filenameOnly !== "true") return "";
  const filename = getFilenameOnly(input.value);
  const prefix = input.dataset.pathPrefix || "";
  if (!filename || !prefix) return "";
  return `${prefix}${filename}`.replace(/^\.\//, "");
}

function getManagedRepoPathFromEntry(entryEl) {
  return getManagedRepoPathFromInput(getManagedFileInput(entryEl));
}

function getManagedFieldAcceptValue() {
  return typeSelect.value === "downloads" ? ".pdf,.doc,.docx,.zip,.jpg,.jpeg,.png,.svg" : "image/*";
}

function rememberManagedFiles(files) {
  if (!isManagedFileType() || !Array.isArray(files) || files.length === 0) return;
  const field = getManagedFilenameField();
  if (!field?.pathPrefix) return;

  files.forEach((file) => {
    const safeFilename = getFilenameOnly(file?.name || "");
    if (!safeFilename) return;
    const repoPath = `${field.pathPrefix}${safeFilename}`.replace(/^\.\//, "");
    const existing = selectedManagedFiles.get(repoPath);
    if (existing?.objectUrl) URL.revokeObjectURL(existing.objectUrl);
    selectedManagedFiles.set(repoPath, { file, objectUrl: URL.createObjectURL(file) });
  });
}

function getCurrentManagedPathsFromInputs() {
  if (!isManagedFileType()) return new Set();
  const paths = new Set();
  entriesEl.querySelectorAll('.entry input[data-filename-only="true"]').forEach((input) => {
    const path = getManagedRepoPathFromInput(input);
    if (path) paths.add(path);
  });
  return paths;
}

function pruneUnusedSelectedManagedFiles() {
  if (!isManagedFileType()) return;
  const activePaths = getCurrentManagedPathsFromInputs();
  [...selectedManagedFiles.entries()].forEach(([filePath, fileData]) => {
    if (activePaths.has(filePath) || detachedManagedUploads.has(filePath)) return;
    if (fileData?.objectUrl) URL.revokeObjectURL(fileData.objectUrl);
    selectedManagedFiles.delete(filePath);
  });
}

function prunePendingManagedDeletes(activeEntries = null) {
  if (!isManagedFileType()) return;
  const fileField = getManagedFilenameField();
  const activePaths = activeEntries
    ? new Set(
      activeEntries
        .map((entry) => getImageSrc(entry?.[fileField.name]))
        .filter(Boolean)
        .filter((value) => !isExternalImagePath(value))
        .map((src) => src.replace(/^\.\//, ""))
    )
    : getCurrentManagedPathsFromInputs();

  [...pendingManagedRepoDeletes].forEach((filePath) => {
    if (activePaths.has(filePath)) pendingManagedRepoDeletes.delete(filePath);
  });
}

function getCurrentEntryImagePathsFromInputs() {
  if (!isEntryImageType()) return new Set();
  const paths = new Set();
  entriesEl.querySelectorAll('.entry [data-field="image"]').forEach((input) => {
    const path = getEntryImageRepoPathFromInput(input);
    if (path) paths.add(path);
  });
  return paths;
}

function pruneUnusedSelectedEntryImageFiles() {
  if (!isEntryImageType()) return;
  const activePaths = getCurrentEntryImagePathsFromInputs();
  [...selectedEntryImageFiles.entries()].forEach(([filePath, fileData]) => {
    if (activePaths.has(filePath) || detachedEntryImageUploads.has(filePath)) return;
    if (fileData?.objectUrl) URL.revokeObjectURL(fileData.objectUrl);
    selectedEntryImageFiles.delete(filePath);
  });
}

function prunePendingEntryImageDeletes(activeEntries = null) {
  const activePaths = activeEntries
    ? new Set(
      activeEntries
        .map((entry) => (entry?.image?.src && typeof entry.image.src === "string" ? entry.image.src : ""))
        .filter(Boolean)
        .filter((value) => !isExternalImagePath(value))
        .map((src) => src.replace(/^\.\//, ""))
    )
    : getCurrentEntryImagePathsFromInputs();

  [...pendingEntryImageRepoDeletes].forEach((filePath) => {
    if (activePaths.has(filePath)) pendingEntryImageRepoDeletes.delete(filePath);
  });
}

function clearManagedTrackingState() {
  [...selectedManagedFiles.values()].forEach((item) => {
    if (item?.objectUrl) URL.revokeObjectURL(item.objectUrl);
  });
  selectedManagedFiles.clear();
  pendingManagedRepoDeletes.clear();
  detachedManagedUploads.clear();
}

function getCurrentGallerySrcPathsFromInputs() {
  if (typeSelect.value !== "gallery") return new Set();
  const paths = new Set();
  entriesEl.querySelectorAll('.entry [data-field="image"]').forEach((input) => {
    if (input.dataset.gallerySource === "external") return;
    const filename = getGalleryImageFilenameFromValue(input.value);
    const prefix = input.dataset.pathPrefix || "";
    if (!filename || !prefix) return;
    paths.add(`${prefix}${filename}`.replace(/^\.\//, ""));
  });
  return paths;
}

function pruneUnusedSelectedGalleryFiles() {
  if (typeSelect.value !== "gallery") return;
  const activePaths = getCurrentGallerySrcPathsFromInputs();
  [...selectedGalleryFiles.entries()].forEach(([filePath, fileData]) => {
    if (activePaths.has(filePath) || detachedGalleryUploads.has(filePath)) return;
    if (fileData?.objectUrl) URL.revokeObjectURL(fileData.objectUrl);
    selectedGalleryFiles.delete(filePath);
  });
}

function getGalleryEntrySrcPath(entryEl) {
  if (!entryEl || typeSelect.value !== "gallery") return "";
  const srcInput = entryEl.querySelector('[data-field="image"]');
  if (!srcInput) return "";
  if (srcInput.dataset.gallerySource === "external") return "";
  const filename = getGalleryImageFilenameFromValue(srcInput.value);
  const prefix = srcInput.dataset.pathPrefix || "";
  if (!filename || !prefix) return "";
  return `${prefix}${filename}`.replace(/^\.\//, "");
}

function prunePendingGalleryDeletes(activeEntries = null) {
  const activePaths = activeEntries
    ? new Set(
      activeEntries
        .map((entry) => (entry?.image?.src && typeof entry.image.src === "string" ? entry.image.src : ""))
        .filter(Boolean)
        .map((src) => src.replace(/^\.\//, ""))
    )
    : getCurrentGallerySrcPathsFromInputs();

  [...pendingGalleryRepoDeletes].forEach((filePath) => {
    if (activePaths.has(filePath)) pendingGalleryRepoDeletes.delete(filePath);
  });
}

function removeEntryElement(entryEl) {
  const removedSrcPath = getGalleryEntrySrcPath(entryEl);
  const removedManagedPath = getManagedRepoPathFromEntry(entryEl);
  const removedEntryImagePath = getEntryImageRepoPathFromEntry(entryEl);
  entryEl.remove();
  pruneUnusedSelectedGalleryFiles();
  pruneUnusedSelectedManagedFiles();
  pruneUnusedSelectedEntryImageFiles();
  renumberAndRefreshSummaries();
  resetValidationUi();
  if (removedSrcPath && pendingGalleryRepoDeletes.has(removedSrcPath)) {
    prunePendingGalleryDeletes();
  }
  if (removedManagedPath && pendingManagedRepoDeletes.has(removedManagedPath)) {
    prunePendingManagedDeletes();
  }
  if (removedEntryImagePath && pendingEntryImageRepoDeletes.has(removedEntryImagePath)) {
    prunePendingEntryImageDeletes();
  }
}

function openEntryDeleteDialog() {
  if (!galleryDeleteDialog || !galleryDeleteForm || typeof galleryDeleteDialog.showModal !== "function") {
    const deleteInRepo = window.confirm(
      "Soll das Bild auch im Git-Repository gelöscht werden?\nOK: Bild + Eintrag löschen\nAbbrechen: Nur Eintrag löschen."
    );
    return Promise.resolve(deleteInRepo ? "delete-repo" : "entry-only");
  }

  return new Promise((resolve) => {
    const closeDialog = (result = null) => {
      confirmDeleteWithRepoBtn?.removeEventListener("click", handleDeleteWithRepo);
      confirmDeleteEntryOnlyBtn?.removeEventListener("click", handleEntryOnly);
      cancelGalleryDeleteBtn?.removeEventListener("click", handleCancel);
      galleryDeleteDialog.removeEventListener("cancel", handleCancel);
      if (galleryDeleteDialog.open) galleryDeleteDialog.close();
      resolve(result);
    };

    const handleDeleteWithRepo = () => closeDialog("delete-repo");
    const handleEntryOnly = () => closeDialog("entry-only");
    const handleCancel = () => closeDialog(null);

    confirmDeleteWithRepoBtn?.addEventListener("click", handleDeleteWithRepo);
    confirmDeleteEntryOnlyBtn?.addEventListener("click", handleEntryOnly);
    cancelGalleryDeleteBtn?.addEventListener("click", handleCancel);
    galleryDeleteDialog.addEventListener("cancel", handleCancel);
    galleryDeleteDialog.showModal();
    confirmDeleteWithRepoBtn?.focus();
  });
}

function resetValidationUi() {
  validationList.innerHTML = "";
  entriesEl.querySelectorAll(".has-error").forEach((el) => el.classList.remove("has-error"));
  clearResult();
}

function toInputValue(value, fieldType) {
  if (fieldType === "csv") return Array.isArray(value) ? value.join(", ") : "";
  if (fieldType === "checkbox") return !!value;
  if (fieldType === "date") return toDateInputValue(value);
  if (fieldType === "datetime") return toDateTimeInputValue(value);
  if (fieldType === "time") return toTimeInputValue(value);
  if (fieldType === "currency") return toCurrencyInputValue(value);
  if (fieldType === "textarea") {
    if (Array.isArray(value)) return value.join("\n\n");
    if (value && typeof value === "object") return JSON.stringify(value, null, 2);
  }
  return value ?? "";
}

function getFilenameOnly(value) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.split(/[\\/]/).pop() || "";
}

function isExternalImagePath(value) {
  return /^https?:\/\//i.test((value || "").trim());
}

function getImageSrc(value) {
  if (typeof value === "string") return value;
  return value && typeof value.src === "string" ? value.src : "";
}

function isEntryImageType(typeKey = typeSelect.value) {
  return typeKey === "news" || typeKey === "events" || typeKey === "royals";
}

function getGalleryImageFilenameFromValue(value) {
  return isExternalImagePath(value) ? "" : getFilenameOnly(value);
}

function updateImagePreviewForInput(input) {
  if (!input) return;
  const previewEl = input.closest(".form-field")?.querySelector(".image-preview");
  if (!previewEl) return;

  if (typeSelect.value === "gallery" && input.dataset.field === "image" && input.dataset.gallerySource === "external") {
    const externalUrl = input.value.trim();
    if (!externalUrl) {
      previewEl.classList.add("hidden");
      previewEl.removeAttribute("src");
      delete previewEl.dataset.fallbackSrc;
      return;
    }
    previewEl.src = externalUrl;
    previewEl.alt = "Vorschau externes Bild";
    previewEl.classList.remove("hidden");
    delete previewEl.dataset.fallbackSrc;
    return;
  }

  if (isManagedFileType() && input.dataset.managedSource === "external") {
    const externalUrl = input.value.trim();
    if (!externalUrl) {
      previewEl.classList.add("hidden");
      previewEl.removeAttribute("src");
      delete previewEl.dataset.fallbackSrc;
      return;
    }
    previewEl.src = externalUrl;
    previewEl.alt = "Vorschau externe Datei";
    previewEl.classList.remove("hidden");
    delete previewEl.dataset.fallbackSrc;
    return;
  }

  if (isEntryImageType() && input.dataset.entryImageSource === "external") {
    const externalUrl = input.value.trim();
    if (!externalUrl) {
      previewEl.classList.add("hidden");
      previewEl.removeAttribute("src");
      delete previewEl.dataset.fallbackSrc;
      return;
    }
    previewEl.src = externalUrl;
    previewEl.alt = "Vorschau externes Bild";
    previewEl.classList.remove("hidden");
    delete previewEl.dataset.fallbackSrc;
    return;
  }

  if (input.dataset.filenameOnly !== "true") return;
  const filename = getFilenameOnly(input.value);
  const pathPrefix = input.dataset.pathPrefix || "";
  if (!filename || !pathPrefix) {
    previewEl.classList.add("hidden");
    previewEl.removeAttribute("src");
    delete previewEl.dataset.fallbackSrc;
    return;
  }

  const relativeSrc = `${pathPrefix}${filename}`;
  const isGalleryImage = typeSelect.value === "gallery" && input.dataset.field === "image";
  const galleryRepoPath = relativeSrc.replace(/^\.\//, "");
  const selectedGalleryFile = isGalleryImage ? selectedGalleryFiles.get(galleryRepoPath) : null;
  const selectedManagedFile = !isGalleryImage ? selectedManagedFiles.get(galleryRepoPath) : null;
  if (selectedGalleryFile?.objectUrl) {
    previewEl.src = selectedGalleryFile.objectUrl;
    previewEl.alt = `Vorschau ${filename}`;
    previewEl.classList.remove("hidden");
    delete previewEl.dataset.fallbackSrc;
    return;
  }
  if (selectedManagedFile?.objectUrl) {
    previewEl.src = selectedManagedFile.objectUrl;
    previewEl.alt = `Vorschau ${filename}`;
    previewEl.classList.remove("hidden");
    delete previewEl.dataset.fallbackSrc;
    return;
  }

  const normalizedRelative = relativeSrc.replace(/^\.\//, "");
  const absoluteSrc = `${CONFIG.DEFAULT_ASSET_BASE_URL.replace(/\/$/, "")}/${normalizedRelative}`;

  previewEl.dataset.fallbackSrc = relativeSrc;
  previewEl.src = absoluteSrc;
  previewEl.alt = `Vorschau ${filename}`;
  previewEl.classList.remove("hidden");
}

function setGallerySrcInputMode(srcInput, mode, value) {
  if (!srcInput) return;
  const inputWithPrefix = srcInput.closest(".input-with-prefix");
  srcInput.dataset.gallerySource = mode;

  if (mode === "external") {
    srcInput.dataset.filenameOnly = "false";
    srcInput.value = (value || "").trim();
  } else {
    srcInput.dataset.filenameOnly = "true";
    srcInput.value = getFilenameOnly(value || "");
  }

  inputWithPrefix?.classList.toggle("is-external-source", mode === "external");
  updateImagePreviewForInput(srcInput);
}

function setManagedFileInputMode(fileInput, mode, value) {
  if (!fileInput) return;
  const inputWithPrefix = fileInput.closest(".input-with-prefix");
  fileInput.dataset.managedSource = mode;

  if (mode === "external") {
    fileInput.dataset.filenameOnly = "false";
    fileInput.value = (value || "").trim();
  } else {
    fileInput.dataset.filenameOnly = "true";
    fileInput.value = getFilenameOnly(value || "");
  }

  inputWithPrefix?.classList.toggle("is-external-source", mode === "external");
  updateImagePreviewForInput(fileInput);
}

function getEntryImageInput(entryEl) {
  if (!entryEl || !isEntryImageType()) return null;
  return entryEl.querySelector('[data-field="image"]');
}

function getEntryImageRepoPathFromInput(input) {
  if (!input || input.dataset.filenameOnly !== "true") return "";
  const filename = getFilenameOnly(input.value);
  const prefix = input.dataset.pathPrefix || "";
  if (!filename || !prefix) return "";
  return `${prefix}${filename}`.replace(/^\.\//, "");
}

function getEntryImageRepoPathFromEntry(entryEl) {
  return getEntryImageRepoPathFromInput(getEntryImageInput(entryEl));
}

function hasEntryImageValue(input) {
  if (!input) return false;
  return Boolean((input.value || "").trim());
}

function refreshEntryImageActionButton(entryEl) {
  const imageInput = getEntryImageInput(entryEl);
  const actionBtn = entryEl?.querySelector(".entry-image-action-btn");
  if (!imageInput || !actionBtn) return;
  const hasImage = hasEntryImageValue(imageInput);
  actionBtn.textContent = "🔁";
  actionBtn.title = hasImage ? "Bild tauschen oder entfernen" : "Bild hinzufügen";
  actionBtn.setAttribute("aria-label", hasImage ? "Bild tauschen oder entfernen" : "Bild hinzufügen");
}

function setEntryImageInputMode(imageInput, mode, value) {
  if (!imageInput) return;
  const inputWithPrefix = imageInput.closest(".input-with-prefix");
  imageInput.dataset.entryImageSource = mode;

  if (mode === "external") {
    imageInput.dataset.filenameOnly = "false";
    imageInput.value = (value || "").trim();
  } else {
    imageInput.dataset.filenameOnly = "true";
    imageInput.value = getFilenameOnly(value || "");
  }

  inputWithPrefix?.classList.toggle("is-external-source", mode === "external");
  updateImagePreviewForInput(imageInput);
}

function rememberEntryImageFile(file, imageInput) {
  if (!file || !imageInput) return;
  const repoPath = `${imageInput.dataset.pathPrefix || ""}${getFilenameOnly(file.name)}`.replace(/^\.\//, "");
  if (!repoPath) return;
  const existing = selectedEntryImageFiles.get(repoPath);
  if (existing?.objectUrl) URL.revokeObjectURL(existing.objectUrl);
  selectedEntryImageFiles.set(repoPath, { file, objectUrl: URL.createObjectURL(file) });
}

async function fetchInternalEntryImages(imageInput) {
  const prefix = (imageInput?.dataset.pathPrefix || "").replace(/^\.\//, "").replace(/\/$/, "");
  if (!prefix) throw new Error("Kein Zielordner für Bilder definiert.");

  const owner = CONFIG.GITHUB_OWNER;
  const repo = CONFIG.GITHUB_REPO;
  const branch = getTargetBranch();
  const apiUrls = [
    `https://api.github.com/repos/${owner}/${repo}/contents/${prefix}?ref=${encodeURIComponent(branch)}`,
    `https://api.github.com/repos/${owner}/${repo}/contents/${prefix}`
  ];
  const fileNameSet = new Set();
  const knownFilenames = new Set();

  entriesEl.querySelectorAll('.entry [data-field="image"]').forEach((input) => {
    const filename = getFilenameOnly(input.value);
    if (filename) knownFilenames.add(filename);
  });
  [...selectedEntryImageFiles.keys()]
    .filter((filePath) => filePath.startsWith(`${prefix}/`))
    .forEach((filePath) => knownFilenames.add(filePath.split("/").pop()));

  let lastError = null;
  for (const apiUrl of apiUrls) {
    try {
      const response = await fetch(apiUrl, { headers: { Accept: "application/vnd.github+json" } });
      if (!response.ok) {
        lastError = new Error(`Ordner konnte nicht geladen werden (HTTP ${response.status}).`);
        continue;
      }
      const payload = await response.json();
      if (Array.isArray(payload)) {
        payload
          .filter((item) => item?.type === "file" && typeof item?.name === "string")
          .map((item) => item.name)
          .filter((name) => /\.(png|jpe?g|gif|webp|svg|avif)$/i.test(name))
          .forEach((name) => fileNameSet.add(name));
      }
      break;
    } catch (error) {
      lastError = error;
    }
  }

  knownFilenames.forEach((name) => fileNameSet.add(name));
  const files = [...fileNameSet].sort((a, b) => a.localeCompare(b, "de"));
  if (files.length > 0) return files;
  throw lastError || new Error("Keine internen Bilder gefunden.");
}

function clearEntryImageFromInput(imageInput) {
  if (!imageInput) return;
  setEntryImageInputMode(imageInput, "repo", "");
}

async function handleEntryImageAction(entryEl) {
  const imageInput = getEntryImageInput(entryEl);
  if (!imageInput) return;
  const previousPath = getEntryImageRepoPathFromInput(imageInput);

  if (hasEntryImageValue(imageInput)) {
    const decision = await openGalleryReplacePolicyDialog();
    if (!decision) return;
    if (decision === "delete" && previousPath) {
      pendingEntryImageRepoDeletes.add(previousPath);
      detachedEntryImageUploads.delete(previousPath);
    }
    if (decision === "keep" && previousPath) {
      pendingEntryImageRepoDeletes.delete(previousPath);
      if (selectedEntryImageFiles.has(previousPath)) detachedEntryImageUploads.add(previousPath);
    }
    clearEntryImageFromInput(imageInput);
    const source = await openGallerySourceDialog({ allowNone: true });
    if (!source) {
      refreshEntryImageActionButton(entryEl);
      resetValidationUi();
      return;
    }
    if (source === "none") {
      refreshEntryImageActionButton(entryEl);
      resetValidationUi();
      return;
    }

    if (source === "new") {
      const file = await pickSingleLocalImage();
      if (!file) {
        refreshEntryImageActionButton(entryEl);
        resetValidationUi();
        return;
      }
      rememberEntryImageFile(file, imageInput);
      const nextPath = `${imageInput.dataset.pathPrefix || ""}${getFilenameOnly(file.name)}`.replace(/^\.\//, "");
      pendingEntryImageRepoDeletes.delete(nextPath);
      detachedEntryImageUploads.delete(nextPath);
      setEntryImageInputMode(imageInput, "repo", file.name);
    }

    if (source === "internal") {
      try {
        const internalFiles = await fetchInternalEntryImages(imageInput);
        if (internalFiles.length === 0) {
          window.alert("Im Zielordner wurden keine Bilder gefunden.");
          refreshEntryImageActionButton(entryEl);
          resetValidationUi();
          return;
        }
        const relativePrefix = imageInput.dataset.pathPrefix || "";
        const selectedFile = await openInternalGalleryImageDialog(internalFiles, {
          relativePrefix,
          repoPrefix: relativePrefix.replace(/^\.\//, ""),
          selectedFileMap: selectedEntryImageFiles
        });
        if (!selectedFile) {
          refreshEntryImageActionButton(entryEl);
          resetValidationUi();
          return;
        }
        const nextPath = `${imageInput.dataset.pathPrefix || ""}${getFilenameOnly(selectedFile)}`.replace(/^\.\//, "");
        pendingEntryImageRepoDeletes.delete(nextPath);
        detachedEntryImageUploads.delete(nextPath);
        setEntryImageInputMode(imageInput, "repo", selectedFile);
      } catch (error) {
        window.alert(`Interne Bilder konnten nicht geladen werden: ${error.message}`);
        refreshEntryImageActionButton(entryEl);
        resetValidationUi();
        return;
      }
    }

    if (source === "external") {
      const link = window.prompt("Bitte externen Bildlink eingeben (https://...):", "");
      if (!link) {
        refreshEntryImageActionButton(entryEl);
        resetValidationUi();
        return;
      }
      if (!isExternalImagePath(link)) {
        window.alert("Bitte eine vollständige http(s)-URL angeben.");
        refreshEntryImageActionButton(entryEl);
        resetValidationUi();
        return;
      }
      setEntryImageInputMode(imageInput, "external", link.trim());
    }

    refreshEntryImageActionButton(entryEl);
    resetValidationUi();
    return;
  }

  const source = await openGallerySourceDialog();
  if (!source) return;

  if (source === "new") {
    const file = await pickSingleLocalImage();
    if (!file) return;
    rememberEntryImageFile(file, imageInput);
    const nextPath = `${imageInput.dataset.pathPrefix || ""}${getFilenameOnly(file.name)}`.replace(/^\.\//, "");
    pendingEntryImageRepoDeletes.delete(nextPath);
    detachedEntryImageUploads.delete(nextPath);
    setEntryImageInputMode(imageInput, "repo", file.name);
  }

  if (source === "internal") {
    try {
      const internalFiles = await fetchInternalEntryImages(imageInput);
      if (internalFiles.length === 0) {
        window.alert("Im Zielordner wurden keine Bilder gefunden.");
        return;
      }
      const relativePrefix = imageInput.dataset.pathPrefix || "";
      const selectedFile = await openInternalGalleryImageDialog(internalFiles, {
        relativePrefix,
        repoPrefix: relativePrefix.replace(/^\.\//, ""),
        selectedFileMap: selectedEntryImageFiles
      });
      if (!selectedFile) return;
      const nextPath = `${imageInput.dataset.pathPrefix || ""}${getFilenameOnly(selectedFile)}`.replace(/^\.\//, "");
      pendingEntryImageRepoDeletes.delete(nextPath);
      detachedEntryImageUploads.delete(nextPath);
      setEntryImageInputMode(imageInput, "repo", selectedFile);
    } catch (error) {
      window.alert(`Interne Bilder konnten nicht geladen werden: ${error.message}`);
      return;
    }
  }

  if (source === "external") {
    const link = window.prompt("Bitte externen Bildlink eingeben (https://...):", "");
    if (!link) return;
    if (!isExternalImagePath(link)) {
      window.alert("Bitte eine vollständige http(s)-URL angeben.");
      return;
    }
    setEntryImageInputMode(imageInput, "external", link.trim());
  }

  refreshEntryImageActionButton(entryEl);
  resetValidationUi();
}

function pickSingleLocalFile(accept = "") {
  return new Promise((resolve) => {
    const picker = document.createElement("input");
    picker.type = "file";
    if (accept) picker.accept = accept;
    picker.addEventListener("change", () => {
      const [file] = [...(picker.files || [])];
      resolve(file || null);
    }, { once: true });
    picker.click();
  });
}

async function startManagedFileReplacement(entryEl) {
  if (!isManagedFileType()) return;
  const fileInput = getManagedFileInput(entryEl);
  if (!fileInput) return;

  const previousPath = getManagedRepoPathFromInput(fileInput);
  let selectedPolicy = null;
  if (previousPath) {
    selectedPolicy = await openGalleryReplacePolicyDialog();
    if (!selectedPolicy) return;
  }

  const source = await openGallerySourceDialog();
  if (!source) return;

  const applyPreviousPolicy = () => {
    if (!previousPath) return;
    if (selectedPolicy === "delete") {
      pendingManagedRepoDeletes.add(previousPath);
      detachedManagedUploads.delete(previousPath);
      return;
    }
    pendingManagedRepoDeletes.delete(previousPath);
    if (selectedManagedFiles.has(previousPath)) detachedManagedUploads.add(previousPath);
  };

  if (source === "new") {
    const file = await pickSingleLocalFile(getManagedFieldAcceptValue());
    if (!file) return;
    applyPreviousPolicy();
    rememberManagedFiles([file]);
    const nextPath = `${fileInput.dataset.pathPrefix || ""}${getFilenameOnly(file.name)}`.replace(/^\.\//, "");
    pendingManagedRepoDeletes.delete(nextPath);
    detachedManagedUploads.delete(nextPath);
    setManagedFileInputMode(fileInput, "repo", file.name);
  }

  if (source === "internal") {
    try {
      const internalFiles = await fetchInternalManagedFiles();
      if (internalFiles.length === 0) {
        window.alert("Im Zielordner wurden keine Dateien gefunden.");
        return;
      }
      const relativePrefix = fileInput.dataset.pathPrefix || "";
      const selectedFile = await openInternalGalleryImageDialog(internalFiles, {
        relativePrefix,
        repoPrefix: relativePrefix.replace(/^\.\//, ""),
        selectedFileMap: selectedManagedFiles,
        previewLabel: "Vorschau Datei"
      });
      if (!selectedFile) return;
      applyPreviousPolicy();
      const nextPath = `${fileInput.dataset.pathPrefix || ""}${getFilenameOnly(selectedFile)}`.replace(/^\.\//, "");
      pendingManagedRepoDeletes.delete(nextPath);
      detachedManagedUploads.delete(nextPath);
      setManagedFileInputMode(fileInput, "repo", selectedFile);
    } catch (error) {
      window.alert(`Interne Dateien konnten nicht geladen werden: ${error.message}`);
      return;
    }
  }

  if (source === "external") {
    const link = window.prompt("Bitte externen Dateilink eingeben (https://...):", fileInput.value.trim());
    if (!link) return;
    if (!isExternalImagePath(link)) {
      window.alert("Bitte eine vollständige http(s)-URL angeben.");
      return;
    }
    applyPreviousPolicy();
    setManagedFileInputMode(fileInput, "external", link.trim());
  }

  const index = [...entriesEl.querySelectorAll(".entry")].indexOf(entryEl);
  refreshEntrySummary(entryEl, index);
  resetValidationUi();
}


async function fetchGalleryDirectories() {
  const owner = CONFIG.GITHUB_OWNER;
  const repo = CONFIG.GITHUB_REPO;
  const branch = getSourceBranch();
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/galerie?ref=${encodeURIComponent(branch)}`;
  const response = await fetch(apiUrl, { headers: { Accept: "application/vnd.github+json" } });
  if (!response.ok) throw new Error(`Galerie-Ordner konnten nicht geladen werden (HTTP ${response.status}).`);
  const payload = await response.json();
  if (!Array.isArray(payload)) return [];
  return payload
    .filter((item) => item?.type === "dir" && typeof item?.name === "string")
    .map((item) => item.name)
    .sort((a, b) => a.localeCompare(b, "de"));
}

function ensureGalleryDirectoryDatalist() {
  let datalist = document.querySelector('#galleryDirectorySuggestions');
  if (!datalist) {
    datalist = document.createElement('datalist');
    datalist.id = 'galleryDirectorySuggestions';
    document.body.append(datalist);
  }
  datalist.innerHTML = '';
  galleryDirectorySuggestions.forEach((name) => {
    const option = document.createElement('option');
    option.value = name;
    datalist.append(option);
  });
}

function applyGalleryDirectorySuggestionsToInputs() {
  if (typeSelect.value !== 'gallery-overview') return;
  ensureGalleryDirectoryDatalist();
  entriesEl.querySelectorAll('input[data-field="directory"]').forEach((input) => {
    input.setAttribute('list', 'galleryDirectorySuggestions');
  });
}

async function refreshGalleryDirectorySuggestions() {
  if (typeSelect.value !== 'gallery-overview') return;
  try {
    galleryDirectorySuggestions = await fetchGalleryDirectories();
    applyGalleryDirectorySuggestionsToInputs();
  } catch (error) {
    galleryDirectorySuggestions = [];
  }
}
function createInput(field, value) {
  const wrapper = document.createElement("div");
  wrapper.className = "form-field";

  const label = document.createElement("label");
  label.textContent = `${field.name}${field.required ? " *" : ""}`;
  wrapper.append(label);

  let input;
  const imageValue = field.type === "image" && value && typeof value === "object" ? value : null;
  const rawValue = imageValue ? imageValue.src : value;
  const normalizedValue = field.filenameOnly ? getFilenameOnly(rawValue) : rawValue;

  if (field.type === "textarea") {
    input = document.createElement("textarea");
    input.value = toInputValue(normalizedValue, field.type);
  } else if (field.type === "checkbox") {
    input = document.createElement("input");
    input.type = "checkbox";
    input.checked = toInputValue(normalizedValue, field.type);
  } else if (field.type === "date") {
    input = document.createElement("input");
    input.type = "date";
    input.value = toInputValue(normalizedValue, field.type);
  } else if (field.type === "datetime") {
    input = document.createElement("input");
    input.type = "datetime-local";
    input.value = toInputValue(normalizedValue, field.type);
  } else if (field.type === "time") {
    input = document.createElement("input");
    input.type = "time";
    input.value = toInputValue(normalizedValue, field.type);
  } else if (field.type === "select") {
    input = document.createElement("select");
    const options = Array.isArray(field.options) ? field.options : [];
    options.forEach((option) => {
      const optionEl = document.createElement("option");
      optionEl.value = option.value;
      optionEl.textContent = option.label;
      input.append(optionEl);
    });
    input.value = String(normalizedValue ?? "");
  } else {
    input = document.createElement("input");
    input.type = "text";
    input.value = toInputValue(normalizedValue, field.type);
  }

  if (field.placeholder) input.placeholder = field.placeholder;
  if (typeSelect.value === "gallery-overview" && field.name === "directory" && input.tagName === "INPUT") {
    ensureGalleryDirectoryDatalist();
    input.setAttribute("list", "galleryDirectorySuggestions");
  }
  input.dataset.field = field.name;
  input.dataset.fieldType = field.type;
  input.dataset.required = String(!!field.required);

  if (field.type === "currency") {
    const inputWithPrefix = document.createElement("div");
    inputWithPrefix.className = "input-with-prefix";

    const prefix = document.createElement("span");
    prefix.className = "input-prefix";
    prefix.textContent = "€";
    inputWithPrefix.append(prefix, input);
    wrapper.append(inputWithPrefix);
  } else if (field.filenameOnly && field.pathPrefix && field.type !== "textarea" && field.type !== "checkbox") {
    const inputWithPrefix = document.createElement("div");
    inputWithPrefix.className = "input-with-prefix";

    const prefix = document.createElement("span");
    prefix.className = "input-prefix";
    prefix.textContent = field.pathPrefix;
    inputWithPrefix.append(prefix, input);
    wrapper.append(inputWithPrefix);
  } else {
    wrapper.append(input);
  }

  if (field.filenameOnly) input.dataset.filenameOnly = "true";
  if (field.pathPrefix) input.dataset.pathPrefix = field.pathPrefix;
  if (field.allowAuto) input.dataset.allowAuto = "true";

  if (field.filenameOnly) {
    const previewWrap = document.createElement("div");
    previewWrap.className = "image-preview-wrap";
    const preview = document.createElement("img");
    preview.className = "image-preview";
    preview.loading = "lazy";
    preview.decoding = "async";
    preview.alt = "Bildvorschau";
    preview.addEventListener("error", () => {
      const fallbackSrc = preview.dataset.fallbackSrc;
      if (fallbackSrc && preview.src !== fallbackSrc) {
        preview.src = fallbackSrc;
        delete preview.dataset.fallbackSrc;
        return;
      }
      preview.classList.add("hidden");
      preview.removeAttribute("src");
      delete preview.dataset.fallbackSrc;
    });
    previewWrap.append(preview);
    wrapper.append(previewWrap);
    updateImagePreviewForInput(input);
  }

  if (field.type === "image") {
    const options = document.createElement("div");
    options.className = "image-options";
    options.innerHTML = `
      <label><input type="checkbox" data-image-meta="ki"> KI</label>
      <label><input type="checkbox" data-image-meta="teilweiseKi"> Teilweise KI</label>
      <label>Label-Farbe
        <select data-image-meta="theme">
          <option value="">Keine</option><option value="black">Schwarz</option><option value="white">Weiß</option>
        </select>
      </label>`;
    const kiInput = options.querySelector('[data-image-meta="ki"]');
    const partialInput = options.querySelector('[data-image-meta="teilweiseKi"]');
    const themeInput = options.querySelector('[data-image-meta="theme"]');
    kiInput.checked = Boolean(imageValue?.ki);
    partialInput.checked = Boolean(imageValue?.teilweiseKi);
    themeInput.value = imageValue?.theme || "";
    kiInput.addEventListener("change", () => {
      if (kiInput.checked) partialInput.checked = false;
      updateImageLabelPreview(input);
    });
    partialInput.addEventListener("change", () => {
      if (partialInput.checked) kiInput.checked = false;
      updateImageLabelPreview(input);
    });
    themeInput.addEventListener("change", () => updateImageLabelPreview(input));
    wrapper.append(options);
    updateImageLabelPreview(input);
  }

  if (field.htmlEditor && field.type === "textarea") {
    input.classList.add("html-answer-source");
    input.hidden = true;
    const preview = document.createElement("div");
    preview.className = "html-answer-preview";
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "secondary-button";
    editButton.textContent = "HTML bearbeiten";
    editButton.addEventListener("click", () => openHtmlEditor(input));
    wrapper.append(preview, editButton);
    refreshAnswerPreview(input);
  }

  return { wrapper, input };
}

function updateImageLabelPreview(input) {
  const wrapper = input?.closest(".form-field");
  const previewWrap = wrapper?.querySelector(".image-preview-wrap");
  if (!previewWrap) return;
  previewWrap.querySelector(".image-ai-label")?.remove();
  const ki = Boolean(wrapper.querySelector('[data-image-meta="ki"]')?.checked);
  const teilweiseKi = Boolean(wrapper.querySelector('[data-image-meta="teilweiseKi"]')?.checked);
  const theme = wrapper.querySelector('[data-image-meta="theme"]')?.value;
  if ((!ki && !teilweiseKi) || !theme) return;
  const label = document.createElement("img");
  label.className = "image-ai-label";
  label.alt = ki ? `KI-Label (${theme})` : `Teilweise-KI-Label (${theme})`;
  label.src = `${CONFIG.DEFAULT_ASSET_BASE_URL.replace(/\/$/, "")}/src/img/ki_labels/${ki ? "ki" : "teilweise_ki"}_${theme}.png`;
  previewWrap.append(label);
}

function addListItem(field, container, value = {}, onChange = () => {}) {
  const item = document.createElement("div");
  item.className = "list-item";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "Entfernen";
  removeBtn.addEventListener("click", () => {
    item.remove();
    onChange();
    resetValidationUi();
  });
  item.append(removeBtn);

  const definition =
    field.type === "pairList"
      ? [
          { name: "prince", type: "text", required: true },
          { name: "princess", type: "text", required: true }
        ]
      : field.itemFields;

  const normalizedValue = { ...value };
  if (field.name === "links") {
    const hasValidLabel = linkLabelOptions.some((option) => option.value === normalizedValue.label);
    const matchingOption = hasValidLabel
      ? null
      : findLinkOptionByType(normalizedValue.type) || findLinkOptionByType(normalizedValue.label);
    if (matchingOption) normalizedValue.label = matchingOption.value;
  }

  definition.forEach((subField) => {
    const { wrapper, input } = createInput(subField, normalizedValue[subField.name]);
    input.dataset.subField = subField.name;
    input.dataset.required = String(!!subField.required);
    if (field.name === "fragen" && subField.name === "antwort") {
      input.classList.add("html-answer-source");
      input.hidden = true;
      const preview = document.createElement("div");
      preview.className = "html-answer-preview";
      const editButton = document.createElement("button");
      editButton.type = "button";
      editButton.className = "html-answer-edit-button";
      editButton.textContent = "HTML bearbeiten";
      editButton.addEventListener("click", () => openHtmlEditor(input));
      wrapper.append(preview, editButton);
      refreshAnswerPreview(input);
    }
    item.append(wrapper);
  });

  container.append(item);
  onChange();
}

function openGalleryReplacePolicyDialog() {
  if (!galleryReplacePolicyDialog || !galleryReplacePolicyForm || typeof galleryReplacePolicyDialog.showModal !== "function") {
    const shouldDelete = window.confirm("Soll das alte Bild im Git-Repository gelöscht werden? (Empfohlen)");
    return Promise.resolve(shouldDelete ? "delete" : "keep");
  }

  return new Promise((resolve) => {
    const closeDialog = (result = null) => {
      keepOldGalleryImageBtn?.removeEventListener("click", handleKeep);
      deleteOldGalleryImageBtn?.removeEventListener("click", handleDelete);
      cancelReplacePolicyBtn?.removeEventListener("click", handleCancel);
      galleryReplacePolicyDialog.removeEventListener("cancel", handleCancel);
      if (galleryReplacePolicyDialog.open) galleryReplacePolicyDialog.close();
      resolve(result);
    };
    const handleKeep = () => closeDialog("keep");
    const handleDelete = () => closeDialog("delete");
    const handleCancel = () => closeDialog(null);

    keepOldGalleryImageBtn?.addEventListener("click", handleKeep);
    deleteOldGalleryImageBtn?.addEventListener("click", handleDelete);
    cancelReplacePolicyBtn?.addEventListener("click", handleCancel);
    galleryReplacePolicyDialog.addEventListener("cancel", handleCancel);
    galleryReplacePolicyDialog.showModal();
    deleteOldGalleryImageBtn?.focus();
  });
}

function openGallerySourceDialog({ allowNone = false } = {}) {
  if (!gallerySourceDialog || !gallerySourceForm || typeof gallerySourceDialog.showModal !== "function") {
    const selected = window.prompt(
      allowNone ? "Neue Bildquelle wählen: neu / intern / extern / kein" : "Neue Bildquelle wählen: neu / intern / extern",
      "neu"
    );
    const normalized = (selected || "").trim().toLowerCase();
    if (normalized === "neu") return Promise.resolve("new");
    if (normalized === "intern") return Promise.resolve("internal");
    if (normalized === "extern") return Promise.resolve("external");
    if (allowNone && (normalized === "kein" || normalized === "none")) return Promise.resolve("none");
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    const closeDialog = (result = null) => {
      selectGallerySourceNewBtn?.removeEventListener("click", handleNew);
      selectGallerySourceInternalBtn?.removeEventListener("click", handleInternal);
      selectGallerySourceExternalBtn?.removeEventListener("click", handleExternal);
      selectGallerySourceNoneBtn?.removeEventListener("click", handleNone);
      cancelGallerySourceBtn?.removeEventListener("click", handleCancel);
      gallerySourceDialog.removeEventListener("cancel", handleCancel);
      if (gallerySourceDialog.open) gallerySourceDialog.close();
      resolve(result);
    };
    const handleNew = () => closeDialog("new");
    const handleInternal = () => closeDialog("internal");
    const handleExternal = () => closeDialog("external");
    const handleNone = () => closeDialog("none");
    const handleCancel = () => closeDialog(null);

    if (selectGallerySourceNoneBtn) {
      selectGallerySourceNoneBtn.hidden = !allowNone;
    }
    selectGallerySourceNewBtn?.addEventListener("click", handleNew);
    selectGallerySourceInternalBtn?.addEventListener("click", handleInternal);
    selectGallerySourceExternalBtn?.addEventListener("click", handleExternal);
    selectGallerySourceNoneBtn?.addEventListener("click", handleNone);
    cancelGallerySourceBtn?.addEventListener("click", handleCancel);
    gallerySourceDialog.addEventListener("cancel", handleCancel);
    gallerySourceDialog.showModal();
    selectGallerySourceNewBtn?.focus();
  });
}

function pickSingleLocalImage() {
  return new Promise((resolve) => {
    const picker = document.createElement("input");
    picker.type = "file";
    picker.accept = "image/*";
    picker.addEventListener("change", () => {
      const [file] = [...(picker.files || [])];
      resolve(file || null);
    }, { once: true });
    picker.click();
  });
}

async function fetchInternalGalleryImages() {
  const owner = CONFIG.GITHUB_OWNER;
  const repo = CONFIG.GITHUB_REPO;
  const branch = getTargetBranch();
  const folder = getActiveGalleryName();
  const folderPath = `src/img/gallerys/${folder}`;
  const apiUrls = [
    `https://api.github.com/repos/${owner}/${repo}/contents/${folderPath}?ref=${encodeURIComponent(branch)}`,
    `https://api.github.com/repos/${owner}/${repo}/contents/${folderPath}`
  ];
  const imageNameSet = new Set();

  const knownFilenames = new Set();
  entriesEl.querySelectorAll('.entry [data-field="image"]').forEach((input) => {
    const filename = getGalleryImageFilenameFromValue(input.value);
    if (filename) knownFilenames.add(filename);
  });
  [...selectedGalleryFiles.keys()]
    .filter((filePath) => filePath.startsWith(`${folderPath}/`))
    .forEach((filePath) => knownFilenames.add(filePath.split("/").pop()));

  let lastError = null;
  for (const apiUrl of apiUrls) {
    try {
      const response = await fetch(apiUrl, { headers: { Accept: "application/vnd.github+json" } });
      if (!response.ok) {
        lastError = new Error(`Ordner konnte nicht geladen werden (HTTP ${response.status}).`);
        continue;
      }

      const payload = await response.json();
      if (Array.isArray(payload)) {
        payload
          .filter((item) => item?.type === "file" && typeof item?.name === "string")
          .map((item) => item.name)
          .filter((name) => /\.(png|jpe?g|gif|webp|svg|avif)$/i.test(name))
          .forEach((name) => imageNameSet.add(name));
      }
      break;
    } catch (error) {
      lastError = error;
    }
  }

  knownFilenames.forEach((name) => imageNameSet.add(name));
  const images = [...imageNameSet].sort((a, b) => a.localeCompare(b, "de"));
  if (images.length > 0) return images;
  throw lastError || new Error("Keine internen Bilder gefunden.");
}

async function fetchInternalManagedFiles() {
  if (!isManagedFileType()) return [];
  const field = getManagedFilenameField();
  const prefix = (field?.pathPrefix || "").replace(/^\.\//, "").replace(/\/$/, "");
  if (!prefix) throw new Error("Kein Zielordner für Dateien definiert.");

  const owner = CONFIG.GITHUB_OWNER;
  const repo = CONFIG.GITHUB_REPO;
  const branch = getTargetBranch();
  const apiUrls = [
    `https://api.github.com/repos/${owner}/${repo}/contents/${prefix}?ref=${encodeURIComponent(branch)}`,
    `https://api.github.com/repos/${owner}/${repo}/contents/${prefix}`
  ];
  const fileNameSet = new Set();
  const knownFilenames = new Set();

  entriesEl.querySelectorAll('.entry input[data-filename-only="true"]').forEach((input) => {
    const filename = getFilenameOnly(input.value);
    if (filename) knownFilenames.add(filename);
  });
  [...selectedManagedFiles.keys()]
    .filter((filePath) => filePath.startsWith(`${prefix}/`))
    .forEach((filePath) => knownFilenames.add(filePath.split("/").pop()));

  let lastError = null;
  for (const apiUrl of apiUrls) {
    try {
      const response = await fetch(apiUrl, { headers: { Accept: "application/vnd.github+json" } });
      if (!response.ok) {
        lastError = new Error(`Ordner konnte nicht geladen werden (HTTP ${response.status}).`);
        continue;
      }
      const payload = await response.json();
      if (Array.isArray(payload)) {
        payload
          .filter((item) => item?.type === "file" && typeof item?.name === "string")
          .map((item) => item.name)
          .forEach((name) => fileNameSet.add(name));
      }
      break;
    } catch (error) {
      lastError = error;
    }
  }

  knownFilenames.forEach((name) => fileNameSet.add(name));
  const files = [...fileNameSet].sort((a, b) => a.localeCompare(b, "de"));
  if (files.length > 0) return files;
  throw lastError || new Error("Keine internen Dateien gefunden.");
}

function openInternalGalleryImageDialog(filenames, options = {}) {
  if (!Array.isArray(filenames) || filenames.length === 0) return Promise.resolve(null);
  const relativePrefix = typeof options.relativePrefix === "string" && options.relativePrefix
    ? options.relativePrefix
    : `./src/img/gallerys/${getActiveGalleryName()}/`;
  const repoPrefix = typeof options.repoPrefix === "string" && options.repoPrefix
    ? options.repoPrefix
    : relativePrefix.replace(/^\.\//, "");
  const selectedFileMap = options.selectedFileMap instanceof Map ? options.selectedFileMap : selectedGalleryFiles;
  const previewLabel = options.previewLabel || "Vorschau";

  if (!galleryInternalPickerDialog || !galleryInternalPickerForm || !galleryInternalImageSelect || typeof galleryInternalPickerDialog.showModal !== "function") {
    const chosen = window.prompt(`Internes Bild wählen:\n${filenames.join("\n")}`, filenames[0]);
    return Promise.resolve(chosen && filenames.includes(chosen) ? chosen : null);
  }

  galleryInternalImageSelect.innerHTML = "";
  filenames.forEach((filename) => {
    const option = document.createElement("option");
    option.value = filename;
    option.textContent = filename;
    galleryInternalImageSelect.append(option);
  });
  galleryInternalImageSelect.value = filenames[0];

  const setInternalPreview = () => {
    if (!galleryInternalImagePreview) return;
    const selectedFile = galleryInternalImageSelect.value;
    if (!selectedFile) {
      galleryInternalImagePreview.classList.add("hidden");
      galleryInternalImagePreview.removeAttribute("src");
      delete galleryInternalImagePreview.dataset.fallbackSrc;
      return;
    }

    const normalizedRepoPrefix = repoPrefix.replace(/\/?$/, "/");
    const repoPath = `${normalizedRepoPrefix}${selectedFile}`;
    const selectedGalleryFile = selectedFileMap.get(repoPath);
    if (selectedGalleryFile?.objectUrl) {
      galleryInternalImagePreview.src = selectedGalleryFile.objectUrl;
      galleryInternalImagePreview.alt = `${previewLabel} ${selectedFile}`;
      galleryInternalImagePreview.classList.remove("hidden");
      delete galleryInternalImagePreview.dataset.fallbackSrc;
      return;
    }

    const normalizedRelativePrefix = relativePrefix.replace(/\/?$/, "/");
    const relativeSrc = `${normalizedRelativePrefix}${selectedFile}`;
    const absoluteSrc = `${CONFIG.DEFAULT_ASSET_BASE_URL.replace(/\/$/, "")}/${relativeSrc.replace(/^\.\//, "")}`;
    galleryInternalImagePreview.dataset.fallbackSrc = relativeSrc;
    galleryInternalImagePreview.src = absoluteSrc;
    galleryInternalImagePreview.alt = `${previewLabel} ${selectedFile}`;
    galleryInternalImagePreview.classList.remove("hidden");
  };

  if (galleryInternalImagePreview) {
    galleryInternalImagePreview.onerror = () => {
      const fallbackSrc = galleryInternalImagePreview.dataset.fallbackSrc;
      if (fallbackSrc && galleryInternalImagePreview.src !== fallbackSrc) {
        galleryInternalImagePreview.src = fallbackSrc;
        delete galleryInternalImagePreview.dataset.fallbackSrc;
        return;
      }
      galleryInternalImagePreview.classList.add("hidden");
      galleryInternalImagePreview.removeAttribute("src");
      delete galleryInternalImagePreview.dataset.fallbackSrc;
    };
  }
  setInternalPreview();

  return new Promise((resolve) => {
    const closeDialog = (result = null) => {
      confirmGalleryInternalImageBtn?.removeEventListener("click", handleConfirm);
      cancelGalleryInternalImageBtn?.removeEventListener("click", handleCancel);
      galleryInternalImageSelect?.removeEventListener("change", handleChange);
      galleryInternalPickerDialog.removeEventListener("cancel", handleCancel);
      if (galleryInternalPickerDialog.open) galleryInternalPickerDialog.close();
      resolve(result);
    };
    const handleConfirm = () => closeDialog(galleryInternalImageSelect.value || null);
    const handleCancel = () => closeDialog(null);
    const handleChange = () => setInternalPreview();

    confirmGalleryInternalImageBtn?.addEventListener("click", handleConfirm);
    cancelGalleryInternalImageBtn?.addEventListener("click", handleCancel);
    galleryInternalImageSelect?.addEventListener("change", handleChange);
    galleryInternalPickerDialog.addEventListener("cancel", handleCancel);
    galleryInternalPickerDialog.showModal();
    galleryInternalImageSelect.focus();
  });
}

async function startGalleryImageReplacement(entryEl) {
  const srcInput = entryEl?.querySelector('[data-field="image"]');
  if (!srcInput) return;

  const previousSrcPath = getGalleryEntrySrcPath(entryEl);
  let selectedPolicy = null;
  if (previousSrcPath) {
    selectedPolicy = await openGalleryReplacePolicyDialog();
    if (!selectedPolicy) return;
  }

  const source = await openGallerySourceDialog();
  if (!source) return;

  const applyOldFilePolicy = () => {
    if (!previousSrcPath || !selectedPolicy) return;
    if (selectedPolicy === "delete") {
      pendingGalleryRepoDeletes.add(previousSrcPath);
      detachedGalleryUploads.delete(previousSrcPath);
    } else {
      pendingGalleryRepoDeletes.delete(previousSrcPath);
      if (selectedGalleryFiles.has(previousSrcPath)) detachedGalleryUploads.add(previousSrcPath);
    }
  };

  if (source === "new") {
    const file = await pickSingleLocalImage();
    if (!file) return;
    applyOldFilePolicy();
    rememberGalleryFiles([file]);
    const repoPath = `src/img/gallerys/${getActiveGalleryName()}/${getFilenameOnly(file.name)}`;
    pendingGalleryRepoDeletes.delete(repoPath);
    detachedGalleryUploads.delete(repoPath);
    setGallerySrcInputMode(srcInput, "repo", file.name);
  }

  if (source === "internal") {
    try {
      const internalImages = await fetchInternalGalleryImages();
      if (internalImages.length === 0) {
        window.alert("Im gewählten Galerieordner wurden keine Bilder gefunden.");
        return;
      }
      const selectedFile = await openInternalGalleryImageDialog(internalImages);
      if (!selectedFile) return;
      applyOldFilePolicy();
      const repoPath = `src/img/gallerys/${getActiveGalleryName()}/${getFilenameOnly(selectedFile)}`;
      pendingGalleryRepoDeletes.delete(repoPath);
      detachedGalleryUploads.delete(repoPath);
      setGallerySrcInputMode(srcInput, "repo", selectedFile);
    } catch (error) {
      window.alert(`Interne Bilder konnten nicht geladen werden: ${error.message}`);
      return;
    }
  }

  if (source === "external") {
    const link = window.prompt("Bitte externen Bildlink eingeben (https://...):", srcInput.value.trim());
    if (!link) return;
    if (!isExternalImagePath(link)) {
      window.alert("Bitte eine vollständige http(s)-URL angeben.");
      return;
    }
    applyOldFilePolicy();
    setGallerySrcInputMode(srcInput, "external", link.trim());
  }

  const index = [...entriesEl.querySelectorAll(".entry")].indexOf(entryEl);
  refreshEntrySummary(entryEl, index);
  resetValidationUi();
}

function createListBlock(field, value = []) {
  const block = document.createElement("div");
  block.className = "list-block";

  const header = document.createElement("div");
  header.className = "list-block-header";

  const title = document.createElement("p");
  title.className = "list-block-title";
  title.innerHTML = `<strong>${field.name}${field.required ? " *" : ""}</strong>`;
  header.append(title);

  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.className = "list-toggle-btn";
  toggleBtn.textContent = "Aufklappen";
  header.append(toggleBtn);
  block.append(header);

  const content = document.createElement("div");
  content.className = "list-block-content";
  block.append(content);

  function setCollapsed(collapsed) {
    block.classList.toggle("is-collapsed", collapsed);
    content.hidden = collapsed;
    toggleBtn.textContent = collapsed ? "Aufklappen" : "Zuklappen";
    toggleBtn.setAttribute("aria-expanded", String(!collapsed));
  }

  toggleBtn.addEventListener("click", () => {
    const willCollapse = !block.classList.contains("is-collapsed");
    setCollapsed(willCollapse);
  });

  const listContainer = document.createElement("div");
  content.append(listContainer);

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.textContent = `${field.name}-Eintrag hinzufügen`;
  const maxItems = Number.isFinite(field.maxItems) ? Math.max(0, Number(field.maxItems)) : Infinity;

  const updateAddButtonState = () => {
    const currentCount = listContainer.querySelectorAll(".list-item").length;
    addBtn.hidden = currentCount >= maxItems;
  };

  addBtn.addEventListener("click", () => {
    const currentCount = listContainer.querySelectorAll(".list-item").length;
    if (currentCount >= maxItems) return;
    setCollapsed(false);
    addListItem(field, listContainer, {}, updateAddButtonState);
    resetValidationUi();
  });
  content.append(addBtn);

  const listValues = Array.isArray(value) ? value : [];
  listValues.forEach((item) => addListItem(field, listContainer, item, updateAddButtonState));
  if (listValues.length === 0 && field.required) addListItem(field, listContainer, {}, updateAddButtonState);
  updateAddButtonState();

  block.dataset.field = field.name;
  block.dataset.fieldType = field.type;
  block.dataset.required = String(!!field.required);
  setCollapsed(true);
  return block;
}

function readEntry(entryEl) {
  const data = {};

  entryEl.querySelectorAll("input[data-field], textarea[data-field], select[data-field]").forEach((input) => {
    if (input.dataset.subField) return;

    const name = input.dataset.field;
    const type = input.dataset.fieldType;

    if (type === "image") {
      const value = input.value.trim();
      if (!value) return;
      const src = input.dataset.filenameOnly === "true"
        ? `${input.dataset.pathPrefix || ""}${getFilenameOnly(value)}`
        : value;
      const wrapper = input.closest(".form-field");
      const ki = Boolean(wrapper?.querySelector('[data-image-meta="ki"]')?.checked);
      const teilweiseKi = Boolean(wrapper?.querySelector('[data-image-meta="teilweiseKi"]')?.checked);
      const theme = wrapper?.querySelector('[data-image-meta="theme"]')?.value || "";
      data[name] = { src, ki, teilweiseKi, ...(theme ? { theme } : {}) };
      return;
    }

    if (type === "checkbox") {
      if (input.checked) data[name] = true;
      return;
    }

    if (type === "textarea") {
      const rawValue = input.value;
      if (!rawValue.trim()) return;
      data[name] = rawValue;
      return;
    }

    const value = input.value.trim();
    if (!value) return;

    if (type === "date") {
      data[name] = fromDateInputValue(value);
      return;
    }

    if (type === "datetime") {
      data[name] = fromDateTimeInputValue(value);
      return;
    }

    if (type === "time") {
      data[name] = fromTimeInputValue(value);
      return;
    }

    if (type === "currency") {
      const normalizedCurrency = toCurrencyInputValue(value);
      if (!normalizedCurrency) return;
      data[name] = `${normalizedCurrency} €`;
      return;
    }

    if (type === "csv") {
      data[name] = value.split(",").map((part) => part.trim()).filter(Boolean);
      return;
    }

    if (typeSelect.value === "gallery" && name === "image" && input.dataset.gallerySource === "external") {
      data[name] = value;
      return;
    }

    if (isManagedFileType() && input.dataset.managedSource === "external") {
      data[name] = value;
      return;
    }

    if (input.dataset.filenameOnly === "true") {
      const filename = getFilenameOnly(value);
      if (!filename) return;
      const prefix = input.dataset.pathPrefix || "";
      data[name] = `${prefix}${filename}`;
      return;
    }

    data[name] = value;
  });

  entryEl.querySelectorAll(".list-block[data-field]").forEach((block) => {
    const fieldName = block.dataset.field;
    const blockType = block.dataset.fieldType;
    const items = [];

    block.querySelectorAll(".list-item").forEach((item) => {
      const row = {};
      item.querySelectorAll("[data-sub-field]").forEach((subInput) => {
        const val = subInput.value.trim();
        if (!val) return;
        row[subInput.dataset.subField] = subInput.dataset.fieldType === "csv"
          ? val.split(",").map((part) => part.trim()).filter(Boolean)
          : val;
      });
      if (Object.keys(row).length > 0) items.push(row);
    });

    if (items.length > 0) data[fieldName] = items;
    else if (blockType === "pairList" && block.dataset.required === "true") data[fieldName] = [];

    if (fieldName === "links" && Array.isArray(data[fieldName])) {
      data[fieldName] = data[fieldName].map((item) => {
        const linkLabel = item.label || "";
        const matchingOption = linkLabelOptions.find((option) => option.value === linkLabel);
        if (!matchingOption || !matchingOption.type) return item;
        return { ...item, type: matchingOption.type };
      });
    }
  });

  if (typeSelect.value === "news") {
    data.large = Boolean(data.image);
  }

  return data;
}

function parseDateWindow(value) {
  if (!windowRegex.test(value)) return null;
  const [year, month, day, hm] = value.split("-");
  const [hour, minute] = hm.split(":");
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute)));
}

function calculateNewsDeleteAt(entry) {
  if (!entry || typeof entry !== "object") return null;

  const publishDate = entry.publishAt ? parseDateWindow(entry.publishAt) : null;
  const fallbackDate = entry.date ? parseDate(entry.date) : null;
  const baseDate = publishDate || fallbackDate;
  if (!baseDate) return null;

  const targetDate = new Date(baseDate.getTime());
  targetDate.setUTCDate(targetDate.getUTCDate() + 365);
  targetDate.setUTCHours(23, 59, 0, 0);
  return formatDateWindow(targetDate);
}

function calculateEventDeleteAt(entry) {
  if (!entry || typeof entry !== "object") return null;
  const eventDate = entry.date ? parseDate(entry.date) : null;
  if (!eventDate) return null;
  const targetDate = new Date(eventDate.getTime());
  targetDate.setUTCHours(23, 59, 0, 0);
  return formatDateWindow(targetDate);
}

function updateNewsDeleteAt(entryEl) {
  if (typeSelect.value !== "news") return;
  const deleteInput = entryEl.querySelector('[data-field="deleteAt"]');
  if (!deleteInput || deleteInput.dataset.allowAuto !== "true") return;

  const isAuto = deleteInput.dataset.autoManaged === "true";
  const isEmpty = !deleteInput.value.trim();
  if (!isAuto && !isEmpty) return;

  const draft = readEntry(entryEl);
  const autoValue = calculateNewsDeleteAt(draft);
  if (!autoValue) return;

  deleteInput.value = toDateTimeInputValue(autoValue);
  deleteInput.dataset.autoManaged = "true";
}

function updateHeaderNoticesDeleteAt(entryEl) {
  if (typeSelect.value !== "header-notices") return;
  const countdownInput = entryEl.querySelector('[data-field="countdown"]');
  const deleteInput = entryEl.querySelector('[data-field="deleteAt"]');
  if (!countdownInput || !deleteInput) return;

  const hasCountdown = !!countdownInput.value.trim();
  if (hasCountdown) {
    deleteInput.value = countdownInput.value;
    deleteInput.disabled = true;
    return;
  }

  deleteInput.disabled = false;
}

function updateEventDeleteAt(entryData) {
  if (typeSelect.value !== "events") return entryData;
  const calculatedDeleteAt = calculateEventDeleteAt(entryData);
  if (!calculatedDeleteAt) return entryData;
  return { ...entryData, deleteAt: calculatedDeleteAt };
}

function syncEntryExpiredState(entryEl) {
  if (!entryEl) return;
  const entryData = updateEventDeleteAt(readEntry(entryEl));
  const deleteDate = entryData.deleteAt ? parseDateWindow(entryData.deleteAt) : null;
  const isExpired = deleteDate instanceof Date && !Number.isNaN(deleteDate.getTime()) && deleteDate.getTime() < Date.now();
  entryEl.classList.toggle("is-expired-news", isExpired);
}

function markFieldError(element) {
  const wrapper = element.closest(".form-field") || element;
  wrapper.classList.add("has-error");
}

function validate(entries, typeKey) {
  const errors = [];
  const spec = specs[typeKey];

  if (!Array.isArray(entries)) {
    errors.push({ text: "Top-Level ist kein Array." });
    return errors;
  }

  entries.forEach((entry, idx) => {
    const entryEl = entriesEl.querySelectorAll(".entry")[idx];

    spec.fields.forEach((field) => {
      if (field.type === "list" || field.type === "pairList") {
        const block = entryEl.querySelector(`.list-block[data-field="${field.name}"]`);
        const items = Array.isArray(entry[field.name]) ? entry[field.name] : [];

        if (field.required && items.length === 0) {
          errors.push({ text: `Eintrag ${idx + 1}: Pflichtfeld '${field.name}' fehlt.`, element: block });
        }

        const itemDefs = field.type === "pairList"
          ? [
              { name: "prince", required: true },
              { name: "princess", required: true }
            ]
          : field.itemFields || [];

        block.querySelectorAll(".list-item").forEach((itemEl, itemIdx) => {
          itemDefs.forEach((subField) => {
            if (!subField.required) return;
            const subInput = itemEl.querySelector(`[data-sub-field="${subField.name}"]`);
            if (subInput && !subInput.value.trim()) {
              errors.push({ text: `Eintrag ${idx + 1}, ${field.name} ${itemIdx + 1}: '${subField.name}' fehlt.`, element: subInput });
            }
          });
        });

        return;
      }

      if (!field.required) return;
      if (field.type === "autoDeleteAt") return;

      const input = entryEl.querySelector(`[data-field="${field.name}"]`);
      if (!input) return;
      const hasValue = field.type === "checkbox" ? input.checked : !!input.value.trim();
      if (!hasValue) {
        errors.push({ text: `Eintrag ${idx + 1}: Pflichtfeld '${field.name}' ist leer.`, element: input });
      }
    });

    if (entry.date && !dateRegex.test(entry.date)) {
      const input = entryEl.querySelector('[data-field="date"]');
      errors.push({ text: `Eintrag ${idx + 1}: date hat nicht das Format TT.MM.JJJJ.`, element: input });
    }

    if (entry.publishAt && !windowRegex.test(entry.publishAt)) {
      const input = entryEl.querySelector('[data-field="publishAt"]');
      errors.push({ text: `Eintrag ${idx + 1}: publishAt hat nicht das Format JJJJ-MM-TT-HH:mm.`, element: input });
    }

    if (entry.deleteAt && !windowRegex.test(entry.deleteAt)) {
      const input = entryEl.querySelector('[data-field="deleteAt"]');
      errors.push({ text: `Eintrag ${idx + 1}: deleteAt hat nicht das Format JJJJ-MM-TT-HH:mm.`, element: input });
    }

    if (typeKey === "events" && entry.preis) {
      const preisInput = entryEl.querySelector('[data-field="preis"]');
      if (!/^\d+(?:[.,]\d{2})\s€$/.test(entry.preis)) {
        errors.push({ text: `Eintrag ${idx + 1}: preis muss genau zwei Nachkommastellen haben (z. B. 12,00 €).`, element: preisInput });
      }
    }

    if (entry.image && typeof entry.image === "object") {
      const imageInput = entryEl.querySelector('[data-field="image"]');
      if (typeof entry.image.src !== "string" || !entry.image.src.trim()) {
        errors.push({ text: `Eintrag ${idx + 1}: image.src ist erforderlich.`, element: imageInput });
      }
      if (typeof entry.image.ki !== "boolean" || typeof entry.image.teilweiseKi !== "boolean") {
        errors.push({ text: `Eintrag ${idx + 1}: image.ki und image.teilweiseKi müssen Boolean-Werte sein.`, element: imageInput });
      }
      if (entry.image.ki && entry.image.teilweiseKi) {
        errors.push({ text: `Eintrag ${idx + 1}: ki und teilweiseKi dürfen nicht gleichzeitig true sein.`, element: imageInput });
      }
      if ((entry.image.ki || entry.image.teilweiseKi) && !["black", "white"].includes(entry.image.theme)) {
        errors.push({ text: `Eintrag ${idx + 1}: Gekennzeichnete Bilder benötigen theme "black" oder "white".`, element: imageInput });
      }
      if (entry.image.theme && !["black", "white"].includes(entry.image.theme)) {
        errors.push({ text: `Eintrag ${idx + 1}: image.theme darf nur "black" oder "white" sein.`, element: imageInput });
      }
    }

    if (entry.publishAt && entry.deleteAt && windowRegex.test(entry.publishAt) && windowRegex.test(entry.deleteAt)) {
      if (parseDateWindow(entry.publishAt) >= parseDateWindow(entry.deleteAt)) {
        const publishInput = entryEl.querySelector('[data-field="publishAt"]');
        const deleteInput = entryEl.querySelector('[data-field="deleteAt"]');
        errors.push({ text: `Eintrag ${idx + 1}: publishAt muss vor deleteAt liegen.`, element: publishInput });
        errors.push({ text: `Eintrag ${idx + 1}: deleteAt muss nach publishAt liegen.`, element: deleteInput });
      }
    }
  });

  return errors;
}

function renderValidation(errors) {
  validationList.innerHTML = "";

  if (errors.length === 0) {
    const li = document.createElement("li");
    li.className = "ok";
    li.textContent = "✔ Keine Fehler gefunden. JSON wurde erstellt.";
    validationList.append(li);
    return;
  }

  errors.forEach((error) => {
    const li = document.createElement("li");
    li.className = "err";
    li.textContent = `✖ ${error.text}`;
    validationList.append(li);

    if (error.element) {
      if (error.element.classList.contains("list-block")) error.element.classList.add("has-error");
      else markFieldError(error.element);
    }
  });
}

function collapseAllEntries() {
  entriesEl.querySelectorAll(".entry").forEach((entry) => {
    entry.classList.add("is-collapsed");
    const editBtn = entry.querySelector(".edit-btn");
    const doneBtn = entry.querySelector(".done-btn");
    if (editBtn) editBtn.classList.remove("hidden");
    if (doneBtn) doneBtn.classList.add("hidden");
  });
}

function expandEntry(entryEl) {
  collapseAllEntries();
  entryEl.classList.remove("is-collapsed");
  entryEl.querySelector(".edit-btn")?.classList.add("hidden");
  entryEl.querySelector(".done-btn")?.classList.remove("hidden");
}

function getEntrySummary(data, typeKey, index) {
  const summaryKeys = specs[typeKey].summaryKeys || [];
  const parts = summaryKeys.map((key) => key === "image" ? getImageSrc(data[key]) : data[key]).filter(Boolean);
  if (parts.length === 0) return `Eintrag ${index + 1}`;
  return `Eintrag ${index + 1}: ${parts.join(" | ")}`;
}

function refreshEntrySummary(entryEl, index) {
  const data = readEntry(entryEl);
  const summaryEl = entryEl.querySelector(".entry-summary");
  summaryEl.textContent = getEntrySummary(data, typeSelect.value, index);
}

function renumberAndRefreshSummaries() {
  [...entriesEl.querySelectorAll(".entry")].forEach((entry, index) => {
    refreshEntrySummary(entry, index);
  });
}

function moveEntry(entryEl, direction) {
  if (direction < 0) {
    const previous = entryEl.previousElementSibling;
    if (previous) entriesEl.insertBefore(entryEl, previous);
  } else {
    const next = entryEl.nextElementSibling;
    if (next) entriesEl.insertBefore(next, entryEl);
  }

  renumberAndRefreshSummaries();
  resetValidationUi();
}

function addEntry(defaults = {}, { expand = true, insert = "auto", scrollToEntry = true } = {}) {
  const typeKey = typeSelect.value;
  const spec = specs[typeKey];
  const shouldPrepend = insert === "start" || (insert === "auto" && (typeKey === "news" || typeKey === "royals"));

  const entry = document.createElement("article");
  entry.className = "entry";
  entry.draggable = true;

  const header = document.createElement("div");
  header.className = "entry-header";

  const dragHandle = document.createElement("button");
  dragHandle.type = "button";
  dragHandle.className = "drag-handle";
  dragHandle.textContent = "☰";
  dragHandle.title = "Eintrag per Drag & Drop verschieben";
  dragHandle.setAttribute("aria-label", "Eintrag per Drag & Drop verschieben");

  const summary = document.createElement("p");
  summary.className = "entry-summary";
  summary.textContent = "Neuer Eintrag";

  const actions = document.createElement("div");
  actions.className = "entry-actions";

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.textContent = "Bearbeiten";
  editBtn.className = "edit-btn hidden";
  editBtn.addEventListener("click", () => expandEntry(entry));

  const doneBtn = document.createElement("button");
  doneBtn.type = "button";
  doneBtn.textContent = "Fertig";
  doneBtn.className = "done-btn";
  doneBtn.addEventListener("click", () => {
    collapseAllEntries();
    renumberAndRefreshSummaries();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.textContent = "Eintrag löschen";
  deleteBtn.addEventListener("click", async () => {
    if (typeSelect.value !== "gallery" && !isManagedFileType() && !isEntryImageType()) {
      removeEntryElement(entry);
      return;
    }

    const srcPath = getGalleryEntrySrcPath(entry);
    const managedPath = getManagedRepoPathFromEntry(entry);
    const entryImagePath = getEntryImageRepoPathFromEntry(entry);
    const needsDecision = Boolean(srcPath || managedPath || entryImagePath);
    if (!needsDecision) {
      removeEntryElement(entry);
      return;
    }

    const decision = await openEntryDeleteDialog();
    if (!decision) return;

    if (decision === "delete-repo" && srcPath) {
      pendingGalleryRepoDeletes.add(srcPath);
      detachedGalleryUploads.delete(srcPath);
    }
    if (decision === "delete-repo" && managedPath) {
      pendingManagedRepoDeletes.add(managedPath);
      detachedManagedUploads.delete(managedPath);
    }

    if (decision === "entry-only" && srcPath) {
      pendingGalleryRepoDeletes.delete(srcPath);
      if (selectedGalleryFiles.has(srcPath)) detachedGalleryUploads.add(srcPath);
    }
    if (decision === "entry-only" && managedPath) {
      pendingManagedRepoDeletes.delete(managedPath);
      if (selectedManagedFiles.has(managedPath)) detachedManagedUploads.add(managedPath);
    }
    if (decision === "delete-repo" && entryImagePath) {
      pendingEntryImageRepoDeletes.add(entryImagePath);
      detachedEntryImageUploads.delete(entryImagePath);
    }
    if (decision === "entry-only" && entryImagePath) {
      pendingEntryImageRepoDeletes.delete(entryImagePath);
      if (selectedEntryImageFiles.has(entryImagePath)) detachedEntryImageUploads.add(entryImagePath);
    }

    removeEntryElement(entry);
  });

  actions.append(editBtn, doneBtn, deleteBtn);
  header.append(dragHandle, summary, actions);

  const body = document.createElement("div");
  body.className = "entry-body";

  spec.fields.forEach((field) => {
    const effectiveField = typeKey === "gallery" && field.name === "image"
      ? { ...field, pathPrefix: getGalleryImagePrefix() }
      : field;

    if (field.type === "autoDeleteAt") return;
    if (field.type === "list" || field.type === "pairList") {
      body.append(createListBlock(effectiveField, defaults[field.name]));
    } else {
      const defaultValue = typeKey === "gallery" && field.name === "image" && defaults.image == null
        ? defaults.src
        : defaults[field.name];
      const { wrapper, input } = createInput(effectiveField, defaultValue);
      if (typeKey === "gallery" && field.name === "image") {
        const srcValue = getImageSrc(defaultValue);
        const sourceMode = isExternalImagePath(srcValue) ? "external" : "repo";
        input.readOnly = true;
        setGallerySrcInputMode(input, sourceMode, srcValue);

        const changeBtn = document.createElement("button");
        changeBtn.type = "button";
        changeBtn.textContent = "🔁";
        changeBtn.className = "input-suffix-action";
        changeBtn.title = "Bildquelle wechseln";
        changeBtn.setAttribute("aria-label", "Bildquelle wechseln");
        changeBtn.addEventListener("click", () => startGalleryImageReplacement(entry));
        const prefixWrap = input.closest(".input-with-prefix");
        if (prefixWrap) {
          prefixWrap.classList.add("has-suffix-action");
          prefixWrap.append(changeBtn);
        }
        else wrapper.append(changeBtn);
      }
      if (isManagedFileType(typeKey) && field.filenameOnly) {
        const managedValue = getImageSrc(defaults[field.name]);
        const managedMode = isExternalImagePath(managedValue) ? "external" : "repo";
        input.readOnly = true;
        setManagedFileInputMode(input, managedMode, managedValue);
        const changeBtn = document.createElement("button");
        changeBtn.type = "button";
        changeBtn.textContent = "🔁";
        changeBtn.className = "input-suffix-action";
        changeBtn.title = "Datei wechseln";
        changeBtn.setAttribute("aria-label", "Datei wechseln");
        changeBtn.addEventListener("click", () => startManagedFileReplacement(entry));
        const prefixWrap = input.closest(".input-with-prefix");
        if (prefixWrap) {
          prefixWrap.classList.add("has-suffix-action");
          prefixWrap.append(changeBtn);
        } else {
          wrapper.append(changeBtn);
        }
      }
      if (isEntryImageType(typeKey) && field.name === "image" && field.filenameOnly) {
        const imageValue = typeof defaults[field.name]?.src === "string" ? defaults[field.name].src : (typeof defaults[field.name] === "string" ? defaults[field.name] : "");
        const imageMode = isExternalImagePath(imageValue) ? "external" : "repo";
        input.readOnly = true;
        setEntryImageInputMode(input, imageMode, imageValue);

        const actionBtn = document.createElement("button");
        actionBtn.type = "button";
        actionBtn.className = "input-suffix-action entry-image-action-btn";
        actionBtn.addEventListener("click", () => handleEntryImageAction(entry));

        const prefixWrap = input.closest(".input-with-prefix");
        if (prefixWrap) {
          prefixWrap.classList.add("has-suffix-action");
          prefixWrap.append(actionBtn);
        } else {
          wrapper.append(actionBtn);
        }
      }
      body.append(wrapper);
    }
  });

  entry.append(header, body);
  if (shouldPrepend) entriesEl.prepend(entry);
  else entriesEl.append(entry);

  if (expand) expandEntry(entry);
  else collapseAllEntries();

  renumberAndRefreshSummaries();
  refreshEntryImageActionButton(entry);
  syncEntryExpiredState(entry);
  updateHeaderNoticesDeleteAt(entry);

  if (scrollToEntry) {
    entry.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function validateAndGenerate() {
  resetValidationUi();
  pruneUnusedSelectedGalleryFiles();
  pruneUnusedSelectedManagedFiles();
  pruneUnusedSelectedEntryImageFiles();
  prunePendingGalleryDeletes();
  prunePendingManagedDeletes();
  prunePendingEntryImageDeletes();

  const entries = [...entriesEl.querySelectorAll(".entry")].map((entryEl) => {
    updateNewsDeleteAt(entryEl);
    syncEntryExpiredState(entryEl);
    return updateEventDeleteAt(readEntry(entryEl));
  });
  const activeGalleryPaths = new Set(
    entries
      .map((entry) => (entry?.image?.src && typeof entry.image.src === "string" ? entry.image.src.replace(/^\.\//, "") : ""))
      .filter(Boolean)
  );
  [...detachedGalleryUploads].forEach((filePath) => {
    if (activeGalleryPaths.has(filePath)) detachedGalleryUploads.delete(filePath);
  });
  const errors = validate(entries, typeSelect.value);
  renderValidation(errors);

  if (errors.length === 0) {
    outputEl.textContent = JSON.stringify(entries, null, 2);
    resultActions.classList.remove("hidden");
  }

  validationPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderEntries(typeKey, dataList = null, { useTemplate = false } = {}) {
  entriesEl.innerHTML = "";
  resetValidationUi();
  if (typeKey !== "gallery") {
    pendingGalleryRepoDeletes.clear();
    detachedGalleryUploads.clear();
  }
  clearManagedTrackingState();

  const defaults = Array.isArray(dataList) && dataList.length > 0
    ? dataList
    : useTemplate
      ? [specs[typeKey].template]
      : [];

  if (defaults.length === 0) return;

  defaults.forEach((item, index) => addEntry(item, {
    expand: index === 0,
    insert: "end",
    scrollToEntry: false
  }));
  if (defaults.length > 1) collapseAllEntries();
  renumberAndRefreshSummaries();
}

function getFetchUrl() {
  const branch = encodeURIComponent(getSourceBranch());
  const base = `https://raw.githubusercontent.com/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/${branch}`;

  if (typeSelect.value === "gallery") {
    const galleryName = getActiveGalleryName();
    return `${base}/src/data/gallerys/${galleryName}.json`;
  }

  if (typeSelect.value === "special-faq") {
    return `${base}/src/data/faqs/${getActiveGalleryName()}.json`;
  }

  return `${base}/src/data/${specs[typeSelect.value].filename}`;
}

function replaceAllLiteral(value, search, replacement) {
  return value.split(search).join(replacement);
}

function escapeHtmlAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function buildSpecialFaqHtml(template, values) {
  let html = template;
  const replacements = [
    ["Kurze Überschrift", escapeHtml(values.eyebrow)],
    ["FAQ-Titel", escapeHtml(values.title)],
    ["Einleitung für das Spezial-FAQ.", escapeHtml(values.intro)],
    ["Abschluss Überschrift", escapeHtml(values.closingTitle)],
    ["Abschluss Text", escapeHtml(values.closingText)],
    ["../../src/data/faqs/NAME.json", escapeHtmlAttribute(values.jsonPath)]
  ];
  replacements.forEach(([placeholder, replacement]) => {
    html = replaceAllLiteral(html, placeholder, replacement);
  });
  return html;
}

function openSpecialFaqCreateDialog(faqName) {
  const defaultJsonPath = `../../src/data/faqs/${faqName}.json`;
  if (!specialFaqCreateDialog || !specialFaqCreateForm || typeof specialFaqCreateDialog.showModal !== "function") {
    const title = window.prompt("FAQ-Titel:", faqName);
    if (!title) return Promise.resolve(null);
    return Promise.resolve({
      eyebrow: window.prompt("Kurze Überschrift:", "Häufige Fragen") || "Häufige Fragen",
      title,
      intro: window.prompt("Kurze Einleitung:", "Antworten auf häufig gestellte Fragen.") || "",
      jsonPath: window.prompt("Pfad des JSONs:", defaultJsonPath) || defaultJsonPath,
      closingTitle: window.prompt("Abschluss Überschrift:", "Noch Fragen?") || "",
      closingText: window.prompt("Abschluss Text:", "Kontaktiert uns gerne.") || ""
    });
  }

  specialFaqPagePath.textContent = `faq/${faqName}/index.html`;
  specialFaqEyebrowInput.value = "";
  specialFaqTitleInput.value = "";
  specialFaqIntroInput.value = "";
  specialFaqJsonPathInput.value = defaultJsonPath;
  specialFaqClosingTitleInput.value = "";
  specialFaqClosingTextInput.value = "";

  return new Promise((resolve) => {
    const closeDialog = (result = null) => {
      specialFaqCreateForm.removeEventListener("submit", handleSubmit);
      specialFaqCreateCancelBtn?.removeEventListener("click", handleCancel);
      specialFaqCreateDialog.removeEventListener("cancel", handleCancel);
      if (specialFaqCreateDialog.open) specialFaqCreateDialog.close();
      resolve(result);
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      if (!specialFaqCreateForm.reportValidity()) return;
      closeDialog({
        eyebrow: specialFaqEyebrowInput.value.trim(),
        title: specialFaqTitleInput.value.trim(),
        intro: specialFaqIntroInput.value.trim(),
        jsonPath: specialFaqJsonPathInput.value.trim(),
        closingTitle: specialFaqClosingTitleInput.value.trim(),
        closingText: specialFaqClosingTextInput.value.trim()
      });
    };
    const handleCancel = () => closeDialog(null);
    specialFaqCreateForm.addEventListener("submit", handleSubmit);
    specialFaqCreateCancelBtn?.addEventListener("click", handleCancel);
    specialFaqCreateDialog.addEventListener("cancel", handleCancel);
    specialFaqCreateDialog.showModal();
    specialFaqEyebrowInput.focus();
  });
}

async function createSpecialFaq(faqName) {
  if (!/^[a-zA-Z0-9_-]+$/.test(faqName)) {
    window.alert("Der FAQ-Dateiname darf nur Buchstaben, Zahlen, Bindestriche und Unterstriche enthalten.");
    return false;
  }
  const values = await openSpecialFaqCreateDialog(faqName);
  if (!values) return false;

  const commitInput = await openCommitDialog(`Create special FAQ ${faqName}`);
  if (!commitInput) return false;

  setCommitStatus("FAQ-Vorlage wird geladen...");
  const branch = getTargetBranch();
  const owner = CONFIG.GITHUB_OWNER;
  const repo = CONFIG.GITHUB_REPO;
  try {
    const sourceBranch = encodeURIComponent(getSourceBranch());
    const templateUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${sourceBranch}/src/data/faqs/vorlage_faq.html`;
    const templateResponse = await fetch(templateUrl, { cache: "no-store" });
    if (!templateResponse.ok) throw new Error(`FAQ-Vorlage konnte nicht geladen werden (HTTP ${templateResponse.status}).`);
    const html = buildSpecialFaqHtml(await templateResponse.text(), values);
    const headSha = await ensureBranchExists({ owner, repo, branch, token: commitInput.token, baseBranch: getSourceBranch() });
    const commitSha = await createSingleGitHubCommit({
      owner,
      repo,
      branch,
      token: commitInput.token,
      message: commitInput.commitMessage,
      headSha,
      files: [
        { path: `faq/${faqName}/index.html`, contentBase64: toBase64Utf8(html.endsWith("\n") ? html : `${html}\n`) },
        { path: `src/data/faqs/${faqName}.json`, contentBase64: toBase64Utf8("[]\n") }
      ]
    });
    const commitUrl = `https://github.com/${owner}/${repo}/commit/${commitSha}`;
    renderEntries("special-faq", []);
    setOnlineJsonLoaded(true);
    setCommitStatus(`Spezial-FAQ erfolgreich angelegt: <a href="${commitUrl}" target="_blank" rel="noopener noreferrer">Commit ansehen</a>`, "success");
    return true;
  } catch (error) {
    setCommitStatus(`Spezial-FAQ konnte nicht angelegt werden: ${escapeHtml(error.message)}`, "error");
    return false;
  }
}



function sanitizeGalleryTechnicalName(raw) {
  return String(raw || "").trim().toLowerCase().replace(/[^a-z0-9-_]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function buildGalleryCreateArtifacts(technicalName, readableName) {
  const html = `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>SKV | ${readableName}</title>
    <meta name="description" content="Bildergalerie des Sandersdorfer Karnevalsverein e.V."/>
    <meta name="gallery-source" content="../../src/data/gallerys/${technicalName}.json"/>
    <link rel="stylesheet" href="../../src/css/style.css"/>
    <link rel="stylesheet" href="../../src/css/gallery-detail.css"/>
    <link rel="icon" href="../../src/img/logo.png"/>
</head>
<body data-page="legal">
<div id="header-component"></div>

<main class="section legal-page">
    <section class="container legal-card">
        <h1>${readableName}</h1>
        <div id="gallery-grid" class="grid cards-3 gallery-grid" aria-live="polite"></div>
    </section>
</main>

<div id="footer-component"></div>

<div id="gallery-lightbox" class="gallery-lightbox" aria-hidden="true">
    <button type="button" class="gallery-lightbox-backdrop" id="gallery-lightbox-backdrop" aria-label="Vorschau schließen"></button>
    <div class="gallery-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Bildvorschau">
        <div class="gallery-lightbox-frame">
            <img id="gallery-lightbox-image" class="gallery-lightbox-image" src="" alt=""/>
            <p id="gallery-lightbox-caption" class="gallery-lightbox-caption"></p>
        </div>
        <div class="gallery-lightbox-controls">
            <button type="button" class="gallery-lightbox-nav" id="gallery-lightbox-prev" aria-label="Vorheriges Bild">◀</button>
            <button type="button" class="gallery-lightbox-close" id="gallery-lightbox-close" aria-label="Vorschau schließen">Schließen</button>
            <button type="button" class="gallery-lightbox-nav" id="gallery-lightbox-next" aria-label="Nächstes Bild">▶</button>
        </div>
    </div>
</div>

<script src="../../src/js/gallery-detail.js"></script>
<script src="../../src/js/script.js"></script>
</body>
</html>
`;
  return {
    technicalName,
    readableName,
    files: [
      { path: `galerie/${technicalName}/index.html`, contentBase64: toBase64Utf8(html) },
      { path: `src/data/gallerys/${technicalName}.json`, contentBase64: toBase64Utf8("[]\n") }
    ],
    previewPaths: [
      `galerie/${technicalName}/`,
      `galerie/${technicalName}/index.html`,
      `src/data/gallerys/${technicalName}.json`,
      `src/img/gallerys/${technicalName}/`
    ],
    html,
    json: "[]"
  };
}


async function fetchRepoFilesForPrefix(prefix, branch) {
  const owner = CONFIG.GITHUB_OWNER;
  const repo = CONFIG.GITHUB_REPO;
  const headSha = await getBranchHeadSha({ owner, repo, branch, token: null });
  if (!headSha) return [];
  const commitResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits/${headSha}`, { headers: { Accept: "application/vnd.github+json" } });
  if (!commitResp.ok) return [];
  const commitPayload = await commitResp.json();
  const treeSha = commitPayload?.tree?.sha;
  if (!treeSha) return [];
  const treeResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=1`, { headers: { Accept: "application/vnd.github+json" } });
  if (!treeResp.ok) return [];
  const treePayload = await treeResp.json();
  const all = Array.isArray(treePayload?.tree) ? treePayload.tree : [];
  return all.filter((item) => item?.type === "blob" && typeof item?.path === "string" && item.path.startsWith(prefix)).map((item) => item.path);
}

async function buildGalleryDeleteArtifacts(technicalName) {
  const branch = getTargetBranch();
  const files = new Set([
    `src/data/gallerys/${technicalName}.json`,
    `galerie/${technicalName}/index.html`
  ]);
  const galerieFiles = await fetchRepoFilesForPrefix(`galerie/${technicalName}/`, branch);
  const imageFiles = await fetchRepoFilesForPrefix(`src/img/gallerys/${technicalName}/`, branch);
  galerieFiles.forEach((f) => files.add(f));
  imageFiles.forEach((f) => files.add(f));
  const sorted = [...files].sort((a,b)=>a.localeCompare(b,"de"));
  return {
    technicalName,
    previewPaths: [`galerie/${technicalName}/`, ...sorted, `src/img/gallerys/${technicalName}/**`],
    files: sorted.map((path) => ({ path, delete: true }))
  };
}

function openGalleryScaffoldDeleteDialog() {
  if (!galleryDeleteScaffoldDialog || typeof galleryDeleteScaffoldDialog.showModal !== "function") return;
  galleryDeleteTechName.value = "";
  galleryDeletePreviewPaths.textContent = "";
  galleryDeleteScaffoldDialog.showModal();
}

async function commitGalleryDeleteDirect() {
  const technicalName = sanitizeGalleryTechnicalName(galleryDeleteTechName?.value);
  if (!technicalName) return window.alert("Bitte technischen Namen eingeben.");
  const artifacts = await buildGalleryDeleteArtifacts(technicalName);
  galleryDeletePreviewPaths.textContent = artifacts.previewPaths.join("\n");
  const commitInput = await openCommitDialog(`Delete gallery scaffold for ${technicalName}`);
  if (!commitInput) return;
  const owner = CONFIG.GITHUB_OWNER; const repo = CONFIG.GITHUB_REPO; const branch = getTargetBranch();
  galleryDeleteCommitBtn.disabled = true;
  try {
    const headSha = await ensureBranchExists({ owner, repo, branch, token: commitInput.token, baseBranch: getSourceBranch() });
    const commitSha = await createSingleGitHubCommit({ owner, repo, branch, token: commitInput.token, message: commitInput.commitMessage, files: artifacts.files, headSha });
    setCommitStatus(`Galerie gelöscht: <a href="https://github.com/${owner}/${repo}/compare/${encodeURIComponent(getSourceBranch())}...${encodeURIComponent(branch)}" target="_blank">Changes ansehen</a><br>Bitte kontrollieren sie, dass die eben gelöscht Galerie "${technicalName}" nicht mehr in der gallery-overview angegeben ist.`, "success");
    if (galleryDeleteScaffoldDialog?.open) galleryDeleteScaffoldDialog.close();
  } catch (error) {
    setCommitStatus(`Galerie-Löschung fehlgeschlagen: ${error.message}`, "error");
  } finally { galleryDeleteCommitBtn.disabled = false; }
}
function updateCompareLink() {
  if (!compareLink) return;
  const targetBranch = getTargetBranch();
  compareLink.href = `https://github.com/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/compare/${encodeURIComponent(getSourceBranch())}...${encodeURIComponent(targetBranch)}`;
}

function updateCommitBranchLabel() {
  if (!commitBranchLabel) return;
  commitBranchLabel.textContent = getTargetBranch();
}

async function syncBranches() {
  if (!syncBranchesBtn) return;
  const previousText = syncBranchesBtn.textContent;
  syncBranchesBtn.disabled = true;
  syncBranchesBtn.textContent = "🔄";

  try {
    const response = await fetch(`https://api.github.com/repos/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/branches?per_page=100`, {
      headers: { Accept: "application/vnd.github+json" }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    const branchNames = Array.isArray(payload) ? payload.map((branch) => branch?.name).filter(Boolean) : [];

    if (sourceBranchSelect) {
      const previousSource = sourceBranchSelect.value;
      sourceBranchSelect.innerHTML = "";
      branchNames.forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        sourceBranchSelect.append(option);
      });
      const nextSource = branchNames.includes(previousSource)
        ? previousSource
        : branchNames.includes(CONFIG.DEFAULT_SOURCE_BRANCH)
          ? CONFIG.DEFAULT_SOURCE_BRANCH
          : branchNames[0] || CONFIG.DEFAULT_SOURCE_BRANCH;
      sourceBranchSelect.value = nextSource;
    }

    if (branchesList) {
      branchesList.innerHTML = "";
      branchNames.forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        branchesList.append(option);
      });
    }

    if (targetBranchInput && !targetBranchInput.value.trim()) {
      targetBranchInput.value = CONFIG.DEFAULT_TARGET_BRANCH;
    }
    updateCompareLink();
    updateCommitBranchLabel();
    refreshGalleryDirectorySuggestions();
    syncBranchesBtn.textContent = "✓";
  } catch (error) {
    syncBranchesBtn.textContent = "!";
  } finally {
    setTimeout(() => {
      syncBranchesBtn.textContent = previousText;
      syncBranchesBtn.disabled = false;
    }, 1600);
  }
}

function getDataPath() {
  if (typeSelect.value === "gallery") {
    const galleryName = getActiveGalleryName();
    return `src/data/gallerys/${galleryName}.json`;
  }
  if (typeSelect.value === "special-faq") {
    return `src/data/faqs/${getActiveGalleryName()}.json`;
  }
  return `src/data/${specs[typeSelect.value].filename}`;
}

function getOutputJson() {
  const jsonText = outputEl.textContent.trim();
  if (!jsonText) return null;

  try {
    const parsed = JSON.parse(jsonText);
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function setCommitStatus(text, state = "") {
  if (!commitStatus) return;
  commitStatus.innerHTML = text;
  commitStatus.classList.remove("is-success", "is-error");
  if (state === "success") commitStatus.classList.add("is-success");
  if (state === "error") commitStatus.classList.add("is-error");
}

function toBase64Utf8(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Datei konnte nicht gelesen werden."));
        return;
      }
      const base64 = result.split(",")[1];
      if (!base64) {
        reject(new Error("Datei konnte nicht in Base64 umgewandelt werden."));
        return;
      }
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Fehler beim Lesen der Datei."));
    reader.readAsDataURL(file);
  });
}

async function githubApiRequest(url, { token, method = "GET", body } = {}) {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body ? { "Content-Type": "application/json" } : {})
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API Fehler (${response.status}): ${errorText}`);
  }

  return response.json();
}

async function createGitBlob({ owner, repo, token, contentBase64 }) {
  const url = `https://api.github.com/repos/${owner}/${repo}/git/blobs`;
  const payload = await githubApiRequest(url, {
    token,
    method: "POST",
    body: {
      content: contentBase64,
      encoding: "base64"
    },
  });
  return payload.sha;
}

async function getCommitTreeSha({ owner, repo, token, commitSha }) {
  const payload = await githubApiRequest(`https://api.github.com/repos/${owner}/${repo}/git/commits/${commitSha}`, { token });
  return payload?.tree?.sha || null;
}

async function createGitTree({ owner, repo, token, baseTreeSha, entries }) {
  const payload = await githubApiRequest(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
    token,
    method: "POST",
    body: {
      base_tree: baseTreeSha,
      tree: entries
    }
  });
  return payload.sha;
}

async function createGitCommit({ owner, repo, token, message, treeSha, parentSha }) {
  const payload = await githubApiRequest(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
    token,
    method: "POST",
    body: {
      message,
      tree: treeSha,
      parents: [parentSha]
    }
  });
  return payload.sha;
}

async function updateBranchRef({ owner, repo, token, branch, commitSha }) {
  const updateUrl = `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${encodeURIComponent(branch)}`;
  try {
    await githubApiRequest(updateUrl, {
      token,
      method: "PATCH",
      body: { sha: commitSha, force: false }
    });
  } catch (error) {
    const errorMessage = String(error?.message || "");
    if (!errorMessage.includes("Reference does not exist")) throw error;

    await githubApiRequest(`https://api.github.com/repos/${owner}/${repo}/git/refs`, {
      token,
      method: "POST",
      body: {
        ref: `refs/heads/${branch}`,
        sha: commitSha
      }
    });
  }
}

async function createSingleGitHubCommit({ owner, repo, branch, token, message, files, headSha: knownHeadSha }) {
  const headSha = knownHeadSha || await getBranchHeadSha({ owner, repo, branch, token });
  if (!headSha) throw new Error(`Branch '${branch}' konnte nicht aufgelöst werden.`);

  const baseTreeSha = await getCommitTreeSha({ owner, repo, token, commitSha: headSha });
  if (!baseTreeSha) throw new Error("Basis-Tree konnte nicht geladen werden.");

  const treeEntries = [];
  for (const file of files) {
    if (file.delete === true) {
      treeEntries.push({
        path: file.path,
        mode: "100644",
        type: "blob",
        sha: null
      });
      continue;
    }

    const blobSha = await createGitBlob({ owner, repo, token, contentBase64: file.contentBase64 });
    treeEntries.push({
      path: file.path,
      mode: "100644",
      type: "blob",
      sha: blobSha
    });
  }

  const treeSha = await createGitTree({ owner, repo, token, baseTreeSha, entries: treeEntries });
  const commitSha = await createGitCommit({ owner, repo, token, message, treeSha, parentSha: headSha });
  await updateBranchRef({ owner, repo, token, branch, commitSha });
  return commitSha;
}

async function getRepositoryDefaultBranch({ owner, repo, token }) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Repository konnte nicht geladen werden (${response.status}): ${errorText}`);
  }

  const payload = await response.json();
  return payload.default_branch || "main";
}

async function getBranchHeadSha({ owner, repo, branch, token }) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${encodeURIComponent(branch)}`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Branch-Info konnte nicht geladen werden (${response.status}): ${errorText}`);
  }

  const payload = await response.json();
  return payload?.object?.sha || null;
}

async function createBranchFromDefault({ owner, repo, branch, token, baseBranch }) {
  const sourceBranch = (baseBranch || getSourceBranch() || CONFIG.DEFAULT_SOURCE_BRANCH).trim();
  const baseSha = await getBranchHeadSha({ owner, repo, branch: sourceBranch, token });
  if (!baseSha) {
    throw new Error(`Basis-Branch '${sourceBranch}' konnte nicht aufgelöst werden.`);
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ref: `refs/heads/${branch}`,
      sha: baseSha
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 422 && errorText.includes("Reference already exists")) {
      const existingSha = await getBranchHeadSha({ owner, repo, branch, token });
      if (existingSha) return existingSha;
    }
    throw new Error(`Branch konnte nicht erstellt werden (${response.status}): ${errorText}`);
  }

  const payload = await response.json();
  return payload?.object?.sha || baseSha;
}

async function ensureBranchExists({ owner, repo, branch, token, baseBranch }) {
  const existingSha = await getBranchHeadSha({ owner, repo, branch, token });
  if (existingSha) return existingSha;
  return createBranchFromDefault({ owner, repo, branch, token, baseBranch });
}

function openCommitDialog(defaultMessage) {
  if (!commitDialog || !commitForm || !githubTokenInput || !commitMessageInput) return Promise.resolve(null);
  if (typeof commitDialog.showModal !== "function") {
    const token = window.prompt("GitHub Personal Access Token eingeben:");
    if (!token) return Promise.resolve(null);
    const commitMessage = window.prompt("Commit-Message:", defaultMessage);
    if (!commitMessage) return Promise.resolve(null);
    return Promise.resolve({ token: token.trim(), commitMessage: commitMessage.trim(), username: "" });
  }

  commitMessageInput.value = defaultMessage;

  return new Promise((resolve) => {
    const closeDialog = (result = null) => {
      commitForm.removeEventListener("submit", handleSubmit);
      cancelCommitDialogBtn?.removeEventListener("click", handleCancel);
      commitDialog.removeEventListener("cancel", handleCancel);
      if (commitDialog.open) commitDialog.close();
      resolve(result);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const token = githubTokenInput.value.trim();
      const commitMessage = commitMessageInput.value.trim();
      if (!token || !commitMessage) return;
      const username = githubUsernameInput?.value?.trim() || "";
      closeDialog({ token, commitMessage, username });
    };

    const handleCancel = () => closeDialog(null);

    commitForm.addEventListener("submit", handleSubmit);
    cancelCommitDialogBtn?.addEventListener("click", handleCancel);
    commitDialog.addEventListener("cancel", handleCancel);
    commitDialog.showModal();
    githubTokenInput.focus();
    githubTokenInput.select();
  });
}


async function commitGalleryCreateDirect() {
  if (!galleryCreateTechName || !galleryCreateDisplayName) return;
  const technicalName = sanitizeGalleryTechnicalName(galleryCreateTechName.value);
  const readableName = galleryCreateDisplayName.value.trim();
  if (!technicalName || !readableName) {
    window.alert("Bitte technischen und leserlichen Namen eingeben.");
    return;
  }
  const artifacts = buildGalleryCreateArtifacts(technicalName, readableName);
  galleryCreatePreviewPaths.textContent = artifacts.previewPaths.join("\n");
  galleryCreatePreviewHtml.textContent = artifacts.html;
  galleryCreatePreviewJson.textContent = artifacts.json;

  const commitInput = await openCommitDialog(`Create gallery scaffold for ${technicalName}`);
  if (!commitInput) return;

  const owner = CONFIG.GITHUB_OWNER;
  const repo = CONFIG.GITHUB_REPO;
  const branch = getTargetBranch();
  galleryCreateCommitBtn.disabled = true;
  setCommitStatus("Galerie-Commit wird vorbereitet...");
  try {
    const headSha = await ensureBranchExists({ owner, repo, branch, token: commitInput.token, baseBranch: getSourceBranch() });
    const commitSha = await createSingleGitHubCommit({
      owner, repo, branch, token: commitInput.token,
      message: commitInput.commitMessage,
      files: artifacts.files,
      headSha
    });
    setCommitStatus(`Galerie erfolgreich erstellt: <a href="https://github.com/${owner}/${repo}/compare/${encodeURIComponent(getSourceBranch())}...${encodeURIComponent(branch)}" target="_blank">Changes ansehen</a>`, "success");
    if (galleryCreateDialog?.open) galleryCreateDialog.close();
  } catch (error) {
    setCommitStatus(`Galerie-Commit fehlgeschlagen: ${error.message}`, "error");
  } finally {
    galleryCreateCommitBtn.disabled = false;
  }
}

function openGalleryCreateDialog() {
  if (!galleryCreateDialog || typeof galleryCreateDialog.showModal !== "function") return;
  galleryCreateTechName.value = "";
  galleryCreateDisplayName.value = "";
  galleryCreatePreviewPaths.textContent = "";
  galleryCreatePreviewHtml.textContent = "";
  galleryCreatePreviewJson.textContent = "";
  galleryCreateDialog.showModal();
}
async function commitGeneratedJson() {
  pruneUnusedSelectedGalleryFiles();
  pruneUnusedSelectedManagedFiles();
  pruneUnusedSelectedEntryImageFiles();
  const parsedJson = getOutputJson();
  if (!parsedJson) {
    setCommitStatus("Bitte zuerst erfolgreich validieren, damit ein gültiges JSON vorhanden ist.", "error");
    return;
  }

  const owner = CONFIG.GITHUB_OWNER;
  const repo = CONFIG.GITHUB_REPO;
  const branch = getTargetBranch();
  const path = getDataPath();
  prunePendingGalleryDeletes(parsedJson);
  prunePendingManagedDeletes(parsedJson);
  prunePendingEntryImageDeletes(parsedJson);

  const defaultMessage = `Update ${path} via SKV JSON Generator`;
  const commitInput = await openCommitDialog(defaultMessage);
  if (!commitInput) {
    setCommitStatus("Commit abgebrochen.", "error");
    return;
  }

  commitBtn.disabled = true;
  setCommitStatus("Branch wird geprüft...");

  try {
    const headSha = await ensureBranchExists({ owner, repo, branch, token: commitInput.token, baseBranch: getSourceBranch() });
    setCommitStatus("Commit wird erstellt...");
    const normalizedJson = JSON.stringify(parsedJson, null, 2);
    const filesForCommit = [
      { path, contentBase64: toBase64Utf8(`${normalizedJson}\n`) },
      ...pendingGalleryScaffoldFiles
    ];

    if (typeSelect.value === "gallery") {
      const galleryFilePaths = new Set(
        parsedJson
          .map((entry) => (entry?.image?.src && typeof entry.image.src === "string" ? entry.image.src : ""))
          .filter(Boolean)
          .map((src) => src.replace(/^\.\//, ""))
      );

      const filesToUpload = [...selectedGalleryFiles.entries()]
        .filter(([filePath]) => {
          if (pendingGalleryRepoDeletes.has(filePath)) return false;
          return galleryFilePaths.has(filePath) || detachedGalleryUploads.has(filePath);
        })
        .map(([filePath, data]) => ({ filePath, file: data.file }));

      for (const item of filesToUpload) {
        const contentBase64 = await fileToBase64(item.file);
        filesForCommit.push({ path: item.filePath, contentBase64 });
      }

      pendingGalleryRepoDeletes.forEach((filePath) => {
        if (galleryFilePaths.has(filePath)) return;
        filesForCommit.push({ path: filePath, delete: true });
      });
    }

    if (isManagedFileType()) {
      const fileField = getManagedFilenameField();
      const managedFilePaths = new Set(
        parsedJson
          .map((entry) => getImageSrc(entry?.[fileField.name]))
          .filter(Boolean)
          .filter((value) => !isExternalImagePath(value))
          .map((src) => src.replace(/^\.\//, ""))
      );

      const filesToUpload = [...selectedManagedFiles.entries()]
        .filter(([filePath]) => {
          if (pendingManagedRepoDeletes.has(filePath)) return false;
          return managedFilePaths.has(filePath) || detachedManagedUploads.has(filePath);
        })
        .map(([filePath, data]) => ({ filePath, file: data.file }));

      for (const item of filesToUpload) {
        const contentBase64 = await fileToBase64(item.file);
        filesForCommit.push({ path: item.filePath, contentBase64 });
      }

      pendingManagedRepoDeletes.forEach((filePath) => {
        if (managedFilePaths.has(filePath)) return;
        filesForCommit.push({ path: filePath, delete: true });
      });
    }

    if (isEntryImageType()) {
      const entryImagePaths = new Set(
        parsedJson
          .map((entry) => (entry?.image?.src && typeof entry.image.src === "string" ? entry.image.src : ""))
          .filter(Boolean)
          .filter((value) => !isExternalImagePath(value))
          .map((src) => src.replace(/^\.\//, ""))
      );

      const filesToUpload = [...selectedEntryImageFiles.entries()]
        .filter(([filePath]) => {
          if (pendingEntryImageRepoDeletes.has(filePath)) return false;
          return entryImagePaths.has(filePath) || detachedEntryImageUploads.has(filePath);
        })
        .map(([filePath, data]) => ({ filePath, file: data.file }));

      for (const item of filesToUpload) {
        const contentBase64 = await fileToBase64(item.file);
        filesForCommit.push({ path: item.filePath, contentBase64 });
      }

      pendingEntryImageRepoDeletes.forEach((filePath) => {
        if (entryImagePaths.has(filePath)) return;
        filesForCommit.push({ path: filePath, delete: true });
      });
    }

    const commitSha = await createSingleGitHubCommit({
      owner,
      repo,
      branch,
      token: commitInput.token,
      message: commitInput.commitMessage,
      files: filesForCommit,
      headSha
    });

    const commitUrl = commitSha ? `https://github.com/${owner}/${repo}/commit/${commitSha}` : "";
    const statusText = commitUrl
      ? `Commit erfolgreich: <a href="https://github.com/${owner}/${repo}/compare/${encodeURIComponent(getSourceBranch())}...${encodeURIComponent(branch)}" target="_blank">Changes ansehen</a>`
      : "Commit erfolgreich erstellt.";
    if (typeSelect.value === "gallery") pendingGalleryRepoDeletes.clear();
    if (typeSelect.value === "gallery") detachedGalleryUploads.clear();
    if (isManagedFileType()) pendingManagedRepoDeletes.clear();
    if (isManagedFileType()) detachedManagedUploads.clear();
    if (isEntryImageType()) pendingEntryImageRepoDeletes.clear();
    if (isEntryImageType()) detachedEntryImageUploads.clear();
    setCommitStatus(statusText, "success");
  } catch (error) {
    setCommitStatus(`Commit fehlgeschlagen: ${error.message}`, "error");
  } finally {
    commitBtn.disabled = false;
  }
}

async function loadOnlineJson() {
  const url = getFetchUrl();
  if (!url) return;

  const previousText = loadOnlineBtn.textContent;
  loadOnlineBtn.textContent = "Lade...";
  loadOnlineBtn.disabled = true;

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      const requestError = new Error(`HTTP ${response.status}`);
      requestError.status = response.status;
      throw requestError;
    }
    const json = await response.json();
    if (!Array.isArray(json)) throw new Error("Top-Level ist kein Array");

    const normalizedJson = json.map((entry) => {
      if (typeSelect.value !== "news") return entry;

      if (entry && !entry.text && typeof entry.description === "string") {
        return { ...entry, text: entry.description };
      }

      return entry;
    });

    renderEntries(typeSelect.value, normalizedJson);
    setOnlineJsonLoaded(true);
    loadOnlineBtn.textContent = "Online JSON geladen";
  } catch (error) {
    setOnlineJsonLoaded(false);
    if (typeSelect.value === "special-faq" && error.status === 404) {
      const faqName = getActiveGalleryName();
      loadOnlineBtn.textContent = "FAQ nicht gefunden";
      const shouldCreate = window.confirm(
        `Das Spezial-FAQ "${faqName}" existiert noch nicht. Möchtest du es jetzt anlegen?`
      );
      if (shouldCreate) await createSpecialFaq(faqName);
    } else {
      loadOnlineBtn.textContent = `Fehler beim Laden (${error.message})`;
    }
  } finally {
    setTimeout(() => {
      loadOnlineBtn.textContent = previousText;
      updateGalleryConfirmationState();
    }, 1600);
  }
}

typeSelect.addEventListener("change", () => {
  setOnlineJsonLoaded(false);
  confirmedGalleryName = "";
  galleryNameConfirmed = false;
  if (DYNAMIC_FILE_TYPES.has(typeSelect.value)) {
    galleryNameInput.value = typeSelect.value === "special-faq" ? DEFAULT_SPECIAL_FAQ_NAME : DEFAULT_GALLERY_NAME;
  }
  pendingGalleryScaffoldFiles = [];
  updateTypeDependentUi();
  renderEntries(typeSelect.value);
  refreshGalleryDirectorySuggestions();
});

addEntryBtn.addEventListener("click", async () => {
  if (typeSelect.value === "royals") {
    const source = await openGallerySourceDialog({ allowNone: true });
    if (!source) return;

    if (source === "none") {
      addEntry();
      resetValidationUi();
      return;
    }

    if (source === "new") {
      const file = await pickSingleLocalImage();
      if (!file) return;
      rememberEntryImageFile(file, {
        dataset: { pathPrefix: "./src/img/verein/prinzenpaare/" }
      });
      addEntry({ image: { src: file.name, ki: false, teilweiseKi: false } });
      resetValidationUi();
      return;
    }

    if (source === "internal") {
      try {
        const internalFiles = await fetchInternalEntryImages({
          dataset: { pathPrefix: "./src/img/verein/prinzenpaare/" }
        });
        if (internalFiles.length === 0) {
          window.alert("Im Zielordner wurden keine Bilder gefunden.");
          return;
        }
        const relativePrefix = "./src/img/verein/prinzenpaare/";
        const selectedFile = await openInternalGalleryImageDialog(internalFiles, {
          relativePrefix,
          repoPrefix: relativePrefix.replace(/^\.\//, ""),
          selectedFileMap: selectedEntryImageFiles
        });
        if (!selectedFile) return;
        addEntry({ image: { src: selectedFile, ki: false, teilweiseKi: false } });
        resetValidationUi();
      } catch (error) {
        window.alert(`Interne Bilder konnten nicht geladen werden: ${error.message}`);
      }
      return;
    }

    if (source === "external") {
      const link = window.prompt("Bitte externen Bildlink eingeben (https://...):", "");
      if (!link) return;
      if (!isExternalImagePath(link)) {
        window.alert("Bitte eine vollständige http(s)-URL angeben.");
        return;
      }
      addEntry({ image: { src: link.trim(), ki: false, teilweiseKi: false } });
      resetValidationUi();
      return;
    }
  }

  if (typeSelect.value !== "gallery" && !isManagedFileType(typeSelect.value)) {
    addEntry();
    resetValidationUi();
    return;
  }

  const source = await openGallerySourceDialog();
  if (!source) return;

  if (source === "new") {
    const file = typeSelect.value === "gallery"
      ? await pickSingleLocalImage()
      : await pickSingleLocalFile(getManagedFieldAcceptValue());
    if (!file) return;
    if (typeSelect.value === "gallery") {
      rememberGalleryFiles([file]);
      addEntry({ image: { src: file.name, ki: false, teilweiseKi: false }, alt: "" });
    } else {
      rememberManagedFiles([file]);
      const field = getManagedFilenameField();
      if (!field) return;
      addEntry({ [field.name]: file.name });
    }
    resetValidationUi();
    return;
  }

  if (source === "internal") {
    try {
      const internalFiles = typeSelect.value === "gallery"
        ? await fetchInternalGalleryImages()
        : await fetchInternalManagedFiles();
      if (internalFiles.length === 0) {
        window.alert(typeSelect.value === "gallery"
          ? "Im gewählten Galerieordner wurden keine Bilder gefunden."
          : "Im Zielordner wurden keine Dateien gefunden.");
        return;
      }
      const selectedFile = typeSelect.value === "gallery"
        ? await openInternalGalleryImageDialog(internalFiles)
        : await openInternalGalleryImageDialog(internalFiles, {
          relativePrefix: (getManagedFilenameField()?.pathPrefix || ""),
          repoPrefix: (getManagedFilenameField()?.pathPrefix || "").replace(/^\.\//, ""),
          selectedFileMap: selectedManagedFiles,
          previewLabel: "Vorschau Datei"
        });
      if (!selectedFile) return;
      if (typeSelect.value === "gallery") {
        addEntry({ image: { src: selectedFile, ki: false, teilweiseKi: false }, alt: "" });
      } else {
        const field = getManagedFilenameField();
        if (!field) return;
        addEntry({ [field.name]: selectedFile });
      }
      resetValidationUi();
    } catch (error) {
      window.alert(`Interne Dateien konnten nicht geladen werden: ${error.message}`);
    }
    return;
  }

  if (source === "external") {
    const link = window.prompt("Bitte externen Dateilink eingeben (https://...):", "");
    if (!link) return;
    if (!isExternalImagePath(link)) {
      window.alert("Bitte eine vollständige http(s)-URL angeben.");
      return;
    }
    if (typeSelect.value === "gallery") {
      addEntry({ image: { src: link.trim(), ki: false, teilweiseKi: false }, alt: "" });
    } else {
      const field = getManagedFilenameField();
      if (!field) return;
      addEntry({ [field.name]: link.trim() });
    }
    resetValidationUi();
  }
});

const createGalleryScaffoldBtn = document.querySelector("#createGalleryScaffoldBtn");
const deleteGalleryScaffoldBtn = document.querySelector("#deleteGalleryScaffoldBtn");
createGalleryScaffoldBtn?.addEventListener("click", () => {
  openGalleryCreateDialog();
});
deleteGalleryScaffoldBtn?.addEventListener("click", () => {
  openGalleryScaffoldDeleteDialog();
});
galleryCreatePreviewBtn?.addEventListener("click", () => {
  const technicalName = sanitizeGalleryTechnicalName(galleryCreateTechName?.value);
  const readableName = galleryCreateDisplayName?.value?.trim() || "";
  if (!technicalName || !readableName) {
    window.alert("Bitte technischen und leserlichen Namen eingeben.");
    return;
  }
  const artifacts = buildGalleryCreateArtifacts(technicalName, readableName);
  galleryCreatePreviewPaths.textContent = artifacts.previewPaths.join("\n");
  galleryCreatePreviewHtml.textContent = artifacts.html;
  galleryCreatePreviewJson.textContent = artifacts.json;
});
galleryCreateCommitBtn?.addEventListener("click", commitGalleryCreateDirect);
galleryCreateCancelBtn?.addEventListener("click", () => { if (galleryCreateDialog?.open) galleryCreateDialog.close(); });
galleryDeletePreviewBtn?.addEventListener("click", async () => {
  const technicalName = sanitizeGalleryTechnicalName(galleryDeleteTechName?.value);
  if (!technicalName) return window.alert("Bitte technischen Namen eingeben.");
  const artifacts = await buildGalleryDeleteArtifacts(technicalName);
  galleryDeletePreviewPaths.textContent = artifacts.previewPaths.join("\n");
});
galleryDeleteCommitBtn?.addEventListener("click", commitGalleryDeleteDirect);
galleryDeleteCancelBtn?.addEventListener("click", () => { if (galleryDeleteScaffoldDialog?.open) galleryDeleteScaffoldDialog.close(); });
generateBtn.addEventListener("click", validateAndGenerate);
loadOnlineBtn.addEventListener("click", loadOnlineJson);
syncBranchesBtn?.addEventListener("click", syncBranches);
confirmGalleryBtn.addEventListener("click", confirmGalleryName);

sourceBranchSelect?.addEventListener("change", () => {
  setOnlineJsonLoaded(false);
  refreshGalleryDirectorySuggestions();
});

targetBranchInput?.addEventListener("input", () => {
  updateCompareLink();
  updateCommitBranchLabel();
});

targetBranchInput?.addEventListener("change", () => {
  if (!targetBranchInput.value.trim()) targetBranchInput.value = CONFIG.DEFAULT_TARGET_BRANCH;
  updateCompareLink();
  updateCommitBranchLabel();
});

galleryNameInput.addEventListener("input", () => {
  if (!DYNAMIC_FILE_TYPES.has(typeSelect.value)) return;
  updateGalleryConfirmationState();
  resetValidationUi();
});

copyBtn.addEventListener("click", async () => {
  if (!outputEl.textContent.trim()) return;
  try {
    await navigator.clipboard.writeText(outputEl.textContent);
    copyBtn.textContent = "Kopiert";
  } catch {
    copyBtn.textContent = "Kopieren fehlgeschlagen";
  }

  setTimeout(() => {
    copyBtn.textContent = "JSON kopieren";
  }, 1500);
});

downloadBtn.addEventListener("click", () => {
  if (!outputEl.textContent.trim()) return;

  const blob = new Blob([outputEl.textContent], { type: "application/json;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);

  if (DYNAMIC_FILE_TYPES.has(typeSelect.value)) {
    a.download = `${getActiveGalleryName()}.json`;
  } else {
    a.download = specs[typeSelect.value].filename;
  }

  a.click();
  URL.revokeObjectURL(a.href);
});

commitBtn.addEventListener("click", commitGeneratedJson);

scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  const shouldShow = window.scrollY > 320;
  scrollTopBtn?.classList.toggle("hidden", !shouldShow);
});

entriesEl.addEventListener("input", (event) => {
  const entryEl = event.target.closest(".entry");
  if (entryEl) {
    updateImagePreviewForInput(event.target);
    if (event.target.dataset.field === "deleteAt") {
      event.target.dataset.autoManaged = "false";
    }
    if (event.target.dataset.field === "date" || event.target.dataset.field === "publishAt") {
      updateNewsDeleteAt(entryEl);
    }
    if (event.target.dataset.field === "countdown") {
      updateHeaderNoticesDeleteAt(entryEl);
    }
    const index = [...entriesEl.querySelectorAll(".entry")].indexOf(entryEl);
    refreshEntrySummary(entryEl, index);
    syncEntryExpiredState(entryEl);
  }
  resetValidationUi();
});

function getDragInsertBefore(container, pointerY) {
  const draggableEntries = [...container.querySelectorAll(".entry:not(.is-dragging)")];

  return draggableEntries.reduce(
    (closest, current) => {
      const box = current.getBoundingClientRect();
      const offset = pointerY - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: current };
      }
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY, element: null }
  ).element;
}

let dragFromHandle = false;

entriesEl.addEventListener("pointerdown", (event) => {
  dragFromHandle = !!event.target.closest(".drag-handle");
});

entriesEl.addEventListener("dragstart", (event) => {
  const entry = event.target.closest(".entry");
  if (!entry) return;
  if (!dragFromHandle) {
    event.preventDefault();
    return;
  }

  entry.classList.add("is-dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", "entry");
  dragFromHandle = false;
});

entriesEl.addEventListener("dragover", (event) => {
  event.preventDefault();
  const dragging = entriesEl.querySelector(".entry.is-dragging");
  if (!dragging) return;

  const insertBeforeEl = getDragInsertBefore(entriesEl, event.clientY);
  if (!insertBeforeEl) entriesEl.append(dragging);
  else entriesEl.insertBefore(dragging, insertBeforeEl);
});

entriesEl.addEventListener("dragend", (event) => {
  const entry = event.target.closest(".entry");
  if (!entry) return;

  entry.classList.remove("is-dragging");
  dragFromHandle = false;
  renumberAndRefreshSummaries();
  resetValidationUi();
});

typeSelect.value = "news";
if (sourceBranchSelect) {
  sourceBranchSelect.innerHTML = `<option value="${CONFIG.DEFAULT_SOURCE_BRANCH}">${CONFIG.DEFAULT_SOURCE_BRANCH}</option>`;
  sourceBranchSelect.value = CONFIG.DEFAULT_SOURCE_BRANCH;
}
if (targetBranchInput) targetBranchInput.value = CONFIG.DEFAULT_TARGET_BRANCH;
updateCompareLink();
updateCommitBranchLabel();
syncBranches();
updateTypeDependentUi();
renderEntries("news");
refreshGalleryDirectorySuggestions();
