import { motion, useReducedMotion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import SEOHead from '../components/SEOHead'
import resumeData from '../data/resume'
import projectsData from '../data/projects'
import { pageVariants } from '../utils/variants'

const selectedProjects = projectsData.filter((project) => [4, 11, 12, 14, 16].includes(project.id))

function Resume() {
  const reducedMotion = useReducedMotion()
  const r = resumeData

  return (
    <motion.div variants={pageVariants} initial={reducedMotion ? false : "initial"} animate="animate" exit={reducedMotion ? undefined : "exit"}>
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
            <h2 className="h2 fw-bold mb-1">{r.name}</h2>
            <p className="text-muted mb-0">{r.title} &mdash; {r.university}</p>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <a href="/saimum-al-mahmud-cv.pdf" download="Saimum-Al-Mahmud-CV.pdf" className="btn btn-primary">
              <i className="bi bi-download me-2" aria-hidden="true"></i>Download CV (PDF)
            </a>
            <button type="button" onClick={() => window.print()} className="btn btn-outline-primary">
              <i className="bi bi-printer me-2" aria-hidden="true"></i>Print CV
            </button>
            <a
              href={r.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-secondary"
            >
              <i className="bi bi-github me-2"></i>GitHub
            </a>
            <a
              href={r.site}
              target="_blank"
              rel="noopener noreferrer"
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

            <section className="resume-section mb-4">
              <h2 className="resume-section-title">
                <i className="bi bi-shield-lock me-2 text-primary"></i>Selected Projects
              </h2>
              <div className="d-grid gap-3">
                {selectedProjects.map((project) => (
                  <div className="resume-exp-item" key={project.id}>
                    <h3 className="h6 fw-bold mb-1">
                      <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">{project.title}</a>
                    </h3>
                    <p className="small text-muted mb-1">{project.tags.join(', ')}</p>
                    <p className="small text-secondary mb-1">{project.description}</p>
                    <p className="small text-secondary mb-0">{project.impact}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section className="resume-section mb-4">
              <h2 className="resume-section-title">
                <i className="bi bi-briefcase-fill me-2 text-primary"></i>Experience
              </h2>
              <div className="d-grid gap-4">
                {r.experience.map((exp, i) => (
                  <div key={i} className="resume-exp-item">
                    <div className="resume-item-header d-flex flex-wrap justify-content-between align-items-start gap-2 mb-1">
                      <div>
                        <h3 className="h6 fw-bold mb-0">{exp.role}</h3>
                        <p className="small text-muted mb-0">{exp.org}</p>
                      </div>
                      <span className="resume-period-badge">{exp.period}</span>
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

            <section className="resume-section mb-4">
              <h2 className="resume-section-title">
                <i className="bi bi-award me-2 text-primary"></i>
                Extra Curricular
              </h2>
              <ul className="resume-bullets">
                {r.extracurricular.map((item, i) => (
                  <li key={i} className="text-secondary small mb-1">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {r.certifications && r.certifications.length > 0 && (
              <section className="resume-section mb-4">
                <h2 className="resume-section-title">
                  <i className="bi bi-patch-check me-2 text-primary"></i>
                  Certifications
                </h2>
                <div className="d-grid gap-3">
                  {r.certifications.map((cert) => (
                    <div key={cert.name} className="resume-exp-item">
                      <h3 className="h6 fw-bold mb-0">{cert.name}</h3>
                      <p className="small text-muted mb-1">Issued by {cert.issuer}</p>
                      <p className="small text-secondary mb-0">Issued: {cert.issued}</p>
                      {cert.credentialUrl && (
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="small text-primary">
                          Verify credential
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            <section className="resume-section mb-4">
              <h2 className="resume-section-title">
                <i className="bi bi-mortarboard-fill me-2 text-primary"></i>Education
              </h2>
              <div className="d-grid gap-3">
                {r.education.map((edu, i) => (
                  <div key={i} className="resume-exp-item">
                    <div className="resume-item-header d-flex flex-wrap justify-content-between align-items-start gap-2">
                      <div>
                        <h3 className="h6 fw-bold mb-0">{edu.degree}</h3>
                        <p className="small text-muted mb-0">{edu.institution} &mdash; {edu.location}</p>
                      </div>
                      <span className="resume-period-badge">{edu.period}</span>
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
                  <li><i className="bi bi-envelope me-2" aria-hidden="true"></i><a href={`mailto:${r.email}`}>{r.email}</a></li>
                  <li><i className="bi bi-telephone me-2" aria-hidden="true"></i><a href={`tel:${r.phone}`}>{r.phone}</a></li>
                  <li><i className="bi bi-geo-alt me-2"></i>{r.location}</li>
                  <li>
                    <i className="bi bi-github me-2"></i>
                    <a href={r.github} target="_blank" rel="noopener noreferrer" className="text-primary">
                      saimumadi00-sketch
                    </a>
                  </li>
                  <li>
                    <i className="bi bi-globe2 me-2"></i>
                    <a href={r.site} target="_blank" rel="noopener noreferrer" className="text-primary">
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
                <div className="small text-secondary d-grid gap-2">
                  <p className="mb-0"><strong>Programming:</strong> {r.skills.programming.join(', ')}</p>
                  <p className="mb-0"><strong>Web:</strong> {r.skills.webDevelopment.join(', ')}</p>
                  <p className="mb-0"><strong>ML / CV:</strong> {r.skills.machineLearning.join(', ')}</p>
                  <p className="mb-0"><strong>Cybersecurity, Networking & Systems:</strong> {r.skills.systemsSecurity.join(', ')}</p>
                  <p className="mb-0"><strong>Tools:</strong> {r.skills.tools.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="card border-0 shadow-sm mb-4">
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

            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h2 className="resume-section-title mb-3">
                  <i className="bi bi-compass me-2 text-primary"></i>Currently Exploring
                </h2>
                <div className="d-flex flex-wrap gap-2">
                  {r.currentlyExploring.map((item) => (
                    <span key={item} className="badge text-bg-primary">{item}</span>
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
