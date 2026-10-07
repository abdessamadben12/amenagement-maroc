import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSeoForPath, localBusinessSchema } from '../seo'

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement(attributes.tag || 'meta')
    element.dataset.seo = 'managed'
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([name, value]) => {
    if (name !== 'tag') element.setAttribute(name, value)
  })
}

/** Applique les balises SEO d'une page (utilisé aussi par les pages dynamiques comme les articles). */
// eslint-disable-next-line react-refresh/only-export-components
export function applySeo(seo, { schema = localBusinessSchema, type = 'website' } = {}) {
  document.title = seo.title

  setMeta('meta[name="description"]', { name: 'description', content: seo.description })
  setMeta('meta[name="robots"]', { name: 'robots', content: seo.robots })
  setMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title })
  setMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description })
  setMeta('meta[property="og:url"]', { property: 'og:url', content: seo.canonical })
  setMeta('meta[property="og:image"]', { property: 'og:image', content: seo.image })
  setMeta('meta[property="og:type"]', { property: 'og:type', content: type })
  setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
  setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title })
  setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description })
  setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: seo.image })
  setMeta('link[rel="canonical"]', { tag: 'link', rel: 'canonical', href: seo.canonical })

  let schemaTag = document.head.querySelector('script[data-seo-schema]')
  if (!schemaTag) {
    schemaTag = document.createElement('script')
    schemaTag.type = 'application/ld+json'
    schemaTag.dataset.seoSchema = 'local-business'
    document.head.appendChild(schemaTag)
  }
  schemaTag.textContent = JSON.stringify(schema)
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Les pages d'article gèrent leurs propres balises une fois le contenu chargé.
    if (/^\/articles\/[^/]+\/?$/.test(pathname)) return
    applySeo(getSeoForPath(pathname))
  }, [pathname])

  return null
}
