/**
 * Die drei Gründer.
 *
 * ── AUSZUFÜLLEN ───────────────────────────────────────────────────────────
 * 1. `name` ist leer. Namen echter Personen werden nicht erfunden — sobald
 *    ihr sie einsetzt, erscheinen sie automatisch über dem Fokus.
 *
 * 2. `bild` zeigt auf Platzhalter aus Unsplash. Ersetzt die drei Dateien in
 *    `public/images/` durch eure eigenen Porträts (Hochformat 4:5, mind.
 *    900×1125 px) — die Dateinamen können bleiben, dann ändert sich am Code
 *    nichts. Herkunft der Platzhalter: public/images/HERKUNFT.md
 * ──────────────────────────────────────────────────────────────────────────
 */

export type Gruender = {
  /** Vollständiger Name. Leer lassen, bis er gesetzt werden darf. */
  name: string;
  fokus: string;
  /** Was diese Person im Projekt tatsächlich verantwortet. */
  arbeit: string;
  bild: string;
  /** Alt-Text. Beschreibt die Person, sobald der Name feststeht. */
  alt: string;
};

export const gruender: Gruender[] = [
  {
    name: '',
    fokus: 'Verteilte Systeme',
    arbeit: 'Baut das Backend und hält es im Betrieb stabil.',
    bild: '/images/team-1.jpg',
    alt: 'Porträt — Gründer, Fokus verteilte Systeme',
  },
  {
    name: '',
    fokus: 'Applied Machine Learning',
    arbeit: 'Baut die KI-Workflows und prüft, ob sie richtig liegen.',
    bild: '/images/team-2.jpg',
    alt: 'Porträt — Gründerin, Fokus Applied Machine Learning',
  },
  {
    name: '',
    fokus: 'Web Design & Frontend',
    arbeit: 'Gestaltet die Oberfläche und setzt sie selbst um.',
    bild: '/images/team-3.jpg',
    alt: 'Porträt — Gründer, Fokus Web Design und Frontend',
  },
];
