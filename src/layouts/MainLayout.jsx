import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import BackToTop from '../components/BackToTop'
import Navbar from '../components/Navbar'
import Toast from '../components/Toast'
import { useTheme } from '../context/ThemeContext'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import Skills from '../pages/Skills'

function MainLayout({ toasts, onToast }) {
  const { darkMode } = useTheme()
  const location = useLocation()

  return (
    <div className={darkMode ? 'site-shell site-shell-dark' : 'site-shell site-shell-light'}>
      <Navbar />
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects onToast={onToast} />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact onToast={onToast} />} />
          </Routes>
        </AnimatePresence>
      </main>
      <footer className="bg-dark text-light py-4 mt-auto">
        <div className="container text-center">
          <p className="mb-0 small">&copy; 2026 Md Saimum Al Mahmud. All rights reserved.</p>
        </div>
      </footer>
      <BackToTop />
      <Toast toasts={toasts} />
    </div>
  )
}

export default MainLayout
