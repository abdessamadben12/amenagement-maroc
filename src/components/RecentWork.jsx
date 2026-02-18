import React from 'react';
import { motion } from 'framer-motion';

const RecentWork = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    hover: { scale: 1.03, transition: { duration: 0.3 } },
  };

  const arrowVariants = {
    rest: { rotate: -35 },
    hover: { rotate: 0, x: 5, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="bg-white py-8 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section */}
          <motion.div variants={itemVariants}>
            <motion.p
              className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Travaux Récents
            </motion.p>
            <motion.h2
              className="text-4xl font-extrabold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Découvrez notre <br /> projet le plus récent
            </motion.h2>

            {/* Large Project Card */}
            <motion.div
              className="mt-8 relative h-96"
              variants={cardVariants}
              whileHover="hover"
            >
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop"
                alt="Construction de bâtiment"
                className="absolute inset-0 w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold">Construction de bâtiment à Los Angeles, CA</h3>
                <div className="flex items-center flex-col mt-2">
                  <div className='w-full h-[1px] bg-gray-300 flex flex-col items-center'></div>
                  <div className='flex items-center w-full py-4'>
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                    <p className="text-sm">Construction Générale</p>
                    <motion.a
                      href="#"
                      className="ml-4 flex items-center text-sm group"
                      initial="rest"
                      whileHover="hover"
                    >
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
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.p
              className="mt-8 text-gray-600"
              variants={itemVariants}
            >
              Lorem ipsum dolor sit amet consectetur senectus velit faucibus quisque at ut vitoe plateo justo nec mattis adipiscing donec tellus vulputate ac nulla ut in aliquam ut pulvinar vestibulum nulla nisl.
            </motion.p>

            <motion.button
              className="mt-8 px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-black hover:text-white transition duration-200"
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              Parcourir le portfolio
            </motion.button>
          </motion.div>

          {/* Right Section */}
          <div className="space-y-8">
            {/* Top Right Card */}
            <motion.div
              className="mt-8 relative h-80"
              variants={cardVariants}
              whileHover="hover"
            >
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop"
                alt="Construction de bâtiment"
                className="absolute inset-0 w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold">Construction de bâtiment à Los Angeles, CA</h3>
                <div className="flex items-center flex-col mt-2">
                  <div className='w-full h-[1px] bg-gray-300 flex flex-col items-center'></div>
                  <div className='flex items-center w-full py-4'>
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                    <p className="text-sm">Construction Générale</p>
                    <motion.a
                      href="#"
                      className="ml-4 flex items-center text-sm group"
                      initial="rest"
                      whileHover="hover"
                    >
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
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Right Card */}
            <motion.div
              className="mt-8 relative h-80"
              variants={cardVariants}
              whileHover="hover"
            >
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop"
                alt="Construction de bâtiment"
                className="absolute inset-0 w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold">Construction de bâtiment à Los Angeles, CA</h3>
                <div className="flex items-center flex-col mt-2">
                  <div className='w-full h-[1px] bg-gray-300 flex flex-col items-center'></div>
                  <div className='flex items-center w-full py-4'>
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                    <p className="text-sm">Construction Générale</p>
                    <motion.a
                      href="#"
                      className="ml-4 flex items-center text-sm group"
                      initial="rest"
                      whileHover="hover"
                    >
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
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentWork;