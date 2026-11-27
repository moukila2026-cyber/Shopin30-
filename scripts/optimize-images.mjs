// ==============================================================================
// Optimisation des photos produits : JPEG 4032 px (37 Mo au total) -> WebP
// redimensionné (800 px pour la vignette + 1400 px pour le zoom).
// La data coûte cher à Daloa : chaque octet économisé est une vente gagnée.
// Usage : node scripts/optimize-images.mjs
// ==============================================================================
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'public/images/products';
const OUT = 'public/images/products/webp';
const files = fs.readdirSync(SRC).filter((f) => /\.(jpe?g|png)$/i.test(f));

fs.mkdirSync(OUT, { recursive: true });

// Deux tailles suffisent : 400 px (vignette mobile) et 800 px (grille desktop).
// L'original reste utilisé pour le zoom de la fiche produit.
const SIZES = [
  { suffix: '-400', width: 400, quality: 68 },
  { suffix: '-800', width: 800, quality: 74 },
];

let before = 0;
let after = 0;
let done = 0;
const failed = [];

for (const file of files) {
  const srcPath = path.join(SRC, file);
  const base = file.replace(/\.(jpe?g|png)$/i, '');
  try {
    const stat = fs.statSync(srcPath);
    before += stat.size;
    for (const size of SIZES) {
      const dest = path.join(OUT, `${base}${size.suffix}.webp`);
      if (fs.existsSync(dest)) {
        after += fs.statSync(dest).size;
        continue;
      }
      const info = await sharp(srcPath)
        .rotate()
        .resize({ width: size.width, withoutEnlargement: true })
        .webp({ quality: size.quality, effort: 4 })
        .toFile(dest);
      after += info.size;
    }
    done += 1;
  } catch (err) {
    failed.push(`${file}: ${err.message}`);
  }
}

console.log(`Images traitées : ${done}/${files.length}`);
console.log(`Avant : ${(before / 1024 / 1024).toFixed(1)} Mo`);
console.log(`Après (WebP 400 + 800) : ${(after / 1024 / 1024).toFixed(1)} Mo`);
if (failed.length) console.log('Échecs :\n' + failed.join('\n'));
