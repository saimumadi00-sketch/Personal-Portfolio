import { motion } from 'framer-motion'
import { useState } from 'react'
import FilterBar from '../components/FilterBar'
import PageHeader from '../components/PageHeader'
import FlipCard from '../components/FlipCard'
import ScrollReveal from '../components/ScrollReveal'
import SEOHead from '../components/SEOHead'
import projectsData from '../data/projects'
import { pageVariants } from '../utils/variants'

const filters = ['All', 'Web', 'Python', 'Java', 'C']
const webTags = ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'React', 'Vite', 'TypeScript', 'Supabase', 'Node.js', 'Express']

function matchesFilter(project, selectedFilter) {
  if (selectedFilter === 'All') return true
  if (selectedFilter === 'Web') return project.tags.some((tag) => webTags.includes(tag))
  return project.tags.includes(selectedFilter)
}

function Projects() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const visibleProjects = projectsData.filter((project) =>
    matchesFilter(project, filter) &&
    (search === '' ||
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      project.description.toLowerCase().includes(search.toLowerCase())
    )
  )

  const handleFilter = (selectedFilter) => {
    setFilter(selectedFilter)
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <SEOHead title="Projects" />
      <PageHeader
        title="My Projects"
        subtitle="Things I've built"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Projects' },
        ]}
      />

      <div className="container py-5">
        <section className="mb-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
            <h2 className="display-6 fw-semibold mb-0">Selected Work</h2>
            <span className="badge text-bg-dark">{visibleProjects.length} Visible Projects</span>
          </div>
        </section>

        <section className="mb-4">
          <div className="d-flex flex-wrap gap-3 align-items-center mb-4">
            <div className="project-search flex-grow-1">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="search"
                  className="form-control border-start-0 ps-0"
                  placeholder="Search projects by name, tag, or keyword…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search projects"
                />
                {search && (
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setSearch('')}
                    aria-label="Clear search"
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </div>
            <FilterBar filters={filters} active={filter} onChange={handleFilter} />
          </div>
        </section>

        <section>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {visibleProjects.map((project) => (
              <div className="col" key={project.id}>
                <FlipCard {...project} />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <ScrollReveal direction="up">
            <div className="card border-0 shadow-sm hover-card">
              <div className="card-body p-4">
                <h2 className="h5 mb-3">Project Roadmap</h2>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Project</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Portfolio Website</td>
                        <td>
                          <span className="badge text-bg-success">Live</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Grade Calculator</td>
                        <td>
                          <span className="badge text-bg-warning">Improving</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Registration System</td>
                        <td>
                          <span className="badge text-bg-secondary">Academic</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </motion.div>
  )
}

export default Projects
