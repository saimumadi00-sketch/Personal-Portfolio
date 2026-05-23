function FilterBar({ filters = [], active, onChange }) {
  return (
    <div className="btn-group flex-wrap" role="group" aria-label="Project filters">
      {filters.map((filter) => (
        <button
          type="button"
          className={`btn ${active === filter ? 'btn-primary' : 'btn-outline-primary'}`}
          key={filter}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
