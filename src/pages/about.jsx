import { Link } from "react-router-dom";

export default function About() {
    return (
      <>
      <meta name="description" content="Aménagement Maroc est une entreprise spécialisée dans les travaux de construction, rénovation, aménagement intérieur et agencement immobilier au Maroc." /> 
      <meta name="keywords" content="Aménagement Maroc, construction, rénovation, aménagement intérieur, agencement immobilier, Maroc" />
      <meta name="author" content="Aménagement Maroc" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="google" content="notranslate" />
      <title>Aménagement Maroc - À propos de nous.</title>
      <section>
      <section className="w-full">
        {/* Bandeau haut (fond gris + grille 2 colonnes) */}
        <div className="bg-[#595E62] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 relative">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              {/* Image à gauche */}
              <div className="w-full h-full relative z-10">
                <img
                  src="/images/Amenagement_maroc_about.png"
                  alt="Échantillons matériaux"
                  className="object-cover w-full h-auto lg:absolute"
                />
              </div>
              <div className="lg:pl-10">
                <h2 className="text-3xl sm:text-4xl font-semibold">
                  À propos de nous
                </h2>
  
                <p className="mt-4  leading-relaxed text-base md:text-lg   text-white/90">
                Basée à Casablanca, <strong>Aménagement Maroc</strong> présente les services d’aménagement, 
                de rénovation, de travaux second œuvre et de finition pris en charge par la société <strong>Allo Invest</strong> .
                </p>
               
              </div>
            </div>
          </div>
        </div>
  
        {/* Bloc descriptif bas (fond clair, long texte, 2 colonnes sur large) */}
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="text-[15px] leading-relaxed ">
                {/* Colonne gauche vide - pour l'équilibre visuel */}
              </div>
              <div className="text-[15px] leading-relaxed  -mt-12 py-4   text-base md:text-lg lg:pl-10 ">
                <p>
                Depuis plus de 10 ans, nous accompagnons nos clients particuliers, promoteurs immobiliers, architectes et entreprises...
                dans la réalisation de projets clés en main partout au Maroc : Casablanca, Rabat, Marrakech, Tanger, Agadir et d'autres grandes villes.
                </p>
  
                <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 font-semibold ">
                  <Link 
                    to="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-[#595E62] px-5 py-2.5 text-white shadow hover:bg-[#595E62]/80 hover:text-white transition duration-300 text-center"
                  >
                    Contactez-nous
                  </Link>
  
                  <Link
                    to="/savoir-faire"
                    className="inline-flex items-center justify-center rounded-full border border-[#595E62] px-5 py-2.5 
                    text-[#595E62] hover:bg-[#595E62] hover:text-white transition duration-300 text-center"
                  >
                    Parcourir tous les services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </section>
      <section className="w-full flex justify-center  ">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 leading-relaxed text-base md:text-lg   pb-8">
            <p>En tant que contractant général, <strong className=" text-black  ">Aménagement Maroc by Allo Invest</strong> prend en charge l'ensemble de votre projet, de la conception à la réalisation finale, avec un interlocuteur unique, une coordination optimale des équipes et le respect strict des délais et budgets. Nous intervenons sur différents types de bâtiments : appartements, studios, maisons traditionnelles, villas, bureaux, magasins, boutiques, restaurants, cafés, hôtels, showrooms et locaux professionnels.
            </p>
            <br />
            <p>
            Notre atelier de finition est équipé de technologies modernes : thermoformage, cabines de vernissage, salles d'égrenage, chambres de séchage, nous permettant de réaliser tout type de finition haut de gamme : laque, vernis, résine, boiserie décorative, mobilier sur mesure. Cette maîtrise technique nous permet d'assurer un résultat durable, esthétique et parfaitement adapté à chaque projet.
            </p>
            <br />
            <p>
            Grâce à notre expérience et à notre réseau d'artisans qualifiés, <span className="font-bold text-black">Aménagement Maroc by Allo Invest</span> garantit des travaux de construction, de rénovation et de décoration de qualité, conformes aux normes marocaines. Notre approche repose sur la transparence, la qualité d'exécution, et une relation de confiance avec nos clients.
            </p>
            <br />
            <p>
            Que vous souhaitiez rénover un appartement ou une villa, réaménager un local commercial ou moderniser un espace professionnel, nous vous accompagnons dans chaque étape pour donner vie à vos idées.
            </p>
        </div>
      </section>
      
      <section className="w-full flex justify-center bg-[#AF937F] text-white">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 font-semibold text-lg sm:text-xl flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center py-10 w-full">
            <h2 className="text-center md:text-left">Prêt à transformer vos idées en espace complet ?</h2>
            <Link 
              to="/devis" 
              className="inline-flex items-center border text-md md:text-lg border-white justify-center rounded-full hover:bg-white px-5 py-2.5 text-white transition-all duration-300 hover:bg-white hover:text-black whitespace-nowrap"
            >
              Obtenez un devis
            </Link>
        </div>
      </section>
      </>
    );
}