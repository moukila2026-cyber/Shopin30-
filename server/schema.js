// ==============================================================================
// PÈRÔKADÔ — Schéma PostgreSQL idempotent (Neon en prod / PGlite en dev & tests)
// ==============================================================================

export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS store_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price >= 0),
  compare_at_price INTEGER CHECK (compare_at_price IS NULL OR compare_at_price >= 0),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  badge TEXT NOT NULL DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  short_description TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  specs JSONB NOT NULL DEFAULT '[]'::jsonb,
  image_url TEXT NOT NULL DEFAULT '/images/products/placeholder.svg',
  has_uploaded_photo BOOLEAN NOT NULL DEFAULT FALSE,
  is_heavy BOOLEAN,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE products ADD COLUMN IF NOT EXISTS is_heavy BOOLEAN;
ALTER TABLE products ADD COLUMN IF NOT EXISTS has_photo_2 BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS has_photo_3 BOOLEAN NOT NULL DEFAULT FALSE;

CREATE TABLE IF NOT EXISTS product_extra_photos (
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  slot SMALLINT NOT NULL CHECK (slot IN (2, 3)),
  mime_type TEXT NOT NULL,
  data BYTEA NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (product_id, slot)
);

CREATE TABLE IF NOT EXISTS product_photos (
  product_id TEXT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
  mime_type TEXT NOT NULL,
  data BYTEA NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS promo_codes (
  code TEXT PRIMARY KEY,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percent', 'fixed')),
  discount_value INTEGER NOT NULL CHECK (discount_value > 0),
  min_subtotal INTEGER NOT NULL DEFAULT 0 CHECK (min_subtotal >= 0),
  max_discount INTEGER CHECK (max_discount IS NULL OR max_discount >= 0),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  usage_limit INTEGER CHECK (usage_limit IS NULL OR usage_limit > 0),
  used_count INTEGER NOT NULL DEFAULT 0 CHECK (used_count >= 0),
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  reference TEXT NOT NULL UNIQUE,
  request_id TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'shipped', 'delivered', 'cancelled')),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_phone_norm TEXT NOT NULL,
  city_zone_id TEXT NOT NULL,
  city_zone_name TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  address_details TEXT NOT NULL DEFAULT '',
  delivery_slot TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  wave_sender_phone TEXT NOT NULL DEFAULT '',
  wave_transaction_ref TEXT NOT NULL DEFAULT '',
  tracking_token TEXT NOT NULL DEFAULT '',
  customer_note TEXT NOT NULL DEFAULT '',
  promo_code TEXT,
  subtotal INTEGER NOT NULL CHECK (subtotal >= 0),
  discount_amount INTEGER NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
  delivery_fee INTEGER NOT NULL DEFAULT 0 CHECK (delivery_fee >= 0),
  total INTEGER NOT NULL CHECK (total >= 0),
  items JSONB NOT NULL,
  handled_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE orders ADD COLUMN IF NOT EXISTS wave_sender_phone TEXT NOT NULL DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS wave_transaction_ref TEXT NOT NULL DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_token TEXT NOT NULL DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_provider TEXT NOT NULL DEFAULT 'wave';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS wave_session_id TEXT NOT NULL DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS wave_checkout_url TEXT NOT NULL DEFAULT '';

CREATE INDEX IF NOT EXISTS idx_orders_status_created ON orders(status, created_at DESC);

-- Avis clients réels : un avis n'est publié qu'après vérification manuelle en
-- administration (statut 'approved'). Aucune note générée automatiquement.
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id TEXT NOT NULL,
  order_reference TEXT NOT NULL DEFAULT '',
  author_name TEXT NOT NULL,
  author_city TEXT NOT NULL DEFAULT 'Daloa',
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  verified_purchase BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (product_id, order_reference, author_name)
);

CREATE INDEX IF NOT EXISTS idx_reviews_product_status ON reviews(product_id, status);

-- Relance de panier abandonné : le client laisse son numéro avant de finaliser,
-- le commerçant retrouve la relance prête (lien WhatsApp pré-rempli) dans l'admin.
CREATE TABLE IF NOT EXISTS cart_abandonments (
  id SERIAL PRIMARY KEY,
  phone_norm TEXT NOT NULL,
  customer_phone TEXT NOT NULL DEFAULT '',
  customer_name TEXT NOT NULL DEFAULT '',
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'reminded', 'converted', 'ignored')),
  reminded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (phone_norm)
);

CREATE INDEX IF NOT EXISTS idx_cart_abandonments_status ON cart_abandonments(status, created_at DESC);


CREATE INDEX IF NOT EXISTS idx_orders_phone_norm ON orders(customer_phone_norm);
CREATE INDEX IF NOT EXISTS idx_orders_wave_session ON orders(wave_session_id);

CREATE TABLE IF NOT EXISTS agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  code_prefix TEXT NOT NULL,
  code_hash TEXT NOT NULL UNIQUE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  target TEXT NOT NULL DEFAULT '',
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`;
