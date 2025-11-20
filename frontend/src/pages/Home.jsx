import { useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import ServicesPreview from "../components/ServicesPreview";
import EventsPreview from "../components/EventsPreview";
import GalleryPreview from "../components/GalleryPreview";

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
      <EventsPreview />
      <GalleryPreview />
    </motion.div>
  );
};

export default Home;
