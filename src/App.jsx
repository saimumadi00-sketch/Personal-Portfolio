import { useState } from 'react'
import PageLoader from './components/PageLoader'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './context/ThemeContext'
import MainLayout from './layouts/MainLayout'

function App() {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem('loaded'))
  const [toasts, setToasts] = useState([])

  const handleLoaderDone = () => {
    sessionStorage.setItem('loaded', '1')
    setLoading(false)
  }

  const addToast = (message, type = 'info') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((toast) => toast.id !== id)), 4000)
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        {loading && <PageLoader onDone={handleLoaderDone} />}
        <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
          <MainLayout toasts={toasts} onToast={addToast} />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
