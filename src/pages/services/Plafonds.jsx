import { Link } from "react-router-dom";
import OptimizedImage from "../../components/OptimizedImage";

function Plafonds() {
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
            Travaux de plafonds et faux plafonds
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl px-4 lg:text-nowrap">
          Chez <strong> Aménagement Maroc by Allo Invest</strong>, nous vous accompagnons dans la pose, <br />la rénovation et la décoration de plafonds et faux plafonds pour tous vos espaces <br />résidentiels et professionnels au Maroc
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
          src="/images/Amenagement_maroc_services_plafonds.png"
          alt="Plafonds et faux plafonds"
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
          Chez <strong>Aménagement Maroc by Allo Invest </strong>, nous vous accompagnons dans la pose, la rénovation et la décoration de plafonds et faux plafonds pour tous vos espaces résidentiels et professionnels au Maroc. Que ce soit pour un appartement, une villa, un bureau, un magasin, un hôtel ou un restaurant, nous créons des plafonds esthétiques, modernes et fonctionnels, adaptés à vos besoins techniques et décoratifs.

          </p>
          <p>
          Nos équipes qualifiées assurent un travail précis, alliant design, durabilité et optimisation acoustique et thermique. Le plafond est un élément central dans l’aménagement intérieur : il valorise vos espaces, intègre l’éclairage et contribue au confort global.

          </p>
          
          {/*Nos prestations de plafond et faux plafond :

- Pose de faux plafonds en plaques de plâtre (placo) : pour masquer câbles, tuyaux, gaines techniques et imperfections
- Plafonds suspendus et décoratifs : designs modernes, corniches, moulures et effets lumineux
- Plafonds acoustiques : isolation phonique pour bureaux, salles de réunion, hôtels et restaurants
- Plafonds en bois ou lambris : pour un rendu chaleureux et élégant
- Plafonds techniques et modulaires : adaptés aux locaux professionnels, magasins, hôpitaux et écoles
- Intégration d’éclairage et spots encastrés pour un rendu harmonieux et fonctionnel
- Rénovation et remise à neuf de plafonds existants : réparation, lissage, peinture et finition décorative


 */}
      <h1 className="text-black font-bold">Nos prestations de plafond et faux plafond comprennent :</h1>    
      <div className=" px-6 ">
        {/* Liste des services */}
        <ul className="list-disc  leading-relaxed  font-medium text-black "   >
          <li>
            <span className="font-semibold text-black">Pose de faux plafonds en plaques de plâtre (placo)</span> : pour masquer câbles, tuyaux, gaines techniques et imperfections.
          </li>
          <li>
            <span className="font-semibold">Plafonds suspendus et décoratifs</span> : designs modernes, corniches, moulures et effets lumineux.
          </li>
          <li>
            <span className="font-semibold">Plafonds acoustiques</span> : isolation phonique pour bureaux, salles de réunion, hôtels et restaurants.
          </li>
          <li>
            <span className="font-semibold">Plafonds en bois ou lambris</span> : pour un rendu chaleureux et élégant.
          </li>
          <li>
            <span className="font-semibold">Plafonds techniques et modulaires</span> : adaptés aux locaux professionnels, magasins, hôpitaux et écoles.
          </li>
          <li>
            <span className="font-semibold">Intégration d’éclairage et spots encastrés</span> : pour un rendu harmonieux et fonctionnel.
          </li>
          <li>
            <span className="font-semibold">Rénovation et remise à neuf de plafonds existants</span> : réparation, lissage, peinture et finition décorative.
          </li>
          <li>
            <span className="font-semibold">Rénovation et remise à neuf de plafonds existants</span> : réparation, lissage, peinture et finition décorative.
          </li>
        </ul>
      </div>
      <div className="    ">
          <p>
          Nous utilisons des matériaux de qualité, résistants à l’humidité et aux variations climatiques, garantissant longévité, esthétique et sécurité. Chaque projet est réalisé avec un interlocuteur unique, garantissant une coordination parfaite des travaux, le respect du budget et des délais, et un résultat moderne et clé en main.

          </p>
          <br />
          <p>

          Nous intervenons dans tout le Maroc, pour tous vos projets de plafonds, faux plafonds, plafonds suspendus et décoratifs, qu’ils soient résidentiels ou professionnels.
          </p>
          <br />
          <p>
          Avec <strong>Aménagement Maroc by Allo Invest</strong> , vos plafonds deviennent un élément de design à part entière, combinant fonctionnalité, esthétisme et confort, et transformant vos espaces en lieux modernes, lumineux et accueillants.
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
export default Plafonds;
