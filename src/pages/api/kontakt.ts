/**
 * Kontaktformular → Resend.
 *
 * Einzige Route mit prerender = false: sie läuft im Worker, der Rest der
 * Seite bleibt statisches Asset. Nötige Variablen im Worker:
 *
 *   RESEND_API_KEY  Secret aus dem Resend-Dashboard.
 *   KONTAKT_MAIL    Empfänger, z. B. hallo@l3am.dev.
 *   RESEND_FROM     Absender auf einer bei Resend verifizierten Domain.
 *
 * Bewusst ohne resend-SDK: die REST-Schnittstelle ist ein einziger
 * fetch-Aufruf, und was nicht im Worker-Bundle liegt, kann dort auch nicht
 * brechen.
 */
import type { APIRoute } from 'astro';
// Seit Astro 6 gibt es Astro.locals.runtime.env nicht mehr; die Variablen des
// Workers kommen aus diesem Modul — unter `astro dev` befüllt der
// platformProxy sie aus .dev.vars.
import { env } from 'cloudflare:workers';

export const prerender = false;

const RESEND_URL = 'https://api.resend.com/emails';
const MAX_BODY = 16 * 1024;
const UMFAENGE = new Set(['web', 'ki', 'beides']);
const LIMIT = { name: 120, email: 200, nachricht: 4000 } as const;

type Feld = 'name' | 'email' | 'umfang' | 'nachricht';

/** Serverseitig identisch zur Prüfung im Browser — die dort ist nur Komfort. */
const REGELN: Record<Feld, (v: string) => string> = {
  name: (v) =>
    v.length < 2
      ? 'Bitte gib deinen Namen ein (mindestens 2 Zeichen).'
      : v.length > LIMIT.name
        ? 'Der Name ist zu lang.'
        : '',
  email: (v) =>
    v.length > LIMIT.email
      ? 'Die E-Mail-Adresse ist zu lang.'
      : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
        ? ''
        : 'Diese E-Mail-Adresse ist unvollständig — bitte prüfe sie noch einmal.',
  umfang: (v) => (UMFAENGE.has(v) ? '' : 'Bitte wähle aus, worum es geht: Web, KI oder beides.'),
  nachricht: (v) =>
    v.length < 20
      ? 'Beschreib es bitte in ein bis zwei Sätzen — ab etwa 20 Zeichen können wir etwas damit anfangen.'
      : v.length > LIMIT.nachricht
        ? 'Die Nachricht ist zu lang. Bitte kürz sie auf 4000 Zeichen.'
        : '',
};

/**
 * Zeilenumbrüche raus, bevor etwas in Betreff oder Absendernamen wandert:
 * sonst hängt jemand über das Namensfeld eigene Kopfzeilen an die Mail.
 */
const einzeilig = (v: string) => v.replace(/[\r\n]+/g, ' ').trim();

const antwort = (daten: unknown, status: number) =>
  new Response(JSON.stringify(daten), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

function umgebung() {
  const laufzeit = env as unknown as Record<string, string | undefined>;
  const lies = (name: string) =>
    laufzeit[name] ?? (import.meta.env[name] as string | undefined);
  return {
    schluessel: lies('RESEND_API_KEY'),
    empfaenger: lies('KONTAKT_MAIL') ?? 'hallo@l3am.dev',
    absender: lies('RESEND_FROM') ?? 'leam Website <formular@l3am.dev>',
  };
}

export const POST: APIRoute = async ({ request, url }) => {
  // Nur eigene Seite: blockt das simple Absenden von fremden Formularen.
  const herkunft = request.headers.get('origin');
  if (herkunft && herkunft !== url.origin) {
    return antwort({ meldung: 'Ungültige Herkunft.' }, 403);
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return antwort({ meldung: 'Erwartet wird JSON.' }, 415);
  }

  const roh = await request.text();
  if (roh.length > MAX_BODY) {
    return antwort({ meldung: 'Die Anfrage ist zu groß.' }, 413);
  }

  let eingang: Record<string, unknown>;
  try {
    eingang = JSON.parse(roh);
  } catch {
    return antwort({ meldung: 'Die Anfrage war nicht lesbar.' }, 400);
  }

  const text = (name: string) =>
    typeof eingang[name] === 'string' ? (eingang[name] as string).trim() : '';

  // Honigtopf: still mit Erfolg antworten, damit der Bot nichts dazulernt.
  if (text('firma')) return antwort({ ok: true }, 200);

  const daten = {
    name: einzeilig(text('name')),
    email: einzeilig(text('email')),
    umfang: text('umfang'),
    nachricht: text('nachricht'),
  };

  const fehler: Partial<Record<Feld, string>> = {};
  for (const feld of Object.keys(REGELN) as Feld[]) {
    const meldung = REGELN[feld](daten[feld]);
    if (meldung) fehler[feld] = meldung;
  }
  if (Object.keys(fehler).length) {
    return antwort({ meldung: 'Bitte die markierten Felder prüfen.', fehler }, 400);
  }

  const { schluessel, empfaenger, absender } = umgebung();
  if (!schluessel) {
    console.error('[kontakt] RESEND_API_KEY fehlt — Mail wurde nicht gesendet.');
    return antwort({ meldung: 'Der Versand ist gerade nicht verfügbar.' }, 503);
  }

  const koerper = [
    `Name:    ${daten.name}`,
    `E-Mail:  ${daten.email}`,
    `Umfang:  ${daten.umfang}`,
    '',
    daten.nachricht,
    '',
    '—',
    `Gesendet über ${url.origin}`,
  ].join('\n');

  try {
    const gesendet = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${schluessel}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: absender,
        to: [empfaenger],
        reply_to: daten.email,
        subject: `Projektanfrage (${daten.umfang}) — ${daten.name}`,
        // Nur Text: nichts, was der Absender schreibt, wird je als Markup
        // interpretiert.
        text: koerper,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!gesendet.ok) {
      // Antwort von Resend mitloggen, aber niemals an den Browser geben.
      console.error('[kontakt] Resend', gesendet.status, await gesendet.text());
      return antwort({ meldung: 'Das Senden hat nicht geklappt.' }, 502);
    }
  } catch (fehlschlag) {
    console.error('[kontakt] Netzwerkfehler', fehlschlag);
    return antwort({ meldung: 'Das Senden hat nicht geklappt.' }, 502);
  }

  return antwort({ ok: true }, 200);
};

/** Alles außer POST sauber abweisen, statt 404 zu liefern. */
export const ALL: APIRoute = () =>
  new Response(null, { status: 405, headers: { Allow: 'POST' } });
