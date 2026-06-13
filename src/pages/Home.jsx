import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import QuoteCard from '../components/QuoteCard'
import ScrollReveal from '../components/ScrollReveal'
import SectionToggle from '../components/SectionToggle'
import SEOHead from '../components/SEOHead'
import StatCounter from '../components/StatCounter'
import StarField from '../components/StarField'
import { useTheme } from '../context/ThemeContext'
import funFacts from '../data/funFacts'
import quotesData from '../data/quotes'
import socialLinks from '../data/socialLinks'
import statsData from '../data/stats'
import { pageVariants } from '../utils/variants'

const interests = [
  { icon: 'bi-code-slash', label: 'Frontend Development' },
  { icon: 'bi-robot', label: 'Machine Learning' },
  { icon: 'bi-phone', label: 'Mobile-First Design' },
  { icon: 'bi-diagram-3', label: 'System Architecture' },
  { icon: 'bi-github', label: 'Open Source' },
  { icon: 'bi-book', label: 'Tech Writing' },
]

const values = [
  {
    icon: 'bi-bullseye',
    title: 'Clean Code',
    desc: 'I keep coursework and portfolio code readable enough to revisit after the semester ends.',
  },
  {
    icon: 'bi-person-check',
    title: 'User-First',
    desc: 'Customer care work taught me to listen first, then solve the actual problem in front of me.',
  },
  {
    icon: 'bi-arrow-repeat',
    title: 'Continuous Learning',
    desc: 'I turn CSE coursework into shipped projects so the learning has a visible result.',
  },
]

const workExperience = [
  {
    role: 'Customer Care Representative',
    org: 'ASL BPO',
    detail: 'Handled night-shift customer queries, complaints, and Salesforce CRM updates.',
  },
  {
    role: 'IT Support Volunteer',
    org: 'Forestry Department NGO Project, Sreemongol',
    detail: 'Supported field teams with technical equipment, data collection, and documentation.',
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
      'CS student at NSU',
      'Always building, always learning',
      'Web development and software engineering',
      'cybersecurity enthusiast',
      'Passionate about creating impactful digital experiences'

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

            <div className="col-12 col-lg-5">
              <div className="card border-0 shadow-lg overflow-hidden hero-profile-card mx-auto">
                <div className="card-body text-center p-4 p-md-5">
                  <img
                    src="/portrait.png"
                    alt="MD Saimum Al Mahmud Aditto"
                    className="hero-profile-photo border border-4 border-primary mb-4"
                  />
                  <h2 className="h5 fw-bold mb-1">MD Saimum Al Mahmud Aditto</h2>
                  <p className="small text-secondary mb-3">Final-year CSE student - North South University</p>
                  <div className="d-flex gap-2 justify-content-center flex-wrap mb-3">
                    {Object.values(socialLinks).map((link) => (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary"
                        aria-label={link.label}
                        key={link.label}
                      >
                        <i className={`bi ${link.icon}`}></i>
                      </a>
                    ))}
                    <Link to="/resume" className="btn btn-sm btn-primary">
                      <i className="bi bi-file-earmark-text me-1"></i>Resume
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4" aria-hidden="true">
          <i className="bi bi-chevron-down scroll-indicator"></i>
        </div>
      </section>

      <div className="container py-5">
        <section id="about-profile" className="mb-5">
          <div className="row g-4">
            <div className="col-lg-8">
              <ScrollReveal direction="left">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4 p-lg-5">
                    <h2 className="h3 fw-bold mb-3">About Saimum</h2>
                    <p className="text-secondary lh-lg mb-3">
                      I'm a final-year CSE student at North South University, Dhaka. I build web applications, ML
                      pipelines, and CLI tools, and I care about code that is readable, maintainable, and actually
                      ships.
                    </p>
                    <p className="text-secondary lh-lg mb-0">
                      Outside university I've worked as a Customer Care Representative at ASL BPO, volunteered as IT
                      support for a Forestry Department NGO in Sreemongol, and served as Class Representative in high
                      school and college.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="col-lg-4">
              <ScrollReveal direction="right">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h2 className="h5 fw-bold mb-3">
                      <i className="bi bi-broadcast me-2 text-success"></i>Right Now
                    </h2>
                    <ul className="list-unstyled d-grid gap-2 mb-0">
                      <li className="d-flex align-items-start gap-2">
                        <span className="badge text-bg-success mt-1 flex-shrink-0">Now</span>
                        <span className="small text-secondary">Finishing final-year CSE coursework at NSU</span>
                      </li>
                      <li className="d-flex align-items-start gap-2">
                        <span className="badge text-bg-primary mt-1 flex-shrink-0">Build</span>
                        <span className="small text-secondary">Maintaining a React + Vite portfolio deployed on Vercel</span>
                      </li>
                      <li className="d-flex align-items-start gap-2">
                        <span className="badge text-bg-secondary mt-1 flex-shrink-0">Study</span>
                        <span className="small text-secondary">Practicing web development and machine learning fundamentals</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <ScrollReveal direction="up">
          <div className="row g-4 mb-5">
            {values.map((v, i) => (
              <div className="col-12 col-md-4" key={v.title}>
                <ScrollReveal direction="up" delay={i * 0.1}>
                  <div className="card border-0 shadow-sm hover-card h-100 text-center p-4">
                    <div
                      className="rounded-circle bg-primary bg-opacity-10 text-primary d-inline-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{ width: '56px', height: '56px', fontSize: '1.4rem' }}
                    >
                      <i className={`bi ${v.icon}`}></i>
                    </div>
                    <h3 className="h6 fw-bold mb-2">{v.title}</h3>
                    <p className="text-secondary small mb-0 lh-lg">{v.desc}</p>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="row g-4 mb-5">
          <div className="col-lg-8">
            <ScrollReveal direction="left">
              <div className="card border-0 shadow-sm hover-card mb-4">
                <div className="card-body p-4">
                  <h2 className="h5 fw-bold mb-3">
                    <i className="bi bi-person-vcard me-2 text-primary"></i>Personal Details
                  </h2>
                  <div className="row g-3">
                    {[
                      { label: 'Full Name', value: 'MD Saimum Al Mahmud Aditto' },
                      { label: 'Location', value: 'Vassantek, Dhaka Cantonment, Bangladesh' },
                      { label: 'University', value: 'North South University' },
                      { label: 'Major', value: 'B.Sc. Computer Science & Engineering (CSE)' },
                      { label: 'Year', value: 'Final Year (Enrolled)' },
                      { label: 'Email', value: 'saimumadi00@gmail.com' },
                      { label: 'Languages', value: 'Bengali (Native), English (Advanced)' },
                      { label: 'Status', value: 'Available for collaboration' },
                    ].map((row) => (
                      <div className="col-12 col-sm-6" key={row.label}>
                        <p
                          className="small text-muted mb-0 text-uppercase fw-semibold"
                          style={{ fontSize: '0.68rem', letterSpacing: '0.08em' }}
                        >
                          {row.label}
                        </p>
                        <p className="mb-0 fw-medium">{row.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.05}>
              <div className="card border-0 shadow-sm hover-card mb-4">
                <div className="card-body p-4">
                  <h2 className="h5 fw-bold mb-3">
                    <i className="bi bi-briefcase-fill me-2 text-primary"></i>Work Experience
                  </h2>
                  <div className="d-grid gap-3">
                    {workExperience.map((item) => (
                      <div key={item.role}>
                        <p className="fw-bold mb-0">{item.role}</p>
                        <p className="small text-primary mb-1">{item.org}</p>
                        <p className="small text-secondary mb-0">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.1}>
              <div className="card border-0 shadow-sm hover-card mb-4">
                <div className="card-body p-4">
                  <h2 className="h5 fw-bold mb-3">
                    <i className="bi bi-stars me-2 text-primary"></i>Interests
                  </h2>
                  <div className="row g-3">
                    {interests.map((item) => (
                      <div className="col-6 col-md-4" key={item.label}>
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="rounded bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{ width: '34px', height: '34px', fontSize: '1rem' }}
                          >
                            <i className={`bi ${item.icon}`}></i>
                          </div>
                          <span className="small fw-medium">{item.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="col-lg-4">
            <ScrollReveal direction="right" delay={0.1}>
              <div className="card border-0 shadow-sm hover-card">
                <div className="card-body p-4">
                  <h2 className="h5 fw-bold mb-3">
                    <i className="bi bi-lightning-charge-fill me-2 text-warning"></i>Beyond Code
                  </h2>
                  <ul className="list-unstyled d-grid gap-2 mb-0">
                    {funFacts.map((fact) => (
                      <li key={fact.text} className="d-flex align-items-start gap-2">
                        <i className={`bi ${fact.icon} ${fact.iconClass} mt-1 flex-shrink-0`}></i>
                        <span className="small text-secondary">{fact.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div id="home-highlights">
          <SectionToggle title="Portfolio Highlights">
            <div
              id="portfolioHighlights"
              className="carousel slide rounded overflow-hidden shadow-sm"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#portfolioHighlights"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button type="button" data-bs-target="#portfolioHighlights" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#portfolioHighlights" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="bg-primary-subtle d-flex align-items-center justify-content-center text-center p-5 carousel-panel">
                    <div>
                      <h3 className="h4">Modern Multi-Page Portfolio</h3>
                      <p className="mb-0 text-secondary">Converted into a reusable React application.</p>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="bg-success-subtle d-flex align-items-center justify-content-center text-center p-5 carousel-panel">
                    <div>
                      <h3 className="h4">Academic and Personal Projects</h3>
                      <p className="mb-0 text-secondary">Coursework applications with practical problem-solving.</p>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="bg-warning-subtle d-flex align-items-center justify-content-center text-center p-5 carousel-panel">
                    <div>
                      <h3 className="h4">Continuous Learning Path</h3>
                      <p className="mb-0 text-secondary">Improving in web development and software engineering.</p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#portfolioHighlights" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#portfolioHighlights" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </SectionToggle>
        </div>

        <section className="my-5" id="home-stats">
          <div className="row g-4 row-cols-2 row-cols-md-4">
            {statsData.map((stat, i) => (
              <div className="col" key={stat.label}>
                <ScrollReveal direction="up" delay={i * 0.1}>
                  <StatCounter {...stat} />
                </ScrollReveal>
              </div>
            ))}
          </div>
        </section>

        <section id="home-links">
          <div className="row g-4 row-cols-1 row-cols-md-3">
            {[
              { title: 'Projects', text: 'Coursework apps, ML prototypes, and deployed portfolio work.', to: '/projects' },
              { title: 'Skills', text: 'Languages, frameworks, and tools I use daily.', to: '/skills' },
              { title: 'Contact', text: 'Email, GitHub, and a form - all in one place.', to: '/contact' },
            ].map((card, index) => (
              <div className="col" key={card.title}>
                <ScrollReveal direction="up" delay={index * 0.1}>
                  <div className="card h-100 shadow-sm border-0 hover-card">
                    <div className="card-body">
                      <h3 className="h5 card-title">{card.title}</h3>
                      <p className="card-text text-secondary">{card.text}</p>
                      <Link className="btn btn-outline-primary btn-sm" to={card.to}>
                        Open
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>

          <section
            className="mt-5 py-5 px-4 rounded-4"
            style={{ background: 'linear-gradient(135deg,#0d1117,#1a3a5c)' }}
          >
            <h2 className="h4 text-white mb-4 text-center">Principles</h2>
            <div className="row g-4 row-cols-1 row-cols-md-3">
              {quotesData.map((quote, i) => (
                <div className="col" key={quote.author}>
                  <ScrollReveal direction="up" delay={i * 0.12}>
                    <QuoteCard {...quote} />
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </section>
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
                  <a className="btn btn-primary" href="#about-profile" onClick={() => setShowModal(false)}>
                    Read Profile
                  </a>
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
