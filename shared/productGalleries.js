// Photos supplémentaires identifiées par référence. Les photos issues de la
// base administrateur restent prioritaires sur ces vues du catalogue.
export const PRODUCT_GALLERIES = {
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
    images: ['/images/gallery/bouilloire-rouge-ia-bleu.png', '/images/gallery/bouilloire-rouge-ia-blanc.png'],
    generated: ['/images/gallery/bouilloire-rouge-ia-bleu.png', '/images/gallery/bouilloire-rouge-ia-blanc.png'],
    imaginedColors: ['/images/gallery/bouilloire-rouge-ia-bleu.png', '/images/gallery/bouilloire-rouge-ia-blanc.png'],
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
    images: ['/images/gallery/stpe-251u-profil.jpg', '/images/gallery/stpe-251u-ia-bleu.png', '/images/gallery/stpe-251u-ia-vert.png'],
    galleryAfterPrimary: ['/images/gallery/stpe-251u-ia-bleu.png', '/images/gallery/stpe-251u-ia-vert.png'],
    generated: ['/images/gallery/stpe-251u-ia-bleu.png', '/images/gallery/stpe-251u-ia-vert.png'],
    imaginedColors: ['/images/gallery/stpe-251u-ia-bleu.png', '/images/gallery/stpe-251u-ia-vert.png'],
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
};
