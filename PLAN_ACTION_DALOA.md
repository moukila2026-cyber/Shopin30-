> **Mise à jour :** ce plan est historique. PEROKADO accepte désormais uniquement Wave Côte d’Ivoire ; les autres moyens de paiement évoqués ci-dessous ne sont plus proposés.

# Pèrôkadô n°1 à Daloa — ce qui est fait et ce qu'il vous reste à faire

> Dernière mise à jour : 27 novembre 2026 · PR #27 mergée (`f131c0f`) · déploiement Vercel production `READY`

---

## Partie 1 — Ce que j'ai appliqué (15 points de l'audit)

| # | Point de l'audit | Statut |
|---|---|---|
| 1 | Orange Money / MTN MoMo / Moov Money manquants | Fait — ajoutés avec instructions USSD (#144#, *133#, *155#) |
| 2 | Pas de paiement à la livraison | Fait — espèces, **Daloa commune + périphérie uniquement** |
| 3 | Pas de stock temps réel | Partiel — réservation atomique déjà en place ; le multi-entrepôt demande un chantier séparé |
| 4 | Avis générés artificiels | Fait — plus aucune note inventée, vrais avis + modération + « achat vérifié » |
| 5 | Pas de pagination | Fait — 24 produits par page + « Afficher plus » |
| 6 | Images 37 Mo / 4032 px | Fait — 552 WebP (400 px ≈ 10 Ko, 800 px ≈ 34 Ko) en srcset |
| 7 | Bundle 492 Ko | Fait — react-vendor / icons / qrcode / catalog-data, max 275 Ko |
| 8 | Aucun JSON-LD | Fait — OnlineStore, WebSite, Product, BreadcrumbList, ItemList |
| 9 | Sitemap 2 URL / ancres | Fait — **292 URL** + routage réel /produit/:slug, /rayon/:id, /ville/:slug |
| 10 | Pas de PWA | Fait — manifest, icônes 192/512/maskable, service worker |
| 11 | Pas de pages villes | Fait — **8 pages villes** au contenu local unique |
| 12 | WhatsApp pas en wa.me / pas de Google Business | wa.me OK partout ; Google Business : à créer par vous (étape F) |
| 13 | Tarifs fixes par zone | Fait — 16 quartiers de Daloa, supplément 0 à 250 F |
| 14 | Suivi QR à mettre en avant | Fait — rappel dans cartes, footer, pages villes |
| 15 | Pas de relance panier | Fait — capture auto + onglet admin avec WhatsApp pré-rempli |

**Tests** : `npm test` → 14/14 · **Build** : OK · **Prod Vercel** : `dpl_ECmoovPtESpxU9Ygu3JN4MTs9Wem` en `READY`.

---

## Partie 2 — Ce que vous devez faire vous-même

### Étape A — Vérifier le déploiement (5 min)

1. Ouvrez **https://shopin30-market.vercel.app/api/health** : devez voir `"durable": true`.
2. Ouvrez **https://shopin30-market.vercel.app/sitemap.xml** : 292 balises `<loc>`.
3. Ouvrez **https://shopin30-market.vercel.app/ville/daloa** : la page ville s'affiche.
4. Ouvrez **https://shopin30-market.vercel.app/produit/bouilloire-inox-2l** : fiche directe.
5. Sur smartphone : Chrome → « Ajouter à l'écran d'accueil » → icône Pèrôkadô.

> Depuis mon sandbox l'accès réseau sortant est limité : je n'ai pas pu ouvrir ces URL. Le déploiement est `READY` côté Vercel, **c'est à vous de confirmer visuellement**.

### Étape B — Domaine perokado.com (10 min)

Le projet Vercel `shopin30-market` n'a **qu'un seul domaine** : `shopin30-market.vercel.app`. `perokado.com` n'est pas branché.

1. Vercel → projet `shopin30-market` → **Settings → Domains** → *Add* `perokado.com`.
2. Ajoutez `www.perokado.com` (redirect 308 vers l'apex).
3. Chez votre registrar (Namecheap / Hostinger / OVH…) :
   - enregistrement `A` → `76.76.21.21` pour `@`
   - `CNAME` → `cname.vercel-dns.com` pour `www`
4. Attendez la propagation (5 min à 24 h) puis vérifiez le cadenas HTTPS.

### Étape C — Comptes marchands Mobile Money (1 à 3 semaines, le plus long)

Aujourd'hui les 4 moyens fonctionnent en **mode déclaratif** : le client paie sur `+225 05 46 69 74 78` puis saisit sa référence. Pour automatiser :

1. **Wave Business** (gratuit, le plus rapide) : https://business.wave.com
   - Récupérez `WAVE_API_KEY`, `WAVE_WEBHOOK_SECRET`, `WAVE_SIGNING_SECRET`.
   - Webhook : `https://perokado.com/api/webhooks/wave` (événement `checkout.session.completed`).
   - Ajoutez les 3 clés dans Vercel → Settings → Environment Variables → Production, puis **Redeploy**.
2. **Orange Money** : agence Orange ou https://business.orange.ci, contrat « Orange Money Marchand ». Pièces : RCCM, DFE, CNI du gérant. Délai 1 à 3 semaines.
3. **MTN MoMo** : https://momo.mtn.ci, espace marchand, même dossier.
4. **Moov Money** : agence Moov Africa CI, contrat marchand.

> Tant que ces comptes ne sont pas ouverts, **le site fonctionne** : le client paie, saisit sa référence, vous vérifiez et passez la commande en « Préparation ».

### Étape D — Supabase (optionnel, 20 min)

La base est déjà sur **Neon** (`DATABASE_URL` présent en Production et Development). Supabase n'est utile que pour du stockage de photos ou des sauvegardes supplémentaires. Dans ce cas : nouveau projet Supabase → SQL Editor → collez le contenu de `server/schema.js` → récupérez la chaîne `postgresql://…` → remplacez `DATABASE_URL` sur Vercel.

### Étape E — Google Search Console (15 min, priorité haute)

1. https://search.google.com/search-console → *Ajouter une propriété* → **Préfixe d'URL** → `https://perokado.com`.
2. Validation par **Balise HTML** : copiez la balise, collez-la dans `index.html` avant `</head>`, redeployez, cliquez *Vérifier*.
3. **Sitemaps** → soumettre `sitemap.xml`.
4. Dans 3 à 7 jours : **Performances** → filtrez « daloa ».

### Étape F — Google Business Profile (30 min + vérification, levier n°1 du « près de moi »)

1. https://business.google.com → *Ajouter un établissement*.
2. Nom exact : **Pèrôkadô** (sans mots-clés ajoutés).
3. Catégorie principale : *Magasin de matériel électrique* ou *Magasin de bricolage*. Secondaires : *Magasin d'électroménager*, *Magasin de jouets*.
4. Adresse exacte à Daloa + zones desservies (les 8 villes).
5. Téléphone `+225 05 01 30 33 43` · Site `https://perokado.com`.
6. Horaires : lundi–samedi 08h00–19h30.
7. **Vérification** Google (courrier, SMS ou vidéo) : 1 à 2 semaines pour un courrier.
8. Après validation : 20 photos minimum (façade, intérieur, rayons, équipe), 1 publication/semaine, et demandez un avis Google à chaque client livré.

### Étape G — Premiers avis clients (en continu)

1. Après chaque livraison, envoyez `https://perokado.com/produit/<slug>` + « Votre avis nous aide ».
2. `/gestion` → onglet **Avis** → publiez les avis reçus (invisibles jusqu'à validation).
3. Objectif : 10 avis Google + 30 avis produits le premier mois.

### Étape H — Exploiter la relance panier (quotidien, 5 min)

`/gestion` → onglet **Panier abandonné** → bouton **Relancer sur WhatsApp** (message déjà rédigé avec les articles). Puis *finalisé* ou *ignoré*.

### Étape I — Logos fabricants (juridique)

Legrand / Midea Lighting / EMTOP sont affichés sur des produits que vous revendez : autorisé **si** vous êtes revendeur officiel. Sinon, demandez l'autorisation écrite du distributeur avant toute campagne payante.

---

## Partie 3 — Ordre recommandé

| Quand | Quoi |
|---|---|
| Aujourd'hui | Étape A (vérifier) + Étape B (domaine) |
| Cette semaine | Étape E (Search Console) + Étape F (Google Business, lancez la vérification) |
| Semaine 2 | Étape C (Wave Business d'abord, puis OM/MTN/Moov) |
| En continu | Étape G (avis) + Étape H (relances) |
| Si besoin | Étape D (Supabase) + Étape I (autorisations marques) |

---

## Fichiers utiles

- `src/lib/router.js` — villes, routes /ville, /rayon, /produit
- `src/lib/seo.js` — générateurs JSON-LD
- `scripts/generate-sitemap.mjs` — à relancer après chaque ajout produit
- `scripts/optimize-images.mjs` — à relancer après chaque nouvel arrivage photo
- `public/sw.js` — incrémenter `VERSION` (`pkd-v1` → `pkd-v2`) à chaque déploiement important
- `server/schema.js` — tables `reviews` et `cart_abandonments`, créées automatiquement au démarrage
