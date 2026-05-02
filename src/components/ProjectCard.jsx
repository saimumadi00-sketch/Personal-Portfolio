function ProjectCard({ title, tags, description, status, onShowDetail }) {
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
        <button
          type="button"
          className="btn btn-outline-primary btn-sm align-self-start"
          onClick={() => onShowDetail(title)}
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default ProjectCard
