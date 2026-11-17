// ==============================================================================
// PÈRÔKADÔ — Fonction Serverless Vercel (routes /api/*)
// ==============================================================================
import { createApp } from '../server/app.js';
import { createDatabaseAdapter, createStore } from '../server/store.js';

let storeInstance = null;

function getStore() {
  if (!storeInstance) {
    storeInstance = createStore(() => createDatabaseAdapter());
  }
  return storeInstance;
}

// Façade paresseuse : n'ouvre la connexion PostgreSQL Neon qu'à l'appel effectif
const lazyStore = new Proxy(
  {},
  {
    get(_target, prop) {
      return (...args) => {
        const s = getStore();
        return s[prop](...args);
      };
    },
  }
);

export default createApp({
  store: lazyStore,
  production: true,
  serveStatic: false,
});
