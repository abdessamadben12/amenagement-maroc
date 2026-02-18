import React from 'react';
import { motion } from 'framer-motion'; // Importez motion de framer-motion
import { useNavigate } from 'react-router-dom';
const AboutUsSection = () => {
  const navigate = useNavigate();
  // Définition des variantes d'animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, filter: "grayscale(0%)", transition: { duration: 0.8, ease: "easeOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.3 } },
  };

  const socialIconVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: i * 0.1, // Délai décalé pour chaque icône
      },
    }),
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: { width: "100%", transition: { duration: 0.6, ease: "easeOut" } },
  };


  return (
    <section className="  -mt-16 overflow-hidden md:-mt-4"> {/* Ajout de overflow-hidden pour éviter les barres de défilement pendant l'animation */}
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex  flex-col-reverse gap-10 md:gap-10 sm:gap-10 lg:gap-0 lg:flex-row ">
          {/* Left Column - Image and Content */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col"
            initial="hidden"
            whileInView="visible" // Anime lorsque le composant entre dans le viewport
            viewport={{ once: true, amount: 0.3 }} // Anime une seule fois et quand 30% visible
            variants={sectionVariants}
          >
            {/* Image */}
            <div className="relative mb-8 lg:mb-12">
              <motion.img
                src="/images/Amenagement_maroc_mission_1.png"
                alt="Construction worker on site"
                className="w-full h-[300px] sm:h-[400px] lg:h-[450px] object-cover" // Retiré grayscale ici car l'animation le gérera
                initial={{ opacity: 0, scale: 0.95, filter: "grayscale(100%)" }} // État initial avec grayscale
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={imageVariants}
              />
              {/* Abstract shape */}
              <motion.div
                className="absolute -top-4 -left-4 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white hidden lg:block"
                initial={{ opacity: 0, x: -50, y: -50 }}
                whileInView={{ opacity: 1, x: 0, y: 0, transition: { duration: 0.6, delay: 0.2 } }}
                viewport={{ once: true, amount: 0.5 }}
              ></motion.div>
            </div>

            {/* Description and Buttons */}
            <motion.div
              className="flex flex-col items-start gap-6 w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants} // Utilise les mêmes variantes pour un fondu/déplacement groupé
            >
              <motion.p
                className="w-full  leading-relaxed text-base md:text-lg lg:text-xl"
                variants={textVariants}
              >
Avec <span className='text-black font-bold'>Aménagement Maroc  by Allo Invest</span>, votre projet est pris en charge de A à Z, de la conception à la réalisation, pour un résultat clé en main et sans stress.
              </motion.p>
              <div className="w-full flex flex-col sm:flex-row gap-4">
              
                <motion.button
                onClick={() => navigate('/contact')}
                  className="px-6 py-3 md:px-8 bg-[#595E62] text-white  md:py-4 lg:px-10 lg:py-4 border border-gray-800 
                  hover:bg-[#AF937F] hover:text-white hover:border-white hover:border rounded-full shadow-sm
                    transition duration-300 text-sm md:text-base lg:text-lg font-semibold"
                  variants={buttonVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contactez-nous
                </motion.button>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              className="flex flex-col h-[1px] sm:flex-row justify-between items-center mt-12 lg:mt-16 pt-6 lg:pt-8 border-t border-[#595E62]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={textVariants} // Utilise les mêmes variantes pour un fondu/déplacement groupé
            >
              <div className="flex space-x-4 lg:space-x-6">
                {['facebook-f', 'twitter', 'instagram', 'pinterest'].map((icon, i) => (
                  <motion.a
                    key={icon}
                    href="#"
                    className="text-gray-500 hover:text-gray-900 transition duration-300 text-lg md:text-xl"
                    variants={socialIconVariants}
                    custom={i} // Passer l'index pour le délai décalé
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className={`fab fa-${icon}`}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content and Image */}
          <motion.div
            className="w-full lg:w-1/2 lg:pl-8 xl:pl-12 mt-12 lg:mt-0" // Ajout de marge pour les petits écrans si nécessaire
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <div className="flex items-center gap-3">
              {/* Ligne décorative à gauche */}
              <motion.div
                className="w-10 flex justify-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
                variants={lineVariants}
              >
                <div className="w-full h-[1px] bg-[#595E62] rounded-full"></div>
              </motion.div>

              {/* Texte de section */}
              <motion.p
                className="text-sm md:text-base uppercase text-gray-700 tracking-[0.15em] font-semibold"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
                variants={textVariants}
              >
                Notre Mission
              </motion.p>
            </div>

            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl text-[#AF937F]
               lg:text-5xl xl:text-5xl font-semibold 
               leading-tight mb-6 lg:mb-8 lg:-translate-x-16 xl:-translate-x-20 "
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } }}
              viewport={{ once: true, amount: 0.5 }}
            >
             Tous les métiers <br />sont réunis chez   <div className='text-[#595E62]  md:mt-2'>Aménagement Maroc</div>
            </motion.h2>

            {/* Bottom Right Image */}
            <div className="relative mt-8 lg:mt-10">
              <motion.img
                src="/images/Amenagement_maroc_mission_2.png"
                alt="Construction workers looking at plans"
                className="w-full h-[300px] sm:h-[400px] lg:h-[450px] object-cover" // Retiré grayscale ici
                initial={{ opacity: 0, scale: 0.95, filter: "grayscale(100%)" }}
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={imageVariants}
              />
              {/* Abstract shape */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white hidden lg:block"
                initial={{ opacity: 0, x: 50, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0, transition: { duration: 0.6, delay: 0.2 } }}
                viewport={{ once: true, amount: 0.5 }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;