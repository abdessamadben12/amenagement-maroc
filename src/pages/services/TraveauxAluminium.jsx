import { Link } from "react-router-dom";
import OptimizedImage from "../../components/OptimizedImage";

function TravauxAluminium() {
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
                  Travaux d'aluminium
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl px-4 lg:text-nowrap">
          Chez<strong> Aménagement Maroc by Allo Invest</strong> , nous mettons à votre service  notre expertise <br /> dans la conception, 
           la fabrication et la pose d’ouvrages en aluminium pour les particuliers  <br />et les 
            professionnels à travers tout le Maroc.
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
          src="/images/Amenagement_maroc_services_aluminium.png"
          alt="Travaux d'aluminium"
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
          Chez <strong>Aménagement Maroc by Allo Invest</strong> , nous mettons à votre service notre expertise dans la conception, la fabrication et la pose d’ouvrages en aluminium pour les particuliers et les professionnels à travers tout le Maroc. L’aluminium est aujourd’hui un matériau incontournable en construction, rénovation et aménagement intérieur ou extérieur, grâce à sa résistance, son esthétisme, sa durabilité et sa légèreté.

          </p>
          <p>
          Nous réalisons des travaux d’aluminium sur mesure adaptés à tous vos besoins : fenêtres, baies vitrées, portes, vérandas, garde-corps, cloisons vitrées, façades, pergolas, vitrines commerciales, volets roulants, rideaux métalliques, châssis fixes ou ouvrants, et bien plus encore. Nos solutions associent design moderne, performance thermique et acoustique, et s’intègrent parfaitement à tout type d’espace, qu’il soit résidentiel, professionnel ou commercial.

          </p>

          {/* Nos services en aluminium incluent :

- Conception et fabrication sur mesure d’ouvrages en aluminium selon vos besoins et votre style architectural
- Installation de menuiseries extérieures : fenêtres, portes-fenêtres, baies vitrées coulissantes, châssis fixes
- Façades en aluminium et mur rideau pour bâtiments modernes et locaux professionnels
- Cloisons vitrées et séparations intérieures pour bureaux, open spaces et espaces commerciaux
- Vitrines de magasins, devantures et portails commerciaux
- Pergolas, garde-corps, vérandas, verrières et auvents
- Volets roulants, stores, rideaux métalliques et motorisation
- Rénovation et remplacement d’anciennes menuiseries par des solutions aluminium modernes et performantes
 */}
      <h1 className="text-black font-bold">Nos services en aluminium:</h1>    
      <div className=" px-6 ">
        {/* Liste des services */}
        <ul className="list-disc  leading-relaxed text-base text-md font-medium text-black "   >
          <li>
            <span className="font-semibold text-black">Conception et fabrication sur mesure d’ouvrages en aluminium selon vos besoins et votre style architectural</span> pour rénovation complète.
          </li>
          <li>
            <span className="font-semibold">Installation de menuiseries extérieures</span> : fenêtres, portes-fenêtres, baies vitrées coulissantes, châssis fixes.
          </li>
          <li>
            <span className="font-semibold">Façades en aluminium et mur rideau</span> pour bâtiments modernes et locaux professionnels.
          </li>
          <li>
            <span className="font-semibold">Cloisons vitrées et séparations intérieures</span> pour bureaux, open spaces et espaces commerciaux.
          </li>
          <li>
            <span className="font-semibold">Vitrines de magasins, devantures et portails commerciaux</span> : carrelage, parquet, moquette, résine, marbre, béton ciré.
          </li>
          <li>
            <span className="font-semibold">Pergolas, garde-corps, vérandas, verrières et auvents</span> : murs, plafonds, trompe-l’œil, fresques.
          </li>
          <li>
            <span className="font-semibold">Volets roulants, stores, rideaux métalliques et motorisation</span> : cloisons, parquets, escaliers, charpente, dressings, cuisines équipées, meubles intégrés.
          </li>
          <li>
            <span className="font-semibold">Rénovation et remplacement d’anciennes menuiseries par des solutions aluminium modernes et performantes</span> : installation complète, équipements modernes et personnalisés.
          </li>
          <li>
            <span className="font-semibold">Isolation thermique et acoustique</span> pour confort et économies d’énergie.
          </li>
        </ul>

        {/* Paragraphes */}
      
      </div>
      <div className="  text-base  ">
          <p>
          Grâce à notre équipe d’artisans qualifiés et expérimentés, nous garantissons des finitions précises, une installation soignée et durable, ainsi qu’un respect total des normes de sécurité et d’isolation. Chaque projet est étudié avec soin pour offrir le meilleur rapport qualité-prix et une intégration esthétique parfaite à votre bâtiment.

          </p>
          <p>
          Nous intervenons dans tout le Maroc, notamment à Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir, Meknès et Oujda, pour des projets de menuiserie aluminium, façades vitrées, vitrines commerciales et aménagements sur mesure.
          </p>
          <p>
          Avec <strong>Aménagement Maroc by Allo Invest</strong> , bénéficiez d’un accompagnement personnalisé, d’un interlocuteur unique et d’une qualité d’exécution irréprochable pour tous vos travaux en aluminium, qu’il s’agisse de construction neuve, de rénovation ou d’aménagement professionnel.
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
export default TravauxAluminium;
