import React from "react";
import { Link } from "react-router-dom";

function TravauxMenuiserieBois() {
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
            Travaux de menuiserie en bois
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl px-4 lg:text-nowrap">
          Chez <strong>Aménagement Maroc by Allo Invest</strong> , nous mettons en avant notre savoir-faire artisanal <br /> et notre expertise technique dans les travaux de menuiserie et de bois au Maroc.
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
          src="/images/Amenagement_maroc_services_menuiserie_bois.png"
          alt="Travaux de menuiserie en bois"
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
          Chez <strong>Aménagement Maroc by Allo Invest</strong> , nous mettons en avant notre savoir-faire artisanal et notre expertise technique dans les travaux de menuiserie et de bois au Maroc. Que ce soit pour un projet de construction, de rénovation ou d’aménagement intérieur, nous concevons et réalisons des ouvrages sur mesure alliant esthétique, fonctionnalité et durabilité.

          </p>
          <p>
          Nos menuisiers expérimentés travaillent avec des matériaux nobles et de qualité, comme le bois massif, le MDF, le contreplaqué, le stratifié ou le bois exotique, pour créer des espaces chaleureux, modernes et raffinés. Nous intervenons aussi bien pour les particuliers (maisons, appartements, villas, studios) que pour les professionnels (bureaux, hôtels, restaurants, boutiques, espaces commerciaux).

          </p>
          {/* Nos prestations de menuiserie et bois :

- Menuiserie intérieure : portes, placards, dressings, bibliothèques, escaliers, boiseries murales, parquets, plinthes et moulures.
- Menuiserie extérieure : volets, pergolas, terrasses, clôtures, portails et abris de jardin.
- Mobilier sur mesure : conception et fabrication de meubles uniques – tables, comptoirs, bureaux, lits, rangements et éléments décoratifs.
- Agencement professionnel : aménagement de bureaux, magasins, hôtels, restaurants, cafés, avec création de mobilier adapté à l’image de votre marque.
- Cuisines et salles de bain sur mesure : conception complète, installation et finitions de haute qualité.
- Pose et rénovation de parquet : massif, stratifié, contrecollé ou vinyle, selon le style et le budget.
- Travaux de vernissage, peinture et finitions décoratives pour un rendu impeccable.
 */}
          <h1 className="text-black font-bold">Nos prestations de menuiserie et bois :</h1>    
      <div className=" px-6 ">
        {/* Liste des services */}
        <ul className="list-disc  leading-relaxed text-base text-md font-medium text-black "   >
          <li>
            <span className="font-semibold text-black">Menuiserie intérieure</span> : portes, placards, dressings, bibliothèques, escaliers, boiseries murales, parquets, plinthes et moulures.
          </li>
          <li>
            <span className="font-semibold">Menuiserie extérieure</span> : volets, pergolas, terrasses, clôtures, portails et abris de jardin.
          </li>
          <li>
            <span className="font-semibold">Mobilier sur mesure</span> : conception et fabrication de meubles uniques – tables, comptoirs, bureaux, lits, rangements et éléments décoratifs.
          </li>
          <li>
            <span className="font-semibold">Agencement professionnel</span> : aménagement de bureaux, magasins, hôtels, restaurants, cafés, avec création de mobilier adapté à l’image de votre marque.
          </li>
          <li>
            <span className="font-semibold">Cuisines et salles de bain sur mesure</span> : conception complète, installation et finitions de haute qualité.
          </li>
          <li>
            <span className="font-semibold">Pose et rénovation de parquet</span> : massif, stratifié, contrecollé ou vinyle, selon le style et le budget.
          </li>
          <li>
            <span className="font-semibold">Travaux de vernissage, peinture et finitions décoratives</span> pour un rendu impeccable.
          </li>
        </ul>
      </div>
      <div>
        <p>Nos artisans menuisiers garantissent un travail soigné, précis et personnalisé, dans le respect des délais, du budget et des normes de qualité. Grâce à notre bureau d’étude et de conception, chaque projet est pensé dans les moindres détails, du design à la pose, pour un résultat harmonieux, pratique et durable.
        </p>
        <br />
        <p>
        Nous intervenons dans tout le Maroc, pour vos projets de menuiserie bois, mobilier sur mesure, agencement intérieur et aménagement professionnel.
        </p>
        <br />
        <p>
        Avec <strong>Aménagement Maroc by Allo Invest</strong>, vous bénéficiez d’un interlocuteur unique, d’une coordination complète de tous les corps de métier et d’un accompagnement de A à Z pour sublimer vos espaces avec l’élégance adu bois.
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
export default TravauxMenuiserieBois;
