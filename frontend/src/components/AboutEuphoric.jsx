import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

/**
 * About Euphoric Live Section
 * Inspired by Enrique Iglesias website design
 */
const AboutEuphoric = () => {
  const sectionRef = useRef(null)
  const [stats, setStats] = useState({
    performances: 0,
    events: 0,
    years: 0,
    satisfaction: 0,
  })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrolled = window.scrollY
        const rate = scrolled * 0.5
        // Parallax effect can be added here if needed
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Stats animation on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            // Animate stats
            const targetStats = {
              performances: 100,
              events: 50,
              years: 5,
              satisfaction: 100,
            }

            const duration = 2000 // 2 seconds
            const steps = 60
            const stepDuration = duration / steps

            let currentStep = 0
            const interval = setInterval(() => {
              currentStep++
              const progress = currentStep / steps

              setStats({
                performances: Math.floor(targetStats.performances * progress),
                events: Math.floor(targetStats.events * progress),
                years: Math.floor(targetStats.years * progress),
                satisfaction: Math.floor(targetStats.satisfaction * progress),
              })

              if (currentStep >= steps) {
                clearInterval(interval)
                setStats(targetStats)
              }
            }, stepDuration)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [hasAnimated])

  return (
    <section ref={sectionRef} className="relative py-32 bg-black overflow-hidden">
      {/* Background Overlay with subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 0, 0.03) 10px,
            rgba(255, 255, 0, 0.03) 20px
          )`
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold text-yellow-400 mb-6">
              ABOUT EUPHORIC LIVE
            </h2>
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                EUPHORIC LIVE is a premier musician and performer, creating unforgettable
                experiences through powerful live performances. With a passion for excellence
                and attention to detail, we bring musical visions to life.
              </p>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                From intimate acoustic sets to large-scale concerts and live performances, we
                handle every aspect of musical production and execution. Our team of experienced
                professionals ensures that every performance is executed flawlessly, leaving
                lasting impressions on audiences.
              </p>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                We pride ourselves on our innovative approach, cutting-edge technology, and
                commitment to delivering exceptional musical experiences. Whether you're planning
                a private event, corporate gathering, or live concert, EUPHORIC LIVE is your
                trusted partner for creating moments that matter through music.
              </p>
            </motion.div>

            {/* Visual Element / Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Stats or Visual Content */}
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-gray-900 border border-yellow-400/20 text-center"
                >
                  <div className="text-4xl font-bold text-yellow-400 mb-2">
                    {stats.performances}+
                  </div>
                  <div className="text-gray-400 text-sm">Live Performances</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-gray-900 border border-yellow-400/20 text-center"
                >
                  <div className="text-4xl font-bold text-yellow-400 mb-2">
                    {stats.events}+
                  </div>
                  <div className="text-gray-400 text-sm">Events</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-gray-900 border border-yellow-400/20 text-center"
                >
                  <div className="text-4xl font-bold text-yellow-400 mb-2">
                    {stats.years}+
                  </div>
                  <div className="text-gray-400 text-sm">Years Experience</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-gray-900 border border-yellow-400/20 text-center"
                >
                  <div className="text-4xl font-bold text-yellow-400 mb-2">
                    {stats.satisfaction}%
                  </div>
                  <div className="text-gray-400 text-sm">Satisfaction</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutEuphoric

