import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  
  const navLinks = [
    { name: "ACCUEIL", href: "/" },
    { name: "À PROPOS", href: "/about" },
    { name: "SAVOIR FAIRE", href: "/savoir-faire" },
    { name: "SERVICES", href: "/services" },
    { name: "DEVIS", href: "/devis" },
    { name: "CONTACT", href: "/contact" },
  ];
  
  const servicesDropdown = [
    { name: "Rénovation complète", href: "/services/renovation" },
    { name: "Aménagement intérieur", href: "/services/amenagement-interieur" },
    { name: "Agencement professionnel", href: "/services/agencement-professionnel" },
    { name: "Travaux d'aluminium", href: "/services/travaux-aluminium" },
    { name: "Travaux de menuiserie en bois", href: "/services/travaux-menuiserie-en-bois" },
    { name: "Travaux de peinture et finitions", href: "/services/travaux-peinture-et-finitions" },
    { name: "Travaux de revêtement de sol", href: "/services/travaux-revetement-de-sol" },
    { name: "Travaux Plafonds et faux plafonds", href: "/services/travaux-plafonds-et-faux-plafonds" },
  ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" } },
  };

  return (
    <header className="w-full px-4 bg-[#595E62] relative z-50">
      <div className="flex items-center justify-between py-3 md:py-4 max-w-7xl 2xl:max-w-8xl mx-auto">
        {/* Logo Centré (pour desktop), à gauche pour mobile */}
        <Link to="/" className="flex-grow flex   justify-start md:justify-center lg:flex-none lg:order-none">
          <img
            src="/logo_Aménagement.png"
            alt="Aménagement Maroc"
            width="2384"
            height="621"
            className="w-40 h-9 md:w-48 md:h-11 lg:w-56 lg:h-12 object-contain"
            loading="eager"
          />
        </Link>

        {/* Menu de navigation principal (desktop) */}
        <nav className="nav-text hidden lg:flex items-center gap-6 xl:gap-8 text-sm xl:text-base text-white">
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.name === "SERVICES" ? (
                <div
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="relative hover:text-[#AF937F] transition-colors font-semibold duration-300 group cursor-pointer flex items-center">
                    {link.name}
                    <svg
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        className="absolute top-full left-0  mt-2 w-60 px-3 bg-white  shadow-lg py-2 z-50"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {servicesDropdown.map((service) => (
                          <Link
                            key={service.name}
                            to={service.href}
                            className="block px-2 py-2 text-sm text-nowrap text-gray-700 hover:bg-gray-100 hover:text-[#AF937F] transition-colors duration-200"
                            onClick={() => setDropdownOpen(false)}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to={link.href}
                  className="relative hover:text-[#AF937F] transition-colors font-semibold duration-300 group cursor-pointer"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Bouton de menu mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white hover:text-gray-300 transition-colors duration-300"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isMobileMenuOpen ? (
              <motion.svg
                key="close"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: 90, opacity: 1 }}
                exit={{ rotate: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="menu"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Menu mobile (déroulant) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 px-4 border-t border-gray-100"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col gap-2 text-base font-medium text-gray-700">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.name === "SERVICES" ? (
                    <div className="border-b border-gray-100 last:border-b-0">
                      <button
                        onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                        className="flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-[#AF937F] hover:text-[#595E62] transition-colors duration-200"
                      >
                        <span>{link.name}</span>
                        <svg
                          className={`h-4 w-4 transition-transform duration-200 ${
                            mobileDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <AnimatePresence>
                        {mobileDropdownOpen && (
                          <motion.div
                            className="pl-4 mt-1 space-y-1"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {servicesDropdown.map((service) => (
                              <Link
                                key={service.name}
                                to={service.href}
                                className="block py-2 px-3 rounded-md hover:bg-gray-100 hover:text-[#AF937F] transition-colors duration-200 text-sm"
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setMobileDropdownOpen(false);
                                }}
                              >
                                {service.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      className="block py-2 px-3 rounded-md hover:bg-[#AF937F] hover:text-white transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
