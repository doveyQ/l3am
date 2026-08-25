# Deploy

Die Seite läuft als **Cloudflare Worker mit statischen Assets** — Cloudflares
Nachfolger von Pages. Der Astro-Adapter für Astro 7 kann nur dieses Ziel; ein
klassisches Pages-Projekt kann die Ausgabe (`dist/client` + `dist/server`)
nicht verarbeiten.

Statisch ist alles außer `/api/kontakt`. Nur diese Route setzt
`prerender = false` und läuft im Worker.

```
dist/
  client/   index.html, fonts, images, _headers   → Assets, direkt vom Edge
  server/   entry.mjs, wrangler.json              → Worker, nur für /api/kontakt
```

## Einmalig einrichten

**1. Resend**

- Domain `l3am.dev` in Resend verifizieren (DKIM- und SPF-Einträge setzen).
  Ohne verifizierte Domain lehnt Resend jeden Versand ab.
- Absenderadresse muss auf dieser Domain liegen — siehe `RESEND_FROM` in
  `wrangler.jsonc`.
- API-Key erzeugen (Rechte: nur „Sending access").

**2. Secret setzen** — niemals in `wrangler.jsonc`, das liegt im Repo:

```sh
npx wrangler secret put RESEND_API_KEY
```

**3. Lokale Entwicklung**

```sh
cp .dev.vars.example .dev.vars   # echten Schlüssel eintragen
npm run dev
```

`.dev.vars` ist per `.gitignore` ausgeschlossen.

## Deployen

```sh
npm run deploy      # = astro build && wrangler deploy -c dist/server/wrangler.json
```

Für automatische Builds aus Git (Workers Builds im Dashboard):

| Feld           | Wert                                              |
| -------------- | ------------------------------------------------- |
| Build command  | `npm run build`                                    |
| Deploy command | `npx wrangler deploy -c dist/server/wrangler.json` |

Die Variablen `KONTAKT_MAIL` und `RESEND_FROM` kommen aus `wrangler.jsonc`,
`RESEND_API_KEY` aus den Secrets des Workers.

## Sicherheit

`dist/client/_headers` entsteht beim Build aus
`scripts/security-headers.mjs` und wird von Cloudflare ausgeliefert: CSP mit
Hashes aller Inline-Skripte (kein `'unsafe-inline'`), HSTS,
`frame-ancestors 'none'`, nosniff, Referrer- und Permissions-Policy.

Zwei Dinge, die die Konfiguration hier nicht abdecken kann:

- **Rate Limiting.** Der Endpoint hat einen Honigtopf und harte Längengrenzen,
  aber keine Ratenbegrenzung — die braucht Zustand, den ein Worker allein nicht
  hat. Im Dashboard unter *Security → WAF → Rate limiting rules* eine Regel auf
  `/api/kontakt` legen, z. B. 5 Anfragen pro Minute und IP.
- **Absenderprüfung.** Wer den Endpoint direkt anspricht, kann beliebige
  Absenderadressen angeben. Bei Missbrauch ist Cloudflare Turnstile der nächste
  Schritt.
