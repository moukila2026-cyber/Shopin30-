// ==============================================================================
// PÈRÔKADÔ — Automatisation Paiement 100% Wave Côte d’Ivoire & Webhooks :
// 1) Wave Business Checkout officiel (https://api.wave.com/v1/checkout/sessions)
//    + Signature optionnelle de requête (`WAVE_SIGNING_SECRET`)
//    + Vérification cryptographique du Webhook (`Wave-Signature: t=...,v1=...`)
// 2) Alertes automatiques vers l'équipe / livreurs (Telegram Bot / Webhook externe)
// ==============================================================================
import crypto from 'node:crypto';
import { formatFcfa } from '../shared/catalog.js';

export function isWaveAutoCheckoutEnabled() {
  return Boolean((process.env.WAVE_API_KEY || '').trim());
}

export function isInstantCheckoutEnabled() {
  return isWaveAutoCheckoutEnabled();
}

export function getPaymentIntegrationStatus(origin = '') {
  const cleanOrigin = origin ? origin.replace(/\/+$/, '') : '';
  return {
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
 * Crée une session de paiement officielle Wave Business Checkout (XOF).
 * L'application Wave du client s'ouvre automatiquement avec le montant exact verrouillé
 * (0 FCFA de surcoût agrégateur pour le client).
 */
export async function createWaveCheckoutSession({ amount, reference, trackingToken, origin }) {
  const apiKey = (process.env.WAVE_API_KEY || '').trim();
  if (!apiKey) return null;

  const successUrl = `${origin}/?track=${encodeURIComponent(reference)}&token=${encodeURIComponent(trackingToken)}&paid=1`;
  const errorUrl = `${origin}/?track=${encodeURIComponent(reference)}&token=${encodeURIComponent(trackingToken)}&payment_error=1`;

  const rawBody = JSON.stringify({
    amount: String(Math.round(amount)),
    currency: 'XOF',
    client_reference: reference,
    success_url: successUrl,
    error_url: errorUrl,
  });

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  // Support optionnel du Request Signing officiel Wave Business (`WAVE_SIGNING_SECRET`)
  const signingSecret = (process.env.WAVE_SIGNING_SECRET || '').trim();
  if (signingSecret) {
    const timestamp = Math.floor(Date.now() / 1000);
    const sig = crypto
      .createHmac('sha256', signingSecret)
      .update(`${timestamp}${rawBody}`)
      .digest('hex');
    headers['Wave-Signature'] = `t=${timestamp},v1=${sig}`;
  }

  const res = await fetch('https://api.wave.com/v1/checkout/sessions', {
    method: 'POST',
    headers,
    body: rawBody,
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
 * Vérifie directement auprès de Wave Business l'état d'une session Checkout
 * (`GET https://api.wave.com/v1/checkout/sessions/:id`).
 */
export async function fetchWaveCheckoutStatus(sessionId) {
  const apiKey = (process.env.WAVE_API_KEY || '').trim();
  if (!apiKey || !sessionId) return null;

  const urlPath = `/v1/checkout/sessions/${encodeURIComponent(sessionId)}`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
  };

  const signingSecret = (process.env.WAVE_SIGNING_SECRET || '').trim();
  if (signingSecret) {
    const timestamp = Math.floor(Date.now() / 1000);
    const sig = crypto
      .createHmac('sha256', signingSecret)
      .update(`${timestamp}`)
      .digest('hex');
    headers['Wave-Signature'] = `t=${timestamp},v1=${sig}`;
  }

  const res = await fetch(`https://api.wave.com${urlPath}`, {
    method: 'GET',
    headers,
  });

  if (!res.ok) return null;
  const data = await res.json().catch(() => null);
  if (!data) return null;

  return {
    id: data.id || sessionId,
    checkoutStatus: String(data.checkout_status || '').toLowerCase(), // open | complete | expired
    paymentStatus: String(data.payment_status || '').toLowerCase(), // processing | succeeded | cancelled
    transactionId: data.transaction_id || '',
    clientReference: data.client_reference || '',
  };
}

/**
 * Vérifie la signature cryptographique du Webhook Wave (`Wave-Signature: t=...,v1=...`)
 * afin qu'aucune personne malveillante ne puisse simuler un faux paiement.
 * Compatible avec les deux variantes Wave (avec ou sans point séparateur entre timestamp et body).
 */
export function verifyWaveWebhookSignature(rawBodyBuffer, signatureHeader) {
  const secret = (process.env.WAVE_WEBHOOK_SECRET || '').trim();
  if (!secret || !signatureHeader || !Buffer.isBuffer(rawBodyBuffer)) return false;

  const parts = String(signatureHeader)
    .split(',')
    .map((s) => s.trim());
  const timestampPart = parts.find((p) => p.startsWith('t='));
  const signatures = parts
    .filter((p) => p.startsWith('v1='))
    .map((p) => p.slice(3).toLowerCase())
    .filter((s) => /^[0-9a-f]{64}$/.test(s));

  if (!timestampPart || signatures.length === 0) return false;
  const timestamp = timestampPart.slice(2);

  // Tolérance anti-rejeu de 10 minutes
  const tsNum = Number(timestamp);
  if (!Number.isFinite(tsNum) || tsNum <= 0) return false;
  const nowSec = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSec - tsNum) > 600) return false;

  // Wave Signing Secret concatène `${timestamp}${rawBody}` ; certains webhooks historiques signent `${timestamp}.${rawBody}`
  const expectedNoDot = Buffer.from(
    crypto
      .createHmac('sha256', secret)
      .update(Buffer.concat([Buffer.from(timestamp, 'utf8'), rawBodyBuffer]))
      .digest('hex')
      .toLowerCase(),
    'utf8'
  );
  const expectedWithDot = Buffer.from(
    crypto
      .createHmac('sha256', secret)
      .update(Buffer.concat([Buffer.from(`${timestamp}.`, 'utf8'), rawBodyBuffer]))
      .digest('hex')
      .toLowerCase(),
    'utf8'
  );

  return signatures.some((sig) => {
    const sigBuf = Buffer.from(sig, 'utf8');
    const matchNoDot =
      sigBuf.length === expectedNoDot.length && crypto.timingSafeEqual(sigBuf, expectedNoDot);
    const matchWithDot =
      sigBuf.length === expectedWithDot.length && crypto.timingSafeEqual(sigBuf, expectedWithDot);
    return matchNoDot || matchWithDot;
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

  const header =
    eventType === 'payment.confirmed'
      ? `✅ PAIEMENT WAVE CONFIRMÉ AUTOMATIQUEMENT — ${order.reference}`
      : `🛒 NOUVELLE COMMANDE PÈRÔKADÔ — ${order.reference}`;

  const lines = [
    header,
    `👤 Client : ${order.customerName} (${order.customerPhone})`,
    `📍 Zone : ${order.cityZoneName} — ${order.neighborhood}`,
    `🕒 Créneau : ${order.deliverySlot}`,
    `💳 Montant total Wave : ${formatFcfa(order.total)} (dont livraison ${formatFcfa(order.deliveryFee)})`,
    order.waveTransactionRef ? `🧾 Réf Transaction Wave : ${order.waveTransactionRef}` : null,
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
