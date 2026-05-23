import Button from './Button'

const statusClasses = {
  Live: 'bg-success text-white',
  Active: 'bg-primary text-white',
  Complete: 'bg-dark text-white',
  Academic: 'bg-secondary text-white',
  'ML Project': 'bg-warning text-dark',
  'Full Stack': 'bg-info text-dark',
  Coursework: 'bg-light text-dark',
  'Web App': 'bg-primary text-white',
}

function getProjectCategory(tags) {
  if (tags.some((tag) => ['C', 'Linux', 'Threads', 'CLI'].includes(tag))) return 'project-card-c'
  if (tags.some((tag) => ['Python', 'Machine Learning', 'Computer Vision', 'MediaPipe', 'LSTM', 'NIDS'].includes(tag))) {
    return 'project-card-python'
  }
  if (tags.some((tag) => ['React', 'Vite', 'Bootstrap', 'JavaScript', 'TypeScript', 'Supabase', 'Node.js', 'Express'].includes(tag))) {
    return 'project-card-web'
  }
  return 'project-card-other'
}

function ProjectCard({ title, tags, description, status, repositoryUrl, onShowDetail }) {
  const categoryClass = getProjectCategory(tags)
  const statusClass = statusClasses[status] || 'bg-secondary text-white'

  return (
    <div className={`card h-100 border-0 shadow-sm hover-card project-card-accent ${categoryClass}`}>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between gap-3 align-items-start mb-3">
          <h2 className="h5 card-title mb-0">{title}</h2>
          <span className={`badge rounded-pill project-status-pill ${statusClass}`}>{status}</span>
        </div>
        <p className="mb-3">
          {tags.map((tag) => (
            <span className="badge text-bg-primary me-1 mb-1" key={tag}>
              {tag}
            </span>
          ))}
        </p>
        <p className="card-text text-secondary flex-grow-1">{description}</p>
        <div className="d-flex flex-wrap align-items-center">
          <Button variant="outline-primary" size="sm" onClick={() => onShowDetail(title)}>
            View Details
          </Button>

          {repositoryUrl && (
            <a
              href={repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-outline-secondary ms-2"
            >
              <i className="bi bi-github me-1"></i>GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
