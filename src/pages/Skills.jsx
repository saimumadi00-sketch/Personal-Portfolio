import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import ProgressRing from '../components/ProgressRing'
import ScrollReveal from '../components/ScrollReveal'
import SEOHead from '../components/SEOHead'
import SkillBar from '../components/SkillBar'
import skills from '../data/skills'
import { pageVariants } from '../utils/variants'

const levelBadge = {
  Advanced: 'success',
  Intermediate: 'primary',
  Beginner: 'secondary',
}

const proficiencyRings = [
  { label: 'HTML/CSS', percentage: 90, color: 'success' },
  { label: 'JavaScript', percentage: 70, color: 'primary' },
  { label: 'Python', percentage: 75, color: 'primary' },
  { label: 'React', percentage: 75, color: 'primary' },
  { label: 'Java / SQL', percentage: 60, color: 'secondary' },
]

function Skills() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <SEOHead title="Skills" />
      <PageHeader
        title="My Skills"
        subtitle="Technologies and tools I work with"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Skills' },
        ]}
      />

      <div className="container py-5">
        <section className="mb-4">
          <h2 className="display-6 fw-semibold mb-2">Technical Toolkit</h2>
          <p className="text-secondary mb-3">
            Skills used across the portfolio, coursework apps, and ML prototypes.
          </p>
        </section>

        <section className="mb-5">
          <div className="row g-4 row-cols-1 row-cols-lg-3">
            <div className="col">
              <ScrollReveal direction="up">
                <div className="card border-0 shadow-sm h-100 hover-card">
                  <div className="card-body p-4">
                    <h2 className="h5 mb-3">Programming Languages</h2>
                    {skills.languages.map((skill) => (
                      <SkillBar key={skill.name} {...skill} />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="col">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="card border-0 shadow-sm h-100 hover-card">
                  <div className="card-body p-4">
                    <h2 className="h5 mb-3">Frameworks</h2>
                    {skills.frameworks.map((skill) => (
                      <SkillBar key={skill.name} {...skill} />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="col">
              <ScrollReveal direction="up" delay={0.2}>
                <div className="card border-0 shadow-sm h-100 hover-card">
                  <div className="card-body p-4">
                    <h2 className="h5 mb-3">Tools and Technologies</h2>
                    <div className="table-responsive">
                      <table className="table table-striped table-hover align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">Tool</th>
                            <th scope="col">Level</th>
                          </tr>
                        </thead>
                        <tbody>
                          {skills.tools.map((tool) => (
                            <tr key={tool.name}>
                              <td>{tool.name}</td>
                              <td>
                                <span className={`badge text-bg-${levelBadge[tool.level] || 'secondary'}`}>
                                  {tool.level}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <h2 className="h4 mb-4">Proficiency Overview</h2>
          <div className="row g-4 row-cols-2 row-cols-md-5">
            {proficiencyRings.map((ring, index) => (
              <div className="col" key={ring.label}>
                <ScrollReveal direction="up" delay={index * 0.1}>
                  <ProgressRing {...ring} />
                </ScrollReveal>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <ScrollReveal direction="up">
            <div className="card border-0 shadow-sm hover-card">
              <div className="card-body p-4">
                <h2 className="h5 mb-3">Soft Skills and Languages</h2>
                <div className="mb-3">
                  {skills.soft.map((skill) => (
                    <span className="badge rounded-pill text-bg-dark me-2 mb-2 soft-pill" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
                <div>
                  <span className="badge text-bg-success me-2 soft-pill">Bengali - Native</span>
                  <span className="badge text-bg-primary soft-pill">English - Advanced</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </motion.div>
  )
}

export default Skills
