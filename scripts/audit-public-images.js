import { appendFileSync } from 'node:fs';
// Vérifie les images du catalogue public sans authentification ni modification de données.
const base = 'https://perokado.com';
const response = await fetch(`${base}/api/catalog`, { signal: AbortSignal.timeout(30000) });
if (!response.ok) throw new Error(`Catalogue HTTP ${response.status}`);
const { products, paymentMethods } = await response.json();
if (!Array.isArray(products) || !products.length) throw new Error('Catalogue vide ou invalide');
if (paymentMethods?.length !== 1 || paymentMethods[0].id !== 'wave') throw new Error('Configuration paiement inattendue');
const otherResponse = await fetch('https://shopin30-market.vercel.app/api/catalog', { signal: AbortSignal.timeout(30000) });
if (!otherResponse.ok) throw new Error(`Autre catalogue HTTP ${otherResponse.status}`);
const otherProducts = (await otherResponse.json()).products;
const publicIds = new Set(products.map(p => p.id));
const missing = otherProducts.filter(p => !publicIds.has(p.id));
const otherUploads = otherProducts.reduce((count, p) => count + (p.uploadedPhotoSlots || []).filter(Boolean).length, 0);
const comparison = `Autre site: ${otherProducts.length} produits, ${otherUploads} photos televersees; ${missing.length} produits absents sur perokado.com`;
console.log(comparison, missing.map(p => p.id).join(', '));
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `comparison=${comparison}\n`);
const images = new Map();
let uploaded = 0;
for (const p of products) {
  uploaded += (p.uploadedPhotoSlots || []).filter(Boolean).length;
  const urls = [p.imageUrl, ...(p.galleryUrls || [])].filter(Boolean);
  if (!urls.length) throw new Error(`Aucune image : ${p.id}`);
  for (const path of urls) {
    const url = new URL(path, base);
    if (url.origin !== base) throw new Error(`Image extérieure non vérifiée : ${p.id}`);
    if (!images.has(url.href)) images.set(url.href, []);
    images.get(url.href).push(p.id);
  }
}
const tasks = [...images.entries()];
const errors = [];
async function worker() {
  while (tasks.length) {
    const [url, ids] = tasks.pop();
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
      const type = r.headers.get('content-type') || '';
      if (!r.ok || !type.toLowerCase().startsWith('image/')) throw new Error(`HTTP ${r.status}, type ${type}`);
      const b = new Uint8Array(await r.arrayBuffer());
      if (!b.length) throw new Error('image vide');
    } catch (e) { errors.push(`${ids.join(', ')} : ${url} : ${e.message}`); }
  }
}
await Promise.all(Array.from({length: 5}, worker));
const summary = `${products.length} produits, ${images.size} images, ${uploaded} photos televersees, ${errors.length} erreurs`;
console.log(summary);
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `summary=${summary}\n`);
for (const e of errors) console.error(e);
if (errors.length) process.exitCode = 1;
