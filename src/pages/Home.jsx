import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import QuoteCard from '../components/QuoteCard'
import SEOHead from '../components/SEOHead'
import StatCounter from '../components/StatCounter'
import StarField from '../components/StarField'
import { useTheme } from '../context/ThemeContext'
import usePageVisibility from '../hooks/usePageVisibility'
import quotesData from '../data/quotes'
import statsData from '../data/stats'
import projectsData from '../data/projects'
import { pageVariants } from '../utils/variants'

const navCards = [
  {
    icon: 'bi-folder2-open',
    title: `${projectsData.length} Projects`,
    text: 'Cybersecurity, networking, AI, web apps, and games.',
    button: 'Browse Projects',
    to: '/projects',
  },
  {
    icon: 'bi-tools',
    title: 'Cybersecurity & Networking',
    text: 'Network security, intrusion detection, Kali Linux, and security logging.',
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
  {
    icon: 'bi-journal-text',
    title: 'Resume / CV',
    text: 'My education, experience, and selected security projects.',
    button: 'View Resume',
    to: '/resume',
  },
]

const heroFocusItems = [
  'Cybersecurity',
  'Networking',
  'Machine learning',
  'Computer vision',
  'Full-stack web',
  'Network security',
  'Kali Linux',
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
  const reducedMotion = useReducedMotion()
  const { darkMode } = useTheme()
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef)
  const pageVisible = usePageVisibility()
  const [typewriterText, setTypewriterText] = useState('')
  const charIndex = useRef(0)
  const phraseIndex = useRef(0)
  const isDeleting = useRef(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (reducedMotion || !pageVisible || !heroInView) return
    const phrases = [
      'Majoring in Cybersecurity and Networking',
      'Building network security and IoT lab projects',
      'Building web apps with React + Vite',
      'ML pipelines with Python and Keras',
      'CS student at North South University',
      'Open to cybersecurity and networking internships',
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
  }, [reducedMotion, pageVisible, heroInView])

  return (
    <motion.div variants={pageVariants} initial={reducedMotion ? false : "initial"} animate="animate" exit={reducedMotion ? undefined : "exit"}>
      <SEOHead
        title="Home"
        description="Portfolio of Saimum Al-Mahmud: Computer Science student at NSU Dhaka majoring in Cybersecurity and Networking, with projects in network defense, machine learning, and full-stack development."
      />

      <section
        ref={heroRef}
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
            <div className="col-12 col-lg-7 text-center text-lg-start order-2 order-lg-1">
              <p
                className="small text-uppercase mb-2"
                style={{ color: 'rgba(255,255,255,0.78)', letterSpacing: '0.16em' }}
              >
                {getGreeting()}, visitor.
              </p>
              <span className="badge text-bg-primary mb-3">Cybersecurity & Networking · Open to Internships</span>
              <h1 className="fw-bold mb-2" style={{ color: '#fff', fontSize: 'clamp(2.5rem,6vw,4rem)' }}>
                Hi, I&apos;m Saimum.
              </h1>
              <p className="lead mb-4">
                <span id="typewriterText" style={{ color: '#dbeafe' }}>
                  {reducedMotion ? 'Majoring in Cybersecurity and Networking' : typewriterText || 'Cybersecurity and Networking'}
                </span>
              </p>
              <div className="d-flex flex-wrap gap-2 mt-2 justify-content-center justify-content-lg-start">
                <Link className="btn btn-primary btn-lg" to="/projects">
                  View My Projects
                </Link>
                <Link className="btn btn-outline-light btn-lg" to="/about">
                  About Me
                </Link>
              </div>
            </div>

            <div className="col-12 col-lg-5 d-flex justify-content-center justify-content-lg-end order-1 order-lg-2">
              <div className="hero-portrait-stack">
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: reducedMotion ? 0 : 0.3, duration: reducedMotion ? 0 : 0.6 }}
                  className="hero-portrait-wrap"
                >
                  <div className="hero-portrait-card">
                    <img
                      src="/portrait-640.webp"
                      srcSet="/portrait-320.webp 320w, /portrait-640.webp 640w"
                      sizes="(max-width: 575px) 220px, (max-width: 991px) 240px, 280px"
                      width="640" height="800"
                      fetchPriority="high"
                      decoding="async"
                      alt="Saimum Al-Mahmud"
                      className="hero-traditional-portrait"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="hero-focus-panel"
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 0.45, duration: reducedMotion ? 0 : 0.5 }}
                  aria-label="Current focus areas"
                >
                  <p className="hero-focus-label">Current focus</p>
                  <div className="hero-focus-tags">
                    {heroFocusItems.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </motion.div>
              </div>
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
          <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-xl-4">
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
          <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-xl-4">
            {quotesData.map((quote) => (
              <div className="col" key={quote.author}>
                <QuoteCard {...quote} />
              </div>
            ))}
          </div>
        </section>
      </div>

    </motion.div>
  )
}

export default Home
