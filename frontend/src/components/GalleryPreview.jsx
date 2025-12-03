import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { previewGalleryImages } from "../utils/imageImports";

const GalleryPreview = () => {
  const galleryImages = previewGalleryImages;
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Duplicate images for seamless loop
  const duplicatedImages = [...galleryImages, ...galleryImages];

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    // Calculate actual item width dynamically
    const firstItem = container.querySelector("div");
    if (!firstItem) return;

    const itemWidth = firstItem.offsetWidth || 300;
    const gap = 24; // Normal gap between images
    const totalWidth = itemWidth + gap;
    const speed = 0.5; // pixels per frame

    const animate = (currentTime) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      if (!isPaused) {
        setTranslateX((prev) => {
          const newX = prev - speed * (deltaTime / 16); // Normalize to 60fps
          // Reset when we've scrolled one full set
          if (Math.abs(newX) >= galleryImages.length * totalWidth) {
            return 0;
          }
          return newX;
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, galleryImages.length]);

  return (
    <section className="py-20 bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-yellow-400 mb-4">
            GALLERY
          </h2>
          <p className="text-gray-400 text-lg">
            Capturing unforgettable moments
          </p>
        </motion.div>

        {/* Auto-scrolling Marquee */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={containerRef}
            className="flex gap-6"
            style={{
              transform: `translateX(${translateX}px)`,
              willChange: "transform",
            }}
          >
            {duplicatedImages.map((image, index) => (
              <motion.div
                key={`${index}-${image}`}
                className="flex-shrink-0 w-[280px] md:w-[300px] aspect-square overflow-hidden bg-gray-900 border border-yellow-400/20 hover:border-yellow-400 transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <img
                  src={image}
                  alt={`Gallery ${(index % galleryImages.length) + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x400?text=Image";
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/gallery"
            className="inline-block px-8 py-3 border-2 border-yellow-400 text-yellow-400 font-bold uppercase tracking-wider hover:bg-yellow-400 hover:text-black transition-all duration-300"
          >
            VIEW FULL GALLERY
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryPreview;
