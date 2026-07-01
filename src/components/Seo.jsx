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

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = getSeoForPath(pathname)
    document.title = seo.title

    setMeta('meta[name="description"]', { name: 'description', content: seo.description })
    setMeta('meta[name="robots"]', { name: 'robots', content: seo.robots })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: seo.canonical })
    setMeta('meta[property="og:image"]', { property: 'og:image', content: seo.image })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description })
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: seo.image })
    setMeta('link[rel="canonical"]', { tag: 'link', rel: 'canonical', href: seo.canonical })

    let schema = document.head.querySelector('script[data-seo-schema]')
    if (!schema) {
      schema = document.createElement('script')
      schema.type = 'application/ld+json'
      schema.dataset.seoSchema = 'local-business'
      document.head.appendChild(schema)
    }
    schema.textContent = JSON.stringify(localBusinessSchema)
  }, [pathname])

  return null
}
