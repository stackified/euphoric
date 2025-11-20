import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'
import emailjs from '@emailjs/browser'

const Feedbacks = () => {
  const { items: reviews, loading } = useSelector((state) => state.reviews)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    feedback: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (rating === 0) {
      alert('Please select a rating')
      return
    }

    if (!formData.name.trim() || !formData.feedback.trim()) {
      alert('Please fill in all fields')
      return
    }

    setSubmitting(true)

    try {
      // Send email via EmailJS
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check your .env file.')
      }

      // Send feedback email
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          rating: rating,
          message: formData.feedback,
          to_email: 'euphoricparth1003@gmail.com',
          subject: `New Feedback from ${formData.name} - Rating: ${rating}/5`,
          feedback_date: new Date().toLocaleDateString(),
        },
        publicKey
      )

      setSubmitSuccess(true)
      setFormData({ name: '', feedback: '' })
      setRating(0)
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert(
        error.message ||
          'Failed to submit feedback. Please check your EmailJS configuration and try again.'
      )
    } finally {
      setSubmitting(false)
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
            FEEDBACKS
          </h1>
          <p className="text-gray-400 text-lg">What our clients say about us</p>
        </motion.div>

        {/* Existing Reviews */}
        <div className="max-w-4xl mx-auto mb-16">
          {loading ? (
            <div className="text-center text-gray-400">Loading reviews...</div>
          ) : reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 bg-gray-900 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <h3 className="text-xl font-semibold text-white">{review.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < review.rating ? 'text-yellow-400' : 'text-gray-600'}
                            size={16}
                          />
                        ))}
                      </div>
                      {review.created_at && (
                        <span className="text-gray-500 text-sm ml-2">
                          on {new Date(review.created_at).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{review.message}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              <p>No reviews yet. Be the first to leave a review!</p>
            </div>
          )}
        </div>

        {/* Feedback Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-8 bg-gray-900 border border-yellow-400/20">
            <h2 className="text-3xl font-semibold text-yellow-400 mb-6">Give Feedback</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-white mb-3">Select a Rating</label>
                <div className="flex gap-2 items-center">
                  {[...Array(5)].map((_, i) => {
                    const ratingValue = i + 1
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHoverRating(ratingValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        {ratingValue <= (hoverRating || rating) ? (
                          <FaStar className="text-yellow-400" size={32} />
                        ) : (
                          <FiStar className="text-gray-600 hover:text-gray-500" size={32} />
                        )}
                      </button>
                    )
                  })}
                  {rating > 0 && (
                    <span className="ml-4 text-yellow-400 font-semibold">
                      {rating} / 5
                    </span>
                  )}
                </div>
              </div>

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
                  className="w-full px-4 py-3 bg-black border border-gray-700 text-white focus:border-yellow-400 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              {/* Feedback */}
              <div>
                <label htmlFor="feedback" className="block text-white mb-2">
                  Enter your feedback
                </label>
                <textarea
                  id="feedback"
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-black border border-gray-700 text-white focus:border-yellow-400 focus:outline-none resize-none transition-colors"
                  placeholder="Share your experience with us..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={submitting || rating === 0}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                className="w-full px-8 py-4 bg-yellow-400 text-black font-bold uppercase tracking-wider hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-400"
              >
                {submitting ? 'Submitting...' : 'Give Feedback'}
              </motion.button>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/20 border border-green-500 text-green-400 text-center rounded"
                >
                  ✓ Thank you for your feedback! We've received it and will review it soon.
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Feedbacks
