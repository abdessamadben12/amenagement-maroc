import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import OptimizedImage from './OptimizedImage';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  hover: { scale: 1.03, transition: { duration: 0.3 } },
};

const arrowVariants = {
  rest: { rotate: -35 },
  hover: { rotate: 0, x: 5, transition: { duration: 0.3 } },
};

const ArrowIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 ml-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    variants={arrowVariants}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </motion.svg>
);

const ProjectCard = ({ imageUrl, title, category, className = '' }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover="hover"
    >
      <OptimizedImage
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        sizes="(max-width: 767px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75" />
      <div className="absolute bottom-6 left-6 text-white">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex flex-col mt-2">
          <div className="w-full h-px bg-gray-300" />
          <div className="flex items-center w-full py-4">
            <span className="w-2 h-2 bg-[#AF937F] rounded-full mr-2" />
            <p className="text-sm">{category}</p>
            <motion.a
              href="#"
              className="ml-4 flex items-center text-sm"
              initial="rest"
              whileHover="hover"
            >
              <ArrowIcon />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const RecentWork = () => {
  const [headerRef, headerInView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section */}
          <div>
            <motion.p
              ref={headerRef}
              className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Travaux Récents
            </motion.p>
            <motion.h2
              className="text-4xl font-extrabold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Découvrez notre <br /> projet le plus récent
            </motion.h2>

            <ProjectCard
              imageUrl="/images/Amenagement_maroc_services_renovation.png"
              title="Rénovation complète à Casablanca"
              category="Rénovation Générale"
              className="mt-8 h-96"
            />

            <motion.p
              className="mt-8 text-gray-600"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Aménagement Maroc by Allo Invest prend en charge chaque étape de votre projet,
              de la conception à la livraison, pour un résultat clé en main et sans stress.
            </motion.p>

            <motion.button
              className="mt-8 px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-black hover:text-white transition duration-200"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              Parcourir le portfolio
            </motion.button>
          </div>

          {/* Right Section */}
          <div className="space-y-8">
            <ProjectCard
              imageUrl="/images/Amenagement_maroc_services_amenagement_interieur.png"
              title="Aménagement intérieur à Rabat"
              category="Aménagement Intérieur"
              className="mt-8 h-80"
            />
            <ProjectCard
              imageUrl="/images/Amenagement_maroc_services_agencement_professionnel.png"
              title="Agencement professionnel à Marrakech"
              category="Agencement Professionnel"
              className="h-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentWork;
