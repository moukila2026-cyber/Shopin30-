// ==============================================================================
// Script d'amélioration studio haute précision des 20 photos produits SMART TECHNOLOGY
// - Suppression intégrale du filigrane "Entrez le texte" et de l'arrière-plan parasite
// - Recadrage sur mesure centré sur chaque appareil / coffret
// - Correction colorimétrique, luminosité, contraste et netteté studio (Sharp)
// - Mise en valeur sur fond studio blanc épuré 1200x1200 avec ombre douce subtile
// ==============================================================================
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';

const INPUT_DIR = '/tmp/arena-coding-uploads';
const OUTPUT_DIR = '/home/user/Shopin30-/public/images/products';

const JOBS = [
  {
    src: 'IMG_20261123_113456_272.jpg',
    out: 'smart-bouilloire-inox-rouge-1-8l.jpg',
    // Cadrage sur le coffret supérieur bien net (sans la 2e boîte du bas ni "Entrez le texte")
    crop: { left: 0.01, top: 0.142, width: 0.98, height: 0.498 },
    brightness: 1.08,
    saturation: 1.14,
    contrast: 1.12,
  },
  {
    src: 'IMG_20261123_113508_199.jpg',
    out: 'smart-micro-ondes-25l-stmw-25wg.jpg',
    crop: { left: 0.105, top: 0.075, width: 0.735, height: 0.885 },
    brightness: 1.08,
    saturation: 1.12,
    contrast: 1.12,
  },
  {
    src: 'IMG_20261123_113517_689.jpg',
    out: 'smart-broyeur-foutou-viande-1000w.jpg',
    crop: { left: 0.068, top: 0.0, width: 0.742, height: 0.795 },
    brightness: 1.07,
    saturation: 1.12,
    contrast: 1.14,
  },
  {
    src: 'IMG_20261123_113526_564.jpg',
    out: 'smart-fer-vapeur-noir-or-stpfr-5104b.jpg',
    crop: { left: 0.058, top: 0.015, width: 0.835, height: 0.915 },
    brightness: 1.08,
    saturation: 1.1,
    contrast: 1.14,
  },
  {
    src: 'IMG_20261123_113529_996.jpg',
    out: 'smart-fer-sec-bleu-stpfr-5103.jpg',
    crop: { left: 0.158, top: 0.075, width: 0.705, height: 0.875 },
    brightness: 1.09,
    saturation: 1.15,
    contrast: 1.14,
  },
  {
    src: 'IMG_20261123_113536_857.jpg',
    out: 'smart-bouilloire-beige-1-7l-stpe-251u.jpg',
    crop: { left: 0.292, top: 0.0, width: 0.435, height: 0.985 },
    brightness: 1.12,
    saturation: 1.14,
    contrast: 1.14,
  },
  {
    src: 'IMG_20261123_113542_266.jpg',
    out: 'smart-mixeur-pro-2en1-stpe-8879r.jpg',
    crop: { left: 0.262, top: 0.0, width: 0.448, height: 0.965 },
    brightness: 1.1,
    saturation: 1.15,
    contrast: 1.14,
  },
  {
    src: 'IMG_20261123_113551_386.jpg',
    out: 'smart-blender-3en1-bol-verre-inox.jpg',
    crop: { left: 0.205, top: 0.01, width: 0.515, height: 0.975 },
    brightness: 1.1,
    saturation: 1.12,
    contrast: 1.15,
  },
  {
    src: 'IMG_20261123_113556_363.jpg',
    out: 'smart-regulateur-tension-avr-1500va.jpg',
    crop: { left: 0.288, top: 0.175, width: 0.562, height: 0.815 },
    brightness: 1.08,
    saturation: 1.16,
    contrast: 1.15,
  },
  {
    src: 'IMG_20261123_113610_742.jpg',
    out: 'smart-frigo-4-portes-inverter-inox.jpg',
    crop: { left: 0.032, top: 0.035, width: 0.955, height: 0.83 },
    brightness: 1.07,
    saturation: 1.06,
    contrast: 1.12,
  },
  {
    src: 'IMG_20261123_113630_267.jpg',
    out: 'smart-frigo-multi-portes-verre-noir-inverter.jpg',
    crop: { left: 0.04, top: 0.0, width: 0.95, height: 0.945 },
    brightness: 1.08,
    saturation: 1.08,
    contrast: 1.14,
  },
  {
    src: 'IMG_20261123_113640_131.jpg',
    out: 'smart-frigo-french-door-distributeur-eau.jpg',
    crop: { left: 0.0, top: 0.015, width: 0.99, height: 0.945 },
    brightness: 1.08,
    saturation: 1.06,
    contrast: 1.12,
  },
  {
    src: 'IMG_20261123_113646_884.jpg',
    out: 'smart-frigo-combine-2-portes-led-gris.jpg',
    crop: { left: 0.015, top: 0.0, width: 0.98, height: 0.95 },
    brightness: 1.08,
    saturation: 1.06,
    contrast: 1.12,
  },
  {
    src: 'IMG_20261123_113700_565.jpg',
    out: 'smart-vitrine-refrigeree-verticale.jpg',
    crop: { left: 0.025, top: 0.0, width: 0.96, height: 0.955 },
    brightness: 1.12,
    saturation: 1.1,
    contrast: 1.14,
  },
  {
    src: 'IMG_20261123_113709_271.jpg',
    out: 'smart-lave-linge-frontal-9kg-stml-9sh.jpg',
    crop: { left: 0.0, top: 0.165, width: 0.99, height: 0.58 },
    brightness: 1.08,
    saturation: 1.1,
    contrast: 1.12,
  },
  {
    src: 'IMG_20261123_113714_681.jpg',
    out: 'smart-lavante-sechante-12-7kg-air-wash.jpg',
    crop: { left: 0.0, top: 0.205, width: 0.99, height: 0.585 },
    brightness: 1.08,
    saturation: 1.1,
    contrast: 1.12,
  },
  {
    src: 'IMG_20261123_113719_869.jpg',
    out: 'smart-lave-linge-frontal-10kg-stml-108m.jpg',
    crop: { left: 0.0, top: 0.195, width: 0.99, height: 0.585 },
    brightness: 1.1,
    saturation: 1.1,
    contrast: 1.13,
  },
  {
    src: 'IMG_20261123_113728_123.jpg',
    out: 'smart-lave-linge-frontal-12kg-spa-wash.jpg',
    crop: { left: 0.0, top: 0.135, width: 0.99, height: 0.65 },
    brightness: 1.1,
    saturation: 1.1,
    contrast: 1.13,
  },
  // Cuisinière 5 feux grand four (face avant droite de 113749)
  {
    src: 'IMG_20261123_113749_020.jpg',
    out: 'smart-cuisiniere-gaz-5-feux-grand-four-inox.jpg',
    crop: { left: 0.415, top: 0.03, width: 0.505, height: 0.96 },
    brightness: 1.07,
    saturation: 1.12,
    contrast: 1.13,
  },
  // Cuisinière 5 feux détail brûleurs laiton doré (113741)
  {
    src: 'IMG_20261123_113741_669.jpg',
    out: 'smart-plaque-5-bruleurs-laiton-dore-detail.jpg',
    crop: { left: 0.04, top: 0.0, width: 0.94, height: 0.915 },
    brightness: 1.08,
    saturation: 1.15,
    contrast: 1.14,
  },
  // Cuisinière 4 feux avec four inox (côté gauche de 113749, sans "Entrez le texte")
  {
    src: 'IMG_20261123_113749_020.jpg',
    out: 'smart-cuisiniere-gaz-4-feux-four-inox.jpg',
    crop: { left: 0.035, top: 0.02, width: 0.395, height: 0.91 },
    brightness: 1.08,
    saturation: 1.12,
    contrast: 1.13,
  },
];

async function buildStudioImage(job) {
  const inputPath = path.join(INPUT_DIR, job.src);
  const outputPath = path.join(OUTPUT_DIR, job.out);

  const meta = await sharp(inputPath).rotate().metadata();
  const imgW = meta.width;
  const imgH = meta.height;

  const left = Math.max(0, Math.round(imgW * job.crop.left));
  const top = Math.max(0, Math.round(imgH * job.crop.top));
  const width = Math.min(imgW - left, Math.round(imgW * job.crop.width));
  const height = Math.min(imgH - top, Math.round(imgH * job.crop.height));

  // 1) Recadrage + amélioration lumière / contraste / netteté
  const a = job.contrast || 1.12;
  const b = -(128 * (a - 1));

  const CANVAS = 1200;
  const INNER_MAX = 1060;

  const processedBuf = await sharp(inputPath)
    .rotate()
    .extract({ left, top, width, height })
    .modulate({
      brightness: job.brightness || 1.08,
      saturation: job.saturation || 1.1,
    })
    .linear(a, b)
    .sharpen({ sigma: 1.15, m1: 1.0, m2: 2.0 })
    .resize({
      width: INNER_MAX,
      height: INNER_MAX,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .toBuffer();

  const innerMeta = await sharp(processedBuf).metadata();
  const iw = innerMeta.width;
  const ih = innerMeta.height;

  // Masque aux coins légèrement arrondis (rayon 18px) pour une finition studio propre
  const radius = 18;
  const roundedMask = Buffer.from(
    `<svg width="${iw}" height="${ih}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${iw}" height="${ih}" rx="${radius}" ry="${radius}" fill="#fff"/>
    </svg>`
  );

  const roundedProduct = await sharp(processedBuf)
    .composite([{ input: roundedMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Ombre portée douce sous la vignette produit sur fond studio #F8FAFC -> #FFFFFF
  const posX = Math.round((CANVAS - iw) / 2);
  const posY = Math.round((CANVAS - ih) / 2);

  const studioSvg = Buffer.from(
    `<svg width="${CANVAS}" height="${CANVAS}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#F4F6F8"/>
        </radialGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="125%">
          <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#0F172A" flood-opacity="0.13"/>
        </filter>
      </defs>
      <rect width="${CANVAS}" height="${CANVAS}" fill="url(#bg)"/>
      <rect x="${posX}" y="${posY}" width="${iw}" height="${ih}" rx="${radius}" ry="${radius}" fill="#FFFFFF" filter="url(#shadow)"/>
    </svg>`
  );

  await sharp(studioSvg)
    .composite([{ input: roundedProduct, left: posX, top: posY }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outputPath);

  const stat = await fs.stat(outputPath);
  console.log(`✓ ${job.out} (${iw}x${ih} in 1200x1200, ${Math.round(stat.size / 1024)} KB)`);
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  for (const job of JOBS) {
    await buildStudioImage(job);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
