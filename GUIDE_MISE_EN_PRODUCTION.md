# Guide Étape par Étape — Mise en Production de Pèrôkadô (GitHub + Neon + Vercel)

Tout le code de **Pèrôkadô** (boutique, logo, catalogue multi-catégories Daloa & alentours, API sécurisée, back-office `/admin` et tests) est prêt.

De plus, votre projet Vercel existant **`perokado`** a déjà été pré-configuré avec :
- Framework : **Vite** (`npm ci` → `npm run build` → dossier `dist` + API Serverless `/api`)
- `SESSION_SECRET` : **déjà généré et enregistré en mode chiffré** sur Vercel
- `WHATSAPP_NUMBER` : **déjà configuré** (`2250501303343`, modifiable à tout moment dans `/admin`)

Voici **exactement ce qu’il vous reste à faire de votre côté**, dans l’ordre (environ **5 minutes** au total).

---

## Étape 1 — GitHub : Fusionner la branche vers `main`

1. Poussez / ouvrez la **Pull Request** depuis Arena (ou ouvrez votre dépôt GitHub **`moukila2026-cyber/Shopin30-`**).
2. Cliquez sur **Merge pull request** → **Confirm merge** pour basculer tout le code de la branche de travail sur votre branche principale **`main`**.

---

## Étape 2 — Neon (Base de données PostgreSQL gratuite) : Créer la base et copier `DATABASE_URL`

Vous avez **deux méthodes au choix** (choisissez la **Méthode A** si vous voulez aller au plus vite, ou la **Méthode B** directement sur Neon) :

### Méthode A (Ultra-rapide depuis Vercel — 1 minute)
1. Connectez-vous sur [https://vercel.com](https://vercel.com) et ouvrez votre projet **`perokado`**.
2. Cliquez sur l’onglet **Storage** (en haut) → **Create Database** → choisissez **Neon (Serverless Postgres)**.
3. Choisissez la région européenne la plus proche d’Abidjan/Daloa : **Paris (`eu-west-3`)** ou **Frankfurt (`eu-central-1`)**, nommez la base `perokado-db` et validez.
4. Vercel injecte **automatiquement** `DATABASE_URL` dans votre projet `perokado` ! *(Passez directement à l’Étape 3.3).*

### Méthode B (Depuis votre compte Neon — 2 minutes)
1. Allez sur [https://console.neon.tech](https://console.neon.tech) et connectez-vous.
2. Cliquez sur **New Project** :
   - **Project name** : `perokado`
   - **Region** : `AWS Europe (Paris) — eu-west-3` (ou Frankfurt)
   - Cliquez sur **Create project**.
3. Dans la fenêtre **Connection Details** qui s’affiche :
   - Activez l’option **Connection pooling** (recommandé pour Vercel Serverless).
   - Copiez l’URL complète qui commence par `postgresql://...` et se termine par `?sslmode=require`.
   > **Sécurité :** Ne collez jamais cette URL dans un fichier du dépôt GitHub. Elle va uniquement dans Vercel à l’étape suivante.

---

## Étape 3 — Vercel : Relier GitHub, ajouter `ADMIN_PASSWORD` (et `DATABASE_URL`) puis Déployer

1. Ouvrez votre projet **`perokado`** sur [https://vercel.com](https://vercel.com).
2. **Relier le dépôt GitHub `Shopin30-`** :
   - Allez dans **Settings** → **Git**.
   - Cliquez sur **Connect Git Repository** → sélectionnez **`moukila2026-cyber/Shopin30-`** (branche de production : `main`).
   - Toujours dans **Settings → Git**, vérifiez que les déploiements automatiques lors d’un `git push` sont bien activés.
3. **Ajouter vos variables secrètes** dans **Settings** → **Environment Variables** :
   *(Note : `SESSION_SECRET` et `WHATSAPP_NUMBER` y sont déjà configurées !)*

   Ajoutez ces variables en cochant **Production**, **Preview** et **Development** :

   | Nom de la variable | Valeur à mettre | Obligatoire ? |
   | :--- | :--- | :--- |
   | `DATABASE_URL` | Collez l’URL `postgresql://...?sslmode=require` copiée depuis Neon *(inutile si vous avez utilisé la Méthode A)* | **OUI** |
   | `ADMIN_PASSWORD` | Choisissez votre mot de passe secret Administrateur (ex. une phrase robuste de 12+ caractères) | **OUI** |

4. **Lancer le déploiement de mise en ligne** :
   - Allez dans l’onglet **Deployments** de votre projet `perokado`.
   - Cliquez sur **Create Deployment** (sur la branche `main`) ou sur **Redeploy** si un déploiement vient de se lancer.

> **Aucune commande SQL à exécuter !** Dès la toute première visite sur votre site en ligne, Pèrôkadô crée automatiquement toutes les tables PostgreSQL dans Neon (`products`, `product_photos`, `orders`, `promo_codes`, `agents`, `store_settings`, `audit_logs`) et pré-remplit le catalogue de départ sans jamais écraser vos futures modifications.

---

## Étape 4 — Vérification Finale & Prise en Main (2 minutes)

Une fois le déploiement Vercel passé à **Ready** :

1. **Vérifier la connexion Neon** :
   - Ouvrez `https://<votre-domaine-perokado>.vercel.app/api/health`
   - Vous devez voir :
     ```json
     {
       "ok": true,
       "brand": "Pèrôkadô",
       "storage": { "mode": "neon", "durable": true },
       "adminConfigured": true
     }
     ```
2. **Accéder à votre Back-Office sécurisé** :
   - Ouvrez `https://<votre-domaine-perokado>.vercel.app/admin`
   - Connectez-vous avec le `ADMIN_PASSWORD` que vous avez choisi à l’Étape 3.
3. **Personnaliser votre boutique en direct** :
   - **Onglet Catalogue** : remplacez ou ajoutez vos vrais articles, ajustez les prix FCFA, les stocks réels à Daloa et cliquez sur **Photo** pour téléverser les photos de vos produits (stockées directement dans Neon).
   - **Onglet Zones & Paramètres** : ajustez si besoin votre numéro WhatsApp de réception, le seuil de livraison gratuite et les tarifs de livraison (Daloa Commune, Périphérie, Issia, Vavoua, Zoukougbeu, Bouaflé, Sinfra, Gagnoa…).
   - **Onglet Équipe & Codes** : générez un code `PKD-XXXX-XXXX` pour vos vendeurs ou livreurs afin qu’ils suivent et livrent les commandes sans avoir accès à vos réglages administrateur.
