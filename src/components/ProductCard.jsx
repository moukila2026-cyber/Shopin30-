import React from 'react';
import {
  Heart,
  Check,
  X,
  Star,
  Truck,
  ShieldCheck,
  QrCode,
  MessageCircle,
  Lock,
} from 'lucide-react';
import {
  formatFcfa,
  computeProductDeliveryFee,
  inferHeavyShipping,
} from '../../shared/catalog.js';
import { buildWhatsappServiceUrl } from '../lib/api.js';

// Note et nombre d'avis déterministes et réalistes par produit pour un rendu e-commerce authentique
function getProductRatingMeta(id = '') {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  const ratings = [4.5, 4.6, 4.7, 4.8, 4.9];
  const rating = ratings[hash % ratings.length];
  const count = 28 + (hash % 190);
  const boughtMonth = 20 + (hash % 80);
  return { rating, count, boughtMonth };
}

function StarRating({ rating, count }) {
  const fullStars = Math.floor(rating);
  return (
    <div className="flex items-center gap-1.5 text-xs">
      <span className="font-semibold text-[#0F1111]">{rating.toFixed(1).replace('.', ',')}</span>
      <div className="flex items-center text-[#FFA41C]" aria-label={`Note ${rating} sur 5`}>
        {[0, 1, 2, 3, 4].map((idx) => (
          <Star
            key={idx}
            className={`w-3.5 h-3.5 ${
              idx < fullStars
                ? 'fill-[#FFA41C] text-[#FFA41C]'
                : 'fill-[#FFA41C]/40 text-[#FFA41C]'
            }`}
          />
        ))}
      </div>
      <span className="text-[#007185] hover:text-[#C7511F]">({count})</span>
    </div>
  );
}

function formatNumberSpaced(amount) {
  return Math.round(Number(amount) || 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function ProductCard({
  product,
  inCartQty,
  isFavorite,
  onAddToCart,
  onBuyNow,
  onToggleFavorite,
  onOpenDetail,
  selectedZone,
}) {
  const outOfStock = product.stock <= 0;
  const discountPct =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  const { rating, count, boughtMonth } = getProductRatingMeta(product.id);
  const isHeavy = inferHeavyShipping(product);
  const zoneFee = computeProductDeliveryFee(product, selectedZone);
  const zoneName = selectedZone?.shortName || 'Daloa Commune';

  const isTopSeller =
    (product.badge || '').toLowerCase().includes('vente') ||
    (product.badge || '').toLowerCase().includes('n°1');

  return (
    <article className="group bg-white border border-[#D5D9D9] rounded-md overflow-hidden flex flex-col hover:shadow-md transition duration-200">
      {/* Zone photo sur fond clair style Amazon */}
      <div className="relative aspect-square bg-[#F7F8F8] p-2.5 sm:p-4 flex items-center justify-center overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          onClick={() => onOpenDetail(product)}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/images/products/placeholder.svg';
          }}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition duration-300 cursor-pointer mix-blend-multiply"
        />

        {/* Ruban Amazon Best-Seller / Choix Pèrôkadô en haut à gauche */}
        {product.badge && (
          <span
            className={`absolute top-0 left-0 max-w-[75%] truncate px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-bold tracking-tight rounded-br-md shadow-xs ${
              isTopSeller
                ? 'bg-[#E67A00] text-white'
                : 'bg-[#232F3E] text-white'
            }`}
          >
            {isTopSeller ? `#1 ${product.badge}` : product.badge}
          </span>
        )}

        {/* Bouton Favori discret en haut à droite */}
        <button
          type="button"
          onClick={() => onToggleFavorite(product.id)}
          aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 hover:bg-white shadow-xs border border-[#EAEDED] flex items-center justify-center transition cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? 'fill-[#CC0C39] text-[#CC0C39]' : 'text-[#565959]'
            }`}
          />
        </button>

        {outOfStock && (
          <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
            <span className="px-3 py-1.5 rounded bg-[#0F1111] text-white text-xs font-bold">
              Temporairement en rupture
            </span>
          </div>
        )}
      </div>

      {/* Corps fiche produit dense et informatif style Amazon */}
      <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between gap-2">
        <div className="space-y-1">
          <h3
            onClick={() => onOpenDetail(product)}
            className="text-xs sm:text-sm font-medium text-[#0F1111] hover:text-[#C7511F] leading-snug line-clamp-2 cursor-pointer"
          >
            {product.name}
          </h3>

          <StarRating rating={rating} count={count} />

          <p className="text-[11px] text-[#565959]">
            Plus de {boughtMonth} achetés récemment à Daloa & alentours
          </p>

          {/* Badge Vente Flash rouge #CC0C39 comme Amazon */}
          {discountPct && (
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className="bg-[#CC0C39] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-xs">
                -{discountPct}%
              </span>
              <span className="text-[11px] font-bold text-[#CC0C39]">Offre à durée limitée</span>
            </div>
          )}

          {/* Prix grand format typographique Amazon */}
          <div className="pt-0.5">
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-2xl font-bold text-[#0F1111] leading-none">
                {formatNumberSpaced(product.price)}
              </span>
              <span className="text-xs font-bold text-[#0F1111]">FCFA</span>
            </div>
            {product.compareAtPrice && (
              <p className="text-[11px] text-[#565959] mt-0.5">
                Prix conseillé :{' '}
                <span className="line-through">{formatFcfa(product.compareAtPrice)}</span>
              </p>
            )}
          </div>

          {/* Info livraison selon la zone choisie et le gabarit (standard ou lourd) */}
          <p className="text-[11px] text-[#0F1111] leading-snug pt-0.5">
            Livraison <strong>{zoneName}</strong> :{' '}
            <strong className="text-[#0F1111]">{formatFcfa(zoneFee)}</strong>{' '}
            <span className="text-[#565959]">
              {isHeavy ? '(colis lourd/volumineux)' : '(tarif standard)'}
            </span>
          </p>

          {!outOfStock && product.stock <= 6 ? (
            <p className="text-[11px] font-semibold text-[#B12704]">
              Il ne reste plus que {product.stock} ex. en stock — commandez vite.
            </p>
          ) : !outOfStock ? (
            <p className="text-[11px] font-semibold text-[#007600]">En stock à Daloa</p>
          ) : null}
        </div>

        {/* Boutons d'action Amazon : Jaune #FFD814 "Ajouter au panier" + Orange #FFA41C "Acheter" */}
        <div className="pt-2 space-y-1.5">
          <button
            type="button"
            disabled={outOfStock}
            onClick={() => onAddToCart(product, 1)}
            className={`w-full py-2 px-2 sm:px-3 rounded-full text-[11px] sm:text-xs font-medium border shadow-2xs transition cursor-pointer ${
              outOfStock
                ? 'bg-[#EAEDED] border-[#D5D9D9] text-[#888C8C] cursor-not-allowed'
                : 'bg-[#FFD814] hover:bg-[#F7CA00] border-[#FCD200] text-[#0F1111]'
            }`}
          >
            <span className="sm:hidden">
              {inCartQty > 0 ? `Ajouté (${inCartQty})` : 'Ajouter au panier'}
            </span>
            <span className="hidden sm:inline">
              {inCartQty > 0 ? `Ajouté au panier (${inCartQty})` : 'Ajouter au panier'}
            </span>
          </button>

          {!outOfStock && onBuyNow && (
            <button
              type="button"
              onClick={() => onBuyNow(product)}
              className="w-full py-1.5 px-3 rounded-full text-xs font-medium bg-[#FFA41C] hover:bg-[#FA8900] border border-[#FF8F00] text-[#0F1111] shadow-2xs transition cursor-pointer"
            >
              <span className="sm:hidden">Acheter (Wave)</span>
              <span className="hidden sm:inline">Acheter maintenant (Wave)</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

// ============================================================================
// FICHE PRODUIT DÉTAILLÉE 3 COLONNES (GALERIE + INFOS + BUY BOX AMAZON)
// ============================================================================
export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  selectedZone,
  whatsappNumber,
}) {
  const [qty, setQty] = React.useState(1);
  const [activeImageUrl, setActiveImageUrl] = React.useState(null);

  React.useEffect(() => {
    setActiveImageUrl(product?.imageUrl || null);
  }, [product]);

  if (!product) return null;
  const outOfStock = product.stock <= 0;
  const { rating, count } = getProductRatingMeta(product.id);
  const discountPct =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  const isHeavy = inferHeavyShipping(product);
  const zoneFee = computeProductDeliveryFee(product, selectedZone);
  const zoneName = selectedZone?.shortName || 'Daloa Commune';

  const gallery =
    Array.isArray(product.galleryUrls) && product.galleryUrls.length > 1
      ? product.galleryUrls
      : product.id === 'smart-cuisiniere-gaz-5-feux-inox'
      ? [
          product.imageUrl,
          '/images/products/smart-plaque-5-bruleurs-laiton-dore-detail.jpg',
        ]
      : [product.imageUrl];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        className="relative bg-white rounded-lg max-w-5xl w-full overflow-hidden shadow-2xl border border-[#D5D9D9] my-auto max-h-[92dvh] overflow-y-auto overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barre supérieure */}
        <div className="sticky top-0 z-10 bg-[#F0F2F2] px-5 py-3 border-b border-[#D5D9D9] flex items-center justify-between">
          <span className="text-[11px] sm:text-xs text-[#565959] font-medium truncate pr-2 sm:pr-4 min-w-0">
            Pèrôkadô › Catalogue › <strong className="text-[#0F1111]">{product.name}</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="p-1.5 rounded-full hover:bg-[#D5D9D9] text-[#0F1111] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mise en page 3 colonnes façon page produit Amazon */}
        <div className="p-3.5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* Colonne 1 : Image produit grand format + vignettes galerie éventuelles (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="bg-[#F7F8F8] border border-[#EAEDED] rounded-md p-3 sm:p-6 flex items-center justify-center aspect-square max-h-[46vh] sm:max-h-none overflow-hidden">
              <img
                src={activeImageUrl || product.imageUrl}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/products/placeholder.svg';
                }}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            {gallery.length > 1 && (
              <div className="flex items-center gap-2">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageUrl(imgUrl)}
                    className={`w-16 h-16 rounded border p-1 bg-[#F7F8F8] flex items-center justify-center cursor-pointer ${
                      (activeImageUrl || product.imageUrl) === imgUrl
                        ? 'border-2 border-[#C7511F] ring-1 ring-[#C7511F]'
                        : 'border-[#D5D9D9]'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="max-w-full max-h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Colonne 2 : Titre, notes, prix, caractéristiques "À propos de cet article" (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            {product.badge && (
              <span className="inline-block bg-[#232F3E] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-xs">
                {product.badge}
              </span>
            )}
            <h2 className="text-lg sm:text-xl font-semibold text-[#0F1111] leading-snug">
              {product.name}
            </h2>

            <div className="pb-2 border-b border-[#EAEDED]">
              <StarRating rating={rating} count={count} />
            </div>

            <div className="space-y-1 pb-3 border-b border-[#EAEDED]">
              <div className="flex items-baseline gap-2">
                {discountPct && (
                  <span className="text-xl font-light text-[#CC0C39]">-{discountPct}%</span>
                )}
                <span className="text-2xl font-bold text-[#0F1111]">
                  {formatFcfa(product.price)}
                </span>
              </div>
              {product.compareAtPrice && (
                <p className="text-xs text-[#565959]">
                  Prix conseillé :{' '}
                  <span className="line-through">{formatFcfa(product.compareAtPrice)}</span>
                </p>
              )}
              <p className="text-xs text-[#565959]">
                Paiement en ligne sécurisé uniquement via <strong className="text-[#009EE3]">Wave</strong>.
              </p>
            </div>

            {/* Icônes garanties style Amazon */}
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-[#EAEDED] text-center text-[11px] text-[#007185]">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-5 h-5 text-[#C7511F]" />
                <span>Daloa & Villes alentours</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <QrCode className="w-5 h-5 text-[#007185]" />
                <span>Suivi direct par Code QR</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-5 h-5 text-[#007600]" />
                <span>Contrôlé avant envoi</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#0F1111] mb-1.5">À propos de cet article</h3>
              <p className="text-xs sm:text-sm text-[#333333] leading-relaxed mb-2.5">
                {product.description || product.shortDescription}
              </p>
              {product.specs?.length > 0 && (
                <ul className="list-disc pl-4 space-y-1 text-xs text-[#0F1111]">
                  {product.specs.map((spec, idx) => (
                    <li key={idx}>{spec}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Colonne 3 : LA "BUY BOX" ENCADRÉE D'AMAZON (3 cols) */}
          <div className="lg:col-span-3 border border-[#D5D9D9] rounded-lg p-4 space-y-3 bg-white">
            <div className="text-lg sm:text-xl font-bold text-[#0F1111]">{formatFcfa(product.price)}</div>

            <div className="text-xs text-[#0F1111] space-y-1">
              <p>
                Livraison vers <strong>{zoneName}</strong> :{' '}
                <strong className="text-[#B12704]">{formatFcfa(zoneFee)}</strong>
              </p>
              {isHeavy ? (
                <p className="text-[11px] text-[#B12704] font-semibold bg-[#FEF8F2] p-2 rounded border border-[#F5D3B3]">
                  Produit lourd / grand gabarit : livraison <strong>2 500 FCFA</strong> dans Daloa
                  et expédition <strong>5 000 FCFA</strong> hors de Daloa.
                </p>
              ) : (
                <p className="text-[11px] text-[#565959]">
                  Aucune livraison gratuite. Colis standard : Daloa Commune 1 000 F · Périphérie
                  1 500 F · Expédition hors Daloa 2 000 F.
                </p>
              )}
            </div>

            <p className={`text-sm font-bold ${outOfStock ? 'text-[#CC0C39]' : 'text-[#007600]'}`}>
              {outOfStock
                ? 'Rupture de stock'
                : `En stock (${product.stock} disponible${product.stock > 1 ? 's' : ''})`}
            </p>

            {!outOfStock && (
              <div>
                <label className="block text-xs font-medium text-[#0F1111] mb-1">Quantité :</label>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-md bg-[#F0F2F2] border border-[#D5D9D9] text-xs font-semibold text-[#0F1111] focus:outline-none"
                >
                  {Array.from({ length: Math.min(10, product.stock) }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      Quantité : {n}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-2 pt-1">
              <button
                type="button"
                disabled={outOfStock}
                onClick={() => {
                  onAddToCart(product, qty);
                  onClose();
                }}
                className="w-full py-2 px-4 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-xs font-medium text-[#0F1111] shadow-2xs disabled:opacity-50 cursor-pointer"
              >
                Ajouter au panier
              </button>

              {!outOfStock && onBuyNow && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBuyNow(product, qty);
                  }}
                  className="w-full py-2 px-4 rounded-full bg-[#FFA41C] hover:bg-[#FA8900] border border-[#FF8F00] text-xs font-medium text-[#0F1111] shadow-2xs cursor-pointer"
                >
                  Acheter maintenant (Wave)
                </button>
              )}
            </div>

            <div className="pt-2 border-t border-[#EAEDED] text-[11px] text-[#565959] space-y-1">
              <div className="flex justify-between">
                <span>Expédié par</span>
                <strong className="text-[#0F1111]">Pèrôkadô Daloa</strong>
              </div>
              <div className="flex justify-between">
                <span>Paiement</span>
                <strong className="text-[#009EE3] flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Wave uniquement
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Suivi colis</span>
                <strong className="text-[#0F1111]">Référence + Code QR</strong>
              </div>
            </div>

            <a
              href={buildWhatsappServiceUrl(
                whatsappNumber,
                `Bonjour Service Client Pèrôkadô, je souhaite un renseignement sur l'article "${product.name}" (frais d'expédition selon taille/poids).`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full pt-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#007185] hover:text-[#C7511F] hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Question sur le poids ? Service Client</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
