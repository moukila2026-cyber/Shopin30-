// ==============================================================================
// Routage par URL réelle (sans dépendance externe) : /produit/:slug, /rayon/:id,
// /ville/:slug. Indispensable pour que le sitemap, Google et WhatsApp mènent
// directement sur la bonne fiche au lieu de simples ancres sur la page d'accueil.
// ==============================================================================
import { SITE_URL } from './seo.js';

/**
 * @returns {{name: 'home'|'product'|'rayon'|'ville', param?: string}}
 */
export function parseRoute(pathname = typeof window !== 'undefined' ? window.location.pathname : '/') {
  const clean = String(pathname || '/').replace(/\/+$/, '').replace(/\.html$/, '') || '/';
  const segments = clean.split('/').filter(Boolean);
  if (segments.length >= 2) {
    const [kind, param] = segments;
    if (kind === 'produit' && param) return { name: 'product', param: decodeURIComponent(param) };
    if (kind === 'rayon' && param) return { name: 'rayon', param: decodeURIComponent(param) };
    if (kind === 'ville' && param) return { name: 'ville', param: decodeURIComponent(param) };
  }
  return { name: 'home' };
}

export function productPath(slug) {
  return `/produit/${slug}`;
}
export function rayonPath(id) {
  return `/rayon/${id}`;
}
export function cityPath(slug) {
  return `/ville/${slug}`;
}

/** Pousse une URL dans l'historique sans recharger la page. */
export function pushRoute(path) {
  if (typeof window === 'undefined') return;
  const current = window.location.pathname + window.location.hash;
  if (current === path) return;
  window.history.pushState({ pkd: true }, '', path);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Remplace l'URL courante (fermeture d'une fiche produit par exemple). */
export function replaceRoute(path) {
  if (typeof window === 'undefined') return;
  window.history.replaceState({ pkd: true }, '', path);
}

// ------------------------------------------------------------------------------
// Villes desservies : contenu local unique (SEO) aligné sur les zones réelles.
// ------------------------------------------------------------------------------
export const CITIES = [
  {
    slug: 'daloa',
    name: 'Daloa',
    region: 'Haut-Sassandra',
    zoneIds: ['daloa-commune', 'daloa-peripherie'],
    fee: 1000,
    eta: 'Le jour même avant 15h',
    title: 'Livraison à Daloa — 1 000 F en commune, 1 500 F en périphérie',
    intro:
      'Daloa est notre ville d’attache : notre magasin et notre atelier de préparation de commandes s’y trouvent. Vous commandez avant 15h, nous livrons le jour même à Lobia, Tazibouo, Commerce, Orly, Kennedy, Abattoir et dans toute la commune. Le paiement à la livraison en espèces est possible uniquement ici.',
    highlights: [
      'Livraison le jour même pour toute commande validée avant 15h00',
      '1 000 F en commune, 1 500 F en périphérie (Bribouo, Gbokora, Gonaté…)',
      'Paiement à la livraison en espèces accepté',
      'Retrait gratuit possible à notre point de vente',
    ],
  },
  {
    slug: 'issia',
    name: 'Issia',
    region: 'Haut-Sassandra',
    zoneIds: ['expedition-issia'],
    fee: 2000,
    eta: 'Sous 24h',
    title: 'Expédition vers Issia — 2 000 F, départ chaque jour',
    intro:
      'Nous expédions à Issia par les transporteurs UTB et AVS : remise au car le matin, retrait en gare le jour même ou le lendemain selon l’heure de la commande. Les colis volumineux (quincaillerie, électroménager) sont sanglés et filmés.',
    highlights: [
      'Expédition 2 000 F, colis remis au transporteur le jour même',
      'Retrait en gare UTB ou AVS à Issia',
      'Paiement Wave, Orange Money, MTN MoMo ou Moov Money',
      'Suivi du colis par Code QR jusqu’au retrait',
    ],
  },
  {
    slug: 'vavoua',
    name: 'Vavoua',
    region: 'Haut-Sassandra',
    zoneIds: ['expedition-vavoua'],
    fee: 2000,
    eta: 'Sous 24h',
    title: 'Expédition vers Vavoua — 2 000 F, transporteur UTB/AVS',
    intro:
      'Vavoua est desservie tous les jours par nos expéditions groupées. Vous réservez en ligne, nous préparons le colis et le remettons au car : vous n’avez plus qu’à le retirer en gare avec votre référence et votre Code QR.',
    highlights: [
      'Expédition 2 000 F par UTB ou AVS',
      'Préparation sous 2h ouvrées',
      'Paiement mobile money avant expédition',
      'Notification WhatsApp dès la remise au transporteur',
    ],
  },
  {
    slug: 'zoukougbeu',
    name: 'Zoukougbeu',
    region: 'Haut-Sassandra',
    zoneIds: ['expedition-zoukougbeu'],
    fee: 2000,
    eta: '24h à 48h',
    title: 'Expédition vers Zoukougbeu — quincaillerie et électroménager',
    intro:
      'Zoukougbeu est un axe agricole : nous y livrons surtout de la quincaillerie BTP (ciment-colle, robinetterie, câblage) et de l’électroménager pour les foyers. Les expéditions partent avec les cars de la ligne Daloa–Zoukougbeu.',
    highlights: [
      'Expédition 2 000 F',
      'Stock quincaillerie et électroménager disponible immédiatement',
      'Colis filmés et sanglés pour la route',
      'Facture et garantie fournies avec chaque appareil',
    ],
  },
  {
    slug: 'bouafle',
    name: 'Bouaflé',
    region: 'Marahoué',
    zoneIds: ['expedition-bouafle-sinfra'],
    fee: 2000,
    eta: 'Sous 24h',
    title: 'Expédition vers Bouaflé — 2 000 F depuis Daloa',
    intro:
      'Bouaflé est reliée à Daloa par la route de Yamoussoukro. Nous expédions chaque jour ouvrable ; pour les commandes volumineuses, nous privilégions un car direct afin d’éviter les transbordements.',
    highlights: [
      'Expédition 2 000 F, départ quotidien',
      'Suivi Code QR partagé sur WhatsApp',
      'Appareils électroménagers testés avant départ',
      'Paiement mobile money sécurisé',
    ],
  },
  {
    slug: 'sinfra',
    name: 'Sinfra',
    region: 'Marahoué',
    zoneIds: ['expedition-bouafle-sinfra'],
    fee: 2000,
    eta: 'Sous 24h',
    title: 'Expédition vers Sinfra — petit électroménager et maison',
    intro:
      'Sinfra commande régulièrement du petit électroménager et des articles maison. Les colis légers partent par transporteur, les gros appareils par un car dédié pour éviter les chocs.',
    highlights: [
      'Expédition 2 000 F',
      'Emballage renforcé pour les appareils fragiles',
      'Assistance WhatsApp au +225 05 01 30 33 43',
      'Retour sous 7 jours si l’article ne convient pas',
    ],
  },
  {
    slug: 'gagnoa',
    name: 'Gagnoa',
    region: 'Gôh',
    zoneIds: ['expedition-gagnoa-alentours'],
    fee: 2000,
    eta: '24h à 48h',
    title: 'Expédition vers Gagnoa — électroménager et BTP',
    intro:
      'Gagnoa est l’une de nos destinations les plus demandées pour les réfrigérateurs, congélateurs et le matériel électrique. Le tarif d’expédition reste à 2 000 F, selon la taille et le poids du colis.',
    highlights: [
      'Expédition 2 000 F',
      'Réfrigérateurs et congélateurs emballés d’origine',
      'Garantie constructeur conservée',
      'Paiement Wave / Orange Money / MTN / Moov',
    ],
  },
  {
    slug: 'soubre',
    name: 'Soubré',
    region: 'Nawa',
    zoneIds: ['expedition-gagnoa-alentours'],
    fee: 2000,
    eta: '24h à 48h',
    title: 'Expédition vers Soubré — matériel BTP et maison',
    intro:
      'À Soubré, nos clients commandent surtout du matériel BTP et de l’outillage pour les chantiers. Nous groupons les commandes lourdes pour limiter les frais et nous filmons les colis avant le départ.',
    highlights: [
      'Expédition 2 000 F',
      'Groupage possible pour les commandes de chantier',
      'Devis WhatsApp pour les grosses quantités',
      'Suivi Code QR jusqu’à la réception',
    ],
  },
];

export function getCity(slug) {
  return CITIES.find((c) => c.slug === String(slug || '').toLowerCase()) || null;
}

/** URL canonique d'une page ville. */
export function cityUrl(slug) {
  return `${SITE_URL}/ville/${slug}`;
}
