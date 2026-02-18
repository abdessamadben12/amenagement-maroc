import React from "react";
import { Link } from "react-router-dom";

function AgencementProfessionnel() {
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
            Agencement professionnel
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl px-4 lg:text-nowrap">
            Aménagement Maroc by Allo Invest vous accompagne dans tous vos projets de rénovation d'appartements, <br/>
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
          src="/images/Amenagement_maroc_services_Amenagement_professionnel.png"
          alt="Travaux de agencement professionnel"
          className="w-full h-64 sm:h-80 md:h-96 lg:h-[450px] xl:h-[500px] object-cover bg-center"
          loading="lazy"
        />
      </div>

      {/* SECTION TEXTE (fond blanc) — le texte touche l'image */}
      <section className="w-full bg-white  pt-0">
        <div className="max-w-6xl mx-auto space-y-6 text-start
         md:text-left leading-relaxed text-base md:text-lg text-light
          px-4 sm:px-8 md:px-12 py-10">
          <p>
          <strong>Aménagement Maroc by Allo Invest</strong> réalise l’agencement et l’aménagement complet de tous types d’espaces professionnels : bureaux, open spaces, espaces de coworking, boutiques, magasins, hôtels, restaurants, cafés, showrooms, locaux commerciaux et établissements hôteliers.
          </p>
          <p>
          Notre mission est de créer des espaces de travail et de vente fonctionnels, ergonomiques et esthétiques, pensés pour favoriser la productivité, le bien-être et l’image de marque de votre entreprise. Grâce à notre expertise, nous assurons un accompagnement global, du conseil en conception et space planning jusqu’à la livraison clé en main.
          </p>
          <p>
          Nos équipes d’artisans, de designers et de techniciens spécialisés conçoivent des aménagements sur mesure répondant aux besoins de chaque client : optimisation des surfaces, amélioration de la circulation et des flux, confort acoustique et thermique, valorisation de la lumière naturelle, choix des matériaux et des finitions les plus adaptés.

          </p>

          {/* - Étude et conception du projet (plans, modélisation 3D, space planning, décoration intérieure)
- Travaux de maçonnerie et plâtrerie : cloisonnement, doublage, faux-plafonds, isolation acoustique
- Installation électrique complète : éclairage, courant fort/faible, domotique, réseaux informatiques
- Plomberie, chauffage et climatisation pour le confort et la performance énergétique
- Revêtements de sols : carrelage, moquette, parquet, résine, vinyle, selon le style et l’usage de vos locaux
- Peinture et finitions décoratives : ambiances sur mesure, harmonisation des espaces
- Menuiserie sur mesure et mobilier intégré : comptoirs d’accueil, rangements, placards, bibliothèques, cuisines professionnelles, tables de réunion, habillages muraux
- Décoration et signalétique : mise en valeur de votre identité visuelle et de votre marque
 */}
      <h1 className="text-black font-bold">Nos prestations comprennent :</h1>    
      <div className=" px-6 ">
        {/* Liste des services */}
        <ul className="list-disc  leading-relaxed    text-black "   >
          <li>
            <span className="font-semibold text-black">Étude et conception du projet</span> (plans, modélisation 3D, space planning, décoration intérieure).
          </li>
          <li>
            <span className="font-semibold">Travaux de maçonnerie et plâtrerie</span> : cloisonnement, doublage, faux-plafonds, isolation acoustique.
          </li>
          <li>
            <span className="font-semibold">Installation électrique complète</span> : éclairage, courant fort/faible, domotique, réseaux informatiques.
          </li>
          <li>
            <span className="font-semibold">Plomberie, chauffage et climatisation</span> pour le confort et la performance énergétique.
          </li>
          <li>
            <span className="font-semibold">Revêtements de sols</span> : carrelage, moquette, parquet, résine, vinyle, selon le style et l’usage de vos locaux.
          </li>
          <li>
            <span className="font-semibold">Peinture et finitions décoratives</span> : ambiances sur mesure, harmonisation des espaces.
          </li>
          <li>
            <span className="font-semibold">Menuiserie sur mesure et mobilier intégré</span> : comptoirs d’accueil, rangements, placards, bibliothèques, cuisines professionnelles, tables de réunion, habillages muraux.
          </li>
          <li>
            <span className="font-semibold">Décoration et signalétique</span> : mise en valeur de votre identité visuelle et de votre marque.
          </li>
        </ul>
        {/* Paragraphes */}
      </div>
      <div className="   ">
          <p>
          Grâce à notre savoir-faire,   <strong>Aménagement Maroc by Allo Invest</strong> garantit une coordination complète de tous les corps d’état et un suivi rigoureux du chantier. Vous bénéficiez d’un interlocuteur unique pour un projet fluide, maîtrisé et conforme à vos attentes.

          </p>
          <p>
          Nous intervenons partout au Maroc, notamment à Casablanca, Mohammedia, Bouznika, Témara et Rabat pour accompagner les professionnels dans leurs projets d’agencement de bureaux, aménagement commercial et rénovation de locaux professionnels.

          </p>
          <p>

Avec <strong>Aménagement Maroc by Allo Invest</strong> , vous profitez d’un service sur mesure, d’une qualité irréprochable et d’un résultat moderne, fonctionnel et clé en main, conçu pour durer et refléter l’excellence de votre entreprise.
          </p>
        </div>
       
        
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
export default AgencementProfessionnel;
