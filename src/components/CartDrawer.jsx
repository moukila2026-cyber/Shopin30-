import React from 'react';
import QRCode from 'qrcode';
import {
  X,
  Trash2,
  ShoppingCart,
  Tag,
  Truck,
  CheckCircle2,
  MessageCircle,
  Copy,
  Check,
  AlertCircle,
  ArrowLeft,
  Smartphone,
  QrCode,
  Download,
  ExternalLink,
  Info,
  Lock,
} from 'lucide-react';
import {
  formatFcfa,
  DELIVERY_SLOTS,
  BRAND,
  computeZoneDeliveryFee,
  inferHeavyShipping,
} from '../../shared/catalog.js';
import {
  apiFetch,
  buildOrderTrackingUrl,
  buildWhatsappOrderUrl,
  buildWhatsappServiceUrl,
} from '../lib/api.js';

function makeRequestId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'req_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
}

export function CartDrawer({
  open,
  initialStep = 'cart',
  onClose,
  cartItems,
  productsMap,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  settings,
  selectedZoneId,
  onSelectZone,
  onOrderSuccess,
  onOpenDirectTrack,
}) {
  const [step, setStep] = React.useState('cart'); // 'cart' | 'checkout' | 'confirmed'
  const [promoInput, setPromoInput] = React.useState('');
  const [appliedPromo, setAppliedPromo] = React.useState(null);
  const [promoError, setPromoError] = React.useState('');
  const [promoLoading, setPromoLoading] = React.useState(false);

  const zones = settings?.deliveryZones || [];
  const [customerName, setCustomerName] = React.useState('');
  const [customerPhone, setCustomerPhone] = React.useState('');
  const [cityZoneId, setCityZoneId] = React.useState(
    selectedZoneId || zones[0]?.id || 'daloa-commune'
  );
  const [neighborhood, setNeighborhood] = React.useState('');
  const [addressDetails, setAddressDetails] = React.useState('');
  const [deliverySlot, setDeliverySlot] = React.useState(DELIVERY_SLOTS[0].id);

  // Paiement en ligne Wave uniquement
  const [waveSenderPhone, setWaveSenderPhone] = React.useState('');
  const [waveTransactionRef, setWaveTransactionRef] = React.useState('');
  const [customerNote, setCustomerNote] = React.useState('');

  const [requestId, setRequestId] = React.useState(() => makeRequestId());
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');
  const [confirmedData, setConfirmedData] = React.useState(null);
  const [qrDataUrl, setQrDataUrl] = React.useState('');
  const [copiedRef, setCopiedRef] = React.useState(false);
  const [copiedWave, setCopiedWave] = React.useState(false);

  // Synchroniser avec la zone choisie dans le Header Amazon
  React.useEffect(() => {
    if (selectedZoneId && zones.some((z) => z.id === selectedZoneId)) {
      setCityZoneId(selectedZoneId);
    } else if (zones.length > 0 && !zones.some((z) => z.id === cityZoneId)) {
      setCityZoneId(zones[0].id);
    }
  }, [selectedZoneId, zones, cityZoneId]);

  React.useEffect(() => {
    if (open) {
      if (step !== 'confirmed') {
        setStep(initialStep === 'checkout' ? 'checkout' : 'cart');
      }
    } else {
      if (step === 'confirmed') {
        setStep('cart');
        setConfirmedData(null);
        setQrDataUrl('');
      }
      setSubmitError('');
    }
  }, [open, initialStep]);

  // Génération locale du Code QR haute précision pointant vers le lien de suivi en direct
  React.useEffect(() => {
    if (!confirmedData?.order) {
      setQrDataUrl('');
      return;
    }
    const url = buildOrderTrackingUrl(confirmedData.order);
    QRCode.toDataURL(url, {
      width: 280,
      margin: 2,
      color: { dark: '#131921', light: '#FFFFFF' },
      errorCorrectionLevel: 'M',
    })
      .then((dataUrl) => setQrDataUrl(dataUrl))
      .catch(() => setQrDataUrl(''));
  }, [confirmedData]);

  if (!open) return null;

  const detailedItems = cartItems
    .map((ci) => {
      const prod = productsMap.get(ci.productId);
      if (!prod) return null;
      return {
        ...ci,
        product: prod,
        lineTotal: prod.price * ci.quantity,
      };
    })
    .filter(Boolean);

  const subtotal = detailedItems.reduce((acc, item) => acc + item.lineTotal, 0);
  const discountAmount = appliedPromo ? Math.min(appliedPromo.discountAmount, subtotal) : 0;
  const netSubtotal = Math.max(0, subtotal - discountAmount);
  const hasHeavyItem = detailedItems.some((item) => inferHeavyShipping(item.product));
  const selectedZone =
    zones.find((z) => z.id === cityZoneId) ||
    zones[0] || { id: 'daloa-commune', fee: 1000, shortName: 'Daloa Commune' };
  const deliveryFee = computeZoneDeliveryFee(selectedZone, { hasHeavyItem });
  const grandTotal = netSubtotal + deliveryFee;

  const waveMerchantNumber = settings?.wavePhone || BRAND.defaultWavePhone;
  const wavePaymentUrl = settings?.wavePaymentUrl || '';
  const waveAutoCheckout = Boolean(settings?.waveAutoCheckout);
  const shippingDisclaimer = settings?.shippingDisclaimer || BRAND.shippingDisclaimer;

  async function handleApplyPromo(e) {
    e.preventDefault();
    if (!promoInput.trim()) return;
    setPromoLoading(true);
    setPromoError('');
    try {
      const res = await apiFetch('/api/promos/validate', {
        method: 'POST',
        body: { code: promoInput.trim(), subtotal },
      });
      setAppliedPromo(res.promo);
    } catch (err) {
      setAppliedPromo(null);
      setPromoError(err.message || 'Code promo invalide.');
    } finally {
      setPromoLoading(false);
    }
  }

  async function handleSubmitOrder(e) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await apiFetch('/api/orders', {
        method: 'POST',
        body: {
          requestId,
          customerName,
          customerPhone,
          cityZoneId,
          neighborhood,
          addressDetails,
          deliverySlot,
          paymentMethod: 'wave',
          waveSenderPhone: waveSenderPhone.trim() || customerPhone.trim(),
          waveTransactionRef: waveTransactionRef.trim(),
          customerNote,
          promoCode: appliedPromo?.code || '',
          items: detailedItems.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        },
      });
      onClearCart();
      setAppliedPromo(null);
      setPromoInput('');
      setWaveTransactionRef('');
      setRequestId(makeRequestId());
      if (onOrderSuccess) onOrderSuccess();

      // Si l'API Wave Business Checkout est active, ouvrir automatiquement l'application Wave !
      const redirectUrl = res.waveCheckoutUrl || res.checkoutUrl;
      if (redirectUrl && typeof window !== 'undefined') {
        window.location.href = redirectUrl;
        return;
      }
      setConfirmedData(res);
      setStep('confirmed');
    } catch (err) {
      setSubmitError(err.message || 'Impossible de valider la commande.');
    } finally {
      setSubmitting(false);
    }
  }

  function copyReference(ref) {
    navigator.clipboard?.writeText(ref);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  }

  function copyWaveNumber() {
    navigator.clipboard?.writeText(waveMerchantNumber.replace(/\s+/g, ''));
    setCopiedWave(true);
    setTimeout(() => setCopiedWave(false), 2000);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 overscroll-contain"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Panier et commande Pèrôkadô"
      style={{ height: '100dvh' }}
    >
      <div
        className="w-full max-w-lg bg-[#EAEDED] h-full min-h-0 flex flex-col shadow-2xl border-l border-[#D5D9D9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête sombre #232F3E style Amazon Checkout */}
        <div className="flex-none px-4 sm:px-5 py-3 sm:py-3.5 bg-[#232F3E] text-white flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="p-1.5 rounded hover:bg-[#37475A] text-white cursor-pointer"
                aria-label="Retour au panier"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <ShoppingCart className="w-5 h-5 text-[#FF9900]" />
            <h2 className="text-sm sm:text-lg font-bold truncate leading-tight">
              <span className="sm:hidden">
                {step === 'cart' && 'Panier'}
                {step === 'checkout' && 'Commande Wave'}
                {step === 'confirmed' && 'Commande confirmée'}
              </span>
              <span className="hidden sm:inline">
                {step === 'cart' && 'Panier Pèrôkadô'}
                {step === 'checkout' && 'Passer la commande (Wave)'}
                {step === 'confirmed' && 'Confirmation & Code QR de suivi'}
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded hover:bg-[#37475A] text-white cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ÉTAPE 1 : PANIER */}
        {step === 'cart' && (
          <>
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3.5 sm:p-4 space-y-3.5">
              {detailedItems.length === 0 ? (
                <div className="bg-white rounded-md p-8 border border-[#D5D9D9] text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#F7FAFA] border border-[#D5D9D9] flex items-center justify-center">
                    <ShoppingCart className="w-7 h-7 text-[#565959]" />
                  </div>
                  <p className="font-bold text-lg text-[#0F1111]">Votre panier Pèrôkadô est vide</p>
                  <p className="text-xs sm:text-sm text-[#565959] max-w-xs mx-auto">
                    Découvrez nos Ventes Flash du jour et parcourez les rayons High-Tech, Mode,
                    Beauté et Maison.
                  </p>
                </div>
              ) : (
                <>
                  {/* Encadré Tarifs Livraison sans gratuité (Standard vs Produit Lourd) */}
                  <div className="bg-white rounded-md p-3.5 border border-[#D5D9D9] text-xs space-y-1.5">
                    <p className="font-bold text-[#0F1111] flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#C7511F]" />
                      <span>Livraison & Expédition (aucune livraison gratuite)</span>
                    </p>
                    <p className="text-[#333333] leading-relaxed">
                      • <strong>Colis standards :</strong> Daloa Commune 1 000 F · Périphérie 1 500 F · Expédition 2 000 F
                      <br />• <strong>Produits lourds (lave-linge, gazinières, frigos…) :</strong>{' '}
                      <strong>2 500 FCFA</strong> dans Daloa · <strong>5 000 FCFA</strong> hors Daloa
                    </p>
                    {hasHeavyItem && (
                      <p className="text-[11px] font-bold text-[#B12704] bg-[#FEF8F2] px-2.5 py-1.5 rounded border border-[#F5D3B3]">
                        ✓ Votre panier contient un produit lourd/volumineux : le tarif spécial
                        manutention ({formatFcfa(deliveryFee)} pour {selectedZone.shortName}) est appliqué automatiquement.
                      </p>
                    )}
                    <p className="text-[11px] text-[#565959]">
                      Besoin d’un renseignement transport ?{' '}
                      <a
                        href={buildWhatsappServiceUrl(settings?.whatsappNumber)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#007185] hover:text-[#C7511F] font-semibold underline"
                      >
                        Contactez le service client
                      </a>
                      .
                    </p>
                  </div>

                  {/* Liste des articles style Amazon Cart */}
                  <div className="bg-white rounded-md border border-[#D5D9D9] divide-y divide-[#EAEDED]">
                    {detailedItems.map(({ product, quantity, lineTotal }) => (
                      <div key={product.id} className="flex gap-3 sm:gap-3.5 p-3 sm:p-3.5">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded bg-[#F7F8F8] border border-[#EAEDED] p-1.5 flex items-center justify-center shrink-0">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = '/images/products/placeholder.svg';
                            }}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h3 className="text-xs sm:text-sm font-medium text-[#0F1111] line-clamp-2">
                              {product.name}
                            </h3>
                            <p className="text-[11px] text-[#007600] font-semibold mt-0.5">
                              En stock
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                            <div className="flex items-center gap-2">
                              <div className="inline-flex items-center rounded-full border-2 border-[#FFD814] bg-[#F7FAFA] shadow-2xs">
                                <button
                                  type="button"
                                  onClick={() => onUpdateQty(product.id, quantity - 1)}
                                  className="px-2.5 py-0.5 text-sm font-bold text-[#0F1111] cursor-pointer"
                                >
                                  −
                                </button>
                                <span className="px-2 text-xs font-bold text-[#0F1111]">
                                  {quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    onUpdateQty(product.id, Math.min(product.stock, quantity + 1))
                                  }
                                  disabled={quantity >= product.stock}
                                  className="px-2.5 py-0.5 text-sm font-bold text-[#0F1111] disabled:opacity-40 cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => onRemoveItem(product.id)}
                                className="text-[11px] text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer"
                              >
                                Supprimer
                              </button>
                            </div>
                            <span className="text-sm font-bold text-[#0F1111]">
                              {formatFcfa(lineTotal)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Code Promo */}
                  <form
                    onSubmit={handleApplyPromo}
                    className="bg-white p-3.5 rounded-md border border-[#D5D9D9]"
                  >
                    <label className="text-xs font-bold text-[#0F1111] flex items-center gap-1.5 mb-2">
                      <Tag className="w-3.5 h-3.5 text-[#C7511F]" />
                      <span>Chèque-cadeau ou code promotionnel</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        placeholder="Ex: BIENVENUE10"
                        className="flex-1 px-3 py-1.5 rounded border border-[#888C8C] text-xs uppercase font-semibold focus:outline-none focus:ring-2 focus:ring-[#007185]"
                      />
                      <button
                        type="submit"
                        disabled={promoLoading}
                        className="px-4 py-1.5 rounded-full bg-white hover:bg-[#F7FAFA] border border-[#D5D9D9] text-[#0F1111] text-xs font-medium shadow-2xs cursor-pointer"
                      >
                        {promoLoading ? '...' : 'Appliquer'}
                      </button>
                    </div>
                    {promoError && <p className="text-xs text-[#CC0C39] mt-1.5">{promoError}</p>}
                    {appliedPromo && (
                      <div className="mt-2 flex items-center justify-between text-xs text-[#007600] bg-[#F2FBF2] px-3 py-1.5 rounded border border-[#B7E4B7]">
                        <span>
                          ✓ Code <strong>{appliedPromo.code}</strong> appliqué (−
                          {formatFcfa(discountAmount)})
                        </span>
                        <button
                          type="button"
                          onClick={() => setAppliedPromo(null)}
                          className="underline font-semibold cursor-pointer"
                        >
                          Retirer
                        </button>
                      </div>
                    )}
                  </form>
                </>
              )}
            </div>

            {detailedItems.length > 0 && (
              <div className="flex-none p-3.5 sm:p-4 bg-white border-t border-[#D5D9D9] space-y-2.5 sm:space-y-3 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-[#0F1111]">
                    <span>
                      Sous-total ({detailedItems.reduce((s, i) => s + i.quantity, 0)} article
                      {detailedItems.reduce((s, i) => s + i.quantity, 0) > 1 ? 's' : ''}) :
                    </span>
                    <strong className="font-bold">{formatFcfa(subtotal)}</strong>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#007600] font-semibold text-xs">
                      <span>Remise ({appliedPromo?.code})</span>
                      <span>−{formatFcfa(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-[#565959]">
                    <span>
                      Livraison ({selectedZone.shortName}
                      {hasHeavyItem ? ' · Colis lourd' : ''})
                    </span>
                    <span>+{formatFcfa(deliveryFee)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!waveSenderPhone && customerPhone) setWaveSenderPhone(customerPhone);
                    setStep('checkout');
                  }}
                  className="w-full py-2.5 px-5 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[#0F1111] font-bold text-sm shadow-2xs transition cursor-pointer"
                >
                  Passer la commande ({formatFcfa(grandTotal)})
                </button>
              </div>
            )}
          </>
        )}

        {/* ÉTAPE 2 : LIVRAISON & PAIEMENT EN LIGNE WAVE UNIQUEMENT */}
        {step === 'checkout' && (
          <form onSubmit={handleSubmitOrder} className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3.5 sm:p-4 space-y-3.5">
              {submitError && (
                <div className="flex items-start gap-2 p-3 rounded-md bg-[#FCF4F4] border border-[#CC0C39] text-xs text-[#CC0C39]">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Bloc 1 : Adresse de livraison */}
              <div className="bg-white rounded-md border border-[#D5D9D9] p-4 space-y-3">
                <h3 className="text-sm font-bold text-[#0F1111] border-b border-[#EAEDED] pb-2">
                  1. Adresse de livraison ou d’expédition
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#0F1111] mb-1">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex: Kouamé Yao Jean"
                      className="w-full px-3 py-2 rounded border border-[#888C8C] text-sm focus:outline-none focus:ring-2 focus:ring-[#007185]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F1111] mb-1">
                      Téléphone destinataire *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value);
                        if (!waveSenderPhone) setWaveSenderPhone(e.target.value);
                      }}
                      placeholder="07 00 00 00 00"
                      className="w-full px-3 py-2 rounded border border-[#888C8C] text-sm focus:outline-none focus:ring-2 focus:ring-[#007185]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F1111] mb-1">
                    Zone de livraison / Ville d’expédition *
                  </label>
                  <select
                    value={cityZoneId}
                    onChange={(e) => {
                      setCityZoneId(e.target.value);
                      onSelectZone?.(e.target.value);
                    }}
                    className="w-full px-3 py-2 rounded bg-[#F0F2F2] border border-[#888C8C] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#007185]"
                  >
                    {zones.map((z) => {
                      const effectiveFee = computeZoneDeliveryFee(z, { hasHeavyItem });
                      return (
                        <option key={z.id} value={z.id}>
                          {z.shortName} — {formatFcfa(effectiveFee)}
                          {hasHeavyItem ? ' (tarif colis lourd)' : ''}
                        </option>
                      );
                    })}
                  </select>
                  {selectedZone?.eta && (
                    <p className="text-[11px] text-[#007600] mt-1 font-medium">
                      ✓ {selectedZone.eta}
                    </p>
                  )}

                  <div className="mt-2 p-2.5 rounded bg-[#FEF8F2] border border-[#F5D3B3] text-[11px] text-[#0F1111] flex items-start gap-2">
                    <Info className="w-4 h-4 text-[#C7511F] shrink-0 mt-0.5" />
                    <div>
                      <p>{shippingDisclaimer}</p>
                      <a
                        href={buildWhatsappServiceUrl(settings?.whatsappNumber)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-[#007185] hover:text-[#C7511F] underline mt-0.5"
                      >
                        <MessageCircle className="w-3 h-3 text-[#25D366]" />
                        <span>Contacter le service client (colis volumineux/lourd)</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#0F1111] mb-1">
                      Quartier ou gare / localité *
                    </label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      placeholder="Ex: Lobia, Tazibouo, Gare d'Issia…"
                      className="w-full px-3 py-2 rounded border border-[#888C8C] text-sm focus:outline-none focus:ring-2 focus:ring-[#007185]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0F1111] mb-1">
                      Créneau souhaité *
                    </label>
                    <select
                      value={deliverySlot}
                      onChange={(e) => setDeliverySlot(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#F0F2F2] border border-[#888C8C] text-xs sm:text-sm focus:outline-none"
                    >
                      {DELIVERY_SLOTS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F1111] mb-1">
                    Point de repère / Compagnie de transport (facultatif)
                  </label>
                  <input
                    type="text"
                    value={addressDetails}
                    onChange={(e) => setAddressDetails(e.target.value)}
                    placeholder="Ex: Près pharmacie Lobia, ou expédition par UTB / AVS…"
                    className="w-full px-3 py-1.5 rounded border border-[#888C8C] text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Bloc 2 : Paiement en ligne 100% Wave Côte d'Ivoire */}
              <div className="bg-white rounded-md border-2 border-[#009EE3] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-[#EAEDED] pb-2">
                  <h3 className="text-sm font-bold text-[#0F1111] flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#009EE3] text-white font-extrabold text-xs">
                      W
                    </span>
                    <span>2. Paiement sécurisé Wave Côte d’Ivoire uniquement</span>
                  </h3>
                  <Lock className="w-4 h-4 text-[#009EE3]" />
                </div>

                {waveAutoCheckout ? (
                  <div className="bg-[#EBF8FF] rounded p-3.5 border border-[#B3E5FC] text-xs text-[#053B54] space-y-1.5">
                    <p className="font-bold flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-[#009EE3] shrink-0" />
                      <span>Paiement Wave Business 100% Automatique (0 F de surcoût)</span>
                    </p>
                    <p>
                      En cliquant sur le bouton ci-dessous, votre application{' '}
                      <strong>Wave</strong> s’ouvrira automatiquement avec le montant exact de{' '}
                      <strong>{formatFcfa(grandTotal)}</strong>. Dès confirmation dans Wave, votre
                      commande passe automatiquement en préparation avec votre{' '}
                      <strong>Code QR de suivi en direct</strong>.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="bg-[#EBF8FF] rounded p-3 border border-[#B3E5FC] space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[11px] text-[#565959] block">
                            Envoyez exactement <strong>{formatFcfa(grandTotal)}</strong> au n° Wave Paiements Pèrôkadô :
                          </span>
                          <strong className="text-base font-extrabold text-[#053B54] tracking-wide">
                            {waveMerchantNumber}
                          </strong>
                          <span className="block text-[10px] text-[#053B54]/80 mt-0.5">
                            (Numéro dédié uniquement aux encaissements Wave — Assistance WhatsApp au +225 05 01 30 33 43)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={copyWaveNumber}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#009EE3] hover:bg-[#0086C3] text-white text-xs font-bold cursor-pointer shrink-0"
                        >
                          {copiedWave ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedWave ? 'Copié' : 'Copier'}</span>
                        </button>
                      </div>

                      {wavePaymentUrl && (
                        <a
                          href={wavePaymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-[#009EE3] hover:bg-[#0086C3] text-white font-bold text-xs"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>Ouvrir le lien de paiement Wave direct</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-[#0F1111] mb-1">
                          Votre n° Wave émetteur *
                        </label>
                        <input
                          type="tel"
                          required
                          value={waveSenderPhone}
                          onChange={(e) => setWaveSenderPhone(e.target.value)}
                          placeholder="07 / 05 / 01 …"
                          className="w-full px-3 py-2 rounded border border-[#888C8C] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#009EE3]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#0F1111] mb-1">
                          ID / Référence transaction Wave *
                        </label>
                        <input
                          type="text"
                          required
                          minLength={4}
                          value={waveTransactionRef}
                          onChange={(e) => setWaveTransactionRef(e.target.value.toUpperCase())}
                          placeholder="Ex: T7K9P2M4…"
                          className="w-full px-3 py-2 rounded border border-[#888C8C] text-xs sm:text-sm font-bold uppercase focus:outline-none focus:ring-2 focus:ring-[#009EE3]"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#0F1111] mb-1">
                    Note (pointure, couleur, instruction livreur…)
                  </label>
                  <input
                    type="text"
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="Facultatif…"
                    className="w-full px-3 py-1.5 rounded border border-[#888C8C] text-xs sm:text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Récapitulatif final style Amazon */}
            <div className="flex-none p-3.5 sm:p-4 bg-white border-t border-[#D5D9D9] space-y-2.5 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
              <div className="space-y-1 text-xs text-[#565959]">
                <div className="flex justify-between">
                  <span>Articles :</span>
                  <span>{formatFcfa(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#007600] font-semibold">
                    <span>Code promo ({appliedPromo?.code}) :</span>
                    <span>−{formatFcfa(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Livraison ({selectedZone?.shortName}) :</span>
                  <span>{formatFcfa(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#B12704] pt-1 border-t border-[#EAEDED]">
                  <span>Montant total (Wave) :</span>
                  <span>{formatFcfa(grandTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 px-5 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] disabled:opacity-60 text-[#0F1111] font-bold text-sm shadow-2xs transition cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                <span>
                  {submitting
                    ? 'Validation & création du Code QR…'
                    : 'Acheter et obtenir ma Référence + Code QR'}
                </span>
              </button>
            </div>
          </form>
        )}

        {/* ÉTAPE 3 : CONFIRMATION AVEC RÉFÉRENCE + CODE QR DE SUIVI EN DIRECT */}
        {step === 'confirmed' && confirmedData?.order && (
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3.5 sm:p-5 space-y-4">
            <div className="bg-white rounded-md p-5 border border-[#D5D9D9] text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#E8F8E8] text-[#007600] flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#007600]">
                  Merci {confirmedData.order.customerName}, votre commande est enregistrée !
                </h3>
                <p className="text-xs text-[#565959] mt-1">
                  Téléchargez ou photographiez votre <strong>Code QR</strong> ci-dessous pour suivre
                  votre marchandise en direct jusqu’à livraison.
                </p>
              </div>

              <div className="bg-[#F7FAFA] rounded p-3 border border-[#D5D9D9] flex items-center justify-between">
                <div className="text-left">
                  <p className="text-[11px] uppercase tracking-wider text-[#565959] font-semibold">
                    N° de commande Pèrôkadô
                  </p>
                  <p className="text-lg font-extrabold text-[#B12704] tracking-wide">
                    {confirmedData.order.reference}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyReference(confirmedData.order.reference)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#D5D9D9] text-xs font-semibold text-[#0F1111] cursor-pointer"
                >
                  {copiedRef ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRef ? 'Copié' : 'Copier'}</span>
                </button>
              </div>

              {/* CODE QR DE SUIVI EN DIRECT */}
              <div className="bg-[#F7FAFA] rounded-md p-4 border border-[#D5D9D9] flex flex-col items-center space-y-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F1111]">
                  <QrCode className="w-4 h-4 text-[#C7511F]" />
                  <span>Code QR de suivi en direct</span>
                </span>
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt={`Code QR de suivi ${confirmedData.order.reference}`}
                    className="w-48 h-48 rounded bg-white p-2 border border-[#D5D9D9]"
                  />
                ) : (
                  <div className="w-48 h-48 rounded bg-white animate-pulse" />
                )}

                <div className="flex flex-wrap items-center justify-center gap-2 w-full">
                  {qrDataUrl && (
                    <a
                      href={qrDataUrl}
                      download={`Perokado-${confirmedData.order.reference}-QR.png`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[#0F1111] text-xs font-bold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Télécharger le Code QR</span>
                    </a>
                  )}
                  {onOpenDirectTrack && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenDirectTrack({
                          reference: confirmedData.order.reference,
                          token: confirmedData.order.trackingToken,
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#F7FAFA] text-[#0F1111] border border-[#D5D9D9] text-xs font-semibold cursor-pointer"
                    >
                      <span>Ouvrir le suivi en direct</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="text-left text-xs space-y-1 bg-[#F7FAFA] p-3 rounded border border-[#EAEDED]">
                <p>
                  <strong>Destination :</strong> {confirmedData.order.cityZoneName} —{' '}
                  {confirmedData.order.neighborhood}
                </p>
                <p>
                  <strong>Paiement Wave :</strong> Réf{' '}
                  <code>{confirmedData.order.waveTransactionRef}</code> (
                  {formatFcfa(confirmedData.order.total)})
                </p>
              </div>
            </div>

            <a
              href={buildWhatsappOrderUrl(confirmedData.whatsappNumber, confirmedData.order)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm shadow-xs transition"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Envoyer ma confirmation sur WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-5 rounded-full bg-white border border-[#D5D9D9] text-[#0F1111] font-medium text-xs sm:text-sm hover:bg-[#F7FAFA] cursor-pointer"
            >
              Continuer mes achats sur Pèrôkadô
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
