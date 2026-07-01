// components/Footer.jsx
import { BiPhone } from 'react-icons/bi';
import { FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className="flex w-full justify-center bg-[#595E62]">
        <footer className="text-gray-300 w-full max-w-6xl px-4 md:px-8 py-10  ">
          {/* Conteneur principal */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Section gauche */}
            <div className="col-span-1 text-white ">
              <div className="flex  md:justify-start mb-4">
                <img
                  src="/logo_Aménagement.png"
                  alt="Aménagement Maroc Logo"
                  width="2384"
                  height="621"
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-[80%] max-w-[220px]"
                />
              </div>
              <p className="text-sm mb-4  md:text-left">
                Nous coordonnons tous les corps de métier: maçonnerie, électricité, plomberie, menuiserie, peinture, revêtements de sol.
              </p>
              <p className="text-sm  md:text-left">
                Pour vous offrir un résultat clé en main, fonctionnel et esthétique, sans stress et parfaitement adapté à vos besoins.
              </p>
            </div>
      
            {/* Autres sections */}
            <div className="md:col-span-3 flex flex-col mt-5 
            md:flex-row justify-around items-start gap-6 text-gray-700">
              <FooterNav />
              <GetQuote />
              <ContactInfo />
            </div>
          </div>
      
          {/* Ligne de bas */}
          <div className="mt-12 pt-6 border-t border-gray-300 text-center text-xs text-gray-600">
            <p className='text-white'>© 2025 Aménagement Maroc by Allo Invest. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
      
    );
};

export default Footer;

// components/FooterNav.jsx
const FooterNav = () => {
    const navItems = [
        { name: 'ACCUEIL', link: '/' },
        { name: 'À PROPOS', link: '/about' },
        { name: 'SAVOIR-FAIRE', link: '/savoir-faire' },
        { name: 'CONTACT', link: '/contact' },
    ];
    return (
        <div className="col-span-1 md:col-span-1">
            <ul className="space-y-2">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <Link to={item.link} 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="text-white font-semibold hover:text-[#AF937F] transition-colors duration-300">{item.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};


// components/GetQuote.jsx
const GetQuote = () => {
    return (
        <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">DEMANDE DE DEVIS</h3>
            <p className="text-sm mb-6  text-white">Partagez votre vision <br /> avec notre équipe et <br /> obtenez un devis rapide.</p>
            <Link to="/devis" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-transparent border font-semibold border-white
             text-white px-6 py-3 rounded-full 
             hover:bg-white hover:text-gray-800 
             transition-colors duration-300 ">
                Obtenez un devis
            </Link>
        </div>
    );
};


// components/ContactInfo.jsx
// You would import SVG icons from a library or define them inline here
const LocationIcon = () => (
    <svg className="w-5 h-5 mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);
const PhoneIcon = () => (
  <FaWhatsapp />
);
const MailIcon = () => (
    <svg className="w-5 h-5 mr-3 " fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
);

const ContactInfo = () => {
    return (
        <div className="col-span-1 md:col-span-1  text-white">
            <div className="flex items-center mb-4">
                <FaMapMarkerAlt className='w-5 h-5 mr-3'/>
                <p className="text-sm">3, Avenue 2 Mars Résidence <br /> Marwa 5 ème étage, Casablanca.</p>
            </div>
            <div className="flex items-center mb-4">
                <BiPhone className='w-5 h-5 mr-3 text-white'/>
                <div>
                    <a href="tel:+212 668-746386" className="block hover:text-white transition-colors duration-300">06 68 74 63 86</a>
                    <a href="tel:+212 522484425" className="block hover:text-white transition-colors duration-300">05 22 48 44 25</a>
                </div>
            </div>
            <div className="flex items-center">
                <FaEnvelope className='w-5 h-5 mr-3 text-white'/>
                <a href="mailto:contact@amenagement-maroc.com" className="hover:text-white break-all transition-colors duration-300">contact@amenagement-maroc.com</a>
            </div>
        </div>
    );
};
