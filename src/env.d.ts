/// <reference types="astro/client" />

/**
 * Variablen des Workers: in Produktion aus dem Cloudflare-Dashboard bzw.
 * `wrangler secret put`, lokal aus .dev.vars.
 *
 * `npx wrangler types` erzeugt daraus bei Bedarf die vollständige
 * worker-configuration.d.ts — für diese drei Werte genügt die Deklaration hier.
 */
interface Umgebung {
  RESEND_API_KEY: string;
  KONTAKT_MAIL?: string;
  RESEND_FROM?: string;
}

declare module 'cloudflare:workers' {
  export const env: Umgebung;
}
