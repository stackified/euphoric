import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import heroImage from '../assets/IMG_4857.jpg'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const contactButtons = [
    {
      icon: FaPhone,
      label: 'Call Me',
      href: 'tel:+919727579905',
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      href: 'https://wa.me/919727579905',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Direction',
      href: 'https://maps.google.com/?q=Euphoric+Live',
    },
    {
      icon: FaEnvelope,
      label: 'Mail',
      href: 'mailto:euphoricparth1003@gmail.com',
    },
  ]

  const contactInfo = [
    { icon: FaPhone, label: 'Call', href: 'tel:+919727579905', value: '+91 9727579905' },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      href: 'https://wa.me/919727579905',
      value: '+91 9727579905',
    },
    {
      icon: FaEnvelope,
      label: 'Mail',
      href: 'mailto:euphoricparth1003@gmail.com',
      value: 'euphoricparth1003@gmail.com',
    },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={heroImage}
          alt="Euphoric Live Performance"
          className="w-full h-full object-cover brightness-125"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            filter: 'brightness(1.3) contrast(1.1)',
          }}
        />
        {/* Lighter Overlay with Gradient - Increased brightness */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Animated Bars Overlay */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-full w-1 bg-yellow-400/5"
            style={{
              left: `${20 + i * 20}%`,
            }}
            animate={{
              y: ['-100%', '100%'],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="text-7xl md:text-8xl lg:text-9xl font-display font-bold text-yellow-400 mb-4 text-glow leading-tight"
          style={{
            fontFamily: "'Bebas Neue', Impact, 'Arial Black', sans-serif",
            letterSpacing: '0.08em',
            textShadow: '0 0 40px rgba(255, 255, 0, 0.5), 0 0 80px rgba(255, 255, 0, 0.3)',
          }}
        >
          EUPHORIC
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-yellow-400 mb-12 text-glow"
          style={{
            fontFamily: "'Bebas Neue', Impact, 'Arial Black', sans-serif",
            letterSpacing: '0.08em',
            textShadow: '0 0 30px rgba(255, 255, 0, 0.4)',
          }}
        >
          LIVE
        </motion.h2>

        {/* Contact Buttons Grid - Dark Theme with Yellow Accents */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-4 mb-16 max-w-2xl mx-auto"
        >
          {contactButtons.map((button, index) => (
            <motion.a
              key={index}
              href={button.href}
              target={button.href.startsWith('http') ? '_blank' : undefined}
              rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + index * 0.1, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-6 py-4 bg-black/80 backdrop-blur-sm border-2 border-yellow-400/40 hover:border-yellow-400 text-yellow-400 font-semibold uppercase tracking-wider flex items-center gap-3 shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-all duration-300 min-w-[160px] justify-center overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              {/* Icon */}
              <button.icon className="text-xl relative z-10 group-hover:scale-110 transition-transform duration-300" />
              {/* Label */}
              <span className="relative z-10 group-hover:text-yellow-300 transition-colors">
                {button.label}
              </span>
              {/* Bottom Accent Line */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-yellow-400"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Icons - Floating Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:block"
        >
          <div className="flex flex-col gap-4">
            {contactInfo.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.15, x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center gap-3 p-4 bg-black/70 backdrop-blur-md border border-yellow-400/40 hover:border-yellow-400 hover:bg-black/90 transition-all duration-300 shadow-lg shadow-yellow-400/20"
                title={contact.value}
              >
                <contact.icon className="text-yellow-400 text-xl group-hover:scale-110 transition-transform" />
                <span className="absolute left-full ml-4 px-4 py-2 bg-black/95 backdrop-blur-sm text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-yellow-400/30">
                  {contact.value}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center backdrop-blur-sm bg-black/20"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-4 bg-yellow-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
