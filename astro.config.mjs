// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sicherheitsHeader from './scripts/security-headers.mjs';

export default defineConfig({
  site: 'https://l3am.dev',
  // Statisch bis auf /api/kontakt — die Route setzt prerender = false und
  // wird als einzige zur Cloudflare-Function.
  output: 'static',
  adapter: cloudflare({
    // Macht die Variablen aus .dev.vars auch unter `astro dev` verfügbar.
    platformProxy: { enabled: true },
  }),
  // Die Seite hat keine Sitzungen. Ohne das legt der Adapter eine
  // KV-Bindung „SESSION" an, für die es keinen Namespace gibt — der Deploy
  // scheitert dann an einer fehlenden id.
  session: false,
  integrations: [sicherheitsHeader()],
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: { enabled: false },
  build: {
    inlineStylesheets: 'always',
  },
});
