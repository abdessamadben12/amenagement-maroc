// src/App.jsx
import { BrowserRouter, Outlet, Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import Loader from './components/Loader'
import { useImagePreloader } from './hooks/useImagePreloader'

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

// الصور اللي بغيتي يتشارجيو قبل ما يبان الموقع
const imagesPayload = [
  // home images
  '/images/Amenagement_maroc_hero.png',
  '/images/Amenagement_maroc_mission_1.png',
  '/images/Amenagement_maroc_mission_2.png',
  '/images/Amenagement_maroc_accompagner.png',
  "/images/Amenagement_maroc_services_Amenagement_professionnel.png",
  "/images/Amenagement_maroc_services_amenagement_interieur.png",
  "/images/Amenagement_maroc_services_pienture.png.png",
  "/images/Amenagement_maroc_services_plafonds.png",
  "/images/Amenagement_maroc_revetement__sol.png",
  "/images/Amenagement_maroc_services_rénovation_detaill.png",
  "/images/Amenagement_maroc_services_menuiserie_bois.png",
  "/images/Amenagement_maroc_services_aluminium.png",
  "/images/Amenagement_maroc_savoir_faire.jpg"
]

// هذا الكومبونونت هو اللي كيدير التحكم فـ اللودينغ ديال الصفحات + الصور
function RouteLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const navigationType = useNavigationType()

  // كنستعملو الـhook ديالنا باش نعرفو واش الصور تلوحو
  const imagesLoaded = useImagePreloader(imagesPayload)

  // كلما تبدلات حالة الصور كنبدلو اللودينغ
  useEffect(() => {
    // إلى الصور خداو الوقت، غادي يبقى الـLoader
    if (imagesLoaded) {
      // نقدر نزيروها شوية باش متبانش وتختفي دغيا
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 200) // 200ms فقط
      return () => clearTimeout(timer)
    } else {
      setIsLoading(true)
    }
  }, [imagesLoaded])

  // (اختياري) إلا بغيتي اللودينغ حتى فالتنقلات بين الصفحات:
  // useEffect(() => {
  //   if (navigationType === 'PUSH') {
  //     setIsLoading(true)
  //     const t = setTimeout(() => setIsLoading(false), 300)
  //     return () => clearTimeout(t)
  //   }
  // }, [location.pathname, navigationType])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function App() {
  // Layout global
  const Layout = () => (
    <div className="min-h-screen flex flex-col ">
      <Suspense fallback={<Loader />}>
        <RouteLoader />
      </Suspense>
    </div>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/devis" element={<Devis />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/revonation" element={<Revonation />} />
          <Route path="/services/amenagement-interieur" element={<AmenagementInterieur />} />
          <Route path="/services/travaux-aluminium" element={<TravauxAluminium />} />
          <Route path="/services/agencement-professionnel" element={<AgencementProfessionnel />} />
          <Route path="/services/travaux-menuiserie-en-bois" element={<TravauxMenuiserieBois />} />
          <Route path="/services/travaux-peinture-et-finitions" element={<Pienture />} />
          <Route path="/services/travaux-revetement-de-sol" element={<RevelementSol />} />
          <Route path="/services/travaux-plafonds-et-faux-plafonds" element={<Plafonds />} />
          <Route path="/savoir-faire" element={<SavoirFaire />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
