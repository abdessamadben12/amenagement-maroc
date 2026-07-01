import { Link } from "react-router-dom";
import OptimizedImage from "../../components/OptimizedImage";

function RevelementSol() {
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
            Travaux de revêtement de sol
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl px-4 lg:text-nowrap">
          Chez <strong> Aménagement Maroc by Allo Invest </strong>, nous sommes spécialisés dans la pose, la rénovation <br /> et la finition de tous types de revêtements de sol au Maroc
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
          src="/images/Amenagement_maroc_revetement__sol.png"
          alt="Revêtement de sol"
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
          Chez <strong> Aménagement Maroc by Allo Invest</strong>, nous sommes spécialisés dans la pose, la rénovation et la finition de tous types de revêtements de sol au Maroc. Le sol est un élément essentiel de tout espace : il définit le confort, l’esthétique et la durabilité de vos intérieurs. C’est pourquoi nous vous proposons des solutions sur mesure, adaptées à votre style, votre usage et votre budget.

          </p>
          <p>
          Nos équipes de professionnels qualifiés interviennent pour les particuliers (appartements, villas, maisons, studios) et les professionnels (bureaux, hôtels, restaurants, magasins, showrooms, espaces commerciaux), en garantissant un travail précis, rapide et durable.

          </p>
          
          {/*Nos prestations de revêtement de sol comprennent :

- Pose de carrelage et faïence : sols, murs, salles de bains, cuisines, terrasses.
- Parquet massif, stratifié ou contrecollé : chaleureux, élégant et résistant.
- Revêtements en vinyle, PVC ou lino : parfaits pour les espaces commerciaux ou humides.
- Marbre, granit et pierre naturelle : finitions haut de gamme pour un rendu luxueux et intemporel.
- Béton ciré et sols résine : modernes, lisses et faciles d’entretien.
- Moquette et revêtements souples : confort acoustique et esthétique douce pour hôtels, bureaux et chambres.
- Rénovation et ponçage de parquet : pour redonner éclat et longévité à vos sols existants.
- Ragréage, isolation et préparation des supports avant la pose.

 */}
      <h1 className="text-black font-bold">Nos prestations de revêtement de sol comprennent :</h1>    
      <div className=" px-6 ">
        {/* Liste des services */}
        <ul className="list-disc  leading-relaxed font-medium text-black "   >
          <li>
            <span className="font-semibold text-black">Pose de carrelage et faïence</span> : murs, plafonds, boiseries, escaliers, plinthes, encadrements de portes et fenêtres.
          </li>
          <li>
            <span className="font-semibold">Parquet massif, stratifié ou contrecollé</span> : chaleureux, élégant et résistant.
          </li>
          <li>
            <span className="font-semibold">Revêtements en vinyle, PVC ou lino</span> : parfaits pour les espaces commerciaux ou humides.
          </li>
          <li>
            <span className="font-semibold">Marbre, granit et pierre naturelle</span> : finitions haut de gamme pour un rendu luxueux et intemporel.
          </li>
          <li>
            <span className="font-semibold">Béton ciré et sols résine</span> : modernes, lisses et faciles d’entretien.
          </li>
          <li>
            <span className="font-semibold">Moquette et revêtements souples</span> : confort acoustique et esthétique douce pour hôtels, bureaux et chambres.
          </li>
          <li>
            <span className="font-semibold">Rénovation et ponçage de parquet</span> : pour redonner éclat et longévité à vos sols existants.
          </li>
          <li>
            <span className="font-semibold">Ragréage, isolation et préparation des supports avant la pose</span> .
          </li>
        </ul>
      </div>
      <div className="    ">
          <p>
          Nos experts vous accompagnent à chaque étape, du choix des matériaux jusqu’à la pose finale, en tenant compte de vos besoins techniques (résistance à l’humidité, au passage, à la chaleur) et esthétiques (couleurs, textures, finitions). Nous travaillons avec des marques reconnues et des matériaux de qualité pour garantir un résultat durable, harmonieux et haut de gamme.

          </p>
          <br />
          <p>
          Avec <strong>Aménagement Maroc by Allo Invest</strong> , transformez vos sols en un élément de design et de confort, alliant esthétique, résistance et qualité irréprochable. Faites confiance à notre savoir-faire pour sublimer vos espaces de vie ou de travail avec des revêtements modernes, élégants et durables.
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
export default RevelementSol;
