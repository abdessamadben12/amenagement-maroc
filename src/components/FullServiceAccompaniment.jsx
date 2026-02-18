import React from 'react';
import { Link } from 'react-router-dom';

const FullServiceAccompaniment = () => {
  return (
    <div className='w-full flex justify-center items-center px-4 sm:px-6 lg:px-8 py-8 bg-white'>
      <div className="flex flex-col lg:flex-row items-center justify-center max-w-7xl w-full">
        {/* Text Section */}  
        <div className="lg:w-1/2 p-4 lg:p-8 lg:pr-16 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#AA957E] mb-4 sm:mb-6 leading-tight">
            Souhaitez-vous <br className="hidden sm:inline" /> un accompagnement <br className="hidden sm:inline" />complet de A à Z?
          </h2>
          <p className="text-gray-600 mb-3 sm:mb-4 text-base sm:text-lg ">
            Confiez-nous votre projet et profitez d'un accompagnement complet, où chaque détail est pris en charge.
          </p>
          <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg ">
            De la planification à la livraison, nous nous assurerons que votre rénovation, aménagement ou agencement soit réalisé avec qualité, efficacité et sérénité.
          </p>
          <Link
              to="/devis"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center
               justify-center px-6 sm:px-8 py-2 sm:py-3 border border-transparent text-sm sm:text-base
                font-semibold rounded-full text-white bg-[#595E62] hover:bg-[#AF937F] transition duration-700 "
              
            >
              Obtenez un devis
            </Link>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 xl:w-[50%] mt-8 lg:mt-0 relative flex justify-center">
          <img
            src="/images/Amenagement_maroc_accompagner.png" // Replace with your image path
            alt="Renovation work in progress"
            className="w-full max-w-md lg:max-w-none h-auto object-cover "
          />
        </div>
      </div>
    </div>
  );
};

export default FullServiceAccompaniment;