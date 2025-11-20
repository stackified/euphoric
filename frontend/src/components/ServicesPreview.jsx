import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBriefcase, FaHeart, FaMusic, FaPalette } from "react-icons/fa";

const ServicesPreview = () => {
  const services = [
    { title: "Corporate Events", icon: FaBriefcase },
    { title: "Wedding Events", icon: FaHeart },
    { title: "Live Concert Events", icon: FaMusic },
    { title: "Festival Events", icon: FaPalette },
  ];

  return (
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
            OUR SERVICES
          </h2>
          <p className="text-gray-400 text-lg">
            Professional event management for every occasion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative p-6 bg-gradient-to-br from-gray-900 to-black border border-yellow-400/20 hover:border-yellow-400/60 transition-all duration-300 overflow-hidden"
            >
              {/* Hover Glow */}
              <motion.div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-yellow-400/10 transition-all duration-300" />

              {/* Icon */}
              <div className="relative z-10 mb-4 flex justify-center">
                <motion.div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-yellow-400/10 border border-yellow-400/30 group-hover:bg-yellow-400/20 group-hover:border-yellow-400/50 transition-all duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <service.icon className="text-yellow-400 text-xl group-hover:scale-110 transition-transform" />
                </motion.div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white text-center group-hover:text-yellow-400 transition-colors relative z-10">
                {service.title}
              </h3>

              {/* Bottom Accent */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-yellow-400"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link
            to="/services"
            className="inline-block px-8 py-3 border-2 border-yellow-400 text-yellow-400 font-bold uppercase tracking-wider hover:bg-yellow-400 hover:text-black transition-all duration-300"
          >
            VIEW ALL SERVICES
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;
