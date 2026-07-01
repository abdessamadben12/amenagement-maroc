import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { getSeoForPath, localBusinessSchema, prerenderRoutes, SITE_URL } from '../src/seo.js'

const distRoot = path.resolve('dist')
let template = await readFile(path.join(distRoot, 'index.html'), 'utf8')
const stylesheetTag = template.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/)
if (stylesheetTag) {
  const stylesheetPath = path.join(distRoot, stylesheetTag[1].replace(/^\//, ''))
  const stylesheet = await readFile(stylesheetPath, 'utf8')
  template = template.replace(stylesheetTag[0], `<style data-inline-css>${stylesheet}</style>`)
}
const serverEntry = pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href
const { render } = await import(serverEntry)

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function createHead(pathname) {
  const seo = getSeoForPath(pathname)
  const schema = JSON.stringify(localBusinessSchema).replaceAll('<', '\\u003c')
  const preload = pathname === '/'
    ? '<link rel="preload" as="image" href="/images/Amenagement_maroc_hero-768.avif" imagesrcset="/images/Amenagement_maroc_hero-480.avif 480w, /images/Amenagement_maroc_hero-768.avif 768w, /images/Amenagement_maroc_hero-1280.avif 1280w" imagesizes="(max-width: 1023px) 100vw, 50vw" type="image/avif" fetchpriority="high" />'
    : ''

  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="${seo.robots}" />`,
    `<link rel="canonical" href="${seo.canonical}" />`,
    `<link rel="alternate" hreflang="fr-MA" href="${seo.canonical}" />`,
    `<link rel="alternate" hreflang="x-default" href="${seo.canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${seo.canonical}" />`,
    `<meta property="og:image" content="${seo.image}" />`,
    '<meta property="og:type" content="website" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${seo.image}" />`,
    preload,
    `<script type="application/ld+json" data-seo-schema="local-business">${schema}</script>`,
  ].filter(Boolean).join('\n    ')
}

function inject(templateHtml, pathname, appHtml) {
  return templateHtml
    .replace(/<meta name="seo-head-marker"[^>]*>/, createHead(pathname))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
}

for (const route of prerenderRoutes) {
  const appHtml = await render(route)
  const output = inject(template, route, appHtml)
  const outputPath = route === '/'
    ? path.join(distRoot, 'index.html')
    : path.join(distRoot, route.slice(1), 'index.html')

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, output, 'utf8')
  console.log(`Prérendu : ${route}`)
}

const notFoundHtml = inject(template, '/404', await render('/404'))
  .replace(`<link rel="canonical" href="${SITE_URL}/404" />`, '')
await writeFile(path.join(distRoot, '404.html'), notFoundHtml, 'utf8')
console.log('Prérendu : /404')

const lastmod = new Date().toISOString().slice(0, 10)
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...prerenderRoutes.map((route) => {
    const canonical = getSeoForPath(route).canonical
    const priority = route === '/' ? '1.0' : route === '/devis' ? '0.9' : '0.8'
    return `  <url><loc>${canonical}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`
  }),
  '</urlset>',
].join('\n')
await writeFile(path.join(distRoot, 'sitemap.xml'), sitemap, 'utf8')
console.log('Sitemap généré.')
