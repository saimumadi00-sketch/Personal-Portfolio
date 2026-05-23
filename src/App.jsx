import { useState } from 'react'
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
      <BrowserRouter>
        <MainLayout toasts={toasts} onToast={addToast} />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
