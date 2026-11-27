// Mise en avant éditoriale : les autres rayons conservent leur ordre d'origine.
const priority = new Map([['all', 0], ['jouets-enfants', 1], ['mode', 2]]);
export function orderFestiveCategories(categories) {
  return [...categories].sort((a, b) => (priority.get(a.id) ?? 3) - (priority.get(b.id) ?? 3));
}
