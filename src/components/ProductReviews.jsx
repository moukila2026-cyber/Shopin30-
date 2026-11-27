import React from 'react';
import { Star, ShieldCheck, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { apiFetch } from '../lib/api.js';

/**
 * Bloc « Avis clients » d'une fiche produit.
 * Affiche uniquement les avis validés en administration (aucune note inventée)
 * et propose un formulaire de dépôt qui passe en modération.
 */
export function ProductReviews({ product, initialReviews = [] }) {
  const [reviews, setReviews] = React.useState(initialReviews);
  const [rating, setRating] = React.useState(5);
  const [authorName, setAuthorName] = React.useState('');
  const [authorCity, setAuthorCity] = React.useState('Daloa');
  const [orderReference, setOrderReference] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [status, setStatus] = React.useState({ type: '', message: '' });
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    setReviews(initialReviews);
  }, [initialReviews]);

  React.useEffect(() => {
    if (!product?.id) return;
    let alive = true;
    apiFetch(`/api/reviews?productId=${encodeURIComponent(product.id)}`)
      .then((res) => {
        if (alive && Array.isArray(res.reviews)) setReviews(res.reviews);
      })
      .catch(() => {
        // On garde les avis déjà reçus via /api/catalog.
      });
    return () => {
      alive = false;
    };
  }, [product?.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!product?.id) return;
    setSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      const res = await apiFetch('/api/reviews', {
        method: 'POST',
        body: {
          productId: product.id,
          orderReference: orderReference.trim(),
          authorName: authorName.trim(),
          authorCity: authorCity.trim() || 'Daloa',
          rating,
          comment: comment.trim(),
        },
      });
      setStatus({ type: 'success', message: res.message });
      setAuthorName('');
      setComment('');
      setOrderReference('');
      setRating(5);
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Envoi impossible, réessayez.' });
    } finally {
      setSubmitting(false);
    }
  }

  const average = reviews.length
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  return (
    <section className="mt-6 pt-5 border-t border-[#EAEDED] space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-base font-extrabold text-[#0F1111]">Avis clients</h3>
        {reviews.length > 0 ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-[#565959]">
            <span className="font-bold text-[#0F1111]">
              {average.toFixed(1).replace('.', ',')} / 5
            </span>
            <span className="flex text-[#FFA41C]">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.round(average) ? 'fill-[#FFA41C] text-[#FFA41C]' : 'text-[#FFA41C]/40'
                  }`}
                />
              ))}
            </span>
            <span>· {reviews.length} avis vérifié{reviews.length > 1 ? 's' : ''}</span>
          </span>
        ) : (
          <span className="text-xs text-[#565959]">
            Aucun avis publié pour le moment — votre retour aidera les autres clients.
          </span>
        )}
      </div>

      {reviews.length > 0 && (
        <ul className="space-y-3">
          {reviews.slice(0, 5).map((r, idx) => (
            <li key={`${r.authorName}-${idx}`} className="bg-[#F7F8F8] border border-[#EAEDED] rounded-md p-3">
              <div className="flex items-center gap-2 flex-wrap text-[11px]">
                <span className="flex text-[#FFA41C]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < r.rating ? 'fill-[#FFA41C] text-[#FFA41C]' : 'text-[#FFA41C]/30'}`}
                    />
                  ))}
                </span>
                <strong className="text-[#0F1111]">{r.authorName}</strong>
                <span className="text-[#565959]">— {r.authorCity}</span>
                {r.verifiedPurchase && (
                  <span className="inline-flex items-center gap-1 text-[#067D62] font-semibold">
                    <ShieldCheck className="w-3 h-3" /> Achat vérifié
                  </span>
                )}
              </div>
              {r.comment && <p className="text-xs text-[#0F1111] mt-1.5 leading-relaxed">{r.comment}</p>}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-[#D5D9D9] rounded-md p-3.5 space-y-2.5">
        <h4 className="text-xs font-bold text-[#0F1111]">Donner mon avis</h4>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              aria-label={`${n} étoile${n > 1 ? 's' : ''}`}
              className="cursor-pointer p-0.5"
            >
              <Star
                className={`w-5 h-5 ${n <= rating ? 'fill-[#FFA41C] text-[#FFA41C]' : 'text-[#C7C7C7]'}`}
              />
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-3 gap-2">
          <input
            required
            minLength={2}
            maxLength={60}
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Votre nom *"
            className="w-full px-3 py-2 rounded border border-[#888C8C] text-xs focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
          />
          <input
            maxLength={60}
            value={authorCity}
            onChange={(e) => setAuthorCity(e.target.value)}
            placeholder="Ville"
            className="w-full px-3 py-2 rounded border border-[#888C8C] text-xs focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
          />
          <input
            maxLength={40}
            value={orderReference}
            onChange={(e) => setOrderReference(e.target.value.toUpperCase())}
            placeholder="Réf. commande (facultatif)"
            className="w-full px-3 py-2 rounded border border-[#888C8C] text-xs focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
          />
        </div>
        <textarea
          rows={3}
          maxLength={1200}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Qualité, livraison, conformité… dites-nous tout (facultatif)"
          className="w-full px-3 py-2 rounded border border-[#888C8C] text-xs focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
        />
        {status.message && (
          <p
            className={`flex items-start gap-1.5 text-[11px] ${
              status.type === 'success' ? 'text-[#067D62]' : 'text-[#CC0C39]'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            )}
            <span>{status.message}</span>
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-xs font-bold text-[#0F1111] cursor-pointer disabled:opacity-60"
        >
          <Send className="w-3.5 h-3.5" />
          {submitting ? 'Envoi…' : 'Envoyer mon avis'}
        </button>
      </form>
    </section>
  );
}
