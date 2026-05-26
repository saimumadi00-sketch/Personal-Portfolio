import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import SEOHead from '../components/SEOHead'
import resumeData from '../data/resume'
import { pageVariants } from '../utils/variants'

const categoryColors = {
  languages:  'text-bg-primary',
  frameworks: 'text-bg-success',
  tools:      'text-bg-secondary',
  concepts:   'text-bg-dark',
}

function Resume() {
  const r = resumeData

  const handleDownload = () => {
    // Opens the live site for printing as PDF until a PDF file is added to /public
    window.print()
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <SEOHead
        title="Resume"
        description={`CV of ${r.name} — ${r.title} at ${r.university}.`}
      />

      <PageHeader
        title="Resume / CV"
        subtitle="My academic background, experience, and skills at a glance."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Resume' }]}
      />

      <div className="container py-5" id="resume-content">

        {/* Top bar */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-5">
          <div>
            <h1 className="h2 fw-bold mb-1">{r.name}</h1>
            <p className="text-muted mb-0">{r.title} &mdash; {r.university}</p>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <button
              onClick={handleDownload}
              className="btn btn-primary"
            >
              <i className="bi bi-download me-2"></i>Download / Print PDF
            </button>
            <a
              href={r.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-secondary"
            >
              <i className="bi bi-github me-2"></i>GitHub
            </a>
            <a
              href={r.site}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-success"
            >
              <i className="bi bi-globe2 me-2"></i>Live Site
            </a>
          </div>
        </div>

        <div className="row g-4">

          {/* LEFT — main content */}
          <div className="col-lg-8">

            {/* Summary */}
            <section className="resume-section mb-4">
              <h2 className="resume-section-title">
                <i className="bi bi-person-lines-fill me-2 text-primary"></i>Summary
              </h2>
              <p className="text-secondary lh-lg">{r.summary}</p>
            </section>

            {/* Experience */}
            <section className="resume-section mb-4">
              <h2 className="resume-section-title">
                <i className="bi bi-briefcase-fill me-2 text-primary"></i>Experience &amp; Projects
              </h2>
              <div className="d-grid gap-4">
                {r.experience.map((exp, i) => (
                  <div key={i} className="resume-exp-item">
                    <div className="d-flex flex-wrap justify-content-between align-items-start gap-1 mb-1">
                      <div>
                        <h3 className="h6 fw-bold mb-0">{exp.role}</h3>
                        <p className="small text-muted mb-0">{exp.org}</p>
                      </div>
                      <span className="badge text-bg-light border text-muted">{exp.period}</span>
                    </div>
                    <ul className="resume-bullets mt-2 mb-0">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="text-secondary small">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="resume-section mb-4">
              <h2 className="resume-section-title">
                <i className="bi bi-mortarboard-fill me-2 text-primary"></i>Education
              </h2>
              <div className="d-grid gap-3">
                {r.education.map((edu, i) => (
                  <div key={i} className="resume-exp-item">
                    <div className="d-flex flex-wrap justify-content-between align-items-start gap-1">
                      <div>
                        <h3 className="h6 fw-bold mb-0">{edu.degree}</h3>
                        <p className="small text-muted mb-0">{edu.institution} &mdash; {edu.location}</p>
                      </div>
                      <span className="badge text-bg-light border text-muted">{edu.period}</span>
                    </div>
                    {edu.notes && (
                      <p className="small text-secondary mt-1 mb-0">{edu.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT — sidebar */}
          <div className="col-lg-4">

            {/* Contact */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h2 className="resume-section-title mb-3">
                  <i className="bi bi-envelope-fill me-2 text-primary"></i>Contact
                </h2>
                <ul className="list-unstyled small d-grid gap-2 mb-0 text-secondary">
                  <li><i className="bi bi-envelope me-2"></i>{r.email}</li>
                  <li><i className="bi bi-geo-alt me-2"></i>Dhaka, Bangladesh</li>
                  <li>
                    <i className="bi bi-github me-2"></i>
                    <a href={r.github} target="_blank" rel="noreferrer" className="text-primary">
                      saimumadi00-sketch
                    </a>
                  </li>
                  <li>
                    <i className="bi bi-globe2 me-2"></i>
                    <a href={r.site} target="_blank" rel="noreferrer" className="text-primary">
                      saimum-aditto.vercel.app
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Skills */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h2 className="resume-section-title mb-3">
                  <i className="bi bi-code-slash me-2 text-primary"></i>Skills
                </h2>
                {Object.entries(r.skills).map(([cat, items]) => (
                  <div key={cat} className="mb-3">
                    <p className="small fw-semibold text-uppercase text-muted mb-1" style={{ letterSpacing: '0.08em' }}>
                      {cat}
                    </p>
                    <div className="d-flex flex-wrap gap-1">
                      {items.map((s) => (
                        <span key={s} className={`badge ${categoryColors[cat] || 'text-bg-secondary'}`}>{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h2 className="resume-section-title mb-3">
                  <i className="bi bi-translate me-2 text-primary"></i>Languages
                </h2>
                <div className="d-flex flex-wrap gap-2">
                  {r.languages.map((l) => (
                    <span key={l} className="badge text-bg-dark">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Resume
