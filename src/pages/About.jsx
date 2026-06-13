import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'
import SEOHead from '../components/SEOHead'
import { useTheme } from '../context/ThemeContext'
import funFacts from '../data/funFacts'
import socialLinks from '../data/socialLinks'
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

function About() {
  const { darkMode } = useTheme()

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <SEOHead
        title="About"
        description="Background, work experience, and current focus for MD Saimum Al Mahmud Aditto."
      />
      <PageHeader
        title="About Me"
        subtitle="Background, work, and what I am doing now"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      <div className="container py-5">
        <div className="row g-4 align-items-stretch mb-5">
          <div className="col-lg-4">
            <ScrollReveal direction="left">
              <div className="card border-0 shadow-lg h-100 overflow-hidden">
                <div
                  className="d-flex flex-column align-items-center justify-content-center text-center p-4"
                  style={{
                    background: darkMode
                      ? 'linear-gradient(135deg,#0d1117,#1a3a5c)'
                      : 'linear-gradient(135deg,#1e3a5f,#2c5282)',
                    minHeight: '220px',
                  }}
                >
                  <div
                    className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: '90px', height: '90px', fontSize: '2.8rem', flexShrink: 0 }}
                  >
                    <i className="bi bi-person-fill"></i>
                  </div>
                  <h1 className="h5 text-white mb-1 fw-bold">MD Saimum Al Mahmud Aditto</h1>
                  <p className="small mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    CSE Student - NSU Dhaka
                  </p>
                  <p className="small mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Final Year - Enrolled
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

                <div className="card-body p-0">
                  <div className="row g-0 text-center border-top">
                    {[
                      { num: '8', label: 'Projects' },
                      { num: '5', label: 'Labs' },
                      { num: 'Final', label: 'Year' },
                    ].map((s) => (
                      <div
                        className="col-4 py-3 border-end"
                        key={s.label}
                        style={{ borderColor: 'rgba(128,128,128,0.15)' }}
                      >
                        <div className="fw-bold fs-5">{s.num}</div>
                        <div className="text-muted" style={{ fontSize: '0.72rem' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="col-lg-8">
            <ScrollReveal direction="right">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4 p-lg-5">
                  <h2 className="h3 fw-bold mb-3">Hi, I&apos;m Saimum.</h2>
                  <p className="text-secondary lh-lg mb-3">
                    I'm Saimum - a final-year CSE student at North South University, Dhaka. I build web applications,
                    ML pipelines, and CLI tools, and I care about code that is readable, maintainable, and actually
                    ships.
                  </p>
                  <p className="text-secondary lh-lg mb-0">
                    Outside university I've worked as a Customer Care Representative at ASL BPO, volunteered as IT
                    support for a Forestry Department NGO in Sreemongol, and served as Class Representative in high
                    school and college. I'm currently open to software engineering and web development internships.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

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

          <div className="col-lg-4 d-flex flex-column gap-4">
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

            <ScrollReveal direction="right" delay={0.15}>
              <div className="card border-0 shadow-sm hover-card">
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
      </div>
    </motion.div>
  )
}

export default About
