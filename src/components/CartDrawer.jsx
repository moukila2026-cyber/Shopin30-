import React from 'react';
import QRCode from 'qrcode';
import {
  X,
  Trash2,
  ShoppingBag,
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
} from 'lucide-react';
import { formatFcfa, DELIVERY_SLOTS, BRAND } from '../../shared/catalog.js';
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
  onClose,
  cartItems,
  productsMap,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  settings,
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
  const [cityZoneId, setCityZoneId] = React.useState(zones[0]?.id || 'daloa-commune');
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

  React.useEffect(() => {
    if (zones.length > 0 && !zones.some((z) => z.id === cityZoneId)) {
      setCityZoneId(zones[0].id);
    }
  }, [zones, cityZoneId]);

  React.useEffect(() => {
    if (!open) {
      if (step === 'confirmed') {
        setStep('cart');
        setConfirmedData(null);
        setQrDataUrl('');
      }
      setSubmitError('');
    }
  }, [open, step]);

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
      color: { dark: '#0F443E', light: '#FFFFFF' },
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
  const selectedZone =
    zones.find((z) => z.id === cityZoneId) ||
    zones[0] || { fee: 1000, shortName: 'Daloa Commune' };
  // Aucune livraison gratuite : tarif de base systématiquement appliqué
  const deliveryFee = Math.max(100, Number(selectedZone?.fee || 1000));
  const grandTotal = netSubtotal + deliveryFee;

  const waveMerchantNumber = settings?.wavePhone || BRAND.defaultWavePhone;
  const wavePaymentUrl = settings?.wavePaymentUrl || '';
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
      setConfirmedData(res);
      setStep('confirmed');
      onClearCart();
      setAppliedPromo(null);
      setPromoInput('');
      setWaveTransactionRef('');
      setRequestId(makeRequestId());
      if (onOrderSuccess) onOrderSuccess();
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
      className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Panier et commande"
    >
      <div
        className="w-full max-w-lg bg-[#FAF7F0] h-full flex flex-col shadow-2xl border-l border-[#E5DEC9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête du tiroir */}
        <div className="px-5 py-4 bg-white border-b border-[#E5DEC9] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="p-1.5 rounded-full hover:bg-[#FAF7F0] text-[#0F443E] cursor-pointer"
                aria-label="Retour au panier"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <ShoppingBag className="w-5 h-5 text-[#D95D24]" />
            <h2 className="text-lg font-bold text-[#0F443E]">
              {step === 'cart' && 'Votre Panier'}
              {step === 'checkout' && 'Livraison & Paiement Wave'}
              {step === 'confirmed' && 'Référence & Code QR de suivi'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#FAF7F0] text-stone-600 cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ÉTAPE 1 : PANIER */}
        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {detailedItems.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-white border border-[#E5DEC9] flex items-center justify-center">
                    <ShoppingBag className="w-7 h-7 text-stone-400" />
                  </div>
                  <p className="font-bold text-[#0F443E]">Votre panier est vide</p>
                  <p className="text-sm text-stone-600 max-w-xs mx-auto">
                    Explorez nos catégories High-Tech, Mode, Beauté & Maison et ajoutez vos articles.
                  </p>
                </div>
              ) : (
                <>
                  {/* Encadré clair sur la politique de livraison */}
                  <div className="bg-white rounded-2xl p-3.5 border border-[#E5DEC9] text-xs space-y-1.5">
                    <p className="font-bold text-[#0F443E] flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#D95D24]" />
                      <span>Tarifs Livraison & Expédition (aucune livraison gratuite)</span>
                    </p>
                    <p className="text-stone-600 leading-relaxed">
                      • <strong>Daloa Commune :</strong> 1 000 FCFA · <strong>Périphérie :</strong>{' '}
                      1 500 FCFA
                      <br />• <strong>Expédition Issia, Vavoua & alentours :</strong> 2 000 FCFA
                    </p>
                    <p className="text-[11px] text-stone-500 italic">
                      Le tarif dépend de la taille et du poids de la marchandise. Pour plus
                      d’informations,{' '}
                      <a
                        href={buildWhatsappServiceUrl(settings?.whatsappNumber)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#D95D24] font-semibold underline"
                      >
                        contactez le service client
                      </a>
                      .
                    </p>
                  </div>

                  {/* Liste des articles */}
                  <div className="space-y-3">
                    {detailedItems.map(({ product, quantity, lineTotal }) => (
                      <div
                        key={product.id}
                        className="flex gap-3.5 bg-white p-3.5 rounded-2xl border border-[#E5DEC9]"
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/products/placeholder.svg';
                          }}
                          className="w-18 h-20 rounded-xl object-cover bg-[#FAF7F0] shrink-0"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-bold text-[#14231F] line-clamp-2">
                              {product.name}
                            </h3>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(product.id)}
                              className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                              aria-label="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="inline-flex items-center rounded-full border border-[#DED6C1] bg-[#FAF7F0]">
                              <button
                                type="button"
                                onClick={() => onUpdateQty(product.id, quantity - 1)}
                                className="px-2.5 py-0.5 text-sm font-bold text-[#0F443E] cursor-pointer"
                              >
                                −
                              </button>
                              <span className="px-2.5 text-xs font-bold">{quantity}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQty(product.id, Math.min(product.stock, quantity + 1))
                                }
                                disabled={quantity >= product.stock}
                                className="px-2.5 py-0.5 text-sm font-bold text-[#0F443E] disabled:opacity-40 cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-sm font-extrabold text-[#0F443E]">
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
                    className="bg-white p-3.5 rounded-2xl border border-[#E5DEC9]"
                  >
                    <label className="text-xs font-bold text-[#0F443E] flex items-center gap-1.5 mb-2">
                      <Tag className="w-3.5 h-3.5 text-[#D95D24]" />
                      <span>Code promotionnel</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        placeholder="Ex: BIENVENUE10"
                        className="flex-1 px-3 py-2 rounded-xl border border-[#DED6C1] text-xs uppercase font-semibold focus:outline-none focus:border-[#0F443E]"
                      />
                      <button
                        type="submit"
                        disabled={promoLoading}
                        className="px-4 py-2 rounded-xl bg-[#0F443E] text-white text-xs font-semibold hover:bg-[#092E2A] cursor-pointer"
                      >
                        {promoLoading ? '...' : 'Appliquer'}
                      </button>
                    </div>
                    {promoError && <p className="text-xs text-red-600 mt-1.5">{promoError}</p>}
                    {appliedPromo && (
                      <div className="mt-2 flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg">
                        <span>
                          ✓ Code <strong>{appliedPromo.code}</strong> appliqué (-
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
              <div className="p-5 bg-white border-t border-[#E5DEC9] space-y-3">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-stone-600">
                    <span>Sous-total articles</span>
                    <span>{formatFcfa(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Remise ({appliedPromo?.code})</span>
                      <span>−{formatFcfa(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-stone-500">
                    <span>Livraison / Expédition</span>
                    <span>Dès 1 000 FCFA (étape suivante)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!waveSenderPhone && customerPhone) setWaveSenderPhone(customerPhone);
                    setStep('checkout');
                  }}
                  className="w-full py-3.5 px-5 rounded-full bg-[#D95D24] hover:bg-[#BF4E1B] text-white font-bold text-sm shadow-md transition cursor-pointer"
                >
                  Continuer vers Livraison & Wave · {formatFcfa(netSubtotal)}
                </button>
              </div>
            )}
          </>
        )}

        {/* ÉTAPE 2 : LIVRAISON & PAIEMENT EN LIGNE WAVE UNIQUEMENT */}
        {step === 'checkout' && (
          <form onSubmit={handleSubmitOrder} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {submitError && (
                <div className="flex items-start gap-2 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0F443E] mb-1">
                    Nom et prénom *
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: Kouamé Yao Jean"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DED6C1] text-sm focus:outline-none focus:border-[#0F443E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F443E] mb-1">
                    Téléphone du destinataire *
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DED6C1] text-sm focus:outline-none focus:border-[#0F443E]"
                  />
                </div>
              </div>

              {/* Sélection de la zone & note taille/poids */}
              <div>
                <label className="block text-xs font-bold text-[#0F443E] mb-1">
                  Zone de livraison / Ville d’expédition *
                </label>
                <select
                  value={cityZoneId}
                  onChange={(e) => setCityZoneId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DED6C1] text-sm font-semibold focus:outline-none focus:border-[#0F443E]"
                >
                  {zones.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.shortName} — {formatFcfa(z.fee)}
                    </option>
                  ))}
                </select>
                {selectedZone?.eta && (
                  <p className="text-[11px] text-[#0F443E] mt-1 font-medium">
                    ⏱ {selectedZone.eta}
                  </p>
                )}

                <div className="mt-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-950 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <p>{shippingDisclaimer}</p>
                    <a
                      href={buildWhatsappServiceUrl(settings?.whatsappNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-[#D95D24] underline mt-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>Contacter le service client pour un colis volumineux/lourd</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0F443E] mb-1">
                    Quartier ou gare / localité *
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="Ex: Lobia, Tazibouo, Gare d'Issia…"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DED6C1] text-sm focus:outline-none focus:border-[#0F443E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F443E] mb-1">
                    Créneau souhaité *
                  </label>
                  <select
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#DED6C1] text-xs sm:text-sm focus:outline-none focus:border-[#0F443E]"
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
                <label className="block text-xs font-bold text-[#0F443E] mb-1">
                  Point de repère / Compagnie de transport souhaitée (facultatif)
                </label>
                <input
                  type="text"
                  value={addressDetails}
                  onChange={(e) => setAddressDetails(e.target.value)}
                  placeholder="Ex: Près pharmacie Lobia, ou expédition par UTB / AVS…"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DED6C1] text-sm focus:outline-none focus:border-[#0F443E]"
                />
              </div>

              {/* BLOC PAIEMENT EN LIGNE WAVE UNIQUEMENT */}
              <div className="rounded-2xl bg-[#E8F7FE] border-2 border-[#009EE3] p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#009EE3] text-white font-extrabold text-xs">
                      W
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-extrabold text-[#053B54]">
                        Paiement en ligne par Wave uniquement
                      </p>
                      <p className="text-[11px] text-[#053B54]/80">
                        Montant exact à envoyer : <strong>{formatFcfa(grandTotal)}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3 border border-[#B8E5FA] space-y-2 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] text-stone-500 block">
                        Numéro Wave Pèrôkadô :
                      </span>
                      <strong className="text-base font-extrabold text-[#053B54] tracking-wide">
                        {waveMerchantNumber}
                      </strong>
                    </div>
                    <button
                      type="button"
                      onClick={copyWaveNumber}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#009EE3] hover:bg-[#0086C3] text-white text-xs font-bold cursor-pointer"
                    >
                      {copiedWave ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedWave ? 'Copié' : 'Copier n°'}</span>
                    </button>
                  </div>

                  {wavePaymentUrl && (
                    <a
                      href={wavePaymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#009EE3] hover:bg-[#0086C3] text-white font-bold text-xs"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Ouvrir le lien de paiement Wave direct</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-[#053B54] mb-1">
                      Votre n° Wave émetteur *
                    </label>
                    <input
                      type="tel"
                      required
                      value={waveSenderPhone}
                      onChange={(e) => setWaveSenderPhone(e.target.value)}
                      placeholder="07 / 05 / 01 …"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#90D5F6] text-xs sm:text-sm focus:outline-none focus:border-[#053B54]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#053B54] mb-1">
                      ID / Référence transaction Wave *
                    </label>
                    <input
                      type="text"
                      required
                      minLength={4}
                      value={waveTransactionRef}
                      onChange={(e) => setWaveTransactionRef(e.target.value.toUpperCase())}
                      placeholder="Ex: T7K9P2M4…"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#90D5F6] text-xs sm:text-sm font-bold uppercase focus:outline-none focus:border-[#053B54]"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-[#053B54]/85">
                  1. Envoyez <strong>{formatFcfa(grandTotal)}</strong> par Wave au numéro ci-dessus.
                  <br />
                  2. Saisissez l’ID de transaction affiché dans votre reçu Wave pour générer votre{' '}
                  <strong>Référence + Code QR de suivi en direct</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F443E] mb-1">
                  Note (pointure, couleur, précision colis…)
                </label>
                <textarea
                  rows={2}
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="Facultatif…"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DED6C1] text-sm focus:outline-none focus:border-[#0F443E]"
                />
              </div>
            </div>

            <div className="p-5 bg-white border-t border-[#E5DEC9] space-y-3">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Articles ({detailedItems.reduce((s, i) => s + i.quantity, 0)})</span>
                  <span>{formatFcfa(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Remise ({appliedPromo?.code})</span>
                    <span>−{formatFcfa(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>{selectedZone?.shortName} (tarif de base)</span>
                  <span>{formatFcfa(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#0F443E] pt-1.5 border-t border-[#EFE9D8]">
                  <span>Total réglé par Wave</span>
                  <span>{formatFcfa(grandTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-5 rounded-full bg-[#0F443E] hover:bg-[#092E2A] disabled:opacity-60 text-white font-bold text-sm shadow-md transition cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4 text-[#E0A11B]" />
                <span>
                  {submitting
                    ? 'Génération de votre Code QR…'
                    : `Valider & Générer mon Code QR · ${formatFcfa(grandTotal)}`}
                </span>
              </button>
            </div>
          </form>
        )}

        {/* ÉTAPE 3 : CONFIRMATION AVEC RÉFÉRENCE + CODE QR DE SUIVI EN DIRECT */}
        {step === 'confirmed' && confirmedData?.order && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5DEC9] text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-[#0F443E] flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0F443E]">
                  Commande enregistrée, {confirmedData.order.customerName} !
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Conservez ou téléchargez votre <strong>Code QR</strong> ci-dessous : scannez-le à
                  tout moment avec l’appareil photo de votre téléphone pour suivre votre marchandise
                  en direct.
                </p>
              </div>

              {/* Référence copiables */}
              <div className="bg-[#FAF7F0] rounded-2xl p-3.5 border border-[#E5DEC9] flex items-center justify-between">
                <div className="text-left">
                  <p className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                    Référence de suivi
                  </p>
                  <p className="text-lg font-extrabold text-[#D95D24] tracking-wide">
                    {confirmedData.order.reference}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyReference(confirmedData.order.reference)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#DED6C1] text-xs font-semibold text-[#0F443E] cursor-pointer"
                >
                  {copiedRef ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRef ? 'Copié' : 'Copier'}</span>
                </button>
              </div>

              {/* CODE QR DE SUIVI EN DIRECT */}
              <div className="bg-[#FAF7F0] rounded-3xl p-4 border-2 border-dashed border-[#0F443E]/30 flex flex-col items-center space-y-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F443E]">
                  <QrCode className="w-4 h-4 text-[#D95D24]" />
                  <span>Code QR de suivi en direct</span>
                </span>
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt={`Code QR de suivi ${confirmedData.order.reference}`}
                    className="w-48 h-48 rounded-2xl bg-white p-2 border border-[#E5DEC9] shadow-xs"
                  />
                ) : (
                  <div className="w-48 h-48 rounded-2xl bg-white animate-pulse" />
                )}

                <div className="flex flex-wrap items-center justify-center gap-2 w-full">
                  {qrDataUrl && (
                    <a
                      href={qrDataUrl}
                      download={`Perokado-${confirmedData.order.reference}-QR.png`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0F443E] hover:bg-[#092E2A] text-white text-xs font-bold transition"
                    >
                      <Download className="w-3.5 h-3.5 text-[#E0A11B]" />
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
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-[#EFE9D8] text-[#0F443E] border border-[#DED6C1] text-xs font-bold cursor-pointer"
                    >
                      <span>Ouvrir le suivi en direct</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="text-left text-xs space-y-1 bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#EAE2CE]">
                <p>
                  <strong>Destination :</strong> {confirmedData.order.cityZoneName} —{' '}
                  {confirmedData.order.neighborhood}
                </p>
                <p>
                  <strong>Paiement Wave :</strong> Réf{' '}
                  <code>{confirmedData.order.waveTransactionRef}</code> ({formatFcfa(confirmedData.order.total)})
                </p>
              </div>
            </div>

            <a
              href={buildWhatsappOrderUrl(confirmedData.whatsappNumber, confirmedData.order)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full bg-[#1FAF5A] hover:bg-[#18934A] text-white font-bold text-sm shadow-md transition"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Confirmer sur WhatsApp avec mon lien de suivi</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-5 rounded-full bg-white border border-[#DED6C1] text-[#0F443E] font-semibold text-sm hover:bg-[#FAF7F0] cursor-pointer"
            >
              Retourner à la boutique Pèrôkadô
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
