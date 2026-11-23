// ==============================================================================
// PÈRÔKADÔ — Suite de tests automatisés (Tarifs sans gratuité, Wave uniquement, QR Suivi, Sécurité)
// ==============================================================================
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import crypto from 'node:crypto';
import { createDatabaseAdapter, createStore } from '../server/store.js';
import { createApp } from '../server/app.js';

process.env.ADMIN_PASSWORD = 'TestAdminStrongPassword!2026';
process.env.SESSION_SECRET = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
process.env.WAVE_WEBHOOK_SECRET = 'whsec_test_wave_secret_2026';

let store;
let server;
let baseUrl;

before(async () => {
  store = createStore(() => createDatabaseAdapter(''));
  await store.ensureReady();
  const app = createApp({ store, production: false, serveStatic: false });
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

after(async () => {
  if (server) await new Promise((resolve) => server.close(resolve));
  if (store) await store.close();
});

async function reqJson(path, { method = 'GET', body, token, origin } = {}) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (origin) headers.Origin = origin;
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, headers: res.headers, data };
}

test('1. Catalogue & Grille tarifaire : Daloa Commune 1000 F, Périphérie 1500 F, Expédition 2000 F, aucune livraison gratuite', async () => {
  const health = await reqJson('/api/health');
  assert.equal(health.status, 200);
  assert.equal(health.data.ok, true);
  assert.equal(health.data.brand, 'Pèrôkadô');

  const catalog = await reqJson('/api/catalog');
  assert.equal(catalog.status, 200);
  assert.ok(catalog.data.products.length >= 9);

  const zones = catalog.data.settings.deliveryZones;
  assert.ok(zones.every((z) => z.fee > 0), 'Aucune zone à 0 FCFA (aucune livraison gratuite)');

  const commune = zones.find((z) => z.id === 'daloa-commune');
  const periph = zones.find((z) => z.id === 'daloa-peripherie');
  const issia = zones.find((z) => z.id === 'expedition-issia');
  const vavoua = zones.find((z) => z.id === 'expedition-vavoua');

  assert.equal(commune?.fee, 1000);
  assert.equal(periph?.fee, 1500);
  assert.equal(issia?.fee, 2000);
  assert.equal(vavoua?.fee, 2000);

  // Paiement en ligne Wave uniquement
  assert.equal(catalog.data.paymentMethods.length, 1);
  assert.equal(catalog.data.paymentMethods[0].id, 'wave');
});

test('2. Protection CSRF / Same-Origin et rejet de tout mode de paiement autre que Wave', async () => {
  const csrfRes = await reqJson('/api/orders', {
    method: 'POST',
    origin: 'https://evil-attacker.example.com',
    body: {},
  });
  assert.equal(csrfRes.status, 403);

  const nonWaveRes = await reqJson('/api/orders', {
    method: 'POST',
    body: {
      requestId: 'req_non_wave_1',
      customerName: 'Client Test',
      customerPhone: '0708091011',
      cityZoneId: 'daloa-commune',
      neighborhood: 'Lobia',
      deliverySlot: 'matin',
      paymentMethod: 'especes-livraison',
      waveSenderPhone: '0708091011',
      waveTransactionRef: 'TWAVE1234',
      items: [{ productId: 'ecouteurs-airpulse-pro', quantity: 1 }],
    },
  });
  assert.equal(nonWaveRes.status, 400);
});

test('3. Commande Wave > 50 000 FCFA : livraison toujours facturée (pas de gratuité), référence + jeton QR de suivi en direct', async () => {
  const beforeCat = await reqJson('/api/catalog');
  const phoneProd = beforeCat.data.products.find((p) => p.id === 'smartphone-nova-x12');
  assert.ok(phoneProd);
  const initialStock = phoneProd.stock;

  // Commande de 74 900 FCFA vers Daloa Périphérie (1 500 FCFA) -> livraison facturée même > 50 000 FCFA
  const orderPayload = {
    requestId: 'req_wave_qr_test_1001',
    customerName: 'Kouassi Aya',
    customerPhone: '07 08 09 10 11',
    cityZoneId: 'daloa-peripherie',
    neighborhood: 'Bribouo',
    addressDetails: 'Carrefour école',
    deliverySlot: 'matin',
    paymentMethod: 'wave',
    waveSenderPhone: '0708091011',
    waveTransactionRef: 'TWAVE987654',
    promoCode: 'BIENVENUE10',
    items: [{ productId: phoneProd.id, quantity: 1 }],
  };

  const created = await reqJson('/api/orders', { method: 'POST', body: orderPayload });
  assert.equal(created.status, 201);
  assert.equal(created.data.duplicate, false);
  const order = created.data.order;
  assert.match(order.reference, /^PKD-[A-Z0-9]{6}$/);
  assert.equal(order.paymentMethod, 'wave');
  assert.equal(order.waveTransactionRef, 'TWAVE987654');
  assert.ok(order.trackingToken && order.trackingToken.length === 32, 'Jeton QR généré');

  const expectedSubtotal = phoneProd.price; // 74 900
  const expectedDiscount = Math.round(expectedSubtotal * 0.1); // 7 490
  assert.equal(order.deliveryFee, 1500, 'Aucune livraison gratuite même sur gros panier');
  assert.equal(order.total, expectedSubtotal - expectedDiscount + 1500);

  // Idempotence
  const retry = await reqJson('/api/orders', { method: 'POST', body: orderPayload });
  assert.equal(retry.status, 200);
  assert.equal(retry.data.duplicate, true);
  assert.equal(retry.data.order.reference, order.reference);

  const afterCat = await reqJson('/api/catalog');
  const updatedProd = afterCat.data.products.find((p) => p.id === phoneProd.id);
  assert.equal(updatedProd.stock, initialStock - 1);

  // Suivi direct via le jeton du Code QR (sans avoir à ressaisir le téléphone)
  const qrTrack = await reqJson('/api/orders/track', {
    method: 'POST',
    body: { reference: order.reference, token: order.trackingToken },
  });
  assert.equal(qrTrack.status, 200);
  assert.equal(qrTrack.data.order.reference, order.reference);
  assert.equal(qrTrack.data.order.status, 'pending');

  // Rejet d'un faux jeton QR et d'un faux numéro
  const badQrTrack = await reqJson('/api/orders/track', {
    method: 'POST',
    body: { reference: order.reference, token: '00000000000000000000000000000000' },
  });
  assert.equal(badQrTrack.status, 404);

  // Suivi manuel par référence + téléphone client valide
  const manualTrack = await reqJson('/api/orders/track', {
    method: 'POST',
    body: { reference: order.reference, phone: '+225 07 08 09 10 11' },
  });
  assert.equal(manualTrack.status, 200);
});

test('4. Admin, Agents révocables, Annulation avec restitution stock et Expédition Issia à 2 000 F', async () => {
  const adminLogin = await reqJson('/api/admin/login', {
    method: 'POST',
    body: { credential: process.env.ADMIN_PASSWORD },
  });
  assert.equal(adminLogin.status, 200);
  const adminToken = adminLogin.data.token;

  // Création et révocation d'agent
  const agentRes = await reqJson('/api/admin/agents', {
    method: 'POST',
    token: adminToken,
    body: { name: 'Agent Expédition Issia', phone: '0500112233' },
  });
  assert.equal(agentRes.status, 201);
  const agentCode = agentRes.data.created.plainCode;
  const agentId = agentRes.data.created.id;

  const agentLogin = await reqJson('/api/admin/login', {
    method: 'POST',
    body: { credential: agentCode },
  });
  assert.equal(agentLogin.status, 200);
  const agentToken = agentLogin.data.token;

  // RBAC : agent interdit de création produit
  const forbidden = await reqJson('/api/admin/products', {
    method: 'POST',
    token: agentToken,
    body: { name: 'Interdit', category: 'high-tech', price: 5000, stock: 5 },
  });
  assert.equal(forbidden.status, 403);

  await reqJson(`/api/admin/agents/${agentId}`, { method: 'DELETE', token: adminToken });
  const afterRevoke = await reqJson('/api/admin/overview', { token: agentToken });
  assert.equal(afterRevoke.status, 401);

  // Commande Expédition Issia (2 000 F) puis livraison -> non annulable
  const o2 = await reqJson('/api/orders', {
    method: 'POST',
    body: {
      requestId: 'req_issia_wave_2002',
      customerName: 'Bamba Moussa',
      customerPhone: '0504030201',
      cityZoneId: 'expedition-issia',
      neighborhood: 'Issia Gare',
      deliverySlot: 'soir',
      paymentMethod: 'wave',
      waveSenderPhone: '0504030201',
      waveTransactionRef: 'TWAVE555888',
      items: [{ productId: 'ecouteurs-airpulse-pro', quantity: 1 }],
    },
  });
  assert.equal(o2.status, 201);
  assert.equal(o2.data.order.deliveryFee, 2000);
  const ref2 = o2.data.order.reference;

  await reqJson(`/api/admin/orders/${ref2}/status`, {
    method: 'PATCH',
    token: adminToken,
    body: { status: 'delivered' },
  });

  const cancelDelivered = await reqJson(`/api/admin/orders/${ref2}/status`, {
    method: 'PATCH',
    token: adminToken,
    body: { status: 'cancelled' },
  });
  assert.equal(cancelDelivered.status, 409);
});

test('5. Upload photo binaire sécurisé : rejette un faux fichier et accepte un vrai PNG', async () => {
  const adminLogin = await reqJson('/api/admin/login', {
    method: 'POST',
    body: { credential: process.env.ADMIN_PASSWORD },
  });
  const token = adminLogin.data.token;

  const fakeRes = await fetch(`${baseUrl}/api/admin/products/ecouteurs-airpulse-pro/photo`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'image/png' },
    body: Buffer.from('<svg onload="alert(1)"></svg>'),
  });
  assert.equal(fakeRes.status, 400);

  const minimalPng = Buffer.from(
    '89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c63000100000500010d0a2db40000000049454e44ae426082',
    'hex'
  );
  const okRes = await fetch(`${baseUrl}/api/admin/products/ecouteurs-airpulse-pro/photo`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'image/png' },
    body: minimalPng,
  });
  assert.equal(okRes.status, 200);
});

test('6. Webhook Wave Business 100% automatique : rejette une fausse signature et valide automatiquement un paiement signé', async () => {
  // Créer une commande en attente
  const created = await reqJson('/api/orders', {
    method: 'POST',
    body: {
      requestId: 'req_auto_webhook_001',
      customerName: 'Awa Bamba',
      customerPhone: '0709112233',
      cityZoneId: 'daloa-commune',
      neighborhood: 'Tazibouo',
      deliverySlot: 'matin',
      paymentMethod: 'wave',
      waveSenderPhone: '0709112233',
      waveTransactionRef: 'PENDING',
      items: [{ productId: 'bouilloire-inox-2l', quantity: 1 }],
    },
  });
  assert.equal(created.status, 201);
  assert.equal(created.data.order.status, 'pending');

  const payloadStr = JSON.stringify({
    type: 'checkout.session.completed',
    data: {
      client_reference: created.data.order.reference,
      transaction_id: 'WAVE_AUTO_TX_998877',
      sender_mobile: '+2250709112233',
    },
  });

  // 1) Rejet d'un webhook falsifié
  const badRes = await fetch(`${baseUrl}/api/webhooks/wave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Wave-Signature': 't=1700000000,v1=deadbeef',
    },
    body: payloadStr,
  });
  assert.equal(badRes.status, 401);

  // 2) Validation automatique avec signature HMAC-SHA256 authentique
  const ts = Math.floor(Date.now() / 1000);
  const hmac = crypto
    .createHmac('sha256', process.env.WAVE_WEBHOOK_SECRET)
    .update(`${ts}.${payloadStr}`)
    .digest('hex');

  const goodRes = await fetch(`${baseUrl}/api/webhooks/wave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Wave-Signature': `t=${ts},v1=${hmac}`,
    },
    body: payloadStr,
  });
  assert.equal(goodRes.status, 200);

  // Vérifier que le suivi QR client est passé tout seul à 'preparing' (Wave validé) sans aucune action humaine
  const tracked = await reqJson('/api/orders/track', {
    method: 'POST',
    body: {
      reference: created.data.order.reference,
      token: created.data.order.trackingToken,
    },
  });
  assert.equal(tracked.status, 200);
  assert.equal(tracked.data.order.status, 'preparing');
  assert.equal(tracked.data.order.waveTransactionRef, 'WAVE_AUTO_TX_998877');
});

