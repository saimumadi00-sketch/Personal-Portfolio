import { motion } from 'framer-motion'
import { useState } from 'react'
import FilterBar from '../components/FilterBar'
import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import SEOHead from '../components/SEOHead'
import projectsData from '../data/projects'
import { pageVariants } from '../utils/variants'

const filters = ['All', 'Web', 'Python', 'ML', 'C', 'Java']
const webTags = [
  'HTML',
  'CSS',
  'Bootstrap',
  'JavaScript',
  'React',
  'Vite',
  'TypeScript',
  'Supabase',
  'Node.js',
  'Express',
  'Express.js',
  'MongoDB',
  'REST APIs',
  'Tailwind CSS',
  'Vercel',
]

function matchesFilter(project, selectedFilter) {
  if (selectedFilter === 'All') return true
  if (selectedFilter === 'Web') return project.tags.some((tag) => webTags.includes(tag))
  if (selectedFilter === 'ML') {
    return project.tags.some((tag) =>
      ['Machine Learning', 'Computer Vision', 'MediaPipe', 'LSTM', 'BiLSTM', 'YOLO', 'TensorFlow', 'Scikit-learn'].includes(tag)
    )
  }
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
        subtitle="Public GitHub repositories and deployed work"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Projects' },
        ]}
      />

      <div className="container py-5">
        <section className="mb-4">
          <div className="d-flex flex-wrap gap-3 align-items-center justify-content-between mb-4">
            <div className="project-search flex-grow-1">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="search"
                  className="form-control border-start-0 ps-0"
                  placeholder="Search projects by name, tag, or keyword..."
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
            <span className="badge text-bg-dark">{visibleProjects.length} Visible Projects</span>
          </div>
        </section>

        <section>
          {visibleProjects.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {visibleProjects.map((project) => (
                <div className="col" key={project.id}>
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="card border-0 shadow-sm text-center">
              <div className="card-body p-5">
                <i className="bi bi-search text-primary d-block mb-3" style={{ fontSize: '2rem' }}></i>
                <h2 className="h5 fw-bold mb-2">No projects found</h2>
                <p className="text-secondary mb-3">Try a different search term or switch the active filter.</p>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => {
                    setSearch('')
                    setFilter('All')
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </motion.div>
  )
}

export default Projects
