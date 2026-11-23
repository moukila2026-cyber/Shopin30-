// ==============================================================================
// PÈRÔKADÔ — Automatisation 100% autonome :
// 1) API Wave Business Checkout (création de session & redirection automatique)
// 2) Vérification cryptographique HMAC-SHA256 du Webhook Wave (validation auto)
// 3) Alertes automatiques vers l'équipe / livreurs (Telegram Bot / Webhook)
// ==============================================================================
import crypto from 'node:crypto';
import { formatFcfa } from '../shared/catalog.js';

export function isWaveAutoCheckoutEnabled() {
  return Boolean((process.env.WAVE_API_KEY || '').trim());
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

  const header =
    eventType === 'payment.confirmed'
      ? `✅ PAIEMENT WAVE CONFIRMÉ AUTOMATIQUEMENT — ${order.reference}`
      : `🛒 NOUVELLE COMMANDE PÈRÔKADÔ — ${order.reference}`;

  const lines = [
    header,
    `👤 Client : ${order.customerName} (${order.customerPhone})`,
    `📍 Zone : ${order.cityZoneName} — ${order.neighborhood}`,
    `🕒 Créneau : ${order.deliverySlot}`,
    `💳 Montant total : ${formatFcfa(order.total)} (dont livraison ${formatFcfa(order.deliveryFee)})`,
    order.waveTransactionRef ? `🧾 Réf Wave : ${order.waveTransactionRef}` : null,
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
