import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function ProgressRing({ label, percentage, color = 'primary' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 })
  const radius = 50
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="progress-ring-wrap text-center" ref={ref}>
      <svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label={`${label} ${percentage}%`}>
        <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--bs-border-color)" strokeWidth="10" />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={`var(--bs-${color})`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: inView ? strokeDashoffset : circumference }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          transform="rotate(-90 60 60)"
        />
        <text x="60" y="65" textAnchor="middle" className="fw-bold fill-current">
          {percentage}%
        </text>
      </svg>
      <span className="ring-label">{label}</span>
    </div>
  )
}

export default ProgressRing
