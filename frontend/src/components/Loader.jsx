import { motion } from "framer-motion";
import loaderImage from "../assets/loader.png";

/**
 * Global Loader Component
 * Displays a subtle, classy loading animation using the loader asset
 */
const Loader = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} relative`}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <img
          src={loaderImage}
          alt="Loading..."
          className="w-full h-full object-contain"
        />
      </motion.div>
    </div>
  );
};

export default Loader;
