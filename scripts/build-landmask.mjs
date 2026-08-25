/**
 * Erzeugt die Masken für den Globus — einmalig zur Bauzeit.
 *
 *   1. Weltmaske, 1.5°  — für die weite Ansicht.
 *   2. Europamaske, 0.4° — für die Nahansicht, mit einem Bit pro Punkt,
 *      ob er in Deutschland, Österreich oder der Schweiz liegt.
 *
 * Beides als Bitmaske in base64: zusammen wenige kB statt hunderter kB
 * GeoJSON zur Laufzeit.
 *
 * Aufruf: node scripts/build-landmask.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { feature } from 'topojson-client';

const DACH_IDS = new Set(['276', '040', '756']); // DE, AT, CH (ISO 3166-1 numerisch)

function ringeAus(geojson, filter) {
  const ringe = [];
  for (const f of geojson.features ?? [geojson]) {
    if (filter && !filter(f)) continue;
    const g = f.geometry ?? f;
    if (!g) continue;
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    for (const poly of polys) {
      for (let i = 0; i < poly.length; i++) {
        const ring = poly[i];
        let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
        for (const [x, y] of ring) {
          if (x < x0) x0 = x; if (x > x1) x1 = x;
          if (y < y0) y0 = y; if (y > y1) y1 = y;
        }
        ringe.push({ ring, x0, y0, x1, y1, loch: i > 0 });
      }
    }
  }
  return ringe;
}

function imRing(ring, x, y) {
  let drin = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) drin = !drin;
  }
  return drin;
}

function drin(ringe, lon, lat) {
  let r = false;
  for (const k of ringe) {
    if (lat < k.y0 || lat > k.y1 || lon < k.x0 || lon > k.x1) continue;
    if (imRing(k.ring, lon, lat)) r = !k.loch;
  }
  return r;
}

function packen(bits) {
  return Buffer.from(bits).toString('base64');
}

// ── 1. Weltmaske ──────────────────────────────────────────────────────────
{
  const topo = JSON.parse(readFileSync('node_modules/world-atlas/land-110m.json', 'utf8'));
  const ringe = ringeAus(feature(topo, topo.objects.land));
  const STEP = 1.5, COLS = 240, ROWS = 120;
  const bits = new Uint8Array(Math.ceil((COLS * ROWS) / 8));
  let n = 0;
  for (let r = 0; r < ROWS; r++) {
    const lat = 90 - r * STEP - STEP / 2;
    const kand = ringe.filter((k) => lat >= k.y0 && lat <= k.y1);
    for (let c = 0; c < COLS; c++) {
      const lon = -180 + c * STEP + STEP / 2;
      if (drin(kand, lon, lat)) { const i = r * COLS + c; bits[i >> 3] |= 1 << (i & 7); n++; }
    }
  }
  writeFileSync('src/data/landmask.json', JSON.stringify({ step: STEP, cols: COLS, rows: ROWS, bits: packen(bits) }));
  console.log(`Welt:   ${COLS}×${ROWS}, ${n} Landpunkte, ${(packen(bits).length / 1024).toFixed(1)} kB`);
}

// ── 2. Europamaske mit DACH-Kennung ───────────────────────────────────────
{
  const topo = JSON.parse(readFileSync('node_modules/world-atlas/countries-50m.json', 'utf8'));
  const laender = feature(topo, topo.objects.countries);
  const alle = ringeAus(laender);
  const dach = ringeAus(laender, (f) => DACH_IDS.has(String(f.id)));

  const STEP = 0.4;
  const LON0 = -13, LAT1 = 64;
  const COLS = Math.round(55 / STEP);   // -13 … 42
  const ROWS = Math.round(31 / STEP);   //  33 … 64
  const land = new Uint8Array(Math.ceil((COLS * ROWS) / 8));
  const istDach = new Uint8Array(Math.ceil((COLS * ROWS) / 8));
  let nl = 0, nd = 0;

  for (let r = 0; r < ROWS; r++) {
    const lat = LAT1 - r * STEP - STEP / 2;
    const kandAlle = alle.filter((k) => lat >= k.y0 && lat <= k.y1);
    const kandDach = dach.filter((k) => lat >= k.y0 && lat <= k.y1);
    for (let c = 0; c < COLS; c++) {
      const lon = LON0 + c * STEP + STEP / 2;
      const i = r * COLS + c;
      if (drin(kandAlle, lon, lat)) {
        land[i >> 3] |= 1 << (i & 7); nl++;
        if (kandDach.length && drin(kandDach, lon, lat)) { istDach[i >> 3] |= 1 << (i & 7); nd++; }
      }
    }
  }
  const out = { step: STEP, cols: COLS, rows: ROWS, lon0: LON0, lat1: LAT1, land: packen(land), dach: packen(istDach) };
  writeFileSync('src/data/europamask.json', JSON.stringify(out));
  console.log(`Europa: ${COLS}×${ROWS}, ${nl} Landpunkte, davon ${nd} in DACH, ${((out.land.length + out.dach.length) / 1024).toFixed(1)} kB`);
}
