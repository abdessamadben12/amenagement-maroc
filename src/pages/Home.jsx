import AboutUsSection from "../components/misionSection";
import ContractingHero from "../components/Hero";
import QualitySection from "../components/PresentBranding";
import FullServiceAccompaniment from "../components/FullServiceAccompaniment";
import ServicesSection from "../components/ServicesSection";
import { State } from "../components/state";


export function Home(){
    return<>
    <ContractingHero />
    <State/>
    <AboutUsSection/>
     <ServicesSection/>
    <QualitySection/>
    <section className="w-full flex justify-center bg-[#AF937F] text-white mt-10">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 font-semibold text-lg sm:text-xl flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center py-10 w-full">
            <h1>Chez Aménagement Maroc by Allo Invest, nous assurons la gestion et la coordination   de tous vos travaux.</h1>
        </div>
      </section>
    <FullServiceAccompaniment/> 
    </>
}
