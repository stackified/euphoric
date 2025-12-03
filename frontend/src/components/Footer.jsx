import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Core links - minimal, premium design inspired by Enrique Iglesias
  const coreLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/gallery", label: "Gallery" },
    { path: "/videos", label: "Videos" },
    { path: "/events", label: "Events" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-black border-t border-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <motion.img
            src={logo}
            alt="Euphoric Live"
            className="h-24 w-auto opacity-80"
            whileHover={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Core Links - Centered, Horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center items-center gap-8 mb-12"
        >
          {coreLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm uppercase tracking-wider relative group"
            >
              {link.label}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                initial={false}
              />
            </Link>
          ))}
        </motion.div>

        {/* Copyright - Centered, Subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-gray-500 text-sm"
        >
          <p>© {currentYear} Euphoric Live. All Rights Reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
