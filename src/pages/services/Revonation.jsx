import { Link } from "react-router-dom";
import OptimizedImage from "../../components/OptimizedImage";

function Revonation() {
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
            Rénovation complète
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl px-4 lg:text-nowrap">
            Aménagement Maroc vous accompagne dans tous vos projets de rénovation d'appartements, <br/>
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
        <OptimizedImage
          src="/images/Amenagement_maroc_services_rénovation_detaill.png"
          alt="Rénovation complète"
          className="w-full h-64 sm:h-80 md:h-96 lg:h-[450px] xl:h-[500px] object-cover bg-center"
          loading="lazy"
        />
      </div>

      {/* SECTION TEXTE (fond blanc) — le texte touche l'image */}
      <section className="w-full bg-white  pt-0">
        <div className="max-w-6xl mx-auto space-y-6 text-start
         md:text-left leading-relaxed text-base md:text-lg text-light
          px-4 sm:px-8 md:px-12 py-12">
          <p>
            Nous prenons en charge tous vos projets de rénovation, de construction
            et l'ensemble des travaux pour transformer vos espaces, optimiser votre
            confort et valoriser votre patrimoine.
          </p>
          <p>
            Nos services s'étendent également à la réhabilitation de bureaux,
            boutiques, hôtels, restaurants et locaux professionnels, avec une
            approche complète de space planning et design intérieur.
          </p>
          <p>
            L'étude de votre projet peut être réalisée par nos soins ou par
            l'architecte de votre choix, et nous coordonnons tous les corps de
            métier pour garantir qualité, respect des délais et maîtrise du
            budget.
          </p>

          {/* Plomberie et chauffage : installation et réparation des réseaux, équipements sanitaires, chaudières, radiateurs, chauffe-eau.

Électricité et domotique : mise aux normes, installation de systèmes électriques et domotiques modernes.

Revêtements de sols : carrelage, parquet, moquette, résine, marbre, béton ciré.

Peinture classique et décorative : murs, plafonds, trompe-l’œil, fresques.

Menuiserie et mobilier sur mesure : cloisons, parquets, escaliers, charpente, dressings, cuisines équipées, meubles intégrés.

Cuisine et salle de bain : installation complète, équipements modernes et personnalisés.

Climatisation, ventilation, fluides et chauffage central.

Isolation thermique et acoustique pour confort et économies d’énergie.

Décoration intérieure et design sur mesure pour optimiser votre espace et votre style. */}
      <h1 className="text-black font-bold">Nos services de rénovation:</h1>    
      <div className=" px-6 ">
        {/* Liste des services */}
        <ul className="list-disc  leading-relaxed text-base text-md font-medium text-black "   >
          <li>
            <span className="font-semibold text-black">Démolition et préparation des espaces</span> pour rénovation complète.
            <span className="font-semi text-black">Démolition et préparation des espaces</span> pour rénovation complète.
          </li>
          <li>
            <span className="font-semibold">Maçonnerie et plâtrerie</span> : cloisonnement, doublage, faux-plafond, reprise de structure.
          </li>
          <li>
            <span className="font-semibold">Plomberie et chauffage</span> : installation et réparation des réseaux, équipements sanitaires, chaudières, radiateurs, chauffe-eau.
          </li>
          <li>
            <span className="font-semibold">Électricité et domotique</span> : mise aux normes, installation de systèmes électriques et domotiques modernes.
          </li>
          <li>
            <span className="font-semibold">Revêtements de sols</span> : carrelage, parquet, moquette, résine, marbre, béton ciré.
          </li>
          <li>
            <span className="font-semibold">Peinture classique et décorative</span> : murs, plafonds, trompe-l’œil, fresques.
          </li>
          <li>
            <span className="font-semibold">Menuiserie et mobilier sur mesure</span> : cloisons, parquets, escaliers, charpente, dressings, cuisines équipées, meubles intégrés.
          </li>
          <li>
            <span className="font-semibold">Cuisine et salle de bain</span> : installation complète, équipements modernes et personnalisés.
          </li>
          <li>
            <span className="font-semibold">Climatisation, ventilation, fluides et chauffage central.</span>
          </li>
          <li>
            <span className="font-semibold">Isolation thermique et acoustique</span> pour confort et économies d’énergie.
          </li>
          <li>
            <span className="font-semibold">Décoration intérieure et design sur mesure</span> pour optimiser votre espace et votre style.
          </li>
        </ul>

        {/* Paragraphes */}
      
      </div>
      <div className="  text-base  ">
          <p>
            Avec <span className="font-semibold">Aménagement Maroc by Allo Invest</span>, vos projets de rénovation de maison, appartement, villa ou local
            professionnel sont réalisés clé en main, avec un interlocuteur unique, un suivi complet et des
            finitions modernes, fonctionnelles et durables.
          </p>
          <p>
            Nous intervenons partout au Maroc, notamment à <span className="font-semibold">Casablanca, Marrakech, Rabat, Fès, Tanger,
            Agadir, Meknès</span> et dans toutes les villes du royaume, pour offrir une rénovation complète et sur
            mesure, adaptée à vos besoins et à votre style.
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
export default Revonation;
