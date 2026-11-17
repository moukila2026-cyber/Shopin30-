import React from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Menu,
  X,
} from 'lucide-react';

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
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5DEC9] bg-[#FAF7F0]/95 backdrop-blur-md">
      {/* Bandeau d'annonce haut */}
      {announcement && (
        <div className="bg-[#0F443E] text-[#FAF7F0] text-xs sm:text-sm py-2 px-4 text-center font-medium">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E0A11B] animate-pulse" />
            {announcement}
          </span>
        </div>
      )}

      {/* Barre principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-3">
          {/* Logo Pèrôkadô */}
          <a
            href="#catalogue"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('all');
              if (onlyFavorites) onToggleFavorites();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 shrink-0 group focus:outline-none"
            aria-label="Accueil Pèrôkadô"
          >
            <img
              src="/images/logo-horizontal.png"
              alt="Logo Pèrôkadô"
              className="h-11 sm:h-13 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </a>

          {/* Recherche bureau */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#0F443E]/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Rechercher un téléphone, parfum, cadeau, blender…"
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#DED6C1] text-sm text-[#14231F] placeholder:text-stone-400 focus:outline-none focus:border-[#0F443E] focus:ring-2 focus:ring-[#0F443E]/15 transition"
              />
            </div>
          </div>

          {/* Actions rapides */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-[#0F443E] bg-[#0F443E]/8 px-3 py-1.5 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-[#D95D24]" />
              <span>Daloa & Alentours</span>
            </div>

            <button
              type="button"
              onClick={onOpenTrack}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs sm:text-sm font-medium text-[#0F443E] hover:bg-[#0F443E]/10 transition cursor-pointer"
              title="Suivre ma commande"
            >
              <PackageCheck className="w-4 h-4 text-[#D95D24]" />
              <span className="hidden sm:inline">Suivi commande</span>
            </button>

            <button
              type="button"
              onClick={onToggleFavorites}
              className={`relative inline-flex items-center justify-center p-2.5 rounded-full transition cursor-pointer ${
                onlyFavorites
                  ? 'bg-[#D95D24] text-white'
                  : 'text-[#0F443E] hover:bg-[#0F443E]/10'
              }`}
              aria-label="Mes favoris"
              title="Voir mes favoris"
            >
              <Heart className={`w-5 h-5 ${onlyFavorites ? 'fill-current' : ''}`} />
              {favCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 px-1 rounded-full bg-[#D95D24] text-white text-[10px] font-bold flex items-center justify-center border border-[#FAF7F0]">
                  {favCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-full bg-[#0F443E] hover:bg-[#092E2A] text-white text-sm font-semibold shadow-sm transition cursor-pointer"
              aria-label="Ouvrir le panier"
            >
              <ShoppingBag className="w-4 h-4 text-[#E0A11B]" />
              <span className="hidden sm:inline">Panier</span>
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[#D95D24] text-white text-xs font-bold">
                {cartCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-[#0F443E] hover:bg-[#0F443E]/10"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Recherche mobile */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#0F443E]/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Que recherchez-vous aujourd'hui ?"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#DED6C1] text-sm text-[#14231F] placeholder:text-stone-400 focus:outline-none focus:border-[#0F443E]"
            />
          </div>
        </div>

        {/* Navigation par catégories */}
        <nav
          aria-label="Catégories"
          className={`${
            mobileMenuOpen ? 'flex flex-col pb-3 gap-1' : 'hidden md:flex items-center gap-2 pb-3 overflow-x-auto'
          }`}
        >
          {categories.map((cat) => {
            const active = activeCategory === cat.id && !onlyFavorites;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition cursor-pointer text-left ${
                  active
                    ? 'bg-[#D95D24] text-white shadow-xs'
                    : 'bg-white/70 hover:bg-white text-[#14231F] border border-[#E5DEC9]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
          <div className="hidden lg:flex ml-auto items-center gap-1.5 text-xs text-stone-600">
            <ShieldCheck className="w-4 h-4 text-[#0F443E]" />
            <span>Paiement à la livraison après vérification</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
