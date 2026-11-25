# Guide d’Exploitation & Architecture Production — Pèrôkadô (`perokado.com`)

Votre boutique e-commerce **Pèrôkadô** est déployée en production et 100% opérationnelle.

---

## 1. Vos Adresses Officielles

| Service | Adresse officielle | Rôle |
| :--- | :--- | :--- |
| **Boutique publique** | **[https://perokado.com](https://perokado.com)** *(et `www.perokado.com`)* | Catalogue client, Ventes Flash, Panier, Paiement SasPay/Wave & Suivi Code QR |
| **Console Vendeur (Seller Central)** | **[https://perokado.com/gestion](https://perokado.com/gestion)** | Gestion des commandes, ajout/modification de produits & prix FCFA, codes promo, livreurs et paramètres |
| **Santé API & Base Neon** | **[https://perokado.com/api/health](https://perokado.com/api/health)** | Vérification en direct de la connexion PostgreSQL Neon (`"durable": true`) |
| **Webhook SasPay signé** | `https://perokado.com/api/webhooks/saspay` | Confirmation automatique instantanée des paiements (`transaction.success`) |

---

## 2. Sécurité & Variables Chiffrées sur Vercel (Zéro clé dans le code)

Aucune clé secrète n’est présente dans le dépôt GitHub (`.env` et `.env.*` sont ignorés). Tous vos secrets sont stockés en mode **`Sensitive` (chiffré)** dans **Vercel → Projet `perokado` → Settings → Environment Variables** :

- `DATABASE_URL` *(Sensitive)* : Base de données durable **Neon PostgreSQL**.
- `ADMIN_PASSWORD` *(Sensitive)* : Mot de passe principal de connexion à `/gestion`.
- `SESSION_SECRET` *(Sensitive)* : Clé HMAC-SHA256 de signature des sessions administrateur/agents.
- `SASPAY_API_KEY` *(Sensitive)* : Clé Live SasPay (`PAYIN`) pour l’encaissement instantané Mobile Money / Wave CI.
- `SASPAY_WEBHOOK_SECRET` *(Sensitive)* : Secret HMAC-SHA256 vérifiant l’authenticité et l’horodatage (`≤ 300s`) des webhooks SasPay.
- `PUBLIC_ORIGIN` : `https://perokado.com`.

---

## 3. Gestion Quotidienne des Produits & Tarifs de Livraison

### Modifier un prix ou ajouter un produit
1. Connectez-vous sur **`https://perokado.com/gestion`** → onglet **Catalogue**.
2. Cliquez sur **Modifier** sur n’importe quel article **SMART TECHNOLOGY** ou cliquez sur **+ Nouveau produit**.
3. Téléversez directement la photo depuis votre téléphone ou ordinateur (vérification binaire anti-faux fichiers et sauvegarde durable dans Neon PostgreSQL).

### Règles automatiques de livraison (Aucune livraison gratuite)
- **Colis standards** *(petit électroménager, téléphones, mode, parfums…)* :
  - Daloa Commune : **1 000 FCFA**
  - Daloa Périphérie : **1 500 FCFA**
  - Expédition hors de Daloa (Issia, Vavoua, Zoukougbeu, Bouaflé, Sinfra, Gagnoa…) : **2 000 FCFA**
- **Produits lourds / volumineux** *(lave-linge, lavantes-séchantes, gazinières/cuisinières, réfrigérateurs, vitrines, congélateurs, climatiseurs, ou case **« Produit lourd / volumineux »** cochée dans `/gestion`)* :
  - Livraison dans tout Daloa (Commune & Périphérie) : **2 500 FCFA**
  - Expédition hors de Daloa : **5 000 FCFA**

---

## 4. Encaissements SasPay & Retraits Groupés vers Wave (`05 01 30 33 43`)

1. **Côté client** : Lors de la validation du panier, le client est redirigé vers `pay.saspay.me`, règle en Francs CFA (`XOF`), puis revient automatiquement sur son reçu **Code QR** déjà validé en statut **« Préparation »**.
2. **Côté commerçant (Retrait groupé recommandé)** :
   - Les paiements nets s’accumulent en temps réel sur votre **Portefeuille XOF** dans **[https://app.saspay.me](https://app.saspay.me)**.
   - Quand vous le souhaitez (ex. chaque soir), ouvrez **[app.saspay.me](https://app.saspay.me)** → **Portefeuille / Retraits** et transférez votre solde groupé vers votre numéro Wave **`+225 05 01 30 33 43`** (`wave_ci`).
