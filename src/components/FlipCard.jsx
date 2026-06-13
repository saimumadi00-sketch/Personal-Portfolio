import { useState } from 'react'

const statusClasses = {
  Live:         'bg-success text-white',
  Active:       'bg-primary text-white',
  Complete:     'bg-dark text-white',
  Academic:     'bg-secondary text-white',
  'ML Project': 'bg-warning text-dark',
  'Full Stack': 'bg-info text-dark',
  Coursework:   'bg-light text-dark',
  'Web App':    'bg-primary text-white',
  'Security Lab': 'bg-danger text-white',
  Prototype:    'bg-warning text-dark',
  Repository:   'bg-secondary text-white',
}

function getCategory(tags) {
  if (tags.some((t) => ['C','Linux','Threads','CLI'].includes(t)))
    return 'project-card-c'
  if (tags.some((t) => ['Python','Machine Learning','Computer Vision',
    'MediaPipe','LSTM','NIDS','YOLO'].includes(t)))
    return 'project-card-python'
  if (tags.some((t) => ['React','Vite','Bootstrap','JavaScript',
    'TypeScript','Supabase','Node.js','Express'].includes(t)))
    return 'project-card-web'
  return 'project-card-other'
}

function FlipCard({
  title, tags, description, status,
  repositoryUrl, liveUrl, screenshot, impact, onShowDetail
}) {
  const [flipped, setFlipped] = useState(false)
  const catClass    = getCategory(tags)
  const statusClass = statusClasses[status] || 'bg-secondary text-white'

  return (
    <div
      className={`flip-card-outer ${catClass}`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onTouchStart={() => setFlipped((f) => !f)}
      role="article"
      aria-label={title}
    >
      <div className={`flip-card-scene ${flipped ? 'is-flipped' : ''}`}>
        <div className="flip-card-front card border-0 shadow-sm">
          {screenshot && (
            <div className="project-screenshot-wrap">
              <img
                src={screenshot}
                alt={`${title} preview`}
                className="project-screenshot"
              />
            </div>
          )}
          <div className="card-body d-flex flex-column p-4">
            <div className="d-flex justify-content-between gap-2 align-items-start mb-3">
              <h2 className="h5 card-title mb-0">{title}</h2>
              <span className={`badge rounded-pill flex-shrink-0 ${statusClass}`}>
                {status}
              </span>
            </div>
            <p className="card-text text-secondary flex-grow-1 mb-2">
              {description}
            </p>
            <p className="flip-hint mb-0">
              <i className="bi bi-arrow-repeat me-1"></i>
              Hover for details
            </p>
          </div>
        </div>

        <div className="flip-card-back card border-0 shadow-sm">
          <div className="card-body d-flex flex-column p-4">
            <h2 className="h5 mb-3">{title}</h2>

            <div className="mb-3">
              <p
                className="small fw-semibold text-uppercase text-muted mb-1"
                style={{ letterSpacing: '0.08em' }}
              >
                Tech Stack
              </p>
              <div className="d-flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <span key={tag} className="badge text-bg-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {impact && (
              <div className="mb-3 flex-grow-1">
                <p
                  className="small fw-semibold text-uppercase text-muted mb-1"
                  style={{ letterSpacing: '0.08em' }}
                >
                  Impact
                </p>
                <p className="project-impact mb-0">
                  <i className="bi bi-lightning-charge-fill me-1"></i>
                  {impact}
                </p>
              </div>
            )}

            <div className="d-flex flex-wrap gap-2 mt-auto">
              {onShowDetail && (
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => onShowDetail(title)}
                >
                  Details
                </button>
              )}
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
                  <i className="bi bi-box-arrow-up-right me-1"></i>Live
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlipCard
