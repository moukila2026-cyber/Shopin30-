import React from 'react';
import { MapPin, Truck, ShieldCheck, CreditCard, ArrowRight, QrCode } from 'lucide-react';
import { formatFcfa } from '../../shared/catalog.js';
import { CITIES, cityPath, rayonPath } from '../lib/router.js';
import { buildBreadcrumbSchema, injectJsonLd } from '../lib/seo.js';

/**
 * Page ville /ville/:slug — contenu local réel (SEO local + réassurance)
 * puis sélection de produits du stock réellement disponible à Daloa.
 */
export function CityPage({ city, products, onOpenProduct, onSelectCategory, categories, onOpenTrack }) {
  const zoneProducts = React.useMemo(() => {
    // Sélection éditoriale : les best-sellers toutes catégories confondues.
    const list = [...products].filter((p) => p.stock > 0);
    const picks = list.filter((p) => p.isFeatured || p.isBestSeller);
    return (picks.length >= 8 ? picks : list).slice(0, 8);
  }, [products]);

  React.useEffect(() => {
    document.title = `${city.title} | Pèrôkadô`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', city.intro.slice(0, 158));
    document.getElementById('pkd-jsonld-ville')?.remove();
    injectJsonLd('pkd-jsonld-ville', buildBreadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Villes desservies', url: '/' },
      { name: city.name, url: cityPath(city.slug) },
    ]));
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `https://perokado.com${cityPath(city.slug)}`);
  }, [city]);

  return (
    <main className="max-w-[1500px] mx-auto px-3 lg:px-5 py-4 space-y-4">
      {/* Fil d'Ariane */}
      <nav aria-label="Fil d’Ariane" className="text-[11px] text-[#565959] flex flex-wrap items-center gap-1">
        <a href="/" className="hover:text-[#C7511F] hover:underline">Accueil</a>
        <span>›</span>
        <span>Villes desservies</span>
        <span>›</span>
        <span className="font-bold text-[#0F1111]">{city.name}</span>
      </nav>

      <header className="bg-white rounded-md border border-[#D5D9D9] p-4 sm:p-6 space-y-3">
        <div className="flex items-start gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FFF3D6] text-[#B12704] shrink-0">
            <MapPin className="w-5 h-5" />
          </span>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F1111] leading-tight">
              Livraison à {city.name} — quincaillerie, électroménager et maison
            </h1>
            <p className="text-[12px] text-[#565959] mt-1">
              {city.region} · Frais d’expédition {formatFcfa(city.fee)} · Délai {city.eta}
            </p>
          </div>
        </div>
        <p className="text-sm text-[#0F1111] leading-relaxed">{city.intro}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {city.highlights.map((h) => (
            <div key={h} className="flex items-start gap-2 rounded border border-[#EAEDED] bg-[#F7F8F8] p-2.5 text-[11px] text-[#0F1111]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#067D62] shrink-0 mt-0.5" />
              <span>{h}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <a
            href="#produits-ville"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-xs font-bold text-[#0F1111]"
          >
            Voir les articles disponibles <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={onOpenTrack}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#F7F8F8] border border-[#D5D9D9] text-xs font-bold text-[#0F1111] cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" /> Suivre mon colis
          </button>
        </div>
      </header>

      {/* Paiement et logistique locales */}
      <section className="grid md:grid-cols-3 gap-3">
        <article className="bg-white rounded-md border border-[#D5D9D9] p-4 space-y-1.5">
          <h2 className="text-sm font-bold text-[#0F1111] flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-[#C7511F]" /> Comment nous livrons à {city.name}
          </h2>
          <p className="text-[11px] text-[#565959] leading-relaxed">
            {city.slug === 'daloa'
              ? 'Nos propres livreurs assurent la tournée en commune et en périphérie. Vous recevez un appel avant le passage et pouvez décaler la livraison sur un autre créneau depuis le lien de suivi.'
              : `Les colis partent de Daloa par UTB ou AVS. Vous recevez la référence du transporteur sur WhatsApp dès la remise au car, puis le retrait se fait en gare de ${city.name} sur présentation du Code QR.`}
          </p>
        </article>
        <article className="bg-white rounded-md border border-[#D5D9D9] p-4 space-y-1.5">
          <h2 className="text-sm font-bold text-[#0F1111] flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-[#C7511F]" /> Paiement accepté
          </h2>
          <p className="text-[11px] text-[#565959] leading-relaxed">
            Wave, Orange Money, MTN Mobile Money et Moov Money, avec saisie de la référence de transaction pour validation immédiate.
            {city.slug === 'daloa'
              ? ' Les espèces à la livraison sont également acceptées à Daloa commune et périphérie.'
              : ` Le paiement à la livraison n’est pas disponible hors Daloa : réglez avant l’expédition par mobile money.`}
          </p>
        </article>
        <article className="bg-white rounded-md border border-[#D5D9D9] p-4 space-y-1.5">
          <h2 className="text-sm font-bold text-[#0F1111] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C7511F]" /> Garantie et retours
          </h2>
          <p className="text-[11px] text-[#565959] leading-relaxed">
            Appareils électroménagers garantis par le fabricant, fiche de garantie remise avec le colis.
            Retour accepté sous 7 jours si l’article ne correspond pas, hors produits sur mesure et consommables ouverts.
          </p>
        </article>
      </section>

      {/* Produits */}
      <section id="produits-ville" className="space-y-3 scroll-mt-24">
        <div className="flex items-end justify-between gap-2">
          <h2 className="text-base sm:text-lg font-extrabold text-[#0F1111]">
            Articles les plus demandés livrés à {city.name}
          </h2>
          <a href="/" className="text-xs font-bold text-[#007185] hover:text-[#C7511F] hover:underline">
            Tout le catalogue →
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4">
          {zoneProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => onOpenProduct(product)}
              className="text-left bg-white rounded-md border border-[#D5D9D9] hover:border-[#888C8C] overflow-hidden group cursor-pointer"
            >
              <div className="aspect-square bg-[#F7F8F8] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain p-2 group-hover:scale-[1.03] transition-transform"
                />
              </div>
              <div className="p-2.5 space-y-1">
                <p className="text-[11px] sm:text-xs font-bold text-[#0F1111] line-clamp-2 leading-snug">{product.name}</p>
                <p className="text-sm font-extrabold text-[#B12704]">{formatFcfa(product.price)}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Maillage interne : toutes les villes + rayons */}
      <section className="bg-white rounded-md border border-[#D5D9D9] p-4 space-y-3">
        <h2 className="text-sm font-bold text-[#0F1111]">Nous livrons aussi</h2>
        <div className="flex flex-wrap gap-2">
          {CITIES.filter((c) => c.slug !== city.slug).map((c) => (
            <a
              key={c.slug}
              href={cityPath(c.slug)}
              className="px-3 py-1.5 rounded-full border border-[#D5D9D9] bg-[#F7F8F8] hover:bg-[#EAEDED] text-[11px] font-semibold text-[#0F1111]"
            >
              {c.name}
            </a>
          ))}
        </div>
        <h2 className="text-sm font-bold text-[#0F1111] pt-2">Nos rayons</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={rayonPath(cat.id)}
              className="px-3 py-1.5 rounded-full border border-[#D5D9D9] bg-[#F7F8F8] hover:bg-[#EAEDED] text-[11px] font-semibold text-[#0F1111]"
            >
              {cat.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
