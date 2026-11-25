// ==============================================================================
// PÈRÔKADÔ — Catalogue officiel (Gamme Électroménager SMART TECHNOLOGY + rayons),
// catégories, zones de livraison Daloa & expédition sans gratuité
// ==============================================================================

export const BRAND = {
  name: 'Pèrôkadô',
  tagline: 'Motos & Tricycles, Électroménager SMART TECHNOLOGY, High-Tech & Maison à Daloa',
  shortDescription:
    'Motos neuves & Tricycles Cargo (Apsonic, Haojue, Sanya, TVS, KTM, Royal), Électroménager SMART TECHNOLOGY garanti, High-Tech, Mode et Cadeaux livrés à Daloa et expédiés partout en Côte d’Ivoire.',
  city: 'Daloa, Côte d’Ivoire',
  defaultWhatsapp: '2250501303343',
  defaultWavePhone: '05 01 30 33 43',
  defaultWavePaymentUrl: '',
  shippingDisclaimer:
    'Aucune livraison gratuite. Colis standards : Daloa Commune 1 000 F · Périphérie 1 500 F · Expédition hors Daloa 2 000 F. Produits lourds & volumineux (motos, tricycles, lave-linge, gazinières, réfrigérateurs, vitrines…) : 2 500 F dans Daloa et 5 000 F en expédition hors de Daloa.',
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
  { id: 'motos-tricycles', label: 'Motos & Tricycles Cargo', shortLabel: 'Motos & Tricycles' },
  { id: 'froid', label: 'Réfrigérateurs & Vitrines SMART', shortLabel: 'Frigos & Froid' },
  { id: 'lavage-cuisson', label: 'Lave-linge & Cuisinières SMART', shortLabel: 'Lavage & Gazinières' },
  { id: 'maison', label: 'Petit Électroménager & Maison', shortLabel: 'Cuisine & Maison' },
  { id: 'high-tech', label: 'High-Tech & Téléphonie', shortLabel: 'High-Tech' },
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

// Paiement en ligne instantané (SasPay : Wave, Orange Money, MTN MoMo, Moov, Carte · ou Wave direct)
export const PAYMENT_METHODS = [
  {
    id: 'wave',
    label: 'Paiement en ligne instantané (Wave / Mobile Money via SasPay)',
    description:
      'Réglez en ligne en toute sécurité (Wave, Orange Money, MTN, Moov ou Carte via SasPay) et obtenez immédiatement votre référence avec Code QR de suivi en direct.',
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

export const INITIAL_PRODUCTS = [
  ...MOTOS_TRICYCLES_PRODUCTS,
  ...SMART_TECHNOLOGY_PRODUCTS,
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
  /\b(moto|motos|tricycle|tricycles|scooter|lave[\s-]?linge|lavante|machine\s+[aà]\s+laver|gazini[eè]re|cuisini[eè]re|r[eé]frig[eé]rateur|frigo|cong[eé]lateur|vitrine\s+r[eé]frig[eé]r[eé]e|climatiseur|split\s+\d|lave[\s-]?vaisselle)\b/i;

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

