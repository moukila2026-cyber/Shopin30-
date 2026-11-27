// ==============================================================================
// PÈRÔKADÔ — Validation stricte des entrées (Zod v4)
// ==============================================================================
import { z } from 'zod';
import { CATEGORIES, DELIVERY_SLOTS, PAYMENT_METHOD_IDS } from '../shared/catalog.js';

const validCategoryIds = CATEGORIES.filter((c) => c.id !== 'all').map((c) => c.id);
const validSlotIds = DELIVERY_SLOTS.map((s) => s.id);
const validPaymentMethodIds = PAYMENT_METHOD_IDS;

export const OrderItemInputSchema = z.object({
  productId: z.string().trim().min(1).max(120),
  quantity: z.number().int().min(1).max(50),
});

export const PlaceOrderSchema = z.object({
  requestId: z.string().trim().min(8).max(128),
  customerName: z.string().trim().min(2, 'Veuillez indiquer votre nom complet.').max(100),
  customerPhone: z
    .string()
    .trim()
    .min(8, 'Numéro de téléphone invalide.')
    .max(25)
    .refine((val) => val.replace(/\D/g, '').length >= 8, {
      message: 'Numéro de téléphone invalide (minimum 8 chiffres).',
    }),
  cityZoneId: z.string().trim().min(1).max(80),
  neighborhood: z
    .string()
    .trim()
    .min(2, 'Veuillez indiquer votre quartier ou localité précise.')
    .max(140),
  addressDetails: z.string().trim().max(300).optional().default(''),
  deliverySlot: z.string().refine((v) => validSlotIds.includes(v), {
    message: 'Créneau de livraison invalide.',
  }),
  // Seul Wave Côte d’Ivoire est accepté pour les nouvelles commandes.
  paymentMethod: z
    .string()
    .trim()
    .refine((v) => validPaymentMethodIds.includes(v), {
      message:
        'Moyen de paiement invalide. Seul Wave Côte d’Ivoire est accepté.',
    }),
  waveSenderPhone: z
    .string()
    .trim()
    .max(25)
    .optional()
    .default(''),
  waveTransactionRef: z
    .string()
    .trim()
    .max(80)
    .optional()
    .default(''),
  customerNote: z.string().trim().max(500).optional().default(''),
  promoCode: z.string().trim().max(40).optional().default(''),
  items: z.array(OrderItemInputSchema).min(1, 'Votre panier est vide.').max(30),
});

export const TrackOrderSchema = z
  .object({
    reference: z.string().trim().min(4).max(30),
    phone: z.string().trim().max(25).optional().default(''),
    token: z.string().trim().max(80).optional().default(''),
  })
  .refine((data) => data.token.length >= 16 || data.phone.replace(/\D/g, '').length >= 8, {
    message: 'Veuillez renseigner votre numéro de téléphone ou scanner votre code QR de suivi.',
  });

export const PromoValidateSchema = z.object({
  code: z.string().trim().min(2).max(40),
  subtotal: z.number().int().min(0),
});

export const AdminLoginSchema = z.object({
  credential: z.string().trim().min(4).max(200),
});

export const ProductUpsertSchema = z.object({
  id: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Identifiant invalide (lettres minuscules, chiffres et tirets uniquement).')
    .optional(),
  name: z.string().trim().min(2).max(160),
  category: z.string().refine((v) => validCategoryIds.includes(v), {
    message: 'Catégorie invalide.',
  }),
  price: z.number().int().min(100).max(50000000),
  compareAtPrice: z.number().int().min(0).max(50000000).nullable().optional(),
  stock: z.number().int().min(0).max(100000),
  badge: z.string().trim().max(40).optional().default(''),
  featured: z.boolean().optional().default(false),
  active: z.boolean().optional().default(true),
  isHeavy: z.boolean().optional(),
  shortDescription: z.string().trim().max(260).optional().default(''),
  description: z.string().trim().max(2500).optional().default(''),
  specs: z.array(z.string().trim().min(1).max(160)).max(10).optional().default([]),
  imageUrl: z.string().trim().max(300).optional(),
});

export const OrderStatusUpdateSchema = z.object({
  status: z.enum(['pending', 'preparing', 'shipped', 'delivered', 'cancelled']),
});

export const CreateAgentSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().max(30).optional().default(''),
});

export const CreatePromoSchema = z.object({
  code: z
    .string()
    .trim()
    .toUpperCase()
    .min(3)
    .max(30)
    .regex(/^[A-Z0-9_-]+$/, 'Le code promo ne doit contenir que des lettres, chiffres, tirets.'),
  discountType: z.enum(['percent', 'fixed']),
  discountValue: z.number().int().min(1).max(5000000),
  minSubtotal: z.number().int().min(0).max(50000000).optional().default(0),
  maxDiscount: z.number().int().min(0).max(50000000).nullable().optional(),
  usageLimit: z.number().int().min(1).max(1000000).nullable().optional(),
  description: z.string().trim().max(180).optional().default(''),
  active: z.boolean().optional().default(true),
});

export const StoreSettingsUpdateSchema = z.object({
  whatsappNumber: z.string().trim().min(8).max(25),
  wavePhone: z.string().trim().min(8).max(30),
  wavePaymentUrl: z
    .string()
    .trim()
    .max(300)
    .refine((v) => !v || v.startsWith('https://'), {
      message: 'Le lien de paiement Wave doit commencer par https:// (ou rester vide).',
    })
    .optional()
    .default(''),
  shippingDisclaimer: z.string().trim().min(10).max(400),
  announcementBanner: z.string().trim().max(220),
  storeOpen: z.boolean(),
  deliveryZones: z
    .array(
      z.object({
        id: z.string().trim().min(1).max(80),
        name: z.string().trim().min(2).max(180),
        shortName: z.string().trim().min(2).max(80),
        fee: z.number().int().min(100, 'Aucune livraison gratuite : le tarif minimum doit être positif.').max(500000),
        eta: z.string().trim().min(2).max(160),
      })
    )
    .min(1)
    .max(25)
    .optional(),
});

// Avis client : note 1 à 5, commentaire court, nom affichable, référence de
// commande facultative (elle déclenche la mention « achat vérifié »).
export const ReviewSchema = z.object({
  productId: z.string().trim().min(1).max(160),
  orderReference: z.string().trim().max(40).optional().default(''),
  authorName: z.string().trim().min(2).max(60),
  authorCity: z.string().trim().max(60).optional().default('Daloa'),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().trim().max(1200).optional().default(''),
});

export const ReviewModerationSchema = z.object({
  status: z.enum(['approved', 'rejected', 'pending']),
});

export const CartAbandonmentSchema = z.object({
  customerPhone: z.string().trim().min(8).max(20),
  customerName: z.string().trim().max(60).optional().default(''),
  subtotal: z.coerce.number().int().min(0).max(100000000).optional().default(0),
  items: z
    .array(
      z.object({
        productId: z.string().trim().min(1).max(160),
        name: z.string().trim().max(300).optional().default(''),
        quantity: z.coerce.number().int().min(1).max(999),
        lineTotal: z.coerce.number().int().min(0).max(100000000).optional().default(0),
      })
    )
    .max(60)
    .optional()
    .default([]),
});

export const CartAbandonmentStatusSchema = z.object({
  status: z.enum(['open', 'reminded', 'converted', 'ignored']),
});
