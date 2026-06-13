import { AnimatePresence } from 'framer-motion'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import BackToTop from '../components/BackToTop'
import ReadingProgress from '../components/ReadingProgress'
import CursorEffects from '../components/CursorEffects'
import Navbar from '../components/Navbar'
import Toast from '../components/Toast'
import { useTheme } from '../context/ThemeContext'
import socialLinks from '../data/socialLinks'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import Skills from '../pages/Skills'
import Resume from '../pages/Resume'

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
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </AnimatePresence>
      </main>
      <footer className="site-footer mt-auto">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="site-footer-brand">
                Saimum<span className="navbar-brand-dot">.</span>
              </div>
              <p className="mb-2">CS Student &middot; NSU Dhaka</p>
              <a href={socialLinks.github.href} target="_blank" rel="noreferrer">
                <i className={`bi ${socialLinks.github.icon} me-2`}></i>
                {socialLinks.github.label}
              </a>
            </div>

            <div className="col-12 col-md-4">
              <h2 className="h6 text-white mb-3">Navigation</h2>
              <ul className="list-unstyled mb-0 d-grid gap-2">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/about', label: 'About' },
                  { to: '/projects', label: 'Projects' },
                  { to: '/skills', label: 'Skills' },
                  { to: '/contact', label: 'Contact' },
                  { to: '/resume', label: 'Resume' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-12 col-md-4">
              <h2 className="h6 text-white mb-3">Connect</h2>
              <ul className="list-unstyled mb-3 d-grid gap-2">
                <li>
                  <a href={socialLinks.github.href} target="_blank" rel="noreferrer">
                    <i className={`bi ${socialLinks.github.icon} me-2`}></i>
                    {socialLinks.github.label}
                  </a>
                </li>
                <li>
                  <a href={socialLinks.liveSite.href} target="_blank" rel="noreferrer">
                    <i className={`bi ${socialLinks.liveSite.icon} me-2`}></i>
                    Vercel Live Site
                  </a>
                </li>
              </ul>
              <p className="small mb-0">Open to internship opportunities</p>
            </div>
          </div>

          <div className="site-footer-bottom">
            <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
              <span>&copy; 2026 Md Saimum Al Mahmud</span>
              <span>Built with React + Vite + Bootstrap</span>
            </div>
          </div>
        </div>
      </footer>
      <ReadingProgress />
      <CursorEffects />
      <BackToTop />
      <Toast toasts={toasts} />
    </div>
  )
}

export default MainLayout
