import CountUpPackage from 'react-countup'
import { useInView } from 'react-intersection-observer'

const CountUp = CountUpPackage.default ?? CountUpPackage

function StatCounter({ value, label, suffix = '', icon }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 })

  return (
    <div className="card stat-card shadow-sm h-100" ref={ref}>
      <div className="card-body p-0">
        {icon && <i className={`bi ${icon} stat-icon`} aria-hidden="true"></i>}
        <div className="stat-number">
          <CountUp end={inView ? value : 0} duration={1.5} suffix={suffix} />
        </div>
        <p className="text-secondary mb-0 small">{label}</p>
      </div>
    </div>
  )
}

export default StatCounter