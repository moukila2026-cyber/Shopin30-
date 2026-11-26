# Pèrôkadô — Boutique E-Commerce (Daloa & Villes aux alentours)

Plateforme e-commerce multi-catégories complète, rapide et sécurisée conçue pour **Daloa et les villes environnantes** (Issia, Vavoua, Zoukougbeu, Bouaflé, Sinfra, Gagnoa, Soubré, Duékoué, Séguéla).

Propulsée par **React 19 + Vite + Tailwind CSS 4** côté interface, **Express 5** en fonction Serverless Vercel (`/api/*`) et **PostgreSQL (Neon)** pour la persistance transactionnelle durable (avec repli automatique sur **PGlite** en développement local).

---

## Fonctionnalités Clés

### Boutique Publique (`/`)
- **Multi-catégories** : High-Tech & Téléphonie, Mode & Accessoires, Beauté/Parfums & Cadeaux, Maison & Électroménager (modifiable et extensible depuis `/admin`).
- **Rayon Vaisselle & Art de la table** : porcelaine GRAAL Germany, Wilmax England et Tableware Gourmet, coffrets de 6 verres LAV (NevaKar 320 cc, Misket 390 cc), carafe Azur, panier à frire inox et lunch box inox JIA TENG 2,2 L.
- **Rayon Maison & Cuisine — 2ᵉ arrivage** : lunch box inox JIA TENG 3,4 L, bol à soupe Wilmax WL-991225/A (440 ml, 2 anses), coffrets de verres Pasabahce Golden Touch Iconic et Sisecam (6 × 280 ml), gobelet dégradé 600 ml avec paille, tumblers isothermes STANLEY NOVA et pailleté « Living in Full Color », mason jar mugs (à l’unité et lot de 3), thermos inox Daristore 304 SUS 2 L, étagère plastique 4 niveaux TAJ PLAST et lot de 3 tasses « Coffee House ».
- **Rayon Maison & Cuisine — 3ᵉ arrivage (tasses & mugs)** : coffrets de 3 tasses « coffee » et de 4 tasses à café porcelaine 9 cl, tasse en verre double paroi Wilmax WL-888420/A, tasse Luminarc Flashy Lavande 8 cl, mug Luminarc Flashy Neo Gold, mugs et lot de 3 en grès motif vague, mug porcelaine Colorado bleu, duos de mugs blancs, pastel et peints à la main.
- **Rayon Maison & Cuisine — 4ᵉ arrivage (mugs déco)** : mug « maison en pain d'épices » de Noël, mug 2 tons menthe & bleu 280 ml, mug céramique 420 ml motif géométrique terracotta, mug grès « Coffee » et duo de mugs décor visage au trait.
- **Rayon Maison & Cuisine — 5ᵉ arrivage (mugs, tasses & verrerie)** : duos de mugs côtelés 2 tons et grès camel/marron, mug porcelaine 2 tons rayé, duos de mugs blancs (relief liseré or, texturé), duo de tasses facettées, bocaux en verre avec couvercle, carafe rayée 1 L, pichet Luminarc CHEOS 1,3 L, carafe Luminarc ARC 1,3 L, carafe en verre à motifs et bouteille décor citrons.
- **Photos produits « studio »** : chaque arrivage est retraité par `scripts/enhance-studio-photos.js` (correction du vignettage, balance des blancs, détourage progressif, ombre portée, fond blanc 1200 × 1200) pour des fiches produit nettes et uniformes, dans l’esprit des marketplaces. Le script expose deux jeux de cadrages : `node scripts/enhance-studio-photos.js vaisselle` (lot 1) et `node scripts/enhance-studio-photos.js arttable` (lot 2) et `node scripts/enhance-studio-photos.js tasses` (lot 3) ou `tasses2` (lot 4).
- **Tarification claire sans livraison gratuite** :
  - **Daloa Commune** : `1 000 FCFA`
  - **Daloa Périphérie** : `1 500 FCFA`
  - **Expédition vers Issia, Vavoua, Zoukougbeu, Bouaflé, Sinfra & autres villes** : `2 000 FCFA`
  - Mention explicite que le tarif dépend de la taille et du poids de la marchandise, avec lien direct vers le **Service Client**.
- **Paiement en ligne uniquement par Wave** : instructions Wave claires (numéro marchand copiable + lien Wave Business optionnel), saisie du numéro Wave émetteur et de l’ID de transaction Wave.
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
