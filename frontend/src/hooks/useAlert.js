import { useState, useCallback } from 'react'

/**
 * Custom hook for managing alert notifications
 * Replaces browser alert() with custom UI
 */
export const useAlert = () => {
  const [alert, setAlert] = useState(null)

  const showAlert = useCallback((message, type = 'info', duration = 5000) => {
    setAlert({ message, type, duration })
  }, [])

  const hideAlert = useCallback(() => {
    setAlert(null)
  }, [])

  const showSuccess = useCallback((message, duration) => {
    showAlert(message, 'success', duration)
  }, [showAlert])

  const showError = useCallback((message, duration) => {
    showAlert(message, 'error', duration)
  }, [showAlert])

  const showWarning = useCallback((message, duration) => {
    showAlert(message, 'warning', duration)
  }, [showAlert])

  const showInfo = useCallback((message, duration) => {
    showAlert(message, 'info', duration)
  }, [showAlert])

  return {
    alert,
    showAlert,
    hideAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }
}

