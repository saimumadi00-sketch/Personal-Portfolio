import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import projectsData from '../data/projects'

const filters = ['All', 'Web', 'Python', 'Java']
const webTags = ['HTML', 'CSS', 'Bootstrap', 'JavaScript']

function matchesFilter(project, selectedFilter) {
  if (selectedFilter === 'All') return true
  if (selectedFilter === 'Web') return project.tags.some((tag) => webTags.includes(tag))
  return project.tags.includes(selectedFilter)
}

function Projects({ onToast }) {
  const [projects, setProjects] = useState(projectsData)
  const [filter, setFilter] = useState('All')
  const [detailTitle, setDetailTitle] = useState(null)

  const handleFilter = (selectedFilter) => {
    setFilter(selectedFilter)
    setProjects(projectsData.filter((project) => matchesFilter(project, selectedFilter)))
  }

  const handleShowDetail = (title) => {
    setDetailTitle(title)
    onToast(`${title} details opened`, 'info')
  }

  return (
    <div className="container">
      <section className="mb-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
          <h1 className="display-6 fw-semibold mb-0">My Projects</h1>
          <span className="badge text-bg-dark">{projects.length} Visible Projects</span>
        </div>
        <p className="text-secondary">
          These are selected projects completed through university coursework and personal learning.
        </p>
        <div className="alert alert-primary border-0 shadow-sm">
          Most projects focus on practical workflows, clean structure, and consistent user experience.
        </div>
      </section>

      <section className="mb-4">
        <div className="btn-group flex-wrap" role="group" aria-label="Project filters">
          {filters.map((item) => (
            <button
              type="button"
              className={`btn ${filter === item ? 'btn-primary' : 'btn-outline-primary'}`}
              key={item}
              onClick={() => handleFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {detailTitle && (
        <div className="alert alert-info alert-dismissible fade show shadow-sm" role="alert">
          <strong>{detailTitle}</strong> uses React state to open this project detail alert.
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setDetailTitle(null)}></button>
        </div>
      )}

      <section>
        <div className="row row-cols-1 row-cols-sm-2 g-4">
          {projects.map((project) => (
            <div className="col" key={project.id}>
              <ProjectCard {...project} onShowDetail={handleShowDetail} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <div className="card border-0 shadow-sm hover-card">
          <div className="card-body p-4">
            <h2 className="h5 mb-3">Project Roadmap</h2>
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Project</th>
                    <th scope="col">Status</th>
                    <th scope="col">Next Step</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Portfolio Website</td>
                    <td><span className="badge text-bg-success">Live</span></td>
                    <td>Add case studies and deployment links</td>
                  </tr>
                  <tr>
                    <td>Grade Calculator</td>
                    <td><span className="badge text-bg-warning">Improving</span></td>
                    <td>Export results to CSV</td>
                  </tr>
                  <tr>
                    <td>Registration System</td>
                    <td><span className="badge text-bg-secondary">Academic</span></td>
                    <td>Refactor data storage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Projects
