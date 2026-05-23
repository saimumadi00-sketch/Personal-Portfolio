import Button from './Button'

function FilterBar({ filters = [], active, onChange }) {
  return (
    <div className="btn-group flex-wrap" role="group" aria-label="Project filters">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={active === filter ? 'primary' : 'outline-primary'}
          onClick={() => onChange(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  )
}

export default FilterBar
