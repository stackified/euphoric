import { useState } from 'react'
import emailjs from '@emailjs/browser'

/**
 * Custom hook for EmailJS integration
 * Handles email sending with loading states and error handling
 */
export const useEmailJS = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendEmail = async (templateParams, options = {}) => {
    setLoading(true)
    setError(null)

    try {
      const serviceId = options.serviceId || import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_bhliq0s'
      const templateId = options.templateId || import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_i7q4f0m'
      const publicKey = options.publicKey || import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          'EmailJS configuration is missing. Please check your environment variables.'
        )
      }

      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)

      setLoading(false)
      return { success: true, response }
    } catch (err) {
      setError(err.message || 'Failed to send email')
      setLoading(false)
      return { success: false, error: err }
    }
  }

  return {
    sendEmail,
    loading,
    error,
  }
}

