import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ServiceCardOverlap = ({ image, title, description, index ,link}) => {
  const isEven = index % 2 === 0;
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative mb-10 lg:mb-16 transition-all duration-1000 will-change-transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div
        className={`flex flex-col lg:flex-row items-center ${
          !isEven ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Image Section */}
        <div className="relative w-full lg:w-3/5 h-80 lg:h-[500px] overflow-hidden group  ">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-700/30 to-transparent transition-all duration-700 pointer-events-none"></div>

          {/* Animated overlay pattern */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/20 to-gray-700/20" />
          </div>
        </div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 70 }}
          transition={{ duration: 0.8 }}
          className={`relative w-full lg:w-2/3 bg-gray-50 p-8 lg:p-10 -mt-16 lg:mt-0 mx-4 lg:mx-0 ${
            isEven ? "lg:-ml-24 lg:mr-8" : "lg:-mr-24 lg:ml-8"
          } z-10 border border-gray-200 hover:bg-gray-100 transition-all duration-500  shadow-md group`}
        >
          {/* Decorative bar */}
          <div
            className={`absolute top-0 ${
              isEven ? "left-0" : "right-0"
            } w-2 h-24 bg-[#AA957E] group-hover:h-32 transition-all duration-500 rounded-b`}
          />

          <div className="relative">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#AA957E] mb-6">
              {title}
            </h3>

            <div className="w-20 h-1.5 bg-[#AA957E] mb-6 group-hover:w-32 transition-all duration-500 rounded-full" />

            {/* Description HTML sécurisée (si tu fournis du HTML) */}
            <div
              className="text-gray-700 leading-relaxed text-lg lg:text-xl mb-8 font-medium"
              // ⚠️ Fournis la string HTML dans `description`
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {/* CTA */}
            <div className="mt-8">
              <button
                type="button"
                className="group/btn inline-flex items-center px-8 py-3 border border-black hover:bg-[#5E5E5E] hover:text-white text-[#5E5E5E] rounded-full font-bold transform hover:-translate-y-1 transition-all duration-300"
              >
                <span><Link to={link}>En savoir plus</Link></span>
                <svg
                  className="ml-3 w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const SavoirFaireOverlap = () => {
  const services = [
    {
      image: "/images/savoir-faire/Amenagement_maroc_renovation.png",
      link: "/services/revonation",
      title: "Rénovation complète",
      description:
        "Nous prenons en charge tous vos projets de rénovation, de construction et l'ensemble des travaux pour transformer vos espaces, optimiser votre confort et valoriser votre patrimoine...",
    },
    {
      image: "/images/savoir-faire/Amenagement_maroc_amenagement_interieur.png",
      link: "/services/amenagement-interieur",
      title: "Aménagement intérieur",
      description:
        "Que ce soit pour un appartement, un loft, un studio, une maison, une villa, un hôtel particulier…",
    },
    {
      image: "/images/savoir-faire/Amenagemet_maroc_Agencement.png",
      link: "/services/agencement-professionnel",
      title: "Agencement Professionnel",
      description:
        "<strong>Aménagement Maroc by Allo Invest</strong> réalise l’agencement et l’aménagement complet de tous types d’espaces professionnels : bureaux, open spaces, espaces de coworking, boutiques, magasins, hôtels, restaurants, cafés, showrooms, locaux commerciaux et établissements hôteliers...",
    },
    {
      image: "/images/savoir-faire/Amenagement_maroc_aluminium.png",
      link: "/services/travaux-aluminium",
      title: "Travaux d'aluminium",
      description:
        "<strong>Aménagement Maroc by Allo Invest</strong> vous propose ses services pour la construction de menuiseries métalliques, de fenêtres, baies vitrées et pour l'installation de menuiseries PVC ou aluminium, de vérandas et de volets roulants. Une équipe expérimentée met son savoir-faire à votre disposition pour réaliser des ouvrages métalliques...",
    },
    {
      image: "/images/savoir-faire/Amenagement_maroc_menuiserie_bois.png",
      link: "/services/travaux-menuiserie-en-bois",
      title: "Travaux de menuiserie et bois",
      description:
        "Chez <strong>Aménagement Maroc by Allo Invest</strong>, nous mettons en avant notre savoir-faire artisanal et notre expertise technique dans les travaux de menuiserie et de bois au Maroc. Projets de construction, rénovation ou aménagement intérieur : nous réalisons des ouvrages sur mesure alliant esthétique, fonctionnalité et durabilité...",
    },
    {
      image: "/images/savoir-faire/Amenagement_maroc_peinture.png",
      link: "/services/travaux-peinture-et-finitions",
      title: "Travaux de peinture",
      description:
        "Chez <strong>Aménagement Maroc by Allo Invest</strong>, nous apportons couleur, élégance et finition à vos espaces grâce à notre expertise en peinture intérieure et extérieure partout au Maroc. Rénovation, construction neuve ou aménagement : peinture décorative, technique et professionnelle, adaptée à chaque style et besoin...",
    },
    {
      image: "/images/savoir-faire/Amenagement_maroc_revetement_sol.png",
      link: "/services/travaux-revetement-de-sol",
      title: "Travaux de revêtement de sol",
      description:
        "Chez <strong>Aménagement Maroc by Allo Invest</strong>, nous sommes spécialisés dans la pose, la rénovation et la finition de tous types de revêtements de sol au Maroc. Le sol définit le confort, l’esthétique et la durabilité de vos intérieurs. Nous proposons des solutions sur mesure adaptées à votre style, votre usage et votre budget...",
    },
    {
      image: "/images/savoir-faire/Amenagement_maroc_plafond.png",
      link: "/services/travaux-plafonds-et-faux-plafonds",
      title: "Travaux de plafond",
      description:
        "Mise en œuvre de doublages (ossature ou collé, avec/sans isolation), cloisons (toutes épaisseurs), séparatives coupe-feu, plafonds avec ossature primaire/secondaire, plafonds coupe-feu, dalles minérales encastrables, carreaux de plâtre. Pose des enduits, bandes calicot, bandes d’angle, profils de finition...",
    },
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
  {/* Image d’arrière-plan */}
  <div className="absolute inset-0 z-0">
    <img
      src="/images/Amenagement_maroc_savoir_faire.jpg"   // <-- Ajoute l’extension
      alt="Savoir-faire construction"
      className="w-full h-full object-cover"
    />
    {/* Optionnel : filtre sombre pour améliorer le contraste du texte */}
    <div className="absolute inset-0 bg-black/40" />
  </div>

  {/* Contenu du Hero */}
  <section
    className="relative flex items-center justify-center w-full"
    aria-label="Section d'introduction"
  >
    <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          <span className="block text-white relative whitespace-nowrap">
            Notre Savoir-Faire
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#AA957E] rounded-full" />
          </span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="text-xl md:text-2xl text-gray-200 mb-10 max-w-4xl mx-auto leading-relaxed font-light"
      >
        Découvrez l'excellence de nos métiers et la diversité de nos compétences.
        De l'aluminium à l'électricité, nous maîtrisons chaque aspect de la
        construction et de la rénovation pour donner vie à vos projets les plus
        ambitieux.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
      >
        <button
          type="button"
          className="group px-8 py-4 bg-[#AA957E] text-white rounded-full font-semibold text-lg hover:bg-[#9A8570] transform hover:-translate-y-1 transition-all duration-300 shadow-xl"
        >
          <span className="flex items-center">
            Découvrir nos services
            <svg
              className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </button>
      </motion.div>
    </div>
  </section>
</div>


      {/* Services */}
      <div className="relative py-10 lg:py-14">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.map((service, index) => (
            <ServiceCardOverlap key={index} {...service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavoirFaireOverlap;
