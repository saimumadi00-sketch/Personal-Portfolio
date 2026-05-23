import { useInView } from 'react-intersection-observer'

const labels = {
  success: 'Advanced',
  primary: 'Intermediate',
  secondary: 'Developing',
}

function SkillBar({ name, level, badge }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 })

  return (
    <div className="mb-3 skill-row" ref={ref}>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <span>{name}</span>
        <span className={`badge text-bg-${badge}`}>{labels[badge] || `${level}%`}</span>
      </div>
      <div
        className="progress"
        role="progressbar"
        aria-label={name}
        aria-valuenow={level}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className={`progress-bar bg-${badge}`}
          style={{
            width: `${inView ? level : 0}%`,
            transition: 'width 1.1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        ></div>
      </div>
    </div>
  )
}

export default SkillBar
