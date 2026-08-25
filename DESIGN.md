---
name: leam
description: Papierweißer Grund über einem ruhenden Punktraster, Haarlinien als einziges Gliederungsmittel, ein gedecktes Indigo.
colors:
  ground: "#fbfbfc"
  paper: "#ffffff"
  tint: "#f6f6f8"
  tint-2: "#f1f1f4"
  rule: "#e4e4e7"
  rule-strong: "#d4d4d8"
  ink: "#09090b"
  ink-2: "#3f3f46"
  ink-3: "#52525b"
  ink-4: "#71717a"
  accent: "#3f4a8a"
  accent-deep: "#2e3768"
  accent-wash: "#f3f4f9"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.375rem, 1.1rem + 3.6vw, 4rem)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  section:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.1rem + 2.6vw, 3.25rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  subhead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.1rem + 1.1vw, 2.125rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 0.98rem + 0.35vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  ui:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  mono-sm:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.04em"
  tech-label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.08em"
  tech-label-xs:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.5625rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.1em"
  tech-label-sm:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.1em"
rounded:
  none: "0px"
  hairline: "1px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "40px"
  xl: "64px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  chip-mono:
    backgroundColor: "transparent"
    textColor: "{colors.ink-3}"
    typography: "{typography.tech-label}"
    rounded: "{rounded.none}"
    padding: "4px 10px"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 0 10px 0"
  cursor-ring:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    rounded: "{rounded.none}"
    size: "26px"
---

# Design System: leam

## Overview

Die Seite ist ein **Spezifikationsblatt, das atmet**. Die Struktur kommt
ausschließlich aus 1px-Haarlinien: keine Schatten, keine Rundungen, keine
Füllflächen als Gliederung. Weil jede Sektion gegen dieselben Gutter rastert,
stapeln sich diese Linien über die ganze Seite zu einem durchgehenden Raster.

Hinter allem liegt ein **statisches Punktraster** auf Canvas, fest im
Viewport. Es bewegt sich nicht. Der Hintergrund ist Papier, kein
Bildschirmschoner — Bewegung gibt es an genau zwei Stellen, und beide sind
inhaltlich begründet: das Signet im Hero und der Globus. Darüber fährt ein
eigener Zeiger in Form einer Passermarke.

Farbe ist **eine einzige gedeckte Indigo-Note**. Sie markiert genau eine Sache:
was anklickbar, aktiv oder gerade in Bewegung ist. Alles andere ist Tinte auf
Papier. Ein greller Akzent wurde ausdrücklich verworfen — die Farbe soll
Orientierung geben, nicht um Aufmerksamkeit rufen.

Der Text ist knapp, aber nie stichwortartig. Jede Zeile ist ein ganzer Satz mit
Stimme; die Kürze entsteht durch Weglassen von Absätzen, nicht durch Weglassen
von Verben.

## Colors

### Primary

`accent #3f4a8a` — gedecktes Indigo. Trägt: primäre Buttons, die zweite
Titelzeile, aktive Formularzustände, Fokusringe, Icons, den eigenen Zeiger,
die Fortschrittslinie und die gezogenen Kanten im Punktfeld. Nichts sonst.

`accent-deep #2e3768` für gedrückte Zustände, `accent-wash #f3f4f9` als
Hover-Fläche auf Zeilen.

### Neutral

| Token | Wert | Verwendung |
|---|---|---|
| `ground` | `#fbfbfc` | Grund der Seite. Kein reines Weiß. |
| `paper` | `#ffffff` | Text auf Akzentflächen; reine Weißkante. |
| `tint` | `#f6f6f8` | Ruhende Fläche, Konsolen-Titelleiste. |
| `rule` | `#e4e4e7` | **Die Haarlinie.** Jede Trennung auf der Seite. |
| `rule-strong` | `#d4d4d8` | Sekundärrahmen, Scrollbar, Feld im Ruhezustand. |
| `ink` | `#09090b` | Überschriften, Fließtext-Schwarz. |
| `ink-2` | `#3f3f46` | Betonter Text, Fehlermeldungen. |
| `ink-3` | `#52525b` | Standard-Fließtext (7,6:1). |
| `ink-4` | `#71717a` | Labels, Meta, Platzhalter (4,8:1 — Untergrenze). |

### Named Rules

**Die Ein-Linien-Regel.** Jede Trennung ist genau 1px und genau `rule`. Soll
eine Grenze stärker wirken, wird nicht die Linie dicker, sondern der Abstand
größer.

**Der Akzent hat genau eine Bedeutung.** Indigo heißt: hier kann man etwas tun,
oder hier bewegt sich gerade etwas. Er wird nie dekorativ gesetzt und nie für
Fehler benutzt.

**Fehler ohne Farbe.** Fehlerzustände tragen `ink` als Rahmen und eine
vollständige Textmeldung in `ink-2`. Nie Rot, nie nur eine Markierung.

## Typography

Zwei Schnitte mit klar getrennter Zuständigkeit:

- **Geist Sans** trägt alles, was gelesen wird.
- **Geist Mono** trägt ausschließlich, was gemessen oder benannt wird:
  Pipeline-Stufen, Schicht-Labels, Feld-Prompts, Versionen, die Live-Ausgabe im
  Hero. Mono ist Auszeichnung, nie Kostüm.

### Hierarchy

`display` (max. 4rem) → `section` → `subhead` → `lead` → `title` → `body` →
`body-sm` → `ui` → `mono-sm` → `tech-label` → `tech-label-sm` → `tech-label-xs`.
(Die beiden kleinsten Mono-Stufen tragen nur Beschriftungen im Signet und in
der Kopfleiste, nie Fließtext.)

Die Display-Obergrenze liegt bewusst bei 4rem statt am 6rem-Deckel: der Titel
ist zwei ganze Sätze lang, und bei 6rem bricht er auf vier Zeilen und schiebt
den CTA aus dem ersten Bild.

### Named Rules

**Tracking sinkt mit der Größe.** Ab `subhead` aufwärts negativ, Boden
`-0.04em`. Fließtext bleibt `normal`.

**Zahlen stehen untereinander.** Jeder Mono-Kontext setzt `tabular-nums`.

**Maß halten.** Fließtext läuft nie über ~65 Zeichen; Absätze tragen ein
explizites `max-w-[38ch]` bis `[46ch]`.

## Layout

Ein Container (`.shell`, max. `90rem`), Gutter 1,25rem → 2,5rem (768px) → 4rem
(1280px). Alles rastert dagegen, damit die Haarlinien fluchten.

Sektionen tragen denselben Kopf: Überschrift links über 7 von 12 Spalten,
Erläuterung rechts über 5, darunter eine Haarlinie zum Inhalt.

Die Leistungs-Bento steht **6/6**: Frontend und KI-Automatisierung sind
gleichrangige Standbeine und bekommen gleich viel Fläche.

**Gleiche Zellen, gleiche Bilder.** Wo eine Spaltenreihe Medien trägt, bekommen
alle Zellen dieselbe Polsterung und der Container zieht sich mit negativem
Rand an die Gutter (`md:-mx-7` + `md:px-7`). Erste/letzte Zelle von der
Polsterung auszunehmen erzeugt eine schmalere Mitte — genau dieser Fehler ist
im Build einmal aufgetreten.

Breakpoints: 640 / 768 / 1024 / 1280. Ab 768px Desktop-Navigation und
dreispaltiges Team, darunter Panel hinter dem Mono-Schalter `MENÜ`.

## Elevation & Depth

**Keine Erhebung.** Kein `box-shadow` auf der Seite. Tiefe entsteht aus
Linienstärke, Flächenwert und Abstand — und aus der Parallaxe zwischen dem
festen Punktfeld und dem scrollenden Inhalt.

Ausnahme: die Kopfleiste (`bg-ground/85` + `backdrop-blur-md`), damit Inhalt
sichtbar darunter durchläuft. Funktion, nicht Dekoration.

## Shapes

`border-radius: 0` überall — Buttons, Felder, Chips, Zellen, Konsolenfenster,
und auch der eigene Zeiger. Ausnahmen: `1px` am Fokusring, `999px` für
Scrollbar-Daumen und den 1,5px-Statuspunkt.

Wiederkehrende Form: der **wachsende Strich** — ein 1px-Balken, der bei Hover
von `w-5` auf `w-9` läuft. Er ersetzt den Pfeil-Icon-Reflex.

## Components

### Buttons

Primär: Fläche `accent`, Text `paper`, 1px-Rahmen `accent`, kein Radius. Hover
**invertiert** auf transparent mit Akzenttext. Sekundär: Rahmen `rule-strong`,
bei Hover `accent`. Beide tragen rechts den wachsenden Strich. Deaktiviert:
`ink-4` mit `paper` (4,8:1).

### Chips

Nur Mono, 1px-Rahmen `rule`, kein Radius, keine Fläche.

### Cards / Containers

Zellen ohne eigenen Rahmen — begrenzt von den Rasterlinien der Nachbarn
(`border-r` / `border-b` nach Position). Keine verschachtelten Karten.
Hover legt `tint` oder `accent-wash` darunter; Stack-Zellen bekommen zusätzlich
eine Akzentlinie über die Oberkante und einen schwachen radialen Schein
(`rgba(63,74,138,0.08)`), der dem Zeiger folgt.

### Inputs / Fields

Unterstrichene Felder ohne Kasten: `rule` → Hover `rule-strong` → Fokus
`accent`. Label in Mono mit vorangestelltem `>`. Fehler setzt `aria-invalid`,
Unterlinie auf `ink` und eine vollständige Meldung darunter. Validierung läuft
erst nach dem ersten Absendeversuch live mit.

### Navigation

Kopfleiste 64px, klebend, Haarlinie unten, darunter die Fortschrittslinie in
`accent` (`scaleX` an die Scrollposition gebunden). Desktop-Links tragen einen
Unterstrich, der von rechts einläuft. Mobil ersetzt ein Mono-Schalter im
Klartext (`MENÜ` / `SCHLIESSEN`) das Hamburger-Icon.

### Das Punktraster

32px-Raster auf Canvas, `position: fixed` hinter der ganzen Seite, Punktradius
0,95px in `rgba(113,113,122,0.22)`. **Ohne jede Bewegung** — einmal gezeichnet,
danach nur bei Größenänderung neu. Kein `requestAnimationFrame`.

### Signature — Der eigene Zeiger

Eine **Passermarke**: vier 10px-Striche mit echter Lücke in der Mitte, wie sie
im Druck den Registerstand anzeigt. Kein Kreis, kein gefüllter Block. Zieht mit
exponentieller Annäherung (0,18) nach, dazu ein 3px-Tintenpunkt exakt auf der
Position. Über Anklickbarem dreht sich die Marke auf 45° und öffnet sich auf
54px; über Textfeldern bleibt nur die Senkrechte als Setzmarke.

Nur bei `(hover: hover) and (pointer: fine)`. Touch, Fensterwechsel und
`prefers-reduced-motion` geben den Systemzeiger zurück.

### Signature — Das Signet im Hero

Drei Module am Fuß des Hero, die zeigen, was das Studio tatsächlich tut:
**Interface** (ein Wireframe baut sich Block für Block auf), **Logik** (Zeilen
werden getippt, mit blinkender Setzmarke), **Automation** (ein Signal läuft
über `offset-path` durch eine Knotenkette). Ein gemeinsamer Takt von 9 s, jedes
Modul 3 s versetzt, sodass die Bewegung sichtbar von links nach rechts wandert.
Reines SVG plus CSS-Keyframes, kein Skript. Unter `prefers-reduced-motion`
steht der fertige Zustand.

### Signature — Der Globus

Eine Erdkugel aus denselben Punkten wie der Hintergrund, orthographisch
projiziert, von Hand gerechnet. Scrollgesteuert in vier Phasen: wachsen,
Europa nach vorn drehen, hineinzoomen, DACH markieren.

Zwei Detailstufen: eine Weltmaske mit 1,5° und eine Europamaske mit 0,4°, die
beim Zoom überblendet und echte Ländergrenzen für DE/AT/CH trägt. Beide werden
zur Bauzeit erzeugt (`scripts/build-landmask.mjs`, Quelle: world-atlas) und
liegen als Bitmaske in base64 — zusammen ~8 kB statt hunderter kB GeoJSON.

**Die grobe Maske wird nie ganz ausgeblendet** und die feine federt an ihren
Rändern aus; sonst endet die Regionalmaske als gerade Kante im Nichts.
Beschriftungen (`DACH`, `GRAZ`) stehen auf freigestellten Flächen, sonst liegen
sie unlesbar im Punktraster.

### Aufklapper

Natives `<details>` mit gestyltem `<summary>` — funktioniert ohne Skript und
wird von der Tastatur bedient. Das Pluszeichen ist aus zwei 1px-Strichen
gebaut, kein Glyph; beim Öffnen fährt die Senkrechte auf 0.

**Symmetrieregel:** Wo zwei Blöcke nebeneinander dieselbe Rolle haben, tragen
sie denselben Aufbau und dieselbe Anzahl sichtbarer Zeilen. Das Detail-Artefakt
liegt bei beiden hinter dem Aufklapper, damit die Sektion eingeklappt in beiden
Spalten exakt gleich hoch ist (gemessen: 814/814 px, aufgeklappt 1146/1146 px).

### Motion

Drei Bewegungen, mehr nicht:

1. **Titel wortweise** — jedes Wort läuft hinter einer Kante hervor,
   translateY(110%) → 0 mit Unschärfe 5px → 0, versetzt um 65ms.
2. **`.rise`** — Abschnitte steigen einmal auf (20px, blur 6px, 900ms),
   Beobachter meldet sich danach ab.
3. **Das Signet** — läuft dauerhaft in seinem 9-Sekunden-Takt.
4. **Der Globus** — läuft nur, solange seine Sektion im Blick ist.

Der Hintergrund bewegt sich nicht.

Alle mit `cubic-bezier(0.16, 1, 0.3, 1)`. Zustandswechsel 300ms, Gesten 500ms.

## Do's and Don'ts

### Do:

- Trenne mit 1px `rule`; brauchst du mehr Trennung, nimm mehr Abstand.
- Setze den Akzent nur dort, wo etwas anklickbar, aktiv oder in Bewegung ist.
- Setze Mono nur für echte Messgrößen, Stufen und Kennungen.
- Schreib ganze Sätze mit Stimme — kurz heißt weniger Sätze, nicht Stichworte.
- Gib jedem Zustand eine nicht-farbliche Auszeichnung.
- Halte Frontend und KI-Automatisierung gleichrangig — gleiche Fläche, gleicher
  Aufbau, gleiche Zeilenzahl. Überlänge kommt hinter den Aufklapper.
- Lass unbelegte Zahlen offen — leere Datenfelder blenden ihre Sektion aus.

### Don't:

- Kein `box-shadow`, kein `border-radius`, kein Verlauf als Fläche.
- Keine zweite Farbe, und kein greller Akzent — die Farbe orientiert, sie ruft nicht.
- Keine Bewegung im Hintergrund. Bewegung braucht einen inhaltlichen Grund;
  ohne den bleibt es ein statisches Raster.
- Keine Karte mit eigenem Rahmen, keine Karte in einer Karte.
- Kein Icon-plus-Überschrift-plus-Text-Raster als Seitenstruktur.
- Keine erfundenen Zahlen, Logos, Testimonials oder Auszeichnungen.
  „Awwwards-Niveau" beschreibt den Anspruch, nie einen erhaltenen Preis.

### Nicht kanonisiert

Geist Sans / Geist Mono werden vom Slop-Detektor als „overused font" gemeldet.
Das ist eine Vorgabe aus dem Briefing und gilt für dieses Projekt — es ist
keine Empfehlung für andere.
