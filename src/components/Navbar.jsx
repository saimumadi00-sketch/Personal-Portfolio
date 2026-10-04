import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { useReducedMotion } from 'framer-motion'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
  { to: '/resume', label: 'Resume' },
]

function Navbar() {
  const reducedMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef(null)
  const menuRef = useRef(null)
  const location = useLocation()
  const previousPath = useRef(location.pathname)

  // Shadow on scroll
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close on route change
  useEffect(() => {
    if (previousPath.current === location.pathname) return
    previousPath.current = location.pathname
    const frame = window.requestAnimationFrame(() => setMenuOpen(false))
    return () => window.cancelAnimationFrame(frame)
  }, [location.pathname])

  // Keep keyboard focus in the expanded menu, and restore it on Escape.
  useEffect(() => {
    if (!menuOpen) return
    const frame = requestAnimationFrame(() => menuRef.current?.querySelector('a')?.focus())
    const fn = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); toggleRef.current?.focus() }
      if (e.key === 'Tab') {
        const items = [toggleRef.current, ...menuRef.current.querySelectorAll('a, button')]
        const first = items[0]
        const last = items.at(-1)
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', fn)
    return () => { cancelAnimationFrame(frame); document.removeEventListener('keydown', fn) }
  }, [menuOpen])

  useEffect(() => {
    const query = window.matchMedia('(min-width: 992px)')
    const closeOnDesktop = () => { if (query.matches) setMenuOpen(false) }
    query.addEventListener('change', closeOnDesktop)
    return () => query.removeEventListener('change', closeOnDesktop)
  }, [])

  // Lock body scroll when menu is open on mobile
  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [menuOpen])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  const close = () => {
    setMenuOpen(false)
    scrollToTop()
  }

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
                  onClick={scrollToTop}
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
            ref={toggleRef}
            type="button"
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
          ref={menuRef}
          id="mobileMenu"
          inert={!menuOpen}
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

      {menuOpen && <div className="nav-backdrop" onClick={() => { setMenuOpen(false); toggleRef.current?.focus() }} aria-hidden="true" />}
    </>
  )
}

export default Navbar
