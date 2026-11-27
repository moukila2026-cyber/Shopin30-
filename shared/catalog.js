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
// ARRIVAGE BTP DÉCEMBRE 2026 — Visuels retravaillés aux couleurs Pèrôkadô
// (logo Pèrôkadô + prix marché ivoirien sur chaque fiche), synchronisé en base
// via server/store.js (clé catalog_btp_dec2026_v1_synced).
// ==============================================================================
export const BTP_ARRIVAGE_DEC2026_PRODUCTS = [
  // ---------------------------------------------------------------------------
  // ARRIVAGE DÉCEMBRE 2026 — Visuels retravaillés aux couleurs Pèrôkadô
  // (logo Pèrôkadô + prix marché ivoirien affiché sur chaque fiche)
  // ---------------------------------------------------------------------------
  {
    id: 'btp-griffe-159-cle-canon-luxe-124',
    slug: 'serrure-cle-canon-luxe-124-inox-griffe-159',
    name: 'Serrure Clé à Canon Luxe 124 Inox Griffe — GRIFFE-159',
    category: 'quincaillerie-btp',
    price: 15500,
    compareAtPrice: 18500,
    stock: 15,
    badge: 'Inox Brossé',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Serrure à encastrer Griffe 159 (modèle canon luxe 124) en acier inoxydable brossé, poignée droite et jeu de clés.',
    description:
      'La serrure Griffe 159 « clé à canon luxe 124 » associe une plaque longue en inox brossé anti-traces à une poignée droite ergonomique. Livrée complète avec canon et clés pour portes d’entrée, chambres et bureaux.',
    specs: [
      'Marque Griffe · Réf. GRIFFE-159 · Finition inox brossé',
      'Plaque longue + poignée droite confort',
      'Cylindre à canon sécurisé livré avec clés',
      'Portes bois intérieures & extérieures'
    ],
    imageUrl: '/images/products/btp-griffe-159-cle-canon-luxe-124.jpg',
  },
  {
    id: 'btp-griffe-gf11-1021-cle-canon',
    slug: 'serrure-cle-canon-luxe-griffe-gf-11-1021',
    name: 'Serrure Clé à Canon Luxe Griffe — GF-11-1021',
    category: 'quincaillerie-btp',
    price: 15500,
    compareAtPrice: 18500,
    stock: 15,
    badge: 'Luxe',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Serrure Griffe GF-11-1021 finition satinée : platine longue, poignée courbée design et canon avec clés.',
    description:
      'Élégante et robuste, la serrure Griffe GF-11-1021 habille les portes principales, chambres et bureaux. Sa poignée courbée offre une prise en main agréable et son canon laiton fiabilise la fermeture.',
    specs: [
      'Marque Griffe · Réf. GF-11-1021',
      'Platine longue rectangulaire finition satinée',
      'Poignée courbée design + canon laiton avec clés',
      'Installation standard sur porte bois'
    ],
    imageUrl: '/images/products/btp-griffe-gf11-1021-cle-canon.jpg',
  },
  {
    id: 'btp-colonne-douche-noire-griffe-gs-g041',
    slug: 'colonne-douche-noire-led-griffe-gs-g041',
    name: 'Colonne de Douche Noire avec Affichage Digital Griffe — GS-G041',
    category: 'quincaillerie-btp',
    price: 45000,
    compareAtPrice: 52000,
    stock: 8,
    badge: 'Douche Design Noire',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Colonne de douche noire Griffe GS-G041 : pomme à effet pluie, douchette à main, buse hydromassante et affichage digital de température.',
    description:
      'Donnez un look hôtel à votre salle de bain ! La colonne de douche Griffe GS-G041 en finition noire mat combine une pomme de douche rectangulaire effet pluie, une douchette à main et un afficheur digital de température.',
    specs: [
      'Marque Griffe · Réf. GS-G041 · Finition noire mat',
      'Pomme de douche rectangulaire effet pluie + douchette à main',
      'Afficheur digital de température intégré',
      'Ensemble complet prêt à poser (colonne, flexibles, mitigeur)'
    ],
    imageUrl: '/images/products/btp-colonne-douche-noire-griffe-gs-g041.jpg',
  },
  {
    id: 'btp-motopompe-essence-emtop-egwp8016',
    slug: 'motopompe-a-eau-essence-80mm-3-pouces-7hp-1000l-min-emtop-egwp8016',
    name: 'Motopompe à Eau Essence 80 mm (3") 7,0 HP 1000 L/min EMTOP — EGWP8016',
    category: 'quincaillerie-btp',
    price: 150000,
    compareAtPrice: 175000,
    stock: 6,
    badge: 'Irrigation & Chantier',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Motopompe essence EMTOP EGWP8016 3" (80 mm) 7,0 HP, débit 1000 L/min, réservoir 3,6 L et châssis tubulaire renforcé.',
    description:
      'Parfaite pour irriguer les champs, vider une fosse ou alimenter un chantier : la motopompe EMTOP EGWP8016 aspire et refoule jusqu’à 1000 L/min sur 3 pouces. Moteur essence 7,0 HP, démarrage manuel et cadre acier protecteur.',
    specs: [
      'Marque EMTOP · Réf. EGWP8016 · "Faire la différence"',
      'Moteur essence 7,0 HP · Réservoir 3,6 L',
      'Diamètre 80 mm (3") · Débit 1000 L/min',
      'Châssis tubulaire acier + raccords inclus'
    ],
    imageUrl: '/images/products/btp-motopompe-essence-emtop-egwp8016.jpg',
  },
  {
    id: 'btp-coffret-schneider-144-modules-lvsxt624',
    slug: 'coffret-electrique-144-modules-6-rangees-schneider-lvsxt624',
    name: 'Coffret Électrique 144 Modules 6 Rangées Sans Porte Schneider PrismaSet XS — LVSXT624',
    category: 'quincaillerie-btp',
    price: 389000,
    compareAtPrice: 425000,
    stock: 3,
    badge: '144 Modules Pro',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Coffret apparent Schneider PrismaSet XS LVSXT624 : 6 rangées de 24 modules (144 modules), sans porte, IP30/IK08.',
    description:
      'Pour les installations tertiaires et les grands projets de Daloa : ce coffret PrismaSet XS LVSXT624 offre 6 rangées de 24 modules avec bornier de terre et rails amovibles. Habillage plastique auto-extinguible, IP30 sans porte.',
    specs: [
      'Marque Schneider Electric · Réf. LVSXT624 · Gamme PrismaSet XS',
      '6 rangées × 24 modules = 144 modules · Montage en saillie',
      'Livré sans porte · IP30 / IK08 · 125 A',
      'Bornier de terre et plaques amovibles inclus'
    ],
    imageUrl: '/images/products/btp-coffret-schneider-144-modules-lvsxt624.jpg',
  },
  {
    id: 'btp-parafoudre-schneider-acti9-40ka-a9l40601',
    slug: 'parafoudre-3pn-40ka-avec-report-schneider-acti9-iprd40r-a9l40601',
    name: 'Parafoudre 3P+N 40 kA 350 V avec Report de Signalisation Schneider Acti9 iPRD40r — A9L40601',
    category: 'quincaillerie-btp',
    price: 179000,
    compareAtPrice: 205000,
    stock: 4,
    badge: 'Protection Foudre Pro',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Parafoudre triphasé + neutre Schneider A9L40601 (Acti9 iPRD40r) : 40 kA, 350 V, cartouches débrochables et report de signalisation.',
    description:
      'Protégez ateliers, immeubles et tableaux tertiaires contre la foudre : le parafoudre Acti9 iPRD40r A9L40601 encaisse jusqu’à 40 kA en 3P+N avec report de signalisation pour surveiller l’état des cartouches à distance.',
    specs: [
      'Marque Schneider Electric · Réf. A9L40601 · Acti9 iPRD40r',
      '3P+N · Imax 40 kA · Uc 350 V · Type 2',
      'Cartouches débrochables remplaçables',
      'Report de signalisation (contact auxiliaire) · Rail DIN'
    ],
    imageUrl: '/images/products/btp-parafoudre-schneider-acti9-40ka-a9l40601.jpg',
  },
  {
    id: 'btp-douille-b22-megalec-meg-db22n',
    slug: 'douille-b22-baionnette-megalec-meg-db22n',
    name: 'Douille B22 à Baïonnette Megalec — MEG-DB22N',
    category: 'quincaillerie-btp',
    price: 1500,
    compareAtPrice: 2000,
    stock: 60,
    badge: 'Megalec',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Douille B22 à baïonnette Megalec, corps bakélite blanche et contacts laiton pour ampoules à culot B22.',
    description:
      'Remplacez facilement une douille usée : la douille B22 Megalec MEG-DB22N offre un serrage baïonnette sûr et des contacts laiton durables pour vos points lumineux intérieurs et extérieurs.',
    specs: [
      'Marque Megalec · Réf. MEG-DB22N',
      'Culot B22 à baïonnette · Corps bakélite blanche',
      'Contacts intérieurs laiton haute conductivité',
      'Compatible ampoules LED, fluocompactes et incandescentes B22'
    ],
    imageUrl: '/images/products/btp-douille-b22-megalec-meg-db22n.jpg',
  },
  {
    id: 'btp-disjoncteur-schneider-4p-63a-a9f74463',
    slug: 'disjoncteur-rail-4p-63a-schneider-acti9-ic60n-a9f74463',
    name: 'Disjoncteur sur Rail 4P 63 A Schneider Acti9 iC60N — A9F74463',
    category: 'quincaillerie-btp',
    price: 79900,
    compareAtPrice: 92000,
    stock: 6,
    badge: 'Schneider Original',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Disjoncteur tétrapolaire 4P 63 A courbe C Schneider Acti9 iC60N (A9F74463) pour tableaux tertiaires et industriels.',
    description:
      'Le disjoncteur Schneider Acti9 iC60N A9F74463 protège les circuits triphasés 63 A contre surcharges et courts-circuits. Montage rail DIN, courbe C, qualité certifiée pour tableaux professionnels.',
    specs: [
      'Marque Schneider Electric · Réf. A9F74463 · Acti9 iC60N',
      '4 pôles · 63 A · Courbe C',
      'Pouvoir de coupure 10 kA · Montage rail DIN',
      'Tableaux tertiaires, ateliers et installations triphasées'
    ],
    imageUrl: '/images/products/btp-disjoncteur-schneider-4p-63a-a9f74463.jpg',
  },
  {
    id: 'btp-charniere-universelle-force-charn-uf',
    slug: 'charniere-universelle-008-force-charn-uf',
    name: 'Charnière Universelle 008 FORCE — CHARN-UF',
    category: 'quincaillerie-btp',
    price: 3500,
    compareAtPrice: 4500,
    stock: 40,
    badge: 'FORCE First Choice',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Charnière universelle FORCE 008 en acier zingué doré, pour portes et placards — boîte de qualité « first choice ».',
    description:
      'La charnière universelle FORCE CHARN-UF 008 se monte sur portes bois, placards et meubles. Acier zingué anticorrosion, axe solide et perçages prêts à visser.',
    specs: [
      'Marque FORCE · Réf. CHARN-UF (modèle 008)',
      'Acier zingué doré anticorrosion',
      'Universelle : portes, placards et meubles',
      'Qualité « First Choice » · Conditionnement FORCE'
    ],
    imageUrl: '/images/products/btp-charniere-universelle-force-charn-uf.jpg',
  },
  {
    id: 'btp-vis-rappel-gm-30g-force',
    slug: 'vis-de-rappel-gm-30g-force-vis-rf',
    name: 'Vis de Rappel GM 30 g FORCE — VIS-RF',
    category: 'quincaillerie-btp',
    price: 2500,
    compareAtPrice: 3500,
    stock: 50,
    badge: 'Serrurerie FORCE',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Vis de rappel GM FORCE (VIS-RF) à ressort, boîtier zingué doré : rappel automatique des portes et placards.',
    description:
      'Petite pièce, grand confort : la vis de rappel FORCE VIS-RF referme automatiquement portes et placards. Boîtier métal zingué doré, ressort réglable et pose en applique rapide.',
    specs: [
      'Marque FORCE · Réf. VIS-RF · Modèle GM',
      'Boîtier acier zingué doré · Ressort de rappel',
      'Se monte en applique sur porte ou placard',
      'Livré en sachet de 30 g'
    ],
    imageUrl: '/images/products/btp-vis-rappel-gm-30g-force.jpg',
  },
  {
    id: 'btp-tole-noire-acier-08mm-force-at8188',
    slug: 'feuille-tole-noire-acier-08mm-1x2m-force-at8188',
    name: 'Feuille de Tôle Noire Acier 0,8 mm — 1 × 2 m FORCE — FORCE-AT8188',
    category: 'quincaillerie-btp',
    price: 32000,
    compareAtPrice: 37500,
    stock: 12,
    badge: 'Acier 8/10',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Feuille de tôle noire en acier laminé 0,8 mm (8/10) au format 1 × 2 m, motif décoratif embossé pour portes et façades.',
    description:
      'Feuille de tôle noire FORCE AT8188 en acier 8/10 (0,8 mm) : idéale pour habiller portes, portails, façades et travaux de tôlerie. Le motif embossé apporte une finition décorative immédiate.',
    specs: [
      'Marque FORCE · Réf. FORCE-AT8188',
      'Acier noir laminé 0,8 mm (8/10)',
      'Format 1 × 2 m · Motif décoratif embossé',
      'Portes, portails, façades et tôlerie générale'
    ],
    imageUrl: '/images/products/btp-tole-noire-acier-08mm-force-at8188.jpg',
  },
  {
    id: 'btp-dpn-vigi-schneider-easy9-ez9d32610',
    slug: 'disjoncteur-differentiel-dpn-vigi-2p-10a-30ma-schneider-easy9-ez9d32610',
    name: 'Disjoncteur Différentiel DPN Vigi 2P 10 A 30 mA Schneider Easy9 — EZ9D32610',
    category: 'quincaillerie-btp',
    price: 59000,
    compareAtPrice: 68000,
    stock: 5,
    badge: 'Schneider Easy9',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Disjoncteur différentiel Schneider Easy9 EZ9D32610 : 1P+N 10 A, sensibilité 30 mA, courbe C, protection des personnes et des circuits.',
    description:
      'Le DPN Vigi Easy9 EZ9D32610 combine disjonction 10 A et protection différentielle 30 mA : il coupe le circuit en cas de fuite de courant et protège ainsi les occupants et les appareils.',
    specs: [
      'Marque Schneider Electric · Réf. EZ9D32610 · Gamme Easy9',
      '1P+N · 10 A · Courbe C · 30 mA',
      'Protection des personnes contre les fuites de courant',
      'Bouton test mensuel · Montage rail DIN'
    ],
    imageUrl: '/images/products/btp-dpn-vigi-schneider-easy9-ez9d32610.jpg',
  },
  {
    id: 'btp-souffleur-aspirateur-emtop-eabr6506',
    slug: 'souffleur-aspirateur-650w-emtop-eabr6506',
    name: 'Souffleur / Aspirateur 650 W 4,0 m³/min EMTOP — EABR6506',
    category: 'quincaillerie-btp',
    price: 32000,
    compareAtPrice: 38000,
    stock: 10,
    badge: '650 W',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Souffleur-aspirateur EMTOP EABR6506 650 W, débit 4,0 m³/min, vitesse variable 0–16 500 tr/min avec sac à poussière.',
    description:
      'Nettoyez cours, ateliers, véhicules et chantiers en un éclair : le souffleur-aspirateur EMTOP EABR6506 développe 650 W et un débit d’air de 4,0 m³/min, avec vitesse variable et accessoires de soufflage.',
    specs: [
      'Marque EMTOP · Réf. EABR6506',
      'Puissance 650 W · 0–16 500 tr/min',
      'Débit d’air 4,0 m³/min · Vitesse variable',
      'Livré avec buse de soufflage et sac à poussière'
    ],
    imageUrl: '/images/products/btp-souffleur-aspirateur-emtop-eabr6506.jpg',
  },
  {
    id: 'btp-chaussure-securite-emtop-esbs71sb45',
    slug: 'chaussure-de-securite-noire-pointure-45-emtop-esbs71sb45',
    name: 'Chaussure de Sécurité Noire Pointure 45 EMTOP — ESBS71SB45',
    category: 'quincaillerie-btp',
    price: 17500,
    compareAtPrice: 21000,
    stock: 12,
    badge: 'Embout Acier SB',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Chaussure de sécurité montante EMTOP ESBS71SB45 pointure 45 : embout acier, norme SB, semelle antidérapante et tige traitée déperlante.',
    description:
      'Pour les chantiers, ateliers et usines : la chaussure EMTOP ESBS71SB45 protège des chocs grâce à son embout acier et garde le pied au sec (tige déperlante, semelle double densité antidérapante).',
    specs: [
      'Marque EMTOP · Réf. ESBS71SB45 · Pointure 45',
      'Embout de protection acier · Norme SB',
      'Semelle PU double densité antidérapante',
      'Tige cuir traitée déperlante · Lacets rouges'
    ],
    imageUrl: '/images/products/btp-chaussure-securite-emtop-esbs71sb45.jpg',
  },
  {
    id: 'btp-fiche-industrielle-megalec-5p-32a-meg-125g',
    slug: 'socle-prise-industriel-femelle-5p-32a-ip44-megalec-meg-125g',
    name: 'Fiche Industrielle Femelle Apparente 5P 32 A IP44 Megalec — MEG-125G',
    category: 'quincaillerie-btp',
    price: 12500,
    compareAtPrice: 15500,
    stock: 10,
    badge: 'Triphasé 32 A',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Socle prise industrielle femelle apparent 5P (3P+N+T) 32 A 400 V IP44 Megalec, clapet rouge de protection.',
    description:
      'Alimentez machines, ateliers et groupes électrogènes en toute sécurité : ce socle prise Megalec MEG-125G 5P 32 A IP44 supporte les fortes intensités et résiste aux poussières et projections d’eau.',
    specs: [
      'Marque Megalec · Réf. MEG-125G',
      '5 pôles (3P+N+T) · 32 A · 400 V',
      'Indice de protection IP44 · Clapet rouge',
      'Ateliers, machines-outils et groupes électrogènes'
    ],
    imageUrl: '/images/products/btp-fiche-industrielle-megalec-5p-32a-meg-125g.jpg',
  },
  {
    id: 'btp-canon-simple-5-cles-force-cle-s5-70',
    slug: 'canon-simple-5-cles-70mm-force-cle-s5-70',
    name: 'Canon Simple 5 Clés 70 mm FORCE — CLE-S5-70',
    category: 'quincaillerie-btp',
    price: 6000,
    compareAtPrice: 7500,
    stock: 25,
    badge: '5 Clés',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Cylindre de sûreté FORCE CLE-S5-70 longueur 70 mm, livré avec 5 clés et sa vis de fixation.',
    description:
      'Remplacez un cylindre fatigué par le canon FORCE CLE-S5-70 : 70 mm de longueur, pêne laiton, 5 clés fournies et vis de fixation incluses pour une pose immédiate sur porte bois.',
    specs: [
      'Marque FORCE · Réf. CLE-S5-70',
      'Longueur cylindre 70 mm',
      'Livré avec 5 clés + vis de fixation',
      'Pêne et barillet métal haute résistance'
    ],
    imageUrl: '/images/products/btp-canon-simple-5-cles-force-cle-s5-70.jpg',
  },
  {
    id: 'btp-disjoncteur-compact-schneider-c25f6tm250',
    slug: 'disjoncteur-compact-250a-4p3d-schneider-compact-nsx250f-c25f6tm250',
    name: 'Disjoncteur Compact 250 A 4P3D 36 kA Schneider ComPacT NSX250F — C25F6TM250',
    category: 'quincaillerie-btp',
    price: 1339000,
    compareAtPrice: 1400000,
    stock: 2,
    badge: 'NSX250F · Pro',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Disjoncteur boîtier moulé Schneider ComPacT NSX250F C25F6TM250 : déclencheur TM-D 250 A, 4P3D, 36 kA à 415 V, montage fixe.',
    description:
      'Pour les tableaux généraux d’immeubles, usines et gros chantiers : le ComPacT NSX250F C25F6TM250 encaisse 250 A avec un pouvoir de coupure de 36 kA. Déclencheur magnéto-thermique TM-D réglable et montage fixe.',
    specs: [
      'Marque Schneider Electric · Réf. C25F6TM250',
      'ComPacT NSX250F · Déclencheur TM-D 250 A',
      '4P3D (neutre non protégé) · 36 kA / 415 V',
      'Montage fixe · Commande par maneton'
    ],
    imageUrl: '/images/products/btp-disjoncteur-compact-schneider-c25f6tm250.jpg',
  },
  {
    id: 'btp-oxyde-bleu-force-25kg',
    slug: 'oxyde-de-fer-bleu-25kg-force-25',
    name: 'Oxyde de Fer Bleu 25 kg FORCE — FORCE-25',
    category: 'quincaillerie-btp',
    price: 250000,
    compareAtPrice: 280000,
    stock: 8,
    badge: 'Pigment Béton',
    featured: false,
    isHeavy: true,
    shortDescription:
      'Sac de 25 kg d’oxyde de fer bleu FORCE-25 : pigment puissant pour béton, ciment, mortier et peintures.',
    description:
      'Colorez bétons décoratifs, dalles, pavés et enduits avec l’oxyde de fer bleu FORCE-25. Poudre fine à fort pouvoir colorant, conditionnée en sac de 25 kg — dosage régulier et tenue à la lumière.',
    specs: [
      'Marque FORCE · Réf. FORCE-25 · « Iron Oxide Blue »',
      'Sac 25 kg (poids net) · Poudre fine',
      'Béton, ciment, mortier, enduits et peintures',
      'Fort pouvoir colorant · Bonne tenue à la lumière'
    ],
    imageUrl: '/images/products/btp-oxyde-bleu-force-25kg.jpg',
  },
  {
    id: 'btp-dpn-20a-schneider-easy9-ez9p32620',
    slug: 'disjoncteur-dpn-20a-courbe-c-schneider-easy9-ez9p32620',
    name: 'Disjoncteur DPN 20 A Courbe C Schneider Easy9 — EZ9P32620',
    category: 'quincaillerie-btp',
    price: 6000,
    compareAtPrice: 7500,
    stock: 25,
    badge: 'Schneider Easy9',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Disjoncteur unipolaire + neutre 20 A courbe C Schneider Easy9 EZ9P32620, montage sur rail DIN, 4,5 kA.',
    description:
      'Protégez éclairage et prises avec le DPN Easy9 EZ9P32620 : 1P+N 20 A courbe C, 4,5 kA, montage rail DIN. La référence la plus demandée pour les petits tableaux de maisons et boutiques.',
    specs: [
      'Marque Schneider Electric · Réf. EZ9P32620 · Gamme Easy9',
      '1P+N · 20 A · Courbe C',
      'Pouvoir de coupure 4,5 kA · Rail DIN',
      'Maisons, boutiques et petits tableaux'
    ],
    imageUrl: '/images/products/btp-dpn-20a-schneider-easy9-ez9p32620.jpg',
  },
  {
    id: 'btp-tirefond-tole-8x80-bleu-force',
    slug: 'tirefond-de-tole-8x80mm-bleu-force-avec-cavaliers',
    name: 'Kit Tirefonds de Tôle 8×80 mm Bleu FORCE — TIR-8X80F (Cavaliers & Rondelles Étanches)',
    category: 'quincaillerie-btp',
    price: 4500,
    compareAtPrice: 6000,
    stock: 40,
    badge: 'Toiture BTP',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Tirefonds de fixation de tôles 8×80 mm en acier bichromaté FORCE avec cavaliers bleus, rondelles métal et joints d’étanchéité.',
    description:
      'Assurez une fixation solide et 100 % étanche de vos tôles de toiture ! Ce kit FORCE (Réf. TIR-8X80F) réunit les tirefonds 8×80 mm anticorrosion, les cavaliers de maintien bleus et les rondelles d’étanchéité.',
    specs: [
      'Marque FORCE · Réf. TIR-8X80F · Dimensions : 8 × 80 mm',
      'Acier bichromaté haute résistance anti-rouille',
      'Livré avec cavaliers bleus, rondelles acier et joints étanches',
      'Indispensable pour pose de tôles bac alu et toitures'
    ],
    imageUrl: '/images/products/btp-tirefond-tole-8x80-bleu-force.jpg',
  },
  {
    id: 'btp-interrupteur-differentiel-megalec-4p-63a-id4p63a30ma',
    slug: 'interrupteur-differentiel-megalec-4p-63a-30ma-id4p63a30ma',
    name: 'Interrupteur Différentiel MEGALEC 4P 63 A 30 mA — ID4P63A30MA',
    category: 'quincaillerie-btp',
    price: 55000,
    compareAtPrice: 63000,
    stock: 12,
    badge: 'MEGALEC',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Interrupteur différentiel tétrapolaire MEGALEC 4P 63 A 30 mA type AC, 400 V, 4 modules sur rail DIN.',
    description:
      'L’interrupteur différentiel MEGALEC ID4P63A30MA protège les personnes contre les contacts indirects sur les installations triphasées ou tétrapolaires. 4 pôles, 63 A, sensibilité 30 mA type AC, tension d’emploi 400 V, encombrement 4 modules sur rail DIN : la référence attendue pour les tableaux de villas, boutiques et ateliers.',
    specs: [
      'Marque MEGALEC · Réf. ID4P63A30MA',
      '4 pôles (3P+N) · 63 A · 30 mA type AC',
      'Tension d’emploi 400 V · 4 modules rail DIN',
      'Protection des personnes — tableaux triphasés'
    ],
    imageUrl: '/images/products/btp-interrupteur-differentiel-megalec-4p-63a-id4p63a30ma.jpg',
  },
  {
    id: 'btp-griffe-gf11-1024-cle-canon',
    slug: 'serrure-cle-a-canon-luxe-griffe-gf-11-1024',
    name: 'Serrure Clé à Canon Luxe Griffe — GF-11-1024',
    category: 'quincaillerie-btp',
    price: 15500,
    compareAtPrice: 18500,
    stock: 15,
    badge: 'Griffe',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Serrure à encastrer Griffe GF-11-1024 « clé à canon luxe » : plaque longue noire, béquille droite et jeu de clés.',
    description:
      'La serrure Griffe GF-11-1024 reprend le dessin « clé à canon luxe » : plaque longue finition noire, béquille droite et canon livré avec ses clés. Un modèle robuste et sobre, très demandé pour les portes d’entrée, chambres et bureaux.',
    specs: [
      'Marque Griffe · Réf. GF-11-1024 · Finition noire',
      'Plaque longue + béquille droite',
      'Cylindre à canon livré avec clés',
      'Portes bois intérieures & extérieures'
    ],
    imageUrl: '/images/products/btp-griffe-gf11-1024-cle-canon.jpg',
  },
  {
    id: 'btp-targette-porte-force-178',
    slug: 'targette-crochets-dores-force-178-zx-14',
    name: 'Douzaine de Targettes Dorées FORCE — FORCE-178 (ZX-14)',
    category: 'quincaillerie-btp',
    price: 7500,
    compareAtPrice: 9000,
    stock: 20,
    badge: 'Lot × 12',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Douzaine de targettes / verrous de porte dorés FORCE FORCE-178 (modèle ZX-14), acier traité anticorrosion.',
    description:
      'Vendu par douzaine, ce lot de targettes FORCE FORCE-178 (ZX-14) assure le verrouillage des portes, portails et fenêtres. Acier traité finition dorée, pêne coulissant et gâche fournie : un classique de quincaillerie pour les chantiers et les revendeurs.',
    specs: [
      'Marque FORCE · Réf. FORCE-178 · Modèle ZX-14',
      'Conditionnement : douzaine (12 pièces)',
      'Acier traité, finition dorée anticorrosion',
      'Pêne coulissant + gâche — portes et fenêtres'
    ],
    imageUrl: '/images/products/btp-targette-porte-force-178.jpg',
  },
  {
    id: 'btp-tirefond-tole-8x80-vert-force-ttvd',
    slug: 'tirefond-de-tole-8x80mm-vert-force-ttvd-avec-cavaliers',
    name: 'Kit Tirefonds de Tôle 8×80 mm Vert FORCE — TTVD (Cavaliers & Rondelles Étanches)',
    category: 'quincaillerie-btp',
    price: 4500,
    compareAtPrice: 6000,
    stock: 40,
    badge: 'Toiture BTP',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Tirefonds de fixation de tôles 8×80 mm acier bichromaté FORCE avec cavaliers verts, rondelles et joints d’étanchéité.',
    description:
      'Fixation solide et étanche des tôles de toiture : ce kit FORCE TTVD réunit les tirefonds 8×80 mm anticorrosion, les cavaliers de maintien verts et les rondelles d’étanchéité. La version verte s’accorde aux tôles et bacs acier de teinte foncée.',
    specs: [
      'Marque FORCE · Réf. TTVD · Dimensions : 8 × 80 mm',
      'Acier bichromaté haute résistance anti-rouille',
      'Livré avec cavaliers verts, rondelles et joints étanches',
      'Indispensable pour pose de tôles bac alu et toitures'
    ],
    imageUrl: '/images/products/btp-tirefond-tole-8x80-vert-force-ttvd.jpg',
  },
  {
    id: 'btp-disjoncteur-schneider-2p-63a-a9f74263',
    slug: 'disjoncteur-schneider-2p-63a-ic60n-a9f74263',
    name: 'Disjoncteur sur Rail 2P 63 A Schneider Acti9 iC60N — A9F74263',
    category: 'quincaillerie-btp',
    price: 25000,
    compareAtPrice: 29000,
    stock: 20,
    badge: 'Schneider Acti9',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Disjoncteur bipolaire Schneider Acti9 iC60N 2P 63 A courbe C, 6 kA, montage rail DIN.',
    description:
      'Le Schneider Acti9 iC60N A9F74263 protège vos circuits bipolaires jusqu’à 63 A : courbe C, pouvoir de coupure 6 kA, obturateurs IP20B et montage rail DIN sur 2 modules. La référence des tableaux de villas et de boutiques correctement dimensionnés.',
    specs: [
      'Marque Schneider Electric · Réf. A9F74263 · Gamme Acti9 iC60N',
      '2 pôles · 63 A · Courbe C · 6 kA',
      'Obturateurs IP20B · 2 modules rail DIN',
      'Tableaux tertiaires et domestiques',
    ],
    imageUrl: '/images/products/btp-disjoncteur-schneider-2p-63a-a9f74263.jpg',
  },
  {
    id: 'btp-griffe-gf11-1028-cle-canon',
    slug: 'serrure-cle-a-canon-luxe-griffe-gf-11-1028',
    name: 'Serrure Clé à Canon Luxe Griffe — GF-11-1028',
    category: 'quincaillerie-btp',
    price: 15500,
    compareAtPrice: 18500,
    stock: 15,
    badge: 'Griffe',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Serrure à encastrer Griffe GF-11-1028 « clé à canon luxe » : plaque longue, béquille galbée et jeu de clés.',
    description:
      'La Griffe GF-11-1028 poursuit la série « clé à canon luxe » : plaque longue finition sombre, béquille galbée confortable et canon livré avec ses clés. Un modèle élégant pour portes d’entrée, chambres et bureaux.',
    specs: [
      'Marque Griffe · Réf. GF-11-1028',
      'Plaque longue + béquille galbée',
      'Cylindre à canon livré avec clés',
      'Portes bois intérieures & extérieures',
    ],
    imageUrl: '/images/products/btp-griffe-gf11-1028-cle-canon.jpg',
  },
  {
    id: 'btp-interrupteur-differentiel-megalec-4p-40a-id4p40a30ma',
    slug: 'interrupteur-differentiel-megalec-4p-40a-30ma-id4p40a30ma',
    name: 'Interrupteur Différentiel MEGALEC 4P 40 A 30 mA — ID4P40A30MA',
    category: 'quincaillerie-btp',
    price: 45000,
    compareAtPrice: 52000,
    stock: 12,
    badge: 'MEGALEC',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Interrupteur différentiel tétrapolaire MEGALEC 4P 40 A 30 mA type AC, 400 V, 4 modules rail DIN.',
    description:
      'Le MEGALEC ID4P40A30MA (série GYL8) protège les personnes sur les installations tétrapolaires : 4 pôles, 40 A, 30 mA type AC, 400 V~ 50/60 Hz, 4 modules sur rail DIN. Le bon calibre pour les tableaux triphasés de villas et de petits ateliers.',
    specs: [
      'Marque MEGALEC · Réf. ID4P40A30MA · Série GYL8',
      '4 pôles · 40 A · 30 mA type AC',
      '400 V~ 50/60 Hz · 4 modules rail DIN',
      'Protection des personnes — tableaux triphasés',
    ],
    imageUrl: '/images/products/btp-interrupteur-differentiel-megalec-4p-40a-id4p40a30ma.jpg',
  },
  {
    id: 'btp-fiche-industrielle-megalec-3p-16a-meg-013g',
    slug: 'fiche-industrielle-male-3p-16a-ip44-megalec-meg-013g',
    name: 'Fiche Industrielle Mâle 3P 16 A IP44 Megalec — MEG-013G',
    category: 'quincaillerie-btp',
    price: 6500,
    compareAtPrice: 8000,
    stock: 40,
    badge: 'MEGALEC',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Fiche mâle P17 3P+T 16 A 380 V IP44 Megalec bleue, corps polyamide et presse-étoupe.',
    description:
      'La fiche mâle MEGALEC MEG-013G raccorde vos machines triphasées 380 V en 3P+T 16 A. Corps polyamide bleu, indice IP44 et presse-étoupe intégré : la prise P17 standard des ateliers et chantiers.',
    specs: [
      'Marque MEGALEC · Réf. MEG-013G',
      'Fiche mâle P17 3P+T · 16 A · 380 V',
      'Indice de protection IP44',
      'Presse-étoupe intégré — ateliers & chantiers',
    ],
    imageUrl: '/images/products/btp-fiche-industrielle-megalec-3p-16a-meg-013g.jpg',
  },
  {
    id: 'btp-fiche-industrielle-megalec-5p-32a-meg-025g',
    slug: 'fiche-industrielle-male-5p-32a-ip44-megalec-meg-025g',
    name: 'Fiche Industrielle Mâle 5P 32 A IP44 Megalec — MEG-025G',
    category: 'quincaillerie-btp',
    price: 11500,
    compareAtPrice: 14000,
    stock: 30,
    badge: 'MEGALEC',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Fiche mâle P17 5P (3P+N+T) 32 A 400 V IP44 Megalec rouge, presse-étoupe intégré.',
    description:
      'La MEGALEC MEG-025G est la fiche mâle tétrapolaire + terre 32 A des installations 400 V : 5 broches, IP44, corps polyamide rouge et presse-étoupe. Indispensable pour alimenter groupes, machines et coffrets de chantier.',
    specs: [
      'Marque MEGALEC · Réf. MEG-025G',
      'Fiche mâle P17 5P (3P+N+T) · 32 A · 400 V',
      'Indice de protection IP44',
      'Presse-étoupe intégré — coffrets & machines',
    ],
    imageUrl: '/images/products/btp-fiche-industrielle-megalec-5p-32a-meg-025g.jpg',
  },
  {
    id: 'btp-serrure-force-cle-s-101-1919',
    slug: 'serrure-cle-a-canon-luxe-force-s-101-1919',
    name: 'Serrure Clé à Canon Luxe FORCE — S-101-1919',
    category: 'quincaillerie-btp',
    price: 9500,
    compareAtPrice: 11500,
    stock: 20,
    badge: 'FORCE',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Serrure à encastrer FORCE S-101-1919 : plaque longue noire mate, béquille droite inox et cylindre à clé.',
    description:
      'Sobre et robuste, la FORCE S-101-1919 associe une plaque longue noire mate à une béquille droite inox brossé. Cylindre à clé fourni, montage sur porte bois : un classique de la quincaillerie de bâtiment.',
    specs: [
      'Marque FORCE · Réf. S-101-1919',
      'Plaque longue noire mate + béquille droite',
      'Cylindre à clé fourni',
      'Portes bois intérieures & extérieures',
    ],
    imageUrl: '/images/products/btp-serrure-force-cle-s-101-1919.jpg',
  },
  {
    id: 'btp-fiche-industrielle-megalec-4p-16a-meg-114g',
    slug: 'fiche-industrielle-femelle-apparente-4p-16a-ip44-megalec-meg-114g',
    name: 'Fiche Industrielle Femelle Apparente 4P 16 A IP44 Megalec — MEG-114G',
    category: 'quincaillerie-btp',
    price: 6000,
    compareAtPrice: 7500,
    stock: 40,
    badge: 'MEGALEC',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Prise femelle apparente 4P 16 A IP44 Megalec à couvercle rabattable rouge, boîtier à visser.',
    description:
      'La MEGALEC MEG-114G est une prise femelle apparente 4 pôles 16 A avec capot rabattable rouge et boîtier à visser. IP44, elle équipe murs d’atelier, coffrets et installations extérieures protégées.',
    specs: [
      'Marque MEGALEC · Réf. MEG-114G',
      'Prise femelle apparente 4P · 16 A · 400 V',
      'Indice de protection IP44 · capot rabattable',
      'Boîtier à visser — ateliers & extérieur',
    ],
    imageUrl: '/images/products/btp-fiche-industrielle-megalec-4p-16a-meg-114g.jpg',
  },
  {
    id: 'btp-cle-douche-griffe-162',
    slug: 'serrure-cle-de-douche-luxe-124-griffe-162',
    name: 'Serrure Clé de Douche Luxe 124 Griffe — GRIFFE-162',
    category: 'quincaillerie-btp',
    price: 8500,
    compareAtPrice: 10000,
    stock: 15,
    badge: 'Griffe',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Serrure de salle de bain / clé de douche Griffe 162, canon laiton et clés, finition inox.',
    description:
      'La Griffe 162 est une serrure « clé de douche » : bec de cane et canon laiton sur rosace longue inox, livrée avec ses clés. Conçue pour les salles de bain et portes intérieures où l’on veut verrouiller sans encombrer.',
    specs: [
      'Marque Griffe · Réf. GRIFFE-162',
      'Serrure clé de douche / salle de bain',
      'Canon laiton livré avec clés',
      'Rosace longue inox — portes intérieures',
    ],
    imageUrl: '/images/products/btp-cle-douche-griffe-162.jpg',
  },
  {
    id: 'btp-force-cle-123f-rosace-etroite',
    slug: 'serrure-force-123f-rosace-etroite-cle-a-canon',
    name: 'Serrure Clé à Canon FORCE 123F — Rosace Étroite Inox (CLE-123F)',
    category: 'quincaillerie-btp',
    price: 9500,
    compareAtPrice: 11500,
    stock: 20,
    badge: 'Rosace étroite',
    featured: false,
    isHeavy: false,
    shortDescription:
      'FORCE 123F à rosace ÉTROITE (étroite = petite plaque ronde) : béquille galbée inox et canon à clé. À ne pas confondre avec la 134F à plaque longue.',
    description:
      'La FORCE CLE-123F reprend le dessin « clé à canon luxe 123 » en version rosace étroite : béquille galbée inox, canon à clé et finition satinée. Parfaite pour les portes intérieures et les portes de service.',
    specs: [
      'Marque FORCE · Réf. CLE-123F',
      'DISTINCTION : rosace étroite — pas la 134F à plaque longue',
      'Rosace étroite inox + béquille galbée',
      'Canon à clé fourni',
      'Portes intérieures & portes de service',
    ],
    imageUrl: '/images/products/btp-force-cle-123f-rosace-etroite.jpg',
  },
  {
    id: 'btp-disjoncteur-megalec-2p-63a-d2p63a',
    slug: 'disjoncteur-sur-rail-2p-63a-megalec-d2p63a',
    name: 'Disjoncteur sur Rail 2P 63 A Megalec — D2P63A (GYM10)',
    category: 'quincaillerie-btp',
    price: 15000,
    compareAtPrice: 18000,
    stock: 20,
    badge: 'MEGALEC',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Disjoncteur bipolaire Megalec 2P 63 A courbe C série GYM10, 400 V, rail DIN.',
    description:
      'Le Megalec D2P63A (série GYM10 C63) est un disjoncteur bipolaire 63 A courbe C pour 400 V~ 50/60 Hz, conforme IEC/EN 60898-1. Deux modules sur rail DIN : il protège l’arrivée générale des petits tableaux.',
    specs: [
      'Marque MEGALEC · Réf. D2P63A · Série GYM10 C63',
      '2 pôles · 63 A · Courbe C · 400 V',
      'Conforme IEC/EN 60898-1 · 2 modules rail DIN',
      'Protection d’arrivée — petits tableaux',
    ],
    imageUrl: '/images/products/btp-disjoncteur-megalec-2p-63a-d2p63a.jpg',
  },
  {
    id: 'btp-pompe-immergee-emtop-1500w-ewppd15001',
    slug: 'pompe-immergee-forage-emtop-1500w-2hp-ewppd15001',
    name: 'Pompe Immergée de Forage 1500 W (2,0 HP) 4" 100 L/min EMTOP — EWPPD15001',
    category: 'quincaillerie-btp',
    price: 175000,
    compareAtPrice: 205000,
    stock: 8,
    badge: 'EMTOP · 2 HP',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Pompe immergée 4" EMTOP 1500 W (2,0 HP), 220-240 V, 100 L/min, refoulement 135 m, moteur 100 % cuivre.',
    description:
      'Conçue pour les forages et puits profonds, la EMTOP EWPPD15001 développe 1500 W (2,0 HP) en 220-240 V~ 50 Hz avec un corps de pompe inox, un refoulement de 135 m et un débit de 100 L/min. Moteur 100 % fil de cuivre, sortie 1-1/4" : l’équipement des villas et exploitations agricoles.',
    specs: [
      'Marque EMTOP · Réf. EWPPD15001',
      '1500 W (2,0 HP) · 220-240 V~ 50 Hz',
      'Corps inox · 4" · sortie 1-1/4"',
      'Débit 100 L/min · refoulement 135 m · moteur 100 % cuivre',
    ],
    imageUrl: '/images/products/btp-pompe-immergee-emtop-1500w-ewppd15001.jpg',
  },
  {
    id: 'btp-tirefond-tole-8x80-rouge-force-ttrf',
    slug: 'kit-tirefonds-tole-8x80mm-rouge-force-ttrf',
    name: 'Kit Tirefonds de Tôle 8×80 mm Rouge FORCE — TTRF (Cavaliers & Rondelles Étanches)',
    category: 'quincaillerie-btp',
    price: 4500,
    compareAtPrice: 6000,
    stock: 40,
    badge: 'Toiture BTP',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Tirefonds de fixation de tôles 8×80 mm acier bichromaté FORCE avec cavaliers rouges, rondelles et joints d’étanchéité.',
    description:
      'Fixation solide et étanche des tôles de toiture : ce kit FORCE TTRF réunit les tirefonds 8×80 mm anticorrosion, les cavaliers de maintien rouges et les rondelles d’étanchéité. La version rouge s’associe aux tôles et bacs acier de teinte tuile.',
    specs: [
      'Marque FORCE · Réf. TTRF · Dimensions : 8 × 80 mm',
      'Acier bichromaté haute résistance anti-rouille',
      'Livré avec cavaliers rouges, rondelles et joints étanches',
      'Indispensable pour pose de tôles bac alu et toitures',
    ],
    imageUrl: '/images/products/btp-tirefond-tole-8x80-rouge-force-ttrf.jpg',
  },
  {
    id: 'btp-fiche-industrielle-megalec-3p-32a-meg-023g',
    slug: 'fiche-industrielle-male-3p-32a-ip44-megalec-meg-023g',
    name: 'Fiche Industrielle Mâle 3P 32 A IP44 Megalec — MEG-023G',
    category: 'quincaillerie-btp',
    price: 8500,
    compareAtPrice: 10500,
    stock: 35,
    badge: 'MEGALEC',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Fiche mâle P17 3P+T 32 A 380 V IP44 Megalec bleue, presse-étoupe intégré.',
    description:
      'La MEGALEC MEG-023G est la version 32 A de la fiche mâle triphasée 3P+T : 380 V, IP44, corps polyamide bleu et presse-étoupe. Elle alimente machines, pompes et groupes sur chantier.',
    specs: [
      'Marque MEGALEC · Réf. MEG-023G',
      'Fiche mâle P17 3P+T · 32 A · 380 V',
      'Indice de protection IP44',
      'Presse-étoupe intégré — machines & pompes',
    ],
    imageUrl: '/images/products/btp-fiche-industrielle-megalec-3p-32a-meg-023g.jpg',
  },
  {
    id: 'btp-fiche-industrielle-megalec-4p-16a-meg-014g',
    slug: 'fiche-industrielle-male-4p-16a-ip44-megalec-meg-014g',
    name: 'Fiche Industrielle Mâle 4P 16 A IP44 Megalec — MEG-014G',
    category: 'quincaillerie-btp',
    price: 7000,
    compareAtPrice: 8500,
    stock: 40,
    badge: 'MEGALEC',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Fiche mâle P17 4P 16 A 400 V IP44 Megalec rouge, presse-étoupe intégré.',
    description:
      'La MEGALEC MEG-014G raccorde vos équipements tétrapolaires en 16 A : 4 pôles, 400 V, IP44, corps polyamide rouge et presse-étoupe intégré. Un standard des ateliers, coffrets de chantier et machines-outils.',
    specs: [
      'Marque MEGALEC · Réf. MEG-014G',
      'Fiche mâle P17 4P · 16 A · 400 V',
      'Indice de protection IP44',
      'Presse-étoupe intégré — ateliers & chantiers',
    ],
    imageUrl: '/images/products/btp-fiche-industrielle-megalec-4p-16a-meg-014g.jpg',
  },
  {
    id: 'btp-chauffe-eau-electrique-force-50l-force-417',
    slug: 'chauffe-eau-electrique-50l-vedal-force-417',
    name: 'Chauffe-Eau Électrique 50 L FORCE — FORCE-417 (Vedal)',
    category: 'quincaillerie-btp',
    price: 85000,
    compareAtPrice: 99000,
    stock: 10,
    badge: 'FORCE · 50 L',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Chauffe-eau électrique à accumulation 50 L FORCE FORCE-417, cuve émaillée, thermostat réglable et indicateur de température.',
    description:
      'Le chauffe-eau FORCE FORCE-417 (gamme Vedal) stocke 50 litres d’eau chaude, de quoi couvrir les besoins d’une famille ou d’un logement locatif. Cuve émaillée, isolation haute densité, thermostat réglable et manomètre de température en façade, raccordements eau froide / eau chaude repérés rouge et bleu.',
    specs: [
      'Marque FORCE · Réf. FORCE-417 · Gamme Vedal',
      'Capacité 50 L · à accumulation',
      'Cuve émaillée · thermostat réglable',
      'Indicateur/manomètre en façade · raccords repérés',
    ],
    imageUrl: '/images/products/btp-chauffe-eau-electrique-force-50l-force-417.jpg',
  },
  {
    id: 'btp-griffe-164-cle-canon-lux-chrome',
    slug: 'serrure-cle-a-canon-lux-chrome-griffe-164',
    name: 'Serrure Clé à Canon Lux Chrome 9069-A906 Griffe — GRIFFE-164',
    category: 'quincaillerie-btp',
    price: 12500,
    compareAtPrice: 15000,
    stock: 15,
    badge: 'Griffe',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Serrure à encastrer Griffe 164 « clé à canon lux chrome » 9069-A906, poignée chrome et jeu de clés.',
    description:
      'La Griffe 164 offre un look chrome brillant : rosace longue, poignée pleine et canon laiton livré avec ses clés. Une serrure très demandée pour les portes d’entrée modernes et les portes vitrées.',
    specs: [
      'Marque Griffe · Réf. GRIFFE-164 · Finition chrome',
      'Rosace longue + poignée pleine chrome',
      'Canon laiton livré avec clés',
      'Portes d’entrée modernes & portes vitrées',
    ],
    imageUrl: '/images/products/btp-griffe-164-cle-canon-lux-chrome.jpg',
  },
  {
    id: 'btp-midea-spot-led-apparent-9w-mdl-spcl09w65-01',
    slug: 'spot-led-apparent-9w-decoration-blanc-6500k-midea-mdl-spcl09w65-01',
    name: 'Spot LED Apparent 9 W Décoration Blanc 6500 K Midea — MDL-SPCL09W65-01',
    category: 'quincaillerie-btp',
    price: 6500,
    compareAtPrice: 8000,
    stock: 15,
    badge: 'Midea Lighting',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Spot LED apparent Midea 9 W (6500 K), corps blanc et diffuseur large : éclairage décoratif de plafond sans perçage de dalle.',
    description:
      'Le spot Midea MDL-SPCL09W65-01 se fixe en apparent : idéal pour une dalle déjà coulée, un faux plafond fini ou une rénovation sans travaux. Lumière blanche froide 6500 K, 9 W, culot direct 220-240 V.',
    specs: [
      'Marque Midea Lighting · Réf. MDL-SPCL09W65-01',
      'Puissance 9 W · 6500 K (blanc froid)',
      'Montage apparent — sans perçage de dalle',
      '220-240 V · 50/60 Hz',
    ],
    imageUrl: '/images/products/btp-midea-spot-led-apparent-9w-mdl-spcl09w65-01.jpg',
  },
  {
    id: 'btp-emtop-groupe-electrogene-diesel-7kva-edgrs711-1',
    slug: 'groupe-electrogene-silencieux-diesel-7kva-ats-emtop-edgrs711-1',
    name: 'Groupe Électrogène Silencieux Diesel 7 kVA 30 A Monophasé ATS EMTOP — EDGRS711-1',
    category: 'quincaillerie-btp',
    price: 1290000,
    compareAtPrice: 1490000,
    stock: 15,
    badge: 'Diesel 7 kVA',
    featured: false,
    isHeavy: true,
    shortDescription:
      'Groupe électrogène diesel silencieux EMTOP 7 kVA monophasé, démarreur à clé et fonction ATS : 30 A en continu pour maison, boutique ou chantier.',
    description:
      'Le EDGRS711-1 encaisse les coupures de courant : moteur diesel insonorisé, alternateur 100 % cuivre et coffret de commande avec démarreur à clé. La fonction ATS bascule automatiquement le réseau sur le groupe dès que le courant tombe — indispensable pour une boutique, une pharmacie ou une résidence de Daloa.',
    specs: [
      'Marque EMTOP · Réf. EDGRS711-1',
      '7 kVA / 7 kW · monophasé · 30 A',
      'Diesel · insonorisé (Low Noise)',
      'Alternateur 100 % fil de cuivre',
      'Fonction ATS + démarreur à clé',
    ],
    imageUrl: '/images/products/btp-emtop-groupe-electrogene-diesel-7kva-edgrs711-1.jpg',
  },
  {
    id: 'btp-emtop-pompe-immergee-1100w-ewppd11001',
    slug: 'pompe-a-plonger-1100w-4-pouces-100lmin-emtop-ewppd11001',
    name: 'Pompe à Plonger Immergée 1100 W (1,5 HP) 4" 100 L/min 112 m EMTOP — EWPPD11001',
    category: 'quincaillerie-btp',
    price: 140000,
    compareAtPrice: 165000,
    stock: 15,
    badge: 'EMTOP',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Pompe immergée 4" EMTOP 1100 W (1,5 HP) : 100 L/min, refoulement 112 m, corps et moteur inox pour puits et forages.',
    description:
      'Conçue pour les forages de quartier et les puits profonds, la EWPPD11001 remonte l’eau à 112 m avec un débit de 100 L/min. Corps de pompe inox, moteur 100 % fil de cuivre, sortie 1-1/4" — la référence pour alimenter une maison ou un jardin en saison sèche.',
    specs: [
      'Marque EMTOP · Réf. EWPPD11001',
      '1100 W (1,5 HP) · 220-240 V',
      'Diamètre 4" · sortie 1-1/4"',
      'Débit 100 L/min · refoulement 112 m',
      'Corps inox · moteur 100 % cuivre',
    ],
    imageUrl: '/images/products/btp-emtop-pompe-immergee-1100w-ewppd11001.jpg',
  },
  {
    id: 'btp-midea-interrupteur-dvv-etanche-encastre-euprk22',
    slug: 'interrupteur-double-va-et-viens-etanche-gris-midea-euprk22',
    name: 'Interrupteur DVV Étancher Encastré Gris Midea — EUPRK22',
    category: 'quincaillerie-btp',
    price: 4500,
    compareAtPrice: 5500,
    stock: 15,
    badge: 'Midea',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Interrupteur double va-et-vient étanche à encastrer Midea EUPRK22, gris : pour salle de bain, terrasse et cuisine.',
    description:
      'Le EUPRK22 encastre sans saillie tout en restant protégé contre l’humidité et les éclaboussures. Double va-et-vient : commande de lampe depuis deux points, en salle de bain, sous un auvent ou en cuisine.',
    specs: [
      'Marque Midea · Réf. EUPRK22',
      'Double va-et-vient · étanche',
      'Encastré · coloris gris',
      '250 V · 10/16 A',
    ],
    imageUrl: '/images/products/btp-midea-interrupteur-dvv-etanche-encastre-euprk22.jpg',
  },
  {
    id: 'btp-midea-spot-led-encastre-8w-4000k-mdl-dl35r08w-03',
    slug: 'spot-led-encastre-8w-35px-4000k-midea-mdl-dl35r08w-03',
    name: 'Spot LED Encastré 8 W 3,5" 4000 K Blanc Neutre Midea — MDL-DL35R08W-03',
    category: 'quincaillerie-btp',
    price: 4500,
    compareAtPrice: 5500,
    stock: 15,
    badge: 'Midea Lighting',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Spot LED encastrable Midea 8 W, 3,5", 4000 K (blanc neutre) : lumière franche pour salon, boutique et bureau.',
    description:
      'Le MDL-DL35R08W-03 se pose en faux plafond grâce à ses ressorts latéraux. 8 W à 4000 K : un blanc neutre qui ne jaunit pas les couleurs, parfait pour une boutique, un salon ou un comptoir. Le 4000 K se distingue du 3000 K (jaune) et du 6500 K (très blanc).',
    specs: [
      'Marque Midea Lighting · Réf. MDL-DL35R08W-03',
      '8 W · 4000 K (blanc neutre)',
      'Découpe 3,5 pouces · ressorts latéraux',
      '220-240 V · 50/60 Hz',
    ],
    imageUrl: '/images/products/btp-midea-spot-led-encastre-8w-4000k-mdl-dl35r08w-03.jpg',
  },
  {
    id: 'btp-midea-globe-led-24w-6500k-mdl-clr24w-03',
    slug: 'globe-led-24w-6500k-midea-mdl-clr24w-03',
    name: 'Globe LED 24 W 6500 K Blanc Midea — MDL-CLR24W-03',
    category: 'quincaillerie-btp',
    price: 12000,
    compareAtPrice: 14500,
    stock: 15,
    badge: '24 W',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Globe LED de plafond Midea 24 W (6500 K), 1 920 lm : éclairage uniforme de salon, chambre ou couloir sans point chaud.',
    description:
      'Le globe Midea MDL-CLR24W-03 diffuse une lumière blanche froide homogène sur 120°. 24 W pour environ 1 920 lm : de quoi éclairer un séjour entier avec un seul point. Cuvette lisse, montage direct au plafond.',
    specs: [
      'Marque Midea · Réf. MDL-CLR24W-03',
      '24 W · 6500 K · 1 920 lm',
      'Angle 120° · CRI > 80',
      '220-240 V · 50/60 Hz',
    ],
    imageUrl: '/images/products/btp-midea-globe-led-24w-6500k-mdl-clr24w-03.jpg',
  },
  {
    id: 'btp-midea-projecteur-led-100w-mdl-flf100w-036',
    slug: 'projecteur-led-100w-9000lm-ip66-6500k-midea-mdl-flf100w-036500k',
    name: 'Projecteur LED 100 W 9000 lm IP66 6500 K Midea — MDL-FLF100W-036500K',
    category: 'quincaillerie-btp',
    price: 24000,
    compareAtPrice: 29000,
    stock: 15,
    badge: '100 W · IP66',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Projecteur LED Midea 100 W, 9 000 lm, IP66 6500 K : éclairage extérieur étanche pour cour, chantier et devanture.',
    description:
      'Structure aluminium et étanchéité IP66 : le MDL-FLF100W-036500K tient dehors toute l’année. 9 000 lm en 6500 K, support orientable 180° pour viser un mur, un parking ou une zone de déchargement.',
    specs: [
      'Marque Midea Lighting · Réf. MDL-FLF100W-036500K',
      '100 W · 9 000 lm · 6500 K',
      'IP66 · étanche extérieur',
      'Support orientable · 220-240 V',
    ],
    imageUrl: '/images/products/btp-midea-projecteur-led-100w-mdl-flf100w-036.jpg',
  },
  {
    id: 'btp-emtop-bottes-securite-44-erbtls1p44',
    slug: 'bottes-de-securite-44-coque-acier-emtop-erbtls1p44',
    name: 'Bottes de Sécurité Haute 44 Coque Acier Antiperforation EMTOP — ERBTLS1P44',
    category: 'quincaillerie-btp',
    price: 22000,
    compareAtPrice: 27000,
    stock: 15,
    badge: 'Pointure 44',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Bottes de sécurité EMTOP pointure 44 : coque acier, semelle antiperforation acier et semelle antidérapante — 400 mm de haut.',
    description:
      'Botte haute de 400 mm en PVC bleu : coque de sécurité acier, semelle intermédiaire acier et dessous antidérapant. Pour chantier, entrepôt, agriculture et travaux humides. Pointure 44.',
    specs: [
      'Marque EMTOP · Réf. ERBTLS1P44',
      'Pointure 44 · hauteur 400 mm',
      'Coque acier + semelle antiperforation acier',
      'Semelle antidérapante · PVC bleu',
    ],
    imageUrl: '/images/products/btp-emtop-bottes-securite-44-erbtls1p44.jpg',
  },
  {
    id: 'btp-midea-ampoule-led-15w-b22-mdl-bua6015w-6500-b22',
    slug: 'ampoule-led-15w-b22-6500k-midea-mdl-bua6015w-6500-b22',
    name: 'Ampoule LED 15 W B22 6500 K 1500 lm Midea — MDL-BUA6015W-6500-B22',
    category: 'quincaillerie-btp',
    price: 2500,
    compareAtPrice: 3200,
    stock: 15,
    badge: '15 W',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Ampoule LED Midea 15 W culot B22 (baïonnette), 1 500 lm, 6500 K : équivalent 100 W, durée 15 000 h.',
    description:
      'Le MDL-BUA6015W-6500-B22 remplace une ampoule à incandescence de 100 W avec 15 W seulement. Culot B22 à baïonnette, 1 500 lm en blanc froid 6500 K, allumage instantané et 15 000 heures de durée de vie.',
    specs: [
      'Marque Midea Lighting · Réf. MDL-BUA6015W-6500-B22',
      '15 W · 1 500 lm · 6500 K',
      'Culot B22 (baïonnette)',
      'Équivalent 100 W · 15 000 h',
    ],
    imageUrl: '/images/products/btp-midea-ampoule-led-15w-b22-mdl-bua6015w-6500-b22.jpg',
  },
  {
    id: 'btp-emtop-surpresseur-1500w-ewppj15001',
    slug: 'surpresseur-eau-auto-amorcante-1500w-2hp-100lmin-emtop-ewppj15001',
    name: 'Surpresseur d’Eau Auto-Amorçant 1500 W (2 HP) 100 L/min 100 m EMTOP — EWPPJ15001',
    category: 'quincaillerie-btp',
    price: 132000,
    compareAtPrice: 155000,
    stock: 15,
    badge: '2 HP',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Surpresseur d’eau auto-amorçant EMTOP 1500 W (2 HP), 100 L/min, refoulement 100 m : met sous pression maison, citernes et arrosage.',
    description:
      'Le EWPPJ15001 aspire jusqu’à 9 m et refoule à 100 m : il alimente une maison entière ou un réseau d’arrosage depuis une citerne. Corps fonte électrophorèse, moteur 100 % fil de cuivre, raccords 1" x 1".',
    specs: [
      'Marque EMTOP · Réf. EWPPJ15001',
      '1500 W (2 HP) · 220-240 V',
      'Débit 100 L/min · refoulement 100 m',
      'Raccords 1" x 1" · moteur 100 % cuivre',
    ],
    imageUrl: '/images/products/btp-emtop-surpresseur-1500w-ewppj15001.jpg',
  },
  {
    id: 'btp-emtop-pinces-isolees-3-pcs-epls0331',
    slug: 'jeu-3-pinces-isolees-1000v-emtop-epls0331',
    name: 'Jeu de 3 Pinces Isolées 1000 V 6"/8" EMTOP — EPLS0331',
    category: 'quincaillerie-btp',
    price: 16500,
    compareAtPrice: 19500,
    stock: 15,
    badge: '1000 V',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Set EMTOP de 3 pinces isolées 1000 V : universelle 8", bec long 6" et coupante diagonale 6" — acier CR-V.',
    description:
      'Conforme aux travaux sous tension jusqu’à 1 000 V : pince universelle 200 mm, bec long 160 mm et coupante diagonale 160 mm. Acier CR-V trempé, poignées bi-matière antidérapantes, rangées sur carte à suspendre.',
    specs: [
      'Marque EMTOP · Réf. EPLS0331',
      'Pince universelle 8" · bec long 6" · coupante 6"',
      'Isolation 1 000 V · acier CR-V',
      'Poignées bi-matière · 3 pièces',
    ],
    imageUrl: '/images/products/btp-emtop-pinces-isolees-3-pcs-epls0331.jpg',
  },
  {
    id: 'btp-midea-ampoule-led-5w-b22-mdl-bua4505w-226500',
    slug: 'ampoule-led-5w-b22-6500k-midea-mdl-bua4505w-226500',
    name: 'Ampoule LED 5 W B22 6500 K 480 lm Midea — MDL-BUA4505W-226500',
    category: 'quincaillerie-btp',
    price: 1700,
    compareAtPrice: 2200,
    stock: 15,
    badge: 'Culot B22',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Ampoule LED Midea 5 W culot B22, 480 lm, 6500 K : idéale couloir, WC, cage d’escalier et veilleuse.',
    description:
      'Petite consommation, grand rendement : 5 W pour 480 lm, soit l’équivalent d’une 40 W. Culot B22 à baïonnette, blanc froid 6500 K, allumage immédiat. Parfaite pour les couloirs, sanitaires et l’éclairage de nuit.',
    specs: [
      'Marque Midea Lighting · Réf. MDL-BUA4505W-226500',
      '5 W · 480 lm · 6500 K',
      'Culot B22 (baïonnette) — la 5 W à visser du catalogue est la MDL-BUA4505W-6500 en E27',
      'Équivalent 40 W · 15 000 h',
    ],
    imageUrl: '/images/products/btp-midea-ampoule-led-5w-b22-mdl-bua4505w-226500.jpg',
  },
  {
    id: 'btp-midea-globe-led-24w-3-couleurs-mdl-clr24w-04',
    slug: 'globe-led-24w-3-couleurs-cadre-blanc-midea-mdl-clr24w-04',
    name: 'Globe LED 24 W 3 Couleurs Cadre Blanc Midea — MDL-CLR24W-04',
    category: 'quincaillerie-btp',
    price: 15500,
    compareAtPrice: 18500,
    stock: 15,
    badge: '3 couleurs',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Globe LED Midea 24 W à 3 températures (3000 / 4000 / 6500 K), cadre blanc : une seule lampe pour toutes les ambiances.',
    description:
      'Le MDL-CLR24W-04 se règle en 3 couleurs depuis l’interrupteur : blanc chaud 3000 K pour le salon, neutre 4000 K pour la cuisine, blanc froid 6500 K pour le travail. Cadre blanc, 1 920 lm, montage direct au plafond.',
    specs: [
      'Marque Midea · Réf. MDL-CLR24W-04',
      '24 W · 3 couleurs 3000/4000/6500 K',
      'Cadre blanc · 1 920 lm',
      '220-240 V · 50/60 Hz',
    ],
    imageUrl: '/images/products/btp-midea-globe-led-24w-3-couleurs-mdl-clr24w-04.jpg',
  },
  {
    id: 'btp-emtop-compacteur-plaque-reversible-160kg-epct091612',
    slug: 'compacteur-a-plaque-reversible-160kg-essence-emtop-epct091612',
    name: 'Compacteur à Plaque Réversible 160 kg Essence 6,0 kW (9 HP) EMTOP — EPCT091612',
    category: 'quincaillerie-btp',
    price: 1550000,
    compareAtPrice: 1850000,
    stock: 15,
    badge: '160 kg',
    featured: false,
    isHeavy: true,
    shortDescription:
      'Plaque vibrante réversible EMTOP 160 kg, moteur essence 6,0 kW (9 HP), marche avant/arrière : compactage de sols et pavés.',
    description:
      'Le EPCT091612 démarre au lanceur et se pilote au guidon : marche avant et arrière pour plaquer les pavés autobloquants, remblais et tranchées. 160 kg et moteur 9 HP pour un compactage dense, même sur les chantiers étroits.',
    specs: [
      'Marque EMTOP · Réf. EPCT091612',
      'Plaque réversible avant/arrière · 160 kg',
      'Moteur essence 6,0 kW (9 HP)',
      'Compactage sols, pavés et tranchées',
    ],
    imageUrl: '/images/products/btp-emtop-compacteur-plaque-reversible-160kg-epct091612.jpg',
  },
  {
    id: 'btp-emtop-chaussure-securite-kaki-44-esbs32sb44',
    slug: 'chaussure-de-securite-kaki-44-emtop-esbs32sb44',
    name: 'Chaussure de Sécurité Kaki 44 EMTOP — ESBS32SB44',
    category: 'quincaillerie-btp',
    price: 19500,
    compareAtPrice: 24000,
    stock: 15,
    badge: 'Pointure 44',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Chaussure de sécurité EMTOP pointure 44, cuir nubuck kaki et empiècements bleu/rouge : embout acier, semelle antidérapante.',
    description:
      'Chaussure montante en nubuck kaki avec renforts bleus et lacets rouges : embout de sécurité, semelle crantée antidérapante et doublure respirante. Pour chantier, atelier et manutention. Pointure 44.',
    specs: [
      'Marque EMTOP · Réf. ESBS32SB44',
      'Pointure 44 · cuir nubuck kaki',
      'Embout de sécurité · semelle antidérapante',
      'Doublure respirante',
    ],
    imageUrl: '/images/products/btp-emtop-chaussure-securite-kaki-44-esbs32sb44.jpg',
  },
  {
    id: 'btp-midea-spot-led-encastre-8w-3000k-mdl-dl35r08w-03-3000',
    slug: 'spot-led-encastre-8w-35px-3000k-midea-mdl-dl35r08w-03-3000',
    name: 'Spot LED Encastré 8 W 3,5" 3000 K Blanc Chaud Midea — MDL-DL35R08W-03-3000',
    category: 'quincaillerie-btp',
    price: 4500,
    compareAtPrice: 5500,
    stock: 15,
    badge: '3000 K',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Spot LED encastrable Midea 8 W, 3,5", 3000 K (blanc chaud) : la version jaune chaude du spot encastré, pour chambres et salons.',
    description:
      'Même corps que le spot 4000 K, mais en 3000 K : une lumière chaude et reposante pour les chambres, le salon et les coins lecture. 8 W, pose en faux plafond par ressorts, 3,5 pouces de découpe.',
    specs: [
      'Marque Midea Lighting · Réf. MDL-DL35R08W-03-3000',
      '8 W · 3000 K (blanc chaud)',
      'Découpe 3,5 pouces · ressorts latéraux',
      '220-240 V · 50/60 Hz',
    ],
    imageUrl: '/images/products/btp-midea-spot-led-encastre-8w-3000k-mdl-dl35r08w-03-3000.jpg',
  },
  {
    id: 'btp-midea-projecteur-led-50w-mdl-flf50w-036',
    slug: 'projecteur-led-50w-4500lm-ip66-6500k-midea-mdl-flf50w-036500k',
    name: 'Projecteur LED 50 W 4500 lm IP66 6500 K Midea — MDL-FLF50W-036500K',
    category: 'quincaillerie-btp',
    price: 16500,
    compareAtPrice: 20000,
    stock: 15,
    badge: '50 W · IP66',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Projecteur LED Midea 50 W, 4 500 lm, IP66 : le petit frère du 100 W, pour portail, terrasse et couloir extérieur.',
    description:
      '4 500 lm en 50 W avec étanchéité IP66 et support orientable : éclaire un portail, une terrasse ou un couloir extérieur sans consommer comme un projecteur halogène. Corps aluminium noir, 6500 K.',
    specs: [
      'Marque Midea Lighting · Réf. MDL-FLF50W-036500K',
      '50 W · 4 500 lm · 6500 K',
      'IP66 · étanche extérieur',
      'Support orientable · 220-240 V',
    ],
    imageUrl: '/images/products/btp-midea-projecteur-led-50w-mdl-flf50w-036.jpg',
  },
  {
    id: 'btp-emtop-bottes-securite-45-erbtls1p45',
    slug: 'bottes-de-securite-45-coque-acier-emtop-erbtls1p45',
    name: 'Bottes de Sécurité Haute 45 Coque Acier Antiperforation EMTOP — ERBTLS1P45',
    category: 'quincaillerie-btp',
    price: 22000,
    compareAtPrice: 27000,
    stock: 15,
    badge: 'Pointure 45',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Bottes de sécurité EMTOP pointure 45 : coque acier, semelle antiperforation acier et dessous antidérapant — 400 mm de haut.',
    description:
      'La version pointure 45 de la botte ERBTLS1 : 400 mm de hauteur, coque acier, semelle intermédiaire acier antiperforation et dessous antidérapant. Pour chantier, entrepôt et travaux humides.',
    specs: [
      'Marque EMTOP · Réf. ERBTLS1P45',
      'Pointure 45 · hauteur 400 mm',
      'Coque acier + semelle antiperforation acier',
      'Semelle antidérapante · PVC bleu',
    ],
    imageUrl: '/images/products/btp-emtop-bottes-securite-45-erbtls1p45.jpg',
  },
  {
    id: 'btp-midea-ampoule-led-9w-b22-mdl-bua609w-226500',
    slug: 'ampoule-led-9w-b22-6500k-midea-mdl-bua609w-226500',
    name: 'Ampoule LED 9 W B22 6500 K 810 lm Midea — MDL-BUA609W-226500',
    category: 'quincaillerie-btp',
    price: 2000,
    compareAtPrice: 2600,
    stock: 15,
    badge: '9 W',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Ampoule LED Midea 9 W culot B22, 810 lm, 6500 K : équivalent 60 W, le format le plus vendu pour la maison.',
    description:
      'Le MDL-BUA609W-226500 remplace une 60 W à incandescence avec 9 W. Culot B22 à baïonnette, 810 lm en blanc froid 6500 K, allumage instantané et 15 000 h de durée de vie.',
    specs: [
      'Marque Midea Lighting · Réf. MDL-BUA609W-226500',
      '9 W · 810 lm · 6500 K',
      'Culot B22 (baïonnette)',
      'Équivalent 60 W · 15 000 h',
    ],
    imageUrl: '/images/products/btp-midea-ampoule-led-9w-b22-mdl-bua609w-226500.jpg',
  },
  {
    id: 'btp-legrand-bouton-poussoir-gris-plexo-069820l',
    slug: 'bouton-poussoir-gris-etanche-plexo-encastre-legrand-069820l',
    name: 'Bouton Poussoir Gris Étanche Plexo Encastré Legrand — 069820L',
    category: 'quincaillerie-btp',
    price: 14500,
    compareAtPrice: 17500,
    stock: 15,
    badge: 'Poussoir IP55',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Bouton poussoir Plexo 069820L, gris, IP55 IK08 : commande d’éclairage en encastré pour entrées, terrasses et locaux humides.',
    description:
      'Le 069820L est un poussoir NO complet livré prêt à poser sur boîte d’encastrement : 10 A / 250 V, borne automatique sans outil, IP55 et IK08. Idéal pour commander une minuterie ou un éclairage extérieur depuis un mur exposé à la pluie.',
    specs: [
      'Marque Legrand · Réf. 069820L · Gamme Plexo',
      'Poussoir NO · 10 A · 250 V~',
      'IP55 · IK08 · encastré, bornes automatiques',
      'DISTINCTION : version bouton poussoir (celui-ci) — la référence 069831L est une PRISE 2P+T étanche du même design : ne pas confondre les deux visuels gris carrés.',
    ],
    imageUrl: '/images/products/btp-legrand-bouton-poussoir-gris-plexo-069820l.jpg',
  },
  {
    id: 'btp-legrand-prise-2pt-blanc-urbano-ub3111wh',
    slug: 'prise-2pt-blanc-urbano-eclips-legrand-ub3111wh',
    name: 'Prise 2P+T Blanche Urbano Éclips Legrand — UB3111WH',
    category: 'quincaillerie-btp',
    price: 6500,
    compareAtPrice: 7900,
    stock: 15,
    badge: 'Urbano 16 A',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Prise 2P+T Urbano UB3111WH blanche, éclips de protection et bornes à vis : la prise encastrée standard du logement.',
    description:
      'La UB3111WH fait partie de la gamme Urbano, la plus installée en Côte d’Ivoire : 16 A / 250 V, éclips de protection enfants, bornes à vis et finition blanche. Livrée complète avec plaque et support, encastrement standard.',
    specs: [
      'Marque Legrand · Réf. UB3111WH · Gamme Urbano',
      'Prise 2P+T 16 A · 250 V~ · éclips de protection',
      'Bornes à vis · blanc · livrée complète',
      'Compatible boîtiers d’encastrement 1 poste standard',
    ],
    imageUrl: '/images/products/btp-legrand-prise-2pt-blanc-urbano-ub3111wh.jpg',
  },
  {
    id: 'btp-legrand-coffret-36-modules-encastre-137017',
    slug: 'coffret-electrique-36-modules-encastre-legrand-137017',
    name: 'Coffret Électrique 36 Modules Encastré Legrand — 137017',
    category: 'quincaillerie-btp',
    price: 24900,
    compareAtPrice: 29500,
    stock: 15,
    badge: '36 modules',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Coffret Legrand 137017 à encastrer, 36 modules sur 3 rangées : le tableau de répartition pour logement ou local commercial.',
    description:
      'Le 137017 est un coffret modulaire encastré de 36 modules (3 rangées de 12), livré avec porte et bornier de terre. Il reçoit disjoncteurs DPN, interrupteurs différentiels et parafoudres au format DIN 18 mm. Montage en cloison maçonnée ou en cloison sèche.',
    specs: [
      'Marque Legrand · Réf. 137017',
      '36 modules · 3 rangées de 12 · format DIN',
      'Encastré · porte · bornier de terre',
      'Reçoit DPN, ID et parafoudres modulaires',
    ],
    imageUrl: '/images/products/btp-legrand-coffret-36-modules-encastre-137017.jpg',
  },
  {
    id: 'btp-legrand-interrupteur-horaire-analogique-412790',
    slug: 'interrupteur-horaire-analogique-journalier-legrand-412790',
    name: 'Interrupteur Horaire Analogique Journalier Legrand — 412790',
    category: 'quincaillerie-btp',
    price: 82000,
    compareAtPrice: 95000,
    stock: 15,
    badge: 'Programmable',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Interrupteur horaire 412790, 1 module, cadran journalier 24 h avec réserve de marche 100 h : allumage automatique des enseignes et chauffe-eau.',
    description:
      'Le 412790 programme la mise en marche et l’arrêt d’un circuit sur 24 h, par segments de 15 minutes. Sortie 16 A / 250 V, réserve de marche 100 h en cas de coupure, sélecteur ON / AUTO / OFF en façade. Se clipse sur rail DIN.',
    specs: [
      'Marque Legrand · Réf. 412790 · RDM',
      'Programmation journalière 24 h · pas de 15 min',
      '1 sortie 16 A · 250 V~ · réserve de marche 100 h',
      '1 module DIN 17,5 mm · 230 V~ 50/60 Hz',
    ],
    imageUrl: '/images/products/btp-legrand-interrupteur-horaire-analogique-412790.jpg',
  },
  {
    id: 'btp-midea-spot-led-encastre-12w-3000k-mdl-dl40r12w-033k',
    slug: 'spot-led-encastre-12w-4-pouces-3000k-midea-mdl-dl40r12w-033k',
    name: 'Spot LED Encastré 12 W 4" 3000 K Cadre Blanc Midea — MDL-DL40R12W-033K',
    category: 'quincaillerie-btp',
    price: 6500,
    compareAtPrice: 7900,
    stock: 15,
    badge: '12 W · 3000 K',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Spot LED Midea 12 W encastré 4 pouces, blanc chaud 3000 K, cadre blanc : idéal salon, chambre et faux plafond.',
    description:
      'Le MDL-DL40R12W-033K éclaire en blanc chaud 3000 K avec un cadre blanc discret de 4 pouces. Driver intégré, 220-240 V, montage en faux plafond par ressorts. Ambiance chaude pour les pièces à vivre et les couloirs.',
    specs: [
      'Marque Midea Lighting · Réf. MDL-DL40R12W-033K',
      '12 W · 3000 K blanc chaud · cadre blanc',
      'Découpe 4 pouces · ressorts de fixation',
      '220-240 V · 50/60 Hz · driver intégré',
    ],
    imageUrl: '/images/products/btp-midea-spot-led-encastre-12w-3000k-mdl-dl40r12w-033k.jpg',
  },
  {
    id: 'btp-midea-ruban-led-rgb-50m-mdl-std8w-05',
    slug: 'ruban-led-rgb-50m-2-ampoules-midea-mdl-std8w-05',
    name: 'Ruban LED RGB 50 m 2 Ampoules Midea — MDL-STD8W-05',
    category: 'quincaillerie-btp',
    price: 50000,
    compareAtPrice: 59800,
    stock: 15,
    badge: 'RGB 50 m',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Ruban LED RGB Midea 50 m, 8 W / 2 ampoules par mètre : décoration multicolore pour façades, terrasses et plafonds.',
    description:
      'Le MDL-STD8W-05 se déroule sur 50 mètres de ruban RGB souple, à découper tous les mètres. Il épouse les corniches, les barres de terrasse et les plafonds pour créer des ambiances colorées. Alimentation 220 V et télécommande de couleurs.',
    specs: [
      'Marque Midea Lighting · Réf. MDL-STD8W-05',
      '50 m · RGB multicolore · 8 W / 2 ampoules par mètre',
      'Ruban souple découpable · 220-240 V',
      'Télécommande de couleurs fournie',
    ],
    imageUrl: '/images/products/btp-midea-ruban-led-rgb-50m-mdl-std8w-05.jpg',
  },
  {
    id: 'btp-legrand-interrupteur-dvv-blanc-urbano-ub2220wh',
    slug: 'interrupteur-double-va-et-vient-blanc-urbano-legrand-ub2220wh',
    name: 'Interrupteur Double Va-et-Vient Blanc Urbano Legrand — UB2220WH',
    category: 'quincaillerie-btp',
    price: 7500,
    compareAtPrice: 8900,
    stock: 15,
    badge: 'DOUBLE va-et-vient',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Interrupteur double va-et-vient Urbano UB2220WH, blanc, 10 AX : deux circuits allumés depuis un même poste.',
    description:
      'La UB2220WH regroupe deux va-et-vient sur un seul appareil : elle commande deux points lumineux depuis un même endroit, ou complète un montage en va-et-vient avec un second poste. 10 AX / 250 V, finition blanc Urbano, livrée complète.',
    specs: [
      'Marque Legrand · Réf. UB2220WH · Gamme Urbano',
      'DOUBLE va-et-vient · 10 AX · 250 V~',
      'Blanc · livré complet avec plaque et support',
      'DISTINCTION : référence DOUBLE (deux circuits) — le UB2210WH est le modèle SIMPLE va-et-vient, visuellement identique.',
    ],
    imageUrl: '/images/products/btp-legrand-interrupteur-dvv-blanc-urbano-ub2220wh.jpg',
  },
  {
    id: 'btp-legrand-griffe-standard-plexo-84900',
    slug: 'griffe-standard-plexo-legrand-84900',
    name: 'Griffe Standard Plexo Legrand — 84900',
    category: 'quincaillerie-btp',
    price: 6500,
    compareAtPrice: 7500,
    stock: 15,
    badge: 'Accessoire Plexo',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Griffe standard 84900 pour appareillage Plexo : fixation à vis du mécanisme dans la boîte d’encastrement.',
    description:
      'La griffe 84900 maintient un mécanisme Plexo dans sa boîte d’encastrement par vissage. Vendue à l’unité avec ses vis, elle sert au remplacement d’une griffe cassée ou à l’adaptation d’un mécanisme Plexo sur boîtier existant.',
    specs: [
      'Marque Legrand · Réf. 84900 · Griffix Plexo',
      'Griffe standard + vis de fixation',
      'Pour boîtes d’encastrement Plexo',
      'Vendue à l’unité',
    ],
    imageUrl: '/images/products/btp-legrand-griffe-standard-plexo-84900.jpg',
  },
  {
    id: 'btp-legrand-interrupteur-svv-blanc-urbano-ub2210wh',
    slug: 'interrupteur-va-et-vient-blanc-urbano-legrand-ub2210wh',
    name: 'Interrupteur Va-et-Vient Blanc Urbano Legrand — UB2210WH',
    category: 'quincaillerie-btp',
    price: 5500,
    compareAtPrice: 6500,
    stock: 15,
    badge: 'SIMPLE va-et-vient',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Interrupteur va-et-vient Urbano UB2210WH, blanc, 10 AX : allumer depuis deux postes le même point lumineux.',
    description:
      'La UB2210WH est le va-et-vient simple de la gamme Urbano : un circuit, deux postes de commande. 10 AX / 250 V, mécanisme à bascule, finition blanc mat, livré complet avec plaque et support.',
    specs: [
      'Marque Legrand · Réf. UB2210WH · Gamme Urbano',
      'SIMPLE va-et-vient · 10 AX · 250 V~',
      'Blanc · livré complet avec plaque et support',
      'DISTINCTION : référence SIMPLE (un circuit) — le UB2220WH est un DOUBLE va-et-vient de même façade.',
    ],
    imageUrl: '/images/products/btp-legrand-interrupteur-svv-blanc-urbano-ub2210wh.jpg',
  },
  {
    id: 'btp-midea-reglette-led-120m-45w-mdl-bll1245w',
    slug: 'reglette-led-120m-45w-midea-mdl-bll1245w',
    name: 'Réglette LED 1,20 m 45 W Midea — MDL-BLL1245W',
    category: 'quincaillerie-btp',
    price: 8500,
    compareAtPrice: 9900,
    stock: 15,
    badge: '45 W · 1,20 m',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Réglette LED Midea 1,20 m 45 W, 6500 K : éclairage linéaire puissant pour atelier, magasin et parking.',
    description:
      'Le MDL-BLL1245W remplace les réglettes fluo en 1,20 m : 45 W, blanc froid 6500 K, allumage instantané sans starter. Longue portée lumineuse pour les ateliers, entrepôts et vitrines. Fixation murale ou en suspensions.',
    specs: [
      'Marque Midea Lighting · Réf. MDL-BLL1245W',
      '1,20 m · 45 W · 6500 K',
      'Allumage instantané · sans starter',
      '220-240 V · fixation murale ou suspendue',
    ],
    imageUrl: '/images/products/btp-midea-reglette-led-120m-45w-mdl-bll1245w.jpg',
  },
  {
    id: 'btp-legrand-prise-2pt-blanc-mosaic-278111l',
    slug: 'prise-2pt-blanc-2-modules-mosaic-legrand-278111l',
    name: 'Prise 2P+T Blanche 2 Modules Mosaic Legrand — 278111L',
    category: 'quincaillerie-btp',
    price: 6900,
    compareAtPrice: 8500,
    stock: 15,
    badge: 'Mosaic 2 modules',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Prise Mosaic 278111L 2 modules blanc, bornes automatiques : le format 45×45 des goulottes et bâtiments tertiaires.',
    description:
      'La 278111L est la prise 2P+T 16 A au format Mosaic 2 modules (45 mm) : elle se clipse dans les supports Mosaic, en goulotte ou en encastré. Éclips de protection, bornes automatiques à levier repiquables, blanc RAL 9003.',
    specs: [
      'Marque Legrand · Réf. 278111L · Gamme Mosaic',
      'Prise 2P+T 16 A · 250 V~ · 2 modules (45 mm)',
      'Bornes automatiques repiquables · éclips de protection',
      'Blanc RAL 9003 · pour support Mosaic',
    ],
    imageUrl: '/images/products/btp-legrand-prise-2pt-blanc-mosaic-278111l.jpg',
  },
  {
    id: 'btp-legrand-parafoudre-4p-t2-20ka-410323',
    slug: 'parafoudre-4p-type-2-20ka-legrand-410323',
    name: 'Parafoudre 4P Type 2 20 kA Legrand — 410323',
    category: 'quincaillerie-btp',
    price: 55000,
    compareAtPrice: 65000,
    stock: 15,
    badge: 'T2 · 4P',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Parafoudre Legrand 410323 type 2 tétrapolaire 20 kA, 4 postes 320 V : protège le tableau des surtensions de foudre.',
    description:
      'Le 410323 protège les installations triphasées des surtensions transitoires d’origine atmosphérique. Type 2, 4 pôles, 20 kA par pôle, 320 V : il se pose en tête de tableau, en amont du différentiel. Cartouche débrochable avec voyant d’état.',
    specs: [
      'Marque Legrand · Réf. 410323 · SPD TX',
      'Type 2 · 4 pôles (4 postes) · 20 kA · 320 V',
      '4 modules DIN · indicateur d’état',
      'Pose en tête de tableau, en amont du différentiel',
    ],
    imageUrl: '/images/products/btp-legrand-parafoudre-4p-t2-20ka-410323.jpg',
  },
  {
    id: 'btp-legrand-dpn-16a-rx3-419949',
    slug: 'dpn-16a-rx3-c16-legrand-419949',
    name: 'Disjoncteur DPN 16 A RX3 C16 Legrand — 419949',
    category: 'quincaillerie-btp',
    price: 4500,
    compareAtPrice: 5500,
    stock: 15,
    badge: 'C16 · 16 A',
    featured: false,
    isHeavy: false,
    shortDescription:
      'DPN RX3 419949 1P+N 16 A courbe C, 4 500 / 6 kA : la protection des circuits prises.',
    description:
      'Le 419949 est un disjoncteur divisionnaire 1P+N 16 A courbe C, calibré pour les circuits prises. Pouvoir de coupure 4 500 A (EN 60898) / 6 kA (IEC 60947), 1 module, 230 V. Auxiliarisable, neutre à gauche.',
    specs: [
      'Marque Legrand · Réf. 419949 · RX3',
      '1P+N · 16 A · courbe C (C16)',
      '4 500 A / 6 kA · 1 module DIN',
      'DISTINCTION : calibre 16 A (C16) — son jumeau 419947 est le 10 A (C10), marquage presque identique sur l’appareil : vérifier l’étiquette avant pose.',
    ],
    imageUrl: '/images/products/btp-legrand-dpn-16a-rx3-419949.jpg',
  },
  {
    id: 'btp-midea-ampoule-led-5w-e27-6500k-mdl-bua4505w',
    slug: 'ampoule-led-5w-e27-6500k-midea-mdl-bua4505w-6500',
    name: 'Ampoule LED 5 W E27 6500 K 480 lm Midea — MDL-BUA4505W-6500',
    category: 'quincaillerie-btp',
    price: 1700,
    compareAtPrice: 2200,
    stock: 15,
    badge: 'Culot E27',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Ampoule LED Midea 5 W culot E27 à visser, 480 lm, 6500 K : couloir, WC, cage d’escalier et veilleuse.',
    description:
      'Le MDL-BUA4505W-6500 se visse sur toutes les douilles E27 : 5 W pour 480 lm, soit l’équivalent d’une 40 W, en blanc froid 6500 K. Allumage immédiat, 15 000 h. Parfaite pour les couloirs, sanitaires et l’éclairage de nuit.',
    specs: [
      'Marque Midea Lighting · Réf. MDL-BUA4505W-6500',
      '5 W · 480 lm · 6500 K',
      'Culot E27 (à visser) — la 5 W B22 du catalogue est la MDL-BUA4505W-226500',
      'DISTINCTION : culot E27 (celui-ci) — l’ampoule 5 W MDL-BUA4505W-226500 déjà au catalogue est à culot B22 (baïonnette) : mêmes caractéristiques lumineuses, douilles non interchangeables.',
    ],
    imageUrl: '/images/products/btp-midea-ampoule-led-5w-e27-6500k-mdl-bua4505w.jpg',
  },
  {
    id: 'btp-legrand-detecteur-mouvement-encastre-48941',
    slug: 'detecteur-mouvement-360-encastre-legrand-48941',
    name: 'Détecteur de Mouvement 360° Encastré Legrand — 48941',
    category: 'quincaillerie-btp',
    price: 75900,
    compareAtPrice: 89000,
    stock: 15,
    badge: '360° · 8 m',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Détecteur ECO1 48941 infrarouge 360°, encastré au plafond, portée 8 m : éclairage automatique des couloirs et sanitaires.',
    description:
      'Le 048941 détecte à 360° sur 8 m de diamètre au sol. Réglage du seuil de luminosité et de la temporisation par potentiomètre, 3 fils avec neutre, IP41. Il allume seulement au passage, dans les circulations sans lumière naturelle.',
    specs: [
      'Marque Legrand · Réf. 048941 · ECO1 (Mosaic)',
      'Infrarouge 360° · portée 8 m · fixation plafond',
      'IP41 · 3 fils avec neutre · 230 V~',
      'Temporisation 10 s à 10 min · seuil 10 à 1 275 lux',
    ],
    imageUrl: '/images/products/btp-legrand-detecteur-mouvement-encastre-48941.jpg',
  },
  {
    id: 'btp-legrand-prise-tv-blanc-niloe-np4102wh',
    slug: 'prise-tv-blanc-niloe-legrand-np4102wh',
    name: 'Prise TV Blanche Niloé Legrand — NP4102WH',
    category: 'quincaillerie-btp',
    price: 7900,
    compareAtPrice: 9500,
    stock: 15,
    badge: 'Niloé · TV',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Prise TV Niloé NP4102WH blanche : raccordement antenne pour la gamme Niloé, finition blanche.',
    description:
      'La NP4102WH raccorde le téléviseur au réseau d’antenne sur la gamme Niloé. Mécanisme encastrable avec support, finition blanche. Elle s’associe aux prises et interrupteurs Niloé pour un poste homogène.',
    specs: [
      'Marque Legrand · Réf. NP4102WH · Gamme Niloé',
      'Prise TV · 1 sortie antenne',
      'Blanc · mécanisme encastrable avec support',
      'À compléter d’une plaque Niloé',
    ],
    imageUrl: '/images/products/btp-legrand-prise-tv-blanc-niloe-np4102wh.jpg',
  },
  {
    id: 'btp-legrand-collier-embase-31900',
    slug: 'collier-embase-gris-legrand-31900',
    name: 'Collier à Embase Gris Legrand — 31900',
    category: 'quincaillerie-btp',
    price: 600,
    compareAtPrice: 750,
    stock: 15,
    badge: 'L’unité',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Collier à embase 31900 gris, réglable ∅16 à 32 mm : fixation des tubes IRL et des câbles le long des murs.',
    description:
      'Le collier à embase 31900 se cheville au mur et enserre un tube IRL de 16 à 32 mm ou un câble de 13 à 38 mm. Denture extérieure, polyamide gris RAL 7035, réglage par crans. Vendu à l’unité (boîte de 100 disponible).',
    specs: [
      'Marque Legrand · Réf. 31900',
      'Collier à embase · ∅16 à 32 mm (tube IRL)',
      'Polyamide gris RAL 7035 · denture extérieure',
      'Vendu à l’unité · boîte de 100 en option',
    ],
    imageUrl: '/images/products/btp-legrand-collier-embase-31900.jpg',
  },
  {
    id: 'btp-legrand-dpn-10a-rx3-419947',
    slug: 'dpn-10a-rx3-c10-legrand-419947',
    name: 'Disjoncteur DPN 10 A RX3 C10 Legrand — 419947',
    category: 'quincaillerie-btp',
    price: 4500,
    compareAtPrice: 5500,
    stock: 15,
    badge: 'C10 · 10 A',
    featured: false,
    isHeavy: false,
    shortDescription:
      'DPN RX3 419947 1P+N 10 A courbe C, 4 500 / 6 kA : la protection des circuits éclairage.',
    description:
      'Le 419947 est un disjoncteur divisionnaire 1P+N 10 A courbe C, calibré pour les circuits d’éclairage. Pouvoir de coupure 4 500 A (EN 60898) / 6 kA (IEC 60947), 1 module, 230 V. Auxiliarisable, neutre à gauche.',
    specs: [
      'Marque Legrand · Réf. 419947 · RX3',
      '1P+N · 10 A · courbe C (C10)',
      '4 500 A / 6 kA · 1 module DIN',
      'DISTINCTION : calibre 10 A (C10) — son jumeau 419949 est le 16 A (C16), marquage presque identique sur l’appareil : vérifier l’étiquette avant pose.',
    ],
    imageUrl: '/images/products/btp-legrand-dpn-10a-rx3-419947.jpg',
  },
  {
    id: 'btp-legrand-interrupteur-differentiel-4p-25a-300ma-411664',
    slug: 'interrupteur-differentiel-4p-25a-300ma-dx3-legrand-411664',
    name: 'Interrupteur Différentiel 4P 25 A 300 mA DX³ Legrand — 411664',
    category: 'quincaillerie-btp',
    price: 115000,
    compareAtPrice: 135000,
    stock: 15,
    badge: 'DX³ · 4P 300 mA',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Interrupteur différentiel DX³ 411664 tétrapolaire 25 A 300 mA type AC : protection des personnes en triphasé.',
    description:
      'Le 411664 est un interrupteur différentiel DX³ à vis, 4 pôles 400 V, 25 A, sensibilité 300 mA type AC. Il coupe en cas de fuite de courant à composante alternative et protège les départs triphasés d’un tableau tertiaire ou industriel. 4 modules.',
    specs: [
      'Marque Legrand · Réf. 411664 · DX³-ID',
      '4P · 400 V~ · 25 A · 300 mA · type AC',
      '4 modules DIN · bornes à vis · auxiliarisable',
      'Pose en amont des disjoncteurs de départ',
    ],
    imageUrl: '/images/products/btp-legrand-interrupteur-differentiel-4p-25a-300ma-411664.jpg',
  },
  {
    id: 'btp-legrand-prise-2pt-gris-etanche-069831l',
    slug: 'prise-2pt-gris-etanche-plexo-encastree-legrand-069831l',
    name: 'Prise 2P+T Grise Étanche Plexo Encastrée Legrand — 069831L',
    category: 'quincaillerie-btp',
    price: 16900,
    compareAtPrice: 19900,
    stock: 15,
    badge: 'Prise IP55',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Prise Plexo 069831L 2P+T grise IP55 IK08, encastrée : alimenter un appareil en extérieur ou en local humide.',
    description:
      'La 069831L est une prise 2P+T complète 16 A / 250 V à capot étanche IP55, prévue pour l’encastrement sur boîte à vis. Éclips de protection, bornes automatiques sans outil. Atelier, terrasse, garage : elle résiste aux projections d’eau.',
    specs: [
      'Marque Legrand · Réf. 069831L · Gamme Plexo',
      'Prise 2P+T · 16 A · 250 V~ · IP55 IK08',
      'Encastrée · capot étanche · bornes automatiques',
      'DISTINCTION : version PRISE (celui-ci) — la référence 069820L est un BOUTON POUSSOIR étanche du même design : ne pas confondre les deux visuels gris carrés.',
    ],
    imageUrl: '/images/products/btp-legrand-prise-2pt-gris-etanche-069831l.jpg',
  },
  {
    id: 'btp-legrand-disjoncteur-tx3-2p-63a-403612',
    slug: 'disjoncteur-tx3-2p-63a-courbe-c-legrand-403612',
    name: 'Disjoncteur TX³ 2P 63 A Courbe C 6 kA Legrand — 403612',
    category: 'quincaillerie-btp',
    price: 24000,
    compareAtPrice: 28500,
    stock: 15,
    badge: 'TX³ · 2P 63 A',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Disjoncteur TX³ 403612 bipolaire 63 A courbe C 6 kA, 2 modules : la protection de tête d’un tableau 63 A monophasé ou d’un départ puissance.',
    description:
      'Le 403612 est un disjoncteur magnétothermique TX³ 2P 63 A courbe C, pouvoir de coupure 6 kA, 2 modules DIN. Bornes à vis arrivée haute / départ bas, porte-étiquette et témoin de position. Se clipse sur rail DIN 35 mm.',
    specs: [
      'Marque Legrand · Réf. 403612 · Gamme TX³',
      '2P · 63 A · courbe C · 6 kA · 2 modules',
      'Rail DIN 35 mm · bornes à vis · 230/400 V~',
      'DISTINCTION : 2 POLES 63 A (celui-ci) — la référence 419747 est la version 4 POLES 63 A RX³, et les 419949 / 419947 sont des DPN 1P+N 16 A et 10 A : vérifier le nombre de pôles avant de commander.',
    ],
    imageUrl: '/images/products/btp-legrand-disjoncteur-tx3-2p-63a-403612.jpg',
  },
  {
    id: 'btp-legrand-peigne-raccordement-hx3-404926',
    slug: 'peigne-raccordement-horizontal-hx3-13-modules-legrand-404926',
    name: 'Peigne de Raccordement HX³ Horizontal 1P+N 13 Modules Legrand — 404926',
    category: 'quincaillerie-btp',
    price: 4500,
    compareAtPrice: 5500,
    stock: 15,
    badge: 'Peigne HX³',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Peigne d’alimentation HX³ 404926, 1P+N, 13 modules, réversible phase/neutre : alimenter une rangée entière de disjoncteurs depuis l’interrupteur différentiel.',
    description:
      'Le 404926 est un peigne horizontal universel de 13 modules (220 mm, section 16 mm², 63 A max). Réversible — un côté noir pour la phase, un côté bleu pour le neutre — il se connecte sur bornes automatiques comme sur bornes à vis, et se recoupe à la longueur voulue.',
    specs: [
      'Marque Legrand · Réf. 404926 · Gamme HX³ / VX³',
      'Peigne horizontal 1P+N · 13 modules · 63 A · 16 mm²',
      'Réversible phase / neutre · recoupable · 220 mm',
      'Complément des disjoncteurs 403612, 419747 et des ID 411506',
    ],
    imageUrl: '/images/products/btp-legrand-peigne-raccordement-hx3-404926.jpg',
  },
  {
    id: 'btp-midea-projecteur-led-200w-mdl-flf200w-03',
    slug: 'projecteur-led-200w-18000lm-ip66-3000k-midea-mdl-flf200w-033000k',
    name: 'Projecteur LED 200 W 18 000 lm IP66 3000 K Midea — MDL-FLF200W-033000K',
    category: 'quincaillerie-btp',
    price: 52000,
    compareAtPrice: 62000,
    stock: 15,
    badge: '200 W · 3000 K',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Projecteur LED Midea 200 W, 18 000 lm, blanc chaud 3000 K, IP66 : éclairage de chantier, parking et façade de grande hauteur.',
    description:
      'Le MDL-FLF200W-033000K délivre 18 000 lumens pour 200 W (90 lm/W) en 3000 K. Boîtier aluminium noir à ailettes, verre trempé, étanchéité IP66 et étrier de fixation orientable. Raccordement 220-240 V~, prévu pour l’extérieur et les ambiances poussiéreuses.',
    specs: [
      'Marque Midea Lighting · Réf. MDL-FLF200W-033000K',
      '200 W · 18 000 lm · 3000 K blanc chaud · 90 lm/W',
      'IP66 · boîtier aluminium · verre trempé · étrier orientable',
      'DISTINCTION : 200 W / 3000 K (celui-ci) — les réf. MDL-FLF100W-036500K et MDL-FLF50W-036500K sont les versions 100 W et 50 W en 6500 K (lumière froide).',
    ],
    imageUrl: '/images/products/btp-midea-projecteur-led-200w-mdl-flf200w-03.jpg',
  },
  {
    id: 'btp-legrand-interrupteur-differentiel-2p-63a-30ma-411506',
    slug: 'interrupteur-differentiel-dx3-2p-63a-30ma-legrand-411506',
    name: 'Interrupteur Différentiel DX³-ID 2P 63 A 30 mA Legrand — 411506',
    category: 'quincaillerie-btp',
    price: 79000,
    compareAtPrice: 92000,
    stock: 15,
    badge: 'DX³ · 2P 63 A 30 mA',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Interrupteur différentiel DX³-ID 411506, 2P 63 A type AC 30 mA, 2 modules : la protection des personnes en tête de tableau monophasé.',
    description:
      'Le 411506 est un interrupteur différentiel DX³-ID bipolaire 230 V~, 63 A, sensibilité 30 mA type AC, 2 modules. Bornes à vis arrivée haute / départ bas, cadenassable, porte-étiquette. Il protège les personnes contre les contacts indirects et s’alimente par peigne HX³ 404926.',
    specs: [
      'Marque Legrand · Réf. 411506 · Gamme DX³-ID',
      '2P · 63 A · 30 mA type AC · 230 V~ · 2 modules',
      'Bornes à vis · cadenassable · rail DIN 35 mm',
      'DISTINCTION : 2 POLES 63 A 30 mA (celui-ci) — la réf. 411664 est un ID 4 POLES 25 A 300 mA (protection incendie, pas de personne) et le 403612 est un disjoncteur simple, sans différentiel.',
    ],
    imageUrl: '/images/products/btp-legrand-interrupteur-differentiel-2p-63a-30ma-411506.jpg',
  },
  {
    id: 'btp-legrand-disjoncteur-rx3-4p-63a-419747',
    slug: 'disjoncteur-rx3-4p-63a-courbe-c-legrand-419747',
    name: 'Disjoncteur RX³ 4P 63 A Courbe C 4,5 kA Legrand — 419747',
    category: 'quincaillerie-btp',
    price: 89000,
    compareAtPrice: 103000,
    stock: 15,
    badge: 'RX³ · 4P 63 A',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Disjoncteur RX³ 419747 tétrapolaire 63 A courbe C 4,5 kA, 4 modules : tête de tableau triphasé 400 V pour atelier, immeuble ou pompe.',
    description:
      'Le 419747 est un disjoncteur magnétothermique RX³ 4P 63 A courbe C, 4500 A de pouvoir de coupure sous 400 V, 4 modules. Bornes à vis, porte-étiquette, rail DIN symétrique. Utilisé en tête d’installation triphasée ou comme sectionneur général.',
    specs: [
      'Marque Legrand · Réf. 419747 · Gamme RX³',
      '4P · 63 A · courbe C · 4 500 A · 4 modules · 400 V~',
      'Rail DIN 35 mm · bornes à vis · porte-étiquette',
      'DISTINCTION : 4 POLES 63 A (celui-ci) — la réf. 403612 est un TX³ 2 POLES 63 A 6 kA pour tableau monophasé : ne pas confondre les deux disjoncteurs 63 A.',
    ],
    imageUrl: '/images/products/btp-legrand-disjoncteur-rx3-4p-63a-419747.jpg',
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
  {
    id: 'btp-verrou-rouge-ck6683',
    slug: 'cle-verrou-rouge-ck6683-cylindre-laiton',
    name: 'Serrure Verrou de Porte Rouge CK6683 — Cylindre Laiton & Clés',
    category: 'quincaillerie-btp',
    price: 4500,
    compareAtPrice: 6000,
    stock: 25,
    badge: 'Serrurerie',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Verrou de sûreté en applique coloris rouge bordeaux (CK6683) avec cylindre laiton, pêne solide et jeu de clés inclus.',
    description:
      'Renforcez la sécurité de vos portes d’entrée, magasins ou portails ! Ce verrou en applique CK6683 au boîtier métal peint rouge résistant est équipé d’un cylindre en laiton et d’un jeu de clés.',
    specs: [
      'Référence CK6683 · Boîtier acier peint rouge bordeaux',
      'Cylindre et pêne en laiton haute résistance',
      'Livré avec jeu de clés',
      'Installation rapide en applique sur porte bois ou métal'
    ],
    imageUrl: '/images/products/btp-verrou-rouge-ck6683.jpg',
  },
  {
    id: 'btp-serrure-griffe-165-noir-or',
    slug: 'serrure-cle-canon-luxe-noir-or-griffe-165-9069-a904',
    name: 'Serrure Clé à Canon Luxe Noir & Or Griffe 165 — 9069-A904',
    category: 'quincaillerie-btp',
    price: 14500,
    compareAtPrice: 18000,
    stock: 15,
    badge: 'Luxe Noir & Or',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Ensemble complet serrure à encastrer luxe Griffe 165 finition noir mat & doré, cylindre laiton et clés inclus.',
    description:
      'Alliez sécurité et design haut de gamme pour vos portes principales et chambres ! La serrure Griffe 165 (9069-A904) se distingue par ses poignées noir mat rehaussées d’une touche dorée et son mécanisme robuste.',
    specs: [
      'Marque Griffe · Réf. GRIFFE-165 (9069-A904)',
      'Finition luxe noir mat avec détails dorés',
      'Coffret complet : poignées, boîtier à encastrer, cylindre laiton & clés',
      'Idéale portes d’entrée, villas, bureaux et hôtels'
    ],
    imageUrl: '/images/products/btp-serrure-griffe-165-noir-or.jpg',
  },
  {
    id: 'btp-serrure-griffe-gf11-1023',
    slug: 'serrure-cle-canon-luxe-inox-griffe-gf-11-1023',
    name: 'Serrure Clé à Canon Luxe Inox Griffe — GF-11-1023',
    category: 'quincaillerie-btp',
    price: 11500,
    compareAtPrice: 14500,
    stock: 18,
    badge: 'Inox Brossé',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Serrure complète à canon Griffe GF-11-1023 finition inox brossé, poignée ergonomique à reliefs et jeu de clés.',
    description:
      'Élégante et durable, la serrure Griffe GF-11-1023 en finition acier inoxydable brossé résiste à l’usage intensif quotidien. Livrée complète avec canon et clés.',
    specs: [
      'Marque Griffe · Référence GF-11-1023',
      'Plaque longue et poignée ergonomique finition inox brossé',
      'Cylindre à canon sécurisé avec jeu de clés',
      'Convient aux portes intérieures et extérieures'
    ],
    imageUrl: '/images/products/btp-serrure-griffe-gf11-1023.jpg',
  },
  {
    id: 'btp-disjoncteur-schneider-easy9-2p-25a',
    slug: 'disjoncteur-sur-rail-2p-25a-schneider-easy9-ez9f32225',
    name: 'Disjoncteur sur Rail 2P 25A Schneider Electric Easy9 — EZ9F32225',
    category: 'quincaillerie-btp',
    price: 6500,
    compareAtPrice: 8500,
    stock: 30,
    badge: 'Schneider Original',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Disjoncteur bipolaire 2P 25A courbe C (gamme Easy9 Schneider Electric) pour protection fiable de vos circuits électriques.',
    description:
      'Protégez vos installations électriques contre les surcharges et courts-circuits avec la qualité certifiée Schneider Electric ! Montage rapide sur rail DIN pour tableaux résidentiels et professionnels.',
    specs: [
      'Marque Schneider Electric · Gamme Easy9 · Réf. EZ9F32225',
      'Bipolaire 2P · Calibre 25A · Courbe C',
      'Montage standard sur rail DIN',
      'Protection contre les surcharges et courts-circuits'
    ],
    imageUrl: '/images/products/btp-disjoncteur-schneider-easy9-2p-25a.jpg',
  },
  {
    id: 'btp-parafoudre-schneider-easy9-1pn-20ka',
    slug: 'parafoudre-1pn-20ka-230v-schneider-easy9-ez9l33620',
    name: 'Parafoudre 1P+N 20kA 230V Schneider Electric Easy9 — EZ9L33620',
    category: 'quincaillerie-btp',
    price: 68500,
    compareAtPrice: 79000,
    stock: 10,
    badge: 'Protection Foudre',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Parafoudre monophasé Type 2 (1P+N, 20 kA, 230 V) Schneider Electric Easy9 : protège TV, frigos, clims et appareils contre la foudre et surtensions.',
    description:
      'Indispensable pendant la saison des pluies et orages en Côte d’Ivoire ! Le parafoudre Schneider Electric Easy9 EZ9L33620 (Type 2 · 20 kA) absorbe les pics de tension et protège toute votre installation monophasée.',
    specs: [
      'Marque Schneider Electric · Réf. EZ9L33620 (Easy9 SPD T2)',
      'Monophasé 1P+N · 230 V · Courant de décharge max Imax 20 kA',
      'Voyant mécanique d’état (Vert = OK / Rouge = à remplacer)',
      'Montage sur rail DIN · Protection résidentielle & commerciale'
    ],
    imageUrl: '/images/products/btp-parafoudre-schneider-easy9-1pn-20ka.jpg',
  },
  {
    id: 'btp-fiche-industrielle-megalec-5p-16a',
    slug: 'fiche-industrielle-femelle-apparente-5p-16a-ip44-megalec-meg-115g',
    name: 'Prise / Fiche Industrielle Femelle Apparente 5P 16A IP44 Megalec — MEG-115G',
    category: 'quincaillerie-btp',
    price: 6500,
    compareAtPrice: 8500,
    stock: 20,
    badge: 'Industriel IP44',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Socle prise industrielle femelle apparente 5 pôles (3P+N+T) 16A 400V étanche IP44 Megalec avec clapet rouge de protection.',
    description:
      'Conçue pour les ateliers, chantiers, groupes électrogènes et machines triphasées ! Cette prise murale apparente Megalec 5P 16A IP44 résiste aux projections d’eau et à la poussière.',
    specs: [
      'Marque Megalec · Réf. MEG-115G · 5P (3P+N+T) 16A',
      'Indice de protection IP44 étanche aux projections d’eau',
      'Boîtier apparent robuste avec clapet de fermeture rouge',
      'Ateliers, chantiers BTP, groupes électrogènes triphasés'
    ],
    imageUrl: '/images/products/btp-fiche-industrielle-megalec-5p-16a.jpg',
  },
  {
    id: 'btp-coffret-schneider-120-modules-lvsxh524',
    slug: 'coffret-electrique-120-modules-encastre-5-rangees-schneider-lvsxh524',
    name: 'Coffret Électrique 120 Modules Encastré 5 Rangées Porte Transparente Schneider — LVSXH524',
    category: 'quincaillerie-btp',
    price: 155000,
    compareAtPrice: 175000,
    stock: 5,
    badge: '120 Modules Pro',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Grand tableau électrique encastré Schneider Electric PrismaSet XS 5 rangées × 24 modules (120 modules) avec porte transparente.',
    description:
      'La référence des électriciens pour les grandes villas, immeubles, hôtels et bâtiments tertiaires ! Ce coffret encastré PrismaSet XS LVSXH524 offre 120 modules répartis sur 5 rangées avec porte transparente de contrôle.',
    specs: [
      'Marque Schneider Electric · PrismaSet XS · Réf. LVSXH524',
      'Capacité 120 modules (5 rangées de 24 modules)',
      'Pose encastrée · Porte transparente incluse',
      'Idéal villas, immeubles, bureaux et locaux commerciaux'
    ],
    imageUrl: '/images/products/btp-coffret-schneider-120-modules-lvsxh524.jpg',
  },
  {
    id: 'btp-extracteur-industriel-emtop-120w-8p',
    slug: 'ventilateur-extraction-industriel-emtop-120w-8-pouces-egfj2a08',
    name: 'Ventilateur d’Extraction Industriel EMTOP 120 W 8" (1300 m³/h) — EGFJ2A08',
    category: 'quincaillerie-btp',
    price: 68000,
    compareAtPrice: 79000,
    stock: 6,
    badge: '1300 m³/h · Cuivre',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Puissant extracteur d’air industriel portable EMTOP 8 pouces (120 W · 0,16 HP · bobinage cuivre) débit 1300 m³/h pour chantiers et ateliers.',
    description:
      'Ventilez efficacement sous-sols, ateliers, garages, cuisines professionnelles et chantiers ! L’extracteur EMTOP EGFJ2A08 combine un moteur 100 % fil de cuivre de 120 W, un débit puissant de 1300 m³/h, une poignée de transport et 4 pieds stables.',
    specs: [
      'Marque EMTOP · Réf. EGFJ2A08 · Diamètre 8 pouces (200 mm)',
      'Puissance 120 W (0,16 HP) · Moteur bobinage 100 % cuivre',
      'Débit d’air puissant : 1 300 m³/h',
      'Grilles de protection, poignée de transport & pieds anti-vibration'
    ],
    imageUrl: '/images/products/btp-extracteur-industriel-emtop-120w-8p.jpg',
  },
  {
    id: 'btp-colonne-douche-inox-griffe-gs-g224ss',
    slug: 'colonne-douche-hydromassante-inox-griffe-gs-g224ss',
    name: 'Colonne de Douche Hydromassante Inox Complète Griffe — GS-G224SS',
    category: 'quincaillerie-btp',
    price: 65000,
    compareAtPrice: 78000,
    stock: 8,
    badge: 'Hydromassante Inox',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Colonne de douche murale en acier inoxydable brossé Griffe GS-G224SS avec pomme haute effet pluie, buses de massage, mitigeur et douchette flexible.',
    description:
      'Transformez votre salle de bain en espace spa moderne ! Cette colonne de douche en inox brossé anti-corrosion intègre un ciel de pluie supérieur, deux zones de buses hydromassantes, un mitigeur chromé et une douchette à main avec flexible.',
    specs: [
      'Marque Griffe · Réf. GS-G224SS · Corps acier inoxydable brossé',
      'Pomme de douche haute effet pluie + buses hydromassantes intégrées',
      'Mitigeur mécanique + sélecteur de fonctions + douchette à main flexible',
      'Installation murale complète pour salles de bain modernes & hôtels'
    ],
    imageUrl: '/images/products/btp-colonne-douche-inox-griffe-gs-g224ss.jpg',
  },
  {
    id: 'btp-serrure-griffe-158-inox',
    slug: 'serrure-cle-canon-luxe-123-inox-griffe-158',
    name: 'Serrure Clé à Canon Luxe 123 Inox Griffe — GRIFFE-158',
    category: 'quincaillerie-btp',
    price: 10500,
    compareAtPrice: 13000,
    stock: 20,
    badge: 'Inox Satiné',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Serrure complète à canon Griffe 158 (modèle 123) finition inox satiné avec plaque longue, poignée ergonomique et jeu de clés.',
    description:
      'Sobre, résistante et intemporelle, la serrure Griffe 158 équipe durablement les portes de chambres, bureaux et appartements. Livrée complète avec canon et clés.',
    specs: [
      'Marque Griffe · Réf. GRIFFE-158 (modèle 123)',
      'Finition acier inoxydable satiné anti-traces',
      'Livrée avec cylindre à canon et jeu de clés',
      'Pose facile sur portes bois ou métalliques'
    ],
    imageUrl: '/images/products/btp-serrure-griffe-158-inox.jpg',
  },
  {
    id: 'btp-surpresseur-qb80-force-444',
    slug: 'pompe-surpresseur-eau-qb80-force-444',
    name: 'Pompe Surpresseur d’Eau Électrique QB80 FORCE — FORCE-444',
    category: 'quincaillerie-btp',
    price: 48000,
    compareAtPrice: 58000,
    stock: 10,
    badge: 'Surpresseur QB80',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Pompe surpresseur d’eau électrique QB80 (1 HP) FORCE-444 pour augmenter la pression domestique, alimenter les châteaux d’eau et l’arrosage.',
    description:
      'Fini les faibles débits d’eau aux étages ou dans la douche ! Le surpresseur électrique QB80 FORCE-444 offre une pression puissante et régulière avec un corps de pompe robuste et un moteur ventilé endurant.',
    specs: [
      'Marque FORCE · Modèle QB80 · Réf. FORCE-444',
      'Puissance 1 HP (0,75 kW) · Alimentation 220–240 V',
      'Corps moteur à ailettes de refroidissement & turbine laiton',
      'Idéal villas, immeubles, citernes, puits et jardins'
    ],
    imageUrl: '/images/products/btp-surpresseur-qb80-force-444.jpg',
  },
  {
    id: 'btp-parafoudre-schneider-easy9-3pn-20ka',
    slug: 'parafoudre-3pn-20ka-400v-schneider-easy9-ez9l33720',
    name: 'Parafoudre Triphasé 3P+N 20kA 400V Schneider Electric Easy9 — EZ9L33720',
    category: 'quincaillerie-btp',
    price: 118000,
    compareAtPrice: 129000,
    stock: 6,
    badge: 'Triphasé 400V',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Parafoudre triphasé Type 2 (3P+N, 20 kA, 400 V) Schneider Electric Easy9 EZ9L33720 pour protection complète des tableaux triphasés contre la foudre.',
    description:
      'Protégez vos installations triphasées (villas, ateliers, commerces, cliniques, hôtels) contre les surtensions atmosphériques et pics du réseau CIE avec le parafoudre certifié Schneider Electric Easy9 EZ9L33720.',
    specs: [
      'Marque Schneider Electric · Gamme Easy9 · Réf. EZ9L33720',
      'Triphasé 3P+N · 400 V · Type 2 · Imax 20 kA',
      'Voyants mécaniques d’état sur chaque pôle (Vert = OK)',
      'Montage sur rail DIN (4 modules)'
    ],
    imageUrl: '/images/products/btp-parafoudre-schneider-easy9-3pn-20ka.jpg',
  },
  {
    id: 'btp-groupe-electrogene-emtop-55kva-eggrd5511',
    slug: 'groupe-electrogene-essence-emtop-55kva-24a-demarreur-cle-eggrd5511',
    name: 'Groupe Électrogène Essence EMTOP 5,5 kVA (5500 W) 24A — Démarreur à Clé EGGRD5511',
    category: 'quincaillerie-btp',
    price: 379000,
    compareAtPrice: 430000,
    stock: 4,
    badge: '5,5 kVA · Clé + Cuivre',
    featured: true,
    isHeavy: true,
    shortDescription:
      'Puissant groupe électrogène essence monophasé EMTOP 5,5 kVA / 5500 W (24 A) avec démarreur électrique à clé, batterie, bobinage 100 % cuivre et roues.',
    description:
      'Assurez la continuité électrique de votre maison, commerce, pharmacie ou chantier en cas de coupure ! Le groupe électrogène EMTOP EGGRD5511 délivre 5 500 W max (24 A) avec alternateur bobinage 100 % cuivre, démarrage électrique à clé (batterie incluse), voltmètre et châssis tubulaire renforcé sur roues.',
    specs: [
      'Marque EMTOP · Réf. EGGRD5511 · Puissance max 5,5 kVA / 5 500 W (24 A)',
      'Démarrage électrique à clé (batterie 12V incluse) + lanceur manuel',
      'Alternateur bobinage 100 % fil de cuivre haute longévité',
      '2 prises monophasées protégées, voltmètre & kit roues de transport'
    ],
    imageUrl: '/images/products/btp-groupe-electrogene-emtop-55kva-eggrd5511.jpg',
  },
  {
    id: 'btp-cle-douche-griffe-163',
    slug: 'serrure-cle-de-douche-luxe-125-griffe-163',
    name: 'Serrure Clé de Douche / Salle de Bain Luxe 125 Inox Griffe — GRIFFE-163',
    category: 'quincaillerie-btp',
    price: 8500,
    compareAtPrice: 11000,
    stock: 22,
    badge: 'Salle de Bain',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Ensemble poignée et verrou à condamnation (bouton tournant) spécial douche & WC Griffe 163 en acier inoxydable résistant à l’humidité.',
    description:
      'Spécialement conçue pour les portes de salles de bain, douches et toilettes ! Sa finition inox anti-corrosion résiste à la vapeur et à l’humidité, avec verrouillage intérieur pratique par bouton tournant.',
    specs: [
      'Marque Griffe · Réf. GRIFFE-163 (modèle 125)',
      'Condamnation intérieure à bouton tournant (sans clé)',
      'Finition inox brossé anti-rouille spéciale pièces humides',
      'Idéale douches, salles de bain et toilettes'
    ],
    imageUrl: '/images/products/btp-cle-douche-griffe-163.jpg',
  },
  {
    id: 'btp-serrure-griffe-168-bronze',
    slug: 'serrure-cle-canon-luxe-bronze-grec-griffe-168-s52a',
    name: 'Serrure Clé à Canon Luxe Bronze Motif Grec Griffe 168 — S52A',
    category: 'quincaillerie-btp',
    price: 16500,
    compareAtPrice: 20000,
    stock: 12,
    badge: 'Luxe Bronze',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Serrure haut de gamme Griffe 168 (S52A) finition bronze antique doré avec gravure motif grec, canon sécurisé et jeu de clés.',
    description:
      'Sublimez vos portes d’entrée, salons et suites avec la serrure Griffe 168 S52A ! Sa finition bronze doré brossé et ses gravures géométriques de style grec apportent prestige et robustesse.',
    specs: [
      'Marque Griffe · Réf. GRIFFE-168 (S52A)',
      'Finition bronze antique doré avec motif grec sculpté',
      'Cylindre à canon haute sécurité + jeu de clés',
      'Idéale portes d’entrée, villas haut standing et hôtels'
    ],
    imageUrl: '/images/products/btp-serrure-griffe-168-bronze.jpg',
  },
  {
    id: 'btp-poutrelle-coffrage-h20-390m',
    slug: 'poutrelle-de-coffrage-bois-h20-avec-protection-390m-pout-h20-3900',
    name: 'Poutrelle de Coffrage en Bois H20 avec Embouts de Protection — 3,90 m (POUT-H20-3900)',
    category: 'quincaillerie-btp',
    price: 26000,
    compareAtPrice: 31000,
    stock: 30,
    badge: 'Gros Œuvre BTP',
    featured: false,
    isHeavy: true,
    shortDescription:
      'Poutrelle de coffrage professionnelle en bois lamellé H20 longueur 3,90 m traitée jaune hydrofuge avec embouts rouges anti-chocs.',
    description:
      'Indispensable sur les chantiers de construction pour le coffrage de dalles et planchers béton ! Cette poutrelle H20 de 3,90 m combine légèreté, forte capacité portante et embouts de protection rouges pour prolonger sa durée de vie.',
    specs: [
      'Référence POUT-H20-3900 · Profil H20 · Longueur : 3,90 m',
      'Bois résineux sélectionné traité hydrofuge jaune chantier',
      'Embouts de protection plastique rouge anti-éclatement aux extrémités',
      'Coffrage de dalles, poutres et planchers BTP'
    ],
    imageUrl: '/images/products/btp-poutrelle-coffrage-h20-390m.jpg',
  },
  {
    id: 'btp-force-cle-134f-plaque-longue',
    slug: 'serrure-force-134f-plaque-longue-nickel-satine',
    name: 'Serrure Clé à Canon FORCE 134F — Plaque Longue Nickel Satiné (CLE-134F)',
    category: 'quincaillerie-btp',
    price: 9500,
    compareAtPrice: 12000,
    stock: 20,
    badge: 'Plaque longue',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Ensemble serrure à canon luxe FORCE 134 (CLE-134F) à poignée courbée ergonomique finition nickel satiné pour portes intérieures et extérieures.',
    description:
      'Design fluide et prise en main confortable ! La serrure FORCE CLE-134F offre un excellent rapport qualité-prix pour équiper maisons, résidences locatives et bureaux.',
    specs: [
      'Marque FORCE · Réf. CLE-134F (modèle 134)',
      'DISTINCTION : plaque longue — pas la 123F à rosace étroite',
      'Poignée courbée ergonomique finition nickel satiné',
      'Plaque longue percée pour cylindre européen à canon',
      'Résistante à l’usage quotidien intensif'
    ],
    imageUrl: '/images/products/btp-force-cle-134f-plaque-longue.jpg',
  },
  {
    id: 'btp-dismatique-megalec-meg-dis',
    slug: 'dismatique-interrupteur-securite-megalec-meg-dis',
    name: 'Dismatique Mural de Protection Électrique Megalec — MEG-DIS',
    category: 'quincaillerie-btp',
    price: 4500,
    compareAtPrice: 6000,
    stock: 25,
    badge: 'Protection Clim/Appareils',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Disjoncteur mural Dismatique Megalec (MEG-DIS) avec bouton marche vert et bouton arrêt/réarmement rouge pour climatiseurs, chauffe-eau et appareils.',
    description:
      'Protégez vos climatiseurs, chauffe-eau et appareils électroménagers puissants avec le Dismatique Megalec ! Commande directe marche/arrêt en façade et coupure automatique en cas de surcharge.',
    specs: [
      'Marque Megalec · Réf. MEG-DIS',
      'Bouton poussoir vert (Marche) + bouton rouge (Arrêt / Réarmement)',
      'Boîtier blanc sobre à montage mural encastré ou saillie',
      'Idéal climatiseurs, chauffe-eau, congélateurs et pompes'
    ],
    imageUrl: '/images/products/btp-dismatique-megalec-meg-dis.jpg',
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
// RAYON CUISINE & ART DE LA TABLE (54 PRODUITS — arrivage showroom Nov. 2026)
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
  {
    id: 'cuisine-carafe-luminarc-cheqs-1-3l',
    slug: 'carafe-frigo-luminarc-cheqs-verre-1-3l-couvercle-blanc',
    name: 'Carafe Frigo Luminarc Cheqs 1,3 L en Verre — Couvercle Blanc',
    category: 'maison',
    price: 5000,
    compareAtPrice: 6500,
    stock: 14,
    badge: 'Luminarc 1,3L',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Carafe réfrigérateur Luminarc Cheqs 1,3 L en verre transparent à motif quadrillé en relief, anse ergonomique et couvercle blanc.',
    description:
      'Conçue pour se glisser facilement dans la porte du réfrigérateur ! Cette carafe Luminarc Cheqs de 1,3 L en verre résistant arbore un élégant motif quadrillé en bas et un couvercle blanc pratique qui protège eau, jus naturels et bissap des odeurs du frigo.',
    specs: [
      'Marque Luminarc · Modèle Cheqs Fridge Jug 1,3 L',
      'Verre transparent haute qualité avec relief quadrillé',
      'Couvercle blanc hermétique anti-odeurs',
      'Format spécial porte de réfrigérateur · Lavable au lave-vaisselle'
    ],
    imageUrl: '/images/products/cuisine-carafe-luminarc-cheqs-1-3l.jpg',
  },
  {
    id: 'cuisine-carafe-luminarc-arc-1-3l',
    slug: 'carafe-luminarc-arc-verre-1-3l-avec-couvercle',
    name: 'Carafe Luminarc Arc 1,3 L en Verre Transparent avec Couvercle',
    category: 'maison',
    price: 4500,
    compareAtPrice: 5900,
    stock: 16,
    badge: 'Luminarc Arc',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Grand classique de la table : pichet Luminarc Arc 1,3 L en verre transparent évasé avec anse robuste et couvercle inclus.',
    description:
      'Indispensable au quotidien pour servir eau fraîche, jus de fruits ou thé glacé à table ! La carafe Luminarc Arc 1,3 L séduit par sa ligne évasée intemporelle, son bec verseur précis et son couvercle assorti.',
    specs: [
      'Marque Luminarc · Gamme Arc Jug 1,3 L (Réf. N1103)',
      'Verre transparent solide à base large très stable',
      'Couvercle de protection inclus',
      'Eau, jus, bissap, gingembre · Entretien facile'
    ],
    imageUrl: '/images/products/cuisine-carafe-luminarc-arc-1-3l.jpg',
  },
  {
    id: 'cuisine-carafe-verre-motifs-yzh36',
    slug: 'carafe-verre-transparent-motifs-geometriques-couvercle',
    name: 'Carafe en Verre Transparent à Motifs Géométriques & Couvercle',
    category: 'maison',
    price: 4000,
    compareAtPrice: 5500,
    stock: 18,
    badge: 'Petit prix',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Pichet en verre transparent décoré de motifs géométriques côtelés sur la base, avec anse confortable et couvercle.',
    description:
      'Une carafe lumineuse et pratique à petit prix pour tous les repas de la famille. Son verre moulé à motifs géométriques capte la lumière sur la table et offre une excellente prise en main.',
    specs: [
      'Verre transparent épais avec motifs géométriques en relief',
      'Anse ergonomique et bec verseur anti-goutte',
      'Couvercle de protection inclus · Réf. YZH-36',
      'Idéale eau fraîche, jus maison et boissons de table'
    ],
    imageUrl: '/images/products/cuisine-carafe-verre-motifs-yzh36.jpg',
  },
  {
    id: 'cuisine-carafe-verre-poire-couvercle',
    slug: 'carafe-verre-forme-poire-couvercle-bec-verseur',
    name: 'Carafe en Verre Forme Poire avec Couvercle Bec Verseur',
    category: 'maison',
    price: 4500,
    compareAtPrice: 5900,
    stock: 12,
    badge: 'Couvercle Pratique',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Carafe galbée forme poire en verre transparent avec grande anse et couvercle translucide à bec verseur intégré.',
    description:
      'Élégante et fonctionnelle, cette carafe galbée en verre transparent dispose d’un couvercle ajusté qui retient les glaçons et tranches de citron lorsque vous versez. Parfaite pour les tables familiales et les réceptions.',
    specs: [
      'Verre transparent haute clarté, silhouette poire élégante',
      'Couvercle blanc translucide avec bec verseur pratique',
      'Grande anse en verre facile à saisir',
      'Eau fraîche, citronnade, jus de fruits et cocktails'
    ],
    imageUrl: '/images/products/cuisine-carafe-verre-poire-couvercle.jpg',
  },
  {
    id: 'cuisine-bouteille-verre-1l-agrumes',
    slug: 'bouteille-eau-verre-1l-imprime-agrumes-sirio-zagara',
    name: 'Bouteille à Eau en Verre 1 L Imprimé Agrumes « Fresh from the Market »',
    category: 'maison',
    price: 3500,
    compareAtPrice: 4900,
    stock: 15,
    badge: 'Design Italie',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Bouteille 1 litre en verre italien Decover au décor estival citrons & quadrillage bleu, avec bouchon métallique blanc à vis.',
    description:
      'Apportez une touche de fraîcheur méditerranéenne sur votre table ! Cette bouteille en verre de 1 litre (gamme Sirio Zagara Agrumes) ferme hermétiquement grâce à son bouchon métal à vis pour conserver eau fraîche, jus de citron, bissap ou lait au réfrigérateur.',
    specs: [
      'Contenance 1 Litre · Verre imprimé Sirio Zagara Agrumes (Decover)',
      'Bouchon métallique blanc à vis hermétique',
      'Décor citrons jaunes & quadrillage bleu « Fresh from the Market »',
      'Format fin idéal pour la porte du réfrigérateur'
    ],
    imageUrl: '/images/products/cuisine-bouteille-verre-1l-agrumes.jpg',
  },
  {
    id: 'cuisine-carafe-luminarc-1l-liege',
    slug: 'carafe-luminarc-verre-1l-bouchon-liege-naturel',
    name: 'Carafe Luminarc 1 L en Verre avec Bouchon en Liège Naturel',
    category: 'maison',
    price: 10500,
    compareAtPrice: 13500,
    stock: 10,
    badge: 'Made in France',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Carafe cylindrique design Luminarc 1 L fabriquée en France, coiffée d’un authentique bouchon en liège naturel.',
    description:
      'Le chic minimaliste pour les belles tables ! Fabriquée en France par Luminarc, cette carafe cylindrique en verre cristallin de 1 litre s’accompagne d’un gros bouchon en liège naturel qui protège vos boissons avec style. Idéale aussi en idée cadeau.',
    specs: [
      'Marque Luminarc · Fabriquée en France (Réf. N3941)',
      'Contenance 1 Litre · Verre transparent haute brillance',
      'Bouchon épais en liège naturel amovible',
      'Eau détox, jus frais, service de table haut de gamme'
    ],
    imageUrl: '/images/products/cuisine-carafe-luminarc-1l-liege.jpg',
  },
  {
    id: 'cuisine-carafe-pasabahce-couvercle-violet',
    slug: 'carafe-pasabahce-verre-col-evase-couvercle-violet',
    name: 'Carafe Paşabahçe en Verre Col Évasé — Couvercle Violet',
    category: 'maison',
    price: 5000,
    compareAtPrice: 6500,
    stock: 12,
    badge: 'Verre Paşabahçe',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Carafe élégante Paşabahçe en verre épais à col évasé, livrée avec son couvercle souple violet anti-poussière.',
    description:
      'Alliez la solidité du verre Paşabahçe à une touche de couleur moderne ! Sa silhouette élancée se prend facilement en main par le col et son couvercle souple violet préserve la fraîcheur de vos boissons au réfrigérateur comme sur la table.',
    specs: [
      'Marque Paşabahçe · Verre épais transparent (Réf. DS26629)',
      'Col évasé ergonomique facile à verser',
      'Couvercle souple violet ajusté inclus',
      'Eau, jus de fruits, boissons glacées · Passe au lave-vaisselle'
    ],
    imageUrl: '/images/products/cuisine-carafe-pasabahce-couvercle-violet.jpg',
  },
  {
    id: 'cuisine-pichet-polycarbonate-1-4l-incassable',
    slug: 'pichet-1-4l-polycarbonate-incassable-transparent-orca',
    name: 'Pichet 1,4 L en Polycarbonate Incassable Transparent — Design Épuré',
    category: 'maison',
    price: 5000,
    compareAtPrice: 6500,
    stock: 16,
    badge: 'Incassable',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Pichet 1,4 L aspect cristal en polycarbonate incassable ultra léger : idéal familles avec enfants, terrasses et restaurants.',
    description:
      'Toute la transparence du verre sans aucun risque de casse ! Ce pichet Orca de 1,4 L en polycarbonate alimentaire incassable affiche une ligne moderne à taille cintrée et un bec verseur précis. Parfait pour la maison, le jardin, les enfants ou la restauration.',
    specs: [
      'Contenance 1,4 Litre · Dimensions : Ø 11,2 × H 29 cm (Réf. 8832)',
      'Polycarbonate alimentaire transparent 100 % incassable',
      'Léger, prise en main facile par la taille cintrée',
      'Idéal familles, enfants, terrasses, maquis & restaurants'
    ],
    imageUrl: '/images/products/cuisine-pichet-polycarbonate-1-4l-incassable.jpg',
  },
  {
    id: 'cuisine-carafe-plastique-martele-1-9l',
    slug: 'carafe-plastique-transparent-1-9l-effet-martele-couvercle',
    name: 'Carafe Grande Capacité 1,9 L Effet Verre Martelé — Vert d’Eau ou Transparent',
    category: 'maison',
    price: 7000,
    compareAtPrice: 9000,
    stock: 12,
    badge: 'Format XXL 1,9L',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Très grand pichet de 1,9 L (64 oz) en plastique cristallin effet martelé, léger et résistant, avec anse et couvercle.',
    description:
      'Servez toute la famille ou vos invités sans recharger sans cesse ! Cette grande carafe de 1,9 litre imite à merveille le verre martelé tout en restant légère et résistante aux chocs. Disponible en teinte vert d’eau ou cristal transparent (précisez votre choix dans la commande).',
    specs: [
      'Très grande capacité 1,9 Litre (64,25 oz) · Réf. 179650940',
      'Plastique cristallin épais effet verre martelé',
      'Couvercle ajusté + grande anse robuste',
      'Coloris au choix : Vert d’eau ou Transparent'
    ],
    imageUrl: '/images/products/cuisine-carafe-plastique-martele-1-9l.jpg',
  },
  {
    id: 'cuisine-carafe-plastique-1-5l-bleu-barok',
    slug: 'carafe-plastique-1-5l-bleu-marine-barok-strie',
    name: 'Carafe 1,5 L Bleu Marine Barok Striée avec Couvercle',
    category: 'maison',
    price: 6000,
    compareAtPrice: 7900,
    stock: 14,
    badge: 'Style Barok 1,5L',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Pichet élancé 1,5 L en plastique translucide bleu marine à fines stries verticales, avec anse et couvercle assorti.',
    description:
      'Une note de fraîcheur bleu marine sur votre table ! Légère, incassable et facile à manipuler même par les enfants, cette carafe Barok de 1,5 L aux stries verticales modernes s’emporte partout : salle à manger, terrasse ou pique-nique.',
    specs: [
      'Capacité 1,5 Litre · Modèle Barok Réf. 6850',
      'Plastique alimentaire translucide bleu marine résistant aux chocs',
      'Fines stries verticales modernes · Anse et couvercle assortis',
      'Légère et pratique pour toute la famille'
    ],
    imageUrl: '/images/products/cuisine-carafe-plastique-1-5l-bleu-barok.jpg',
  },
  {
    id: 'cuisine-lot-4-mini-bocaux-hexagonaux',
    slug: 'lot-4-mini-bocaux-hexagonaux-verre-couvercles-noir-rouge',
    name: 'Lot de 4 Mini Bocaux Hexagonaux en Verre — Couvercles Noir & Rouge',
    category: 'maison',
    price: 2500,
    compareAtPrice: 3500,
    stock: 20,
    badge: 'Lot de 4',
    featured: false,
    isHeavy: false,
    shortDescription:
      '4 petits bocaux hexagonaux en verre transparent avec couvercles métalliques à vis (2 noirs + 2 rouges) pour épices, miel et confitures.',
    description:
      'Idéaux pour organiser vos épices, poivre, piment, miel, confitures maison ou graines ! Ce lot de 4 mini bocaux hexagonaux en verre épais (Réf. DS26641) assure une fermeture hermétique grâce à leurs couvercles métalliques à vis.',
    specs: [
      'Lot de 4 mini bocaux hexagonaux en verre transparent',
      'Couvercles métalliques hermétiques à vis (2 noirs + 2 rouges)',
      'Parfaits pour épices, miel, confitures, herbes & sauces',
      'Référence showroom DS26641'
    ],
    imageUrl: '/images/products/cuisine-lot-4-mini-bocaux-hexagonaux.jpg',
  },
  {
    id: 'cuisine-bocal-boule-verre-3l-bleu',
    slug: 'grand-bocal-boule-verre-3-litres-couvercle-bleu',
    name: 'Grand Bocal Boule en Verre 3 Litres — Couvercle Métal Bleu',
    category: 'maison',
    price: 3500,
    compareAtPrice: 4900,
    stock: 14,
    badge: 'Format 3 L',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Très grand bocal rond façon bonbonnière en verre épais de 3 litres avec large ouverture et couvercle métallique bleu.',
    description:
      'Un bocal généreux de 3 litres au format boule classique, parfait pour conserver biscuits, gâteaux secs, bonbons, arachides, gari, sucre ou pâtes tout en gardant le contenu bien visible.',
    specs: [
      'Grande capacité 3 Litres · Verre transparent épais',
      'Large ouverture pratique pour servir facilement',
      'Couvercle métallique bleu à vis · Réf. VAI0162',
      'Idéal biscuits, bonbons, céréales, arachides et conserves sèches'
    ],
    imageUrl: '/images/products/cuisine-bocal-boule-verre-3l-bleu.jpg',
  },
  {
    id: 'maison-corbeille-mandala-orange',
    slug: 'corbeille-poubelle-deco-mandala-multicolore-rebord-orange',
    name: 'Corbeille Déco Motif Mandala Multicolore — Rebord Orange',
    category: 'maison',
    price: 3500,
    compareAtPrice: 4900,
    stock: 15,
    badge: 'Déco Maison',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Corbeille à papier décorative en plastique robuste imprimé mosaïque mandala colorée avec rebord orange.',
    description:
      'Ajoutez une note chaleureuse et artistique à votre bureau, chambre ou salon ! Cette corbeille légère et lavable en un coup d’éponge habille votre intérieur de motifs mandalas colorés.',
    specs: [
      'Plastique rigide résistant et facile à nettoyer',
      'Imprimé mosaïque mandala multicolore + rebord orange',
      'Format idéal chambre, bureau, salon ou salle de bain',
      'Légère et empilable'
    ],
    imageUrl: '/images/products/maison-corbeille-mandala-orange.jpg',
  },
  {
    id: 'maison-corbeille-pat-patrouille-bleue',
    slug: 'corbeille-chambre-enfant-pat-patrouille-bleue',
    name: 'Corbeille Chambre Enfant Pat’Patrouille (Paw Patrol) — Bleue',
    category: 'maison',
    price: 3500,
    compareAtPrice: 4900,
    stock: 15,
    badge: 'Chambre Enfant',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Corbeille à papier bleue illustrée des héros Pat’Patrouille : parfaite pour apprendre le rangement aux enfants.',
    description:
      'Les petits fans de Pat’Patrouille vont adorer ! Cette corbeille solide en plastique lisse aux couleurs vives décore la chambre d’enfant ou le coin bureau tout en restant ultra facile à laver.',
    specs: [
      'Décor officiel Pat’Patrouille (Chase, Stella, Marcus, Ruben, Everest)',
      'Plastique robuste sans bords coupants, rebord bleu',
      'Idéale chambre d’enfant, salle de jeux ou bureau d’écolier',
      'Nettoyage facile à l’eau savonneuse'
    ],
    imageUrl: '/images/products/maison-corbeille-pat-patrouille-bleue.jpg',
  },
  {
    id: 'maison-organisateur-placard-plastart-4-7l',
    slug: 'organisateur-placard-suspendu-plastart-4-7l-blanc',
    name: 'Organisateur de Placard Suspendu Plastart 4,7 L — Blanc (25×14×36 cm)',
    category: 'maison',
    price: 5000,
    compareAtPrice: 6500,
    stock: 16,
    badge: 'Gain de place',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Panier de rangement suspendu ajouré Plastart 4,7 L à accrocher sur porte de placard (cuisine ou salle de bain), sans perçage.',
    description:
      'Optimisez l’intérieur de vos placards sans aucun trou ni vis ! Cet organisateur suspendu Plastart (fabriqué en Turquie) s’accroche simplement sur la porte d’un meuble de cuisine ou de salle de bain pour ranger produits ménagers, éponges, sacs ou flacons.',
    specs: [
      'Marque Plastart (Irak Plastik, Turquie) · Réf. TE-550 / VAI0123',
      'Capacité 4,7 Litres · Dimensions : 25 × 14 × 36 cm',
      'Installation instantanée sur porte de placard sans perçage',
      'Parois ajourées respirantes · Cuisine & salle de bain'
    ],
    imageUrl: '/images/products/maison-organisateur-placard-plastart-4-7l.jpg',
  },
  {
    id: 'maison-nappe-hevoa-150x250-florale',
    slug: 'nappe-de-table-hevoa-150x250-motif-floral-pastel',
    name: 'Nappe de Table Hevoa Home & Co. 150×250 cm — Motif Floral Pastel',
    category: 'maison',
    price: 16500,
    compareAtPrice: 21000,
    stock: 8,
    badge: 'Grand Format',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Grande nappe rectangulaire 150×250 cm (6 à 8 couverts) fond blanc à imprimé floral aquarelle rose poudré, beige et jaune doux.',
    description:
      'Habillez votre salle à manger avec raffinement ! Cette grande nappe Hevoa Home & Co. de 150 × 250 cm illumine la table grâce à ses motifs floraux aquarelle très doux. Parfaite pour les repas de famille, réceptions et fêtes.',
    specs: [
      'Marque Hevoa Home & Co. · Dimensions : 150 × 250 cm',
      'Convient aux grandes tables rectangulaires de 6 à 8 personnes',
      'Motif floral aquarelle pastel (rose poudré, beige doré, jaune)',
      'Finitions ourlées soignées · Entretien facile'
    ],
    imageUrl: '/images/products/maison-nappe-hevoa-150x250-florale.jpg',
  },
  {
    id: 'maison-rideau-orca-140x270-taupe',
    slug: 'rideau-orca-creations-140x270cm-taupe-raye',
    name: 'Rideau Orca Créations 140×270 cm — Taupe à Fines Rayures',
    category: 'maison',
    price: 8500,
    compareAtPrice: 11500,
    stock: 12,
    badge: '140×270 cm',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Panneau de rideau prêt-à-poser Orca Créations 140×270 cm coloris taupe chic avec fines rayures verticales lumineuses.',
    description:
      'Apportez une atmosphère chaleureuse et moderne à votre salon ou chambre ! Ce rideau grande hauteur 140 × 270 cm de la gamme Orca Créations offre un tombé fluide dans une teinte taupe intemporelle facile à assortir.',
    specs: [
      'Marque Orca Créations · Dimensions : 140 × 270 cm',
      'Coloris taupe élégant à fines rayures verticales',
      'Prêt-à-poser pour fenêtres et baies vitrées',
      'Salon, chambre, bureau · Entretien facile'
    ],
    imageUrl: '/images/products/maison-rideau-orca-140x270-taupe.jpg',
  },
  {
    id: 'cuisine-lot-4-serviettes-table-coton',
    slug: 'lot-4-serviettes-de-table-coton-40x40cm-blanc-casse',
    name: 'Lot de 4 Serviettes de Table en Coton 40×40 cm — Blanc Cassé',
    category: 'maison',
    price: 4500,
    compareAtPrice: 5900,
    stock: 16,
    badge: '100% Coton',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Coffret rubané de 4 serviettes de table 40×40 cm en coton demi-blanc (blanc cassé) : élégance intemporelle pour vos repas.',
    description:
      'Complétez votre art de la table avec ce lot de 4 serviettes en coton blanc cassé (Réf. TC-5083J), présentées nouées d’un ruban assorti. Douces, absorbantes et lavables en machine, elles subliment vos dîners et réceptions.',
    specs: [
      'Lot de 4 serviettes de table · Dimensions : 40 × 40 cm',
      'Tissu coton demi-blanc (blanc cassé) doux et résistant',
      'Présentation élégante avec ruban · Réf. TC-5083J',
      'Lavables en machine · Idéal réceptions & usage quotidien'
    ],
    imageUrl: '/images/products/cuisine-lot-4-serviettes-table-coton.jpg',
  },
  {
    id: 'cuisine-lot-4-sets-table-ningxin',
    slug: 'lot-4-sets-de-table-tresses-ningxin-45x30cm-blanc-noir',
    name: 'Lot de 4 Sets de Table Tressés Ningxin 45×30 cm — Blanc & Rayures Noires',
    category: 'maison',
    price: 4500,
    compareAtPrice: 6000,
    stock: 14,
    badge: 'Lot de 4 Sets',
    featured: false,
    isHeavy: false,
    shortDescription:
      '4 sets de table tressés lavables 45×30 cm blancs à fines rayures noires pointillées : protègent et décorent votre table.',
    description:
      'Protégez votre table des taches et de la chaleur avec style ! Ces 4 sets de table Ningxin (45 × 30 cm) au tissage moderne blanc et noir s’essuient d’un simple coup d’éponge et s’accordent à toute votre vaisselle.',
    specs: [
      'Lot de 4 sets de table · Dimensions : 45 × 30 cm chacun',
      'Matière tressée résistante à la chaleur et anti-taches',
      'Design sobre blanc à fines rayures noires',
      'Nettoyage express à l’éponge humide'
    ],
    imageUrl: '/images/products/cuisine-lot-4-sets-table-ningxin.jpg',
  },
  {
    id: 'maison-lot-4-serviettes-bain-julie',
    slug: 'lot-4-serviettes-de-bain-eponge-julie-50x90cm',
    name: 'Lot de 4 Serviettes de Bain Éponge Julie (50×90 cm) — Dégradé Rose & Blanc',
    category: 'maison',
    price: 9500,
    compareAtPrice: 12500,
    stock: 10,
    badge: 'Lot de 4 Éponge',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Pack cadeau de 4 serviettes de toilette éponge épaisse 50×90 cm (gamme Julie) aux tons doux rose poudré, mauve et blanc.',
    description:
      'Offrez-vous la douceur d’un linge de bain de qualité ! Ce pack de 4 serviettes de toilette Julie (50 × 90 cm) en éponge moelleuse et très absorbante est présenté noué d’un ruban satin — parfait pour la salle de bain ou comme cadeau de mariage / pendaison de crémaillère.',
    specs: [
      'Lot de 4 serviettes de toilette · Dimensions : 50 × 90 cm',
      'Éponge épaisse, douce et hautement absorbante (gamme Julie)',
      'Assortiment harmonieux tons rose poudré / mauve / blanc',
      'Présentation ruban satin · Idéal maison ou cadeau'
    ],
    imageUrl: '/images/products/maison-lot-4-serviettes-bain-julie.jpg',
  },
  {
    id: 'cuisine-lot-3-bocaux-verre-argente',
    slug: 'lot-3-bocaux-verre-couvercle-metal-argente-gradues',
    name: 'Lot de 3 Bocaux en Verre Couvercle Métal Argenté à Vis (Grand, Moyen, Petit)',
    category: 'maison',
    price: 3500,
    compareAtPrice: 4900,
    stock: 14,
    badge: 'Trio de Bocaux',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Trio pratique de 3 bocaux en verre transparent de tailles graduées avec couvercles métalliques argentés hermétiques à vis.',
    description:
      'Un trio malin pour tout ranger dans la cuisine ! Ce lot réunit 3 bocaux en verre transparent (grand, moyen et petit format) munis de couvercles métalliques argentés brossés à vis pour garder café, sucre, pâtes, épices ou biscuits bien au sec.',
    specs: [
      'Lot de 3 tailles graduées : Grand + Moyen + Petit',
      'Verre transparent solide à large ouverture',
      'Couvercles métalliques argentés brossés à vis',
      'Café, sucre, riz, épices, biscuits · Faciles à laver'
    ],
    imageUrl: '/images/products/cuisine-lot-3-bocaux-verre-argente.jpg',
  },
  {
    id: 'cuisine-balance-digitale-decakila-5kg',
    slug: 'balance-de-cuisine-digitale-decakila-5kg-bol-transparent-kmtt092w',
    name: 'Balance de Cuisine Digitale Decakila 5 kg avec Bol Transparent — KMTT092W',
    category: 'maison',
    price: 14000,
    compareAtPrice: 17500,
    stock: 10,
    badge: 'Précision 1g',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Balance électronique de précision Decakila (2 g à 5 000 g) avec grand écran LCD rétroéclairé vert, fonction Tare et bol transparent inclus.',
    description:
      'Réussissez toutes vos pâtisseries, recettes et portions au gramme près ! La balance digitale Decakila KMTT092W pèse de 2 g jusqu’à 5 kg avec une précision de 1 g, dispose d’un écran LCD vert ultra lisible, de la fonction Tare et est livrée avec son bol doseur transparent amovible.',
    specs: [
      'Marque Decakila · Modèle KMTT092W · Portée 2 g à 5 000 g (5 kg)',
      'Haute précision au gramme près (1 g) · Fonction Tare',
      'Grand écran LCD rétroéclairé vert très lisible',
      'Bol transparent amovible inclus · Pâtisserie & cuisine quotidienne'
    ],
    imageUrl: '/images/products/cuisine-balance-digitale-decakila-5kg.jpg',
  },
  {
    id: 'cuisine-balance-decakila-kmtt091w-5kg',
    slug: 'balance-de-cuisine-digitale-decakila-5kg-plateau-plat-kmtt091w',
    name: 'Balance de Cuisine Digitale Decakila 5 kg Plateau Plat — KMTT091W',
    category: 'maison',
    price: 8000,
    compareAtPrice: 10500,
    stock: 14,
    badge: 'Précision 1g',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Balance électronique compacte Decakila KMTT091W (2 g à 5 000 g) à plateau plat, écran LCD et fonction Tare.',
    description:
      'Compacte, fiable et facile à ranger ! La balance digitale Decakila KMTT091W pèse tous vos ingrédients de 2 g à 5 kg avec une précision au gramme près, conversion g/oz et fonction Tare.',
    specs: [
      'Marque Decakila · Modèle KMTT091W · Portée 2 g à 5 000 g',
      'Précision 1 g · Fonction Tare et conversion d’unités',
      'Plateau de pesée plat compatible avec tous vos bols',
      'Design compact blanc et bleu · Facile à nettoyer'
    ],
    imageUrl: '/images/products/cuisine-balance-decakila-kmtt091w-5kg.jpg',
  },
  {
    id: 'cuisine-machine-popcorn-decakila-kett009r',
    slug: 'machine-a-popcorn-air-chaud-decakila-2-minutes-kett009r',
    name: 'Machine à Pop-Corn à Air Chaud Decakila — Prêt en 2 Minutes (KETT009R)',
    category: 'maison',
    price: 14500,
    compareAtPrice: 18500,
    stock: 10,
    badge: 'Sans Huile',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Préparez du pop-corn chaud, croustillant et sain sans huile en 2 minutes chrono pour toute la famille !',
    description:
      'Transformez vos soirées films en vrai cinéma à la maison ! La machine à pop-corn Decakila KETT009R fonctionne par circulation d’air chaud rapide sans aucune matière grasse, avec doseur intégré sur le couvercle.',
    specs: [
      'Marque Decakila · Modèle KETT009R (Rouge & Noir)',
      'Cuisson ultra rapide par air chaud en 2 minutes',
      'Sans huile ni beurre : pop-corn léger et sain',
      'Gobelet doseur intégré dans le couvercle supérieur'
    ],
    imageUrl: '/images/products/cuisine-machine-popcorn-decakila-kett009r.jpg',
  },
  {
    id: 'cuisine-hachoir-manuel-decakila-400ml',
    slug: 'hachoir-manuel-ficelle-decakila-400ml-ail-oignons-kmtt084w',
    name: 'Hachoir Manuel à Ficelle Decakila 400 ml — Ail, Oignons & Légumes (KMTT084W)',
    category: 'maison',
    price: 4500,
    compareAtPrice: 6000,
    stock: 18,
    badge: 'Sans Électricité',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Hachez ail, oignons, piment, persil et tomates en quelques secondes sans électricité grâce aux lames inox ultra tranchantes.',
    description:
      'Fini les larmes en coupant les oignons ! Tirez simplement sur la poignée verte du hachoir manuel Decakila 400 ml pour émincer ail, oignons, piments, herbes ou légumes en un clin d’œil, même en cas de coupure de courant.',
    specs: [
      'Marque Decakila · Modèle KMTT084W · Bol 400 ml sans BPA',
      'Lames en acier inoxydable 420 J2 ultra résistantes',
      'Fonctionnement 100 % manuel à ficelle, zéro électricité',
      'Démontable et facile à rincer · Idéal ail, oignon, piment'
    ],
    imageUrl: '/images/products/cuisine-hachoir-manuel-decakila-400ml.jpg',
  },
  {
    id: 'beaute-tondeuse-rowenta-nomad-tn1410f0',
    slug: 'tondeuse-cheveux-sans-fil-rowenta-nomad-tn1410f0',
    name: 'Tondeuse à Cheveux Sans Fil Rowenta Nomad — 20 Hauteurs (TN1410F0)',
    category: 'beaute-cadeaux',
    price: 24500,
    compareAtPrice: 29500,
    stock: 8,
    badge: 'Rowenta Original',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Tondeuse cheveux de haute précision Rowenta Nomad : lames inox conçues pour durer 15 ans, 20 hauteurs de coupe (1 à 30 mm) et 40 min d’autonomie.',
    description:
      'La fiabilité allemande Rowenta pour des coupes nettes à domicile ! La tondeuse Nomad TN1410F0 offre 20 réglages précis de 1 mm à 30 mm grâce à ses 2 sabots réglables et ses lames en acier inoxydable haute durabilité.',
    specs: [
      'Marque Rowenta · Modèle Nomad TN1410F0 (Original)',
      '20 hauteurs de coupe de haute précision (1 mm à 30 mm)',
      'Lames acier inoxydable conçues pour durer 15 ans',
      'Autonomie jusqu’à 40 min · 2 sabots réglables inclus'
    ],
    imageUrl: '/images/products/beaute-tondeuse-rowenta-nomad-tn1410f0.jpg',
  },
  {
    id: 'cuisine-set-7-ustensiles-decakila-kmtt046b',
    slug: 'set-7-ustensiles-de-cuisine-pot-rangement-decakila-kmtt046b',
    name: 'Set de 7 Ustensiles de Cuisine avec Pot de Rangement Decakila — KMTT046B',
    category: 'maison',
    price: 8000,
    compareAtPrice: 10500,
    stock: 14,
    badge: 'Set 7 Pièces',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Coffret complet de 6 ustensiles anti-rayures (louche, écumoire, spatule, cuillère à pâtes, pince, pinceau) + pot de rangement Decakila.',
    description:
      'Tout le nécessaire de cuisine toujours à portée de main ! Ce set Decakila 7 pièces réunit des ustensiles résistants à la chaleur qui n’abîment pas vos poêles antiadhésives, rangés dans un joli pot vert d’eau.',
    specs: [
      'Marque Decakila · Modèle KMTT046B (7 pièces au total)',
      'Louche, écumoire, spatule ajourée, cuillère à spaghettis, pince, pinceau + pot',
      'Poignées ergonomiques multicolores confortables',
      'Protège les revêtements antiadhésifs · Facile à laver'
    ],
    imageUrl: '/images/products/cuisine-set-7-ustensiles-decakila-kmtt046b.jpg',
  },
  {
    id: 'maison-defroisseur-vapeur-decakila-1500w',
    slug: 'defroisseur-vapeur-main-decakila-1500w-keen003w',
    name: 'Défroisseur Vapeur à Main Decakila 1500 W — 25 g/min (KEEN003W)',
    category: 'maison',
    price: 18500,
    compareAtPrice: 23500,
    stock: 10,
    badge: 'Vapeur 1500W',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Défroissez chemises, robes, boubous, costumes et rideaux directement sur cintre grâce à sa puissance 1500 W et son débit vapeur 25 g/min.',
    description:
      'Plus besoin de sortir la table à repasser ! Le défroisseur vapeur portable Decakila KEEN003W chauffe rapidement grâce à ses 1500 W et projette une vapeur puissante de 25 g/min qui lisse et rafraîchit tous les textiles délicats en quelques instants.',
    specs: [
      'Marque Decakila · Modèle KEEN003W · Puissance 1500 W',
      'Débit vapeur puissant 25 g/min · Préchauffage rapide',
      'Tête vapeur en acier inoxydable pour tous textiles',
      'Idéal chemises, robes, costumes, pagnes et rideaux'
    ],
    imageUrl: '/images/products/maison-defroisseur-vapeur-decakila-1500w.jpg',
  },
  {
    id: 'cuisine-contact-grill-decakila-2000w',
    slug: 'contact-grill-panini-barbecue-decakila-2000w-keec079m',
    name: 'Contact Grill & Panini Decakila 2000 W — Ouverture 180° Barbecue (KEEC079M)',
    category: 'maison',
    price: 47000,
    compareAtPrice: 54000,
    stock: 6,
    badge: '2000W · 180°',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Puissant grill électrique 2000 W avec grandes plaques antiadhésives 29×24 cm, thermostat réglable, minuterie et ouverture à plat 180° façon barbecue.',
    description:
      'Préparez paninis dorés, steaks juteux, poulet grillé, poissons et légumes rôtis à la maison ! Le Contact Grill Decakila KEEC079M développe 2000 W pour une saisie rapide, s’ouvre à 180° pour doubler la surface en mode barbecue de table, et intègre un thermostat multi-niveaux ainsi qu’une minuterie réglable.',
    specs: [
      'Marque Decakila · Modèle KEEC079M · Puissance 2000 W',
      'Grandes plaques antiadhésives 290 × 240 mm faciles à nettoyer',
      'Ouverture à plat 180° pour mode barbecue familial',
      'Thermostat réglable + minuterie intégrée + témoins lumineux'
    ],
    imageUrl: '/images/products/cuisine-contact-grill-decakila-2000w.jpg',
  },
  {
    id: 'maison-fer-vapeur-tefal-express-steam-2400w',
    slug: 'fer-a-repasser-vapeur-tefal-express-steam-2400w-fv2839e0',
    name: 'Fer à Repasser Vapeur Tefal Express Steam 2400 W — Semelle Céramique (FV2839E0)',
    category: 'maison',
    price: 28500,
    compareAtPrice: 34000,
    stock: 8,
    badge: 'Tefal 2400W',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Fer vapeur Tefal Express Steam 2400 W : semelle céramique Xglide ultra glissante, défroissage vertical, système anti-goutte et remplissage XL.',
    description:
      'Gagnez du temps sur votre repassage avec la référence Tefal ! Le Express Steam FV2839E0 allie 2400 W de puissance, une semelle céramique Xglide résistante aux rayures, une fonction défroissage vertical et un système anti-goutte pour un linge impeccable sans taches d’eau.',
    specs: [
      'Marque Tefal · Modèle Express Steam FV2839E0 · 2400 W',
      'Semelle céramique Xglide Diffusion anti-rayures',
      'Système anti-goutte + défroissage vertical efficace',
      'Large ouverture de remplissage XL · Réparable 10 ans'
    ],
    imageUrl: '/images/products/maison-fer-vapeur-tefal-express-steam-2400w.jpg',
  },
  {
    id: 'maison-fer-vapeur-ilux-il1688a',
    slug: 'fer-a-repasser-vapeur-ilux-il-1688a-bleu-blanc',
    name: 'Fer à Repasser Vapeur iLUX IL-1688A — Bleu & Blanc (Italian Design)',
    category: 'maison',
    price: 9500,
    compareAtPrice: 12500,
    stock: 15,
    badge: 'Petit prix',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Fer à repasser vapeur iLUX IL-1688A léger et maniable avec thermostat réglable, jet d’eau spray et semelle antiadhésive.',
    description:
      'Le luxe pas cher au quotidien ! Le fer à repasser vapeur iLUX IL-1688A offre un repassage fluide sur coton, lin, synthétique et pagnes grâce à son thermostat précis, son réservoir transparent bleu et sa fonction spray.',
    specs: [
      'Marque iLUX · Modèle IL-1688A (Italian Design)',
      'Fonctions vapeur réglable, spray et repassage à sec',
      'Thermostat multi-textiles + témoin lumineux de chauffe',
      'Semelle antiadhésive glisse facile'
    ],
    imageUrl: '/images/products/maison-fer-vapeur-ilux-il1688a.jpg',
  },
  {
    id: 'smart-fer-vapeur-stpfr-5101-2200w',
    slug: 'fer-a-repasser-vapeur-smart-technology-2200w-stpfr-5101',
    name: 'Fer à Repasser Vapeur SMART TECHNOLOGY 2200 W — STPFR-5101',
    category: 'maison',
    price: 12000,
    compareAtPrice: 16000,
    stock: 14,
    badge: 'SMART 2200W',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Fer à repasser vapeur puissant 2200 W SMART TECHNOLOGY STPFR-5101 avec grand réservoir bleu translucide, fonction spray et glisse rapide.',
    description:
      'Fini les plis, place à la perfection ! Ce fer à repasser vapeur SMART TECHNOLOGY de 2200 W chauffe vite et élimine les plis tenaces sur tous vos vêtements grâce à son débit vapeur régulier et sa prise en main ergonomique.',
    specs: [
      'Marque SMART TECHNOLOGY · Modèle STPFR-5101 · 2200 W',
      'Repassage vapeur, spray et à sec · Thermostat réglable',
      'Réservoir d’eau bleu translucide avec niveau MAX visible',
      'Cordon rotatif souple · Nouveau design ergonomique'
    ],
    imageUrl: '/images/products/smart-fer-vapeur-stpfr-5101-2200w.jpg',
  },
  {
    id: 'smart-bouilloire-verre-1-8l-stpe-991vl',
    slug: 'bouilloire-electrique-verre-smart-technology-1-8l-1500w-stpe-991vl',
    name: 'Bouilloire Électrique en Verre SMART TECHNOLOGY 1,8 L — 1500 W (STPE-991VL)',
    category: 'maison',
    price: 13500,
    compareAtPrice: 17500,
    stock: 12,
    badge: 'Verre 1,8L',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Élégante bouilloire électrique en verre borosilicate gradué 1,8 L (1500 W) avec base pivotante 360°, témoin lumineux et arrêt automatique.',
    description:
      'Alliez design moderne et ébullition rapide ! La bouilloire en verre SMART TECHNOLOGY STPE-991VL (1,8 L · 1500 W) dispose d’un corps en verre transparent gradué sain, d’une résistance cachée en acier inoxydable facile à nettoyer et d’une double sécurité anti-chauffe à sec.',
    specs: [
      'Marque SMART TECHNOLOGY · Modèle STPE-991VL · 1,8 L · 1500 W',
      'Corps en verre haute qualité gradué (0,5 L à 1,8 L)',
      'Élément chauffant dissimulé en acier inoxydable',
      'Arrêt automatique + protection anti-surchauffe + base 360°'
    ],
    imageUrl: '/images/products/smart-bouilloire-verre-1-8l-stpe-991vl.jpg',
  },
  {
    id: 'cuisine-bouilloire-ilux-lxk520-2l',
    slug: 'bouilloire-electrique-inox-ilux-2l-1500w-lxk-520',
    name: 'Bouilloire Électrique Inox iLUX 2,0 L — 1500 W (LXK-520)',
    category: 'maison',
    price: 9500,
    compareAtPrice: 12500,
    stock: 16,
    badge: 'Inox 2,0L',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Bouilloire familiale 2,0 L en acier inoxydable iLUX (1500 W) avec base pivotante 360°, arrêt automatique et protection anti-sec.',
    description:
      'Robuste, rapide et économique ! La bouilloire électrique iLUX LXK-520 de 2 litres en acier inoxydable fait bouillir votre eau en quelques minutes pour le café, le thé ou la cuisine quotidienne.',
    specs: [
      'Marque iLUX · Modèle LXK-520 · 2,0 L · 1500 W',
      'Corps en acier inoxydable avec résistance cachée',
      'Base pivotante 360° sans fil + arrêt automatique',
      'Protection anti-chauffe à sec · Touche d’ouverture couvercle'
    ],
    imageUrl: '/images/products/cuisine-bouilloire-ilux-lxk520-2l.jpg',
  },
  {
    id: 'cuisine-bouilloire-ilux-lxkbx180-1-8l',
    slug: 'bouilloire-electrique-sans-fil-ilux-inox-noir-1-8l-lxk-bx180',
    name: 'Bouilloire Électrique Sans Fil Inox & Noir iLUX 1,8 L — 1500 W (LXK-BX180)',
    category: 'maison',
    price: 10500,
    compareAtPrice: 13500,
    stock: 14,
    badge: 'Design Bicolore',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Bouilloire sans fil 1,8 L au design moderne bicolore inox & noir mat (1500 W), base 360°, arrêt auto et protection anti-sec.',
    description:
      'Une touche d’élégance sur votre plan de travail ! La bouilloire iLUX LXK-BX180 marie acier inoxydable et finition noire mate, avec une puissance de 1500 W pour une ébullition rapide et sécurisée.',
    specs: [
      'Marque iLUX · Modèle LXK-BX180 · 1,8 L · 1500 W',
      'Corps en acier inoxydable + finition noire mate élégante',
      'Base pivotante 360° + mise hors tension automatique',
      'Protection anti-sec + résistance cachée facile à nettoyer'
    ],
    imageUrl: '/images/products/cuisine-bouilloire-ilux-lxkbx180-1-8l.jpg',
  },
  {
    id: 'cuisine-robot-sans-fil-decakila-kmmg005b',
    slug: 'robot-culinaire-sans-fil-decakila-decaprime-200w-1-25l-kmmg005b',
    name: 'Robot Culinaire Sans Fil Decakila DecaPrime 200 W — 1,25 L Batterie 2000 mAh (KMMG005B)',
    category: 'maison',
    price: 42000,
    compareAtPrice: 49000,
    stock: 6,
    badge: 'Sans Fil 2000mAh',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Robot multifonction sans fil rechargeable (batterie 2000 mAh) : hache, râpe, tranche et mixe partout même sans courant ! Grand bol 1,25 L.',
    description:
      'La liberté totale en cuisine, même en cas de coupure d’électricité ! Le robot culinaire sans fil Decakila DecaPrime KMMG005B (200 W · batterie longue durée 2000 mAh) dispose d’un grand bol familial de 1,25 L, d’une lame hachoir inox, d’un disque râpeur/trancheur et d’un disque émulsionneur.',
    specs: [
      'Marque Decakila DecaPrime · Modèle KMMG005B · 200 W',
      '100 % sans fil : batterie rechargeable haute capacité 2000 mAh',
      'Grand bol familial 1,25 L avec cheminée d’alimentation',
      'Livré avec lame hachoir inox, disque à râper/trancher et émulsionneur'
    ],
    imageUrl: '/images/products/cuisine-robot-sans-fil-decakila-kmmg005b.jpg',
  },
  {
    id: 'cuisine-machine-popcorn-ilux-lxpm912',
    slug: 'machine-a-popcorn-electrique-ilux-2-5l-450w-lx-pm912',
    name: 'Machine à Pop-Corn Électrique iLUX 2,5 L — 450 W avec Bol de Service (LX-PM912)',
    category: 'maison',
    price: 16500,
    compareAtPrice: 21000,
    stock: 8,
    badge: 'Grand Bol 2,5L',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Machine à pop-corn familiale 2,5 L à plaque antiadhésive avec bras mélangeur motorisé et couvercle retournable servant de saladier.',
    description:
      'Des pop-corns gourmands sucrés ou salés comme à la fête foraine ! La machine iLUX LX-PM912 (450 W) cuit à l’huile avec son bras mélangeur motorisé anti-brûlure ; il suffit ensuite de retourner le couvercle transparent de 2,5 L pour servir directement !',
    specs: [
      'Marque iLUX · Modèle LX-PM912 · 450 W · Capacité 2,5 L',
      'Cuisson à l’huile sur plaque antiadhésive + bras mélangeur motorisé',
      'Couvercle transparent 2-en-1 servant de bol de service',
      'Pieds caoutchouc antidérapants · Nettoyage facile'
    ],
    imageUrl: '/images/products/cuisine-machine-popcorn-ilux-lxpm912.jpg',
  },
  {
    id: 'smart-mixeur-blender-incassable-2-5l-600w',
    slug: 'mixeur-blender-pro-incassable-smart-technology-2-5l-600w',
    name: 'Mixeur Blender Pro Incassable SMART TECHNOLOGY 2,5 L — 600 W Turbo',
    category: 'maison',
    price: 24500,
    compareAtPrice: 29500,
    stock: 10,
    badge: 'Bol Incassable 2,5L',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Blender puissant 600 W Turbo avec grand bol carré 2,5 L 100 % incassable, 6 lames inox ultra tranchantes et poussoir inclus.',
    description:
      'Conçu pour les préparations exigeantes du quotidien : smoothies, jus de gingembre, bissap, purées, pâtes et glace pilée ! Son moteur 600 W Turbo, ses 2 vitesses + fonction Pulse et son bol 2,5 L incassable en font un allié durable.',
    specs: [
      'Marque SMART TECHNOLOGY · Puissance Turbo 600 W',
      'Grand bol carré 2,5 L incassable avec bâton poussoir',
      '6 lames amovibles en acier inoxydable haute performance',
      '2 vitesses + fonction Pulse · Système de sécurité intégré'
    ],
    imageUrl: '/images/products/smart-mixeur-blender-incassable-2-5l-600w.jpg',
  },
  {
    id: 'cuisine-mixeur-ilux-lx375-2en1',
    slug: 'mixeur-blender-2en1-ilux-lx-375-1-5l-bol-incassable-moulin',
    name: 'Mixeur Blender 2-en-1 iLUX LX-375 — 1,5 L Bol Incassable + Moulin à Café (300 W)',
    category: 'maison',
    price: 15500,
    compareAtPrice: 19000,
    stock: 12,
    badge: '2-en-1 + Moulin',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Blender 2-en-1 iLUX LX-375 finition moderne : bol incassable 1,5 L, moulin à café/épices inclus, 4 vitesses + Pulse (300 W).',
    description:
      'Mixez vos jus et soupes et moulez vos épices ou grains de café avec un seul appareil ! Le mixeur 2-en-1 iLUX LX-375 dispose d’un bol incassable de 1,5 L, de 4 vitesses + mode Pulse et de pieds antidérapants.',
    specs: [
      'Marque iLUX · Modèle LX-375 · 300 W (Italian Design)',
      '2-en-1 : Bol blender incassable 1,5 L + Moulin à café/épices',
      '4 vitesses + fonction Pulse · Lames inox ultra tranchantes',
      'Couvercle anti-fuite avec bouchon doseur amovible'
    ],
    imageUrl: '/images/products/cuisine-mixeur-ilux-lx375-2en1.jpg',
  },
  {
    id: 'cuisine-blender-ilux-lx316-rouge',
    slug: 'blender-broyeur-2en1-ilux-lx-316-poignee-rouge-moulin',
    name: 'Blender & Broyeur 2-en-1 iLUX LX-316 — Bol Incassable Poignée Rouge + Moulin',
    category: 'maison',
    price: 14500,
    compareAtPrice: 18500,
    stock: 14,
    badge: '2-en-1 Incassable',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Mélangeur et broyeur 2-en-1 iLUX LX-316 (300 W) avec bol incassable à poignée rouge, moulin broyeur inclus et 2 vitesses + Pulse.',
    description:
      'Pratique et dynamique avec sa poignée rouge ergonomique ! Le blender & broyeur iLUX LX-316 réunit un grand bol incassable et un moulin sec pour broyer épices, arachides, café et préparer tous vos smoothies.',
    specs: [
      'Marque iLUX · Modèle LX-316 · 300 W (220-240 V)',
      '2-en-1 : Bol mélangeur incassable + Moulin broyeur inclus',
      '2 vitesses avec mode Impulsion (Pulse)',
      'Lame croisée en acier inoxydable'
    ],
    imageUrl: '/images/products/cuisine-blender-ilux-lx316-rouge.jpg',
  },
  {
    id: 'cuisine-mixeur-ilux-lx378-inox',
    slug: 'mixeur-2en1-finition-inox-ilux-lx-378-1-5l-moulin',
    name: 'Mixeur 2-en-1 Finition Inox iLUX LX-378 — 1,5 L Bol Incassable + Moulin (300 W)',
    category: 'maison',
    price: 16500,
    compareAtPrice: 21000,
    stock: 10,
    badge: 'Finition Inox',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Mixeur élégant finition inox brossé iLUX LX-378 à boutons poussoirs (4 vitesses + Pulse), bol incassable 1,5 L et moulin à café inclus.',
    description:
      'Alliez style inox et polyvalence en cuisine ! Le mixeur iLUX LX-378 offre 4 vitesses à boutons poussoirs + Pulse, un bol incassable de 1,5 L avec couvercle anti-fuite et un moulin à café/épices.',
    specs: [
      'Marque iLUX · Modèle LX-378 · 300 W · Finition Inox',
      'Bol transparent incassable 1,5 L + Moulin à café inclus',
      '4 vitesses + fonction Pause/Pulse à boutons poussoirs',
      'Lames ultra tranchantes + pieds antidérapants'
    ],
    imageUrl: '/images/products/cuisine-mixeur-ilux-lx378-inox.jpg',
  },
  {
    id: 'cuisine-blender-ilux-lx815p-1-5l',
    slug: 'blender-multifonction-ilux-lx-815p-1-5l-300w',
    name: 'Blender Multifonction iLUX LX-815P — 1,5 L · 300 W (Blanc & Gris)',
    category: 'maison',
    price: 12500,
    compareAtPrice: 16000,
    stock: 15,
    badge: 'Petit prix',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Blender simple, efficace et abordable : bol 1,5 L, 2 vitesses + fonction Pulse, lames inox amovibles faciles à nettoyer (300 W).',
    description:
      'L’essentiel pour réussir smoothies, jus frais, purées et sauces à petit prix ! Le blender iLUX LX-815P (1,5 L · 300 W) est équipé de lames amovibles en acier inoxydable pour un nettoyage ultra rapide.',
    specs: [
      'Marque iLUX · Modèle LX-815P · Capacité 1,5 L · 300 W',
      '2 vitesses + fonction Pulse',
      'Lames amovibles en acier inoxydable faciles à nettoyer',
      'Design sobre blanc & gris · Format compact'
    ],
    imageUrl: '/images/products/cuisine-blender-ilux-lx815p-1-5l.jpg',
  },
  {
    id: 'cuisine-blender-ilux-lx926-10vitesses',
    slug: 'blender-broyeur-10-vitesses-ilux-lx-926-inox-moulin',
    name: 'Blender & Broyeur 10 Vitesses iLUX LX-926 — Corps Inox + Moulin',
    category: 'maison',
    price: 19500,
    compareAtPrice: 24500,
    stock: 10,
    badge: '10 Vitesses Inox',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Blender puissant 10 vitesses + Pulse au corps en acier inoxydable brossé, livré avec son moulin broyeur pour café, épices et noix.',
    description:
      'Un contrôle parfait sur toutes vos textures grâce aux 10 vitesses à boutons poussoirs + mode Pulse ! Le blender iLUX LX-926 en finition acier inoxydable brossé est accompagné d’un moulin broyeur dédié pour les ingrédients secs.',
    specs: [
      'Marque iLUX · Modèle LX-926 (Italian Design)',
      '10 vitesses + fonction Pulse à boutons poussoirs',
      'Corps robuste finition acier inoxydable brossé',
      'Livré avec moulin broyeur (épices, café, arachides)'
    ],
    imageUrl: '/images/products/cuisine-blender-ilux-lx926-10vitesses.jpg',
  },
  {
    id: 'cuisine-mixeur-plongeant-4en1-ilux-lx05',
    slug: 'mixeur-plongeant-4en1-ilux-lx-05-fouet-hachoir-bol-doseur',
    name: 'Mixeur Plongeant 4-en-1 iLUX LX-05 — Hachoir, Fouet, Bol Doseur & Support Mural',
    category: 'maison',
    price: 15500,
    compareAtPrice: 19500,
    stock: 12,
    badge: 'Kit 4-en-1',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Coffret mixeur plongeant multifonction 4-en-1 iLUX LX-05 : pied mixeur inox, bol hachoir, fouet pâtisserie, verre doseur et support mural.',
    description:
      'Préparez soupes veloutées, mayonnaise maison, purées pour bébé, chantilly et légumes hachés avec un seul kit compact ! Le mixeur plongeant 4-en-1 iLUX LX-05 dispose de 2 vitesses, d’une lame en acier inoxydable et d’un pied détachable facile à laver.',
    specs: [
      'Marque iLUX · Modèle LX-05 (4-en-1, Italian Design)',
      'Moteur 2 vitesses rapide + lame en acier inoxydable',
      'Inclus : pied mixeur, bol hachoir, fouet inox, verre doseur, support mural',
      'Accessoires détachables · Prise en main ergonomique'
    ],
    imageUrl: '/images/products/cuisine-mixeur-plongeant-4en1-ilux-lx05.jpg',
  },
  {
    id: 'cuisine-batteur-main-decakila-7vitesses-kemx016w',
    slug: 'batteur-electrique-main-decakila-7-vitesses-120w-kemx016w',
    name: 'Batteur Électrique à Main Decakila 7 Vitesses — 120 W (KEMX016W)',
    category: 'maison',
    price: 14000,
    compareAtPrice: 17500,
    stock: 12,
    badge: '7 Vitesses',
    featured: false,
    isHeavy: false,
    shortDescription:
      'Batteur pâtissier 7 vitesses Decakila 120 W livré avec 2 fouets inox + 2 crochets pétrisseurs et bouton d’éjection rapide.',
    description:
      'Réussissez vos génoises, blancs en neige, crèmes fouettées et pâtes à gâteaux sans effort ! Léger et stable grâce à son design à poser debout, le batteur Decakila KEMX016W offre 7 vitesses progressives et 2 paires de tiges en acier inoxydable.',
    specs: [
      'Marque Decakila · Modèle KEMX016W · 120 W (220-240 V)',
      '7 vitesses réglables + bouton d’éjection rapide des fouets',
      '2 paires d’accessoires inox : fouets + crochets pétrisseurs',
      'Design stable à poser debout sur le plan de travail'
    ],
    imageUrl: '/images/products/cuisine-batteur-main-decakila-7vitesses-kemx016w.jpg',
  },
  {
    id: 'cuisine-batteur-socle-decakila-3-5l-kemx012b',
    slug: 'batteur-sur-socle-bol-inox-3-5l-decakila-250w-kemx012b',
    name: 'Batteur sur Socle avec Bol Inox 3,5 L Decakila 250 W — Noir (KEMX012B)',
    category: 'maison',
    price: 32000,
    compareAtPrice: 38000,
    stock: 8,
    badge: 'Bol Inox 3,5L',
    featured: true,
    isHeavy: false,
    shortDescription:
      'Robot batteur pâtissier sur socle Decakila 250 W avec grand bol inox 3,5 L, 5 vitesses + Turbo, 2 fouets et 2 crochets pétrisseurs.',
    description:
      'Gardez les mains libres pendant que vos pâtes à gâteaux, brioches, crèmes et meringues montent à la perfection ! Le batteur sur socle Decakila KEMX012B (250 W) combine un grand bol en acier inoxydable de 3,5 L, 5 vitesses + Turbo et un batteur détachable utilisable aussi à la main.',
    specs: [
      'Marque Decakila · Modèle KEMX012B · 250 W · Coloris Noir',
      'Grand bol pâtissier en acier inoxydable 3,5 Litres',
      '5 vitesses + fonction Turbo · Bouton d’éjection facile',
      'Livré avec 2 fouets inox + 2 crochets pétrisseurs'
    ],
    imageUrl: '/images/products/cuisine-batteur-socle-decakila-3-5l-kemx012b.jpg',
  },
];

export const INITIAL_PRODUCTS = [
  ...QUINCAILLERIE_BTP_PRODUCTS,
  ...BTP_ARRIVAGE_DEC2026_PRODUCTS,
  ...NOUVEAUTES_SMART_MOBILIER_PRODUCTS,
  ...MOTOS_TRICYCLES_PRODUCTS,
  ...SMART_TECHNOLOGY_PRODUCTS,
  ...JOUETS_ENFANTS_PRODUCTS,
  ...CUISINE_MAISON_PRODUCTS,
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

// ==============================================================================
// RECHERCHE MULTI-MOTS INSENSIBLE AUX ACCENTS (100% FIABLE SUR TOUS LES RAYONS)
// ==============================================================================
export function normalizeSearchText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function matchesProductSearch(product, rawQuery, categories = CATEGORIES) {
  const normalizedQuery = normalizeSearchText(rawQuery);
  if (!normalizedQuery) return true;
  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  const catObj = Array.isArray(categories)
    ? categories.find((c) => c.id === product?.category)
    : null;
  const haystack = normalizeSearchText(
    [
      product?.name,
      product?.shortDescription,
      product?.description,
      product?.badge,
      product?.slug,
      product?.category,
      catObj?.label,
      catObj?.shortLabel,
      Array.isArray(product?.specs) ? product.specs.join(' ') : '',
    ].join(' ')
  );
  return tokens.every((token) => haystack.includes(token));
}

