import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import QuoteCard from '../components/QuoteCard'
import SEOHead from '../components/SEOHead'
import StatCounter from '../components/StatCounter'
import StarField from '../components/StarField'
import { useTheme } from '../context/ThemeContext'
import quotesData from '../data/quotes'
import statsData from '../data/stats'
import { pageVariants } from '../utils/variants'

const navCards = [
  {
    icon: 'bi-folder2-open',
    title: '8 Projects',
    text: 'From React portfolios to ML intrusion detectors.',
    button: 'Browse Projects',
    to: '/projects',
  },
  {
    icon: 'bi-tools',
    title: 'Full Stack',
    text: 'React, Python, Java, Bootstrap, Node, MySQL.',
    button: 'View Skills',
    to: '/skills',
  },
  {
    icon: 'bi-send',
    title: 'Available',
    text: 'Open to internships in Dhaka or remote.',
    button: 'Get in Touch',
    to: '/contact',
  },
]

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 5) return 'Good night'
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  if (hour < 21) return 'Good evening'
  return 'Good night'
}

function Home() {
  const { darkMode } = useTheme()
  const [typewriterText, setTypewriterText] = useState('')
  const [showModal, setShowModal] = useState(false)
  const charIndex = useRef(0)
  const phraseIndex = useRef(0)
  const isDeleting = useRef(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const phrases = [
      'Building web apps with React + Vite',
      'ML pipelines with Python and Keras',
      'CS student at North South University',
      'Open to software engineering internships',
      'Deployed to Vercel — check the source on GitHub',
    ]

    const type = () => {
      const current = phrases[phraseIndex.current]

      if (isDeleting.current) {
        charIndex.current -= 1
      } else {
        charIndex.current += 1
      }

      setTypewriterText(current.substring(0, charIndex.current))

      let delay = isDeleting.current ? 40 : 70
      if (!isDeleting.current && charIndex.current === current.length) {
        isDeleting.current = true
        delay = 1800
      } else if (isDeleting.current && charIndex.current === 0) {
        isDeleting.current = false
        phraseIndex.current = (phraseIndex.current + 1) % phrases.length
        delay = 300
      }

      timeoutRef.current = setTimeout(type, delay)
    }

    timeoutRef.current = setTimeout(type, 100)
    return () => clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    if (!showModal) {
      document.body.style.overflow = ''
      return undefined
    }

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setShowModal(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showModal])

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <SEOHead
        title="Home"
        description="Portfolio of MD Saimum Al Mahmud Aditto: CSE student at NSU Dhaka, web developer, and software engineering intern candidate."
      />

      <section
        className="hero-immersive"
        id="home-intro"
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, #0d1117 0%, #1a3a5c 100%)'
            : 'linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%)',
        }}
      >
        <div className="hero-glow" aria-hidden="true"></div>
        <StarField />
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-7 text-center text-lg-start">
              <p
                className="small text-uppercase mb-2"
                style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.16em' }}
              >
                {getGreeting()}, visitor.
              </p>
              <span className="badge text-bg-primary mb-3">Open to Internship Opportunities</span>
              <h1 className="fw-bold mb-2" style={{ color: '#fff', fontSize: 'clamp(2.5rem,6vw,4rem)' }}>
                Hi, I&apos;m Saimum.
              </h1>
              <p className="lead mb-4">
                <span id="typewriterText" style={{ color: '#6ea8fe' }}>
                  {typewriterText}
                </span>
              </p>
              <div className="d-flex flex-wrap gap-2 mt-2 justify-content-center justify-content-lg-start">
                <Link className="btn btn-primary btn-lg" to="/projects">
                  View My Projects
                </Link>
                <button className="btn btn-outline-light btn-lg" type="button" onClick={() => setShowModal(true)}>
                  Quick Intro
                </button>
              </div>
            </div>

            <div className="col-lg-5 d-none d-lg-flex justify-content-end">
              <motion.div
                className="hero-code-card shadow-lg"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                aria-label="Developer profile code snippet"
              >
                <div className="hero-code-titlebar">
                  <span className="hero-code-dot" style={{ background: '#ff5f56' }}></span>
                  <span className="hero-code-dot" style={{ background: '#ffbd2e' }}></span>
                  <span className="hero-code-dot" style={{ background: '#27c93f' }}></span>
                  <span className="hero-code-filename">saimum.js</span>
                </div>
                <pre className="hero-code-body"><code><span className="code-keyword">const</span> saimum <span className="code-punct">=</span> <span className="code-punct">{'{'}</span>{'\n  '}<span className="code-key">role</span><span className="code-punct">:</span>{'     '}<span className="code-string">&quot;CSE Student @ NSU&quot;</span><span className="code-punct">,</span>{'\n  '}<span className="code-key">building</span><span className="code-punct">:</span> <span className="code-string">&quot;web apps + ML tools&quot;</span><span className="code-punct">,</span>{'\n  '}<span className="code-key">location</span><span className="code-punct">:</span> <span className="code-string">&quot;Dhaka, Bangladesh&quot;</span><span className="code-punct">,</span>{'\n  '}<span className="code-key">open</span><span className="code-punct">:</span>{'     '}<span className="code-keyword">true</span><span className="code-punct">,</span> <span className="code-comment">// internships</span>{'\n'}<span className="code-punct">{'}'}</span></code></pre>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4" aria-hidden="true">
          <i className="bi bi-chevron-down scroll-indicator"></i>
        </div>
      </section>

      <div className="container py-5">
        <section className="my-5" id="home-stats">
          <div className="row g-4 row-cols-2 row-cols-md-4">
            {statsData.map((stat) => (
              <div className="col" key={stat.label}>
                <StatCounter {...stat} />
              </div>
            ))}
          </div>
        </section>

        <section id="home-links" className="mb-5">
          <div className="row g-4 row-cols-1 row-cols-md-3">
            {navCards.map((card) => (
              <div className="col" key={card.title}>
                <div className="card h-100 shadow-sm border-0 hover-card text-center">
                  <div className="card-body p-4">
                    <div
                      className="rounded bg-primary bg-opacity-10 text-primary d-inline-flex align-items-center justify-content-center mb-3"
                      style={{ width: '56px', height: '56px', fontSize: '1.5rem' }}
                    >
                      <i className={`bi ${card.icon}`}></i>
                    </div>
                    <h2 className="h5 card-title">{card.title}</h2>
                    <p className="card-text text-secondary">{card.text}</p>
                    <Link className="btn btn-outline-primary btn-sm" to={card.to}>
                      {card.button}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-5 px-4 rounded-4" style={{ background: 'linear-gradient(135deg,#0d1117,#1a3a5c)' }}>
          <h2 className="h4 text-white mb-4 text-center">Principles</h2>
          <div className="row g-4 row-cols-1 row-cols-md-3">
            {quotesData.map((quote) => (
              <div className="col" key={quote.author}>
                <QuoteCard {...quote} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {showModal && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
            aria-labelledby="introModalLabel"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title h5" id="introModalLabel">
                    Quick Introduction
                  </h2>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  I am a final-year CSE student at North South University in Dhaka, focused on web development and
                  practical software engineering.
                </div>
                <div className="modal-footer">
                  <Link className="btn btn-primary" to="/about" onClick={() => setShowModal(false)}>
                    Read Profile
                  </Link>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="modal-backdrop fade show border-0"
            aria-label="Close quick introduction"
            onClick={() => setShowModal(false)}
          ></button>
        </>
      )}
    </motion.div>
  )
}

export default Home
