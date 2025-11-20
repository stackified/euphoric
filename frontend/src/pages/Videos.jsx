import { motion } from 'framer-motion'
import { useEffect } from 'react'

const Videos = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Sample video data - replace with actual video links
  const videos = [
    {
      id: 1,
      title: 'Live Performance Highlights',
      thumbnail: '/src/assets/edd10a0b-0637-4617-8704-893f820eff3f.MP4',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
      description: 'Highlights from our recent live performance',
    },
    {
      id: 2,
      title: 'Event Showcase',
      thumbnail: '/src/assets/IMG_1145.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
      description: 'A showcase of our event management capabilities',
    },
    {
      id: 3,
      title: 'Behind the Scenes',
      thumbnail: '/src/assets/IMG_1908.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
      description: 'Go behind the scenes of our event production',
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
            VIDEOS
          </h1>
          <p className="text-gray-400 text-lg">Watch our latest performances and events</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-900 border border-yellow-400/20 hover:border-yellow-400 transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-video bg-gray-800">
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-yellow-400 mb-2">{video.title}</h3>
                <p className="text-gray-400">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://drive.google.com/drive/folders/your-folder-id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-bold uppercase tracking-wider hover:bg-yellow-400 hover:text-black transition-all duration-300"
          >
            VIEW MORE VIDEOS
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Videos

