/**
 * Der Stack, nach Schicht geordnet — nicht nach Popularität.
 * Jeder Eintrag nennt den konkreten Grund, warum er gewählt wurde.
 */

export type StackEintrag = {
  name: string;
  schicht: string;
  /** Warum genau dieses Werkzeug. Ein Satz, überprüfbar. */
  grund: string;
  /** Kurzes technisches Faktum: Version, Laufzeit, Protokoll. */
  meta: string;
};

export const stack: StackEintrag[] = [
  {
    name: 'Astro',
    schicht: 'Frontend',
    grund: 'Statisches HTML. JavaScript nur dort, wo geklickt wird.',
    meta: 'Islands · SSG / SSR',
  },
  {
    name: 'TypeScript',
    schicht: 'Sprache',
    grund: 'Ein Datenvertrag, von der Datenbank bis ins Formular.',
    meta: 'strict · noUncheckedIndexedAccess',
  },
  {
    name: 'Python / FastAPI',
    schicht: 'KI-Backend',
    grund: 'Modelle und typisierte Endpunkte im selben Prozess.',
    meta: 'ASGI · Pydantic-Schemas',
  },
  {
    name: 'Vector-Datenbanken',
    schicht: 'Retrieval',
    grund: 'Antworten belegt am eigenen Dokumentenbestand.',
    meta: 'pgvector · HNSW-Index',
  },
  {
    name: 'Edge-Infrastruktur',
    schicht: 'Auslieferung',
    grund: 'Auslieferung vom nächstgelegenen Knoten.',
    meta: 'CDN-Cache · Atomic Deploys',
  },
  {
    name: 'Headless CMS',
    schicht: 'Inhalte',
    grund: 'Redaktion ohne Entwickler, aber mit Schema.',
    meta: 'Typisierte Felder · Preview-Builds',
  },
];
