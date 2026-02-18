import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  { name: 'agency', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10v11m0 0h16m0 0V8m-11 0l-5 5-5-5-5-5m10 5l-5-5-5-5-5-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20v-6a4 4 0 014-4h4a4 4 0 014 4v6m0 0H4" />
      <circle cx="12" cy="7" r="2" fill="currentColor" stroke="none"/>
    </svg>
  )},
  { name: 'application', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>
    </svg>
  )},
  { name: 'company', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5zm0 14.5V22h10v-5.5l-10-5.5zm0-14.5V12h10l-10 5.5V22H2v-5.5L12 12z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 2L2 7l10 5 10-5-10-5zm0 14.5V22h10v-5.5l-10-5.5zm0-14.5V12h10l-10 5.5V22H2v-5.5L12 12z" fill="none"/>
    </svg>
  )},
  { name: 'business', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.22l5.7 2.5V12c0 3.79-2.23 7.31-5.7 8.16C8.53 19.31 6.3 15.79 6.3 12V5.72l5.7-2.5z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12s9-6.45 9-12V5l-9-4zm0 2.22l5.7 2.5V12c0 3.79-2.23 7.31-5.7 8.16C8.53 19.31 6.3 15.79 6.3 12V5.72l5.7-2.5z" fill="none"/>
      <polygon points="12 3.22 17.7 5.72 17.7 12 12 20.16 6.3 12 6.3 5.72 12 3.22" fill="none"/>
    </svg>
  )},
  { name: 'enterprise', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 9L12 2 2 9h1v11h2V9h2v11h2v-7h2v7h2v-7h2v7h2v-7h2v7h2V9h1zm-5 11h-2v-7H9v7H7V9H4l8-5.5 8 5.5h-3v11z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M22 9L12 2 2 9h1v11h2V9h2v11h2v-7h2v7h2v-7h2v7h2v-7h2v7h2V9h1zm-5 11h-2v-7H9v7H7V9H4l8-5.5 8 5.5h-3v11z" fill="none"/>
    </svg>
  )},
];

const SupportedBySection = () => {
  return (
    <div className="bg-white py-12 px-8 flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
      <p className="text-gray-500 font-medium whitespace-nowrap">SUPPORTED BY</p>
      <motion.div 
        className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut"
        }}
      >
        {logos.map((logo, index) => (
          <motion.div
            key={logo.name}
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition-transform duration-300 hover:scale-105"
            initial={{ x: -50, opacity: 0 }}
            animate={{ 
              x: [0, 10, 0], // Mouvement: position initiale -> droite -> position initiale
              opacity: 1
            }}
            transition={{ 
              duration: 0.8,
              delay: index * 0.2,
              ease: "easeInOut",
              times: [0, 0.5, 1] // Timing pour chaque étape du mouvement
            }}
            whileHover={{
              x: 5, // Léger mouvement vers la droite au hover
              transition: { duration: 0.2 }
            }}
          >
            {logo.icon}
            <span className="text-xl font-medium capitalize hidden sm:inline-block">
              {logo.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SupportedBySection;