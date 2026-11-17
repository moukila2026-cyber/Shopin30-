// ==============================================================================
// PÈRÔKADÔ — Client HTTP sécurisé (URLs relatives uniquement, support cookie + Bearer)
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
  if (options.body && typeof options.body === 'object' && !(options.body instanceof ArrayBuffer) && !(options.body instanceof Blob)) {
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

export function buildWhatsappOrderUrl(whatsappNumber, order) {
  const cleanNum = String(whatsappNumber || '2250501303343').replace(/\D/g, '');
  const lines = [
    `Bonjour *Pèrôkadô* ! Je viens de passer une commande sur la boutique :`,
    ``,
    `*Référence :* ${order.reference}`,
    `*Client :* ${order.customerName} (${order.customerPhone})`,
    `*Zone :* ${order.cityZoneName} — ${order.neighborhood}`,
    order.addressDetails ? `*Repère :* ${order.addressDetails}` : null,
    `*Créneau :* ${order.deliverySlot}`,
    `*Paiement :* ${order.paymentMethod}`,
    ``,
    `*Articles :*`,
    ...order.items.map(
      (i) => `• ${i.quantity}× ${i.name} (${i.lineTotal.toLocaleString('fr-FR')} FCFA)`
    ),
    ``,
    order.discountAmount > 0
      ? `*Remise (${order.promoCode}) :* -${order.discountAmount.toLocaleString('fr-FR')} FCFA`
      : null,
    `*Livraison :* ${order.deliveryFee === 0 ? 'GRATUITE' : order.deliveryFee.toLocaleString('fr-FR') + ' FCFA'}`,
    `*TOTAL À PAYER :* *${order.total.toLocaleString('fr-FR')} FCFA*`,
    order.customerNote ? `\n*Note :* ${order.customerNote}` : null,
  ].filter(Boolean);

  return `https://wa.me/${cleanNum}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function buildCustomerWhatsappLink(customerPhone, order) {
  let digits = String(customerPhone || '').replace(/\D/g, '');
  if (digits.length === 10 && /^0[157]/.test(digits)) digits = '225' + digits;
  const statusLabels = {
    pending: 'reçue et en cours de confirmation',
    preparing: 'confirmée et en cours de préparation',
    shipped: 'en cours de livraison vers vous',
    delivered: 'livrée. Merci pour votre confiance',
    cancelled: 'annulée',
  };
  const msg = `Bonjour ${order.customerName}, ici l'équipe *Pèrôkadô* (Daloa). Votre commande *${order.reference}* d'un montant de *${order.total.toLocaleString('fr-FR')} FCFA* est ${statusLabels[order.status] || order.status}.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
}
