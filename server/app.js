// ==============================================================================
// PÈRÔKADÔ — Application Express (API publique, Espace /admin & Protections)
// ==============================================================================
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { ZodError } from 'zod';

import {
  CATEGORIES,
  DELIVERY_SLOTS,
  PAYMENT_METHODS,
  BRAND,
  getPaymentMethod,
} from '../shared/catalog.js';
import { BusinessError, DatabaseUnavailableError } from './store.js';
import {
  clearSessionCookie,
  detectSafeImageMime,
  getEffectiveAdminPassword,
  isAdminConfigured,
  parseCookies,
  serializeSessionCookie,
  signSessionToken,
  timingSafeEqualStr,
  verifySessionToken,
} from './security.js';
import {
  AdminLoginSchema,
  CreateAgentSchema,
  CreatePromoSchema,
  OrderStatusUpdateSchema,
  PlaceOrderSchema,
  ReviewSchema,
  ReviewModerationSchema,
  CartAbandonmentSchema,
  CartAbandonmentStatusSchema,
  ProductUpsertSchema,
  PromoValidateSchema,
  StoreSettingsUpdateSchema,
  TrackOrderSchema,
} from './validation.js';
import {
  createWaveCheckoutSession,
  dispatchOrderAlert,
  fetchWaveCheckoutStatus,
  getPaymentIntegrationStatus,
  isInstantCheckoutEnabled,
  isWaveAutoCheckoutEnabled,
  verifyWaveWebhookSignature,
} from './automation.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

function extractToken(req) {
  const auth = req.headers.authorization || '';
  if (auth.startsWith('Bearer ')) {
    const t = auth.slice(7).trim();
    if (t) return t;
  }
  const cookies = parseCookies(req.headers.cookie);
  return cookies.pkd_session || null;
}

function isSecureRequest(req, production) {
  if (production) return true;
  if (req.secure) return true;
  const proto = req.headers['x-forwarded-proto'];
  return typeof proto === 'string' && proto.split(',')[0].trim() === 'https';
}

// Vérifie que les requêtes mutantes proviennent bien de la même origine (anti-CSRF)
function enforceSameOrigin(req, res, next) {
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
    return next();
  }
  const origin = req.headers.origin;
  if (!origin) return next(); // Requêtes non-navigateur ou same-origin sans en-tête Origin

  try {
    const originHost = new URL(origin).host.toLowerCase();
    const reqHost = String(req.headers['x-forwarded-host'] || req.headers.host || '')
      .split(',')[0]
      .trim()
      .toLowerCase();

    const allowedHosts = new Set();
    for (const rawUrl of [process.env.PUBLIC_ORIGIN, process.env.ADMIN_ORIGIN]) {
      const trimmed = (rawUrl || '').trim();
      if (!trimmed) continue;
      try {
        allowedHosts.add(new URL(trimmed).host.toLowerCase());
      } catch {
        // ignore invalid URL
      }
    }

    if (reqHost && (originHost === reqHost || allowedHosts.has(originHost))) {
      return next();
    }
    return res.status(403).json({
      error: 'Requête refusée : origine non autorisée (protection CSRF).',
    });
  } catch {
    return res.status(403).json({ error: 'En-tête Origin invalide.' });
  }
}

export function createApp({ store, production = false, serveStatic = false } = {}) {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  // En-têtes de sécurité HTTP (Helmet) — compatibles avec l'aperçu en direct (iframe cross-origin) et la production Vercel
  app.use(
    helmet({
      contentSecurityPolicy: production
        ? {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: ["'self'"],
              styleSrc: ["'self'", "'unsafe-inline'"],
              imgSrc: ["'self'", 'data:', 'blob:'],
              fontSrc: ["'self'", 'data:'],
              connectSrc: ["'self'"],
              objectSrc: ["'none'"],
              baseUri: ["'self'"],
              formAction: ["'self'"],
              frameAncestors: ["'self'", 'https://*.e2b.app', 'https://*.arena.ai'],
            },
          }
        : false,
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      frameguard: false, // Géré par CSP frame-ancestors en prod et compatible Live Preview
    })
  );

  // Limiteurs de débit (anti-abus, anti-spam commandes, anti-force brute)
  const generalApiLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 180,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Trop de requêtes. Veuillez patienter quelques secondes.' },
  });

  const checkoutLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    // En test/dev la limite est large : la suite automatisée enchaîne les commandes.
    limit: production ? 20 : 500,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Trop de tentatives de commande rapprochées. Réessayez dans quelques minutes.' },
  });

  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: {
      error: 'Trop de tentatives de connexion échouées. Accès bloqué temporairement pendant 15 minutes.',
    },
  });

  const trackLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 25,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Trop de recherches de suivi. Réessayez dans quelques instants.' },
  });

  app.use('/api', generalApiLimiter);

  // ---------------------------------------------------------------------------
  // WEBHOOK OFFICIEL WAVE BUSINESS CHECKOUT (100% SANS INTERVENTION HUMAINE)
  // Placé AVANT enforceSameOrigin et express.json() pour vérifier la signature HMAC sur le Buffer brut
  // ---------------------------------------------------------------------------
  app.post(
    '/api/webhooks/wave',
    express.raw({ type: 'application/json', limit: '128kb' }),
    async (req, res) => {
      const sigHeader = req.headers['wave-signature'];
      if (!verifyWaveWebhookSignature(req.body, sigHeader)) {
        return res.status(401).json({ error: 'Signature Webhook Wave invalide.' });
      }
      try {
        const event = JSON.parse(req.body.toString('utf8'));
        if (event?.type === 'checkout.session.completed' && event?.data) {
          const data = event.data;
          const clientRef = data.client_reference || '';
          const sessionId = data.id || '';
          const waveTxId = data.transaction_id || data.id || '';
          const senderMobile = data.sender_mobile || '';
          if (clientRef || sessionId) {
            const { order: confirmedOrder, newlyConfirmed } = await store.confirmWaveWebhookPayment({
              reference: clientRef,
              sessionId,
              waveTransactionId: waveTxId,
              waveSenderPhone: senderMobile,
            });
            if (confirmedOrder && newlyConfirmed) {
              await dispatchOrderAlert(confirmedOrder, 'payment.confirmed');
            }
          }
        }
        return res.json({ received: true });
      } catch {
        return res.status(400).json({ error: 'Payload Webhook Wave invalide.' });
      }
    }
  );

  app.use('/api', enforceSameOrigin);

  // Empêcher la mise en cache des données dynamiques ou sensibles d'API (sauf route photo dédiée)
  app.use('/api', (req, res, next) => {
    if (!req.path.endsWith('/photo')) {
      res.setHeader('Cache-Control', 'no-store');
    }
    next();
  });

  // Upload binaire d'image produit (jusqu'à 4 Mo max)
  app.put(
    '/api/admin/products/:id/photo',
    express.raw({ type: ['image/jpeg', 'image/png', 'image/webp'], limit: '4mb' }),
    requireAuth('admin'),
    async (req, res, next) => {
      try {
        const buf = req.body;
        const detectedMime = detectSafeImageMime(buf);
        if (!detectedMime) {
          throw new BusinessError(
            'Format d’image non reconnu ou corrompu. Utilisez uniquement JPG, PNG ou WebP.',
            400,
            'INVALID_IMAGE'
          );
        }
        const product = await store.saveProductPhoto(
          req.params.id,
          detectedMime,
          buf,
          req.actorLabel
        );
        res.json({ product });
      } catch (err) {
        next(err);
      }
    }
  );

  // Parseur JSON borné à 256 Ko pour toutes les autres routes API
  app.use('/api', express.json({ limit: '256kb' }));

  // Middleware d'authentification Admin / Agent
  function requireAuth(requiredRole = 'any') {
    return async (req, res, next) => {
      try {
        if (!isAdminConfigured()) {
          return res.status(503).json({
            error:
              'Espace de gestion non configuré : ajoutez ADMIN_PASSWORD dans les variables d’environnement Vercel.',
            code: 'ADMIN_NOT_CONFIGURED',
          });
        }
        const token = extractToken(req);
        const session = verifySessionToken(token);
        if (!session) {
          return res.status(401).json({ error: 'Session expirée ou non authentifiée.' });
        }

        // Si c'est un agent, vérifier en temps réel en base que son code n'a pas été révoqué
        if (session.role === 'agent') {
          const agentRow = await store.getAgentById(session.agentId);
          if (!agentRow || !agentRow.active) {
            res.setHeader('Set-Cookie', clearSessionCookie(isSecureRequest(req, production)));
            return res.status(401).json({
              error: 'Cet accès agent a été révoqué par l’administrateur.',
              code: 'AGENT_REVOKED',
            });
          }
          req.user = { role: 'agent', id: agentRow.id, name: agentRow.name };
          req.actorLabel = `agent:${agentRow.name}`;
        } else {
          req.user = { role: 'admin', id: 'admin', name: 'Administrateur' };
          req.actorLabel = 'admin';
        }

        if (requiredRole === 'admin' && req.user.role !== 'admin') {
          return res.status(403).json({
            error: 'Action réservée à l’administrateur principal.',
          });
        }
        next();
      } catch (err) {
        next(err);
      }
    };
  }

  // ---------------------------------------------------------------------------
  // ROUTES PUBLIQUES (/api/*)
  // ---------------------------------------------------------------------------

  app.get('/api/health', async (_req, res) => {
    try {
      const health = await store.healthCheck();
      res.json({
        ok: true,
        brand: BRAND.name,
        storage: health.storage,
        adminConfigured: isAdminConfigured(),
      });
    } catch (err) {
      res.status(503).json({
        ok: false,
        brand: BRAND.name,
        storage: { mode: 'disconnected', durable: false },
        adminConfigured: isAdminConfigured(),
        error:
          err instanceof DatabaseUnavailableError
            ? err.message
            : 'Connexion à la base de données indisponible.',
      });
    }
  });

  app.get('/api/catalog', async (_req, res, next) => {
    try {
      const [products, settings, reviews] = await Promise.all([
        store.listPublicProducts(),
        store.getSettings(),
        store.listApprovedReviews().catch(() => []),
      ]);

      // Agrégat réel par produit : moyenne + nombre d'avis publiés.
      const reviewStats = {};
      for (const r of reviews) {
        const s = reviewStats[r.productId] || (reviewStats[r.productId] = { sum: 0, count: 0 });
        s.sum += r.rating;
        s.count += 1;
      }
      const enrichedProducts = products.map((p) => {
        const s = reviewStats[p.id];
        return {
          ...p,
          reviewCount: s ? s.count : 0,
          rating: s ? Math.round((s.sum / s.count) * 10) / 10 : null,
        };
      });

      res.json({
        brand: BRAND,
        categories: CATEGORIES,
        deliverySlots: DELIVERY_SLOTS,
        paymentMethods: PAYMENT_METHODS,
        settings: {
          ...settings,
          waveAutoCheckout: isInstantCheckoutEnabled(),
        },
        products: enrichedProducts,
        reviews: reviews.slice(0, 300),
      });
    } catch (err) {
      next(err);
    }
  });

  // Panier abandonné : le client laisse son numéro, on enregistre la relance.
  app.post('/api/cart-abandonment', checkoutLimiter, async (req, res, next) => {
    try {
      const payload = CartAbandonmentSchema.parse(req.body);
      const result = await store.saveCartAbandonment(payload);
      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  app.get('/api/admin/cart-abandonments', requireAuth('admin'), async (_req, res, next) => {
    try {
      const abandonments = await store.listCartAbandonments();
      res.json({ abandonments });
    } catch (err) {
      next(err);
    }
  });

  app.patch('/api/admin/cart-abandonments/:id', requireAuth('admin'), async (req, res, next) => {
    try {
      const status = CartAbandonmentStatusSchema.parse(req.body).status;
      const result = await store.markCartAbandonment(Number(req.params.id), status);
      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  // Modération des avis (réservée au personnel)
  app.get('/api/admin/reviews', requireAuth('any'), async (_req, res, next) => {
    try {
      const reviews = await store.listAllReviews();
      res.json({ reviews });
    } catch (err) {
      next(err);
    }
  });

  app.patch('/api/admin/reviews/:id', requireAuth('any'), async (req, res, next) => {
    try {
      const status = ReviewModerationSchema.parse(req.body).status;
      const result = await store.moderateReview(Number(req.params.id), status);
      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  // Avis publiés d'un produit (lecture publique)
  app.get('/api/reviews', async (req, res, next) => {
    try {
      const productId = String(req.query.productId || '').trim();
      const reviews = productId
        ? await store.listReviewsForProduct(productId)
        : [];
      res.json({ reviews });
    } catch (err) {
      next(err);
    }
  });

  // Dépôt d'un avis : modération obligatoire avant publication.
  app.post('/api/reviews', checkoutLimiter, async (req, res, next) => {
    try {
      const payload = ReviewSchema.parse(req.body);
      const result = await store.createReview(payload);
      res.status(201).json({
        ...result,
        message:
          'Merci ! Votre avis sera publié après vérification (généralement sous 24h ouvrées).',
      });
    } catch (err) {
      next(err);
    }
  });

  app.get('/api/products/:id/photo', async (req, res, next) => {
    try {
      const photo = await store.getProductPhoto(req.params.id);
      if (!photo) {
        return res.redirect(302, '/images/products/placeholder.svg');
      }
      res.setHeader('Content-Type', photo.mimeType);
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
      res.send(photo.data);
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/promos/validate', async (req, res, next) => {
    try {
      const { code, subtotal } = PromoValidateSchema.parse(req.body);
      const promo = await store.validatePromoCode(code, subtotal);
      res.json({ promo });
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/orders', checkoutLimiter, async (req, res, next) => {
    try {
      const payload = PlaceOrderSchema.parse(req.body);
      const waveApiActive = isWaveAutoCheckoutEnabled();
      const method = getPaymentMethod(payload.paymentMethod);
      // En mode direct, la référence Wave doit être vérifiée avant expédition.
      if (!waveApiActive) {
        const digits = String(payload.waveSenderPhone || '').replace(/\D/g, '');
        if (digits.length < 8) {
          throw new BusinessError(
            `Veuillez indiquer le numéro ${method.shortLabel} utilisé pour le paiement (minimum 8 chiffres).`,
            400,
            'PAYMENT_PHONE_REQUIRED'
          );
        }
        if (String(payload.waveTransactionRef || '').trim().length < 4) {
          throw new BusinessError(
            `Veuillez saisir la référence de transaction reçue après votre paiement ${method.shortLabel}.`,
            400,
            'PAYMENT_REF_REQUIRED'
          );
        }
      }

      const [result, settings] = await Promise.all([
        store.placeOrder(payload),
        store.getSettings(),
      ]);

      let checkoutUrl = null;

      if (waveApiActive && !result.duplicate) {
        const proto = isSecureRequest(req, production) ? 'https' : 'http';
        const reqHost = String(req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000')
          .split(',')[0]
          .trim();
        const origin = (process.env.PUBLIC_ORIGIN || `${proto}://${reqHost}`).replace(/\/+$/, '');

        const session = await createWaveCheckoutSession({
          amount: result.order.total,
          reference: result.order.reference,
          trackingToken: result.order.trackingToken,
          origin,
        });
        checkoutUrl = session?.launchUrl || null;
        if (checkoutUrl) {
          const updatedOrder = await store.attachWaveSession(result.order.reference, {
            sessionId: session.sessionId,
            checkoutUrl,
          });
          if (updatedOrder) result.order = updatedOrder;
        }
      } else if (result.duplicate && result.order?.waveCheckoutUrl) {
        checkoutUrl = result.order.waveCheckoutUrl;
      }

      if (!result.duplicate) {
        dispatchOrderAlert(result.order, 'order.created').catch(() => {});
      }

      res.status(result.duplicate ? 200 : 201).json({
        order: result.order,
        duplicate: result.duplicate,
        whatsappNumber: settings.whatsappNumber,
        paymentProvider: method.id,
        checkoutUrl,
        waveCheckoutUrl: checkoutUrl,
      });
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/orders/track', trackLimiter, async (req, res, next) => {
    try {
      const { reference, phone, token } = TrackOrderSchema.parse(req.body);
      let order = await store.trackOrder({ reference, phone, token });
      if (!order) {
        return res.status(404).json({
          error:
            'Aucune commande trouvée pour ces informations. Vérifiez votre référence ou scannez votre Code QR.',
        });
      }

      // Filet de sécurité temps réel Wave Business : si la commande est encore 'pending' et possède un
      // waveSessionId, vérifier directement `GET /v1/checkout/sessions/:id` auprès de Wave !
      if (order.status === 'pending' && order.waveSessionId && isWaveAutoCheckoutEnabled()) {
        const liveStatus = await fetchWaveCheckoutStatus(order.waveSessionId).catch(() => null);
        if (
          liveStatus &&
          (liveStatus.paymentStatus === 'succeeded' || liveStatus.checkoutStatus === 'complete')
        ) {
          const { order: fullConfirmed, newlyConfirmed } = await store.confirmWaveWebhookPayment({
            reference: order.reference,
            sessionId: order.waveSessionId,
            waveTransactionId: liveStatus.transactionId || order.waveSessionId,
            actor: 'wave-live-verify',
          });
          if (fullConfirmed && newlyConfirmed) {
            dispatchOrderAlert(fullConfirmed, 'payment.confirmed').catch(() => {});
          }
          const refreshed = await store.trackOrder({ reference, phone, token });
          if (refreshed) order = refreshed;
        }
      }

      res.json({ order });
    } catch (err) {
      next(err);
    }
  });

  // ---------------------------------------------------------------------------
  // AUTHENTIFICATION & ESPACE DE GESTION (/api/admin/*)
  // ---------------------------------------------------------------------------

  app.get('/api/admin/session', async (req, res) => {
    const configured = isAdminConfigured();
    let storage = { mode: 'unknown', durable: false };
    try {
      const h = await store.healthCheck();
      storage = h.storage;
    } catch {
      storage = { mode: 'disconnected', durable: false };
    }

    if (!configured) {
      return res.json({
        authenticated: false,
        configured: false,
        storage,
      });
    }

    const token = extractToken(req);
    const session = verifySessionToken(token);
    if (!session) {
      return res.json({
        authenticated: false,
        configured: true,
        demoHint: null,
        storage,
      });
    }

    if (session.role === 'agent') {
      try {
        const agent = await store.getAgentById(session.agentId);
        if (!agent || !agent.active) {
          return res.json({ authenticated: false, configured: true, storage });
        }
        return res.json({
          authenticated: true,
          configured: true,
          user: { role: 'agent', id: agent.id, name: agent.name },
          storage,
        });
      } catch {
        return res.json({ authenticated: false, configured: true, storage });
      }
    }

    return res.json({
      authenticated: true,
      configured: true,
      user: { role: 'admin', id: 'admin', name: 'Administrateur' },
      storage,
    });
  });

  app.post('/api/admin/login', loginLimiter, async (req, res, next) => {
    try {
      if (!isAdminConfigured()) {
        return res.status(503).json({
          error:
            'ADMIN_PASSWORD non configuré sur le serveur. Ajoutez cette variable dans Vercel.',
        });
      }
      const { credential } = AdminLoginSchema.parse(req.body);
      const adminPw = getEffectiveAdminPassword();

      let userPayload = null;
      if (adminPw && timingSafeEqualStr(credential, adminPw)) {
        userPayload = { role: 'admin', agentId: null, name: 'Administrateur' };
      } else if (credential.toUpperCase().startsWith('PKD-')) {
        const agent = await store.findActiveAgentByCode(credential);
        if (agent) {
          userPayload = { role: 'agent', agentId: agent.id, name: agent.name };
        }
      }

      if (!userPayload) {
        return res.status(401).json({
          error: 'Mot de passe administrateur ou code agent incorrect.',
        });
      }

      const token = signSessionToken(userPayload);
      res.setHeader('Set-Cookie', serializeSessionCookie(token, isSecureRequest(req, production)));
      res.json({
        authenticated: true,
        token,
        user: {
          role: userPayload.role,
          id: userPayload.agentId || 'admin',
          name: userPayload.name,
        },
      });
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/admin/logout', (req, res) => {
    res.setHeader('Set-Cookie', clearSessionCookie(isSecureRequest(req, production)));
    res.json({ ok: true });
  });

  app.get('/api/admin/overview', requireAuth('any'), async (req, res, next) => {
    try {
      const [stats, orders, products, settings] = await Promise.all([
        store.getDashboardStats(),
        store.listOrders({ limit: 200 }),
        store.listAllProducts(),
        store.getSettings(),
      ]);

      let promos = [];
      let agents = [];
      if (req.user.role === 'admin') {
        [promos, agents] = await Promise.all([store.listPromoCodes(), store.listAgents()]);
      }

      const proto = isSecureRequest(req, production) ? 'https' : 'http';
      const reqHost = String(req.headers['x-forwarded-host'] || req.headers.host || '')
        .split(',')[0]
        .trim();
      const origin = (process.env.PUBLIC_ORIGIN || (reqHost ? `${proto}://${reqHost}` : '')).replace(
        /\/+$/,
        ''
      );

      res.json({
        user: req.user,
        stats,
        orders,
        products,
        settings,
        promos,
        agents,
        paymentIntegration: getPaymentIntegrationStatus(origin),
      });
    } catch (err) {
      next(err);
    }
  });

  app.patch('/api/admin/orders/:reference/status', requireAuth('any'), async (req, res, next) => {
    try {
      const { status } = OrderStatusUpdateSchema.parse(req.body);
      const order = await store.updateOrderStatus(req.params.reference, status, req.actorLabel);
      res.json({ order });
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/admin/products', requireAuth('admin'), async (req, res, next) => {
    try {
      const input = ProductUpsertSchema.parse(req.body);
      const product = await store.upsertProduct(input, req.actorLabel);
      res.status(201).json({ product });
    } catch (err) {
      next(err);
    }
  });

  app.put('/api/admin/products/:id', requireAuth('admin'), async (req, res, next) => {
    try {
      const input = ProductUpsertSchema.parse({ ...req.body, id: req.params.id });
      const product = await store.upsertProduct(input, req.actorLabel);
      res.json({ product });
    } catch (err) {
      next(err);
    }
  });

  app.delete('/api/admin/products/:id', requireAuth('admin'), async (req, res, next) => {
    try {
      await store.deleteProduct(req.params.id, req.actorLabel);
      res.json({ deleted: true });
    } catch (err) {
      next(err);
    }
  });

  app.delete('/api/admin/products/:id/photo', requireAuth('admin'), async (req, res, next) => {
    try {
      const product = await store.deleteProductPhoto(req.params.id, req.actorLabel);
      res.json({ product });
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/admin/promos', requireAuth('admin'), async (req, res, next) => {
    try {
      const input = CreatePromoSchema.parse(req.body);
      const promos = await store.upsertPromoCode(input, req.actorLabel);
      res.status(201).json({ promos });
    } catch (err) {
      next(err);
    }
  });

  app.delete('/api/admin/promos/:code', requireAuth('admin'), async (req, res, next) => {
    try {
      const promos = await store.deletePromoCode(req.params.code, req.actorLabel);
      res.json({ promos });
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/admin/agents', requireAuth('admin'), async (req, res, next) => {
    try {
      const input = CreateAgentSchema.parse(req.body);
      const created = await store.createAgent(input, req.actorLabel);
      const agents = await store.listAgents();
      res.status(201).json({ created, agents });
    } catch (err) {
      next(err);
    }
  });

  app.delete('/api/admin/agents/:id', requireAuth('admin'), async (req, res, next) => {
    try {
      const agents = await store.revokeAgent(req.params.id, req.actorLabel);
      res.json({ agents });
    } catch (err) {
      next(err);
    }
  });

  app.put('/api/admin/settings', requireAuth('admin'), async (req, res, next) => {
    try {
      const input = StoreSettingsUpdateSchema.parse(req.body);
      const settings = await store.updateSettings(input, req.actorLabel);
      res.json({ settings });
    } catch (err) {
      next(err);
    }
  });

  // 404 propre sur toute route API inconnue
  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'Point d’accès API introuvable.' });
  });

  // En mode production Node autonome (`npm start`), servir dist/ (2 apps distinctes : index.html & admin.html)
  if (serveStatic) {
    const distDir = path.join(ROOT_DIR, 'dist');
    if (fs.existsSync(distDir)) {
      app.use(express.static(distDir, { maxAge: '7d', index: false }));
      app.get(['/admin', '/admin/{*splat}', '/gestion', '/gestion/{*splat}'], (_req, res) => {
        res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
        res.sendFile(path.join(distDir, 'admin.html'));
      });
      app.get('/{*splat}', (req, res) => {
        const host = String(req.headers['x-forwarded-host'] || req.headers.host || '')
          .split(',')[0]
          .trim()
          .toLowerCase();
        if (host.startsWith('admin.') || host.includes('perokado-admin')) {
          res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
          return res.sendFile(path.join(distDir, 'admin.html'));
        }
        res.sendFile(path.join(distDir, 'index.html'));
      });
    }
  }

  // Gestionnaire global d'erreurs (aucune fuite de stacktrace ou d'identifiants DB)
  app.use((err, _req, res, _next) => {
    if (err instanceof ZodError) {
      const firstIssue = err.issues?.[0]?.message || 'Données invalides.';
      return res.status(400).json({
        error: firstIssue,
        code: 'VALIDATION_ERROR',
      });
    }
    if (err instanceof BusinessError) {
      return res.status(err.status).json({
        error: err.message,
        code: err.code,
      });
    }
    if (err instanceof DatabaseUnavailableError) {
      return res.status(503).json({
        error: err.message,
        code: 'DB_UNAVAILABLE',
      });
    }
    if (err?.type === 'entity.too.large') {
      return res.status(413).json({
        error: 'Fichier ou données trop volumineux (maximum 4 Mo pour une photo).',
      });
    }
    console.error('[Pèrôkadô API Error]:', err?.code || err?.name || 'UnknownError', err?.message);
    return res.status(500).json({
      error: 'Une erreur interne est survenue. Veuillez réessayer dans un instant.',
    });
  });

  return app;
}
