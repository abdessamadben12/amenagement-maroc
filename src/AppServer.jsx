import { Suspense } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import Seo from './components/Seo'
import Loader from './components/Loader'
import { Home } from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/about'
import SavoirFaire from './pages/SavoirFaire'
import Devis from './pages/DemandeDevez'
import Revonation from './pages/services/Revonation'
import AmenagementInterieur from './pages/services/amenagement_interieur'
import TravauxAluminium from './pages/services/TraveauxAluminium'
import AgencementProfessionnel from './pages/services/AgencementProfessionnel'
import TravauxMenuiserieBois from './pages/services/TravauxMenuiserieBois'
import Pienture from './pages/services/Pienture'
import RevelementSol from './pages/services/RevêtementSol'
import Plafonds from './pages/services/Plafonds'
import NotFound from './pages/NotFound'
import ArticlesList from './pages/ArticlesList'
import Article from './pages/Article'

function Layout() {
  return (
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
}

export default function AppServer() {
  return (
    <Routes>
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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
