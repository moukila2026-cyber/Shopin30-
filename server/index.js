// ==============================================================================
// PÈRÔKADÔ — Serveur de production autonome Node.js (`npm start`)
// ==============================================================================
import { createApp } from './app.js';
import { createDatabaseAdapter, createStore } from './store.js';

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';

const store = createStore(() => createDatabaseAdapter());
await store.ensureReady();

const app = createApp({
  store,
  production: process.env.NODE_ENV === 'production',
  serveStatic: true,
});

app.listen(PORT, HOST, () => {
  console.log(`Pèrôkadô en écoute sur http://${HOST}:${PORT}`);
});
