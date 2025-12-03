import { useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import ServicesPreview from "../components/ServicesPreview";
import QuickActionBox from "../components/QuickActionBox";
import EventsPreview from "../components/EventsPreview";
import GalleryPreview from "../components/GalleryPreview";
import FeaturedVideos from "../components/FeaturedVideos";
import AboutEuphoric from "../components/AboutEuphoric";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <ServicesPreview />
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <QuickActionBox />
        </div>
      </section>
      <EventsPreview />
      <GalleryPreview />
      <AboutEuphoric />
      <FeaturedVideos />
    </motion.div>
  );
};

export default Home;
