// ==============================================================================
// PÈRÔKADÔ — Catalogue initial, catégories, zones de livraison (Daloa & expédition)
// ==============================================================================

export const BRAND = {
  name: 'Pèrôkadô',
  tagline: 'Votre boutique en ligne de référence à Daloa & villes aux alentours',
  shortDescription:
    'Tous vos produits du quotidien, cadeaux, high-tech, mode, beauté et maison livrés à Daloa et expédiés vers Issia, Vavoua et les villes aux alentours.',
  city: 'Daloa, Côte d’Ivoire',
  defaultWhatsapp: '2250501303343',
  defaultWavePhone: '05 01 30 33 43',
  defaultWavePaymentUrl: '',
  shippingDisclaimer:
    'Aucune livraison gratuite. Les tarifs affichés sont les tarifs de base : le coût final dépend de la taille et du poids de la marchandise. Pour les colis volumineux ou lourds, contactez notre service client.',
  studioCredit: {
    name: 'Shopin30',
    phoneDisplay: '+225 05 01 30 33 43',
    whatsappUrl:
      'https://wa.me/2250501303343?text=' +
      encodeURIComponent(
        'Bonjour Shopin30, je visite la boutique Pèrôkadô et souhaite vous contacter.'
      ),
  },
};

export const CATEGORIES = [
  { id: 'all', label: 'Tous les produits', shortLabel: 'Tout' },
  { id: 'high-tech', label: 'High-Tech & Téléphonie', shortLabel: 'High-Tech' },
  { id: 'mode', label: 'Mode & Accessoires', shortLabel: 'Mode' },
  { id: 'beaute-cadeaux', label: 'Beauté, Parfums & Cadeaux', shortLabel: 'Beauté & Cadeaux' },
  { id: 'maison', label: 'Maison & Électroménager', shortLabel: 'Maison' },
];

export const DELIVERY_ZONES = [
  {
    id: 'daloa-commune',
    name: 'Daloa Commune (Lobia, Tazibouo, Commerce, Orly, Kennedy, Abattoir, Soleil…)',
    shortName: 'Daloa Commune',
    fee: 1000,
    eta: 'Livraison rapide 1h–3h · Tarif de base (selon taille/poids)',
  },
  {
    id: 'daloa-peripherie',
    name: 'Daloa Périphérie (Bribouo, Gbokora, Gonaté, Bédiala, Zaïbo…)',
    shortName: 'Daloa Périphérie',
    fee: 1500,
    eta: 'Livraison le jour même · Tarif de base (selon taille/poids)',
  },
  {
    id: 'expedition-issia',
    name: 'Expédition — Issia',
    shortName: 'Expédition Issia',
    fee: 2000,
    eta: 'Expédition sous 24h · Dès 2 000 F selon taille et poids du colis',
  },
  {
    id: 'expedition-vavoua',
    name: 'Expédition — Vavoua',
    shortName: 'Expédition Vavoua',
    fee: 2000,
    eta: 'Expédition sous 24h · Dès 2 000 F selon taille et poids du colis',
  },
  {
    id: 'expedition-zoukougbeu',
    name: 'Expédition — Zoukougbeu',
    shortName: 'Expédition Zoukougbeu',
    fee: 2000,
    eta: 'Expédition 24h–48h · Dès 2 000 F selon taille et poids du colis',
  },
  {
    id: 'expedition-bouafle-sinfra',
    name: 'Expédition — Bouaflé / Sinfra',
    shortName: 'Expédition Bouaflé / Sinfra',
    fee: 2000,
    eta: 'Expédition sous 24h · Dès 2 000 F selon taille et poids du colis',
  },
  {
    id: 'expedition-gagnoa-alentours',
    name: 'Expédition — Gagnoa / Soubré / Duékoué / Séguéla & autres villes',
    shortName: 'Expédition Autres villes alentours',
    fee: 2000,
    eta: 'Expédition 24h–48h · Dès 2 000 F selon taille et poids (contactez le service client)',
  },
];

export const DELIVERY_SLOTS = [
  { id: 'matin', label: 'Matin (08h00 – 12h00)' },
  { id: 'apres-midi', label: 'Après-midi (12h00 – 16h00)' },
  { id: 'soir', label: 'Fin de journée (16h00 – 19h30)' },
];

// Paiement en ligne UNIQUEMENT par Wave
export const PAYMENT_METHODS = [
  {
    id: 'wave',
    label: 'Paiement en ligne Wave uniquement',
    description:
      'Réglez uniquement en ligne via Wave Côte d’Ivoire et obtenez votre référence avec Code QR de suivi en direct.',
  },
];

export const INITIAL_PRODUCTS = [
  {
    id: 'smartphone-nova-x12',
    slug: 'smartphone-nova-x12-128go',
    name: 'Smartphone Nova X12 — 128 Go / Double SIM',
    category: 'high-tech',
    price: 74900,
    compareAtPrice: 89000,
    stock: 12,
    badge: 'Meilleure vente',
    featured: true,
    shortDescription: 'Écran HD+ 6,7", batterie longue durée 5000 mAh, double capteur photo 50 MP.',
    description:
      'Pensé pour une autonomie de deux jours complets, le Nova X12 offre 128 Go de stockage, 6 Go de RAM extensible, déverrouillage par empreinte digitale et charge rapide USB-C. Livré neuf en boîte scellée avec coque transparente et chargeur.',
    specs: ['Stockage 128 Go + port MicroSD', 'Batterie 5000 mAh charge rapide 33W', 'Garantie boutique 6 mois à Daloa'],
    imageUrl: '/images/products/smartphone-nova-x12.jpg',
  },
  {
    id: 'ecouteurs-airpulse-pro',
    slug: 'ecouteurs-sans-fil-airpulse-pro',
    name: 'Écouteurs Sans Fil AirPulse Pro ANC',
    category: 'high-tech',
    price: 14500,
    compareAtPrice: 19500,
    stock: 25,
    badge: 'Promo -25%',
    featured: true,
    shortDescription: 'Réduction active du bruit, basses profondes et boîtier de charge autonomie 30h.',
    description:
      'Idéals pour vos appels et votre musique en déplacement. Connexion Bluetooth 5.3 instantanée compatible Android et iPhone, résistance à la transpiration IPX4 et commandes tactiles intuitives.',
    specs: ['Bluetooth 5.3 universel (Android & iOS)', 'Autonomie totale 30 heures avec boîtier', 'Micro HD pour appels clairs'],
    imageUrl: '/images/products/ecouteurs-airpulse-pro.jpg',
  },
  {
    id: 'montre-chronofit-gold',
    slug: 'montre-connectee-chronofit-gold',
    name: 'Montre Connectée ChronoFit Édition Or & Émeraude',
    category: 'high-tech',
    price: 22900,
    compareAtPrice: 28000,
    stock: 15,
    badge: 'Idée cadeau',
    featured: true,
    shortDescription: 'Appels Bluetooth au poignet, notifications WhatsApp, suivi santé et écran AMOLED.',
    description:
      'Alliez élégance et technologie avec son boîtier doré brossé et son bracelet vert forêt ultra-confortable. Recevez vos appels et notifications WhatsApp directement au poignet, avec une autonomie allant jusqu’à 7 jours.',
    specs: ['Écran AMOLED haute luminosité', 'Appels Bluetooth + Notifications WhatsApp', 'Étanche IP68 · Charge magnétique'],
    imageUrl: '/images/products/montre-chronofit-gold.jpg',
  },
  {
    id: 'sac-cuir-abidjan-prestige',
    slug: 'sac-a-main-cuir-terracotta-prestige',
    name: 'Sac à Main Structuré Terracotta Prestige',
    category: 'mode',
    price: 18500,
    compareAtPrice: 24000,
    stock: 10,
    badge: 'Collection Chic',
    featured: true,
    shortDescription: 'Finition grainée haut de gamme, fermoir doré et bandoulière amovible.',
    description:
      'Un sac structuré chic et spacieux conçu pour accompagner vos journées de travail comme vos sorties et cérémonies. Trois compartiments intérieurs dont une poche zippée sécurisée et bandoulière réglable incluse.',
    specs: ['Similicuir grainé premium résistant', 'Porté main ou bandoulière amovible', 'Dimensions : 28 × 22 × 12 cm'],
    imageUrl: '/images/products/sac-cuir-abidjan-prestige.jpg',
  },
  {
    id: 'sneakers-urban-ivoire',
    slug: 'sneakers-urban-ivoire-edition',
    name: 'Sneakers Urban Ivoire & Terracotta (Unisexe)',
    category: 'mode',
    price: 19900,
    compareAtPrice: 25000,
    stock: 18,
    badge: 'Nouveauté',
    featured: false,
    shortDescription: 'Design urbain épuré, semelle cousue antidérapante et confort respirant toute la journée.',
    description:
      'Des baskets polyvalentes aux couleurs signatures crème, terracotta et vert profond. Semelle intérieure à mémoire de forme pour un confort optimal. Pointures disponibles du 38 au 45 (à préciser en note).',
    specs: ['Pointures 38 à 45 (précisez en note)', 'Semelle cousue ultra-résistante', 'Doublure intérieure respirante'],
    imageUrl: '/images/products/sneakers-urban-ivoire.jpg',
  },
  {
    id: 'coffret-parfum-oud-royal',
    slug: 'coffret-eau-de-parfum-oud-royal-100ml',
    name: 'Coffret Eau de Parfum Oud & Ambre Royal — 100 ml',
    category: 'beaute-cadeaux',
    price: 16500,
    compareAtPrice: 22000,
    stock: 20,
    badge: 'Cadeau parfait',
    featured: true,
    shortDescription: 'Sillage intense longue tenue aux notes boisées d’ambre, vanille et bois de oud.',
    description:
      'Présenté dans son coffret cadeau rigide prêt à offrir, ce parfum mixte dévoile des notes chaleureuses et raffinées qui tiennent plus de 24 heures sur les vêtements. Le cadeau idéal pour anniversaires, fêtes et mariages.',
    specs: ['Flacon vaporisateur 100 ml + Coffret cadeau', 'Eau de Parfum concentrée longue tenue', 'Notes : Bergamote, Ambre doré, Oud doux'],
    imageUrl: '/images/products/coffret-parfum-oud-royal.jpg',
  },
  {
    id: 'gamme-soin-karite-or',
    slug: 'coffret-soin-visage-corps-karite-or',
    name: 'Coffret Soin Éclat Karité Pur & Huile Précieuse (4 pièces)',
    category: 'beaute-cadeaux',
    price: 13900,
    compareAtPrice: 17500,
    stock: 16,
    badge: 'Naturel',
    featured: false,
    shortDescription: 'Routine complète hydratante et nourrissante au beurre de karité ivoirien et vitamine E.',
    description:
      'Sublimez votre peau au quotidien grâce à ce coffret 4 pièces comprenant une crème fouettée au karité pur, un sérum éclat vitamine E, un gommage doux et un baume réparateur. Convient à tous les types de peaux.',
    specs: ['Enrichi au beurre de karité naturel de Côte d’Ivoire', 'Sans parabènes ni agents agressifs', 'Coffret 4 soins complets visage & corps'],
    imageUrl: '/images/products/gamme-soin-karite-or.jpg',
  },
  {
    id: 'blender-multifonction-chefpro',
    slug: 'blender-multifonction-chefpro-inox-1500w',
    name: 'Blender Multifonction ChefPro Inox 1,8L + Moulin',
    category: 'maison',
    price: 24500,
    compareAtPrice: 31000,
    stock: 14,
    badge: 'Indispensable',
    featured: true,
    shortDescription: 'Moteur puissant 1500W, bol en verre épais 1,8L et moulin sec en inox pour épices et café.',
    description:
      'Préparez smoothies, jus naturels, sauces, purées et moulez vos épices en quelques secondes. Doté de 6 lames en acier inoxydable japonais, de 5 vitesses + fonction Pulse glace pilée et d’une protection thermique du moteur.',
    specs: ['Bol en verre renforcé 1,8 Litre + Moulin épices', '6 lames en acier inoxydable · 1500W', 'Pieds ventouses antidérapants'],
    imageUrl: '/images/products/blender-multifonction-chefpro.jpg',
  },
  {
    id: 'ventilateur-solaire-eco',
    slug: 'ventilateur-rechargeable-solaire-autonomie-12h',
    name: 'Ventilateur Rechargeable + Panneau Solaire & LED (Autonomie 12h)',
    category: 'maison',
    price: 34900,
    compareAtPrice: 42000,
    stock: 9,
    badge: 'Anti-délestage',
    featured: true,
    shortDescription: 'Fonctionne sur secteur et batterie intégrée avec panneau solaire inclus, port USB et veilleuse LED.',
    description:
      'Restez au frais même en cas de coupure d’électricité ! Ce ventilateur sur pied réglable intègre une batterie haute capacité offrant jusqu’à 12 heures de ventilation silencieuse, un port USB pour recharger votre téléphone et un panneau solaire.',
    specs: ['Double recharge : Secteur 220V + Panneau solaire inclus', 'Autonomie 8h à 12h + Port USB Powerbank', 'Veilleuse LED intégrée & télécommande'],
    imageUrl: '/images/products/ventilateur-solaire-eco.jpg',
  },
];

export const INITIAL_PROMO_CODES = [
  {
    code: 'BIENVENUE10',
    discountType: 'percent',
    discountValue: 10,
    minSubtotal: 10000,
    maxDiscount: 10000,
    active: true,
    description: '-10% sur les articles dès 10 000 FCFA (hors livraison)',
  },
  {
    code: 'DALOA2000',
    discountType: 'fixed',
    discountValue: 2000,
    minSubtotal: 25000,
    maxDiscount: 2000,
    active: true,
    description: '-2 000 FCFA sur les articles dès 25 000 FCFA (hors livraison)',
  },
];

export function formatFcfa(amount) {
  const n = Math.round(Number(amount) || 0);
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
}

export function normalizeIvorianPhone(raw) {
  const digits = String(raw || '').replace(/\D/g, '');
  if (digits.startsWith('225') && digits.length === 13) return digits;
  if (digits.startsWith('00225') && digits.length === 15) return digits.slice(2);
  if (digits.length === 10 && /^0[157]/.test(digits)) return '225' + digits;
  return digits;
}

export function formatPhoneDisplay(raw) {
  const norm = normalizeIvorianPhone(raw);
  if (norm.length === 13 && norm.startsWith('225')) {
    const local = norm.slice(3);
    return `+225 ${local.replace(/(\d{2})(?=\d)/g, '$1 ').trim()}`;
  }
  return String(raw || '').trim();
}
