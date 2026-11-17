import React from 'react';
import { X, PackageCheck, Search, Clock, Truck, CheckCircle2, XCircle } from 'lucide-react';
import { formatFcfa } from '../../shared/catalog.js';
import { apiFetch } from '../lib/api.js';

const STATUS_META = {
  pending: {
    label: 'Commande reçue — En attente de confirmation',
    color: 'bg-amber-100 text-amber-900 border-amber-200',
    step: 1,
  },
  preparing: {
    label: 'Confirmée — En préparation à Daloa',
    color: 'bg-blue-100 text-blue-900 border-blue-200',
    step: 2,
  },
  shipped: {
    label: 'En cours de livraison vers vous',
    color: 'bg-indigo-100 text-indigo-900 border-indigo-200',
    step: 3,
  },
  delivered: {
    label: 'Colis livré — Merci pour votre confiance !',
    color: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    step: 4,
  },
  cancelled: {
    label: 'Commande annulée',
    color: 'bg-red-100 text-red-900 border-red-200',
    step: 0,
  },
};

export function OrderTrackerModal({ open, onClose }) {
  const [reference, setReference] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [order, setOrder] = React.useState(null);

  React.useEffect(() => {
    if (!open) {
      setError('');
    }
  }, [open]);

  if (!open) return null;

  async function handleTrack(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      const res = await apiFetch('/api/orders/track', {
        method: 'POST',
        body: { reference: reference.trim().toUpperCase(), phone: phone.trim() },
      });
      setOrder(res.order);
    } catch (err) {
      setError(err.message || 'Commande introuvable.');
    } finally {
      setLoading(false);
    }
  }

  const meta = order ? STATUS_META[order.status] || STATUS_META.pending : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Suivi de commande"
    >
      <div
        className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E5DEC9] max-h-[90vh] overflow-y-auto"
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
          <PackageCheck className="w-6 h-6 text-[#D95D24]" />
          <h2 className="text-xl font-bold text-[#0F443E]">Suivre ma commande</h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 mb-5">
          Saisissez la référence reçue à la validation (ex. <strong>PKD-8K4M2X</strong>) ainsi que
          votre numéro de téléphone.
        </p>

        <form onSubmit={handleTrack} className="space-y-3">
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
                required
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
            <span>{loading ? 'Recherche en cours…' : 'Vérifier le statut'}</span>
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800">
            {error}
          </div>
        )}

        {order && meta && (
          <div className="mt-6 pt-5 border-t border-[#EFE9D8] space-y-4">
            <div className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2 ${meta.color}`}>
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
                {['Reçue', 'Préparation', 'En route', 'Livrée'].map((lbl, idx) => {
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
              <p>
                <strong>Référence :</strong> {order.reference}
              </p>
              <p>
                <strong>Client :</strong> {order.customerName}
              </p>
              <p>
                <strong>Destination :</strong> {order.cityZoneName} — {order.neighborhood}
              </p>
              <div className="pt-2 mt-2 border-t border-[#E5DEC9] space-y-1">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>
                      {it.quantity}× {it.name}
                    </span>
                    <span className="font-semibold">{formatFcfa(it.lineTotal)}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-1.5 border-t border-[#E5DEC9] font-extrabold text-sm text-[#0F443E]">
                  <span>Total</span>
                  <span>{formatFcfa(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
