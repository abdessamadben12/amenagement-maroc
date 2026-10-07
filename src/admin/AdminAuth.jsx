import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { adminLogin, apiRequest } from '../lib/api'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState({ status: 'loading', admin: null, csrfToken: null })

  useEffect(() => {
    apiRequest('/api/admin/me')
      .then((data) => setSession({ status: 'ready', admin: data.admin, csrfToken: data.csrfToken }))
      .catch(() => setSession({ status: 'ready', admin: null, csrfToken: null }))
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await adminLogin(email, password)
    setSession({ status: 'ready', admin: data.admin, csrfToken: data.csrfToken })
  }, [])

  const logout = useCallback(async () => {
    try {
      await apiRequest('/api/admin/logout', { method: 'POST', csrfToken: session.csrfToken })
    } finally {
      setSession({ status: 'ready', admin: null, csrfToken: null })
    }
  }, [session.csrfToken])

  /** Requête authentifiée : ajoute le jeton CSRF et déconnecte si la session a expiré. */
  const request = useCallback(async (endpoint, options = {}) => {
    try {
      return await apiRequest(endpoint, { ...options, csrfToken: session.csrfToken })
    } catch (error) {
      if (error.status === 401) setSession({ status: 'ready', admin: null, csrfToken: null })
      throw error
    }
  }, [session.csrfToken])

  /** Met à jour email / nom / mot de passe ; la session reçoit un nouveau jeton CSRF. */
  const updateAccount = useCallback(async (payload) => {
    const data = await request('/api/admin/account', { method: 'PUT', body: payload })
    setSession({ status: 'ready', admin: data.admin, csrfToken: data.csrfToken })
    return data
  }, [request])

  const value = useMemo(
    () => ({ ...session, login, logout, request, updateAccount }),
    [session, login, logout, request, updateAccount],
  )
  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAdmin() {
  return useContext(AdminAuthContext)
}
