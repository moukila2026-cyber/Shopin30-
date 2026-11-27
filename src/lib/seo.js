// ==============================================================================
// PÈRÔKADÔ — Données structurées schema.org (produits, boutique, fil d'Ariane)
// ==============================================================================
// Générer du JSON-LD permet à Google d'afficher prix, disponibilité, note et
// zone de livraison directement dans les résultats de recherche locaux
// (« perokado daloa », « frigo daloa »...). C'est le levier n°1 pour le SEO local.
// ==============================================================================

const SITE_URL = 'https://perokado.com';

/** Retire les caractères qui casseraient un script inline. */
function safeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}

export function buildOrganizationSchema(brand) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    '@id': `${SITE_URL}/#organization`,
    name: brand?.name || 'Pèrôkadô',
    url: SITE_URL,
    logo: `${SITE_URL}/images/icon-512.png`,
    image: `${SITE_URL}/images/og-perokado.png`,
    description:
      brand?.shortDescription ||
      'Boutique en ligne à Daloa : électroménager, motos et tricycles, quincaillerie BTP, maison.',
    telephone: '+225 05 01 30 33 43',
    priceRange: '1 000 FCFA – 1 500 000 FCFA',
    currenciesAccepted: 'XOF',
    paymentAccepted: 'Wave, Orange Money, MTN MoMo, Moov Money, Espèces à la livraison',
    areaServed: [
      { '@type': 'City', name: 'Daloa' },
      { '@type': 'City', name: 'Issia' },
      { '@type': 'City', name: 'Vavoua' },
      { '@type': 'City', name: 'Zoukougbeu' },
      { '@type': 'City', name: 'Bouaflé' },
      { '@type': 'City', name: 'Sinfra' },
      { '@type': 'City', name: 'Gagnoa' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Daloa',
      addressRegion: 'Haut-Sassandra',
      addressCountry: 'CI',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '07:30',
        closes: '20:00',
      },
    ],
  };
}

export function buildWebsiteSchema(brand) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: brand?.name || 'Pèrôkadô',
    inLanguage: 'fr-CI',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildProductSchema(product, brand) {
  const url = `${SITE_URL}/produit/${encodeURIComponent(product.slug || product.id)}`;
  const node = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: product.name,
    description: product.shortDescription || product.description || product.name,
    sku: product.id,
    image: [
      String(product.imageUrl || '').startsWith('http')
        ? product.imageUrl
        : `${SITE_URL}${product.imageUrl || ''}`,
    ],
    url,
    brand: {
      '@type': 'Brand',
      // On déduit la marque du nom du produit pour rester fidèle au catalogue.
      name: inferBrandName(product),
    },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'XOF',
      price: String(product.price),
      availability:
        Number(product.stock) > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': `${SITE_URL}/#organization` },
      areaServed: 'Daloa, Côte d’Ivoire',
      priceValidUntil: '2027-12-31',
    },
  };

  if (product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price)) {
    // Prix barré lisible par Google (affichage « promo »)
    node.offers.priceSpecification = {
      '@type': 'UnitPriceSpecification',
      price: String(product.price),
      priceCurrency: 'XOF',
    };
  }

  if (product.category) {
    node.category = product.category;
  }

  return node;
}

function inferBrandName(product) {
  const name = String(product.name || '');
  if (/legrand/i.test(name)) return 'Legrand';
  if (/midea/i.test(name)) return 'Midea Lighting';
  if (/emtop/i.test(name)) return 'EMTOP';
  if (/ingco/i.test(name)) return 'INGCO';
  if (/smart technology/i.test(name)) return 'SMART TECHNOLOGY';
  if (/force/i.test(name)) return 'FORCE';
  if (/schneider/i.test(name)) return 'Schneider Electric';
  return 'Pèrôkadô';
}

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url?.startsWith('http') ? item.url : `${SITE_URL}${item.url || '/'}`,
    })),
  };
}

export function buildStoreItemListSchema(products, categories) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: products.length,
    itemListElement: products.slice(0, 60).map((product, index) => {
      const cat = categories.find((c) => c.id === product.category);
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: product.name,
        url: `${SITE_URL}/produit/${encodeURIComponent(product.slug || product.id)}`,
        item: {
          '@type': 'Product',
          name: product.name,
          image: `${SITE_URL}${product.imageUrl || ''}`,
          category: cat?.label || product.category,
          offers: {
            '@type': 'Offer',
            price: String(product.price),
            priceCurrency: 'XOF',
            availability:
              Number(product.stock) > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
          },
        },
      };
    }),
  };
}

/**
 * Injecte (ou remplace) un bloc JSON-LD identifié dans le <head>.
 * Utilisé côté client après chargement du catalogue.
 */
export function injectJsonLd(id, schema) {
  if (typeof document === 'undefined') return;
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(schema);
}

export { SITE_URL, safeJson };
