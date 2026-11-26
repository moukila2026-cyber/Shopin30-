import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  QrCode,
  Truck,
  MessageCircle,
  ArrowRight,
  Flame,
  ShieldCheck,
} from 'lucide-react';
import { formatFcfa } from '../../shared/catalog.js';
import { buildWhatsappServiceUrl } from '../lib/api.js';

const BANNERS = [
  {
    id: 'jouets-enfants',
    image: '/images/banners/banner-jouets-enfants.jpg',
    tag: 'NOUVEAU RAYON JOUETS, JEUX & ENFANTS — DALOA & CÔTE D’IVOIRE',
    title: 'Voiture F1 R/C Fumée, Motos à Construire, Caisses Enregistreuses & Loisirs Créatifs',
    subtitle:
      'Idées cadeaux dès 3 500 FCFA : Perles Heishi SentoSphère, UNO Spin, Dinettes Inox & Métal, Pistolets à eau électriques et Coloriage 38-en-1 Stitch. Paiement Wave & Suivi QR.',
    ctaLabel: 'Voir les 14 Jouets & Jeux Enfants',
    targetCategory: 'jouets-enfants',
    darkText: true,
  },
  {
    id: 'motos-tricycles',
    image: '/images/banners/banner-motos.jpg',
    tag: 'NOUVEAU RAYON MOTOS & TRICYCLES — DALOA & CÔTE D’IVOIRE',
    title: 'Apsonic, Haojue, Sania, TVS Rock Z, KTM, Royal Cross & Tricycles Cargo',
    subtitle:
      'Motos urbaines dès 400 000 FCFA, routières 125–200 cm³, Cross tout-terrain et Tricycles Cargo Apsonic. Paiement sécurisé Wave / Mobile Money & Suivi Code QR.',
    ctaLabel: 'Voir les 16 Motos & Tricycles',
    targetCategory: 'motos-tricycles',
    darkText: true,
  },
  {
    id: 'froid-lavage',
    image: '/images/banners/banner-maison.jpg',
    tag: 'OFFICIEL SMART TECHNOLOGY — DALOA & CÔTE D’IVOIRE',
    title: 'Réfrigérateurs ProSmart Inverter, Lave-Linge BLDC & Gazinières Inox',
    subtitle:
      'Équipez votre maison avec la gamme SMART TECHNOLOGY aux meilleurs prix du marché ivoirien. Paiement en ligne instantané & Suivi Code QR.',
    ctaLabel: 'Voir les Frigos & Vitrines SMART',
    targetCategory: 'froid',
    darkText: true,
  },
  {
    id: 'cuisine-smart',
    image: '/images/banners/banner-hightech.jpg',
    tag: 'CUISINE, MACHINES À FOUTOU & PROTECTION CIE',
    title: 'Micro-ondes 25L, Broyeurs à Foutou 1000W & Régulateurs AVR 2026',
    subtitle:
      'Des appareils robustes en stock immédiat à Daloa. Livraison Commune 1 000 F · Périphérie 1 500 F · Expédition Issia & Vavoua dès 2 000 F.',
    ctaLabel: 'Voir Petit Électroménager SMART',
    targetCategory: 'maison',
    darkText: false,
  },
  {
    id: 'mode-cadeaux',
    image: '/images/banners/banner-mode-cadeaux.jpg',
    tag: 'HIGH-TECH, MODE & COFFRETS CADEAUX',
    title: 'Smartphones, Audio Bluetooth, Parfums Prestige & Idées Cadeaux',
    subtitle:
      'Commandez en ligne en quelques secondes (Wave / Mobile Money) et suivez votre marchandise en direct par Code QR.',
    ctaLabel: 'Découvrir High-Tech & Cadeaux',
    targetCategory: 'high-tech',
    darkText: true,
  },
];

export function Hero({
  products = [],
  whatsappNumber,
  onSelectCategory,
  onSelectProduct,
  onOpenPromos,
  onOpenTrack,
}) {
  const [slideIndex, setSlideIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % BANNERS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = BANNERS[slideIndex];

  // Sélection de vignettes produits par rayon pour les 4 cartes style Amazon
  const pickByCategory = (catId, count = 4) =>
    products.filter((p) => p.category === catId).slice(0, count);

  const motosItems = pickByCategory('motos-tricycles', 4);
  const allMotos = products.filter((p) => p.category === 'motos-tricycles');
  const allJouets = products.filter((p) => p.category === 'jouets-enfants');
  const froidItems = pickByCategory('froid', 4);
  const lavageCuissonItems = pickByCategory('lavage-cuisson', 4);
  const maisonItems = pickByCategory('maison', 4);

  const topDeals = products
    .filter((p) => p.compareAtPrice && p.compareAtPrice > p.price)
    .sort((a, b) => (b.compareAtPrice - b.price) / b.compareAtPrice - (a.compareAtPrice - a.price))
    .slice(0, 10);

  const scrollToCatalog = () => {
    document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="max-w-[1500px] w-full mx-auto">
      {/* 1. CARROUSEL BANNIÈRE PLEINE LARGEUR AVEC FONDU DÉGRADÉ BAS (Style Amazon) */}
      <div className="relative overflow-hidden">
        <div className="relative h-[300px] sm:h-[390px] lg:h-[460px] w-full">
          <img
            key={currentSlide.id}
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover object-center transition-opacity duration-500"
          />

          {/* Voile latéral gauche pour lisibilité parfaite du texte + fondu vers #EAEDED en bas */}
          <div
            className={`absolute inset-0 ${
              currentSlide.darkText
                ? 'bg-gradient-to-r from-white/95 via-white/75 to-transparent'
                : 'bg-gradient-to-r from-[#131921]/95 via-[#131921]/70 to-transparent'
            }`}
          />
          <div className="absolute inset-x-0 bottom-0 h-28 sm:h-40 bg-gradient-to-t from-[#EAEDED] via-[#EAEDED]/75 to-transparent pointer-events-none" />

          {/* Contenu éditorial de la bannière */}
          <div className="absolute inset-0 flex items-start sm:items-center pb-20 sm:pb-28 px-6 sm:px-14 lg:px-20">
            <div className="max-w-xl space-y-2.5 sm:space-y-3.5 pt-6 sm:pt-0">
              <span
                className={`inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-xs ${
                  currentSlide.darkText
                    ? 'bg-[#CC0C39] text-white'
                    : 'bg-[#FF9900] text-[#131921]'
                }`}
              >
                {currentSlide.tag}
              </span>
              <h1
                className={`text-xl sm:text-3xl lg:text-4xl font-extrabold leading-tight ${
                  currentSlide.darkText ? 'text-[#0F1111]' : 'text-white'
                }`}
              >
                {currentSlide.title}
              </h1>
              <p
                className={`text-xs sm:text-sm leading-relaxed hidden sm:block ${
                  currentSlide.darkText ? 'text-[#333333]' : 'text-[#E6E6E6]'
                }`}
              >
                {currentSlide.subtitle}
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory?.(currentSlide.targetCategory);
                    scrollToCatalog();
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[#0F1111] text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer"
                >
                  <span>{currentSlide.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onOpenTrack}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold border transition cursor-pointer ${
                    currentSlide.darkText
                      ? 'bg-white/90 hover:bg-white border-[#D5D9D9] text-[#0F1111]'
                      : 'bg-[#232F3E]/90 hover:bg-[#232F3E] border-white/30 text-white'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-[#FF9900]" />
                  <span>Suivi Colis QR</span>
                </button>
              </div>
            </div>
          </div>

          {/* Flèches Gauche / Droite style Amazon */}
          <button
            type="button"
            onClick={() => setSlideIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length)}
            className="hidden sm:flex absolute left-2 top-1/3 -translate-y-1/2 w-11 h-20 rounded items-center justify-center bg-white/30 hover:bg-white/70 border border-white/50 text-[#0F1111] shadow transition cursor-pointer"
            aria-label="Bannière précédente"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            type="button"
            onClick={() => setSlideIndex((prev) => (prev + 1) % BANNERS.length)}
            className="hidden sm:flex absolute right-2 top-1/3 -translate-y-1/2 w-11 h-20 rounded items-center justify-center bg-white/30 hover:bg-white/70 border border-white/50 text-[#0F1111] shadow transition cursor-pointer"
            aria-label="Bannière suivante"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>

        {/* 2. RANGÉE DE 4 CARTES CATÉGORIES CHEVAUCHANT LA BANNIÈRE (-mt-16 / -mt-28) COMME SUR AMAZON */}
        <div className="relative z-10 -mt-14 sm:-mt-24 px-3 sm:px-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* CARTE 1 : Motos & Tricycles Cargo */}
          <div className="bg-white p-5 border border-[#D5D9D9]/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <h2 className="text-lg font-bold text-[#0F1111]">Motos & Tricycles Cargo</h2>
                <span className="px-2 py-0.5 rounded-xs bg-[#CC0C39] text-white text-[10px] font-extrabold shrink-0">
                  NOUVEAU
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {motosItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectProduct?.(item)}
                    className="text-left group cursor-pointer"
                  >
                    <div className="aspect-square bg-[#F7F8F8] rounded-xs p-2 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition duration-200 mix-blend-multiply"
                      />
                    </div>
                    <p className="text-[11px] text-[#0F1111] mt-1 line-clamp-1 font-medium group-hover:text-[#C7511F]">
                      {item.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onSelectCategory?.('motos-tricycles');
                scrollToCatalog();
              }}
              className="mt-4 text-xs font-semibold text-[#007185] hover:text-[#C7511F] hover:underline text-left cursor-pointer"
            >
              Voir les {allMotos.length || 16} Motos & Tricycles
            </button>
          </div>

          {/* CARTE 2 : Réfrigérateurs & Vitrines SMART TECHNOLOGY */}
          <div className="bg-white p-5 border border-[#D5D9D9]/80 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#0F1111] mb-3">Réfrigérateurs & Vitrines SMART</h2>
              <div className="grid grid-cols-2 gap-3">
                {froidItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectProduct?.(item)}
                    className="text-left group cursor-pointer"
                  >
                    <div className="aspect-square bg-[#F7F8F8] rounded-xs p-2 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition duration-200"
                      />
                    </div>
                    <p className="text-[11px] text-[#0F1111] mt-1 line-clamp-1 font-medium group-hover:text-[#C7511F]">
                      {item.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onSelectCategory?.('froid');
                scrollToCatalog();
              }}
              className="mt-4 text-xs font-semibold text-[#007185] hover:text-[#C7511F] hover:underline text-left cursor-pointer"
            >
              Voir tous les Frigos & Vitrines
            </button>
          </div>

          {/* CARTE 3 : Lave-linge & Gazinières SMART TECHNOLOGY */}
          <div className="bg-white p-5 border border-[#D5D9D9]/80 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#0F1111] mb-3">Lave-Linge & Gazinières Inox</h2>
              <div className="grid grid-cols-2 gap-3">
                {lavageCuissonItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectProduct?.(item)}
                    className="text-left group cursor-pointer"
                  >
                    <div className="aspect-square bg-[#F7F8F8] rounded-xs p-2 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition duration-200"
                      />
                    </div>
                    <p className="text-[11px] text-[#0F1111] mt-1 line-clamp-1 font-medium group-hover:text-[#C7511F]">
                      {item.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onSelectCategory?.('lavage-cuisson');
                scrollToCatalog();
              }}
              className="mt-4 text-xs font-semibold text-[#007185] hover:text-[#C7511F] hover:underline text-left cursor-pointer"
            >
              Voir Lavage & Cuisinières SMART
            </button>
          </div>

          {/* CARTE 4 : Carte Service Pèrôkadô (Paiement Wave + Tarifs Livraison + Suivi QR) */}
          <div className="flex flex-col gap-4">
            <div className="bg-white p-5 border border-[#D5D9D9]/80 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h2 className="text-base font-bold text-[#0F1111]">
                  Paiement Wave & Suivi Code QR
                </h2>
                <span className="px-2 py-0.5 rounded bg-[#009EE3] text-white text-[10px] font-extrabold">
                  WAVE
                </span>
              </div>
              <p className="text-xs text-[#565959] leading-relaxed mb-3">
                Réglez en ligne uniquement par <strong>Wave</strong> et recevez immédiatement votre
                référence + <strong>Code QR</strong> pour suivre votre marchandise en direct.
              </p>
              <button
                type="button"
                onClick={onOpenTrack}
                className="w-full py-2 px-4 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-xs font-bold text-[#0F1111] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Suivre une commande en direct</span>
              </button>
            </div>

            <div className="bg-white p-5 border border-[#D5D9D9]/80 shadow-xs flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#0F1111] flex items-center gap-1.5 mb-2">
                  <Truck className="w-4 h-4 text-[#C7511F]" />
                  <span>Grille Livraison & Expédition</span>
                </h3>
                <ul className="text-xs text-[#0F1111] space-y-1.5">
                  <li className="flex justify-between border-b border-[#EAEDED] pb-1">
                    <span className="text-[#565959]">Daloa Commune</span>
                    <strong className="font-bold">1 000 FCFA</strong>
                  </li>
                  <li className="flex justify-between border-b border-[#EAEDED] pb-1">
                    <span className="text-[#565959]">Daloa Périphérie</span>
                    <strong className="font-bold">1 500 FCFA</strong>
                  </li>
                  <li className="flex justify-between border-b border-[#EAEDED] pb-1">
                    <span className="text-[#565959]">Issia, Vavoua & alentours</span>
                    <strong className="font-bold">2 000 FCFA</strong>
                  </li>
                  <li className="flex justify-between pt-0.5 text-[#B12704]">
                    <span className="font-semibold">Motos, Frigos & Lave-linge</span>
                    <strong className="font-bold">2 500 F / 5 000 F</strong>
                  </li>
                </ul>
                <p className="text-[11px] text-[#565959] mt-2 leading-snug">
                  Aucune livraison gratuite. Produits lourds : 2 500 F (Daloa) · 5 000 F (Expédition).
                </p>
              </div>
              <a
                href={buildWhatsappServiceUrl(whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-[#007185] hover:text-[#C7511F] hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Contacter le service client</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2B. SECTION DÉDIÉE JOUETS, JEUX & UNIVERS ENFANTS PÈRÔKADÔ */}
      {allJouets.length > 0 && (
        <div id="section-jouets" className="mt-5 px-3 sm:px-6">
          <div className="bg-white p-5 border border-[#D5D9D9]/80 shadow-xs">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#CC0C39] text-white text-[11px] font-extrabold px-2 py-0.5 rounded-xs tracking-wide">
                  NOUVEAU RAYON JOUETS & ENFANTS
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[#0F1111]">
                  Jouets, Jeux de Société, Construction STEM, Dinettes & Idées Cadeaux Enfants
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory?.('jouets-enfants');
                  scrollToCatalog();
                }}
                className="text-xs sm:text-sm font-semibold text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer"
              >
                Ouvrir tout le rayon Jouets & Enfants ({allJouets.length}) →
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {allJouets.map((toy) => (
                <button
                  key={toy.id}
                  type="button"
                  onClick={() => onSelectProduct?.(toy)}
                  className="w-48 sm:w-56 shrink-0 text-left group border border-[#EAEDED] hover:border-[#FF9900] rounded-md p-3 bg-white transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="h-40 sm:h-44 bg-[#F7F8F8] rounded-xs p-2.5 flex items-center justify-center overflow-hidden mb-2.5 relative">
                      {toy.badge && (
                        <span className="absolute top-1.5 left-1.5 bg-[#232F3E] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs">
                          {toy.badge}
                        </span>
                      )}
                      <img
                        src={toy.imageUrl}
                        alt={toy.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-200 mix-blend-multiply"
                      />
                    </div>
                    <p className="text-xs font-semibold text-[#0F1111] line-clamp-2 group-hover:text-[#C7511F] leading-snug">
                      {toy.name}
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-[#F0F2F2]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-extrabold text-[#B12704]">
                        {formatFcfa(toy.price)}
                      </span>
                      {toy.compareAtPrice > toy.price && (
                        <span className="text-[11px] text-[#565959] line-through">
                          {formatFcfa(toy.compareAtPrice)}
                        </span>
                      )}
                    </div>
                    <span className="block text-[11px] text-[#007600] font-medium mt-0.5">
                      En stock · Livraison dès 1 000 F
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2C. SECTION DÉDIÉE MOTOS & TRICYCLES CARGO PÈRÔKADÔ */}
      {allMotos.length > 0 && (
        <div id="section-motos" className="mt-5 px-3 sm:px-6">
          <div className="bg-white p-5 border border-[#D5D9D9]/80 shadow-xs">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#232F3E] text-[#FF9900] text-[11px] font-extrabold px-2 py-0.5 rounded-xs tracking-wide">
                  ESPACE MOTOS & TRICYCLES
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[#0F1111]">
                  Motos Neuves & Tricycles Cargo (Apsonic, Haojue, Sania, TVS, KTM & Royal)
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory?.('motos-tricycles');
                  scrollToCatalog();
                }}
                className="text-xs sm:text-sm font-semibold text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer"
              >
                Ouvrir tout le rayon Motos & Tricycles ({allMotos.length}) →
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {allMotos.map((moto) => (
                <button
                  key={moto.id}
                  type="button"
                  onClick={() => onSelectProduct?.(moto)}
                  className="w-48 sm:w-56 shrink-0 text-left group border border-[#EAEDED] hover:border-[#FF9900] rounded-md p-3 bg-white transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="h-40 sm:h-44 bg-[#F7F8F8] rounded-xs p-2.5 flex items-center justify-center overflow-hidden mb-2.5 relative">
                      {moto.badge && (
                        <span className="absolute top-1.5 left-1.5 bg-[#232F3E] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs">
                          {moto.badge}
                        </span>
                      )}
                      <img
                        src={moto.imageUrl}
                        alt={moto.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-200 mix-blend-multiply"
                      />
                    </div>
                    <p className="text-xs font-semibold text-[#0F1111] line-clamp-2 group-hover:text-[#C7511F] leading-snug">
                      {moto.name}
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-[#F0F2F2]">
                    <span className="block text-sm font-extrabold text-[#B12704]">
                      {formatFcfa(moto.price)}
                    </span>
                    <span className="block text-[11px] text-[#007600] font-medium mt-0.5">
                      En stock · Livraison Daloa & CI
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. RAIL HORIZONTAL "VENTES FLASH DU JOUR" STYLE AMAZON */}
      {topDeals.length > 0 && (
        <div className="mt-5 px-3 sm:px-6">
          <div className="bg-white p-5 border border-[#D5D9D9]/80 shadow-xs">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F1111] flex items-center gap-1.5">
                  <Flame className="w-5 h-5 text-[#CC0C39] fill-[#CC0C39]" />
                  <span>Ventes Flash & Meilleures Offres à Daloa</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  onOpenPromos?.();
                  scrollToCatalog();
                }}
                className="text-xs sm:text-sm font-semibold text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer"
              >
                Voir toutes les promotions
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {topDeals.map((prod) => {
                const pct = Math.round(
                  ((prod.compareAtPrice - prod.price) / prod.compareAtPrice) * 100
                );
                return (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => onSelectProduct?.(prod)}
                    className="w-44 sm:w-52 shrink-0 text-left group cursor-pointer"
                  >
                    <div className="h-40 sm:h-44 bg-[#F7F8F8] rounded-xs p-3 flex items-center justify-center overflow-hidden mb-2">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-200"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="bg-[#CC0C39] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-xs">
                        -{pct}%
                      </span>
                      <span className="text-[11px] font-bold text-[#CC0C39]">Offre limitée</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-bold text-[#0F1111]">
                        {formatFcfa(prod.price)}
                      </span>
                      <span className="text-[11px] text-[#565959] line-through">
                        {formatFcfa(prod.compareAtPrice)}
                      </span>
                    </div>
                    <p className="text-xs text-[#0F1111] line-clamp-1 mt-0.5 group-hover:text-[#C7511F]">
                      {prod.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
