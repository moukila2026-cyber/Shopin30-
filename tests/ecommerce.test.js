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

  // Moyens de paiement : 4 mobile money ivoiriens + espèces à la livraison
  assert.deepEqual(
    catalog.data.paymentMethods.map((m) => m.id),
    ['wave', 'orange-money', 'mtn-momo', 'moov-money', 'especes-livraison']
  );
});

test('2. Protection CSRF / Same-Origin et rejet des moyens de paiement inconnus', async () => {
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
      paymentMethod: 'bitcoin-libre',
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

test('7. Gamme SMART TECHNOLOGY, séparation stricte Wave (+225 05 46 69 74 78) vs WhatsApp (+225 05 01 30 33 43) & Webhook signé Wave Business', async () => {
  // 1) Vérifier le catalogue public + les 2 numéros officiels distincts
  const cat = await reqJson('/api/catalog');
  assert.equal(cat.status, 200);
  assert.equal(cat.data.settings.wavePhone, '+225 05 46 69 74 78');
  assert.equal(cat.data.settings.whatsappNumber, '2250501303343');
  assert.deepEqual(
    cat.data.paymentMethods.map((m) => m.id),
    ['wave', 'orange-money', 'mtn-momo', 'moov-money', 'especes-livraison']
  );

  const smartFrigo = cat.data.products.find((p) => p.id === 'smart-frigo-4-portes-inverter-inox');
  const smartFoutou = cat.data.products.find((p) => p.id === 'smart-broyeur-foutou-stpe-792');
  const smartMicro = cat.data.products.find((p) => p.id === 'smart-micro-ondes-25l-stmw-25wg');
  assert.ok(smartFrigo, 'Réfrigérateur 4 portes SMART présent');
  assert.ok(smartFoutou, 'Machine à foutou SMART présente');
  assert.ok(smartMicro, 'Micro-ondes 25L SMART présent');

  // 2) Vérifier que l'administrateur peut modifier un prix SMART TECHNOLOGY à tout moment selon le fournisseur
  const adminLogin = await reqJson('/api/admin/login', {
    method: 'POST',
    body: { credential: process.env.ADMIN_PASSWORD },
  });
  const adminToken = adminLogin.data.token;

  const updatedRes = await reqJson(`/api/admin/products/${smartMicro.id}`, {
    method: 'PUT',
    token: adminToken,
    body: {
      name: smartMicro.name,
      category: smartMicro.category,
      price: 43500,
      compareAtPrice: 65000,
      stock: 12,
      badge: smartMicro.badge,
      featured: true,
      active: true,
      shortDescription: smartMicro.shortDescription,
      description: smartMicro.description,
      specs: smartMicro.specs,
    },
  });
  assert.equal(updatedRes.status, 200);
  assert.equal(updatedRes.data.product.price, 43500);

  // 3) Créer une commande sur la machine à foutou SMART TECHNOLOGY
  const created = await reqJson('/api/orders', {
    method: 'POST',
    body: {
      requestId: 'req_wave_webhook_smart_01',
      customerName: 'Koné Mariam',
      customerPhone: '0744556677',
      cityZoneId: 'daloa-commune',
      neighborhood: 'Commerce',
      deliverySlot: 'apres-midi',
      paymentMethod: 'wave',
      waveSenderPhone: '0744556677',
      waveTransactionRef: 'PENDING_WAVE',
      items: [{ productId: smartFoutou.id, quantity: 1 }],
    },
  });
  assert.equal(created.status, 201);
  const orderRef = created.data.order.reference;
  const qrTok = created.data.order.trackingToken;

  // 4) Rejeter un webhook Wave avec un horodatage expiré (> 600s) ou une mauvaise signature
  const waveBody = JSON.stringify({
    id: 'ae_wave_evt_01',
    type: 'checkout.session.completed',
    data: {
      id: 'cos-18qq25rgr100a',
      client_reference: orderRef,
      transaction_id: 'TWAVE2026CI001',
      sender_mobile: '+2250744556677',
      currency: 'XOF',
      amount: String(created.data.order.total),
      payment_status: 'succeeded',
      checkout_status: 'complete',
    },
  });

  const expiredTs = String(Math.floor(Date.now() / 1000) - 900);
  const expiredSig = crypto
    .createHmac('sha256', process.env.WAVE_WEBHOOK_SECRET)
    .update(`${expiredTs}${waveBody}`)
    .digest('hex');

  const expiredRes = await fetch(`${baseUrl}/api/webhooks/wave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Wave-Signature': `t=${expiredTs},v1=${expiredSig}`,
    },
    body: waveBody,
  });
  assert.equal(expiredRes.status, 401, 'Doit rejeter un webhook Wave expiré');

  // 5) Valider automatiquement avec un webhook Wave authentique (HMAC valide)
  const freshTs = String(Math.floor(Date.now() / 1000));
  const freshSig = crypto
    .createHmac('sha256', process.env.WAVE_WEBHOOK_SECRET)
    .update(`${freshTs}${waveBody}`)
    .digest('hex');

  const validRes = await fetch(`${baseUrl}/api/webhooks/wave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Wave-Signature': `t=${freshTs},v1=${freshSig}`,
    },
    body: waveBody,
  });
  assert.equal(validRes.status, 200);

  // 6) Le suivi QR client doit afficher 'preparing' automatiquement
  const tracked = await reqJson('/api/orders/track', {
    method: 'POST',
    body: { reference: orderRef, token: qrTok },
  });
  assert.equal(tracked.status, 200);
  assert.equal(tracked.data.order.status, 'preparing');
  assert.equal(tracked.data.order.paymentProvider, 'wave');
  assert.equal(tracked.data.order.waveTransactionRef, 'TWAVE2026CI001');
});

test('8. Produits lourds (lave-linge, gazinières, frigos & nouveaux produits) : 2 500 F dans Daloa et 5 000 F hors Daloa', async () => {
  const cat = await reqJson('/api/catalog');
  assert.equal(cat.status, 200);

  const laveLinge = cat.data.products.find((p) => p.id === 'smart-lave-linge-10kg-stml-108m');
  const gaziniere = cat.data.products.find((p) => p.id === 'smart-cuisiniere-gaz-5-feux-inox');
  const frigo = cat.data.products.find((p) => p.id === 'smart-frigo-combine-2-portes-led');
  const ferSec = cat.data.products.find((p) => p.id === 'smart-fer-sec-stpfr-5103');

  assert.equal(laveLinge.isHeavy, true, 'Lave-linge détecté comme produit lourd');
  assert.equal(gaziniere.isHeavy, true, 'Gazinière détectée comme produit lourd');
  assert.equal(frigo.isHeavy, true, 'Réfrigérateur détecté comme produit lourd');
  assert.equal(ferSec.isHeavy, false, 'Fer à repasser reste un colis standard');

  // 1) Lave-linge livré dans Daloa Commune -> 2 500 FCFA (au lieu de 1 000 FCFA)
  const orderDaloa = await reqJson('/api/orders', {
    method: 'POST',
    body: {
      requestId: 'req_heavy_daloa_01',
      customerName: 'Bamba Souleymane',
      customerPhone: '0708091011',
      cityZoneId: 'daloa-commune',
      neighborhood: 'Tazibouo',
      deliverySlot: 'matin',
      paymentMethod: 'wave',
      waveSenderPhone: '0708091011',
      waveTransactionRef: 'WV_HEAVY_DALOA',
      items: [{ productId: laveLinge.id, quantity: 1 }],
    },
  });
  assert.equal(orderDaloa.status, 201);
  assert.equal(orderDaloa.data.order.deliveryFee, 2500);
  assert.equal(orderDaloa.data.order.total, laveLinge.price + 2500);

  // 2) Gazinière livrée en Périphérie de Daloa -> 2 500 FCFA (au lieu de 1 500 FCFA)
  const orderPeripherie = await reqJson('/api/orders', {
    method: 'POST',
    body: {
      requestId: 'req_heavy_periph_01',
      customerName: 'Kouadio Aya',
      customerPhone: '0504030201',
      cityZoneId: 'daloa-peripherie',
      neighborhood: 'Bribouo',
      deliverySlot: 'apres-midi',
      paymentMethod: 'wave',
      waveSenderPhone: '0504030201',
      waveTransactionRef: 'WV_HEAVY_PERIPH',
      items: [{ productId: gaziniere.id, quantity: 1 }],
    },
  });
  assert.equal(orderPeripherie.status, 201);
  assert.equal(orderPeripherie.data.order.deliveryFee, 2500);

  // 3) Gazinière expédiée hors de Daloa (Issia) -> 5 000 FCFA (au lieu de 2 000 FCFA)
  const orderExpedition = await reqJson('/api/orders', {
    method: 'POST',
    body: {
      requestId: 'req_heavy_issia_01',
      customerName: 'Yao Koffi',
      customerPhone: '0102030405',
      cityZoneId: 'expedition-issia',
      neighborhood: 'Quartier Commerce Issia',
      deliverySlot: 'matin',
      paymentMethod: 'wave',
      waveSenderPhone: '0102030405',
      waveTransactionRef: 'WV_HEAVY_ISSIA',
      items: [{ productId: gaziniere.id, quantity: 1 }],
    },
  });
  assert.equal(orderExpedition.status, 201);
  assert.equal(orderExpedition.data.order.deliveryFee, 5000);
  assert.equal(orderExpedition.data.order.total, gaziniere.price + 5000);

  // 4) Nouveau produit lourd ajouté plus tard par l'administrateur dans /gestion
  const adminLogin = await reqJson('/api/admin/login', {
    method: 'POST',
    body: { credential: process.env.ADMIN_PASSWORD },
  });
  const newProdRes = await reqJson('/api/admin/products', {
    method: 'POST',
    token: adminLogin.data.token,
    body: {
      name: 'Congélateur Horizontal Coffre SMART TECHNOLOGY 300L',
      category: 'maison', // Même classé dans 'maison', son nom "Congélateur" ou isHeavy le rend lourd automatiquement !
      price: 175000,
      stock: 4,
      badge: 'Nouveau',
      featured: true,
      active: true,
    },
  });
  assert.equal(newProdRes.status, 201);
  assert.equal(newProdRes.data.product.isHeavy, true, 'Nouveau congélateur auto-détecté lourd');

  const orderFutureHeavy = await reqJson('/api/orders', {
    method: 'POST',
    body: {
      requestId: 'req_heavy_vavoua_future_01',
      customerName: 'Traoré Moussa',
      customerPhone: '0799887766',
      cityZoneId: 'expedition-vavoua',
      neighborhood: 'Centre Vavoua',
      deliverySlot: 'soir',
      paymentMethod: 'wave',
      waveSenderPhone: '0799887766',
      waveTransactionRef: 'WV_FUTURE_HEAVY',
      items: [{ productId: newProdRes.data.product.id, quantity: 1 }],
    },
  });
  assert.equal(orderFutureHeavy.status, 201);
  assert.equal(orderFutureHeavy.data.order.deliveryFee, 5000);
});

test('9. Rayon dédié Motos & Tricycles Cargo (16 modèles officiels, prix FCFA exacts & livraison lourde 2 500 F / 5 000 F)', async () => {
  const cat = await reqJson('/api/catalog');
  assert.equal(cat.status, 200);

  const motosCategory = cat.data.categories.find((c) => c.id === 'motos-tricycles');
  assert.ok(motosCategory, 'La catégorie dédiée motos-tricycles est présente');

  const expectedMotos = [
    ['moto-apsonic-125-30', 550000],
    ['moto-sania-125-8', 550000],
    ['moto-ktm', 400000],
    ['moto-apsonic-x1', 400000],
    ['moto-haojue-150', 870000],
    ['moto-haojue-dk', 870000],
    ['moto-haojue-dame', 600000],
    ['moto-tvs-rock-z', 770000],
    ['moto-apsonic-apache', 1200000],
    ['moto-apsonic-200-cross', 720000],
    ['moto-apsonic-200-27', 750000],
    ['moto-apsonic-125-8', 500000],
    ['moto-apsonic-125-12', 500000],
    ['moto-royal-cross', 900000],
    ['moto-apsonic-tricycle-200-cargo', 1400000],
    ['moto-apsonic-tricycle-150-175', 1250000],
  ];

  for (const [id, expectedPrice] of expectedMotos) {
    const prod = cat.data.products.find((p) => p.id === id);
    assert.ok(prod, `Produit ${id} présent dans le catalogue`);
    assert.equal(prod.category, 'motos-tricycles');
    assert.equal(prod.price, expectedPrice, `Prix exact pour ${id}`);
    assert.equal(prod.isHeavy, true, `${id} est marqué produit lourd`);
  }

  // Commande d'une moto Apsonic 125-30 à Daloa Commune -> livraison produit lourd 2 500 FCFA
  const motoOrderDaloa = await reqJson('/api/orders', {
    method: 'POST',
    body: {
      requestId: 'req_moto_daloa_01',
      customerName: 'Bamba Seydou',
      customerPhone: '0708091011',
      cityZoneId: 'daloa-commune',
      neighborhood: 'Tazibouo',
      deliverySlot: 'matin',
      paymentMethod: 'wave',
      waveSenderPhone: '0708091011',
      waveTransactionRef: 'WV_MOTO_DALOA',
      items: [{ productId: 'moto-apsonic-125-30', quantity: 1 }],
    },
  });
  assert.equal(motoOrderDaloa.status, 201);
  assert.equal(motoOrderDaloa.data.order.deliveryFee, 2500);
  assert.equal(motoOrderDaloa.data.order.total, 552500);
});

test('Rayon Jouets & Enfants : 14 produits identifiés avec marges conformes (<= 2 000 FCFA) et livraison standard', async () => {
  const cat = await reqJson('/api/catalog');
  assert.equal(cat.status, 200);

  const jouetsCategory = cat.data.categories.find((c) => c.id === 'jouets-enfants');
  assert.ok(jouetsCategory, 'La catégorie dédiée jouets-enfants est présente');

  const expectedJouets = [
    ['jouet-coloriage-38en1-stitch', 4700, 5200],
    ['jouet-perles-heishi-sentosphere', 10750, 11750],
    ['jouet-dinette-the-metal-fruits', 7500, 8000],
    ['jouet-dinette-the-metal-pois-rouges', 10800, 11800],
    ['jouet-cuisine-inox-simulation-set', 14500, 16000],
    ['jouet-uno-spin-roue', 6500, 7000],
    ['jouet-jeu-eau-manette-superheros', 3200, 3500],
    ['jouet-pistolet-eau-electrique-270ml', 12750, 13750],
    ['jouet-voiture-f1-rc-spray-champion', 9900, 10900],
    ['jouet-pistolet-eau-electrique-680ml-led', 19500, 21000],
    ['jouet-cogo-5818-moto-600pcs', 20500, 22500],
    ['jouet-forange-moto-helico-2en1', 14900, 16400],
    ['jouet-caisse-disney-princess-legumes', 16500, 18000],
    ['jouet-caisse-playhouse-burger-panier', 16900, 18400],
  ];

  for (const [id, basePrice, expectedSellPrice] of expectedJouets) {
    const prod = cat.data.products.find((p) => p.id === id);
    assert.ok(prod, `Jouet ${id} présent dans le catalogue`);
    assert.equal(prod.category, 'jouets-enfants');
    assert.equal(prod.price, expectedSellPrice, `Prix Pèrôkadô exact pour ${id}`);
    const margin = prod.price - basePrice;
    assert.ok(margin >= 200 && margin <= 2000, `Marge ${margin} FCFA comprise entre 200 F et 2 000 F max`);
    assert.equal(prod.isHeavy, false, `${id} est en colis standard (non lourd)`);
  }

  // Commande d'un jouet COGO 5818 Moto à Daloa Commune -> livraison standard 1 000 FCFA (et non 2 500 F !)
  const toyOrder = await reqJson('/api/orders', {
    method: 'POST',
    body: {
      requestId: 'req_toy_daloa_01',
      customerName: 'Koffi Aya',
      customerPhone: '0504030201',
      cityZoneId: 'daloa-commune',
      neighborhood: 'Lobia',
      deliverySlot: 'apres-midi',
      paymentMethod: 'wave',
      waveSenderPhone: '0504030201',
      waveTransactionRef: 'WV_TOY_DALOA_01',
      items: [{ productId: 'jouet-cogo-5818-moto-600pcs', quantity: 1 }],
    },
  });
  assert.equal(toyOrder.status, 201);
  assert.equal(toyOrder.data.order.deliveryFee, 1000);
  assert.equal(toyOrder.data.order.total, 23500);
});



test('10. Arrivage Nov. 2026 : Quincaillerie INGCO/FRENCIA (27), Nouveautés SMART & Mobilier (11), prix exacts et livraison lourde/standard', async () => {
  const cat = await reqJson('/api/catalog');
  assert.equal(cat.status, 200);

  const quinCategory = cat.data.categories.find((c) => c.id === 'quincaillerie-btp');
  assert.ok(quinCategory, 'La catégorie dédiée quincaillerie-btp est présente');

  const expectedQuin = [
    ['frencia-wc001', 52000, true],
    ['frencia-wc045', 58000, true],
    ['frencia-wc129', 55000, true],
    ['ingco-coupe-carreaux-800mm', 76500, false],
    ['ingco-coupe-carreaux-600mm-htc04600', 31500, false],
    ['ingco-perceuse-percussion-1100w', 46500, false],
    ['ingco-cle-a-chocs-sans-fil-20v', 66500, false],
    ['ingco-rabot-electrique-1050w-pl10508', 56500, false],
    ['dingqi-rabot-electrique-500w', 39500, false],
    ['ingco-pompe-immergee-forage-dwp37062', 107000, false],
    ['ingco-pompe-immergee-forage-dwp55062', 122000, false],
    ['ingco-pompe-immergee-forage-dwp75062', 142000, false],
    ['ingco-coupe-boulons-36-hbc0836', 29000, false],
    ['ingco-coupe-boulons-24-hbc0824', 17000, false],
    ['ingco-niveau-100cm-hsl08100', 5500, false],
    ['ingco-scie-egoine-hhas08550', 4000, false],
    ['ingco-marteau-hch80816', 8500, false],
    ['ingco-metre-ruban-hsmt0810', 3500, false],
    ['ingco-truelle-hbt818', 3000, false],
    ['ingco-spatule-hput08100', 2500, false],
  ];
  for (const [id, expectedPrice, expectedHeavy] of expectedQuin) {
    const prod = cat.data.products.find((p) => p.id === id);
    assert.ok(prod, `Produit quincaillerie ${id} présent`);
    assert.equal(prod.category, 'quincaillerie-btp');
    assert.equal(prod.price, expectedPrice, `Prix exact pour ${id}`);
    assert.equal(prod.isHeavy, expectedHeavy, `isHeavy pour ${id}`);
    assert.ok(prod.imageUrl && !prod.imageUrl.includes('placeholder'), `Photo studio pour ${id}`);
  }

  const expectedNouv = [
    ['salon-angle-resine-tressee-table-basse', 'maison', 275000, true],
    ['smart-congelateur-horizontal-silver-stcc-320', 'froid', 152000, true],
    ['smart-congelateur-horizontal-vitre-stccv-313', 'froid', 165000, true],
    ['smart-fontaine-eau-3-robinets-or-stfo-br538', 'froid', 79000, true],
    ['smart-fontaine-eau-noire-stfo-599a', 'froid', 69000, true],
    ['smart-fontaine-eau-inox-stfo-by601s', 'froid', 85000, true],
    ['smart-cuisiniere-gaz-4-feux-50x50-stc5050b', 'lavage-cuisson', 86900, true],
    ['smart-google-tv-58-4k-stt5880k', 'high-tech', 215000, true],
    ['smart-google-tv-85-4k-stt8580k', 'high-tech', 665000, true],
    ['smart-home-cinema-karaoke-2000w-sthp2100e', 'high-tech', 109000, false],
    ['smart-enceinte-colonne-1000w-sthp0100e', 'high-tech', 115000, false],
  ];
  for (const [id, expectedCat, expectedPrice, expectedHeavy] of expectedNouv) {
    const prod = cat.data.products.find((p) => p.id === id);
    assert.ok(prod, `Nouveauté ${id} présente`);
    assert.equal(prod.category, expectedCat);
    assert.equal(prod.price, expectedPrice, `Prix exact pour ${id}`);
    assert.equal(prod.isHeavy, expectedHeavy, `isHeavy pour ${id}`);
  }

  const quinCount = cat.data.products.filter((p) => p.category === 'quincaillerie-btp').length;
  assert.ok(quinCount >= 27, 'Au moins 27 produits dans le rayon Quincaillerie & BTP');

  // Outil standard INGCO à Daloa Commune -> livraison standard 1 000 FCFA
  const toolOrder = await reqJson('/api/orders', {
    method: 'POST',
    body: {
      requestId: 'req_ingco_daloa_01',
      customerName: 'Nguessan Yao',
      customerPhone: '0708091011',
      cityZoneId: 'daloa-commune',
      neighborhood: 'Commerce',
      deliverySlot: 'matin',
      paymentMethod: 'wave',
      waveSenderPhone: '0708091011',
      waveTransactionRef: 'WV_INGCO_DALOA',
      items: [{ productId: 'ingco-perceuse-percussion-1100w', quantity: 1 }],
    },
  });
  assert.equal(toolOrder.status, 201);
  assert.equal(toolOrder.data.order.deliveryFee, 1000);
  assert.equal(toolOrder.data.order.total, 47500);

  // Pack WC FRENCIA (lourd) expédié à Issia -> livraison lourde 5 000 FCFA
  const wcOrder = await reqJson('/api/orders', {
    method: 'POST',
    body: {
      requestId: 'req_wc_issia_01',
      customerName: 'Kone Fatou',
      customerPhone: '0504030201',
      cityZoneId: 'expedition-issia',
      neighborhood: 'Issia Centre',
      deliverySlot: 'apres-midi',
      paymentMethod: 'wave',
      waveSenderPhone: '0504030201',
      waveTransactionRef: 'WV_WC_ISSIA',
      items: [{ productId: 'frencia-wc001', quantity: 1 }],
    },
  });
  assert.equal(wcOrder.status, 201);
  assert.equal(wcOrder.data.order.deliveryFee, 5000);
  assert.equal(wcOrder.data.order.total, 57000);

  // TV 85" (lourde) à Daloa Commune -> livraison lourde 2 500 FCFA
  const tvOrder = await reqJson('/api/orders', {
    method: 'POST',
    body: {
      requestId: 'req_tv85_daloa_01',
      customerName: 'Diallo Amara',
      customerPhone: '0102030405',
      cityZoneId: 'daloa-commune',
      neighborhood: 'Kennedy',
      deliverySlot: 'soir',
      paymentMethod: 'wave',
      waveSenderPhone: '0102030405',
      waveTransactionRef: 'WV_TV85_DALOA',
      items: [{ productId: 'smart-google-tv-85-4k-stt8580k', quantity: 1 }],
    },
  });
  assert.equal(tvOrder.status, 201);
  assert.equal(tvOrder.data.order.deliveryFee, 2500);
  assert.equal(tvOrder.data.order.total, 667500);
});

test('11. Rayon Cuisine & Art de la table : 8 produits showroom (sucriers, soupieres, bocaux, pub), prix Pèrôkadô = étiquette + marge <= 2 000 F, livraison standard', async () => {
  const cat = await reqJson('/api/catalog');
  assert.equal(cat.status, 200);

  const maisonCategory = cat.data.categories.find((c) => c.id === 'maison');
  assert.ok(maisonCategory, 'La catégorie maison est presente');

  // [id, prix etquette showroom, prix Pèrôkadô attendu]
  const expectedCuisine = [
    ['cuisine-sucrier-inox-sus304-argente', 3000, 3500],
    ['cuisine-sucrier-inox-dore', 3000, 3500],
    ['cuisine-complet-soupiere-3-bols-bleu', 17000, 18500],
    ['cuisine-set-3-bocaux-bamboo', 10000, 11500],
    ['cuisine-bocal-syder-carre-1800ml', 4500, 5000],
    ['cuisine-pub-pasabahce-380cc-x2', 5000, 5500],
    ['cuisine-bonbonniere-verre-tresse', 3000, 3500],
    ['cuisine-presentoir-gateau-cloche', 0, 9500],
  ];
  for (const [id, labelPrice, expectedSellPrice] of expectedCuisine) {
    const prod = cat.data.products.find((p) => p.id === id);
    assert.ok(prod, `Produit cuisine ${id} present dans le catalogue`);
    assert.equal(prod.category, 'maison');
    assert.equal(prod.price, expectedSellPrice, `Prix Pèrôkadô exact pour ${id}`);
    if (labelPrice > 0) {
      const margin = prod.price - labelPrice;
      assert.ok(margin >= 200 && margin <= 2000, `Marge ${margin} FCFA conforme pour ${id}`);
    }
    assert.equal(prod.isHeavy, false, `${id} est en colis standard (non lourd)`);
    assert.ok(prod.imageUrl && prod.imageUrl.includes('/images/products/cuisine-'), `Photo studio pour ${id}`);
  }

  // Commande d'un sucrier a Daloa Commune -> livraison standard 1 000 FCFA (et non 2 500 F !)
  const sugarOrder = await reqJson('/api/orders', {
    method: 'POST',
    body: {
      requestId: 'req_sucrier_daloa_01',
      customerName: 'Kouadio Aya',
      customerPhone: '0506070809',
      cityZoneId: 'daloa-commune',
      neighborhood: 'Lobia',
      deliverySlot: 'matin',
      paymentMethod: 'wave',
      waveSenderPhone: '0506070809',
      waveTransactionRef: 'WV_SUCRIER_DALOA_01',
      items: [{ productId: 'cuisine-sucrier-inox-dore', quantity: 1 }],
    },
  });
  assert.equal(sugarOrder.status, 201);
  assert.equal(sugarOrder.data.order.deliveryFee, 1000);
  assert.equal(sugarOrder.data.order.total, 4500);
});

test('12. Arrivage BTP Décembre 2026 : 99 fiches retravaillées Pèrôkadô (logo + prix marché ivoirien) présentes avec leurs prix exacts', async () => {
  const cat = await reqJson('/api/catalog');
  assert.equal(cat.status, 200);

  // [id, prix Pèrôkadô affiché sur la fiche retravaillée]
  const expectedBtpDec = [
    ['btp-griffe-159-cle-canon-luxe-124', 15500],
    ['btp-griffe-gf11-1021-cle-canon', 15500],
    ['btp-colonne-douche-noire-griffe-gs-g041', 45000],
    ['btp-motopompe-essence-emtop-egwp8016', 150000],
    ['btp-coffret-schneider-144-modules-lvsxt624', 389000],
    ['btp-parafoudre-schneider-acti9-40ka-a9l40601', 179000],
    ['btp-douille-b22-megalec-meg-db22n', 1500],
    ['btp-disjoncteur-schneider-4p-63a-a9f74463', 79900],
    ['btp-charniere-universelle-force-charn-uf', 3500],
    ['btp-vis-rappel-gm-30g-force', 2500],
    ['btp-tole-noire-acier-08mm-force-at8188', 32000],
    ['btp-dpn-vigi-schneider-easy9-ez9d32610', 59000],
    ['btp-souffleur-aspirateur-emtop-eabr6506', 32000],
    ['btp-chaussure-securite-emtop-esbs71sb45', 17500],
    ['btp-fiche-industrielle-megalec-5p-32a-meg-125g', 12500],
    ['btp-canon-simple-5-cles-force-cle-s5-70', 6000],
    ['btp-disjoncteur-compact-schneider-c25f6tm250', 1339000],
    ['btp-oxyde-bleu-force-25kg', 250000],
    ['btp-dpn-20a-schneider-easy9-ez9p32620', 6000],
    ['btp-tirefond-tole-8x80-bleu-force', 4500],
    ['btp-interrupteur-differentiel-megalec-4p-63a-id4p63a30ma', 55000],
    ['btp-griffe-gf11-1024-cle-canon', 15500],
    ['btp-targette-porte-force-178', 7500],
    ['btp-tirefond-tole-8x80-vert-force-ttvd', 4500],
    ['btp-disjoncteur-schneider-2p-63a-a9f74263', 25000],
    ['btp-griffe-gf11-1028-cle-canon', 15500],
    ['btp-interrupteur-differentiel-megalec-4p-40a-id4p40a30ma', 45000],
    ['btp-fiche-industrielle-megalec-3p-16a-meg-013g', 6500],
    ['btp-fiche-industrielle-megalec-5p-32a-meg-025g', 11500],
    ['btp-serrure-force-cle-s-101-1919', 9500],
    ['btp-fiche-industrielle-megalec-4p-16a-meg-114g', 6000],
    ['btp-cle-douche-griffe-162', 8500],
    ['btp-force-cle-123f-rosace-etroite', 9500],
    ['btp-disjoncteur-megalec-2p-63a-d2p63a', 15000],
    ['btp-pompe-immergee-emtop-1500w-ewppd15001', 175000],
    ['btp-tirefond-tole-8x80-rouge-force-ttrf', 4500],
    ['btp-fiche-industrielle-megalec-3p-32a-meg-023g', 8500],
    ['btp-fiche-industrielle-megalec-4p-16a-meg-014g', 7000],
    ['btp-chauffe-eau-electrique-force-50l-force-417', 85000],
    ['btp-griffe-164-cle-canon-lux-chrome', 12500],
    // Lot 4 — Midea Lighting
    ['btp-midea-spot-led-apparent-9w-mdl-spcl09w65-01', 6500],
    ['btp-midea-interrupteur-dvv-etanche-encastre-euprk22', 4500],
    ['btp-midea-spot-led-encastre-8w-4000k-mdl-dl35r08w-03', 4500],
    ['btp-midea-globe-led-24w-6500k-mdl-clr24w-03', 12000],
    ['btp-midea-projecteur-led-100w-mdl-flf100w-036', 24000],
    ['btp-midea-ampoule-led-15w-b22-mdl-bua6015w-6500-b22', 2500],
    ['btp-midea-ampoule-led-5w-b22-mdl-bua4505w-226500', 1700],
    ['btp-midea-globe-led-24w-3-couleurs-mdl-clr24w-04', 15500],
    ['btp-midea-spot-led-encastre-8w-3000k-mdl-dl35r08w-03-3000', 4500],
    ['btp-midea-projecteur-led-50w-mdl-flf50w-036', 16500],
    ['btp-midea-ampoule-led-9w-b22-mdl-bua609w-226500', 2000],
    // Lot 4 — EMTOP
    ['btp-emtop-groupe-electrogene-diesel-7kva-edgrs711-1', 1290000],
    ['btp-emtop-pompe-immergee-1100w-ewppd11001', 140000],
    ['btp-emtop-bottes-securite-44-erbtls1p44', 22000],
    ['btp-emtop-surpresseur-1500w-ewppj15001', 132000],
    ['btp-emtop-pinces-isolees-3-pcs-epls0331', 16500],
    ['btp-emtop-compacteur-plaque-reversible-160kg-epct091612', 1550000],
    ['btp-emtop-chaussure-securite-kaki-44-esbs32sb44', 19500],
    ['btp-emtop-bottes-securite-45-erbtls1p45', 22000],
    // Lot 5 — Legrand
    ['btp-legrand-bouton-poussoir-gris-plexo-069820l', 14500],
    ['btp-legrand-prise-2pt-blanc-urbano-ub3111wh', 6500],
    ['btp-legrand-coffret-36-modules-encastre-137017', 24900],
    ['btp-legrand-interrupteur-horaire-analogique-412790', 82000],
    ['btp-legrand-interrupteur-dvv-blanc-urbano-ub2220wh', 7500],
    ['btp-legrand-griffe-standard-plexo-84900', 6500],
    ['btp-legrand-interrupteur-svv-blanc-urbano-ub2210wh', 5500],
    ['btp-legrand-prise-2pt-blanc-mosaic-278111l', 6900],
    ['btp-legrand-parafoudre-4p-t2-20ka-410323', 55000],
    ['btp-legrand-dpn-16a-rx3-419949', 4500],
    ['btp-legrand-detecteur-mouvement-encastre-48941', 75900],
    ['btp-legrand-prise-tv-blanc-niloe-np4102wh', 7900],
    ['btp-legrand-collier-embase-31900', 600],
    ['btp-legrand-dpn-10a-rx3-419947', 4500],
    ['btp-legrand-interrupteur-differentiel-4p-25a-300ma-411664', 115000],
    ['btp-legrand-prise-2pt-gris-etanche-069831l', 16900],
    // Lot 5 — Midea Lighting
    ['btp-midea-spot-led-encastre-12w-3000k-mdl-dl40r12w-033k', 6500],
    ['btp-midea-ruban-led-rgb-50m-mdl-std8w-05', 50000],
    ['btp-midea-reglette-led-120m-45w-mdl-bll1245w', 8500],
    ['btp-midea-ampoule-led-5w-e27-6500k-mdl-bua4505w', 1700],
    // Lot 6 — Legrand (appareillage modulaire 63 A) et Midea Lighting
    ['btp-legrand-disjoncteur-tx3-2p-63a-403612', 24000],
    ['btp-legrand-peigne-raccordement-hx3-404926', 4500],
    ['btp-midea-projecteur-led-200w-mdl-flf200w-03', 52000],
    ['btp-legrand-interrupteur-differentiel-2p-63a-30ma-411506', 79000],
    ['btp-legrand-disjoncteur-rx3-4p-63a-419747', 89000],
    // Lot 7 — Legrand (différentiels, parafoudre, coffret, appareillage) et Midea
    ['btp-legrand-interrupteur-differentiel-2p-25a-300ma-dx3-411524', 79000],
    ['btp-legrand-interrupteur-differentiel-2p-40a-30ma-rx3-402025', 37500],
    ['btp-legrand-interrupteur-differentiel-4p-40a-30ma-rx3-402063', 69000],
    ['btp-legrand-interrupteur-differentiel-2p-63a-30ma-rx3-402026', 229000],
    ['btp-legrand-parafoudre-2p-t2-20ka-410321', 45000],
    ['btp-legrand-coffret-48-modules-encastre-135014', 79000],
    ['btp-legrand-sonnerie-2-tons-41651', 24500],
    ['btp-legrand-sonnette-niloe-20a-764519', 17500],
    ['btp-legrand-telerupteur-cx3-1p-16a-412408', 21500],
    ['btp-legrand-prise-rj45-cat6-ftp-mosaic-76562', 25000],
    ['btp-legrand-prise-tv-urbano-ub4112wh', 6900],
    ['btp-midea-ruban-led-12w-50m-6500k-mdl-std12w-02-6500', 55000],
    ['btp-midea-spot-led-18w-apparent-blanc-6500k-mdl-dlm60r18w-03', 10500],
    ['btp-midea-ampoule-led-9w-e27-6500k-mdl-bua6009w', 2500],
    ['btp-midea-bouton-poussoir-gris-neon-ip55-euprdb-n', 3500],
  ];
  for (const [id, expectedPrice] of expectedBtpDec) {
    const prod = cat.data.products.find((p) => p.id === id);
    assert.ok(prod, `Produit BTP déc. 2026 ${id} présent dans le catalogue`);
    assert.equal(prod.category, 'quincaillerie-btp');
    assert.equal(prod.price, expectedPrice, `Prix Pèrôkadô exact pour ${id}`);
    assert.ok(prod.compareAtPrice >= prod.price, `Prix barré cohérent pour ${id}`);
    assert.equal(
      prod.imageUrl,
      `/images/products/${id}.jpg`,
      `Visuel retravaillé Pèrôkadô pour ${id}`
    );
  }

  // Les 2 serrures FORCE CLE-123F / CLE-134F doivent rester identifiables sans
  // ambiguite : ids, slugs, badges et visuels distincts (rosace etroite vs plaque longue).
  const lock123 = cat.data.products.find((p) => p.id === 'btp-force-cle-123f-rosace-etroite');
  const lock134 = cat.data.products.find((p) => p.id === 'btp-force-cle-134f-plaque-longue');
  assert.ok(lock123 && lock134, 'Les 2 serrures FORCE sont presentes');
  assert.notEqual(lock123.id, lock134.id);
  assert.notEqual(lock123.slug, lock134.slug);
  assert.notEqual(lock123.imageUrl, lock134.imageUrl);
  assert.match(lock123.name, /123F/);
  assert.match(lock134.name, /134F/);
  assert.match(lock123.name, /Rosace Étroite/i);
  assert.match(lock134.name, /Plaque Longue/i);
  assert.equal(lock123.badge, 'Rosace étroite');
  assert.equal(lock134.badge, 'Plaque longue');
  assert.ok(
    lock123.specs.some((s) => /134F/.test(s)),
    'La 123F cite la 134F pour eviter la confusion'
  );
  assert.ok(
    lock134.specs.some((s) => /123F/.test(s)),
    'La 134F cite la 123F pour eviter la confusion'
  );
  // Aucun vestige des anciens ids ambigus
  for (const gone of ['btp-serrure-force-cle-123f', 'btp-serrure-force-cle-134f']) {
    assert.equal(
      cat.data.products.some((p) => p.id === gone),
      false,
      `Ancien id ambigu ${gone} supprime`
    );
  }

  // Lot 5 : les paires quasi identiques doivent rester distinguables sans ambiguite
  // (DPN 10 A / 16 A, Urbano SVV / DVV, Plexo prise / poussoir, ampoule E27 / B22).
  const find = (id) => cat.data.products.find((p) => p.id === id);

  const dpn10 = find('btp-legrand-dpn-10a-rx3-419947');
  const dpn16 = find('btp-legrand-dpn-16a-rx3-419949');
  assert.ok(dpn10 && dpn16, 'Les 2 DPN RX3 sont presents');
  assert.notEqual(dpn10.slug, dpn16.slug);
  assert.notEqual(dpn10.imageUrl, dpn16.imageUrl);
  assert.match(dpn10.badge, /C10/);
  assert.match(dpn16.badge, /C16/);
  assert.match(dpn10.name, /10 A/);
  assert.match(dpn16.name, /16 A/);
  assert.ok(dpn10.specs.some((s) => /419949/.test(s)), 'Le DPN 10 A renvoie au 16 A');
  assert.ok(dpn16.specs.some((s) => /419947/.test(s)), 'Le DPN 16 A renvoie au 10 A');

  const svv = find('btp-legrand-interrupteur-svv-blanc-urbano-ub2210wh');
  const dvv = find('btp-legrand-interrupteur-dvv-blanc-urbano-ub2220wh');
  assert.ok(svv && dvv, 'Les 2 interrupteurs Urbano sont presents');
  assert.notEqual(svv.imageUrl, dvv.imageUrl);
  assert.match(svv.badge, /^SIMPLE/i);
  assert.match(dvv.badge, /^DOUBLE/i);
  assert.ok(svv.specs.some((s) => /UB2220WH/.test(s)), 'Le SVV renvoie au DVV');
  assert.ok(dvv.specs.some((s) => /UB2210WH/.test(s)), 'Le DVV renvoie au SVV');

  const plexoPrise = find('btp-legrand-prise-2pt-gris-etanche-069831l');
  const plexoPoussoir = find('btp-legrand-bouton-poussoir-gris-plexo-069820l');
  assert.ok(plexoPrise && plexoPoussoir, 'Les 2 appareils Plexo gris sont presents');
  assert.notEqual(plexoPrise.imageUrl, plexoPoussoir.imageUrl);
  assert.match(plexoPrise.badge, /^Prise/i);
  assert.match(plexoPoussoir.badge, /^Poussoir/i);
  assert.ok(plexoPrise.specs.some((s) => /069820L/.test(s)), 'La prise cite le poussoir');
  assert.ok(plexoPoussoir.specs.some((s) => /069831L/.test(s)), 'Le poussoir cite la prise');

  const bulbE27 = find('btp-midea-ampoule-led-5w-e27-6500k-mdl-bua4505w');
  const bulbB22 = find('btp-midea-ampoule-led-5w-b22-mdl-bua4505w-226500');
  assert.ok(bulbE27 && bulbB22, 'Les 2 ampoules 5 W Midea sont presentes');
  assert.notEqual(bulbE27.imageUrl, bulbB22.imageUrl);
  assert.match(bulbE27.badge, /E27/);
  assert.match(bulbB22.badge, /B22/);
  assert.match(bulbE27.name, /E27/);
  assert.match(bulbB22.name, /B22/);
  assert.ok(bulbE27.specs.some((s) => /B22/.test(s)), 'L’ampoule E27 renvoie a la B22');
  assert.ok(bulbB22.specs.some((s) => /E27/.test(s)), 'L’ampoule B22 renvoie a la E27');

  // Lot 6 : les trois disjoncteurs 63 A et les deux appareils differentiels
  // doivent rester impossibles a confondre (2P TX3 / 4P RX3 / ID 2P / ID 4P).
  const tx3 = find('btp-legrand-disjoncteur-tx3-2p-63a-403612');
  const rx4 = find('btp-legrand-disjoncteur-rx3-4p-63a-419747');
  const id2 = find('btp-legrand-interrupteur-differentiel-2p-63a-30ma-411506');
  const id4 = find('btp-legrand-interrupteur-differentiel-4p-25a-300ma-411664');
  assert.ok(tx3 && rx4 && id2 && id4, 'Les 4 appareils 63 A du lot 6 sont presents');
  assert.notEqual(tx3.imageUrl, rx4.imageUrl);
  assert.notEqual(id2.imageUrl, id4.imageUrl);
  assert.match(tx3.badge, /2P/);
  assert.match(rx4.badge, /4P/);
  assert.match(id2.badge, /2P 63 A 30 mA/);
  assert.match(id2.name, /2P 63 A 30 mA/);
  assert.match(tx3.name, /2P 63 A/);
  assert.match(rx4.name, /4P 63 A/);
  assert.ok(tx3.specs.some((s) => /419747/.test(s)), 'Le TX3 2P renvoie au RX3 4P');
  assert.ok(rx4.specs.some((s) => /403612/.test(s)), 'Le RX3 4P renvoie au TX3 2P');
  assert.ok(id2.specs.some((s) => /411664/.test(s)), 'L’ID 2P 63 A renvoie a l’ID 4P 25 A');
  assert.ok(tx3.specs.some((s) => /419949/.test(s)), 'Le TX3 2P renvoie aux DPN 16 A');

  // Lot 6 : les trois projecteurs Midea se distinguent par puissance et temperature.
  const flf200 = find('btp-midea-projecteur-led-200w-mdl-flf200w-03');
  const flf100 = find('btp-midea-projecteur-led-100w-mdl-flf100w-036');
  const flf50 = find('btp-midea-projecteur-led-50w-mdl-flf50w-036');
  assert.ok(flf200 && flf100 && flf50, 'Les 3 projecteurs Midea sont presents');
  assert.notEqual(flf200.imageUrl, flf100.imageUrl);
  assert.notEqual(flf100.imageUrl, flf50.imageUrl);
  assert.match(flf200.badge, /200 W/);
  assert.match(flf100.badge, /100 W/);
  assert.match(flf50.badge, /50 W/);
  assert.ok(flf200.specs.some((s) => /FLF100W/.test(s)), 'Le 200 W cite le 100 W');
  assert.ok(flf200.specs.some((s) => /3000 K/.test(s)), 'Le 200 W est bien en 3000 K');

  // Lot 7 : les quatre interrupteurs differentiels doivente rester distincts
  // (2P 25 A 300 mA / 2P 40 A 30 mA / 4P 40 A 30 mA / 2P 63 A 30 mA).
  const id25 = find('btp-legrand-interrupteur-differentiel-2p-25a-300ma-dx3-411524');
  const id40_2p = find('btp-legrand-interrupteur-differentiel-2p-40a-30ma-rx3-402025');
  const id40_4p = find('btp-legrand-interrupteur-differentiel-4p-40a-30ma-rx3-402063');
  const id63 = find('btp-legrand-interrupteur-differentiel-2p-63a-30ma-rx3-402026');
  const ids7 = [id25, id40_2p, id40_4p, id63];
  assert.ok(ids7.every(Boolean), 'Les 4 interrupteurs differentiels du lot 7 sont presents');
  assert.equal(new Set(ids7.map((p) => p.imageUrl)).size, 4, '4 visuels distincts pour les 4 ID');
  assert.match(id25.badge, /25 A 300 mA/);
  assert.match(id40_2p.badge, /2P 40 A 30 mA/);
  assert.match(id40_4p.badge, /4P 40 A 30 mA/);
  assert.match(id63.badge, /2P 63 A 30 mA/);
  assert.ok(id25.specs.some((s) => /411506/.test(s)), 'L’ID 25 A renvoie au DX3 63 A');
  assert.ok(id40_2p.specs.some((s) => /402063/.test(s)), 'L’ID 2P 40 A renvoie au 4P 40 A');
  assert.ok(id40_4p.specs.some((s) => /402025/.test(s)), 'L’ID 4P 40 A renvoie au 2P 40 A');
  assert.ok(id63.specs.some((s) => /411506/.test(s)), 'Le RX3 63 A renvoie au DX3 63 A');

  // Lot 7 : parafoudres (2P vs 4P) et coffrets (48 vs 36 modules) explicites.
  const spd2 = find('btp-legrand-parafoudre-2p-t2-20ka-410321');
  const spd4 = find('btp-legrand-parafoudre-4p-t2-20ka-410323');
  assert.ok(spd2 && spd4, 'Les 2 parafoudres Legrand sont presents');
  assert.notEqual(spd2.imageUrl, spd4.imageUrl);
  assert.match(spd2.badge, /2P/);
  assert.match(spd4.badge, /4P/);
  assert.ok(spd2.specs.some((s) => /410323/.test(s)), 'Le parafoudre 2P renvoie au 4P');
  assert.ok(spd4.specs.some((s) => /410321/.test(s)), 'Le parafoudre 4P renvoie au 2P');

  const c48 = find('btp-legrand-coffret-48-modules-encastre-135014');
  const c36 = find('btp-legrand-coffret-36-modules-encastre-137017');
  assert.ok(c48 && c36, 'Les 2 coffrets Legrand sont presents');
  assert.notEqual(c48.imageUrl, c36.imageUrl);
  assert.match(c48.badge, /48 modules/);
  assert.match(c36.badge, /36 modules/);
  assert.ok(c48.specs.some((s) => /137017/.test(s)), 'Le coffret 48 renvoie au 36');
  assert.ok(c36.specs.some((s) => /135014/.test(s)), 'Le coffret 36 renvoie au 48');

  // Lot 7 : trois prises murales differentes (RJ45 / TV passage / TV Niloé).
  const rj45 = find('btp-legrand-prise-rj45-cat6-ftp-mosaic-76562');
  const tvU = find('btp-legrand-prise-tv-urbano-ub4112wh');
  const tvN = find('btp-legrand-prise-tv-blanc-niloe-np4102wh');
  assert.ok(rj45 && tvU && tvN, 'Les 3 prises murales sont presentes');
  assert.equal(new Set([rj45.imageUrl, tvU.imageUrl, tvN.imageUrl]).size, 3);
  assert.match(rj45.badge, /RJ45/);
  assert.match(tvU.badge, /TV/);
  assert.ok(rj45.specs.some((s) => /UB4112WH/.test(s)), 'La RJ45 renvoie a la prise TV');

  // Lot 7 : sonnerie murale vs sonnette Dismatic encastree (appareils tres differents).
  const carillon = find('btp-legrand-sonnerie-2-tons-41651');
  const dismatic = find('btp-legrand-sonnette-niloe-20a-764519');
  assert.ok(carillon && dismatic, 'La sonnerie et la Dismatic sont presentes');
  assert.notEqual(carillon.imageUrl, dismatic.imageUrl);
  assert.ok(carillon.specs.some((s) => /764519/.test(s)), 'La sonnerie cite la Dismatic');
  assert.ok(dismatic.specs.some((s) => /41651/.test(s)), 'La Dismatic cite la sonnerie');

  // Lot 7 : ruban 6500 K vs ruban RGB, spot apparent vs encastre, ampoule E27 vs B22.
  const rubanBlanc = find('btp-midea-ruban-led-12w-50m-6500k-mdl-std12w-02-6500');
  const rubanRgb = find('btp-midea-ruban-led-rgb-50m-mdl-std8w-05');
  assert.ok(rubanBlanc && rubanRgb, 'Les 2 rubans 50 m sont presents');
  assert.notEqual(rubanBlanc.imageUrl, rubanRgb.imageUrl);
  assert.match(rubanBlanc.badge, /6500 K/);
  assert.match(rubanRgb.badge, /RGB/);
  assert.ok(rubanBlanc.specs.some((s) => /STD8W-05/.test(s)), 'Le ruban blanc renvoie au RGB');

  const spotApp = find('btp-midea-spot-led-18w-apparent-blanc-6500k-mdl-dlm60r18w-03');
  const spotEnc = find('btp-midea-spot-led-encastre-8w-4000k-mdl-dl35r08w-03');
  assert.ok(spotApp && spotEnc, 'Spot apparent et spot encastre presents');
  assert.notEqual(spotApp.imageUrl, spotEnc.imageUrl);
  assert.ok(spotApp.specs.some((s) => /DL35R08W/.test(s)), 'Le spot apparent cite l’encastre');

  const bulb9E27 = find('btp-midea-ampoule-led-9w-e27-6500k-mdl-bua6009w');
  const bulb9B22 = find('btp-midea-ampoule-led-9w-b22-mdl-bua609w-226500');
  assert.ok(bulb9E27 && bulb9B22, 'Les 2 ampoules 9 W sont presentes');
  assert.notEqual(bulb9E27.imageUrl, bulb9B22.imageUrl);
  assert.match(bulb9E27.badge, /E27/);
  assert.match(bulb9B22.badge, /9 W/);
  assert.ok(bulb9E27.specs.some((s) => /B22/.test(s)), 'L’ampoule 9 W E27 renvoie a la B22');

  // Le peigne HX3 est le complement des appareils modulaires 63 A.
  const hx3 = find('btp-legrand-peigne-raccordement-hx3-404926');
  assert.ok(hx3, 'Le peigne HX3 404926 est present');
  assert.match(hx3.badge, /HX/);
  assert.ok(hx3.specs.some((s) => /403612|419747|411506/.test(s)), 'Le peigne cite les appareils qu’il alimente');

  // La motopompe et le disjoncteur compact restent des colis lourds (frais majorés).
  for (const heavyId of ['btp-motopompe-essence-emtop-egwp8016', 'btp-disjoncteur-compact-schneider-c25f6tm250']) {
    const prod = cat.data.products.find((p) => p.id === heavyId);
    assert.equal(prod.isHeavy, true, `${heavyId} en livraison lourde`);
  }
});

// ==============================================================================
// 14. Nouveaux parcours : Orange Money / Moov / espèces à la livraison,
//     supplément quartier, avis réels modérés et relance panier abandonné.
// ==============================================================================
test('14. Paiement Orange Money accepté, espèces réservées à Daloa, quartier Zakoua majoré, avis modéré et panier abandonné', async () => {
  const catalog = await reqJson('/api/catalog');
  const payIds = catalog.data.paymentMethods.map((m) => m.id);
  for (const id of ['orange-money', 'mtn-momo', 'moov-money', 'especes-livraison']) {
    assert.ok(payIds.includes(id), `moyen de paiement ${id} exposé`);
  }

  const baseOrder = {
    requestId: 'req_orange_money_14a',
    customerName: 'Yao Serge',
    customerPhone: '0744556677',
    cityZoneId: 'daloa-commune',
    neighborhood: 'Lobia',
    deliverySlot: 'apres-midi',
    paymentMethod: 'orange-money',
    waveSenderPhone: '0744556677',
    waveTransactionRef: 'OM123456',
    items: [{ productId: 'bouilloire-inox-2l', quantity: 1 }],
  };

  const om = await reqJson('/api/orders', { method: 'POST', body: baseOrder });
  assert.equal(om.status, 201, JSON.stringify(om.data));
  assert.equal(om.data.order.paymentMethod, 'orange-money');
  assert.equal(om.data.paymentProvider, 'orange-money');

  // Espèces hors Daloa : refusé explicitement
  const cashFar = await reqJson('/api/orders', {
    method: 'POST',
    body: {
      ...baseOrder,
      requestId: 'req_cash_issia_14b',
      cityZoneId: 'expedition-issia',
      neighborhood: 'Centre',
      paymentMethod: 'especes-livraison',
    },
  });
  assert.equal(cashFar.status, 400);
  assert.equal(cashFar.data.code, 'CASH_NOT_ALLOWED');

  // Espèces à Daloa : accepté, sans référence de transaction
  const cashDaloa = await reqJson('/api/orders', {
    method: 'POST',
    body: {
      ...baseOrder,
      requestId: 'req_cash_daloa_14c',
      paymentMethod: 'especes-livraison',
      waveSenderPhone: '',
      waveTransactionRef: '',
    },
  });
  assert.equal(cashDaloa.status, 201, JSON.stringify(cashDaloa.data));
  assert.equal(cashDaloa.data.order.paymentMethod, 'especes-livraison');

  // Supplément quartier : Zakoua = +250 F sur le tarif commune
  const zakoua = await reqJson('/api/orders', {
    method: 'POST',
    body: {
      ...baseOrder,
      requestId: 'req_zakoua_14d',
      neighborhood: 'Zakoua',
      waveTransactionRef: 'OM654321',
    },
  });
  assert.equal(zakoua.status, 201, JSON.stringify(zakoua.data));
  assert.equal(zakoua.data.order.deliveryFee, 1250);

  // Avis : invisible avant modération, visible après validation admin
  const review = await reqJson('/api/reviews', {
    method: 'POST',
    body: {
      productId: 'bouilloire-inox-2l',
      authorName: 'Awa Koné',
      authorCity: 'Daloa',
      rating: 5,
      comment: 'Livrée le jour même à Lobia, très bonne qualité.',
    },
  });
  assert.equal(review.status, 201, JSON.stringify(review.data));
  assert.equal(review.data.submitted, true);

  const afterReview = await reqJson('/api/catalog');
  const prodBefore = afterReview.data.products.find((p) => p.id === 'bouilloire-inox-2l');
  assert.equal(prodBefore.reviewCount, 0, 'aucun avis publié tant qu’il n’est pas validé');

  const login = await reqJson('/api/admin/login', {
    method: 'POST',
    body: { credential: process.env.ADMIN_PASSWORD },
  });
  assert.equal(login.status, 200);
  const token = login.data.token;

  const pending = await reqJson('/api/admin/reviews', { token });
  const target = pending.data.reviews.find((r) => r.authorName === 'Awa Koné');
  assert.ok(target, 'avis en attente visible en administration');

  const approved = await reqJson(`/api/admin/reviews/${target.id}`, {
    method: 'PATCH',
    token,
    body: { status: 'approved' },
  });
  assert.equal(approved.status, 200);

  const afterApproval = await reqJson('/api/catalog');
  const prodAfter = afterApproval.data.products.find((p) => p.id === 'bouilloire-inox-2l');
  assert.equal(prodAfter.reviewCount, 1);
  assert.equal(prodAfter.rating, 5);

  // Panier abandonné : enregistré et listé côté admin
  const cart = await reqJson('/api/cart-abandonment', {
    method: 'POST',
    body: {
      customerPhone: '0788990011',
      customerName: 'Fatou',
      subtotal: 45000,
      items: [{ productId: 'bouilloire-inox-2l', name: 'Bouilloire Inox 2L', quantity: 1, lineTotal: 45000 }],
    },
  });
  assert.equal(cart.status, 200);
  assert.equal(cart.data.saved, true);

  const carts = await reqJson('/api/admin/cart-abandonments', { token });
  const found = carts.data.abandonments.find((a) => a.customerName === 'Fatou');
  assert.ok(found, 'panier abandonné listé pour la relance');
  assert.equal(found.status, 'open');

  const reminded = await reqJson(`/api/admin/cart-abandonments/${found.id}`, {
    method: 'PATCH',
    token,
    body: { status: 'reminded' },
  });
  assert.equal(reminded.status, 200);
  assert.equal(reminded.data.status, 'reminded');
});
