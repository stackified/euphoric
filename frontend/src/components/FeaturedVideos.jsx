import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { getFeaturedVideos } from '../utils/videoImports'

/**
 * Featured Videos Component
 * Gallery-style video player with blurred previews and YouTube-style hover play
 */
const FeaturedVideos = () => {
  const videos = getFeaturedVideos(6)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hoveredThumbnail, setHoveredThumbnail] = useState(null)
  const [showControls, setShowControls] = useState(true)
  const scrollRef = useRef(null)
  const videoRefs = useRef({})
  const mainVideoRef = useRef(null)
  const controlsTimeoutRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const openVideo = (index) => {
    // Pause ALL videos immediately (thumbnails and any background audio)
    Object.values(videoRefs.current).forEach((vid) => {
      if (vid) {
        vid.pause()
        vid.muted = true // Mute all thumbnail videos
      }
    })

    // Pause any other audio/video elements on the page
    const allVideos = document.querySelectorAll('video')
    allVideos.forEach((vid) => {
      if (vid !== mainVideoRef.current && !Object.values(videoRefs.current).includes(vid)) {
        vid.pause()
        vid.muted = true
      }
    })

    const allAudios = document.querySelectorAll('audio')
    allAudios.forEach((audio) => {
      audio.pause()
      audio.muted = true
    })

    setCurrentIndex(index)
    setSelectedVideo(videos[index])
    setIsPlaying(true)
    setShowControls(false) // Start with controls hidden
  }

  const closeVideo = () => {
    if (mainVideoRef.current) {
      mainVideoRef.current.pause()
    }
    // Pause all thumbnail videos
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    })
    setSelectedVideo(null)
    setIsPlaying(false)
    setHoveredThumbnail(null)
  }

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % videos.length

    // Pause all videos and background media
    Object.values(videoRefs.current).forEach((vid) => {
      if (vid) {
        vid.pause()
        vid.muted = true
      }
    })

    // Pause any other audio/video elements
    const allVideos = document.querySelectorAll('video')
    allVideos.forEach((vid) => {
      if (vid !== mainVideoRef.current && !Object.values(videoRefs.current).includes(vid)) {
        vid.pause()
        vid.muted = true
      }
    })
    const allAudios = document.querySelectorAll('audio')
    allAudios.forEach((audio) => {
      audio.pause()
      audio.muted = true
    })

    setCurrentIndex(nextIndex)
    setSelectedVideo(videos[nextIndex])
    setIsPlaying(true)
    setShowControls(false)
  }

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + videos.length) % videos.length

    // Pause all videos and background media
    Object.values(videoRefs.current).forEach((vid) => {
      if (vid) {
        vid.pause()
        vid.muted = true
      }
    })

    // Pause any other audio/video elements
    const allVideos = document.querySelectorAll('video')
    allVideos.forEach((vid) => {
      if (vid !== mainVideoRef.current && !Object.values(videoRefs.current).includes(vid)) {
        vid.pause()
        vid.muted = true
      }
    })
    const allAudios = document.querySelectorAll('audio')
    allAudios.forEach((audio) => {
      audio.pause()
      audio.muted = true
    })

    setCurrentIndex(prevIndex)
    setSelectedVideo(videos[prevIndex])
    setIsPlaying(true)
    setShowControls(false)
  }

  const togglePlay = () => {
    if (mainVideoRef.current) {
      if (isPlaying) {
        mainVideoRef.current.pause()
        setIsPlaying(false)
      } else {
        // Pause all background videos/audio before playing
        Object.values(videoRefs.current).forEach((vid) => {
          if (vid && vid !== mainVideoRef.current) {
            vid.pause()
            vid.muted = true
          }
        })
        const allVideos = document.querySelectorAll('video')
        allVideos.forEach((vid) => {
          if (vid !== mainVideoRef.current && !Object.values(videoRefs.current).includes(vid)) {
            vid.pause()
            vid.muted = true
          }
        })
        const allAudios = document.querySelectorAll('audio')
        allAudios.forEach((audio) => {
          audio.pause()
          audio.muted = true
        })

        mainVideoRef.current.play()
        setIsPlaying(true)
        setShowControls(false)
      }
    }
  }

  // Handle thumbnail hover - YouTube-style preview
  const handleThumbnailHover = (index, isHovering) => {
    if (selectedVideo) return // Don't play thumbnails when video is open

    const video = videoRefs.current[index]
    if (!video) return

    if (isHovering) {
      setHoveredThumbnail(index)
      video.currentTime = 0
      video.play().catch(() => {
        // Autoplay blocked
      })
    } else {
      setHoveredThumbnail(null)
      video.pause()
      video.currentTime = 0
    }
  }

  // Show controls on mouse move - only show when user moves mouse
  const handleMouseMove = () => {
    if (selectedVideo) {
      setShowControls(true)
      // Clear any existing timeout
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      // Hide controls after 1 second of no mouse movement (only if playing)
      if (isPlaying) {
        const timeout = setTimeout(() => {
          setShowControls(false)
        }, 1000)
        controlsTimeoutRef.current = timeout
      }
    }
  }

  // Handle video play/pause events and pause background media
  useEffect(() => {
    const video = mainVideoRef.current
    if (!video) return

    const handlePlay = () => {
      setIsPlaying(true)
      // Pause all thumbnail videos when main video plays
      Object.values(videoRefs.current).forEach((vid) => {
        if (vid && vid !== video) {
          vid.pause()
          vid.muted = true
        }
      })
      // Pause any other audio/video elements on the page
      const allVideos = document.querySelectorAll('video')
      allVideos.forEach((vid) => {
        if (vid !== video && !Object.values(videoRefs.current).includes(vid)) {
          vid.pause()
          vid.muted = true
        }
      })
      const allAudios = document.querySelectorAll('audio')
      allAudios.forEach((audio) => {
        audio.pause()
        audio.muted = true
      })
    }

    const handlePause = () => setIsPlaying(false)

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [selectedVideo])

  if (videos.length === 0) return null

  const prevVideo = videos[(currentIndex - 1 + videos.length) % videos.length]
  const nextVideo = videos[(currentIndex + 1) % videos.length]

  return (
    <>
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-yellow-400 mb-4">
              FEATURED VIDEOS
            </h2>
            <p className="text-gray-400 text-lg">Watch our best performances and musical moments</p>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Scroll Buttons */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-yellow-400 p-3 rounded-full border border-yellow-400/30 hover:border-yellow-400 transition-all"
              aria-label="Scroll left"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-yellow-400 p-3 rounded-full border border-yellow-400/30 hover:border-yellow-400 transition-all"
              aria-label="Scroll right"
            >
              <FaChevronRight size={20} />
            </button>

            {/* Video Cards */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="flex-shrink-0 w-[350px] bg-gray-900 border border-yellow-400/20 hover:border-yellow-400 transition-all duration-300 overflow-hidden cursor-pointer group"
                  onClick={() => openVideo(index)}
                  onMouseEnter={() => handleThumbnailHover(index, true)}
                  onMouseLeave={() => handleThumbnailHover(index, false)}
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-gray-800 overflow-hidden">
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={video.src}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      muted={hoveredThumbnail !== index}
                      preload="metadata"
                      loop
                      playsInline
                    />
                    {/* Play Overlay - only show when not hovering (YouTube style) */}
                    {hoveredThumbnail !== index && (
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 bg-yellow-400/90 rounded-full flex items-center justify-center"
                        >
                          <FaPlay className="text-black ml-1" size={24} />
                        </motion.div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8"
          >
            <Link
              to="/videos"
              className="inline-block px-8 py-3 border-2 border-yellow-400 text-yellow-400 font-bold uppercase tracking-wider hover:bg-yellow-400 hover:text-black transition-all duration-300"
            >
              VIEW ALL VIDEOS
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Video Player Modal - Gallery Style */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              // Hide controls immediately when mouse leaves
              setShowControls(false)
              if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current)
              }
            }}
          >
            <div className="relative w-full max-w-7xl mx-auto px-4">
              {/* Close Button - Larger and better positioned */}
              <button
                onClick={closeVideo}
                className="absolute -top-16 right-4 z-20 text-white hover:text-yellow-400 transition-all bg-black/60 hover:bg-black/80 p-4 rounded-full backdrop-blur-sm border-2 border-white/30 hover:border-yellow-400/70 hover:scale-110"
                aria-label="Close"
              >
                <FaTimes size={32} />
              </button>

              {/* Main Video Container with Blurred Previews */}
              <div className="relative flex items-center gap-4">
                {/* Previous Video Preview - Left Side (Blurred, Vertical) */}
                {videos.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden lg:block w-[12%] aspect-[9/16] overflow-hidden rounded-lg cursor-pointer"
                    onClick={goToPrevious}
                  >
                    <video
                      src={prevVideo.src}
                      className="w-full h-full object-cover filter blur-sm brightness-60 scale-110"
                      muted
                      preload="metadata"
                    />
                    <div className="absolute inset-0 flex items-center justify-start pl-2">
                      <div className="bg-black/50 p-2 rounded-full">
                        <FaChevronLeft className="text-white" size={16} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Main Video Player */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="flex-1 relative aspect-video bg-black rounded-lg overflow-hidden"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => {
                    // Hide controls immediately when mouse leaves
                    setShowControls(false)
                    if (controlsTimeoutRef.current) {
                      clearTimeout(controlsTimeoutRef.current)
                    }
                  }}
                >
                  <video
                    ref={mainVideoRef}
                    src={selectedVideo.src}
                    className="w-full h-full object-contain"
                    autoPlay
                    playsInline
                    preload="auto"
                    onPlay={() => {
                      // Pause all background videos/audio when main video plays
                      Object.values(videoRefs.current).forEach((vid) => {
                        if (vid && vid !== mainVideoRef.current) {
                          vid.pause()
                          vid.muted = true
                        }
                      })
                      const allVideos = document.querySelectorAll('video')
                      allVideos.forEach((vid) => {
                        if (vid !== mainVideoRef.current && !Object.values(videoRefs.current).includes(vid)) {
                          vid.pause()
                          vid.muted = true
                        }
                      })
                      const allAudios = document.querySelectorAll('audio')
                      allAudios.forEach((audio) => {
                        audio.pause()
                        audio.muted = true
                      })
                    }}
                    onEnded={() => {
                      if (videos.length > 1) {
                        goToNext()
                      }
                    }}
                  />

                  {/* Play/Pause Overlay - Only show on hover */}
                  <AnimatePresence>
                    {showControls && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/30"
                        onClick={(e) => {
                          e.stopPropagation()
                          togglePlay()
                        }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-20 h-20 bg-yellow-400/90 rounded-full flex items-center justify-center backdrop-blur-sm"
                          aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? (
                            <FaPause className="text-black" size={32} />
                          ) : (
                            <FaPlay className="text-black ml-1" size={32} />
                          )}
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>

                {/* Next Video Preview - Right Side (Blurred, Vertical) */}
                {videos.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden lg:block w-[12%] aspect-[9/16] overflow-hidden rounded-lg cursor-pointer"
                    onClick={goToNext}
                  >
                    <video
                      src={nextVideo.src}
                      className="w-full h-full object-cover filter blur-sm brightness-60 scale-110"
                      muted
                      preload="metadata"
                    />
                    <div className="absolute inset-0 flex items-center justify-end pr-2">
                      <div className="bg-black/50 p-2 rounded-full">
                        <FaChevronRight className="text-white" size={16} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FeaturedVideos
