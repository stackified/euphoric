import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { FaInstagram, FaYoutube, FaExternalLinkAlt } from 'react-icons/fa'
import { SiGoogledrive } from 'react-icons/si'

const Links = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const links = [
    {
      icon: FaInstagram,
      title: 'Instagram',
      subtitle: 'Follow our journey',
      href: 'https://www.instagram.com/_euphoric_live_',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: SiGoogledrive,
      title: 'Video Drafts',
      subtitle: 'Watch our video drafts',
      href: '#', // Replace with actual Google Drive link
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FaYoutube,
      title: 'YouTube',
      subtitle: 'Subscribe to our channel',
      href: '#', // Replace with actual YouTube link
      color: 'from-red-500 to-red-700',
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
            LINKS
          </h1>
          <p className="text-gray-400 text-lg">Connect with us on social media</p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative p-8 bg-gray-900 border border-yellow-400/20 hover:border-yellow-400 transition-all duration-300 group overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              <div className="relative z-10">
                <link.icon className="text-4xl text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-2">{link.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{link.subtitle}</p>
                <FaExternalLinkAlt className="text-yellow-400/50 group-hover:text-yellow-400 transition-colors" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Links

