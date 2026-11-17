// ==============================================================================
// PÈRÔKADÔ — Client HTTP sécurisé, Liens de suivi QR en direct & Messages WhatsApp
// ==============================================================================

const TOKEN_KEY = 'pkd_admin_token';

export function getStoredAdminToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY) || '';
  } catch {
    return '';
  }
}

export function setStoredAdminToken(token) {
  try {
    if (token) sessionStorage.setItem(TOKEN_KEY, token);
    else sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}

export async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const token = getStoredAdminToken();
  if (token && path.startsWith('/api/admin')) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (
    options.body &&
    typeof options.body === 'object' &&
    !(options.body instanceof ArrayBuffer) &&
    !(options.body instanceof Blob)
  ) {
    headers.set('Content-Type', 'application/json');
    options = { ...options, body: JSON.stringify(options.body) };
  }

  const res = await fetch(path, {
    credentials: 'same-origin',
    ...options,
    headers,
  });

  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await res.json().catch(() => ({}))
    : {};

  if (!res.ok) {
    const err = new Error(data.error || `Erreur réseau (${res.status})`);
    err.status = res.status;
    err.code = data.code;
    throw err;
  }
  return data;
}

export function buildOrderTrackingUrl(order, originOverride) {
  let origin =
    originOverride ||
    (typeof window !== 'undefined' && window.location.origin ? window.location.origin : '');
  // Si généré depuis un sous-domaine admin.* ou perokado-admin.*, pointer vers le domaine boutique client
  if (!originOverride && typeof window !== 'undefined') {
    const h = window.location.hostname.toLowerCase();
    if (h.startsWith('admin.')) {
      origin = `${window.location.protocol}//${window.location.host.slice(6)}`;
    }
  }
  const params = new URLSearchParams({ track: order.reference });
  if (order.trackingToken) {
    params.set('token', order.trackingToken);
  }
  return `${origin}/?${params.toString()}`;
}

export function buildWhatsappServiceUrl(whatsappNumber, customMessage) {
  const cleanNum = String(whatsappNumber || '2250501303343').replace(/\D/g, '');
  const text =
    customMessage ||
    'Bonjour Pèrôkadô ! Je souhaite avoir des précisions sur les frais de livraison / d’expédition selon la taille et le poids de ma marchandise.';
  return `https://wa.me/${cleanNum}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsappOrderUrl(whatsappNumber, order) {
  const cleanNum = String(whatsappNumber || '2250501303343').replace(/\D/g, '');
  const trackingUrl = buildOrderTrackingUrl(order);
  const lines = [
    `Bonjour *Pèrôkadô* ! Je viens de régler ma commande en ligne par *Wave* :`,
    ``,
    `*Référence :* ${order.reference}`,
    `*Client :* ${order.customerName} (${order.customerPhone})`,
    `*Zone / Expédition :* ${order.cityZoneName} — ${order.neighborhood}`,
    order.addressDetails ? `*Repère :* ${order.addressDetails}` : null,
    `*Créneau :* ${order.deliverySlot}`,
    `*Paiement Wave :* ${order.waveSenderPhone || order.customerPhone} (Réf Wave : ${order.waveTransactionRef || 'communiquée'})`,
    ``,
    `*Articles :*`,
    ...order.items.map(
      (i) => `• ${i.quantity}× ${i.name} (${i.lineTotal.toLocaleString('fr-FR')} FCFA)`
    ),
    ``,
    order.discountAmount > 0
      ? `*Remise (${order.promoCode}) :* -${order.discountAmount.toLocaleString('fr-FR')} FCFA`
      : null,
    `*Livraison / Expédition (base) :* ${order.deliveryFee.toLocaleString('fr-FR')} FCFA`,
    `*TOTAL PAYÉ PAR WAVE :* *${order.total.toLocaleString('fr-FR')} FCFA*`,
    order.customerNote ? `\n*Note :* ${order.customerNote}` : null,
    ``,
    `*Lien de suivi en direct :* ${trackingUrl}`,
  ].filter(Boolean);

  return `https://wa.me/${cleanNum}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function buildCustomerWhatsappLink(customerPhone, order) {
  let digits = String(customerPhone || '').replace(/\D/g, '');
  if (digits.length === 10 && /^0[157]/.test(digits)) digits = '225' + digits;
  const statusLabels = {
    pending: 'reçue (paiement Wave en cours de vérification)',
    preparing: 'confirmée et en cours de préparation à Daloa',
    shipped: 'expédiée / en cours de livraison vers vous',
    delivered: 'livrée. Merci pour votre confiance',
    cancelled: 'annulée',
  };
  const trackingUrl = buildOrderTrackingUrl(order);
  const msg = `Bonjour ${order.customerName}, ici l'équipe *Pèrôkadô* (Daloa). Votre commande *${order.reference}* (${order.total.toLocaleString('fr-FR')} FCFA) est ${statusLabels[order.status] || order.status}.\n\nSuivez votre marchandise en direct ici : ${trackingUrl}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
}
