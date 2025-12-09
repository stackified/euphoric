import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo.png'

/**
 * Page Loader Component
 * Displays the logo with fade in/out animation during page loading
 * Blurs the background content while loading
 */
const PageLoader = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md"
        >
          {/* Blurred background overlay */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Logo with fade in/out animation */}
          <motion.div
            className="relative z-10"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={logo}
              alt="Euphoric Logo"
              className="w-56 h-56 md:w-72 md:h-72 object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageLoader

