# Pèrôkadô — Boutique E-Commerce (Daloa & Villes aux alentours)

Plateforme e-commerce multi-catégories complète, rapide et sécurisée conçue pour **Daloa et les villes environnantes** (Issia, Vavoua, Zoukougbeu, Bouaflé, Sinfra, Gagnoa, Soubré, Duékoué, Séguéla).

Propulsée par **React 19 + Vite + Tailwind CSS 4** côté interface, **Express 5** en fonction Serverless Vercel (`/api/*`) et **PostgreSQL (Neon)** pour la persistance transactionnelle durable (avec repli automatique sur **PGlite** en développement local).

---

## Fonctionnalités Clés

### Boutique Publique (`/`)
- **Multi-catégories** : High-Tech & Téléphonie, Mode & Accessoires, Beauté/Parfums & Cadeaux, Maison & Électroménager (modifiable et extensible depuis `/admin`).
- **Panier intelligent & Favoris persistants** : jauge de livraison gratuite automatique (offerte dès 50 000 FCFA par défaut, paramétrable).
- **Codes promotionnels** : validation en direct en FCFA ou en pourcentage (`BIENVENUE10`, `DALOA2000`, et vos propres codes).
- **Tarification par ville/zone** : Daloa Commune, Daloa Périphérie, Issia, Vavoua, Zoukougbeu, Bouaflé/Sinfra, Gagnoa/Soubré/Duékoué/Séguéla, ou Retrait gratuit sur place.
- **Commande sans création de compte fastidieuse** : choix du créneau horaire, paiement à la livraison (Espèces, Wave, Orange Money, MTN/Moov), référence unique `PKD-XXXXXX` et bouton d’envoi du récapitulatif **WhatsApp** prérempli.
- **Suivi de colis en direct** : recherche sécurisée par couple `(Référence commande + Téléphone client)`.

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
