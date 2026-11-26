import React from 'react';
import {
  SlidersHorizontal,
  Flame,
  AlertTriangle,
  RotateCcw,
  Check,
  Truck,
  QrCode,
} from 'lucide-react';
import {
  CATEGORIES,
  DELIVERY_ZONES,
  BRAND,
  INITIAL_PRODUCTS,
  matchesProductSearch,
} from '../shared/catalog.js';
import { apiFetch } from './lib/api.js';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { ProductCard, ProductDetailModal } from './components/ProductCard.jsx';
import { CartDrawer } from './components/CartDrawer.jsx';
import { OrderTrackerModal } from './components/OrderTrackerModal.jsx';
import { Footer } from './components/Footer.jsx';
import {
  CookieConsentBanner,
  LegalModal,
  readCookieConsent,
  saveCookieConsent,
} from './components/LegalAndCookies.jsx';

const CART_STORAGE_KEY = 'pkd_cart_v1';
const FAV_STORAGE_KEY = 'pkd_favs_v1';
const ZONE_STORAGE_KEY = 'pkd_zone_v1';

const PRICE_RANGES = [
  { id: 'all', label: 'Tous les prix', min: 0, max: Infinity },
  { id: 'u20', label: 'Moins de 20 000 FCFA', min: 0, max: 20000 },
  { id: '20to100', label: '20 000 F à 100 000 FCFA', min: 20000, max: 100000 },
  { id: '100to400', label: '100 000 F à 400 000 FCFA', min: 100000, max: 400000 },
  { id: '400to900', label: '400 000 F à 900 000 FCFA', min: 400000, max: 900000 },
  { id: 'o900', label: 'Plus de 900 000 FCFA', min: 900000, max: Infinity },
];

function readJsonStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [catalogData, setCatalogData] = React.useState({
    loading: true,
    error: '',
    // Pré-remplissage instantané avec INITIAL_PRODUCTS pour que le carrousel et la grille s'affichent sans attente ni vide
    products: INITIAL_PRODUCTS,
    categories: CATEGORIES,
    settings: {
      whatsappNumber: BRAND.defaultWhatsapp,
      wavePhone: BRAND.defaultWavePhone,
      wavePaymentUrl: BRAND.defaultWavePaymentUrl,
      shippingDisclaimer: BRAND.shippingDisclaimer,
      announcementBanner:
        'Livraison Daloa Commune 1 000 F · Périphérie 1 500 F · Expédition Issia, Vavoua & alentours dès 2 000 F · Paiement Wave & Suivi QR',
      storeOpen: true,
      deliveryZones: DELIVERY_ZONES,
    },
  });

  const [cart, setCart] = React.useState(() => readJsonStorage(CART_STORAGE_KEY, []));
  const [favorites, setFavorites] = React.useState(() => readJsonStorage(FAV_STORAGE_KEY, []));
  const [selectedZoneId, setSelectedZoneId] = React.useState(() =>
    readJsonStorage(ZONE_STORAGE_KEY, DELIVERY_ZONES[0].id)
  );

  const [activeCategory, setActiveCategory] = React.useState('all');
  const [priceRangeId, setPriceRangeId] = React.useState('all');
  const [onlyInStock, setOnlyInStock] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState('featured');
  const [onlyPromos, setOnlyPromos] = React.useState(false);
  const [onlyFavorites, setOnlyFavorites] = React.useState(false);

  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cartInitialStep, setCartInitialStep] = React.useState('cart');
  const [trackOpen, setTrackOpen] = React.useState(false);
  const [initialTrack, setInitialTrack] = React.useState(null);
  const [legalTab, setLegalTab] = React.useState(null);
  const [cookieConsent, setCookieConsent] = React.useState(() => readCookieConsent());
  const [forceCookieBanner, setForceCookieBanner] = React.useState(false);

  // Détection automatique d'un scan de Code QR de suivi en direct (?track=PKD-XXXXXX&token=...)
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('track');
    const tok = params.get('token') || '';
    if (ref) {
      setInitialTrack({ reference: ref.trim().toUpperCase(), token: tok.trim() });
      setTrackOpen(true);
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, '', cleanUrl);
    }
  }, []);

  const loadCatalog = React.useCallback(async () => {
    try {
      const data = await apiFetch('/api/catalog');
      setCatalogData((prev) => ({
        loading: false,
        error: '',
        products: data.products?.length ? data.products : prev.products,
        categories: data.categories || CATEGORIES,
        settings: data.settings || prev.settings,
      }));
    } catch (err) {
      setCatalogData((prev) => ({
        ...prev,
        loading: false,
        error: err.message || '',
      }));
    }
  }, []);

  React.useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  React.useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  React.useEffect(() => {
    try {
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  React.useEffect(() => {
    try {
      localStorage.setItem(ZONE_STORAGE_KEY, JSON.stringify(selectedZoneId));
    } catch {
      // ignore
    }
  }, [selectedZoneId]);

  const zones = catalogData.settings.deliveryZones || DELIVERY_ZONES;
  const selectedZone = zones.find((z) => z.id === selectedZoneId) || zones[0];
  const productsMap = new Map(catalogData.products.map((p) => [p.id, p]));
  const cartQtyMap = new Map(cart.map((c) => [c.productId, c.quantity]));
  const totalCartItems = cart.reduce((acc, c) => acc + c.quantity, 0);

  function handleAddToCart(product, qty = 1) {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        const nextQty = Math.min(product.stock, existing.quantity + qty);
        return prev.map((i) =>
          i.productId === product.id ? { ...i, quantity: nextQty } : i
        );
      }
      return [...prev, { productId: product.id, quantity: Math.min(product.stock, qty) }];
    });
  }

  function handleBuyNow(product, qty = 1) {
    handleAddToCart(product, qty);
    setCartInitialStep('checkout');
    setCartOpen(true);
  }

  function handleUpdateCartQty(productId, nextQty) {
    if (nextQty <= 0) {
      setCart((prev) => prev.filter((i) => i.productId !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity: nextQty } : i))
    );
  }

  function handleRemoveFromCart(productId) {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }

  function handleToggleFavorite(productId) {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }

  function resetAllFilters() {
    setSearchQuery('');
    setActiveCategory('all');
    setPriceRangeId('all');
    setOnlyInStock(false);
    setOnlyPromos(false);
    setOnlyFavorites(false);
  }

  const activeRange = PRICE_RANGES.find((r) => r.id === priceRangeId) || PRICE_RANGES[0];
  const hasSearchQuery = Boolean(searchQuery.trim());

  // Filtrage multi-critères + recherche multi-mots insensible aux accents sur tous les rayons
  const filteredProducts = catalogData.products
    .filter((p) => {
      if (onlyFavorites && !favorites.includes(p.id)) return false;
      if (!onlyFavorites && !hasSearchQuery && activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }
      if (onlyPromos && !(p.compareAtPrice && p.compareAtPrice > p.price)) return false;
      if (onlyInStock && p.stock <= 0) return false;
      if (p.price < activeRange.min || p.price > activeRange.max) return false;
      if (hasSearchQuery) {
        return matchesProductSearch(p, searchQuery, catalogData.categories);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'discount') {
        const da = a.compareAtPrice ? (a.compareAtPrice - a.price) / a.compareAtPrice : 0;
        const db = b.compareAtPrice ? (b.compareAtPrice - b.price) / b.compareAtPrice : 0;
        return db - da;
      }
      return Number(b.featured) - Number(a.featured);
    });

  // Regroupement par catégorie lorsque la vue « Tous les rayons » est affichée
  const shouldGroupByCategory = activeCategory === 'all' && !hasSearchQuery && !onlyFavorites;
  const groupedCategories = React.useMemo(() => {
    if (!shouldGroupByCategory) return [];
    const cats = (catalogData.categories || CATEGORIES).filter((c) => c.id !== 'all');
    const groups = cats
      .map((cat) => ({
        category: cat,
        items: filteredProducts.filter((p) => p.category === cat.id),
      }))
      .filter((g) => g.items.length > 0);
    const knownIds = new Set(cats.map((c) => c.id));
    const others = filteredProducts.filter((p) => !knownIds.has(p.category));
    if (others.length > 0) {
      groups.push({
        category: { id: 'autres', label: 'Autres produits', shortLabel: 'Autres' },
        items: others,
      });
    }
    return groups;
  }, [shouldGroupByCategory, catalogData.categories, filteredProducts]);

  const showHero = !searchQuery.trim() && !onlyFavorites;

  return (
    <div className="min-h-screen flex flex-col bg-[#EAEDED] text-[#0F1111]">
      <Header
        announcement={catalogData.settings.announcementBanner}
        cartCount={totalCartItems}
        favCount={favorites.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => {
          setCartInitialStep('cart');
          setCartOpen(true);
        }}
        onOpenTrack={() => setTrackOpen(true)}
        activeCategory={activeCategory}
        categories={catalogData.categories}
        onSelectCategory={(catId) => {
          setOnlyFavorites(false);
          setActiveCategory(catId);
        }}
        onlyFavorites={onlyFavorites}
        onToggleFavorites={(val) =>
          setOnlyFavorites((prev) => (typeof val === 'boolean' ? val : !prev))
        }
        onlyPromos={onlyPromos}
        onTogglePromos={(val) =>
          setOnlyPromos((prev) => (typeof val === 'boolean' ? val : !prev))
        }
        deliveryZones={zones}
        selectedZoneId={selectedZone.id}
        onSelectZone={setSelectedZoneId}
        whatsappNumber={catalogData.settings.whatsappNumber}
        products={catalogData.products}
        onSelectProduct={setSelectedProduct}
      />

      {showHero && (
        <Hero
          products={catalogData.products}
          whatsappNumber={catalogData.settings.whatsappNumber}
          onSelectCategory={(catId) => {
            setOnlyFavorites(false);
            setOnlyPromos(false);
            setActiveCategory(catId);
          }}
          onSelectProduct={setSelectedProduct}
          onOpenPromos={() => {
            setOnlyFavorites(false);
            setActiveCategory('all');
            setOnlyPromos(true);
          }}
          onOpenTrack={() => setTrackOpen(true)}
        />
      )}

      {/* SECTION CATALOGUE STYLE AMAZON : COLONNE FILTRES À GAUCHE + GRILLE 4 COLONNES */}
      <main id="catalogue" className="flex-1 max-w-[1500px] w-full mx-auto px-3 sm:px-6 pt-6 pb-10">
        {/* Bandeau info si la base de production Vercel attend encore DATABASE_URL */}
        {catalogData.error && (
          <div className="mb-5 p-3.5 rounded-md bg-white border-l-4 border-[#FF9900] shadow-xs flex items-start gap-3 text-xs text-[#0F1111]">
            <AlertTriangle className="w-4 h-4 text-[#C7511F] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Mode aperçu catalogue activé :</span>{' '}
              <span className="text-[#565959]">
                Pour enregistrer des commandes réelles sur Vercel, connectez votre base Neon (
                <code>DATABASE_URL</code> + <code>ADMIN_PASSWORD</code>).
              </span>
            </div>
          </div>
        )}

        {/* Barre supérieure de résultats style Amazon ("1-16 sur 16 résultats pour...") */}
        <div className="bg-white border border-[#D5D9D9] rounded-md px-4 py-2.5 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
          <div className="text-xs sm:text-sm text-[#0F1111]">
            <span>
              <strong>{filteredProducts.length}</strong> résultat
              {filteredProducts.length > 1 ? 's' : ''} dans{' '}
              <strong className="text-[#C7511F]">
                {onlyFavorites
                  ? 'Ma liste d’envies'
                  : onlyPromos
                  ? 'Ventes Flash & Promotions'
                  : catalogData.categories.find((c) => c.id === activeCategory)?.label ||
                    'Tous les produits'}
              </strong>
            </span>
            {searchQuery.trim() && (
              <span>
                {' '}
                pour <strong className="text-[#C7511F]">« {searchQuery.trim()} »</strong>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <label
              htmlFor="amz-sort"
              className="text-xs text-[#565959] flex items-center gap-1 font-medium"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Trier par :</span>
            </label>
            <select
              id="amz-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 rounded-md bg-[#F0F2F2] hover:bg-[#E3E6E6] border border-[#D5D9D9] text-xs font-medium text-[#0F1111] focus:outline-none cursor-pointer"
            >
              <option value="featured">Mis en avant</option>
              <option value="discount">Meilleures remises</option>
              <option value="price-asc">Prix : par ordre croissant</option>
              <option value="price-desc">Prix : par ordre décroissant</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* COLONNE GAUCHE DE FILTRES FACETTÉS COMME SUR AMAZON (lg:col-span-3 xl:col-span-2) */}
          <aside className="lg:col-span-3 xl:col-span-2 bg-white border border-[#D5D9D9] rounded-md p-4 space-y-5 text-xs">
            {/* Rayons */}
            <div>
              <h3 className="font-bold text-sm text-[#0F1111] mb-2">Rayons</h3>
              <ul className="space-y-1.5">
                {catalogData.categories.map((cat) => {
                  const active = !onlyFavorites && activeCategory === cat.id;
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setOnlyFavorites(false);
                          setActiveCategory(cat.id);
                        }}
                        className={`text-left hover:text-[#C7511F] cursor-pointer ${
                          active ? 'font-bold text-[#C7511F]' : 'text-[#0F1111]'
                        }`}
                      >
                        {active ? '› ' : ''}
                        {cat.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Offres et disponibilité */}
            <div className="pt-4 border-t border-[#EAEDED] space-y-2">
              <h3 className="font-bold text-sm text-[#0F1111] mb-1">Offres & Stock</h3>
              <label className="flex items-center gap-2 cursor-pointer text-[#0F1111] hover:text-[#C7511F]">
                <input
                  type="checkbox"
                  checked={onlyPromos}
                  onChange={(e) => setOnlyPromos(e.target.checked)}
                  className="rounded border-[#888C8C] accent-[#E67A00]"
                />
                <span className="inline-flex items-center gap-1 font-medium">
                  <Flame className="w-3.5 h-3.5 text-[#CC0C39]" />
                  Ventes Flash & Promos
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-[#0F1111] hover:text-[#C7511F]">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded border-[#888C8C] accent-[#E67A00]"
                />
                <span>En stock immédiat</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-[#0F1111] hover:text-[#C7511F]">
                <input
                  type="checkbox"
                  checked={onlyFavorites}
                  onChange={(e) => setOnlyFavorites(e.target.checked)}
                  className="rounded border-[#888C8C] accent-[#E67A00]"
                />
                <span>Ma liste d’envies ({favorites.length})</span>
              </label>
            </div>

            {/* Tranches de prix */}
            <div className="pt-4 border-t border-[#EAEDED]">
              <h3 className="font-bold text-sm text-[#0F1111] mb-2">Prix</h3>
              <ul className="space-y-1.5">
                {PRICE_RANGES.map((range) => {
                  const active = priceRangeId === range.id;
                  return (
                    <li key={range.id}>
                      <button
                        type="button"
                        onClick={() => setPriceRangeId(range.id)}
                        className={`text-left hover:text-[#C7511F] cursor-pointer ${
                          active ? 'font-bold text-[#C7511F]' : 'text-[#0F1111]'
                        }`}
                      >
                        {active ? '✓ ' : ''}
                        {range.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Rappel Livraison & Paiement Wave */}
            <div className="pt-4 border-t border-[#EAEDED] space-y-2 text-[11px] text-[#565959]">
              <p className="font-bold text-[#0F1111] flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C7511F]" />
                <span>Tarifs de base</span>
              </p>
              <p>• Daloa Commune : 1 000 F</p>
              <p>• Daloa Périphérie : 1 500 F</p>
              <p>• Expédition alentours : 2 000 F</p>
              <p className="italic">Aucune livraison gratuite (selon taille et poids).</p>
              <button
                type="button"
                onClick={() => setTrackOpen(true)}
                className="mt-1 inline-flex items-center gap-1 font-semibold text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Suivi Colis Code QR</span>
              </button>
            </div>

            {(activeCategory !== 'all' ||
              priceRangeId !== 'all' ||
              onlyPromos ||
              onlyInStock ||
              onlyFavorites ||
              searchQuery) && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="w-full py-1.5 px-3 rounded-full bg-[#F0F2F2] hover:bg-[#E3E6E6] border border-[#D5D9D9] text-[#0F1111] font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser les filtres</span>
              </button>
            )}
          </aside>

          {/* GRILLE PRINCIPALE PRODUITS HAUTE DENSITÉ STYLE AMAZON (4 colonnes sur desktop) */}
          <div className="lg:col-span-9 xl:col-span-10">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-md p-12 text-center border border-[#D5D9D9] space-y-3">
                <p className="text-lg font-bold text-[#0F1111]">
                  Aucun article ne correspond aux filtres sélectionnés
                </p>
                <p className="text-xs sm:text-sm text-[#565959]">
                  Essayez un terme plus général ou réinitialisez les filtres de rayon et de prix.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="px-5 py-2 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[#0F1111] text-xs font-bold cursor-pointer"
                >
                  Afficher tous les produits
                </button>
              </div>
            ) : shouldGroupByCategory ? (
              <div className="space-y-8">
                {groupedCategories.map(({ category, items }) => (
                  <section key={category.id} id={`cat-${category.id}`} className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 bg-white border border-[#D5D9D9] rounded-md px-4 py-2.5 shadow-2xs">
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-base sm:text-lg font-extrabold text-[#0F1111]">
                          {category.label}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-[#F0F2F2] border border-[#D5D9D9] text-[11px] font-bold text-[#565959]">
                          {items.length} article{items.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setOnlyFavorites(false);
                          setActiveCategory(category.id);
                          document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-xs font-bold text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer"
                      >
                        Voir tout le rayon →
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                      {items.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          isFavorite={favorites.includes(product.id)}
                          onToggleFavorite={handleToggleFavorite}
                          onAddToCart={handleAddToCart}
                          onBuyNow={handleBuyNow}
                          onOpenDetail={setSelectedProduct}
                          inCartQty={cartQtyMap.get(product.id) || 0}
                          selectedZone={selectedZone}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                    onOpenDetail={setSelectedProduct}
                    inCartQty={cartQtyMap.get(product.id) || 0}
                    selectedZone={selectedZone}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer
        whatsappNumber={catalogData.settings.whatsappNumber}
        shippingDisclaimer={catalogData.settings.shippingDisclaimer}
        deliveryZones={zones}
        onOpenTrack={() => setTrackOpen(true)}
        onOpenLegal={(tabId) => setLegalTab(tabId || 'mentions')}
        onManageCookies={() => setForceCookieBanner(true)}
        onSelectCategory={(catId) => {
          setOnlyFavorites(false);
          setOnlyPromos(false);
          setActiveCategory(catId);
        }}
      />

      <LegalModal
        openTab={legalTab}
        onClose={() => setLegalTab(null)}
        onSelectTab={setLegalTab}
        whatsappNumber={catalogData.settings.whatsappNumber}
        onResetCookies={() => setForceCookieBanner(true)}
      />

      <CookieConsentBanner
        visible={!cookieConsent || forceCookieBanner}
        onAcceptAll={() => {
          setCookieConsent(saveCookieConsent('all'));
          setForceCookieBanner(false);
        }}
        onEssentialOnly={() => {
          setCookieConsent(saveCookieConsent('essential'));
          setForceCookieBanner(false);
        }}
        onOpenPolicy={() => setLegalTab('cookies')}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        selectedZone={selectedZone}
        whatsappNumber={catalogData.settings.whatsappNumber}
      />

      <CartDrawer
        open={cartOpen}
        initialStep={cartInitialStep}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        productsMap={productsMap}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCart([])}
        settings={catalogData.settings}
        selectedZoneId={selectedZone.id}
        onSelectZone={setSelectedZoneId}
        onOrderSuccess={loadCatalog}
        onOpenDirectTrack={(trackInfo) => {
          setInitialTrack(trackInfo);
          setTrackOpen(true);
        }}
      />

      <OrderTrackerModal
        open={trackOpen}
        onClose={() => setTrackOpen(false)}
        initialTrack={initialTrack}
        whatsappNumber={catalogData.settings.whatsappNumber}
      />
    </div>
  );
}
