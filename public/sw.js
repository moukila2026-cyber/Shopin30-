// ==============================================================================
// PÈRÔKADÔ — Service Worker (PWA)
// Stratégies :
//  - App shell + assets buildés : cache-first avec mise à jour en arrière-plan
//  - Images produits : stale-while-revalidate (data chère en Côte d'Ivoire)
//  - API : network-first avec repli sur cache (catalogue consultable hors ligne)
// ==============================================================================

const VERSION = 'pkd-v1';
const SHELL_CACHE = `${VERSION}-shell`;
const IMG_CACHE = `${VERSION}-img`;
const API_CACHE = `${VERSION}-api`;

const SHELL_ASSETS = ['/', '/manifest.webmanifest', '/images/icon-192.png', '/images/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // API catalogue : network-first, cache de secours (utile en zone à réseau faible)
  if (url.pathname.startsWith('/api/catalog')) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(API_CACHE).then((c) => c.put(request, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Autres API : jamais mises en cache
  if (url.pathname.startsWith('/api/')) return;

  // Images produits : stale-while-revalidate
  if (url.pathname.startsWith('/images/')) {
    event.respondWith(
      caches.open(IMG_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const network = fetch(request)
          .then((res) => {
            if (res.ok) cache.put(request, res.clone()).catch(() => {});
            return res;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // Navigations et assets : cache-first puis réseau
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((res) => {
          if (res.ok && (request.destination === 'script' || request.destination === 'style')) {
            const copy = res.clone();
            caches.open(SHELL_CACHE).then((c) => c.put(request, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => {
          if (request.mode === 'navigate') return caches.match('/');
          return Response.error();
        });
    })
  );
});
