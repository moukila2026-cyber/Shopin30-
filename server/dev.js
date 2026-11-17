// ==============================================================================
// PÈRÔKADÔ — Serveur de développement unifié (API Express + Vite HMR sur 0.0.0.0)
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
  appType: 'spa',
});

app.use(vite.middlewares);

httpServer.listen(PORT, HOST, () => {
  console.log(`Pèrôkadô (Dev + API + PGlite/Neon) prêt sur http://${HOST}:${PORT}`);
});
