import { Link, Navigate, NavLink, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { AdminAuthProvider, useAdmin } from './AdminAuth'
import AdminLogin from './AdminLogin'
import AdminArticles from './AdminArticles'
import AdminArticleEditor from './AdminArticleEditor'
import AdminAccount from './AdminAccount'

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route element={<RequireAdmin />}>
          <Route index element={<Navigate to="articles" replace />} />
          <Route path="articles" element={<AdminArticles />} />
          <Route path="articles/new" element={<AdminArticleEditor />} />
          <Route path="articles/:id" element={<AdminArticleEditor />} />
          <Route path="compte" element={<AdminAccount />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminAuthProvider>
  )
}

function RequireAdmin() {
  const { status, admin, logout } = useAdmin()
  const location = useLocation()

  if (status === 'loading') {
    return <div className="flex min-h-screen items-center justify-center text-gray-500">Chargement…</div>
  }
  if (!admin) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#595E62] text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="font-semibold">Admin · Aménagement Maroc</Link>
            <nav className="flex gap-4 text-sm">
              <NavLink to="/admin/articles" end className={({ isActive }) => (isActive ? 'text-[#d4baa6]' : 'hover:text-[#d4baa6]')}>
                Articles
              </NavLink>
              <NavLink to="/admin/articles/new" className={({ isActive }) => (isActive ? 'text-[#d4baa6]' : 'hover:text-[#d4baa6]')}>
                Nouvel article
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="/articles" target="_blank" rel="noreferrer" className="hover:text-[#d4baa6]">Voir les articles ↗</a>
            <NavLink to="/admin/compte" title="Mon compte" className={({ isActive }) => (isActive ? 'text-[#d4baa6]' : 'text-gray-300 hover:text-[#d4baa6]')}>
              Mon compte <span className="hidden md:inline">({admin.email})</span>
            </NavLink>
            <button type="button" onClick={logout} className="rounded border border-white/40 px-3 py-1 hover:bg-white/10">
              Déconnexion
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
