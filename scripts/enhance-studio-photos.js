// ==============================================================================
// PÈRÔKADÔ — Studio photo haute précision (lot Vaisselle & Art de la table)
// ------------------------------------------------------------------------------
// Les photos du showroom sont prises à main levée sous une lumière jaune, avec un
// fort vignettage (bords sombres). Ce script transforme chaque prise de vue en
// photo produit « type Jumia » :
//   1. rotation EXIF + recadrage serré sur l'article,
//   2. correction d'illumination (flat-field : supprime le vignettage et égalise
//      le fond de rayonnage), balance des blancs (supprime le voile jaune),
//   3. exposition / contraste / saturation / netteté studio,
//   4. détourage progressif (ellipse calée sur l'article pour la porcelaine,
//      rectangle adouci pour les coffrets / carafes) + ombre portée douce,
//   5. composition sur fond studio blanc 1200 × 1200 (format des fiches produit).
// ==============================================================================
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';

const INPUT_DIR = '/tmp/arena-coding-uploads';
const OUTPUT_DIR = '/home/user/Shopin30-/public/images/products';
const PREVIEW_DIR = '/tmp/preview';

const CANVAS = 1200;
const PAD = 56; // marge autour de l'article sur le fond studio
const WORK = 1150; // résolution de travail avant composition
const MARGIN = 1.09; // marge de recadrage autour de l'ellipse de l'article

/**
 * ellipse : { cx, cy, rx, ry } — centre en fractions de largeur/hauteur,
 *           rx en fraction de la largeur, ry en fraction de la hauteur.
 * crop    : { left, top, width, height } en fractions (articles non ronds).
 * mask    : 'ellipse' | 'box'
 */
const VAISSELLE_JOBS = [
  // ——— Assiette plate ronde GRAAL Ø 26,5 cm (2 150 F) ———
  {
    src: '20261125_161934.jpg',
    out: 'vaisselle-assiette-plate-graal-26-5cm.jpg',
    mask: 'ellipse',
    ellipse: { cx: 0.5, cy: 0.425, rx: 0.5, ry: 0.295 },
    exposure: 1.25,
    saturation: 1.03,
    contrast: 1.14,
  },
  // ——— Bol GRAAL 14 cm porcelaine (1 350 F) ———
  {
    src: '20261125_161956.jpg',
    out: 'vaisselle-bol-graal-14cm-porcelaine.jpg',
    mask: 'ellipse',
    ellipse: { cx: 0.43, cy: 0.51, rx: 0.29, ry: 0.19 },
    exposure: 1.0,
    saturation: 1.03,
    contrast: 1.14,
  },
  // ——— Assiette creuse Wilmax WL-991019/A (face) ———
  {
    src: '20261125_162145.jpg',
    out: 'vaisselle-assiette-creuse-wilmax-991019.jpg',
    mask: 'ellipse',
    ellipse: { cx: 0.49, cy: 0.535, rx: 0.5, ry: 0.265 },
    exposure: 1.05,
    saturation: 1.03,
    contrast: 1.12,
  },
  // ——— Assiette creuse Wilmax 23 cm WL-991215A (3 950 F) ———
  {
    src: '20261125_162043.jpg',
    out: 'vaisselle-assiette-creuse-wilmax-991215-23cm.jpg',
    mask: 'ellipse',
    ellipse: { cx: 0.51, cy: 0.44, rx: 0.47, ry: 0.32 },
    exposure: 1.23,
    saturation: 1.03,
    contrast: 1.12,
  },
  // ——— Assiette à dessert 20 cm Tableware Gourmet ivoire (3 600 F) ———
  {
    src: '20261125_162122.jpg',
    out: 'vaisselle-assiette-dessert-20cm-gourmet-ivoire.jpg',
    mask: 'ellipse',
    ellipse: { cx: 0.515, cy: 0.545, rx: 0.465, ry: 0.235 },
    exposure: 1.28,
    saturation: 1.03,
    contrast: 1.14,
  },
  // ——— Assiette décor feuillage noir ———
  {
    src: '20261125_162104.jpg',
    out: 'vaisselle-assiette-motif-feuillage-noir.jpg',
    mask: 'ellipse',
    ellipse: { cx: 0.51, cy: 0.59, rx: 0.49, ry: 0.23 },
    exposure: 1.1,
    saturation: 1.04,
    contrast: 1.14,
  },
  // ——— Bol terracotta motif feuilles ———
  {
    src: '20261125_162211.jpg',
    out: 'vaisselle-bol-terracotta-motif-feuilles.jpg',
    mask: 'ellipse',
    ellipse: { cx: 0.5, cy: 0.515, rx: 0.47, ry: 0.215 },
    exposure: 1.3,
    saturation: 1.08,
    contrast: 1.13,
  },
  // ——— Bol ovale blanc ———
  {
    src: '20261125_162221.jpg',
    out: 'vaisselle-bol-ovale-blanc-porcelaine.jpg',
    mask: 'ellipse',
    ellipse: { cx: 0.315, cy: 0.495, rx: 0.315, ry: 0.165 },
    exposure: 1.35,
    saturation: 1.03,
    contrast: 1.16,
  },
  // ——— Panier à frire inox (2 500 F) ———
  {
    src: '20261125_162253.jpg',
    out: 'cuisine-panier-a-frire-inox-poele.jpg',
    mask: 'box',
    crop: { left: 0.18, top: 0.285, width: 0.76, height: 0.39 },
    exposure: 1.37,
    saturation: 1.0,
    contrast: 1.16,
  },
  // ——— Coffret LAV 6 NevaKar 320 cc (7 500 F) ———
  {
    src: '20261125_162325.jpg',
    out: 'cuisine-lav-6-verres-nevakar-320cc.jpg',
    mask: 'box',
    crop: { left: 0.02, top: 0.035, width: 0.855, height: 0.94 },
    exposure: 1.25,
    saturation: 1.05,
    contrast: 1.12,
    clahe: 3,
  },
  // ——— Coffret LAV 6 Misket 390 cc (9 500 F) ———
  {
    src: '20261125_162344.jpg',
    out: 'cuisine-lav-6-verres-misket-390cc.jpg',
    mask: 'box',
    crop: { left: 0.075, top: 0.06, width: 0.9, height: 0.78 },
    exposure: 1.2,
    saturation: 1.06,
    contrast: 1.14,
    clahe: 3,
  },
  // ——— Carafe Azur verre trempé (6 500 F) ———
  {
    src: '20261125_162427.jpg',
    out: 'cuisine-carafe-azur-verre-transparent.jpg',
    mask: 'box',
    crop: { left: 0.17, top: 0.03, width: 0.7, height: 0.72 },
    exposure: 1.32,
    saturation: 1.0,
    contrast: 1.2,
    clahe: 3,
  },
  // ——— Lunch box inox JIA TENG 2,2 L (7 000 F) ———
  {
    src: '20261125_162450.jpg',
    out: 'cuisine-lunch-box-inox-jia-teng-2-2l.jpg',
    mask: 'box',
    crop: { left: 0.02, top: 0.005, width: 0.93, height: 0.68 },
    exposure: 1.37,
    saturation: 0.98,
    contrast: 1.18,
  },
];

// ---------------------------------------------------------------------------
// 1) Flat-field + balance des blancs (pur calcul pixel, sur l'image de travail)
// ---------------------------------------------------------------------------
async function flattenIllumination(workBuffer, exposure, strength = 0.55) {
  const src = await sharp(workBuffer).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const illum = await sharp(workBuffer).removeAlpha().blur(42).raw().toBuffer({ resolveWithObject: true });

  const { width, height, channels } = src.info;
  const out = Buffer.alloc(src.data.length);
  const n = src.data.length / channels;

  const sums = [0, 0, 0];
  for (let i = 0; i < src.data.length; i += channels) {
    sums[0] += src.data[i];
    sums[1] += src.data[i + 1];
    sums[2] += src.data[i + 2];
  }
  const mean = sums.map((s) => s / n);
  const grey = (mean[0] + mean[1] + mean[2]) / 3;

  const meanIllum = [0, 0, 0];
  for (let c = 0; c < 3; c++) {
    let s = 0;
    for (let i = c; i < illum.data.length; i += illum.info.channels) s += illum.data[i];
    meanIllum[c] = s / n;
  }

  const TARGET = 238;
  const bias = mean.map((m) => Math.pow(grey / Math.max(m, 1), 0.55));

  for (let p = 0, i = 0; p < n; p++, i += channels) {
    for (let c = 0; c < 3; c++) {
      const l = illum.data[i + c] * 0.75 + meanIllum[c] * 0.25;
      const ratio = meanIllum[c] / Math.max(l, 12);
      const gain = Math.pow(Math.min(Math.max(ratio, 0.62), 1.9), strength);
      const v = ((src.data[i + c] * gain * bias[c]) / TARGET) * exposure * 255;
      out[i + c] = Math.max(0, Math.min(255, Math.round(v)));
    }
  }
  return sharp(out, { raw: { width, height, channels: 3 } });
}

// ---------------------------------------------------------------------------
// 2) Masques progressifs (repères en pixels du recadrage)
// ---------------------------------------------------------------------------
function ellipseMask(w, h, mask) {
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="m" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
        <stop offset="96%" stop-color="#fff" stop-opacity="1"/>
        <stop offset="98%" stop-color="#fff" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="${Math.round(mask.cx)}" cy="${Math.round(mask.cy)}" rx="${Math.round(mask.rx)}" ry="${Math.round(mask.ry)}" fill="url(#m)"/>
  </svg>`;
  return Buffer.from(svg);
}

function boxMask(w, h, radius = 14, feather = 3) {
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="soft" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="${feather}"/>
      </filter>
    </defs>
    <rect x="${feather + 1}" y="${feather + 1}" width="${w - 2 * feather - 2}" height="${h - 2 * feather - 2}"
      rx="${radius}" ry="${radius}" fill="#fff" filter="url(#soft)"/>
  </svg>`;
  return Buffer.from(svg);
}

// ---------------------------------------------------------------------------
// 2bis) Raffinement automatique de l'ellipse sur le contour réel de l'article
//       (recherche du gradient maximal le long de chaque rayon, puis moindres
//        carrés robustes sur les points de contour retenus)
// ---------------------------------------------------------------------------
async function refineEllipse(cropBuffer, guess) {
  const W = 700;
  const { data, info } = await sharp(cropBuffer)
    .resize({ width: W })
    .greyscale()
    .blur(1.2)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  const scale = w / guess.cropWidth;
  const cx = guess.cx * scale;
  const cy = guess.cy * scale;
  const rx = guess.rx * scale;
  const ry = guess.ry * scale;

  const pts = [];
  for (let a = 0; a < 360; a += 1.5) {
    const t = (a * Math.PI) / 180;
    const dx = Math.cos(t), dy = Math.sin(t);
    let best = 0, bestT = 0, prev = null;
    for (let k = 0.8; k <= 1.2; k += 0.004) {
      const x = Math.round(cx + dx * rx * k);
      const y = Math.round(cy + dy * ry * k);
      if (x < 1 || y < 1 || x >= w - 1 || y >= h - 1) { prev = null; continue; }
      const v = data[y * w + x];
      if (prev !== null) {
        const d = Math.abs(v - prev);
        if (d > best) { best = d; bestT = k; }
      }
      prev = v;
    }
    if (best > 9 && bestT > 0.85 && bestT < 1.15) {
      pts.push({ x: cx + dx * rx * bestT, y: cy + dy * ry * bestT });
    }
  }
  if (pts.length < 40) return null;

  // moindres carrés : A·u + B·v = 1 avec u = (x-cx)², v = (y-cy)², A = 1/rx², B = 1/ry²
  const fit = (p) => {
    let suu = 0, svv = 0, suv = 0, su = 0, sv = 0;
    for (const q of p) {
      const u = (q.x - cx) ** 2, v = (q.y - cy) ** 2;
      suu += u * u; svv += v * v; suv += u * v; su += u; sv += v;
    }
    const det = suu * svv - suv * suv;
    if (Math.abs(det) < 1e-9) return null;
    const A = (svv * su - suv * sv) / det;
    const B = (suu * sv - suv * su) / det;
    if (A <= 0 || B <= 0) return null;
    return { rx: Math.sqrt(1 / A), ry: Math.sqrt(1 / B) };
  };

  // trim robuste (2 passes)
  let set = pts;
  let res = fit(set);
  for (let i = 0; i < 2 && res; i++) {
    set = set.filter((q) => {
      const e = ((q.x - cx) / res.rx) ** 2 + ((q.y - cy) / res.ry) ** 2;
      return Math.abs(Math.sqrt(e) - 1) < 0.06;
    });
    if (set.length < 40) break;
    res = fit(set) || res;
  }
  if (!res) return null;
  return { rx: res.rx / scale, ry: res.ry / scale, used: set.length, total: pts.length };
}

// ---------------------------------------------------------------------------
// 3) Composition studio
// ---------------------------------------------------------------------------
const ART_TABLE_JOBS = [
  // ——— Lunch box inox JIA TENG 3,4 L (9 000 F) ———
  {
    src: '20261125_162459.jpg',
    out: 'cuisine-lunch-box-inox-jia-teng-3-4l.jpg',
    mask: 'box',
    crop: { left: 0.02, top: 0.01, width: 0.93, height: 0.65 },
    exposure: 1.04,
    saturation: 0.98,
    contrast: 1.14,
  },
  // ——— Mason jar mug « Today is a fruit day » ———
  {
    src: '20261125_162521.jpg',
    out: 'cuisine-mason-jar-mug-fruit-day.jpg',
    mask: 'box',
    crop: { left: 0.19, top: 0.05, width: 0.48, height: 0.62 },
    expand: 1.16,
    exposure: 1.04,
    saturation: 1.06,
    contrast: 1.12,
  },
  // ——— Mason jar mugs colorés (bleu / vert / jaune) ———
  {
    src: '20261125_162533.jpg',
    out: 'cuisine-mason-jar-mug-colore-lot.jpg',
    mask: 'box',
    crop: { left: 0.03, top: 0.22, width: 0.94, height: 0.36 },
    expand: 1.12,
    exposure: 1.02,
    saturation: 1.08,
    contrast: 1.12,
  },
  // ——— Coffret 6 verres Sisecam 280 ml ———
  {
    src: '20261125_162554.jpg',
    out: 'cuisine-verres-sisecam-6x280ml.jpg',
    mask: 'box',
    crop: { left: 0.02, top: 0.18, width: 0.9, height: 0.62 },
    expand: 1.12,
    exposure: 1.08,
    saturation: 1.0,
    contrast: 1.12,
  },
  // ——— Pasabahce Golden Touch Iconic 6 verres dorés (12 500 F) ———
  {
    src: '20261125_162624.jpg',
    out: 'cuisine-verres-pasabahce-golden-touch-iconic-6.jpg',
    mask: 'box',
    crop: { left: 0.14, top: 0.19, width: 0.66, height: 0.6 },
    expand: 1.05,
    exposure: 1.04,
    saturation: 1.04,
    contrast: 1.12,
    clahe: 3,
  },
  // ——— Gobelet dégradé avec paille (2 950 F) ———
  {
    src: '20261125_162716.jpg',
    out: 'cuisine-gobelet-degrade-paille.jpg',
    mask: 'box',
    crop: { left: 0.28, top: 0.02, width: 0.4, height: 0.78 },
    expand: 1.22,
    exposure: 1.0,
    saturation: 1.06,
    contrast: 1.1,
  },
  // ——— Tumbler pailleté « living in Full Color » ———
  {
    src: '20261125_162637.jpg',
    out: 'cuisine-tumbler-paillete-living-in-full-color.jpg',
    mask: 'box',
    crop: { left: 0.605, top: 0.16, width: 0.185, height: 0.74 },
    exposure: 1.06,
    saturation: 1.08,
    contrast: 1.1,
    clahe: 3,
  },
  // ——— Tumbler isotherme Stanley Nova (7 000 F) ———
  {
    src: '20261125_162738.jpg',
    out: 'cuisine-stanley-nova-tumbler-isotherme.jpg',
    mask: 'box',
    crop: { left: 0.31, top: 0.02, width: 0.58, height: 0.8 },
    exposure: 1.0,
    saturation: 1.04,
    contrast: 1.1,
  },
  // ——— Thermos Daristore 304 SUS ———
  {
    src: '20261125_162914.jpg',
    out: 'cuisine-thermos-daristore-304-sus-2l.jpg',
    mask: 'box',
    crop: { left: 0.24, top: 0.07, width: 0.5, height: 0.64 },
    exposure: 1.06,
    saturation: 1.02,
    contrast: 1.14,
  },
  // ——— Étagère plastique 4 niveaux TAJ PLAST ———
  {
    src: '20261125_162946.jpg',
    out: 'cuisine-etagere-plastique-4-niveaux-taj-plast.jpg',
    mask: 'box',
    crop: { left: 0.17, top: 0.03, width: 0.62, height: 0.77 },
    exposure: 1.06,
    saturation: 1.08,
    contrast: 1.12,
  },
  // ——— Bol à soupe Wilmax 2 anses WL-991225/A (2 750 F) ———
  {
    src: '20261125_163023.jpg',
    out: 'vaisselle-bol-soupe-wilmax-991225-440ml.jpg',
    mask: 'box',
    crop: { left: 0.09, top: 0.34, width: 0.82, height: 0.31 },
    exposure: 1.02,
    saturation: 1.02,
    contrast: 1.12,
  },
  // ——— Coffret 3 tasses COFFEE HOUSE ———
  {
    src: '20261125_163048.jpg',
    out: 'cuisine-tasses-coffee-house-lot-3.jpg',
    mask: 'box',
    crop: { left: 0.29, top: 0.24, width: 0.62, height: 0.33 },
    exposure: 1.06,
    saturation: 1.04,
    contrast: 1.12,
    clahe: 3,
  },
];

const TASSES_MUGS_JOBS = [
  // ——— Coffret 3 tasses noires « coffee » (2 000 F) ———
  {
    src: '20261125_163114.jpg',
    out: 'cuisine-tasses-noires-coffee-lot-3.jpg',
    mask: 'box',
    crop: { left: 0, top: 0.31, width: 0.6, height: 0.56 },
    exposure: 1.06,
    saturation: 1.06,
    contrast: 1.12,
  },
  // ——— Coffret 4 tasses à café porcelaine blanche 9 cl (3 600 F) ———
  {
    src: '20261125_163156.jpg',
    out: 'cuisine-tasses-cafe-porcelaine-blanc-9cl-lot-4.jpg',
    mask: 'box',
    crop: { left: 0.1, top: 0.2, width: 0.86, height: 0.52 },
    exposure: 1.04,
    saturation: 1.0,
    contrast: 1.12,
  },
  // ——— Tasse verre double paroi Wilmax WL-888420/A 100 ml (3 500 F) ———
  {
    src: '20261125_163222.jpg',
    out: 'vaisselle-tasse-verre-double-paroi-wilmax-888420-100ml.jpg',
    mask: 'box',
    crop: { left: 0.34, top: 0.14, width: 0.44, height: 0.72 },
    exposure: 1.02,
    saturation: 1.0,
    contrast: 1.14,
    clahe: 4,
  },
  // ——— Tasse Luminarc Flashy Lavande 8 cl (2 950 F) ———
  {
    src: '20261125_163241.jpg',
    out: 'vaisselle-tasse-luminarc-flashy-lavande-8cl.jpg',
    mask: 'box',
    crop: { left: 0.34, top: 0.2, width: 0.36, height: 0.52 },
    exposure: 1.0,
    saturation: 1.06,
    contrast: 1.12,
  },
  // ——— Mug Luminarc Flashy Neo Gold (3 300 F) ———
  {
    src: '20261125_163251.jpg',
    out: 'vaisselle-mug-luminarc-flashy-neo-gold.jpg',
    mask: 'box',
    crop: { left: 0.16, top: 0.12, width: 0.6, height: 0.62 },
    exposure: 1.02,
    saturation: 1.04,
    contrast: 1.12,
  },
  // ——— Mug grès motif vague sauge (1 800 F) ———
  {
    src: '20261125_163303.jpg',
    out: 'vaisselle-mug-gres-vague-sauge.jpg',
    mask: 'box',
    crop: { left: 0.1, top: 0.28, width: 0.44, height: 0.56 },
    exposure: 1.04,
    saturation: 1.02,
    contrast: 1.12,
  },
  // ——— Lot de 3 mugs grès motif vague (sauge, jaune, bordeaux) ———
  {
    src: '20261125_163342.jpg',
    out: 'vaisselle-lot-3-mugs-gres-motif-vague.jpg',
    mask: 'box',
    crop: { left: 0.1, top: 0.32, width: 0.8, height: 0.34 },
    exposure: 1.04,
    saturation: 1.04,
    contrast: 1.12,
  },
  // ——— Mug porcelaine Colorado bleu 18 cl (1 150 F) ———
  {
    src: '20261125_163401.jpg',
    out: 'vaisselle-mug-porcelaine-colorado-bleu-18cl.jpg',
    mask: 'box',
    crop: { left: 0.0, top: 0.02, width: 0.5, height: 0.74 },
    exposure: 1.06,
    saturation: 1.04,
    contrast: 1.12,
  },
  // ——— Duo de mugs blancs porcelaine ———
  {
    src: '20261125_163415.jpg',
    out: 'vaisselle-duo-mugs-blancs-porcelaine.jpg',
    mask: 'box',
    crop: { left: 0.18, top: 0.08, width: 0.78, height: 0.66 },
    exposure: 1.06,
    saturation: 1.0,
    contrast: 1.12,
  },
  // ——— Duo de mugs pastel beige & bleu ———
  {
    src: '20261125_163431.jpg',
    out: 'vaisselle-duo-mugs-pastel-beige-bleu.jpg',
    mask: 'box',
    crop: { left: 0.0, top: 0.14, width: 0.84, height: 0.72 },
    exposure: 1.06,
    saturation: 1.02,
    contrast: 1.12,
  },
  // ——— Mug grès rayé taupe ———
  {
    src: '20261125_163446.jpg',
    out: 'vaisselle-mug-gres-raye-taupe.jpg',
    mask: 'box',
    crop: { left: 0.18, top: 0.26, width: 0.64, height: 0.68 },
    exposure: 1.06,
    saturation: 1.0,
    contrast: 1.12,
  },
  // ——— Duo de mugs grès peints à la main ———
  {
    src: '20261125_163524.jpg',
    out: 'vaisselle-duo-mugs-gres-peints-main.jpg',
    mask: 'box',
    crop: { left: 0.06, top: 0.09, width: 0.82, height: 0.72 },
    exposure: 1.06,
    saturation: 1.06,
    contrast: 1.12,
  },
];

export { VAISSELLE_JOBS, ART_TABLE_JOBS, TASSES_MUGS_JOBS };

async function buildStudioImage(job) {
  const inputPath = path.join(INPUT_DIR, job.src);
  const outputPath = path.join(OUTPUT_DIR, job.out);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const rotated = await sharp(inputPath).rotate().toBuffer();
  const meta = await sharp(rotated).metadata();

  let left, top, cropW, cropH, maskDef;

  if (job.mask === 'ellipse') {
    const e = job.ellipse;
    let rx = e.rx * meta.width;
    let ry = e.ry * meta.height;
    const cx = e.cx * meta.width;
    const cy = e.cy * meta.height;
    cropW = Math.min(meta.width, Math.round(rx * 2 * MARGIN));
    cropH = Math.min(meta.height, Math.round(ry * 2 * MARGIN));
    left = Math.round(Math.min(Math.max(cx - cropW / 2, 0), meta.width - cropW));
    top = Math.round(Math.min(Math.max(cy - cropH / 2, 0), meta.height - cropH));

    // 2bis) recalage automatique du contour (masque au plus près de l'article)
    if (job.refine !== false) {
      const pre = await sharp(rotated)
        .extract({ left, top, width: cropW, height: cropH })
        .toBuffer();
      const fine = await refineEllipse(pre, {
        cropWidth: cropW,
        cx: cx - left,
        cy: cy - top,
        rx,
        ry,
      });
      if (fine && fine.used > fine.total * 0.45) {
        rx = fine.rx;
        ry = fine.ry;
        console.log(`  · contour recalé ${job.out.split('/').pop()} : ${fine.used}/${fine.total} pts`);
      }
    }

    maskDef = {
      cx: cx - left,
      cy: cy - top,
      rx: rx * 0.985,
      ry: ry * 0.985,
    };
  } else {
    const c = job.crop;
    const k = job.expand || 1; // marge de sécurité autour de l'article
    const w = Math.min(1, c.width * k);
    const h = Math.min(1, c.height * k);
    const cx = c.left + c.width / 2;
    const cy = c.top + c.height / 2;
    left = Math.round(Math.min(Math.max((cx - w / 2) * meta.width, 0), meta.width - w * meta.width));
    top = Math.round(Math.min(Math.max((cy - h / 2) * meta.height, 0), meta.height - h * meta.height));
    cropW = Math.round(w * meta.width);
    cropH = Math.round(h * meta.height);
  }

  const cropped = await sharp(rotated).extract({ left, top, width: cropW, height: cropH }).toBuffer();

  // 3a) lumière (flat-field + WB) puis colorimétrie studio
  const flat = await flattenIllumination(
    await sharp(cropped).resize({ width: WORK, height: WORK, fit: 'inside' }).toBuffer(),
    job.exposure || 1.1
  );

  const a = job.contrast || 1.12;
  const b = -(128 * (a - 1));
  let pipeline = flat.modulate({ saturation: job.saturation || 1.03 }).linear(a, b);
  if (job.clahe) {
    // contraste local : dévoile les photos prises sous éclairage plat / flare
    pipeline = pipeline.clahe({ width: 96, height: 96, maxSlope: job.clahe === true ? 2.2 : job.clahe });
  }
  const processedBuf = await pipeline
    .sharpen({ sigma: 1.05, m1: 0.9, m2: 1.8 })
    .png()
    .toBuffer();

  const pMeta = await sharp(processedBuf).metadata();
  const pw = pMeta.width;
  const ph = pMeta.height;
  const scaleToWork = pw / cropW;

  // 3b) détourage progressif
  let mask;
  if (job.mask === 'ellipse') {
    mask = ellipseMask(pw, ph, {
      cx: maskDef.cx * scaleToWork,
      cy: maskDef.cy * scaleToWork,
      rx: maskDef.rx * scaleToWork,
      ry: maskDef.ry * scaleToWork,
    });
  } else {
    mask = boxMask(pw, ph);
  }

  const cutout = await sharp(processedBuf)
    .ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 3c) zone utile = silhouette (on recadre sur le masque pour que l'article
  //     remplisse harmonieusement le cadre 1200 × 1200)
  const frame = job.mask === 'ellipse'
    ? {
        left: Math.max(0, Math.round((maskDef.cx - maskDef.rx) * scaleToWork)),
        top: Math.max(0, Math.round((maskDef.cy - maskDef.ry) * scaleToWork)),
        width: Math.min(pw, Math.round(maskDef.rx * 2 * scaleToWork)),
        height: Math.min(ph, Math.round(maskDef.ry * 2 * scaleToWork)),
      }
    : { left: 0, top: 0, width: pw, height: ph };
  frame.width = Math.max(8, Math.min(frame.width, pw - frame.left));
  frame.height = Math.max(8, Math.min(frame.height, ph - frame.top));

  const inner = CANVAS - 2 * PAD;
  const framed = await sharp(cutout).extract(frame).png().toBuffer();
  const scale = Math.min(inner / frame.width, inner / frame.height);
  const w = Math.max(8, Math.round(frame.width * scale));
  const h = Math.max(8, Math.round(frame.height * scale));
  const scaled = await sharp(framed).resize({ width: w, height: h, fit: 'fill' }).png().toBuffer();

  const x = Math.round((CANVAS - w) / 2);
  const y = Math.round((CANVAS - h) / 2) - 4;

  // 3d) ombre portée douce (même silhouette, floutée, décalée vers le bas)
  const shadow = await sharp(scaled)
    .ensureAlpha()
    .composite([
      {
        input: Buffer.from(
          `<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="#5B6B80" fill-opacity="0.6"/></svg>`
        ),
        blend: 'in',
      },
    ])
    .blur(16)
    .png()
    .toBuffer();

  const background = Buffer.from(
    `<svg width="${CANVAS}" height="${CANVAS}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="50%" cy="42%" r="72%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="62%" stop-color="#FDFEFF"/>
          <stop offset="100%" stop-color="#EDF1F6"/>
        </radialGradient>
      </defs>
      <rect width="${CANVAS}" height="${CANVAS}" fill="url(#bg)"/>
    </svg>`
  );

  await sharp(background)
    .composite([
      { input: shadow, left: x + 5, top: y + 22 },
      { input: scaled, left: x, top: y },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outputPath);

  const stat = await fs.stat(outputPath);
  console.log(`✓ ${job.out} — ${w}×${h} (${Math.round(stat.size / 1024)} Ko)`);
}

const BATCH = process.argv[2];

async function buildPreviewSheet(jobs) {
  const files = jobs.map((j) => path.join(OUTPUT_DIR, j.out));
  const cols = 4;
  const cell = 340;
  const rows = Math.ceil(files.length / cols);
  const sheet = sharp({
    create: { width: cols * cell + (cols + 1) * 8, height: rows * cell + (rows + 1) * 8, channels: 3, background: '#B8C4D4' },
  });
  const comps = [];
  for (let i = 0; i < files.length; i++) {
    const buf = await sharp(files[i]).resize(cell, cell).toBuffer();
    comps.push({ input: buf, left: 8 + (i % cols) * (cell + 8), top: 8 + Math.floor(i / cols) * (cell + 8) });
  }
  await fs.mkdir(PREVIEW_DIR, { recursive: true });
  await sheet.composite(comps).jpeg({ quality: 85 }).toFile(path.join(PREVIEW_DIR, 'sheet.jpg'));
  console.log('Aperçu : /tmp/preview/sheet.jpg');
}

async function main() {
  const jobs =
    BATCH === 'arttable'
      ? ART_TABLE_JOBS
      : BATCH === 'vaisselle'
        ? VAISSELLE_JOBS
        : BATCH === 'tasses'
          ? TASSES_MUGS_JOBS
          : [...VAISSELLE_JOBS, ...ART_TABLE_JOBS, ...TASSES_MUGS_JOBS];
  for (const job of jobs) {
    try {
      await buildStudioImage(job);
    } catch (err) {
      console.error(`✗ ${job.out}`, err.message);
    }
  }
  await buildPreviewSheet(jobs);
}

// n'exécute le pipeline que si le script est lancé directement
if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
