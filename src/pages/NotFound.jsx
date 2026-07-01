import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="min-h-[60vh] bg-[#595E62] px-6 py-24 text-center text-white">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d4baa6]">Erreur 404</p>
      <h1 className="mb-5 text-4xl font-bold md:text-6xl">Page introuvable</h1>
      <p className="mx-auto mb-8 max-w-xl text-lg text-gray-200">
        La page demandée n’existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="inline-flex rounded-full bg-white px-7 py-3 font-semibold text-gray-900 transition hover:bg-[#AF937F] hover:text-white"
      >
        Retour à l’accueil
      </Link>
    </section>
  )
}
