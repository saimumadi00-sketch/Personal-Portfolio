import { useState } from 'react'

function SectionToggle({ title, children, defaultVisible = true }) {
  const [isVisible, setIsVisible] = useState(defaultVisible)

  return (
    <section className="mb-5">
      <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
        <h2 className="h3 fw-semibold mb-0">{title}</h2>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => setIsVisible((visible) => !visible)}
        >
          {isVisible ? 'Hide' : 'Show'}
        </button>
      </div>
      {isVisible && <div className="section-toggle-content">{children}</div>}
    </section>
  )
}

export default SectionToggle
