import Button from './Button'

const statusClasses = {
  Live:        'bg-success text-white',
  Active:      'bg-primary text-white',
  Complete:    'bg-dark text-white',
  Academic:    'bg-secondary text-white',
  'ML Project':'bg-warning text-dark',
  'Full Stack':'bg-info text-dark',
  Coursework:  'bg-light text-dark',
  'Web App':   'bg-primary text-white',
}

function getProjectCategory(tags) {
  if (tags.some((t) => ['C', 'Linux', 'Threads', 'CLI'].includes(t)))
    return 'project-card-c'
  if (tags.some((t) => ['Python','Machine Learning','Computer Vision','MediaPipe','LSTM','NIDS','YOLO'].includes(t)))
    return 'project-card-python'
  if (tags.some((t) => ['React','Vite','Bootstrap','JavaScript','TypeScript','Supabase','Node.js','Express'].includes(t)))
    return 'project-card-web'
  return 'project-card-other'
}

function ProjectCard({ title, tags, description, status, repositoryUrl, liveUrl, screenshot, impact, onShowDetail }) {
  const categoryClass = getProjectCategory(tags)
  const statusClass   = statusClasses[status] || 'bg-secondary text-white'

  return (
    <div className={`card h-100 border-0 shadow-sm hover-card project-card-accent ${categoryClass}`}>

      {/* Screenshot / preview image */}
      {screenshot && (
        <div className="project-screenshot-wrap">
          <img
            src={screenshot}
            alt={`${title} preview`}
            className="project-screenshot"
          />
        </div>
      )}

      <div className="card-body d-flex flex-column">

        {/* Title + status pill */}
        <div className="d-flex justify-content-between gap-2 align-items-start mb-2">
          <h2 className="h5 card-title mb-0">{title}</h2>
          <span className={`badge rounded-pill project-status-pill flex-shrink-0 ${statusClass}`}>
            {status}
          </span>
        </div>

        {/* Tech-stack badges */}
        <p className="mb-2">
          {tags.map((tag) => (
            <span className="badge text-bg-primary me-1 mb-1" key={tag}>
              {tag}
            </span>
          ))}
        </p>

        {/* Description */}
        <p className="card-text text-secondary flex-grow-1 mb-2">{description}</p>

        {/* Impact line */}
        {impact && (
          <p className="project-impact mb-3">
            <i className="bi bi-lightning-charge-fill me-1"></i>
            {impact}
          </p>
        )}

        {/* Action buttons */}
        <div className="d-flex flex-wrap gap-2 align-items-center mt-auto">
          <Button variant="outline-primary" size="sm" onClick={() => onShowDetail(title)}>
            View Details
          </Button>

          {repositoryUrl && (
            <a
              href={repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-outline-secondary"
            >
              <i className="bi bi-github me-1"></i>GitHub
            </a>
          )}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-success"
            >
              <i className="bi bi-box-arrow-up-right me-1"></i>Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
