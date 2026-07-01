import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 } },
};

const lineVariants = {
  hidden: { width: 0 },
  visible: { width: '100%', transition: { duration: 0.6, ease: 'easeOut' } },
};

const AboutUsSection = () => {
  const navigate = useNavigate();

  const [leftRef, leftInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [rightRef, rightInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [img1Ref, img1InView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [img2Ref, img2InView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="-mt-16 overflow-hidden md:-mt-4">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex flex-col-reverse gap-10 md:gap-10 sm:gap-10 lg:gap-0 lg:flex-row">

          {/* Left Column */}
          <motion.div
            ref={leftRef}
            className="w-full lg:w-1/2 flex flex-col"
            variants={sectionVariants}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
          >
            {/* Image 1 wrapper — animation on the div, not the img */}
            <div className="relative mb-8 lg:mb-12">
              <motion.div
                ref={img1Ref}
                variants={imageVariants}
                initial="hidden"
                animate={img1InView ? 'visible' : 'hidden'}
              >
                <OptimizedImage
                  src="/images/Amenagement_maroc_mission_1.png"
                  alt="Construction worker on site"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[450px] object-cover"
                  sizes="(max-width: 1023px) 100vw, 50vw"
                />
              </motion.div>
              <motion.div
                className="absolute -top-4 -left-4 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white hidden lg:block"
                initial={{ opacity: 0, x: -50, y: -50 }}
                animate={img1InView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </div>

            {/* Text + Button */}
            <motion.div
              className="flex flex-col items-start gap-6 w-full"
              variants={sectionVariants}
              initial="hidden"
              animate={leftInView ? 'visible' : 'hidden'}
            >
              <motion.p
                className="w-full leading-relaxed text-base md:text-lg lg:text-xl"
                variants={textVariants}
              >
                Avec <span className="text-black font-bold">Aménagement Maroc by Allo Invest</span>, votre projet est pris en charge de A à Z, de la conception à la réalisation, pour un résultat clé en main et sans stress.
              </motion.p>
              <div className="w-full flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={() => navigate('/contact')}
                  className="px-6 py-3 md:px-8 bg-[#595E62] text-white md:py-4 lg:px-10 lg:py-4 border border-gray-800 hover:bg-[#AF937F] hover:text-white hover:border-white hover:border rounded-full shadow-sm transition duration-300 text-sm md:text-base lg:text-lg font-semibold"
                  variants={buttonVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contactez-nous
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            ref={rightRef}
            className="w-full lg:w-1/2 lg:pl-8 xl:pl-12 mt-12 lg:mt-0"
            variants={sectionVariants}
            initial="hidden"
            animate={rightInView ? 'visible' : 'hidden'}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 flex justify-center"
                variants={lineVariants}
                initial="hidden"
                animate={rightInView ? 'visible' : 'hidden'}
              >
                <div className="w-full h-[1px] bg-[#595E62] rounded-full" />
              </motion.div>
              <motion.p
                className="text-sm md:text-base uppercase text-gray-700 tracking-[0.15em] font-semibold"
                variants={textVariants}
                initial="hidden"
                animate={rightInView ? 'visible' : 'hidden'}
              >
                Notre Mission
              </motion.p>
            </div>

            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl text-[#AF937F] lg:text-5xl xl:text-5xl font-semibold leading-tight mb-6 lg:mb-8 lg:-translate-x-16 xl:-translate-x-20"
              initial={{ opacity: 0, x: -50 }}
              animate={rightInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            >
              Tous les métiers <br />sont réunis chez{' '}
              <div className="text-[#595E62] md:mt-2">Aménagement Maroc</div>
            </motion.h2>

            {/* Image 2 wrapper */}
            <div className="relative mt-8 lg:mt-10">
              <motion.div
                ref={img2Ref}
                variants={imageVariants}
                initial="hidden"
                animate={img2InView ? 'visible' : 'hidden'}
              >
                <OptimizedImage
                  src="/images/Amenagement_maroc_mission_2.png"
                  alt="Construction workers looking at plans"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[450px] object-cover"
                  sizes="(max-width: 1023px) 100vw, 50vw"
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-4 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white hidden lg:block"
                initial={{ opacity: 0, x: 50, y: 50 }}
                animate={img2InView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
