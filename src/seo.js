export const SITE_URL = 'https://amenagement-maroc.com'
export const DEFAULT_IMAGE = `${SITE_URL}/logo_Aménagement.png`

export const routeSeo = {
  '/': {
    title: 'Aménagement Maroc | Construction et rénovation',
    description: 'Entreprise de construction, rénovation et aménagement intérieur au Maroc. Un interlocuteur unique pour piloter votre projet de A à Z.',
  },
  '/about': {
    title: 'À propos | Aménagement Maroc',
    description: 'Découvrez Aménagement Maroc by Allo Invest, notre expertise, notre méthode de suivi et notre réseau d’artisans qualifiés au Maroc.',
  },
  '/savoir-faire': {
    title: 'Notre savoir-faire | Aménagement Maroc',
    description: 'Découvrez nos métiers : rénovation, aménagement intérieur, menuiserie, aluminium, peinture, plafonds et revêtements de sol.',
  },
  '/contact': {
    title: 'Contact | Aménagement Maroc',
    description: 'Contactez Aménagement Maroc à Casablanca pour discuter de votre projet de construction, rénovation ou aménagement.',
  },
  '/devis': {
    title: 'Demande de devis gratuit | Aménagement Maroc',
    description: 'Demandez gratuitement un devis personnalisé pour vos travaux de construction, rénovation, agencement ou aménagement au Maroc.',
  },
  '/services/renovation': {
    title: 'Rénovation complète au Maroc | Aménagement Maroc',
    description: 'Rénovation complète de maisons, appartements, villas et locaux professionnels au Maroc, avec coordination et suivi des travaux.',
  },
  '/services/amenagement-interieur': {
    title: 'Aménagement intérieur au Maroc | Aménagement Maroc',
    description: 'Conception et réalisation d’aménagements intérieurs sur mesure pour appartements, maisons, villas et espaces professionnels.',
  },
  '/services/agencement-professionnel': {
    title: 'Agencement professionnel au Maroc | Aménagement Maroc',
    description: 'Agencement de bureaux, commerces, restaurants, hôtels et locaux professionnels avec une réalisation complète et sur mesure.',
  },
  '/services/travaux-aluminium': {
    title: 'Travaux d’aluminium au Maroc | Aménagement Maroc',
    description: 'Conception, fabrication et pose de fenêtres, baies vitrées, vérandas, volets et ouvrages en aluminium sur mesure.',
  },
  '/services/travaux-menuiserie-en-bois': {
    title: 'Menuiserie bois au Maroc | Aménagement Maroc',
    description: 'Travaux de menuiserie bois sur mesure : portes, placards, dressings, cuisines, mobilier et parquet pour tous vos espaces.',
  },
  '/services/travaux-peinture-et-finitions': {
    title: 'Peinture et finitions au Maroc | Aménagement Maroc',
    description: 'Travaux de peinture intérieure et extérieure, décoration et finitions professionnelles pour vos projets au Maroc.',
  },
  '/services/travaux-revetement-de-sol': {
    title: 'Revêtement de sol au Maroc | Aménagement Maroc',
    description: 'Pose et rénovation de carrelage, parquet, marbre, vinyle et autres revêtements de sol adaptés à votre projet.',
  },
  '/services/travaux-plafonds-et-faux-plafonds': {
    title: 'Plafonds et faux plafonds au Maroc | Aménagement Maroc',
    description: 'Pose de plafonds, faux plafonds, cloisons et solutions d’isolation pour logements et locaux professionnels au Maroc.',
  },
}

export const prerenderRoutes = Object.keys(routeSeo)

export function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/'
  return pathname.replace(/\/+$/, '')
}

export function getSeoForPath(pathname) {
  const path = normalizePath(pathname)
  const data = routeSeo[path]

  if (!data) {
    return {
      title: 'Page introuvable | Aménagement Maroc',
      description: 'La page demandée est introuvable.',
      canonical: `${SITE_URL}${path}`,
      image: DEFAULT_IMAGE,
      robots: 'noindex, nofollow',
    }
  }

  return {
    ...data,
    canonical: `${SITE_URL}${path === '/' ? '/' : path}`,
    image: DEFAULT_IMAGE,
    robots: 'index, follow',
  }
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['GeneralContractor', 'HomeAndConstructionBusiness'],
  '@id': `${SITE_URL}/#business`,
  name: 'Aménagement Maroc',
  alternateName: 'Aménagement Maroc by Allo Invest',
  url: `${SITE_URL}/`,
  logo: DEFAULT_IMAGE,
  image: `${SITE_URL}/images/Amenagement_maroc_hero.avif`,
  telephone: '+212668746386',
  email: 'contact@amenagement-maroc.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3, Avenue 2 Mars, Résidence Marwa, 5ème étage',
    addressLocality: 'Casablanca',
    addressCountry: 'MA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 33.582567,
    longitude: -7.617896,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Maroc',
  },
}
