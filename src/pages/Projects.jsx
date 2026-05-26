import { motion } from 'framer-motion'
import { useState } from 'react'
import FilterBar from '../components/FilterBar'
import PageHeader from '../components/PageHeader'
import FlipCard from '../components/FlipCard'
import ScrollReveal from '../components/ScrollReveal'
import SEOHead from '../components/SEOHead'
import projectsData from '../data/projects'
import { pageVariants } from '../utils/variants'

const filters = ['All', 'Web', 'Python', 'Machine Learning', 'React', 'C']
const webTags = ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'React', 'Vite', 'TypeScript', 'Supabase', 'Node.js', 'Express']

function matchesFilter(project, selectedFilter) {
  if (selectedFilter === 'All') return true
  if (selectedFilter === 'Web') return project.tags.some((tag) => webTags.includes(tag))
  return project.tags.includes(selectedFilter)
}

function Projects({ onToast }) {
  const [filter, setFilter] = useState('All')
  const [detailTitle, setDetailTitle] = useState(null)
  const visibleProjects = projectsData.filter((project) => matchesFilter(project, filter))

  const handleFilter = (selectedFilter) => {
    setFilter(selectedFilter)
  }

  const handleShowDetail = (title) => {
    setDetailTitle(title)
    onToast?.(`${title} details opened`, 'info')
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
          <p className="text-secondary">
            These are selected projects completed through university coursework and personal learning.
          </p>
          <div className="alert alert-primary border-0 shadow-sm">
            Most projects focus on practical workflows, clean structure, and consistent user experience.
          </div>
        </section>

        <section className="mb-4">
          <FilterBar filters={filters} active={filter} onChange={handleFilter} />
        </section>

        {detailTitle && (
          <div className="alert alert-info alert-dismissible fade show shadow-sm" role="alert">
            <strong>{detailTitle}</strong> uses React state to open this project detail alert.
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setDetailTitle(null)}></button>
          </div>
        )}

        <section>
          <div className="row row-cols-1 row-cols-sm-2 g-4">
            {visibleProjects.map((project, index) => (
              <div className="col" key={project.id}>
                <ScrollReveal direction="up" delay={index * 0.1}>
                  <FlipCard {...project} onShowDetail={handleShowDetail} />
                </ScrollReveal>
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
                        <th scope="col">Next Step</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Portfolio Website</td>
                        <td>
                          <span className="badge text-bg-success">Live</span>
                        </td>
                        <td>Add case studies and deployment links</td>
                      </tr>
                      <tr>
                        <td>Grade Calculator</td>
                        <td>
                          <span className="badge text-bg-warning">Improving</span>
                        </td>
                        <td>Export results to CSV</td>
                      </tr>
                      <tr>
                        <td>Registration System</td>
                        <td>
                          <span className="badge text-bg-secondary">Academic</span>
                        </td>
                        <td>Refactor data storage</td>
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
