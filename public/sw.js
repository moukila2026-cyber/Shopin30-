// PWA : une navigation en ligne doit toujours recevoir le HTML de la version
// courante, jamais un ancien shell pointant vers des fichiers supprimés.
const VERSION = 'pkd-v2';
const SHELL_CACHE = `${VERSION}-shell`;
const IMG_CACHE = `${VERSION}-img`;
const API_CACHE = `${VERSION}-api`;

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    // Ne pas toucher aux éventuels caches d'autres applications du domaine.
    await Promise.all(keys.filter((key) => key.startsWith('pkd-') && !key.startsWith(VERSION)).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        // Seul le shell de la boutique est mis en cache, jamais l'administration.
        if (response.ok && !/^\/(admin|gestion)(\/|$)/.test(url.pathname)) {
          const cache = await caches.open(SHELL_CACHE);
          await cache.put('/', response.clone()).catch(() => {});
        }
        return response;
      } catch {
        if (/^\/(admin|gestion)(\/|$)/.test(url.pathname)) return Response.error();
        return (await (await caches.open(SHELL_CACHE)).match('/')) || Response.error();
      }
    })());
    return;
  }

  if (url.pathname.startsWith('/api/catalog')) {
    event.respondWith((async () => {
      const cache = await caches.open(API_CACHE);
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone()).catch(() => {});
        return response;
      } catch {
        return (await cache.match(request)) || Response.error();
      }
    })());
    return;
  }
  if (url.pathname.startsWith('/api/')) return;

  if (url.pathname.startsWith('/images/')) {
    event.respondWith((async () => {
      const cache = await caches.open(IMG_CACHE);
      const cached = await cache.match(request);
      const network = fetch(request).then((response) => {
        if (response.ok && (response.headers.get('content-type') || '').startsWith('image/')) {
          cache.put(request, response.clone()).catch(() => {});
        }
        return response;
      }).catch(() => cached || Response.error());
      return cached || network;
    })());
    return;
  }
  // Vite produit des noms de fichiers avec empreinte. Ne pas conserver des
  // réponses HTML de repli comme s'il s'agissait de JavaScript ou de CSS.
});
