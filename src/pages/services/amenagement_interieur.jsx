import React from "react";
import { Link } from "react-router-dom";

function AmenagementInterieur() {
  return (
    <div className="w-full flex flex-col items-center overflow-hidden">
      {/* SECTION HERO (fond gris) */}
      <section
        className="
          bg-[#595E62] text-white w-full flex flex-col justify-center
          px-4 sm:px-8 md:px-12 pt-12 md:pt-16
          /* === réserve l'espace pour éviter que l'image ne couvre le texte === */
          pb-32 sm:pb-40 md:pb-48 lg:pb-[225px] xl:pb-[250px]
        "
      >
        <div className="max-w-7xl mx-auto py-4 -mt-4 w-full text-start px-5">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold px-5 mb-8">
            Aménagement intérieur
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl px-4 lg:text-nowrap">
            Chez <strong>Aménagement Maroc by Allo Invest</strong> , nous vous accompagne dans tous vos projets<br/> de rénovation d'appartements, 
            lofts, studios, maisons, hôtels particuliers, villas et projets Airbnb.
          </p>
        </div>
      </section>

      {/* IMAGE (moitié sur gris, moitié sur blanc) */}
      <div
        className="
          w-full max-w-7xl mx-auto
          /* === remonte l'image de moitié de sa hauteur === */
          -mt-32 sm:-mt-40 md:-mt-48 lg:-mt-[225px] xl:-mt-[250px]
          px-8 pt-6
        "
      >
        <img
          src="/images/Amenagement_maroc_services_amenagement_interieur.png"
          alt="Aménagement intérieur"
          className="w-full h-64 sm:h-80 md:h-96 lg:h-[450px] xl:h-[500px] object-cover bg-center"
          loading="lazy"
        />
      </div>

      {/* SECTION TEXTE (fond blanc) — le texte touche l'image */}
      <section className="w-full bg-white  pt-0">
        <div className="max-w-6xl mx-auto space-y-6 text-start
         md:text-left leading-relaxed text-base md:text-lg text-light
          px-4  sm:px-8 md:px-12 py-10"
          >
          <p>
          Que ce soit pour un appartement, un loft, un studio, une maison, une villa, un hôtel particulier, ou encore un projet Airbnb, nous prenons en charge chaque étape de votre projet, de la conception à la réalisation, avec un interlocuteur unique pour simplifier vos travaux et assurer la coordination de tous les corps de métier. Nous intervenons partout au Maroc, notamment à Casablanca, Marrakech, Rabat, Fès, Tanger, Agadir, Meknès, et dans toutes les villes et régions du royaume.

          </p>
          <p>
          Notre expertise couvre l’ensemble des métiers du BTP nécessaires à un aménagement intérieur complet :
          <strong>maçonnerie, plâtrerie, cloisonnement, faux-plafond, doublage, électricité, plomberie, chauffage, climatisation, revêtements de sols, carrelage, parquet, peinture classique ou décorative, menuiserie sur mesure, cuisine équipée, dressing, salle de bain, isolation thermique et acoustique</strong>
          , et bien plus encore. Nous réalisons la construction ou l’extension de bâtiments, la réhabilitation de locaux professionnels, et l’agencement de bureaux, boutiques, hôtels ou restaurants, avec un design fonctionnel et esthétique adapté à vos besoins.

          </p>
          <p>
          Choisir <strong>Aménagement Maroc by Allo Invest</strong>  pour votre projet d’aménagement d’intérieur au Maroc, c’est bénéficier d’une gestion complète des travaux, d’une coordination parfaite des différents corps de métier, du respect du budget et des délais, et d’un résultat clé en main, moderne et fonctionnel. Notre équipe prend en charge tous les aspects techniques et décoratifs, pour transformer vos espaces en intérieurs confortables, optimisés et élégants, que ce soit pour vos espaces résidentiels ou professionnels, vos maisons, appartements, villas, bureaux, boutiques ou hôtels.
          </p>
          <p>Avec <strong>Aménagement Maroc by Allo Invest</strong> , vos projets d’aménagement, rénovation et agencement deviennent simples, rapides et sereins, partout au Maroc, grâce à une expertise reconnue et un suivi personnalisé qui garantit la qualité et la durabilité des travaux.</p>
    
        </div>
      </section>
      <section className="w-full flex justify-center bg-[#AF937F] text-white">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 font-semibold text-lg sm:text-xl flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center py-10 w-full">
            <h2 className="text-center md:text-left">Prêt à transformer vos idées en espace complet ?</h2>
            <Link
              to="/devis" 
              className="inline-flex items-center gap-4 border text-md md:text-lg border-white justify-center rounded-full 
              px-5 py-2.5 text-white transition-all duration-300 hover:bg-white hover:text-black whitespace-nowrap"
            >
              Obtenez un devis
            </Link>
        </div>
      </section>
    </div>
  );
}
export default AmenagementInterieur;
