import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'
import SEOHead from '../components/SEOHead'
import Timeline from '../components/Timeline'
import funFacts from '../data/funFacts'
import socialLinks from '../data/socialLinks'
import timelineData from '../data/timeline'
import { pageVariants } from '../utils/variants'

const courses = [
  'Data Structures & Algorithms',
  'Web Technologies (CSE482)',
  'Database Systems',
  'Software Engineering',
  'Operating Systems',
  'Computer Networks',
  'Machine Learning',
  'Object-Oriented Programming',
]

const interests = [
  { icon: 'bi-code-slash',     label: 'Frontend Development' },
  { icon: 'bi-robot',          label: 'Machine Learning'      },
  { icon: 'bi-phone',          label: 'Mobile-First Design'   },
  { icon: 'bi-diagram-3',      label: 'System Architecture'   },
  { icon: 'bi-github',         label: 'Open Source'           },
  { icon: 'bi-book',           label: 'Tech Writing'          },
]

const values = [
  {
    icon: 'bi-bullseye',
    title: 'Clean Code',
    desc: 'I write code for the next developer, not just the compiler. Readable, consistent, and well-structured.',
  },
  {
    icon: 'bi-person-check',
    title: 'User-First',
    desc: 'Every interface decision starts with the person using it — not the technology behind it.',
  },
  {
    icon: 'bi-arrow-repeat',
    title: 'Continuous Learning',
    desc: 'Technology moves fast. I stay curious, follow new tools closely, and apply what I learn.',
  },
]

function About() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <SEOHead
        title="About"
        description="Learn about Md Saimum Al Mahmud — CS student at North South University, Dhaka. Background, values, education, and journey."
      />
      <PageHeader
        title="About Me"
        subtitle="The person behind the code"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      <div className="container py-5">

        {/* ── HERO ROW ── */}
        <div className="row g-4 align-items-stretch mb-5">

          {/* Profile panel */}
          <div className="col-lg-4">
            <ScrollReveal direction="left">
              <div className="card border-0 shadow-lg h-100 overflow-hidden">
                <div
                  className="d-flex flex-column align-items-center justify-content-center text-center p-4"
                  style={{ background: 'linear-gradient(135deg,#0d1117,#1a3a5c)', minHeight: '220px' }}
                >
                  <div
                    className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: '90px', height: '90px', fontSize: '2.8rem', flexShrink: 0 }}
                  >
                    <i className="bi bi-person-fill"></i>
                  </div>
                  <h1 className="h5 text-white mb-1 fw-bold">Md Saimum Al Mahmud</h1>
                  <p className="small mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    CS Student · NSU Dhaka
                  </p>
                  <p className="small mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    4th Year · 2026
                  </p>
                  <div className="d-flex gap-2 justify-content-center flex-wrap">
                    {Object.values(socialLinks).map((link) => (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-light"
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

                {/* Quick stats row */}
                <div className="card-body p-0">
                  <div className="row g-0 text-center border-top">
                    {[
                      { num: '8',   label: 'Projects'  },
                      { num: '5',   label: 'Labs'       },
                      { num: '4th', label: 'Year'       },
                    ].map((s) => (
                      <div className="col-4 py-3 border-end" key={s.label}
                        style={{ borderColor: 'rgba(128,128,128,0.15)' }}>
                        <div className="fw-bold fs-5">{s.num}</div>
                        <div className="text-muted" style={{ fontSize: '0.72rem' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Bio panel */}
          <div className="col-lg-8">
            <ScrollReveal direction="right">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4 p-lg-5">
                  <h2 className="h3 fw-bold mb-3">Hi, I'm Saimum.</h2>
                  <p className="text-secondary lh-lg mb-3">
                    I'm a final-year Computer Science student at North South University in Dhaka,
                    Bangladesh. My journey with code started in 2021 with a single HTML file and
                    has grown into building full-stack web applications, machine learning pipelines,
                    and open-source CLI tools.
                  </p>
                  <p className="text-secondary lh-lg mb-3">
                    I care deeply about the quality of what I build — not just whether it works,
                    but whether it's readable, accessible, and maintainable. I've spent the last
                    four years at NSU pushing through algorithm courses, database systems, and
                    software engineering — and spending an equal amount of time on personal
                    projects that actually ship.
                  </p>
                  <p className="text-secondary lh-lg mb-4">
                    Outside of studying I follow the latest in frontend tooling, write
                    occasionally about things I've built, and enjoy the challenge of making
                    complex systems feel simple to the person using them.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge text-bg-primary">Web Development</span>
                    <span className="badge text-bg-success">Machine Learning</span>
                    <span className="badge text-bg-secondary">Systems Programming</span>
                    <span className="badge text-bg-warning">Clean Code</span>
                    <span className="badge text-bg-info">Open Source</span>
                  </div>
                  <div className="d-flex flex-wrap gap-2 mt-4">
                    <Link className="btn btn-primary" to="/projects">See My Projects</Link>
                    <Link className="btn btn-outline-secondary" to="/contact">Get in Touch</Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ── VALUES ── */}
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

        {/* ── DETAILS + SIDEBAR ── */}
        <div className="row g-4 mb-5">

          {/* Left — details */}
          <div className="col-lg-8">

            {/* Personal details — no toggle, always visible */}
            <ScrollReveal direction="left">
              <div className="card border-0 shadow-sm hover-card mb-4">
                <div className="card-body p-4">
                  <h2 className="h5 fw-bold mb-3">
                    <i className="bi bi-person-vcard me-2 text-primary"></i>Personal Details
                  </h2>
                  <div className="row g-3">
                    {[
                      { label: 'Full Name',   value: 'Md Saimum Al Mahmud'                },
                      { label: 'Location',    value: 'Dhaka City, Bangladesh'              },
                      { label: 'University',  value: 'North South University'              },
                      { label: 'Major',       value: 'B.Sc. Computer Science'              },
                      { label: 'Year',        value: '4th Year (2026)'                     },
                      { label: 'Email',       value: 'Available on request'                },
                      { label: 'Languages',   value: 'Bengali (Native), English (Fluent)'  },
                      { label: 'Status',      value: 'Open to internships & collaboration' },
                    ].map((row) => (
                      <div className="col-12 col-sm-6" key={row.label}>
                        <p className="small text-muted mb-0 text-uppercase fw-semibold"
                           style={{ fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                          {row.label}
                        </p>
                        <p className="mb-0 fw-medium">{row.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Interests */}
            <ScrollReveal direction="left" delay={0.05}>
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

            {/* Timeline */}
            <ScrollReveal direction="up">
              <h2 className="h4 fw-bold mb-4">
                <i className="bi bi-clock-history me-2 text-primary"></i>My Journey
              </h2>
              <Timeline items={timelineData} />
            </ScrollReveal>
          </div>

          {/* Right sidebar */}
          <div className="col-lg-4 d-flex flex-column gap-4">

            {/* Education */}
            <ScrollReveal direction="right">
              <div className="card border-0 shadow-sm hover-card">
                <div className="card-body p-4">
                  <h2 className="h5 fw-bold mb-3">
                    <i className="bi bi-mortarboard-fill me-2 text-primary"></i>Education
                  </h2>
                  <div className="mb-3 pb-3 border-bottom">
                    <p className="fw-bold mb-0">North South University</p>
                    <p className="small text-primary mb-1">B.Sc. Computer Science · 2021–Present</p>
                    <p className="small text-muted mb-0">Dhaka, Bangladesh</p>
                  </div>
                  <div>
                    <p className="small fw-semibold text-uppercase text-muted mb-2"
                       style={{ letterSpacing: '0.08em' }}>
                      Relevant Courses
                    </p>
                    <div className="d-flex flex-wrap gap-1">
                      {courses.map((c) => (
                        <span key={c} className="badge text-bg-light border text-dark"
                              style={{ fontSize: '0.7rem' }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Fun Facts */}
            <ScrollReveal direction="right" delay={0.1}>
              <div className="card border-0 shadow-sm hover-card">
                <div className="card-body p-4">
                  <h2 className="h5 fw-bold mb-3">
                    <i className="bi bi-lightning-charge-fill me-2 text-warning"></i>Fun Facts
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

            {/* Currently */}
            <ScrollReveal direction="right" delay={0.15}>
              <div className="card border-0 shadow-sm hover-card">
                <div className="card-body p-4">
                  <h2 className="h5 fw-bold mb-3">
                    <i className="bi bi-broadcast me-2 text-success"></i>Currently
                  </h2>
                  <ul className="list-unstyled d-grid gap-2 mb-0">
                    <li className="d-flex align-items-start gap-2">
                      <span className="badge text-bg-success mt-1 flex-shrink-0">Now</span>
                      <span className="small text-secondary">Final year at NSU — preparing to graduate</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <span className="badge text-bg-primary mt-1 flex-shrink-0">Build</span>
                      <span className="small text-secondary">Improving this portfolio with new features</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <span className="badge text-bg-warning mt-1 flex-shrink-0" style={{color:'#000'}}>Open</span>
                      <span className="small text-secondary">Seeking internships in web or ML engineering</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <span className="badge text-bg-secondary mt-1 flex-shrink-0">Read</span>
                      <span className="small text-secondary">Following React 19 ecosystem updates</span>
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>

      </div>
    </motion.div>
  )
}

export default About
