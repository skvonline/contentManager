# JSON-Spezifikation (`src/data`)

Dieses Dokument beschreibt **alle JSON-Dateien** im Projekt, inklusive:

- erlaubte/erwartete Felder,
- Pflicht- und optionale Felder,
- Formatvorgaben,
- vollständige Formatvorlagen,
- Validierungs- und Pflegehinweise.

> Wichtig: Die Anwendung verarbeitet viele Felder "fehlertolerant". Das heißt: Manche Felder sind technisch optional,
> aber für sinnvolle Darstellung in der Webseite **fachlich Pflicht**.

---

## 1) Globale Regeln für alle JSON-Dateien

### 1.1 Dateiformat

- Kodierung: UTF-8
- Top-Level ist immer ein **Array** (`[...]`)
- Jedes Array-Element ist ein Objekt (`{...}`)
- Keine Kommentare in JSON (also kein `//` oder `/* ... */`)

### 1.2 Datums-/Zeitformate

Es gibt im Projekt zwei unterschiedliche Datumsformate:

1. **Anzeigeformat** (`date`):
    - `TT.MM.JJJJ`
    - Beispiel: `11.04.2026`

2. **Sichtbarkeitsfenster** (`publishAt`, `deleteAt`):
    - `JJJJ-MM-TT-HH:mm`
    - Beispiel: `2026-11-11-12:00`

### 1.3 Sichtbarkeitslogik (`publishAt` / `deleteAt`)

- `publishAt` gesetzt + Zeitpunkt liegt in der Zukunft → Eintrag wird **nicht** angezeigt.
- `deleteAt` gesetzt + Zeitpunkt ist erreicht/überschritten → Eintrag wird **nicht** angezeigt.
- Ungültiges Format wird ignoriert (wird dann behandelt wie „nicht gesetzt“).

### 1.4 Links

Link-Objekte verwenden i. d. R. dieses Muster:

```json
{
  "type": "instagram",
  "label": "Instagram",
  "url": "https://www.instagram.com/..."
}
```

Erlaubte/unterstützte `type`-Werte für News/Event-Buttons:

- `more`
- `instagram`
- `facebook`
- `tiktok`
- `mail`
- `maps`

Unbekannte `type`-Werte werden wie `more` behandelt.


### 1.5 Bildobjekte

Alle Bildreferenzen werden als `image`-Objekt gespeichert:

```json
"image": {
  "src": "./src/img/beispiel.png",
  "ki": true,
  "teilweiseKi": false,
  "theme": "black"
}
```

- `src` enthält den Bildpfad.
- `ki` und `teilweiseKi` sind immer vorhanden und dürfen niemals gleichzeitig `true` sein.
- Sobald eine der Kennzeichnungen `true` ist, ist `theme` mit `black` oder `white` verpflichtend.
- Sind beide Kennzeichnungen `false`, ist `theme` optional.
- Die Vorschau zeigt bei gekennzeichneten Bildern das entsprechende Label aus `src/img/ki_labels/` links oben an.

---

## 2) Datei: `news.json`

Pfad: `src/data/news.json`

### 2.1 Zweck

Inhalte für den News-Bereich auf der Startseite.

### 2.2 Felder pro Eintrag

| Feld        | Typ       | Pflicht         | Beschreibung                                                                  |
|-------------|-----------|-----------------|-------------------------------------------------------------------------------|
| `title`     | `string`  | Ja (fachlich)   | Überschrift der News.                                                         |
| `date`      | `string`  | Ja (fachlich)   | Anzeige-Datum (`TT.MM.JJJJ`).                                                 |
| `text`      | `string`  | Ja (fachlich)   | News-Text.                                                                    |
| `image`     | `object`  | Optional        | Bildpfad. `./src/img/news/{Dateiname}`                                        |
| `publishAt` | `string`  | Nicht Empfholen | Start der Sichtbarkeit (`JJJJ-MM-TT-HH:mm`).                                  |
| `deleteAt`  | `string`  | Ja (Fachlich)   | Ende der Sichtbarkeit (`JJJJ-MM-TT-HH:mm`). 365 Tage nach `date`              |
| `links`     | `array`   | Optional        | Liste von Link-Objekten.                                                      |
| `large`     | `boolean` | Optional        | Größere Karten-Darstellung (`true`/`false`). Wenn Bild vorhanden, dann `true` |

### 2.3 `links`-Objekt

| Feld    | Typ      | Pflicht  | Beschreibung                                |
|---------|----------|----------|---------------------------------------------|
| `type`  | `string` | Optional | Linktyp (siehe globale Liste).              |
| `label` | `string` | Optional | Beschriftung/Aria-Label.                    |
| `url`   | `string` | Ja       | Ziel-URL (`https://...` oder `mailto:...`). |

### 2.4 Vorlage

```json
[
  {
    "title": "Auftritt beim Weinfrühling in Sandersdorf",
    "date": "11.04.2026",
    "publishAt": "2026-04-08-08:00",
    "deleteAt": "2026-05-15-23:59",
    "text": "Unsere Tanzgruppen ...",
    "image": { "src": "./src/img/veranstaltungenUndNews/weinfruehling.png", "ki": false, "teilweiseKi": false },
    "links": [
      {
        "type": "more",
        "label": "Mehr erfahren",
        "url": "https://example.org"
      },
      {
        "type": "instagram",
        "label": "Instagram",
        "url": "https://instagram.com/..."
      },
      {
        "type": "mail",
        "label": "E-Mail",
        "url": "mailto:info@skvonline.de"
      }
    ],
    "large": true
  }
]
```

---

## 3) Datei: `events.json`

Pfad: `src/data/events.json`

### 3.1 Zweck

Veranstaltungen für den Event-Bereich auf der Startseite.

### 3.2 Felder pro Eintrag

| Feld          | Typ      | Pflicht       | Beschreibung                                                             |
|---------------|----------|---------------|--------------------------------------------------------------------------|
| `title`       | `string` | Ja (fachlich) | Titel der Veranstaltung.                                                 |
| `date`        | `string` | Ja (fachlich) | Datum (`TT.MM.JJJJ`).                                                    |
| `time`        | `string` | Empfohlen     | Uhrzeit (z. B. `19:11 Uhr`).                                             |
| `einlass`     | `string` | Optional      | Einlasszeit.                                                             |
| `preis`       | `string` | Optional      | Preisangabe.                                                             |
| `location`    | `string` | Empfohlen     | Veranstaltungsort.                                                       |
| `description` | `string` | Optional      | Zusatzbeschreibung.                                                      |
| `image`       | `object` | Optional      | Bildpfad. `./src/img/events/{D-dateiname}`                               |
| `publishAt`   | `string` | Empfohlen     | Start Sichtbarkeit (`JJJJ-MM-TT-HH:mm`).                                 |
| `deleteAt`    | `string` | Ja (Fachlich) | Ende Sichtbarkeit (`JJJJ-MM-TT-HH:mm`). Tag der Veranstaltung 23:59 Uhr. |
| `links`       | `array`  | Optional      | Links analog zu News.                                                    |

### 3.3 Vorlage

```json
[
  {
    "title": "1. Lumpenball",
    "date": "14.11.2026",
    "publishAt": "2026-09-01-00:00",
    "deleteAt": "2026-11-15-00:00",
    "time": "19:11 Uhr",
    "einlass": "18:11 Uhr",
    "preis": "19,50 €",
    "location": "Mehrzweckhalle Sandersdorf",
    "image": { "src": "./src/img/veranstaltungenUndNews/lumpenball.png", "ki": false, "teilweiseKi": false },
    "links": [
      {
        "type": "maps",
        "label": "Maps",
        "url": "https://maps.app.goo.gl/..."
      },
      {
        "type": "mail",
        "label": "E-Mail",
        "url": "mailto:info@skvonline.de"
      }
    ]
  }
]
```

---

## 4) Datei: `vorstand.json`

Pfad: `./src/data/vorstand.json`

### 4.1 Zweck

Darstellung der Vorstandskarten.

### 4.2 Felder pro Eintrag

| Feld          | Typ             | Pflicht | Beschreibung                                      |
|---------------|-----------------|---------|---------------------------------------------------|
| `name`        | `string`        | Ja      | Name der Person.                                  |
| `role`        | `string`        | Ja      | Rolle/Funktion.                                   |
| `image`       | `object`        | Ja      | Bildpfad. `./src/img/verein/vorstand/{dateiname}` |
| `tags`        | `array<string>` | Ja      | Schlagworte (mind. 1 empfohlen).                  |
| `description` | `string`        | Ja      | Kurzbeschreibung.                                 |
| `socials`     | `array<object>` | Ja      | Kontakt-Links.                                    |

### 4.3 `socials`-Objekt

| Feld        | Typ      | Pflicht | Beschreibung                   |
|-------------|----------|---------|--------------------------------|
| `label`     | `string` | Ja      | Name des Kanals.               |
| `href`      | `string` | Ja      | Linkziel (`mailto:` oder URL). |
| `className` | `string` | Ja      | CSS-Klasse (z. B. `liEmail`).  |
| `icon`      | `string` | Ja      | Symboltext (z. B. `@`).        |

### 4.4 Vorlage

```json
[
  {
    "name": "Gerd Ritter",
    "role": "Präsident",
    "image": { "src": "./src/img/verein/vorstand/gerd-ritter.png", "ki": false, "teilweiseKi": false },
    "tags": [
      "Repräsentation",
      "Vereinsleitung"
    ],
    "description": "Verantwortet die grundlegende Ausrichtung des Vereins.",
    "socials": [
      {
        "label": "E-Mail",
        "href": "mailto:gerd.ritter@skvonline.de",
        "className": "liEmail",
        "icon": "@"
      }
    ]
  }
]
```

---

## 5) Datei: `elferrat.json`

Pfad: `src/data/elferrat.json`

### 5.1 Zweck

Mitgliederliste des Elferrats.

### 5.2 Felder pro Eintrag

| Feld    | Typ      | Pflicht | Beschreibung                     |
|---------|----------|---------|----------------------------------|
| `name`  | `string` | Ja      | Name des Mitglieds.              |
| `role`  | `string` | Ja      | Funktion/Rolle.                  |
| `image` | `object` | Ja      | Bildpfad.`./src/img/{dateiname}` |

### 5.3 Vorlage

```json
[
  {
    "name": "Stephan Brühl",
    "role": "Umzugsminister",
    "image": { "src": "./src/img/verein/elferrat/stephan-bruehl.svg", "ki": false, "teilweiseKi": false }
  }
]
```

---

## 6) Datei: `royals.json`

Pfad: `src/data/royals.json`

### 6.1 Zweck

Prinzenpaare für Galerie + Lightbox.

### 6.2 Felder pro Eintrag

| Feld        | Typ                               | Pflicht  | Beschreibung                        |
|-------------|-----------------------------------|----------|-------------------------------------|
| `session`   | `string`                          | Ja       | Session-Text (z. B. `47. Session`). |
| `year`      | `string`                          | Ja       | Jahrgang (z. B. `2025/2026`).       |
| `image`     | `object`                          | Optional | Bildpfad.                           |
| `adultPair` | `array<object>`/`object`/`string` | Ja       | Großes Prinzenpaar.                 |
| `childPair` | `array<object>`/`object`/`string` | Optional | Kinderprinzenpaar.                  |

Zusätzliche Legacy-Felder werden ebenfalls erkannt (`Session`, `jahr`, `grossesPP`, `kleinesPP`, ...), sollten für neue
Daten aber nicht verwendet werden.

### 6.3 Paar-Objekt (empfohlen)

```json
{
  "prince": "Dominik I.",
  "princess": "Lisa I."
}
```

### 6.4 Vorlage

```json
[
  {
    "session": "47. Session",
    "year": "2025/2026",
    "adultPair": [
      {
        "prince": "Dominik I.",
        "princess": "Lisa I."
      }
    ],
    "childPair": [
      {
        "prince": "Til I.",
        "princess": "Pauline I."
      }
    ]
  }
]
```

---

## 7) Datei: `linktree.json`

Pfad: `src/data/linktree.json`

### 7.1 Zweck

Links für die Linktree-Seite.

### 7.2 Felder pro Eintrag

| Feld   | Typ      | Pflicht  | Beschreibung                            |
|--------|----------|----------|-----------------------------------------|
| `icon` | `string` | Optional | Icon-Key, Standard: `website`.          |
| `text` | `string` | Ja       | Sichtbarer Linktext.                    |
| `url`  | `string` | Ja       | Ziel-URL oder relativer Pfad (`./...`). |

Unterstützte Icons:

- `website`
- `instagram`
- `facebook`
- `download`

### 7.3 Vorlage

```json
[
  {
    "icon": "website",
    "text": "Webseite",
    "url": "https://www.skvonline.de"
  },
  {
    "icon": "download",
    "text": "Anmeldung Umzug",
    "url": "./src/downloads/AnmeldungUmzugSandersdorf.pdf"
  }
]
```

---

## 8) Datei: `gallery-overview.json`

Pfad: `src/data/gallery-overview.json`

### 8.1 Zweck

Auflistung aller verfügbaren Galerien.

### 8.2 Felder pro Eintrag

| Feld        | Typ      | Pflicht  | Beschreibung                                                                                                                                                                      |
|-------------|----------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`      | `string` | Ja       | Anzuzeigender Name der Galerie im Frontend.                                                                                                                                       |
| `publishAt` | `string` | Optional | Start Sichtbarkeit (`JJJJ-MM-TT-HH:mm`).                                                                                                                                          |
| `deleteAt`  | `string` | Ja       | Ende Sichtbarkeit (`JJJJ-MM-TT-HH:mm`).                                                                                                                                           |
| `directory` | `string` | Ja       | Ordnername für die index.html und für die Bilder. Am Besten gibt es hier eine auswahlliste, die alle Ordner unter `/galerie/` liegen. Es ist aber auch jeder andere Text erlaubt. |


### 8.3 Vorlage

```json
[
  {
    "name": "Fasching 2026",
    "publishAt": "2026-05-04-10:00",
    "deleteAt": "2028-05-05-10:00",
    "directory": "fasching26"
  }
]
```

---

## 9) Datei: `gallerys/{xyz}.json`

Pfad: `src/data/gallerys/{xyz}.json`

### 9.1 Zweck

Bildauflistung für Galerien.

### 9.2 Felder pro Eintrag

| Feld  | Typ      | Pflicht  | Beschreibung                                      |
|-------|----------|----------|---------------------------------------------------|
| `image` | `object` | Ja       | Bildobjekt mit `src`, `ki`, `teilweiseKi` und optional `theme`. `./src/img/{xyz}/{dateiname}`           |
| `alt` | `string` | Optional | Alt-Text (Fallback: `Bild aus der Home-Gallery`). |

### 9.3 Vorlage

```json
[
  {
    "image": { "src": "./src/img/home-gallery/01.JPG", "ki": false, "teilweiseKi": false },
    "alt": "Titelbild"
  }
]
```

### 9.4 Erweiterte Funktionen im Galeriebereich

#### 9.4.1 Hinzufügen neuer Galerien

Es soll die Möglichkeit geben eine komplett neue Galerie (beispielsweise für ein vergangenes Event) anzulegen. Folgende
Informationen werden hierzu benötigt:

| Information      | Typ      | Pflicht | Beschreibung                         |
|------------------|----------|---------|--------------------------------------|
| Technischer Name | `string` | Ja      | Text für Dateinamen und Directorys   |
| Leserlicher Name | `string` | Ja      | Name, der im Frontend angezeigt wird | 

##### 9.4 1.1 Folgender Prozess muss durchlaufen werden:

1. Eingabe aller Pflichtinformationen
2. Generierung folgender Dateien und Ordner:
    + Ordner /galerie/<technischerName>
    + Datei /galerie/<technischerName>/index.html
    + Datei /src/data/gallerys/<technischerName>.json
    + Ordner /src/img/gallerys/<technischerName>
3. Preview der generierten Dateien
4. Möglichkeit zum Git Commit

##### 9.4.1.2 Templates für die zu generierenden Dateien

`/galerie/<technischerName>/index.html`

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>SKV | [LeserlicherName]</title>
    <meta name="description" content="Bildergalerie des Sandersdorfer Karnevalsverein e.V."/>
    <meta name="gallery-source" content="../../src/data/gallerys/[TechnischerName].json"/>
    <link rel="stylesheet" href="../../src/css/style.css"/>
    <link rel="stylesheet" href="../../src/css/gallery-detail.css"/>
    <link rel="icon" href="../../src/img/logo.png"/>
</head>
<body data-page="legal">
<div id="header-component"></div>

<main class="section legal-page">
    <section class="container legal-card">
        <h1>[LeserlicherName]</h1>
        <div id="gallery-grid" class="grid cards-3 gallery-grid" aria-live="polite"></div>
    </section>
</main>

<div id="footer-component"></div>

<div id="gallery-lightbox" class="gallery-lightbox" aria-hidden="true">
    <button type="button" class="gallery-lightbox-backdrop" id="gallery-lightbox-backdrop"
            aria-label="Vorschau schließen"></button>
    <div class="gallery-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Bildvorschau">
        <div class="gallery-lightbox-frame">
            <img id="gallery-lightbox-image" class="gallery-lightbox-image" src="" alt=""/>
            <p id="gallery-lightbox-caption" class="gallery-lightbox-caption"></p>
        </div>
        <div class="gallery-lightbox-controls">
            <button type="button" class="gallery-lightbox-nav" id="gallery-lightbox-prev" aria-label="Vorheriges Bild">
                ◀
            </button>
            <button type="button" class="gallery-lightbox-close" id="gallery-lightbox-close"
                    aria-label="Vorschau schließen">Schließen
            </button>
            <button type="button" class="gallery-lightbox-nav" id="gallery-lightbox-next" aria-label="Nächstes Bild">▶
            </button>
        </div>
    </div>
</div>

<script src="../../src/js/gallery-detail.js"></script>
<script src="../../src/js/script.js"></script>
</body>
</html>
```

`/src/data/gallerys/<technischerName>.json`

```json
[]
```

#### 9.4.2 Löschen von Galerien

Folgender Prozess ist zu durchlaufen:

1. Eingabe des technischen Namens der Galerie
2. Löschung folgender Dateien und Ordner:
    + Ordner /galerie/<technischerName>
    + Datei /galerie/<technischerName>/index.html
    + Datei /src/data/gallerys/<technischerName>.json
    + Ordner /src/img/gallerys/<technischerName> (Inklusive aller Dateien, die im Ordner liegen)
3. Preview aller zu löschenden Dateien
4. Möglichkeit zum Git Commit. NAch erfolgreichem Git Commit soll noch folgender Hinweis angezeigt werden: `Bitte kontrollieren sie, dass die eben gelöscht Galerie "<technischerName>" nicht mehr in der gallery-overview angegeben ist.`

---

## 10) Datei: `header-notices.json`

Pfad: `./src/data/header-notices.json`

### 10.1 Zweck

Wichtige Hinweise für das **rote Hinweisband im Header** (ganz oben auf jeder Seite).

### 10.2 Felder pro Eintrag

| Feld        | Typ      | Pflicht                                                                 | Beschreibung                                                               |
|-------------|----------|-------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `text`      | `string` | Ja                                                                      | Hinweistext, der im Band angezeigt wird.                                   |
| `countdown` | `string` | Optional                                                                | Zielzeitpunkt (`JJJJ-MM-TT-HH:mm`) für einen Live-Countdown hinter `text`. |
| `publishAt` | `string` | Optional                                                                | Start Sichtbarkeit (`JJJJ-MM-TT-HH:mm`).                                   |
| `deleteAt`  | `string` | Wenn `countdown`, dann das Datum vom Countdown, sonst trotzdem Pflicht. | Ende Sichtbarkeit (`JJJJ-MM-TT-HH:mm`).                                    |

### 10.3 Countdown-Regeln

- Wenn Restzeit **>= 1 Tag**: Anzeige in `Tage`, `Stunden`, `Minuten`
- Wenn Restzeit **< 1 Tag**: Anzeige in `Stunden`, `Minuten`, `Sekunden`
- Ist `countdown` gesetzt, sollte `deleteAt` identisch oder später als `countdown` sein.
- Läuft der Countdown ab, wird der komplette Hinweis sofort entfernt.
- Hinweise im Band werden visuell durch `+++` getrennt.

### 10.4 Vorlage

```json
[
  {
    "text": "xyz",
    "countdown": "2026-05-09-16:30",
    "publishAt": "2026-04-18-15:00",
    "deleteAt": "2026-05-09-16:30"
  }
]
```

---

# 11) Datei: `downloads.json`

Pfad: `./src/data/downloads.json`

## 11.1 Zweck

Alle Dateidownloads, die auf der Downloadseite angezeigt werden.

## 11.2 Felder pro Eintrag

| Feld          | Typ      | Pflicht   | Beschreibung                             |
|---------------|----------|-----------|------------------------------------------|
| `title`       | `string` | Ja        | Name des Downloads                       |
| `description` | `string` | Empfohlen | Beschreibt den Inhalt des Dokuments      |
| `file`        | `string` | Ja        | Dateipfad. `./src/downloads/{dateiname}` |
| `label`       | `string` | Ja        | Buttontext                               |

## 11.3 Vorlage

```json
[
  {
    "title": "Anmeldung Umzug Sandersdorf",
    "description": "Anmeldeformular für den Umzug in Sandersdorf.",
    "file": "./src/downloads/AnmeldungUmzugSandersdorf.pdf",
    "label": "PDF herunterladen"
  }
]
```

---

## 12) Checkliste vor dem Speichern

1. JSON ist syntaktisch valide.
2. Top-Level ist ein Array.
3. Pflichtfelder pro Dateityp sind befüllt.
4. Datumsformate stimmen (`TT.MM.JJJJ` bzw. `JJJJ-MM-TT-HH:mm`).
5. Alle Bildpfade/URLs existieren bzw. sind erreichbar.
6. Bei `links`: Jeder Eintrag hat mindestens `url`.
7. `publishAt` liegt zeitlich vor `deleteAt` (wenn beide gesetzt).

---

## 13) Minimale Komplettbeispiele (alle Dateien)

### `news.json`

```json
[
  {
    "title": "Beispielnews",
    "date": "01.01.2027",
    "text": "Text der News",
    "publishAt": "2026-12-01-00:00",
    "deleteAt": "2027-01-31-23:59",
    "links": [
      {
        "type": "more",
        "label": "Mehr",
        "url": "https://example.org"
      }
    ]
  }
]
```

### `events.json`

```json
[
  {
    "title": "Beispielveranstaltung",
    "date": "11.11.2026",
    "time": "11:11 Uhr",
    "location": "Rathaus",
    "publishAt": "2026-10-01-00:00",
    "deleteAt": "2026-11-12-00:00"
  }
]
```

### `vorstand.json`

```json
[
  {
    "name": "Max Mustermann",
    "role": "Präsident",
    "image": { "src": "src/img/verein/vorstand/max-mustermann.png", "ki": false, "teilweiseKi": false },
    "tags": [
      "Leitung"
    ],
    "description": "Kurztext",
    "socials": [
      {
        "label": "E-Mail",
        "href": "mailto:max@example.org",
        "className": "liEmail",
        "icon": "@"
      }
    ]
  }
]
```

### `elferrat.json`

```json
[
  {
    "name": "Erika Muster",
    "role": "Programm",
    "image": { "src": "./src/img/verein/elferrat/erika-muster.svg", "ki": false, "teilweiseKi": false }
  }
]
```

### `royals.json`

```json
[
  {
    "session": "48. Session",
    "year": "2026/2027",
    "adultPair": [
      {
        "prince": "Max I.",
        "princess": "Mia I."
      }
    ]
  }
]
```

### `linktree.json`

```json
[
  {
    "icon": "website",
    "text": "Webseite",
    "url": "https://example.org"
  }
]
```

### `gallerys/home-gallery.json`

```json
[
  {
    "image": { "src": "./src/img/home-gallery/01.JPG", "ki": false, "teilweiseKi": false },
    "alt": "Titelbild"
  }
]
```

### `gallerys/sponsors.json`

```json
[
  {
    "image": { "src": "./src/img/sponsors/sponsor.png", "ki": false, "teilweiseKi": false },
    "alt": "Sponsorname"
  }
]
```

### `header-notices.json`

```json
[
  {
    "text": "Vorverkauf endet in:",
    "countdown": "2026-04-19-15:18",
    "publishAt": "2026-01-01-00:00",
    "deleteAt": "2026-04-19-15:18"
  }
]
```

### `downloads-json`

```json
[
  {
    "title": "Anmeldung Umzug Sandersdorf",
    "description": "Anmeldeformular für den Umzug in Sandersdorf.",
    "file": "./src/downloads/AnmeldungUmzugSandersdorf.pdf",
    "label": "PDF herunterladen"
  }
]
```

---

## 12) Datei: `faq.json`

Pfad: `./src/data/faq.json`

### 12.1 Zweck

Kategorisierte Fragen und Antworten für die FAQ-Seite.

### 12.2 Felder pro Kategorie

| Feld       | Typ             | Pflicht | Beschreibung                         |
|------------|-----------------|----------|--------------------------------------|
| `kategorie` | `string`        | Ja       | Überschrift der FAQ-Kategorie.       |
| `fragen`    | `array<object>` | Ja       | Mindestens eine Frage der Kategorie. |

### 12.3 Felder pro Frage

| Feld           | Typ             | Pflicht | Beschreibung                                      |
|----------------|-----------------|----------|---------------------------------------------------|
| `frage`        | `string`        | Ja       | Angezeigte Frage.                                 |
| `antwort`      | `string`        | Ja       | Antwort als HTML-Text.                            |
| `stichwoerter` | `array<string>` | Ja       | Kommagetrennt eingegebene Such- und Filterbegriffe. |

Die Antwort wird im Eintragsformular gerendert dargestellt. Über **HTML bearbeiten** öffnet sich ein kleiner Editor mit
Syntaxhervorhebung. Die Werkzeugleiste fügt vollständige `<p>`-, `<ul>`-, `<ol>`-, `<li>`- und `<a>`-Elemente an der
Cursorposition ein; bei Links wird vorher das `href` abgefragt. Beim Öffnen wird der HTML-Code automatisch eingerückt.
Mit **Autoformat** kann die Formatierung nach weiteren Änderungen jederzeit erneut angewendet werden.

### 12.4 Vorlage

```json
[
  {
    "kategorie": "Kartenverkauf",
    "fragen": [
      {
        "frage": "Wo finde ich Informationen zum Kartenverkauf?",
        "antwort": "<p>Alle Informationen zum Kartenverkauf findest du in unserem separaten FAQ.</p>",
        "stichwoerter": [
          "Tickets",
          "Kontakt"
        ]
      }
    ]
  }
]
```

---

## 13) Dateien: `faqs/{xyz}.json`

Pfad: `./src/data/faqs/{xyz}.json`

### 13.1 Zweck

Eigenständige, themenspezifische FAQ-Dateien. Der technische Dateiname wird im Generator wie bei
`gallerys/{xyz}.json` vor dem Laden oder Bearbeiten bestätigt.

### 13.2 Felder pro Eintrag

| Feld      | Typ      | Pflicht | Beschreibung           |
|-----------|----------|----------|------------------------|
| `frage`   | `string` | Ja       | Angezeigte Frage.      |
| `antwort` | `string` | Ja       | Antwort als HTML-Text. |

### 13.3 Vorlage

```json
[
  {
    "frage": "Wie bekomme ich Karten für eure Veranstaltungen?",
    "antwort": "<p>Informationen zur Kartenvorbestellung und zum freien Verkauf findet ihr hier.</p>"
  }
]
```

### 13.4 Neues Spezial-FAQ anlegen

Wird beim Online-Laden ein noch nicht vorhandener FAQ-Dateiname verwendet, bietet der Generator an, das Spezial-FAQ
anzulegen. Dabei werden die Inhalte für kurze Überschrift, FAQ-Titel, Einleitung, JSON-Pfad, Abschlussüberschrift und
Abschlusstext abgefragt. Anschließend wird `src/data/faqs/vorlage_faq.html` geladen und zusammen mit einer zunächst
leeren JSON-Datei in einem Commit als folgende Dateien angelegt:

- `faq/{xyz}/index.html`
- `src/data/faqs/{xyz}.json`
