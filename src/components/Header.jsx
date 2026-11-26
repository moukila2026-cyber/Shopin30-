import React from 'react';
import {
  ShoppingCart,
  Search,
  MapPin,
  Heart,
  QrCode,
  Menu,
  X,
  Flame,
  MessageCircle,
  Check,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import { formatFcfa, matchesProductSearch } from '../../shared/catalog.js';
import { buildWhatsappServiceUrl } from '../lib/api.js';

export function Header({
  announcement,
  cartCount,
  favCount,
  searchQuery,
  onSearchChange,
  onOpenCart,
  onOpenTrack,
  activeCategory,
  categories,
  onSelectCategory,
  onlyFavorites,
  onToggleFavorites,
  onlyPromos,
  onTogglePromos,
  deliveryZones = [],
  selectedZoneId,
  onSelectZone,
  whatsappNumber,
  products = [],
  onSelectProduct,
}) {
  const [zoneModalOpen, setZoneModalOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [searchFocused, setSearchFocused] = React.useState(false);

  const currentZone =
    deliveryZones.find((z) => z.id === selectedZoneId) ||
    deliveryZones[0] || {
      shortName: 'Daloa Commune',
      fee: 1000,
      eta: 'Livraison 1h–3h',
    };

  // Suggestions d'autocomplétion instantanée (multi-mots, insensible aux accents)
  const suggestions = React.useMemo(() => {
    const q = (searchQuery || '').trim();
    if (!q) return [];
    return products
      .filter((p) => matchesProductSearch(p, q, categories))
      .slice(0, 8);
  }, [products, searchQuery, categories]);

  function scrollToCatalog() {
    document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <header className="sticky top-0 z-40 shadow-md">
        {/* 1. BARRE PRINCIPALE #131921 (Style Amazon) */}
        <div className="bg-[#131921] text-white">
          <div className="max-w-[1500px] mx-auto px-2 sm:px-4 py-2 flex items-center gap-2 sm:gap-3">
            {/* Bouton Menu Mobile */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-2 rounded-sm border border-transparent hover:border-white text-white cursor-pointer"
              aria-label="Ouvrir le menu des rayons"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo Pèrôkadô */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
                if (onlyPromos) onTogglePromos?.(false);
                if (onlyFavorites) onToggleFavorites?.(false);
                onSearchChange('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-2 py-1 rounded-sm border border-transparent hover:border-white shrink-0 transition"
            >
              <img
                src="/images/icon-512.png"
                alt="Logo Pèrôkadô"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-contain shrink-0 drop-shadow-sm"
              />
              <div className="leading-none">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                    pèrôkadô
                  </span>
                  <span className="text-xs font-bold text-[#FF9900]">.com</span>
                </div>
                <span className="block text-[10px] text-[#CCCCCC] font-medium">
                  Daloa & Expédition
                </span>
              </div>
            </a>

            {/* Sélecteur d'adresse / Zone de livraison style Amazon "Livrer à..." */}
            <button
              type="button"
              onClick={() => setZoneModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border border-transparent hover:border-white text-left shrink-0 cursor-pointer transition"
              title="Choisir votre ville ou quartier de livraison"
            >
              <MapPin className="w-4 h-4 text-white mt-2 shrink-0" />
              <div className="leading-tight">
                <span className="block text-[11px] text-[#CCCCCC]">
                  Livrer à · dès {formatFcfa(currentZone.fee)}
                </span>
                <span className="flex items-center gap-0.5 text-xs sm:text-sm font-bold text-white">
                  {currentZone.shortName}
                  <ChevronDown className="w-3.5 h-3.5 text-[#CCCCCC]" />
                </span>
              </div>
            </button>

            {/* GRANDE BARRE DE RECHERCHE CENTRALE COMBINÉE (Rayon + Input + Bouton Orange #FEBD69) */}
            <div className="hidden sm:flex flex-1 relative">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSearchFocused(false);
                  scrollToCatalog();
                }}
                className="flex w-full h-10 rounded-md overflow-hidden focus-within:ring-3 focus-within:ring-[#FF9900]"
              >
                <select
                  aria-label="Filtrer par rayon"
                  value={activeCategory}
                  onChange={(e) => {
                    onSelectCategory(e.target.value);
                    scrollToCatalog();
                  }}
                  className="bg-[#E6E6E6] hover:bg-[#D4D4D4] text-[#0F1111] text-xs font-medium px-2.5 border-r border-[#CDCDCD] focus:outline-none cursor-pointer max-w-[140px] truncate"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.shortLabel || cat.label}
                    </option>
                  ))}
                </select>

                <div className="relative flex-1 bg-white">
                  <input
                    type="search"
                    value={searchQuery}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Rechercher sur Pèrôkadô (perceuse INGCO, WC FRENCIA, pompe forage, sucrier inox, TV 58&quot;, moto Apsonic…)"
                    className="w-full h-full px-3.5 text-sm text-[#0F1111] placeholder:text-[#6F7373] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#FEBD69] hover:bg-[#F3A847] text-[#131921] px-4 flex items-center justify-center transition cursor-pointer"
                  aria-label="Rechercher"
                >
                  <Search className="w-5 h-5 stroke-[2.5]" />
                </button>
              </form>

              {/* Menu déroulant d'autocomplétion directe avec vignettes produit */}
              {searchFocused && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-11 bg-white text-[#0F1111] rounded-md shadow-2xl border border-[#D5D9D9] overflow-hidden z-50">
                  {suggestions.map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setSearchFocused(false);
                        onSelectProduct?.(prod);
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 hover:bg-[#F7FAFA] border-b border-[#EAEDED] last:border-none text-left cursor-pointer"
                    >
                      <img
                        src={prod.imageUrl}
                        alt=""
                        className="w-9 h-9 object-contain bg-white rounded border border-[#EAEDED] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-[#0F1111] truncate">
                          {prod.name}
                        </p>
                        <p className="text-[11px] text-[#565959] truncate">{prod.shortDescription}</p>
                      </div>
                      <span className="text-xs font-bold text-[#B12704] shrink-0">
                        {formatFcfa(prod.price)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Actions droites style Amazon : Favoris, Suivi QR, Panier */}
            <div className="flex items-center gap-0.5 sm:gap-1 ml-auto">
              {/* Favoris / Liste d'envies */}
              <button
                type="button"
                onClick={() => {
                  onToggleFavorites();
                  scrollToCatalog();
                }}
                className={`hidden xl:flex flex-col justify-center px-2.5 py-1 rounded-sm border transition cursor-pointer ${
                  onlyFavorites
                    ? 'border-[#FF9900] bg-[#232F3E]'
                    : 'border-transparent hover:border-white'
                }`}
              >
                <span className="text-[11px] text-[#CCCCCC] leading-none">Liste d’envies</span>
                <span className="text-xs font-bold text-white flex items-center gap-1 mt-0.5">
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      onlyFavorites || favCount > 0 ? 'fill-[#FF9900] text-[#FF9900]' : ''
                    }`}
                  />
                  Favoris ({favCount})
                </span>
              </button>

              {/* Retours & Commandes -> Suivi Colis Code QR */}
              <button
                type="button"
                onClick={onOpenTrack}
                className="flex flex-col justify-center px-2 sm:px-2.5 py-1 rounded-sm border border-transparent hover:border-white text-left cursor-pointer transition"
                title="Suivre ma marchandise en direct avec Référence ou Code QR"
              >
                <span className="hidden sm:block text-[11px] text-[#CCCCCC] leading-none">
                  Suivi en direct
                </span>
                <span className="text-xs font-bold text-white flex items-center gap-1 mt-0.5">
                  <QrCode className="w-4 h-4 text-[#FF9900]" />
                  <span>Commandes & QR</span>
                </span>
              </button>

              {/* Panier Amazon emblématique avec compteur orange */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative flex items-end gap-1 px-2.5 py-1.5 rounded-sm border border-transparent hover:border-white cursor-pointer transition"
                aria-label="Ouvrir le panier"
              >
                <div className="relative">
                  <ShoppingCart className="w-7 h-7 text-white" />
                  <span className="absolute -top-2 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-[#FF9900] text-[#131921] text-xs font-extrabold flex items-center justify-center">
                    {cartCount}
                  </span>
                </div>
                <span className="hidden md:inline text-xs font-bold text-white pb-0.5">Panier</span>
              </button>
            </div>
          </div>

          {/* Barre de recherche Mobile (< sm) */}
          <div className="sm:hidden px-2.5 pb-2.5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                scrollToCatalog();
              }}
              className="flex w-full h-10 rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#FF9900]"
            >
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Rechercher un article sur Pèrôkadô…"
                className="flex-1 px-3 text-sm text-[#0F1111] placeholder:text-[#6F7373] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#FEBD69] text-[#131921] px-3.5 flex items-center justify-center"
                aria-label="Rechercher"
              >
                <Search className="w-5 h-5 stroke-[2.5]" />
              </button>
            </form>
          </div>
        </div>

        {/* 2. SOUS-BARRE DE NAVIGATION #232F3E (Rayons, Ventes Flash, Tarifs, Wave) */}
        <div className="bg-[#232F3E] text-white text-xs sm:text-[13px]">
          <div className="max-w-[1500px] mx-auto px-2 sm:px-4 flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm font-bold border border-transparent hover:border-white shrink-0 cursor-pointer"
            >
              <Menu className="w-4 h-4" />
              <span>Tous les rayons</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSelectCategory('all');
                onTogglePromos?.(true);
                scrollToCatalog();
              }}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-sm font-bold shrink-0 border transition cursor-pointer ${
                onlyPromos
                  ? 'border-[#FF9900] text-[#FF9900] bg-[#131921]/40'
                  : 'border-transparent hover:border-white text-[#FF9900]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Ventes Flash & Promos</span>
            </button>

            {categories
              .filter((c) => c.id !== 'all')
              .map((cat) => {
                const isActive = !onlyFavorites && !onlyPromos && activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      if (onlyPromos) onTogglePromos?.(false);
                      onSelectCategory(cat.id);
                      scrollToCatalog();
                    }}
                    className={`px-2.5 py-1.5 rounded-sm font-medium shrink-0 border transition cursor-pointer ${
                      isActive
                        ? 'border-white bg-[#37475A] font-bold text-white'
                        : 'border-transparent hover:border-white text-white/95'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}

            <button
              type="button"
              onClick={onOpenTrack}
              className="px-2.5 py-1.5 rounded-sm border border-transparent hover:border-white text-white/95 shrink-0 cursor-pointer"
            >
              Suivre mon colis (QR)
            </button>

            <a
              href={buildWhatsappServiceUrl(whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-sm border border-transparent hover:border-white text-white/95 shrink-0 inline-flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Service Client</span>
            </a>

            {/* Badge Wave à droite sur grands écrans */}
            <div className="hidden xl:flex items-center gap-1.5 ml-auto pl-3 text-[11px] font-semibold text-[#A7E6FF] shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#009EE3]" />
              <span>Paiement Wave 100% sécurisé · Daloa dès 1 000 F</span>
            </div>
          </div>
        </div>

        {/* 3. Bandeau mobile de localisation ("Livrer à...") style Amazon App */}
        <button
          type="button"
          onClick={() => setZoneModalOpen(true)}
          className="md:hidden w-full bg-[#37475A] text-white px-3 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <MapPin className="w-3.5 h-3.5 text-[#FF9900] shrink-0" />
          <span className="truncate">
            Livrer à <strong>{currentZone.shortName}</strong> — Tarif de base{' '}
            <strong>{formatFcfa(currentZone.fee)}</strong> (selon taille/poids)
          </span>
          <ChevronDown className="w-3.5 h-3.5 ml-auto shrink-0" />
        </button>
      </header>

      {/* TIROIR LATÉRAL GAUCHE "TOUS LES RAYONS" STYLE AMAZON */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex bg-black/65"
          onClick={() => setDrawerOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-80 max-w-[86vw] bg-white h-full flex flex-col shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#232F3E] text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src="/images/icon-512.png"
                  alt=""
                  className="w-9 h-9 rounded-lg object-contain shrink-0"
                />
                <div>
                  <p className="font-bold text-sm">Bienvenue sur Pèrôkadô</p>
                  <p className="text-[11px] text-[#CCCCCC]">Daloa & Villes aux alentours</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-1 text-white hover:text-[#FF9900] cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 border-b border-[#EAEDED]">
              <p className="text-xs font-bold uppercase tracking-wider text-[#565959] mb-2">
                Tendances & Offres
              </p>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('all');
                  onTogglePromos?.(true);
                  setDrawerOpen(false);
                  scrollToCatalog();
                }}
                className="w-full text-left py-2.5 px-3 rounded hover:bg-[#EAEDED] text-sm font-semibold text-[#CC0C39] flex items-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4" />
                <span>Ventes Flash & Promotions</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onToggleFavorites();
                  setDrawerOpen(false);
                  scrollToCatalog();
                }}
                className="w-full text-left py-2.5 px-3 rounded hover:bg-[#EAEDED] text-sm text-[#0F1111] flex items-center justify-between cursor-pointer"
              >
                <span>Ma liste d’envies (Favoris)</span>
                <span className="text-xs font-bold bg-[#EAEDED] px-2 py-0.5 rounded-full">
                  {favCount}
                </span>
              </button>
            </div>

            <div className="p-4 border-b border-[#EAEDED]">
              <p className="text-xs font-bold uppercase tracking-wider text-[#565959] mb-2">
                Acheter par rayon
              </p>
              <div className="space-y-0.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      if (onlyPromos) onTogglePromos?.(false);
                      onSelectCategory(cat.id);
                      setDrawerOpen(false);
                      scrollToCatalog();
                    }}
                    className={`w-full text-left py-2.5 px-3 rounded text-sm flex items-center justify-between cursor-pointer ${
                      activeCategory === cat.id && !onlyPromos
                        ? 'bg-[#EAEDED] font-bold text-[#0F1111]'
                        : 'text-[#0F1111] hover:bg-[#F7FAFA]'
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 space-y-2 text-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-[#565959] mb-2">
                Aide & Suivi Colis
              </p>
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenTrack();
                }}
                className="w-full text-left py-2.5 px-3 rounded hover:bg-[#EAEDED] font-semibold text-[#007185] flex items-center gap-2 cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Suivre ma marchandise (Code QR)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  setZoneModalOpen(true);
                }}
                className="w-full text-left py-2.5 px-3 rounded hover:bg-[#EAEDED] text-[#0F1111] flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#565959]" />
                <span>Tarifs Daloa & Expédition ({currentZone.shortName})</span>
              </button>
              <a
                href={buildWhatsappServiceUrl(whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded hover:bg-[#EAEDED] text-[#0F1111] flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Contacter le Service Client</span>
              </a>
            </div>

            {announcement && (
              <div className="mt-auto p-4 bg-[#F7FAFA] border-t border-[#D5D9D9] text-[11px] text-[#565959]">
                {announcement}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODALE DE CHOIX DE L'EMPLACEMENT ("Choisissez votre lieu de livraison" style Amazon) */}
      {zoneModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={() => setZoneModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-lg max-w-md w-full overflow-hidden shadow-2xl border border-[#D5D9D9]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#F0F2F2] px-5 py-3.5 border-b border-[#D5D9D9] flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base text-[#0F1111]">
                Choisissez votre zone de livraison ou d’expédition
              </h3>
              <button
                type="button"
                onClick={() => setZoneModalOpen(false)}
                className="p-1 text-[#565959] hover:text-[#0F1111] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3 max-h-[75vh] overflow-y-auto">
              <p className="text-xs text-[#565959] leading-relaxed">
                Les frais et délais de livraison s’adaptent à votre localité.{' '}
                <strong className="text-[#0F1111]">Aucune livraison gratuite :</strong> le tarif
                affiché est le tarif de base et dépend de la taille et du poids de la marchandise.
              </p>

              <div className="space-y-2">
                {deliveryZones.map((z) => {
                  const selected = z.id === currentZone.id;
                  return (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => {
                        onSelectZone?.(z.id);
                        setZoneModalOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg border transition flex items-start justify-between gap-3 cursor-pointer ${
                        selected
                          ? 'border-[#007185] bg-[#EDFDFF] ring-1 ring-[#007185]'
                          : 'border-[#D5D9D9] hover:bg-[#F7FAFA]'
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#0F1111] flex items-center gap-1.5">
                          {selected && <Check className="w-4 h-4 text-[#007185] shrink-0" />}
                          <span>{z.shortName}</span>
                        </p>
                        <p className="text-[11px] text-[#565959] mt-0.5">{z.name}</p>
                        {z.eta && <p className="text-[11px] text-[#007600] mt-0.5">{z.eta}</p>}
                      </div>
                      <span className="text-sm font-extrabold text-[#B12704] shrink-0">
                        {formatFcfa(z.fee)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-[#EAEDED] text-[11px] text-[#565959]">
                Colis volumineux ou lourd ?{' '}
                <a
                  href={buildWhatsappServiceUrl(whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#007185] hover:text-[#C7511F] hover:underline font-semibold"
                >
                  Contactez le service client sur WhatsApp
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
