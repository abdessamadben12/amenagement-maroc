import React from 'react';
import { motion } from 'framer-motion';

const Blog = () => {
  const articles = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop',
      title: '12 astuces de designers pour choisir la palette de couleurs parfaite pour votre maison',
      description: 'Lorem ipsum dolor sit amet consectetur sed potenti in justo augue volutpat nam diam.',
      category: 'RÉNOVATION',
      date: '30 OCT, 2026',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop',
      title: '25 tendances couleurs que les designers ont hâte de voir en 2023',
      description: 'Lorem ipsum dolor sit amet consectetur sed potenti in justo augue volutpat nam diam.',
      category: 'DESIGN',
      date: '28 OCT, 2026',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop',
      title: 'Améliorations DIY astucieuses que vous pouvez faire pendant la pandémie',
      description: 'Lorem ipsum dolor sit amet consectetur sed potenti in justo augue volutpat nam diam.',
      category: 'CONSTRUCTION',
      date: '26 OCT, 2026',
    },
  ];

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 1.1 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.8
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#000",
      color: "#fff",
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.section 
      className="py-6 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <motion.p 
            className="text-sm tracking-widest uppercase text-gray-500 mb-2"
            variants={textVariants}
          >
            — NOTRE BLOG —
          </motion.p>
          <motion.h2 
            className="text-4xl font-bold text-gray-900"
            variants={textVariants}
          >
            Dernières actualités et articles
          </motion.h2>
        </motion.div>

        {/* Articles Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {articles.map((article) => (
            <motion.div 
              key={article.id} 
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="overflow-hidden">
                <motion.img
                  className="w-full h-60 object-cover"
                  src={article.image}
                  alt={article.title}
                  variants={imageVariants}
                />
              </motion.div>
              
              <div className="p-6">
                <motion.h3 
                  className="text-xl font-semibold text-gray-900 mb-3"
                  whileHover={{ color: "#f6c62f" }}
                  transition={{ duration: 0.2 }}
                >
                  {article.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 text-sm mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {article.description}
                </motion.p>
                
                <div className="flex justify-between items-center text-gray-500 text-xs uppercase tracking-wider">
                  <motion.span 
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    {article.category}
                  </motion.span>
                  
                  <motion.span 
                    className="flex items-center cursor-pointer"
                    whileHover={{ x: 5, color: "#000" }}
                    transition={{ duration: 0.2 }}
                  >
                    {article.date}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Button */}
        <motion.div 
          className="text-center mt-12"
          variants={buttonVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.button 
            className="px-8 py-3 border border-black text-black rounded-full transition duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Parcourir tous les articles
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Blog;