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
