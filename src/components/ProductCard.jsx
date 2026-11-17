import React from 'react';
import { Heart, ShoppingBag, Eye, Check, X } from 'lucide-react';
import { formatFcfa, CATEGORIES } from '../../shared/catalog.js';

export function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onSelectProduct,
  inCartQty,
}) {
  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 4;
  const discountPct =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  const categoryLabel =
    CATEGORIES.find((c) => c.id === product.category)?.shortLabel || product.category;

  return (
    <article className="group bg-white rounded-3xl border border-[#E5DEC9] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col">
      {/* Zone image */}
      <div className="relative aspect-5/6 bg-[#FAF7F0] overflow-hidden">
        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          className="w-full h-full block text-left focus:outline-none cursor-pointer"
          aria-label={`Voir les détails de ${product.name}`}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/products/placeholder.svg';
            }}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              outOfStock ? 'opacity-60 grayscale-[35%]' : ''
            }`}
          />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.badge && (
            <span className="inline-block px-2.5 py-1 rounded-full bg-[#0F443E] text-[#FAF7F0] text-[11px] font-bold shadow-xs">
              {product.badge}
            </span>
          )}
          {discountPct && (
            <span className="inline-block px-2.5 py-1 rounded-full bg-[#D95D24] text-white text-[11px] font-bold shadow-xs">
              -{discountPct}%
            </span>
          )}
          {outOfStock && (
            <span className="inline-block px-2.5 py-1 rounded-full bg-stone-800 text-white text-[11px] font-bold">
              Rupture de stock
            </span>
          )}
          {lowStock && (
            <span className="inline-block px-2.5 py-1 rounded-full bg-amber-600 text-white text-[11px] font-bold">
              Plus que {product.stock} en stock
            </span>
          )}
        </div>

        {/* Bouton favori */}
        <button
          type="button"
          onClick={() => onToggleFavorite(product.id)}
          className={`absolute top-3 right-3 p-2.5 rounded-full shadow-xs transition cursor-pointer ${
            isFavorite
              ? 'bg-[#D95D24] text-white'
              : 'bg-white/90 hover:bg-white text-[#0F443E]'
          }`}
          aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Aperçu rapide au survol */}
        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          className="hidden sm:inline-flex opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-3 right-3 items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-[#0F443E] text-xs font-semibold shadow-sm cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Détails</span>
        </button>
      </div>

      {/* Contenu */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D95D24]">
            {categoryLabel}
          </span>
          <h3 className="mt-1 text-base sm:text-lg font-bold text-[#14231F] leading-snug line-clamp-2">
            <button
              type="button"
              onClick={() => onSelectProduct(product)}
              className="text-left hover:text-[#0F443E] transition cursor-pointer"
            >
              {product.name}
            </button>
          </h3>
          {product.shortDescription && (
            <p className="mt-1.5 text-xs sm:text-sm text-stone-600 line-clamp-2">
              {product.shortDescription}
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-[#F0EAE0] space-y-3">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-lg sm:text-xl font-extrabold text-[#0F443E]">
              {formatFcfa(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs sm:text-sm text-stone-400 line-through">
                {formatFcfa(product.compareAtPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={outOfStock}
            onClick={() => onAddToCart(product, 1)}
            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition ${
              outOfStock
                ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                : inCartQty > 0
                ? 'bg-[#D95D24] hover:bg-[#BF4E1B] text-white cursor-pointer'
                : 'bg-[#0F443E] hover:bg-[#092E2A] text-white cursor-pointer'
            }`}
          >
            {outOfStock ? (
              <span>Indisponible</span>
            ) : inCartQty > 0 ? (
              <>
                <Check className="w-4 h-4" />
                <span>Dans le panier ({inCartQty}) · +1</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#E0A11B]" />
                <span>Ajouter au panier</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProductDetailModal({ product, onClose, onAddToCart, isFavorite, onToggleFavorite }) {
  const [qty, setQty] = React.useState(1);

  React.useEffect(() => {
    setQty(1);
    if (!product) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product, onClose]);

  if (!product) return null;

  const outOfStock = product.stock <= 0;
  const maxQty = Math.min(product.stock, 20);
  const categoryLabel =
    CATEGORIES.find((c) => c.id === product.category)?.label || product.category;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5DEC9]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-[#FAF7F0] text-[#14231F] border border-[#E5DEC9] cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="bg-[#FAF7F0] aspect-5/6 md:aspect-auto">
            <img
              src={product.imageUrl}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/products/placeholder.svg';
              }}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D95D24]">
                  {categoryLabel}
                </span>
                {product.badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0F443E] text-white text-xs font-semibold">
                    {product.badge}
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold text-[#14231F] leading-tight">{product.name}</h2>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0F443E]">
                  {formatFcfa(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-stone-400 line-through">
                    {formatFcfa(product.compareAtPrice)}
                  </span>
                )}
              </div>

              <p className="text-sm text-stone-700 leading-relaxed">
                {product.description || product.shortDescription}
              </p>

              {product.specs && product.specs.length > 0 && (
                <ul className="space-y-1.5 pt-2">
                  {product.specs.map((spec, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D95D24] shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="text-xs font-medium text-stone-600 bg-[#FAF7F0] rounded-xl p-3 border border-[#EAE2CE]">
                {outOfStock ? (
                  <span className="text-red-700 font-semibold">Rupture temporaire de stock</span>
                ) : (
                  <span className="text-[#0F443E]">
                    ✓ En stock à Daloa ({product.stock} disponible{product.stock > 1 ? 's' : ''}) —
                    Paiement en ligne Wave & suivi en direct par Code QR.
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#EFE9D8]">
              {!outOfStock && (
                <div className="flex items-center gap-3">
                  <label className="text-xs font-semibold text-stone-600">Quantité :</label>
                  <div className="inline-flex items-center rounded-full border border-[#DED6C1] bg-[#FAF7F0]">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="px-3.5 py-1.5 text-sm font-bold text-[#0F443E] cursor-pointer"
                    >
                      −
                    </button>
                    <span className="px-3 text-sm font-bold">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                      className="px-3.5 py-1.5 text-sm font-bold text-[#0F443E] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  disabled={outOfStock}
                  onClick={() => {
                    onAddToCart(product, qty);
                    onClose();
                  }}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition ${
                    outOfStock
                      ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                      : 'bg-[#D95D24] hover:bg-[#BF4E1B] text-white shadow-md cursor-pointer'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {outOfStock
                      ? 'Indisponible'
                      : `Ajouter au panier · ${formatFcfa(product.price * qty)}`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleFavorite(product.id)}
                  className={`p-3 rounded-full border transition cursor-pointer ${
                    isFavorite
                      ? 'bg-[#D95D24] text-white border-[#D95D24]'
                      : 'bg-white text-[#0F443E] border-[#DED6C1] hover:bg-[#FAF7F0]'
                  }`}
                  aria-label="Favoris"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
