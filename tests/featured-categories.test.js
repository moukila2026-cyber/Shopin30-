import { test } from 'node:test';
import assert from 'node:assert/strict';
import { orderFestiveCategories } from '../src/lib/featuredCategories.js';

test('Les jouets et la mode précèdent les autres rayons sans les supprimer', () => {
  const source = ['all', 'quincaillerie-btp', 'mode', 'froid', 'jouets-enfants'].map((id) => ({ id }));
  assert.deepEqual(orderFestiveCategories(source).map((c) => c.id), ['all', 'jouets-enfants', 'mode', 'quincaillerie-btp', 'froid']);
  assert.equal(source[1].id, 'quincaillerie-btp');
});
