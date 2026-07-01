import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { getSeoForPath, prerenderRoutes } from '../src/seo.js'

const errors = []
const titles = new Set()
const descriptions = new Set()

function count(text, pattern) {
  return [...text.matchAll(pattern)].length
}

for (const route of prerenderRoutes) {
  const file = route === '/'
    ? path.resolve('dist/index.html')
    : path.resolve('dist', route.slice(1), 'index.html')
  const html = await readFile(file, 'utf8')
  const seo = getSeoForPath(route)

  if (count(html, /<title>/g) !== 1) errors.push(`${route}: nombre de titres incorrect`)
  if (!html.includes(`<link rel="canonical" href="${seo.canonical}"`)) errors.push(`${route}: canonical incorrecte`)
  if (!html.includes(`content="${seo.description.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`)) {
    errors.push(`${route}: description absente`)
  }
  if (!html.includes('data-seo-schema="local-business"')) errors.push(`${route}: JSON-LD absent`)
  if (html.includes('<div id="root"></div>')) errors.push(`${route}: contenu non prérendu`)
  if (!/<h1[\s>]/.test(html)) errors.push(`${route}: H1 absent`)
  if (titles.has(seo.title)) errors.push(`${route}: titre dupliqué`)
  if (descriptions.has(seo.description)) errors.push(`${route}: description dupliquée`)
  titles.add(seo.title)
  descriptions.add(seo.description)
}

const notFound = await readFile(path.resolve('dist/404.html'), 'utf8')
if (!notFound.includes('noindex, nofollow')) errors.push('/404: directive noindex absente')

const sitemap = await readFile(path.resolve('dist/sitemap.xml'), 'utf8')
for (const route of prerenderRoutes) {
  if (!sitemap.includes(`<loc>${getSeoForPath(route).canonical}</loc>`)) {
    errors.push(`${route}: absente du sitemap`)
  }
}

const robots = await readFile(path.resolve('dist/robots.txt'), 'utf8')
if (!robots.includes('Sitemap: https://amenagement-maroc.com/sitemap.xml')) {
  errors.push('robots.txt: URL du sitemap absente')
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`${prerenderRoutes.length} routes SEO vérifiées, plus la page 404.`)
