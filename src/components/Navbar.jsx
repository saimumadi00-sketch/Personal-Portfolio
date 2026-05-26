import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
  { to: '/resume', label: 'Resume' },
  { to: '/blog', label: 'Blog' },
]

function Navbar() {
  const { darkMode } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark fixed-top portfolio-navbar ${
        isScrolled ? 'navbar-scrolled' : ''
      }`}
      id="mainNav"
      data-theme-mode={darkMode ? 'dark' : 'light'}
    >
      <div className="container">
        <NavLink className="navbar-brand fw-semibold" to="/" aria-label="Saimum home">
          <span className="navbar-brand-name">
            Saimum<span className="navbar-brand-dot">.</span>
          </span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            {links.map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink
                  end={link.end}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  to={link.to}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
