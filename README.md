# Aménagement Maroc

Site vitrine d’Aménagement Maroc, composé d’un frontend React/Vite et d’une API PHP pour les formulaires de contact et de devis.

## Prérequis

- Node.js 20.19+ ou 22.12+
- npm
- PHP 8.1+
- Composer

## Développement frontend

```bash
npm install
copy .env.example .env
npm run dev
```

`VITE_API_BASE_URL` doit pointer vers l’API PHP en développement. Laisser la valeur vide lorsque le frontend et l’API utilisent le même domaine.

## Backend PHP

```bash
cd php_backend
composer install
copy .env.example .env
php -S localhost:8080 -t public public/index.php
```

Configurer SMTP et `CORS_ORIGINS` dans `php_backend/.env` avant de tester les formulaires.

## Articles et espace administrateur

Les articles sont rédigés avec l’éditeur Quill et stockés en base de données, configurée dans `php_backend/.env` (code : `php_backend/src/Database.php`) :

```ini
# SQLite (défaut) : un simple fichier, aucun serveur à installer
DB_DRIVER=sqlite
DB_PATH=storage/database.sqlite

# ou MySQL / MariaDB (hébergement avec phpMyAdmin)
DB_DRIVER=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=amenagement_maroc
DB_USER=utilisateur
DB_PASS=mot_de_passe
```

Les tables sont créées automatiquement à la première connexion.

Exporter la base (fichier `.sql` compatible MySQL / phpMyAdmin, dans `php_backend/storage/exports/`) :

```bash
cd php_backend
php bin/export-db.php              # admins + articles
php bin/export-db.php --no-admins  # articles seulement
```

Pour passer en MySQL : créer la base, importer le fichier exporté (phpMyAdmin > Importer), puis mettre `DB_DRIVER=mysql` et les identifiants dans `.env`.

- Pages publiques : `/articles` et `/articles/:slug` (`/blog` redirige vers `/articles`)
- Administration : `/admin` (connexion, liste, création, modification, suppression, upload d’images)

Créer (ou réinitialiser) un compte administrateur :

```bash
cd php_backend
php bin/create-admin.php email@exemple.com "Nom"
```

Le mot de passe (12 caractères minimum) est demandé dans le terminal. Il n’existe pas d’inscription publique.

Sécurité : session PHP `HttpOnly` + `SameSite=Strict` (+ `Secure` avec `SESSION_SECURE=true` en HTTPS), régénération de l’ID à la connexion, expiration après 2 h d’inactivité / 12 h maximum, jeton CSRF sur chaque modification, blocage après 5 échecs de connexion en 15 min, mots de passe hachés (Argon2id ou bcrypt), HTML des articles filtré par liste blanche côté serveur, images vérifiées (type réel, 5 Mo max, nom aléatoire) et exécution de scripts interdite dans `public/uploads/`.

En production, les dossiers `php_backend/storage/` et `php_backend/public/uploads/` doivent être accessibles en écriture par PHP.

## Vérifications

```bash
npm run lint
npm run build
npm run seo:check
php -l php_backend/public/index.php
```

## Production

`npm run build` optimise les images, construit les bundles client et serveur, puis génère un fichier HTML complet pour chacune des 13 routes indexables. Le backend PHP sert directement ces fichiers depuis `dist/`.

En production :

1. Exécuter `npm ci && npm run build`.
2. Configurer `php_backend/.env` avec `FRONTEND_DIST=../dist`.
3. Définir `php_backend/public/` comme racine web.
4. Activer `mod_rewrite` sous Apache ou l’équivalent `try_files` sous Nginx.

Documentation :

- [SEO et déploiement](docs/SEO.md)
- [Performance et Lighthouse](docs/PERFORMANCE.md)
