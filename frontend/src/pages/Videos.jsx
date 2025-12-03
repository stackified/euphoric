import { motion } from 'framer-motion'
import { useEffect } from 'react'
import VideoGallery from '../components/videos/VideoGallery'
import { getAllVideos } from '../utils/videoImports'

const Videos = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const videos = getAllVideos()

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
          <p className="text-gray-400 text-lg">Watch our latest performances and musical moments</p>
        </motion.div>

        <VideoGallery videos={videos} />
      </div>
    </motion.div>
  )
}

export default Videos

