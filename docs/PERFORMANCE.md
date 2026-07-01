# Documentation performance — Aménagement Maroc

## Résultat mesuré

Profil Lighthouse mobile local, avec limitation réseau et CPU standard :

| Métrique | Avant | Après |
|---|---:|---:|
| Performance | 64 | 100 |
| First Contentful Paint | 1,2 s | 1,0 s |
| Largest Contentful Paint | 4,0 s | 1,9 s |
| Total Blocking Time | 0 ms | 60 ms |
| Cumulative Layout Shift | 0,671 | 0 |
| Poids chargé | environ 656 KiB | environ 232 KiB |

Une mesure Lighthouse varie selon la machine, le serveur, le réseau et les extensions du navigateur. L’objectif durable est de conserver LCP sous 2,5 secondes, CLS sous 0,1 et TBT sous 200 ms.

## Corrections appliquées

### Suppression du rendu intermédiaire

Le premier prérendu utilisait des pages React chargées avec `lazy()` dans le serveur SSR. Le HTML contenait donc temporairement le loader, puis un script remplaçait ce contenu par la page complète. Ce remplacement produisait un décalage visuel important.

`src/AppServer.jsx` utilise maintenant des imports synchrones uniquement pendant la génération statique. Le navigateur reçoit directement la page finale. Le frontend conserve le découpage par route.

### Dimensions intrinsèques

Toutes les images locales reçoivent des attributs `width` et `height`. Le navigateur réserve leur espace avant le téléchargement et évite les déplacements de contenu.

Le logo utilise désormais le fichier SVG dans la navigation et le pied de page.

### Images responsives

Pour chaque image, le build génère :

- AVIF et WebP pleine taille ;
- 480 px ;
- 768 px ;
- 1280 px.

`OptimizedImage.jsx` utilise `srcset` et `sizes`. Un téléphone télécharge donc une image adaptée à son écran au lieu d’un fichier de 1920 px.

L’image principale utilise :

- `fetchpriority=high` ;
- `loading=eager` ;
- un preload responsive ;
- une taille déclarée ;
- AVIF en priorité.

Les autres images restent en chargement différé.

### CSS critique

La feuille Tailwind compilée est intégrée dans chaque page statique. Cela supprime une requête bloquant le premier rendu.

La police Google distante a été remplacée par une pile de polices système, ce qui évite une connexion externe et les changements de police tardifs.

### Compression HTTP

Le routeur PHP compresse en gzip :

- HTML ;
- JavaScript ;
- CSS ;
- JSON ;
- SVG.

Le fichier `.htaccess` active également `mod_deflate` lorsque le serveur Apache le permet.

## Commandes de contrôle

Construire et vérifier :

```bash
npm run lint
npm run build
npm run seo:check
```

Lancer le serveur local :

```bash
cd php_backend
php -S localhost:8080 -t public public/index.php
```

Mesurer le profil mobile :

```bash
npx lighthouse http://localhost:8080/ \
  --only-categories=performance \
  --output=html \
  --output-path=lighthouse-performance.html
```

Après déploiement, refaire la mesure sur l’URL publique avec PageSpeed Insights :

https://pagespeed.web.dev/

## Points à surveiller

- Toujours définir les dimensions des nouvelles images.
- Utiliser `OptimizedImage` pour les images placées dans `public/images`.
- Relancer `npm run optimize:images` après l’ajout ou la modification d’une image.
- Ne pas réintroduire de police distante avec `@import`.
- Vérifier Lighthouse après toute modification importante du héros, du menu ou du CSS global.
- Surveiller les données réelles Core Web Vitals dans Google Search Console après plusieurs semaines de trafic.
