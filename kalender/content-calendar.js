const CONFIG = {
  GITHUB_OWNER: "skvonline",
  GITHUB_REPO: "skvonline.github.io",
  DEFAULT_SOURCE_BRANCH: "main"
};

const CALENDAR_SOURCE_TYPES = ["news", "events", "header-notices", "gallery-overview"];
const TYPE_META = {
  news: { filename: "news.json", label: "News", accent: "news" },
  events: { filename: "events.json", label: "Veranstaltung", accent: "events" },
  "header-notices": { filename: "header-notices.json", label: "Header-Hinweis", accent: "header-notices" },
  "gallery-overview": { filename: "gallery-overview.json", label: "Galerie", accent: "gallery-overview" }
};
const DATE_KIND_LABELS = {
  publish: "Publish",
  event: "Termin",
  delete: "Delete",
  countdown: "Countdown"
};
const FIXED_NOW = Date.UTC(2026, 7, 25, 12, 0, 0, 0);
const FIXED_TODAY = Date.UTC(2026, 7, 25, 0, 0, 0, 0);
const CURRENT_MONTH_KEY = "2026-08";

const sourceBranchSelect = document.querySelector("#sourceBranchSelect");
const syncBranchesBtn = document.querySelector("#syncBranchesBtn");
const loadCalendarBtn = document.querySelector("#loadCalendarBtn");
const calendarStatus = document.querySelector("#calendarStatus");
const calendarBoard = document.querySelector("#calendarBoard");
const calendarDetailDialog = document.querySelector("#calendarDetailDialog");
const calendarDetailTitle = document.querySelector("#calendarDetailTitle");
const calendarDetailBody = document.querySelector("#calendarDetailBody");
const closeCalendarDetailBtn = document.querySelector("#closeCalendarDetailBtn");
const agendaViewBtn = document.querySelector("#agendaViewBtn");
const monthViewBtn = document.querySelector("#monthViewBtn");
let preferredBranch = new URLSearchParams(window.location.search).get("branch")?.trim() || "";

const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
const windowRegex = /^\d{4}-\d{2}-\d{2}-\d{2}:\d{2}$/;
let currentCalendarPoints = [];
let currentView = "agenda";

function ensureBranchOptions(branchNames = []) {
  if (!sourceBranchSelect) return;
  const previousBranch = preferredBranch || getSourceBranch();
  const normalizedBranches = Array.isArray(branchNames)
    ? branchNames.filter((name) => typeof name === "string" && name.trim())
    : [];
  const nextBranches = normalizedBranches.length > 0 ? normalizedBranches : [CONFIG.DEFAULT_SOURCE_BRANCH];

  sourceBranchSelect.innerHTML = "";
  nextBranches.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    sourceBranchSelect.append(option);
  });

  sourceBranchSelect.value = nextBranches.includes(previousBranch)
    ? previousBranch
    : nextBranches.includes(CONFIG.DEFAULT_SOURCE_BRANCH)
      ? CONFIG.DEFAULT_SOURCE_BRANCH
      : nextBranches[0];
  preferredBranch = "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function getSourceBranch() {
  return sourceBranchSelect?.value?.trim() || CONFIG.DEFAULT_SOURCE_BRANCH;
}

function setCalendarStatus(text, state = "") {
  if (!calendarStatus) return;
  calendarStatus.textContent = text;
  calendarStatus.classList.toggle("is-success", state === "success");
  calendarStatus.classList.toggle("is-error", state === "error");
}

function resetCalendarBoard(message = "Noch kein Kalender geladen.") {
  currentCalendarPoints = [];
  if (!calendarBoard) return;
  calendarBoard.innerHTML = `<p class="calendar-placeholder">${escapeHtml(message)}</p>`;
}

function parseDate(value) {
  if (!dateRegex.test(value)) return null;
  const [day, month, year] = value.split(".");
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0, 0));
}

function parseDateWindow(value) {
  if (!windowRegex.test(value)) return null;
  const [year, month, day, hm] = value.split("-");
  const [hour, minute] = hm.split(":");
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute)));
}

function formatDateWindow(value) {
  return `${value.getUTCFullYear()}-${String(value.getUTCMonth() + 1).padStart(2, "0")}-${String(value.getUTCDate()).padStart(2, "0")}-${String(value.getUTCHours()).padStart(2, "0")}:${String(value.getUTCMinutes()).padStart(2, "0")}`;
}

function calculateNewsDeleteAt(entry) {
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
  const eventDate = entry.date ? parseDate(entry.date) : null;
  if (!eventDate) return null;
  const targetDate = new Date(eventDate.getTime());
  targetDate.setUTCHours(23, 59, 0, 0);
  return formatDateWindow(targetDate);
}

function normalizeEntries(typeKey, entries) {
  return entries.map((entry) => {
    if (typeKey === "news" && entry && !entry.text && typeof entry.description === "string") {
      return { ...entry, text: entry.description };
    }
    return entry;
  });
}

function truncateText(value, maxLength = 120) {
  const normalized = String(value || "").replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trimEnd()}...`;
}

function formatMonthLabel(timestamp) {
  return new Intl.DateTimeFormat("de-DE", {
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(timestamp));
}

function formatTimeOnly(value, mode) {
  if (mode === "date" || !windowRegex.test(value)) return "";
  return value.split("-")[3] || "";
}

function formatDisplayDate(value, mode) {
  if (mode === "date") return value;
  if (!windowRegex.test(value)) return String(value || "");
  const [year, month, day, hm] = value.split("-");
  return `${day}.${month}.${year}, ${hm} Uhr`;
}

function getEntryState(entry) {
  const publishTs = entry.publishAt ? parseDateWindow(entry.publishAt)?.getTime() : NaN;
  const deleteTs = entry.deleteAt ? parseDateWindow(entry.deleteAt)?.getTime() : NaN;
  const eventTs = entry.date ? parseDate(entry.date)?.getTime() : NaN;
  const countdownTs = entry.countdown ? parseDateWindow(entry.countdown)?.getTime() : NaN;

  if (Number.isFinite(deleteTs) && deleteTs < FIXED_NOW) return "past";
  if (Number.isFinite(publishTs) && publishTs > FIXED_NOW) return "upcoming";
  if (Number.isFinite(eventTs) && eventTs > FIXED_NOW) return "upcoming";
  if (Number.isFinite(countdownTs) && countdownTs > FIXED_NOW) return "upcoming";
  return "live";
}

function buildDateRows(typeKey, entry) {
  const rows = [];
  const pushRow = (label, rawValue, kind, mode = "window") => {
    if (!rawValue) return;
    const parsed = mode === "date" ? parseDate(rawValue) : parseDateWindow(rawValue);
    const timestamp = parsed instanceof Date ? parsed.getTime() : NaN;
    if (!Number.isFinite(timestamp)) return;
    rows.push({
      label,
      rawValue,
      kind,
      mode,
      display: formatDisplayDate(rawValue, mode),
      timestamp
    });
  };

  if (typeKey === "news") {
    pushRow("Veröffentlichung", entry.publishAt, "publish");
    pushRow("News-Datum", entry.date, "event", "date");
    pushRow("Löschung", entry.deleteAt || calculateNewsDeleteAt(entry), "delete");
  }
  if (typeKey === "events") {
    pushRow("Veröffentlichung", entry.publishAt, "publish");
    pushRow("Veranstaltung", entry.date, "event", "date");
    pushRow("Löschung", entry.deleteAt || calculateEventDeleteAt(entry), "delete");
  }
  if (typeKey === "header-notices") {
    pushRow("Veröffentlichung", entry.publishAt, "publish");
    pushRow("Countdown", entry.countdown, "countdown");
    pushRow("Löschung", entry.deleteAt, "delete");
  }
  if (typeKey === "gallery-overview") {
    pushRow("Veröffentlichung", entry.publishAt, "publish");
    pushRow("Löschung", entry.deleteAt, "delete");
  }

  return rows.sort((a, b) => a.timestamp - b.timestamp);
}

function getTitle(typeKey, entry, index) {
  if (typeKey === "news") return entry.title || `News ${index + 1}`;
  if (typeKey === "events") return entry.title || `Veranstaltung ${index + 1}`;
  if (typeKey === "header-notices") return truncateText(entry.text || "Header-Hinweis", 90);
  if (typeKey === "gallery-overview") return entry.name || entry.directory || `Galerie ${index + 1}`;
  return `Eintrag ${index + 1}`;
}

function getOverviewHint(typeKey, entry) {
  if (typeKey === "events") return entry.location || "Details anzeigen";
  if (typeKey === "gallery-overview") return entry.directory || "Details anzeigen";
  return "Details anzeigen";
}

function getMetaRows(typeKey, entry) {
  if (typeKey === "news") {
    return entry.text ? [{ label: "Inhalt", value: truncateText(entry.text, 180) }] : [];
  }
  if (typeKey === "events") {
    return [
      entry.location ? { label: "Ort", value: entry.location } : null,
      entry.time ? { label: "Beginn", value: entry.time } : null,
      entry.einlass ? { label: "Einlass", value: entry.einlass } : null,
      entry.preis ? { label: "Preis", value: entry.preis } : null,
      entry.description ? { label: "Beschreibung", value: truncateText(entry.description, 180) } : null
    ].filter(Boolean);
  }
  if (typeKey === "header-notices") {
    return entry.text ? [{ label: "Text", value: truncateText(entry.text, 220) }] : [];
  }
  if (typeKey === "gallery-overview") {
    return entry.directory ? [{ label: "Verzeichnis", value: entry.directory }] : [];
  }
  return [];
}

function extractPoints(typeKey, entries) {
  const meta = TYPE_META[typeKey];
  return entries.flatMap((entry, index) => {
    const title = getTitle(typeKey, entry, index);
    const state = getEntryState(entry);
    const dates = buildDateRows(typeKey, entry);
    return dates.map((dateRow, dateIndex) => ({
      id: `${typeKey}-${index}-${dateIndex}-${dateRow.kind}`,
      typeKey,
      accent: meta.accent,
      typeLabel: meta.label,
      title,
      state,
      dateRow,
      hint: getOverviewHint(typeKey, entry),
      subtitle: meta.filename,
      metaRows: getMetaRows(typeKey, entry),
      allDates: dates,
      primaryTimestamp: dateRow.timestamp
    }));
  });
}

function renderCalendar(points) {
  currentCalendarPoints = Array.isArray(points) ? points : [];
  if (currentCalendarPoints.length === 0) {
    resetCalendarBoard("Keine relevanten Kalenderdaten gefunden.");
    return;
  }

  if (calendarBoard) calendarBoard.dataset.view = currentView;

  if (currentView === "month") {
    renderMonthCalendar(currentCalendarPoints);
    return;
  }

  const groups = new Map();
  currentCalendarPoints
    .sort((a, b) => a.primaryTimestamp - b.primaryTimestamp)
    .forEach((point) => {
      const date = new Date(point.primaryTimestamp);
      const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(point);
    });

  calendarBoard.innerHTML = [...groups.entries()].map(([monthKey, monthPoints]) => {
    const cardsHtml = monthPoints.map((point) => {
      const stateLabel = point.state === "past" ? "Vergangen" : point.state === "upcoming" ? "Geplant" : "Aktiv";
      return `
        <button type="button" class="calendar-point" data-point-id="${escapeHtml(point.id)}" data-accent="${escapeHtml(point.accent)}">
          <div class="calendar-point-top">
            <span class="calendar-type-badge">${escapeHtml(point.typeLabel)}</span>
            <span class="calendar-date-kind" data-kind="${escapeHtml(point.dateRow.kind)}">${escapeHtml(DATE_KIND_LABELS[point.dateRow.kind] || point.dateRow.kind)}</span>
            <span class="calendar-state-badge" data-state="${escapeHtml(point.state)}">${escapeHtml(stateLabel)}</span>
          </div>
          <h3 class="calendar-point-title">${escapeHtml(point.title)}</h3>
          <div class="calendar-point-date">
            <strong>${escapeHtml(point.dateRow.label)}</strong>
            <span class="calendar-date-value">${escapeHtml(point.dateRow.display)}</span>
          </div>
          <span class="calendar-point-hint">${escapeHtml(point.hint)}</span>
        </button>
      `;
    }).join("");

    return `
      <section class="calendar-month-group" data-month="${escapeHtml(monthKey)}">
        <h2 class="calendar-month-heading">${escapeHtml(formatMonthLabel(monthPoints[0].primaryTimestamp))}</h2>
        <div class="calendar-grid">${cardsHtml}</div>
      </section>
    `;
  }).join("");
}

function scrollToCurrentMonth() {
  if (!calendarBoard) return;
  const scrollToTarget = (element) => {
    if (!element) return;
    const headerHeight = document.querySelector(".page-header")?.offsetHeight || 0;
    const targetTop = element.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  };

  const currentMonthSection = calendarBoard.querySelector(`.calendar-month-group[data-month="${CURRENT_MONTH_KEY}"]`);
  if (currentMonthSection) {
    scrollToTarget(currentMonthSection);
    return;
  }

  const nextUpcomingPoint = [...currentCalendarPoints]
    .filter((point) => Number.isFinite(point.primaryTimestamp) && point.primaryTimestamp >= FIXED_NOW)
    .sort((a, b) => a.primaryTimestamp - b.primaryTimestamp)[0];
  const nextMonthKey = nextUpcomingPoint
    ? `${new Date(nextUpcomingPoint.primaryTimestamp).getUTCFullYear()}-${String(new Date(nextUpcomingPoint.primaryTimestamp).getUTCMonth() + 1).padStart(2, "0")}`
    : "";
  const nextUpcomingSection = nextMonthKey
    ? calendarBoard.querySelector(`.calendar-month-group[data-month="${nextMonthKey}"]`)
    : null;
  const fallbackSection = calendarBoard.querySelector(".calendar-month-group");
  const target = nextUpcomingSection || fallbackSection;
  scrollToTarget(target);
}

function getCalendarDayKey(date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

function startOfMonthGrid(timestamp) {
  const first = new Date(timestamp);
  const monthStart = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), 1, 0, 0, 0, 0));
  const dayIndex = (monthStart.getUTCDay() + 6) % 7;
  monthStart.setUTCDate(monthStart.getUTCDate() - dayIndex);
  return monthStart;
}

function renderMonthCalendar(points) {
  const sorted = [...points].sort((a, b) => a.primaryTimestamp - b.primaryTimestamp);
  const groups = new Map();

  sorted.forEach((point) => {
    const date = new Date(point.primaryTimestamp);
    const monthKey = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    if (!groups.has(monthKey)) groups.set(monthKey, []);
    groups.get(monthKey).push(point);
  });

  const weekdayLabels = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  calendarBoard.innerHTML = [...groups.entries()].map(([monthKey, monthPoints]) => {
    const firstTimestamp = monthPoints[0].primaryTimestamp;
    const monthDate = new Date(firstTimestamp);
    const targetMonth = monthDate.getUTCMonth();
    const cursor = startOfMonthGrid(firstTimestamp);
    const pointMap = new Map();

    monthPoints.forEach((point) => {
      const key = getCalendarDayKey(new Date(point.primaryTimestamp));
      if (!pointMap.has(key)) pointMap.set(key, []);
      pointMap.get(key).push(point);
    });

    const weekdayRow = weekdayLabels.map((label) => `<div class="calendar-sheet-weekday">${label}</div>`).join("");
    const dayCells = [];

    for (let index = 0; index < 42; index += 1) {
      const dayDate = new Date(cursor.getTime());
      const dayKey = getCalendarDayKey(dayDate);
      const dayPoints = (pointMap.get(dayKey) || []).sort((a, b) => a.primaryTimestamp - b.primaryTimestamp);
      const isOutside = dayDate.getUTCMonth() !== targetMonth;
      const isToday = dayDate.getTime() === FIXED_TODAY;
      const pointsHtml = dayPoints.map((point) => `
        <button type="button" class="calendar-day-point" data-point-id="${escapeHtml(point.id)}" data-accent="${escapeHtml(point.accent)}">
          <span class="calendar-day-point-title">${escapeHtml(point.title)}</span>
          <span class="calendar-day-point-meta">
            <span class="calendar-date-kind" data-kind="${escapeHtml(point.dateRow.kind)}">${escapeHtml(DATE_KIND_LABELS[point.dateRow.kind] || point.dateRow.kind)}</span>
            ${formatTimeOnly(point.dateRow.rawValue, point.dateRow.mode) ? `<span class="calendar-day-point-time">${escapeHtml(formatTimeOnly(point.dateRow.rawValue, point.dateRow.mode))} Uhr</span>` : ""}
          </span>
        </button>
      `).join("");

      dayCells.push(`
        <div class="calendar-day${isOutside ? " is-outside" : ""}${isToday ? " is-today" : ""}">
          <div class="calendar-day-number">${dayDate.getUTCDate()}</div>
          <div class="calendar-day-points">${pointsHtml}</div>
        </div>
      `);
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    return `
      <section class="calendar-month-group" data-month="${escapeHtml(monthKey)}">
        <h2 class="calendar-month-heading">${escapeHtml(formatMonthLabel(firstTimestamp))}</h2>
        <div class="calendar-sheet">
          <div class="calendar-sheet-weekdays">${weekdayRow}</div>
          <div class="calendar-sheet-grid">${dayCells.join("")}</div>
        </div>
      </section>
    `;
  }).join("");
}

function setView(view) {
  currentView = view === "month" ? "month" : "agenda";
  agendaViewBtn?.classList.toggle("is-active", currentView === "agenda");
  monthViewBtn?.classList.toggle("is-active", currentView === "month");
  if (currentCalendarPoints.length > 0) renderCalendar(currentCalendarPoints);
}

function openDetailDialog(pointId) {
  const point = currentCalendarPoints.find((item) => item.id === pointId);
  if (!point || !calendarDetailDialog || !calendarDetailTitle || !calendarDetailBody) return;

  const stateLabel = point.state === "past" ? "Vergangen" : point.state === "upcoming" ? "Geplant" : "Aktiv";
  const metaHtml = point.metaRows.length > 0
    ? `
      <section class="detail-section">
        <h3>Zusätzliche Infos</h3>
        <div class="detail-grid">
          ${point.metaRows.map((row) => `
            <div class="detail-row">
              <span class="detail-label">${escapeHtml(row.label)}</span>
              <span>${escapeHtml(row.value)}</span>
            </div>
          `).join("")}
        </div>
      </section>
    `
    : "";

  const datesHtml = point.allDates.map((row) => `
    <div class="detail-date-item">
      <span class="calendar-date-kind" data-kind="${escapeHtml(row.kind)}">${escapeHtml(DATE_KIND_LABELS[row.kind] || row.kind)}</span>
      <div>
        <div><strong>${escapeHtml(row.label)}</strong></div>
        <div>${escapeHtml(row.display)}</div>
      </div>
    </div>
  `).join("");

  calendarDetailTitle.textContent = point.title;
  calendarDetailBody.innerHTML = `
    <section class="detail-section">
      <div class="detail-grid">
        <div class="detail-row">
          <span class="detail-label">Typ</span>
          <span>${escapeHtml(point.typeLabel)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Status</span>
          <span>${escapeHtml(stateLabel)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Datei</span>
          <span>${escapeHtml(point.subtitle)}</span>
        </div>
      </div>
    </section>
    <section class="detail-section">
      <h3>Alle relevanten Daten</h3>
      <div class="detail-date-list">${datesHtml}</div>
    </section>
    ${metaHtml}
  `;

  if (typeof calendarDetailDialog.showModal === "function") {
    calendarDetailDialog.showModal();
  }
}

function getFetchUrl(typeKey, branch) {
  const filename = TYPE_META[typeKey]?.filename;
  return `https://raw.githubusercontent.com/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/${encodeURIComponent(branch)}/src/data/${filename}`;
}

async function syncBranches() {
  if (!syncBranchesBtn) return;
  const previousText = syncBranchesBtn.textContent;
  syncBranchesBtn.disabled = true;
  syncBranchesBtn.textContent = "Lade...";

  try {
    const response = await fetch(`https://api.github.com/repos/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/branches?per_page=100`, {
      headers: { Accept: "application/vnd.github+json" }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    const branchNames = Array.isArray(payload) ? payload.map((branch) => branch?.name).filter(Boolean) : [];
    ensureBranchOptions(branchNames);
    syncBranchesBtn.textContent = "Aktualisiert";
  } catch (error) {
    ensureBranchOptions();
    syncBranchesBtn.textContent = "Fehler";
    setCalendarStatus(`Branches konnten nicht geladen werden (${error.message}). Fallback auf "${CONFIG.DEFAULT_SOURCE_BRANCH}".`, "error");
  } finally {
    setTimeout(() => {
      syncBranchesBtn.textContent = previousText;
      syncBranchesBtn.disabled = false;
    }, 1600);
  }
}

async function loadCalendar() {
  const branch = getSourceBranch();
  loadCalendarBtn.disabled = true;
  setCalendarStatus(`Kalender wird aus Branch "${branch}" geladen...`);
  resetCalendarBoard("Kalender wird geladen...");

  try {
    const results = await Promise.allSettled(
      CALENDAR_SOURCE_TYPES.map(async (typeKey) => {
        const response = await fetch(getFetchUrl(typeKey, branch), { cache: "no-store" });
        if (!response.ok) throw new Error(`${TYPE_META[typeKey].filename}: HTTP ${response.status}`);
        const json = await response.json();
        if (!Array.isArray(json)) throw new Error(`${TYPE_META[typeKey].filename}: Top-Level ist kein Array`);
        return { typeKey, entries: normalizeEntries(typeKey, json) };
      })
    );

    const points = [];
    const failed = [];
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        points.push(...extractPoints(result.value.typeKey, result.value.entries));
      } else {
        failed.push(result.reason?.message || "Unbekannter Fehler");
      }
    });

    renderCalendar(points);
    scrollToCurrentMonth();
    if (failed.length > 0) {
      setCalendarStatus(`Kalender geladen, aber nicht alle Dateien konnten gelesen werden: ${failed.join(" | ")}`, "error");
    } else {
      setCalendarStatus(`Kalender geladen: ${points.length} Kalendereinträge aus Branch "${branch}".`, "success");
    }
  } catch (error) {
    resetCalendarBoard("Kalender konnte nicht geladen werden.");
    setCalendarStatus(`Kalender konnte nicht geladen werden: ${error.message}`, "error");
  } finally {
    loadCalendarBtn.disabled = false;
  }
}

syncBranchesBtn?.addEventListener("click", syncBranches);
loadCalendarBtn?.addEventListener("click", loadCalendar);
agendaViewBtn?.addEventListener("click", () => setView("agenda"));
monthViewBtn?.addEventListener("click", () => setView("month"));
closeCalendarDetailBtn?.addEventListener("click", () => {
  if (calendarDetailDialog?.open) calendarDetailDialog.close();
});
calendarDetailDialog?.addEventListener("click", (event) => {
  if (event.target === calendarDetailDialog) calendarDetailDialog.close();
});
calendarBoard?.addEventListener("click", (event) => {
  const pointButton = event.target.closest("[data-point-id]");
  if (!pointButton) return;
  openDetailDialog(pointButton.dataset.pointId);
});
sourceBranchSelect?.addEventListener("change", () => {
  preferredBranch = "";
  setCalendarStatus(`Quell-Branch gewechselt zu "${getSourceBranch()}". Kalender bei Bedarf neu laden.`);
  resetCalendarBoard("Kalender ist nach dem Branch-Wechsel nicht mehr aktuell.");
});

ensureBranchOptions();
syncBranches().then(loadCalendar);
