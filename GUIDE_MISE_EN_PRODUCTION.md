# Guide d’Exploitation & Architecture Production — Pèrôkadô (`perokado.com`)

Votre boutique e-commerce **Pèrôkadô** est déployée en production et 100% opérationnelle.

---

## 1. Vos Adresses & Numéros Officiels

| Service | Adresse / Numéro officiel | Rôle |
| :--- | :--- | :--- |
| **Boutique publique** | **[https://perokado.com](https://perokado.com)** *(et `www.perokado.com`)* | Catalogue client, Ventes Flash, Panier, Paiement 100% Wave CI & Suivi Code QR |
| **Console Vendeur (Seller Central)** | **[https://perokado.com/gestion](https://perokado.com/gestion)** | Gestion des commandes, ajout/modification de produits & prix FCFA, codes promo, livreurs et paramètres |
| **Numéro Wave Paiements (exclusif)** | **`+225 05 46 69 74 78`** | Réception dédiée uniquement aux paiements Wave des commandes clients |
| **Service Client WhatsApp** | **`+225 05 01 30 33 43`** | Assistance client WhatsApp & suivi après-vente (distinct du numéro d’encaissement Wave) |
| **Santé API & Base Neon** | **[https://perokado.com/api/health](https://perokado.com/api/health)** | Vérification en direct de la connexion PostgreSQL Neon (`"durable": true`) |
| **Webhook Wave Business signé** | `https://perokado.com/api/webhooks/wave` | Confirmation automatique 24h/24 des paiements Wave (`checkout.session.completed`) |

---

## 2. Sécurité & Variables Chiffrées sur Vercel (Zéro clé dans le code)

Aucune clé secrète n’est présente dans le dépôt GitHub (`.env` et `.env.*` sont ignorés). Tous vos secrets sont stockés en mode **`Sensitive` (chiffré)** dans **Vercel → Projet `perokado` → Settings → Environment Variables** :

- `DATABASE_URL` *(Sensitive)* : Base de données durable **Neon PostgreSQL**.
- `ADMIN_PASSWORD` *(Sensitive)* : Mot de passe principal de connexion à `/gestion`.
- `SESSION_SECRET` *(Sensitive)* : Clé HMAC-SHA256 de signature des sessions administrateur/agents.
- `WHATSAPP_NUMBER` : `2250501303343` *(Service client WhatsApp)*.
- `WAVE_PHONE` : `+225 05 46 69 74 78` *(Numéro Wave dédié aux paiements)*.
- `WAVE_API_KEY` & `WAVE_WEBHOOK_SECRET` *(Sensitive, dès activation de votre API Wave Business CI)* : Encaissement 100% automatique sans intervention humaine.
- `PUBLIC_ORIGIN` : `https://perokado.com`.

---

## 3. Gestion Quotidienne des Produits & Tarifs de Livraison

### Modifier un prix ou ajouter un produit
1. Connectez-vous sur **`https://perokado.com/gestion`** → onglet **Catalogue**.
2. Cliquez sur **Modifier** sur n’importe quel article ou cliquez sur **+ Nouveau produit**.
3. Téléversez directement la photo depuis votre téléphone ou ordinateur (vérification binaire anti-faux fichiers et sauvegarde durable dans Neon PostgreSQL).

### Règles automatiques de livraison (Aucune livraison gratuite)
- **Colis standards** *(petit électroménager, téléphones, mode, parfums…)* :
  - Daloa Commune : **1 000 FCFA**
  - Daloa Périphérie : **1 500 FCFA**
  - Expédition hors de Daloa (Issia, Vavoua, Zoukougbeu, Bouaflé, Sinfra, Gagnoa…) : **2 000 FCFA**
- **Produits lourds / volumineux** *(motos, tricycles, lave-linge, lavantes-séchantes, gazinières/cuisinières, réfrigérateurs, vitrines, congélateurs, climatiseurs, ou case **« Produit lourd / volumineux »** cochée dans `/gestion`)* :
  - Livraison dans tout Daloa (Commune & Périphérie) : **2 500 FCFA**
  - Expédition hors de Daloa : **5 000 FCFA**

---

## 4. Encaissements 100% Wave Côte d’Ivoire (`+225 05 46 69 74 78`)

1. **Mode Wave Direct (actif immédiatement)** : Le client règle exactement le montant affiché en FCFA (0 F de surcoût agrégateur) vers votre numéro Wave dédié **`+225 05 46 69 74 78`**, indique sa référence Wave et reçoit immédiatement son **Code QR de suivi en direct**.
2. **Mode Wave Business 100% Automatique (`business.wave.com/dev-portal`)** : Dès que vous ajoutez `WAVE_API_KEY` et `WAVE_WEBHOOK_SECRET` dans Vercel (sans cocher IP Whitelisting), l’application Wave du client s’ouvre automatiquement avec le montant exact verrouillé et sa commande passe toute seule en **« Préparation »** dès confirmation du paiement.
