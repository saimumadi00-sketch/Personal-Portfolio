import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'
import SEOHead from '../components/SEOHead'
import funFacts from '../data/funFacts'
import resumeData from '../data/resume'
import { pageVariants } from '../utils/variants'

const interests = [
  { icon: 'bi-code-slash', label: 'Frontend Development' },
  { icon: 'bi-robot', label: 'Machine Learning' },
  { icon: 'bi-camera-video', label: 'Computer Vision' },
  { icon: 'bi-shield-lock', label: 'Systems Security' },
  { icon: 'bi-cloud', label: 'AWS Cloud Services' },
  { icon: 'bi-diagram-3', label: 'Full-Stack Architecture' },
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
    title: 'Learning',
    desc: 'I turn CSE coursework into shipped projects so the learning has a visible result.',
  },
]

const details = [
  { label: 'Full Name', value: resumeData.name },
  { label: 'Location', value: resumeData.location },
  { label: 'University', value: 'North South University' },
  { label: 'Major', value: 'B.Sc. Computer Science & Engineering (CSE)' },
  { label: 'Year', value: resumeData.year },
  { label: 'Email', value: resumeData.email },
  { label: 'Languages', value: resumeData.languages.join(', ') },
  { label: 'Status', value: 'Available for collaboration' },
]

const quickStats = [
  { value: '8+', label: 'Projects on GitHub' },
  { value: '5+', label: 'Labs shipped' },
  { value: 'Final', label: 'Year at NSU' },
]

const rightNow = [
  { badge: 'Now', badgeClass: 'success', text: 'Finishing final-year CSE coursework at NSU' },
  { badge: 'Build', badgeClass: 'primary', text: 'Building AI, web, systems programming, and cybersecurity projects' },
  { badge: 'Study', badgeClass: 'secondary', text: 'Exploring AWS, DevSecOps, SBOM automation, and secure messaging' },
]

function About() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <SEOHead
        title="About"
        description="Background and experience of Saimum Al-Mahmud, final-year Computer Science student at North South University."
      />
      <PageHeader
        title="About"
        subtitle="Background & experience"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About' },
        ]}
      />

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <ScrollReveal direction="left">
              <section className="card border-0 shadow-sm hover-card mb-4">
                <div className="card-body p-4 p-lg-5">
                  <h2 className="h4 fw-bold mb-3">Profile</h2>
                  {resumeData.introduction.map((paragraph, index) => (
                    <p className={`text-secondary lh-lg ${index === resumeData.introduction.length - 1 ? 'mb-0' : 'mb-3'}`} key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.05}>
              <section className="card border-0 shadow-sm hover-card mb-4">
                <div className="card-body p-4">
                  <h2 className="h5 fw-bold mb-3">
                    <i className="bi bi-person-vcard me-2 text-primary"></i>Personal Details
                  </h2>
                  <div className="row g-3">
                    {details.map((row) => (
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
              </section>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.1}>
              <section className="card border-0 shadow-sm hover-card mb-4">
                <div className="card-body p-4">
                  <h2 className="h5 fw-bold mb-3">
                    <i className="bi bi-briefcase-fill me-2 text-primary"></i>Work Experience
                  </h2>
                  <div className="d-grid gap-3">
                    {resumeData.experience.map((item) => (
                      <div key={item.role}>
                        <p className="fw-bold mb-0">{item.role}</p>
                        <p className="small text-primary mb-1">{item.org}</p>
                        <p className="small text-secondary mb-0">{item.bullets[0]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.15}>
              <section className="card border-0 shadow-sm hover-card">
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
              </section>
            </ScrollReveal>
          </div>

          <div className="col-lg-4">
            <ScrollReveal direction="right">
              <section className="card border-0 shadow-sm hover-card mb-4">
                <div className="card-body p-4">
                  <h2 className="h5 fw-bold mb-3">Quick Stats</h2>
                  <div className="row g-3">
                    {quickStats.map((stat) => (
                      <div className="col-4" key={stat.label}>
                        <p className="h4 fw-bold text-primary mb-0">{stat.value}</p>
                        <p className="small text-secondary mb-0">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </ScrollReveal>

            <div className="d-grid gap-3 mb-4">
              {values.map((item, index) => (
                <ScrollReveal direction="right" delay={0.05 + index * 0.05} key={item.title}>
                  <section className="card border-0 shadow-sm hover-card">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-start gap-3">
                        <div
                          className="rounded bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{ width: '42px', height: '42px', fontSize: '1.1rem' }}
                        >
                          <i className={`bi ${item.icon}`}></i>
                        </div>
                        <div>
                          <h2 className="h6 fw-bold mb-1">{item.title}</h2>
                          <p className="small text-secondary mb-0">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="right" delay={0.2}>
              <section className="card border-0 shadow-sm hover-card mb-4">
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
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.25}>
              <section className="card border-0 shadow-sm hover-card mb-4">
                <div className="card-body p-4">
                  <h2 className="h5 fw-bold mb-3">
                    <i className="bi bi-broadcast me-2 text-success"></i>Right Now
                  </h2>
                  <ul className="list-unstyled d-grid gap-2 mb-0">
                    {rightNow.map((item) => (
                      <li className="d-flex align-items-start gap-2" key={item.badge}>
                        <span className={`badge text-bg-${item.badgeClass} mt-1 flex-shrink-0`}>{item.badge}</span>
                        <span className="small text-secondary">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3}>
              <section className="card border-0 shadow-sm hover-card">
                <div className="card-body p-4">
                  <h2 className="h5 fw-bold mb-3">
                    <i className="bi bi-compass me-2 text-primary"></i>Currently Exploring
                  </h2>
                  <div className="d-flex flex-wrap gap-2">
                    {resumeData.currentlyExploring.map((item) => (
                      <span className="badge text-bg-primary soft-pill" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default About
