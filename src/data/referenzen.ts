/**
 * Referenzprojekte.
 *
 * ── AUSZUFÜLLEN ───────────────────────────────────────────────────────────
 * Bewusst leer. Es gibt reale Kundenarbeit, aber weder Projektnamen noch
 * Kennzahlen oder Logos liegen vor — und erfundene Referenzen sind auf einer
 * B2B-Seite der teuerste mögliche Fehler.
 *
 * Sobald hier Einträge stehen, erscheinen automatisch:
 *   1. die Sektion „Referenzen“ auf der Startseite
 *   2. der Hero-Button „Projekte ansehen“
 * Bei leerem Array wird beides nicht gerendert. Nichts weiter zu tun.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type Referenz = {
  kunde: string;
  /** Was gebaut wurde, in einem Satz ohne Marketing. */
  aufgabe: string;
  /** Nur belegbare Ergebnisse. Keine geschätzten Prozentwerte. */
  ergebnis: string;
  stack: string[];
  jahr: string;
  /** Optional: Link zum Projekt. */
  href?: string;
};

export const referenzen: Referenz[] = [];
