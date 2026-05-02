import SkillBar from '../components/SkillBar'
import skills from '../data/skills'

const levelBadge = {
  Advanced: 'success',
  Intermediate: 'primary',
  Beginner: 'secondary',
}

function Skills() {
  return (
    <div className="container">
      <section className="mb-4">
        <h1 className="display-6 fw-semibold mb-2">My Skills</h1>
        <p className="text-secondary mb-3">
          A summary of the technical and soft skills developed through coursework, projects, and self-learning.
        </p>
        <div className="alert alert-info border-0 shadow-sm mb-0">
          Current focus: strengthening full-stack fundamentals and building deployment-ready applications.
        </div>
      </section>

      <section className="mb-5">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100 hover-card">
              <div className="card-body p-4">
                <h2 className="h5 mb-3">Programming Languages</h2>
                {skills.languages.map((skill) => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
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
          </div>
        </div>
      </section>

      <section>
        <div className="card border-0 shadow-sm hover-card">
          <div className="card-body p-4">
            <h2 className="h5 mb-3">Soft Skills and Languages</h2>
            <p className="mb-3 text-secondary">Core collaboration strengths and communication skills used in team projects.</p>
            <div className="mb-3">
              {skills.soft.map((skill) => (
                <span className="badge rounded-pill text-bg-dark me-2 mb-2 soft-pill" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
            <div>
              <span className="badge text-bg-success me-2 soft-pill">Bengali - Native</span>
              <span className="badge text-bg-primary soft-pill">English - Fluent</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Skills
