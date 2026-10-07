import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { apiRequest, formatArticleDate, mediaUrl } from '../lib/api'
import { applySeo } from '../components/Seo'
import { DEFAULT_IMAGE, SITE_URL } from '../seo'
import NotFound from './NotFound'

const EMBED_HOSTS = ['www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com']

// Défense en profondeur : le contenu est déjà nettoyé côté serveur.
function sanitize(html) {
  if (typeof window === 'undefined') return ''
  const clean = DOMPurify.sanitize(html, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allowfullscreen', 'frameborder', 'target'],
    FORBID_ATTR: ['srcdoc'],
  })
  const container = document.createElement('div')
  container.innerHTML = clean
  container.querySelectorAll('iframe').forEach((frame) => {
    try {
      const url = new URL(frame.getAttribute('src') || '')
      if (url.protocol !== 'https:' || !EMBED_HOSTS.includes(url.hostname)) frame.remove()
    } catch {
      frame.remove()
    }
  })
  container.querySelectorAll('img[src^="/"]').forEach((img) => img.setAttribute('src', mediaUrl(img.getAttribute('src'))))
  return container.innerHTML
}

export default function Article() {
  const { slug } = useParams()
  const [state, setState] = useState({ status: 'loading', article: null })

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading', article: null })
    apiRequest(`/api/articles/${encodeURIComponent(slug)}`, { signal: controller.signal })
      .then((data) => setState({ status: 'ready', article: data.article }))
      .catch((error) => {
        if (error.name === 'AbortError') return
        setState({ status: error.status === 404 ? 'notfound' : 'error', article: null })
      })
    return () => controller.abort()
  }, [slug])

  const article = state.article
  const html = useMemo(() => (article ? sanitize(article.content) : ''), [article])

  useEffect(() => {
    if (!article) return
    const canonical = `${SITE_URL}/articles/${article.slug}`
    const image = article.cover_image
      ? (article.cover_image.startsWith('/') ? `${SITE_URL}${article.cover_image}` : article.cover_image)
      : DEFAULT_IMAGE
    const description = article.excerpt || article.title
    applySeo(
      { title: `${article.title} | Aménagement Maroc`, description, canonical, image, robots: 'index, follow' },
      {
        type: 'article',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: article.title,
          description,
          image,
          datePublished: article.published_at,
          dateModified: article.updated_at,
          mainEntityOfPage: canonical,
        },
      },
    )
  }, [article])

  if (state.status === 'notfound') return <NotFound />

  return (
    <article className="bg-white">
      <header className="bg-[#595E62] px-6 py-16 text-white md:py-20">
        <div className="mx-auto max-w-3xl">
          <Link to="/articles" className="mb-6 inline-block text-sm text-[#d4baa6] hover:text-white">← Tous les articles</Link>
          {article ? (
            <>
              {article.category && (
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d4baa6]">{article.category}</p>
              )}
              <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">{article.title}</h1>
              <p className="text-gray-300">{formatArticleDate(article.published_at)}</p>
            </>
          ) : (
            <div className="h-24 animate-pulse rounded bg-white/10" />
          )}
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-12">
        {state.status === 'error' && <p className="text-gray-600">Impossible de charger cet article pour le moment.</p>}
        {article?.cover_image && (
          <img src={mediaUrl(article.cover_image)} alt="" className="mb-10 w-full rounded-lg object-cover" />
        )}
        {article && <div className="article-content" dangerouslySetInnerHTML={{ __html: html }} />}
      </div>
    </article>
  )
}
