import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link, useNavigate } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
// Animation variants réutilisables
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9
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

const imageVariants = {
  hidden: { scale: 1.1 },
  visible: {
    scale: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

const iconVariants = {
  hidden: { rotate: -40, opacity: 0 },
  visible: {
    rotate: -40,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    rotate: 0,
    x: 5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#AF937F",
    color: "#fff",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.95
  }
};

const primaryButtonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#AF937F",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.95
  }
};

const ServiceCard = ({ title, description, imageUrl, className = '', index,link }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
  <Link
  to={link}
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    <motion.div
      ref={ref}
      className={`relative group overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 bg-white ${className}`}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      custom={index}
      style={{
        transition: "all 0.3s ease"
      }}
    >
      {/* Image Container */}
      <motion.div className="overflow-hidden">
        <OptimizedImage
          src={imageUrl}
          alt={title}
          className="w-full h-48 sm:h-56 md:h-64 object-cover object-center "
          variants={imageVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          whileHover="hover"
        />
        {/* Overlay effect */}
        <motion.div 
          className="absolute inset-0  group-hover:bg-black/10 transition-all duration-300"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        />
      </motion.div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <div className='flex justify-between items-center mb-3'>
          <motion.h3 
            className="text-lg sm:text-xl font-semibold text-[#AA957E]"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {title}
          </motion.h3>
          
          <motion.a 
            href="#" 
            className="flex items-center text-gray-800 hover:text-gray-900 font-medium"
            variants={iconVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover="hover"
          >
          </motion.a>
        </div>
        
        <motion.p 
          className="text-sm sm:text-base text-gray-600"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          {description}
        </motion.p>
      </div>

      {/* Border animation on hover */}
      <motion.div 
        className="absolute bottom-0 left-0 w-0 h-1 bg-gray-900 group-hover:w-full transition-all duration-500"
        whileHover={{ width: "100%" }}
      />
    </motion.div>
  </Link>
  );
};

const ServicesSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="md:pb-48  bg-white overflow-hidden ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 sm:mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Header Text */}
          <motion.div 
            className="mb-6 md:mb-0"
            variants={headerVariants}
          >
           <div className="flex items-center gap-3">
              {/* Ligne décorative à gauche */}
              <motion.div
                className="w-10 flex justify-center"
                initial="hidden"
                whileInView="visible"
               
              >
                <div className="w-full h-[2px] bg-gradient-to-r from-[#AA957E] to-black rounded-full"></div>
              </motion.div>

              {/* Texte de section */}
              <motion.p
                className="text-sm md:text-base uppercase text-gray-700 tracking-[0.15em] font-semibold"
               
               
              >
                Nos Services
              </motion.p>
            </div>
            <motion.h2 
              className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-[#595E62] leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Votre projet, <br className="hidden sm:block" /> <span className='text-nowrap'>tous les services <span className='text-[#AA957E]'>inclus</span></span>
            </motion.h2>
          </motion.div>

          {/* Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
            variants={headerVariants}
          >
            <motion.div
              onClick={() => navigate('/contact')}
              className="inline-flex items-center justify-center
               px-6 sm:px-8 py-2 sm:py-3 border border-transparent
                text-sm sm:text-base font-semibold rounded-full
                cursor-pointer
                 text-white bg-[#595E62] hover:bg-[#AF937F] transition duration-300"
              variants={primaryButtonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Contactez-nous
            </motion.div>
            <motion.button
              onClick={() => navigate('/savoir-faire')}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-2
               sm:py-3 border border-gray-300 text-sm sm:text-base 
               font-semibold rounded-full text-gray-700 bg-white hover:bg-[#AF937F]
                hover:text-white transition duration-700"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Parcourir tous les services
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start md:translate-y-28 lg:translate-y-28 xl:translate-y-28"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <ServiceCard
            title="Rénovation complète"
            description="Nous prenons en charge tous vos projets de rénovation et de construction…"
            imageUrl="/images/Amenagement_maroc_services_renovation.png"
            index={0}
            link="/services/renovation"
          />
          <ServiceCard
    title="Aménagement intérieur"
            description="Que ce soit pour un appartement, un loft, un studio, une maison, une villa, un hôtel particulier…"
    imageUrl="/images/Amenagement_maroc_services_aménagement.png"
            className="md:-mt-8 lg:-mt-16"
            index={1}
            link="/services/amenagement-interieur"
          />
          <ServiceCard
            title="Agencement Professionnel"
            description="Nous réalisons l’agencement et l’aménagement complet de bureaux, espaces de coworking…"
    imageUrl="/images/Amenagement_maroc_services_agencement_professionnel.png"
            className="md:-mt-16 lg:-mt-32 "
            index={2}
            link="/services/agencement-professionnel"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
