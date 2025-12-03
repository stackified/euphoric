import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaPause,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

/**
 * Video Gallery Component
 * Gallery-style video player with blurred previews and YouTube-style hover play
 * Features: hover preview with sound, playback position continuity, zoom animations, accessibility
 */
const VideoGallery = ({ videos, className = "" }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredThumbnail, setHoveredThumbnail] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const [thumbnailTimes, setThumbnailTimes] = useState({}); // Track playback position for each thumbnail
  const [startTime, setStartTime] = useState(0); // Time to start main video from
  const [isMobile, setIsMobile] = useState(false);
  const [tappedThumbnail, setTappedThumbnail] = useState(null); // For mobile tap-to-play

  const videoRefs = useRef({});
  const mainVideoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const modalRef = useRef(null);
  const previousFocusedElement = useRef(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track thumbnail playback time
  useEffect(() => {
    const interval = setInterval(() => {
      if (!selectedVideo && hoveredThumbnail !== null) {
        const video = videoRefs.current[hoveredThumbnail];
        if (video && !video.paused) {
          setThumbnailTimes((prev) => ({
            ...prev,
            [hoveredThumbnail]: video.currentTime,
          }));
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [hoveredThumbnail, selectedVideo]);

  const openVideo = (index) => {
    // Store current playback time if this thumbnail was hovered
    const video = videoRefs.current[index];
    const savedTime = thumbnailTimes[index] || 0;

    // Pause ALL videos immediately (thumbnails and any background audio)
    Object.values(videoRefs.current).forEach((vid) => {
      if (vid) {
        vid.pause();
        vid.muted = true; // Mute all thumbnail videos
      }
    });

    // Pause any other audio/video elements on the page
    const allVideos = document.querySelectorAll("video");
    allVideos.forEach((vid) => {
      if (
        vid !== mainVideoRef.current &&
        !Object.values(videoRefs.current).includes(vid)
      ) {
        vid.pause();
        vid.muted = true;
      }
    });

    const allAudios = document.querySelectorAll("audio");
    allAudios.forEach((audio) => {
      audio.pause();
      audio.muted = true;
    });

    // Store focused element for accessibility
    previousFocusedElement.current = document.activeElement;

    setCurrentIndex(index);
    setSelectedVideo(videos[index]);
    setStartTime(savedTime);
    setIsPlaying(true);
    setShowControls(false); // Start with controls hidden
    setHoveredThumbnail(null);
    setTappedThumbnail(null);
  };

  const closeVideo = () => {
    if (mainVideoRef.current) {
      mainVideoRef.current.pause();
    }
    // Pause all thumbnail videos
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.pause();
        // Don't reset currentTime - maintain position
      }
    });
    setSelectedVideo(null);
    setIsPlaying(false);
    setHoveredThumbnail(null);
    setTappedThumbnail(null);

    // Restore focus for accessibility
    if (previousFocusedElement.current) {
      previousFocusedElement.current.focus();
    }
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % videos.length;
    const video = videoRefs.current[nextIndex];
    const savedTime = thumbnailTimes[nextIndex] || 0;

    // Pause all videos and background media
    Object.values(videoRefs.current).forEach((vid) => {
      if (vid) {
        vid.pause();
        vid.muted = true;
      }
    });

    // Pause any other audio/video elements
    const allVideos = document.querySelectorAll("video");
    allVideos.forEach((vid) => {
      if (
        vid !== mainVideoRef.current &&
        !Object.values(videoRefs.current).includes(vid)
      ) {
        vid.pause();
        vid.muted = true;
      }
    });
    const allAudios = document.querySelectorAll("audio");
    allAudios.forEach((audio) => {
      audio.pause();
      audio.muted = true;
    });

    setCurrentIndex(nextIndex);
    setSelectedVideo(videos[nextIndex]);
    setStartTime(savedTime);
    setIsPlaying(true);
    setShowControls(false);
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
    const video = videoRefs.current[prevIndex];
    const savedTime = thumbnailTimes[prevIndex] || 0;

    // Pause all videos and background media
    Object.values(videoRefs.current).forEach((vid) => {
      if (vid) {
        vid.pause();
        vid.muted = true;
      }
    });

    // Pause any other audio/video elements
    const allVideos = document.querySelectorAll("video");
    allVideos.forEach((vid) => {
      if (
        vid !== mainVideoRef.current &&
        !Object.values(videoRefs.current).includes(vid)
      ) {
        vid.pause();
        vid.muted = true;
      }
    });
    const allAudios = document.querySelectorAll("audio");
    allAudios.forEach((audio) => {
      audio.pause();
      audio.muted = true;
    });

    setCurrentIndex(prevIndex);
    setSelectedVideo(videos[prevIndex]);
    setStartTime(savedTime);
    setIsPlaying(true);
    setShowControls(false);
  };

  const togglePlay = () => {
    if (mainVideoRef.current) {
      if (isPlaying) {
        mainVideoRef.current.pause();
        setIsPlaying(false);
      } else {
        // Pause all background videos/audio before playing
        Object.values(videoRefs.current).forEach((vid) => {
          if (vid && vid !== mainVideoRef.current) {
            vid.pause();
            vid.muted = true;
          }
        });
        const allVideos = document.querySelectorAll("video");
        allVideos.forEach((vid) => {
          if (
            vid !== mainVideoRef.current &&
            !Object.values(videoRefs.current).includes(vid)
          ) {
            vid.pause();
            vid.muted = true;
          }
        });
        const allAudios = document.querySelectorAll("audio");
        allAudios.forEach((audio) => {
          audio.pause();
          audio.muted = true;
        });

        mainVideoRef.current.play();
        setIsPlaying(true);
        setShowControls(false);
      }
    }
  };

  // Handle thumbnail hover - YouTube-style preview with sound
  const handleThumbnailHover = (index, isHovering) => {
    if (selectedVideo) return; // Don't play thumbnails when video is open

    // Pause all other thumbnails first
    Object.keys(videoRefs.current).forEach((key) => {
      if (Number(key) !== index && videoRefs.current[key]) {
        videoRefs.current[key].pause();
      }
    });

    const video = videoRefs.current[index];
    if (!video) return;

    if (isHovering) {
      setHoveredThumbnail(index);
      // Resume from saved time or start from beginning
      const savedTime = thumbnailTimes[index] || 0;
      video.currentTime = savedTime;
      video.muted = false; // Play with sound
      video.play().catch(() => {
        // Autoplay blocked - fallback to muted
        video.muted = true;
        video.play().catch(() => {});
      });
    } else {
      setHoveredThumbnail(null);
      video.pause();
      // Don't reset currentTime - maintain position
    }
  };

  // Mobile tap handler
  const handleThumbnailTap = (index) => {
    if (isMobile) {
      if (tappedThumbnail === index) {
        // Second tap - open full video
        openVideo(index);
      } else {
        // First tap - play preview
        handleThumbnailHover(index, true);
        setTappedThumbnail(index);
      }
    }
  };

  // Show controls on mouse move - only show when user moves mouse
  const handleMouseMove = () => {
    if (selectedVideo) {
      setShowControls(true);
      // Clear any existing timeout
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      // Hide controls after 1 second of no mouse movement (only if playing)
      if (isPlaying) {
        const timeout = setTimeout(() => {
          setShowControls(false);
        }, 1000);
        controlsTimeoutRef.current = timeout;
      }
    }
  };

  // Handle video play/pause events and pause background media
  useEffect(() => {
    const video = mainVideoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      // Pause all thumbnail videos when main video plays
      Object.values(videoRefs.current).forEach((vid) => {
        if (vid && vid !== video) {
          vid.pause();
          vid.muted = true;
        }
      });
      // Pause any other audio/video elements on the page
      const allVideos = document.querySelectorAll("video");
      allVideos.forEach((vid) => {
        if (vid !== video && !Object.values(videoRefs.current).includes(vid)) {
          vid.pause();
          vid.muted = true;
        }
      });
      const allAudios = document.querySelectorAll("audio");
      allAudios.forEach((audio) => {
        audio.pause();
        audio.muted = true;
      });
    };

    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // Set start time when video loads
    if (startTime > 0) {
      video.addEventListener(
        "loadedmetadata",
        () => {
          video.currentTime = startTime;
        },
        { once: true }
      );
    }

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [selectedVideo, startTime]);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedVideo) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          closeVideo();
          break;
        case "ArrowLeft":
          if (videos.length > 1) {
            e.preventDefault();
            goToPrevious();
          }
          break;
        case "ArrowRight":
          if (videos.length > 1) {
            e.preventDefault();
            goToNext();
          }
          break;
        case " ":
        case "Enter":
          e.preventDefault();
          togglePlay();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedVideo, currentIndex, isPlaying, videos.length]);

  // Focus trap for accessibility
  useEffect(() => {
    if (!selectedVideo || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener("keydown", handleTab);
    firstElement?.focus();

    return () => modal.removeEventListener("keydown", handleTab);
  }, [selectedVideo]);

  if (!videos || videos.length === 0) return null;

  const prevVideo = videos[(currentIndex - 1 + videos.length) % videos.length];
  const nextVideo = videos[(currentIndex + 1) % videos.length];
  const hoveredVideo =
    hoveredThumbnail !== null ? videoRefs.current[hoveredThumbnail] : null;
  const progress = hoveredVideo
    ? (hoveredVideo.currentTime / hoveredVideo.duration) * 100
    : 0;

  return (
    <>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      >
        {videos.map((video, index) => (
          <motion.div
            key={video.id || index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={!isMobile ? { scale: 1.05, y: -8 } : {}}
            className="group relative bg-gray-900 border border-yellow-400/20 hover:border-yellow-400 transition-all duration-300 overflow-hidden cursor-pointer"
            onClick={() =>
              isMobile ? handleThumbnailTap(index) : openVideo(index)
            }
            onMouseEnter={() => !isMobile && handleThumbnailHover(index, true)}
            onMouseLeave={() => !isMobile && handleThumbnailHover(index, false)}
            role="button"
            tabIndex={0}
            aria-label={`Play video: ${video.title || `Video ${index + 1}`}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openVideo(index);
              }
            }}
          >
            {/* Video Thumbnail */}
            <div className="relative aspect-video bg-gray-800 overflow-hidden">
              <video
                ref={(el) => {
                  if (el) videoRefs.current[index] = el;
                }}
                src={video.src}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                muted={hoveredThumbnail !== index}
                preload="metadata"
                loop
                playsInline
              />

              {/* Progress indicator on hovered thumbnail */}
              {hoveredThumbnail === index && hoveredVideo && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700"
                >
                  <motion.div
                    className="h-full bg-yellow-400"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </motion.div>
              )}

              {/* Play Overlay - fade in/out effect */}
              <AnimatePresence>
                {hoveredThumbnail !== index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-yellow-400/90 rounded-full flex items-center justify-center"
                    >
                      <FaPlay className="text-black ml-1" size={24} />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Player Modal - Gallery Style with Zoom Animation */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              // Hide controls immediately when mouse leaves
              setShowControls(false);
              if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
          >
            <div className="relative w-full max-w-7xl mx-auto px-4">
              {/* Close Button */}
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={closeVideo}
                className="absolute -top-16 right-4 z-20 text-white hover:text-yellow-400 transition-all bg-black/60 hover:bg-black/80 p-4 rounded-full backdrop-blur-sm border-2 border-white/30 hover:border-yellow-400/70 hover:scale-110"
                aria-label="Close video"
              >
                <FaTimes size={32} />
              </motion.button>

              {/* Main Video Container with Blurred Previews */}
              <div className="relative flex items-center gap-4">
                {/* Previous Video Preview - Left Side (Blurred, Vertical) */}
                {videos.length > 1 && (
                  <motion.button
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="hidden lg:block w-[12%] aspect-[9/16] overflow-hidden rounded-lg cursor-pointer relative group"
                    onClick={goToPrevious}
                    aria-label="Previous video"
                  >
                    <video
                      src={prevVideo.src}
                      className="w-full h-full object-cover filter blur-sm brightness-60 scale-110"
                      muted
                      preload="metadata"
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-start pl-2">
                      <div className="bg-black/50 p-2 rounded-full group-hover:bg-black/70 transition-colors">
                        <FaChevronLeft className="text-white" size={16} />
                      </div>
                    </div>
                  </motion.button>
                )}

                {/* Main Video Player with Zoom Animation */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="flex-1 relative aspect-video bg-black rounded-lg overflow-hidden"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => {
                    // Hide controls immediately when mouse leaves
                    setShowControls(false);
                    if (controlsTimeoutRef.current) {
                      clearTimeout(controlsTimeoutRef.current);
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
                          vid.pause();
                          vid.muted = true;
                        }
                      });
                      const allVideos = document.querySelectorAll("video");
                      allVideos.forEach((vid) => {
                        if (
                          vid !== mainVideoRef.current &&
                          !Object.values(videoRefs.current).includes(vid)
                        ) {
                          vid.pause();
                          vid.muted = true;
                        }
                      });
                      const allAudios = document.querySelectorAll("audio");
                      allAudios.forEach((audio) => {
                        audio.pause();
                        audio.muted = true;
                      });
                    }}
                    onEnded={() => {
                      if (videos.length > 1) {
                        goToNext();
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
                          e.stopPropagation();
                          togglePlay();
                        }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-20 h-20 bg-yellow-400/90 rounded-full flex items-center justify-center backdrop-blur-sm"
                          aria-label={isPlaying ? "Pause" : "Play"}
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
                  <motion.button
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="hidden lg:block w-[12%] aspect-[9/16] overflow-hidden rounded-lg cursor-pointer relative group"
                    onClick={goToNext}
                    aria-label="Next video"
                  >
                    <video
                      src={nextVideo.src}
                      className="w-full h-full object-cover filter blur-sm brightness-60 scale-110"
                      muted
                      preload="metadata"
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-end pr-2">
                      <div className="bg-black/50 p-2 rounded-full group-hover:bg-black/70 transition-colors">
                        <FaChevronRight className="text-white" size={16} />
                      </div>
                    </div>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoGallery;
