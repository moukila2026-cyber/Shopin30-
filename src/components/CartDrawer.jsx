import React from 'react';
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
} from 'lucide-react';
import { formatFcfa, DELIVERY_SLOTS, PAYMENT_METHODS } from '../../shared/catalog.js';
import { apiFetch, buildWhatsappOrderUrl } from '../lib/api.js';

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
}) {
  const [step, setStep] = React.useState('cart'); // 'cart' | 'checkout' | 'confirmed'
  const [promoInput, setPromoInput] = React.useState('');
  const [appliedPromo, setAppliedPromo] = React.useState(null);
  const [promoError, setPromoError] = React.useState('');
  const [promoLoading, setPromoLoading] = React.useState(false);

  const zones = settings?.deliveryZones || [];
  const [customerName, setCustomerName] = React.useState('');
  const [customerPhone, setCustomerPhone] = React.useState('');
  const [cityZoneId, setCityZoneId] = React.useState(zones[0]?.id || 'daloa-centre');
  const [neighborhood, setNeighborhood] = React.useState('');
  const [addressDetails, setAddressDetails] = React.useState('');
  const [deliverySlot, setDeliverySlot] = React.useState(DELIVERY_SLOTS[0].id);
  const [paymentMethod, setPaymentMethod] = React.useState(PAYMENT_METHODS[0].id);
  const [customerNote, setCustomerNote] = React.useState('');

  const [requestId, setRequestId] = React.useState(() => makeRequestId());
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');
  const [confirmedData, setConfirmedData] = React.useState(null);
  const [copiedRef, setCopiedRef] = React.useState(false);

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
      }
      setSubmitError('');
    }
  }, [open, step]);

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
  const selectedZone = zones.find((z) => z.id === cityZoneId) || zones[0] || { fee: 1000, shortName: 'Daloa' };
  const freeThreshold = settings?.freeShippingThreshold ?? 50000;
  const deliveryFee =
    freeThreshold > 0 && netSubtotal >= freeThreshold ? 0 : Number(selectedZone?.fee || 0);
  const grandTotal = netSubtotal + deliveryFee;

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
          paymentMethod,
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
              {step === 'checkout' && 'Finaliser la livraison'}
              {step === 'confirmed' && 'Commande confirmée !'}
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
                    Explorez nos catégories High-Tech, Mode, Beauté & Maison et ajoutez vos articles favoris.
                  </p>
                </div>
              ) : (
                <>
                  {/* Barre de progression livraison gratuite */}
                  {freeThreshold > 0 && (
                    <div className="bg-white rounded-2xl p-3.5 border border-[#E5DEC9] text-xs">
                      {netSubtotal >= freeThreshold ? (
                        <p className="font-semibold text-[#0F443E] flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-[#D95D24]" />
                          <span>Félicitations ! Vous bénéficiez de la livraison GRATUITE.</span>
                        </p>
                      ) : (
                        <>
                          <p className="text-stone-700">
                            Plus que{' '}
                            <strong className="text-[#0F443E]">
                              {formatFcfa(freeThreshold - netSubtotal)}
                            </strong>{' '}
                            pour la livraison offerte !
                          </p>
                          <div className="mt-2 h-1.5 rounded-full bg-[#EFE9D8] overflow-hidden">
                            <div
                              className="h-full bg-[#D95D24] transition-all"
                              style={{ width: `${Math.min(100, (netSubtotal / freeThreshold) * 100)}%` }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )}

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
                  <form onSubmit={handleApplyPromo} className="bg-white p-3.5 rounded-2xl border border-[#E5DEC9]">
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
                    <span>Sous-total</span>
                    <span>{formatFcfa(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Remise ({appliedPromo?.code})</span>
                      <span>−{formatFcfa(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-stone-500">
                    <span>Frais de livraison (Daloa & alentours)</span>
                    <span>Calculés à l’étape suivante</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="w-full py-3.5 px-5 rounded-full bg-[#D95D24] hover:bg-[#BF4E1B] text-white font-bold text-sm shadow-md transition cursor-pointer"
                >
                  Commander maintenant · {formatFcfa(netSubtotal)}
                </button>
              </div>
            )}
          </>
        )}

        {/* ÉTAPE 2 : FORMULAIRE DE LIVRAISON DALOA & ALENTOURS */}
        {step === 'checkout' && (
          <form onSubmit={handleSubmitOrder} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {submitError && (
                <div className="flex items-start gap-2 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

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
                  Numéro de téléphone (Appel / WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Ex: 07 00 00 00 00"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DED6C1] text-sm focus:outline-none focus:border-[#0F443E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F443E] mb-1">
                  Ville / Zone de livraison *
                </label>
                <select
                  value={cityZoneId}
                  onChange={(e) => setCityZoneId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DED6C1] text-sm focus:outline-none focus:border-[#0F443E]"
                >
                  {zones.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.shortName} — {z.fee === 0 ? 'Gratuit' : formatFcfa(z.fee)}
                    </option>
                  ))}
                </select>
                {selectedZone?.eta && (
                  <p className="text-[11px] text-[#0F443E] mt-1 font-medium">
                    ⏱ Délai indicatif : {selectedZone.eta}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F443E] mb-1">
                  Quartier ou localité précise *
                </label>
                <input
                  type="text"
                  required
                  minLength={2}
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="Ex: Tazibouo Université, Lobia, Commerce, Issia Centre…"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DED6C1] text-sm focus:outline-none focus:border-[#0F443E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F443E] mb-1">
                  Point de repère / Indications livreur (facultatif)
                </label>
                <input
                  type="text"
                  value={addressDetails}
                  onChange={(e) => setAddressDetails(e.target.value)}
                  placeholder="Ex: Près de la pharmacie, portail marron…"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DED6C1] text-sm focus:outline-none focus:border-[#0F443E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                <div>
                  <label className="block text-xs font-bold text-[#0F443E] mb-1">
                    Mode de paiement *
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#DED6C1] text-xs sm:text-sm focus:outline-none focus:border-[#0F443E]"
                  >
                    {PAYMENT_METHODS.map((pm) => (
                      <option key={pm.id} value={pm.id}>
                        {pm.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F443E] mb-1">
                  Note sur la commande (pointure, couleur souhaitée, message cadeau…)
                </label>
                <textarea
                  rows={2}
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="Ex: Pointure 42, ou emballage cadeau anniversaire…"
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
                  <span>Livraison ({selectedZone?.shortName})</span>
                  <span>{deliveryFee === 0 ? 'GRATUITE' : formatFcfa(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#0F443E] pt-1.5 border-t border-[#EFE9D8]">
                  <span>Total à payer</span>
                  <span>{formatFcfa(grandTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-5 rounded-full bg-[#0F443E] hover:bg-[#092E2A] disabled:opacity-60 text-white font-bold text-sm shadow-md transition cursor-pointer"
              >
                {submitting ? 'Enregistrement sécurisé…' : `Confirmer ma commande · ${formatFcfa(grandTotal)}`}
              </button>
            </div>
          </form>
        )}

        {/* ÉTAPE 3 : CONFIRMATION + LIEN WHATSAPP */}
        {step === 'confirmed' && confirmedData?.order && (
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            <div className="bg-white rounded-3xl p-6 border border-[#E5DEC9] text-center space-y-3 shadow-xs">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-[#0F443E] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0F443E]">
                Merci {confirmedData.order.customerName} !
              </h3>
              <p className="text-sm text-stone-600">
                Votre commande est enregistrée et son stock vous est réservé. Notre équipe à Daloa
                vous contacte très rapidement pour la livraison.
              </p>

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

              <div className="text-left text-xs space-y-1 bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#EAE2CE]">
                <p>
                  <strong>Destination :</strong> {confirmedData.order.cityZoneName} —{' '}
                  {confirmedData.order.neighborhood}
                </p>
                <p>
                  <strong>Montant total :</strong>{' '}
                  <span className="font-bold text-[#0F443E]">
                    {formatFcfa(confirmedData.order.total)}
                  </span>
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
              <span>Envoyer le récapitulatif sur WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-5 rounded-full bg-white border border-[#DED6C1] text-[#0F443E] font-semibold text-sm hover:bg-[#FAF7F0] cursor-pointer"
            >
              Continuer mes achats sur Pèrôkadô
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
