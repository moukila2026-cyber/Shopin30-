// ==============================================================================
// PÈRÔKADÔ — Accès PostgreSQL transactionnel (Neon en prod, PGlite en dev/tests)
// ==============================================================================
import crypto from 'node:crypto';
import { SCHEMA_SQL } from './schema.js';
import {
  BRAND,
  DELIVERY_ZONES,
  INITIAL_PRODUCTS,
  INITIAL_PROMO_CODES,
  normalizeIvorianPhone,
} from '../shared/catalog.js';
import {
  generateAgentCode,
  generateOrderReference,
  generateTrackingToken,
  hashSecret,
  timingSafeEqualStr,
} from './security.js';

export class BusinessError extends Error {
  constructor(message, status = 400, code = 'BUSINESS_ERROR') {
    super(message);
    this.name = 'BusinessError';
    this.status = status;
    this.code = code;
  }
}

export class DatabaseUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DatabaseUnavailableError';
    this.status = 503;
  }
}

function getConnectionString() {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.NEON_DATABASE_URL ||
    ''
  ).trim();
}

export async function createDatabaseAdapter(customConnectionString) {
  const connStr = (customConnectionString ?? getConnectionString()).trim();
  if (connStr) {
    const { default: pg } = await import('pg');
    const isLocalhost =
      connStr.includes('@localhost') ||
      connStr.includes('@127.0.0.1') ||
      process.env.PGSSL === '0';
    const pool = new pg.Pool({
      connectionString: connStr,
      ssl: isLocalhost ? undefined : { rejectUnauthorized: false },
      max: 6,
      idleTimeoutMillis: 20000,
      connectionTimeoutMillis: 10000,
    });
    return {
      mode: 'neon',
      durable: true,
      query: (text, params) => pool.query(text, params),
      withTransaction: async (fn) => {
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          const res = await fn({
            query: (text, params) => client.query(text, params),
          });
          await client.query('COMMIT');
          return res;
        } catch (err) {
          await client.query('ROLLBACK').catch(() => {});
          throw err;
        } finally {
          client.release();
        }
      },
      close: () => pool.end(),
    };
  }

  if (process.env.VERCEL) {
    throw new DatabaseUnavailableError(
      'Base de données Neon non connectée. Ajoutez la variable DATABASE_URL dans Vercel → Settings → Environment Variables puis redéployez.'
    );
  }

  const { PGlite } = await import('@electric-sql/pglite');
  const pglite = new PGlite();
  // Mutex séquentiel pour garantir l'isolation transactionnelle sur une instance unique PGlite
  let txLock = Promise.resolve();
  return {
    mode: 'local-pglite',
    durable: false,
    query: (text, params) => pglite.query(text, params),
    exec: (sql) => pglite.exec(sql),
    withTransaction: async (fn) => {
      const prev = txLock;
      let release;
      txLock = new Promise((r) => {
        release = r;
      });
      await prev;
      try {
        await pglite.query('BEGIN');
        const res = await fn({
          query: (text, params) => pglite.query(text, params),
        });
        await pglite.query('COMMIT');
        return res;
      } catch (err) {
        await pglite.query('ROLLBACK').catch(() => {});
        throw err;
      } finally {
        release();
      }
    },
    close: () => pglite.close(),
  };
}

function slugify(str) {
  return String(str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function mapProductRow(row) {
  const compareAt = row.compare_at_price != null ? Number(row.compare_at_price) : null;
  const hasPhoto = Boolean(row.has_uploaded_photo);
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    compareAtPrice: compareAt && compareAt > Number(row.price) ? compareAt : null,
    stock: Number(row.stock),
    badge: row.badge || '',
    featured: Boolean(row.featured),
    active: Boolean(row.active),
    shortDescription: row.short_description || '',
    description: row.description || '',
    specs: Array.isArray(row.specs) ? row.specs : [],
    imageUrl: hasPhoto
      ? `/api/products/${encodeURIComponent(row.id)}/photo?v=${new Date(row.updated_at).getTime()}`
      : row.image_url || '/images/products/placeholder.svg',
    staticImageUrl: row.image_url || '/images/products/placeholder.svg',
    hasUploadedPhoto: hasPhoto,
    updatedAt: row.updated_at,
  };
}

function mapOrderRow(row) {
  return {
    id: Number(row.id),
    reference: row.reference,
    requestId: row.request_id,
    status: row.status,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    cityZoneId: row.city_zone_id,
    cityZoneName: row.city_zone_name,
    neighborhood: row.neighborhood,
    addressDetails: row.address_details || '',
    deliverySlot: row.delivery_slot,
    paymentMethod: row.payment_method,
    waveSenderPhone: row.wave_sender_phone || '',
    waveTransactionRef: row.wave_transaction_ref || '',
    trackingToken: row.tracking_token || '',
    customerNote: row.customer_note || '',
    promoCode: row.promo_code || null,
    subtotal: Number(row.subtotal),
    discountAmount: Number(row.discount_amount),
    deliveryFee: Number(row.delivery_fee),
    total: Number(row.total),
    items: Array.isArray(row.items) ? row.items : [],
    handledBy: row.handled_by || null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function createStore(adapterPromiseOrInstance) {
  let initPromise = null;
  let adapter = null;

  async function ensureReady() {
    if (!initPromise) {
      initPromise = (async () => {
        adapter =
          typeof adapterPromiseOrInstance === 'function'
            ? await adapterPromiseOrInstance()
            : await adapterPromiseOrInstance;

        if (adapter.exec) {
          await adapter.exec(SCHEMA_SQL);
        } else {
          await adapter.query(SCHEMA_SQL);
        }

        // Seed paramètres boutique par défaut (sans écraser l'existant)
        const envWa = normalizeIvorianPhone(process.env.WHATSAPP_NUMBER || BRAND.defaultWhatsapp);
        const defaultSettings = {
          whatsappNumber: envWa || BRAND.defaultWhatsapp,
          wavePhone: process.env.WAVE_PHONE || BRAND.defaultWavePhone,
          wavePaymentUrl: process.env.WAVE_PAYMENT_URL || BRAND.defaultWavePaymentUrl,
          shippingDisclaimer: BRAND.shippingDisclaimer,
          announcementBanner:
            'Livraison Daloa Commune 1 000 F · Périphérie 1 500 F · Expédition Issia, Vavoua & alentours dès 2 000 F · Paiement Wave & Suivi QR',
          storeOpen: true,
          deliveryZones: DELIVERY_ZONES,
        };
        await adapter.query(
          `INSERT INTO store_settings (key, value)
           VALUES ('general', $1::jsonb)
           ON CONFLICT (key) DO NOTHING`,
          [JSON.stringify(defaultSettings)]
        );

        // Seed produits initiaux uniquement si aucun produit n'existe encore
        const { rows: countRows } = await adapter.query('SELECT COUNT(*)::int AS cnt FROM products');
        if (countRows[0].cnt === 0) {
          for (const p of INITIAL_PRODUCTS) {
            await adapter.query(
              `INSERT INTO products (
                id, slug, name, category, price, compare_at_price, stock,
                badge, featured, active, short_description, description, specs, image_url
              ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,TRUE,$10,$11,$12::jsonb,$13)
              ON CONFLICT (id) DO NOTHING`,
              [
                p.id,
                p.slug,
                p.name,
                p.category,
                p.price,
                p.compareAtPrice,
                p.stock,
                p.badge || '',
                Boolean(p.featured),
                p.shortDescription || '',
                p.description || '',
                JSON.stringify(p.specs || []),
                p.imageUrl,
              ]
            );
          }
        }

        // Seed codes promo initiaux si la table est vide
        const { rows: promoCount } = await adapter.query('SELECT COUNT(*)::int AS cnt FROM promo_codes');
        if (promoCount[0].cnt === 0) {
          for (const promo of INITIAL_PROMO_CODES) {
            await adapter.query(
              `INSERT INTO promo_codes (code, discount_type, discount_value, min_subtotal, max_discount, active, description)
               VALUES ($1, $2, $3, $4, $5, $6, $7)
               ON CONFLICT (code) DO NOTHING`,
              [
                promo.code,
                promo.discountType,
                promo.discountValue,
                promo.minSubtotal,
                promo.maxDiscount,
                promo.active,
                promo.description,
              ]
            );
          }
        }

        return adapter;
      })().catch((err) => {
        initPromise = null;
        throw err;
      });
    }
    return initPromise;
  }

  async function getSettings() {
    const db = await ensureReady();
    const { rows } = await db.query(`SELECT value FROM store_settings WHERE key = 'general'`);
    const stored = rows[0]?.value || {};
    const envWa = process.env.WHATSAPP_NUMBER
      ? normalizeIvorianPhone(process.env.WHATSAPP_NUMBER)
      : null;

    // Filtrer toute ancienne zone éventuelle à 0 F (aucune livraison gratuite)
    const storedZones =
      Array.isArray(stored.deliveryZones) && stored.deliveryZones.length > 0
        ? stored.deliveryZones.filter((z) => Number(z.fee) > 0)
        : [];

    return {
      whatsappNumber: stored.whatsappNumber || envWa || BRAND.defaultWhatsapp,
      wavePhone: stored.wavePhone || process.env.WAVE_PHONE || BRAND.defaultWavePhone,
      wavePaymentUrl:
        typeof stored.wavePaymentUrl === 'string'
          ? stored.wavePaymentUrl
          : process.env.WAVE_PAYMENT_URL || BRAND.defaultWavePaymentUrl,
      shippingDisclaimer:
        typeof stored.shippingDisclaimer === 'string' && stored.shippingDisclaimer.trim()
          ? stored.shippingDisclaimer
          : BRAND.shippingDisclaimer,
      announcementBanner:
        typeof stored.announcementBanner === 'string'
          ? stored.announcementBanner
          : 'Livraison Daloa Commune 1 000 F · Périphérie 1 500 F · Expédition Issia, Vavoua & alentours dès 2 000 F · Paiement Wave',
      storeOpen: stored.storeOpen !== false,
      deliveryZones: storedZones.length > 0 ? storedZones : DELIVERY_ZONES,
    };
  }

  async function updateSettings(patch, actor = 'admin') {
    const db = await ensureReady();
    const current = await getSettings();
    const next = {
      ...current,
      ...patch,
      freeShippingThreshold: 0,
      whatsappNumber: normalizeIvorianPhone(patch.whatsappNumber || current.whatsappNumber),
    };
    await db.query(
      `INSERT INTO store_settings (key, value, updated_at)
       VALUES ('general', $1::jsonb, NOW())
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
      [JSON.stringify(next)]
    );
    await logAudit(actor, 'settings.update', 'general', { storeOpen: next.storeOpen });
    return next;
  }

  async function logAudit(actor, action, target = '', details = {}) {
    const db = await ensureReady();
    await db.query(
      `INSERT INTO audit_logs (actor, action, target, details) VALUES ($1, $2, $3, $4::jsonb)`,
      [String(actor), String(action), String(target), JSON.stringify(details || {})]
    );
  }

  async function listPublicProducts() {
    const db = await ensureReady();
    const { rows } = await db.query(
      `SELECT * FROM products WHERE active = TRUE ORDER BY featured DESC, created_at ASC`
    );
    return rows.map(mapProductRow);
  }

  async function listAllProducts() {
    const db = await ensureReady();
    const { rows } = await db.query(
      `SELECT * FROM products ORDER BY active DESC, featured DESC, created_at ASC`
    );
    return rows.map(mapProductRow);
  }

  async function upsertProduct(input, actor = 'admin') {
    const db = await ensureReady();
    const id = input.id || `${slugify(input.name)}-${crypto.randomBytes(2).toString('hex')}`;
    const slug = slugify(input.name) + '-' + id.slice(-4);
    const compareAt =
      input.compareAtPrice && input.compareAtPrice > input.price ? input.compareAtPrice : null;

    const existing = await db.query(`SELECT id, slug, image_url FROM products WHERE id = $1`, [id]);
    if (existing.rows.length > 0) {
      const imageUrl = input.imageUrl || existing.rows[0].image_url || '/images/products/placeholder.svg';
      const { rows } = await db.query(
        `UPDATE products SET
          name = $2,
          category = $3,
          price = $4,
          compare_at_price = $5,
          stock = $6,
          badge = $7,
          featured = $8,
          active = $9,
          short_description = $10,
          description = $11,
          specs = $12::jsonb,
          image_url = $13,
          updated_at = NOW()
        WHERE id = $1
        RETURNING *`,
        [
          id,
          input.name,
          input.category,
          input.price,
          compareAt,
          input.stock,
          input.badge || '',
          Boolean(input.featured),
          input.active !== false,
          input.shortDescription || '',
          input.description || '',
          JSON.stringify(input.specs || []),
          imageUrl,
        ]
      );
      await logAudit(actor, 'product.update', id, { price: input.price, stock: input.stock });
      return mapProductRow(rows[0]);
    }

    const { rows } = await db.query(
      `INSERT INTO products (
        id, slug, name, category, price, compare_at_price, stock,
        badge, featured, active, short_description, description, specs, image_url
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13::jsonb,$14)
      RETURNING *`,
      [
        id,
        slug,
        input.name,
        input.category,
        input.price,
        compareAt,
        input.stock,
        input.badge || '',
        Boolean(input.featured),
        input.active !== false,
        input.shortDescription || '',
        input.description || '',
        JSON.stringify(input.specs || []),
        input.imageUrl || '/images/products/placeholder.svg',
      ]
    );
    await logAudit(actor, 'product.create', id, { name: input.name, price: input.price });
    return mapProductRow(rows[0]);
  }

  async function deleteProduct(id, actor = 'admin') {
    const db = await ensureReady();
    const { rowCount } = await db.query(`DELETE FROM products WHERE id = $1`, [id]);
    if (rowCount === 0) throw new BusinessError('Produit introuvable.', 404);
    await logAudit(actor, 'product.delete', id, {});
    return { deleted: true };
  }

  async function saveProductPhoto(productId, mimeType, buffer, actor = 'admin') {
    const db = await ensureReady();
    const prod = await db.query(`SELECT id FROM products WHERE id = $1`, [productId]);
    if (prod.rows.length === 0) throw new BusinessError('Produit introuvable.', 404);

    await db.withTransaction(async (tx) => {
      await tx.query(
        `INSERT INTO product_photos (product_id, mime_type, data, updated_at)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT (product_id) DO UPDATE SET mime_type = EXCLUDED.mime_type, data = EXCLUDED.data, updated_at = NOW()`,
        [productId, mimeType, buffer]
      );
      await tx.query(
        `UPDATE products SET has_uploaded_photo = TRUE, updated_at = NOW() WHERE id = $1`,
        [productId]
      );
    });
    await logAudit(actor, 'product.photo_upload', productId, { mimeType, bytes: buffer.length });
    const updated = await db.query(`SELECT * FROM products WHERE id = $1`, [productId]);
    return mapProductRow(updated.rows[0]);
  }

  async function getProductPhoto(productId) {
    const db = await ensureReady();
    const { rows } = await db.query(
      `SELECT mime_type, data, updated_at FROM product_photos WHERE product_id = $1`,
      [productId]
    );
    if (rows.length === 0) return null;
    return {
      mimeType: rows[0].mime_type,
      data: Buffer.isBuffer(rows[0].data) ? rows[0].data : Buffer.from(rows[0].data),
      updatedAt: rows[0].updated_at,
    };
  }

  async function deleteProductPhoto(productId, actor = 'admin') {
    const db = await ensureReady();
    await db.withTransaction(async (tx) => {
      await tx.query(`DELETE FROM product_photos WHERE product_id = $1`, [productId]);
      await tx.query(
        `UPDATE products SET has_uploaded_photo = FALSE, updated_at = NOW() WHERE id = $1`,
        [productId]
      );
    });
    await logAudit(actor, 'product.photo_delete', productId, {});
    const updated = await db.query(`SELECT * FROM products WHERE id = $1`, [productId]);
    return updated.rows[0] ? mapProductRow(updated.rows[0]) : null;
  }

  function computePromoDiscount(promoRow, subtotal) {
    if (!promoRow || !promoRow.active) {
      throw new BusinessError('Ce code promo est invalide ou expiré.', 400, 'INVALID_PROMO');
    }
    if (promoRow.usage_limit != null && Number(promoRow.used_count) >= Number(promoRow.usage_limit)) {
      throw new BusinessError('Ce code promo a atteint sa limite d’utilisation.', 400, 'PROMO_EXHAUSTED');
    }
    if (subtotal < Number(promoRow.min_subtotal)) {
      throw new BusinessError(
        `Ce code promo nécessite un minimum d’achat de ${Number(promoRow.min_subtotal).toLocaleString('fr-FR')} FCFA.`,
        400,
        'PROMO_MIN_SUBTOTAL'
      );
    }
    let discount = 0;
    if (promoRow.discount_type === 'percent') {
      discount = Math.round((subtotal * Number(promoRow.discount_value)) / 100);
    } else {
      discount = Number(promoRow.discount_value);
    }
    if (promoRow.max_discount != null) {
      discount = Math.min(discount, Number(promoRow.max_discount));
    }
    discount = Math.min(discount, subtotal);
    return {
      code: promoRow.code,
      discountAmount: discount,
      description: promoRow.description || '',
    };
  }

  async function validatePromoCode(code, subtotal) {
    const db = await ensureReady();
    const cleanCode = String(code || '').trim().toUpperCase();
    const { rows } = await db.query(`SELECT * FROM promo_codes WHERE code = $1`, [cleanCode]);
    if (rows.length === 0) {
      throw new BusinessError('Code promo introuvable.', 404, 'INVALID_PROMO');
    }
    return computePromoDiscount(rows[0], subtotal);
  }

  async function listPromoCodes() {
    const db = await ensureReady();
    const { rows } = await db.query(`SELECT * FROM promo_codes ORDER BY created_at DESC`);
    return rows.map((r) => ({
      code: r.code,
      discountType: r.discount_type,
      discountValue: Number(r.discount_value),
      minSubtotal: Number(r.min_subtotal),
      maxDiscount: r.max_discount != null ? Number(r.max_discount) : null,
      active: Boolean(r.active),
      usageLimit: r.usage_limit != null ? Number(r.usage_limit) : null,
      usedCount: Number(r.used_count),
      description: r.description || '',
    }));
  }

  async function upsertPromoCode(input, actor = 'admin') {
    const db = await ensureReady();
    const code = input.code.trim().toUpperCase();
    await db.query(
      `INSERT INTO promo_codes (code, discount_type, discount_value, min_subtotal, max_discount, usage_limit, active, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (code) DO UPDATE SET
         discount_type = EXCLUDED.discount_type,
         discount_value = EXCLUDED.discount_value,
         min_subtotal = EXCLUDED.min_subtotal,
         max_discount = EXCLUDED.max_discount,
         usage_limit = EXCLUDED.usage_limit,
         active = EXCLUDED.active,
         description = EXCLUDED.description`,
      [
        code,
        input.discountType,
        input.discountValue,
        input.minSubtotal ?? 0,
        input.maxDiscount ?? null,
        input.usageLimit ?? null,
        input.active !== false,
        input.description || '',
      ]
    );
    await logAudit(actor, 'promo.upsert', code, {
      discountType: input.discountType,
      discountValue: input.discountValue,
    });
    return listPromoCodes();
  }

  async function deletePromoCode(code, actor = 'admin') {
    const db = await ensureReady();
    await db.query(`DELETE FROM promo_codes WHERE code = $1`, [String(code).toUpperCase()]);
    await logAudit(actor, 'promo.delete', code, {});
    return listPromoCodes();
  }

  async function placeOrder(payload) {
    const db = await ensureReady();
    const settings = await getSettings();
    if (!settings.storeOpen) {
      throw new BusinessError(
        'Les commandes en ligne sont momentanément suspendues. Contactez-nous sur WhatsApp.',
        503,
        'STORE_CLOSED'
      );
    }

    // Idempotence : si la même requête a déjà abouti, retourner la commande existante
    const existingReq = await db.query(`SELECT * FROM orders WHERE request_id = $1`, [payload.requestId]);
    if (existingReq.rows.length > 0) {
      return { order: mapOrderRow(existingReq.rows[0]), duplicate: true };
    }

    const zone = settings.deliveryZones.find((z) => z.id === payload.cityZoneId);
    if (!zone) {
      throw new BusinessError('Zone de livraison invalide.', 400, 'INVALID_ZONE');
    }

    // Regrouper les articles dupliqués éventuels
    const qtyByProduct = new Map();
    for (const item of payload.items) {
      qtyByProduct.set(item.productId, (qtyByProduct.get(item.productId) || 0) + item.quantity);
    }

    return db.withTransaction(async (tx) => {
      // Revérifier idempotence dans la transaction
      const dupCheck = await tx.query(`SELECT * FROM orders WHERE request_id = $1`, [payload.requestId]);
      if (dupCheck.rows.length > 0) {
        return { order: mapOrderRow(dupCheck.rows[0]), duplicate: true };
      }

      const productIds = Array.from(qtyByProduct.keys());
      const { rows: prodRows } = await tx.query(
        `SELECT * FROM products WHERE id = ANY($1::text[]) FOR UPDATE`,
        [productIds]
      );
      const prodMap = new Map(prodRows.map((r) => [r.id, r]));

      let subtotal = 0;
      const orderItems = [];

      for (const [productId, quantity] of qtyByProduct.entries()) {
        const prod = prodMap.get(productId);
        if (!prod || !prod.active) {
          throw new BusinessError(
            `Un article de votre panier n’est plus disponible.`,
            409,
            'PRODUCT_UNAVAILABLE'
          );
        }
        if (Number(prod.stock) < quantity) {
          throw new BusinessError(
            prod.stock === 0
              ? `Rupture de stock pour « ${prod.name} ».`
              : `Stock insuffisant pour « ${prod.name} » (disponible : ${prod.stock}).`,
            409,
            'OUT_OF_STOCK'
          );
        }
        const unitPrice = Number(prod.price);
        const lineTotal = unitPrice * quantity;
        subtotal += lineTotal;
        orderItems.push({
          productId: prod.id,
          name: prod.name,
          unitPrice,
          quantity,
          lineTotal,
        });

        // Décrémenter le stock atomiquement
        await tx.query(
          `UPDATE products SET stock = stock - $2, updated_at = NOW() WHERE id = $1`,
          [prod.id, quantity]
        );
      }

      // Code promo optionnel
      let discountAmount = 0;
      let appliedPromo = null;
      if (payload.promoCode && payload.promoCode.trim()) {
        const cleanPromo = payload.promoCode.trim().toUpperCase();
        const { rows: promoRows } = await tx.query(
          `SELECT * FROM promo_codes WHERE code = $1 FOR UPDATE`,
          [cleanPromo]
        );
        if (promoRows.length === 0) {
          throw new BusinessError('Code promo introuvable.', 400, 'INVALID_PROMO');
        }
        const resPromo = computePromoDiscount(promoRows[0], subtotal);
        discountAmount = resPromo.discountAmount;
        appliedPromo = resPromo.code;
        await tx.query(`UPDATE promo_codes SET used_count = used_count + 1 WHERE code = $1`, [
          appliedPromo,
        ]);
      }

      const netSubtotal = Math.max(0, subtotal - discountAmount);
      // Aucune livraison gratuite : le tarif de base de la zone s'applique systématiquement
      const deliveryFee = Math.max(100, Number(zone.fee));
      const total = netSubtotal + deliveryFee;

      // Générer une référence unique PKD-XXXXXX + jeton secret pour le Code QR de suivi en direct
      let reference = generateOrderReference();
      for (let attempt = 0; attempt < 5; attempt++) {
        const exists = await tx.query(`SELECT 1 FROM orders WHERE reference = $1`, [reference]);
        if (exists.rows.length === 0) break;
        reference = generateOrderReference();
      }
      const trackingToken = generateTrackingToken();

      const phoneNorm = normalizeIvorianPhone(payload.customerPhone);

      const { rows: inserted } = await tx.query(
        `INSERT INTO orders (
          reference, request_id, status, customer_name, customer_phone, customer_phone_norm,
          city_zone_id, city_zone_name, neighborhood, address_details,
          delivery_slot, payment_method, wave_sender_phone, wave_transaction_ref, tracking_token,
          customer_note, promo_code, subtotal, discount_amount, delivery_fee, total, items
        ) VALUES ($1,$2,'pending',$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21::jsonb)
        RETURNING *`,
        [
          reference,
          payload.requestId,
          payload.customerName,
          payload.customerPhone,
          phoneNorm,
          zone.id,
          zone.shortName || zone.name,
          payload.neighborhood,
          payload.addressDetails || '',
          payload.deliverySlot,
          'wave',
          payload.waveSenderPhone || '',
          payload.waveTransactionRef || '',
          trackingToken,
          payload.customerNote || '',
          appliedPromo,
          subtotal,
          discountAmount,
          deliveryFee,
          total,
          JSON.stringify(orderItems),
        ]
      );

      return { order: mapOrderRow(inserted[0]), duplicate: false };
    });
  }

  async function trackOrder({ reference, phone, token }) {
    const db = await ensureReady();
    const refClean = String(reference || '').trim().toUpperCase();
    const { rows } = await db.query(
      `SELECT * FROM orders WHERE UPPER(reference) = $1`,
      [refClean]
    );
    if (rows.length === 0) return null;
    const row = rows[0];

    // Autoriser soit par jeton QR secret en temps constant, soit par vérification du numéro client
    let authorized = false;
    if (token && row.tracking_token && timingSafeEqualStr(token.trim(), row.tracking_token)) {
      authorized = true;
    } else if (phone) {
      const phoneNorm = normalizeIvorianPhone(phone);
      const storedDigits = String(row.customer_phone_norm || '').replace(/\D/g, '');
      const inputDigits = String(phoneNorm || '').replace(/\D/g, '');
      authorized =
        storedDigits === inputDigits ||
        (storedDigits.length >= 8 &&
          inputDigits.length >= 8 &&
          storedDigits.slice(-8) === inputDigits.slice(-8));
    }

    if (!authorized) return null;

    const order = mapOrderRow(row);
    return {
      reference: order.reference,
      status: order.status,
      customerName: order.customerName,
      cityZoneName: order.cityZoneName,
      neighborhood: order.neighborhood,
      deliverySlot: order.deliverySlot,
      paymentMethod: order.paymentMethod,
      waveTransactionRef: order.waveTransactionRef,
      trackingToken: order.trackingToken,
      subtotal: order.subtotal,
      discountAmount: order.discountAmount,
      deliveryFee: order.deliveryFee,
      total: order.total,
      items: order.items,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }

  async function listOrders({ status, search, limit = 150 } = {}) {
    const db = await ensureReady();
    const params = [];
    const clauses = [];
    if (status && status !== 'all') {
      params.push(status);
      clauses.push(`status = $${params.length}`);
    }
    if (search && search.trim()) {
      params.push(`%${search.trim()}%`);
      clauses.push(
        `(reference ILIKE $${params.length} OR customer_name ILIKE $${params.length} OR customer_phone ILIKE $${params.length} OR neighborhood ILIKE $${params.length})`
      );
    }
    params.push(Math.min(Math.max(Number(limit) || 150, 1), 500));
    const whereSql = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
    const { rows } = await db.query(
      `SELECT * FROM orders ${whereSql} ORDER BY created_at DESC LIMIT $${params.length}`,
      params
    );
    return rows.map(mapOrderRow);
  }

  async function updateOrderStatus(reference, nextStatus, actor = 'admin') {
    const db = await ensureReady();
    return db.withTransaction(async (tx) => {
      const { rows } = await tx.query(
        `SELECT * FROM orders WHERE reference = $1 FOR UPDATE`,
        [reference]
      );
      if (rows.length === 0) throw new BusinessError('Commande introuvable.', 404);
      const current = rows[0];

      if (current.status === nextStatus) {
        return mapOrderRow(current);
      }

      if (current.status === 'delivered' && nextStatus === 'cancelled') {
        throw new BusinessError(
          'Une commande déjà livrée ne peut pas être annulée.',
          409,
          'CANNOT_CANCEL_DELIVERED'
        );
      }
      if (current.status === 'cancelled' && nextStatus !== 'cancelled') {
        throw new BusinessError(
          'Une commande annulée (dont le stock a été restitué) ne peut pas être réactivée.',
          409,
          'ORDER_ALREADY_CANCELLED'
        );
      }

      // Si on annule une commande active, restituer intégralement le stock réservé
      if (nextStatus === 'cancelled' && current.status !== 'cancelled') {
        const items = Array.isArray(current.items) ? current.items : [];
        for (const item of items) {
          await tx.query(
            `UPDATE products SET stock = stock + $2, updated_at = NOW() WHERE id = $1`,
            [item.productId, Number(item.quantity)]
          );
        }
      }

      const { rows: updated } = await tx.query(
        `UPDATE orders SET status = $2, handled_by = $3, updated_at = NOW()
         WHERE reference = $1 RETURNING *`,
        [reference, nextStatus, actor]
      );
      await tx.query(
        `INSERT INTO audit_logs (actor, action, target, details) VALUES ($1, 'order.status', $2, $3::jsonb)`,
        [actor, reference, JSON.stringify({ from: current.status, to: nextStatus })]
      );
      return mapOrderRow(updated[0]);
    });
  }

  // Confirmation automatique par Webhook officiel Wave Business Checkout (sans intervention humaine)
  async function confirmWaveWebhookPayment({ reference, waveTransactionId, waveSenderPhone }) {
    const db = await ensureReady();
    const refClean = String(reference || '').trim().toUpperCase();
    return db.withTransaction(async (tx) => {
      const { rows } = await tx.query(
        `SELECT * FROM orders WHERE UPPER(reference) = $1 FOR UPDATE`,
        [refClean]
      );
      if (rows.length === 0) return null;
      const current = rows[0];
      const nextStatus = current.status === 'pending' ? 'preparing' : current.status;
      const { rows: updated } = await tx.query(
        `UPDATE orders
         SET status = $2,
             wave_transaction_ref = COALESCE(NULLIF($3, ''), wave_transaction_ref),
             wave_sender_phone = COALESCE(NULLIF($4, ''), wave_sender_phone),
             handled_by = 'wave-webhook-auto',
             updated_at = NOW()
         WHERE id = $1
         RETURNING *`,
        [
          current.id,
          nextStatus,
          String(waveTransactionId || '').trim(),
          String(waveSenderPhone || '').trim(),
        ]
      );
      await tx.query(
        `INSERT INTO audit_logs (actor, action, target, details) VALUES ('wave-webhook-auto', 'order.wave_paid', $1, $2::jsonb)`,
        [current.reference, JSON.stringify({ waveTransactionId })]
      );
      return mapOrderRow(updated[0]);
    });
  }

  async function getDashboardStats() {
    const db = await ensureReady();
    const { rows: summaryRows } = await db.query(`
      SELECT
        COUNT(*)::int AS total_orders,
        COUNT(*) FILTER (WHERE status = 'pending')::int AS pending_orders,
        COUNT(*) FILTER (WHERE status IN ('preparing', 'shipped'))::int AS active_orders,
        COUNT(*) FILTER (WHERE status = 'delivered')::int AS delivered_orders,
        COUNT(*) FILTER (WHERE status = 'cancelled')::int AS cancelled_orders,
        COALESCE(SUM(total) FILTER (WHERE status != 'cancelled'), 0)::bigint AS gross_revenue,
        COALESCE(SUM(total) FILTER (WHERE status = 'delivered'), 0)::bigint AS delivered_revenue,
        COALESCE(SUM(total) FILTER (
          WHERE status != 'cancelled'
          AND (created_at AT TIME ZONE 'Africa/Abidjan')::date = (NOW() AT TIME ZONE 'Africa/Abidjan')::date
        ), 0)::bigint AS today_revenue,
        COUNT(*) FILTER (
          WHERE (created_at AT TIME ZONE 'Africa/Abidjan')::date = (NOW() AT TIME ZONE 'Africa/Abidjan')::date
        )::int AS today_orders
      FROM orders
    `);

    const { rows: lowStockRows } = await db.query(`
      SELECT id, name, stock, price FROM products
      WHERE active = TRUE AND stock <= 5
      ORDER BY stock ASC LIMIT 10
    `);

    const { rows: byZoneRows } = await db.query(`
      SELECT city_zone_name AS zone, COUNT(*)::int AS orders_count, COALESCE(SUM(total), 0)::bigint AS revenue
      FROM orders
      WHERE status != 'cancelled'
      GROUP BY city_zone_name
      ORDER BY orders_count DESC
    `);

    const { rows: recentLogs } = await db.query(`
      SELECT id, actor, action, target, details, created_at
      FROM audit_logs
      ORDER BY created_at DESC
      LIMIT 25
    `);

    const s = summaryRows[0];
    return {
      totalOrders: s.total_orders,
      pendingOrders: s.pending_orders,
      activeOrders: s.active_orders,
      deliveredOrders: s.delivered_orders,
      cancelledOrders: s.cancelled_orders,
      grossRevenue: Number(s.gross_revenue),
      deliveredRevenue: Number(s.delivered_revenue),
      todayRevenue: Number(s.today_revenue),
      todayOrders: s.today_orders,
      lowStockProducts: lowStockRows.map((r) => ({
        id: r.id,
        name: r.name,
        stock: Number(r.stock),
        price: Number(r.price),
      })),
      salesByZone: byZoneRows.map((r) => ({
        zone: r.zone,
        ordersCount: r.orders_count,
        revenue: Number(r.revenue),
      })),
      recentLogs,
    };
  }

  // Agents d'équipe (codes PKD-XXXX-XXXX révocables)
  async function listAgents() {
    const db = await ensureReady();
    const { rows } = await db.query(
      `SELECT id, name, phone, code_prefix, active, created_at, revoked_at
       FROM agents ORDER BY active DESC, created_at DESC`
    );
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      phone: r.phone,
      codePrefix: r.code_prefix,
      active: Boolean(r.active),
      createdAt: r.created_at,
      revokedAt: r.revoked_at,
    }));
  }

  async function createAgent({ name, phone }, actor = 'admin') {
    const db = await ensureReady();
    const id = 'agt_' + crypto.randomBytes(6).toString('hex');
    const plainCode = generateAgentCode();
    const codeHash = hashSecret(plainCode.toUpperCase());
    const codePrefix = plainCode.slice(0, 8) + '••••';

    await db.query(
      `INSERT INTO agents (id, name, phone, code_prefix, code_hash, active)
       VALUES ($1, $2, $3, $4, $5, TRUE)`,
      [id, name, phone || '', codePrefix, codeHash]
    );
    await logAudit(actor, 'agent.create', id, { name });
    return {
      id,
      name,
      phone: phone || '',
      plainCode, // retourné une seule fois à la création
      codePrefix,
    };
  }

  async function findActiveAgentByCode(code) {
    const db = await ensureReady();
    const codeHash = hashSecret(String(code || '').trim().toUpperCase());
    const { rows } = await db.query(
      `SELECT id, name, active FROM agents WHERE code_hash = $1 AND active = TRUE`,
      [codeHash]
    );
    return rows[0] || null;
  }

  async function getAgentById(id) {
    const db = await ensureReady();
    const { rows } = await db.query(
      `SELECT id, name, active FROM agents WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async function revokeAgent(id, actor = 'admin') {
    const db = await ensureReady();
    const { rowCount } = await db.query(
      `UPDATE agents SET active = FALSE, revoked_at = NOW() WHERE id = $1`,
      [id]
    );
    if (rowCount === 0) throw new BusinessError('Agent introuvable.', 404);
    await logAudit(actor, 'agent.revoke', id, {});
    return listAgents();
  }

  async function healthCheck() {
    const db = await ensureReady();
    await db.query('SELECT 1');
    return {
      ok: true,
      storage: {
        mode: db.mode,
        durable: db.durable,
      },
    };
  }

  async function close() {
    if (adapter?.close) await adapter.close();
  }

  return {
    ensureReady,
    healthCheck,
    getSettings,
    updateSettings,
    listPublicProducts,
    listAllProducts,
    upsertProduct,
    deleteProduct,
    saveProductPhoto,
    getProductPhoto,
    deleteProductPhoto,
    validatePromoCode,
    listPromoCodes,
    upsertPromoCode,
    deletePromoCode,
    placeOrder,
    trackOrder,
    listOrders,
    updateOrderStatus,
    confirmWaveWebhookPayment,
    getDashboardStats,
    listAgents,
    createAgent,
    findActiveAgentByCode,
    getAgentById,
    revokeAgent,
    close,
  };
}
