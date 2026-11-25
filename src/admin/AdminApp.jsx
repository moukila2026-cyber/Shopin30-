import React from 'react';
import {
  Lock,
  LogOut,
  Package,
  ShoppingBag,
  Tag,
  Users,
  BarChart3,
  Settings,
  RefreshCw,
  Plus,
  Trash2,
  Edit3,
  Upload,
  MessageCircle,
  Phone,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  Copy,
  Check,
  QrCode,
} from 'lucide-react';
import { CATEGORIES, formatFcfa, inferHeavyShipping } from '../../shared/catalog.js';
import {
  apiFetch,
  buildCustomerWhatsappLink,
  buildOrderTrackingUrl,
  setStoredAdminToken,
} from '../lib/api.js';

const ORDER_STATUS_LABELS = {
  pending: { label: 'Wave à vérifier (Nouvelle)', badge: 'bg-amber-100 text-amber-900' },
  preparing: { label: 'Wave validé · Préparation', badge: 'bg-blue-100 text-blue-900' },
  shipped: { label: 'Expédiée / En livraison', badge: 'bg-indigo-100 text-indigo-900' },
  delivered: { label: 'Livrée', badge: 'bg-emerald-100 text-emerald-900' },
  cancelled: { label: 'Annulée (stock restitué)', badge: 'bg-red-100 text-red-900' },
};

export default function AdminApp() {
  const [authState, setAuthState] = React.useState({
    loading: true,
    authenticated: false,
    configured: true,
    user: null,
    demoHint: null,
    storage: null,
  });
  const [credential, setCredential] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [loginBusy, setLoginBusy] = React.useState(false);

  const [tab, setTab] = React.useState('orders'); // 'orders' | 'products' | 'promos' | 'agents' | 'stats' | 'settings'
  const [overview, setOverview] = React.useState(null);
  const [loadingData, setLoadingData] = React.useState(false);
  const [toast, setToast] = React.useState('');

  // Filtre commandes
  const [orderFilter, setOrderFilter] = React.useState('all');
  const [orderSearch, setOrderSearch] = React.useState('');

  // Édition produit
  const [editingProduct, setEditingProduct] = React.useState(null);
  const [savingProduct, setSavingProduct] = React.useState(false);

  // Nouveau code promo
  const [promoForm, setPromoForm] = React.useState({
    code: '',
    discountType: 'percent',
    discountValue: 10,
    minSubtotal: 10000,
    maxDiscount: '',
    description: '',
  });

  // Nouvel agent
  const [agentForm, setAgentForm] = React.useState({ name: '', phone: '' });
  const [newAgentSecret, setNewAgentSecret] = React.useState(null);
  const [copiedCode, setCopiedCode] = React.useState(false);

  // Paramètres boutique
  const [settingsForm, setSettingsForm] = React.useState(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  }

  const checkSession = React.useCallback(async () => {
    try {
      const s = await apiFetch('/api/admin/session');
      setAuthState({
        loading: false,
        authenticated: Boolean(s.authenticated),
        configured: s.configured !== false,
        user: s.user || null,
        demoHint: s.demoHint || null,
        storage: s.storage || null,
      });
    } catch {
      setAuthState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const loadOverview = React.useCallback(async () => {
    setLoadingData(true);
    try {
      const data = await apiFetch('/api/admin/overview');
      setOverview(data);
      if (data.settings) {
        setSettingsForm(data.settings);
      }
    } catch (err) {
      if (err.status === 401) {
        setStoredAdminToken('');
        setAuthState((prev) => ({ ...prev, authenticated: false, user: null }));
      } else {
        showToast(err.message || 'Erreur de chargement.');
      }
    } finally {
      setLoadingData(false);
    }
  }, []);

  React.useEffect(() => {
    checkSession();
  }, [checkSession]);

  React.useEffect(() => {
    if (authState.authenticated) {
      loadOverview();
      const timer = setInterval(loadOverview, 45000);
      return () => clearInterval(timer);
    }
  }, [authState.authenticated, loadOverview]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginBusy(true);
    setLoginError('');
    try {
      const res = await apiFetch('/api/admin/login', {
        method: 'POST',
        body: { credential },
      });
      if (res.token) setStoredAdminToken(res.token);
      setCredential('');
      setAuthState((prev) => ({
        ...prev,
        authenticated: true,
        user: res.user,
      }));
    } catch (err) {
      setLoginError(err.message || 'Accès refusé.');
    } finally {
      setLoginBusy(false);
    }
  }

  async function handleLogout() {
    try {
      await apiFetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    setStoredAdminToken('');
    setOverview(null);
    setAuthState((prev) => ({ ...prev, authenticated: false, user: null }));
  }

  async function handleOrderStatus(reference, status) {
    if (
      status === 'cancelled' &&
      !window.confirm(
        `Confirmer l'annulation de la commande ${reference} ? Le stock réservé sera automatiquement restitué.`
      )
    ) {
      return;
    }
    try {
      await apiFetch(`/api/admin/orders/${encodeURIComponent(reference)}/status`, {
        method: 'PATCH',
        body: { status },
      });
      showToast(`Commande ${reference} mise à jour.`);
      await loadOverview();
    } catch (err) {
      window.alert(err.message);
    }
  }

  function openNewProductModal() {
    setEditingProduct({
      isNew: true,
      name: '',
      category: 'high-tech',
      price: 10000,
      compareAtPrice: '',
      stock: 10,
      badge: '',
      featured: false,
      active: true,
      isHeavy: false,
      isHeavyTouched: false,
      shortDescription: '',
      description: '',
      specsText: '',
    });
  }

  function openEditProductModal(p) {
    setEditingProduct({
      isNew: false,
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      compareAtPrice: p.compareAtPrice || '',
      stock: p.stock,
      badge: p.badge || '',
      featured: Boolean(p.featured),
      active: Boolean(p.active),
      isHeavy: inferHeavyShipping(p),
      isHeavyTouched: true,
      shortDescription: p.shortDescription || '',
      description: p.description || '',
      specsText: (p.specs || []).join('\n'),
    });
  }

  async function handleSaveProduct(e) {
    e.preventDefault();
    if (!editingProduct) return;
    setSavingProduct(true);
    try {
      const payload = {
        name: editingProduct.name.trim(),
        category: editingProduct.category,
        price: Number(editingProduct.price),
        compareAtPrice: editingProduct.compareAtPrice
          ? Number(editingProduct.compareAtPrice)
          : null,
        stock: Number(editingProduct.stock),
        badge: editingProduct.badge.trim(),
        featured: Boolean(editingProduct.featured),
        active: Boolean(editingProduct.active),
        isHeavy: Boolean(editingProduct.isHeavy),
        shortDescription: editingProduct.shortDescription.trim(),
        description: editingProduct.description.trim(),
        specs: editingProduct.specsText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
      };

      if (editingProduct.isNew) {
        await apiFetch('/api/admin/products', { method: 'POST', body: payload });
        showToast('Nouveau produit ajouté au catalogue !');
      } else {
        await apiFetch(`/api/admin/products/${encodeURIComponent(editingProduct.id)}`, {
          method: 'PUT',
          body: payload,
        });
        showToast('Produit mis à jour.');
      }
      setEditingProduct(null);
      await loadOverview();
    } catch (err) {
      window.alert(err.message);
    } finally {
      setSavingProduct(false);
    }
  }

  async function handleDeleteProduct(p) {
    if (!window.confirm(`Supprimer définitivement « ${p.name} » du catalogue ?`)) return;
    try {
      await apiFetch(`/api/admin/products/${encodeURIComponent(p.id)}`, {
        method: 'DELETE',
      });
      showToast('Produit supprimé.');
      await loadOverview();
    } catch (err) {
      window.alert(err.message);
    }
  }

  async function handleUploadPhoto(productId, file) {
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      window.alert('Image trop lourde (max 4 Mo).');
      return;
    }
    try {
      const buf = await file.arrayBuffer();
      await apiFetch(`/api/admin/products/${encodeURIComponent(productId)}/photo`, {
        method: 'PUT',
        headers: { 'Content-Type': file.type || 'image/jpeg' },
        body: buf,
      });
      showToast('Photo produit enregistrée dans Neon !');
      await loadOverview();
    } catch (err) {
      window.alert(err.message);
    }
  }

  async function handleCreatePromo(e) {
    e.preventDefault();
    try {
      await apiFetch('/api/admin/promos', {
        method: 'POST',
        body: {
          code: promoForm.code,
          discountType: promoForm.discountType,
          discountValue: Number(promoForm.discountValue),
          minSubtotal: Number(promoForm.minSubtotal || 0),
          maxDiscount: promoForm.maxDiscount ? Number(promoForm.maxDiscount) : null,
          description: promoForm.description,
          active: true,
        },
      });
      setPromoForm({
        code: '',
        discountType: 'percent',
        discountValue: 10,
        minSubtotal: 10000,
        maxDiscount: '',
        description: '',
      });
      showToast('Code promo enregistré !');
      await loadOverview();
    } catch (err) {
      window.alert(err.message);
    }
  }

  async function handleDeletePromo(code) {
    if (!window.confirm(`Supprimer le code promo ${code} ?`)) return;
    try {
      await apiFetch(`/api/admin/promos/${encodeURIComponent(code)}`, { method: 'DELETE' });
      showToast('Code promo supprimé.');
      await loadOverview();
    } catch (err) {
      window.alert(err.message);
    }
  }

  async function handleCreateAgent(e) {
    e.preventDefault();
    try {
      const res = await apiFetch('/api/admin/agents', {
        method: 'POST',
        body: agentForm,
      });
      setNewAgentSecret(res.created);
      setAgentForm({ name: '', phone: '' });
      showToast('Code agent généré ! Copiez-le maintenant.');
      await loadOverview();
    } catch (err) {
      window.alert(err.message);
    }
  }

  async function handleRevokeAgent(agent) {
    if (
      !window.confirm(
        `Révoquer immédiatement l'accès de ${agent.name} ? Il sera déconnecté dès sa prochaine action.`
      )
    ) {
      return;
    }
    try {
      await apiFetch(`/api/admin/agents/${encodeURIComponent(agent.id)}`, {
        method: 'DELETE',
      });
      showToast(`Accès de ${agent.name} révoqué.`);
      await loadOverview();
    } catch (err) {
      window.alert(err.message);
    }
  }

  async function handleSaveSettings(e) {
    e.preventDefault();
    if (!settingsForm) return;
    try {
      await apiFetch('/api/admin/settings', {
        method: 'PUT',
        body: {
          whatsappNumber: settingsForm.whatsappNumber,
          wavePhone: settingsForm.wavePhone || '',
          wavePaymentUrl: settingsForm.wavePaymentUrl || '',
          shippingDisclaimer: settingsForm.shippingDisclaimer || '',
          announcementBanner: settingsForm.announcementBanner,
          storeOpen: Boolean(settingsForm.storeOpen),
          deliveryZones: settingsForm.deliveryZones,
        },
      });
      showToast('Paramètres de la boutique mis à jour !');
      await loadOverview();
    } catch (err) {
      window.alert(err.message);
    }
  }

  if (authState.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EAEDED] text-[#0F1111] font-semibold">
        Chargement de Pèrôkadô Seller Central…
      </div>
    );
  }

  const storefrontUrl = (() => {
    if (typeof window === 'undefined') return '/';
    const h = window.location.hostname.toLowerCase();
    if (h.startsWith('admin.')) return `${window.location.protocol}//${window.location.host.slice(6)}/`;
    return '/';
  })();

  // ÉCRAN DE CONNEXION SÉCURISÉ — APPLICATION DISTINCTE SELLER CENTRAL
  if (!authState.authenticated) {
    return (
      <div className="min-h-screen bg-[#131921] flex flex-col items-center justify-center p-4">
        <div className="mb-5 flex items-center gap-2.5 text-white">
          <img
            src="/images/icon-512.png"
            alt="Logo Pèrôkadô"
            className="w-10 h-10 rounded-md bg-white p-0.5 object-cover"
          />
          <div className="leading-tight">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold tracking-tight">pèrôkadô</span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF9900]">
                seller central
              </span>
            </div>
            <span className="text-[11px] text-[#CCCCCC]">
              Console d’administration indépendante · Daloa & Expéditions
            </span>
          </div>
        </div>

        <div className="w-full max-w-md bg-white rounded-lg p-7 sm:p-8 border border-[#D5D9D9] shadow-2xl space-y-5">
          <div className="border-b border-[#EAEDED] pb-3">
            <h1 className="text-xl font-bold text-[#0F1111] flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#C7511F]" />
              <span>Identification Vendeur / Équipe</span>
            </h1>
            <p className="text-xs text-[#565959] mt-1">
              Accès strictement réservé à l’administrateur et aux agents autorisés Pèrôkadô.
            </p>
          </div>

          {!authState.configured ? (
            <div className="p-4 rounded-md bg-[#FEF8F2] border border-[#F5D3B3] text-xs text-[#0F1111] space-y-2">
              <p className="font-bold flex items-center gap-1.5 text-[#B12704]">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Activation requise sur Vercel</span>
              </p>
              <p>
                Ajoutez les variables <code>DATABASE_URL</code> (Neon PostgreSQL) et{' '}
                <code>ADMIN_PASSWORD</code> dans Vercel → Settings → Environment Variables, puis
                redéployez.
              </p>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 rounded bg-[#FCF4F4] border border-[#CC0C39] text-xs text-[#CC0C39] font-medium">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#0F1111] mb-1.5">
                  Mot de passe Administrateur ou Code Agent (PKD-…)
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded border border-[#888C8C] text-sm focus:outline-none focus:ring-2 focus:ring-[#007185]"
                />
              </div>

              {authState.demoHint && (
                <p className="text-[11px] text-[#565959] bg-[#F7FAFA] p-2.5 rounded border border-[#D5D9D9]">
                  Mode démo local détecté — Mot de passe par défaut :{' '}
                  <code className="font-bold text-[#0F1111]">{authState.demoHint}</code>
                </p>
              )}

              <button
                type="submit"
                disabled={loginBusy}
                className="w-full py-2.5 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[#0F1111] font-bold text-sm shadow-2xs transition cursor-pointer"
              >
                {loginBusy ? 'Vérification…' : 'Accéder à Seller Central'}
              </button>
            </form>
          )}

          <div className="pt-3 border-t border-[#EAEDED] text-center">
            <a
              href={storefrontUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#007185] hover:text-[#C7511F] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ouvrir la boutique client dans un nouvel onglet</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = overview?.user?.role === 'admin' || authState.user?.role === 'admin';
  const stats = overview?.stats || {};
  const orders = overview?.orders || [];
  const products = overview?.products || [];
  const promos = overview?.promos || [];
  const agents = overview?.agents || [];

  const filteredOrders = orders.filter((o) => {
    if (orderFilter !== 'all' && o.status !== orderFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return (
        o.reference.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.toLowerCase().includes(q) ||
        (o.waveTransactionRef || '').toLowerCase().includes(q) ||
        o.neighborhood.toLowerCase().includes(q) ||
        o.cityZoneName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#EAEDED] text-[#0F1111]">
      {/* Barre supérieure Seller Central distincte (#131921) */}
      <header className="sticky top-0 z-30 bg-[#131921] text-white border-b border-[#37475A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/images/icon-512.png"
              alt="Pèrôkadô"
              className="w-9 h-9 rounded-md bg-white p-0.5 object-cover"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base font-extrabold tracking-tight">
                  pèrôkadô
                </span>
                <span className="px-2 py-0.5 rounded bg-[#FF9900] text-[#131921] text-[10px] font-extrabold uppercase">
                  Seller Central
                </span>
              </div>
              <span className="text-[11px] text-[#CCCCCC]">
                {authState.user?.name} ({isAdmin ? 'Administrateur' : 'Agent commandes'}) · Base :{' '}
                {authState.storage?.durable ? 'Neon PostgreSQL (En ligne)' : 'Locale (Démo)'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadOverview}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#232F3E] hover:bg-[#37475A] border border-white/15 text-xs font-semibold cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Actualiser</span>
            </button>
            <a
              href={storefrontUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#232F3E] hover:bg-[#37475A] border border-white/15 text-xs font-semibold"
            >
              Ouvrir la boutique ↗
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#CC0C39] hover:bg-[#A80A2E] text-xs font-bold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Alerte si base non durable */}
      {authState.storage && !authState.storage.durable && (
        <div className="bg-amber-100 border-b border-amber-300 text-amber-950 text-xs py-2.5 px-4 text-center font-medium">
          Mode base locale PGlite actif (développement). Sur Vercel, connectez <strong>Neon PostgreSQL</strong> via{' '}
          <code>DATABASE_URL</code> pour conserver durablement vos commandes et produits.
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-2xl bg-[#0F443E] text-white text-xs sm:text-sm font-semibold shadow-xl">
          {toast}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Cartes KPI rapides */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-[#E5DEC9]">
            <p className="text-xs text-stone-500 font-semibold">À confirmer (Nouvelles)</p>
            <p className="text-2xl font-extrabold text-[#D95D24] mt-1">
              {stats.pendingOrders ?? 0}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#E5DEC9]">
            <p className="text-xs text-stone-500 font-semibold">En cours / Livraison</p>
            <p className="text-2xl font-extrabold text-[#0F443E] mt-1">
              {stats.activeOrders ?? 0}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#E5DEC9]">
            <p className="text-xs text-stone-500 font-semibold">Ventes du jour (Daloa & alentours)</p>
            <p className="text-xl sm:text-2xl font-extrabold text-[#0F443E] mt-1">
              {formatFcfa(stats.todayRevenue ?? 0)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#E5DEC9]">
            <p className="text-xs text-stone-500 font-semibold">Chiffre d’affaires global</p>
            <p className="text-xl sm:text-2xl font-extrabold text-emerald-700 mt-1">
              {formatFcfa(stats.grossRevenue ?? 0)}
            </p>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'orders', label: `Commandes (${orders.length})`, icon: Package, show: true },
            { id: 'products', label: `Catalogue (${products.length})`, icon: ShoppingBag, show: true },
            { id: 'promos', label: `Codes Promo (${promos.length})`, icon: Tag, show: isAdmin },
            { id: 'agents', label: `Équipe & Codes (${agents.length})`, icon: Users, show: isAdmin },
            { id: 'stats', label: 'Statistiques & Journal', icon: BarChart3, show: true },
            { id: 'settings', label: 'Zones & Paramètres', icon: Settings, show: isAdmin },
          ]
            .filter((t) => t.show)
            .map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                    active
                      ? 'bg-[#0F443E] text-white shadow-xs'
                      : 'bg-white text-stone-700 border border-[#E5DEC9] hover:bg-[#FAF7F0]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t.label}</span>
                </button>
              );
            })}
        </div>

        {/* ONGLET 1 : COMMANDES */}
        {tab === 'orders' && (
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-between bg-white p-4 rounded-2xl border border-[#E5DEC9]">
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'Toutes' },
                  { id: 'pending', label: 'Nouvelles' },
                  { id: 'preparing', label: 'Préparation' },
                  { id: 'shipped', label: 'En route' },
                  { id: 'delivered', label: 'Livrées' },
                  { id: 'cancelled', label: 'Annulées' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setOrderFilter(f.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                      orderFilter === f.id
                        ? 'bg-[#D95D24] text-white'
                        : 'bg-[#FAF7F0] text-stone-700 hover:bg-[#EFE9D8]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <input
                type="search"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Rechercher réf, client, tél, quartier…"
                className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-xs sm:text-sm sm:w-64"
              />
            </div>

            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-[#E5DEC9] text-sm text-stone-500">
                Aucune commande dans cette vue pour le moment.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredOrders.map((order) => {
                  const st = ORDER_STATUS_LABELS[order.status] || ORDER_STATUS_LABELS.pending;
                  return (
                    <div
                      key={order.reference}
                      className="bg-white rounded-3xl p-5 border border-[#E5DEC9] shadow-2xs space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-base font-extrabold text-[#0F443E]">
                            {order.reference}
                          </span>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${st.badge}`}>
                            {st.label}
                          </span>
                        </div>

                        <div className="text-xs text-stone-600 space-y-1">
                          <p className="text-sm font-bold text-[#14231F]">
                            {order.customerName} ·{' '}
                            <a
                              href={`tel:${order.customerPhone}`}
                              className="text-[#D95D24] underline"
                            >
                              {order.customerPhone}
                            </a>
                          </p>
                          <p>
                            <strong>Zone :</strong> {order.cityZoneName} — {order.neighborhood}
                            {order.addressDetails ? ` (${order.addressDetails})` : ''}
                          </p>
                          <p>
                            <strong>Créneau :</strong> {order.deliverySlot} ·{' '}
                            <strong>Paiement :</strong>{' '}
                            <span className="font-bold text-[#007BB5]">
                              Wave ({order.waveSenderPhone || order.customerPhone})
                            </span>
                            {order.waveTransactionRef && (
                              <span className="ml-1 px-2 py-0.5 rounded-md bg-[#E8F7FE] text-[#053B54] font-bold">
                                Réf Wave: {order.waveTransactionRef}
                              </span>
                            )}
                          </p>
                          {order.customerNote && (
                            <p className="bg-amber-50 text-amber-900 p-2 rounded-lg border border-amber-200">
                              <strong>Note client :</strong> {order.customerNote}
                            </p>
                          )}
                        </div>

                        <div className="bg-[#FAF7F0] rounded-2xl p-3 border border-[#EAE2CE] text-xs space-y-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between">
                              <span>
                                {item.quantity}× {item.name}
                              </span>
                              <span className="font-semibold">{formatFcfa(item.lineTotal)}</span>
                            </div>
                          ))}
                          {order.discountAmount > 0 && (
                            <div className="flex justify-between text-emerald-700 font-semibold">
                              <span>Code {order.promoCode}</span>
                              <span>−{formatFcfa(order.discountAmount)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-stone-500">
                            <span>Livraison / Expédition (base)</span>
                            <span>{formatFcfa(order.deliveryFee)}</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-[#E5DEC9] text-sm font-extrabold text-[#0F443E]">
                            <span>Total payé Wave</span>
                            <span>{formatFcfa(order.total)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions statut & contact */}
                      <div className="pt-2 border-t border-[#EFE9D8] flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          {order.status === 'pending' && (
                            <button
                              type="button"
                              onClick={() => handleOrderStatus(order.reference, 'preparing')}
                              className="px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                            >
                              Valider Wave & Préparer
                            </button>
                          )}
                          {order.status === 'preparing' && (
                            <button
                              type="button"
                              onClick={() => handleOrderStatus(order.reference, 'shipped')}
                              className="px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer"
                            >
                              Expédier / En livraison
                            </button>
                          )}
                          {(order.status === 'preparing' || order.status === 'shipped') && (
                            <button
                              type="button"
                              onClick={() => handleOrderStatus(order.reference, 'delivered')}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Marquer Livrée</span>
                            </button>
                          )}
                          {(order.status === 'pending' ||
                            order.status === 'preparing' ||
                            order.status === 'shipped') && (
                            <button
                              type="button"
                              onClick={() => handleOrderStatus(order.reference, 'cancelled')}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Annuler</span>
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard?.writeText(buildOrderTrackingUrl(order));
                              showToast(`Lien de suivi QR (${order.reference}) copié !`);
                            }}
                            className="p-2 rounded-full bg-[#FAF7F0] hover:bg-[#EFE9D8] text-[#0F443E] cursor-pointer"
                            title="Copier le lien de suivi en direct (QR)"
                          >
                            <QrCode className="w-4 h-4" />
                          </button>
                          <a
                            href={`tel:${order.customerPhone}`}
                            className="p-2 rounded-full bg-[#FAF7F0] hover:bg-[#EFE9D8] text-[#0F443E]"
                            title="Appeler le client"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                          <a
                            href={buildCustomerWhatsappLink(order.customerPhone, order)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1FAF5A] text-white text-xs font-bold"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* ONGLET 2 : CATALOGUE PRODUITS */}
        {tab === 'products' && (
          <section className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E5DEC9]">
              <div>
                <h2 className="text-base font-bold text-[#0F443E]">Gestion du Catalogue</h2>
                <p className="text-xs text-stone-600">
                  {isAdmin
                    ? 'Ajoutez tout type de produit, modifiez vos stocks, promotions et téléversez vos vraies photos.'
                    : 'Mode lecture seule (réservé à l’administrateur pour les modifications).'}
                </p>
              </div>
              {isAdmin && (
                <button
                  type="button"
                  onClick={openNewProductModal}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#D95D24] hover:bg-[#BF4E1B] text-white text-xs sm:text-sm font-bold cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nouveau produit</span>
                </button>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className={`bg-white rounded-3xl p-4 border border-[#E5DEC9] flex flex-col justify-between gap-3 ${
                    !p.active ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex gap-3.5">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-20 h-24 rounded-2xl object-cover bg-[#FAF7F0] shrink-0 border border-[#EFE9D8]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-[#D95D24]">
                          {p.category} {!p.active ? '· MASQUÉ' : ''}
                        </span>
                        {inferHeavyShipping(p) && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                            Colis lourd (2 500 F / 5 000 F)
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-[#14231F] line-clamp-2">{p.name}</h3>
                      <p className="text-base font-extrabold text-[#0F443E] mt-1">
                        {formatFcfa(p.price)}
                      </p>
                      <p
                        className={`text-xs font-semibold mt-0.5 ${
                          p.stock <= 3 ? 'text-red-600' : 'text-stone-600'
                        }`}
                      >
                        Stock : {p.stock} unité{p.stock > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  {isAdmin && (
                    <div className="pt-2 border-t border-[#EFE9D8] flex items-center justify-between gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F0] hover:bg-[#EFE9D8] text-xs font-semibold text-[#0F443E] cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Photo</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={(e) => handleUploadPhoto(p.id, e.target.files?.[0])}
                        />
                      </label>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditProductModal(p)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#0F443E] text-white text-xs font-semibold cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Modifier</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(p)}
                          className="p-1.5 rounded-full text-stone-400 hover:text-red-600 cursor-pointer"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ONGLET 3 : CODES PROMO */}
        {tab === 'promos' && isAdmin && (
          <section className="grid lg:grid-cols-12 gap-6">
            <form
              onSubmit={handleCreatePromo}
              className="lg:col-span-5 bg-white p-5 rounded-3xl border border-[#E5DEC9] space-y-3 h-fit"
            >
              <h2 className="text-base font-bold text-[#0F443E]">Créer ou modifier un code promo</h2>
              <div>
                <label className="block text-xs font-bold mb-1">Code (ex: FETE15) *</label>
                <input
                  type="text"
                  required
                  value={promoForm.code}
                  onChange={(e) =>
                    setPromoForm({ ...promoForm, code: e.target.value.toUpperCase() })
                  }
                  placeholder="FETE15"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm uppercase font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Type de remise</label>
                  <select
                    value={promoForm.discountType}
                    onChange={(e) => setPromoForm({ ...promoForm, discountType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm"
                  >
                    <option value="percent">Pourcentage (%)</option>
                    <option value="fixed">Montant fixe (FCFA)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Valeur *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={promoForm.discountValue}
                    onChange={(e) => setPromoForm({ ...promoForm, discountValue: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Achat min (FCFA)</label>
                  <input
                    type="number"
                    min={0}
                    value={promoForm.minSubtotal}
                    onChange={(e) => setPromoForm({ ...promoForm, minSubtotal: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Plafond remise (FCFA)</label>
                  <input
                    type="number"
                    min={0}
                    value={promoForm.maxDiscount}
                    onChange={(e) => setPromoForm({ ...promoForm, maxDiscount: e.target.value })}
                    placeholder="Illimité"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Description courte</label>
                <input
                  type="text"
                  value={promoForm.description}
                  onChange={(e) => setPromoForm({ ...promoForm, description: e.target.value })}
                  placeholder="Ex: Offre spéciale fête des mères"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-[#0F443E] text-white text-sm font-bold cursor-pointer"
              >
                Enregistrer le code promo
              </button>
            </form>

            <div className="lg:col-span-7 space-y-3">
              {promos.map((pr) => (
                <div
                  key={pr.code}
                  className="bg-white p-4 rounded-2xl border border-[#E5DEC9] flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-base font-extrabold text-[#D95D24]">{pr.code}</p>
                    <p className="text-xs text-stone-600">
                      {pr.discountType === 'percent'
                        ? `-${pr.discountValue}%`
                        : `-${formatFcfa(pr.discountValue)}`}{' '}
                      · Min {formatFcfa(pr.minSubtotal)} · Utilisé {pr.usedCount} fois
                    </p>
                    {pr.description && (
                      <p className="text-xs text-stone-500 mt-0.5">{pr.description}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeletePromo(pr.code)}
                    className="p-2 text-stone-400 hover:text-red-600 cursor-pointer"
                    aria-label="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ONGLET 4 : ÉQUIPE & AGENTS */}
        {tab === 'agents' && isAdmin && (
          <section className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-4">
              <form
                onSubmit={handleCreateAgent}
                className="bg-white p-5 rounded-3xl border border-[#E5DEC9] space-y-3"
              >
                <h2 className="text-base font-bold text-[#0F443E]">Ajouter un agent (vendeur / livreur)</h2>
                <p className="text-xs text-stone-600">
                  Chaque agent reçoit un code personnel <code>PKD-XXXX-XXXX</code> lui permettant
                  de traiter les commandes sans pouvoir modifier vos prix ni supprimer vos produits.
                </p>
                <div>
                  <label className="block text-xs font-bold mb-1">Nom de l’agent *</label>
                  <input
                    type="text"
                    required
                    value={agentForm.name}
                    onChange={(e) => setAgentForm({ ...agentForm, name: e.target.value })}
                    placeholder="Ex: Konan Marc (Livraison Daloa)"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={agentForm.phone}
                    onChange={(e) => setAgentForm({ ...agentForm, phone: e.target.value })}
                    placeholder="07 00 00 00 00"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-[#D95D24] text-white text-sm font-bold cursor-pointer"
                >
                  Générer le code d’accès
                </button>
              </form>

              {newAgentSecret && (
                <div className="bg-emerald-50 border-2 border-emerald-500 rounded-3xl p-5 space-y-2">
                  <p className="text-xs font-bold text-emerald-900 uppercase">
                    Code unique pour {newAgentSecret.name} (affiché une seule fois) :
                  </p>
                  <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-emerald-200">
                    <code className="text-base font-extrabold text-[#0F443E]">
                      {newAgentSecret.plainCode}
                    </code>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(newAgentSecret.plainCode);
                        setCopiedCode(true);
                        setTimeout(() => setCopiedCode(false), 2000);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#0F443E] text-white text-xs font-bold cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copié' : 'Copier'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-7 space-y-3">
              {agents.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-[#E5DEC9] text-center text-sm text-stone-500">
                  Aucun code agent créé pour le moment.
                </div>
              ) : (
                agents.map((ag) => (
                  <div
                    key={ag.id}
                    className="bg-white p-4 rounded-2xl border border-[#E5DEC9] flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-bold text-[#14231F]">
                        {ag.name}{' '}
                        <span
                          className={`ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            ag.active
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          {ag.active ? 'Actif' : 'Révoqué'}
                        </span>
                      </p>
                      <p className="text-xs text-stone-500">
                        Code : <code>{ag.codePrefix}</code> {ag.phone ? `· ${ag.phone}` : ''}
                      </p>
                    </div>
                    {ag.active && (
                      <button
                        type="button"
                        onClick={() => handleRevokeAgent(ag)}
                        className="px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold cursor-pointer"
                      >
                        Révoquer
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* ONGLET 5 : STATISTIQUES & JOURNAL */}
        {tab === 'stats' && (
          <section className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-3xl border border-[#E5DEC9] space-y-4">
              <h2 className="text-base font-bold text-[#0F443E]">
                Ventes par ville / zone (Daloa & alentours)
              </h2>
              {(stats.salesByZone || []).length === 0 ? (
                <p className="text-xs text-stone-500">Aucune vente enregistrée pour l’instant.</p>
              ) : (
                <div className="space-y-2.5">
                  {stats.salesByZone.map((z) => (
                    <div
                      key={z.zone}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F0] text-xs sm:text-sm"
                    >
                      <span className="font-bold text-[#14231F]">{z.zone}</span>
                      <span className="text-[#0F443E] font-extrabold">
                        {z.ordersCount} cmd · {formatFcfa(z.revenue)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <h3 className="text-sm font-bold text-[#D95D24] pt-2">Alertes de stock faible (≤ 5)</h3>
              {(stats.lowStockProducts || []).length === 0 ? (
                <p className="text-xs text-emerald-700 font-medium">
                  ✓ Tous vos produits actifs ont un stock confortable.
                </p>
              ) : (
                <div className="space-y-2">
                  {stats.lowStockProducts.map((lp) => (
                    <div
                      key={lp.id}
                      className="flex justify-between text-xs p-2.5 rounded-xl bg-amber-50 border border-amber-200"
                    >
                      <span className="font-semibold">{lp.name}</span>
                      <span className="font-bold text-red-700">{lp.stock} restant(s)</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E5DEC9] space-y-3">
              <h2 className="text-base font-bold text-[#0F443E]">Journal de sécurité & activité</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {(stats.recentLogs || []).map((log) => (
                  <div
                    key={log.id}
                    className="text-xs p-2.5 rounded-xl bg-[#FAF7F0] border border-[#EAE2CE] flex justify-between gap-2"
                  >
                    <div>
                      <span className="font-bold text-[#0F443E]">{log.actor}</span> →{' '}
                      <code className="text-[#D95D24]">{log.action}</code>{' '}
                      {log.target && <span className="text-stone-600">({log.target})</span>}
                    </div>
                    <span className="text-[11px] text-stone-400 shrink-0">
                      {new Date(log.created_at).toLocaleString('fr-FR')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ONGLET 6 : PARAMÈTRES & ZONES */}
        {tab === 'settings' && isAdmin && settingsForm && (
          <form
            onSubmit={handleSaveSettings}
            className="bg-white p-6 rounded-3xl border border-[#E5DEC9] space-y-5 max-w-3xl"
          >
            <h2 className="text-lg font-bold text-[#0F443E]">
              Paramètres de la boutique & Livraison Daloa
            </h2>

            {/* Diagnostic SasPay & Webhooks */}
            {overview?.paymentIntegration && (
              <div className="p-4 rounded-2xl bg-[#F4FBF8] border border-[#B7E4CE] space-y-2.5 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-extrabold text-[#0F443E] text-sm">
                    Paiements instantanés SasPay (`saspay.me`) & Webhooks
                  </p>
                  <span
                    className={`px-2.5 py-1 rounded-full font-bold ${
                      overview.paymentIntegration.saspayConfigured
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {overview.paymentIntegration.saspayConfigured
                      ? 'SasPay API Actif'
                      : 'En attente de SASPAY_API_KEY'}
                  </span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  URL Webhook à coller dans votre dashboard{' '}
                  <strong>app.saspay.me → Webhooks</strong> (événement{' '}
                  <code>transaction.success</code>) :
                </p>
                <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-[#D4E9DF] font-mono text-[11px] break-all">
                  <span>{overview.paymentIntegration.saspayWebhookUrl}</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(overview.paymentIntegration.saspayWebhookUrl);
                      showToast('URL Webhook SasPay copiée !');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#0F443E] text-white font-sans font-bold shrink-0 cursor-pointer"
                  >
                    Copier
                  </button>
                </div>
                <div className="grid sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                  <div className="p-2 rounded-lg bg-white border border-[#E5DEC9]">
                    <strong>Clé API (`SASPAY_API_KEY`) :</strong>{' '}
                    {overview.paymentIntegration.saspayConfigured ? '✅ Configurée' : '⏳ Non définie'}
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-[#E5DEC9]">
                    <strong>Secret (`SASPAY_WEBHOOK_SECRET`) :</strong>{' '}
                    {overview.paymentIntegration.saspayWebhookSecretConfigured
                      ? '✅ Configuré'
                      : '⏳ Non défini'}
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-[#E5DEC9]">
                    <strong>Alerte Telegram :</strong>{' '}
                    {overview.paymentIntegration.telegramConfigured ? '✅ Active' : 'Optionnel'}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#E5DEC9]">
              <input
                id="storeOpen"
                type="checkbox"
                checked={Boolean(settingsForm.storeOpen)}
                onChange={(e) => setSettingsForm({ ...settingsForm, storeOpen: e.target.checked })}
                className="w-4 h-4 accent-[#0F443E]"
              />
              <label htmlFor="storeOpen" className="text-sm font-bold text-[#0F443E]">
                Boutique ouverte aux commandes en ligne
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">
                  Numéro WhatsApp du Service Client *
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.whatsappNumber}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">
                  Numéro Wave marchand affiché aux clients *
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.wavePhone || ''}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, wavePhone: e.target.value })
                  }
                  placeholder="Ex: 05 01 30 33 43"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">
                Lien direct Wave Business / Paiement Wave (optionnel, ex: https://pay.wave.com/m/...)
              </label>
              <input
                type="url"
                value={settingsForm.wavePaymentUrl || ''}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, wavePaymentUrl: e.target.value })
                }
                placeholder="https://pay.wave.com/m/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">
                Mention sur le poids / la taille de la marchandise (affichée au panier & pied de page) *
              </label>
              <textarea
                rows={2}
                required
                value={settingsForm.shippingDisclaimer || ''}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, shippingDisclaimer: e.target.value })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Bandeau d’annonce en haut du site</label>
              <input
                type="text"
                value={settingsForm.announcementBanner}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, announcementBanner: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm"
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-[#0F443E]">
                Tarifs de base Livraison & Expédition (aucune livraison gratuite — minimum 100 F)
              </p>
              <div className="space-y-2">
                {(settingsForm.deliveryZones || []).map((z, idx) => (
                  <div
                    key={z.id}
                    className="grid sm:grid-cols-12 gap-2 items-center bg-[#FAF7F0] p-2.5 rounded-xl border border-[#EAE2CE]"
                  >
                    <span className="sm:col-span-5 text-xs font-bold">{z.shortName}</span>
                    <input
                      type="text"
                      value={z.eta}
                      onChange={(e) => {
                        const copy = [...settingsForm.deliveryZones];
                        copy[idx] = { ...copy[idx], eta: e.target.value };
                        setSettingsForm({ ...settingsForm, deliveryZones: copy });
                      }}
                      className="sm:col-span-4 px-2.5 py-1.5 rounded-lg bg-white border border-[#DED6C1] text-xs"
                    />
                    <div className="sm:col-span-3 flex items-center gap-1">
                      <input
                        type="number"
                        min={100}
                        step={100}
                        value={z.fee}
                        onChange={(e) => {
                          const copy = [...settingsForm.deliveryZones];
                          copy[idx] = { ...copy[idx], fee: Number(e.target.value) };
                          setSettingsForm({ ...settingsForm, deliveryZones: copy });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#DED6C1] text-xs font-bold"
                      />
                      <span className="text-xs font-semibold">F</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#0F443E] hover:bg-[#092E2A] text-white text-sm font-bold cursor-pointer"
            >
              Enregistrer les paramètres
            </button>
          </form>
        )}
      </main>

      {/* MODALE AJOUT / ÉDITION PRODUIT */}
      {editingProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setEditingProduct(null)}
        >
          <form
            onSubmit={handleSaveProduct}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 space-y-4 border border-[#E5DEC9] shadow-2xl"
          >
            <h3 className="text-lg font-bold text-[#0F443E]">
              {editingProduct.isNew ? 'Ajouter un produit' : 'Modifier le produit'}
            </h3>

            <div>
              <label className="block text-xs font-bold mb-1">Nom du produit *</label>
              <input
                type="text"
                required
                value={editingProduct.name}
                onChange={(e) => {
                  const nextName = e.target.value;
                  const autoHeavy = editingProduct.isHeavyTouched
                    ? editingProduct.isHeavy
                    : inferHeavyShipping({ category: editingProduct.category, name: nextName });
                  setEditingProduct({ ...editingProduct, name: nextName, isHeavy: autoHeavy });
                }}
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1">Catégorie *</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => {
                    const nextCat = e.target.value;
                    const autoHeavy = editingProduct.isHeavyTouched
                      ? editingProduct.isHeavy
                      : inferHeavyShipping({ category: nextCat, name: editingProduct.name });
                    setEditingProduct({ ...editingProduct, category: nextCat, isHeavy: autoHeavy });
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm"
                >
                  {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Badge (ex: Promo, Nouveau)</label>
                <input
                  type="text"
                  value={editingProduct.badge}
                  onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1">Prix vente (FCFA) *</label>
                <input
                  type="number"
                  required
                  min={100}
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Prix barré (FCFA)</label>
                <input
                  type="number"
                  min={0}
                  value={editingProduct.compareAtPrice}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, compareAtPrice: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Stock disponible *</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Résumé court (carte produit)</label>
              <input
                type="text"
                value={editingProduct.shortDescription}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, shortDescription: e.target.value })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Description détaillée</label>
              <textarea
                rows={3}
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, description: e.target.value })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">
                Points forts / Caractéristiques (1 par ligne)
              </label>
              <textarea
                rows={3}
                value={editingProduct.specsText}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, specsText: e.target.value })
                }
                placeholder={'Garantie 6 mois\nLivré avec chargeur'}
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-xs"
              />
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-1">
              <label className="inline-flex items-center gap-2 text-xs font-bold">
                <input
                  type="checkbox"
                  checked={editingProduct.active}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, active: e.target.checked })
                  }
                />
                <span>Visible en boutique</span>
              </label>
              <label className="inline-flex items-center gap-2 text-xs font-bold">
                <input
                  type="checkbox"
                  checked={editingProduct.featured}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, featured: e.target.checked })
                  }
                />
                <span>Mettre en avant (Coup de cœur)</span>
              </label>
              <label className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                <input
                  type="checkbox"
                  checked={Boolean(editingProduct.isHeavy)}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      isHeavy: e.target.checked,
                      isHeavyTouched: true,
                    })
                  }
                />
                <span>Produit lourd / volumineux (Livraison Daloa 2 500 F · Expédition 5 000 F)</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#EFE9D8]">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded-full bg-stone-100 text-stone-700 text-xs font-bold cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={savingProduct}
                className="px-5 py-2 rounded-full bg-[#0F443E] text-white text-xs font-bold cursor-pointer"
              >
                {savingProduct ? 'Enregistrement…' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
