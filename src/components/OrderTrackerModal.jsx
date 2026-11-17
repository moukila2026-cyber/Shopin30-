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
    color: 'bg-amber-100 text-amber-900 border-amber-200',
    step: 1,
  },
  preparing: {
    label: 'Paiement Wave validé — Colis en préparation à Daloa',
    color: 'bg-blue-100 text-blue-900 border-blue-200',
    step: 2,
  },
  shipped: {
    label: 'Marchandise expédiée / En cours de livraison vers vous',
    color: 'bg-indigo-100 text-indigo-900 border-indigo-200',
    step: 3,
  },
  delivered: {
    label: 'Marchandise livrée — Merci pour votre confiance !',
    color: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    step: 4,
  },
  cancelled: {
    label: 'Commande annulée',
    color: 'bg-red-100 text-red-900 border-red-200',
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

  // Ouverture directe via scan d'un Code QR (?track=PKD-XXXXXX&token=...) ou depuis la confirmation
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

  // Actualisation automatique en direct toutes les 20 secondes tant que la fenêtre de suivi est ouverte
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

  // Régénération du Code QR sur l'écran de suivi pour que le client puisse toujours le sauvegarder
  React.useEffect(() => {
    if (!order) {
      setQrDataUrl('');
      return;
    }
    const url = buildOrderTrackingUrl(order);
    QRCode.toDataURL(url, {
      width: 220,
      margin: 2,
      color: { dark: '#0F443E', light: '#FFFFFF' },
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Suivi de marchandise en direct"
    >
      <div
        className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E5DEC9] max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#FAF7F0] text-stone-600 cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <QrCode className="w-6 h-6 text-[#D95D24]" />
          <h2 className="text-xl font-bold text-[#0F443E]">Suivi de marchandise en direct</h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 mb-5">
          Scannez le <strong>Code QR</strong> reçu lors de votre commande Wave pour un accès
          instantané, ou saisissez votre référence (ex. <strong>PKD-8K4M2X</strong>) et votre
          numéro de téléphone.
        </p>

        <form onSubmit={handleTrackSubmit} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0F443E] mb-1">
                Référence commande *
              </label>
              <input
                type="text"
                required
                value={reference}
                onChange={(e) => setReference(e.target.value.toUpperCase())}
                placeholder="PKD-XXXXXX"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm uppercase font-bold focus:outline-none focus:border-[#0F443E]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0F443E] mb-1">
                Votre téléphone *
              </label>
              <input
                type="tel"
                required={!activeToken}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07 00 00 00 00"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DED6C1] text-sm focus:outline-none focus:border-[#0F443E]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#0F443E] hover:bg-[#092E2A] text-white font-semibold text-sm transition cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>{loading ? 'Recherche en cours…' : 'Suivre mon colis'}</span>
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800">
            {error}
          </div>
        )}

        {order && meta && (
          <div className="mt-6 pt-5 border-t border-[#EFE9D8] space-y-4">
            {/* Bandeau temps réel */}
            <div className="flex items-center justify-between text-[11px] text-stone-500">
              <span className="inline-flex items-center gap-1.5 font-semibold text-[#0F443E]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
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
                className="inline-flex items-center gap-1 text-[#0F443E] font-semibold hover:underline cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                <span>
                  Actualiser
                  {lastCheckedAt ? ` (${lastCheckedAt.toLocaleTimeString('fr-FR')})` : ''}
                </span>
              </button>
            </div>

            <div
              className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2 ${meta.color}`}
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

            {order.status !== 'cancelled' && (
              <div className="grid grid-cols-4 gap-1.5 text-[10px] sm:text-xs text-center font-semibold">
                {['Wave reçu', 'Préparation', 'En transit', 'Livrée'].map((lbl, idx) => {
                  const done = meta.step >= idx + 1;
                  return (
                    <div
                      key={lbl}
                      className={`py-1.5 px-1 rounded-lg ${
                        done ? 'bg-[#0F443E] text-white' : 'bg-[#FAF7F0] text-stone-400'
                      }`}
                    >
                      {lbl}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="bg-[#FAF7F0] rounded-2xl p-4 border border-[#E5DEC9] text-xs space-y-1.5">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p>
                    <strong>Référence :</strong>{' '}
                    <span className="font-extrabold text-[#D95D24]">{order.reference}</span>
                  </p>
                  <p>
                    <strong>Client :</strong> {order.customerName}
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
                      className="w-20 h-20 rounded-xl bg-white p-1 border border-[#DED6C1]"
                    />
                    <a
                      href={qrDataUrl}
                      download={`Perokado-${order.reference}-QR.png`}
                      className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-[#0F443E] hover:underline"
                    >
                      <Download className="w-3 h-3" />
                      <span>QR</span>
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-2 mt-2 border-t border-[#E5DEC9] space-y-1">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>
                      {it.quantity}× {it.name}
                    </span>
                    <span className="font-semibold">{formatFcfa(it.lineTotal)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-stone-500">
                  <span>Livraison / Expédition</span>
                  <span>{formatFcfa(order.deliveryFee)}</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-[#E5DEC9] font-extrabold text-sm text-[#0F443E]">
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
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1FAF5A] hover:underline"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contacter le service client au sujet de ce colis</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
