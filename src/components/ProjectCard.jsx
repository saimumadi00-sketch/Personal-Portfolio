/**
 * ProjectCard — replaces FlipCard.
 * No flip. All content visible at once. Mobile-first.
 */

const statusClasses = {
  Live:           'bg-success text-white',
  Active:         'bg-primary text-white',
  Complete:       'bg-dark text-white',
  Academic:       'bg-secondary text-white',
  'ML Project':   'bg-warning text-dark',
  'Full Stack':   'bg-info text-dark',
  Coursework:     'bg-light text-dark border',
  'Web App':      'bg-primary text-white',
  'Security Lab': 'bg-danger text-white',
  Prototype:      'bg-warning text-dark',
  Repository:     'bg-secondary text-white',
}

function getCategory(tags) {
  if (tags.some((t) => ['C', 'Linux', 'Threads', 'CLI'].includes(t)))
    return 'project-card-c'
  if (tags.some((t) =>
    ['Python', 'Machine Learning', 'Computer Vision',
     'MediaPipe', 'LSTM', 'NIDS', 'YOLO'].includes(t)))
    return 'project-card-python'
  if (tags.some((t) =>
    ['React', 'Vite', 'Bootstrap', 'JavaScript',
     'TypeScript', 'Supabase', 'Node.js', 'Express'].includes(t)))
    return 'project-card-web'
  return 'project-card-other'
}

function ProjectCard({
  title, tags, description, status,
  repositoryUrl, liveUrl, screenshot, impact,
}) {
  const catClass    = getCategory(tags)
  const statusClass = statusClasses[status] || 'bg-secondary text-white'

  return (
    <div className={`card h-100 border-0 shadow-sm hover-card project-card-accent ${catClass}`}>

      {/* Screenshot if available */}
      {screenshot && (
        <div className="project-screenshot-wrap">
          <img
            src={screenshot}
            alt={`${title} preview`}
            className="project-screenshot"
            loading="lazy"
          />
        </div>
      )}

      <div className="card-body d-flex flex-column p-4">

        {/* Title + status */}
        <div className="d-flex justify-content-between gap-2 align-items-start mb-2">
          <h2 className="h5 card-title mb-0">{title}</h2>
          <span className={`badge rounded-pill flex-shrink-0 ${statusClass}`}>
            {status}
          </span>
        </div>

        {/* Tags */}
        <div className="d-flex flex-wrap gap-1 mb-3">
          {tags.map((tag) => (
            <span key={tag} className="badge text-bg-primary">{tag}</span>
          ))}
        </div>

        {/* Description */}
        <p className="card-text text-secondary small lh-lg flex-grow-1 mb-3">
          {description}
        </p>

        {/* Impact line */}
        {impact && (
          <p className="project-impact mb-3">
            <i className="bi bi-lightning-charge-fill me-1"></i>
            {impact}
          </p>
        )}

        {/* Action buttons */}
        <div className="d-flex flex-wrap gap-2 mt-auto">
          {repositoryUrl && (
            <a
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-secondary"
            >
              <i className="bi bi-github me-1"></i>GitHub
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
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
