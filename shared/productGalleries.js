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
  // Arrivage chaussures Mode (photos commerçant, telles quelles, 27/11/2026) :
  // chaque référence expose tous ses coloris / angles en galerie.
  'chaussures-timberland-neuves': {
    original: '/images/products/chaussures-timberland-neuves-1.jpg',
    primaryOriginal: true,
    images: [
      '/images/products/chaussures-timberland-neuves-2.jpg',
      '/images/products/chaussures-timberland-neuves-3.jpg',
    ],
    extraImages: ['/images/products/chaussures-timberland-neuves-4.jpg'],
  },
  'chaussures-new-balance-1906r': {
    original: '/images/products/chaussures-new-balance-1906r-1.jpg',
    primaryOriginal: true,
    images: [
      '/images/products/chaussures-new-balance-1906r-2.jpg',
      '/images/products/chaussures-new-balance-1906r-3.jpg',
    ],
    extraImages: [
      '/images/products/chaussures-new-balance-1906r-4.jpg',
      '/images/products/chaussures-new-balance-1906r-5.jpg',
    ],
  },
  'chaussures-new-balance-1906d': {
    original: '/images/products/chaussures-new-balance-1906d-1.jpg',
    primaryOriginal: true,
    images: [
      '/images/products/chaussures-new-balance-1906d-2.jpg',
      '/images/products/chaussures-new-balance-1906d-3.jpg',
    ],
    extraImages: [
      '/images/products/chaussures-new-balance-1906d-4.jpg',
      '/images/products/chaussures-new-balance-1906d-5.jpg',
    ],
  },
  'chaussures-new-balance-1906': {
    original: '/images/products/chaussures-new-balance-1906-1.jpg',
    primaryOriginal: true,
    images: [
      '/images/products/chaussures-new-balance-1906-2.jpg',
      '/images/products/chaussures-new-balance-1906-3.jpg',
    ],
    extraImages: [
      '/images/products/chaussures-new-balance-1906-4.jpg',
      '/images/products/chaussures-new-balance-1906-5.jpg',
      '/images/products/chaussures-new-balance-1906-6.jpg',
    ],
  },
  'chaussures-nike-air-max-95': {
    original: '/images/products/chaussures-nike-air-max-95-1.jpg',
    primaryOriginal: true,
    images: [
      '/images/products/chaussures-nike-air-max-95-2.jpg',
      '/images/products/chaussures-nike-air-max-95-3.jpg',
    ],
    extraImages: [
      '/images/products/chaussures-nike-air-max-95-4.jpg',
      '/images/products/chaussures-nike-air-max-95-5.jpg',
      '/images/products/chaussures-nike-air-max-95-6.jpg',
    ],
  },
  'chaussures-asics-gel-kayano-14': {
    original: '/images/products/chaussures-asics-gel-kayano-14-1.jpg',
    primaryOriginal: true,
    images: ['/images/products/chaussures-asics-gel-kayano-14-2.jpg'],
    extraImages: [],
  },
  'chaussures-adidas-campus-bad-bunny': {
    original: '/images/products/chaussures-adidas-campus-bad-bunny-1.jpg',
    primaryOriginal: true,
    images: [
      '/images/products/chaussures-adidas-campus-bad-bunny-2.jpg',
      '/images/products/chaussures-adidas-campus-bad-bunny-3.jpg',
    ],
    extraImages: ['/images/products/chaussures-adidas-campus-bad-bunny-4.jpg'],
  },
  'chaussures-nike-air-max-tn': {
    original: '/images/products/chaussures-nike-air-max-tn-1.jpg',
    primaryOriginal: true,
    images: ['/images/products/chaussures-nike-air-max-tn-2.jpg'],
    extraImages: [],
  },
  // Arrivage Mode Timberland & New Balance (nov. 2026) : photo studio unique
  // par modèle, générée pour la fiche (voir SOURCES_PHOTOS_PRODUITS.md).
  'timberland-bot-6-pouces-premium': {
    original: '/images/products/mode-timberland-bot-6-pouces-premium.jpg',
    primaryOriginal: true,
    images: [],
    generated: ['/images/products/mode-timberland-bot-6-pouces-premium.jpg'],
  },
  'timberland-chelsea-noir-cuir': {
    original: '/images/products/mode-timberland-chelsea-noir.jpg',
    primaryOriginal: true,
    images: [],
    generated: ['/images/products/mode-timberland-chelsea-noir.jpg'],
  },
  'timberland-euro-hiker-randonnee': {
    original: '/images/products/mode-timberland-euro-hiker-randonnee.jpg',
    primaryOriginal: true,
    images: [],
    generated: ['/images/products/mode-timberland-euro-hiker-randonnee.jpg'],
  },
  'new-balance-574-gris': {
    original: '/images/products/mode-new-balance-574-gris.jpg',
    primaryOriginal: true,
    images: [],
    generated: ['/images/products/mode-new-balance-574-gris.jpg'],
  },
  'new-balance-990v6-gris': {
    original: '/images/products/mode-new-balance-990v6-gris.jpg',
    primaryOriginal: true,
    images: [],
    generated: ['/images/products/mode-new-balance-990v6-gris.jpg'],
  },
  'new-balance-327-blanc': {
    original: '/images/products/mode-new-balance-327-blanc.jpg',
    primaryOriginal: true,
    images: [],
    generated: ['/images/products/mode-new-balance-327-blanc.jpg'],
  },
};
