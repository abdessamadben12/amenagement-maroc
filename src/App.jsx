// src/App.jsx
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import Loader from './components/Loader'
import Seo from './components/Seo'

// Lazy loading des composants de pages
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })))
const Contact = lazy(() => import('./pages/Contact'))
const About = lazy(() => import('./pages/about'))
const SavoirFaire = lazy(() => import('./pages/SavoirFaire'))
const Devis = lazy(() => import('./pages/DemandeDevez'))
const Revonation = lazy(() => import('./pages/services/Revonation'))
const AmenagementInterieur = lazy(() => import('./pages/services/amenagement_interieur'))
const TravauxAluminium = lazy(() => import('./pages/services/TraveauxAluminium'))
const AgencementProfessionnel = lazy(() => import('./pages/services/AgencementProfessionnel'))
const TravauxMenuiserieBois = lazy(() => import('./pages/services/TravauxMenuiserieBois'))
const Pienture = lazy(() => import('./pages/services/Pienture'))
const RevelementSol = lazy(() => import('./pages/services/RevêtementSol'))
const Plafonds = lazy(() => import('./pages/services/Plafonds'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ArticlesList = lazy(() => import('./pages/ArticlesList'))
const Article = lazy(() => import('./pages/Article'))
const AdminApp = lazy(() => import('./admin/AdminApp'))

export function AppRoutes() {
  // Layout global
  const Layout = () => (
    <div className="min-h-screen flex flex-col ">
      <Seo />
      <Suspense fallback={<Loader />}>
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </Suspense>
    </div>
  )

  return (
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<Loader />}>
              <Seo />
              <AdminApp />
            </Suspense>
          }
        />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/devis" element={<Devis />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/renovation" element={<Revonation />} />
          <Route path="/services/revonation" element={<Navigate to="/services/renovation" replace />} />
          <Route path="/services/amenagement-interieur" element={<AmenagementInterieur />} />
          <Route path="/services/travaux-aluminium" element={<TravauxAluminium />} />
          <Route path="/services/agencement-professionnel" element={<AgencementProfessionnel />} />
          <Route path="/services/travaux-menuiserie-en-bois" element={<TravauxMenuiserieBois />} />
          <Route path="/services/travaux-peinture-et-finitions" element={<Pienture />} />
          <Route path="/services/travaux-revetement-de-sol" element={<RevelementSol />} />
          <Route path="/services/travaux-plafonds-et-faux-plafonds" element={<Plafonds />} />
          <Route path="/savoir-faire" element={<SavoirFaire />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/blog" element={<Navigate to="/articles" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
