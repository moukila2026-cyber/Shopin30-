import React from 'react';
import QRCode from 'qrcode';
import {
  X,
  QrCode,
  Search,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Download,
  MessageCircle,
} from 'lucide-react';
import { formatFcfa } from '../../shared/catalog.js';
import { apiFetch, buildOrderTrackingUrl, buildWhatsappServiceUrl } from '../lib/api.js';

const STATUS_META = {
  pending: {
    label: 'Commande reçue — Vérification du paiement Wave en cours',
    color: 'bg-[#FEF8F2] text-[#B12704] border-[#F5D3B3]',
    step: 1,
  },
  preparing: {
    label: 'Paiement Wave validé — Colis en préparation à Daloa',
    color: 'bg-[#EDFDFF] text-[#007185] border-[#99E6F2]',
    step: 2,
  },
  shipped: {
    label: 'Marchandise expédiée / En cours de livraison vers vous',
    color: 'bg-[#EBF5FF] text-[#053B54] border-[#B3D7FF]',
    step: 3,
  },
  delivered: {
    label: 'Marchandise livrée — Merci pour votre confiance !',
    color: 'bg-[#F2FBF2] text-[#007600] border-[#B7E4B7]',
    step: 4,
  },
  cancelled: {
    label: 'Commande annulée',
    color: 'bg-[#FCF4F4] text-[#CC0C39] border-[#F3B7B7]',
    step: 0,
  },
};

export function OrderTrackerModal({ open, onClose, initialTrack, whatsappNumber }) {
  const [reference, setReference] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [activeToken, setActiveToken] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [order, setOrder] = React.useState(null);
  const [qrDataUrl, setQrDataUrl] = React.useState('');
  const [lastCheckedAt, setLastCheckedAt] = React.useState(null);

  const fetchStatus = React.useCallback(async ({ ref, ph, tok, silent = false }) => {
    if (!ref) return;
    if (!silent) {
      setLoading(true);
      setError('');
    }
    try {
      const res = await apiFetch('/api/orders/track', {
        method: 'POST',
        body: {
          reference: ref.trim().toUpperCase(),
          phone: (ph || '').trim(),
          token: (tok || '').trim(),
        },
      });
      setOrder(res.order);
      setLastCheckedAt(new Date());
    } catch (err) {
      if (!silent) {
        setOrder(null);
        setError(err.message || 'Commande introuvable.');
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (open && initialTrack?.reference) {
      setReference(initialTrack.reference);
      if (initialTrack.token) {
        setActiveToken(initialTrack.token);
        fetchStatus({ ref: initialTrack.reference, tok: initialTrack.token });
      }
    }
    if (!open) {
      setError('');
    }
  }, [open, initialTrack, fetchStatus]);

  React.useEffect(() => {
    if (!open || !order || order.status === 'delivered' || order.status === 'cancelled') {
      return;
    }
    const interval = setInterval(() => {
      fetchStatus({
        ref: order.reference,
        ph: phone,
        tok: activeToken || order.trackingToken,
        silent: true,
      });
    }, 20000);
    return () => clearInterval(interval);
  }, [open, order, phone, activeToken, fetchStatus]);

  React.useEffect(() => {
    if (!order) {
      setQrDataUrl('');
      return;
    }
    const url = buildOrderTrackingUrl(order);
    QRCode.toDataURL(url, {
      width: 220,
      margin: 2,
      color: { dark: '#131921', light: '#FFFFFF' },
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(''));
  }, [order]);

  if (!open) return null;

  function handleTrackSubmit(e) {
    e.preventDefault();
    setActiveToken('');
    fetchStatus({ ref: reference, ph: phone, tok: '' });
  }

  const meta = order ? STATUS_META[order.status] || STATUS_META.pending : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Suivi de marchandise en direct"
    >
      <div
        className="bg-white rounded-lg max-w-lg w-full overflow-hidden shadow-2xl border border-[#D5D9D9] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barre supérieure style Amazon */}
        <div className="bg-[#232F3E] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#FF9900]" />
            <h2 className="text-base font-bold">Suivi de marchandise en direct</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded hover:bg-[#37475A] text-white cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <p className="text-xs text-[#565959]">
            Scannez le <strong>Code QR</strong> reçu lors de votre commande Wave pour un accès
            instantané, ou saisissez votre référence (ex. <strong>PKD-8K4M2X</strong>) et votre
            numéro de téléphone.
          </p>

          <form onSubmit={handleTrackSubmit} className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#0F1111] mb-1">
                  Référence commande *
                </label>
                <input
                  type="text"
                  required
                  value={reference}
                  onChange={(e) => setReference(e.target.value.toUpperCase())}
                  placeholder="PKD-XXXXXX"
                  className="w-full px-3 py-2 rounded border border-[#888C8C] text-sm uppercase font-bold focus:outline-none focus:ring-2 focus:ring-[#007185]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0F1111] mb-1">
                  Votre téléphone *
                </label>
                <input
                  type="tel"
                  required={!activeToken}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="07 00 00 00 00"
                  className="w-full px-3 py-2 rounded border border-[#888C8C] text-sm focus:outline-none focus:ring-2 focus:ring-[#007185]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[#0F1111] font-bold text-xs sm:text-sm shadow-2xs transition cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>{loading ? 'Recherche en cours…' : 'Suivre mon colis en direct'}</span>
            </button>
          </form>

          {error && (
            <div className="p-3 rounded bg-[#FCF4F4] border border-[#CC0C39] text-xs text-[#CC0C39]">
              {error}
            </div>
          )}

          {order && meta && (
            <div className="pt-4 border-t border-[#EAEDED] space-y-4">
              {/* Bandeau temps réel */}
              <div className="flex items-center justify-between text-[11px] text-[#565959]">
                <span className="inline-flex items-center gap-1.5 font-bold text-[#007600]">
                  <span className="w-2 h-2 rounded-full bg-[#007600] animate-ping" />
                  <span>Suivi en direct actif</span>
                </span>
                <button
                  type="button"
                  onClick={() =>
                    fetchStatus({
                      ref: order.reference,
                      ph: phone,
                      tok: activeToken || order.trackingToken,
                    })
                  }
                  className="inline-flex items-center gap-1 text-[#007185] hover:text-[#C7511F] font-semibold hover:underline cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                  <span>
                    Actualiser
                    {lastCheckedAt ? ` (${lastCheckedAt.toLocaleTimeString('fr-FR')})` : ''}
                  </span>
                </button>
              </div>

              <div
                className={`p-3.5 rounded border text-xs sm:text-sm font-bold flex items-center gap-2 ${meta.color}`}
              >
                {order.status === 'cancelled' ? (
                  <XCircle className="w-5 h-5 shrink-0" />
                ) : order.status === 'delivered' ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                ) : order.status === 'shipped' ? (
                  <Truck className="w-5 h-5 shrink-0" />
                ) : (
                  <Clock className="w-5 h-5 shrink-0" />
                )}
                <span>{meta.label}</span>
              </div>

              {/* Si le client n'a pas encore finalisé son paiement dans Wave Business, lui permettre d'ouvrir Wave en 1 clic */}
              {order.status === 'pending' && order.waveCheckoutUrl && (
                <a
                  href={order.waveCheckoutUrl}
                  className="w-full py-2.5 px-4 rounded-full bg-[#009EE3] hover:bg-[#0086C3] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs"
                >
                  <span>Finaliser mon paiement dans l’application Wave ({formatFcfa(order.total)})</span>
                </a>
              )}

              {/* Barre de progression Amazon Package Tracking */}
              {order.status !== 'cancelled' && (
                <div className="grid grid-cols-4 gap-1.5 text-[10px] sm:text-xs text-center font-bold">
                  {['Wave reçu', 'Préparation', 'En transit', 'Livrée'].map((lbl, idx) => {
                    const done = meta.step >= idx + 1;
                    return (
                      <div
                        key={lbl}
                        className={`py-1.5 px-1 rounded ${
                          done ? 'bg-[#007185] text-white' : 'bg-[#EAEDED] text-[#6F7373]'
                        }`}
                      >
                        {lbl}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="bg-[#F7FAFA] rounded p-4 border border-[#D5D9D9] text-xs space-y-1.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p>
                      <strong>N° Commande :</strong>{' '}
                      <span className="font-extrabold text-[#B12704]">{order.reference}</span>
                    </p>
                    <p>
                      <strong>Destinataire :</strong> {order.customerName}
                    </p>
                    <p>
                      <strong>Destination :</strong> {order.cityZoneName} — {order.neighborhood}
                    </p>
                    <p>
                      <strong>Paiement Wave :</strong>{' '}
                      {order.waveTransactionRef ? `Réf ${order.waveTransactionRef}` : 'Wave en ligne'}
                    </p>
                  </div>

                  {qrDataUrl && (
                    <div className="flex flex-col items-center shrink-0">
                      <img
                        src={qrDataUrl}
                        alt={`QR ${order.reference}`}
                        className="w-20 h-20 rounded bg-white p-1 border border-[#D5D9D9]"
                      />
                      <a
                        href={qrDataUrl}
                        download={`Perokado-${order.reference}-QR.png`}
                        className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-[#007185] hover:underline"
                      >
                        <Download className="w-3 h-3" />
                        <span>QR</span>
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-2 mt-2 border-t border-[#D5D9D9] space-y-1">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>
                        {it.quantity}× {it.name}
                      </span>
                      <span className="font-semibold">{formatFcfa(it.lineTotal)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-[#565959]">
                    <span>Livraison / Expédition</span>
                    <span>{formatFcfa(order.deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between pt-1.5 border-t border-[#D5D9D9] font-extrabold text-sm text-[#B12704]">
                    <span>Total réglé par Wave</span>
                    <span>{formatFcfa(order.total)}</span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-1">
                <a
                  href={buildWhatsappServiceUrl(
                    whatsappNumber,
                    `Bonjour Pèrôkadô, je souhaite une information concernant le suivi de ma commande ${order.reference}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007185] hover:text-[#C7511F] hover:underline"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Contacter le service client au sujet de ce colis</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
