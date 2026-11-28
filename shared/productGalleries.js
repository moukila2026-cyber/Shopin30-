// Photos supplémentaires identifiées par référence. Les photos issues de la
// base administrateur restent prioritaires sur ces vues du catalogue.
export const PRODUCT_GALLERIES = {
  'enfant-quad-racing-jaune': { original: '/images/enfants/quad-racing-jaune.png', primaryOriginal: true, images: [], generated: ['/images/enfants/quad-racing-jaune.png'] },
  'enfant-quad-bleu-4-roues': { original: '/images/enfants/quad-bleu-4roues.png', primaryOriginal: true, images: [], generated: ['/images/enfants/quad-bleu-4roues.png'] },
  'enfant-tricycle-chopper-jaune': { original: '/images/enfants/tricycle-chopper-jaune.png', primaryOriginal: true, images: [], generated: ['/images/enfants/tricycle-chopper-jaune.png'] },
  'enfant-scooter-jaune-noir': { original: '/images/enfants/scooter-jaune-noir.png', primaryOriginal: true, images: [], generated: ['/images/enfants/scooter-jaune-noir.png'] },
  'enfant-quad-rechargeable-noir-bleu': {
    original: '/images/enfants/quad-noir-bleu.png',
    primaryOriginal: true,
    images: [],
    generated: ['/images/enfants/quad-noir-bleu.png'],
  },
  'enfant-quad-rechargeable-noir-jaune': {
    original: '/images/enfants/quad-noir-jaune.png',
    primaryOriginal: true,
    images: [],
    generated: ['/images/enfants/quad-noir-jaune.png'],
  },
  'smart-mixeur-pro-stpe-8879r': {
    original: '/images/products/smart-mixeur-pro-2en1-stpe-8879r.jpg',
    images: ['/images/gallery/stpe-8879r-face.jpg', '/images/gallery/stpe-8879r-accessoires.jpg'],
  },
  'smart-bouilloire-rouge-stpe-249rb': {
    original: '/images/products/smart-bouilloire-inox-rouge-1-8l.jpg',
    primaryOriginal: true,
    images: [],
  },
  'smart-fer-sec-stpfr-5103': {
    original: '/images/products/smart-fer-sec-bleu-stpfr-5103.jpg',
    primaryOriginal: true,
    images: ['/images/gallery/fer-sec-bleu-ia-2.png'],
    generated: ['/images/gallery/fer-sec-bleu-ia-2.png'],
  },
  'smart-fer-vapeur-stpfr-5104b': {
    original: '/images/products/smart-fer-vapeur-noir-or-stpfr-5104b.jpg',
    images: ['/images/gallery/stpfr-5104b-profil.jpg', '/images/gallery/stpfr-5104b-dessus.jpg'],
  },
  'smart-bouilloire-beige-stpe-251u': {
    original: '/images/products/smart-bouilloire-beige-1-7l-stpe-251u.jpg',
    images: ['/images/gallery/stpe-251u-profil.jpg'],
    galleryAfterPrimary: ['/images/products/smart-bouilloire-beige-1-7l-stpe-251u.jpg'],
  },
  'beaute-tondeuse-rowenta-nomad-tn1410f0': {
    original: '/images/products/beaute-tondeuse-rowenta-nomad-tn1410f0.jpg',
    images: ['/images/gallery/tn1410f0-socle.jpg'],
  },
  'btp-coffret-schneider-144-modules-lvsxt624': {
    original: '/images/products/btp-coffret-schneider-144-modules-lvsxt624.jpg',
    primaryOriginal: true,
    images: ['/images/gallery/lvsxt624-composants.jpg'],
  },
  'btp-parafoudre-schneider-acti9-40ka-a9l40601': {
    original: '/images/products/btp-parafoudre-schneider-acti9-40ka-a9l40601.jpg',
    primaryOriginal: true,
    images: ['/images/gallery/a9l40601-face.jpg'],
  },
  // Chaussures Mode 2026 : photos commerçant telles quelles (sans retouche).
  // primaryOriginal: true => imageUrl reste la photo principale, images = vues suivantes.
  'mode-new-balance-1906-blanc': {
    original: '/images/products/mode-new-balance-1906-blanc-1.jpg',
    primaryOriginal: true,
    images: [
      '/images/products/mode-new-balance-1906-blanc-2.jpg',
      '/images/products/mode-new-balance-1906-blanc-3.jpg',
      '/images/products/mode-new-balance-1906-blanc-4.jpg',
      '/images/products/mode-new-balance-1906-blanc-5.jpg',
      '/images/products/mode-new-balance-1906-blanc-6.jpg',
    ],
  },
  'mode-new-balance-1906r-gris': {
    original: '/images/products/mode-new-balance-1906r-gris-1.jpg',
    primaryOriginal: true,
    images: [
      '/images/products/mode-new-balance-1906r-gris-2.jpg',
      '/images/products/mode-new-balance-1906r-gris-3.jpg',
      '/images/products/mode-new-balance-1906r-gris-4.jpg',
      '/images/products/mode-new-balance-1906r-gris-5.jpg',
    ],
  },
  'mode-new-balance-1906d-beige': {
    original: '/images/products/mode-new-balance-1906d-beige-1.jpg',
    primaryOriginal: true,
    images: [
      '/images/products/mode-new-balance-1906d-beige-2.jpg',
      '/images/products/mode-new-balance-1906d-beige-3.jpg',
      '/images/products/mode-new-balance-1906d-beige-4.jpg',
      '/images/products/mode-new-balance-1906d-beige-5.jpg',
    ],
  },
};
