import { Link } from "react-router-dom";
import OptimizedImage from "../../components/OptimizedImage";

function Pienture() {
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
            Travaux de peinture et finitions
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl px-4 lg:text-nowrap">
          Chez <strong>Aménagement Maroc by Allo Invest </strong>, nous apportons couleur, élégance et finition à vos espaces grâce <br /> à notre expertise dans les travaux de peinture intérieure et extérieure partout au Maroc
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
          src="/images/Amenagement_maroc_services_pienture.png.png"
          alt="Travaux de peinture et finitions"
          className="w-full h-64 sm:h-80 md:h-96 lg:h-[450px] xl:h-[500px] object-cover bg-center"
          loading="lazy"
        />
      </div>

      {/* SECTION TEXTE (fond blanc) — le texte touche l'image */}
      <section className="w-full bg-white  pt-0">
        <div className="max-w-6xl mx-auto space-y-6 text-start
         md:text-left leading-relaxed text-base  md:text-lg text-light
          px-4 sm:px-8 md:px-12 py-12">
          <p>
          Chez <strong> Aménagement Maroc by Allo Invest</strong>, nous apportons couleur, élégance et finition à vos espaces grâce à notre expertise dans les travaux de peinture intérieure et extérieure partout au Maroc. Que ce soit pour une rénovation, une construction neuve ou un aménagement, nous réalisons des prestations de peinture décorative, technique et professionnelle, adaptées à chaque style et à chaque besoin.
          </p>
          <p>
            Nos peintres qualifiés mettent un point d’honneur à garantir des finitions parfaites, un travail propre et soigné, et une application durable des produits de haute qualité. Nous intervenons aussi bien dans les espaces résidentiels (appartements, villas, maisons, studios, lofts) que dans les espaces professionnels (bureaux, hôtels, restaurants, magasins, locaux commerciaux, immeubles).

          </p>
          
          {/* Nos prestations de peinture comprennent :

- Peinture intérieure : murs, plafonds, boiseries, escaliers, plinthes, encadrements de portes et fenêtres.
- Peinture extérieure et façades : protection et embellissement des murs extérieurs contre le climat marocain.
- Peinture décorative et artistique : effets spéciaux (béton ciré, stucco, tadelakt, patine, enduits décoratifs).
- Ravalement de façades et remise à neuf des surfaces anciennes ou abîmées.
- Pose de papier peint, toile de verre, revêtements muraux pour un rendu unique et personnalisé.
- Préparation des supports : ponçage, rebouchage, enduits, lissage et nettoyage avant application.

 */}
      <h1 className="text-black font-bold">Nos prestations de peinture comprennent :</h1>    
      <div className=" px-6 ">
        {/* Liste des services */}
        <ul className="list-disc  leading-relaxed    text-black "   >
          <li>
            <span className="font-semibold text-black">Peinture intérieure</span> : murs, plafonds, boiseries, escaliers, plinthes, encadrements de portes et fenêtres.
          </li>
          <li>
            <span className="font-semibold">Peinture extérieure et façades</span> : protection et embellissement des murs extérieurs contre le climat marocain.
          </li>
          <li>
            <span className="font-semibold">Peinture décorative et artistique</span> : effets spéciaux (béton ciré, stucco, tadelakt, patine, enduits décoratifs).
          </li>
          <li>
            <span className="font-semibold">Ravalement de façades et remise à neuf des surfaces anciennes ou abîmées</span> .
          </li>
          <li>
            <span className="font-semibold">Pose de papier peint, toile de verre, revêtements muraux pour un rendu unique et personnalisé</span> .
          </li>
          <li>
            <span className="font-semibold">Préparation des supports</span> : ponçage, rebouchage, enduits, lissage et nettoyage avant application.
          </li>
        </ul>
      </div>
      <div className="   ">
          <p>
          Nos équipes travaillent avec des peintures professionnelles de haute qualité (acrylique, glycéro, mate, satinée ou brillante), garantissant une excellente tenue dans le temps, une couleur uniforme et une protection durable contre l’humidité et les variations de température.

          </p>
          <br />
          <p>
          Nous intervenons dans tout le Maroc, pour des projets de peinture, décoration et rénovation intérieure ou extérieure.

          </p>
          <br />
          <p>
          Avec <strong>Aménagement Maroc by Allo Invest</strong> , vous profitez d’un interlocuteur unique, d’un service clé en main et d’une exécution impeccable, que ce soit pour une peinture de maison, d’appartement, de villa ou de local professionnel. Nous allions savoir-faire, créativité et précision pour donner à vos espaces une nouvelle vie, harmonieuse et élégante.
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
export default Pienture;
