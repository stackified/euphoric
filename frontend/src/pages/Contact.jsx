import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaDownload } from 'react-icons/fa'

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const contactInfo = [
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+91 9727579905',
      href: 'tel:+919727579905',
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: '+91 9727579905',
      href: 'https://wa.me/919727579905',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'euphoricparth1003@gmail.com',
      href: 'mailto:euphoricparth1003@gmail.com',
    },
  ]

  const generateVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Euphoric Live
ORG:Euphoric Live Event Management
TEL;TYPE=CELL:+919727579905
EMAIL:euphoricparth1003@gmail.com
URL:https://euphoriclive.com
END:VCARD`

    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'euphoric-live.vcf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

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
            CONTACT US
          </h1>
          <p className="text-gray-400 text-lg">Get in touch with us</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 bg-gray-900 border border-yellow-400/20 hover:border-yellow-400 transition-all duration-300 text-center group"
              >
                <contact.icon className="text-yellow-400 text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2">{contact.label}</h3>
                <p className="text-gray-400 text-sm">{contact.value}</p>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-900 border border-yellow-400/20 p-8 mb-6"
          >
            <h2 className="text-2xl font-semibold text-yellow-400 mb-6 text-center">
              Quick Actions
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={generateVCard}
                className="flex items-center justify-center gap-3 px-6 py-3 bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-colors"
              >
                <FaDownload />
                Add to Phone Book
              </motion.button>
              <motion.a
                href="https://wa.me/919727579905?text=Hello%20Euphoric%20Live!"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 px-6 py-3 bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp />
                WhatsApp Quick Message
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <p className="text-gray-400 mb-4">Have a question or want to book an event?</p>
            <motion.a
              href="/enquiry"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-bold uppercase tracking-wider hover:bg-yellow-400 hover:text-black transition-all duration-300"
            >
              SEND ENQUIRY
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Contact

