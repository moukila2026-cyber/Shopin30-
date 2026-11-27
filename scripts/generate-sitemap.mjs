// ==============================================================================
// Générateur de sitemap Pèrôkadô
// Usage : node scripts/generate-sitemap.mjs
// Écrit public/sitemap.xml : accueil, rayons, 274 fiches produit, pages villes.
// ==============================================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INITIAL_PRODUCTS, CATEGORIES, DELIVERY_ZONES } from '../shared/catalog.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://perokado.com';
const today = new Date().toISOString().slice(0, 10);

const VILLES = [
  ['daloa', 'Livraison à Daloa'],
  ['issia', 'Livraison à Issia'],
  ['vavoua', 'Livraison à Vavoua'],
  ['zoukougbeu', 'Livraison à Zoukougbeu'],
  ['bouafle', 'Livraison à Bouaflé'],
  ['sinfra', 'Livraison à Sinfra'],
  ['gagnoa', 'Livraison à Gagnoa'],
  ['soubre', 'Livraison à Soubré'],
];

function url(loc, { changefreq = 'weekly', priority = '0.7', lastmod = today } = {}) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const parts = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];

// Accueil
parts.push(url(SITE + '/', { changefreq: 'daily', priority: '1.0' }));

// Pages villes (SEO local : « livraison Daloa », « acheter à Issia »…)
for (const [slug] of VILLES) {
  parts.push(url(`${SITE}/ville/${slug}`, { changefreq: 'weekly', priority: '0.8' }));
}

// Rayons
for (const cat of CATEGORIES.filter((c) => c.id !== 'all')) {
  parts.push(url(`${SITE}/rayon/${cat.id}`, { changefreq: 'daily', priority: '0.8' }));
}

// Fiches produit (274)
for (const p of INITIAL_PRODUCTS) {
  parts.push(url(`${SITE}/produit/${encodeURIComponent(p.slug || p.id)}`, { priority: '0.6' }));
}

parts.push('</urlset>');

fs.writeFileSync(path.join(ROOT, 'public', 'sitemap.xml'), parts.join('\n') + '\n', 'utf8');

const total = 1 + VILLES.length + (CATEGORIES.length - 1) + INITIAL_PRODUCTS.length;
console.log(`sitemap.xml écrit : ${total} URL (${INITIAL_PRODUCTS.length} produits, ${VILLES.length} villes, ${CATEGORIES.length - 1} rayons)`);
