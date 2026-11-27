# Pèrôkadô — Boutique E-Commerce (Daloa & Villes aux alentours)

Plateforme e-commerce multi-catégories complète, rapide et sécurisée conçue pour **Daloa et les villes environnantes** (Issia, Vavoua, Zoukougbeu, Bouaflé, Sinfra, Gagnoa, Soubré, Duékoué, Séguéla).

Propulsée par **React 19 + Vite + Tailwind CSS 4** côté interface, **Express 5** en fonction Serverless Vercel (`/api/*`) et **PostgreSQL (Neon)** pour la persistance transactionnelle durable (avec repli automatique sur **PGlite** en développement local).

---

## Fonctionnalités Clés

### Boutique Publique (`/`)
- **Multi-catégories** : High-Tech & Téléphonie, Mode & Accessoires, Beauté/Parfums & Cadeaux, Maison & Électroménager (modifiable et extensible depuis `/admin`).
- **Tarification claire sans livraison gratuite** :
  - **Daloa Commune** : `1 000 FCFA`
  - **Daloa Périphérie** : `1 500 FCFA`
  - **Expédition vers Issia, Vavoua, Zoukougbeu, Bouaflé, Sinfra & autres villes** : `2 000 FCFA`
  - Mention explicite que le tarif dépend de la taille et du poids de la marchandise, avec lien direct vers le **Service Client**.
- **Paiement exclusivement par Wave Côte d’Ivoire** : le client paie depuis son application puis saisit sa référence pour vérification ; le paiement peut aussi s’ouvrir via l’API Wave Business lorsqu’elle est configurée.
- **Supplément quartier à Daloa** : grille de 16 quartiers (Lobia, Tazibouo, Commerce, Kennedy, Orly, Zakoua, Gonaté, Bédiala…) appliquant 0 à 250 F de supplément sur le tarif commune ou périphérie.
- **Avis clients réels modérés** : formulaire de dépôt sur chaque fiche produit, mention « achat vérifié » automatique si la référence de commande correspond, publication après validation dans la console Seller Central. Aucune note n'est générée artificiellement.
- **PWA installable** : manifest + service worker (cache du shell, images en stale-while-revalidate, catalogue en network-first) et raccourcis panier / suivi / rayon BTP.
- **SEO local** : JSON-LD `OnlineStore`, `WebSite`, `Product`, `BreadcrumbList`, `ItemList` ; sitemap de 292 URL (`/produit/:slug`, `/rayon/:id`, `/ville/:slug`) ; 8 pages villes avec contenu local et maillage interne.
- **Chargement progressif** : 24 produits par page avec bouton « Afficher plus », images WebP 400/800 px en `srcset`, bundle découpé (react / icons / qrcode / catalogue).
- **Génération immédiate de Référence + Code QR de suivi en direct** :
  - Chaque commande génère une référence `PKD-XXXXXX` et un **Code QR téléchargeable** intégrant un jeton cryptographique sécurisé.
  - En scannant son Code QR à tout moment, le client ouvre instantanément le suivi en temps réel de sa marchandise (rafraîchissement automatique en direct).

### Back-Office Complet (`/admin`)
- **Double niveau d’accès (RBAC)** :
  - **Administrateur principal** (`ADMIN_PASSWORD`) : accès complet (commandes, catalogue, prix, stocks, photos binaires stockées dans Neon, codes promo, création/révocation d’agents, tarifs de livraison et paramètres).
  - **Agents / Livreurs** (`PKD-XXXX-XXXX`) : codes personnels générés en 1 clic et révocables instantanément ; gèrent le traitement et la livraison des commandes sans pouvoir altérer les prix ni supprimer des produits.
- **Gestion transactionnelle des stocks** :
  - Réservation atomique `SELECT ... FOR UPDATE` à la commande (zéro survente).
  - Restitution automatique du stock si une commande non livrée est annulée.
  - Verrouillage strict : une commande marquée **Livrée** ne peut plus être annulée (`409 Conflict`).

### Sécurité Renforcée
- **Recalcul intégral côté serveur** : aucun montant envoyé par le navigateur n’est accepté tel quel.
- **Sessions signées HMAC-SHA256** (`HttpOnly`, `SameSite=Lax`, `Secure` en HTTPS) + comparaison du mot de passe en temps constant (`crypto.timingSafeEqual`).
- **Protection CSRF Same-Origin** sur toutes les routes mutantes (`POST`, `PUT`, `PATCH`, `DELETE`).
- **Limitation de débit (`express-rate-limit`)** sur la connexion `/admin`, la validation de commandes et le suivi de colis.
- **Validation stricte des entrées (`Zod v4`)** et vérification des signatures binaires (*magic bytes* JPG/PNG/WebP) lors de l’upload de photos produits.
- **En-têtes HTTP durcis (`Helmet` + `vercel.json`)** : CSP, `X-Content-Type-Options: nosniff`, `X-Robots-Tag: noindex` sur `/admin`.

---

## Démarrage Rapide en Local

```bash
npm install
npm run dev
```

- Boutique publique : `http://localhost:3000`
- Back-office : `http://localhost:3000/admin` (en local sans `.env`, mot de passe de démo : `perokado-demo-admin`)
- Lancer les tests automatisés : `npm test`
- Vérifier le build de production : `npm run build`

Pour le déploiement complet étape par étape (GitHub + Neon + Vercel), consultez **[GUIDE_MISE_EN_PRODUCTION.md](./GUIDE_MISE_EN_PRODUCTION.md)**.
