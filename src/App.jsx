import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './context/ThemeContext'
import MainLayout from './layouts/MainLayout'

function App() {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'info') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((toast) => toast.id !== id)), 4000)
  }

  return (
    <ThemeProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <MotionConfig reducedMotion="user">
          <MainLayout toasts={toasts} onToast={addToast} />
        </MotionConfig>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
