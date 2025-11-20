import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FaBriefcase,
  FaHeart,
  FaPalette,
  FaGraduationCap,
  FaHandHoldingHeart,
  FaMusic,
  FaTshirt,
  FaRibbon,
  FaUsers,
  FaMicrophone,
  FaGlassCheers,
  FaCocktail,
} from 'react-icons/fa'

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const services = [
    {
      title: 'Corporate Events',
      description: 'Professional corporate gatherings, conferences, and business events.',
      icon: FaBriefcase,
    },
    {
      title: 'Wedding Events',
      description: 'Elegant and memorable wedding celebrations tailored to your vision.',
      icon: FaHeart,
    },
    {
      title: 'Exhibition Events',
      description: 'Showcase your products and services with stunning exhibition setups.',
      icon: FaPalette,
    },
    {
      title: 'College Events',
      description: 'Engaging college festivals, cultural events, and student gatherings.',
      icon: FaGraduationCap,
    },
    {
      title: 'Charity Events',
      description: 'Meaningful charity fundraisers and awareness campaigns.',
      icon: FaHandHoldingHeart,
    },
    {
      title: 'Festival Events',
      description: 'Large-scale festival management with world-class production.',
      icon: FaMusic,
    },
    {
      title: 'Fashion Show Events',
      description: 'Glamorous fashion shows with professional runway setups.',
      icon: FaTshirt,
    },
    {
      title: 'Inauguration Events',
      description: 'Grand inauguration ceremonies and opening events.',
      icon: FaRibbon,
    },
    {
      title: 'Social Events',
      description: 'Celebrations, anniversaries, and social gatherings of all sizes.',
      icon: FaUsers,
    },
    {
      title: 'Live Concert Events',
      description: 'High-energy live concerts with professional sound and lighting.',
      icon: FaMicrophone,
    },
    {
      title: 'Private Party Events',
      description: 'Intimate private parties and exclusive celebrations.',
      icon: FaGlassCheers,
    },
    {
      title: 'Club Events',
      description: 'Vibrant club nights and entertainment events.',
      icon: FaCocktail,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black pt-32 pb-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-yellow-400 mb-4">
            SERVICES
          </h1>
          <p className="text-gray-400 text-lg">Comprehensive event management solutions</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="group relative p-8 bg-gradient-to-br from-gray-900 to-black border border-yellow-400/20 hover:border-yellow-400/60 transition-all duration-300 overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-yellow-400/10 transition-all duration-300"
                initial={false}
              />
              
              {/* Icon */}
              <div className="relative z-10 mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-yellow-400/10 border border-yellow-400/30 group-hover:bg-yellow-400/20 group-hover:border-yellow-400/50 transition-all duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <service.icon className="text-yellow-400 text-2xl group-hover:scale-110 transition-transform duration-300" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-yellow-400 mb-3 group-hover:text-yellow-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {service.description}
                </p>
              </div>

              {/* Bottom Accent Line */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-yellow-400"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/enquiry"
              className="inline-block px-10 py-4 bg-yellow-400 text-black font-bold uppercase tracking-wider hover:bg-yellow-300 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">GET A QUOTE</span>
              <motion.div
                className="absolute inset-0 bg-yellow-300"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Services
