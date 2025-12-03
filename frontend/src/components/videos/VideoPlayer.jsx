import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import Loader from "../Loader";

/**
 * Custom Video Player Component
 * Professional, elegant video player with full controls
 * Supports startTime prop to continue playback from specific timestamp
 */
const VideoPlayer = ({
  videoSrc,
  title,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
  autoplay = false,
  startTime = 0, // New prop: start playback from this time
  className = "",
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [currentTime, setCurrentTime] = useState(startTime);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState(null);

  // Set start time when video loads
  useEffect(() => {
    const video = videoRef.current;
    if (!video || startTime === 0) return;

    const setStartTime = () => {
      if (video.readyState >= 2) {
        // HAVE_CURRENT_DATA or higher
        video.currentTime = startTime;
        setCurrentTime(startTime);
      }
    };

    if (video.readyState >= 2) {
      setStartTime();
    } else {
      video.addEventListener("loadedmetadata", setStartTime, { once: true });
      video.addEventListener("canplay", setStartTime, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", setStartTime);
      video.removeEventListener("canplay", setStartTime);
    };
  }, [videoSrc, startTime]);

  // Update current time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => {
      setDuration(video.duration);
      // Set start time if not already set
      if (startTime > 0 && video.currentTime === 0) {
        video.currentTime = startTime;
        setCurrentTime(startTime);
      }
    };
    const handleWaiting = () => setIsBuffering(true);
    const handleCanPlay = () => setIsBuffering(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [videoSrc, startTime]);

  // Handle fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  // Auto-hide controls
  useEffect(() => {
    if (isPlaying && showControls) {
      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      setControlsTimeout(timeout);
      return () => clearTimeout(timeout);
    }
  }, [isPlaying, showControls]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.() ||
        containerRef.current.webkitRequestFullscreen?.() ||
        containerRef.current.mozRequestFullScreen?.();
    } else {
      document.exitFullscreen?.() ||
        document.webkitExitFullscreen?.() ||
        document.mozCancelFullScreen?.();
    }
  }, [isFullscreen]);

  const handleSeekKey = useCallback(
    (seconds) => {
      const video = videoRef.current;
      if (!video) return;
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      video.currentTime = newTime;
      setCurrentTime(newTime);
    },
    [currentTime, duration]
  );

  const handleVolumeKey = useCallback(
    (delta) => {
      const video = videoRef.current;
      if (!video) return;
      const newVolume = Math.max(0, Math.min(1, volume + delta));
      setVolume(newVolume);
      video.volume = newVolume;
      setIsMuted(newVolume === 0);
    },
    [volume]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handleSeekKey(-10);
          break;
        case "ArrowRight":
          e.preventDefault();
          handleSeekKey(10);
          break;
        case "ArrowUp":
          e.preventDefault();
          handleVolumeKey(0.1);
          break;
        case "ArrowDown":
          e.preventDefault();
          handleVolumeKey(-0.1);
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "m":
        case "M":
          e.preventDefault();
          toggleMute();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    togglePlay,
    handleSeekKey,
    handleVolumeKey,
    toggleFullscreen,
    toggleMute,
  ]);

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(1, pos));
    setVolume(newVolume);
    video.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeout) clearTimeout(controlsTimeout);
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden ${className}`}
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => {
        if (isPlaying) {
          const timeout = setTimeout(() => setShowControls(false), 2000);
          setControlsTimeout(timeout);
        }
      }}
      onTouchStart={showControlsTemporarily}
      role="application"
      aria-label="Video player"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full"
        playsInline
        autoPlay={autoplay}
        onLoadedData={() => {
          if (autoplay && videoRef.current) {
            videoRef.current.play().catch(() => {
              // Autoplay blocked, user interaction required
            });
          }
          // Set start time if provided
          if (startTime > 0 && videoRef.current) {
            videoRef.current.currentTime = startTime;
            setCurrentTime(startTime);
          }
        }}
      />

      {/* Buffering Overlay */}
      <AnimatePresence>
        {isBuffering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-20"
            aria-label="Buffering"
          >
            <Loader size="lg" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"
          >
            {/* Top Bar - Title & Fullscreen */}
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
              {title && (
                <h3
                  id="video-title"
                  className="text-white font-semibold text-lg truncate max-w-[70%]"
                >
                  {title}
                </h3>
              )}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-yellow-400 transition-colors p-2"
                aria-label="Toggle fullscreen"
              >
                {isFullscreen ? (
                  <FaCompress size={20} />
                ) : (
                  <FaExpand size={20} />
                )}
              </button>
            </div>

            {/* Center - Play/Pause */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="text-white hover:text-yellow-400 transition-all p-4 bg-black/50 rounded-full backdrop-blur-sm hover:scale-110"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <FaPause size={32} /> : <FaPlay size={32} />}
              </button>
            </div>

            {/* Bottom Bar - Timeline & Volume */}
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
              {/* Timeline Seeker */}
              <div className="flex items-center gap-3">
                <span
                  className="text-white text-sm font-mono min-w-[50px] text-right"
                  aria-label="Current time"
                >
                  {formatTime(currentTime)}
                </span>
                <div
                  className="flex-1 h-2 bg-gray-700 rounded-full cursor-pointer group relative"
                  onClick={handleSeek}
                  role="slider"
                  aria-label="Video timeline"
                  aria-valuemin={0}
                  aria-valuemax={duration}
                  aria-valuenow={currentTime}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") handleSeekKey(-5);
                    if (e.key === "ArrowRight") handleSeekKey(5);
                  }}
                >
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all"
                    style={{
                      width: `${
                        duration > 0 ? (currentTime / duration) * 100 : 0
                      }%`,
                    }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      left: `${
                        duration > 0 ? (currentTime / duration) * 100 : 0
                      }%`,
                      marginLeft: "-8px",
                    }}
                  />
                </div>
                <span
                  className="text-white text-sm font-mono min-w-[50px]"
                  aria-label="Duration"
                >
                  {formatTime(duration)}
                </span>
              </div>

              {/* Volume & Fullscreen Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-yellow-400 transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <FaVolumeMute size={20} />
                  ) : (
                    <FaVolumeUp size={20} />
                  )}
                </button>
                <div
                  className="flex-1 h-1.5 bg-gray-700 rounded-full cursor-pointer group relative max-w-[150px]"
                  onClick={handleVolumeChange}
                  role="slider"
                  aria-label="Volume"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={isMuted ? 0 : volume * 100}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") handleVolumeKey(-0.1);
                    if (e.key === "ArrowRight") handleVolumeKey(0.1);
                  }}
                >
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all"
                    style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                  />
                </div>
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-yellow-400 transition-colors ml-auto"
                  aria-label="Toggle fullscreen"
                >
                  {isFullscreen ? (
                    <FaCompress size={20} />
                  ) : (
                    <FaExpand size={20} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayer;
