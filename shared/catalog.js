// ==============================================================================
// PÈRÔKADÔ — Catalogue officiel (Gamme Électroménager SMART TECHNOLOGY + rayons),
// catégories, zones de livraison Daloa & expédition sans gratuité
// ==============================================================================

export const BRAND = {
  name: 'Pèrôkadô',
  tagline: 'Motos & Tricycles, Électroménager SMART TECHNOLOGY, Quincaillerie INGCO, Sanitaires & Maison à Daloa',
  shortDescription:
    'Motos neuves & Tricycles Cargo, Électroménager & Google TV SMART TECHNOLOGY, Quincaillerie & Outillage INGCO, Sanitaires FRENCIA, Mobilier, Jouets et Cadeaux livrés à Daloa et expédiés partout en Côte d’Ivoire.',
  city: 'Daloa, Côte d’Ivoire',
  defaultWhatsapp: '2250501303343',
  defaultWavePhone: '+225 05 46 69 74 78',
  defaultWavePaymentUrl: '',
  shippingDisclaimer:
    'Aucune livraison gratuite. Colis standards : Daloa Commune 1 000 F · Périphérie 1 500 F · Expédition hors Daloa 2 000 F. Produits lourds & volumineux (motos, tricycles, lave-linge, gazinières, réfrigérateurs, congélateurs, fontaines à eau, TV grand écran, packs WC, salons…) : 2 500 F dans Daloa et 5 000 F en expédition hors de Daloa.',
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
  { id: 'quincaillerie-btp', label: 'Quincaillerie, Outillage INGCO & Sanitaires', shortLabel: 'Quincaillerie & BTP' },
  { id: 'jouets-enfants', label: 'Jouets, Jeux & Univers Enfants', shortLabel: 'Jouets & Enfants' },
  { id: 'motos-tricycles', label: 'Motos & Tricycles Cargo', shortLabel: 'Motos & Tricycles' },
  { id: 'froid', label: 'Réfrigérateurs, Congélateurs & Fontaines SMART', shortLabel: 'Frigos & Froid' },
  { id: 'lavage-cuisson', label: 'Lave-linge & Cuisinières SMART', shortLabel: 'Lavage & Gazinières' },
  { id: 'maison', label: 'Cuisine, Maison, Petit Électroménager & Mobilier', shortLabel: 'Cuisine & Maison' },
  { id: 'high-tech', label: 'Google TV, Audio, High-Tech & Téléphonie', shortLabel: 'TV, Son & High-Tech' },
  { id: 'mode', label: 'Mode & Accessoires', shortLabel: 'Mode' },
  { id: 'beaute-cadeaux', label: 'Beauté, Parfums & Cadeaux', shortLabel: 'Beauté & Cadeaux' },
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

// Paiement en ligne 100% Wave Côte d'Ivoire (sans frais d'agrégateur)
export const PAYMENT_METHODS = [
  {
    id: 'wave',
    label: 'Paiement sécurisé Wave Côte d’Ivoire (+225 05 46 69 74 78)',
    description:
      'Réglez votre commande via Wave Côte d’Ivoire uniquement (aucun paiement à la livraison) et obtenez immédiatement votre référence avec Code QR de suivi en direct.',
  },
];

export const SMART_TECHNOLOGY_PRODUCTS = [
  // ================= FROID : RÉFRIGÉRATEURS & VITRINES SMART TECHNOLOGY =================
  {
    id: 'smart-frigo-4-portes-inverter-inox',
    slug: 'smart-technology-refrigerateur-americain-4-portes-inverter-inox',
    name: 'Réfrigérateur Américain 4 Portes SMART TECHNOLOGY ProSmart Inverter — Gris Inox',
    category: 'froid',
    price: 395000,
    compareAtPrice: 480000,
    stock: 4,
    badge: 'Meilleure vente',
    featured: true,
    shortDescription:
      'Compresseur ProSmart Inverter ultra-économique, froid ventilé No-Frost, écran tactile LED en façade et grande capacité familiale.',
    description:
      'Conservez vos aliments frais beaucoup plus longtemps tout en réduisant votre facture CIE grâce au compresseur ProSmart Inverter silencieux. Son architecture Cross-Door 4 portes offre une organisation optimale entre produits frais en haut et compartiments de congélation rapide en bas, avec affichage numérique tactile en façade.',
    specs: [
      'Marque officielle SMART TECHNOLOGY · Compresseur ProSmart Inverter',
      'Technologie No-Frost (sans givre) & flux d’air multi-niveaux',
      'Panneau de contrôle digital LED externe · Congélation rapide',
      'Finition Acier Inox Gris Brossé anti-traces · Garantie 12 mois',
    ],
    imageUrl: '/images/products/smart-frigo-4-portes-inverter-inox.jpg',
  },
  {
    id: 'smart-frigo-french-door-distributeur-eau',
    slug: 'smart-technology-refrigerateur-french-door-tiroirs-distributeur-eau',
    name: 'Réfrigérateur Multi-Portes French Door SMART TECHNOLOGY + Distributeur d’Eau — Gris Inox',
    category: 'froid',
    price: 435000,
    compareAtPrice: 525000,
    stock: 3,
    badge: 'Haut de Gamme',
    featured: true,
    shortDescription:
      'Double porte supérieure panoramique + 2 grands tiroirs congélateur coulissants et fontaine d’eau fraîche en façade.',
    description:
      'Le summum du confort familial SMART TECHNOLOGY : accédez à de l’eau fraîche à tout moment sans ouvrir le frigo grâce au distributeur intégré. Ses deux larges tiroirs bas sur rails renforcés facilitent le rangement des viandes, poissons et surgelés volumineux sans perte de froid.',
    specs: [
      '2 Portes French Door + 2 Tiroirs Congélateur grand volume',
      'Distributeur d’eau fraîche intégré en façade',
      'Technologie ProSmart Inverter basse consommation CIE',
      'Froid homogène sans givre · Garantie 12 mois',
    ],
    imageUrl: '/images/products/smart-frigo-french-door-distributeur-eau.jpg',
  },
  {
    id: 'smart-frigo-multi-portes-verre-noir',
    slug: 'smart-technology-refrigerateur-multi-portes-inverter-verre-noir-miroir',
    name: 'Réfrigérateur Multi-Portes SMART TECHNOLOGY Inverter — Édition Verre Noir Miroir',
    category: 'froid',
    price: 425000,
    compareAtPrice: 510000,
    stock: 3,
    badge: 'Édition Prestige',
    featured: true,
    shortDescription:
      'Façade luxueuse en verre trempé noir miroir, compresseur Inverter silencieux, sans givre et commandes tactiles lumineuses.',
    description:
      'Sublimez votre cuisine ou votre salon avec cette édition Verre Noir Miroir signée SMART TECHNOLOGY. Équipé d’un compresseur Inverter haute efficacité, il garantit une congélation rapide, zéro givre et une conservation longue durée des fruits, légumes et boissons.',
    specs: [
      'Façade design en verre trempé Noir Miroir haut de gamme',
      'Compresseur Inverter silencieux & économique',
      'Système Total No-Frost + Congélation rapide',
      'Commandes tactiles verticales intégrées · Garantie 12 mois',
    ],
    imageUrl: '/images/products/smart-frigo-multi-portes-verre-noir-inverter.jpg',
  },
  {
    id: 'smart-frigo-combine-2-portes-led',
    slug: 'smart-technology-refrigerateur-combine-2-portes-ecran-led-gris',
    name: 'Réfrigérateur Combiné 2 Portes SMART TECHNOLOGY Inverter Écran LED — Gris Anthracite',
    category: 'froid',
    price: 249000,
    compareAtPrice: 299000,
    stock: 5,
    badge: 'Économie d’énergie',
    featured: true,
    shortDescription:
      'Format combiné familial avec congélateur en bas, affichage digital LED en façade et basse consommation énergétique.',
    description:
      'Idéal pour les appartements et maisons familiales à Daloa : le réfrigérateur en haut à hauteur des yeux et le grand congélateur en bas. Doté d’un écran LED de contrôle de température sur la porte et d’une isolation renforcée contre les coupures de courant.',
    specs: [
      'Combiné 2 battants (Réfrigérateur haut + Congélateur bas)',
      'Écran de contrôle numérique LED en façade',
      'Classe énergétique économique · Gaz R600a écologique',
      'Clayettes en verre trempé ultra-résistantes',
    ],
    imageUrl: '/images/products/smart-frigo-combine-2-portes-led-gris.jpg',
  },
  {
    id: 'smart-vitrine-refrigeree-verticale',
    slug: 'smart-technology-vitrine-refrigeree-verticale-commerciale',
    name: 'Vitrine Réfrigérée Verticale Vitrée SMART TECHNOLOGY — Spécial Commerce & Boissons',
    category: 'froid',
    price: 245000,
    compareAtPrice: 295000,
    stock: 4,
    badge: 'Pro Commerce',
    featured: false,
    shortDescription:
      'Porte vitrée panoramique double vitrage, 5 grilles réglables multi-niveaux, refroidissement rapide spécial maquis, boutique & supermarché.',
    description:
      'Boostez vos ventes de boissons fraîches, jus, yaourts et eau minérale avec cette armoire vitrée professionnelle SMART TECHNOLOGY. Refroidissement ventilé ultra-rapide adapté au climat tropical de Côte d’Ivoire, éclairage intérieur et serrure de sécurité.',
    specs: [
      'Porte vitrée panoramique anti-buée haute visibilité',
      '5 étagères métalliques renforcées ajustables en hauteur',
      'Thermostat réglable · Froid puissant spécial boissons',
      'Idéal boutiques, restaurants, pharmacies & caves à Daloa',
    ],
    imageUrl: '/images/products/smart-vitrine-refrigeree-verticale.jpg',
  },

  // ================= LAVAGE & CUISSON : MACHINES À LAVER & GAZINIÈRES =================
  {
    id: 'smart-lavante-sechante-12-7kg-air-wash',
    slug: 'smart-technology-machine-lavante-sechante-12-7kg-direct-drive-air-wash',
    name: 'Machine Lavante-Séchante SMART TECHNOLOGY 12 Kg / 7 Kg — Direct Drive Inverter Air Wash',
    category: 'lavage-cuisson',
    price: 315000,
    compareAtPrice: 385000,
    stock: 3,
    badge: '2-en-1 Lavage + Séchage',
    featured: true,
    shortDescription:
      'Lave 12 kg et sèche 7 kg ! Moteur Direct Drive Inverter ultra-silencieux et technologie Air Wash anti-odeurs & stérilisation 99,9%.',
    description:
      'Plus besoin d’étendre le linge sous la pluie : cette lavante-séchante grand tambour (12 kg lavage / 7 kg séchage) lave, désinfecte à l’air chaud (Air Wash) et sèche draps, couettes et habits de toute la famille avec une consommation d’eau et d’électricité réduite.',
    specs: [
      'Double capacité XXL : 12 Kg Lavage + 7 Kg Séchage intégré',
      'Moteur Direct Drive Inverter sans courroie (fiabilité maximale)',
      'Technologie Air Wash : élimine odeurs & 99,9% des bactéries',
      'Programme Lavage Rapide + Sécurité enfant · Garantie 12 mois',
    ],
    imageUrl: '/images/products/smart-lavante-sechante-12-7kg-air-wash.jpg',
  },
  {
    id: 'smart-lave-linge-12kg-spa-wash',
    slug: 'smart-technology-machine-a-laver-frontale-12kg-spa-wash-inverter',
    name: 'Machine à Laver Frontale SMART TECHNOLOGY 12 Kg Spa Wash — Écran Tactile Classe A+',
    category: 'lavage-cuisson',
    price: 269000,
    compareAtPrice: 330000,
    stock: 4,
    badge: 'Grand Tambour 12 Kg',
    featured: true,
    shortDescription:
      'Soin vapeur Spa Wash, large bandeau LED tactile moderne, classe énergétique A+ et tambour familial pour couettes et rideaux.',
    description:
      'Dotée d’un large écran tactile panoramique sans bouton mécanique saillant, la machine Spa Wash SMART TECHNOLOGY offre un lavage en profondeur tout en préservant les fibres textiles délicates (bazins, pagnes, chemises et draps épais).',
    specs: [
      'Grande capacité 12 Kg · Finition Gris Anthracite Premium',
      'Technologie Spa Wash soin vapeur & hygiène renforcée',
      'Large écran digital tactile intuitif · Classe énergétique A+',
      'Moteur Inverter silencieux & anti-vibrations',
    ],
    imageUrl: '/images/products/smart-lave-linge-frontal-12kg-spa-wash.jpg',
  },
  {
    id: 'smart-lave-linge-10kg-stml-108m',
    slug: 'smart-technology-machine-a-laver-frontale-10kg-bldc-inverter-stml-108m',
    name: 'Machine à Laver Automatique SMART TECHNOLOGY 10 Kg BLDC Inverter (`STML-108M`)',
    category: 'lavage-cuisson',
    price: 249000,
    compareAtPrice: 305000,
    stock: 5,
    badge: 'Choix Pèrôkadô',
    featured: true,
    shortDescription:
      'Moteur Brushless DC Inverter A+, 16 programmes automatiques (Lavage rapide, Bébé, Laine, Nettoyage tambour) et finition Gris Titane.',
    description:
      'La référence 10 Kg préférée des familles ivoiriennes : son moteur BLDC Inverter sans balais consomme très peu d’énergie, supporte un essorage puissant et propose 16 programmes adaptés à tous vos textiles du quotidien.',
    specs: [
      'Modèle officiel STML-108M · Capacité 10 Kg',
      'Moteur Brushless DC (BLDC) Inverter Classe A+',
      '16 programmes dont Lavage Rapide, Soins Bébé & Auto-nettoyage tambour',
      'Affichage LED digital + Molette chromée · Garantie 12 mois',
    ],
    imageUrl: '/images/products/smart-lave-linge-frontal-10kg-stml-108m.jpg',
  },
  {
    id: 'smart-lave-linge-9kg-stml-9sh',
    slug: 'smart-technology-machine-a-laver-frontale-9kg-smart-wash-stml-9sh',
    name: 'Machine à Laver Frontale SMART TECHNOLOGY 9 Kg Smart Wash BLDC Inverter (STML-9SH)',
    category: 'lavage-cuisson',
    price: 235000,
    compareAtPrice: 286000,
    stock: 5,
    badge: 'Promo -18%',
    featured: true,
    shortDescription:
      'Stérilisation Smart Wash éliminant 99,9% des bactéries, moteur BLDC Inverter classe A et hublot noir grand angle.',
    description:
      'Performante, compacte et économique, la STML-9SH 9 Kg combine un moteur BLDC Inverter durable et la fonction Smart Wash haute hygiène qui élimine 99,9% des germes et allergènes du linge familial.',
    specs: [
      'Modèle officiel STML-9SH · Capacité 9 Kg',
      'Moteur BLDC Inverter Motor haute durabilité',
      'Fonction Smart Wash stérilisation 99,9% anti-bactéries',
      'Hublot fumé design + Affichage digital complet',
    ],
    imageUrl: '/images/products/smart-lave-linge-frontal-9kg-stml-9sh.jpg',
  },
  {
    id: 'smart-cuisiniere-gaz-5-feux-inox',
    slug: 'smart-technology-cuisiniere-a-gaz-5-feux-grand-four-inox-bruleurs-dores',
    name: 'Cuisinière à Gaz 5 Feux SMART TECHNOLOGY Inox Grand Four — Brûleurs Laiton Doré (80×60 / 90×60)',
    category: 'lavage-cuisson',
    price: 205000,
    compareAtPrice: 259000,
    stock: 4,
    badge: 'Spécial Famille & Fêtes',
    featured: true,
    shortDescription:
      '5 brûleurs haute performance en laiton doré (dont grand feu Wok central), grilles fonte/émaillées robustes, couvercle verre et grand four vitré.',
    description:
      'Cuisinez plusieurs marmites simultanément avec une puissance de flamme remarquable ! Dotée de 5 feux en laiton massif doré ultra-durables, d’un allumage intégré, d’un abattant supérieur en verre trempé et d’un très grand four double vitrage pour grillades, poulets rôtis et pâtisseries.',
    specs: [
      '5 Feux gaz dont 1 brûleur central Wok triple couronne en laiton doré',
      'Grand four à gaz panoramique avec tournebroche & éclairage',
      'Carrosserie Inox (livrée neuve avec film protecteur bleu d’usine)',
      'Couvercle en verre trempé sécurisé + Grilles renforcées',
    ],
    imageUrl: '/images/products/smart-cuisiniere-gaz-5-feux-grand-four-inox.jpg',
    galleryUrls: [
      '/images/products/smart-cuisiniere-gaz-5-feux-grand-four-inox.jpg',
      '/images/products/smart-plaque-5-bruleurs-laiton-dore-detail.jpg',
    ],
  },
  {
    id: 'smart-cuisiniere-gaz-4-feux-inox',
    slug: 'smart-technology-cuisiniere-a-gaz-4-feux-avec-four-inox-60x60',
    name: 'Cuisinière à Gaz 4 Feux SMART TECHNOLOGY avec Four Vitré & Brûleurs Laiton — 60×60',
    category: 'lavage-cuisson',
    price: 94900,
    compareAtPrice: 125000,
    stock: 6,
    badge: 'Rapport Qualité/Prix',
    featured: false,
    shortDescription:
      'Format 4 feux compact et puissant avec brûleurs en laiton doré, grilles croisées stables, couvercle verre et four intégré.',
    description:
      'Robuste et peu encombrante, cette gazinière 4 feux SMART TECHNOLOGY s’intègre dans toutes les cuisines. Ses brûleurs en laiton doré assurent une flamme bleue homogène et économique en gaz butane.',
    specs: [
      '4 brûleurs gaz en laiton doré haute résistance',
      'Four à gaz intégré avec porte vitrée et grille fournie',
      'Plateau supérieur en acier inoxydable facile à nettoyer',
      'Livrée neuve avec film de protection bleu d’origine',
    ],
    imageUrl: '/images/products/smart-cuisiniere-gaz-4-feux-four-inox.jpg',
  },

  // ================= PETIT ÉLECTROMÉNAGER CUISINE & MAISON SMART TECHNOLOGY =================
  {
    id: 'smart-micro-ondes-25l-stmw-25wg',
    slug: 'smart-technology-four-micro-ondes-25l-stmw-25wg',
    name: 'Four à Micro-Ondes SMART TECHNOLOGY 25 Litres (STMW-25WG) — Gris & Noir',
    category: 'maison',
    price: 44900,
    compareAtPrice: 65000,
    stock: 10,
    badge: 'N°1 des ventes',
    featured: true,
    shortDescription:
      'Capacité familiale 25 L, 6 niveaux de puissance, fonction décongélation rapide, minuterie 30 min et porte vitrée avec poignée.',
    description:
      'Réchauffez, cuisez et décongelez tous vos plats en quelques minutes. Le micro-ondes SMART TECHNOLOGY STMW-25WG 25 Litres est conçu avec deux molettes mécaniques ultra-fiables résistantes à un usage intensif quotidien à la maison comme au bureau.',
    specs: [
      'Modèle officiel STMW-25WG · Capacité généreuse 25 Litres',
      '6 niveaux de puissance + Mode Décongélation rapide',
      'Minuterie mécanique jusqu’à 30 minutes avec signal sonore',
      'Porte en verre trempé avec grande poignée ergonomique',
    ],
    imageUrl: '/images/products/smart-micro-ondes-25l-stmw-25wg.jpg',
  },
  {
    id: 'smart-broyeur-foutou-stpe-792',
    slug: 'smart-technology-machine-a-foutou-broyeur-viande-inox-1000w-stpe-792',
    name: 'Machine à Foutou & Broyeur à Viande Inox SMART TECHNOLOGY 1000W (STPE-792)',
    category: 'maison',
    price: 24900,
    compareAtPrice: 38000,
    stock: 14,
    badge: 'Idéal pour le Foutou',
    featured: true,
    shortDescription:
      'Moteur puissant 1000W, grand bol en acier inoxydable : pilez votre foutou banane/igname/manioc sans effort et hachez viandes & condiments !',
    description:
      'Fini la fatigue du mortier ! Le broyeur multifonction SMART TECHNOLOGY STPE-792 (1000W) réalise un foutou lisse et élastique en quelques minutes et hache parfaitement viande, poisson, oignons, piment et légumes dans sa cuve inox hygiénique.',
    specs: [
      'Modèle officiel STPE-792 · Puissance moteur 1000W',
      'Spécialement conçu « Idéal pour le Foutou » + Hachoir à viande',
      'Grand bol robuste en acier inoxydable avec poignées latérales',
      'Lames multi-niveaux en inox trempé · Nettoyage rapide',
    ],
    imageUrl: '/images/products/smart-broyeur-foutou-viande-1000w.jpg',
  },
  {
    id: 'smart-blender-3en1-verre-inox',
    slug: 'smart-technology-blender-multifonction-3-en-1-bol-verre-inox',
    name: 'Blender Multifonction 3-en-1 SMART TECHNOLOGY — Bol Verre Épais & 2 Moulins Hachoirs',
    category: 'maison',
    price: 18500,
    compareAtPrice: 25000,
    stock: 12,
    badge: 'Complet 3-en-1',
    featured: true,
    shortDescription:
      'Socle inox brossé, bol principal en verre épais hygiénique + 2 moulins dédiés pour épices sèches, café, graines et purées.',
    description:
      'Un allié complet en cuisine : réalisez jus de gingembre, bissap, smoothies onctueux, sauces tomates/arachides et moulez vos épices sèches grâce aux deux accessoires hachoirs/moulins inclus.',
    specs: [
      'Pack 3-en-1 : Bol blender en verre + Hachoir + Moulin à sec',
      'Finition Acier Inoxydable & Noir · Molette multi-vitesses + Pulse',
      'Lames en acier inoxydable brise-glace',
      'Sécurité de verrouillage et pieds ventouses stables',
    ],
    imageUrl: '/images/products/smart-blender-3en1-bol-verre-inox.jpg',
  },
  {
    id: 'smart-mixeur-pro-stpe-8879r',
    slug: 'smart-technology-mixeur-professionnel-2-en-1-stpe-8879r',
    name: 'Mixeur Blender Professionnel 2-en-1 SMART TECHNOLOGY (STPE-8879R) — Rouge & Noir',
    category: 'maison',
    price: 15500,
    compareAtPrice: 22000,
    stock: 15,
    badge: 'Moteur Haute Vitesse',
    featured: true,
    shortDescription:
      'Mixeur haute puissance type pro avec grand pichet carré incassable, poussoir inclus et moulin broyeur d’épices.',
    description:
      'Inspiré des blenders professionnels de jus et smoothies, le SMART TECHNOLOGY STPE-8879R broie glace, fruits fibreux, gingembre, noix et condiments durs en quelques secondes grâce à son variateur de vitesse central.',
    specs: [
      'Modèle officiel STPE-8879R · 2-en-1 (Grand bol + Moulin)',
      'Variateur de vitesse précis + Fonction Pulse instantanée',
      'Bol carré grande capacité avec bâton poussoir inclus',
      '6 lames acier inoxydable haute rotation',
    ],
    imageUrl: '/images/products/smart-mixeur-pro-2en1-stpe-8879r.jpg',
  },
  {
    id: 'smart-regulateur-avr-1500',
    slug: 'smart-technology-regulateur-de-tension-automatique-avr-1500va-new-2026',
    name: 'Régulateur de Tension Automatique SMART TECHNOLOGY AVR-1500 — Édition Digital 2026',
    category: 'maison',
    price: 14900,
    compareAtPrice: 21000,
    stock: 16,
    badge: 'Protection Frigo & TV',
    featured: true,
    shortDescription:
      'Protégez vos réfrigérateurs, congélateurs et TV contre les baisses et hausses de tension ! Double écran LED digital, garantie 24 mois.',
    description:
      'Indispensable à Daloa, Issia et Vavoua pour éviter de griller vos appareils coûteux lors des variations du réseau électrique ou sur groupe électrogène. Technologie CoolMax spéciale compresseurs de frigos et climatiseurs, temporisation de sécurité et circuit digital MCU.',
    specs: [
      'Modèle AVR-1500 (New 2026) · Stabilisateur automatique 220V',
      'Double affichage numérique LED (Tension entrée / Tension sortie)',
      'Technologie CoolMax idéale pour réfrigérateurs, congélateurs & TV',
      'Compatible groupe électrogène · Garantie constructeur 24 mois',
    ],
    imageUrl: '/images/products/smart-regulateur-tension-avr-1500va.jpg',
  },
  {
    id: 'smart-bouilloire-beige-stpe-251u',
    slug: 'smart-technology-bouilloire-electrique-1-7l-beige-stpe-251u',
    name: 'Bouilloire Électrique Design SMART TECHNOLOGY 1,7 L (STPE-251U) — Beige & Moka',
    category: 'maison',
    price: 13900,
    compareAtPrice: 18500,
    stock: 15,
    badge: 'Design Élégant',
    featured: false,
    shortDescription:
      '« Chauffez en un clin d’œil » : double paroi isolante élégante coloris crème/moka, jauge de niveau d’eau et arrêt automatique.',
    description:
      'Alliez rapidité d’ébullition et esthétique raffinée sur votre plan de travail. La bouilloire SMART TECHNOLOGY STPE-251U (1,7 L) chauffe l’eau en un clin d’œil avec fenêtre de niveau graduée et coupure automatique dès ébullition.',
    specs: [
      'Modèle officiel STPE-251U · Capacité 1,7 Litre',
      'Finition Beige Crème & Moka robuste et anti-brûlure',
      'Indicateur de niveau d’eau transparent + Socle rotatif 360°',
      'Arrêt automatique à ébullition & sécurité anti-chauffe à vide',
    ],
    imageUrl: '/images/products/smart-bouilloire-beige-1-7l-stpe-251u.jpg',
  },
  {
    id: 'smart-fer-vapeur-stpfr-5104b',
    slug: 'smart-technology-fer-a-repasser-a-vapeur-noir-or-stpfr-5104b',
    name: 'Fer à Repasser à Vapeur Puissant SMART TECHNOLOGY (STPFR-5104B) — Noir & Or',
    category: 'maison',
    price: 11500,
    compareAtPrice: 16500,
    stock: 18,
    badge: 'Vapeur Puissante',
    featured: false,
    shortDescription:
      'Semelle antiadhésive glisse fluide, jet de vapeur pressing haute puissance (2200W) et finition élégante Noir & Or.',
    description:
      'Défroissez rapidement bazins amidonnés, chemises en coton, costumes et pagnes grâce à la puissance vapeur du SMART TECHNOLOGY STPFR-5104B. Fonction spray, jet vapeur vertical, système anti-goutte et thermostat précis.',
    specs: [
      'Modèle officiel STPFR-5104B · Rapide, Puissant & Impeccable',
      'Usage multiple : Sec, Pulvérisation d’eau et Jet Vapeur',
      'Semelle antiadhésive haute glisse qui ne colle pas aux tissus',
      'Thermostat réglable selon le tissu + Protection surchauffe',
    ],
    imageUrl: '/images/products/smart-fer-vapeur-noir-or-stpfr-5104b.jpg',
  },
  {
    id: 'smart-bouilloire-rouge-stpe-249rb',
    slug: 'smart-technology-bouilloire-electrique-inox-1-8l-rouge-stpe-249rb',
    name: 'Bouilloire Électrique Inox SMART TECHNOLOGY 1,8 L Rouge Métallisé (STPE-249RB)',
    category: 'maison',
    price: 9500,
    compareAtPrice: 14500,
    stock: 22,
    badge: 'Vente Flash',
    featured: true,
    shortDescription:
      'Corps en acier inoxydable rouge brossé 1,8 L, puissance 1500W, thermostat de marque et arrêt automatique.',
    description:
      'Pratique, rapide et durable pour toute la famille ou le bureau : sa cuve en acier inoxydable de 1,8 Litre porte l’eau à ébullition en quelques minutes et s’arrête automatiquement.',
    specs: [
      'Modèle officiel STPE-249RB · Capacité 1,8 Litre · 1500W',
      'Corps en acier inoxydable Rouge Métallisé haute qualité',
      'Socle sans fil pivotant 360° avec témoin lumineux',
      'Protection anti-ébullition à sec & arrêt automatique',
    ],
    imageUrl: '/images/products/smart-bouilloire-inox-rouge-1-8l.jpg',
  },
  {
    id: 'smart-fer-sec-stpfr-5103',
    slug: 'smart-technology-fer-a-repasser-a-sec-1200w-stpfr-5103',
    name: 'Fer à Repasser à Sec SMART TECHNOLOGY 1200W (STPFR-5103) — Bleu & Blanc',
    category: 'maison',
    price: 6500,
    compareAtPrice: 9500,
    stock: 25,
    badge: 'Petit prix',
    featured: false,
    shortDescription:
      'Léger, maniable et économique (1200W) avec semelle antiadhésive et pointe de précision pour cols et boutonnières.',
    description:
      '« Fini les plis, place à la perfection ! » Ce fer à repasser à sec SMART TECHNOLOGY STPFR-5103 chauffe en quelques secondes, consomme peu d’électricité (1200W) et glisse sans accrocher sur tous les vêtements.',
    specs: [
      'Modèle officiel STPFR-5103 · Puissance 1200W',
      'Semelle antiadhésive durable + Thermostat multi-tissus',
      'Cordon pivotant anti-torsion & voyant lumineux de chauffe',
      'Excellent rapport qualité/prix en Côte d’Ivoire',
    ],
    imageUrl: '/images/products/smart-fer-sec-bleu-stpfr-5103.jpg',
  },
];

// ==============================================================================
// GAMME MOTOS & TRICYCLES CARGO PÈRÔKADÔ (16 MODÈLES OFFICIELS)
// ==============================================================================
export const MOTOS_TRICYCLES_PRODUCTS = [
  {
    id: 'moto-apsonic-125-30',
    slug: 'moto-apsonic-125-30-aloba-125cc',
    name: 'Moto Apsonic 125-30 (Aloba 125 cm³)',
    category: 'motos-tricycles',
    price: 550000,
    compareAtPrice: null,
    stock: 6,
    badge: 'N°1 des ventes',
    featured: true,
    isHeavy: true,
    shortDescription:
      'La célèbre Apsonic AP125-30 « Aloba » : moteur 4 temps 125 cm³ ultra-endurant, jantes bâtons renforcées, frein à disque avant et porte-bagages arrière.',
    description:
      'Véritable référence sur les routes de Daloa et de toute la Côte d’Ivoire, la moto Apsonic 125-30 (Aloba) allie faible consommation d’essence, robustesse mécanique et confort de conduite au quotidien comme sur longues distances. Idéale pour les déplacements personnels et professionnels.',
    specs: [
      'Marque officielle APSONIC · Modèle AP125-30 (Aloba)',
      'Moteur monocylindre 4 temps 125 cm³ refroidi par air',
      'Démarrage électrique & kick · Frein avant à disque',
      'Jantes alliage renforcées & porte-bagages acier robuste',
    ],
    imageUrl: '/images/products/moto-apsonic-125-30.jpg',
  },
  {
    id: 'moto-sania-125-8',
    slug: 'moto-sania-sanya-125-8-125cc',
    name: 'Moto Sania 125-8 (Sanya SY125-8 — 125 cm³)',
    category: 'motos-tricycles',
    price: 550000,
    compareAtPrice: null,
    stock: 5,
    badge: 'Ultra Robuste',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Routière 125 cm³ reconnue pour sa longévité exceptionnelle, double amortisseur arrière renforcé, grand porte-bagages chromé et consommation réduite.',
    description:
      'La Sania 125-8 (Sanya SY125-8) est appréciée dans toute la région du Haut-Sassandra pour sa fiabilité mécanique exemplaire, sa souplesse moteur et la disponibilité immédiate de ses pièces. Parfaite pour la ville, les pistes et le transport quotidien.',
    specs: [
      'Modèle Sania / Sanya SY125-8 · Moteur 4 temps 125 cm³',
      'Double suspension arrière renforcée spécial routes & pistes',
      'Porte-bagages chromé grand format & pare-chocs moteur',
      'Démarrage électrique et au kick · Très faible consommation',
    ],
    imageUrl: '/images/products/moto-sanya-125-8.jpg',
  },
  {
    id: 'moto-ktm',
    slug: 'moto-ktm-urbaine-economique',
    name: 'Moto KTM (Modèle Dame / Urbaine Économique)',
    category: 'motos-tricycles',
    price: 400000,
    compareAtPrice: null,
    stock: 8,
    badge: 'Prix Choc',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Moto urbaine légère, maniable et économique à embrayage semi-automatique, jantes sport en alliage et frein avant à disque.',
    description:
      'Pratique, nerveuse et très simple à conduire sans levier d’embrayage complexe, la moto KTM urbaine est idéale pour les déplacements rapides en ville à Daloa, les courses quotidiennes, les étudiants et les travailleurs souhaitant réduire leur budget carburant.',
    specs: [
      'Modèle KTM Urbaine / Dame · Moteur 4 temps économique',
      'Boîte semi-automatique souple & prise en main immédiate',
      'Jantes sport en alliage léger + Frein à disque avant',
      'Démarrage électrique & kick · Entretien économique',
    ],
    imageUrl: '/images/products/moto-ktm.jpg',
  },
  {
    id: 'moto-apsonic-x1',
    slug: 'moto-apsonic-x1-plus-urbaine',
    name: 'Moto Apsonic X1 (Édition X1 Plus)',
    category: 'motos-tricycles',
    price: 400000,
    compareAtPrice: null,
    stock: 8,
    badge: 'Meilleure vente',
    featured: true,
    isHeavy: true,
    shortDescription:
      'La citadine phare d’Apsonic : ligne sportive X1 Plus, boîte semi-automatique facile à piloter, frein à disque avant et très basse consommation.',
    description:
      'Best-seller des motos citadines en Côte d’Ivoire, l’Apsonic X1 séduit par son design dynamique, sa maniabilité en circulation urbaine et sa sobriété remarquable à la pompe. Parfaite pour aller au travail, au campus ou effectuer des livraisons rapides.',
    specs: [
      'Marque officielle APSONIC · Modèle X1 / X1 Plus',
      'Moteur 4 temps nerveux et ultra-économique en carburant',
      'Transmission semi-automatique confortable en ville',
      'Jantes bâtons sport & frein avant à disque ventilé',
    ],
    imageUrl: '/images/products/moto-apsonic-x1.jpg',
  },
  {
    id: 'moto-haojue-150',
    slug: 'moto-haojue-150-routiere-sport-150cc',
    name: 'Moto Haojue 150 (150 cm³)',
    category: 'motos-tricycles',
    price: 870000,
    compareAtPrice: null,
    stock: 4,
    badge: 'Qualité Haojue',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Puissance 150 cm³ signée Haojue : moteur silencieux sans vibrations, finition premium, frein à disque et tenue de route irréprochable.',
    description:
      'Conçue pour les conducteurs exigeants, la Haojue 150 offre un couple généreux de 150 cm³, un silence de fonctionnement remarquable et une finition haut de gamme résistante à l’usure. Aussi à l’aise en ville que sur les axes interurbains.',
    specs: [
      'Marque officielle HAOJUE · Cylindrée 150 cm³ 4 temps',
      'Moteur équilibré anti-vibrations haute durabilité',
      'Frein avant à disque hydraulique & jantes alliage',
      'Selle biplace ergonomique grand confort & porte-bagages',
    ],
    imageUrl: '/images/products/moto-haojue-150.jpg',
  },
  {
    id: 'moto-haojue-dk',
    slug: 'moto-haojue-dk-150-sport-urbaine',
    name: 'Moto Haojue DK (Série DK 150)',
    category: 'motos-tricycles',
    price: 870000,
    compareAtPrice: null,
    stock: 4,
    badge: 'Haut de Gamme',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Design racé Série DK, moteur TSR 150 cm³ souple et économique, tableau de bord digital complet et éclairage haute visibilité.',
    description:
      'La Haojue DK combine allure sportive moderne et ingénierie TSR reconnue pour réduire la consommation tout en maximisant les reprises. Son tableau de bord numérique et son assise confortable en font l’une des 150 cm³ les plus prisées de Côte d’Ivoire.',
    specs: [
      'Marque officielle HAOJUE · Série DK 150 TSR',
      'Compteur digital multifonction (rapport engagé, jauge, vitesse)',
      'Frein avant à disque + Suspension arrière réglable',
      'Réservoir grande autonomie & finition peinture métallisée',
    ],
    imageUrl: '/images/products/moto-haojue-dk.jpg',
  },
  {
    id: 'moto-haojue-dame',
    slug: 'moto-haojue-dame-110-semi-automatique',
    name: 'Moto Haojue Dame (110 cm³ Semi-Automatique)',
    category: 'motos-tricycles',
    price: 600000,
    compareAtPrice: null,
    stock: 5,
    badge: 'Confort & Élégance',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Cadre bas facile à enfourcher (« Moto Dame »), moteur Haojue silencieux et économique, embrayage semi-automatique et jantes alliage.',
    description:
      'Élégante, fiable et très douce à piloter, la Haojue Dame dispose d’un cadre ouvert pratique, d’une protection de chaîne intégrale et de toute la fiabilité mécanique Haojue. Un choix privilégié pour circuler sereinement chaque jour à Daloa.',
    specs: [
      'Marque officielle HAOJUE · Format Dame (cadre bas)',
      'Moteur 4 temps 110 cm³ silencieux à très faible consommation',
      'Passage de vitesses semi-automatique sans levier d’embrayage',
      'Porte-bagages arrière, démarrage électrique & kick',
    ],
    imageUrl: '/images/products/moto-haojue-dame.jpg',
  },
  {
    id: 'moto-tvs-rock-z',
    slug: 'moto-tvs-rock-z-125-mp3-fm',
    name: 'Moto TVS Rock Z (125 cm³)',
    category: 'motos-tricycles',
    price: 770000,
    compareAtPrice: null,
    stock: 4,
    badge: 'Style & Audio',
    featured: true,
    isHeavy: true,
    shortDescription:
      'La célèbre moto dame sportive TVS RockZ 125 cm³ avec système audio MP3/FM intégré, double mode embrayage (manuel + semi-auto) et frein à disque.',
    description:
      'Signée TVS Motor, la TVS Rock Z 125 se démarque par sa ligne sportive affûtée, son système musical MP3/USB/FM intégré d’origine et sa technologie Duralife 125 cm³ offrant puissance et économie de carburant.',
    specs: [
      'Marque officielle TVS MOTOR · Modèle RockZ 125 cm³',
      'Système audio intégré (Radio FM / lecteur MP3 USB)',
      'Double système de conduite : semi-automatique ou embrayage manuel',
      'Frein avant à disque pétale & amortisseurs arrière à gaz (MIG)',
    ],
    imageUrl: '/images/products/moto-tvs-rock-z.jpg',
  },
  {
    id: 'moto-apsonic-apache',
    slug: 'moto-apsonic-apache-sport-pro',
    name: 'Moto Apsonic Apache (Édition Sportive)',
    category: 'motos-tricycles',
    price: 1200000,
    compareAtPrice: null,
    stock: 3,
    badge: 'Édition Sport',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Roadster sportif hautes performances : carénage musclé, motorisation surpuissante, freinage à disque avant/arrière et compteur digital.',
    description:
      'Pensée pour les passionnés de puissance et de prestance sur route, l’Apsonic Apache offre des accélérations franches, un châssis sport rigide, un éclairage LED percutant et un freinage haute sécurité pour dominer la route en ville comme sur autoroute.',
    specs: [
      'Marque APSONIC · Modèle Sportif Apache',
      'Moteur 4 temps haute performance à fort couple',
      'Freins à disque haute précision & fourche télescopique sport',
      'Tableau de bord numérique & échappement sport racé',
    ],
    imageUrl: '/images/products/moto-apsonic-apache.jpg',
  },
  {
    id: 'moto-apsonic-200-cross',
    slug: 'moto-apsonic-200-cross-tout-terrain-200gy',
    name: 'Moto Apsonic 200 Cross (Tout-Terrain 200 cm³)',
    category: 'motos-tricycles',
    price: 720000,
    compareAtPrice: null,
    stock: 4,
    badge: 'Tout-Terrain',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Trail tout-terrain 200 cm³ (AP200GY) taillé pour les pistes rurales, plantations et routes difficiles : garde au sol haute et pneus crampons.',
    description:
      'Franchissez sans effort pistes sablonneuses, boueuses ou accidentées grâce à l’Apsonic 200 Cross. Son moteur 200 cm³ coupleux, sa suspension à grand débattement, ses protège-mains et son sabot moteur en font l’alliée numéro 1 des planteurs, techniciens terrain et aventuriers.',
    specs: [
      'Marque officielle APSONIC · Modèle 200 Cross (AP200GY)',
      'Moteur 4 temps 200 cm³ fort couple en côte et sur piste',
      'Suspension haute longue course + Pneus tout-terrain crantés',
      'Protège-mains renforcés, frein à disque avant & porte-bagages',
    ],
    imageUrl: '/images/products/moto-apsonic-200-cross.jpg',
  },
  {
    id: 'moto-apsonic-200-27',
    slug: 'moto-apsonic-200-27-routiere-200cc',
    name: 'Moto Apsonic 200-27 (AP200-27 — 200 cm³)',
    category: 'motos-tricycles',
    price: 750000,
    compareAtPrice: null,
    stock: 4,
    badge: 'Puissance 200cc',
    featured: false,
    isHeavy: true,
    shortDescription:
      'Routière musclée 200 cm³ (AP200-27) alliant vitesse de croisière élevée, jantes alliage bicolores, arceau pare-carter et confort biplace.',
    description:
      'Avec son moteur de 200 cm³ réactif et endurant, l’Apsonic AP200-27 offre une réserve de puissance idéale pour les trajets interurbains (Daloa, Issia, Vavoua, Bouaflé, Gagnoa) même avec passager et bagages.',
    specs: [
      'Marque officielle APSONIC · Modèle AP200-27 (200 cm³)',
      'Moteur 4 temps 200 cm³ refroidi par air · 5 vitesses',
      'Frein avant à disque ventilé & arceau de protection moteur',
      'Jantes sport renforcées & porte-bagages arrière intégré',
    ],
    imageUrl: '/images/products/moto-apsonic-200-27.jpg',
  },
  {
    id: 'moto-apsonic-125-8',
    slug: 'moto-apsonic-125-8-utilitaire-125cc',
    name: 'Moto Apsonic 125-8 (AP125-8 — 125 cm³)',
    category: 'motos-tricycles',
    price: 500000,
    compareAtPrice: null,
    stock: 7,
    badge: 'Classique Robuste',
    featured: false,
    isHeavy: true,
    shortDescription:
      'L’indémodable utilitaire AP125-8 : châssis acier renforcé, grand porte-bagages chromé, entretien simple et fiabilité à toute épreuve.',
    description:
      'Plébiscitée par les commerçants, livreurs et particuliers partout en Côte d’Ivoire, l’Apsonic 125-8 supporte un usage intensif quotidien avec un coût d’entretien minimal et une consommation d’essence très faible.',
    specs: [
      'Marque officielle APSONIC · Modèle AP125-8 (125 cm³)',
      'Cadre et porte-bagages chromé haute résistance',
      'Double amortisseur arrière renforcé pour charges lourdes',
      'Démarrage électrique + kick · Pièces disponibles partout',
    ],
    imageUrl: '/images/products/moto-apsonic-125-8.jpg',
  },
  {
    id: 'moto-apsonic-125-12',
    slug: 'moto-apsonic-125-12-routiere-125cc',
    name: 'Moto Apsonic 125-12 (AP125-12 — 125 cm³)',
    category: 'motos-tricycles',
    price: 500000,
    compareAtPrice: null,
    stock: 6,
    badge: 'Rapport Qualité/Prix',
    featured: false,
    isHeavy: true,
    shortDescription:
      'Routière confortable AP125-12 à selle basse ergonomique, réservoir galbé type GN, jantes alliage et excellente stabilité routière.',
    description:
      'L’Apsonic 125-12 offre une position de conduite particulièrement détendue grâce à sa selle large et confortable et son centre de gravité équilibré. Robuste, économique et élégante pour tous vos trajets quotidiens.',
    specs: [
      'Marque officielle APSONIC · Modèle AP125-12 (125 cm³)',
      'Style routier confortable · Selle biplace moelleuse',
      'Frein avant à disque & jantes en alliage à bâtons',
      'Moteur 4 temps sobre et endurant · Démarrage électrique & kick',
    ],
    imageUrl: '/images/products/moto-apsonic-125-12.jpg',
  },
  {
    id: 'moto-royal-cross',
    slug: 'moto-royal-cross-tout-terrain-200cc',
    name: 'Moto Royal Cross (Tout-Terrain Haute Garde au Sol)',
    category: 'motos-tricycles',
    price: 900000,
    compareAtPrice: null,
    stock: 3,
    badge: 'Cross Pro',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Moto cross tout-terrain robuste à grand débattement, châssis renforcé, protège-mains et pneus crampons pour pistes exigeantes.',
    description:
      'Taillée pour les terrains difficiles, zones agricoles et pistes en saison des pluies, la Royal Cross associe puissance de franchissement, suspension renforcée et endurance mécanique supérieure.',
    specs: [
      'Marque ROYAL · Modèle Cross Tout-Terrain',
      'Motorisation 4 temps coupleuse adaptée aux fortes pentes',
      'Fourche haute renforcée + Mono-amortisseur arrière',
      'Frein à disque, protège-mains & porte-bagages arrière',
    ],
    imageUrl: '/images/products/moto-royal-cross.jpg',
  },
  {
    id: 'moto-apsonic-tricycle-200-cargo',
    slug: 'apsonic-tricycle-200-cargo-benne-radiateur',
    name: 'Apsonic Tricycle 200 Cargo (200 cm³ avec Radiateur)',
    category: 'motos-tricycles',
    price: 1400000,
    compareAtPrice: null,
    stock: 3,
    badge: 'Charge Lourde',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Tricycle utilitaire Apsonic 200 cm³ refroidi par eau (radiateur) avec grande benne métallique rabattable pour transport de marchandises et récoltes.',
    description:
      'Outil de travail rentable par excellence à Daloa et dans les zones agricoles : le Tricycle Apsonic 200 Cargo transporte ciment, matériaux, cacao, vivriers, bonbonnes de gaz ou marchandises volumineuses sans surchauffer grâce à son radiateur à eau et son pont arrière à lames renforcées.',
    specs: [
      'Marque officielle APSONIC · Tricycle Cargo 200 cm³',
      'Refroidissement liquide par radiateur spécial longues tournées',
      'Grande benne acier à ridelles rabattables + Marche arrière',
      'Châssis double poutre & suspension arrière à lames charge lourde',
    ],
    imageUrl: '/images/products/moto-apsonic-tricycle-200-cargo.jpg',
  },
  {
    id: 'moto-apsonic-tricycle-150-175',
    slug: 'apsonic-tricycle-150-175-cargo-utilitaire',
    name: 'Apsonic Tricycle 150-175 (Cargo Utilitaire)',
    category: 'motos-tricycles',
    price: 1250000,
    compareAtPrice: null,
    stock: 3,
    badge: 'Pro & Transport',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Tricycle motorisé Apsonic 150–175 cm³ polyvalent et économique avec benne acier robuste, boîte avec marche arrière et auvent conducteur.',
    description:
      'Idéal pour les commerçants, distributeurs de boissons, dépôts, quincailleries et coopératives agricoles souhaitant un tricycle robuste, maniable en ville comme sur piste et économique en carburant.',
    specs: [
      'Marque officielle APSONIC · Modèle Cargo 150–175 cm³',
      'Benne utilitaire en acier renforcé à ridelles ouvrantes',
      'Boîte de vitesses avec marche arrière & réducteur de couple',
      'Suspension avant double ressort renforcé & lames arrière',
    ],
    imageUrl: '/images/products/moto-apsonic-tricycle-150-175.jpg',
  },
];

// ================= JOUETS, JEUX DE SOCIÉTÉ, LOISIRS CRÉATIFS & UNIVERS ENFANTS =================
export const JOUETS_ENFANTS_PRODUCTS = [
  {
    id: 'jouet-coloriage-38en1-stitch',
    slug: 'livre-coloriage-multi-activites-38-en-1-stitch-peinture-eau',
    name: 'Livre de Coloriage Créatif 38-en-1 Stitch & Scrump — Peinture à Eau, Crayons & Scratch Art',
    category: 'jouets-enfants',
    price: 5200,
    compareAtPrice: 6900,
    stock: 20,
    badge: 'Nouveauté',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Pochette créative rigide 38-en-1 « I am a little painter » Stitch : aquarelle, crayons, cartes à gratter et peinture au sable (dès 3 ans).',
    description:
      'Offrez des heures d’éveil artistique sans écran avec ce grand cahier d’activités créatives 38-en-1 Stitch & Scrump (Réf. JK6682). Réunit dans un coffret rigide à élastique la peinture à l’eau, le coloriage aux crayons, le Scratch Art magique et le Sand Painting pour développer l’imagination des enfants dès 3 ans.',
    specs: [
      'Coffret multi-activités 38-en-1 « I am a little painter » (Réf. JK6682)',
      '4 activités : Peinture à l’eau (Watercolor), Crayons, Scratch Art & Sand Painting',
      'Couverture rigide illustrée Stitch & Scrump avec fermeture élastique',
      'Âge recommandé : dès 3 ans · Idéal cadeau d’anniversaire ou fêtes',
    ],
    imageUrl: '/images/products/jouet-coloriage-38en1-stitch.jpg',
  },
  {
    id: 'jouet-perles-heishi-sentosphere',
    slug: 'coffret-creation-bijoux-perles-heishi-sentosphere-14-bracelets',
    name: 'Coffret Création de Bijoux Perles Heishi SentoSphère — 14 Bracelets Personnalisables',
    category: 'jouets-enfants',
    price: 11750,
    compareAtPrice: 14500,
    stock: 12,
    badge: 'Marque Française',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Kit créatif officiel SentoSphère Boys & Girls permettant de créer et personnaliser 14 bracelets tendances avec perles lettres et dorées (8+ ans).',
    description:
      'Le coffret authentique Perles Heishi Boys & Girls de SentoSphère (Réf. 80002) permet aux filles et garçons dès 8 ans de composer jusqu’à 14 bracelets colorés sur mesure avec rondelles Heishi en polymère souple, intercalaires dorés/argentés et perles alphabet pour écrire prénoms ou messages (AMOR, PEACE, ZEN…).',
    specs: [
      'Marque officielle SentoSphère · Collection Bijoux & Créations (Réf. 80002)',
      'Permet de créer et personnaliser 14 bracelets Boys & Girls',
      'Assortiment complet de perles Heishi, perles lettres & apprêts métallisés',
      'Âge recommandé : 8 ans et plus · Stimule la créativité et la motricité fine',
    ],
    imageUrl: '/images/products/jouet-perles-heishi-sentosphere.jpg',
  },
  {
    id: 'jouet-dinette-the-metal-fruits',
    slug: 'service-a-the-dinette-metal-enfant-motifs-fruits-colores',
    name: 'Service à Thé Dinette en Métal « Spring Flowers » — Édition Fruits Colorés',
    category: 'jouets-enfants',
    price: 8000,
    compareAtPrice: 10000,
    stock: 15,
    badge: 'Idée cadeau',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Joli coffret dinette en métal incassable comprenant théière jaune décor fruits, 4 tasses, soucoupes et grandes assiettes assorties (dès 3 ans).',
    description:
      'Pensé pour les goûters imaginaires entre enfants et poupées, ce service à thé en métal léger aux bords arrondis (Réf. HB-1001) résiste aux chocs bien mieux que la céramique. Livré en boîte vitrine cadeau illustrée avec théière à couvercle, 4 tasses colorées, 4 soucoupes et 4 assiettes à dessert.',
    specs: [
      'Dinette en métal peint léger et incassable aux bords doux (Réf. HB-1001)',
      'Inclus : 1 théière fruits + 4 tasses + 4 soucoupes + 4 grandes assiettes',
      'Coffret vitrine cadeau « Metal Tea Set · Spring Flowers »',
      'Âge recommandé : dès 3 ans',
    ],
    imageUrl: '/images/products/jouet-dinette-the-metal-fruits.jpg',
  },
  {
    id: 'jouet-dinette-the-metal-pois-rouges',
    slug: 'grand-service-a-the-dinette-metal-rouge-pois-blancs-cuilleres',
    name: 'Grand Service à Thé Dinette en Métal Rouge à Pois Blancs + Cuillères (18 Pièces)',
    category: 'jouets-enfants',
    price: 11800,
    compareAtPrice: 14500,
    stock: 12,
    badge: 'Coffret Complet',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Grand coffret dinette métal rouge à pois blancs avec théière, 4 tasses, 4 soucoupes, 4 assiettes et 4 cuillères assorties (dès 3 ans).',
    description:
      'Un grand classique intemporel pour jouer à recevoir ses invités ! Ce coffret complet « Metal Tea Set » rouge vif à pois blancs (Réf. 820-E11) réunit une belle théière centrale, quatre ensembles tasse + soucoupe + assiette à dessert ainsi que quatre petites cuillères roses dans un écrin vitrine prêt à offrir.',
    specs: [
      'Service complet 18 pièces en métal émaillé léger (Réf. 820-E11)',
      'Inclus : Théière à couvercle, 4 tasses, 4 soucoupes, 4 assiettes & 4 cuillères',
      'Finition rouge brillant à pois blancs indémodable · Bords anti-coupure',
      'Âge recommandé : dès 3 ans',
    ],
    imageUrl: '/images/products/jouet-dinette-the-metal-pois-rouges.jpg',
  },
  {
    id: 'jouet-cuisine-inox-simulation-set',
    slug: 'batterie-de-cuisine-enfant-acier-inoxydable-simulation-kitchen-set',
    name: 'Batterie de Cuisine Enfant en Acier Inoxydable — Simulation Kitchen Set Complet',
    category: 'jouets-enfants',
    price: 16000,
    compareAtPrice: 19500,
    stock: 10,
    badge: 'Vrai Inox',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Vraies mini-marmites, poêle, couvercles, 4 bols et ustensiles de chef en acier inoxydable poli sécurisé avec manique vichy.',
    description:
      'Faites découvrir le plaisir de la cuisine aux petits chefs avec cette véritable batterie de cuisine miniature en acier inoxydable poli miroir ! Contrairement aux dinettes en plastique fragile, ses marmites à couvercle, sa poêle, ses 4 bols et ses ustensiles métalliques durent des années tout en étant polis sans bords tranchants.',
    specs: [
      'Acier inoxydable véritable robuste & bords polis sécurisés pour enfants',
      'Inclus : Marmites avec couvercles, poêle, 4 bols inox & manique tissu',
      'Assortiment d’ustensiles de chef (spatule, écumoire, louche, cuillères)',
      'Grande boîte vitrine cadeau « Kitchen Series »',
    ],
    imageUrl: '/images/products/jouet-cuisine-inox-simulation-set.jpg',
  },
  {
    id: 'jouet-uno-spin-roue',
    slug: 'jeu-de-societe-uno-spin-avec-roue-tournante-2-a-10-joueurs',
    name: 'Jeu de Société UNO Spin avec Roue Interactive — 2 à 10 Joueurs',
    category: 'jouets-enfants',
    price: 7000,
    compareAtPrice: 9500,
    stock: 18,
    badge: 'Jeu Familial',
    featured: false,
    isHeavy: false,
    shortDescription:
      'La version survoltée du célèbre jeu UNO avec roue centrale tournante qui renverse toute la partie en un seul tour !',
    description:
      'Animez vos soirées en famille et entre amis à Daloa avec UNO Spin (Réf. 0125Y) ! Lorsqu’une carte Spin est posée, un joueur doit tourner la roue centrale : échanger ses cartes, défausser toute une couleur ou piocher… chaque tour réserve des rebondissements hilarants de 2 à 10 joueurs.',
    specs: [
      '2 à 10 joueurs · Parties rapides et conviviales en famille',
      'Inclus : 1 grande roue UNO Spin rotative + jeu complet de cartes spéciales',
      'Règles simples accessibles dès 7 ans',
      'Boîte vitrine « Try Me » prête à jouer',
    ],
    imageUrl: '/images/products/jouet-uno-spin-roue.jpg',
  },
  {
    id: 'jouet-jeu-eau-manette-superheros',
    slug: 'jeu-adresse-aquatique-anneaux-format-manette-water-game',
    name: 'Jeu d’Adresse Aquatique aux Anneaux Format Manette Console — Happy Time Water Game',
    category: 'jouets-enfants',
    price: 3500,
    compareAtPrice: 4500,
    stock: 25,
    badge: 'Petit prix',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Console aquatique rétro sans pile ni écran : appuyez sur les 2 boutons pour propulser tous les anneaux colorés sur les cibles !',
    description:
      'Le jeu d’adresse indémodable revisité sous forme de manette ergonomique Super-Héros (Réf. 16-2). Fonctionne 100 % par pression d’eau sans aucune batterie : idéal en voiture, en voyage ou à la maison pour développer la patience et la coordination œil-main des enfants dès 3 ans.',
    specs: [
      'Format manette ergonomique transparente à double bouton poussoir (Réf. 16-2)',
      'Fonctionne sans pile ni recharge · Zéro onde et 100 % silencieux',
      'Développe la concentration et la motricité dès 3 ans',
      'Livré en boîte cadeau « Happy Time Water Game »',
    ],
    imageUrl: '/images/products/jouet-jeu-eau-manette-superheros.jpg',
  },
  {
    id: 'jouet-pistolet-eau-electrique-270ml',
    slug: 'pistolet-a-eau-electrique-automatique-270ml-portee-8m',
    name: 'Pistolet à Eau Électrique Automatique 270 ml — Portée 7–8 m & Chargeur Amovible',
    category: 'jouets-enfants',
    price: 13750,
    compareAtPrice: 16900,
    stock: 14,
    badge: 'Électrique',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Tir continu motorisé sur batterie rechargeable avec réservoir-chargeur grande capacité 270 ml et jet précis jusqu’à 8 mètres.',
    description:
      'Prenez l’avantage lors des jeux d’extérieur et sorties piscine avec ce pistolet à eau électrique automatique GUICHENG GCTOY (Réf. JH10249C). Une simple pression sur la gâchette déclenche des jets motorisés réguliers jusqu’à 8 mètres, avec réservoir-chargeur 270 ml dévissable rapide à remplir.',
    specs: [
      'Tir électrique automatique sans pompage manuel (Réf. JH10249C / 66605)',
      'Réservoir-chargeur amovible de 270 ml · Portée de tir 7 à 8 mètres',
      'Batterie rechargeable USB incluse',
      'Âge recommandé : dès 3 ans (sous surveillance)',
    ],
    imageUrl: '/images/products/jouet-pistolet-eau-electrique-270ml.jpg',
  },
  {
    id: 'jouet-voiture-f1-rc-spray-champion',
    slug: 'voiture-formule-1-telecommandee-1-14-fumee-lumineuse-spray-svr',
    name: 'Voiture Formule 1 Télécommandée R/C 1:14 SVR Champion — Effet Fumée Lumineuse & Spray',
    category: 'jouets-enfants',
    price: 10900,
    compareAtPrice: 13900,
    stock: 14,
    badge: 'Effet Fumée LED',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Monoplace F1 radiocommandée échelle 1:14 avec batterie rechargeable 3,7V, phares LED et véritable jet de brume lumineuse à l’échappement !',
    description:
      'Sensations de Grand Prix garanties avec cette Formule 1 radiocommandée échelle 1:14 SVR Champion (Réf. GF-035 / CY29011122). Ajoutez quelques gouttes d’eau avec la pipette fournie et activez le bouton Spray sur la manette pour déclencher un impressionnant panache de fumée rétroéclairé par LED à l’arrière du bolide !',
    specs: [
      'Échelle 1:14 grand format · Aérodynamisme Formule 1 Champion (Réf. GF-035)',
      'Fonction Spray : brume d’échappement lumineuse réaliste (eau pure sans danger)',
      'Batterie lithium 3,7V 500 mAh rechargeable par câble USB inclus',
      'Télécommande sans fil maniable avant / arrière / gauche / droite',
    ],
    imageUrl: '/images/products/jouet-voiture-f1-rc-spray-champion.jpg',
  },
  {
    id: 'jouet-pistolet-eau-electrique-680ml-led',
    slug: 'fusil-a-eau-electrique-double-jet-55cm-680ml-led-portee-10m',
    name: 'Fusil à Eau Électrique Pro+ Double Jet 55 cm — 680 ml, Effets LED & Portée 10 m',
    category: 'jouets-enfants',
    price: 21000,
    compareAtPrice: 25500,
    stock: 10,
    badge: 'Haute Puissance',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Grand blaster aquatique motorisé 55 cm à double buse haute pression, rampe lumineuse LED dynamique, viseur tactique et réservoir XXL 680 ml.',
    description:
      'Le summum des batailles d’eau estivales : le Dual Spray Heads Pro+ 55 cm (Réf. KB1390) propulse un double jet haute vélocité jusqu’à 10 mètres de distance. Équipé d’une barre LED lumineuse synchronisée au tir, d’une lunette de visée amovible et d’un maxi réservoir intégré de 680 ml (coloris assortis).',
    specs: [
      'Grand format 55 cm · 3 fonctions & Double tête de pulvérisation (Réf. KB1390)',
      'Maxi réservoir 680 ml · Portée longue distance jusqu’à 10 mètres',
      'Rampe lumineuse LED latérale dynamique + Viseur optique tactique',
      'Batterie rechargeable USB incluse · Dès 8 ans (coloris selon arrivage)',
    ],
    imageUrl: '/images/products/jouet-pistolet-eau-electrique-680ml-led.jpg',
  },
  {
    id: 'jouet-cogo-5818-moto-600pcs',
    slug: 'moto-sportive-a-construire-cogo-5818-tech-storm-600-pieces',
    name: 'Moto Sportive Technique à Construire COGO 5818 « Tech-Storm » — 600 Pièces',
    category: 'jouets-enfants',
    price: 22500,
    compareAtPrice: 27000,
    stock: 8,
    badge: '600 Pièces STEM',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Maquette technique articulée COGO Heavy Motorcycle de 600 briques compatibles avec transmission par chaîne, engrenages et béquille (6+ ans).',
    description:
      'Un superbe défi de construction mécanique pour les jeunes passionnés d’ingénierie et de motos sportives ! Le coffret COGO 5818 « Tech-Storm Heavy Motorcycle » (600 pièces, boîte 49,5 × 35 cm) reproduit fidèlement le carénage aérodynamique, les engrenages moteurs apparents, la direction mobile et la chaîne arrière.',
    specs: [
      'Marque officielle COGO · Modèle 5818 « Tech-Storm Heavy Motorcycle »',
      '600 pièces d’assemblage haute précision compatibles grandes marques',
      'Direction fonctionnelle, engrenages moteurs visibles & pneus larges',
      'Grande boîte cadeau (49,5 × 35 cm) avec manuel illustré étape par étape · 6+ ans',
    ],
    imageUrl: '/images/products/jouet-cogo-5818-moto-600pcs.jpg',
  },
  {
    id: 'jouet-forange-moto-helico-2en1',
    slug: 'blocs-construction-2-en-1-moto-et-helicoptere-forange-block-fc9302',
    name: 'Coffret Construction 2-en-1 Moto Sport & Hélicoptère — Forange Block Engine-Morph',
    category: 'jouets-enfants',
    price: 16400,
    compareAtPrice: 19900,
    stock: 10,
    badge: 'Modèle 2-en-1',
    featured: true,
    isHeavy: false,
    shortDescription:
      '2 maquettes techniques dans 1 seule boîte (env. 500 pièces) : assemblez une superbe Moto Racing rouge ou transformez-la en Hélicoptère !',
    description:
      'Deux fois plus de plaisir de construction avec le set Forange Block Engine-Morph FC9302 ! Les enfants assemblent d’abord une impressionnante moto roadster rouge et or dotée de disques de frein, chaîne dorée et béquille, puis peuvent la démonter pour bâtir un hélicoptère tactique à rotor rotatif.',
    specs: [
      'Marque Forange Block · Référence FC9302 « Engine-Morph 2-in-1 »',
      'Transformation 2-en-1 : Moto Roadster Sportive OU Hélicoptère à rotor',
      'Environ 500 briques techniques avec chaîne dorée, amortisseur & béquille',
      'Valisette rigide à poignée prête à offrir · Dès 6 ans',
    ],
    imageUrl: '/images/products/jouet-forange-moto-helico-2en1.jpg',
  },
  {
    id: 'jouet-caisse-disney-princess-legumes',
    slug: 'caisse-enregistreuse-interactive-disney-princess-micro-panier-legumes',
    name: 'Caisse Enregistreuse Sonore & Lumineuse Disney Princess + Micro & Panier Légumes',
    category: 'jouets-enfants',
    price: 18000,
    compareAtPrice: 22000,
    stock: 9,
    badge: 'Sons & Micro',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Caisse enregistreuse rose Disney Princess avec vraie calculatrice LCD, vrai micro amplifié, scanner lumineux, tiroir-caisse et panier garni.',
    description:
      'Le rêve des petites marchandes ! Ce coffret « Lovely Cash Register » Disney Princess (Réf. 3414) combine une vraie calculatrice digitale pour apprendre à compter en s’amusant, un microphone fonctionnel, un scanner sonore et lumineux, un tiroir-caisse à clé ainsi qu’un joli panier rempli de légumes.',
    specs: [
      'Univers féerique Disney Princess · Écran LCD vraie calculatrice (Réf. 3414)',
      'Vrai microphone fonctionnel + Scanner avec effets sonores et lumineux',
      'Tiroir-caisse automatique bouton OPEN + Panier de courses & légumes inclus',
      'Grande boîte vitrine cadeau rose · Dès 3 ans',
    ],
    imageUrl: '/images/products/jouet-caisse-disney-princess-legumes.jpg',
  },
  {
    id: 'jouet-caisse-playhouse-burger-panier',
    slug: 'coffret-marchande-caisse-enregistreuse-burger-chariot-play-house',
    name: 'Grand Coffret Caisse Enregistreuse Burger & Chariot de Courses — Play House Series',
    category: 'jouets-enfants',
    price: 18400,
    compareAtPrice: 22500,
    stock: 9,
    badge: 'Maxi Coffret',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Ensemble complet fast-food & supermarché incluant caisse calculatrice musicale, scanner bip, mini-caddie roulant, stand gourmet et burgers.',
    description:
      'Transformez la chambre des enfants en véritable boutique gourmande avec ce grand coffret « Play House Series · Fun Shopping » (Réf. 1111-137) ! Comprend une caisse enregistreuse électronique musicale avec calculatrice, un lecteur code-barres jaune, un adorable chariot de supermarché sur roulettes et de nombreux accessoires burgers & frites.',
    specs: [
      'Grand coffret « Play House Series · Happy Shopping » (Réf. 1111-137)',
      'Caisse enregistreuse calculatrice musicale + Scanner lumineux & sonore',
      'Inclus : Mini chariot caddie roulant + Stand Gourmet + Burgers, frites & sauces',
      'Favorise le calcul mental et les jeux de rôle parent-enfant · Dès 3 ans',
    ],
    imageUrl: '/images/products/jouet-caisse-playhouse-burger-panier.jpg',
  },
];

// ==============================================================================
// GAMME QUINCAILLERIE, OUTILLAGE INGCO/DINGQI & SANITAIRES FRENCIA (27 PRODUITS)
// ==============================================================================
export const QUINCAILLERIE_BTP_PRODUCTS = [
  {
    id: 'frencia-wc001',
    slug: 'frencia-pack-wc-complet-2-pieces-ovale-wc001',
    name: 'Pack WC Complet 2 Pièces FRENCIA Ovale WC001 — Céramique Blanche',
    category: 'quincaillerie-btp',
    price: 52000,
    compareAtPrice: 62000,
    stock: 6,
    badge: 'Sanitaires FRENCIA',
    featured: true,
    isHeavy: true,
    shortDescription:
      'WC à poser 2 pièces en céramique émaillée blanche : cuvette ovale, réservoir avec chasse double débit et abattant inclus.',
    description:
      'Installez des sanitaires durables et faciles à entretenir dans votre maison, hôtel ou chantier à Daloa. Le pack WC FRENCIA WC001 en céramique vitrifiée résiste aux taches, se nettoie en un passage et offre une chasse puissante et économique.',
    specs: [
      'Marque FRENCIA · Modèle WC001 (gamme WC-008) ovale 2 pièces',
      'Céramique émaillée blanche haute brillance anti-taches',
      'Chasse double débit économique + Abattant inclus',
      'Sortie et robinetterie standard Côte d’Ivoire · Pose au sol'
    ],
    imageUrl: '/images/products/frencia-pack-wc-2-pieces-ovale-wc001.jpg',
  },
  {
    id: 'frencia-wc045',
    slug: 'frencia-pack-wc-complet-2-pieces-design-wc045',
    name: 'Pack WC Complet 2 Pièces FRENCIA Design Moderne WC045 — Céramique Blanche',
    category: 'quincaillerie-btp',
    price: 58000,
    compareAtPrice: 69000,
    stock: 5,
    badge: 'Design Moderne',
    featured: true,
    isHeavy: true,
    shortDescription:
      'WC design aux lignes droites contemporaines, jupe épurée facile à nettoyer, chasse double débit et abattant frein de chute selon arrivage.',
    description:
      'Apportez une touche moderne à votre salle de bain avec le FRENCIA WC045 : silhouette carrée épurée, céramique blanche éclatante et mécanisme de chasse fiable pensé pour un usage quotidien intensif en famille ou en location.',
    specs: [
      'Marque FRENCIA · Modèle WC045 / SC-045 design contemporain',
      'Cuvette à jupe épurée : nettoyage extérieur ultra-rapide',
      'Céramique vitrifiée blanche + Chasse double débit',
      'Abattant inclus · Installation standard au sol'
    ],
    imageUrl: '/images/products/frencia-pack-wc-2-pieces-design-wc045.jpg',
  },
  {
    id: 'frencia-wc129',
    slug: 'frencia-pack-wc-complet-2-pieces-carre-wc129',
    name: 'Pack WC Complet 2 Pièces FRENCIA Carré WC129 — Céramique Blanche',
    category: 'quincaillerie-btp',
    price: 55000,
    compareAtPrice: 65000,
    stock: 5,
    badge: 'Sanitaires FRENCIA',
    featured: false,
    isHeavy: true,
    shortDescription:
      'WC carré contemporain en céramique blanche avec réservoir compact, chasse efficace et finition émaillée durable.',
    description:
      'Le FRENCIA WC129 combine esthétique carrée actuelle et robustesse céramique pour les salles de bain neuves et les rénovations à Daloa et partout en Côte d’Ivoire. Finition blanche lumineuse qui ne jaunit pas.',
    specs: [
      'Marque FRENCIA · Modèle WC129 format carré 2 pièces',
      'Céramique émaillée blanche haute résistance',
      'Réservoir compact + Chasse double débit économique',
      'Abattant inclus · Pose au sol standard'
    ],
    imageUrl: '/images/products/frencia-pack-wc-2-pieces-carre-wc129.jpg',
  },
  {
    id: 'ingco-coupe-carreaux-800mm',
    slug: 'ingco-coupe-carreaux-manuel-professionnel-800mm-32-pouces',
    name: 'Coupe-Carreaux Manuel Professionnel INGCO 800 mm (32") — Carrelage & Faïence',
    category: 'quincaillerie-btp',
    price: 76500,
    compareAtPrice: 89000,
    stock: 6,
    badge: 'Pro Carreleur',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Coupe nette et droite des carreaux jusqu’à 800 mm : double rail chromé, molette carbure et base aluminium renforcée.',
    description:
      'Outil indispensable des carreleurs professionnels en Côte d’Ivoire : le coupe-carreaux INGCO 800 mm coupe grès cérame, faïence et carreaux de sol grand format avec précision, sans électricité ni poussière.',
    specs: [
      'Longueur de coupe 800 mm (32 pouces) · Épaisseur jusqu’à ~14 mm',
      'Double rail en acier chromé + Molette en carbure de tungstène',
      'Base aluminium large avec règle graduée et butée d’angle',
      'Poignée ergonomique INGCO · Idéal chantiers & rénovations'
    ],
    imageUrl: '/images/products/ingco-coupe-carreaux-pro-800mm.jpg',
  },
  {
    id: 'ingco-coupe-carreaux-600mm-htc04600',
    slug: 'ingco-coupe-carreaux-manuel-600mm-htc04600',
    name: 'Coupe-Carreaux Manuel INGCO 600 mm HTC04600 — Précision Carrelage',
    category: 'quincaillerie-btp',
    price: 31500,
    compareAtPrice: 38000,
    stock: 8,
    badge: 'INGCO Officiel',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Format 600 mm polyvalent pour faïence et carreaux standards, rail fluide et coupe propre sans éclats.',
    description:
      'Compact et précis, le coupe-carreaux INGCO HTC04600 600 mm est parfait pour les salles de bain, cuisines et petites surfaces. Molette carbure remplaçable et guidage stable pour des coupes droites impeccables.',
    specs: [
      'Modèle officiel INGCO HTC04600 · Coupe 600 mm',
      'Molette carbure + Double guidage fluide',
      'Base stable avec graduations de mesure intégrées',
      'Léger et transportable sur tous les chantiers'
    ],
    imageUrl: '/images/products/ingco-coupe-carreaux-600mm-htc04600.jpg',
  },
  {
    id: 'ingco-perceuse-percussion-1100w',
    slug: 'ingco-perceuse-a-percussion-1100w-id11008',
    name: 'Perceuse à Percussion INGCO 1100W ID11008 — Mandrin 13 mm Métal',
    category: 'quincaillerie-btp',
    price: 46500,
    compareAtPrice: 55000,
    stock: 7,
    badge: '1100W Puissante',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Perceuse filaire 1100W pour béton, brique, bois et métal : percussion, variateur de vitesse et mandrin 13 mm.',
    description:
      'Avec ses 1100W, la perceuse à percussion INGCO ID11008 perce le béton vibré, le parpaing et la brique sans faiblir. Variateur électronique, inverseur de rotation et poignée auxiliaire pour un contrôle total sur chantier.',
    specs: [
      'Modèle INGCO ID11008 / ID211008 · Puissance 1100W',
      'Mandrin métal 13 mm à clé · Fonction percussion + perçage',
      'Variateur de vitesse + Inverseur droite/gauche',
      'Poignée latérale 360° + Butée de profondeur incluses'
    ],
    imageUrl: '/images/products/ingco-perceuse-percussion-1100w-id11008.jpg',
  },
  {
    id: 'ingco-cle-a-chocs-sans-fil-20v',
    slug: 'ingco-coffret-cle-a-chocs-sans-fil-20v-ciwli2040',
    name: 'Coffret Clé à Chocs Sans Fil 20V INGCO CIWLI2040 — 2 Batteries + Sacoche',
    category: 'quincaillerie-btp',
    price: 66500,
    compareAtPrice: 79000,
    stock: 5,
    badge: 'Sans Fil 20V',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Boulonneuse à chocs 20V brushless pour écrous de roues et boulons : coffret complet 2 batteries, chargeur rapide et sacoche.',
    description:
      'Desserrez les écrous les plus grippés sans effort : la clé à chocs INGCO 20V délivre un couple élevé pour garages, vulcanisateurs et mécaniciens à Daloa. Livrée en coffret prêt à travailler avec 2 batteries P20S.',
    specs: [
      'INGCO CIWLI2040 / CIWLI2001 · Plateforme batteries 20V P20S',
      'Couple élevé spécial écrous de roues & boulonnerie',
      '2 batteries 20V + Chargeur rapide + Sacoche de transport',
      'Éclairage LED intégré · Inverseur de rotation'
    ],
    imageUrl: '/images/products/ingco-cle-a-chocs-sans-fil-20v-coffret.jpg',
  },
  {
    id: 'ingco-rabot-electrique-1050w-pl10508',
    slug: 'ingco-rabot-electrique-industriel-1050w-pl10508',
    name: 'Rabot Électrique Industriel INGCO 1050W PL10508 — 82 mm',
    category: 'quincaillerie-btp',
    price: 56500,
    compareAtPrice: 67000,
    stock: 5,
    badge: '1050W Industriel',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Rabot filaire 1050W largeur 82 mm pour dresser portes, chevrons et bois de menuiserie avec profondeur réglable.',
    description:
      'Le rabot INGCO PL10508 1050W aplanit et chanfreine le bois rapidement grâce à son tambour haute vitesse et son réglage de profondeur précis. Indispensable en menuiserie et sur chantier pour ajuster portes et fenêtres.',
    specs: [
      'Modèle INGCO PL10508 · Puissance 1050W',
      'Largeur de rabotage 82 mm · Profondeur réglable',
      'Guide parallèle + Éjection des copeaux efficace',
      'Semelle aluminium usinée pour une glisse régulière'
    ],
    imageUrl: '/images/products/ingco-rabot-electrique-1050w-pl10508.jpg',
  },
  {
    id: 'dingqi-rabot-electrique-500w',
    slug: 'dingqi-rabot-electrique-82mm-500w',
    name: 'Rabot Électrique DINGQI 82 mm — Menuiserie & Finitions Bois',
    category: 'quincaillerie-btp',
    price: 39500,
    compareAtPrice: 47000,
    stock: 6,
    badge: 'Bon Plan Menuiserie',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Rabot compact 82 mm au excellent rapport qualité/prix pour raboter, dresser et chanfreiner le bois au quotidien.',
    description:
      'Alternative économique et fiable, le rabot électrique DINGQI 82 mm convient aux menuisiers et bricoleurs exigeants : prise en main équilibrée, réglage simple de la profondeur et finition propre sur bois tendre et dur.',
    specs: [
      'Marque DINGQI · Largeur de travail 82 mm',
      'Profondeur de passe réglable avec précision',
      'Corps compact équilibré anti-fatigue',
      'Idéal portes, cadres, chevrons et meubles en bois'
    ],
    imageUrl: '/images/products/dingqi-rabot-electrique-500w-82mm.jpg',
  },
  {
    id: 'ingco-pompe-immergee-forage-dwp37062',
    slug: 'ingco-pompe-immergee-forage-inox-4-pouces-370w-dwp37062',
    name: 'Pompe Immergée Forage Inox 4" INGCO 0,5 CV 370W DWP37062 + Boîtier de Commande',
    category: 'quincaillerie-btp',
    price: 107000,
    compareAtPrice: 125000,
    stock: 4,
    badge: 'Forage 0,5 CV',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Pompe de forage immergée inox 4 pouces 370W (0,5 CV) livrée avec boîtier de commande INGCO pour puits et forages domestiques.',
    description:
      'Équipez votre forage d’une pompe inox fiable : la INGCO DWP37062 370W remonte l’eau claire des puits profonds pour l’alimentation domestique, les réservoirs et l’arrosage. Boîtier de commande jaune INGCO inclus pour démarrage et protection.',
    specs: [
      'Modèle INGCO DWP37062 · 370W / 0,5 CV · Corps inox 4 pouces',
      'Boîtier de commande INGCO inclus (condensateur + protection)',
      'Pour forages et puits profonds · Eau claire domestique',
      'Câble et raccord sortie laiton selon kit fournisseur'
    ],
    imageUrl: '/images/products/ingco-pompe-immergee-forage-370w-dwp37062.jpg',
  },
  {
    id: 'ingco-pompe-immergee-forage-dwp55062',
    slug: 'ingco-pompe-immergee-forage-inox-4-pouces-550w-dwp55062',
    name: 'Pompe Immergée Forage Inox 4" INGCO 0,75 CV 550W DWP55062 + Boîtier de Commande',
    category: 'quincaillerie-btp',
    price: 122000,
    compareAtPrice: 142000,
    stock: 4,
    badge: 'Forage 0,75 CV',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Pompe immergée inox 4 pouces 550W (0,75 CV) avec boîtier de commande : débit renforcé pour maisons, fermes et petits immeubles.',
    description:
      'Version intermédiaire idéale entre domestique et semi-professionnel, la INGCO DWP55062 550W assure une pression régulière pour remplir châteaux d’eau et alimenter plusieurs points d’eau. Construction inox anti-corrosion.',
    specs: [
      'Modèle INGCO DWP55062 · 550W / 0,75 CV · Inox 4 pouces',
      'Boîtier de commande INGCO inclus prêt à brancher',
      'Débit renforcé maisons familiales, fermes & maraîchage',
      'Moteur immergé refroidi par eau · Longue durée de vie'
    ],
    imageUrl: '/images/products/ingco-pompe-immergee-forage-550w-dwp55062.jpg',
  },
  {
    id: 'ingco-pompe-immergee-forage-dwp75062',
    slug: 'ingco-pompe-immergee-forage-inox-4-pouces-750w-dwp75062',
    name: 'Pompe Immergée Forage Inox 4" INGCO 1,0 CV 750W DWP75062 + Boîtier de Commande',
    category: 'quincaillerie-btp',
    price: 142000,
    compareAtPrice: 165000,
    stock: 3,
    badge: 'Forage 1,0 CV Pro',
    featured: true,
    isHeavy: false,
    shortDescription:
      'La plus puissante de la gamme : pompe forage inox 4 pouces 750W (1,0 CV) avec boîtier de commande pour grands besoins en eau.',
    description:
      'Pour les forages profonds et les usages intensifs (immeubles, écoles, fermes, châteaux d’eau), la INGCO DWP75062 750W offre hauteur de refoulement et débit supérieurs avec une fiabilité inox éprouvée.',
    specs: [
      'Modèle INGCO DWP75062 · 750W / 1,0 CV · Corps inox 4 pouces',
      'Boîtier de commande INGCO inclus avec protections',
      'Hauteur de refoulement élevée · Usage intensif continu',
      'Idéale châteaux d’eau, immeubles et exploitations agricoles'
    ],
    imageUrl: '/images/products/ingco-pompe-immergee-forage-750w-dwp75062.jpg',
  },
  {
    id: 'ingco-coupe-boulons-36-hbc0836',
    slug: 'ingco-coupe-boulons-industriel-36-pouces-hbc0836',
    name: 'Coupe-Boulons Industriel Cr-V INGCO 36" (900 mm) HBC0836',
    category: 'quincaillerie-btp',
    price: 29000,
    compareAtPrice: 35000,
    stock: 6,
    badge: 'Industriel 36"',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Coupe-boulons grand format 900 mm en acier chrome-vanadium pour fers à béton, chaînes et boulons épais.',
    description:
      'Force de coupe maximale pour les chantiers BTP : le coupe-boulons INGCO HBC0836 36 pouces sectionne fers à béton et tiges métalliques grâce à ses mâchoires Cr-V trempées et ses longs bras à fort levier.',
    specs: [
      'Modèle INGCO HBC0836 · Longueur 36 pouces / 900 mm',
      'Mâchoires acier Chrome-Vanadium trempé interchangeables',
      'Manches tubulaires longs à poignées antidérapantes',
      'Pour fers à béton, chaînes, cadenas et boulons'
    ],
    imageUrl: '/images/products/ingco-coupe-boulons-36-pouces-hbc0836.jpg',
  },
  {
    id: 'ingco-coupe-boulons-24-hbc0824',
    slug: 'ingco-coupe-boulons-industriel-24-pouces-hbc0824',
    name: 'Coupe-Boulons Industriel Cr-V INGCO 24" (600 mm) HBC0824',
    category: 'quincaillerie-btp',
    price: 17000,
    compareAtPrice: 21000,
    stock: 8,
    badge: 'Industriel 24"',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Coupe-boulons 600 mm maniable et puissant pour ateliers, garages et chantiers : mâchoires Cr-V haute dureté.',
    description:
      'Format atelier le plus polyvalent, le INGCO HBC0824 24 pouces coupe proprement tiges, grillages renforcés et boulons courants. Équilibre parfait entre force de coupe et maniabilité quotidienne.',
    specs: [
      'Modèle INGCO HBC0824 · Longueur 24 pouces / 600 mm',
      'Acier Chrome-Vanadium · Coupe centrée précise',
      'Poignées bi-matière confort antidérapant',
      'Indispensable garages, ateliers et chantiers BTP'
    ],
    imageUrl: '/images/products/ingco-coupe-boulons-24-pouces-hbc0824.jpg',
  },
  {
    id: 'ingco-pied-de-biche-hwba01362',
    slug: 'ingco-pied-de-biche-acier-forge-arrache-clous',
    name: 'Pied-de-Biche Acier Forgé INGCO — Arrache-Clous Chantier & Démolition',
    category: 'quincaillerie-btp',
    price: 9500,
    compareAtPrice: 12000,
    stock: 12,
    badge: 'Acier Forgé',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Barre à mine / pied-de-biche en acier forgé pour arracher clous, décoffrer et lever les charges sur chantier.',
    description:
      'Outil de force incontournable en maçonnerie et charpente : le pied-de-biche INGCO en acier forgé trempé démultiplie l’effort pour le décoffrage, l’arrachage de clous et le levage de charges lourdes sans plier.',
    specs: [
      'Acier forgé trempé haute résistance INGCO',
      'Double extrémité : arrache-clous + levier plat',
      'Finition anti-corrosion jaune chantier visible',
      'Pour décoffrage, démolition légère et charpente'
    ],
    imageUrl: '/images/products/ingco-pied-de-biche-arrache-clous-hwba.jpg',
  },
  {
    id: 'ingco-niveau-100cm-hsl08100',
    slug: 'ingco-niveau-a-bulle-aluminium-magnetique-100cm-hsl08100',
    name: 'Niveau à Bulle Aluminium Magnétique INGCO 100 cm HSL08100',
    category: 'quincaillerie-btp',
    price: 5500,
    compareAtPrice: 7000,
    stock: 20,
    badge: 'Précision Pro',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Niveau aluminium 100 cm à 3 fioles haute lisibilité et semelle magnétique pour maçonnerie et poses précises.',
    description:
      'Vérifiez l’horizontalité de vos chapes, murs et poses de carreaux avec le niveau INGCO HSL08100 : profil aluminium rigide, fioles incassables et base magnétique pratique sur les structures métalliques.',
    specs: [
      'Modèle INGCO HSL08100 · Longueur 100 cm',
      '3 fioles : horizontale, verticale et 45 degrés',
      'Profil aluminium renforcé + Semelle magnétique',
      'Embouts anti-chocs · Précision chantier professionnelle'
    ],
    imageUrl: '/images/products/ingco-niveau-a-bulle-alu-100cm-hsl08100.jpg',
  },
  {
    id: 'ingco-niveau-60cm-hsl08060',
    slug: 'ingco-niveau-a-bulle-aluminium-60cm-hsl08060',
    name: 'Niveau à Bulle Aluminium INGCO 60 cm HSL08060',
    category: 'quincaillerie-btp',
    price: 4500,
    compareAtPrice: 6000,
    stock: 20,
    badge: 'Format 60 cm',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Niveau 60 cm compact pour cuisines, salles de bain et petits ouvrages : 3 fioles précises, profil alu léger.',
    description:
      'Le format 60 cm du niveau INGCO HSL08060 se glisse partout où le 100 cm ne passe pas : pose d’étagères, meubles de cuisine, sanitaires et petits scellements avec la même précision professionnelle.',
    specs: [
      'Modèle INGCO HSL08060 · Longueur 60 cm',
      '3 fioles haute visibilité anti-UV',
      'Profil aluminium léger et rigide',
      'Embouts de protection anti-chocs inclus'
    ],
    imageUrl: '/images/products/ingco-niveau-a-bulle-alu-60cm-hsl08060.jpg',
  },
  {
    id: 'ingco-scie-egoine-hhas08550',
    slug: 'ingco-scie-egoine-bois-pvc-22-pouces-hhas08550',
    name: 'Scie Égoïne Bois & PVC INGCO 22" (550 mm) HHAS08550',
    category: 'quincaillerie-btp',
    price: 4000,
    compareAtPrice: 5500,
    stock: 20,
    badge: 'Coupe Rapide',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Scie égoïne 550 mm à denture trempée triple affûtage pour coupes rapides du bois et des tuyaux PVC.',
    description:
      'Coupez chevrons, planches et tubes PVC sans effort : la lame INGCO HHAS08550 en acier haut carbone glisse vite grâce à sa denture agressive et sa poignée ergonomique absorbant les vibrations.',
    specs: [
      'Modèle INGCO HHAS08550 · Lame 22 pouces / 550 mm',
      'Denture trempée triple affûtage coupe poussée nette',
      'Poignée bi-matière avec guides 45° et 90° intégrés',
      'Pour bois de charpente, menuiserie et PVC'
    ],
    imageUrl: '/images/products/ingco-scie-egoine-bois-pvc-hhas08550.jpg',
  },
  {
    id: 'ingco-marteau-hch80816',
    slug: 'ingco-marteau-arrache-clous-manche-fibre-verre-hch80816',
    name: 'Marteau Arrache-Clous Manche Fibre de Verre INGCO HCH80816',
    category: 'quincaillerie-btp',
    price: 8500,
    compareAtPrice: 10500,
    stock: 15,
    badge: 'Fibre de Verre',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Marteau de charpentier 450 g à tête acier forgé et manche fibre de verre incassable absorbant les chocs.',
    description:
      'Le marteau arrache-clous INGCO HCH80816 combine tête en acier carbone forgé poli et manche fibre de verre quasi incassable qui protège votre bras des vibrations. Équilibre parfait pour coffrage et charpente.',
    specs: [
      'Modèle INGCO HCH80816 · Tête acier forgé ~450 g',
      'Manche fibre de verre haute résistance anti-vibrations',
      'Panne arrache-clous incurvée à fort levier',
      'Grip caoutchouc antidérapant spécial chantier'
    ],
    imageUrl: '/images/products/ingco-marteau-arrache-clous-hch80816.jpg',
  },
  {
    id: 'ingco-massette-hsth82000',
    slug: 'ingco-massette-macon-2kg-manche-fibre-verre-hsth82000',
    name: 'Massette de Maçon 2 kg Manche Fibre de Verre INGCO HSTH82000',
    category: 'quincaillerie-btp',
    price: 4000,
    compareAtPrice: 5500,
    stock: 18,
    badge: 'Massette 2 kg',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Massette 2 kg pour frapper burins, pointerolles et petits travaux de démolition avec manche fibre incassable.',
    description:
      'Frappez juste et fort : la massette INGCO HSTH82000 de 2 kg transmet toute la puissance au burin sans rebond excessif, avec un manche fibre de verre qui ne casse pas comme le bois sur les chantiers ivoiriens.',
    specs: [
      'Modèle INGCO HSTH82000 · Tête acier forgé 2 kg',
      'Manche fibre de verre incassable anti-chocs',
      'Double face de frappe plane usinée',
      'Pour burins, démolition légère et maçonnerie'
    ],
    imageUrl: '/images/products/ingco-massette-fibre-verre-2kg-hsth82000.jpg',
  },
  {
    id: 'ingco-metre-ruban-hsmt0810',
    slug: 'ingco-metre-ruban-acier-professionnel-10m-hsmt0810',
    name: 'Mètre Ruban Acier Professionnel INGCO 10 m × 25 mm HSMT0810',
    category: 'quincaillerie-btp',
    price: 3500,
    compareAtPrice: 5000,
    stock: 25,
    badge: '10 Mètres Pro',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Mètre ruban 10 mètres à lame acier 25 mm rigide, boîtier bi-matière anti-chocs et blocage fiable.',
    description:
      'Mesurez jusqu’à 10 mètres sans aide grâce à la lame large et rigide du INGCO HSMT0810. Graduations nettes métriques, crochet mobile de précision et retour de lame fluide pour maçons et menuisiers.',
    specs: [
      'Modèle INGCO HSMT0810 · 10 m × 25 mm',
      'Lame acier revêtue anti-usure très rigide',
      'Boîtier caoutchouc anti-chocs + Frein de lame',
      'Crochet magnétique selon série · Clip ceinture métal'
    ],
    imageUrl: '/images/products/ingco-metre-ruban-acier-10m-hsmt0810.jpg',
  },
  {
    id: 'ingco-burin-hccl082412',
    slug: 'ingco-burin-plat-macon-pare-coups-300mm',
    name: 'Burin Plat de Maçon Pare-Coups 300 mm INGCO — Acier Trempé',
    category: 'quincaillerie-btp',
    price: 3500,
    compareAtPrice: 5000,
    stock: 20,
    badge: 'Pare-Coups Sécurité',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Burin plat 300 mm avec garde pare-coups protectrice pour saignées, démolition et taille de matériaux.',
    description:
      'Travaillez en sécurité : le burin INGCO à large garde pare-coups protège votre main des coups de massette ratés pendant les saignées dans le béton, la brique et le parpaing. Pointe réaffûtable en acier trempé.',
    specs: [
      'Longueur 300 mm · Pointe plate acier trempé',
      'Large garde pare-coups ergonomique protectrice',
      'Corps octogonal anti-roulement sur chantier',
      'Pour saignées électricité/plomberie et démolition'
    ],
    imageUrl: '/images/products/ingco-burin-macon-pare-coups-300mm.jpg',
  },
  {
    id: 'ingco-taloche-hptt28138',
    slug: 'ingco-taloche-crantee-inox-carreleur-280mm-hptt28138',
    name: 'Taloche Crantée Inox Carreleur INGCO 280×130 mm HPTT28138',
    category: 'quincaillerie-btp',
    price: 3500,
    compareAtPrice: 5000,
    stock: 18,
    badge: 'Spécial Carreleur',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Taloche dentée inox 280 mm pour étaler la colle à carrelage en stries régulières et une pose sans bulles d’air.',
    description:
      'Obtenez un encollage parfait : la taloche crantée INGCO HPTT28138 en inox ne rouille pas, dépose la juste épaisseur de mortier-colle et assure l’adhérence durable de vos carreaux de sol et muraux.',
    specs: [
      'Modèle INGCO HPTT28138 · Plateau inox 280×130 mm',
      'Denture régulière spéciale mortier-colle carrelage',
      'Poignée ergonomique soudée haute résistance',
      'Inox anti-rouille facile à nettoyer après chantier'
    ],
    imageUrl: '/images/products/ingco-taloche-dentee-inox-280mm-hptt28138.jpg',
  },
  {
    id: 'ingco-truelle-hbt818',
    slug: 'ingco-truelle-de-macon-200mm-hbt818',
    name: 'Truelle de Maçon INGCO 200 mm (8") HBT818 — Lame Acier',
    category: 'quincaillerie-btp',
    price: 3000,
    compareAtPrice: 4500,
    stock: 22,
    badge: 'Essentiel Maçon',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Truelle langue-de-chat 200 mm en acier pour projeter, étaler et lisser mortier et enduits comme un pro.',
    description:
      'L’outil n°1 du maçon : la truelle INGCO HBT818 en acier flexible et résistant projette le mortier avec précision et ne se déforme pas. Manche ergonomique équilibré pour les longues journées de chantier.',
    specs: [
      'Modèle INGCO HBT818 · Lame acier 200 mm / 8 pouces',
      'Forme triangulaire précision pour joints et angles',
      'Manche confort anti-fatigue bien équilibré',
      'Pour mortier, enduits, scellements et reprises'
    ],
    imageUrl: '/images/products/ingco-truelle-macon-200mm-hbt818.jpg',
  },
  {
    id: 'ingco-spatule-hput08100',
    slug: 'ingco-spatule-couteau-enduire-inox-100mm-hput08100',
    name: 'Spatule Couteau à Enduire Inox INGCO 100 mm HPUT08100',
    category: 'quincaillerie-btp',
    price: 2500,
    compareAtPrice: 4000,
    stock: 25,
    badge: 'Finition Peinture',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Couteau à enduire inox 100 mm flexible pour reboucher, lisser enduits et gratter anciennes peintures.',
    description:
      'Finition impeccable garantie : la spatule INGCO HPUT08100 en inox flexible lisse les enduits de rebouchage, décolle les papiers peints et gratte sans rayer. Manche bi-matière pour un contrôle précis.',
    specs: [
      'Modèle INGCO HPUT08100 · Lame inox 100 mm',
      'Lame flexible anti-rouille affûtée avec précision',
      'Manche bi-matière ergonomique trou de suspension',
      'Pour enduits, rebouchage, grattage et peinture'
    ],
    imageUrl: '/images/products/ingco-spatule-peintre-inox-100mm-hput08100.jpg',
  },
  {
    id: 'ingco-griffe-jardin-hgr1008',
    slug: 'ingco-griffe-de-jardin-3-dents-cultivateur',
    name: 'Griffe de Jardin 3 Dents INGCO — Cultivateur Manuel Acier',
    category: 'quincaillerie-btp',
    price: 3500,
    compareAtPrice: 5000,
    stock: 15,
    badge: 'Jardin & Maraîchage',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Griffe cultivateur 3 dents en acier pour ameublir la terre, désherber et préparer potagers et massifs.',
    description:
      'Ameublissez la terre sans vous fatiguer : la griffe INGCO à 3 dents forgées pénètre les sols compacts, arrache les herbes et prépare vos planches de maraîchage. Manche ergonomique jaune haute visibilité.',
    specs: [
      '3 dents acier forgé haute pénétration',
      'Manche ergonomique INGCO antidérapant',
      'Pour potagers, massifs, désherbage et aération du sol',
      'Compacte et légère · Usage domestique et maraîcher'
    ],
    imageUrl: '/images/products/ingco-griffe-rateau-jardin-hgr1008.jpg',
  },
  {
    id: 'kit-pistolet-arrosage-jardin',
    slug: 'kit-pistolets-arrosage-raccords-rapides-jardin-haute-pression',
    name: 'Kit Pistolets d’Arrosage & Raccords Rapides Jardin — Haute Pression',
    category: 'quincaillerie-btp',
    price: 4500,
    compareAtPrice: 6500,
    stock: 15,
    badge: 'Kit Complet Jardin',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Kit complet d’arrosage : pistolets multi-jets, lance haute pression et raccords rapides pour tuyaux de jardin.',
    description:
      'Arrosez potager, pelouse et véhicules avec un seul kit : pistolets multi-fonctions à jets réglables, lance concentrée haute pression et raccords rapides étanches compatibles avec les tuyaux standards du marché.',
    specs: [
      'Pistolets multi-jets réglables + Lance haute pression',
      'Raccords rapides étanches anti-fuites inclus',
      'Compatible tuyaux d’arrosage standards jardin',
      'Idéal potagers, lavage véhicules et cours à Daloa'
    ],
    imageUrl: '/images/products/kit-pistolet-arrosage-raccords-haute-pression.jpg',
  },
];

// ==============================================================================
// NOUVEAUTÉS SMART TECHNOLOGY & MOBILIER : TV 58"/85", AUDIO, FROID & SALON (11 PRODUITS)
// ==============================================================================
export const NOUVEAUTES_SMART_MOBILIER_PRODUCTS = [
  {
    id: 'salon-angle-resine-tressee-table-basse',
    slug: 'salon-angle-modulable-resine-tressee-rotin-table-basse-verre',
    name: 'Salon d’Angle Modulable en Résine Tressée (Rotin Synthétique) 5–6 Places + Table Basse Verre',
    category: 'maison',
    price: 275000,
    compareAtPrice: 320000,
    stock: 3,
    badge: 'Salon de Jardin Premium',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Canapé d’angle marron foncé en résine tressée anti-UV avec coussins beiges déhoussables et table basse plateau verre.',
    description:
      'Transformez votre terrasse, véranda ou jardin à Daloa en espace lounge haut de gamme : ce salon d’angle modulable en rotin synthétique tressé main résiste au soleil et à la pluie, avec des coussins épais beiges déhoussables et lavables.',
    specs: [
      'Structure résine tressée (rotin synthétique) anti-UV marron foncé',
      'Assises 5 à 6 places modulables selon votre espace',
      'Coussins beiges épais déhoussables et lavables inclus',
      'Table basse plateau en verre trempé · Usage intérieur/extérieur'
    ],
    imageUrl: '/images/products/salon-angle-rotin-resine-tressee-table-basse.jpg',
  },
  {
    id: 'smart-congelateur-horizontal-silver-stcc-320',
    slug: 'smart-technology-congelateur-horizontal-300l-stcc-320-silver',
    name: 'Congélateur Horizontal SMART TECHNOLOGY 300L STCC-320 Silver — Fast Cooling',
    category: 'froid',
    price: 152000,
    compareAtPrice: 180000,
    stock: 4,
    badge: 'Fast Cooling 300L',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Grand congélateur coffre 300 litres finition Silver à congélation rapide pour familles, boutiques et restaurants.',
    description:
      'Stockez viandes, poissons et provisions en toute sécurité malgré les coupures : le SMART TECHNOLOGY STCC-320 de 300L maintient le froid très longtemps grâce à son isolation renforcée et son compresseur tropicalisé économe.',
    specs: [
      'Modèle STCC-320 · Capacité utile ~300 Litres Silver',
      'Fonction Fast Cooling congélation ultra-rapide',
      'Isolation renforcée longue conservation hors tension',
      'Panier intérieur + Serrure de sécurité · Tropicalisé CI'
    ],
    imageUrl: '/images/products/smart-congelateur-horizontal-gris-stcc-320.jpg',
  },
  {
    id: 'smart-congelateur-horizontal-vitre-stccv-313',
    slug: 'smart-technology-congelateur-horizontal-vitre-commercial-stccv-313',
    name: 'Congélateur Horizontal Vitré Commercial SMART TECHNOLOGY STCCV-313 Blanc',
    category: 'froid',
    price: 165000,
    compareAtPrice: 195000,
    stock: 3,
    badge: 'Pro Commerce Vitré',
    featured: false,
    isHeavy: true,
    shortDescription:
      'Coffre congélateur à portes vitrées coulissantes spécial glaces et produits surgelés pour maquis et boutiques.',
    description:
      'Présentez vos glaces, crèmes et surgelés tout en les conservant à température parfaite : les portes vitrées coulissantes du STCCV-313 attirent l’œil des clients et limitent les pertes de froid à chaque ouverture.',
    specs: [
      'Modèle STCCV-313 · Portes vitrées coulissantes commerciales',
      'Idéal glaces, supermarchés, maquis et dépôts de boissons',
      'Congélation rapide tropicalisée basse consommation',
      'Paniers de rangement + Roulettes de déplacement'
    ],
    imageUrl: '/images/products/smart-congelateur-horizontal-vitre-stccv-313.jpg',
  },
  {
    id: 'smart-fontaine-eau-3-robinets-or-stfo-br538',
    slug: 'smart-technology-fontaine-eau-3-robinets-noir-or-stfo-br-538',
    name: 'Distributeur Fontaine à Eau 3 Robinets SMART TECHNOLOGY Noir & Or STFO-BR_538 + Réfrigérateur',
    category: 'froid',
    price: 79000,
    compareAtPrice: 95000,
    stock: 5,
    badge: '3 Robinets + Frigo Bas',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Eau chaude, tempérée et froide + petit réfrigérateur intégré en bas, finition noire et dorée haut de gamme.',
    description:
      'Le modèle le plus prestigieux de la gamme : la fontaine SMART TECHNOLOGY STFO-BR_538 distribue eau chaude, normale et glacée et conserve boissons et fruits au frais dans son réfrigérateur bas. Finition noir et or très classe pour bureaux et salons.',
    specs: [
      'Modèle STFO-BR_538 · 3 robinets : chaud / normal / froid',
      'Réfrigérateur bas intégré pour boissons et fruits',
      'Finition Noir & Or premium · Réservoir inox alimentaire',
      'Sécurité enfant eau chaude · Compatible bonbonnes standards'
    ],
    imageUrl: '/images/products/smart-fontaine-eau-noir-dore-stfo-br-538.jpg',
  },
  {
    id: 'smart-fontaine-eau-noire-stfo-599a',
    slug: 'smart-technology-fontaine-eau-3-robinets-noire-stfo-599a',
    name: 'Distributeur Fontaine à Eau 3 Robinets SMART TECHNOLOGY Noir Intégral STFO-599A',
    category: 'froid',
    price: 69000,
    compareAtPrice: 85000,
    stock: 5,
    badge: 'Noir Intégral Classe',
    featured: false,
    isHeavy: true,
    shortDescription:
      'Fontaine à eau noire intégrale 3 robinets avec armoire de rangement basse pour bonbonnes et gobelets.',
    description:
      'Discrète et élégante en noir intégral, la fontaine STFO-599A sert eau chaude, tempérée et froide à toute la famille ou au bureau. Son armoire basse range discrètement la bonbonne de réserve et les gobelets.',
    specs: [
      'Modèle STFO-599A / STFO-BC_509 · 3 robinets complets',
      'Armoire de rangement basse intégrée spacieuse',
      'Finition noire intégrale moderne anti-traces',
      'Compresseur silencieux économe · Bonbonnes standards'
    ],
    imageUrl: '/images/products/smart-fontaine-eau-noire-stfo-599a.jpg',
  },
  {
    id: 'smart-fontaine-eau-inox-stfo-by601s',
    slug: 'smart-technology-fontaine-eau-3-robinets-noir-inox-stfo-by-601s',
    name: 'Distributeur Fontaine à Eau 3 Robinets SMART TECHNOLOGY Noir & Inox STFO-BY_601S',
    category: 'froid',
    price: 85000,
    compareAtPrice: 102000,
    stock: 4,
    badge: 'Noir & Inox Premium',
    featured: false,
    isHeavy: true,
    shortDescription:
      'Eau chaude, normale et froide avec façade inox brossé, robinets poussoirs et finition professionnelle durable.',
    description:
      'Conçue pour les bureaux, cliniques, écoles et accueils à fort passage, la STFO-BY_601S associe façade inox facile à désinfecter et distribution rapide sur 3 températures. Robinetterie robuste pensée pour durer.',
    specs: [
      'Modèle STFO-BY_601S · Façade Noir & Inox brossé',
      '3 températures : chaude, tempérée et froide glacée',
      'Bac récupérateur amovible + Réservoir inox alimentaire',
      'Usage intensif bureaux, cliniques, écoles et commerces'
    ],
    imageUrl: '/images/products/smart-fontaine-eau-noir-inox-stfo-by-601s.jpg',
  },
  {
    id: 'smart-cuisiniere-gaz-4-feux-50x50-stc5050b',
    slug: 'smart-technology-cuisiniere-gaz-4-feux-50x50-stc-5050b',
    name: 'Cuisinière à Gaz 4 Feux 50×50 Inox SMART TECHNOLOGY STC-5050B — Four Vitré & Couvercle',
    category: 'lavage-cuisson',
    price: 86900,
    compareAtPrice: 105000,
    stock: 6,
    badge: 'Format Compact 50×50',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Gazinière 4 feux compacte 50×50 en inox avec four vitré, couvercle et grilles stables pour petites cuisines.',
    description:
      'Parfaite pour appartements et cuisines compactes à Daloa, la SMART TECHNOLOGY STC-5050B 50×50 offre 4 feux efficaces, un four vitré pour gratins et poulets rôtis et un plateau inox qui se nettoie en un coup d’éponge.',
    specs: [
      'Modèle STC-5050B · Dimensions compactes 50×50 cm Inox',
      '4 brûleurs gaz + Four vitré avec grille fournie',
      'Couvercle de protection relevable inclus',
      'Allumage pratique · Plateau inox anti-traces facile d’entretien'
    ],
    imageUrl: '/images/products/smart-cuisiniere-gaz-4-feux-50x50-stc-5050b.jpg',
  },
  {
    id: 'smart-google-tv-58-4k-stt5880k',
    slug: 'smart-technology-google-tv-58-pouces-4k-uhd-stt-5880k',
    name: 'Téléviseur SMART TECHNOLOGY Google TV 58" 4K UHD Frameless Android 14 STT-5880K',
    category: 'high-tech',
    price: 215000,
    compareAtPrice: 260000,
    stock: 4,
    badge: 'Google TV 58" 4K',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Écran géant 58 pouces 4K UHD sans bords avec Google TV Android 14, commande vocale et applications streaming intégrées.',
    description:
      'Vivez le cinéma à la maison : la Google TV SMART TECHNOLOGY 58 pouces STT-5880K affiche une image 4K éclatante, accède à YouTube, Netflix et Canal+ via Wi-Fi et se pilote à la voix avec Google Assistant.',
    specs: [
      'Modèle STT-5880K · 58 pouces 4K UHD Frameless (sans bords)',
      'Google TV Android 14 · Google Assistant vocal intégré',
      'Wi-Fi, Bluetooth, HDMI, USB · Chromecast intégré',
      'Idéale CAN, films et jeux · Garantie boutique Daloa'
    ],
    imageUrl: '/images/products/smart-google-tv-58-4k-stt-5880k.jpg',
  },
  {
    id: 'smart-google-tv-85-4k-stt8580k',
    slug: 'smart-technology-google-tv-85-pouces-4k-qled-stt-8580k',
    name: 'Téléviseur Géant SMART TECHNOLOGY Google TV 85" 4K UHD QLED Frameless STT-8580K',
    category: 'high-tech',
    price: 665000,
    compareAtPrice: 780000,
    stock: 2,
    badge: 'Écran Géant 85" QLED',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Immense écran 85 pouces QLED 4K pour salons, maquis VIP, hôtels et salles de projection : image cinéma spectaculaire.',
    description:
      'Le téléviseur ultime en Côte d’Ivoire : 85 pouces de technologie QLED 4K avec couleurs éclatantes et contraste cinéma. Transformez votre salon ou votre espace commercial en véritable salle de spectacle pour la CAN et les grands événements.',
    specs: [
      'Modèle STT-8580K · 85 pouces 4K UHD QLED Frameless',
      'Google TV Android 14 · Commande vocale Google Assistant',
      'QLED couleurs premium · HDMI ARC, USB, Wi-Fi, Bluetooth',
      'Pour grands salons, hôtels, maquis VIP et showrooms'
    ],
    imageUrl: '/images/products/smart-google-tv-85-4k-stt-8580k.jpg',
  },
  {
    id: 'smart-home-cinema-karaoke-2000w-sthp2100e',
    slug: 'smart-technology-home-cinema-karaoke-2000w-sthp-2100e',
    name: 'Chaîne Home Cinéma & Karaoké SMART TECHNOLOGY 2000W STHP-2100E + 2 Micros Sans Fil',
    category: 'high-tech',
    price: 109000,
    compareAtPrice: 130000,
    stock: 4,
    badge: '2000W Karaoké Inclus',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Tour audio 2000W avec caisson de basses, Bluetooth, HDMI, lecteur DVD et 2 micros sans fil pour soirées karaoké.',
    description:
      'Animez mariages, anniversaires et soirées CAN comme un DJ : le système SMART TECHNOLOGY STHP-2100E déploie 2000W de son puissant, lit DVD et clés USB, se connecte en Bluetooth et inclut 2 micros sans fil prêts pour le karaoké.',
    specs: [
      'Modèle STHP-2100E · Puissance totale 2000W avec caisson',
      'Bluetooth, HDMI, USB, FM et lecteur DVD intégré',
      '2 microphones sans fil karaoké inclus dans le pack',
      'Effets lumineux fête · Télécommande de contrôle incluse'
    ],
    imageUrl: '/images/products/smart-home-cinema-karaoke-2000w-sthp-2100e.jpg',
  },
  {
    id: 'smart-enceinte-colonne-1000w-sthp0100e',
    slug: 'smart-technology-enceinte-colonne-party-1000w-sthp-0100e',
    name: 'Enceinte Colonne Rechargeable Party Speaker SMART TECHNOLOGY 1000W STHP-0100E — Dual 10" X-Bass RGB',
    category: 'high-tech',
    price: 115000,
    compareAtPrice: 138000,
    stock: 4,
    badge: 'Party 1000W Rechargeable',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Colonne sono rechargeable 1000W à double haut-parleur 10 pouces, basses X-Bass, lumières RGB et micros sans fil.',
    description:
      'La fête partout, même sans prise électrique : l’enceinte colonne SMART TECHNOLOGY STHP-0100E sur batterie rechargeable envoie 1000W de son avec des basses profondes, un show lumineux RGB et des micros sans fil pour animer tous vos événements.',
    specs: [
      'Modèle STHP-0100E / STHP-3080E · 1000W Dual Woofer 10 pouces',
      'Batterie rechargeable longue autonomie intégrée',
      'Bluetooth, USB, FM, X-Bass et lumières RGB synchronisées',
      'Micros sans fil inclus · Poignée et roulettes de transport'
    ],
    imageUrl: '/images/products/smart-enceinte-colonne-1000w-sthp-0100e.jpg',
  },
];

// ==============================================================================
// RAYON CUISINE & ART DE LA TABLE (8 PRODUITS — arrivage showroom Nov. 2026)
// Prix Pèrôkadô = prix étiquette showroom + marge magasin (conforme politique <= 2 000 F)
// ==============================================================================
export const CUISINE_MAISON_PRODUCTS = [
  {
    id: 'cuisine-sucrier-inox-sus304-argente',
    slug: 'sucrier-inox-sus-304-couvercle-verre-cuillere-argente',
    name: 'Sucrier Inox SUS 304 Couvercle Verre & Cuillère — Argenté',
    category: 'maison',
    price: 3500,
    compareAtPrice: 4900,
    stock: 15,
    badge: 'Inox SUS 304',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Élégant sucrier en acier inoxydable SUS 304 finition argentée, couvercle en verre intégré et cuillère de service incluse.',
    description:
      'Sublimez votre table de petit-déjeuner et votre pause café ! Ce sucrier en inox SUS 304 alimentaire (le meilleur grade anti-corrosion) conserve sucre, sel et épices à l’abri de l’humidité. Son couvercle en verre laisse voir le contenu et la cuillère assortie est incluse.',
    specs: [
      'Inox alimentaire SUS 304 anti-rouille, finition argentée brossée',
      'Couvercle en verre transparent avec bouton de préhension',
      'Cuillère de service assortie incluse dans la boîte',
      'Idéal sucre, sel, épices, café · Facile à laver'
    ],
    imageUrl: '/images/products/cuisine-sucrier-inox-sus304-argente.jpg',
  },
  {
    id: 'cuisine-sucrier-inox-dore',
    slug: 'sucrier-inox-dore-couvercle-verre-cuillere',
    name: 'Sucrier Inox Doré Couvercle Verre & Cuillère — Édition Prestige',
    category: 'maison',
    price: 3500,
    compareAtPrice: 4900,
    stock: 15,
    badge: 'Finition Dorée',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Sucrier doré en inox avec couvercle en verre et cuillère assortie : la touche luxe pour vos tables de café et de réception.',
    description:
      'Version dorée prestige de notre sucrier inox : un fini doré éclatant qui illumine la table, un couvercle verre pour voir le niveau de sucre en un coup d’œil et une cuillère dorée assortie. Parfait pour le café, le thé et les réceptions à Daloa.',
    specs: [
      'Inox alimentaire finition dorée haut de gamme',
      'Couvercle en verre transparent avec bouton doré',
      'Cuillère de service dorée assortie incluse',
      'Sucre, sel, épices, bonbons · Entretien facile'
    ],
    imageUrl: '/images/products/cuisine-sucrier-inox-dore.jpg',
  },
  {
    id: 'cuisine-complet-soupiere-3-bols-bleu',
    slug: 'complet-soupiere-ceramique-3-bols-rebord-bleu-ciel',
    name: 'Complet Soupière Céramique 3 Bols Gigognes — Rebord Bleu Ciel (Existe aussi en Rouge)',
    category: 'maison',
    price: 18500,
    compareAtPrice: 23500,
    stock: 8,
    badge: 'Set de 3 Bols',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Service de 3 grands bols soupière en céramique blanche texturée avec rebords ondulés bleu ciel et couvercle à bouton argenté.',
    description:
      'Servez vos soupes, sauces, riz et plats en sauce avec élégance ! Ce complet de 3 soupières gigognes en céramique à la texture finement pois et aux rebords ondulés bleu ciel s’empile pour un rangement malin. Couvercle avec bouton argenté inclus. Coloris rouge également disponible au showroom — précisez votre préférence dans la commande.',
    specs: [
      '3 bols gigognes en céramique émaillée blanche texturée',
      'Rebords ondulés bleu ciel (variante rouge disponible)',
      'Couvercle du grand bol avec bouton argenté inclus',
      'Soupes, sauces, salades, riz · S’empilent pour gagner de la place'
    ],
    imageUrl: '/images/products/cuisine-soupiere-ceramique-bleue-3bols.jpg',
  },
  {
    id: 'cuisine-set-3-bocaux-bamboo',
    slug: 'set-3-bocaux-borosilicate-couvercles-bamboo-1000-850-700',
    name: 'Set de 3 Bocaux Borosilicate Couvercles Bambou — 1000 / 850 / 700 ml',
    category: 'maison',
    price: 11500,
    compareAtPrice: 14500,
    stock: 10,
    badge: 'Set de 3 Bocaux',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Trio de bocaux en verre borosilicate hautement transparent avec couvercles hermétiques en bambou naturel : 1000 ml, 850 ml et 700 ml.',
    description:
      'Rangez chic et sainement pâtes, riz, café, sucre et céréales ! En verre borosilicate résistant et 100 % transparent, ces 3 bocaux aux couvercles en bambou naturel ferment hermétiquement (joint silicone) pour préserver fraîcheur et arômes, tout en décorant votre cuisine.',
    specs: [
      '3 contenances : 1000 ml · 850 ml · 700 ml',
      'Verre borosilicate premium ultra transparent',
      'Couvercles en bambou naturel avec joint silicone hermétique',
      'Riz, pâtes, café, sucre, thé, céréales · Empilables'
    ],
    imageUrl: '/images/products/cuisine-set-3-bocaux-bamboo.jpg',
  },
  {
    id: 'cuisine-bocal-syder-carre-1800ml',
    slug: 'grand-bocal-carre-syder-1800ml-couvercle-bamboo',
    name: 'Grand Bocal Carré Syder 1800 ml Couvercle Bambou',
    category: 'maison',
    price: 5000,
    compareAtPrice: 6900,
    stock: 12,
    badge: 'Format 1800 ml',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Très grand bocal carré de 1,8 litre en verre borosilicate avec couvercle plat en bambou : parfait pour farine, riz et pâtes longues.',
    description:
      'Le format familial pour une cuisine toujours organisée ! Ce bocal carré Syder de 1800 ml en verre borosilicate hautement transparent stocke farine, riz, sucre et céréales en grande quantité. Son couvercle plat en bambou ferme hermétiquement et sa forme carrée optimise chaque centimètre du placard.',
    specs: [
      'Capacité généreuse 1800 ml · Format carré gain de place',
      'Verre borosilicate hautement transparent (Syder)',
      'Couvercle plat en bambou avec joint silicone hermétique',
      'Farine, riz, pâtes, sucre, légumineuses'
    ],
    imageUrl: '/images/products/cuisine-bocal-syder-carre-1800ml.jpg',
  },
  {
    id: 'cuisine-pub-pasabahce-380cc-x2',
    slug: 'lot-2-pub-a-biere-pasabahce-pub-380cc',
    name: 'Lot de 2 pub à Bière Paşabahçe PUB 380 cc en Verre Épais',
    category: 'maison',
    price: 5500,
    compareAtPrice: 7500,
    stock: 14,
    badge: 'Verre Paşabahçe',
    featured: false,
    isHeavy: false,
    shortDescription:
      '2 grandes pub en verre épais turc (12¾ oz / 380 cc) avec anse renforcée : bières, jus et cocktails toujours bien frais.',
    description:
      'La qualité turque Paşabahçe pour vos moments de détente ! Ces 2 pub de 380 cc en verre épais à base renforcée gardent la boisson bien fraîche et offrent une prise en main parfaite pour bière, jus de fruits ou cocktails glacés.',
    specs: [
      'Marque Paşabahçe (Turquie) · Gamme PUB 55109',
      'Lot de 2 pub · 380 cc (12¾ oz) chacune',
      'Verre épais professionnel à base lourde renforcée',
      'Passent au lave-vaisselle · Bière, jus, cocktails'
    ],
    imageUrl: '/images/products/cuisine-pub-pasabahce-380cc-x2.jpg',
  },
  {
    id: 'cuisine-bonbonniere-verre-tresse',
    slug: 'bonbonniere-bonbonniere-verre-tresse-couvercle-dome',
    name: 'Bonbonnière Bonbonnière en Verre Tressé avec Couvercle Dôme',
    category: 'maison',
    price: 3500,
    compareAtPrice: 4900,
    stock: 12,
    badge: 'Verre Sculpté',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Bonbonnière décorative en verre transparent au motif tressé vannerie, avec couvercle dôme et bouton cristal.',
    description:
      'Un écrin de verre pour vos bonbons, chocolats et douceurs ! Cette bonbonnière au superbe motif tressé façon vannerie attire la lumière et décore la table basse ou le buffet. Son couvercle en dôme à bouton sphérique conserve et met en valeur vos gourmandises.',
    specs: [
      'Verre moulé transparent motif tressé vannerie',
      'Couvercle dôme avec bouton sphérique en verre',
      'Bonbons, chocolats, biscuits, décor de table',
      'Référence showroom DS26040'
    ],
    imageUrl: '/images/products/cuisine-bonbonniere-verre-tresse.jpg',
  },
  {
    id: 'cuisine-presentoir-gateau-cloche',
    slug: 'presentoir-a-gateau-sur-pied-cloche-home-sweet-home',
    name: 'Présentoir à Gâteau sur Pied avec Cloche « Home Sweet Home »',
    category: 'maison',
    price: 9500,
    compareAtPrice: 12500,
    stock: 8,
    badge: 'Home Sweet Home',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Présentoir à gâteau transparent sur pied évasé, avec cloche de protection décor dentelle « Home Sweet Home ».',
    description:
      'Présentez et protégez vos gâteaux, tartes et viennoiseries comme dans une vitrine de pâtisserie ! Ce présentoir sur pied transparent est coiffé d’une grande cloche décorée d’un motif dentelle « Home Sweet Home » avec bouton facetté. Indispensable pour anniversaires, mariages, buffets et pâtisseries maison à Daloa.',
    specs: [
      'Présentoir sur pied transparent (format familial)',
      'Cloche de protection motif dentelle « Home Sweet Home »',
      'Bouton de préhension facetté façon cristal',
      'Gâteaux, tartes, viennoiseries · Fêtes & réceptions'
    ],
    imageUrl: '/images/products/cuisine-presentoir-gateau-cloche.jpg',
  },
];

// ==============================================================================
// VAISSELLE & ART DE LA TABLE — arrivage showroom du 25/11/2026
// Porcelaine GRAAL Germany, Wilmax England, Tableware Gourmet, coffrets LAV,
// carafe Azur et lunch box inox. Prix relevés sur les étiquettes du showroom.
// ==============================================================================
export const VAISSELLE_ART_TABLE_PRODUCTS = [
  {
    id: 'vaisselle-assiette-plate-graal-26-5cm',
    slug: 'assiette-plate-ronde-graal-porcelaine-blanche-26-5cm',
    name: 'Assiette Plate Ronde GRAAL Porcelaine Blanche — Ø 26,5 cm (Réf. CA24)',
    category: 'maison',
    price: 2150,
    compareAtPrice: 2900,
    stock: 24,
    badge: 'Porcelaine GRAAL',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Grande assiette plate ronde en porcelaine blanche émaillée GRAAL Germany (Ø 26,5 cm, réf. CA24) : le socle élégant et solide de votre service de table.',
    description:
      'Une assiette plate à rebord large comme dans les grands restaurants ! Cette pièce GRAAL Germany en porcelaine blanche émaillée supporte le lave-vaisselle et le micro-ondes, résiste aux chocs du quotidien et met en valeur riz, attiéké, poulet braisé ou salades composées. Son diamètre généreux de 26,5 cm convient aux repas familiaux à Daloa.',
    specs: [
      'Porcelaine blanche émaillée — GRAAL Germany, réf. CA24',
      'Diamètre 26,5 cm · hauteur 2 cm · rebord large anti-débordement',
      'Assiette plate ronde, empilable et résistante aux chocs',
      'Compatible lave-vaisselle & micro-ondes',
      'Se complète avec nos bols et assiettes creuses GRAAL du même service'
    ],
    imageUrl: '/images/products/vaisselle-assiette-plate-graal-26-5cm.jpg',
  },
  {
    id: 'vaisselle-bol-graal-14cm',
    slug: 'bol-graal-porcelaine-blanche-14cm-ca24',
    name: 'Bol GRAAL Porcelaine Blanche 14 cm — Service & Petit-Déjeuner',
    category: 'maison',
    price: 1350,
    compareAtPrice: 1800,
    stock: 36,
    badge: 'Assorti à l’assiette',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Bol en porcelaine blanche GRAAL Germany (14 cm, réf. CA24) au galbe parfait pour le café au lait, la soupe, les céréales ou la salade individuelle.',
    description:
      'Le compagnon indispensable des familles ivoiriennes : ce bol GRAAL en porcelaine blanche émaillée accueille café, bouillie, soupe de poisson, riz sauce ou céréales du matin. Sa contenance généreuse et sa paroi épaisse gardent les boissons chaudes plus longtemps, et sa finition lisse se lave en un coup d’éponge.',
    specs: [
      'Porcelaine blanche émaillée — GRAAL Germany, réf. CA24',
      'Diamètre 14 cm · bol profond multiparade',
      'Café, bouillie, soupe, céréales, salade individuelle',
      'Compatible lave-vaisselle & micro-ondes',
      'Assorti à l’assiette plate GRAAL 26,5 cm et à l’assiette creuse Wilmax'
    ],
    imageUrl: '/images/products/vaisselle-bol-graal-14cm-porcelaine.jpg',
  },
  {
    id: 'vaisselle-assiette-creuse-wilmax-991215-23cm',
    slug: 'assiette-creuse-wilmax-23cm-porcelaine-blanche-wl-991215a',
    name: 'Assiette Creuse Wilmax England 23 cm Porcelaine Blanche — WL-991215/A',
    category: 'maison',
    price: 3950,
    compareAtPrice: 4900,
    stock: 12,
    badge: 'Wilmax England',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Assiette creuse 23 cm en fine porcelaine blanche Wilmax England (réf. WL-991215/A) : la profondeur idéale pour les sauces, soupes et pâtes.',
    description:
      'Signée Wilmax England, cette assiette creuse de 23 cm en fine porcelaine blanche apporte une touche britannique à votre table. Son creux profond retient parfaitement le jus d’un poulet braisé, une sauce graine ou une soupe de légumes, tandis que son rebord large reste élégant et facile à tenir.',
    specs: [
      'Fine porcelaine blanche — Wilmax England, réf. WL-991215/A',
      'Diamètre 23 cm · assiette creuse profonde',
      'Idéale pour soupes, sauces, pâtes, riz sauce',
      'Finition émaillée lisse, éclat durable',
      'Compatible lave-vaisselle & micro-ondes'
    ],
    imageUrl: '/images/products/vaisselle-assiette-creuse-wilmax-991215-23cm.jpg',
  },
  {
    id: 'vaisselle-assiette-creuse-wilmax-991019',
    slug: 'assiette-creuse-wilmax-wl-991019a-porcelaine-blanche',
    name: 'Assiette Creuse Wilmax England Porcelaine Blanche — WL-991019/A',
    category: 'maison',
    price: 3950,
    compareAtPrice: 4900,
    stock: 12,
    badge: 'Wilmax England',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Assiette creuse en porcelaine blanche Wilmax England (réf. WL-991019/A) au profil arrondi, parfaite pour les plats en sauce et les desserts généreux.',
    description:
      'Le modèle WL-991019/A de Wilmax England séduit par son profil tout en rondeur et son émail blanc profond. Elle reçoit aussi bien une soupe de poisson qu’un riz au gras, une salade de fruits ou une glace, et s’associe sans effort aux autres pièces Wilmax de la boutique.',
    specs: [
      'Fine porcelaine blanche — Wilmax England, réf. WL-991019/A',
      'Assiette creuse au profil arrondi et rebord large',
      'Soupes, sauces, desserts, salades de fruits',
      'Émail résistant aux couverts et au lave-vaisselle',
      'Assortie à l’assiette creuse 23 cm WL-991215/A'
    ],
    imageUrl: '/images/products/vaisselle-assiette-creuse-wilmax-991019.jpg',
  },
  {
    id: 'vaisselle-assiette-dessert-20cm-gourmet-ivoire',
    slug: 'assiette-dessert-20cm-tableware-gourmet-ivoire-ca24',
    name: 'Assiette à Dessert 20 cm Tableware Gourmet — Ivoire (Réf. F5C114)',
    category: 'maison',
    price: 3600,
    compareAtPrice: 4500,
    stock: 18,
    badge: 'Tableware Gourmet',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Assiette à dessert 20 cm Tableware Gourmet en porcelaine ivoire (réf. F5C114), à la teinte chaude idéale pour gâteaux, fruits et pâtisseries.',
    description:
      'La collection Gourmet de Tableware habille vos desserts d’une teinte ivoire délicate. Ce modèle 20 cm (réf. F5C114) accueille une part de gâteau d’anniversaire, une salade de fruits, des beignets ou une glace, et se marie aussi bien avec la porcelaine blanche qu’avec les verres LAV de la boutique.',
    specs: [
      'Porcelaine ivoire — Tableware Gourmet, réf. F5C114',
      'Diamètre 20 cm · assiette à dessert et pâtisserie',
      'Teinte ivoire chaleureuse, émail brillant',
      'Livrée par lot de 24 au showroom : détail disponible',
      'Compatible lave-vaisselle & micro-ondes'
    ],
    imageUrl: '/images/products/vaisselle-assiette-dessert-20cm-gourmet-ivoire.jpg',
  },
  {
    id: 'vaisselle-assiette-motif-feuillage-noir',
    slug: 'assiette-decor-feuillage-noir-porcelaine',
    name: 'Assiette Décor Feuillage Noir sur Porcelaine Blanche',
    category: 'maison',
    price: 2900,
    compareAtPrice: 3900,
    stock: 12,
    badge: 'Décor feuillage',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Assiette ronde en porcelaine blanche au décor de feuillage noir dessiné à la main : la touche graphique qui habille une table simple.',
    description:
      'Un dessin de branches et de feuilles noires sur porcelaine blanche émaillée : cette assiette décor apporte du caractère à vos repas sans alourdir la table. Elle se marie aussi bien avec nos assiettes unies GRAAL et Wilmax qu’avec les verres LAV, et devient vite la pièce que l’on sort pour recevoir.',
    specs: [
      'Porcelaine blanche émaillée, décor feuillage noir',
      'Assiette plate ronde, bord légèrement relevé',
      'Se marie aux collections GRAAL, Wilmax et Tableware Gourmet',
      'Vaisselle décorative pour repas et réceptions',
      'Compatible lave-vaisselle'
    ],
    imageUrl: '/images/products/vaisselle-assiette-motif-feuillage-noir.jpg',
  },
  {
    id: 'vaisselle-bol-terracotta-motif-feuilles',
    slug: 'bol-terracotta-motif-feuilles-creme',
    name: 'Bol Terracotta Motif Feuilles Crème — Céréales, Soupe & Salade',
    category: 'maison',
    price: 3200,
    compareAtPrice: 4200,
    stock: 12,
    badge: 'Décor terracotta',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Grand bol terracotta émaillé au décor de feuilles crème, pour les céréales du matin, une soupe ou une salade colorée.',
    description:
      'Ce bol au galbe généreux marie un émail terracotta chaleureux à un motif de feuilles crème. Sa contenance accueille un petit-déjeuner complet, une soupe de légumes ou une salade individuelle, et sa couleur réchauffe instantanément la table — un vrai coup de cœur du showroom.',
    specs: [
      'Grès émaillé terracotta, décor feuilles crème',
      'Grand bol profond multiparade',
      'Céréales, soupe, salade, dessert',
      'Émail brillant résistant, facile à nettoyer',
      'Passe au lave-vaisselle'
    ],
    imageUrl: '/images/products/vaisselle-bol-terracotta-motif-feuilles.jpg',
  },
  {
    id: 'vaisselle-bol-ovale-blanc-porcelaine',
    slug: 'bol-ovale-blanc-porcelaine',
    name: 'Bol Ovale Blanc en Porcelaine — Service & Dressage',
    category: 'maison',
    price: 3500,
    compareAtPrice: 4500,
    stock: 12,
    badge: 'Format ovale',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Bol ovale en porcelaine blanche au galbe asymétrique : parfait pour dresser une salade, un riz sauté ou une soupe façon restaurant.',
    description:
      'Sa forme ovale et légèrement asymétrique donne un dressage de chef à vos plats : salade composée, riz sauté, soupe, pâtes ou légumes sautés. L’émail blanc brillant de ce bol en porcelaine met en valeur les couleurs des aliments et s’accorde avec toute la vaisselle blanche de la boutique.',
    specs: [
      'Porcelaine blanche émaillée, forme ovale',
      'Bol de service et de dressage',
      'Salades, riz sauté, soupes, pâtes, légumes',
      'Finition brillante, paroi épaisse et stable',
      'Compatible lave-vaisselle & micro-ondes'
    ],
    imageUrl: '/images/products/vaisselle-bol-ovale-blanc-porcelaine.jpg',
  },
  {
    id: 'cuisine-panier-a-frire-inox',
    slug: 'panier-a-frire-inox-poele-friteuse-panier',
    name: 'Panier à Frire Inox avec Poêle — Frites, Alloco & Beignets',
    category: 'maison',
    price: 2500,
    compareAtPrice: 3500,
    stock: 10,
    badge: 'Inox anti-rouille',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Panier à frire en inox avec poêle assortie et poignées froides : frites croustillantes, alloco doré et beignets sans éclaboussures.',
    description:
      'Sortez les frites d’un seul geste ! Ce panier à frire en inox alimentaire, livré avec sa poêle, laisse égoutter l’huile avant de servir : frites, alloco, beignets, poisson frit ou poulet pané. Les poignées froides et le maillage fin évitent les projections sur le gaz ou le réchaud.',
    specs: [
      'Panier en inox alimentaire anti-rouille + poêle assortie',
      'Maillage fin : égouttage rapide et friture croustillante',
      'Poignées froides pour une prise en main sûre',
      'Frites, alloco, beignets, poisson et poulet frits',
      'Facile à laver à la main — va au lave-vaisselle'
    ],
    imageUrl: '/images/products/cuisine-panier-a-frire-inox-poele.jpg',
  },
  {
    id: 'cuisine-lav-6-verres-nevakar-320cc',
    slug: 'coffret-lav-6-verres-nevakar-320cc',
    name: 'Coffret LAV 6 Verres NevaKar 320 cc — Jus, Cocktails & Apéritif',
    category: 'maison',
    price: 7500,
    compareAtPrice: 9500,
    stock: 8,
    badge: 'Coffret de 6',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Coffret de 6 verres LAV NevaKar 320 cc (10 ¼ oz) en verre trempé turc : le service à jus et cocktails élégant pour les grandes occasions.',
    description:
      'Six verres NevaKar de LAV, la marque turque de référence, dans leur coffret d’origine. Le verre trempé résiste aux chocs et à la chaleur, la contenance de 320 cc est parfaite pour un jus de bissap bien frais, un cocktail ou un apéritif entre amis. Motif graphique discret et base stable.',
    specs: [
      'Coffret de 6 verres LAV NevaKar — 320 cc (10 ¼ oz)',
      'Verre trempé turc, résistant aux chocs et à la chaleur',
      'Jus naturels, cocktails, apéritifs et grands rassemblements',
      'Coffret cadeau d’origine LAV',
      'Compatible lave-vaisselle'
    ],
    imageUrl: '/images/products/cuisine-lav-6-verres-nevakar-320cc.jpg',
  },
  {
    id: 'cuisine-lav-6-verres-misket-390cc',
    slug: 'coffret-lav-6-verres-misket-390cc',
    name: 'Coffret LAV 6 Verres Misket 390 cc — Grands Verres à Cocktail',
    category: 'maison',
    price: 9500,
    compareAtPrice: 12000,
    stock: 8,
    badge: 'Coffret de 6',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Coffret de 6 verres LAV Misket 390 cc (13 ¼ oz) en verre trempé : de grands verres ballon pour cocktails, jus et tables de fête.',
    description:
      'Les Misket de LAV offrent une contenance généreuse de 390 cc dans un verre trempé au galbe arrondi qui libère les arômes. Parfaits pour les cocktails sans alcool, les jus de fruits pressés, la bière ou l’eau pétillante, ils arrivent dans un coffret de 6 prêt à offrir — un cadeau sûr pour un mariage ou une pendaison de crémaillère à Daloa.',
    specs: [
      'Coffret de 6 verres LAV Misket — 390 cc (13 ¼ oz)',
      'Verre trempé extra-résistant, galbe ballon',
      'Cocktails, jus, bière, eau pétillante',
      'Idéal cadeau : mariage, fête, pendaison de crémaillère',
      'Compatible lave-vaisselle'
    ],
    imageUrl: '/images/products/cuisine-lav-6-verres-misket-390cc.jpg',
  },
  {
    id: 'cuisine-carafe-azur-verre-transparent',
    slug: 'carafe-azur-verre-trempe-transparente',
    name: 'Carafe Azur en Verre Trempé Transparent — 1,2 L',
    category: 'maison',
    price: 6500,
    compareAtPrice: 8500,
    stock: 10,
    badge: 'Verre trempé',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Carafe Azur en verre trempé transparent au col évasé et aux facettes élégantes : eau, jus de bissap ou thé glacé servis avec style.',
    description:
      'La carafe Azur transforme un simple pichet d’eau en pièce de table. Son verre trempé transparent, son corps facetté et son col évasé assurent un service net, sans goutte, et sa contenance permet de servir toute la famille en une fois. Elle s’accorde avec les coffrets de verres LAV de la boutique.',
    specs: [
      'Carafe en verre trempé transparent — collection Azur',
      'Corps facetté, col évasé anti-goutte, grande base stable',
      'Eau, jus de bissap, thé glacé, citronnade',
      'Se marie avec les coffrets LAV NevaKar et Misket',
      'Lavable à la main ou au lave-vaisselle'
    ],
    imageUrl: '/images/products/cuisine-carafe-azur-verre-transparent.jpg',
  },
  {
    id: 'cuisine-lunch-box-inox-jia-teng-2-2l',
    slug: 'lunch-box-inox-jia-teng-2-2l',
    name: 'Lunch Box Inox JIA TENG 2,2 L — Marmite Repas Isotherme',
    category: 'maison',
    price: 7000,
    compareAtPrice: 9000,
    stock: 12,
    badge: 'Inox 2,2 L',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Lunch box inox JIA TENG de 2,2 L avec couvercle et anse : le repas du midi reste chaud jusqu’au bureau, au champ ou à l’école.',
    description:
      'Fini les repas froids ! Cette marmite lunch box JIA TENG de 2,2 litres en inox alimentaire garde riz, sauce, soupe ou foutou à bonne température pendant plusieurs heures. Son couvercle à joint et son anse de transport en font l’alliée des élèves, des ouvriers, des commerçants et de tous ceux qui mangent hors de la maison.',
    specs: [
      'Capacité 2,2 litres — inox alimentaire JIA TENG',
      'Couvercle à fermeture hermétique et anse de transport',
      'Garde les plats chauds plusieurs heures',
      'Riz, sauces, soupes, foutou, repas du midi',
      'Entretien facile — ne craint pas les chocs'
    ],
    imageUrl: '/images/products/cuisine-lunch-box-inox-jia-teng-2-2l.jpg',
  },
];

export const INITIAL_PRODUCTS = [
  ...QUINCAILLERIE_BTP_PRODUCTS,
  ...NOUVEAUTES_SMART_MOBILIER_PRODUCTS,
  ...MOTOS_TRICYCLES_PRODUCTS,
  ...SMART_TECHNOLOGY_PRODUCTS,
  ...JOUETS_ENFANTS_PRODUCTS,
  ...CUISINE_MAISON_PRODUCTS,
  ...VAISSELLE_ART_TABLE_PRODUCTS,
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
    featured: false,
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
    featured: false,
    shortDescription: 'Appels Bluetooth au poignet, notifications WhatsApp, suivi santé et écran AMOLED.',
    description:
      'Alliez élégance et technologie avec son boîtier doré brossé et son bracelet vert forêt ultra-confortable. Recevez vos appels et notifications WhatsApp directement au poignet, avec une autonomie allant jusqu’à 7 jours.',
    specs: ['Écran AMOLED haute luminosité', 'Appels Bluetooth + Notifications WhatsApp', 'Étanche IP68 · Charge magnétique'],
    imageUrl: '/images/products/montre-chronofit-gold.jpg',
  },
  {
    id: 'enceinte-boombox-rgb',
    slug: 'enceinte-bluetooth-boombox-etanche-40w',
    name: 'Enceinte Bluetooth Boombox Étanche IPX7 — Basses Puissantes 40W',
    category: 'high-tech',
    price: 26500,
    compareAtPrice: 34000,
    stock: 14,
    badge: 'Choix Pèrôkadô',
    featured: false,
    shortDescription: 'Son stéréo 360° ultra-puissant, poignée intégrée, anneaux LED dynamiques et 18h d’autonomie.',
    description:
      'Animez vos soirées, sorties et événements grâce à ses deux haut-parleurs haute fidélité et radiateurs de basses passifs. Étanche aux éclaboussures IPX7, port USB-A faisant office de batterie externe et jumelage stéréo TWS.',
    specs: ['Puissance 40W RMS · Basses renforcées', 'Autonomie jusqu’à 18 heures · Fonction Powerbank', 'Bluetooth 5.3 + Entrée AUX & Clé USB'],
    imageUrl: '/images/products/enceinte-boombox-rgb.jpg',
  },
  {
    id: 'powerbank-fastcharge-20000',
    slug: 'batterie-externe-20000mah-charge-rapide-22-5w',
    name: 'Batterie Externe 20 000 mAh Charge Ultra-Rapide 22,5W + Écran LED',
    category: 'high-tech',
    price: 11900,
    compareAtPrice: 16000,
    stock: 30,
    badge: 'N°1 des ventes',
    featured: false,
    shortDescription: 'Écran digital précis en %, câble USB-C tressé intégré et charge simultanée de 3 appareils.',
    description:
      'Ne tombez plus jamais en panne de batterie en déplacement entre Daloa, Issia ou Vavoua. Recharge un smartphone jusqu’à 4 fois complètes avec protection intelligente contre les surtensions et affichage exact du pourcentage restant.',
    specs: ['Capacité réelle 20 000 mAh haute densité', 'Charge rapide PD 20W & SuperCharge 22,5W', 'Câble USB-C intégré + 2 ports USB + Écran LED'],
    imageUrl: '/images/products/powerbank-fastcharge-20000.jpg',
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
    featured: false,
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
    id: 'montre-chronographe-acier',
    slug: 'montre-chronographe-prestige-acier-cadran-bleu',
    name: 'Montre Chronographe Prestige Acier Inoxydable — Coffret Cadeau',
    category: 'mode',
    price: 21500,
    compareAtPrice: 29000,
    stock: 11,
    badge: 'Coffret Luxe',
    featured: false,
    shortDescription: 'Mouvement quartz précis, cadran bleu nuit soleillé aux index dorés et écrin rigide offert.',
    description:
      'Une pièce horlogère intemporelle qui rehausse instantanément une tenue habillée ou professionnelle. Verre minéral anti-rayures, aiguilles luminescentes, guichet dateur et résistance à l’eau 3 ATM. Livrée dans son coffret cadeau.',
    specs: ['Acier inoxydable 316L inoxydable', 'Mouvement Quartz japonais + Dateur', 'Livrée en coffret cadeau prêt à offrir'],
    imageUrl: '/images/products/montre-chronographe-acier.jpg',
  },
  {
    id: 'sac-a-dos-business-usb',
    slug: 'sac-a-dos-antivol-ordinateur-15-6-port-usb',
    name: 'Sac à Dos Business Antivol Imperméable 15,6" avec Port USB',
    category: 'mode',
    price: 15500,
    compareAtPrice: 21000,
    stock: 19,
    badge: 'Choix Pèrôkadô',
    featured: false,
    shortDescription: 'Compartiment PC matelassé, tissu déperlant haute densité, dos respirant et port USB externe.',
    description:
      'Conçu pour les étudiants, professionnels et voyageurs. Ses multiples compartiments organisent ordinateur portable 15,6 pouces, documents, tablette et accessoires en toute sécurité grâce à sa poche dorsale secrète.',
    specs: ['Compatible PC portable jusqu’à 15,6 pouces', 'Tissu Oxford déperlant résistant à la pluie', 'Port de charge USB externe intégré'],
    imageUrl: '/images/products/sac-a-dos-business-usb.jpg',
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
    featured: false,
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
    id: 'tondeuse-pro-gold',
    slug: 'tondeuse-professionnelle-sans-fil-edition-gold-lcd',
    name: 'Kit Tondeuse Professionnelle Sans Fil Gold Métal — Écran LCD',
    category: 'beaute-cadeaux',
    price: 12500,
    compareAtPrice: 17000,
    stock: 22,
    badge: 'Vente Flash',
    featured: false,
    shortDescription: 'Lame précision zéro-gap en acier carbone, autonomie 180 min, écran LCD et sabots inclus.',
    description:
      'Obtenez des contours nets et une coupe impeccable à domicile comme en salon. Corps entièrement métallique doré ergonomique, moteur rotatif puissant mais silencieux, recharge universelle USB et autonomie de 3 heures.',
    specs: ['Lames précision T-Blade acier inoxydable', 'Batterie lithium 180 min + Écran LCD %', '4 sabots de coupe + brosse + huile + câble USB'],
    imageUrl: '/images/products/tondeuse-pro-gold.jpg',
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
    featured: false,
    shortDescription: 'Fonctionne sur secteur et batterie intégrée avec panneau solaire inclus, port USB et veilleuse LED.',
    description:
      'Restez au frais même en cas de coupure d’électricité ! Ce ventilateur sur pied réglable intègre une batterie haute capacité offrant jusqu’à 12 heures de ventilation silencieuse, un port USB pour recharger votre téléphone et un panneau solaire.',
    specs: ['Double recharge : Secteur 220V + Panneau solaire inclus', 'Autonomie 8h à 12h + Port USB Powerbank', 'Veilleuse LED intégrée & télécommande'],
    imageUrl: '/images/products/ventilateur-solaire-eco.jpg',
  },
  {
    id: 'friteuse-sans-huile-6l',
    slug: 'friteuse-sans-huile-air-fryer-digitale-6-litres',
    name: 'Friteuse Sans Huile Air Fryer Digitale XXL 6 Litres — 1700W',
    category: 'maison',
    price: 39900,
    compareAtPrice: 52000,
    stock: 8,
    badge: 'Meilleure vente',
    featured: false,
    shortDescription: 'Fenêtre de contrôle éclairée, écran tactile 8 programmes, cuisson croustillante avec 85% d’huile en moins.',
    description:
      'Préparez frites croustillantes, poulet rôti entier, poisson braisé, alloco léger et pâtisseries pour toute la famille sans fumée ni éclaboussures. Cuve familiale 6L antiadhésive amovible ultra-facile à nettoyer.',
    specs: ['Grande capacité familiale 6 Litres · 1700W', 'Écran LED tactile 8 menus automatiques', 'Hublot transparent avec éclairage intérieur'],
    imageUrl: '/images/products/friteuse-sans-huile-6l.jpg',
  },
  {
    id: 'bouilloire-inox-2l',
    slug: 'bouilloire-electrique-inox-2-litres-arret-auto',
    name: 'Bouilloire Électrique Inox Brossé 2,0 Litres — Ébullition Rapide',
    category: 'maison',
    price: 8900,
    compareAtPrice: 12500,
    stock: 28,
    badge: 'Petit prix',
    featured: false,
    shortDescription: 'Intérieur 100% acier inoxydable alimentaire, socle pivotant 360° et arrêt automatique sécurisé.',
    description:
      'Faites bouillir 2 litres d’eau en quelques minutes pour le café, le thé ou la cuisine quotidienne. Double protection contre la marche à vide, poignée isolante anti-chaleur et témoin lumineux de chauffe.',
    specs: ['Capacité généreuse 2,0 Litres · 1500W', 'Cuve intérieure 100% acier inoxydable sain', 'Arrêt automatique à ébullition + Base 360°'],
    imageUrl: '/images/products/bouilloire-inox-2l.jpg',
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

// ==============================================================================
// LOGIQUE DE TARIFICATION LIVRAISON : COLIS STANDARDS VS PRODUITS LOURDS
// - Produits lourds (lave-linge, gazinières/cuisinières, réfrigérateurs, vitrines,
//   congélateurs, climatiseurs, ou case `isHeavy` cochée dans /gestion) :
//   -> 2 500 FCFA dans Daloa (Commune & Périphérie)
//   -> 5 000 FCFA en expédition hors de Daloa (Issia, Vavoua, Bouaflé, Gagnoa…)
// - Colis standards : tarif de la zone (1 000 F / 1 500 F / 2 000 F)
// ==============================================================================
export const HEAVY_DALOA_DELIVERY_FEE = 2500;
export const HEAVY_EXPEDITION_DELIVERY_FEE = 5000;

const HEAVY_PRODUCT_CATEGORIES = new Set(['froid', 'lavage-cuisson', 'motos-tricycles']);
const HEAVY_PRODUCT_KEYWORDS_RE =
  /\b(moto|motos|tricycle|tricycles|scooter|lave[\s-]?linge|lavante|machine\s+[aà]\s+laver|gazini[eè]re|cuisini[eè]re|r[eé]frig[eé]rateur|frigo|cong[eé]lateur|vitrine\s+r[eé]frig[eé]r[eé]e|climatiseur|split\s+\d|lave[\s-]?vaisselle)\b|fontaine\s+[aà]\s+eau|distributeur\s+d['’]eau|pack\s+wc|wc\s+complet|salon\s+d['’]angle|t[eé]l[eé]viseur.{0,30}?\b(55|58|65|75|85)\s*(pouces|"|”|")/i;

export function inferHeavyShipping(product = {}) {
  if (!product) return false;
  if (typeof product.isHeavy === 'boolean') return product.isHeavy;
  if (typeof product.is_heavy === 'boolean') return product.is_heavy;
  const cat = String(product.category || '').toLowerCase();
  if (HEAVY_PRODUCT_CATEGORIES.has(cat)) return true;
  const text = `${product.name || ''} ${product.slug || ''}`;
  return HEAVY_PRODUCT_KEYWORDS_RE.test(text);
}

export function isDaloaZone(zoneOrId) {
  const id = typeof zoneOrId === 'string' ? zoneOrId : String(zoneOrId?.id || '');
  return id.toLowerCase().startsWith('daloa');
}

export function computeZoneDeliveryFee(zone, { hasHeavyItem = false } = {}) {
  const baseFee = Math.max(100, Number(zone?.fee || 1000));
  if (!hasHeavyItem) return baseFee;
  const minHeavyFee = isDaloaZone(zone) ? HEAVY_DALOA_DELIVERY_FEE : HEAVY_EXPEDITION_DELIVERY_FEE;
  return Math.max(baseFee, minHeavyFee);
}

export function computeProductDeliveryFee(product, zone) {
  return computeZoneDeliveryFee(zone, { hasHeavyItem: inferHeavyShipping(product) });
}

