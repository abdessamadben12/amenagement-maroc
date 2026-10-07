import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAdmin } from './AdminAuth'

export default function AdminAccount() {
  const { admin, updateAccount } = useAdmin()
  const [message, setMessage] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: admin.name || '', email: admin.email, new_password: '', confirm_password: '', current_password: '' },
  })

  const onSubmit = async ({ name, email, new_password, current_password }) => {
    setMessage(null)
    try {
      const data = await updateAccount({ name, email, new_password, current_password })
      reset({ name: data.admin.name, email: data.admin.email, new_password: '', confirm_password: '', current_password: '' })
      setMessage({
        type: 'success',
        text: data.passwordChanged ? 'Compte et mot de passe mis à jour.' : 'Compte mis à jour.',
      })
    } catch (e) {
      Object.entries(e.validationErrors || {}).forEach(([field, text]) => setError(field, { message: text }))
      setMessage({ type: 'error', text: e.message })
    }
  }

  const inputClass = 'w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:border-[#595E62] focus:outline-none focus:ring-1 focus:ring-[#595E62]'
  const labelClass = 'mb-1 block text-sm font-medium text-gray-700'
  const fieldError = (name) => (errors[name] ? <p className="mt-1 text-xs text-red-600">{errors[name].message}</p> : null)

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Mon compte</h1>

      {message && (
        <p role="status" className={`mb-4 rounded px-3 py-2 text-sm ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-800'}`}>
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-semibold text-gray-900">Informations de connexion</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className={labelClass}>Nom</label>
              <input id="name" autoComplete="name" className={inputClass} {...register('name')} />
              {fieldError('name')}
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email de connexion</label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                className={inputClass}
                {...register('email', {
                  required: 'Email requis',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email invalide' },
                })}
              />
              {fieldError('email')}
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-1 font-semibold text-gray-900">Changer le mot de passe</h2>
          <p className="mb-4 text-sm text-gray-500">Laissez vide pour conserver le mot de passe actuel. 12 caractères minimum.</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="new_password" className={labelClass}>Nouveau mot de passe</label>
              <input
                id="new_password"
                type="password"
                autoComplete="new-password"
                className={inputClass}
                {...register('new_password', {
                  validate: (v) => v === '' || v.length >= 12 || '12 caractères minimum',
                })}
              />
              {fieldError('new_password')}
            </div>
            <div>
              <label htmlFor="confirm_password" className={labelClass}>Confirmer le nouveau mot de passe</label>
              <input
                id="confirm_password"
                type="password"
                autoComplete="new-password"
                className={inputClass}
                {...register('confirm_password', {
                  validate: (v) => v === getValues('new_password') || 'Les mots de passe ne correspondent pas',
                })}
              />
              {fieldError('confirm_password')}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-[#AF937F]/40 bg-white p-6 shadow-sm">
          <label htmlFor="current_password" className={labelClass}>Mot de passe actuel (obligatoire pour valider)</label>
          <input
            id="current_password"
            type="password"
            autoComplete="current-password"
            className={inputClass}
            {...register('current_password', { required: 'Saisissez votre mot de passe actuel' })}
          />
          {fieldError('current_password')}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 rounded-md bg-[#595E62] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4a4e51] disabled:opacity-60"
          >
            {isSubmitting ? 'Enregistrement…' : 'Enregistrer les modifications'}
          </button>
        </section>
      </form>
    </div>
  )
}
