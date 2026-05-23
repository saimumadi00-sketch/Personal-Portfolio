import Button from './Button'

function ProjectCard({ title, tags, description, status, repositoryUrl, onShowDetail }) {
  return (
    <div className="card h-100 border-0 shadow-sm hover-card">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between gap-3 align-items-start mb-3">
          <h2 className="h5 card-title mb-0">{title}</h2>
          <span className="badge text-bg-dark">{status}</span>
        </div>
        <p className="mb-3">
          {tags.map((tag) => (
            <span className="badge text-bg-primary me-1 mb-1" key={tag}>
              {tag}
            </span>
          ))}
        </p>
        <p className="card-text text-secondary flex-grow-1">{description}</p>
        <div className="d-flex flex-wrap gap-2">
  <Button
    variant="outline-primary"
    size="sm"
    onClick={() => onShowDetail(title)}
  >
    View Details
  </Button>

  {repositoryUrl && (
    <a
      className="btn btn-dark btn-sm"
      href={repositoryUrl}
      target="_blank"
      rel="noreferrer"
    >
      <i className="bi bi-github me-1"></i>
      GitHub
    </a>
  )}
</div>
      </div>
    </div>
  )
}

export default ProjectCard
