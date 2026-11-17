// ==============================================================================
// PÈRÔKADÔ — Suite de tests automatisés (API, Transactions Stock, Promos, Sécurité)
// ==============================================================================
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createDatabaseAdapter, createStore } from '../server/store.js';
import { createApp } from '../server/app.js';

process.env.ADMIN_PASSWORD = 'TestAdminStrongPassword!2026';
process.env.SESSION_SECRET = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

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

test('1. Santé API (/api/health) et catalogue initial Daloa & alentours', async () => {
  const health = await reqJson('/api/health');
  assert.equal(health.status, 200);
  assert.equal(health.data.ok, true);
  assert.equal(health.data.brand, 'Pèrôkadô');

  const catalog = await reqJson('/api/catalog');
  assert.equal(catalog.status, 200);
  assert.ok(catalog.data.products.length >= 9, 'Au moins 9 produits initiaux');
  assert.ok(
    catalog.data.settings.deliveryZones.some((z) => z.id === 'daloa-centre'),
    'Daloa Commune est présente'
  );
  assert.ok(
    catalog.data.settings.deliveryZones.some((z) => z.id === 'issia'),
    'Issia (ville alentour) est présente'
  );
});

test('2. Protection CSRF / Same-Origin rejette une origine externe malveillante', async () => {
  const res = await reqJson('/api/orders', {
    method: 'POST',
    origin: 'https://evil-attacker.example.com',
    body: {},
  });
  assert.equal(res.status, 403);
});

test('3. Commande complète : recalcul serveur des prix, code promo, idempotence et décrémentation stock', async () => {
  const beforeCat = await reqJson('/api/catalog');
  const targetProd = beforeCat.data.products.find((p) => p.id === 'ecouteurs-airpulse-pro');
  assert.ok(targetProd);
  const initialStock = targetProd.stock;

  const orderPayload = {
    requestId: 'req_test_unique_1001',
    customerName: 'Kouassi Aya',
    customerPhone: '07 08 09 10 11',
    cityZoneId: 'daloa-centre',
    neighborhood: 'Tazibouo Université',
    addressDetails: 'Carrefour Pharmacie',
    deliverySlot: 'matin',
    paymentMethod: 'especes-livraison',
    promoCode: 'BIENVENUE10',
    // Même si un client tentait d'envoyer un faux prix, le serveur l'ignore et recalcule
    items: [{ productId: targetProd.id, quantity: 2 }],
  };

  const created = await reqJson('/api/orders', { method: 'POST', body: orderPayload });
  assert.equal(created.status, 201);
  assert.equal(created.data.duplicate, false);
  const order = created.data.order;
  assert.match(order.reference, /^PKD-[A-Z0-9]{6}$/);

  const expectedSubtotal = targetProd.price * 2; // 29 000 FCFA
  const expectedDiscount = Math.round(expectedSubtotal * 0.1); // 2 900 FCFA
  assert.equal(order.subtotal, expectedSubtotal);
  assert.equal(order.discountAmount, expectedDiscount);
  assert.equal(order.deliveryFee, 1000);
  assert.equal(order.total, expectedSubtotal - expectedDiscount + 1000);

  // Test d'idempotence (double clic réseau) : aucun double débit de stock
  const retry = await reqJson('/api/orders', { method: 'POST', body: orderPayload });
  assert.equal(retry.status, 200);
  assert.equal(retry.data.duplicate, true);
  assert.equal(retry.data.order.reference, order.reference);

  const afterCat = await reqJson('/api/catalog');
  const updatedProd = afterCat.data.products.find((p) => p.id === targetProd.id);
  assert.equal(updatedProd.stock, initialStock - 2);

  // Suivi de commande sécurisé : refuse un mauvais numéro de téléphone
  const wrongPhoneTrack = await reqJson('/api/orders/track', {
    method: 'POST',
    body: { reference: order.reference, phone: '0102030405' },
  });
  assert.equal(wrongPhoneTrack.status, 404);

  // Suivi de commande valide avec le bon numéro
  const validTrack = await reqJson('/api/orders/track', {
    method: 'POST',
    body: { reference: order.reference, phone: '+225 07 08 09 10 11' },
  });
  assert.equal(validTrack.status, 200);
  assert.equal(validTrack.data.order.reference, order.reference);
});

test('4. Authentification Admin, Agents révocables, Annulation avec restitution stock et blocage commande livrée', async () => {
  // Connexion échouée avec mauvais mot de passe
  const badLogin = await reqJson('/api/admin/login', {
    method: 'POST',
    body: { credential: 'wrong-password' },
  });
  assert.equal(badLogin.status, 401);

  // Connexion Admin valide
  const adminLogin = await reqJson('/api/admin/login', {
    method: 'POST',
    body: { credential: process.env.ADMIN_PASSWORD },
  });
  assert.equal(adminLogin.status, 200);
  const adminToken = adminLogin.data.token;
  assert.ok(adminToken);

  // Création d'un agent d'équipe
  const agentRes = await reqJson('/api/admin/agents', {
    method: 'POST',
    token: adminToken,
    body: { name: 'Agent Daloa Sud', phone: '0500112233' },
  });
  assert.equal(agentRes.status, 201);
  const agentCode = agentRes.data.created.plainCode;
  const agentId = agentRes.data.created.id;
  assert.match(agentCode, /^PKD-[A-Z0-9]{4}-[A-Z0-9]{4}$/);

  // Connexion avec le code agent
  const agentLogin = await reqJson('/api/admin/login', {
    method: 'POST',
    body: { credential: agentCode },
  });
  assert.equal(agentLogin.status, 200);
  const agentToken = agentLogin.data.token;

  // Un agent ne peut PAS créer ou supprimer un produit (RBAC 403)
  const forbiddenCreate = await reqJson('/api/admin/products', {
    method: 'POST',
    token: agentToken,
    body: {
      name: 'Produit Pirate',
      category: 'high-tech',
      price: 5000,
      stock: 5,
    },
  });
  assert.equal(forbiddenCreate.status, 403);

  // Révocation immédiate de l'agent par l'admin
  const revokeRes = await reqJson(`/api/admin/agents/${agentId}`, {
    method: 'DELETE',
    token: adminToken,
  });
  assert.equal(revokeRes.status, 200);

  // Le jeton de l'agent révoqué est immédiatement rejeté à la requête suivante
  const afterRevoke = await reqJson('/api/admin/overview', { token: agentToken });
  assert.equal(afterRevoke.status, 401);

  // Vérification de la restitution du stock à l'annulation d'une commande
  const overview = await reqJson('/api/admin/overview', { token: adminToken });
  assert.equal(overview.status, 200);
  const order = overview.data.orders[0];
  assert.ok(order);

  const cancelRes = await reqJson(`/api/admin/orders/${order.reference}/status`, {
    method: 'PATCH',
    token: adminToken,
    body: { status: 'cancelled' },
  });
  assert.equal(cancelRes.status, 200);
  assert.equal(cancelRes.data.order.status, 'cancelled');

  // Le stock des écouteurs est revenu à son niveau initial (25)
  const catRestored = await reqJson('/api/catalog');
  const restoredProd = catRestored.data.products.find((p) => p.id === 'ecouteurs-airpulse-pro');
  assert.equal(restoredProd.stock, 25);

  // Créer une commande, la marquer livrée et vérifier qu'elle ne peut plus être annulée
  const o2 = await reqJson('/api/orders', {
    method: 'POST',
    body: {
      requestId: 'req_test_delivered_2002',
      customerName: 'Bamba Moussa',
      customerPhone: '0504030201',
      cityZoneId: 'issia',
      neighborhood: 'Issia Résidentiel',
      deliverySlot: 'soir',
      paymentMethod: 'wave',
      items: [{ productId: 'ecouteurs-airpulse-pro', quantity: 1 }],
    },
  });
  assert.equal(o2.status, 201);
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

  // Faux PNG (script texte déguisé) -> rejeté 400
  const fakeRes = await fetch(`${baseUrl}/api/admin/products/ecouteurs-airpulse-pro/photo`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'image/png',
    },
    body: Buffer.from('<svg onload="alert(1)"></svg>'),
  });
  assert.equal(fakeRes.status, 400);

  // Vrai PNG minimal 1x1 valide -> accepté 200
  const minimalPng = Buffer.from(
    '89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c63000100000500010d0a2db40000000049454e44ae426082',
    'hex'
  );
  const okRes = await fetch(`${baseUrl}/api/admin/products/ecouteurs-airpulse-pro/photo`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'image/png',
    },
    body: minimalPng,
  });
  assert.equal(okRes.status, 200);
});
