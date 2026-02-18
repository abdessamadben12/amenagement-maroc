import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
function QualitySection() {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0,
      x: -50,
      clipPath: "polygon(0 100%, 0 100%, 10% 100%, 10% 100%, 20% 100%, 20% 100%, 100% 100%, 100% 100%)"
    },
    visible: {
      opacity: 1,
      x: 0,
      clipPath: "polygon(0 100%, 0 20%, 10% 20%, 10% 10%, 20% 10%, 20% 0, 100% 0, 100% 100%)",
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      y: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#ffffff",
      color: "#000000",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className='bg-white  px-4 sm:px-6 lg:px-8 overflow-hidden '>
      <div className='max-w-7xl mx-auto'>
        <motion.div 
          ref={ref}
          className='relative flex flex-col lg:flex-row justify-center items-center'
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Video Placeholder avec animation */}
          <motion.div 
            className='relative w-full lg:w-[60%] z-0 lg:mr-[-10%]'
            variants={imageVariants}
          >
            <motion.img
              style={{
                clipPath: "polygon(0 100%, 0 20%, 10% 20%, 10% 10%, 20% 10%, 20% 0, 100% 0, 100% 100%)",
              }}
              className='w-full h-auto object-cover'
              src="/images/Amenagement_maroc_pourqoi_choisi.png" 
              alt="Quality showcase"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.4 }
              }}
            />
            {/* Overlay avec effet de brillance */}
            <motion.div 
              className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent'
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          </motion.div>

          {/* Content Block avec animation */}
          <motion.div 
            className='relative w-full lg:w-[50%] mt-8 lg:mt-0 z-10'
            variants={contentVariants}
          >
            <motion.div 
             className="w-full h-full md:mt-20 lg:mt-20 xl:mt-20     bg-[#595E62] text-white p-8 md:p-12 lg:p-16"

              whileHover={{
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <motion.p 
                className='text-white text-xl md:text-2xl    mb-2'
                variants={textVariants}
              >
              Pourquoi nous choisir ?
              </motion.p>
              
              <motion.p 
                className=' text-xl lg:text-2xl xl:text-3xl text-nowrap text-white mb-6 font-bold '
                variants={textVariants}
              >
                Nous choisir c’est la tranquillité <br /> d’esprit, la qualité irréprochable,<br /> et la garantie d’un résultat <br /> à la hauteur de vos attentes.
              </motion.p>
              
              <motion.button 
              
                onClick={() =>{

                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  navigate('/about')
                }}
                className='px-8 py-3 border border-white text-white rounded-full hover:bg-[#AF937F] hover:text-white hover:border-white hover:border rounded-full shadow-sm transition duration-300 text-sm md:text-base lg:text-lg font-semibold'
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                En savoir plus
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default QualitySection;