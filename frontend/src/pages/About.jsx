import { motion } from 'framer-motion'
import { useEffect } from 'react'

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-yellow-400 mb-8 text-center">
            ABOUT
          </h1>

          <div className="space-y-6 text-gray-300 leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg"
            >
              EUPHORIC LIVE is a premier event management company specializing in creating
              unforgettable experiences for a wide range of events. With a passion for excellence
              and attention to detail, we bring your vision to life.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg"
            >
              From intimate corporate gatherings to large-scale festivals and live concerts, we
              handle every aspect of event planning and execution. Our team of experienced
              professionals ensures that every event is executed flawlessly, leaving lasting
              impressions on your guests.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg"
            >
              We pride ourselves on our innovative approach, cutting-edge technology, and
              commitment to delivering exceptional service. Whether you're planning a wedding,
              corporate event, or live performance, EUPHORIC LIVE is your trusted partner for
              creating moments that matter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 p-8 bg-gray-900 border border-yellow-400/20"
            >
              <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Our Mission</h2>
              <p className="text-gray-300">
                To create extraordinary event experiences that exceed expectations and leave
                lasting memories for our clients and their guests.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-8 bg-gray-900 border border-yellow-400/20"
            >
              <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Our Vision</h2>
              <p className="text-gray-300">
                To be the leading event management company recognized for innovation, excellence,
                and unparalleled service in the industry.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default About

