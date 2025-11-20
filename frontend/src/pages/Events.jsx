import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Events = () => {
  const { items: events, loading } = useSelector((state) => state.events)

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
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-yellow-400 mb-4">
            UPCOMING EVENTS
          </h1>
          <p className="text-gray-400 text-lg">Don't miss our next performances</p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-400 text-xl">Loading events...</div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gray-900 border border-yellow-400/20 hover:border-yellow-400 transition-all duration-300 overflow-hidden"
              >
                {event.image && (
                  <div className="h-64 bg-gray-800 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-yellow-400 mb-3">{event.title}</h3>
                  <div className="space-y-2 text-gray-400">
                    <p className="flex items-center">
                      <span className="font-semibold mr-2">Date:</span>
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="flex items-center">
                      <span className="font-semibold mr-2">Location:</span>
                      {event.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-xl mb-8">No upcoming events at the moment.</p>
            <p className="text-gray-500">Check back soon for new events!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Events

