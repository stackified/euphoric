import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { acceptAll, rejectAll, updatePreferences } from '../store/slices/cookieSlice'
import { FiX, FiSettings } from 'react-icons/fi'

const CookieBanner = () => {
  const dispatch = useDispatch()
  const { accepted } = useSelector((state) => state.cookies)
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    if (!accepted) {
      setShowBanner(true)
    }
  }, [accepted])

  const handleAcceptAll = () => {
    dispatch(acceptAll())
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    dispatch(rejectAll())
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    dispatch(updatePreferences(preferences))
    setShowBanner(false)
    setShowSettings(false)
  }

  if (accepted) return null

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 shadow-2xl"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {!showSettings ? (
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    THIS WEBSITE USES COOKIES
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    We use cookies to enhance your browsing experience, serve personalized content,
                    and analyze our traffic. By clicking "Accept All", you consent to our use of
                    cookies. You can also manage your preferences or learn more in our{' '}
                    <a href="/privacy" className="text-yellow-400 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-4 py-2 text-white border border-gray-600 hover:border-yellow-400 transition-colors flex items-center gap-2"
                  >
                    <FiSettings />
                    Manage Cookies
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="px-4 py-2 text-white border border-gray-600 hover:border-yellow-400 transition-colors"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-2 bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-colors"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Cookie Preferences</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                <div className="space-y-4 mb-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded">
                    <div>
                      <h4 className="text-white font-semibold mb-1">Necessary Cookies</h4>
                      <p className="text-gray-400 text-sm">
                        Required for the website to function properly. Cannot be disabled.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded">
                    <div>
                      <h4 className="text-white font-semibold mb-1">Analytics Cookies</h4>
                      <p className="text-gray-400 text-sm">
                        Help us understand how visitors interact with our website.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences({ ...preferences, analytics: e.target.checked })
                      }
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded">
                    <div>
                      <h4 className="text-white font-semibold mb-1">Marketing Cookies</h4>
                      <p className="text-gray-400 text-sm">
                        Used to deliver personalized advertisements.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences({ ...preferences, marketing: e.target.checked })
                      }
                      className="w-5 h-5"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 text-white border border-gray-600 hover:border-yellow-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-6 py-2 bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieBanner

