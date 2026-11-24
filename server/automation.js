// ==============================================================================
// PÈRÔKADÔ — Automatisation Paiement Instantané & Webhooks :
// 1) SasPay (https://api.saspay.me/api/v1) : Checkout Session (Wave CI, Orange Money,
//    MTN MoMo, Moov, Carte), Vérification directe GET /checkout-sessions/{id}/status/
//    et Webhook signé HMAC-SHA256 (${X-Webhook-Timestamp}.${rawBody}, tolérance 300s)
//    + Payout API optionnel (POST /payouts/initialize/) si activé & IP whitelistée
// 2) Wave Business Checkout officiel (compatibilité native maintenue)
// 3) Alertes automatiques vers l'équipe / livreurs (Telegram Bot / Webhook externe)
// ==============================================================================
import crypto from 'node:crypto';
import { formatFcfa } from '../shared/catalog.js';

const SASPAY_DEFAULT_BASE_URL = 'https://api.saspay.me/api/v1';
const SASPAY_WEBHOOK_TOLERANCE_SEC = 300; // 5 minutes exactement selon docs.saspay.me

export function getSaspayBaseUrl() {
  const custom = (process.env.SASPAY_BASE_URL || '').trim();
  if (custom) return custom.replace(/\/+$/, '');
  if (process.env.SASPAY_SANDBOX === '1' || process.env.SASPAY_SANDBOX === 'true') {
    return 'https://sandbox-api.saspay.me/api/v1';
  }
  return SASPAY_DEFAULT_BASE_URL;
}

export function isSaspayEnabled() {
  return Boolean((process.env.SASPAY_API_KEY || '').trim());
}

export function isWaveAutoCheckoutEnabled() {
  return Boolean((process.env.WAVE_API_KEY || '').trim());
}

export function isInstantCheckoutEnabled() {
  return isSaspayEnabled() || isWaveAutoCheckoutEnabled();
}

export function getPaymentIntegrationStatus(origin = '') {
  const cleanOrigin = origin ? origin.replace(/\/+$/, '') : '';
  return {
    saspayConfigured: isSaspayEnabled(),
    saspayWebhookSecretConfigured: Boolean((process.env.SASPAY_WEBHOOK_SECRET || '').trim()),
    saspayAutoPayoutConfigured: Boolean(
      (process.env.SASPAY_AUTO_PAYOUT || '').trim() === 'true' &&
        (process.env.SASPAY_PAYOUT_MSISDN || '').trim() &&
        (process.env.SASPAY_PAYOUT_METHOD || '').trim()
    ),
    saspayBaseUrl: getSaspayBaseUrl(),
    saspayWebhookUrl: cleanOrigin ? `${cleanOrigin}/api/webhooks/saspay` : '/api/webhooks/saspay',
    waveAutoConfigured: isWaveAutoCheckoutEnabled(),
    waveWebhookSecretConfigured: Boolean((process.env.WAVE_WEBHOOK_SECRET || '').trim()),
    waveWebhookUrl: cleanOrigin ? `${cleanOrigin}/api/webhooks/wave` : '/api/webhooks/wave',
    telegramConfigured: Boolean(
      (process.env.TELEGRAM_BOT_TOKEN || '').trim() &&
        (process.env.TELEGRAM_CHAT_ID || '').trim()
    ),
  };
}

/**
 * Déballe l'enveloppe standard SasPay `{ success, data, code }` ou renvoie l'objet direct.
 */
function unwrapSaspayData(json) {
  if (json && typeof json === 'object' && json.data && typeof json.data === 'object') {
    return json.data;
  }
  return json || {};
}

/**
 * Crée une session de checkout hébergée SasPay (`POST /api/v1/checkout-sessions/`).
 * Le client choisit librement Wave CI, Orange Money CI, MTN MoMo CI, Moov Money CI ou Carte,
 * puis est redirigé automatiquement vers sa page Code QR Pèrôkadô 3s après succès.
 */
export async function createSaspayCheckoutSession({
  amount,
  reference,
  trackingToken,
  customerName,
  customerPhone,
  customerEmail,
  origin,
}) {
  const apiKey = (process.env.SASPAY_API_KEY || '').trim();
  if (!apiKey) return null;

  const baseUrl = getSaspayBaseUrl();
  const returnUrl = `${origin}/?track=${encodeURIComponent(reference)}&token=${encodeURIComponent(trackingToken)}&saspay=1`;

  // SasPay exige un montant sous forme de chaîne décimale ("5000.00") et un customer_email valide
  const amountDecimal = `${Math.max(200, Math.round(Number(amount) || 0))}.00`;
  const cleanDigits = String(customerPhone || '').replace(/\D/g, '') || '00000000';
  const fallbackEmail =
    customerEmail && String(customerEmail).includes('@')
      ? String(customerEmail).trim()
      : `client.${cleanDigits}@perokado.ci`;

  const body = {
    amount: amountDecimal,
    currency: 'XOF',
    country: 'CI',
    description: `Commande Pèrôkadô ${reference}`,
    customer_name: String(customerName || 'Client Pèrôkadô').trim(),
    customer_email: fallbackEmail,
    customer_phone: String(customerPhone || '').trim(),
    return_url: returnUrl,
    metadata: {
      order_reference: reference,
      brand: 'Perokado',
    },
  };

  const feeMode = (process.env.SASPAY_FEE_CHARGE_MODE || '').trim().toUpperCase();
  if (feeMode === 'ADD_ON' || feeMode === 'DEDUCTED') {
    body.fee_charge_mode = feeMode;
  }

  const res = await fetch(`${baseUrl}/checkout-sessions/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`SasPay Checkout API (${res.status}): ${errText.slice(0, 220)}`);
  }

  const raw = await res.json();
  const data = unwrapSaspayData(raw);

  return {
    provider: 'saspay',
    sessionId: data.id || '',
    slug: data.slug || '',
    checkoutUrl: data.checkout_url || '',
    status: data.status || 'PENDING',
    transactionId: data.transaction || data.transaction_id || '',
  };
}

/**
 * Vérifie en direct auprès de SasPay l'état réel d'une session de checkout
 * (`GET /api/v1/checkout-sessions/{id}/status/`).
 * Sert à la fois de filet de sécurité au retour du client sur sa page QR et de double contrôle.
 */
export async function fetchSaspayCheckoutStatus(sessionId) {
  const apiKey = (process.env.SASPAY_API_KEY || '').trim();
  if (!apiKey || !sessionId) return null;

  const baseUrl = getSaspayBaseUrl();
  const res = await fetch(
    `${baseUrl}/checkout-sessions/${encodeURIComponent(sessionId)}/status/`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  if (!res.ok) return null;
  const raw = await res.json().catch(() => null);
  const data = unwrapSaspayData(raw);
  return {
    sessionId: data.id || sessionId,
    status: String(data.status || '').toUpperCase(), // PENDING | PAID | EXPIRED | CANCELLED
    transactionId: data.transaction_id || '',
    transactionStatus: String(data.transaction_status || '').toUpperCase(), // PENDING | SUCCESS | FAILED
    transactionReference: data.transaction_reference || '',
  };
}

/**
 * Vérifie directement une transaction SasPay (`GET /api/v1/payments/{payment_id}/verify/`).
 */
export async function verifySaspayPaymentById(paymentId) {
  const apiKey = (process.env.SASPAY_API_KEY || '').trim();
  if (!apiKey || !paymentId) return null;

  const baseUrl = getSaspayBaseUrl();
  const res = await fetch(
    `${baseUrl}/payments/${encodeURIComponent(paymentId)}/verify/`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  if (!res.ok) return null;
  const raw = await res.json().catch(() => null);
  const data = unwrapSaspayData(raw);
  return {
    id: data.id || paymentId,
    status: String(data.status || '').toUpperCase(), // PENDING | SUCCESS | FAILED
    reference: data.reference || '',
    netAmount: data.net_amount || data.amounts?.net || null,
    chargedAmount: data.debited_amount || data.amounts?.charged || null,
    currency: data.currency || 'XOF',
    msisdn: data.msisdn || '',
    metadata: data.metadata || {},
  };
}

/**
 * Vérifie la signature cryptographique officielle SasPay :
 * - Header `X-Webhook-Timestamp` : horodatage Unix en secondes (tolérance stricte <= 300s)
 * - Header `X-Webhook-Signature` : HMAC-SHA256 hexadécimal minuscule sur `${timestamp}.${rawBody}`
 * - Comparaison en temps constant (`crypto.timingSafeEqual`)
 */
export function verifySaspayWebhookSignature(rawBodyBuffer, signatureHeader, timestampHeader) {
  const secret = (process.env.SASPAY_WEBHOOK_SECRET || '').trim();
  if (!secret || !signatureHeader || !timestampHeader || !Buffer.isBuffer(rawBodyBuffer)) {
    return false;
  }

  const tsNum = Number(String(timestampHeader).trim());
  if (!Number.isFinite(tsNum) || tsNum <= 0) return false;

  const nowSec = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSec - tsNum) > SASPAY_WEBHOOK_TOLERANCE_SEC) {
    return false;
  }

  const cleanSig = String(signatureHeader)
    .trim()
    .replace(/^sha256=/i, '')
    .toLowerCase();
  if (!/^[0-9a-f]{64}$/.test(cleanSig)) return false;

  const signedPayload = Buffer.concat([
    Buffer.from(`${String(timestampHeader).trim()}.`, 'utf8'),
    rawBodyBuffer,
  ]);
  const expectedHex = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex')
    .toLowerCase();

  const sigBuf = Buffer.from(cleanSig, 'utf8');
  const expBuf = Buffer.from(expectedHex, 'utf8');
  return sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);
}

/**
 * Déclenche optionnellement un reversement automatique (payout) depuis le wallet SasPay
 * vers le numéro Mobile Money du marchand (`POST /api/v1/payouts/initialize/`).
 * NOTE IMPORTANTE SASPAY : exige une clé API scopée `PAYOUT` ou `BOTH`, l'activation des
 * retraits sur le compte marchand et une IP serveur fixe whitelistée dans SasPay.
 * Sur un hébergement serverless à IP dynamique (comme Vercel), l'échec du payout auto est
 * capturé proprement sans jamais bloquer la validation de la commande client.
 */
export async function triggerOptionalSaspayAutoPayout({ netAmount, orderReference }) {
  if ((process.env.SASPAY_AUTO_PAYOUT || '').trim() !== 'true') return null;
  const apiKey = (process.env.SASPAY_API_KEY || '').trim();
  const msisdn = (process.env.SASPAY_PAYOUT_MSISDN || '').trim();
  const method = (process.env.SASPAY_PAYOUT_METHOD || 'wave_ci').trim(); // ex: wave_ci, orange_ci, mtn_ci, moov_ci
  const country = (process.env.SASPAY_PAYOUT_COUNTRY || 'CI').trim().toUpperCase();

  const numericNet = Math.floor(Number(netAmount) || 0);
  if (!apiKey || !msisdn || numericNet < 200) return null;

  const baseUrl = getSaspayBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/payouts/initialize/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `payout-${orderReference}`,
      },
      body: JSON.stringify({
        amount: `${numericNet}.00`,
        currency: 'XOF',
        country,
        customer: { phone: msisdn.startsWith('+') ? msisdn : `+225${msisdn.replace(/^225/, '')}` },
        method,
        recipient: { msisdn },
        description: `Reversement auto commande Pèrôkadô ${orderReference}`,
      }),
    });
    if (!res.ok) return null;
    const raw = await res.json().catch(() => null);
    const data = unwrapSaspayData(raw);
    return data.id || null;
  } catch {
    return null;
  }
}

/**
 * Crée une session de paiement officielle Wave Business Checkout (XOF).
 * L'application Wave du client s'ouvre automatiquement avec le montant exact verrouillé.
 */
export async function createWaveCheckoutSession({ amount, reference, trackingToken, origin }) {
  const apiKey = (process.env.WAVE_API_KEY || '').trim();
  if (!apiKey) return null;

  const successUrl = `${origin}/?track=${encodeURIComponent(reference)}&token=${encodeURIComponent(trackingToken)}&paid=1`;
  const errorUrl = `${origin}/?track=${encodeURIComponent(reference)}&token=${encodeURIComponent(trackingToken)}&payment_error=1`;

  const res = await fetch('https://api.wave.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: String(Math.round(amount)),
      currency: 'XOF',
      client_reference: reference,
      success_url: successUrl,
      error_url: errorUrl,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    throw new Error(`Wave Checkout API (${res.status}): ${errBody.slice(0, 180)}`);
  }

  const data = await res.json();
  return {
    provider: 'wave',
    sessionId: data.id || '',
    launchUrl: data.wave_launch_url || '',
  };
}

/**
 * Vérifie la signature cryptographique du Webhook Wave (`Wave-Signature: t=...,v1=...`)
 * afin qu'aucune personne malveillante ne puisse simuler un faux paiement.
 */
export function verifyWaveWebhookSignature(rawBodyBuffer, signatureHeader) {
  const secret = (process.env.WAVE_WEBHOOK_SECRET || '').trim();
  if (!secret || !signatureHeader || !Buffer.isBuffer(rawBodyBuffer)) return false;

  const parts = String(signatureHeader)
    .split(',')
    .map((s) => s.trim());
  const timestampPart = parts.find((p) => p.startsWith('t='));
  const signatures = parts.filter((p) => p.startsWith('v1=')).map((p) => p.slice(3));

  if (!timestampPart || signatures.length === 0) return false;
  const timestamp = timestampPart.slice(2);

  // Tolérance anti-rejeu de 10 minutes
  const tsNum = Number(timestamp);
  if (Number.isFinite(tsNum) && tsNum > 0) {
    const nowSec = Math.floor(Date.now() / 1000);
    if (Math.abs(nowSec - tsNum) > 600) return false;
  }

  const payloadToSign = Buffer.concat([
    Buffer.from(`${timestamp}.`, 'utf8'),
    rawBodyBuffer,
  ]);
  const expectedHex = crypto
    .createHmac('sha256', secret)
    .update(payloadToSign)
    .digest('hex');

  const expectedBuf = Buffer.from(expectedHex, 'utf8');
  return signatures.some((sig) => {
    const sigBuf = Buffer.from(sig, 'utf8');
    return sigBuf.length === expectedBuf.length && crypto.timingSafeEqual(sigBuf, expectedBuf);
  });
}

/**
 * Envoie automatiquement une alerte instantanée à l'équipe / livreurs à Daloa
 * via Telegram Bot (100% gratuit) et/ou un Webhook externe (Make, Zapier, WhatsApp Cloud API).
 * N'interrompt jamais la commande du client même si le réseau tiers ne répond pas.
 */
export async function dispatchOrderAlert(order, eventType = 'order.created') {
  const tgToken = (process.env.TELEGRAM_BOT_TOKEN || '').trim();
  const tgChatId = (process.env.TELEGRAM_CHAT_ID || '').trim();
  const customWebhook = (process.env.ORDER_ALERT_WEBHOOK_URL || '').trim();

  if (!tgToken && !customWebhook) return;

  const providerBadge =
    order.paymentProvider === 'saspay' ? 'SASPAY' : 'WAVE';

  const header =
    eventType === 'payment.confirmed'
      ? `✅ PAIEMENT ${providerBadge} CONFIRMÉ AUTOMATIQUEMENT — ${order.reference}`
      : `🛒 NOUVELLE COMMANDE PÈRÔKADÔ — ${order.reference}`;

  const lines = [
    header,
    `👤 Client : ${order.customerName} (${order.customerPhone})`,
    `📍 Zone : ${order.cityZoneName} — ${order.neighborhood}`,
    `🕒 Créneau : ${order.deliverySlot}`,
    `💳 Montant total : ${formatFcfa(order.total)} (dont livraison ${formatFcfa(order.deliveryFee)})`,
    order.waveTransactionRef ? `🧾 Réf Transaction : ${order.waveTransactionRef}` : null,
    `📦 Articles :`,
    ...(order.items || []).map((i) => `  • ${i.quantity}× ${i.name} (${formatFcfa(i.lineTotal)})`),
    order.customerNote ? `📝 Note : ${order.customerNote}` : null,
  ].filter(Boolean);

  const tasks = [];

  if (tgToken && tgChatId) {
    tasks.push(
      fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: lines.join('\n'),
        }),
      }).catch(() => {})
    );
  }

  if (customWebhook) {
    tasks.push(
      fetch(customWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: eventType, order }),
      }).catch(() => {})
    );
  }

  await Promise.allSettled(tasks);
}
