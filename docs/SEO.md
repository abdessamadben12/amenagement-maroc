# Documentation SEO — Aménagement Maroc

## 1. Objectif

Le site ne dépend plus de l’exécution de JavaScript pour exposer son contenu aux moteurs de recherche. Le build génère un document HTML complet pour chaque route, puis React hydrate ce HTML dans le navigateur.

Cette approche suit les recommandations de Google pour les sites JavaScript et le modèle SSR/SSG natif de Vite :

- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://vite.dev/guide/ssr.html
- https://react.dev/reference/react-dom/client/hydrateRoot

## 2. Architecture mise en place

### Métadonnées centralisées

Le fichier `src/seo.js` contient la source unique des :

- titres ;
- descriptions ;
- URL canoniques ;
- routes à prérendre ;
- données structurées `LocalBusiness`.

Le composant `src/components/Seo.jsx` met ces données à jour lors des navigations réalisées côté client.

### Génération statique

Le build se déroule en quatre étapes :

```bash
npm run optimize:images
npm run build:client
npm run build:ssr
npm run prerender
```

La commande complète est :

```bash
npm run build
```

`src/entry-server.jsx` génère le HTML React. `scripts/prerender.mjs` produit ensuite :

- `dist/index.html` ;
- un `index.html` dans le dossier de chaque route ;
- `dist/404.html` avec `noindex` ;
- `dist/sitemap.xml` avec une date `lastmod` actualisée.

### Hydratation React

`src/main.jsx` utilise `hydrateRoot` lorsque le document contient déjà le HTML prérendu. En développement, sans HTML prérendu, il utilise `createRoot`.

## 3. Métadonnées générées

Chaque route possède :

- un `<title>` unique ;
- une meta description unique ;
- `robots=index, follow` ;
- une canonicale absolue ;
- `hreflang=fr-MA` et `x-default` ;
- les balises Open Graph ;
- les balises Twitter Card ;
- un seul `<h1>` principal dans le contenu ;
- le JSON-LD `LocalBusiness`.

La page 404 utilise `noindex, nofollow` et le backend renvoie le statut HTTP `404`.

## 4. Données structurées

Le schéma `LocalBusiness` fournit :

- le nom commercial ;
- l’URL et le logo ;
- le téléphone et l’email ;
- l’adresse à Casablanca ;
- les coordonnées géographiques ;
- la zone desservie : Maroc.

Ne pas ajouter d’horaires, de notes ou d’avis sans données réelles. Après déploiement, valider le résultat avec :

- https://search.google.com/test/rich-results
- https://validator.schema.org/

Documentation Google :

- https://developers.google.com/search/docs/appearance/structured-data/local-business

## 5. Optimisation des images

`scripts/optimize-images.mjs` recherche les PNG et JPEG dans `public/images/`, les limite à 1920 px et génère :

- WebP, qualité 78 ;
- AVIF, qualité 48 ;
- des variantes responsives de 480, 768 et 1280 px ;
- conservation de l’original comme solution de repli.

`src/components/OptimizedImage.jsx` produit un élément `<picture>` dans cet ordre :

1. AVIF ;
2. WebP ;
3. PNG ou JPEG original.

L’image principale utilise `loading=eager` et `fetchpriority=high`. Les autres utilisent le chargement différé.

Pour régénérer les images :

```bash
npm run optimize:images
```

La compression exceptionnelle des fichiers PNG/JPEG sources se lance avec :

```bash
npm run compress:originals
```

Cette commande réécrit les originaux uniquement si le résultat est plus léger. Elle ne doit pas être ajoutée au build quotidien afin d’éviter des réencodages successifs.

Résultat actuel :

- originaux avant optimisation : environ 146,9 Mo ;
- originaux de secours après compression : environ 19,2 Mo ;
- ensemble des variantes WebP + AVIF : environ 8,4 Mo ;
- le navigateur ne télécharge qu’un format adapté, pas les trois.

## 6. Configuration du serveur

La racine web doit être :

```text
php_backend/public/
```

Dans `php_backend/.env` :

```dotenv
APP_ENV=production
FRONTEND_DIST=../dist
CSRF_SECURE=true
```

Le fichier `.htaccess` :

- donne la priorité à `index.php` ;
- conserve l’accès direct aux fichiers existants ;
- transmet les autres requêtes au routeur PHP.

Le routeur sert `/chemin/index.html` depuis `dist`. Une URL inconnue reçoit `dist/404.html` avec le statut 404. L’ancienne URL `/services/revonation` est redirigée en 301 vers `/services/renovation`.

Exemple Nginx équivalent :

```nginx
root /chemin/vers/php_backend/public;
index index.php;

location / {
    try_files $uri $uri/ /index.php?$query_string;
}

location ~ \.php$ {
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_pass 127.0.0.1:9000;
}
```

## 7. Contrôles automatiques

Exécuter avant chaque déploiement :

```bash
npm ci
npm run lint
npm run build
npm run seo:check
```

`seo:check` contrôle :

- les 13 routes ;
- l’unicité des titres et descriptions ;
- les canoniques ;
- le JSON-LD ;
- la présence du contenu prérendu et du H1 ;
- la page 404 en `noindex` ;
- la cohérence du sitemap et de `robots.txt`.

## 8. Google Search Console

Cette étape nécessite le compte Google du propriétaire du domaine et ne peut pas être automatisée dans le dépôt.

1. Ouvrir https://search.google.com/search-console.
2. Ajouter une propriété de type **Domaine** : `amenagement-maroc.com`.
3. Copier l’enregistrement TXT fourni par Google dans la zone DNS du domaine.
4. Attendre la propagation, puis cliquer sur **Valider**.
5. Dans **Sitemaps**, envoyer :

   ```text
   https://amenagement-maroc.com/sitemap.xml
   ```

6. Inspecter au minimum les URL `/`, `/devis`, `/contact` et une page service.
7. Utiliser **Tester l’URL publiée**, vérifier le HTML rendu, puis demander l’indexation.
8. Surveiller les rapports Pages, Signaux Web essentiels et Résultats enrichis.

Documentation officielle :

- https://support.google.com/webmasters/answer/9012289?hl=fr
- https://support.google.com/webmasters/answer/12482179?hl=fr

## 9. Déploiement et contrôle final

Après mise en ligne :

```bash
curl -I https://amenagement-maroc.com/services/renovation
curl -I https://amenagement-maroc.com/page-inexistante
curl -s https://amenagement-maroc.com/services/renovation
```

Résultats attendus :

- page service : HTTP 200 ;
- page inconnue : HTTP 404 ;
- ancienne route `revonation` : HTTP 301 ;
- HTML reçu : titre, description, canonicale, JSON-LD, H1 et contenu visibles sans exécuter JavaScript.

Pour reproduire ce routage avec le serveur PHP intégré :

```bash
cd php_backend
php -S localhost:8080 -t public public/index.php
```

Enfin, tester le site avec PageSpeed Insights :

- https://pagespeed.web.dev/

Le SEO ne garantit pas une position précise. Le classement dépend aussi de la qualité éditoriale, des preuves de réalisations, des avis réels, du profil Google Business et des liens provenant d’autres sites.
