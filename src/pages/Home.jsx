import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionToggle from '../components/SectionToggle'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 5) return 'Good night'
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  if (hour < 21) return 'Good evening'
  return 'Good night'
}

function Home() {
  const [typewriterText, setTypewriterText] = useState('')
  const [showModal, setShowModal] = useState(false)
  const charIndex = useRef(0)
  const phraseIndex = useRef(0)
  const isDeleting = useRef(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const phrases = [
      'Computer Science Student',
      'Aspiring Web Developer',
      'Frontend Enthusiast',
      'Problem Solver',
      'NSU — Final Year',
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

  return (
    <div className="container">
      <section className="mb-5">
        <div className="card border-0 shadow-lg hover-card">
          <div className="card-body p-4 p-lg-5">
            <div className="row g-4 align-items-center">
              <div className="col-lg-8">
                <p className="text-muted small mb-2">{getGreeting()}, visitor.</p>
                <span className="badge text-bg-primary mb-3">Open to Internship Opportunities</span>
                <h1 className="display-5 fw-bold mb-2">Hi, I&apos;m Saimum.</h1>
                <p className="lead text-secondary mb-4">
                  <span id="typewriterText">{typewriterText}</span>
                </p>
                <div className="alert alert-info border-0 shadow-sm">
                  I build clean, responsive websites and enjoy solving real-world problems through practical software
                  projects.
                </div>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <Link className="btn btn-primary btn-lg" to="/projects">
                    View My Projects
                  </Link>
                  <button className="btn btn-outline-primary btn-lg" type="button" onClick={() => setShowModal(true)}>
                    Quick Intro
                  </button>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card border-primary-subtle shadow-sm">
                  <div className="card-body">
                    <h2 className="h5 mb-3">Current Focus</h2>
                    <p className="mb-2">
                      <span className="badge text-bg-secondary me-1">Frontend</span>
                      HTML, CSS, Bootstrap, JavaScript
                    </p>
                    <p className="mb-2">
                      <span className="badge text-bg-secondary me-1">Backend</span>
                      Python and Java fundamentals
                    </p>
                    <p className="mb-0">
                      <span className="badge text-bg-secondary me-1">Goal</span>
                      Full-stack internship in 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionToggle title="Portfolio Highlights">
        <div id="portfolioHighlights" className="carousel slide rounded overflow-hidden shadow-sm" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#portfolioHighlights" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
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

      <section>
        <div className="row g-4 row-cols-1 row-cols-md-3">
          {[
            { title: 'About Me', text: 'Learn more about my background, education, and technical interests.', to: '/about' },
            { title: 'Skills', text: 'Review my language proficiency, tools, and collaboration strengths.', to: '/skills' },
            { title: 'Contact', text: 'Reach out for collaboration, project discussions, or opportunities.', to: '/contact' },
          ].map((card) => (
            <div className="col" key={card.title}>
              <div className="card h-100 shadow-sm border-0 hover-card">
                <div className="card-body">
                  <h3 className="h5 card-title">{card.title}</h3>
                  <p className="card-text text-secondary">{card.text}</p>
                  <Link className="btn btn-outline-primary btn-sm" to={card.to}>
                    Open
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="introModalLabel">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title h5" id="introModalLabel">
                    Quick Introduction
                  </h2>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  I am a final-year Computer Science student at North South University in Dhaka with a strong interest in
                  modern web development and software engineering.
                </div>
                <div className="modal-footer">
                  <Link className="btn btn-primary" to="/about" onClick={() => setShowModal(false)}>
                    Read Full About
                  </Link>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  )
}

export default Home
