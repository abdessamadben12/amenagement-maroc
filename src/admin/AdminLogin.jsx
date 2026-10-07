import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAdmin } from './AdminAuth'

export default function AdminLogin() {
  const { status, admin, login } = useAdmin()
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  if (status === 'ready' && admin) return <Navigate to="/admin/articles" replace />

  const onSubmit = async ({ email, password }) => {
    setError('')
    try {
      await login(email, password)
      const from = location.state?.from
      navigate(from && from.startsWith('/admin') && from !== '/admin/login' ? from : '/admin/articles', { replace: true })
    } catch (e) {
      setError(e.message)
    }
  }

  const inputClass = 'w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#595E62] focus:outline-none focus:ring-1 focus:ring-[#595E62]'

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#595E62] px-4">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-sm rounded-lg bg-white p-8 shadow-xl">
        <img src="/logo_Aménagement.png" alt="Aménagement Maroc" className="mx-auto mb-6 h-10 w-auto rounded bg-[#595E62] p-2" />
        <h1 className="mb-6 text-center text-xl font-semibold text-gray-900">Espace administrateur</h1>

        {error && <p role="alert" className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          className={inputClass}
          {...register('email', { required: 'Email requis' })}
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}

        <label className="mb-1 mt-4 block text-sm font-medium text-gray-700" htmlFor="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className={inputClass}
          {...register('password', { required: 'Mot de passe requis' })}
        />
        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-md bg-[#595E62] py-2.5 font-semibold text-white transition hover:bg-[#4a4e51] disabled:opacity-60"
        >
          {isSubmitting ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}
