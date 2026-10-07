import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { mediaUrl } from '../lib/api'
import { useAdmin } from './AdminAuth'
import RichTextEditor from './RichTextEditor'

const EMPTY = { title: '', slug: '', excerpt: '', category: '', cover_image: '', status: 'draft', content: '' }

export default function AdminArticleEditor() {
  const { id } = useParams()
  const isNew = !id
  const navigate = useNavigate()
  const location = useLocation()
  const { request } = useAdmin()

  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [uploadingCover, setUploadingCover] = useState(false)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState(location.state?.message ?? null)

  useEffect(() => {
    if (isNew) {
      setForm(EMPTY)
      return
    }
    setLoading(true)
    request(`/api/admin/articles/${id}`)
      .then((data) => setForm({ ...EMPTY, ...data.article }))
      .catch((e) => setMessage({ type: 'error', text: e.message }))
      .finally(() => setLoading(false))
  }, [id, isNew, request])

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const uploadImage = async (file) => {
    const body = new FormData()
    body.append('image', file)
    const data = await request('/api/admin/uploads', { method: 'POST', body })
    return data.url
  }

  const onCoverChange = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setUploadingCover(true)
    try {
      const url = await uploadImage(file)
      setForm((f) => ({ ...f, cover_image: url }))
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setUploadingCover(false)
    }
  }

  const save = async (status) => {
    setSaving(true)
    setErrors({})
    setMessage(null)
    try {
      // Quill 2 (getSemanticHTML) remplace chaque espace par &nbsp;, ce qui empêche le retour à la ligne.
      const payload = { ...form, status, content: form.content.replace(/&nbsp;/g, ' ') }
      const data = isNew
        ? await request('/api/admin/articles', { method: 'POST', body: payload })
        : await request(`/api/admin/articles/${id}`, { method: 'PUT', body: payload })
      setForm({ ...EMPTY, ...data.article })
      const success = { type: 'success', text: status === 'published' ? 'Article publié.' : 'Brouillon enregistré.' }
      setMessage(success)
      // La nouvelle route remonte le composant : le message passe par l'état de navigation.
      if (isNew) navigate(`/admin/articles/${data.article.id}`, { replace: true, state: { message: success } })
    } catch (e) {
      setErrors(e.validationErrors || {})
      setMessage({ type: 'error', text: e.message })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-gray-500">Chargement…</p>

  const inputClass = 'w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:border-[#595E62] focus:outline-none focus:ring-1 focus:ring-[#595E62]'
  const labelClass = 'mb-1 block text-sm font-medium text-gray-700'
  const fieldError = (name) => (errors[name] ? <p className="mt-1 text-xs text-red-600">{errors[name]}</p> : null)

  return (
    <form onSubmit={(e) => { e.preventDefault(); save(form.status) }} noValidate>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to="/admin/articles" className="text-sm text-gray-500 hover:text-gray-800">← Articles</Link>
          <h1 className="text-2xl font-semibold text-gray-900">{isNew ? 'Nouvel article' : 'Modifier l’article'}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {!isNew && form.status === 'published' && (
            <a href={`/articles/${form.slug}`} target="_blank" rel="noreferrer" className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100">
              Voir ↗
            </a>
          )}
          <button type="button" disabled={saving} onClick={() => save('draft')} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-100 disabled:opacity-60">
            {form.status === 'published' ? 'Repasser en brouillon' : 'Enregistrer le brouillon'}
          </button>
          <button type="button" disabled={saving} onClick={() => save('published')} className="rounded-md bg-[#595E62] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4a4e51] disabled:opacity-60">
            {saving ? 'Enregistrement…' : form.status === 'published' ? 'Mettre à jour' : 'Publier'}
          </button>
        </div>
      </div>

      {message && (
        <p role="status" className={`mb-4 rounded px-3 py-2 text-sm ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-800'}`}>
          {message.text}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-5">
          <div>
            <label htmlFor="title" className={labelClass}>Titre</label>
            <input id="title" className={`${inputClass} text-lg`} value={form.title} onChange={set('title')} maxLength={200} />
            {fieldError('title')}
          </div>
          <div>
            <span className={labelClass}>Contenu</span>
            <RichTextEditor
              value={form.content}
              onChange={(content) => setForm((f) => ({ ...f, content }))}
              onUpload={uploadImage}
              onError={(text) => setMessage({ type: 'error', text })}
            />
            {fieldError('content')}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <span className={labelClass}>Image de couverture</span>
            {form.cover_image && (
              <img src={mediaUrl(form.cover_image)} alt="" className="mb-3 aspect-[16/10] w-full rounded object-cover" />
            )}
            <label className="inline-block cursor-pointer rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100">
              {uploadingCover ? 'Envoi…' : form.cover_image ? 'Changer' : 'Choisir une image'}
              <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" onChange={onCoverChange} disabled={uploadingCover} />
            </label>
            {form.cover_image && (
              <button type="button" onClick={() => setForm((f) => ({ ...f, cover_image: '' }))} className="ml-3 text-sm text-red-600 hover:underline">
                Retirer
              </button>
            )}
            {fieldError('cover_image')}
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm">
            <label htmlFor="excerpt" className={labelClass}>Résumé (SEO)</label>
            <textarea id="excerpt" rows={4} className={inputClass} value={form.excerpt} onChange={set('excerpt')} maxLength={500} />
            <p className="mt-1 text-xs text-gray-500">{form.excerpt.length}/500 · affiché dans la liste et les moteurs de recherche</p>
            {fieldError('excerpt')}
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm">
            <label htmlFor="category" className={labelClass}>Catégorie</label>
            <input id="category" className={inputClass} value={form.category} onChange={set('category')} maxLength={60} placeholder="Rénovation, Design…" />
            {fieldError('category')}

            <label htmlFor="slug" className={`${labelClass} mt-4`}>Adresse (slug)</label>
            <input id="slug" className={inputClass} value={form.slug} onChange={set('slug')} placeholder="généré depuis le titre" />
            <p className="mt-1 break-all text-xs text-gray-500">/articles/{form.slug || '…'}</p>
          </div>
        </aside>
      </div>
    </form>
  )
}
