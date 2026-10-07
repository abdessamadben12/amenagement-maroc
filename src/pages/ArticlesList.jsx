import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { apiRequest, formatArticleDate, mediaUrl } from '../lib/api'

const PER_PAGE = 9

export default function ArticlesList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const [state, setState] = useState({ status: 'loading', items: [], total: 0 })

  useEffect(() => {
    const controller = new AbortController()
    setState((s) => ({ ...s, status: 'loading' }))
    apiRequest(`/api/articles?page=${page}&perPage=${PER_PAGE}`, { signal: controller.signal })
      .then((data) => setState({ status: 'ready', items: data.items, total: data.total }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ status: 'error', items: [], total: 0 })
      })
    return () => controller.abort()
  }, [page])

  const totalPages = Math.max(1, Math.ceil(state.total / PER_PAGE))

  return (
    <>
      <section className="bg-[#595E62] px-6 py-20 text-center text-white">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d4baa6]">Nos articles</p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Conseils et actualités</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-200">
          Idées, tendances et retours d’expérience sur la rénovation et l’aménagement au Maroc.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        {state.status === 'loading' && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-lg bg-gray-100" />
            ))}
          </div>
        )}

        {state.status === 'error' && (
          <p className="text-center text-gray-600">Impossible de charger les articles pour le moment.</p>
        )}

        {state.status === 'ready' && state.items.length === 0 && (
          <p className="text-center text-gray-600">Aucun article publié pour le moment.</p>
        )}

        {state.status === 'ready' && state.items.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {state.items.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-12 flex justify-center gap-2" aria-label="Pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setSearchParams(n === 1 ? {} : { page: String(n) })}
                aria-current={n === page ? 'page' : undefined}
                className={`h-10 w-10 rounded-full border text-sm font-semibold transition ${
                  n === page ? 'border-[#595E62] bg-[#595E62] text-white' : 'border-gray-300 hover:border-[#AF937F]'
                }`}
              >
                {n}
              </button>
            ))}
          </nav>
        )}
      </section>
    </>
  )
}

function ArticleCard({ article }) {
  return (
    <Link
      to={`/articles/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-[16/10] overflow-hidden bg-gray-100">
        {article.cover_image ? (
          <img
            src={mediaUrl(article.cover_image)}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#595E62]/10 text-[#595E62]">Aménagement Maroc</div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="mb-3 text-xl font-semibold text-gray-900 group-hover:text-[#AF937F]">{article.title}</h2>
        {article.excerpt && <p className="mb-4 line-clamp-3 text-sm text-gray-600">{article.excerpt}</p>}
        <div className="mt-auto flex items-center justify-between text-xs uppercase tracking-wider text-gray-500">
          <span>{article.category}</span>
          <span>{formatArticleDate(article.published_at)}</span>
        </div>
      </div>
    </Link>
  )
}
