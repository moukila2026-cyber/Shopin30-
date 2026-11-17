// ==============================================================================
// PÈRÔKADÔ — Script d'initialisation explicite de la base Neon (`npm run db:init`)
// ==============================================================================
import { createDatabaseAdapter, createStore } from '../server/store.js';

const conn = (
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.NEON_DATABASE_URL ||
  ''
).trim();

if (!conn) {
  console.error(
    'Erreur : DATABASE_URL est absente. Définissez votre chaîne de connexion Neon avant de lancer `npm run db:init`.'
  );
  process.exit(1);
}

try {
  const store = createStore(() => createDatabaseAdapter(conn));
  await store.ensureReady();
  const health = await store.healthCheck();
  console.log('Base Neon initialisée avec succès :', health);
  await store.close();
  process.exit(0);
} catch (err) {
  console.error('Échec de l’initialisation Neon :', err?.code || err?.message || 'Erreur inconnue');
  process.exit(1);
}
