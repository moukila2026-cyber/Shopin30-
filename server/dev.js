// ==============================================================================
// PÈRÔKADÔ — Serveur de développement unifié (API Express + Vite HMR sur 0.0.0.0)
// Séparation stricte : index.html (Boutique client) vs admin.html (Seller Central)
// ==============================================================================
import http from 'node:http';
import { createServer as createViteServer } from 'vite';
import { createApp } from './app.js';
import { createDatabaseAdapter, createStore } from './store.js';

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';

const store = createStore(() => createDatabaseAdapter());
await store.ensureReady();

const app = createApp({
  store,
  production: false,
  serveStatic: false,
});

const httpServer = http.createServer(app);

const vite = await createViteServer({
  server: {
    middlewareMode: true,
    allowedHosts: true,
    hmr: {
      server: httpServer,
    },
  },
  appType: 'mpa',
});

// Réécriture interne pour servir l'application d'administration distincte (admin.html)
app.use((req, res, next) => {
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '')
    .split(',')[0]
    .trim()
    .toLowerCase();
  const isAdminHost = host.startsWith('admin.') || host.includes('perokado-admin');
  const isAdminPath =
    req.path === '/admin' ||
    req.path.startsWith('/admin/') ||
    req.path === '/gestion' ||
    req.path.startsWith('/gestion/');

  if (
    !req.path.startsWith('/api') &&
    !req.path.startsWith('/src/') &&
    !req.path.startsWith('/@') &&
    !req.path.startsWith('/node_modules/') &&
    !req.path.includes('.')
  ) {
    if (isAdminHost || isAdminPath) {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
      req.url = '/admin.html';
    } else {
      req.url = '/index.html';
    }
  }
  next();
});

app.use(vite.middlewares);

httpServer.listen(PORT, HOST, () => {
  console.log(`Pèrôkadô (Boutique + Console Seller Central distincte) prêt sur http://${HOST}:${PORT}`);
});
