import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
  { to: '/resume', label: 'Resume' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Shadow on scroll
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close on route change
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMenuOpen(false))
    return () => window.cancelAnimationFrame(frame)
  }, [location.pathname])

  // Close on Escape
  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [])

  // Lock body scroll when menu is open on mobile
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav
        className={`portfolio-navbar${scrolled || menuOpen ? ' nav-scrolled' : ''}`}
        id="mainNav"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav-inner">
          <NavLink className="nav-brand" to="/" onClick={close} aria-label="Go to home">
            Saimum<span className="nav-brand-dot">.</span>
          </NavLink>

          <ul className="nav-links-desktop" role="list">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  end={link.end}
                  to={link.to}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <ThemeToggle />
            </li>
          </ul>

          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`ham-bar ham-top${menuOpen ? ' open' : ''}`} />
            <span className={`ham-bar ham-mid${menuOpen ? ' open' : ''}`} />
            <span className={`ham-bar ham-bot${menuOpen ? ' open' : ''}`} />
          </button>
        </div>

        <div
          id="mobileMenu"
          className={`nav-mobile-menu${menuOpen ? ' is-open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <ul role="list">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  end={link.end}
                  to={link.to}
                  className={({ isActive }) => `nav-mobile-link${isActive ? ' active' : ''}`}
                  onClick={close}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="nav-mobile-toggle">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </nav>

      {menuOpen && <div className="nav-backdrop" onClick={close} aria-hidden="true" />}
    </>
  )
}

export default Navbar
