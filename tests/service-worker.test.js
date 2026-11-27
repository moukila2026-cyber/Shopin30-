import { test } from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

async function setup(fetchFn) {
  const handlers = {};
  const entries = new Map();
  const cache = { match: async (key) => entries.get(typeof key === 'string' ? key : key.url), put: async (key, value) => { entries.set(typeof key === 'string' ? key : key.url, value); } };
  const deleted = [];
  const caches = { open: async () => cache, keys: async () => ['pkd-v1-shell', 'other-app-cache'], delete: async (key) => { deleted.push(key); } };
  const self = { location: { origin: 'https://perokado.com' }, clients: { claim: async () => {} }, skipWaiting: async () => {}, addEventListener: (event, cb) => { handlers[event] = cb; } };
  vm.runInNewContext(await readFile(new URL('../public/sw.js', import.meta.url), 'utf8'), { self, caches, URL, Response, fetch: fetchFn });
  return { handlers, entries, deleted };
}

test('Service worker utilise la navigation réseau et garde un secours hors ligne', async () => {
  let online = true;
  const {handlers, entries, deleted} = await setup(async () => {
    if (!online) throw Error('hors ligne');
    return new Response('nouveau site');
  });
  let activation;
  handlers.activate({waitUntil: (p) => { activation = p; }});
  await activation;
  assert.deepEqual(deleted, ['pkd-v1-shell']);
  entries.set('/', new Response('ancienne version'));
  const navigate = async (path) => {
    let promise;
    handlers.fetch({request: {method: 'GET', mode: 'navigate', url: `https://perokado.com${path}`}, respondWith: (p) => { promise = p; }});
    return await promise;
  };
  assert.equal(await (await navigate('/')).text(), 'nouveau site');
  online = false;
  assert.equal(await (await navigate('/rayon/jouets-enfants')).text(), 'nouveau site');
  assert.equal((await navigate('/gestion')).type, 'error');
});

test('Service worker ne garde pas en cache des erreurs API', async () => {
  const { handlers, entries } = await setup(async () => new Response('erreur', {status: 500}));
  let promise;
  handlers.fetch({request: {method: 'GET', mode: 'cors', url: 'https://perokado.com/api/catalog'}, respondWith: (p) => {promise = p;}});
  assert.equal((await promise).status, 500);
  assert.equal(entries.size, 0);
});
