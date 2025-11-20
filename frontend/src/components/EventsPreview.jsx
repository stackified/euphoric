import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const EventsPreview = () => {
  const { items: events, loading } = useSelector((state) => state.events)

  const upcomingEvents = events.slice(0, 3)

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-yellow-400 mb-4">
            UPCOMING EVENTS
          </h2>
          <p className="text-gray-400 text-lg">Don't miss our next performances</p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-400">Loading events...</div>
        ) : upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-black border border-yellow-400/20 hover:border-yellow-400 transition-all duration-300 overflow-hidden"
              >
                {event.image && (
                  <div className="h-48 bg-gray-800 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                  <p className="text-gray-400 text-sm mb-1">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-400 text-sm">{event.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mb-8">
            No upcoming events at the moment. Check back soon!
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link
            to="/events"
            className="inline-block px-8 py-3 border-2 border-yellow-400 text-yellow-400 font-bold uppercase tracking-wider hover:bg-yellow-400 hover:text-black transition-all duration-300"
          >
            VIEW ALL EVENTS
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default EventsPreview

