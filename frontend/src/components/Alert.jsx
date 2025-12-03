import { motion, AnimatePresence } from 'framer-motion'
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa'
import { useEffect } from 'react'

/**
 * Custom Alert Component
 * Replaces browser alert() with elegant in-app notifications
 */
const Alert = ({ type = 'info', message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const alertConfig = {
    success: {
      icon: FaCheckCircle,
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500',
      textColor: 'text-green-400',
      iconColor: 'text-green-400',
    },
    error: {
      icon: FaTimesCircle,
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500',
      textColor: 'text-red-400',
      iconColor: 'text-red-400',
    },
    warning: {
      icon: FaExclamationCircle,
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-400',
      iconColor: 'text-yellow-400',
    },
    info: {
      icon: FaInfoCircle,
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-400',
      iconColor: 'text-blue-400',
    },
  }

  const config = alertConfig[type] || alertConfig.info
  const Icon = config.icon

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 ${config.bgColor} ${config.borderColor} border-2 rounded-lg px-6 py-4 shadow-lg backdrop-blur-sm min-w-[300px] max-w-[90vw]`}
      >
        <div className="flex items-center gap-3">
          <Icon className={`${config.iconColor} text-xl flex-shrink-0`} />
          <p className={`${config.textColor} font-medium flex-1`}>{message}</p>
          {onClose && (
            <button
              onClick={onClose}
              className={`${config.textColor} hover:opacity-70 transition-opacity ml-2`}
              aria-label="Close"
            >
              <FaTimesCircle className="text-lg" />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Alert

