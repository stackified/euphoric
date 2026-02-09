import { motion } from 'framer-motion'
import { FaDownload, FaWhatsapp, FaInstagram } from 'react-icons/fa'

/**
 * Quick Action Box Component
 * Extracted from Contact page for reuse
 */
const QuickActionBox = () => {
  const generateVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Euphoric Live
ORG:Euphoric Live
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900 border border-yellow-400/20 p-8"
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
        <motion.a
          href="https://www.instagram.com/musicbypaarth/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold hover:opacity-90 transition-opacity"
        >
          <FaInstagram />
          Instagram Message
        </motion.a>
      </div>
    </motion.div>
  )
}

export default QuickActionBox

