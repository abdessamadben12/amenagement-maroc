import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function ContractingHero() {
    const [taille, setTaille] = useState(window.innerWidth);
    
    useEffect(() => {
        const handleResize = () => {
            setTaille(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const cards = [
        "10 ans d'expérience",
        "+30 collaborateur",
        "100% de satisfaction client",
    ];

    return (
        <div className={`flex flex-col bg-[#595E62] ${taille < 759 ? 'min-h-full' : ''}`}>
            <div className="w-full text-white relative">
                {/* Hero */}
                <section className="relative w-full">
                    <div className="pointer-events-none absolute inset-0" />

                    <div className="w-full mx-auto max-w-7xl 2xl:max-w-8xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center items-start gap-8 lg:gap-12 py-8">
                            {/* Left copy */}
                            <div className="flex flex-col justify-center">
                                <h1
                                    className="text-start text-balance tracking-tight 
                                    text-3xl sm:text-3xl md:text-3xl lg:text-3xl 2xl:text-4xl leading-tight font-semibold"
                                >
                                    <span className={taille < 1134 ? "block text-nowrap" : " blocktext-nowrap"}>Une solution clé en main</span>
                                    <span className={taille < 1134 ? "block text-nowrap" : " block text-nowrap"}>un interlocuteur unique</span>
                                    <span className="block">pour tout votre projet.</span>
                                </h1>

                                <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-md lg:text-lg leading-relaxed text-white/90 ">
                                    De la conception à la réalisation, pour tous vos travaux maison, appartement et villas.
                                    Oubliez le stress des travaux et le choix des matériaux, on s'occupe de tout.
                                </p>

                                <div className={`mt-6 sm:mt-8 flex ${taille < 1134 ? 'flex-col' : 'flex-row'} items-stretch sm:items-center gap-3 sm:gap-4`}>
                                    <Link to="/devis"
                                        className="inline-flex font-semibold items-center justify-center rounded-full bg-[#AF937F] text-white px-6 py-3 sm:px-7 lg:px-8 xl:px-10 sm:py-3.5 lg:py-4  shadow-md transition-all hover:translate-y-0.5 hover:shadow-lg hover:bg-[#8d7766] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                                    >
                                        Demandez un devis
                                        <span className="ml-2 font-semibold inline-flex h-5 w-5 items-center justify-center rounded-full text-current text-xs">→</span>
                                    </Link>

                                    <Link to="/contact"
                                        className="inline-flex items-center justify-center font-semibold rounded-full border border-white/80 bg-transparent text-white px-6 py-3 sm:px-7 lg:px-8 xl:px-10 sm:py-3.5 lg:py-4  transition-all hover:bg-white/10 hover:border-white focus:outline-none focus:ring-2 focus:ring-white/40"
                                    >
                                        Contactez‑nous
                                    </Link>
                                </div>
                            </div>

                            {/* Right image */}
                            <div className="relative w-full">
                                <div className={`absolute w-full lg:h-[50vh] xl:h-[55vh] md:h-full  z-30 ${taille < 1134 ? 'relative' : ''}`}>
                                    {/* Big photo */}
                                    <img
                                        src="/images/Amenagement_maroc_hero.png"
                                        alt="Entrepreneur du bâtiment tenant un clipboard sur un chantier"
                                        className={`w-full object-cover object-center ${taille < 762 ? 'h-full' : ''}`}
                                        loading="lazy"
                                    />
                                    {/* <img src="/images/Amenagement_maroc_hero.png" alt="Entrepreneur du bâtiment tenant un clipboard sur un chantier" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}