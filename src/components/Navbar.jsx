import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/',         label: 'Home',     end: true },
  { to: '/about',    label: 'About'              },
  { to: '/projects', label: 'Projects'           },
  { to: '/skills',   label: 'Skills'             },
  { to: '/contact',  label: 'Contact'            },
  { to: '/resume',   label: 'Resume'             },
  { to: '/blog',     label: 'Blog'               },
]

function Navbar() {
  const { darkMode } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const collapseRef                 = useRef(null)
  const location                    = useLocation()

  // Scroll shadow
  useEffect(() => {
    const handle = () => setIsScrolled(window.scrollY > 10)
    handle()
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Close menu on outside click / tap
  useEffect(() => {
    if (!menuOpen) return
    const handle = (e) => {
      const nav = document.getElementById('mainNav')
      if (nav && !nav.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handle)
    document.addEventListener('touchstart', handle)
    return () => {
      document.removeEventListener('mousedown', handle)
      document.removeEventListener('touchstart', handle)
    }
  }, [menuOpen])

  // Close on Escape key
  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handle)
    return () => document.removeEventListener('keydown', handle)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark fixed-top portfolio-navbar ${
        isScrolled || menuOpen ? 'navbar-scrolled' : ''
      }`}
      id="mainNav"
    >
      <div className="container">
        <NavLink
          className="navbar-brand fw-semibold"
          to="/"
          aria-label="Saimum home"
          onClick={closeMenu}
        >
          Saimum<span className="navbar-brand-dot">.</span>
        </NavLink>

        <button
          className="navbar-toggler border-0"
          type="button"
          aria-controls="mainNavbar"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {/* Animated hamburger → X */}
          <span
            style={{
              display: 'block',
              width: '22px',
              position: 'relative',
              height: '16px',
            }}
          >
            {[0, 6, 12].map((top, i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  position: 'absolute',
                  height: '2px',
                  width: i === 1 && menuOpen ? '0%' : '100%',
                  background: '#fff',
                  borderRadius: '2px',
                  top: `${top}px`,
                  left: i === 1 && menuOpen ? '50%' : '0',
                  transform:
                    menuOpen && i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                    : menuOpen && i === 2 ? 'rotate(-45deg) translate(4px, -4px)'
                    : 'none',
                  transition: 'all 0.25s ease',
                }}
              />
            ))}
          </span>
        </button>

        {/* Controlled collapse — no Bootstrap JS dependency */}
        <div
          ref={collapseRef}
          id="mainNavbar"
          className="navbar-collapse"
          style={{
            display: menuOpen ? 'block' : '',
          }}
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1 pb-3 pb-lg-0">
            {links.map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink
                  end={link.end}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  to={link.to}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="nav-item mt-2 mt-lg-0 ms-lg-2">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
