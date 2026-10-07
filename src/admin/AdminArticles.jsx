import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatArticleDate } from '../lib/api'
import { useAdmin } from './AdminAuth'

export default function AdminArticles() {
  const { request } = useAdmin()
  const [items, setItems] = useState(null)
  const [error, setError] = useState('')
  const [confirmId, setConfirmId] = useState(null)

  const load = useCallback(() => {
    request('/api/admin/articles')
      .then((data) => setItems(data.items))
      .catch((e) => setError(e.message))
  }, [request])

  useEffect(load, [load])

  const remove = async (id) => {
    setError('')
    try {
      await request(`/api/admin/articles/${id}`, { method: 'DELETE' })
      setItems((list) => list.filter((a) => a.id !== id))
    } catch (e) {
      setError(e.message)
    } finally {
      setConfirmId(null)
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Articles</h1>
        <Link to="/admin/articles/new" className="rounded-md bg-[#595E62] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4a4e51]">
          + Nouvel article
        </Link>
      </div>

      {error && <p role="alert" className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {items === null && !error && <p className="text-gray-500">Chargement…</p>}
      {items?.length === 0 && (
        <p className="rounded-lg bg-white p-8 text-center text-gray-500 shadow-sm">Aucun article. Créez le premier !</p>
      )}

      {items?.length > 0 && (
        <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Titre</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Modifié le</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <Link to={`/admin/articles/${a.id}`} className="hover:text-[#8a6f5c]">{a.title}</Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{a.category || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      a.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {a.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{formatArticleDate(a.updated_at)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    {confirmId === a.id ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="text-gray-600">Supprimer ?</span>
                        <button type="button" onClick={() => remove(a.id)} className="font-semibold text-red-600 hover:underline">Oui</button>
                        <button type="button" onClick={() => setConfirmId(null)} className="text-gray-500 hover:underline">Non</button>
                      </span>
                    ) : (
                      <span className="inline-flex gap-3">
                        {a.status === 'published' && (
                          <a href={`/articles/${a.slug}`} target="_blank" rel="noreferrer" className="text-gray-600 hover:underline">Voir</a>
                        )}
                        <Link to={`/admin/articles/${a.id}`} className="text-[#595E62] hover:underline">Modifier</Link>
                        <button type="button" onClick={() => setConfirmId(a.id)} className="text-red-600 hover:underline">Supprimer</button>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
