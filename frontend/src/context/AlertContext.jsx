import { createContext, useContext, useState, useCallback } from 'react'

const AlertContext = createContext(null)

export const AlertProvider = ({ children }) => {
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

  return (
    <AlertContext.Provider
      value={{
        alert,
        showAlert,
        hideAlert,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export const useAlertContext = () => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('useAlertContext must be used within AlertProvider')
  }
  return context
}

