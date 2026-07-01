import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { submitForm } from '../lib/api';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError('');

    try {
      await submitForm('/api/contact', data);
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitSuccess(false);
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = `w-full bg-transparent border-b border-[#A9A9A9] text-white p-2
                      focus:outline-none focus:border-white transition-all duration-300 ease-in-out`;
  const errorClass = `text-red-400 text-sm mt-1`;

  return (
   <>
    <div className="min-h-screen bg-[#595E62] text-[#A9A9A9] p-4 sm:p-8 relative overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className=''
        >
        

          {/* Email */}
       <div className='flex flex-col items-center justify-center  '>
       <div className=''>
       <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold mb-6">Contactez-nous</h1>
          <p className="text-lg leading-relaxed mb-10 ">
          Contactez-nous dès aujourd’hui pour discuter <br />de votre projet et obtenir un accompagnement <br /> personnalisé de nos experts.

          </p>
         <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center   mb-6 "
          >
            <FaEnvelope className="w-8 h-8 mr-4 text-[#ad927e]" />
            <div>
              <p className="text-sm">ENVOYEZ-NOUS UN EMAIL</p>
              <a href="mailto:contact@amenagement-maroc.com" className="text-white  justify-center text-lg flex items-center hover:text-[#ad927e] transition-colors duration-300">
                contact@amenagement-maroc.com
              </a>
            </div>
          </motion.div>

          {/* Téléphone */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center mb-6  "
          >
            <FaPhoneAlt className="w-8 h-8 mr-4 text-[#ad927e]" />
            <div className=''>
              <p className="text-sm">APPELER-NOUS</p>
              <div className="text-white text-lg flex items-center  transition-colors duration-300">
              <div className='flex flex-col py-1'>
                <a href="tel:+212668746386">+212 668-746386</a>
                <a href="tel:+212522484425">+212 522484425</a>
              </div>
                
              </div>
            </div>
          </motion.div>

          {/* Localisation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center mb-8"
          >
            <FaMapMarkerAlt className="w-8 h-8 mr-4 text-[#ad927e]" />
            <div>
              <p className="text-sm">NOTRE ADRESSE</p>
              <p className="text-white text-lg">
                3, Avenue 2 Mars Résidence Marwa 5 ème étage, Casablanca.
              </p>
            </div>
          </motion.div>
         </div>
       </div>
        </motion.div>

        {/* Right Section - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-6">
              <label htmlFor="nom" className="block text-sm font-medium mb-1">
                Nom complet
              </label>
              <input
                type="text"
                id="nom"
                placeholder="Nom et prénom"
                className={inputClass}
                {...register('nom', { required: 'Le nom complet est requis' })}
              />
              {errors.nom && <p className={errorClass}>{errors.nom.message}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                placeholder="email@example.com"
                className={inputClass}
                {...register('email', {
                  required: "L'adresse email est requise",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Adresse email invalide",
                  },
                })}
              />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="telephone" className="block text-sm font-medium mb-1">
                Numéro de téléphone
              </label>
              <input
                type="text"
                id="telephone"
                placeholder="Numéro de téléphone"
                className={inputClass}
                {...register('telephone', {
                  required: 'Le numéro de téléphone est requis',
                  pattern: { value: /^[0-9+\s()-]{7,20}$/, message: "Numéro de téléphone invalide" },
                })}
              />
              {errors.telephone && <p className={errorClass}>{errors.telephone.message}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="sujet" className="block text-sm font-medium mb-1">
                Sujet
              </label>
              <input
                type="text"
                id="sujet"
                placeholder="Sujet"
                className={inputClass}
                {...register('sujet', { required: 'Le sujet est requis' })}
              />
              {errors.sujet && <p className={errorClass}>{errors.sujet.message}</p>}
            </div>

            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Message"
                rows="4"
                className={`${inputClass} resize-none`}
                {...register('message', {
                  required: 'Un message est requis',
                  minLength: { value: 10, message: 'Le message doit contenir au moins 10 caractères' },
                })}
              ></textarea>
              {errors.message && <p className={errorClass}>{errors.message.message}</p>}
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Site web</label>
              <input id="website" type="text" tabIndex="-1" autoComplete="off" {...register('website')} />
            </div>

            <div className="relative flex items-center justify-end mb-8">
              {/* This decorative element is outside the form submission logic */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute left-0 -ml-2"
              >
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-white text-gray-900 font-semibold py-3 px-8 rounded-full flex items-center space-x-2 shadow-lg hover:bg-gray-200 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Envoi...</span>
                  </>
                ) : (
                  <>
                    <span>Envoyer le message</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                  </>
                )}
              </motion.button>
            </div>
          </form>

          <AnimatePresence>
            {submitSuccess === true && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-green-400 text-center mt-4 text-lg font-semibold"
              >
                Message envoyé avec succès !
              </motion.p>
            )}
            {submitSuccess === false && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-red-400 text-center mt-4 text-lg font-semibold"
              >
                {submitError || "Échec de l'envoi. Veuillez réessayer."}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
     
    </div>
    <div className="bg-white w-full flex justify-center items-center">
      <iframe
        className="w-full h-48 sm:h-64 md:h-96"
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d7673.673044698761!2d-7.6178959251005525!3d33.582567251021025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDM0JzU2LjUiTiA3wrAzNic1My4xIlc!5e0!3m2!1sfr!2sma!4v1761558311843!5m2!1sfr!2sma"
        title="Localisation Amenagement Maroc"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
   </>
  );
};

export default Contact;
