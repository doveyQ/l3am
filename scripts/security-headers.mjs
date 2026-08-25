/**
 * Sicherheits-Header für den statischen Build.
 *
 * Die Seite lädt ausschließlich eigene Dateien — kein CDN, keine Fremd-Fonts,
 * kein Analytics. Damit ist eine strenge CSP ohne 'unsafe-inline' für Skripte
 * möglich: Astro bettet alle Skripte inline ein, diese Integration hasht sie
 * nach dem Build und trägt die Hashes in die Richtlinie ein.
 *
 * Zwei Wege:
 *
 *   1. dist/_headers — Cloudflare Pages liefert daraus die echten Header,
 *      auch die, die per <meta> nicht gehen: HSTS, frame-ancestors, nosniff,
 *      Referrer- und Permissions-Policy.
 *   2. <meta http-equiv="Content-Security-Policy"> in jeder Seite — greift
 *      auch in der lokalen Vorschau und wenn eine Seite je woanders liegt.
 *
 * Beide zusammen gelten als Schnittmenge, also wirkt jeweils die strengere.
 *
 * ACHTUNG bei Änderungen am Formular: Sobald FORM_ENDPOINT in Kontakt.astro
 * auf einen fremden Dienst zeigt, muss dessen Origin hier in connect-src
 * eingetragen werden — sonst blockt der Browser das Absenden.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SKRIPT = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const CHARSET = /<meta\s+charset=[^>]*>/i;

/** Direktiven ohne script-src — das kommt aus den Hashes der jeweiligen Seite. */
const BASIS = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-src 'none'",
  "worker-src 'self'",
  "manifest-src 'self'",
  "connect-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  // Tailwind wird zur Bauzeit inline gelegt, dazu ~60 style-Attribute im
  // Markup. Style-Hashes decken Attribute nicht ab, daher hier 'unsafe-inline'
  // — ohne script-src-Lücke ist das Restrisiko gering.
  "style-src 'self' 'unsafe-inline'",
  'upgrade-insecure-requests',
];

/** Header, die nur echte HTTP-Header sein können (per <meta> unwirksam). */
const HEADER = [
  ['Strict-Transport-Security', 'max-age=63072000; includeSubDomains'],
  ['X-Content-Type-Options', 'nosniff'],
  ['X-Frame-Options', 'DENY'],
  ['Referrer-Policy', 'strict-origin-when-cross-origin'],
  ['Cross-Origin-Opener-Policy', 'same-origin'],
  ['Cross-Origin-Resource-Policy', 'same-origin'],
  [
    'Permissions-Policy',
    [
      'accelerometer=()',
      'autoplay=()',
      'browsing-topics=()',
      'camera=()',
      'display-capture=()',
      'encrypted-media=()',
      'geolocation=()',
      'gyroscope=()',
      'magnetometer=()',
      'microphone=()',
      'midi=()',
      'payment=()',
      'usb=()',
      'xr-spatial-tracking=()',
    ].join(', '),
  ],
];

async function htmlDateien(wurzel) {
  const gefunden = [];
  for (const eintrag of await readdir(wurzel, { withFileTypes: true })) {
    const voll = path.join(wurzel, eintrag.name);
    if (eintrag.isDirectory()) gefunden.push(...(await htmlDateien(voll)));
    else if (eintrag.name.endsWith('.html')) gefunden.push(voll);
  }
  return gefunden;
}

/** sha256-Hashes aller Inline-Skripte einer Seite, in CSP-Schreibweise. */
function skriptHashes(html) {
  const hashes = new Set();
  for (const [, attribute, inhalt] of html.matchAll(SKRIPT)) {
    if (/\bsrc=/i.test(attribute)) continue; // externe Datei: deckt 'self' ab
    hashes.add(`'sha256-${createHash('sha256').update(inhalt, 'utf8').digest('base64')}'`);
  }
  return [...hashes];
}

function richtlinie(hashes) {
  return [`script-src 'self' ${hashes.join(' ')}`.trimEnd(), ...BASIS].join('; ');
}

export default function sicherheitsHeader() {
  return {
    name: 'leam:security-headers',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const wurzel = fileURLToPath(dir);
        const seiten = await htmlDateien(wurzel);
        const alleHashes = new Set();

        for (const datei of seiten) {
          const html = await readFile(datei, 'utf8');
          const hashes = skriptHashes(html);
          for (const h of hashes) alleHashes.add(h);

          if (!CHARSET.test(html)) {
            // Ohne Anker landet die Richtlinie hinter den Skripten und gilt
            // für sie nicht mehr — dann lieber laut scheitern.
            logger.warn(`kein <meta charset> in ${path.relative(wurzel, datei)} — CSP nicht gesetzt`);
            continue;
          }
          const meta = `<meta http-equiv="Content-Security-Policy" content="${richtlinie(hashes)}">`;
          await writeFile(datei, html.replace(CHARSET, (m) => `${m}\n    ${meta}`), 'utf8');
        }

        // Der Cloudflare-Adapter schreibt vor uns seine Cache-Regel für
        // /_astro/* in dieselbe Datei. Anhängen statt überschreiben: bei
        // mehreren passenden Blöcken wendet Cloudflare alle an.
        const pfad = path.join(wurzel, '_headers');
        const vorhanden = await readFile(pfad, 'utf8').catch(() => '');

        const zeilen = [
          ...(vorhanden ? [vorhanden.trimEnd(), ''] : []),
          '# Erzeugt von scripts/security-headers.mjs — nicht von Hand ändern.',
          '/*',
          `  Content-Security-Policy: ${richtlinie([...alleHashes])}; frame-ancestors 'none'`,
          ...HEADER.map(([name, wert]) => `  ${name}: ${wert}`),
          '',
        ];
        await writeFile(pfad, zeilen.join('\n'), 'utf8');

        logger.info(
          `CSP in ${seiten.length} Seite(n) gesetzt, ${alleHashes.size} Skript-Hash(es), _headers geschrieben`,
        );
      },
    },
  };
}
