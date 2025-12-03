import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useEmailJS } from '../hooks/useEmailJS'
import { useAlertContext } from '../context/AlertContext'
import Loader from '../components/Loader'

const Enquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const { sendEmail, loading: emailLoading } = useEmailJS()
  const { showSuccess, showError } = useAlertContext()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await sendEmail(
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_email: 'euphoricparth1003@gmail.com',
      },
      {
        serviceId: 'service_bhliq0s',
        templateId: 'template_i7q4f0m',
      }
    )

    if (result.success) {
      showSuccess('Thank you! Your enquiry has been sent successfully.')
      setFormData({ name: '', phone: '', email: '', message: '' })
    } else {
      showError(result.error?.message || 'Failed to send enquiry. Please try again.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black pt-32 pb-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-yellow-400 mb-4">
            ENQUIRY FORM
          </h1>
          <p className="text-gray-400 text-lg">Get in touch with us</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-8 bg-gray-900 border border-yellow-400/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  Enter Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-700 text-white focus:border-yellow-400 focus:outline-none"
                />
              </div>

              {/* Phone and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-white mb-2">
                    Enter Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white focus:border-yellow-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white mb-2">
                    Enter Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Enter Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-black border border-gray-700 text-white focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={emailLoading}
                whileHover={{ scale: emailLoading ? 1 : 1.02 }}
                whileTap={{ scale: emailLoading ? 1 : 0.98 }}
                className="w-full px-8 py-4 bg-yellow-400 text-black font-bold uppercase tracking-wider hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {emailLoading ? (
                  <>
                    <Loader size="sm" />
                    <span>Sending...</span>
                  </>
                ) : (
                  'Send'
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Enquiry

