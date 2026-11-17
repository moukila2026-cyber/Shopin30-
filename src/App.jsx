import React from 'react';
import { SlidersHorizontal, Sparkles, AlertTriangle } from 'lucide-react';
import { CATEGORIES, DELIVERY_ZONES, BRAND } from '../shared/catalog.js';
import { apiFetch } from './lib/api.js';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { ProductCard, ProductDetailModal } from './components/ProductCard.jsx';
import { CartDrawer } from './components/CartDrawer.jsx';
import { OrderTrackerModal } from './components/OrderTrackerModal.jsx';
import { Footer } from './components/Footer.jsx';

const AdminApp = React.lazy(() => import('./admin/AdminApp.jsx'));

const CART_STORAGE_KEY = 'pkd_cart_v1';
const FAV_STORAGE_KEY = 'pkd_favs_v1';

function readJsonStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const isAdminRoute =
    typeof window !== 'undefined' &&
    (window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/'));

  const [catalogData, setCatalogData] = React.useState({
    loading: true,
    error: '',
    products: [],
    categories: CATEGORIES,
    settings: {
      whatsappNumber: BRAND.defaultWhatsapp,
      freeShippingThreshold: BRAND.defaultFreeShippingThreshold,
      announcementBanner:
        'Livraison rapide à Daloa (1 000 FCFA) & villes aux alentours · Gratuite dès 50 000 FCFA',
      storeOpen: true,
      deliveryZones: DELIVERY_ZONES,
    },
  });

  const [cart, setCart] = React.useState(() => readJsonStorage(CART_STORAGE_KEY, []));
  const [favorites, setFavorites] = React.useState(() => readJsonStorage(FAV_STORAGE_KEY, []));

  const [activeCategory, setActiveCategory] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState('featured');
  const [onlyPromos, setOnlyPromos] = React.useState(false);
  const [onlyFavorites, setOnlyFavorites] = React.useState(false);

  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [trackOpen, setTrackOpen] = React.useState(false);

  const loadCatalog = React.useCallback(async () => {
    try {
      const data = await apiFetch('/api/catalog');
      setCatalogData({
        loading: false,
        error: '',
        products: data.products || [],
        categories: data.categories || CATEGORIES,
        settings: data.settings || catalogData.settings,
      });
    } catch (err) {
      setCatalogData((prev) => ({
        ...prev,
        loading: false,
        error: err.message || 'Impossible de charger le catalogue pour le moment.',
      }));
    }
  }, []);

  React.useEffect(() => {
    if (!isAdminRoute) {
      loadCatalog();
    }
  }, [isAdminRoute, loadCatalog]);

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

  if (isAdminRoute) {
    return (
      <React.Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0] text-[#0F443E] font-semibold">
            Ouverture de l’espace d’administration Pèrôkadô…
          </div>
        }
      >
        <AdminApp />
      </React.Suspense>
    );
  }

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

  // Filtrage et tri du catalogue
  const filteredProducts = catalogData.products
    .filter((p) => {
      if (onlyFavorites && !favorites.includes(p.id)) return false;
      if (!onlyFavorites && activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (onlyPromos && !(p.compareAtPrice && p.compareAtPrice > p.price)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          (p.shortDescription || '').toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q) ||
          (p.badge || '').toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'featured') return Number(b.featured) - Number(a.featured);
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
      <Header
        announcement={catalogData.settings.announcementBanner}
        cartCount={totalCartItems}
        favCount={favorites.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setCartOpen(true)}
        onOpenTrack={() => setTrackOpen(true)}
        activeCategory={activeCategory}
        categories={catalogData.categories}
        onSelectCategory={(catId) => {
          setOnlyFavorites(false);
          setActiveCategory(catId);
        }}
        onlyFavorites={onlyFavorites}
        onToggleFavorites={() => setOnlyFavorites((v) => !v)}
      />

      <Hero
        freeShippingThreshold={catalogData.settings.freeShippingThreshold}
        onShopNow={() => {
          document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenTrack={() => setTrackOpen(true)}
      />

      <main id="catalogue" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Barre de filtres et de tri */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-[#E5DEC9]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F443E]">
              {onlyFavorites
                ? 'Vos articles favoris'
                : catalogData.categories.find((c) => c.id === activeCategory)?.label ||
                  'Tous nos produits'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {filteredProducts.length} article{filteredProducts.length > 1 ? 's' : ''} disponible
              {filteredProducts.length > 1 ? 's' : ''} · Expédition immédiate depuis Daloa
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setOnlyPromos((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold border transition cursor-pointer ${
                onlyPromos
                  ? 'bg-[#D95D24] text-white border-[#D95D24]'
                  : 'bg-white text-[#0F443E] border-[#DED6C1] hover:bg-[#FAF7F0]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Promotions</span>
            </button>

            <div className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#DED6C1]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#0F443E]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Trier par"
                className="text-xs font-semibold text-[#14231F] bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="featured">Coups de cœur</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </div>
          </div>
        </div>

        {/* État d'erreur éventuel (ex: DB non encore connectée sur Vercel) */}
        {catalogData.error && (
          <div className="mb-8 p-5 rounded-3xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-sm text-amber-950">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Catalogue en attente de connexion à la base de données</p>
              <p className="text-xs mt-1">{catalogData.error}</p>
            </div>
          </div>
        )}

        {/* Grille produits */}
        {catalogData.loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-96 rounded-3xl bg-white/70 border border-[#E5DEC9] animate-pulse"
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E5DEC9] space-y-3">
            <p className="text-lg font-bold text-[#0F443E]">Aucun produit ne correspond à votre recherche</p>
            <p className="text-sm text-stone-600">
              Essayez un autre mot-clé ou affichez toutes les catégories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setOnlyPromos(false);
                setOnlyFavorites(false);
              }}
              className="px-5 py-2.5 rounded-full bg-[#0F443E] text-white text-xs font-bold cursor-pointer"
            >
              Voir tout le catalogue
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={handleToggleFavorite}
                onAddToCart={handleAddToCart}
                onSelectProduct={setSelectedProduct}
                inCartQty={cartQtyMap.get(product.id) || 0}
              />
            ))}
          </div>
        )}
      </main>

      <Footer
        whatsappNumber={catalogData.settings.whatsappNumber}
        deliveryZones={catalogData.settings.deliveryZones}
        onOpenTrack={() => setTrackOpen(true)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        productsMap={productsMap}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCart([])}
        settings={catalogData.settings}
        onOrderSuccess={loadCatalog}
      />

      <OrderTrackerModal open={trackOpen} onClose={() => setTrackOpen(false)} />
    </div>
  );
}
