import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import Alert from './components/Alert'
import PageLoader from './components/PageLoader'
import { AlertProvider, useAlertContext } from './context/AlertContext'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
// import Videos from './pages/Videos'
import Events from './pages/Events'
import Contact from './pages/Contact'
import Links from './pages/Links'
import Feedbacks from './pages/Feedbacks'
import Enquiry from './pages/Enquiry'

const AppContent = () => {
  const { alert, hideAlert } = useAlertContext()
  const [isPageLoading, setIsPageLoading] = useState(true)

  useEffect(() => {
    // Simulate page loading - show loader for a minimum duration
    const timer = setTimeout(() => {
      setIsPageLoading(false)
    }, 1500) // Show loader for at least 1.5 seconds

    // Also hide loader when page is fully loaded
    const handleLoad = () => {
      setTimeout(() => {
        setIsPageLoading(false)
      }, 500)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <PageLoader isLoading={isPageLoading} />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          {/* <Route path="/videos" element={<Videos />} /> */}
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/links" element={<Links />} />
          {/* <Route path="/feedbacks" element={<Feedbacks />} /> */}
          <Route path="/enquiry" element={<Enquiry />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={hideAlert}
          duration={alert.duration}
        />
      )}
    </div>
  )
}

function App() {
  return (
    <AlertProvider>
      <AppContent />
    </AlertProvider>
  )
}

export default App

