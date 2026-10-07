const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

async function readJson(response) {
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    return null
  }

  return response.json()
}

export async function submitForm(endpoint, data) {
  const csrfResponse = await fetch(`${API_BASE_URL}/api/csrf`, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  })
  const csrfPayload = await readJson(csrfResponse)

  if (!csrfResponse.ok || !csrfPayload?.csrfToken) {
    throw new Error(csrfPayload?.message || 'Impossible d’initialiser la requête sécurisée.')
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfPayload.csrfToken,
    },
    body: JSON.stringify(data),
  })
  const payload = await readJson(response)

  if (!response.ok) {
    const error = new Error(payload?.message || 'La demande n’a pas pu être envoyée.')
    error.validationErrors = payload?.errors || null
    throw error
  }

  return payload
}

/** Préfixe les chemins relatifs (/uploads/...) avec l'URL de l'API. */
export function mediaUrl(src) {
  if (!src) return ''
  return src.startsWith('/') ? `${API_BASE_URL}${src}` : src
}

export async function apiRequest(endpoint, { method = 'GET', body, csrfToken, signal } = {}) {
  const headers = { Accept: 'application/json' }
  if (csrfToken) headers['X-CSRF-Token'] = csrfToken
  const isForm = typeof FormData !== 'undefined' && body instanceof FormData
  if (body !== undefined && !isForm) headers['Content-Type'] = 'application/json'

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    credentials: 'include',
    headers,
    signal,
    body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
  })
  const payload = await readJson(response)

  if (!response.ok) {
    const error = new Error(payload?.message || 'Une erreur est survenue.')
    error.status = response.status
    error.validationErrors = payload?.errors || null
    throw error
  }
  return payload
}

/** Connexion admin : récupère d'abord un jeton CSRF (cookie double-soumission). */
export async function adminLogin(email, password) {
  const { csrfToken } = await apiRequest('/api/csrf')
  return apiRequest('/api/admin/login', { method: 'POST', body: { email, password }, csrfToken })
}

export function formatArticleDate(value) {
  if (!value) return ''
  const date = new Date(value.replace(' ', 'T') + 'Z')
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}
