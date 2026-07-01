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
